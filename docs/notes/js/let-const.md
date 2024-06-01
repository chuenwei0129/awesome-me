---
title: Let 和 Const
order: 4
toc: content
group:
  title: 深入浅出
---

# let 和 const

## 不存在变量提升

```js
// var 的情况
console.log(foo) // 输出 undefined
var foo = 2

// let 的情况
console.log(bar) // 报错 ReferenceError
let bar = 2
```

## 不允许重复声明

`let` 不允许在相同作用域内，重复声明同一个变量。

```js
// 块作用域
{
  let a = 1
  let a = 2 // Identifier 'a' has already been declared
}

// 函数作用域
const fn = (a = 1) => {
  let a = 2 // Identifier 'a' has already been declared
}
```

## 块级作用域

**ES6 规定，块级作用域之中，函数声明语句的行为类似于 `let`，在块级作用域之外不可引用。**

ES6 在[附录 B](https://www.ecma-international.org/ecma-262/6.0/index.html#sec-block-level-function-declarations-web-legacy-compatibility-semantics) 里面规定，**浏览器的实现可以不遵守上面的规定**，有自己的[行为方式](https://stackoverflow.com/questions/31419897/what-are-the-precise-semantics-of-block-level-functions-in-es6)。

- 允许在块级作用域内声明函数。
- 函数声明类似于 `var`，即会提升到全局作用域或函数作用域的头部。
- 同时，函数声明还会提升到所在的块级作用域的头部。

注意，上面三条规则只对 ES6 的浏览器实现有效，其他环境的实现不用遵守，还是将块级作用域的函数声明当作 `let` 处理。

```js
// 全局作用域
// 第一种情况：
// fn 提升到 {} 外边，fn 提升自此处
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
```

**考虑到环境导致的行为差异太大，应该避免在块级作用域内声明函数**。

## 暂时性死区

```js
// TDZ 可以简单理解为 let 也存在变量提升（不完全正确但便于记忆）
let tmp = 123

if (true) {
  tmp = 'abc' // ReferenceError: Cannot access 'tmp' before initialization
  let tmp
}
```

暂时性死区的本质就是，**只要一进入当前作用域，所要使用的变量就已经存在了，但是不可获取，只有等到声明变量的那一行代码出现，才可以获取和使用该变量**。

## [for 循环的计数器](https://twitter.com/NicoloRibaudo/status/1591427882509045760)

This for loop:

```js
for (let i = 0, getI = () => i; i < 3; i++) console.log(getI()) // 0 0 0
for (let i = 0, getI = () => i; i < 3; i++, getI = () => i) console.log(getI()) // 0 1 2
```

Unrolls to:

```js
let i_initial = 0,
  getI_initial = () => i_initial

{
  let i_iteration0 = i_initial

  // TEST: i_iteration0 < 3 --> TRUE

  let getI_iteration0 = getI_initial
  console.log(getI_iteration0())

  {
    let i_iteration1 = i_iteration0
    let getI_iteration1 = getI_iteration0

    i_iteration1++

    // TEST: i_iteration1 < 3 --> TRUE

    console.log(getI_iteration1())

    {
      let i_iteration2 = i_iteration1
      let getI_iteration2 = getI_iteration1

      i_iteration2++

      // TEST: i_iteration2 < 3 --> TRUE

      console.log(getI_iteration2())

      {
        let i_iteration3 = i_iteration2
        let getI_iteration3 = getI_iteration2

        i_iteration3++

        // TEST: i_iteration3 < 3 --> FALSE
      }
    }
  }
}
```

> [let 声明的变量的生命周期是怎样的？](https://www.zhihu.com/question/332840306)

## const 本质

> [为什么为 const 变量重新赋值不是个静态错误？](https://www.cnblogs.com/ziyunfei/p/6043513.html)

对于简单类型的数据 (数值、字符串、布尔值)，值就保存在变量指向的那个内存地址，因此等同于常量。

但对于复合类型的数据 (主要是对象和数组)，变量指向的内存地址，保存的只是一个指向实际数据的指针，`const` 只能保证这个指针是固定的 (即总是指向另一个固定的地址)，至于它指向的数据结构是不是可变的，就完全不能控制了。

```js
const o = { a: 1 }
o.a = 2
console.log(o) // {a: 2}
const PI = 3.14
PI = 2 // TypeError: Assignment to constant variable.
```

## ES6 声明变量的六种方法

ES5 只有两种声明变量的方法：`var` 命令和 `function` 命令。ES6 除了添加 `let` 和 `const` 命令，另外两种声明变量的方法：`import` 命令和 `class` 命令。所以，ES6 一共有 6 种声明变量的方法。

## 顶层对象的属性

顶层对象，在浏览器环境指的是 window 对象，在 Node 指的是 global 对象。ES5 之中，顶层对象的属性与全局变量是等价的。

```js
window.a = 1
a // 1

a = 2
window.a // 2
```

ES6 为了改变这一点，一方面规定，为了保持兼容性，`var` 命令和 `function` 命令声明的全局变量，依旧是顶层对象的属性；另一方面规定，**`let` 命令、`const` 命令、`class` 命令声明的全局变量，不属于顶层对象的属性**。

## globalThis 对象

JavaScript 语言存在一个顶层对象，它提供全局环境 (即全局作用域)，所有代码都是在这个环境中运行。但是，顶层对象在各种实现里面是不统一的。

- 浏览器里面，顶层对象是 window，但 Node 和 Web Worker 没有 window。
- 浏览器和 Web Worker 里面，self 也指向顶层对象，但是 Node 没有 self。
- Node 里面，顶层对象是 global，但其他环境都不支持。
