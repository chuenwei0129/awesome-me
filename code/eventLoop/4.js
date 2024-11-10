setTimeout(() => {
  setImmediate(() => {
    console.log('setImmediate');
    queueMicrotask(() => {
      console.log('queueMicrotask1');
    });
  });

  setTimeout(() => {
    console.log('setTimeout');
    queueMicrotask(() => {
      console.log('queueMicrotask2');
    });
  }, 0);
}, 0);
