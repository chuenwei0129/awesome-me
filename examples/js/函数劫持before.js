// AOP 高阶函数
Function.prototype.before = function (func) {
	return (...args) => {
		// 处理传参
		func()
		// 需要劫持的函数
		this(...args)
	}
}

// 函数劫持
// 不改变原函数的基础上实现新的函数实现函数劫持
// 在 fn 执行前执行别的函数或做些别的事情
function fn(...args) {
	console.log('fn执行并输出参数', ...args)
}

let _Fn = fn.before(() => {
	console.log(`我会在fn执行前执行`)
})

fn('hello world')
_Fn('hello world')

// 如何实现呢
