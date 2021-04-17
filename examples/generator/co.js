const fs = require('fs').promises
const path = require('path')

// promise 串行 值会透传
// fs.readFile(path.resolve(__dirname, 'test.txt'))
// 	.then(data => data.toString())
// 	.then(data => fs.readFile(path.resolve(__dirname, data)))
// 	.then(data => console.log(data.toString()))

// async
// async function read() {
// 	const name = await fs.readFile(path.resolve(__dirname, 'test.txt'))
// 	const data = await fs.readFile(path.resolve(__dirname, name.toString()))
// 	return data.toString()
// }

// read().then(data => {
// 	console.log(data)
// })

// generator 串行
// function read() {
// 	return new Promise((resolve, reject) => {
// 		function * gen() {
// 			const name = yield fs.readFile(path.resolve(__dirname, 'test.txt')).then(data => {
// 				it.next(data.toString())
// 			})
// 			const data = yield fs.readFile(path.resolve(__dirname, name)).then(data => {
// 				it.next(data.toString())
// 			})
// 			resolve(data)
// 		}
// 		const it = gen()
// 		it.next()
// 	})
// }

// read().then(data => console.log(data))

function * gen() {
	const name = yield fs.readFile(path.resolve(__dirname, 'test.txt'))
	const data = yield fs.readFile(path.resolve(__dirname, name.toString()))
	return data
}

// const it = gen()
// const { value, done } = it.next()

// Promise.resolve(value).then(data => {
// 	const { value, done } = it.next(data)
// 	Promise.resolve(value).then(data => {
// 		const { value, done } = it.next(data)
// 		console.log(value, done)
// 	})
// })

// 找规律 递归

function co(it) {
	return new Promise((resolve, reject) => {
		const next = (data) => {
			const { value, done } = it.next(data)
			if (!done) {
				Promise.resolve(value).then(data => {
					next(data)
				}, r => {
					it.throw(r)
					reject(r)
				})
			} else {
				resolve(value)
			}
		}
		next()
	})
}

const it = gen()

co(it).then(data => {
	console.log(data)
})

// 完美