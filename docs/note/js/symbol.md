---
title: Symbol
order: 4
toc: content
group:
  title: 数据类型
---

# Symbol

## 概述

ES6 引入了一种新的原始数据类型 `Symbol`，表示独一无二的值。

```js
let s1 = Symbol()
let s2 = Symbol('foo')
let s3 = Symbol('bar')
let s4 = Symbol()

// Symbol 值可以显式转为字符串
console.log(s1.toString(), s2.toString(), s3.toString()) // Symbol() Symbol(foo) Symbol(bar)
console.log(s1 === s4) // false
console.log(String(s1) === String(s4)) // true

// Symbol 值也可以转为布尔值，但是不能转为数值
console.log(!s1) // false

// ES2019 提供了一个实例属性 description，直接返回 Symbol 的描述。
console.log(s3.description) // bar

// 有时，我们希望重新使用同一个 Symbol 值，Symbol.for() 方法可以做到这一点。
let s5 = Symbol.for('foo')
let s6 = Symbol.for('foo')

console.log(s5 === s6) // true

// Symbol.keyFor() 方法返回一个已登记的 Symbol 类型值的 key。
console.log(Symbol.keyFor(s5)) // foo
console.log(Symbol.keyFor(s2)) // undefined

// Symbol.for() 为 Symbol 值登记的名字，是全局环境的，不管有没有在全局环境运行。
```

## symbol 的引用

在 JavaScript 中，当我们说有对某个 `Symbol` 的引用，意味着你在代码中持有那个 `Symbol` 实例的一个变量或常量，从而能够通过这个引用来访问使用该 `Symbol` 作为键的对象属性。

`Symbol` 是一种原始数据类型，每次通过 `Symbol()` 函数调用创建的 `Symbol` 都是唯一的。即便两个 `Symbol` 的描述相同，它们也是不相等的。因此，要访问一个使用 `Symbol` 作为键的属性，你必须直接使用那个 `Symbol` 的引用。

这里有一个简单的例子来说明这一点：

```javascript
let sym = Symbol('mySymbol') // 创建一个 Symbol
let obj = {
  [sym]: 'symbol value', // 使用 Symbol 作为对象属性的键
}

console.log(obj[sym]) // "symbol value"，通过 Symbol 的引用访问属性值
```

在这个例子中，变量 `sym` 持有一个 `Symbol` 的引用，这个 `Symbol` 被用作对象 `obj` 的一个属性键。只有通过变量 `sym` 才能访问到这个属性，因为 `sym` 是持有那个唯一 `Symbol` 引用的变量。

如果没有这个 `Symbol` 的引用，就没有办法直接访问到用它作为键的属性：

```javascript
let sym2 = Symbol('mySymbol') // 即使描述相同，sym2 也是一个全新的、不同于 sym 的 Symbol
console.log(obj[sym2]) // undefined，因为 sym2 和 sym 是不同的 Symbol
```

因此，当我们谈论 “有对该 `Symbol` 的引用”，就是指你能够通过某个变量或常量来访问那个 `Symbol`，并利用它来访问或操作使用该 `Symbol` 作为键的对象属性。这是 `Symbol` 用于创建 “私有” 属性的关键机制，因为没有正确的 `Symbol` 引用，这些属性就像是对外部代码隐藏的。

## 做为私有属性

在 JavaScript 中为了实现私有属性，之前常用的一种方式是**命名规范约定，方法名以 `_` 开始**。

**Symbol 出现之后看到的一个相对较多的场景是用它来模式私有属性、方法**。这对一些 `for...in`、`Object.getOwnPropertyNames()` 操作是可以隐藏掉这些属性，但是 ES6 中的 Symbol 和强类型语言中的 `private` 相比并不完全是私有的，仍然能通过 `Object.getOwnPropertySymbols()`、`Reflect.ownKeys()` 操作枚举到这些属性进行访问。

## well-known symbols

Well-known Symbol：这些是语言规范定义的特殊符号，它们被用于表示语言行为的内部机制。例如，`Symbol.iterator` 用于定义一个对象的默认迭代器，当使用 `for...of` 循环时，就会查找这个符号。

### Symbol.hasInstance

对象的 `Symbol.hasInstance` 属性，指向一个内部方法。当其他对象使用 `instanceof` 运算符，判断是否为该对象的实例时，会调用这个方法。比如，`foo instanceof Foo` 在语言内部，实际调用的是 `Foo[Symbol.hasInstance](foo)`。

```js
class MyClass {
  [Symbol.hasInstance](foo) {
    return foo instanceof Array
  }
}

// foo instanceof Foo === Foo[Symbol.hasInstance](foo)
;[1, 2, 3] instanceof new MyClass() // true
```

### Symbol.iterator

对象的 `Symbol.iterator` 属性，指向该对象的默认遍历器方法。

```js
const myIterable = {}
myIterable[Symbol.iterator] = function* () {
  yield 1
  yield 2
  yield 3
}
;[...myIterable] // [1, 2, 3]
```

### Symbol.toPrimitive

对象的 `Symbol.toPrimitive` 属性，指向一个方法。该对象被转为原始类型的值时，会调用这个方法，返回该对象对应的原始类型值。

`Symbol.toPrimitive` 被调用时，会接受一个字符串参数，表示当前运算的模式，一共有三种模式。

- Number：该场合需要转成数值
- String：该场合需要转成字符串
- Default：该场合可以转成数值，也可以转成字符串

```js
let obj = {
  [Symbol.toPrimitive](hint) {
    switch (hint) {
      case 'number':
        return 123
      case 'string':
        return 'str'
      case 'default':
        return 'default'
      default:
        throw new Error()
    }
  },
}

2 * obj // 246
3 + obj // '3default'
obj == 'default' // true
String(obj) // 'str'
```

**没人知道的课外小知识：**

早期的 js 实现里，通过自定义的 `valueOf()` 转换对象为原始值时，会有个 `hint` 参数，表明它的上下文希望转换出的原始值是字符串还是数字，比如：

```js
obj =
  {
    valueOf(hint) {
      console.log(hint)
    },
  } + obj // "number"
Number(obj) // "number"
obj + '' // "string"
;(1)[obj] // "string"
```

不过这东西最终也没有进 ES1，然而最终进了 ES6 里，成为了新的对象转换为原始值的方法 `Symbol.toPrimitive`：

```js
;+{
  [Symbol.toPrimitive](hint) {
    console.log(hint)
  },
} // "number"
```
