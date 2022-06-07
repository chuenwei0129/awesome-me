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
