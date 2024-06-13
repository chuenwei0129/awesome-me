---
title: 糟粕
order: 18
toc: content
group:
  title: 深入浅出
---

# JavaScript 中至少 90% 匪夷所思的问题，都是历史遗留问题

## [Object.prototype 下的属性为啥能在控制台直接访问？](https://www.zhihu.com/question/346847436/answer/829975038)

JavaScript 里有两大查找过程是链式的，一个是变量的查找，是沿着作用域链向上查。一个是对象属性的查找，是沿着对象的原型链向上查。

> **the global `this` inherit from `Object.prototype` Luckily**, more modern JavaScript engines all seem to agree that the global `this` must have `Object.prototype` in its prototype chain.

本来这两个领域是互不相关的，但因为全局对象 (它是一个对象，所以存在 [object Object] 属性，同时它也是一个变量对象) 和 `with` 语句的存在，它俩可以联系在一起，那就是变量查找转变成属性的查找，也就是说变量都可能会查找到 `Object.prototype` 上，**`Object.prototype` 上的属性都是全局变量**。

```js
globalThis === window // in browser is true
globalThis.__proto__ === Window.prototype // true
window.__proto__.__proto__.__proto__.__proto__ === Object.prototype // true
```

## [为什么 Function.prototype 可以直接执行？](https://www.zhihu.com/question/323462380)

**历史原因：**函数的 `prototype` 属性都是引擎自动添加的，如果是用户自定义的函数，它的 `prototype` 属性就是个普通对象，**如果是内置类型的构造函数的话，它的 `prototype` 属性会是该类型的第一个实例**

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

在 ES7 里回滚了对 `Number.prototype` 的改动，同时保险起见，也把 `String.prototype` 和 `Boolean.prototype` 也都回滚了。

又过了一段时间，发现有些网站会调用 `RegExp.prototype.toString()`，会报错，所以 ES8 又不得不进行了兼容，让 `RegExp.prototype` 保持是一个普通对象的同时，对它进行特殊处理，让 `toString()` 返回 `"/(?:)/"`

![20230228153235](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/others/20230228153235.png)

## [为什么 Object.entries 和 Array.prototype.entries 的返回值类型不同？](https://www.zhihu.com/question/465364604/answer/1945950621)

**API 应该有一致性**。

所以所有的 `实例.prototype.keys/values/entries` (Array、Map、Set，还有 Web APIs 的集合类) **返回的都是迭代器**。

只有 `Object.keys/values/entries` 是例外，**返回的是数组**。原因其实很简单，就是这组 API 是 ES5 时代加入的，那个时候还没有迭代器 (ES6 加入的)。

当然你可以追问，为啥 ES6 加入 `实例.prototype.entries` 时不保持跟 `Object.entries` 一致，返回数组？那只能说 ES6 的设计者认为这组 API 本来就应该用迭代器。其中一个重要理由可能是，对于大集合，分配一个很大的数组，性能会很差，而迭代器则没有这个负担。

