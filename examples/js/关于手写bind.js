function fn(a, b) {
	// bind 返回的是一个函数，并且原函数体不会执行，参数会合并
	console.log(this)
	return a + b
}

const obj = { x: 1 }

fn(1, 2)

const bound = fn.bind(obj, 1)

bound(2)

const _bound = new bound(3)

Function.prototype._bind = function (thisArgs) {
	// 第一步确保 _bind 是函数调用的 this 就是 fn
	if (typeof this !== 'function') {
		throw new TypeError(this + 'must be a function')
	}
	let thisFn = this
	// _bind_args 除 thisArgs 以外的参数
	let _bind_args = [].slice.call(arguments, 1)
	const bound = function () {
		// bound的 this 指向 应该绑定为第一个参数
		// bound传入的参数
		let boundArgs = [].slice.call(arguments)

		return thisFn.apply(
			this instanceof thisFn ? this : thisArgs,
			_bind_args.concat(boundArgs)
		)
	}
	// 把 bound的原型赋值给thisFn的原型，作为实列调用 this===实列 即可得出 this instaceof thisFn === true ,
	// 如果不为实例此时this指向window， 即为false，即需要改变this指向
	// bound.prototype = thisFn.prototype // 这里的this是thisFn
	// 这里涉及引用类型 obj赋值问题, 修改bound.prototype会影响thisFn.prototype，我们目的是 instaceof
	// 可以多加一层__proto__解决
	let FN = function () {}
	bound.prototype = new FN()
	FN.prototype = thisFn.prototype

	return bound
}

// _bind原理就是apply/call用高阶函数又封装了一层，大概又是延迟函数执行

// 处理new 参数没问题 this 指向 实例

// https://github.com/mqyqingfeng/Blog/issues/12
