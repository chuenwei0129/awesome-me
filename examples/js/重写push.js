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
