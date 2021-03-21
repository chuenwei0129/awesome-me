// Promise 特点
// 1. 执行器中代码在 new 调用时立即执行
// 2. 执行器接收两个改变状态的内部方法
// 3. 执行器抛出错误也会改变状态
// 4. 同步 resolve 改变状态
// 5. 异步 resolve 改变状态a，exe 执行后状态还是 pending，发布订阅
// 6. 一旦 resolve 后就不可再 reject
// 7. resolve 后 then 方法中执行对应函数，参数传递

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