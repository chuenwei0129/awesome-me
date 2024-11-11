---
group:
  title: 2023 🐰
  order: -2023
title: 竞态问题
toc: content
---

## 什么是竞态问题 🏃‍♂️

> 竞态问题，又叫竞态条件（race condition），它旨在描述一个系统或者进程的输出依赖于不受控制的事件出现顺序或者出现时机。
>
> 此词源自于两个信号试着彼此竞争，来影响谁先输出。

简单来说，竞态问题的根源是 **无法确保异步操作的执行顺序与其启动顺序一致**。举个 🌰：

- 假设你在一个页面上快速切换选项卡，从第二项切换到第三项。
- 发出了 `data2` 和 `data3` 的请求，当前选项卡指示在第三项，并进入加载状态。
- 但是由于网络的不确定性，先发出的请求不一定先返回，所以 `data3` 可能比 `data2` 先回来。
- 当 `data2` 最终返回时，选项卡还是显示在第三项，但展示的是第二项的数据。

这就是竞态问题，在前端开发中，这种情况在搜索、分页和选项卡切换中很常见。

```tsx
import React, { useState, useEffect } from "react";

const fakeApiCall = (tabIndex: number): Promise<string> => {
  return new Promise((resolve) => {
    const randomDelay = Math.random() * 2000; // 模拟网络延迟
    setTimeout(() => {
      resolve(`Data for Tab ${tabIndex}`);
    }, randomDelay);
  });
};

const App = () => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<string>("");

  // Effect负责处理在activeTab改变时的副作用：数据请求
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const responseData = await fakeApiCall(activeTab);
      setData(responseData);
      setLoading(false);
    };

    fetchData();
  }, [activeTab]);

  // Event handler负责处理UI交互：切换选项卡
  const handleTabSwitch = (tabIndex: number) => {
    setActiveTab(tabIndex);
  };

  return (
    <div className="p-4">
      <div className="flex space-x-4">
        <button
          className={`px-4 py-2 ${activeTab === 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => handleTabSwitch(1)}
        >
          Tab 1
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 2 ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
          onClick={() => handleTabSwitch(2)}
        >
          Tab 2
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 3 ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
          onClick={() => handleTabSwitch(3)}
        >
          Tab 3
        </button>
      </div>
      <div className="mt-4">
        <p>Active Tab: {activeTab}</p>
        {loading ? <p>Loading...</p> : <p>Data: {data}</p>}
      </div>
    </div>
  );
};

export default App;
```

那么我们如何解决竞态问题呢？在这些场景中，最直接的策略是：**当发出新请求时，取消掉之前的请求**。

## 取消过期请求 🚫

### XMLHttpRequest 取消请求 📡

XMLHttpRequest（XHR）是一个内建的浏览器对象，它允许使用 JavaScript 发送 HTTP 请求。
如果请求已被发出，可以使用 `abort()` 方法立刻中止请求。

```tsx
import React, { useEffect, useRef, useState } from 'react';

interface ApiResponse {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const XHRRequestDemo = () => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const xhrRef = useRef<XMLHttpRequest | null>(null);

  const fetchData = () => {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', 'https://run.mocky.io/v3/452985b9-a6f7-4738-bfea-74ca3ea6e088?mocky-delay=2000ms');

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        setData(JSON.parse(xhr.responseText));
        setError(null);
      } else {
        setError('Failed to load data');
      }
      setIsLoading(false);
    };

    xhr.onerror = () => {
      setError('Network error');
      setIsLoading(false);
    };

    setIsLoading(true);
    setData(null); // Reset data to null when starting a new request

    xhr.send();
    xhrRef.current = xhr;
  };

  const cancelRequest = () => {
    if (xhrRef.current) {
      xhrRef.current.abort();
      setIsLoading(false);
      setError('Request canceled');
    }
  };

  useEffect(() => {
    fetchData();

    return () => {
      if (xhrRef.current) {
        xhrRef.current.abort();
      }
    };
  }, []); // Empty dependency ensures this executes once on mount

  return (
    <div className="p-4">
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {data && (
        <div>
          <h1 className="text-xl font-bold">Title: {data.title}</h1>
          <p>{data.body}</p>
        </div>
      )}
      <div className="mt-4 flex space-x-2">
        <button
          type="button"
          className="p-2 bg-blue-500 text-white rounded"
          onClick={fetchData}
          disabled={isLoading} // Disable button if loading
        >
          Fetch Again
        </button>
        <button
          type="button"
          className="p-2 bg-red-500 text-white rounded"
          onClick={cancelRequest}
          disabled={!isLoading} // Disable button if not loading
        >
          Cancel Request
        </button>
      </div>
    </div>
  );
};

