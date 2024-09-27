setTimeout(() => {
  setImmediate(() => {
    console.log('setImmediate');
  });

  setTimeout(() => {
    console.log('setTimeout');
  }, 0);
}, 0);

// timer1 -> check -> timer2

setImmediate(() => {
  setImmediate(() => {
    console.log('setImmediate');
  });

  setTimeout(() => {
    console.log('setTimeout');
  }, 0);
});

// check -> timer（可能超时也可能不超时，超时就 timer 先执行） -> check
// check -> timer(不超时) -> check -> timer(超时)
