## 2\. 输出是什么？

```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1)
}

for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1)
}
```

<details><summary><code>结果：</code></summary>

<!-- TODO -->

</details>

---

```js
const promise = new Promise((resolve, reject) => {
  console.log(1);
  resolve('success')
  console.log(2);
});

promise.then(() => {
  console.log(3);
});

console.log(4);
```

```js
console.log('start')
setTimeout(() => {
  console.log('time')
})
Promise.resolve().then(() => {
  console.log('resolve')
})
console.log('end')
```

```js
const promise = new Promise((resolve, reject) => {
  console.log(1);
  setTimeout(() => {
    console.log("timerStart");
    resolve("success");
    console.log("timerEnd");
  }, 0);
  console.log(2);
});
promise.then((res) => {
  console.log(res);
});
console.log(4);
```

```js
setTimeout(() => {
  console.log('timer1');
  Promise.resolve().then(() => {
    console.log('promise');
  });
}, 0);

setTimeout(() => {
  console.log('timer2');
}, 0);

console.log('start');
```

```js
Promise.resolve().then(() => {
  console.log('promise1');
  const timer2 = setTimeout(() => {
    console.log('timer2')
  }, 0)
});
const timer1 = setTimeout(() => {
  console.log('timer1')
  Promise.resolve().then(() => {
    console.log('promise2')
  })
}, 0)
console.log('start');
```

<!-- 要说的是，setTimeout 的回调函数是异步执行的，所以先执行了 start，然后执行了 promise1，然后执行了 timer1，最后执行了 promise2，timer2。上下顺序是正确的。 -->

岂有回头剑？

# 剑未佩妥，出门已是江湖。

出门一步，便是江湖。

