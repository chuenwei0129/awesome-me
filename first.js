const arr = [1, 2, 3]

for (let i = 0; i < arr.length; i++) {
	const i = 'abc'
	// 循环体中的作用域是括号中作用域的子作用域
	console.log(i)
}

console.log(i) // i is not defined