export default XHRRequestDemo;
```

### fetch API 取消请求 📡

要中止 fetch 发出的请求，需要使用 AbortController。这个小工具能让你随时说出："拜拜请求，你已经过时了！"

```tsx
import React, { useEffect, useState, useRef } from 'react';

interface ApiResponse {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const FetchRequestDemo = () => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const controllerRef = useRef<AbortController | null>(null);

  const fetchData = async () => {
    const controller = new AbortController();
    const signal = controller.signal;

    setIsLoading(true);
    setData(null);
    setError(null);
    controllerRef.current = controller;

    try {
      const response = await fetch(
        'https://run.mocky.io/v3/452985b9-a6f7-4738-bfea-74ca3ea6e088?mocky-delay=2000ms',
        { signal }
      );

      if (!response.ok) {
        throw new Error('Failed to load data');
      }

      const result: ApiResponse = await response.json();
      setData(result);
    } catch (err: any) {
      if (err.name === 'AbortError') {
        setError('Request canceled');
      } else {
        setError('Network error');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const cancelRequest = () => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
  };

  useEffect(() => {
    fetchData();

    return () => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
    };
  }, []);

  return (
    <div className="p-4">
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {data && (
        <div>
          <h1 className="text-xl font-bold">Title: {data.title}</h1>
          <p>{data.body}</p>
        </div>
      )}
      <div className="mt-4 flex space-x-2">
        <button
          type="button"
          className="p-2 bg-blue-500 text-white rounded"
          onClick={fetchData}
          disabled={isLoading}
        >
          Fetch Again
        </button>
        <button
          type="button"
          className="p-2 bg-red-500 text-white rounded"
          onClick={cancelRequest}
          disabled={!isLoading}
        >
          Cancel Request
        </button>
      </div>
    </div>
  );
};

export default FetchRequestDemo;
```

### axios 取消请求 🛠️

从 v0.22.0 开始，axios 支持以 fetch API 方式的 AbortController 取消请求。不过要注意在处理请求错误时，需要判断 error 是否是 cancel 导致的，免得和普通错误混在一起搞得像是误会。

```tsx
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

interface ApiResponse {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const AxiosRequestDemo = () => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const controllerRef = useRef<AbortController | null>(null);

