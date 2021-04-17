// 分页计算
// 0-9是第一页 10-19第二页
const pageSize = 10
let index = 0
console.log(Math.ceil((index + 1) / pageSize))

index = 9
console.log(Math.ceil((index + 1) / pageSize))

index = 10
console.log(Math.ceil((index + 1) / pageSize))

// 最大最小值
console.log(Math.max(...[1, 2, 3]))
console.log(Math.min.apply(undefined, [1, 2, 4]))

// 20-30随机数
// 整数四舍五入
console.log(Math.round(Math.random() * 10 + 20))

// 判断素数只能被自己和 1 整除不含 1 , 2 是素数
// 整数取整后等于自己
// es6 api Number.isInteger
// 2 不走循环 返回true
// 判断素数只要判断到开方就行，跳出条件是 num % i === 0
function isPrime(num) {
	// 判断是否是整数
	if (typeof num === 'number' && (num | 0) === num) {
		if (num <= 1) return false
		const N = Math.floor(Math.sqrt(num))
		let primeState = true
		for (let i = 2; i <= N; i++) {
			if (num % i === 0) {
				primeState = false
				break
			}
		}
		return primeState
	} else {
		return false
	}
}

console.log(isPrime(2))
console.log(isPrime(87))
console.log(isPrime(77))

// set
const set = new Set([1, 2, 3])
set.add(4)
set.delete(1)
console.log(set.has(1), set.has(4))

// 子问题
	[[1, 2, 3], 2] // true
// 求和子问题

// TODO 迭代器生成 斐波那契 循环分散执行片段

// 笛卡尔积

// 双重循环 取组合， 去便利

// 中文排序 a.localCopar(b, 'zh')

// 链式操作，操作返回自身 return this