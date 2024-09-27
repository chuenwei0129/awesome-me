function sleep(milliseconds) {
  const start = new Date().getTime();
  while (new Date().getTime() - start < milliseconds) {
    // 此循环会阻塞执行，直到指定的毫秒数过去
  }
}

setTimeout(() => {
  console.log('setTimeout1');
  queueMicrotask(() => {
    console.log('queueMicrotask1');
  });
}, 10);

setTimeout(() => {
  console.log('setTimeout2');
  queueMicrotask(() => {
    console.log('queueMicrotask2');
  });
}, 15);

sleep(100);

setTimeout(() => {
  console.log('setTimeout3');
  queueMicrotask(() => {
    console.log('queueMicrotask3');
  });
}, 10);

sleep(100);
