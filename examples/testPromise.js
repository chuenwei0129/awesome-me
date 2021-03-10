const Promise = require('./promise')

const promise = new Promise((resolve, reject) => {
	// console.log('exe 立即执行')
	// resolve('同步代码')
	// throw new Error('exe 抛出错误')
	setTimeout(() => {
		resolve('异步代码')
	}, 1000)
})

promise.then(val => {
	console.log(val)
}, reason => {
	console.log('reason: ', reason)
})