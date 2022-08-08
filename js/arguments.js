// 在函数执行期间，arguments 属性就是本次执行的参数集合；在函数执行之外，arguments 属性的值就是 null。

// 'use strict'
function a(foo) {
  console.log(foo)
  console.log(a.arguments)
  console.log(a.caller)
}

function b() {
  // 作用域 b 函数内调用
  a(1)
}

b()
// 1
// [Arguments] { '0': 1 }
// [Function: b]

// 全局作用域内调用
a(2)
// 2
// [Arguments] { '0': 2 }
// [Function (anonymous)]

// 严格模式下报错
console.log(a.arguments) // null
console.log(a.caller) // null

try {
  ;(() => {}).arguments
} catch (error) {
  // TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them
  console.log(error)
}

function c(foo) {
  console.log(foo) // 1
  arguments[0] = 2
  console.log(foo) // 2
}

c(1)
