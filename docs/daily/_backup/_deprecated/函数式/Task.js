// FP中除了容器( Container),也可以用上下文( Context)来称呼包裏了ー个值的结构
// Promisee的任务是立刻执行的,Task是在调用的时候才开始执行

const Task = (execute) => ({
  execute,
  map: (f) => Task((resolve) => execute((x) => resolve(f(x)))),
  flatMap: (g) => Task((resolve) => execute((x) => g(x).execute(resolve))),
})

const get = (url) => {
  if (url === 'data') {
    return Promise.resolve(JSON.stringify({ code: 0, userId: '1' }))
  }
  if (url === '1') {
    return Promise.resolve(JSON.stringify({ id: 1, name: `chu`, age: 18 }))
  }
}

// Promise的任务是立刻执行的,Task是在调用的时候才开始执行
const request = (url) => Task((resolve) => get(url).then(resolve))

// execute 是 resolve => get(url).then(resolve)
// execute 的参数 console.log 就是 resolve
// 最后执行 get(url).then(console.log)

// Task 就是菡子
request('data')
  .map(JSON.parse)
  .map((x) => x.userId)
  .flatMap(request)
  .map(JSON.parse)
  .execute(console.log)
