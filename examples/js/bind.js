// 1. 不传值默认为 globalThis, null, undefined, 原始类型都由 call 处理
// 2. 第一次传入的参数需要和第二次传入的参数合并
// 3. bindedFn 可以作为构造函数，此时 this 绑定会失效，会指向实例 this，`this instanceof bindedFn` 来作为判断是构造函数，还是普通调用
// 4. bindedFn 的实例需要继承原函数原型上的方法 `this.__proto__.__proto__ === that.prototype`
// bound 执行才会执行原函数

function fn(a, b) {
	console.log('this --> ', this)
	return a + b
}

const obj = { x: 1 }

const Bound = fn.bind(obj, 1)
console.log(
	Bound,
	Bound(2),
	new Bound()
)

Function.prototype._bind = function(thisArg, ...args) {
	// 函数默认值无法处理 null
	thisArg = thisArg || globalThis
	const fn = this
	const bound = function(...boundArgs) {
		// 已知 this.__proto__ === bound.prototype 要实现 fn 函数中 this 等同于当前 this 即 this（当前this，因为 thisFn.__proto__ === fn.prototype）.__proto__ === fn.prototype
		// 所以只要构建原型链关系即可
		// bound.prototype = Object.create(fn.prototype)
		Object.setPrototypeOf(bound.prototype, fn.prototype)
		// this.__proto__ === fn.prototype 为构造函数调用，忽略 thisArg 绑定，直接 call 实例 this
		return fn.call(this instanceof fn ? this : thisArg, ...boundArgs, ...args)
	}
	return bound
}

const _Bound = fn._bind(obj, 1)

console.log(
	_Bound,
	_Bound(2),
	new _Bound()
)

// this -->  { x: 1 }
// this -->  fn {}
// [Function: bound fn] 3 fn {}
// this -->  { x: 1 }
// this -->  fn {}
// [Function: bound] 3 fn {}