  const fetchData = async () => {
    const controller = new AbortController();

    setIsLoading(true);
    setData(null);
    setError(null);
    controllerRef.current = controller;

    try {
      const response = await axios.get<ApiResponse>('https://run.mocky.io/v3/452985b9-a6f7-4738-bfea-74ca3ea6e088?mocky-delay=2000ms', {
        signal: controller.signal,
      });

      setData(response.data);
    } catch (err) {
      if (axios.isCancel(err)) {
        setError('Request canceled');
      } else {
        setError('Network error');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const cancelRequest = () => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
  };

  useEffect(() => {
    fetchData();

    return () => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
    };
  }, []);

  return (
    <div className="p-4">
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {data && (
        <div>
          <h1 className="text-xl font-bold">Title: {data.title}</h1>
          <p>{data.body}</p>
        </div>
      )}
      <div className="mt-4 flex space-x-2">
        <button
          type="button"
          className="p-2 bg-blue-500 text-white rounded"
          onClick={fetchData}
          disabled={isLoading}
        >
          Fetch Again
        </button>
        <button
          type="button"
          className="p-2 bg-red-500 text-white rounded"
          onClick={cancelRequest}
          disabled={!isLoading}
        >
          Cancel Request
        </button>
      </div>
    </div>
  );
};

export default AxiosRequestDemo;
```

### 可取消的 promise 💡

虽然原生 Promise 并不支持取消，但是社区中已有许多实现了取消功能的 Promise 库。比如，[awesome-imperative-promise](https://github.com/slorber/awesome-imperative-promise/blob/master/src/index.ts)，它仅用了 40 行代码实现了取消功能。

```typescript
export type ResolveCallback<T> = (value: T | PromiseLike<T>) => void;
export type RejectCallback = (reason?: any) => void;
export type CancelCallback = () => void;

export type ImperativePromise<T> = {
  promise: Promise<T>;
  resolve: ResolveCallback<T>;
  reject: RejectCallback;
  cancel: CancelCallback;
};

export function createImperativePromise<T>(promiseArg?: Promise<T> | null | undefined): ImperativePromise<T> {
  let resolve: ResolveCallback<T> | null = null;
  let reject: RejectCallback | null = null;

  const wrappedPromise = new Promise<T>((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });

  promiseArg && promiseArg.then(
    val => {
      resolve && resolve(val);
    },
    error => {
      reject && reject(error);
    }
  );

  return {
    promise: wrappedPromise,
    resolve: (value: T | PromiseLike<T>) => {
      resolve && resolve(value);
    },
    reject: (reason?: any) => {
      reject && reject(reason);
    },
    cancel: () => {
      resolve = null;
      reject = null;
    }
  };
}
```

这种模式在需要将 Promise 的控制权交给调用者的场景中非常有用，比如取消异步操作或处理复杂的逻辑流程时。

#### 源码分析

1. **类型定义**
    - `ResolveCallback<T>`: 一个接受泛型 `T` 或者 `PromiseLike<T>` 的函数，用于解决 Promise。
    - `RejectCallback`: 一个可选参数的函数，用于拒绝 Promise。
    - `CancelCallback`: 一个无参数的函数，用于取消操作。

2. **ImperativePromise 类型**
    - `promise`: 标准的 `Promise<T>` 对象。
    - `resolve`: 一个解决这个 Promise 的函数。
    - `reject`: 一个拒绝这个 Promise 的函数。
    - `cancel`: 一个取消当前操作的函数。

3. **createImperativePromise 函数**
    这个函数可能接受一个 `Promise<T>` 作为参数，并返回一个 `ImperativePromise<T>` 对象。函数内部创建了一个新的 Promise (`wrappedPromise`)，并暴露了解决(resolve)和拒绝(reject)的方法，允许外部代码控制这个 Promise 的状态。如果传入了 `promiseArg`，那么 `promiseArg` 的结果会被用来解决或拒绝 `wrappedPromise`。

    - `resolve` 和 `reject` 方法在被调用时会检查它们是否还有效（即没有被 `cancel` 方法清除）。
    - `cancel` 方法将 `resolve` 和 `reject` 设置为 `null`，这样它们就不会再改变 Promise 的状态了。

#### 使用示例

```tsx
import React, { useEffect, useState, useRef } from 'react';
import { createImperativePromise, ImperativePromise } from 'awesome-imperative-promise'; // 假设你已经定义好这个库

interface ApiResponse {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const FetchRequestDemo = () => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const requestPromiseRef = useRef<ImperativePromise<ApiResponse> | null>(null);

  const fetchData = () => {
    const { promise, resolve, reject, cancel } = createImperativePromise<ApiResponse>();
    requestPromiseRef.current = { promise, resolve, reject, cancel };

    setIsLoading(true);
    setData(null);
    setError(null);

    fetch('https://run.mocky.io/v3/452985b9-a6f7-4738-bfea-74ca3ea6e088?mocky-delay=2000ms')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load data');
        }
        return response.json();
      })
      .then(resolve)
      .catch(error => {
        if (error.name !== 'AbortError') {
          reject(error);
        }
      });

