// 分页计算
// 0-9 是第一页 10-19 第二页
const pageSize = 10
let index = 0
console.log(Math.ceil((index + 1) / pageSize)) // 1
index = 9
console.log(Math.ceil((index + 1) / pageSize)) // 1
index = 10
console.log(Math.ceil((index + 1) / pageSize)) // 2

// 最大最小值
console.log(Math.max(...[1, 2, 3])) // 3
console.log(Math.min.apply(undefined, [1, 2, 4])) // 1

// 20 - 30 随机数
// [0, 11) + 20 = [20, 31) | 0 取整 => [20, 30]
// 数组随机下标
console.log(Math.floor(Math.random() * 11 + 20))

// 素数只能被自己和 1 整除不含 1
// 整数取整后等于自己
// es6 api Number.isInteger
// 2 是素数，2 不走循环 返回 true
// 数学：判断素数只要判断到开方就行，跳出条件是 num % i === 0
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
