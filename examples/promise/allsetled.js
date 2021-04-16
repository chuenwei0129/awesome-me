// 一旦所指定的 promises 集合中每一个 promise 已经完成，无论是成功的达成或被拒绝，未决议的 Promise将被异步完成。那时，所返回的 promise 的处理器将传入一个数组作为输入，该数组包含原始 promises 集中每个 promise 的结果

const p1 = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve('p1')
	}, 3000)
})

const p2 = new Promise((resolve, reject) => {
	setTimeout(() => {
		reject(new Error('p2'))
		// resolve('p2')
	}, 2000)
})

const p3 = new Promise((resolve, reject) => {
	setTimeout(() => {
		// reject(new Error('p3'))
		resolve('p3')
	}, 1000)
})

Promise.allSettled([1, 2, 3, p1, p2, p3]).then(data => {
	console.log(data)
})

Promise._allSettled = (it) => {
	return new Promise((resolve) => {
		const arr = [...it]
		if (arr.length === 0) resolve(arr)
		const ret = []
		let idx = 0
		for (const [k, v] of arr.entries()) {
			Promise.resolve(v).then(value => {
				ret[k] = { status: 'fulfilled', value }
				++idx === arr.length && resolve(ret)
			}, reason => {
				ret[k] = { status: 'rejected', reason }
				++idx === arr.length && resolve(ret)
			})
		}
	})
}

Promise._allSettled([1, 2, 3, p1, p2, p3]).then(data => {
	console.log(data)
})