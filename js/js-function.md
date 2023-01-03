# 函数<!-- omit in toc -->

- [函数对象，命名函数表达式](#函数对象命名函数表达式)
- [`new Function` 语法](#new-function-语法)
- [闭包](#闭包)
  - [我现在理解的闭包](#我现在理解的闭包)
  - [我过去理解的闭包（已过时）](#我过去理解的闭包已过时)
  - [闭包代码解析](#闭包代码解析)
  - [闭包的应用](#闭包的应用)
- [参数](#参数)
  - [函数的 length 属性](#函数的-length-属性)
  - [参数作用域](#参数作用域)
- [箭头函数](#箭头函数)
- [函数参数的尾逗号](#函数参数的尾逗号)
- [Function.prototype.toString()](#functionprototypetostring)
- [catch 语句可省略参数](#catch-语句可省略参数)

## 函数对象，命名函数表达式

- `name` —— 函数的名字。通常取自函数定义，但如果函数定义时没设定函数名，JavaScript 会尝试通过函数的上下文猜一个函数名（例如把赋值的变量名取为函数名）。
- `length` —— 函数定义时的入参的个数。**`Rest` 参数不参与计数**。

如果函数是通过函数表达式的形式被声明的（不是在主代码流里），并且附带了名字，那么它被称为**命名函数表达式**（Named Function Expression）

1. 它允许函数在内部引用自己。
2. 它在函数外是不可见的。

```js
let sayHi = function func(who) {
  if (who) {
    alert(`Hello, ${who}`)
  } else {
    func('Guest') // 现在一切正常
  }
}

let welcome = sayHi
sayHi = null

welcome() // Hello, Guest（嵌套调用有效）
```

**自定义属性：**

> 函数可以带有额外的属性。很多知名的 JavaScript 库都充分利用了这个功能。

它们创建一个“主”函数，然后给它附加很多其它“辅助”函数。例如，`jQuery` 库创建了一个名为 `$` 的函数。`lodash` 库创建一个 `_` 函数，然后为其添加了 `_.add`、`_.keyBy` 以及其它属性。

实际上，它们这么做是为了减少对全局空间的污染，这样一个库就只会有一个全局变量。这样就降低了命名冲突的可能性。

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

使用 `new Function` 创建的函数，它的 `[[Environment]]` 指向全局词法环境，而不是函数所在的外部词法环境。因此，我们**不能在 `new Function` 中直接使用外部变量**。

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
- 方法是捕获了实例(this)的闭包。
- 纯函数就是捕获变量数为 `0` 的闭包。

> [JS 里对象成员方法调用成员变量算不算闭包？](https://www.zhihu.com/question/522638781)

**科普：**[如何从引擎角度正确理解 JavaScript 闭包？](https://www.zhihu.com/question/458327421/answer/1876062459)

**拓展：**[Object.prototype 下的属性为啥能在控制台直接访问？](https://www.zhihu.com/question/346847436/answer/829975038)

JavaScript 里有两大查找过程是链式的，一个是变量的查找，是沿着作用域链向上查。一个是对象属性的查找，是沿着对象的原型链向上查。

本来这两个领域是互不相关的，但因为全局对象和 `with` 语句的存在，它俩可以联系在一起，那就是变量查找转变成属性的查找，也就是说变量都可能会查找到 `Object.prototype`上，**`Object.prototype` 上的属性都是全局变量**。

### 我过去理解的闭包（已过时）

> 红宝书第三版(p178)上对于闭包的定义：**闭包是指有权访问另外一个函数作用域中的变量的函数。**
>
> **作用域链：** 在 ES5 中只存在两种作用域————全局作用域和函数作用域，**当访问一个变量时，解释器会首先在当前作用域查找标示符，如果没有找到，就去父作用域找，直到找到该变量的标示符或者不在父作用域中，这就是作用域链**，值得注意的是，每一个子函数都会拷贝上级的作用域，形成一个作用域的链条。
>
> 红宝书(p73)上对于函数执行的阐述：
>
> 每次调用函数时都会创建一个全新的**函数执行环境对象**，这个就是调用栈上的对象。**初始化执行环境时会创建一个变量对象，然后初始化这个变量对象，最后确定 this 指向。每个函数调用都有一个自己的 this**。
>
> **变量对象/函数活动对象也是在函数调用时动态创建的，它不在调用栈上（不考虑解释器优化），它是单独分配创建的，函数里的局部变量以及参数都保存在这个变量对象中。**
>
> 执行环境包含一个作用域链属性，在创建执行环境时，它把函数对象自身的作用域链属性复制过来，然后将本次调用的变量对象添加到作用域链顶端，这就形成了本次调用的作用域链。函数中的名字查找都是沿着这条作用域链进行的。注意，函数对象的作用域链是在函数对象创建时创建的，和执行环境的作用域链不是一回事。
>
> **函数对象创建时，直接将外层执行环境对象的作用域链复制为自己的作用域链。这也说明了，js 函数是静态词法作用域。**
>
> **虽然外层函数执行完毕了，执行环境对象也出栈了，但是变量对象仍然被内嵌函数对象的作用域链所引用，它不会被回收**。好了，现在就可以明白了为什么内嵌函数能够直接访问外层函数的变量了。内嵌函数的作用域链中引用着外层函数执行时的变量对象。然后，这个作用域链被复制到内嵌函数的执行环境对象上，在内嵌函数中查找变量就会查到外层函数调用时的变量对象上。**这也能说明为什么内嵌函数访问的是外层变量最后的值，不是创建内嵌函数时外层变量当时的值。**

**总结：**

1. 内嵌函数执行时访问变量是沿着**函数定义时的作用域链**访问的。
2. 外层函数执行完弹出调用栈后，内层函数仍可**保持对外层函数局部变量或参数的引用，局部变量或参数的引用不会被垃圾回收**，除非被重新声明。
3. **内嵌函数访问的是外层变量最后的值，不是创建内嵌函数时外层变量当时的值**。

### 闭包代码解析

```js
function f1() {
  let a = 2
  return function f2() {
    console.log(a++)
  }
}

const f = f1()
f() // 2
f() // 3
f() // 4

f1()() // 2
f1()() // 2
```

**闭包产生的本质就是，当前环境中存在指向父级作用域的引用。**

- 这里 `f2` 会通过函数定义时的作用域链拿到父级作用域 `f1` 中的变量 `a`，这里就产生了闭包，所以除非 `a` 被重新声明，否则 `a` 会一直在内存中，不会被垃圾回收。
- `const f = f1(2)` 这段代码执行时，`f1` 入栈，并将 `f1` 中的变量 `a` 赋值为 `2`，并且将 `f2` 返回赋值给 `f`，`f1` 出栈。
- `f` 执行时，`f2` 入栈，输出 `2`，并将 `f1` 中的变量 `a` 计算为 `3`，`f2` 出栈。
- `f` 再次执行时，`f2` 入栈，此时 `a` 的值已经变为 `3`，输出 `3`，并将 `f1` 中的变量 `a` 计算为 `4`，`f2` 出栈。
- `f` 最后执行时，`f2` 入栈，此时 `a` 的值已经变为 `4`，输出 `4`，并将 `f1` 中的变量 `a` 计算为 `5`，`f2` 出栈。
- `f1()()` 执行时，`a` 变量被重新声明，所以输出 `2`。

```js
let x = 0,
  y = 1
function fn() {
  x += 2
  fn = function (y) {
    console.log(y + --x)
  }
  console.log(x, y)
}
fn(3) // 2, 1
fn(4) // 5
```

- `fn` 第一次执行，计算 `x` 的值为 `2` 给 `fn` 重新赋值新的函数，输出 `x` 为 `2`，`y` 为上层作用域的 `1`
- `fn` 第二次执行，`x` 为上层作用域的 `2`，`y` 为传入的 `4`，经过计算，输出 `5`

在这里是内层的 `fn` 函数存在着父级作用域的引用，因此产生了闭包。

### 闭包的应用

```js
// a[6]定义时在全局作用域下，执行时根据作用域链去寻找寻找上层变量，全局变量 i，全局变量 i 在循环结束时已经是 10 了，所以返回 10
var a = []
for (var i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i)
  }
}
a[6]() // 10
```

```js
// 为了解决上面的问题，我们只需要运用闭包的思想，把每一次循环的变量 i 都保存起来即可
var c = []
for (var i = 0; i < 10; i++) {
  c[i] = (function (i) {
    return function () {
      console.log(i)
    }
  })(i)
}
c[6]() // 6
```

```js
// b[6]定义时在块级作用域下，执行时根据作用域链去寻找寻找上层变量，块级变量 i，块级变量 i 每一次循环都是一个新的变量，所以返回 6
var b = []
for (let i = 0; i < 10; i++) {
  b[i] = function () {
    console.log(i)
  }
}
b[6]() // 6
```

## 参数

```js
// 惰性求值
let x = 99
const foo = (p = x + 1) => {
  console.log(p)
}
foo() // 100
x = 100
foo() // 101

// 显式输入 undefined 使默认值生效
function bar(x = 5, y = 6) {
  console.log(x, y)
}

bar(undefined, null) // 5 null
```

### 函数的 length 属性

指定了默认值以后，函数的 length 属性，将返回没有指定默认值的参数个数。也就是说，指定了默认值后，length 属性将失真。

```js
console.log(function (...args) {}.length) // 0
```

### 参数作用域

一旦设置了参数的默认值，函数进行声明初始化时，参数会形成一个单独的作用域（context）。等到初始化结束，这个作用域就会消失。**这种语法行为，在不设置参数默认值时，是不会出现的**（不设置参数默认值时参数与函数体同一作用域）。

> [ES6 参数作用域和函数体作用域是什么关系？](https://www.zhihu.com/question/325718311/answer/693162235)

```js
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
```

## 箭头函数

箭头函数有几个使用注意点。

1. 箭头函数没有自己的 `this` 对象。

2. 不可以当作构造函数，也就是说，不可以对箭头函数使用 `new` 命令，否则会抛出一个错误。

3. 不可以使用 `arguments` 对象，该对象在函数体内不存在。如果要用，可以用 `rest` 参数代替。

4. 不可以使用 `yield` 命令，因此箭头函数不能用作 Generator 函数。

> [为什么箭头函数可以被 bind?](https://www.zhihu.com/question/329538868/answer/722663600)

## 函数参数的尾逗号

ES2017 允许函数的最后一个参数有尾逗号（trailing comma）。

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

## catch 语句可省略参数

```js
try {
  // ...
} catch {
  // ...
}
```