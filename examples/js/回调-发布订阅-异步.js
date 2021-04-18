// 并行的写法,处理串行异步的数据
const fs = require('fs')

const school = {}

const event = {
	_arr: [],
	on(fn) {
		this._arr.push(fn)
	},
	emit() {
		this._arr.forEach((fn) => fn())
	}
}

fs.readFile('./Examples/learn-promise/name.txt', 'utf-8', (err, data) => {
	// 任务完成触发
	school.name = data
	event.emit()
})

fs.readFile('./Examples/learn-promise/age.txt', 'utf-8', (err, data) => {
	school.age = data
	event.emit()
})

// 如何实现 school = {name: 'xiaoming', age: '27'}
event.on(() => {
	// 订阅一个任务的完成
	console.log('完成一个任务')
})

event.on(() => {
	if (Object.keys(school).length === 2) {
		console.log(school)
	}
})