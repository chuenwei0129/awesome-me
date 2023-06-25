// 惰性求值
let x = 99
const foo = (p = x + 1) => {
  console.log(p)
}
foo() // 100
x = 100
foo() // 101

// 参数也可以是函数
const baz = (f = (x) => x + 1) => f(42)
console.log(baz()) // 43

// 有默认值的参数都不是尾参数。这时，无法只省略该参数，而不省略它后面的参数，除非显式输入 undefined。
function bar(x = 5, y = 6) {
  console.log(x, y)
}

bar(undefined, null) // 5 null

// rest 参数
// length 失真
console.log(function (...args) {}.length) // 0

// 参数作用域
// function fn(x) {
//   let x = 10
// }
// SyntaxError: Identifier 'x' has already been declared

function f2(
  x = 2,
  f = function () {
    x = 3
  }
) {
  var x
  f()
  console.log(x)
}

f2() // 2

function f1(
  x2 = 2,
  f = function () {
    x2 = 3
  }
) {
  let x2 = 5 // SyntaxError: Identifier 'x2' has already been declared
  f()
  console.log(x2)
}
f1()

// 虽然是基础知识，但估计大部分人不知道；带默认参数值的函数的函数体里第一层作用域不能再声明 lexical 的同名参数的原因很简单：如果让你声明了，那那个参数的实参还能拿的到吗，同时也是为了和不带默认参数值的函数统一；加一层 block 就管不着了 {let y = 4}；加个 debugger Chrome 里能看到每个 y。
