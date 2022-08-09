// AOP 高阶函数
Function.prototype.before = function (func) {
  return (...args) => {
    // 处理传参
    func()
    // 需要劫持的函数
    this(...args)
  }
}

// 函数劫持
// 不改变原函数的基础上实现新的函数实现函数劫持
// 在 fn 执行前执行别的函数或做些别的事情
function fn(...args) {
  console.log('fn执行并输出参数', ...args)
}

let _Fn = fn.before(() => {
  console.log(`我会在fn执行前执行`)
})

fn('hello world')
_Fn('hello world')

// [1, 2, 3].push(4) 时输出一段话,来监听数组发生改变了
// 重写 push 方法

Array.prototype._push = function (...args) {
  this.push(...args)
  return this
}

const arr = [1, 2, 3]._push(4, 5, 6)
console.log(arr)
const _arr = arr._push(1, 2, 3)
console.log(_arr)
