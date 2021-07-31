const combine =
  (leftFn, rightFn) =>
  (...args) =>
    leftFn(rightFn(...args))

const minus = (x: number) => x - 1
const square = (x: number) => x ** 2
const sum = (a: number, b: number) => a + b

const f = [minus, square, sum].reduce(combine)

console.log(f(1, 2))
