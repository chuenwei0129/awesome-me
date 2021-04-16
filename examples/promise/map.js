// 限定并发次数

// 计数器，队列，对象 key 的数量

const p1 = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve('p1')
	}, 3000)
})

const p2 = new Promise((resolve, reject) => {
	setTimeout(() => {
		// reject(new Error('p2'))
		resolve('p2')
	}, 2000)
})

const p3 = new Promise((resolve, reject) => {
	setTimeout(() => {
		// reject(new Error('p3'))
		resolve('p3')
		// 状态是 resolve 控制的
	}, 1000)
})

const it = [p1, p2, p3, 1, 2]

Promise.map = (it, times) => {
	// times 个数也要处理
	return new Promise((resolve, reject) => {
		const ret = []
		let idx = 0
		for (const [k, v] of it.entries()) {
			Promise.resolve(v).then(data => {
				// then 中回调是 resolve 控制的
				ret[k] = data
				// data 处于 this.value = undefined 阶段
				// ret = [empty, ...]
				// 这里同步 resolve 与 异步 resolve 表现不同
				if (++idx === times) {
					// 同步的计数器立即执行
					resolve(ret)
				}
			}, r => reject(r))
		}
	})
}

// entries()、keys()、values()、find()和findIndex()会将空位处理成undefined。
// forEach(), filter(), reduce(), every() 和some()都会跳过空位。
// map()会跳过空位，但会保留这个值
// join()和toString()会将空位视为undefined，而undefined和null会被处理成空字符串。
Promise.map(it, 4).then(val => {
	console.log(val)
})

// 接下来是 处理剩下的 promise