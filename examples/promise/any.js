// 有成功一个就返回成功的那个，全失败才返回失败，空数组失败，与 race 的区别，race 失败了就会返回失败
// 注意点 是 all 的反方向

const p1 = new Promise((resolve, reject) => {
	setTimeout(() => {
		reject(new Error('p1'))
		// resolve('p1')
	}, 3000)
})

const p2 = new Promise((resolve, reject) => {
	setTimeout(() => {
		reject(new Error('p2'))
		// resolve('p2')
	}, 2000)
})

// 会冒泡
const p3 = new Promise((resolve, reject) => {
	setTimeout(() => {
		reject(new Error('p3'))
		// resolve('p3')
	}, 1000)
})

// const test = [p1, p2, p3]

Promise.any([]).then(val => {
	console.log(val)
}, err => console.log(err instanceof Error))

Promise._any = (it) => {
	return new Promise((resolve, reject) => {
		const arr = [...it]
		const ret = []
		if (arr.length === 0) reject(ret)
		let idx = 0
		for (const [k, v] of arr.entries()) {
			Promise.resolve(v).then(data => resolve(data), (r) => {
				// err 怎么处理，err 子类
				ret[k] = r
				if (++idx === arr.length) {
					reject(ret)
				}
			})
		}
	})
}

Promise._any([]).then(val => {
}, err => {
	console.log(err instanceof Error)
})