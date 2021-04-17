// add(1) // 1
// add(1)(2) // 3
// add(1)(2)(3) //6

// 链式调用的实现
// 递归，闭包
// 单个参数累加

const add = sum => {
	const fn = n => add(n + sum)
	fn.valueOf = () => sum
	return fn
}

console.log(+add(1)(2)(3))

// 扩展
// add(1, 2, 3)(4)(5)(6)
// 多个参数累加
// 改造上一个只需要把参数都累加即可

const _add = (...sums) => {
	sums = sums.reduce((acc, cur) => acc + cur)
	const fn = (...args) => {
		args = args.reduce((acc, cur) => acc + cur)
		return _add(sums + args)
	}
	fn.valueOf = () => sums
	return fn
}

console.log(+_add(1, 2, 3)(4, 5)(8, 2)(7, 8))