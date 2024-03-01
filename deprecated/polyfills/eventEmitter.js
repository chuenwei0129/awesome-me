const l = {
  tasks: [],
  caches: [],
  on(name, fn) {
    this.caches.length > 0
      ? this.caches.forEach((cache, idx) => {
          if (name in cache) {
            fn(...cache[name])
            this.caches.splice(idx, 1)
          }
        })
      : this.tasks.push({ [name]: fn })
  },
  emit(name, ...args) {
    // 有可能一种情况 tasks 没任务但触发了 emit
    this.tasks.length === 0 && name && this.caches.push({ [name]: [...args] })
    this.tasks.forEach(task => {
      if (task[name]) {
        task[name](...args)
      } else {
        this.caches.push({ [name]: [...args] })
      }
    })
  },
  off(name) {
    this.tasks.forEach((task, idx) => {
      if (name in task) {
        this.tasks.splice(idx, 1)
      }
    })
  },
  once(name, fn) {
    this.on(name, (...args) => {
      // 特殊的 on 代理一层
      fn(...args)
      this.off(name)
    })
  }
}

// 先 emit 后 on
l.emit('world', 'world')
l.emit('test', 'test')
l.on('world', h => console.log(h)) // world
console.log('caches', l.caches) // caches [ { test: [ 'test' ] } ]
l.on('test', h => console.log(h)) // test
console.log('caches', l.caches) // caches []

// 先 on
l.on('hello', h => console.log(h))
l.emit('hello', 'hello') // 'hello'
l.emit('hello', 'hello') // 'hello'

console.log('tasks', l.tasks) // tasks [ { hello: [Function] } ]

l.off('hello')

console.log('tasks', l.tasks) // tasks []

l.once('world', h => console.log(h))
l.emit('world', 'world') // world

console.log('tasks', l.tasks) // tasks []
