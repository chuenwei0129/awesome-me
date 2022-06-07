// 无论当前 Promise 是成功还是失败，调用finally之后都会执行 finally 中传入的函数，并且将值原封不动的往下传。

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('p1')
  }, 3000)
})

// 第一步 cb 无论成功与否都执行
// finall 后面海可以then 所以返回值是一个 promise
// 第二部 透传值，cb执行后传值
// 第三部 cb 有返回值 需要等待，cb 是立即执行的 但返回值是一个异步需要等待完成在透传值
// 最外层函数返回一个promise 里层函数也返回一个promise

Promise.prototype._finally = function (cb) {
  return this.then(
    data => {
      return Promise.resolve(cb()).then(() => data)
    },
    r => {
      // 等待
      return Promise.resolve(cb()).then(() => {
        throw r
      })
    }
  )
}

p1.then()
  // 相当于没有 finally 这一段，p1 按原来方式正常执行
  .finally(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // 被忽略
        resolve(100)
      }, 2000)
    })
  })
  .then(val => console.log(val))

const promise1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, 'one')
})

const promise2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'two')
})

Promise.race([promise1, promise2]).then(value => {
  console.log(value)
  // Both resolve, but promise2 is faster
})
// expected output: "two"
