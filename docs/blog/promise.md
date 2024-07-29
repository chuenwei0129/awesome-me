---
group:
  title: 2024 🐲
title: 异步
toc: content
---

## 疑难杂症

### 在 Promise 外改变 Promise 的状态

问： 在 Promise 的外部执行 resolve, reject 可以改变 Promise 的状态吗？

答： 可以，其行为如下

```js
let wait
;(async function () {
  console.log(`----->`)
  await new Promise(resolve => {
    wait = resolve
  })
  console.log(`<-----`) // 2000 ms 后执行
})()

setTimeout(() => {
  wait()
}, 2000)

// axios 的取消功能就是这么做的
```

**相关面试题：**

```js
/**
 * 题目：JS 实现异步调度器
 * 要求：
 *  JS 实现一个带并发限制的异步调度器 Scheduler，保证同时运行的任务最多有 2 个
 *  完善下面代码中的 Scheduler 类，使程序能正确输出
 */

//  当前执行并发大于 2 时，生成一个暂停的 Promise，把 resolve 添到一个数组中，下面的代码被暂停执行
//  当前执行并发不大于 2,立即执行异步操作并从数组中弹出最先 push 的 resolve 改变 Promise 的状态，
//  由于 Promise 被解决，最初被暂停的代码可以继续执行

class Scheduler {
  constructor(maxNum) {
    this.taskList = []
    this.count = 0
    this.maxNum = maxNum // 最大并发数
  }

  async add(promiseCreator) {
    // 如果当前并发等于最大并发，那就进入任务队列等待
    if (this.count === this.maxNum) {
      await new Promise(resolve => {
        this.taskList.push(resolve) // 锁
      })
    }

    // 次数 + 1（如果前面的没执行完，那就一直添加）
    this.count++

    // 等待里面内容执行完毕
    // 阻塞执行
    const result = await promiseCreator()

    // 次数 - 1
    this.count--

    if (this.taskList.length > 0) {
      this.taskList.shift()() // 解锁
    }

    // 链式调用，将结果值返回出去
    return result
  }
}

const timeout = time => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

const scheduler = new Scheduler(2)
const addTask = (time, order) => {
  return scheduler.add(() => timeout(time)).then(() => console.log(order))
}

addTask(1000, '1')
addTask(500, '2')
addTask(300, '3')
addTask(400, '4')
```

### 使用 Promise.withResolvers 延迟 Promise

 `Promise.withResolvers()` 将成为即将到来的 ECMAScript 2024 的一部分，因为这个提案最近达到了第 4 阶段。下面的两段代码是等价的。

```js
// 代码1:
let resolve, reject;
const promise = new Promise((res, rej) => {
  resolve = res;
  reject = rej;
});
Math.random() > 0.5 ? resolve("ok") : reject("not ok");

// 代码2: 使用 Promise.withResolvers 延迟 Promise
const { promise, resolve, reject } = Promise.withResolvers();
Math.random() > 0.5 ? resolve("ok") : reject("not ok");
```

### [then 里面返回 promise，实际上跟 `new Promise` 中 `resolve(promise)` 是一样的，推迟两个时序](https://www.zhihu.com/question/430549238/answer/1623056150)

```js
new Promise((resolve) => {
  let resolvedPromise = Promise.resolve();
  resolve(resolvedPromise);
}).then(() => {
  console.log('resolvePromise resolved');
});

Promise.resolve()
  .then(() => {
    console.log('promise1');
  })
  .then(() => {
    console.log('promise2');
  })
  .then(() => {
    console.log('promise3');
  });


// 打印顺序
// promise1
// promise2
// resolvePromise resolved
// promise3
```

```js
Promise.resolve().then(() => {
    console.log(0);
    return Promise.resolve(4);
}).then((res) => {
    console.log(res)
})

Promise.resolve().then(() => {
    console.log(1);
}).then(() => {
    console.log(2);
}).then(() => {
    console.log(3);
}).then(() => {
    console.log(5);
}).then(() =>{
    console.log(6);
})

// 打印顺序
// 0
// 1
// 2
// 3
// 4
// 5
// 6
```

