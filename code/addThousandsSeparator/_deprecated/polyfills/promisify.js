const fs = require('fs')
const path = require('path')

// callback 写法
fs.readFile(path.resolve(__dirname, 'co.txt'), 'utf-8', (err, data) => {
  if (err) {
    console.log(err)
  } else {
    console.log('callback', data)
  }
})

// callback 方法 promise 化
const promisify = fn => {
  return (...args) => {
    return new Promise((resolve, reject) => {
      fn(...args, (err, data) => {
        if (err) reject(err)
        resolve(data)
      })
    })
  }
}

// 模块所有方法 promise 化
const promises = module => {
  for (const [k, v] of Object.entries(module)) {
    if (typeof v === 'function') {
      module[k] = promisify(v)
    }
  }
  return fs
}

const $fs = promises(fs)

$fs.readFile(path.resolve(__dirname, 'co.txt'), 'utf-8').then(data => {
  console.log('promise', data)
})
