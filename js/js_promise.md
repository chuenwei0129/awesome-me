# JavaScript 基础知识梳理(六)<!-- omit in toc -->

- [回调](#回调)
- [Promise](#promise)
	- [Promise.all](#promiseall)
	- [Promise.finally](#promisefinally)
	- [Promise.resolve](#promiseresolve)
	- [Promise.race](#promiserace)
	- [微任务（Microtask）](#微任务microtask)
- [co + Generator](#co--generator)

## 回调


## Promise

> TIP

```js
const PENDING = 'PENDING',
	RESOLVED = 'RESOLVED',
	REJECTED = 'REJECTED'

// 处理 then 返回值 promise2 与 x 的关系, x 需要通过 promise2 resolve 下去
const resolvePromise = (promise2, x, resolve, reject) => {
	let called
	if (x === promise2) {
		return reject(
			new TypeError('Chaining cycle detected for promise #<Promise>')
		)
	}
	// 处理值透传
	if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
		// 取值会出错 defineProperty
		try {
			let then = x.then
			// 判断 x 是否是 promise
			if (typeof then === 'function') {
				then.call(
					x,
					(y) => {
						if (called) return
						called = true
						resolvePromise(promise2, y, resolve, reject)
					},
					(r) => {
						if (called) return
						called = true
						reject(r)
					}
				)
			} else {
				// x 不是 promise 只是有 then 属性的普通对象
				resolve(x)
			}
		} catch (error) {
			if (called) return
			called = true
			reject(error)
		}
	} else {
		// x 为普通值
		resolve(x)
	}
}

class Promise {
	constructor(executor) {
		this.status = PENDING
		this.value = null
		this.reason = null
		this.resolvedCallbacks = []
		this.rejectedCallbacks = []

		const resolve = (value) => {
			if (this.status === PENDING) {
				this.status = RESOLVED
				this.value = value
				this.resolvedCallbacks.forEach((fn) => fn())
			}
		}

		const reject = (reason) => {
			if (this.status === PENDING) {
				this.status = REJECTED
				this.reason = reason
				this.rejectedCallbacks.forEach((fn) => fn())
			}
		}

		try {
			executor(resolve, reject)
		} catch (error) {
			reject(error)
		}
	}

	then(onResolved, onRejected) {
		// 此处对应用法 promise.then().then().then(data => data)
		onResolved = typeof onResolved === 'function' ? onResolved : (data) => data
		onRejected =
			typeof onRejected === 'function'
				? onRejected
				: (err) => {
						throw err
				  }

		let promise2 = new Promise((resolve, reject) => {
			// 写在 executor 里立即执行
			if (this.status === RESOLVED) {
				// 处理 promise2 未定义
				setTimeout(() => {
					try {
						let x = onResolved(this.value)
						resolvePromise(promise2, x, resolve, reject)
					} catch (error) {
						reject(error)
					}
				}, 0)
			}
			if (this.status === REJECTED) {
				setTimeout(() => {
					try {
						let x = onRejected(this.reason)
						resolvePromise(promise2, x, resolve, reject)
					} catch (error) {
						reject(error)
					}
				}, 0)
			}
			if (this.status === PENDING) {
				this.resolvedCallbacks.push(() => {
					setTimeout(() => {
						try {
							let x = onResolved(this.value)
							resolvePromise(promise2, x, resolve, reject)
						} catch (error) {
							reject(error)
						}
					}, 0)
				})
				this.rejectedCallbacks.push(() => {
					setTimeout(() => {
						try {
							let x = onRejected(this.reason)
							resolvePromise(promise2, x, resolve, reject)
						} catch (error) {
							reject(error)
						}
					}, 0)
				})
			}
		})

		return promise2
	}
}

// 测试代码
Promise.defer = Promise.deferred = function () {
	let dfd = {}
	dfd.promise = new Promise((resolve, reject) => {
		dfd.resolve = resolve
		dfd.reject = reject
	})
	return dfd
}

module.exports = Promise
```

```sh
promises-aplus-tests Promise.js
```

### Promise.all

```js
const promise1 = function () {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve('我是 promise1')
		}, 1000)
	})
}

const promise2 = function () {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve('我是 promise2')
		}, 0)
	})
}

const promise3 = function () {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			reject('我是出错的情况')
		}, 0)
	})
}

const arr = [1, 2, 3, 4, promise1(), promise2(), promise3(), 5, 6, 7, 8]

Promise.all(arr)
	.then((data) => {
		console.log('Promise.all', data)
	})
	.catch((err) => {
		console.log(err)
	})

Promise.myAll = (arr) => {
	return new Promise((resolve, reject) => {
		// 需要考虑 传入空数组情况 直接 resolve 成功
		if (arr.length === 0) {
			return resolve(arr)
		}

		let res = []
		let index = 0
		const resolveData = (i, data) => {
			// 都成功才能 resolve, res.length === arr.length 异步时此时 data 为 undefined，无法判断结束
			res[i] = data
			if (++index === arr.length) {
				resolve(res)
			}
		}

		for (let i = 0; i < arr.length; i++) {
			const val = arr[i]
			if (
				(typeof val === 'object' && val !== null) ||
				typeof val === 'function'
			) {
				if (typeof val.then === 'function') {
					val.then((data) => {
						// res[i] = data 这里可以写个方法统一处理
						// 给个计数器，函数执行了计数器加一
						resolveData(i, data)
					}, reject)
				} else {
					// res[i] = val
					resolveData(i, val)
				}
			} else {
				// res[i] = val
				resolveData(i, val)
			}
		}
	})
}

Promise.myAll(arr)
	.then((data) => {
		console.log('Promise.myAll', data)
	})
	.catch((err) => {
		console.log(err)
	})

// 需要考虑 传入空数组情况 直接 resolve 成功
Promise.all([]).then((data) => {
	console.log('hello')
})

Promise.myAll([]).then((data) => {
	console.log('world')
})
```

### Promise.finally

```js
const promise = (timeout, data) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(data)
		}, timeout)
	})
}

promise(1000, 1000)
	.finally(() => {
		// 1. finally 回调函数中不接收任何参数，上层数据透传到了下一层 then 中
		// 2. finally 返回一个 promise，返回其他值会被忽略
		// 3. 回调函数的返回值无论是什么都会成为成功的 promise
		console.log('hello world1') // 异步
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(2000)
			}, 3000)
		})
	})
	.then((data) => {
		console.log(data)
	})

Promise.prototype._finally = function (cb) {
	// 注意点1，为了 this 无法用箭头函数
	// 注意点2，cb 是无论成功失败都执行
	// 注意点2，cb 可能返回一个 promise，透传的数据需要等待 promise 执行完在传出去，需要 return
	return this.then(
		(data) => Promise.resolve(cb()).then(() => data),
		(err) =>
			Promise.resolve(cb()).then(() => {
				throw err
			})
	)
}

promise(2000, 2000)
	._finally(() => {
		console.log('hello world2')
	})
	.then((data) => {
		console.log(data)
	})
```

### Promise.resolve

```js
const promise1 = (function () {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve('我是 promise1，我已经 resolve 了')
		}, 1000)
	})
})()

// promise 实例
console.log(Promise.resolve(promise1) === promise1) // true

// 即 鸭子类型判断符合 isPromise 的对象
const thenable = {
	then(resolve) {
		resolve('我是thenable对象')
	},
}
//  普通类型
Promise.resolve(1).then((data) => {
	console.log(data)
})

Promise.resolve(thenable).then((data) => {
	console.log(data)
})

// 三种情况
// 已经 resolved 的 实例 返回本身
// thenable 对象调用它自身的 resolve
// 其余 resolve 包一下
Promise.myResolve = (promise) => {
	if (promise instanceof Promise) return promise
	return new Promise((resolve) => {
		if (promise && promise.then && typeof promise.then === 'function') {
			// 传入 promise 的 resolve 方法,相当于 resolve 执行了
			promise.then(resolve)
		} else {
			resolve(promise)
		}
	})
}

console.log(Promise.myResolve(promise1) === promise1) // true

Promise.myResolve(thenable).then((data) => {
	console.log(data)
})

Promise.myResolve(1).then((data) => {
	console.log(data)
})
```

### Promise.race

```js
const promise1 = function () {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			reject('我是 promise1')
		}, 1000)
	})
}

const promise2 = function () {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			reject('我是 promise2')
		}, 0)
	})
}

const arr = [promise1(), promise2()]

Promise.race(arr)
	.then((data) => {
		console.log(data)
	})
	.catch((err) => {
		console.log(err)
	})

Promise.race([]).then((data) => {
	console.log('我执行了')
})

// 注意点 1.空数组 直接 return
// 错误处理
// 不按顺序来,哪个先完成哪个 return 与 all 不同,返回一个promise

Promise.myRace = function (arr) {
	return new Promise((resolve, reject) => {
		if (arr.length === 0) return

		arr.forEach((item) => {
			Promise.resolve(item).then((data) => {
				resolve(data)
				return
			}, reject)
		})
	})
}

Promise.myRace(arr)
	.then((data) => {
		console.log(data)
	})
	.catch((err) => {
		console.log(err)
	})

Promise.myRace([]).then((data) => {
	console.log('我执行了')
})
```

### 微任务（Microtask）

## co + Generator

```js
function* gen(data0) {
	console.log(data0)
	const data1 = yield '1'
	console.log(data1)
	const data2 = yield '2'
	console.log(data2)
	const data3 = yield '3'
	console.log(data3)
	return '4'
}

const it = gen('0') // 只是生成 iterator 内部 log 不执行

console.log(it.next()) // '1'
console.log(it.next('data1')) '2'
console.log(it.next('data2')) '3'
console.log(it.next('data3')) '4'

// for of 消费的 生成器 需要定义在 symbol.iterator函数上 {next() {return value: done }} index 原型链上的对象具有该方法也可）

// yield *
//   yield * 后面跟的是一个可遍历的结构，它会调用该结构的遍历器接口

// return(), throw(), next()

// Generator 函数可以不用yield表达式，这时就变成了一个单纯的暂缓执行函数

const arrLike = {
	[Symbol.iterator]() {
		let index = 0
		return {
			next: () => {
				return {
					value: this[index],
					done: index++ === this.length,
				}
			},
		}
	},
	0: 'javascript',
	1: 'vue',
	2: 'react',
	3: 'webpack',
	length: 4,
}

console.log(...arrLike)

const _arr = {
	*[Symbol.iterator]() {
		yield* ['javascript', 'react', 'vue', 'webpack']
	},
	length: 4,
}

console.log(..._arr)

const fs = require('fs').promises
const path = require('path')

fs.readFile('./Toys/filename.md')
	.then((data) => {
		return fs.readFile(path.join(data.toString().trimEnd()))
	})
	.then((data) => {
		console.log('promise 串行读取文件', data)
	})

// 第二次读取依赖第一次读取的结果

// 使用 Generator 读取文件

function* readFile(file1Name) {
	const file2Name = yield fs.readFile(file1Name)
	const fileData = yield fs.readFile(file2Name.toString().trimEnd())
	return fileData
}

function co(it) {
	return new Promise((resolve, reject) => {
		const next = (data) => {
			let { value, done } = it.next(data)
			if (!done) {
				Promise.resolve(value).then((data) => next(data), reject)
			} else {
				resolve(data)
			}
		}
		next()
	})
}

const readAsync = readFile('./Toys/filename.md')

co(readAsync).then((data) => {
	console.log(data)
})
```