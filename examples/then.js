// Promise 特点
// 1. 执行器中代码在 new 调用时立即执行
// 2. 执行器接收两个改变状态的内部方法
// 3. 执行器抛出错误也会改变状态
// 4. 同步 resolve 改变状态
// 5. 异步 resolve 改变状态a，exe 执行后状态还是 pending，发布订阅
// 6. 一旦 resolve 后就不可再 reject

// 7. then没有返回值或者返回非 promise，value 值会一直向下传递，形成 promise 链，终止 promise 的方法是返回 pending状态的promise 即空的promise
// 8. then 返回 promise，returnPromise的then会立即执行并把val return出去传给外部的then，内部的错误也会传给外部reject
// 9. 错误处理，两种情况，内部抛出错误，或者返回的promise是错误状态
// 10. 返回的promise是新的promise

const RESOLVED = 'RESOLVED'
const REJECTED = 'REJECTED'
const PENDING = 'PENDING'

class Promise {
	constructor(exe) {
		this.state = PENDING
		this.value = null
		this.reason = null
		this.resolvedCb = []
		this.rejectedCb = []

		const resolve = (value) => {
			if (this.state === PENDING) {
				this.state = RESOLVED
				this.value = value
				this.resolvedCb.forEach(fn => fn(value))
			}
		}

		const reject = (reason) => {
			if (this.state === PENDING) {
				this.state = REJECTED
				this.reason = reason
				this.resolvedCb.forEach(fn => fn(reason))
			}
		}

		try {
			exe(resolve, reject)
		} catch (err) {
			reject(err)
		}
	}
	then(onfullfiled, onrejected) {
		// 同步
		if (this.state === RESOLVED) {
			onfullfiled(this.value)
		}
		if (this.state === REJECTED) {
			onrejected(this.reason)
		}
		// 异步
		if (this.state === PENDING) {
			this.resolvedCb.push(onfullfiled)
			this.rejectedCb.push(onrejected)
		}
	}
}

module.exports = Promise