    promise
      .then((result) => {
        setData(result);
      })
      .catch((error) => {
        setError('Network error');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const cancelRequest = () => {
    if (requestPromiseRef.current) {
      requestPromiseRef.current.cancel();
      setError('Request canceled');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    return () => {
      if (requestPromiseRef.current) {
        requestPromiseRef.current.cancel();
      }
    };
  }, []);

  return (
    <div className="p-4">
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {data && (
        <div>
          <h1 className="text-xl font-bold">Title: {data.title}</h1>
          <p>{data.body}</p>
        </div>
      )}
      <div className="mt-4 flex space-x-2">
        <button
          type="button"
          className="p-2 bg-blue-500 text-white rounded"
          onClick={fetchData}
          disabled={isLoading}
        >
          Fetch Again
        </button>
        <button
          type="button"
          className="p-2 bg-red-500 text-white rounded"
          onClick={cancelRequest}
          disabled={!isLoading}
        >
          Cancel Request
        </button>
      </div>
    </div>
  );
};

export default FetchRequestDemo;
```

回到 `Promise cancel`，可以看到，虽然 API 命名为 cancel，但实际上没有任何 cancel 的动作，Promise 的状态还是会正常流转（打开控制台依然可以看到 fetch 请求依然正常发出，且正常返回结果）只是回调不再执行，被“忽略”了，所以看起来像被 cancel 了。因此解决竞态问题的方法，除了「取消请求」，还可以「忽略请求」。当请求响应时，只要判断返回的数据是否需要，如果不是则忽略即可。

## 忽略过期请求 🤹‍♂️

我们有哪些方式可以用来忽略过期的请求呢？

### 封装指令式 Promise 🎁

利用指令式 Promise，我们可以手动调用 `cancel` API 来忽略上次请求。

不过，如果每次都需要手动调用，这会导致项目中出现大量相同的模板代码。有时甚至可能会忘记调用 `cancel`。我们可以基于指令式 Promise 封装一个自动忽略过期请求的高阶函数 `onlyResolvesLast`。这个函数会在每次发送新请求之前，取消掉上一次的请求，从而忽略它的回调。

```js
import { createImperativePromise } from 'awesome-imperative-promise'; // 假设你已经定义好这个库

function onlyResolvesLast(fn) {
  // 保留上一个请求的 cancel 方法
  let cancelPrevious = null;

  const wrappedFn = (...args) => {
    // 当前请求执行前，先 cancel 上一个请求
    if (cancelPrevious) cancelPrevious();

    // 执行当前请求
    const result = fn.apply(this, args);

    // 创建指令式的 promise，暴露 cancel 方法并保存
    const { promise, cancel } = createImperativePromise(result);
    cancelPrevious = cancel;

    return promise;
  };

  return wrappedFn;
}
```

以上就是 [awesome-only-resolves-last-promise](https://github.com/slorber/awesome-only-resolves-last-promise/) 的实现。

只需要将 `onlyResolvesLast` 包装一下请求方法，就能实现自动忽略，从而减少很多模板代码。

```js
const fn = (duration) => new Promise(resolve => {
  setTimeout(resolve, duration);
});

const wrappedFn = onlyResolvesLast(fn);

wrappedFn(500).then(() => console.log(1));
wrappedFn(1000).then(() => console.log(2));
wrappedFn(100).then(() => console.log(3));

// 输出 3
```

> 📘 **提示**：通过这种方式，我们可以在日常开发中更加高效地处理过期请求，简化代码，提高可读性和可维护性。请参考[GitHub上的实现](https://github.com/slorber/awesome-only-resolves-last-promise/)获取更多信息。

无其他手动取消逻辑： 因为 `onlyResolvesLast` 在内部处理了取消逻辑，所以不必要再手动处理取消。

现在使用其处理一开始的选项卡问题。

```tsx
import React, { useState, useEffect } from "react";
import { onlyResolvesLast } from 'awesome-only-resolves-last-promise';

const fakeApiCall = onlyResolvesLast((tabIndex: number): Promise<string> => {
  return new Promise((resolve) => {
    const randomDelay = Math.random() * 2000; // 模拟网络延迟
    setTimeout(() => {
      resolve(`Data for Tab ${tabIndex}`);
    }, randomDelay);
  });
})

const App = () => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<string>("");

  // Effect负责处理在activeTab改变时的副作用：数据请求
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const responseData = await fakeApiCall(activeTab);
      setData(responseData);
      setLoading(false);
    };

