// add(1) // 1
// add(1)(2) // 3
// add(1)(2)(3) //6

// 链式调用的实现
// 递归，闭包
// 单个参数累加

// const add = sum => {
// 	const fn = n => add(n + sum)
// 	fn.valueOf = () => sum
// 	return fn
// }

// console.log(+add(1)(2)(3))

// // 扩展
// // add(1, 2, 3)(4)(5)(6)
// // 多个参数累加
// // 改造上一个只需要把参数都累加即可

// const _add = (...sums) => {
// 	sums = sums.reduce((acc, cur) => acc + cur)
// 	const fn = (...args) => {
// 		args = args.reduce((acc, cur) => acc + cur)
// 		return _add(sums + args)
// 	}
// 	fn.valueOf = () => sums
// 	return fn
// }

// console.log(+_add(1, 2, 3)(4, 5)(8, 2)(7, 8))

// 考点链式调用
// 闭包 m 缓存值

// 单参数
const add = (m) => {
	const fn = n => add(n + m)
	fn.valueOf = () => m
	return fn
}

// 多参数
const _add = (...ms) => {
	ms = ms.reduce((acc, cur) => acc + cur)
	const fn = (...ns) => {
		ns = ns.reduce((acc, cur) => acc + cur)
		return _add(ns + ms)
	}
	fn.valueOf = () => ms
	return fn
}

console.log(
	+add(1),
	+add(1)(2),
	+add(1)(2)(3),
	+_add(1, 2, 3)(4, 5)(6),
	+_add(1)(2)(3)(4)(5)(6)
)