class LazyManHelper {
  constructor(name) {
    this.name = name;
    this.tasks = [];

    console.log(`Hi I am ${name}`);

    // 确保任务的执行在同步代码后执行。
    setTimeout(() => {
      this.runTasks();
    }, 0);
  }

  runTasks = () => {
    this.tasks.reduce((promise, task) => promise.then(task), Promise.resolve());
  };

  sleep = (seconds) => {
    this.tasks.push(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            console.log(`等待了${seconds}秒...`);
            resolve();
          }, seconds * 1000);
        }),
    );
    return this;
  };

  sleepFirst = (seconds) => {
    this.tasks.unshift(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            console.log(`等待了${seconds}秒...`);
            resolve();
          }, seconds * 1000);
        }),
    );
    return this;
  };

  eat = (food) => {
    this.tasks.push(
      () =>
        new Promise((resolve) => {
          console.log(`I am eating ${food}`);
          resolve();
        }),
    );
    return this;
  };
}

// 包装函数，使调用更加符合题目要求
function LazyMan(name) {
  return new LazyManHelper(name);
}

// LazyMan('Tony');
// // Hi I am Tony

// LazyMan('Tony').sleep(10).eat('lunch');
// Hi I am Tony
// 等待了10秒...
// I am eating lunch

// LazyMan('Tony').eat('lunch').sleep(10).eat('dinner');
// Hi I am Tony
// I am eating lunch
// 等待了10秒...
// I am eating diner

LazyMan('Tony')
  .eat('lunch')
  .eat('dinner')
  .sleepFirst(5)
  .sleep(10)
  .eat('junk food');
// Hi I am Tony
// 等待了5秒...
// I am eating lunch
// I am eating dinner
// 等待了10秒...
// I am eating junk food
