---
title: Function
order: 3
toc: content
group:
  title: 深入浅出
---

# 函数

## 闭包

### 我现在理解的闭包

**闭包**的英文是 **closure**，英文的意思大概是：

> a function which closes over the environment(scope) in which it was defined。

所以闭包就是：**在一个封闭的词法作用域中，将某些自由变量包在定义它的函数中**。

**拓展：**[关于闭包的应用实例，这种描述与命名是否更加贴切？](https://www.zhihu.com/question/470407199)

JS 早期封装性太差，很多人用闭包特性来实现封装性，而封装性就需要函数作用域，以至于把闭包、外部函数、作用域三者概念绑定了。

**实际上闭包就是捕获了外部变量的函数而已，外部变量在哪并不重要**。

抛开外部函数，抛开作用域。只讨论一个函数，访问了外部变量，**而且这种访问不是值的复制而是捕获了变量本身**。

**总结：**

- 任何函数都可以是闭包。
- 捕获变量的函数是通常意义的闭包。
- 方法是捕获了实例 (this) 的闭包。
- 纯函数就是捕获变量数为 `0` 的闭包。

> [JS 里对象成员方法调用成员变量算不算闭包？](https://www.zhihu.com/question/522638781)

**科普：**[如何从引擎角度正确理解 JavaScript 闭包？](https://www.zhihu.com/question/458327421/answer/1876062459)

### 闭包代码解析

```js
function f1() {
  let a = 2
  return function f2() {
    console.log(a++)
  }
}

const f = f1()

// 函数也是对象，这里 f 是一个实例执行了三次。
// f 函数捕获了自由变量 a，产生了闭包，即使 f 执行完出栈了，由于闭包的存在，a 会继续累加。
f() // 2
f() // 3
f() // 4

// f1()() 执行两次返回的函数不是同一个实例。
// 虽然也是闭包，但是 a 不会累加。
f1()() // 2
f1()() // 2
```

## 参数作用域

> 一旦设置了参数的默认值，函数进行声明初始化时，参数会形成一个单独的作用域 (context)。等到初始化结束，这个作用域就会消失。**这种语法行为，在不设置参数默认值时，是不会出现的** (不设置参数默认值时参数与函数体同一作用域。带默认参数值的函数的函数体里第一层作用域不能再声明 lexical 的同名参数，行为和不带默认参数值的函数一致。)
>
> [ES6 参数作用域和函数体作用域是什么关系？](https://www.zhihu.com/question/325718311/answer/693162235)

- es 规范的规定，为了符合直觉，兼容老代码。
- 保持 let 和参数重复的报错处理，保持 var 和参数重复的不报错并继承值的处理。

```js
function f2(
  x = 2,
  f = function () {
    x = 3
  },
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
  },
) {
  let x2 = 5 // SyntaxError: Identifier 'x2' has already been declared
  f()
  console.log(x2)
}
f1()

// 虽然是基础知识，但估计大部分人不知道；
// 带默认参数值的函数的函数体里第一层作用域不能再声明 lexical 的同名参数的原因很简单：
// 如果让你声明了，那那个参数的实参还能拿的到吗，同时也是为了和不带默认参数值的函数统一；
```

## 函数的 length 属性

`length` —— 函数定义时的入参的个数。**`Rest` 参数不参与计数**。

指定了默认值以后，函数的 length 属性，将返回没有指定默认值的参数个数。也就是说，指定了默认值后，length 属性将失真。

```js
console.log(function (...args) {}.length) // 0
```

## 箭头函数

箭头函数有几个使用注意点。

1. 箭头函数没有自己的 `this` 对象。

2. 不可以当作构造函数，也就是说，不可以对箭头函数使用 `new` 命令，否则会抛出一个错误。

3. 不可以使用 `arguments` 对象，该对象在函数体内不存在。如果要用，可以用 `rest` 参数代替。

4. 不可以使用 `yield` 命令，因此箭头函数不能用作 Generator 函数。

> [为什么箭头函数可以被 bind？](https://www.zhihu.com/question/329538868/answer/722663600)

## 函数与方法的区分

> [JavaScript 里听说区分函数和方法，而 Java 里只听说过方法，到底有什么区别？](https://www.zhihu.com/question/327545153)

在 JavaScript 里函数是身兼多职的，同一个函数可以同时是方法和构造器。规范里有对函数和方法下过定义：

> 对象：一个对象就是若干属性的集合。
> 函数：一个函数就是一个可调用的对象。
> 方法：挂在对象属性上的函数就叫方法。

对象 \> 函数 \> 方法，他们是包含关系。

实际上没有人在意这两者的关系，这两个术语经常是混用的。

从 ES6 开始，还有一个新的、从静态语义上定义的 “方法”，叫 `MethodDefinition`，比如下面这些都是方法：

```js
var obj = {
  foo() {},
  *bar() {},
  async baz() {},
}
```

这些都不算是：

```js
var obj = {
  foo: function () {},
  bar: function* () {},
  baz: async function () {},
}
```

> [下列代码为什么会产生 ‘super’ keyword unexpected here 的错误？](https://www.zhihu.com/question/519019902)

## 函数参数的尾逗号

ES2017 允许函数的最后一个参数有尾逗号 (trailing comma)。

## Function.prototype.toString()

```js
function func(x, y = 'b') {
  // do something
}

console.log(func.toString())

// function func(x, y = 'b') {
//   do something
// }
```

## `new Function` 语法

语法：

```js
let func = new Function([arg1, arg2, ...argN], functionBody)
```

由于历史原因，参数也可以按逗号分隔符的形式给出。

以下三种声明的含义相同：

```js
new Function('a', 'b', 'return a + b') // 基础语法
new Function('a,b', 'return a + b') // 逗号分隔
new Function('a , b', 'return a + b') // 逗号和空格分隔
```

使用 `new Function` 创建的函数，它的 `[[Environment]]` 指向全局词法环境，而不是函数所在的外部词法环境。

## 函数对象

> [JavaScript 里 Function 也是对象？](https://www.zhihu.com/question/24804474)

按照 ECMA-262 的说法

> An Object is logically a collection of properties.

**只要是一堆属性的组合，那就是对象**。函数就是形参、可执行代码 (字符串) 的组合，跟对象没有本质区别。

这一点从函数的构造函数也可以看出来：

```js
let fn = new Function('x', 'y', 'return x+y')
```

这跟数组很像

```js
let array = new Array(1, 2, 3)
```

> 函数可以带有额外的属性。很多知名的 JavaScript 库都充分利用了这个功能。

它们创建一个 “主” 函数，然后给它附加很多其它 “辅助” 函数。例如，`jQuery` 库创建了一个名为 `$` 的函数。`lodash` 库创建一个 `_` 函数，然后为其添加了 `_.add`、`_.keyBy` 以及其它属性。

实际上，它们这么做是为了减少对全局空间的污染，这样一个库就只会有一个全局变量。这样就降低了命名冲突的可能性。

## 拓展

- [现代浏览器生成一个 JS 函数的开销多大？](https://www.zhihu.com/question/345689944/answer/943385371)
