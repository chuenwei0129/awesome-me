// 0、1、1、2、3、5、8、13、21、34

// fn(n) = f(n-1) + f(n-2)
// n === 2, n === 1

const fib = (n) => {
	if (n === 0) return 0
	if (n === 1) return 1

	return fib(n - 1) + fib(n - 2)
}

console.time('递归')
fib(25)
console.timeEnd('递归')

// 缓存执行结果
const memo = (fn, cahe = {}) => {
	// 原函数返回的是值，所以高阶函数也返回缓存过的值
	return n => {
		if (!cahe[n]) {
			cahe[n] = fn(n)
		}
		return cahe[n]
	}
}

console.time('memo')
memo(fib)(25)
console.timeEnd('memo')

function loop(n) {
	let first = 0
	let second = 1
	let third = 1
	if (n === 0) return first
	if (n === 1) return second
	if (n === 2) return third
	for (let i = 3; i <= n; i++) {
		first = second
		second = third
		third = first + second
	}
	return third
}

console.log(
	loop(6)
)

// function fib(n){
// 	function fib_(n,a,b){
// 			if(n==0)  return a
// 			else return fib_(n-1,b,a+b)
// 	}
// 	return fib_(n,0,1)
// }