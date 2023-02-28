const arrLike = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3
}

// const s = new Set(arrLike)
// console.log(s) // TypeError: object is not iterable (cannot read property Symbol(Symbol.iterator))

const s = new Set(Array.from(arrLike))
console.log(s) // Set(3) { 'a', 'b', 'c' }

let a = NaN
let b = NaN

console.log(a === b) // false
console.log(Object.is(a, b)) // true

// add 只接受第一个参数
s.add(a)
s.add(b)
s.add('d')

console.log(s) // Set(5) { 'a', 'b', 'c', NaN ,'d' }

console.log(s.size) // 5

s.forEach((value, key) => {
  console.log(value, key) // a a, b b, c c, NaN NaN, d d
})

const m = new Map([
  [1, 1],
  ['b', 2],
  [true, 3]
])

console.log(m) // Map(3) { 1 => 1, 'b' => 2, true => 3 }

const s1 = new Set([
  [1, 2],
  [3, 4]
])

console.log(s1) // Set(2) { [1, 2], [3, 4] }
const m1 = new Map(s1)
console.log(m1) // Map(2) { 1 => 2, 3 => 4 }

// Object.is
// 对同一个键多次赋值，后面的值将覆盖前面的值。
m1.set(NaN, 1)
m1.set(NaN, 2)
console.log(m1) // Map(2) { 1 => 2, 3 => 4, NaN => 2 }

// 只有对同一个对象的引用，Map 结构才将其视为同一个键。
let o = { a: 1 }
let o1 = { a: 1 }
let o2 = o
m1.set(o, 1)
m1.set(o1, 2)
m1.set(o2, 3)

console.log(m1) // Map(3) { 1 => 2, 3 => 4, NaN => 2, { a: 1 } => 3, { a: 1 } => 2  }

// 如果读取一个未知的键，则返回 `undefined`。
console.log(m1.get('c')) // undefined

// 需要特别注意的是，Map 的遍历顺序就是插入顺序。
for (const it of m1.keys()) {
  console.log(it) // 1, 3, NaN, { a: 1 }, { a: 1 }
}

// weakRef
let target = { a: 1 }
let wr = new WeakRef(target)

let target_origin = wr.deref()

if (target_origin) {
  console.log(wr.deref()) // { a: 1 }
}
