const combine =
  (leftFn, rightFn) =>
  (...args) =>
    leftFn(rightFn(...args))

const minus = (x: number) => x - 1
const square = (x: number) => x ** 2
const sum = (a: number, b: number) => a + b

const f = [minus, square, sum].reduce(combine)

console.log(f(1, 2))

const compose = (...fns) => {
  return (...args) => {
    return fns.reduceRight((acc, cur) => {
      // acc 循环结束时不是函数，是最左边函数的输入参数
      return typeof acc === 'function' ? cur(acc(...args)) : cur(acc)
    })
  }
}

console.log(compose(minus, square, sum)(1, 2))
