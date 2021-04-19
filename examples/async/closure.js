// 闭包

// add(1) // 1
// add(1)(2) // 3
// 高阶函数的子函数定义了并没有执行，执行时才会有 this 指向，所以 this 奇怪

// const add = (...ms) => {
// 	// 调用 add 是用 ms 缓存参数
// 	const g = (...ns) => add(...ns, ...ms)
// 	g[Symbol.toPrimitive] = () => ms.reduce((a, b) => a + b)
// 	return g
// }

// console.log(
// 	+add(1)(2, 3),
// 	+add(1)(2)(3)
// )

// promise.then 方法就能实现异步队列

/*
 * @description 失败重试
 * @param request Promise 对象
 * @param times 设置的总尝试次数
 * @param time  第几次
 */

// 请求重传 就是把promise包一层在promise.all

// function tryRequest(request, times = 0, time = 1) {
// 	return request().catch(e => {
// 		if (time <= times) {
// 			console.log(e.message, `第${time}次重试`)
// 			return tryRequest(request, times, ++time)
// 		} else {
// 			return Promise.reject(e)
// 		}
// 	})
// }

// // 创建模拟请求
// function creatMockRequest(name) {
// 	return () => {
// 		return new Promise((resolve, reject) => {
// 			setTimeout(() => {
// 				if (Math.random() > 0.5) {
// 					resolve(`${name} success`)
// 				} else {
// 					reject(new Error(`${name} error`))
// 				}
// 			}, Math.random * 1000)
// 		})
// 	}
// }

// const requests = ['A', 'B', 'C', 'D'].map(item => {
// 	return tryRequest(creatMockRequest(item), 3)
// })

// Promise.all(requests).then(res => {
// 	console.log('成功了：', res)
// }).catch(e => {
// 	console.log('失败了：', e.message)
// })