console.log(1);

Promise.resolve().then(() => {
  console.log(4);
});

process.nextTick(() => {
  console.log(2);
});