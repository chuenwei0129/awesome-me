function LazyMan(name) {
  console.log(`Hi I am ${name}`);
  const tasks = [];

  const next = () => {
    const task = tasks.shift();
    if (task) {
      task();
    }
  };

  const api = {
    sleep(seconds) {
      tasks.push(() => {
        setTimeout(() => {
          console.log(`等待了${seconds}秒...`);
          next();
        }, seconds * 1000);
      });
      return api;
    },
    sleepFirst(seconds) {
      tasks.unshift(() => {
        setTimeout(() => {
          console.log(`等待了${seconds}秒...`);
          next();
        }, seconds * 1000);
      });
      return api;
    },
    eat(food) {
      tasks.push(() => {
        console.log(`I am eating ${food}`);
        next();
      });
      return api;
    },
  };

  // 启动任务队列
  setTimeout(next, 0);

  return api;
}

// 示例使用
// LazyMan('Tony').sleep(10).eat('lunch');
LazyMan('Tony').eat('lunch').sleep(10).eat('dinner');
// LazyMan('Tony')
//   .eat('lunch')
//   .eat('dinner')
//   .sleepFirst(5)
//   .sleep(10)
//   .eat('junk food');
