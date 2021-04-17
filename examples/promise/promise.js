// Promise 特点
// 1. 执行器中代码在 new 调用时立即执行
// 2. 执行器接收两个改变状态的内部方法
// 3. 执行器抛出错误也会改变状态
// 4. 同步 resolve 改变状态
// 5. 异步 resolve 改变状态a，exe 执行后状态还是 pending，发布订阅
// 6. 一旦 resolve 后就不可再 reject
// 7. resolve 后 then 方法中执行对应函数，参数传递
// 8. then 中就是回调，异步执行结束即状态改变后执行
// 9. 与 tapable 一样，都是回调加发布订阅
// 10. resolve 传参，同步是通过实例，异步直接发布订阅里函数里传，异步也可以用函数包一层用实例传 () => { onResolved(this.value) }

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
			// () => { onResolved(this.value) }
			this.resolvedCb.push(onfullfiled)
			this.rejectedCb.push(onrejected)
		}
	}
}

module.exports = Promise

// Promise 特点
// 1. 执行器中代码在 new 调用时立即执行
// 2. 执行器接收两个改变状态的内部方法
// 3. 执行器抛出错误也会改变状态
// 4. 同步 resolve 改变状态
// 5. 异步 resolve 改变状态a，exe 执行后状态还是 pending，发布订阅
// 6. 一旦 resolve 后就不可再 reject
// 7. resolve 后 then 方法中执行对应函数，参数传递
// 8. then 中就是回调，异步执行结束即状态改变后执行
// 9. 与 tapable 一样，都是回调加发布订阅
// 10. resolve 传参，同步是通过实例，异步直接发布订阅里函数里传，异步也可以用函数包一层用实例传 () => { onResolved(this.value) }

// 11. 第一步 then 回调 返回值 没有返回值或者返回非 promise，
// 12. 第二步 处理值的透传问题，then 不传参数也可以一直传下去

// 7. then没有返回值或者返回非 promise，value 值会一直向下传递，形成 promise 链，终止 promise 的方法是返回 pending状态的promise 即空的promise
// 8. then 返回 promise，returnPromise的then会立即执行并把val return出去传给promise2的then，内部的错误也会传给外部reject
// 9. 错误处理，两种情况，内部抛出错误，或者返回的promise2是错误状态
// 10. 返回的promise是新的promise2

// 外部有 then 方法，promise2.then就是外部的then方法 他的参数传递取决于onfulfilled放回值 传递参数靠resolve promise2.then执行
// const x = onResolved(this.value)
// 			return new _Promise((resolve, reject) => {
// 				resolve(x)
// 			})
// 有三种可能 普通 promise object.then
// 递归调用

// 处理回调的返回值是 x === promise
// x.then立即执行并且把返回值 resolve(x.then())
// x 也可能是其他人写的 promise
// x.then的返回值也可能是 promise 递归
// onResolved 执行多次
// 递归过程，不需要处理参数
// 最终传递的值是 resolve(x)

// then 回调里不传值就会透传下去