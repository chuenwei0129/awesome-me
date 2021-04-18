// 并行的写法,处理串行异步的数据

const school = {}

const fs = require('fs')
fs.readFile('./Examples/learn-promise/name.txt', 'utf-8', (err, data) => {
	out('name', data)
})

fs.readFile('./Examples/learn-promise/age.txt', 'utf-8', (err, data) => {
	out('value', data)
})

// 如何实现 school = {name: 'xiaoming', age: '27'}

// 方法1: 回调函数传出数据
// let datas = []
// let out = (key, val) => {
// 	datas.push([key, val])
// 	// 处理数据, 假设两个异步相互依赖参数应该不可用?
// 	// 待所有的异步完成后处理数据
// 	if (datas.length === 2) {
// // 解构赋值遍历
// 		for (const [key, val] of datas) {
// 			school[key] = val
// 		}
// 		console.log(school)
// 	}
// }

// 方法2: after函数
function after(times, cb) {
	return (key, val) => {
		school[key] = val
		if (--times === 0) {
			return cb(school)
		}
	}
}

const out = after(2, (res) => {
	// 处理数据
	console.log(res)
})