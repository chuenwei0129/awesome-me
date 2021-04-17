function * gen() {
	yield '1'
	yield '2'
	yield '3'
	yield '4'
	return 'ret'
}

const it = gen()

console.log(it.next()) // {value: '1', done: false}
console.log(it.next()) // {value: '2', done: false}
console.log(it.next()) // {value: '3', done: false}
console.log(it.next()) // {value: '4', done: false}
// for of 会忽略 'ret'
console.log(it.next()) // {value: 'ret', done: true}
// console.log(it.next()) // {value: 'undefined', done: true}

function * _gen(gen) {
	console.log(gen)
	const yield1 = yield '1'
	console.log(yield1)
	const yield2 = yield '2'
	console.log(yield2)
	const yield3 = yield '3'
	console.log(yield3)
	const yield4 = yield '4'
	console.log(yield4)
	return 'ret'
}

const _it = _gen('gen') // 生成器函数并不执行

console.log(_it.next()) // 第一次执行遇到 yield 停止 // gen
console.log(_it.next('yield1')) // '1' 执行，next传参数是
console.log(_it.next('yield2')) // '2'
console.log(_it.next('yield3')) // '3'
console.log(_it.next('yield4')) // '4' 直到结束 返回 'ret'

// 以上就是 gen 特征

// g()并不会执行g函数，返回的也不是函数运行结果，而是一个指向内部状态的指针对象，也就是迭代器对象（Iterator Object）

// 提问：如果g函数没有yield和return语句呢？
// 答：第一次调用next就返回{value: undefined, done: true}，之后也是{value: undefined, done: true}。

// 每个迭代器之间互不干扰，作用域独立。

// 由于yield永远返回undefined，这时候，如果有了next方法的参数，yield就被赋了值，比如下例，原本a变量的值是0，但是有了next的参数，a变量现在等于next的参数，也就是11。

// 提问：第一个.next()可以有参数么？ 答：设这样的参数没任何意义，因为第一个.next()的前面没有yield语句。

// 以上面代码的return语句返回的6，不包括在for...of循环之中。

// function * fibonacci() {
// 	let [prev, curr] = [0, 1]
// 	for (;;) { // 这里请思考：为什么这个循环不设定结束条件？
// 		[prev, curr] = [curr, prev + curr]
// 		yield curr
// 	}
// }

// for (const n of fibonacci()) {
// 	if (n > 1000) {
// 		break
// 	}
// 	console.log(n)
// }