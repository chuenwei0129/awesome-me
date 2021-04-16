// race 只要有一个 promise 执行完，直接 resolve 并停止执行。

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
	}, 1000)
})

const test = [p1, p2, p3]

Promise.race(test).then(val => {
	console.log(val)
})

Promise._race = (it) => {
	return new Promise((resolve, reject) => {
		const promises = [...it]
		if (promises.length === 0) resolve([])
		promises.forEach(promise => Promise.resolve(promise).then(data => resolve(data), r => reject(r)))
	})
}

Promise._race(new Set(test)).then(val => {
	console.log(val)
})