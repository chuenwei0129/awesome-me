---
group:
  title: javaScript
  order: 3
title: 错误处理
toc: content
order: 99
---

## 基础概念

### Error 对象

JavaScript 中的错误由 `Error` 对象表示，它包含以下主要属性：

- `message`：错误信息描述
- `name`：错误类型名称（如 `Error`、`TypeError`、`ReferenceError` 等）
- `stack`：错误堆栈跟踪（非标准，但被广泛支持）

```js
const error = new Error('出错了');
console.log(error.message); // "出错了"
console.log(error.name); // "Error"
console.log(error.stack); // 堆栈信息
```

JavaScript 内置了几种错误类型：

- `Error`：通用错误
- `TypeError`：类型错误
- `ReferenceError`：引用错误
- `SyntaxError`：语法错误
- `RangeError`：范围错误
- `URIError`：URI 处理错误

### 自定义错误类

可以通过继承 `Error` 类来创建自定义错误：

```js
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

class NetworkError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = 'NetworkError';
    this.statusCode = statusCode;
  }
}

// 使用
throw new ValidationError('数据验证失败');
throw new NetworkError('请求失败', 404);
```

### throw 语句

`throw` 语句用于抛出一个异常，可以抛出任何类型的值，但推荐抛出 `Error` 对象：

```js
throw new Error('出错了'); // 推荐
throw '错误信息'; // 不推荐
throw 404; // 不推荐
```

### try-catch-finally 语句

`try-catch-finally` 是 JavaScript 中处理异常的基本结构：

```js
try {
  // 可能抛出异常的代码
  console.log('开始执行');
  throw new Error('出错了');
  console.log('这行不会执行'); // 异常后的代码不会执行
} catch (error) {
  // 捕获并处理异常
  console.log('捕获到错误：', error.message);
} finally {
  // 无论是否发生异常都会执行
  console.log('清理资源');
}
```

**执行规则：**

- `try` 块中发生异常后，会立即跳转到 `catch` 块
- `finally` 块始终会执行，即使在 `try` 或 `catch` 中有 `return` 语句
- 如果没有 `catch` 块，异常会继续向上抛出，但 `finally` 仍会执行

```js
function test() {
  try {
    return 'try';
  } finally {
    return 'finally'; // 最终返回 "finally"
  }
}
```

## 同步错误处理

同步代码中的错误可以直接用 `try-catch` 捕获：

```js
const f = () => {
  throw new Error('同步错误');
};

try {
  f();
} catch (e) {
  console.log(e.message); // "同步错误"
}
```

## 异步错误处理

### async/await 错误处理

`async` 函数返回一个 Promise，函数内抛出的错误会导致 Promise 被 rejected。

**错误示例：无法捕获**

```js
const f = async () => {
  throw new Error('异步错误');
};

try {
  f(); // 没有 await，只是调用函数返回 Promise
} catch (error) {
  // 无法捕获，因为错误在 Promise 内部
  console.log(error.message);
}
```

**正确方式 1：使用 .catch()**

```js
const f = async () => {
  throw new Error('异步错误');
};

f().catch((error) => {
  console.log(error.message); // "异步错误"
});
```

**正确方式 2：使用 await + try-catch**

```js
const f = async () => {
  throw new Error('异步错误');
};

(async () => {
  try {
    await f(); // 使用 await 等待 Promise
  } catch (error) {
    console.log(error.message); // "异步错误"
  }
})();
```

**在 async 函数内部使用 try-catch**

```js
(async () => {
  try {
    throw new Error('错误');
  } catch (e) {
    console.log(e.message); // "错误"
  }
})();
```

### await 的错误处理机制

根据 ECMA-262 规范，`await` 会将值转换为 Promise 并等待其完成：

1. `await v` 会将 `v` 转换为 Promise（使用 `Promise.resolve(v)`）
2. 如果 Promise 被 rejected，`await` 会抛出错误（类似 `throw`）
3. 这个错误可以被外层的 `try-catch` 捕获