    fetchData();
  }, [activeTab]);

  // Event handler负责处理UI交互：切换选项卡
  const handleTabSwitch = (tabIndex: number) => {
    setActiveTab(tabIndex);
  };

  return (
    <div className="p-4">
      <div className="flex space-x-4">
        <button
          className={`px-4 py-2 ${activeTab === 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => handleTabSwitch(1)}
        >
          Tab 1
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 2 ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
          onClick={() => handleTabSwitch(2)}
        >
          Tab 2
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 3 ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
          onClick={() => handleTabSwitch(3)}
        >
          Tab 3
        </button>
      </div>
      <div className="mt-4">
        <p>Active Tab: {activeTab}</p>
        {loading ? <p>Loading...</p> : <p>Data: {data}</p>}
      </div>
    </div>
  );
};

export default App;
```

### 使用唯一 id 标识每次请求 🏷️

除了指令式 promise，我们还可以给 `「请求标记 id」` 的方式来忽略上次请求。

具体思路是：

利用全局变量记录最新一次的请求 id，在发请求前，生成唯一 id 标识该次请求。请求回调中，判断 id 是否是最新的，如果不是，就忽略该请求的回调。

```tsx
import React, { useEffect, useState, useRef } from 'react';

interface ApiResponse {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const FetchRequestWithUniqueIdDemo = () => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const requestIdRef = useRef(0);

  const fetchData = async () => {
    // 递增请求ID
    const newRequestId = requestIdRef.current + 1;
    requestIdRef.current = newRequestId;

    setIsLoading(true);
    setData(null);
    setError(null);

    try {
      const response = await fetch(
        'https://run.mocky.io/v3/452985b9-a6f7-4738-bfea-74ca3ea6e088?mocky-delay=2000ms'
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData: ApiResponse = await response.json();

      // 检查当前请求ID是否为最新
      if (newRequestId === requestIdRef.current) {
        setData(responseData);
      }
    } catch (err) {
      setError('Network error');
    } finally {
      // 仅当请求ID为最新时才更新isLoading状态
      if (newRequestId === requestIdRef.current) {
        setIsLoading(false);
      }
    }
  };

  const cancelRequest = () => {
    // 通过增加请求ID的方式 "取消" 当前请求
    requestIdRef.current += 1;
    setIsLoading(false);
    setError('Request canceled');
  };

  useEffect(() => {
    fetchData();

    return () => {
      // 在组件卸载时，增加请求ID以防止更新不必要的状态
      requestIdRef.current += 1;
    };
  }, []);

  return (
    <div className="p-4">
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {data && (
        <div>
          <h1 className="text-xl font-bold">Title: {data.title}</h1>
          <p>{data.body}</p>
        </div>
      )}
      <div className="mt-4 flex space-x-2">
        <button
          type="button"
          className="p-2 bg-blue-500 text-white rounded"
          onClick={fetchData}
          disabled={isLoading}
        >
          Fetch Again
        </button>
        <button
          type="button"
          className="p-2 bg-red-500 text-white rounded"
          onClick={cancelRequest}
          disabled={!isLoading}
        >
          Cancel Request
        </button>
      </div>
    </div>
  );
};

export default FetchRequestWithUniqueIdDemo;
```

## 「取消」和「忽略」的比较 ⚖️

- 「取消」更实际：如果请求被「取消」了没有到达服务端，那么可以一定程度减轻服务的压力。
但是取消请求也依赖底层的请求 API，比如 XMLHttpRequest 需要用 abort，而 fetch API 和 axios 需要用 AbortController。

- 「忽略」更通用：而「忽略」的方式，不依赖请求的 API，更加通用，更容易抽象和封装。本质上所有的异步方法都可以使用 onlyResolvesLast 来忽略过期的调用。

一个更实际，一个更通用，两者的使用需要根据具体场景来权衡。

## 推荐阅读

> [如何解决前端常见的竞态问题](https://juejin.cn/post/7128205011019890695)
