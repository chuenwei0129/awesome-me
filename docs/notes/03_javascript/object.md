---
title: Object
order: 6
toc: content
group:
  title: 数据类型
---

# 对象

## [对象的基础认知](https://www.bilibili.com/video/BV11e4y1W7CF?p=10)

![20230319092851](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/others/20230319092851.png)

![20230319092933](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/others/20230319092933.png)

![20230319093005](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/others/20230319093005.png)

![20230306224432](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/others/20230306224432.png)

![20230306224306](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/others/20230306224306.png)

> [JavaScript 凭什么不是面向对象的语言？](https://www.zhihu.com/question/506559729/answer/2276185739)

## 原型与原型链

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/js/v2-5dc8e9e596edaa0ce9a6cf6642496d31_1440w.jpg)

- **每个对象都有 `__proto__` 属性来标识自己所继承的原型，只有函数才有 `prototype` 属性。**

- 创建函数时，`JS` 会为这个函数自动添加 `prototype` 属性，值是空对象。

- 函数在当作构造函数 (`constructor`) 调用 (即通过 `new` 关键字调用)，那么 `JS` 就会帮你创建该构造函数的实例，实例继承构造函数 `prototype` 的所有属性和方法 (实例通过设置自己的 `__proto__` 指向承构造函数的 `prototype` 来实现这种继承)。

- 实例的 `__proto__` 指向自己构造函数的 `prototype`。

- **`Function.prototype` 是个不同于一般函数 (对象) 的函数 (对象)。**

- `Function.prototype` 像普通函数一样可以调用，但总是返回 `undefined`。

- **普通函数实际上是 `Function` 的实例，即普通函数继承于 `Function.prototype`。**`Object` 构造函数是 `Function` 构造函数的实例。

- `Function.prototype` 继承于 `Object.prototype`，并且没有 prototype 这个属性。

- `Function.prototype` 其实是个另类的函数，可以独立于/先于 `Function` 产生。

- **`Function.prototype` 为什么是函数？**，`Array.prototype` 是 **`Array`** 类型，`Map.prototype` 是 **`Map`** 类型，`Set.prototype` 是 **`Set`** 类型，所以，为了保持一致性，`Function.prototype` 也应该是 **`Function`** 类型

```js
/**
*   实例的 __proto__ 指向构造函数的 prototype
**/
function A(){...}  // 创建 A 函数时js同时自动生成 A.prototype

A.__proto__ === Function.prototype // A 是通过 Function 构造函数生成的

A.prototype.__proto__ === Object.prototype // 原型对象是 Object 构造函数的实例

Object.prototype.__proto__ === null //ES规范规定

Function.prototype.__proto__ === Object.prototype // ES规范规定

Object.__proto__ === Function.prototype // Object构造函数是 Function 构造函数的实例

Function.__proto__ === Function.prototype // Function构造函数是 Function 构造函数的实例

var a = new A() // new生成实例

a.__proto__ === A.prototype // new实例通过设置自己的__proto__指向承构造函数的prototype来实现这种继承

A.prototype.constructor = A // 原型的构造器

a.constructor === A // 当获取 a.constructor 时，其实 a 中并没有 constructor 属性,当不能读取到constructor 属性时，会从 a 的原型也就是 A.prototype 中读取，正好原型中有该属性
```

