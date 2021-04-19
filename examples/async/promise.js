// 事件循环
// console.log('sync 1')

// const asyncF = async function() {
// 	console.log('----->')
// 	await new Promise(() => {})
// 	console.log('<-----')
// }

// const asyncF2 = async function() {
// 	console.log('----->') // 这一块是同步的
// 	await new Promise(() => {}) // 这一块 是个 promise 需要等待，it.next() 是同步的本质是一个 promise 链
// 	console.log('<-----')
// }

// asyncF()

// asyncF2()

// console.log('sync 2')

// let a = 0
// const b = async() => {
// 	// 赋值的规则，填
// 	a = a + await 10 // 10
// 	console.log('2', a) // -> ？
// }

// b()
// a++
// console.log('1', a) // -> ？ 1, 1

// MicroTask（微任务）：Promise 状态改变以后的回调函数（then 函数执行，如果此时状态没变，回调只会被缓存，只有当状态改变，缓存的回调函数才会被丢到任务队列）、Mutation observer 回调函数、queueMicrotask 回调函数（新增的 API）。
// 宏任务会被丢到下一次事件循环，并且宏任务队列每次只会执行一个任务。
// 微任务会被丢到本次事件循环，并且微任务队列每次都会执行任务直到队列为空。
// 假如每个微任务都会产生一个微任务，那么宏任务永远都不会被执行了。

// Event Loop 执行顺序如下所示：

// 执行同步代码
// 执行完所有同步代码后且执行栈为空，判断是否有微任务需要执行
// 执行所有微任务且微任务队列为空
// 是否有必要渲染页面
// 执行一个宏任务

// const p1 = new Promise((resolve, reject) => {
// 	setTimeout(() => {
// 		resolve('p1')
// 	}, 3000)
// })

// const p2 = new Promise((resolve, reject) => {
// 	setTimeout(() => {
// 		// reject(new Error('p2'))
// 		resolve('p2')
// 	}, 2000)
// })

// const p3 = new Promise((resolve, reject) => {
// 	setTimeout(() => {
// 		// reject(new Error('p3'))
// 		resolve('p3')
// 	}, 1000)
// })

// console.log('sync1')

// const a = async() => {
// 	console.log('a1') // 同步
// 	// 回调缓存
// 	await p3 // 本质没有中断代码，代表又执行了 a 一次，promise 阻塞原理，缓存回调状态没改变
// 	console.log('a2') // 和 p1 同步
// 	await new Promise(() => {}) // 为什么会暂停
// 	console.log('a3')
// 	await p1
// 	console.log('a4')
// }

// const b = async() => {
// 	console.log('b1')
// 	// 回调缓存
// 	await Promise.resolve() // 代码也是执行了放进为任务队列中
// 	console.log('b2')
// 	await p3
// 	console.log('b3')
// 	await p2
// 	console.log('b4')
// }

// a()
// b()

// console.log('sync2')

// sync1 -> a1 -> b1 -> sync2 => a2 / b2

// Promise.resolve() 状态改变, x => x 被放进微任务队列

//

// Promise.resolve().then(() => {
// 	console.log(0)
// 	// task 0
// 	return Promise.resolve(4) // 状态改变，x.then 立即执行 === 2 个 then
// }).then((res) => {
// 	// task res
// 	// 即 value=4的微任务队列，然后再执行微任务队列 4,再去注册下一个then，发现没有 then，则同步任务完成，return 后面一串是一个同步返回内容，于是 return 完成之后，
// 	// 会再次执行下一个的微任务，最后再回来注册 return 这个同步任务之后的 then,所以总共消耗了两个 Promise ，、
// 	console.log(res) // 他就和3同级，怎么会是 4 说明了
// })

// Promise.resolve().then(() => {
// 	// promise 同级时间是竞争关系，链是串行
// 	console.log(1)
// }).then(() => {
// 	console.log(2)
// }).then(() => {
// 	console.log(3)
// }).then(() => {
// 	console.log(5)
// }).then(() => {
// 	console.log(6)
// })

// 内部做了什么

// 核心就是计算出两个浮点数最大的小数长度，比如说 0.1 + 0.22
// 的小数最大长度为 2，然后两数乘上 10 的 2次幂再相加得出数字 32，然后除以 10 的 2次幂即可得出正确答案 0.32。