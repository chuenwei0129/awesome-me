# 包装对象<!-- omit in toc -->

- [对象包装器](#对象包装器)
- [symbol为什么没有包装类型?](#symbol为什么没有包装类型)
- [对于 JavaScript 的 new Object() 的疑问？](#对于-javascript-的-new-object-的疑问)
- [使用两个点来调用一个方法](#使用两个点来调用一个方法)

## 对象包装器

> 以下是 JavaScript 创建者面临的悖论：

- 人们可能想对诸如字符串或数字之类的原始类型执行很多操作。最好**将它们作为方法来访问**。
- 原始类型必须尽可能的简单轻量。

而解决方案看起来多少有点尴尬，如下：

- **原始类型仍然是原始的**。与预期相同，提供单个值。
- JavaScript 允许访问字符串，数字，布尔值和 `symbol` 的方法和属性。
- 为了使它们起作用，创建了提供额外功能的特殊“对象包装器”，使用后即被销毁。

“对象包装器”对于每种原始类型都是不同的，它们被称为 `String`、`Number`、`Boolean` 和 `Symbol`。因此，它们提供了不同的方法。

```js
let str = 'Hello'
str.test = 5 // (*)
alert(str.test)
```

根据你是否开启了严格模式 `use strict`，会得到如下结果：

- `undefined`（非严格模式）
- 报错（严格模式）。

为什么？让我们看看在 `(*)` 那一行到底发生了什么：

> 1. 当访问 str 的属性时，一个“对象包装器”被创建了。
> 2. 在严格模式下，向其写入内容会报错。
> 3. 否则，将继续执行带有属性的操作，该对象将获得 test 属性，但是此后，“对象包装器”将消失，因此在最后一行，str 并没有该属性的踪迹。

**这个例子清楚地表明，原始类型不是对象。**

## [symbol为什么没有包装类型?](https://www.zhihu.com/question/316717095/answer/628772556)

**除了 `null` 和 `undefined`，JS 里的原始类型都有对应的包装对象类型**。为什么要有包装对象？是为了能用 `.` 语法来读取属性、调用方法（对象才能有属性和方法），比如 `"foo".length`、`(1).toFixed(2)` 等代码中，都隐式的用到了包装对象。`null` 和 `undefined` 不需要属性和方法，所以不需要包装对象。

同样的，`symbol` 也需要读取属性和方法，所以也需要有包装对象，但一样也不推荐直接使用包装对象。ES6 是个新的开始，可以做一些大胆的改革，**所以 `new Symbol()` 被故意设计为抛异常，而不是墨守成规返回包装对象**。但仍然能用 `Object()` 把 `symbol` 转换为包装对象，有一个原因是因为**已经有代码用 `Object(value) === value` 来判断一个值是不是对象值**。

而且比起写出 `new Number()`、`new String()`、`new Boolean()` 这样的代码，菜鸟们写出 `new Symbol()` 的概率更大，因为 `symbol` 没有字面量，而老的三种原始类型都有，有字面量的话会更容易学会用字面量。

但其实这个决定是有争议的，因为造成了语言的不统一，凭什么那仨不报错而你要报错？而且即便真把 `symbol` 的包装对象误作为属性键来使用，其实也能正常使用，因为有自动解包装的逻辑。

```js
s = Symbol()
// key 自动解包装
({[s]:1})[Object(s)] // 1
```

是墨守成规保持统一，还是开拓创新造成割裂？其实我做为一个老鸟根本不在乎。

未来的第七种原始类型 `BigInt()`，因为同样的原因，也不能被 `new`。

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