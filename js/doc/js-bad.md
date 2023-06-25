# JavaScript 中至少 90% 匪夷所思的问题，都是历史遗留问题<!-- omit in toc -->

> 避免 JavaScript 语言中毒瘤和糟粕

- [Object.prototype 下的属性为啥能在控制台直接访问？](#objectprototype-下的属性为啥能在控制台直接访问)
- [为什么 Function.prototype 可以直接执行?](#为什么-functionprototype-可以直接执行)
- [为什么 Object.entries 和 Array.prototype.entries 的返回值类型不同?](#为什么-objectentries-和-arrayprototypeentries-的返回值类型不同)
- [为什么 Array.prototype.reduce 没有提供 thisArg 参数?](#为什么-arrayprototypereduce-没有提供-thisarg-参数)
- [包装类](#包装类)
- [隐式类型转换](#隐式类型转换)
- [this](#this)
- [arguments](#arguments)
- [严格模式](#严格模式)

## [Object.prototype 下的属性为啥能在控制台直接访问？](https://www.zhihu.com/question/346847436/answer/829975038)

JavaScript 里有两大查找过程是链式的，一个是变量的查找，是沿着作用域链向上查。一个是对象属性的查找，是沿着对象的原型链向上查。

> **the global `this` inherit from `Object.prototype` Luckily**, more modern JavaScript engines all seem to agree that the global `this` must have `Object.prototype` in its prototype chain.

```js
globalThis === window // in browser is true
globalThis.__proto__ === Window.prototype // true
Window.prototype.__proto__ === Object.prototype // true
```

本来这两个领域是互不相关的，但因为全局对象和 `with` 语句的存在，它俩可以联系在一起，那就是变量查找转变成属性的查找，也就是说变量都可能会查找到 `Object.prototype`上，**`Object.prototype` 上的属性都是全局变量**。

## [为什么 Function.prototype 可以直接执行?](https://www.zhihu.com/question/323462380)

**历史原因：** 函数的 `prototype` 属性都是引擎自动添加的，如果是用户自定义的函数，它的 `prototype` 属性就是个普通对象，**如果是内置类型的构造函数的话，它的 `prototype` 属性会是该类型的第一个实例**

```js
// in old browser is true
Number.prototype // Object(0)
String.prototype // Object("")
Boolean.prototype // Object(false)
Array.prototype // []
Function.prototype // function(){}
Date.prototype // new Date(NaN)
Error.prototype // new Error("")
RegExp.prototype // /(?:)/
```

**兼容性：**

ES6 中把除 `Function.prototype`，`Array.prorotype` 之外的其它 6 个类型的内置类型的原型对象也改为普通对象。

在 ES7 里回滚了对 `Number.prototype` 的改动 ，同时保险起见，也把 `String.prototype` 和 `Boolean.prototype` 也都回滚了。

又过了一段时间，发现有些网站会调用 `RegExp.prototype.toString()`，会报错，所以 ES8 又不得不进行了兼容，让 `RegExp.prototype` 保持是一个普通对象的同时，对它进行特殊处理，让 `toString()` 返回 `"/(?:)/"`

![20230228153235](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/others/20230228153235.png)

## [为什么 Object.entries 和 Array.prototype.entries 的返回值类型不同?](https://www.zhihu.com/question/465364604/answer/1945950621)

**API 应该有一致性**。所以所有的 `实例.prototype.keys/values/entries` （Array、Map、Set，还有 Web APIs 的集合类）**返回的都是迭代器**。

只有 `Object.keys/values/entries` 是例外，**返回的是数组**。原因其实很简单，就是这组 API 是 ES5 时代加入的，那个时候还没有迭代器（ES6 加入的）。

当然你可以追问，为啥 ES6 加入 `实例.prototype.entries` 时不保持跟 `Object.entries` 一致，返回数组？那只能说 ES6 的设计者认为这组 API 本来就应该用迭代器。其中一个重要理由可能是，对于大集合，分配一个很大的数组，性能会很差，而迭代器则没有这个负担。

## [为什么 Array.prototype.reduce 没有提供 thisArg 参数?](https://www.zhihu.com/question/320737179/answer/684654801)

## 包装类

> [对象包装器](js-wrapper.md)

## 隐式类型转换

> [类型转换](js-type-change.md)

## [this](js-this.md)

**JavaScript 的 `this` 在它自己无法自圆其说的时候就会 fallback 到 `globalThis`，在浏览器环境下即 `window`，严格模式下修正为了 `undefined`。**

## arguments

函数有两个特殊的属性：`arguments` 和 `caller`。

在函数执行期间，`arguments` 属性就是本次执行的参数集合；在函数执行之外，`arguments` 属性的值就是 `null`。这个行为直至今天都是存在的。

```JavaScript
function a(foo) {
  console.log(foo)
  console.log(a.arguments)
  console.log(a.caller)
}

function b() {
  a(1)
}

// 作用域 b 函数内调用
b()
// 1
// [Arguments] { '0': 1 }
// [Function: b]

// 全局作用域内调用
a(2)
// 2
// [Arguments] { '0': 2 }
// [Function (anonymous)]

// 严格模式下会报错
console.log(a.arguments) // null
console.log(a.caller) // null
```

`arguments` 对象有「双向绑定」特性，这意味着：参数的值会随 arguments 对象的值的改变而变化，反之亦然。

```js
// 严格模式下，参数的值不会随 arguments 对象的值的改变而变化。
function c(foo) {
  console.log(foo) // 1
  arguments[0] = 2
  console.log(foo) // 2
}

c(1)
```

箭头函数是没有 `arguments` 局部变量的。

```js
try {
  ;(() => {}).arguments
} catch (error) {
  // TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them
  console.log(error)
}
```

> [JavaScript 黑历史 - 那些只有 1% 的人知道的特性](https://zhuanlan.zhihu.com/p/486975868)

## 严格模式

> [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Strict_mode)

- 严格模式可以应用到整个脚本或个别函数中。只需要在脚本或者函数体的顶部加上一个 'use strict'。
- 严格模式不一定需要这个语法。例如对于 ESModule 文件默认就会启用严格模式。
- 严格模式给了开发者主动禁用部分语言能力，以减轻解释器负担的机制
- **在 ES2016 中，规定了对于包含默认值和剩余参数的函数（也就是包含 ES2015 新语法的函数），禁止使用 'use strict' 指令。**