> [Lodash 严重安全漏洞背后你不得不知道的 JavaScript 知识](https://zhuanlan.zhihu.com/p/73186974)

## 属性描述对象

属性描述对象提供 6 个元属性

- `value` 是该属性的属性值，默认为 `undefined`
- `writable` 是一个布尔值，表示属性值 (value) 是否可改变 (即是否可写)，默认为 `true`
- `enumerable` 是一个布尔值，表示该属性是否可遍历，默认为 `true`。如果设为 `false`，会使得某些操作 (比如 `for...in` 循环、`Object.keys()`) 跳过该属性。**TIPS：in 可以读取原型链，enumerable 是为了给 in 打补丁，所以 JS 规定原型上的属性默认为 false**
- `configurable` 是一个布尔值，表示可配置性，默认为 `true`。如果设为 `false`，将阻止某些操作改写该属性，比如无法删除该属性，也不得改变该属性的属性描述对象 (`value` 属性除外)。也就是说，`configurable` 属性控制了属性描述对象的可写性。
- `get` 是一个函数，表示该属性的取值函数 (getter)，默认为 `undefined`。**可以直接在对象中书写，使用 defineProperty 修改的不可遍历，直接写的可以遍历**
- `set` 是一个函数，表示该属性的存值函数 (setter)，默认为 `undefined`。

对象的每个属性都有一个描述对象 (Descriptor)，用来控制该属性的行为。`Object.getOwnPropertyDescriptor` 方法可以获取该属性的描述对象。

```js
const obj3 = { foo: 1 }
const descriptor1 = Object.getOwnPropertyDescriptor(obj3, 'foo')

console.log(descriptor1) // { value: 1, writable: true, enumerable: true, configurable: true }
```

`Object.defineProperty()` 方法允许通过属性描述对象，定义或修改一个属性，然后返回修改后的对象，它接受三个参数，依次如下。

- `object`：属性所在的对象
- `propertyName`：字符串，表示属性名
- `attributesObject`：属性描述对象

如果一次性定义或修改多个属性，可以使用 `Object.defineProperties()` 方法。

```js
Object.defineProperties(object, {
  propertyName1: attributesObject1,
  propertyName2: attributesObject2,
  // ...
})
```

描述对象的 `enumerable` 属性，称为 “可枚举性”，如果该属性为 `false`，就表示某些操作会忽略当前属性。

- `for...in` 循环：只遍历**对象自身的和继承的可枚举**的属性。
- `Object.keys()`：返回对象**自身的所有可枚举**的属性的键名。
- `JSON.stringify()`：只串行化**对象自身的可枚举**的属性。
- `Object.assign()`：忽略 `enumerable` 为 `false` 的属性，**只拷贝对象自身的可枚举**的属性。

## 控制对象状态

**有时需要冻结对象的读写状态，防止对象被改变。**`JavaScript` 提供了三种冻结方法，最弱的一种是 `Object.preventExtensions`，其次是 `Object.seal`，最强的是 `Object.freeze`

- `Object.preventExtensions` 方法可以使得一个对象无法再添加新的属性。
- `Object.seal` 方法使得一个对象既无法添加新属性，也无法删除旧属性。
- `Object.freeze` 方法可以使得一个对象无法添加新属性、无法删除旧属性、也无法改变属性的值，使得这个对象实际上变成了常量。
- 上面的三个方法锁定对象的可写性有一个漏洞：可以通过改变原型对象，来为对象增加属性。
- 另外一个局限是，如果属性值是对象，上面这些方法只能冻结属性指向的对象，而不能冻结对象本身的内容。

## 属性的遍历

ES6 一共有 5 种方法可以遍历对象的属性。

> **（1）for...in**

`for...in` 循环遍历对象自身的和继承的可枚举属性 (不含 `Symbol` 属性)。

> **（2）Object.keys(obj)**

`Object.keys` 返回一个数组，包括对象自身的 (不含继承的) 所有可枚举属性 (不含 `Symbol` 属性) 的键名。

> **（3）Object.getOwnPropertyNames(obj)**

`Object.getOwnPropertyNames` 返回一个数组，包含对象自身的所有属性 (不含 Symbol 属性，但是包括不可枚举属性) 的键名。

> **（4）Object.getOwnPropertySymbols(obj)**

`Object.getOwnPropertySymbols` 返回一个数组，包含对象自身的所有 `Symbol` 属性的键名。

> **（5）Reflect.ownKeys(obj)**

`Reflect.ownKeys` 返回一个数组，包含对象自身的 (不含继承的) 所有键名，不管键名是 `Symbol` 或字符串，也不管是否可枚举。

以上的 5 种方法遍历对象的键名，都遵守同样的属性遍历的次序规则。

- 首先遍历所有数值键，按照数值升序排列。
- 其次遍历所有字符串键，按照加入时间升序排列。
- 最后遍历所有 `Symbol` 键，按照加入时间升序排列。

```js
console.log(
  Reflect.ownKeys({
    [Symbol()]: 1,
    10: 2,
    3: 3,
    a: 4,
  }),
) // [ '3', '10', 'a', Symbol() ]
```

上面代码中，`Reflect.ownKeys` 方法返回一个数组，包含了参数对象的所有属性。这个数组的属性次序是这样的，首先是数值属性 `3` 和 `10`，其次是字符串属性 `a`，最后是 `Symbol` 属性。

## super 关键字

`this` 关键字总是指向函数所在的当前对象，ES6 又新增了另一个类似的关键字 `super`，**指向当前对象的原型对象**。

JavaScript 引擎内部，`super.foo` 等同于 `Object.getPrototypeOf(this).foo` (属性) 或 `Object.getPrototypeOf(this).foo.call(this)` (方法)。

> [下列代码为什么会产生 ‘super’ keyword unexpected here 的错误？](https://www.zhihu.com/question/519019902)

## 对象的扩展运算符

```js
let z = { a: 3, b: 4 }
let n = { ...z }
console.log(n) // { a: 3, b: 4 }

let arrLike = { ...[1, 2, 3] }
console.log(arrLike) // { '0': 1, '1': 2, '2': 3 }

console.log({ ...{}, ...{ a: 1 }, b: 2 }) // { a: 1, b: 2 }

// 如果扩展运算符后面是字符串，它会自动转成一个类似数组的对象，因此返回的不是空对象。
// {...1} === {}, {...undefined} === {} ...
console.log({ ...1, ...'abc', ...true, ...null, ...undefined }) // { '0': 'a', '1': 'b', '2': 'c' }

// 对象的扩展运算符，只会返回参数对象自身的、可枚举的属性
class C {
  p = 12
  m() {} // 实例原型上的方法
}

let c = new C()
let clone = { ...c }

console.log(clone) // { p: 12 }

// 等同于 console.log({ ...clone, ...{ q: 13 } })
Object.assign(clone, { q: 13 })
console.log(clone) // { p: 12, q: 13 }
```

## Object() 工具方法

`Object` 本身是一个函数，可以当作工具方法使用，将任意值转为对象。

- 如果参数为空 (或者为 `undefined` 和 `null`)，`Object()` 返回一个空对象。
- 如果参数是原始类型的值，`Object` 方法将其转为对应的包装对象的实例。
- 如果 `Object` 方法的参数是一个对象，它总是返回该对象，即不用转换。

利用这一点，可以写一个判断变量是否为对象的函数。

```js
function isObject(value) {
  return value === Object(value)
}

isObject([]) // true
isObject(true) // false
```

## Object.create()

- `Object.getPrototypeOf` 方法返回参数对象的原型。
- `Object.setPrototypeOf` 方法为参数对象设置原型，返回该参数对象。它接受两个参数，第一个是现有对象，第二个是原型对象。
- 实例对象的 `isPrototypeOf` 方法，用来判断该对象是否为参数对象的原型

```js
const o = {}
// const o = {} 是 const o = new Object() 的 语法糖
console.log('构造器', o.constructor) // Object

function F() {}
// o.__proto__ = F.prototype
Object.setPrototypeOf(o, F.prototype)

console.log('修改原型链后的构造器', o.constructor) // F
```

```js
function createObject(proto) {
  function F() {}
  F.prototype = proto
  return new F()
}

const o = { o: 1 }

const instance = Object.create(o)
const _instance = createObject(o)

console.log(Object.getPrototypeOf(instance)) // {o: 1}
console.log(Object.getPrototypeOf(_instance)) // {o: 1}
console.log(o.isPrototypeOf(_instance)) // true
console.log(Object.prototype.isPrototypeOf(_instance)) // true
```

## 对象的新增方法

```js
// Object.is()
console.log(+0 === -0) // true
console.log(NaN === NaN) // false

console.log(Object.is(+0, -0)) // false
console.log(Object.is(NaN, NaN)) // true

// Object.assign()
// Object.assign() 方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）。
const target = { a: 1 }
const source1 = { a: 2, b: 2 }
const source2 = { c: 3 }

Object.assign(target, source1, source2)
console.log(target) // { a: 2, b: 2, c: 3 }

// 隐式类型转换
console.log(typeof Object.assign(2)) // "object"

// 如果 undefined 和 null 不在首参数，就不会报错。
let obj4 = { a: 1 }
console.log(Object.assign(obj4, undefined, null) === obj4) // true

// 属性名为 Symbol 值的属性，也会被 Object.assign() 拷贝。
console.log(Object.assign({ a: 'b' }, { [Symbol('c')]: 'd' })) // { a: 'b', [Symbol(c)]: 'd' }

// Object.assign 方法总是拷贝一个属性的值，而不会拷贝它背后的赋值方法或取值方法。
const source3 = {
  get foo() {
    return 1
  },
}
const target2 = {}
console.log(Object.assign(target2, source3)) // { foo: 1 }

// Object.getOwnPropertyDescriptors()
const obj5 = {
  foo: 123,
  get bar() {
    return 'abc'
  },
}

console.log(Object.getOwnPropertyDescriptors(obj5)) // { foo: { value: 123, writable: true, enumerable: true, configurable: true }, bar: { get: [Function: get bar], set: undefined, enumerable: true, configurable: true } }

// __proto__属性，Object.setPrototypeOf()，Object.getPrototypeOf()
const obj6 = { a: 1 }
const obj7 = Object.create(obj6)
console.log(obj7.__proto__ === obj6) // true

Object.setPrototypeOf(obj7, null)
console.log(obj7.__proto__ === obj6) // false
console.log(Object.getPrototypeOf(obj7)) // null

// Object.keys()，Object.values()，Object.entries()
const obj8 = { foo: 123, bar: 456 }
console.log(Object.keys(obj8)) // [ 'foo', 'bar' ]
console.log(Object.values(obj8)) // [ 123, 456 ]
console.log(Object.entries(obj8)) // [ [ 'foo', 123 ], [ 'bar', 456 ] ]

// Object.fromEntries()
console.log(
  Object.fromEntries([
    ['foo', 123],
    ['bar', 456],
  ]),
) // { foo: 123, bar: 456 }

const map = new Map([
  ['a', 1],
  ['b', 2],
])

console.log(Object.fromEntries(map)) // { a: 1, b: 2 }
```

## new 关键字

使用 `new` 命令时，它后面的函数依次执行下面的步骤。

1. 创建一个空对象，作为将要返回的对象实例。
1. 将这个空对象的原型，指向构造函数的 `prototype` 属性。
1. 将这个空对象赋值给函数内部的 `this` 关键字。
1. 开始执行构造函数内部的代码。

> TIP
>
> 构造函数内部有 `return` 语句，并且 `return` 后面跟着一个对象，`new` 命令会返回 `return` 语句指定的对象，后面跟着原始类型，`new` 命令 `return` 会忽略，`new` 命令默认返回 `{}` 对象。

```js
function _new(Constructor, ...args) {
  const instance = Object.create(Constructor.prototype)
  const res = Constructor.call(instance, ...args)
  return typeof res === 'object' && res !== null ? res : instance
}

// 构造函数默认返回 this
function Person(name, age) {
  this.name = name
  this.age = age
  // return {
  //  name: name,
  //  age: age,
  // }
}

Person.prototype.sayName = function () {
  console.log(`我的名字：${this.name}，我的年龄：${this.age}。`)
}

const student = new Person('x', 23)
student.sayName() // 我的名字：x，我的年龄：23。
const teacher = _new(Person, 'y', 35)
teacher.sayName() // 我的名字：y，我的年龄：35。
```
