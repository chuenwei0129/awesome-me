// 测试用例
const proto = { a: 1 }
// o 的原型是 proto
const o = Object.create(proto)
console.log(Object.getPrototypeOf(o) === proto, o.__proto__ === proto)

// 模拟实现
Object.$create = function (origin) {
  const F = function () {}
  // F.prototype 的引用地址是 origin
  F.prototype = origin
  return new F()
}

// 测试
const c = Object.$create(proto)
console.log(Object.getPrototypeOf(c) === proto, c.__proto__ === proto)
