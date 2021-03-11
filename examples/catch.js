// 注意点 catch 的返回值是个 promise
Promise.prototype.catch = function(onrejected) {
	return this.then(null, onrejected)
}

const p = new Promise((resolve, reject) => {
	setTimeout(() => {
		reject(new Error('我是错误'))
	}, 1000)
})

p.catch(reason => {
	console.log(reason)
})