> [为什么 Array.prototype.reduce 没有提供 thisArg 参数？](https://www.zhihu.com/question/320737179/answer/684654801)

## 对象包装器

> 以下是 JavaScript 创建者面临的悖论：

- 人们可能想对诸如字符串或数字之类的原始类型执行很多操作。最好将这些操作作为方法来访问。
- 原始类型必须尽可能的简单轻量。

而解决方案看起来多少有点尴尬，如下：

- **原始类型仍然是原始的**。与预期相同，提供单个值。
- JavaScript 允许访问字符串，数字，布尔值和 `symbol` 的方法和属性。
- 为了使它们起作用，创建了提供额外功能的特殊 “对象包装器”，使用后即被销毁。

“对象包装器” 对于每种原始类型都是不同的，它们被称为 `String`、`Number`、`Boolean` 和 `Symbol`。因此，它们提供了不同的方法。

```js
let str = 'Hello'
str.test = 5 // (*)
alert(str.test) // ?
```

根据你是否开启了严格模式 `use strict`，会得到如下结果：

- `undefined` (非严格模式)
- 报错 (严格模式)。

为什么？让我们看看在 `(*)` 那一行到底发生了什么：

> 1. 当访问 str 的属性时，一个 “对象包装器” 被创建了。
> 2. 在严格模式下，向其写入内容会报错。
> 3. 否则，将继续执行带有属性的操作，该对象将获得 test 属性，但是此后，“对象包装器” 将消失，因此在最后一行，str 并没有该属性的踪迹。

**这个例子清楚地表明，原始类型不是对象。**

## [为什么 new Symbol() 会抛异常？](https://www.zhihu.com/question/316717095/answer/628772556)

**除了 `null` 和 `undefined`，JS 里的原始类型都有对应的包装对象类型**。为什么要有包装对象？是为了能用 `.` 语法来读取属性、调用方法 (对象才能有属性和方法)，比如 `"foo".length`、`(1).toFixed(2)` 等代码中，都隐式的用到了包装对象。`null` 和 `undefined` 不需要属性和方法，所以不需要包装对象。

同样的，`symbol` 也需要读取属性和方法，所以也需要有包装对象，但一样也不推荐直接使用包装对象。ES6 是个新的开始，可以做一些大胆的改革，**所以 `new Symbol()` 被故意设计为抛异常，而不是墨守成规返回包装对象**。但仍然能用 `Object()` 把 `symbol` 转换为包装对象，有一个原因是因为**已经有代码用 `Object(value) === value` 来判断一个值是不是对象值**。

而且比起写出 `new Number()`、`new String()`、`new Boolean()` 这样的代码，菜鸟们写出 `new Symbol()` 的概率更大，因为 `symbol` 没有字面量，而老的三种原始类型都有，有字面量的话会更容易学会用字面量。

但其实这个决定是有争议的，因为造成了语言的不统一，凭什么那仨不报错而你要报错？而且即便真把 `symbol` 的包装对象误作为属性键来使用，其实也能正常使用，因为有自动解包装的逻辑。

```js
s = Symbol()(
  // 作为 key 会自动解包装
  { [s]: 1 },
)[Object(s)] // 1
```

未来的第七种原始类型 `BigInt()`，因为同样的原因，也不能被 `new`。

## [对于 JavaScript 的 new Object() 的疑问？](https://www.zhihu.com/question/285068799)

```js
const a = { age: 20 }
// b 是 a 的 包装对象
const b = new Object(a)
console.log(a === b) // true
```

> JS 作为动态语言其实并不需要装箱拆箱，包装类对于 JS 来说本身就是画蛇添足的，现在 JS 的 coding style 也都禁用包装类。因此 `Object(v)` 或 `new Object(v)` 也没有存在的价值，应该一并被禁用。

## 使用两个点来调用一个方法

```js
alert((123456).toString(36)) // 2n9c
```

请注意 `123456..toString(36)` 中的两个点不是打错了。如果我们想直接在一个数字上调用一个方法，比如上面例子中的 `toString`，那么我们需要在它后面放置两个点 `..`。

如果我们放置一个点：`123456.toString(36)`，那么就会出现一个 `error`，因为 JavaScript 语法隐含了第一个点之后的部分为小数部分。如果我们再放一个点，那么 JavaScript 就知道小数部分为空，现在使用该方法。

也可以写成 `(123456).toString(36)`。

## 隐式类型转换

> [类型转换](type-change.md)

## [this](this.md)

**JavaScript 的 `this` 在它自己无法自圆其说的时候就会 fallback 到 `globalThis`，在浏览器环境下即 `window`，严格模式下修正为了 `undefined`。**

## arguments

`arguments` 对象有 “双向绑定” 特性，这意味着：参数的值会随 arguments 对象的值的改变而变化，反之亦然。

箭头函数是没有 `arguments` 局部变量的。

> [JavaScript 黑历史 - 那些只有 1% 的人知道的特性](https://zhuanlan.zhihu.com/p/486975868)

## [JavaScript 语句后应该加分号么？](https://www.zhihu.com/question/20298345)

## [js 中 x = x || y 和 x || (x = y) 有什么区别？](https://www.zhihu.com/question/414969457/answer/1416743993)
