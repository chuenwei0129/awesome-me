//! 不允许重复声明
// {
//   let a = 1
//   let a = 2
// }

// const fn = (a = 1) => {
//   let a = 2 // Identifier 'a' has already been declared
// }

// 全局作用域
// 第一种情况：
// fn 提升自此处
{
  function fn() {
    console.log('fn')
  }
}

fn()

// 函数作用域
// 第二种情况：
!(function () {
  // fn 提升自此处
  fn()
  function fn() {
    console.log('fn')
  }
})()

// 函数作用域嵌套块级作用域
// 第三种情况：
;(function () {
  // fn() fn is not a function
  if (1) {
    // fn 提升自此处
    fn()
    function fn() {
      console.log('fn')
    }
  }
})()

// for + let
for (let i = 0; i < 3; i++) {
  let i = 'abc'
  console.log(i) // abc abc abc
}

// var + let
let a = []
for (var i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i)
  }
}
a[6]() // 10

let b = []
for (let i = 0; i < 10; i++) {
  b[i] = function () {
    console.log(i)
  }
}
b[6]() // 6

// const
const o = { a: 1 }
o.a = 2
console.log(o) // {a: 2}
const PI = 3.14
PI = 2 // TypeError: Assignment to constant variable.

// TDZ
let tmp = 123

if (true) {
  tmp = 'abc' // ReferenceError: Cannot access 'tmp' before initialization
  let tmp
}
