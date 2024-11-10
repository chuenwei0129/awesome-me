const MyPromise = require('./2.promise');

MyPromise.resolve = (x) => {
  if (x instanceof MyPromise) {
    return x;
  } else {
    return new MyPromise((resolve) => {
      resolve(x);
    });
  }
};

MyPromise.resolve(2).then((res) => {
  console.log('MyPromise: ', res);
});

console.log(1);

Promise.resolve(2).then((res) => {
  console.log('Promise: ', res);
});

// 这会造成一个死循环
// const thenable = {
//   then: (resolve) => {
//     resolve(thenable);
//   },
// };

// Promise.resolve(thenable);

// -----
// catch
MyPromise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected);
};

// any
const pA1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('pA1');
  }, 1000);
});

const pA2 = Promise.reject('pA2');

const pA3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('pA3');
  }, 1000);
});

Promise.any([]).catch((err) => {
  console.log(err);
});

Promise.any([pA1, pA2]).catch((err) => {
  console.log(err);
});

Promise.any(['success', pA3]).then((res) => {
  console.log(res);
});

MyPromise.any = function (it) {
  return new MyPromise((resolve, reject) => {
    if (it.length === 0)
      reject(new AggregateError('All promises were rejected'));
    let count = 0;
    it.forEach((item) => {
      MyPromise.resolve(item).then(
        (res) => {
          resolve(res);
        },
        () => {
          if (++count === it.length) {
            reject(new AggregateError('All promises were rejected'));
          }
        },
      );
    });
  });
};
