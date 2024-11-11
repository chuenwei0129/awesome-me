// 1, 1, 2, 3, 5, 8, 13, 21
// 0, 1, 2, 3, 4, 5, 6, 7
// n === 0 || 1 11 n >= 2 fib = fib(n-1) + fib(n-2)

const fib = (n: number) => {
  if (n === 0 || n === 1) {
    return 1
  }

  return fib(n - 1) + fib(n - 2)
}

console.log(fib(5))
console.log(fib(6))
console.log(fib(7))

const fib2 = (n: number) => {
  if (n === 0 || n === 1) {
    return 1
  }

  let ret = [1, 1]

  for (let i = 2; i <= n; i++) {
    ret.push(ret[i - 1] + ret[i - 2])
  }

  return ret[n]
}

console.log(fib2(5))
console.log(fib2(6))
console.log(fib2(7))
