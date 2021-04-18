const _instanceof = (left, right) => {
	// 第一次查找原型
	let proto = Object.getPrototypeOf(left)
	while (1) {
		// right 是 callable 是函数
		if (proto === right.prototype) return true
		if (proto === null) return false
		// 递归查找
		proto = Object.getPrototypeOf(proto)
	}
}

console.log(
	Object instanceof Object
)

console.log(
	_instanceof(Object, Object)
)