const fs = require('fs').promises
const path = require('path')

// 需求: 读取 co.txt 文件，获得文件内容所写的 './bind.js' 路径，再依据该路径读取文件内容，并打印出来

// promise 写法
fs.readFile(path.resolve(__dirname, 'co.txt'))
  .then(data => data.toString().split('\n')[0])
  .then(data => fs.readFile(path.resolve(__dirname, data)))
  .then(data => console.log('promise', data))

// async 写法
async function read() {
  const address = await fs.readFile(path.resolve(__dirname, 'co.txt'))
  const data = await fs.readFile(path.resolve(__dirname, address.toString().split('\n')[0]))
  return data
}

read().then(data => {
  console.log('async', data)
})

// generator 写法 1
// 不考虑错误处理，仅仅是为了演示 generator 写法
function read() {
  return new Promise(resolve => {
    function* gen() {
      const address = yield fs.readFile(path.resolve(__dirname, 'co.txt')).then(data => {
        it.next(data.toString().split('\n')[0])
      })
      const data = yield fs.readFile(path.resolve(__dirname, address)).then(data => {
        it.next(data)
      })
      resolve(data)
    }
    const it = gen()
    it.next()
  })
}

read().then(data => console.log('generator 1', data))

// generator 写法 2
function* g() {
  const address = yield fs.readFile(path.resolve(__dirname, 'co.txt'))
  const data = yield fs.readFile(path.resolve(__dirname, address.toString().split('\n')[0]))
  return data
}

const it = g()
const { value } = it.next()

Promise.resolve(value).then(data => {
  const { value } = it.next(data)
  Promise.resolve(value).then(data => {
    const { value } = it.next(data)
    console.log('generator 2', value)
  })
})

// generator 写法 2 找规律 => 通用模板
function co(it) {
  return new Promise((resolve, reject) => {
    const next = data => {
      const { value, done } = it.next(data)
      if (!done) {
        Promise.resolve(value).then(
          data => {
            next(data)
          },
          r => {
            it.throw(r)
            reject(r)
          }
        )
      } else {
        resolve(value)
      }
    }
    next()
  })
}

co(g()).then(data => {
  console.log('co', data)
})

// 完美
// co 执行就会返回一个 resolved 的 promise
