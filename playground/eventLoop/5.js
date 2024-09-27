console.log('start');

process.nextTick(() => {
  console.log('tick1');
});

setTimeout(() => {
  setImmediate(() => {
    console.log('setImmediate');
    process.nextTick(() => {
      console.log('tick2');
    });
  });

  setTimeout(() => {
    console.log('setTimeout');
    process.nextTick(() => {
      console.log('tick3');
    });
  }, 0);
});