```js
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('请求失败：', error);
    throw error; // 可以选择重新抛出
  }
}
```

### Promise 错误处理

Promise 构造函数内的同步错误会被自动捕获并转为 rejection：

```js
new Promise(() => {
  throw new Error('同步错误');
}).catch((e) => {
  console.log(e.message); // "同步错误"
});
```

**注意：** 这是 Promise 的内部机制，它会用 `try-catch` 包裹执行器函数，并在捕获到错误时调用 `reject`。

### Promise 内包含异步操作的错误处理

Promise 内的异步操作（如 `setTimeout`）抛出的错误无法被自动捕获：

```js
// ❌ 无法捕获
new Promise(() => {
  setTimeout(() => {
    throw new Error('异步错误'); // 未捕获错误
  }, 0);
}).catch((e) => {
  console.log(e); // 不会执行
});
```

必须手动使用 `reject` 或在回调内使用 `try-catch`：

```js
// ✅ 正确做法
new Promise((resolve, reject) => {
  setTimeout(() => {
    try {
      throw new Error('异步错误');
    } catch (error) {
      reject(error); // 手动 reject
    }
  }, 0);
}).catch((e) => {
  console.log(e.message); // "异步错误"
});
```

更好的方式是在异步回调中使用 async/await：

```js
new Promise(async (resolve, reject) => {
  try {
    await someAsyncOperation();
    resolve('成功');
  } catch (error) {
    reject(error);
  }
});
```

## 复杂场景

### promise.then 与 await 混用

混用 `.then()` 和 `await` 时，只有被 `await` 的 Promise 错误能被 `try-catch` 捕获：

```js
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

(async () => {
  try {
    // 场景 1：没有 await 的 Promise
    const p1 = wait(3000).then(() => {
      console.log('3秒后');
      throw new Error('错误 1');
    }); // ❌ 无法捕获，会触发 unhandledrejection

    // 场景 2：使用 await 的 Promise
    await wait(2000).then(() => {
      console.log('2秒后');
      throw new Error('错误 2');
    }); // ✅ 可以捕获

    console.log('这行不会执行');
    await p1; // 这行也不会执行（已经进入 catch）
  } catch (e) {
    console.log('捕获到：', e.message); // "错误 2"
  }
})();
```

**解释：**

- `p1` 的错误发生时没有被 `await`，所以无法被 `try-catch` 捕获
- `await wait(2000)` 的错误会被捕获，导致立即跳转到 `catch` 块
- 一旦进入 `catch` 块，`try` 块剩余代码不会执行

**延迟 await 的情况：**

```js
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

(async () => {
  try {
    const p1 = wait(1000).then(() => {
      throw new Error('错误');
    });

    await wait(3000); // 等待 3 秒
    await p1; // 此时 p1 已经 rejected
  } catch (e) {
    console.log('捕获到：', e.message); // "错误"
  }
})();
```

**执行过程：**

1. 1 秒后，`p1` rejected，触发 `unhandledrejection` 事件
2. 3 秒后，`await p1` 捕获到错误，进入 `catch` 块
3. `unhandledrejection` 事件被取消（错误已被处理）

### DOM 事件监听器中的错误

事件监听器中的错误无法被外部的 `try-catch` 或全局错误处理器捕获：

```js
// ❌ 无法捕获事件内的错误
try {
  document.querySelector('button').addEventListener('click', () => {
    throw new Error('点击错误');
  });
} catch (e) {
  // 不会执行
}
```

必须在事件处理器内部使用 `try-catch`：

```js
// ✅ 正确做法
document.querySelector('button').addEventListener('click', async () => {
  try {
    await someAsyncOperation();
  } catch (e) {
    console.error('操作失败：', e);
  }
});
```

## 全局异常监控

### error 事件

