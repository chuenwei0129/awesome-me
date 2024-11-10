const p = new Promise((resolve) => {
  resolve('--1');
});

// 因为 promise 内部实现套了一个微任务，所以即使 resolve 是同步，也要晚执行。
p.then((x) => {
  console.log(x);
});

console.log('--2');
