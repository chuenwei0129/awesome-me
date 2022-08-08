// 数组 iterator
let [, , third] = [1, 2, 3]
console.log(third) // 3

let [first, ...rest] = [1, 2, 3]
console.log(first, rest) // 1 [2, 3]

let [foo, bar] = [1]
console.log(foo, bar) // 1 undefined

let [a] = [1, 2]
console.log(a) // 1

let [x, y, z] = new Set(['a', 'b', 'c'])
console.log(x, y, z) // a b c

let [[h, i], [j, k]] = new Map([
  [1, 2],
  [2, 3]
])
console.log(h, i, j, k) // 1 2 2 3

function* fibs() {
  let a = 0
  let b = 1
  while (true) {
    yield a
    ;[a, b] = [b, a + b]
  }
}
let [firstFib, secondFib, thirdFib, fourthFib, fifthFib] = fibs()
console.log(firstFib, secondFib, thirdFib, fourthFib, fifthFib) // 0 1 1 2 3

// 数组默认值
let [g = 1] = [undefined]
console.log(g) // 1

let [d = 1] = [null]
console.log(d) // null

const f = () => 1
let [e = f()] = [undefined]
let [r = f()] = [null]
console.log(e, r) // 1 null

// 对象
let { q, w } = { q: 'q', w: 'w' }
console.log(q, w) // q w

let { x: q1 } = { x: 'x' }
console.log(q1) // x

let { w1 } = { w2: 'w2' }
console.log(w1) // undefined

let {
  y: { z: n }
} = { y: { z: 'z' } }
// y 是模式，不是变量，因此不会被赋值
console.log(n) // z

// 多层级
let obj = {
  p: ['Hello', { y: 'World' }]
}
let {
  p: po,
  p: [he, { y: wo }]
} = obj
console.log(po, he, wo) // Hello { y: 'World' }  Hello World

// 对象默认值
let { x1: x1 = 3 } = { x1: undefined }
console.log(x1) // 3
let { x2 = 3 } = { x2: null }
console.log(x2) // null

// 字符串
const [a1, b1, c1, d1, e1, f1, g1, h1] = 'hello'
console.log(a1, b1, c1, d1, e1, f1, g1, h1) // h e l l o undefined undefined undefined
const { length: len } = 'hello'
console.log(len) // 5

// 数值和布尔值的解构赋值
let { toString: s } = 123
console.log(s === Number.prototype.toString) // true
let { valueOf: v } = true
console.log(v === Boolean.prototype.valueOf) // true

// 函数参数的解构赋值
;[
  [1, 2],
  [3, 4]
].map(([a, b]) => console.log(a + b)) // 3 7
;[1, undefined, 3].map((x = 'yes') => console.log(x)) // 1 yes 3

// null 和 undefined
let { length: len1 } = null
console.log(len1) // TypeError: Cannot destructure property 'length' of 'null' as it is null.
let { length: len2 } = undefined
console.log(len2) // TypeError: Cannot destructure property 'length' of 'undefined' as it is undefined.

let o = [...[,]]
let p = [,]

// o = [undefined]
// p = [,]
// in 会跳过数组空位
console.log(0 in o, 0 in p, o) // true, false, [undefined]
