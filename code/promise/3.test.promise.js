const p = new Promise((resolve) => {
  resolve('The first promise has resolved');
});

// 和内部使用微任务包裹一样理解
// () => promise2，promise2 无法拿到
const promise2 = p.then(() => promise2);

// promise2.catch((err) => console.log(err));
promise2.then(null, (err) => console.log(err));
