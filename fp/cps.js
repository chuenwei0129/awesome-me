// (1 + 2) * 2 // 6

// normal
const add1 = (a, b) => a + b
const multiply1 = (a, b) => a * b

const result1 = multiply1(add1(1, 2), 2)

console.log(result1)

// // cps
const add2 = (a, b, next) => next(a + b)
const multiply2 = (a, b, next) => next(a * b)

const result2 = multiply2(
  add2(1, 2, (result) => result),
  2,
  (result) => result
)

console.log(result2)

// add 这个过程需要 1s 后才返回结果
// normal
const add3 = (a, b) => a + b
const multiply3 = (a, b) => a * b

const tmp = add3(1, 2)
setTimeout(() => {
  multiply3(tmp, 2)
}, 1000)

// // cps
const add4 = (a, b, next) => setTimeout(next, 1000, a + b) // 1s 后才返回结果
const multiply4 = (a, b, next) => next(a * b)
add4(1, 2, (result) => {
  multiply4(result, 2, (result) => {
    console.log(result)
  })
})

// const result4 = multiply4(
//   add4(1, 2, (result) => result),
//   2,
//   (result) => result
// )