`window.onerror` 或 `error` 事件可以捕获大部分未处理的同步错误：

```js
window.addEventListener('error', (event) => {
  console.log('全局错误：', event.message);
  console.log('文件：', event.filename);
  console.log('行号：', event.lineno);
  console.log('列号：', event.colno);
  console.log('错误对象：', event.error);

  // 阻止默认行为（控制台报错）
  event.preventDefault();
});
```

**捕获范围：**

- ✅ 同步运行时错误
- ✅ 资源加载错误（需使用捕获阶段：`useCapture: true`）
- ❌ 语法错误（脚本无法执行）
- ❌ Promise rejection（需要 `unhandledrejection`）
- ❌ async 函数未捕获错误（需要 `unhandledrejection`）

### unhandledrejection 事件

监听未被 `.catch()` 捕获的 Promise rejection：

```js
window.addEventListener('unhandledrejection', (event) => {
  console.log('未处理的 Promise rejection：', event.reason);
  console.log('Promise 对象：', event.promise);

  // 阻止默认行为（控制台警告）
  event.preventDefault();
});
```

**示例：**

```js
// 触发 unhandledrejection
Promise.reject('失败原因');

// 不触发（已被捕获）
Promise.reject('失败原因').catch((e) => console.log(e));
```

### 完整的全局错误监控

```js
// 同步错误和资源加载错误
window.addEventListener(
  'error',
  (event) => {
    if (event.target !== window) {
      // 资源加载错误
      console.error('资源加载失败：', event.target);
    } else {
      // 运行时错误
      console.error('运行时错误：', event.message);
    }
    // 上报错误到监控系统
    reportError(event);
  },
  true, // 使用捕获阶段
);

// Promise rejection 错误
window.addEventListener('unhandledrejection', (event) => {
  console.error('未处理的 Promise 错误：', event.reason);
  // 上报错误到监控系统
  reportError(event.reason);
  event.preventDefault();
});
```

## 最佳实践

### 1. 在处理外部数据时使用错误处理

外部数据（API 响应、用户输入、localStorage 等）是不可信的，应该使用错误处理：

```ts
// ✅ 安全的 JSON 解析
function safeParseJSON<T>(input: string, defaultValue: T): T {
  try {
    // 添加类型检查
    if (typeof input !== 'string') {
      return defaultValue;
    }
    return JSON.parse(input) as T;
  } catch (error) {
    console.warn('JSON 解析失败：', error);
    return defaultValue;
  }
}

// 使用
const data = safeParseJSON(localStorage.getItem('user'), { name: 'Guest' });
```

### 2. API 请求的错误处理

处理 HTTP 请求时要考虑多种错误情况：

```ts
async function fetchUser(id: string) {
  try {
    const response = await fetch(`/api/users/${id}`);

    // 检查 HTTP 状态
    if (!response.ok) {
      throw new NetworkError(`请求失败: ${response.status}`, response.status);
    }

    const data = await response.json();

    // 验证数据结构
    if (!data || typeof data.name !== 'string') {
      throw new ValidationError('数据格式不正确');
    }

    return data;
  } catch (error) {
    if (error instanceof NetworkError) {
      // 处理网络错误
      if (error.statusCode === 404) {
        console.error('用户不存在');
      } else if (error.statusCode >= 500) {
        console.error('服务器错误');
      }
    } else if (error instanceof ValidationError) {
      // 处理数据验证错误
      console.error('数据验证失败');
    } else {
      // 处理其他错误（如网络断开）
      console.error('未知错误', error);
    }
    throw error; // 重新抛出，让上层处理
  }
}
```

### 3. 不要过度使用 try-catch

不是所有代码都需要 `try-catch`，过度使用会导致代码冗余：

```js
// ❌ 过度使用
try {
  const sum = 1 + 2;
  console.log(sum);
} catch (e) {
  // 这段代码不会抛出错误
}

// ✅ 只在必要时使用
function divide(a, b) {
  if (b === 0) {
    throw new Error('除数不能为 0');
  }
  return a / b;
}
```

