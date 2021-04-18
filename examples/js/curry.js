// 柯里化
// fn(1, 2, 3, 4) // 执行...
// f = fn(1)(2)(3) // 返回函数缓存这三个参数
// f(5) // 执行..

// const curry = fn => {
// 	const g = (...allArgs) => allArgs.length >= fn.length ? fn(...allArgs) : (...args) => g(...allArgs, ...args)
// 	return g
// }

// 维基百科上的解释是，把接受多个参数的函数转换成接受一个单一参数的函数
// 普通函数可以转成高阶函数调用
// 用函数参数去保存变量，高阶函数用法

const sum = (a, b, c) => {
	return a + b + c
}

console.log(
	sum(1, 2, 3) // sum(1)(2)(3)
)

// 1.0 闭包
const _sum = a => b => c => a + b + c

console.log(
	_sum(1)(2)(3)
)

// 2.0
// 函数参数保存变量
// 低阶函数转高阶函数调用
// 小于 fn.length 时,储存参数，返回高阶函数
// 等于 length 时 开始执行函数

const curry = fn => {
	const g = (...allArgs) => allArgs.length >= fn.length ? fn(...allArgs) : (...args) => g(...args, ...allArgs)
	return g
}

console.log(
	curry(sum)(1)(2, 3)
)