const resolvePromise = (promise2, x, resolve, reject) => {
  // 如果 promise2 和 x 指向同一对象，以 TypeError 为据因拒绝执行 promise2
  if (promise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise'));
  }
  // 严谨判断：如果 x 是一个 Promise 对象，则采用它的状态，
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    // 没搞懂为什么要加这个 called 变量，但是为了通过测试，这里加上
    let called = false;
    try {
      // 此处 catch 是防止 proxy 对象的 then 方法报错
      const then = x.then;
      // 如果 then 是函数，则是 promise
      if (typeof then === 'function') {
        then.call(
          x,
          (y) => {
            if (called) return;
            called = true;
            // y 是 onResolved 的参数，也就是需要 resolve 的值，但此处 y 可能还是一个 promise，所以递归调用 resolvePromise，直到它是一个普通值
            // 已知道 y 为普通值时，消耗了一个 then 序列，此时 y 为 promise 则可能消耗更多 then 序列，至少两个。
            resolvePromise(promise2, y, resolve, reject);
          },
          (r) => {
            if (called) return;
            called = true;
            reject(r);
          },
        );
      } else {
        // 如果 then 不是函数，则是普通 then able 对象，直接 resolve
        // {then: 1}
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

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  // then 方法返回一个新的 Promise 对象，以便进行链式调用
  then(onResolved, onRejected) {
    if (typeof onResolved !== 'function') {
      // If `onFulFilled` is not a function and `promise1` is fulfilled, `promise2` must be fulfilled with the same value
      // eslint-disable-next-line no-param-reassign
      onResolved = (value) => value;
    }

    if (typeof onRejected !== 'function') {
      // If `onRejected` is not a function and `promise1` is rejected, `promise2` must be rejected with the same reason
      // eslint-disable-next-line no-param-reassign
      onRejected = (reason) => {
        throw reason;
      };
    }

    const promise2 = new MyPromise((resolve, reject) => {
      if (this.state === 'resolved') {
        // if x 是 Promise 则
        // new promise2((resolve) => {
        //   x.then(data => resolve(data))
        // });
        // if x 是普通值 则
        // new promise2((resolve) => {
        //   resolve(x)
        // });
        queueMicrotask(() => {
          try {
            const x = onResolved(this.value);
            // 由于 new MyPromis 执行时会立即执行 executor 函数，此时 promise2 还未赋值，所以需要个微任务处理。
            resolvePromise(promise2, x, resolve, reject);
            // 由于微任务处理，如果此时 onResolved 内部报错，由于只 catch 了 executor 内部的错误，但微任务调用栈冒泡不到 executor，所以需要在此处 catch 错误。
          } catch (error) {
            reject(error);
          }
        });
      }

      if (this.state === 'rejected') {
        // 从这可以看出来，catch 住错误后，promise 链也不会断，如果 第二个函数为 () => 1，则 promise 链会继续，且状态为 resolved，值为 1。
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

// aplus 测试套件
MyPromise.defer = MyPromise.deferred = function () {
  const dfd = {};
  dfd.promise = new MyPromise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
};

// resolve
MyPromise.resolve = (x) => {
  if (x instanceof MyPromise) {
    return x;
  } else {
    return new MyPromise((resolve) => {
      resolve(x);
    });
  }
};

module.exports = MyPromise;
