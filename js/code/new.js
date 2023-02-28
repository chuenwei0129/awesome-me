// 因为 new 是关键字,所以我们写一个函数，命名为 _new，
// 来模拟 new 的效果。用的时候是这样的：
// var f = new F(...) === var f = _new(F, ...)

// 测试用例
function F() {
  this.age = 28
  // return null
  // return 1
  // return this
  return {
    age: 18,
    fn() {
      return this.age
    }
  }
}

F.prototype.fn = function () {
  return this.age
}

// 原生表现
const f = new F()
console.log(typeof f, F.prototype === Object.getPrototypeOf(f), f.age, f.fn())

// 模拟实现
function _new() {
  const constructor = [].shift.call(arguments)
  const inst = Object.create(constructor.prototype)
  const ret = constructor.call(inst, ...arguments)
  return typeof ret === 'object' && ret !== null ? ret : inst
}

// 模拟表现
const _f = _new(F)
console.log(typeof _f, F.prototype === Object.getPrototypeOf(_f), _f.age, _f.fn())

// 注释版
// function _new() {
// 	// 处理参数
// 	const constructor = [].shift.call(arguments)
// 	// 创建一个新的实例对象
// 	// 把实例的 __proto__ 指向构造函数的 prototype
// 	const instance = Object.create(constructor.prototype)
// 	// 改变 this 指向，处理传参
// 	// 构造函数如果有返回值是对象的情况下，会返回该对象 new 出的实例就是该对象，其他返回实例对象
// 	// res 储存构造函数的返回值，apply 和 call 都相当于函数执行了一次，只是函数执行环境变化
// 	const res = constructor.apply(instance, arguments)
// 	// 返回实例对象
// 	console.log(typeof res)
// 	return typeof res === 'object' && res !== null ? res : instance
// }
