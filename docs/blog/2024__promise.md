---
group:
  title: 2024 🐲
  order: -2024
title: Promise 求生指南
toc: content
---

## Promise 业务场景

### 设置请求的超时时间

```tsx
import React, { useState } from 'react';

const fetchData = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    // 随机决定请求的延迟时间在 1000 ms 到 4000 ms 之间
    const delay = Math.floor(Math.random() * 3000) + 1000;
    setTimeout(() => {
      resolve(`请求耗时约 ${delay} ms`);
    }, delay);
  });
};

const timeout = <T,>(promise: Promise<T>, ms: number): Promise<T> => {
  const timeoutPromise = new Promise<T>((_, reject) => setTimeout(() => reject(new Error('请求超时')), ms));
  return Promise.race([promise, timeoutPromise]);
};

const App: React.FC = () => {
  const [data, setData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFetch = async () => {
    setLoading(true);
    try {
      const result = await timeout(fetchData(), 2000); // 设置超时为 2000 ms
      setData(result);
      setError(null);
    } catch (err: any) {
      setError(err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '16px' }}>
      <button
        onClick={handleFetch}
        style={{
          cursor: 'pointer',
          padding: '8px 16px',
          backgroundColor: '#4299e1', // Equivalent to bg-blue-500
          color: 'white',
          borderRadius: '4px', // Equivalent to rounded
          opacity: loading ? 0.6 : 1, // Adjust opacity when loading
        }}
        disabled={loading}
      >
        {loading ? '正在加载...' : '发起请求'}
      </button>

      {data && <div style={{ marginTop: '16px' }}>响应数据: {data}</div>}
      {error && <div style={{ marginTop: '16px', color: '#f56565' }}>错误: {error}</div>}
    </div>
  );
};

export default App;
```

### 失败重试

```tsx
import React, { useState } from 'react';

// retries 语义不包含当前这一次，所以 retries 为 1 时，表示再尝试一次
const retry = (fn: () => Promise<any>, retries: number, delay: number): Promise<any> => {
  return fn().catch((err: Error) => {
    if (retries >= 1) {
      return new Promise((resolve) => setTimeout(resolve, delay)).then(() => retry(fn, retries - 1, delay));
    }
    throw err;
  });
};

let count: number = 0;
const fetchData = () => {
  alert(`第 ${++count} 次请求`);

  return new Promise((resolve, reject) => {
    // 模拟一个失败的 API 请求，50% 的失败率
    const shouldFail = Math.random() > 0.5;
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error('Failed to fetch data'));
      } else {
        resolve({ data: 'Success data' });
      }
    }, 1000);
  });
};

const RetryDemo: React.FC = () => {
  const [data, setData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onClick = () => {
    count = 0;
    retry(fetchData, 3, 2000)
      .then((response) => {
        setData((response as any).data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setData(null);
      });
  };

  return (
    <div style={{ padding: '16px' }}>
      {data && <p style={{ color: '#38a169' }}>Data: {data}</p>}
      {error && <p style={{ color: '#e53e3e' }}>Error: {error}</p>}
      <button type="button" onClick={onClick}>
        失败重试
      </button>
    </div>
  );
};

export default RetryDemo;
```

### 并发控制

### 竞态问题

> 参见本站：[如何解决前端常见的竞态问题](./2023__promise-race.md)

## 再手写一遍 Promise

### 准备工作