### 如何停掉 Promise 链

> forever pending promise 做 cancellation 是常用操作了。

在使用 Promise 处理一些复杂逻辑的过程中，我们有时候会想要在发生某种错误后就停止执行 Promise 链后面所有的代码。

直接返回一个始终不 resolve 也不 reject 的 Promise，即这个 Promise 永远处于 pending 状态，那么后面的 Promise 链当然也就一直不会执行了，因为会一直等着。

> [一直没有resolve也没有reject的Promise会造成内存泄露吗？](https://www.zhihu.com/question/386595851)

只要 Promise 的引用不被其他对象持有，那么就不会造成内存泄漏。

执行完后，这个promise该如何处理就已经明确了，如果外部没有持有这个promise或者它的reject或者resolve函数，那它自然就会被回收掉，如果有，那自然会等待持有者消除这个引用，比如你把reject函数传给了setimeout。我的理解是这样。


## How to use

promise 是通过 then 方法去注册 callbacks，其中 `onFulfilled callback` 处理 `value`，而 `onRejected callback` 处理 `reason`。

then 方法核心用途是，构造下一个 promise 的 result。

先判断 `onFulfilled/onRejected` 是否是函数，如果是，以它们的返回值，作为下一个 promise 的 result。

```js
const p = new Promise((resolve) => {
  setTimeout(() => {
    resolve('hello world');
  }, 1000);
});

p.then(() => 996).then((result) => {
  console.log(result); // 996
});
```

如果不是，直接以当前 promise 的 result 作为下一个 promise 的 result。

```js
const p = new Promise((resolve) => {
  setTimeout(() => {
    resolve('hello world');
  }, 1000);
});

p.then(undefined).then((result) => {
  console.log(result); // hello world
});
```

如果 `onFulfilled/onRejected` 执行过程中抛错，那这个错误，作为下一个 promise 的 `rejected reason` 来用。

```js
const p = new Promise((resolve) => {
  setTimeout(() => {
    resolve('hello world');
  }, 1000);
});

p.then(() => {
  throw new Error('error');
}).catch((error) => {
  console.log(error);
});
```

## How to implement

> 在 JS 里无法主动控制自身 execution context stack。可以通过 `setTimeout` 等 API 间接实现。
>
> [夯实基础：关于 Promise 的一些思考。](https://github.com/chuenwei0129/build-my-own-x/blob/main/build-my-own-promise/README.md)

[Promise 不能被取消，真的算是它的缺点吗？](https://www.zhihu.com/question/495412354)

语义化和标准化，不意味着能力的增强，它也有可能导致能力的减弱。

async/await 是能力减弱的案例。

generator function 即能支持同步行为，也能支持异步行为。

async function 只支持异步行为。

尽管 90% 以上的异步场景下，async/await 都能胜任；然而，还是有一些场景，裸写 promise 更加灵活。

最典型的案例就是并行的 promise 处理。

此外，async/await 是语法，不是值，因此它不能被存储和传递。而 promise 对象，可以存储在内存里，可以作为参数在函数中传递。

这种灵活性，在一些特殊场景下，可以带来便利。比如，我们可以通过缓存 promise 来缓存异步结果。

如上所示，我们建立了一个 map，存储 url -> promise 的映射。每次 get url 时，都查一下缓存。

通过 async/await 语法的话，promise 对象被隐藏起来了。我们无法获取。最多等结果返回后，缓存 url -> result 的映射。

然而，这种做法的缓存覆盖面有空隙。当 get 请求触发，但结果还没抵达的过程中，又触发了多个相同的请求，这些请求无法命中缓存。

如果我们缓存的是 promise 对象，那么利用 promise 对象可以多次调用 then 方法的特性，我们能做到让所有 get url 获取到同一份异步请求结果。


既然是并发100个请求，第一个用.all的方式效率就太低了，假如第一组有一个请求非常慢，那会导致9个并发位置的空闲，这种并发感觉还是每完成一个fetch就入队一个新fetch，一直保持10个。
