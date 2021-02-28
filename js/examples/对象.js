// in
// Object.assign
// {...}
//

const num = 123456
console.log(num.toPrecision)


### isPrime

```js
// 素数只能被自己和 1 整除不含 1 , 2 是素数
// 判断素数只要判断到开方就行，false 跳出条件是 num % i === 0

function isPrime(num) {
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

console.log(isPrime(2)) // true
console.log(isPrime(87)) // false
console.log(isPrime(77)) // false
```