1. 阅读 [Promise/A+ 规范文档](https://promisesaplus.com/)

    > 实际上，Promises/A+ 规范，内容简短，实现难度低。其中充斥着细节行为的描述，缺乏设计目的和背景的部分，完全没有介绍使用场景。并不是一个入门 Promises 的好材料。

2. 安装 [Promise/A+ 规范测试包](https://github.com/promises-aplus/promises-tests)

    通过 `pnpm i promises-aplus-tests -D` 下载测试包。

    配置 `package.json`：

    ```json
    {
        "devDependencies": {
            "promises-aplus-tests": "*"
        },
        "scripts": {
            "test:aplus": "promises-aplus-tests ./src/promise.aplus.js"
        }
    }
    ```

    执行 `pnpm test:aplus` 测试。

### 代码实现

```js
const resolvePromise = (promise2, x, resolve, reject) => {
  // 如果 promise2 和 x 指向同一对象，以 TypeError 为据因拒绝执行 promise2
  if (promise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise'));
  }
  // 严谨判断：如果 x 是一个 Promise 对象，则采用它的状态。
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    let called = false;
    try {
      // 此处 catch 是防止 proxy 对象的 then 方法报错
      const then = x.then;
      // 如果 then 不是函数，就只是普通对象，直接 resolve 即可，举个例子 { then: 1 }
      if (typeof then === 'function') {
        then.call(
          x,
          (y) => {
            if (called) return;
            called = true;
            // y 是 onResolved 的参数，也就是当前需要 resolve 的值，但此处 y 可能还是一个 promise，所以递归调用 resolvePromise，直到它是一个普通值。
            // x 为 promise，y 为普通值时，消耗了一个 then 序列。这里实现与原生方法应该不一致，原生要消耗两个 then 序列。
            // then 里面返回 promise，实际上跟 `new Promise` 中 `resolve(promise)` 是一样的，推迟两个时序。
            // 原生实现参照 https://github.com/liuyll/ts-promise
            resolvePromise(promise2, y, resolve, reject);
          },
          (r) => {
            if (called) return;
            called = true;
            reject(r);
          },
        );
      } else {
        resolve(x);
      }
    } catch (error) {
      if (called) return;
      called = true;
      reject(error);
    }
  } else {
    // 普通值，直接 resolve
    resolve(x);
  }
};

class MyPromise {
  constructor(executor) {
    this.state = 'pending';
    this.value = undefined;
    this.reason = undefined;
    this.resolvedCallbacks = [];
    this.rejectedCallbacks = [];

    const resolve = (value) => {
      if (this.state === 'pending') {
        this.state = 'resolved';
        this.value = value;
        this.resolvedCallbacks.forEach((fn) => fn());
      }
    };

    const reject = (reason) => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.reason = reason;
        this.rejectedCallbacks.forEach((fn) => fn());
      }
    };

    // 处理 executor 内部错误
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  // then 方法需要返回一个新的 Promise 对象，以便进行链式调用
  then(onResolved, onRejected) {
    if (typeof onResolved !== 'function') {
      // 规范：If `onFulFilled` is not a function and `promise1` is fulfilled, `promise2` must be fulfilled with the same value
      onResolved = (value) => value;
    }

    if (typeof onRejected !== 'function') {
      // If `onRejected` is not a function and `promise1` is rejected, `promise2` must be rejected with the same reason
      onRejected = (reason) => {
        throw reason;
      };
    }

    const promise2 = new MyPromise((resolve, reject) => {
      if (this.state === 'resolved') {
        // 在 JS 里无法主动控制自身 execution context stack。可以通过 `setTimeout` 等 API 间接实现。
        // 由于 new MyPromise 执行时会立即执行 executor 函数，此时 promise2 还未赋值，所以需要个微任务脱离函数调用栈处理。
        // 由于微任务处理，如果此时 onResolved 内部报错，由于只 catch 了 executor 内部的错误，但微任务调用栈冒泡不到 executor，所以需要在此处需 catch 错误。
        queueMicrotask(() => {
          try {
            const x = onResolved(this.value);
            // 传 promise2 是为了处理：如果 promise2 和 x 指向同一对象情况。
            // 传 x resolve reject 是为了处理如果 x 是一个 Promise 对象，则采用它的状态
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      }

      if (this.state === 'rejected') {
        // 从这可以看出 catch 并不会断掉 promise 链
        queueMicrotask(() => {
          try {
            const x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      }

      if (this.state === 'pending') {
        this.resolvedCallbacks.push(() => {
          queueMicrotask(() => {
            try {
              const x = onResolved(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          });
        });

        this.rejectedCallbacks.push(() => {
          queueMicrotask(() => {
            try {
              const x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          });
        });
      }
    });

    return promise2;
  }
}

// aplus 测试
MyPromise.defer = MyPromise.deferred = function () {
  const dfd = {};
  dfd.promise = new MyPromise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
};

module.exports = MyPromise;
```

## 常用方法手写实现

> 详见以前记录的笔记 📒：[夯实基础：关于 Promise 的一些思考](https://github.com/chuenwei0129/build-my-own-x/tree/main/build-my-own-promise)

## Promise 进阶指北

### thenable 对象

thenable 对象，就是有 then 方法，它不是个真正的 promise，不过依然可以当成 promise 来用的，可以放在 await 后面，比如：

```js
// thenable

const thenable = {
  then: (resolve) => {
    setTimeout(() => {
      resolve(100);
    }, 1000);
  },
};

(async () => {
  // await 会自动执行 后面对象里的 then 方法
  const data = await thenable;
  console.log(data);
})();
```

### 如何停掉 Promise 链

> forever pending promise 做 cancellation 是常用操作了。

问：我们该如何停掉 Promise 链？

答：直接返回一个始终不 resolve 也不 reject 的 Promise，即这个 Promise 永远处于 pending 状态，那么后面的 Promise 链当然也就一直不会执行了，因为会一直等着。

问：那么[一直没有 resolve 也没有 reject 的 Promise 会造成内存泄露吗？](https://www.zhihu.com/question/386595851/answer/1154736711)

答：只要 Promise 的引用不被其他对象持有，那么就不会造成内存泄漏。执行完后，这个 promise 该如何处理就已经明确了，如果外部没有持有这个 promise 或者它的 reject 或者 resolve 函数，那它自然就会被回收掉，如果有，那自然会等待持有者消除这个引用，比如你把 reject 函数传给了 setTimeout。我的理解是这样。

### Promise 外改变 Promise 的状态

**问：** 如果 Promise 的 resolve, reject 没有执行会怎么样？

**答：** Promise 会永远处于 pending 状态。

**再问：** 在 Promise 的外部执行 resolve, reject 可以改变 Promise 的状态吗？

**再答：** 可以，其行为如下

```js
let wait
const f = async function () {
  console.log(`----->`)
  await new Promise(resolve => {
    wait = resolve
  })
  console.log(`<-----`) // 2000 ms 后执行
}

f()

setTimeout(() => {
  wait()
}, 2000)

// axios 的取消功能就是这么做的。
```

### [明明 3 行代码即可轻松实现，Promise 为何还要加塞 `withResolvers()` 新方法？](https://www.zhihu.com/question/662276071/answer/3573783762)

![20240921143834](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/20240921143834.png)

现在有些应用越写越复杂，偶尔会遇到巨大的原子 Promise 要写。你可以选择在 `(resolve, reject) => {}` 里面写 500 行的实现，但你最好把这 500 行分解成若干个函数，甚至封装成一个类。

如果你已经要把 `resolve` 和 `reject` 在多个函数中传来传去，一开始把它们放在一个匿名函数里有什么意思呢？还不如放出来，甚至是保存为类成员，等待正确的时机再调用其中一个。这时候你可以自己实现 `withResolvers`，或者是用 API。用 API 使得所有人的代码更统一。

### 如何确定 JS 中链式调用 `Promise.then()` 的执行顺序问题？

```js
// 以下代码每一步是怎么执行的？为什么输出的结果是 1 3 2 4 ?

Promise.resolve()
    .then(() => console.log(1))
    .then(() => console.log(2))

Promise.resolve()
    .then(() => console.log(3))
    .then(() => console.log(4))
```

可以用显示的 `queueMicrotask` 函数来添加 microtask 来模拟：

```js
// 执行步骤

// task 执行
// queueMicrotask 触发器 1 会把回调添加到微任务队列
// queueMicrotask 触发器 3 会把回调添加到微任务队列
// 微任务队列开始执行
// 打印 1，queueMicrotask 触发器 2 会把回调添加到微任务队列
// 打印 3，queueMicrotask 触发器 4 会把回调添加到微任务队列
// 打印 2，打印 4

queueMicrotask(() => { // 1
  console.log(1)
  queueMicrotask(() => { // 2
    console.log(2)
  })
})

queueMicrotask(() => { // 3
  console.log(3)
  queueMicrotask(() => { // 4
    console.log(4)
  })
})
```

### 只有面试会考的 resolve 参数为 promise 的处理方法

**测试代码：**

```js
new Promise(resolve => {
  let resolvedPromise = Promise.resolve()
  resolve(resolvedPromise)
}).then(() => {
  console.log('resolvePromise resolved')
})

Promise.resolve()
  .then(() => {
    console.log('promise1')
  })
  .then(() => {
    console.log('promise2')
  })
  .then(() => {
    console.log('promise3')
  })

// 打印顺序
// promise1
// promise2
// resolvePromise resolved
// promise3
```

用我们实现的 MyPromise 测试

```js
// 打印顺序
// resolvePromise resolved
// promise1
// promise2
// promise3
```

这是因为 Promises/A+ 规范跟 ES2015 Promises 不完全等价。

[ECMA262 Promise 构造函数](https://tc39.es/ecma262/#sec-promise-constructor)中，注意事项里提到：

> The argument passed to the resolve function represents the eventual value of the deferred action and can be either the actual fulfillment value or another Promise object which will provide the value if it is fulfilled.
>
> 传递给 resolve 函数的参数表示延迟动作的最终值，可以是实际的值，也可以是其他 Promise 对象，如果是 Promise，则当该 Promise 对象 fulfilled 之后将向 resolve 函数提供最终值。

在我们实现的 promise 上添加如下内容，可以实现与 ES2015 Promises 等价的效果。

> [查看全部源码](https://github.com/chuenwei0129/build-my-own-x/blob/main/build-my-own-promise/src/promise.es.js)

```js
// 添加外部工具函数 promiseResolveThenableJob
const promiseResolveThenableJob = resolvePromiseParam => {
  return new MyPromise(_resolve => {
    resolvePromiseParam.then(val => _resolve(val))
  })
}

// 对 constructor 中 resolve 函数做如下修改
const resolve = value => {
  const resolveGeneralValue = value => {
    // 如果状态已经改变，则不再重复执行 resolve
    if (this.state === PENDING) {
      this.state = FULFILLED
      this.value = value
      this.fulfilledCbs.forEach(cb => cb())
    }
  }

  // resolve 参数为 promise 情况
  if (value instanceof MyPromise) {
    promiseResolveThenableJob(value).then(
      val => {
        if (val instanceof MyPromise) resolve(val)
        // 走这，会消耗两次 then，resolve 的是 val，this.value = val
        else resolveGeneralValue(val)
      },
      err => reject(err)
    )
  } else {
    resolveGeneralValue(value)
  }
}
```

**解释：**

测试代码执行 `resolve(resolvedPromise)` 会命中 `resolvedPromise instanceof MyPromise === true`，会执行 `promiseResolveThenableJob(value)`。

该函数返回值是一个新的 Promise 实例，函数内部会立即执行 `resolvePromiseParam.then(val => _resolve(val))`，这就表示新的 promise 实例通过 `_resolve` 获取到了 resolvePromiseParam fulfilled 后的数据。

接下来会进入 `promiseResolveThenableJob(value).then` 逻辑处理 `_resolve` 到的数据 val，由于我们在 `let resolvedPromise = Promise.resolve()` 后并未做处理，此时 `val === undefined`，接下来会进入 `resolveGeneralValue(val)`，就会走 `.then(() => {console.log('resolvePromise resolved')})`

**从源码实现上来看：**`resolve(resolvedPromise)` 会消耗两个 then 时序后在执行 `.then(() => {console.log('resolvePromise resolved')})`

### then 里面返回 promise，实际上跟 `new Promise` 中 `resolve(promise)` 是一样的，推迟两个时序

先用我们自己的 Promise 运行：

```js
Promise.resolve()
  .then(() => {
    console.log(0)
    return Promise.resolve(4)
  })
  .then((res) => {
    console.log(res)
  })

Promise.resolve()
  .then(() => {
    console.log(1)
  })
  .then(() => {
    console.log(2)
  })
  .then(() => {
    console.log(3)
  })
  .then(() => {
    console.log(5)
  })
  .then(() => {
    console.log(6)
  })
```

执行结果：`0`、`1`、`2`、`4`、`3`、`5`、`6`。

这里我们手写版本和原生 Promise 不一样，原生执行结果：`0`、`1`、`2`、`3`、`4`、`5`、`6`。

原生 `promise.then` 里面返回 promise，实际上跟 `new Promise` 中 `resolve(promise)` 是一样的，**推迟两个时序**。我们手写的版本，仔细分析代码仅消耗了 1 个时序。

### [Promise 不能被取消，真的算是它的缺点吗？](https://www.zhihu.com/question/495412354/answer/2964699095)

看你的业务语义，如果设计一个 promise 的语义就是“发请求”，那请求发出去当然不能撤销；但如果 promise 的语义是完成一个任务（可以理解成不需要 then 回调执行），一开始启动，但中途可以取消。就能取消。主要是看你的抽象方式。

Promise 的语义不是一个 Running task，而是一个未来的值，Cancel 一个未来的值，听起来总一些别扭。

Promise 一旦开始执行，底层的软硬件资源开销就已经产生了，没有任何办法撤回。举个具体的例子，你发了一个网络请求，无论如何这个网络请求都会发完，无论如何服务器返回的数据都会收完，底层不提供任何接口给你中断和服务器的连接。

其实，多数情况下，我们要取消的不是 Promise，而是生成 Promise 的那个任务。

取消从来都不是有些人想象的“由取消发起者去取消正在运行中的 Promise”，而是“取消发起者发起取消信号，而正在执行的 Promise 里面的 Task 收到信号后尽快自行停止自己正在干的事情”。

如果你真的需要一个可以取消的 Promise，你用两个正常的 Promise 就能捏出来一个。第一个 Promise 是正常使用的 Promise，代表你要执行的异步操作状态。第二个 Promise 代表第一个 Promise 是否被取消过，取消时它就 resolve，但一旦第一个 Promise 完成了它就被自动 reject 掉。这时候你就手工捏出来了一个有三个终极状态的 Promise。

## 参考资料

- [100 行代码实现 Promises/A+ 规范](https://zhuanlan.zhihu.com/p/83965949)
- [珠峰公开课（手写 promise）](https://www.bilibili.com/video/BV1sZ4y1j71K)
- [对不起，你之前学的 promise 可能是错的！（从 ecma 标准看 promise）](https://juejin.cn/post/7331996679548747811)
- [求前端大佬解析这道 Promise 题，为啥 resolved 是在 promise2 之后输出?](https://www.zhihu.com/question/430549238/answer/1623056150)
- [译：如何在 JavaScript 中取消 Promise](https://sorrycc.com/cancel-promises-in-javascript/)
- [译：用 Promise.try 改进错误处理以及同异步的互操作性](https://sorrycc.com/promise-try-to-improve-error-handling-and-sync-async-interoperability/)
- [译：使用 Promise.withResolvers 延迟 Promise](https://sorrycc.com/promise-with-resolvers/)
- [【建议星星】要就来 45 道 Promise 面试题一次爽到底(1.1w字用心整理)](https://juejin.cn/post/6844904077537574919?searchId=202406280135163739183335BF95B8C582)
- [手写 p-limit，40 行代码实现并发控制](https://zhuanlan.zhihu.com/p/604178057)
- [Promise 外面改变 Promise 的状态](https://juejin.cn/post/6844903985674108942)
