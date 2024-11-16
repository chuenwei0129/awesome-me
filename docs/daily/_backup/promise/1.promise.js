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

  then(onResolved, onRejected) {
    if (this.state === 'resolved') {
      onResolved(this.value);
    }

    if (this.state === 'rejected') {
      onRejected(this.reason);
    }

    if (this.state === 'pending') {
      this.resolvedCallbacks.push(() => {
        onResolved(this.value);
      });
      this.rejectedCallbacks.push(() => {
        onRejected(this.reason);
      });
    }
  }
}

module.exports = MyPromise;

const p = new MyPromise((resolve, reject) => {
  // 1. resolve(100);
  resolve(100);
});

p.then(
  (x) => {
    console.log(x);
  },
  (y) => {
    console.log(y);
  },
);

const p2 = new MyPromise((resolve, reject) => {
  // 2. reject(200);
  reject(200);
});

p2.then(
  (x) => {
    console.log(x);
  },
  (y) => {
    console.log(y);
  },
);

const p3 = new MyPromise((resolve, reject) => {
  // 3. throw new Error('error');
  throw new Error('error');
});

p3.then(
  (x) => {
    console.log(x);
  },
  (y) => {
    console.log(y);
  },
);

const p4 = new MyPromise((resolve, reject) => {
  // 4. 多次调用 resolve 或者，resolve 和 reject 一起调用
  resolve(100);
  reject(200); // 被忽略
});

p4.then(
  (x) => {
    console.log(x);
  },
  (y) => {
    console.log(y);
  },
);

const p5 = new MyPromise((resolve, reject) => {
  // 5. 异步 resolve
  setTimeout(() => {
    resolve(100);
  });
});

p5.then(
  (x) => {
    console.log(x);
  },
  (y) => {
    console.log(y);
  },
);
