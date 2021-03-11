const Promise = require('./then')

const promise = new Promise((resolve, reject) => {
	// console.log('exe 立即执行')
	// resolve('同步代码')
	// throw new Error('exe 抛出错误')
	setTimeout(() => {
		resolve('异步代码')
	}, 2000)
})

// promise.then(val => {
// 	console.log(val)
// }, reason => {
// 	console.log('reason: ', reason)
// })

// 透值传递

promise.then(val => {
	return val + 100
}).then(val => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve('return Promise' + val)
		}, 1000)
	})
}).then().then(val => console.log(val))