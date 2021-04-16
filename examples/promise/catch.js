// 注意点 catch 的返回值是个 promise
// catch 是包了一层函数的 then，相当于代理了一层

const p = new Promise((resolve, reject) => {
	setTimeout(() => {
		reject(new Error('我是错误'))
	}, 1000)
})

p.catch(reason => {
	console.log(reason)
})

Promise.prototype._catch = function(onRejected) {
	return this.then(null, onRejected)
}

p._catch(reason => {
	console.log(reason)
})