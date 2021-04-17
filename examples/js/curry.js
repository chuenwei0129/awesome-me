// 柯里化
// fn(1, 2, 3, 4) // 执行...
// f = fn(1)(2)(3) // 返回函数缓存这三个参数
// f(4) // 执行..

const curry = fn => {
	const g = (...allArgs) => allArgs.length >= fn.length ? fn(...allArgs) : (...args) => g(...allArgs, ...args)
	return g
}