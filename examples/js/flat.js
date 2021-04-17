// 思考
// 测试驱动开发

const arr = [1, [2, { a: 1 }], [4, 5, [6, 7, 8, [9, [10]]]]]

// 1. toString 方法 只适合 string[], number[] ...

// 2. api 注意点 -> 层数
console.log(
	arr.flat(Infinity)
)

// 3. 正则 + 序列化、反序列化
console.log(
	JSON.parse(`[${JSON.stringify(arr).replace(/\[|\]/g, '')}]`)
)

// 4. 递归
// x 是数组就递归,不是就放入 ret 中,重点是 ret 闭包
const flat = (arr, ret = []) => {
	arr.forEach(x => {
		Array.isArray(x) ? flat(x, ret) : ret.push(x)
	})
	return ret
}

console.log(
	flat(arr)
)

// 5. reduce
// 本质还是递归，累计器存储 concat
const flatReduce = (arr) => {
	return arr.reduce((acc, cur) => {
		return acc.concat(Array.isArray(cur) ? flatReduce(cur) : cur)
	}, [])
}
console.log(
	flatReduce(arr)
)

// 6. while + some + concat 原理：...拍平一层后的里面的数组和普通值都会被 concat 合并成新数组，可以少循环一次
const flatWhile = (arr) => {
	// 是否有子数组
	while (arr.some(x => Array.isArray(x))) {
		// console.log('执行次数')
		arr = [].concat(...arr)
	}
	return arr
}

console.log(
	flatWhile(arr)
)