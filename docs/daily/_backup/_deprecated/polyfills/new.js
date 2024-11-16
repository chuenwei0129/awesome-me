// 因为 new 是关键字，所以我们写一个函数，命名为 _new，
// 来模拟 new 的效果。用的时候是这样的：
// var f = new F(...) === var f = _new(F, ...)

// 测试用例
function F() {
  this.age = 28
  // return {
  //   age: 18,
  //   fn() {
  //     return this.age
  //   }
  // }

  // return null
  // return 1

  // return this
}

F.prototype.fn = function () {
  return this.age
}

const f = new F()
console.log(f, typeof f, Object.getPrototypeOf(f) === F.prototype, f.age, f.fn())

// 后面跟着原始类型，`new` 命令 `return` 会忽略原始类型。
// F { age: 28 } object true 28 28

// 构造函数内部有 `return` 语句，并且 `return` 后面跟着一个对象，`new` 命令会返回 `return` 语句指定的对象，
// { age: 18, fn: [Function: fn] } object false 18 18

// 注释版
function _new() {
  // 拿到构造函数
  const constructor = [].shift.call(arguments)
  // 创建一个新的实例对象
  // 把实例的 __proto__ 指向构造函数的 prototype
  const instance = Object.create(constructor.prototype)
  // apply 改变 this 指向，处理参数
  // res 储存构造函数的返回值，apply 和 call 都相当于函数执行了一次，只是函数执行环境变化
  const res = constructor.apply(instance, arguments)
  // 构造函数如果有返回值是对象的情况下，会返回该对象，否则返回实例对象 instance
  return typeof res === 'object' && res !== null ? res : instance
}
