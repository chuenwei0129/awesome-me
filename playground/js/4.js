setImmediate(() => {
  console.log(3);
});

setTimeout(() => {
  console.log(2);
  setTimeout(() => {
    console.log('setTimeout');
  });
}, 10);

setTimeout(() => {
  console.log(7);
}, 20);

Promise.resolve().then(() => {
  console.log(1);
});

// process.nextTick(() => {
//   console.log(4);
// });

queueMicrotask(() => {
  console.log(6);
});

console.log(5);

let now = Date.now();
while (Date.now() - now < 100) {}

// 541623
