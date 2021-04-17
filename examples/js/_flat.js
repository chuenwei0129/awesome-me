// 数组扁平化

// 外部变量
const res = []
const flat_1 = arr => {
	arr.forEach(item => {
		Array.isArray(item) ? flat_1(item) : res.push(item)
	})
	return res
}

// 函数参数变量
const flat_2 = (arr, res = []) => {
	if (!Array.isArray(res)) {
		throw new Error('res 必须为数组')
	}
	arr.forEach(item => {
		Array.isArray(item) ? flat_2(item, res) : res.push(item)
	})
	return res
}

// 函数内部变量
const flat_3 = arr => {
	const res = []
	arr.forEach(item => {
		if (Array.isArray(item)) {
			// res = res.concat(flat_3(item))
			res.push(...flat_3(item))
		} else {
			res.push(item)
		}
	})
	return res
}

// IIFE
const flat_4 = arr => {
	const res = []
	return (function flat(arr) {
		arr.forEach(item => {
			Array.isArray(item) ? flat(item) : res.push(item)
		})
		return res
	})(arr)
}

// reduce 累加器保存值
const flat_5 = arr => {
	return arr.reduce((acc, cur) => {
		return acc.concat(Array.isArray(cur) ? flat_5(cur) : cur)
	}, [])
}

// concat [].concat(...arr) 拍平一层，赋值给arr是拍平一层后，循环
const flat_6 = arr => {
	while (arr.some(item => Array.isArray(item))) {
		arr = [].concat(...arr)
	}
	return arr
}

module.exports = {
	flat_1,
	flat_2,
	flat_3,
	flat_4,
	flat_5,
	flat_6
}