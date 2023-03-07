# [Symbol](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol)<!-- omit in toc -->

- [概述](#概述)
- [内置的 Symbol 值](#内置的-symbol-值)
  - [Symbol.hasInstance](#symbolhasinstance)
  - [Symbol.iterator](#symboliterator)
  - [Symbol.toPrimitive](#symboltoprimitive)

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

## 内置的 Symbol 值

### Symbol.hasInstance

对象的 `Symbol.hasInstance` 属性，指向一个内部方法。当其他对象使用`instanceof` 运算符，判断是否为该对象的实例时，会调用这个方法。比如，`foo instanceof Foo` 在语言内部，实际调用的是 `Foo[Symbol.hasInstance](foo)`。

```js
class MyClass {
  [Symbol.hasInstance](foo) {
    return foo instanceof Array;
  }
}

// foo instanceof Foo === Foo[Symbol.hasInstance](foo)
[1, 2, 3] instanceof new MyClass() // true
```

### Symbol.iterator

对象的 `Symbol.iterator` 属性，指向该对象的默认遍历器方法。

```js
const myIterable = {};
myIterable[Symbol.iterator] = function* () {
  yield 1
  yield 2
  yield 3
};

[...myIterable] // [1, 2, 3]
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
        return 123;
      case 'string':
        return 'str';
      case 'default':
        return 'default';
      default:
        throw new Error();
      }
    }
};

2 * obj // 246
3 + obj // '3default'
obj == 'default' // true
String(obj) // 'str'
```

**没人知道的课外小知识：**

早期的 js 实现里，通过自定义的 `valueOf()` 转换对象为原始值时，会有个 `hint` 参数，表明它的上下文希望转换出的原始值是字符串还是数字，比如：

```js
obj = {valueOf(hint){console.log(hint)}}
+obj // "number"
Number(obj) // "number"
obj + "" // "string"
1[obj] // "string"
```

不过这东西最终也没有进 ES1，然而最终进了 ES6 里，成为了新的对象转换为原始值的方法 `Symbol.toPrimitive`:

```js
+{[Symbol.toPrimitive](hint){console.log(hint)}} // "number"
```
