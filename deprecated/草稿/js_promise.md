# JavaScript 基础知识梳理(六)<!-- omit in toc -->

- [回调](#回调)
- [Promise](#promise)
  - [Promise.prototype.then](#promiseprototypethen)
  - [Promise.all](#promiseall)
  - [Promise.prototype.finally](#promiseprototypefinally)
  - [Promise.allSettled](#promiseallsettled)
  - [Promise.any](#promiseany)
  - [Promise.prototype.catch](#promiseprototypecatch)
  - [Promise.resolve](#promiseresolve)
  - [Promise.race](#promiserace)
  - [resolve](#resolve)
  - [scheduler](#scheduler)
- [Generator](#generator)
  - [iterator](#iterator)
  - [generator 实现原理](#generator-实现原理)
  - [co](#co)
  - [promisify](#promisify)

## 回调

```js
// 在程序设计中，这种设计叫做回调，即：我们现在开始执行的行为，但它们会在稍后完成。

function func(cb) {
  setTimeout(() => {
    console.log('异步执行')
    cb && cb('异步执行结果')
  }, 2000)
}

function callback(props) {
  // 处理异步执行结果
  console.log(props)
}

func(callback)

// promise 本质其实就是回调
```

## Promise

```js
// Promise 特点
// 1. 执行器中代码在 new 调用时立即执行
// 2. 执行器接收两个改变状态的内部方法
// 3. 执行器抛出错误也会改变状态
// 4. 同步 resolve 改变状态
// 5. 异步 resolve 改变状态a，exe 执行后状态还是 pending，发布订阅
// 6. 一旦 resolve 后就不可再 reject
// 7. resolve 后 then 方法中执行对应函数，参数传递
// 8. then 中就是回调，异步执行结束即状态改变后执行
// 9. 与 tapable 一样，都是回调加发布订阅
// 10. resolve 传参，同步是通过实例，异步直接发布订阅里函数里传，异步也可以用函数包一层用实例传 () => { onResolved(this.value) }

const RESOLVED = 'RESOLVED'
const REJECTED = 'REJECTED'
const PENDING = 'PENDING'

class Promise {
  constructor(exe) {
    this.state = PENDING
    this.value = null
    this.reason = null
    this.resolvedCb = []
    this.rejectedCb = []

    const resolve = value => {
      if (this.state === PENDING) {
        this.state = RESOLVED
        this.value = value
        this.resolvedCb.forEach(fn => fn(value))
      }
    }

    const reject = reason => {
      if (this.state === PENDING) {
        this.state = REJECTED
        this.reason = reason
        this.resolvedCb.forEach(fn => fn(reason))
      }
    }

    try {
      exe(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }
  then(onfullfiled, onrejected) {
    // 同步
    if (this.state === RESOLVED) {
      onfullfiled(this.value)
    }
    if (this.state === REJECTED) {
      onrejected(this.reason)
    }
    // 异步
    if (this.state === PENDING) {
      // () => { onResolved(this.value) }
      this.resolvedCb.push(onfullfiled)
      this.rejectedCb.push(onrejected)
    }
  }
}

module.exports = Promise

// Promise 特点
// 1. 执行器中代码在 new 调用时立即执行
// 2. 执行器接收两个改变状态的内部方法
// 3. 执行器抛出错误也会改变状态
// 4. 同步 resolve 改变状态
// 5. 异步 resolve 改变状态a，exe 执行后状态还是 pending，发布订阅
// 6. 一旦 resolve 后就不可再 reject
// 7. resolve 后 then 方法中执行对应函数，参数传递
// 8. then 中就是回调，异步执行结束即状态改变后执行
// 9. 与 tapable 一样，都是回调加发布订阅
// 10. resolve 传参，同步是通过实例，异步直接发布订阅里函数里传，异步也可以用函数包一层用实例传 () => { onResolved(this.value) }

// 11. 第一步 then 回调 返回值 没有返回值或者返回非 promise，
// 12. 第二步 处理值的透传问题，then 不传参数也可以一直传下去

// 7. then没有返回值或者返回非 promise，value 值会一直向下传递，形成 promise 链，终止 promise 的方法是返回 pending状态的promise 即空的promise
// 8. then 返回 promise，returnPromise的then会立即执行并把val return出去传给promise2的then，内部的错误也会传给外部reject
// 9. 错误处理，两种情况，内部抛出错误，或者返回的promise2是错误状态
// 10. 返回的promise是新的promise2

// 外部有 then 方法，promise2.then就是外部的then方法 他的参数传递取决于onfulfilled放回值 传递参数靠resolve promise2.then执行
// const x = onResolved(this.value)
//     return new _Promise((resolve, reject) => {
//       resolve(x)
//  })
// 有三种可能 普通 promise object.then
// 递归调用

// 处理回调的返回值是 x === promise
// x.then立即执行并且把返回值 resolve(x.then())
// x 也可能是其他人写的 promise
// x.then的返回值也可能是 promise 递归
// onResolved 执行多次
// 递归过程，不需要处理参数
// 最终传递的值是 resolve(x)

// then 回调里不传值就会透传下去
```

### Promise.prototype.then

```js
// Promise 特点
// 1. 执行器中代码在 new 调用时立即执行
// 2. 执行器接收两个改变状态的内部方法
// 3. 执行器抛出错误也会改变状态
// 4. 同步 resolve 改变状态
// 5. 异步 resolve 改变状态a，exe 执行后状态还是 pending，发布订阅
// 6. 一旦 resolve 后就不可再 reject

// 7. then没有返回值或者返回非 promise，value 值会一直向下传递，形成 promise 链，终止 promise 的方法是返回 pending状态的promise 即空的promise
// 8. then 返回 promise，returnPromise的then会立即执行并把val return出去传给promise2的then，内部的错误也会传给外部reject
// 9. 错误处理，两种情况，内部抛出错误，或者返回的promise2是错误状态
// 10. 返回的promise是新的promise2

// 外部有 then 方法，promise2.then就是外部的then方法 他的参数传递取决于onfulfilled放回值 传递参数靠resolve promise2.then执行

const RESOLVED = 'RESOLVED'
const REJECTED = 'REJECTED'
const PENDING = 'PENDING'

const resolvePromise2 = (promise2, x, resolve, reject) => {
  if (promise2 === x) {
    reject(new TypeError('出错了'))
  } else if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    let called = null
    try {
      // 这个 trycatch处理 x.then，由于第三方所以 要开始处理
      const then = x.then
      if (typeof then === 'function') {
        then.call(
          x,
          y => {
            if (called) return
            called = true
            resolvePromise2(promise2, y, resolve, reject)
          },
          r => {
            if (called) return
            called = true
            reject(r)
          }
        )
      } else {
        resolve(x)
      }
    } catch (err) {
      if (called) return
      called = true
      reject(err)
    }
  } else {
    resolve(x)
  }
}

class Promise {
  constructor(exe) {
    this.state = PENDING
    this.value = null
    this.reason = null
    this.resolvedCb = []
    this.rejectedCb = []

    const resolve = value => {
      if (this.state === PENDING) {
        this.state = RESOLVED
        this.value = value
        this.resolvedCb.forEach(fn => fn())
      }
    }

    const reject = reason => {
      if (this.state === PENDING) {
        this.state = REJECTED
        this.reason = reason
        this.rejectedCb.forEach(fn => fn())
      }
    }

    try {
      exe(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }
  then(onfulfilled, onrejected) {
    onfulfilled = typeof onfulfilled === 'function' ? onfulfilled : value => value
    onrejected =
      typeof onrejected === 'function'
        ? onrejected
        : err => {
            throw err
          }
    const promise2 = new Promise((resolve, reject) => {
      // 同步
      if (this.state === RESOLVED) {
        setTimeout(() => {
          try {
            const x = onfulfilled(this.value)
            resolvePromise2(promise2, x, resolve, reject)
          } catch (err) {
            reject(err)
          }
        })
      }
      if (this.state === REJECTED) {
        setTimeout(() => {
          try {
            const x = onrejected(this.reason)
            resolvePromise2(promise2, x, resolve, reject)
          } catch (err) {
            reject(err)
          }
        })
      }
      // 异步
      if (this.state === PENDING) {
        this.resolvedCb.push(() => {
          setTimeout(() => {
            try {
              const x = onfulfilled(this.value)
              resolvePromise2(promise2, x, resolve, reject)
            } catch (err) {
              reject(err)
            }
          })
        })
        this.rejectedCb.push(() => {
          setTimeout(() => {
            try {
              const x = onrejected(this.reason)
              resolvePromise2(promise2, x, resolve, reject)
            } catch (err) {
              reject(err)
            }
          })
        })
      }
    })

    return promise2
  }
}

Promise.defer = Promise.deferred = function () {
  const dfd = {}
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve
    dfd.reject = reject
  })
  return dfd
}

module.exports = Promise
```

### Promise.all

```js
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('p1')
  }, 3000)
})

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    // reject(new Error('p2'))
    resolve('p2')
  }, 2000)
})

const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    // reject(new Error('p3'))
    resolve('p3')
  }, 1000)
})

const test = [1, 2, 3, p1, p2, p3, 7, 8, 9]
const set = new Set(test)

Promise.all(set).then(val => console.log('Promise.all', val))

// promise 并发 计数器

Promise._all = function (it) {
  // 空值
  // 字符串, iterator
  // 循环异步问题，循环结束，异步不一定执行✅
  // 计数器累加
  // Array.from 和 [...arr]的区别
  return new Promise((resolve, reject) => {
    const arr = [...it]
    if (arr.length === 0) resolve(arr)
    const ret = []
    let idx = 0
    const resolveData = (data, key) => {
      // 这里输出 [pending, resolved, resolved]
      // promise 在 task 末尾执行回调
      ret[key] = data
      // 这里计数器算完才结束
      if (++idx === arr.length) resolve(ret)
    }
    for (const [key, val] of arr.entries()) {
      Promise.resolve(val).then(
        data => resolveData(data, key),
        r => reject(r)
      )
    }
  })
}

// 循环 + 异步
// reduce 本质还是遍历
// reduce + promise 可以串行，本质还是回调
// for ... of + await,生成器

Promise._all(new Set([])).then(val => console.log('Promise._all', val))

// Promise.all的完成体应该符合以下特征：

// 输入为Iterator类型的参数，可以是Array，Map， Set，String ，可能也得包括魔改的Iterator（Symbol.iterator）之类
// 若输入的可迭代数据里不是Promise，则也需要原样输出
// 返回一个Promise实例，可以调用then和catch方法
// 输出在then里体现为保持原顺序的数组
// 输出在catch体现为最早的reject返回值
// 空 Iterator， resolve返回空数组

// const all = (...promises) => {
//   const results = [];

//   const merged = promises.reduce(
//     (acc, p) => acc.then(() => p).then(r => results.push(r)),
//     Promise.resolve(null));

//   return merged.then(() => results);
// };
```

### Promise.prototype.finally

```js
// 无论当前 Promise 是成功还是失败，调用finally之后都会执行 finally 中传入的函数，并且将值原封不动的往下传。

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('p1')
  }, 3000)
})

// 第一步 cb 无论成功与否都执行
// finally 后面海可以then 所以返回值是一个 promise
// 第二部 透传值，cb执行后传值
// 第三部 cb 有返回值 需要等待，cb 是立即执行的 但返回值是一个异步需要等待完成在透传值
// 最外层函数返回一个promise 里层函数也返回一个promise

Promise.prototype._finally = function (cb) {
  return this.then(
    data => {
      return Promise.resolve(cb()).then(() => data)
    },
    r => {
      // 等待
      return Promise.resolve(cb()).then(() => {
        throw r
      })
    }
  )
}

p1.then()
  ._finally(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, 2000)
    })
  })
  .then(val => console.log(val))
```

### Promise.allSettled

```js
// 一旦所指定的 promises 集合中每一个 promise 已经完成，无论是成功的达成或被拒绝，未决议的 Promise将被异步完成。那时，所返回的 promise 的处理器将传入一个数组作为输入，该数组包含原始 promises 集中每个 promise 的结果

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('p1')
  }, 3000)
})

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error('p2'))
    // resolve('p2')
  }, 2000)
})

const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    // reject(new Error('p3'))
    resolve('p3')
  }, 1000)
})

Promise.allSettled([1, 2, 3, p1, p2, p3]).then(data => {
  console.log(data)
})

Promise._allSettled = it => {
  return new Promise(resolve => {
    const arr = [...it]
    if (arr.length === 0) resolve(arr)
    const ret = []
    let idx = 0
    for (const [k, v] of arr.entries()) {
      Promise.resolve(v).then(
        value => {
          ret[k] = { status: 'fulfilled', value }
          ++idx === arr.length && resolve(ret)
        },
        reason => {
          ret[k] = { status: 'rejected', reason }
          ++idx === arr.length && resolve(ret)
        }
      )
    }
  })
}

Promise._allSettled([1, 2, 3, p1, p2, p3]).then(data => {
  console.log(data)
})
```

### Promise.any

```js
// 有成功一个就返回成功的那个，全失败才返回失败，空数组失败，与 race 的区别，race 失败了就会返回失败
// 注意点 是 all 的反方向

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error('p1'))
    // resolve('p1')
  }, 3000)
})

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error('p2'))
    // resolve('p2')
  }, 2000)
})

// 会冒泡
const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error('p3'))
    // resolve('p3')
  }, 1000)
})

// const test = [p1, p2, p3]

Promise.any([]).then(
  val => {
    console.log(val)
  },
  err => console.log(err instanceof Error)
)

Promise._any = it => {
  return new Promise((resolve, reject) => {
    const arr = [...it]
    const ret = []
    if (arr.length === 0) reject(ret)
    let idx = 0
    for (const [k, v] of arr.entries()) {
      Promise.resolve(v).then(
        data => resolve(data),
        r => {
          // err 怎么处理，err 子类
          ret[k] = r
          if (++idx === arr.length) {
            reject(ret)
          }
        }
      )
    }
  })
}

Promise._any([]).then(
  val => {},
  err => {
    console.log(err instanceof Error)
  }
)
```

### Promise.prototype.catch

```js
// 注意点 catch 的返回值是个 promise
// catch 是包了一层函数的 then，相当于代理了一层

const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error('我是错误'))
  }, 1000)
})

p.catch(reason => {
  console.log(reason)
})

Promise.prototype._catch = function (onRejected) {
  return this.then(null, onRejected)
}

p._catch(reason => {
  console.log(reason)
})
```

### Promise.resolve

```js
const promise1 = (function () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('我是 promise1，我已经 resolve 了')
    }, 1000)
  })
})()

// promise 实例
console.log(Promise.resolve(promise1) === promise1) // true

// 即 鸭子类型判断符合 isPromise 的对象
const thenable = {
  then(resolve) {
    resolve('我是thenable对象')
  }
}
//  普通类型
Promise.resolve(1).then(data => {
  console.log(data)
})

Promise.resolve(thenable).then(data => {
  console.log(data)
})

// 三种情况
// 已经 resolved 的 实例 返回本身
// thenable 对象调用它自身的 resolve
// 其余 resolve 包一下
Promise.myResolve = promise => {
  if (promise instanceof Promise) return promise
  return new Promise(resolve => {
    if (promise && promise.then && typeof promise.then === 'function') {
      // 传入 promise 的 resolve 方法,相当于 resolve 执行了
      promise.then(resolve)
    } else {
      resolve(promise)
    }
  })
}

console.log(Promise.myResolve(promise1) === promise1) // true

Promise.myResolve(thenable).then(data => {
  console.log(data)
})

Promise.myResolve(1).then(data => {
  console.log(data)
})
```

### Promise.race

```js
// race 只要有一个 promise 执行完，直接 resolve 并停止执行。

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('p1')
  }, 3000)
})

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    // reject(new Error('p2'))
    resolve('p2')
  }, 2000)
})

const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    // reject(new Error('p3'))
    resolve('p3')
  }, 1000)
})

const test = [p1, p2, p3]

Promise.race(test).then(val => {
  console.log(val)
})

Promise._race = it => {
  return new Promise((resolve, reject) => {
    const promises = [...it]
    if (promises.length === 0) resolve([])
    promises.forEach(promise =>
      Promise.resolve(promise).then(
        data => resolve(data),
        r => reject(r)
      )
    )
  })
}

Promise._race(new Set(test)).then(val => {
  console.log(val)
})
```

### resolve

```js
// 应用
Promise.resolve(100)
  .then()
  .then(() => 1000)
  .then(val => console.log(val))
// then 中的值如果不传递，有可能会丢失，resolve成功参数不处理默认会向下传递，不处理，下一次可能丢失

Promise._resolve = function (props) {
  console.log(props)
  // 考虑 thenable 对象
  return new Promise((resolve, reject) => {
    resolve(props)
  })
  // return (props instanceof Promise ? props : new Promise((resolve, reject) => {
  //  resolve(props)
  // }))
}

// 应用
Promise._resolve(Promise.resolve(100)).then(val => console.log(val))
```

### scheduler

```js
/**
 * 题目：JS 实现异步调度器
 * 要求：
 *  JS 实现一个带并发限制的异步调度器 Scheduler，保证同时运行的任务最多有 2 个
 *  完善下面代码中的 Scheduler 类，使程序能正确输出
 */

//  当前执行并发大于2时，生成一个暂停的Promise，把resolve添到一个数组中，下面的代码被暂停执行
//  当前执行并发不大于2,立即执行异步操作并从数组中弹出最先push的resolve改变Promise的状态，
//  由于Promise被解决，最初被暂停的代码可以继续执行

//  如果Promise的resolve, reject没有执行会怎么样？
//  在Promise的外部执行resolve, reject可以改变Promise的状态吗？

class Scheduler {
  constructor(maxNum) {
    this.taskList = []
    this.count = 0
    this.maxNum = maxNum // 最大并发数
  }
  async add(promiseCreator) {
    // 如果当前并发超过最大并发，那就进入任务队列等待
    if (this.count >= this.maxNum) {
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

    if (this.taskList.length) {
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
const addTack = (time, order) => {
  return scheduler.add(() => timeout(time)).then(() => console.log(order))
}
addTack(1000, '1') // scheduler.add(() => promise|1000)
addTack(500, '2') // scheduler.add(() => promise|500)
addTack(300, '3') // scheduler.add(() => promise|300)
addTack(400, '4') // scheduler.add(() => promise|400)

// 输出：2 3 1 4
// 一开始，1、2 两个任务进入队列
// 500ms 时，完成 2，输出 2，任务 3 进队
// 800ms 时，完成 3，输出 3，任务 4 进队
// 1000ms 时，完成 1，输出 1，没有下一个进队的
// 1200ms 时，完成 4，输出 4，没有下一个进队的
// 进队完成，输出 2 3 1 4

// class Scheduler {
//   constructor() {
//     this.queue = [];
//     this.maxCount = 2;
//     this.runCounts = 0;
//   }
//   add(promiseCreator) {
//     this.queue.push(promiseCreator);
//   }
//   taskStart() {
//     for (let i = 0; i < this.maxCount; i++) {
//       this.request();
//     }
//   }
//   request() {
//     if (!this.queue || !this.queue.length || this.runCounts >= this.maxCount) {
//       return;
//     }
//     this.runCounts++;

//     this.queue.shift()().then(() => {
//       this.runCounts--;
//       this.request();
//     });
//   }
// }

// const timeout = time => new Promise(resolve => {
//   setTimeout(resolve, time);
// })

// const scheduler = new Scheduler();

// const addTask = (time,order) => {
//   scheduler.add(() => timeout(time).then(()=>console.log(order)))
// }

// addTask(1000, '1');
// addTask(500, '2');
// addTask(300, '3');
// addTask(400, '4');

// scheduler.taskStart()
```

## Generator

```js
function* gen() {
  yield '1'
  yield '2'
  yield '3'
  yield '4'
  return 'ret'
}

const it = gen()

console.log(it.next()) // {value: '1', done: false}
console.log(it.next()) // {value: '2', done: false}
console.log(it.next()) // {value: '3', done: false}
console.log(it.next()) // {value: '4', done: false}
// for of 会忽略 'ret'
console.log(it.next()) // {value: 'ret', done: true}
// console.log(it.next()) // {value: 'undefined', done: true}

function* _gen(gen) {
  console.log(gen)
  const yield1 = yield '1'
  console.log(yield1)
  const yield2 = yield '2'
  console.log(yield2)
  const yield3 = yield '3'
  console.log(yield3)
  const yield4 = yield '4'
  console.log(yield4)
  return 'ret'
}

const _it = _gen('gen') // 生成器函数并不执行

console.log(_it.next()) // 第一次执行遇到 yield 停止 // gen
console.log(_it.next('yield1')) // '1' 执行，next传参数是
console.log(_it.next('yield2')) // '2'
console.log(_it.next('yield3')) // '3'
console.log(_it.next('yield4')) // '4' 直到结束 返回 'ret'

// 以上就是 gen 特征

// g()并不会执行g函数，返回的也不是函数运行结果，而是一个指向内部状态的指针对象，也就是迭代器对象（Iterator Object）

// 提问：如果g函数没有yield和return语句呢？
// 答：第一次调用next就返回{value: undefined, done: true}，之后也是{value: undefined, done: true}。

// 每个迭代器之间互不干扰，作用域独立。

// 由于yield永远返回undefined，这时候，如果有了next方法的参数，yield就被赋了值，比如下例，原本a变量的值是0，但是有了next的参数，a变量现在等于next的参数，也就是11。

// 提问：第一个.next()可以有参数么？ 答：设这样的参数没任何意义，因为第一个.next()的前面没有yield语句。

// 以上面代码的return语句返回的6，不包括在for...of循环之中。
// function* fibonacci() {
//   let [prev, curr] = [0, 1]
//   for (;;) {
//     // 这里请思考：为什么这个循环不设定结束条件？
//     ;[prev, curr] = [curr, prev + curr]
//     yield curr
//   }
// }

// for (const n of fibonacci()) {
//   if (n > 1000) {
//     break
//   }
//   console.log(n)
// }
```

### iterator

```js
// const arr = [1, 2, 3, 4]

// const iterator = arr[Symbol.iterator]()

// console.log(Object.getPrototypeOf(iterator))

// console.log(iterator.next()) // { value: 1, done: false }
// console.log(iterator.next()) // { value: 2, done: false }
// console.log(iterator.next()) // { value: 3, done: false }
// console.log(iterator.next()) // { value: 4, done: false }
// console.log(iterator.next()) // { value: undefined, done: true }

// 计数器实现 iterator

// Array.from 和 [...arr]的区别

const arrLike = {
  0: '0',
  1: '1',
  2: '2',
  length: 3
}

// console.log([...arrLike]) // TypeError: arrLike is not iterable
// console.log(Array.from(arrLike)) // ['0', '1', '2']

const arrLikeToIt = {
  0: '0',
  1: '1',
  2: '2',
  length: 3,
  // [Symbol.iterator]() {
  //  let idx = 0
  //  return {
  //   next: () => ({
  //    value: this[idx],
  //    done: idx++ === this.length
  //   })
  //  }
  // }
  *[Symbol.iterator]() {
    for (let i = 0; i < this.length; i++) {
      yield this[i]
    }
  }
}

console.log([...arrLikeToIt])
```

### generator 实现原理

```js
const context = {
  next: 0,
  prev: 0,
  done: false,
  stop: function () {
    this.done = true
  }
}

function gen(context) {
  // while (1) {
  switch ((context.prev = context.next)) {
    case 0:
      context.next = 2
      return 'result1'

    case 2:
      context.next = 4
      return 'result2'

    case 4:
      context.next = 6
      return 'result3'

    case 6:
      context.stop()
      return undefined
  }
  // }
}

const foo = function () {
  return {
    next: function () {
      return {
        value: gen(context),
        done: context.done
      }
    }
  }
}

// 发现它是每生foo()执行一次 ，就会执行一次wrap方法，而在wrap方法里就会new 一个Context对象。这就说明了每个迭代器的context是独立的。

// 我们定义的function*生成器函数被转化为以上代码

// 转化后的代码分为三大块：

// gen$(_context)由yield分割生成器函数代码而来

// context对象用于储存函数执行上下文

// 迭代器法定义next()，用于执行gen$(_context)来跳到下一步

// 从中我们可以看出，「Generator实现的核心在于上下文的保存，函数并没有真的被挂起，每一次yield，其实都执行了一遍传入的生成器函数，只是在这个过程中间用了一个context对象储存上下文，使得每次执行生成器函数的时候，都可以从上一个执行结果开始执行，看起来就像函数被挂起了一样」
```

### co

```js
const fs = require('fs').promises
const path = require('path')

// promise 串行 值会透传
// fs.readFile(path.resolve(__dirname, 'test.txt'))
//  .then(data => data.toString())
//  .then(data => fs.readFile(path.resolve(__dirname, data)))
//  .then(data => console.log(data.toString()))

// async
// async function read() {
//  const name = await fs.readFile(path.resolve(__dirname, 'test.txt'))
//  const data = await fs.readFile(path.resolve(__dirname, name.toString()))
//  return data.toString()
// }

// read().then(data => {
//  console.log(data)
// })

// generator 串行
// function read() {
//  return new Promise((resolve, reject) => {
//   function * gen() {
//    const name = yield fs.readFile(path.resolve(__dirname, 'test.txt')).then(data => {
//     it.next(data.toString())
//    })
//    const data = yield fs.readFile(path.resolve(__dirname, name)).then(data => {
//     it.next(data.toString())
//    })
//    resolve(data)
//   }
//   const it = gen()
//   it.next()
//  })
// }

// read().then(data => console.log(data))

function* gen() {
  const name = yield fs.readFile(path.resolve(__dirname, 'test.txt'))
  const data = yield fs.readFile(path.resolve(__dirname, name.toString()))
  return data
}

// const it = gen()
// const { value, done } = it.next()

// Promise.resolve(value).then(data => {
//  const { value, done } = it.next(data)
//  Promise.resolve(value).then(data => {
//   const { value, done } = it.next(data)
//   console.log(value, done)
//  })
// })

// 找规律 递归

function co(it) {
  return new Promise((resolve, reject) => {
    const next = data => {
      const { value, done } = it.next(data)
      if (!done) {
        Promise.resolve(value).then(
          data => {
            next(data)
          },
          r => {
            it.throw(r)
            reject(r)
          }
        )
      } else {
        resolve(value)
      }
    }
    next()
  })
}

co(gen()).then(data => {
  console.log(data)
})

// 完美
// co 执行就会返回一个 resolved 的 promise
// async 一执行也会返回一个 resolve 的 promise
```

### promisify

```js
const fs = require('fs')
const path = require('path')

fs.readFile(path.resolve(__dirname, 'test.txt'), 'utf-8', (err, data) => {
  if (err) {
    console.log(err)
  } else {
    console.log(data)
  }
})

const promisify = readFile => {
  return (...args) => {
    return new Promise((resolve, reject) => {
      readFile(...args, (err, data) => {
        if (err) reject(err)
        resolve(data)
      })
    })
  }
}

const promises = fs => {
  for (const [k, v] of Object.entries(fs)) {
    if (typeof v === 'function') {
      fs[k] = promisify(v)
    }
  }
  return fs
}

const _fs = promises(fs)

_fs.readFile(path.resolve(__dirname, 'test.txt'), 'utf-8').then(data => {
  console.log(data)
})
```
