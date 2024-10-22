const throttle = (func, delay) => {
  let lastRunTime = 0;
  return function (...args) {
    const currentRunTime = Date.now();
    if (currentRunTime - lastRunTime > delay) {
      func.call(this, ...args);
      lastRunTime = currentRunTime;
    }
  };
};
