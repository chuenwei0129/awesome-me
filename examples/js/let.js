/* eslint-disable no-var */
// a[6]定义时在全局作用域下，执行时根据作用域链去寻找寻找上层变量，全局变量 i，全局变量 i 在循环结束时已经是 10 了，所以返回 10
var a = []
for (var i = 0; i < 10; i++) {
	a[i] = function() {
		console.log(i)
	}
}
a[6]()

// b[6]定义时在块级作用域下，执行时根据作用域链去寻找寻找上层变量，块级变量 i，块级变量 i 每一次循环都是一个新的变量，所以返回 6
var b = []
for (let i = 0; i < 10; i++) {
	b[i] = function() {
		console.log(i)
	}
}
b[6]()

// c[6]定义时在函数作用域下，执行时根据作用域链去寻找寻找上层变量，立即执行函数变量的 i，立即执行函数变量的 i 每一次循环都传入一个新的变量 i，所以返回 6
var c = []
for (var i = 0; i < 10; i++) {
	// 直接传 i 即可，形参 x 便于理解，以免过了些时日忘了
	c[i] = (function(x) {
		var i = x
		return function() {
			console.log(i)
		}
	})(i) // 实参
}
c[6]()

// 本质上是作用域链，词法作用域，执行上下文

// 常量声明
const arr = [1, 2, 3]
arr.push(4) // 不会报错
console.log(arr) // [1, 2, 3, 4]
arr = [1, 2] // Uncaught TypeError: Assignment to constant variable.

// const实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动。