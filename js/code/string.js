let x = 1,
  y = 2
console.log(`${x} + ${y} = ${x + y}`) // 1 + 2 = 3

const fn = () => 'hello'
console.log(`${fn()} world`) // hello world

console.log(`hello ${'world'}`) // hello world

// 可以嵌套
// 标签模板
let a = 5
let b = 10

function tag(s, v1, v2) {
  console.log(s[0]) // 'hello '
  console.log(s[1]) // ' world '
  console.log(s[2]) // ''
  console.log(v1) // 15
  console.log(v2) // 50

  return 'OK'
}

console.log(tag`Hello ${a + b} world ${a * b}`) // OK

// 先把不需要替换的参数提出来 [ 'Hello ', ' world ', ' ' ]
// 再计算 15
// 50
// tag([ 'Hello ', ' world ', ' ' ], 15, 50)

console.log('👍'.length) // 2
console.log([...'👍'].length) // 1

let s = '👍a'
console.log(s.codePointAt(0).toString(16)) // 1f44d
console.log(s.codePointAt(2).toString(16)) // 61 'a'

// for...of 也可以处理 4 字节的 UTF-16 字符
for (let char of s) {
  console.log(char.codePointAt(0).toString(16))
}
