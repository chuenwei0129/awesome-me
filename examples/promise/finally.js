// 无论当前 Promise 是成功还是失败，调用finally之后都会执行 finally 中传入的函数，并且将值原封不动的往下传。

const p1 = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve('p1')
	}, 3000)
})

// 第一步 cb 无论成功与否都执行
// finall 后面海可以then 所以返回值是一个 promise
// 第二部 透传值，cb执行后传值
// 第三部 cb 有返回值 需要等待，cb 是立即执行的 但返回值是一个异步需要等待完成在透传值
// 最外层函数返回一个promise 里层函数也返回一个promise

Promise.prototype._finally = function(cb) {
	return this.then(data => {
		return Promise.resolve(cb()).then(() => data)
	}, r => {
		// 等待
		return Promise.resolve(cb()).then(() => { throw r })
	})
}

p1.then()._finally(() => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve()
		}, 2000)
	})
}).then(val => console.log(val))