// 迭代器的遍历
const s = new Set([1, 2, 3, 4, 5])
const it = s.values()

// 1 缺点：next() 执行后 done 为 true 无法再次遍历 it
let val
while (!(val = it.next()).done) {
  console.log(val.value)
}

// 2 无法 break，无法迭代无限循环
console.log(...s)

// 3 return 和 for return 不同
for (const v of s) {
  console.log(v)
}

// 4 Array.from this 指针丢失
const $it = s.values()
Array.from(Array(5), () => $it.next(), $it).forEach(x => {
  console.log(x.value)
})

// 生成定长 fib
// 循环生成 yield，更新 yield 后的值，即 next().value
function* g() {
  let [x, y] = [1, 1]
  yield x
  while (1) {
    yield y
    // 这种场景适合解构
    ;[x, y] = [y, x + y]
    // 缓存 y
    // const t = y
    // // 更新 y
    // y = x + y
    // // 更新 x
    // x = t
  }
}

const _it = g()
const fib = n => Array.from(Array(n), () => _it.next(), _it).map(x => x.value)
console.log(fib(10))
// [
//   1,  1,  2,  3,  5,
//   8, 13, 21, 34, 55
// ]

// 数组展平
function* flat(arr) {
  for (let i = 0; i < arr.length; i++) {
    Array.isArray(arr[i]) ? yield* flat(arr[i]) : yield arr[i]
  }
}

const test = [undefined, () => 0, 1, [2, { a: 1 }], [4, 5, [6, 7, 8, [9, [10]]]]]
console.log([...flat(test)])

//
