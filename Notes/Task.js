// 异步 task
// Task函子通过类似 Promise的 resolve的风格来声明一个异步流程
// FP中除了容器( Container),也可以用上下文( Context)来称呼包裏了ー个值的结构
// Promisee的任务是立刻执行的,Task是在调用的时候才开始执行

// 函数式编程new对象 static of内部也是要new对象 类和new对都不是必须的

// 递归嵌套，闭包保存
// 延迟 promise 执行
// 映射的都是值
const Task = execute => ({
  execute,
  map: f => Task(resolve => execute(x => resolve(f(x)))),
  flatMap: g => Task(resolve => execute(x => g(x).execute(resolve)))
})

const get = url => {
  if (url === 'data') {
    return Promise.resolve(JSON.stringify({ code: 0, userId: '1' }))
  }
  if (url === '1') {
    return Promise.resolve(JSON.stringify({ id: 1, name: `chu`, age: 18 }))
  }
}

const request = url => Task(resolve => get(url).then(resolve))

// execute 是 resolve => get(url).then(resolve)
// execute 的参数 console.log 就是 resolve
// 最后执行 get(url).then(console.log)

// Task 就是菡子
request('data')
  .map(JSON.parse)
  .map(x => x.userId)
  .flatMap(request)
  .map(JSON.parse)
  .execute(console.log)
