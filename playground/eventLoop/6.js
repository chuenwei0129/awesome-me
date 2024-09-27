console.log('start');

process.nextTick(() => {
  console.log('tick1');
  process.nextTick(() => {
    console.log('tick2');
  });
});

Promise.resolve().then(() => {
  console.log('promise1');
  process.nextTick(() => {
    console.log('tick3');
  });
  Promise.resolve().then(() => {
    console.log('promise2');
  });
});
