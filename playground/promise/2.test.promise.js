const p1 = new Promise((resolve) => {
  resolve('The first promise has resolved');
});

const p2 = new Promise((resolve) => {
  resolve('The second promise has resolved');
});

// then 返回值是一个普通值
p1.then(() => false)
  .then(() => {
    console.log('1');
  })
  .then(() => {
    console.log('2');
  })
  .then(() => {
    console.log('3');
  });

// then 返回值是一个 promise
// 会多消耗 2 个 then 序列
p1.then(() => p2).then(() => {
  console.log('4');
});