### 4. 提供有意义的错误信息

错误信息应该清晰、具体，便于调试：

```js
// ❌ 不好的错误信息
throw new Error('错误');

// ✅ 好的错误信息
throw new ValidationError(`用户名长度必须在 3-20 之间，当前长度：${username.length}`);
```

### 5. 在 finally 中清理资源

使用 `finally` 确保资源被正确释放：

```js
let file;
try {
  file = await openFile('data.txt');
  const content = await file.read();
  return content;
} catch (error) {
  console.error('读取文件失败：', error);
  throw error;
} finally {
  // 无论成功或失败都关闭文件
  if (file) {
    await file.close();
  }
}
```

### 6. 避免在 catch 中吞掉错误

捕获错误后应该记录或重新抛出，不要默默吞掉：

```js
// ❌ 吞掉错误
try {
  await importantOperation();
} catch (e) {
  // 什么都不做
}

// ✅ 记录并处理
try {
  await importantOperation();
} catch (e) {
  console.error('操作失败：', e);
  // 根据情况决定是否重新抛出
  throw e;
}
```

## 实际应用案例

### 为什么需要错误处理？

在实际开发中，错误处理不仅仅是为了防止程序崩溃，更重要的是处理"不可信任的外部来源"。

**常见场景：HTTP 请求**

HTTP 请求通常有两类错误：

1. **接口错误**：后端返回 4xx/5xx 状态码
2. **数据处理错误**：数据结构与预期不符

第二类是最常见的 Bug 来源：**接口只返回数据，不返回数据类型信息**。

**真实案例：**

> 一开始后端对于值为"空"的字段直接不返回该字段，此时前端的默认值赋值可以生效（`undefined ?? '默认值'`）。
>
> 后来后端新同事修改了配置，值为"空"的字段也返回了，但值是 `null`。
>
> 此时 `null ?? '默认值'` 不会生效（`null` 不是 `undefined`），后续逻辑直接报错。

**解决方案：**

```ts
interface UserResponse {
  name?: string | null;
  age?: number | null;
}

function normalizeUser(data: UserResponse) {
  return {
    name: data.name ?? '匿名用户', // ❌ null 不会触发默认值
    age: data.age ?? 0,
  };
}

// ✅ 更健壮的处理
function normalizeUser(data: UserResponse) {
  return {
    name: data.name || '匿名用户', // 同时处理 null 和 undefined
    age: data.age || 0,
  };
}

// ✅ 或者使用类型守卫
function normalizeUser(data: UserResponse) {
  return {
    name: typeof data.name === 'string' ? data.name : '匿名用户',
    age: typeof data.age === 'number' ? data.age : 0,
  };
}
```

### 封装通用的错误处理

```ts
// 通用请求封装
async function request<T>(url: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new NetworkError(`HTTP ${response.status}: ${response.statusText}`, response.status);
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
    if (error instanceof NetworkError) {
      // 根据状态码处理
      handleNetworkError(error);
    } else if (error instanceof SyntaxError) {
      // JSON 解析错误
      console.error('响应不是有效的 JSON');
    } else {
      // 网络错误、超时等
      console.error('请求失败：', error);
    }
    throw error;
  }
}

function handleNetworkError(error: NetworkError) {
  switch (true) {
    case error.statusCode >= 500:
      showToast('服务器错误，请稍后重试');
      break;
    case error.statusCode === 404:
      showToast('资源不存在');
      break;
    case error.statusCode === 401:
      redirectToLogin();
      break;
    default:
      showToast('请求失败');
  }
}
```

## 参考资源

- [MDN - Error](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Error)
- [MDN - try...catch](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/try...catch)
- [在 JavaScript 中用 try/catch 是不是很 low？](https://www.zhihu.com/question/264259255)
