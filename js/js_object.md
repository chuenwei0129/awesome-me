# JavaScript 基础知识梳理(三)<!-- omit in toc -->

- [面向对象编程](#面向对象编程)
	- [对象基础知识](#对象基础知识)
	- [Object() 工具方法](#object-工具方法)
	- [new 关键字](#new-关键字)
	- [Object.create](#objectcreate)
	- [原型与原型链](#原型与原型链)
	- [控制对象状态](#控制对象状态)
	- [属性描述对象](#属性描述对象)
	- [继承](#继承)
		- [原型链继承](#原型链继承)
		- [原型链继承优化](#原型链继承优化)
- [浅拷贝与深拷贝](#浅拷贝与深拷贝)
	- [浅拷贝](#浅拷贝)
		- [手动实现](#手动实现)
		- [Object.assign](#objectassign)
		- [concat 浅拷贝数组](#concat-浅拷贝数组)
		- [slice 浅拷贝](#slice-浅拷贝)
		- [...展开运算符](#展开运算符)
	- [深拷贝](#深拷贝)
		- [JSON.parse(JSON.stringify(target));](#jsonparsejsonstringifytarget)
		- [手写实现](#手写实现)

## 面向对象编程

### 对象基础知识

对象是具有一些特殊特性的关联数组。它们存储属性（键值对），其中：

- 属性的键必须是**字符串**或者 **symbol**（通常是字符串）。
- 值可以是任何类型。
- 属性名可以是关键字。

我们可以用下面的方法访问属性：

- 点符号: `obj.property`。
- 方括号 `obj["property"]`，方括号允许从变量中获取键，例如 `obj[varWithKey]`。

其他操作：

- 使用 `const` 声明的对象是可以被修改的
- 计算属性：当创建一个对象时，我们可以在对象字面量中使用方括号。
- 属性值简写: 属性名跟变量名一样。
- 删除属性：`delete obj.prop`。
- 检查是否存在给定键的属性：`"key" in obj`。
- 遍历对象：`for(let key in obj)` 循环。

```js
// 对象比较
const a = { x: 1 }
const b = a

console.log(a === b) // true
```

### Object() 工具方法

`Object` 本身是一个函数，可以当作工具方法使用，将任意值转为对象。

- 如果参数为空（或者为 `undefined` 和 `null`），`Object()` 返回一个空对象。
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

### new 关键字

使用 `new` 命令时，它后面的函数依次执行下面的步骤。

1. 创建一个空对象，作为将要返回的对象实例。
1. 将这个空对象的原型，指向构造函数的 `prototype` 属性。
1. 将这个空对象赋值给函数内部的 `this` 关键字。
1. 开始执行构造函数内部的代码。

> TIP

> 构造函数内部有 `return` 语句，并且 `return` 后面跟着一个对象，`new` 命令会返回 `return` 语句指定的对象，后面跟着原始类型，`new` 命令 `return` 会忽略，`new` 命令 默认返回 `{}` 对象。

```js
function _new(F, ...args) {
	const instance = Object.create(F.prototype)
	const res = F.call(instance, ...args)
	return typeof res === 'object' && res !== null ? res : instance
}

// 构造函数默认返回 this
function Person(name, age) {
	this.name = name
	this.age = age,
	// return {
	// 	name: name,
	// 	age: age,
	// }
}

Person.prototype.sayName = function () {
	console.log(`我的名字：${this.name}，我的年龄：${this.age}。`)
}

const student = new Person('xiaoming', 23)
student.sayName() // 我的名字：xiaoming，我的年龄：23。

const teacher = _new(Person, 'malaoshi', 35)
teacher.sayName() // 我的名字：malaoshi，我的年龄：35。
```

### Object.create

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

### 原型与原型链

- 每个对象都有 `__proto__` 属性来标识自己所继承的原型，只有函数才有 `prototype` 属性。

- 创建函数时，`JS` 会为这个函数自动添加 `prototype` 属性，值是空对象。

- 函数在当作构造函数（`constructor`）调用（即通过 `new` 关键字调用），那么 `JS` 就会帮你创建该构造函数的实例，实例继承构造函数 `prototype` 的所有属性和方法（实例通过设置自己的 `__proto__` 指向承构造函数的 `prototype` 来实现这种继承）。

- 实例的 `__proto__` 指向自己构造函数的 prototype。

- **`Function.prototype` 是个不同于一般函数（对象）的函数（对象）。**

- `Function.prototype` 像普通函数一样可以调用，但总是返回 `undefined`。

- 普通函数实际上是 `Function` 的实例，即普通函数继承于 `Function.prototype`。

- `Function.prototype` 继承于`Object.prototype`，并且没有 prototype 这个属性。

- `Function.prototype` 其实是个另类的函数，可以独立于/先于 `Function` 产生。

- **`Function.prototype` 为什么是函数?**，`Array.prototype` 是 Array 类型，`Map.prototype` 是 Map 类型，`Set.prototsype` 是 Set 类型，所以，为了保持一致性，`Function.prototype` 也应该是 `Function` 类型

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

### 控制对象状态

有时需要冻结对象的读写状态，防止对象被改变。`JavaScript` 提供了三种冻结方法，最弱的一种是 `Object.preventExtensions`，其次是 `Object.seal`，最强的是 `Object.freeze`

- `Object.preventExtensions` 方法可以使得一个对象无法再添加新的属性。
- `Object.seal` 方法使得一个对象既无法添加新属性，也无法删除旧属性。
- `Object.freeze` 方法可以使得一个对象无法添加新属性、无法删除旧属性、也无法改变属性的值，使得这个对象实际上变成了常量。
- 上面的三个方法锁定对象的可写性有一个漏洞：可以通过改变原型对象，来为对象增加属性。
- 另外一个局限是，如果属性值是对象，上面这些方法只能冻结属性指向的对象，而不能冻结对象本身的内容

### 属性描述对象

属性描述对象提供 6 个元属性

- `value` 是该属性的属性值，默认为 `undefined`
- `writable` 是一个布尔值，表示属性值（value）是否可改变（即是否可写），默认为 `true`
- `enumerable` 是一个布尔值，表示该属性是否可遍历，默认为 `true`。如果设为 `false`，会使得某些操作（比如 `for...in` 循环、`Object.keys()`）跳过该属性。**TIPS：in 可以读取原型链，enumerable 是为了给 in 打补丁，所以 JS 规定 原型上的属性默认为 false**
- `configurable` 是一个布尔值，表示可配置性，默认为 `true`。如果设为 `false`，将阻止某些操作改写该属性，比如无法删除该属性，也不得改变该属性的属性描述对象（`value` 属性除外）。也就是说，`configurable` 属性控制了属性描述对象的可写性。
- `get` 是一个函数，表示该属性的取值函数（getter），默认为 `undefined`。**可以直接在对象中书写，使用 defineProperty 修改的不可遍历，直接写的可以遍历**
- `set` 是一个函数，表示该属性的存值函数（setter），默认为 `undefined`。

`Object.getOwnPropertyDescriptor()` 方法可以获取属性描述对象。它的第一个参数是目标对象，第二个参数是一个字符串，对应目标对象的某个属性名。

`Object.defineProperty()` 方法允许通过属性描述对象，定义或修改一个属性，然后返回修改后的对象，它的用法如下。

```js
Object.defineProperty(object, propertyName, attributesObject)
```

`Object.defineProperty()` 方法接受三个参数，依次如下。

- `object`：属性所在的对象
- `propertyName`：字符串，表示属性名
- `attributesObject`：属性描述对象

如果一次性定义或修改多个属性，可以使用 `Object.defineProperties()` 方法。

```js
Object.defineProperties(object, {
  propertyName1: attributesObject1,
  propertyName2: attributesObject2
  // ...
})
```

### 继承

#### 原型链继承

```js
// 第一版
function Super() {
  this.super_param = [1, 2, 3]
}
Super.prototype.getSuperParam = function () {
  return this.super_param
}
function Sub() {
  this.sub_param = true
}
Sub.prototype = new Super()
Sub.prototype.getSubParam = function () {
  return this.sub_param
}
var instance1 = new Sub()
var instance2 = new Sub()
instance1.super_param.push(4)

console.log(instance1.super_param) // [1, 2, 3, 4]
console.log(instance2.super_param) // [1, 2, 3, 4]

// 缺点1：引用类型属性共享
// 缺点2：Sub.prototype 重写丢失 constructor
```

#### 原型链继承优化

```js
// 第二版
function Super() {
  this.super_param = [1, 2, 3]
}
Super.prototype.getSuperParam = function () {
  return this.super_param
}
function Sub() {
  Super.call(this)
  this.sub_param = true
}
Sub.prototype = new Super()
Sub.prototype.constructor = Sub
Sub.prototype.getSubParam = function () {
  return this.sub_param
}
var instance1 = new Sub()
var instance2 = new Sub()
instance1.super_param.push(4)

console.log(instance1.super_param) // [1, 2, 3, 4]
console.log(instance2.super_param) // [1, 2, 3]
console.log(Sub.prototype.constructor === Sub) // true

// 缺点：Super() 调用了两次
```

```js
// 第三版
function Super() {
  this.super_param = [1, 2, 3]
}
Super.prototype.getSuperParam = function () {
  return this.super_param
}
function Sub() {
  Super.call(this)
  this.sub_param = true
}
// Sub.prototype = Object.create(Super.prototype) // 重写了 Sub.prototype === {}
// Sub.prototype.constructor = Sub
// 下面相当于上面两行
Object.setPrototypeOf(Sub.prototype, Super.prototype) // 设置原型链会覆盖默认的原型链关系

Sub.prototype.getSubParam = function () {
  return this.sub_param
}
var instance1 = new Sub()
var instance2 = new Sub()
instance1.super_param.push(4)

console.log(instance1.super_param) // [1, 2, 3, 4]
console.log(instance2.super_param) // [1, 2, 3]
console.log(Sub.prototype.constructor === Sub) // true
```

## 浅拷贝与深拷贝

ES6 一共有 5 种方法可以遍历对象的属性。

（1）`for...in`

for...in 循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）。

（2）`Object.keys(obj)`

Object.keys 返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名。

（3）`Object.getOwnPropertyNames(obj)`

Object.getOwnPropertyNames 返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名。

（4）`Object.getOwnPropertySymbols(obj)`

Object.getOwnPropertySymbols 返回一个数组，包含对象自身的所有 Symbol 属性的键名。

（5）`Reflect.ownKeys(obj)`

Reflect.ownKeys 返回一个数组，包含对象自身的（不含继承的）所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举。

> 以上的 5 种方法遍历对象的键名，都遵守同样的属性遍历的次序规则。

- 首先遍历所有数值键，按照数值升序排列。

- 其次遍历所有字符串键，按照加入时间升序排列。

- 最后遍历所有 Symbol 键，按照加入时间升序排列。

> TIP

一个数据结构只要部署了 `Symbol.iterator` 属性，就被视为具有 iterator 接口，就可以用 for...of 循环遍历它的成员。

`JSON.stringify()`：只串行化对象自身的可枚举的属性。

`Object.assign()`： 忽略 enumerable 为 false 的属性，只拷贝对象自身的可枚举的属性。

### 浅拷贝

#### 手动实现

```js
const copy = target => {
  let res
  if (typeof target === 'object' && target !== null) {
    res = Array.isArray(target) ? [] : {}
    for (let key in target) {
      if (target.hasOwnProperty(key)) {
        res[key] = target[key]
      }
    }
  } else {
    res = target
  }
  return res
}
```

#### Object.assign

```js
let arr = [1, 2, 3]
let newArr = []

Object.assign(newArr, arr)
newArr[0] = 100

console.log(arr, newArr) // [ 1, 2, 3 ] [ 100, 2, 3 ]
```

#### concat 浅拷贝数组

```js
let arr = [1, 2, 3]
let newArr = arr.concat()
newArr[0] = 100

console.log(arr, newArr) // [ 1, 2, 3 ] [ 100, 2, 3 ]
```

#### slice 浅拷贝

```js
let arr = [1, 2, 3]
let newArr = arr.slice()
newArr[0] = 100

console.log(arr, newArr) // [1, 2, 3] [ 100, 2, 3 ]
```

#### ...展开运算符

```js
let arr = [1, 2, 3]
let newArr = [...arr] // 跟 arr.slice() 是一样的效果
```

### 深拷贝

> 在计算机程序设计中，弱引用与强引用相对， 是指不能确保其引用的对象不会被垃圾回收器回收的引用。 一个对象若只被弱引用所引用，则被认为是不可访问（或弱可访问）的，并因此可能在任何时刻被回收。 --百度百科

> 说的有一点绕，我用大白话解释一下，被弱引用的对象可以在任何时候被回收，而对于强引用来说，只要这个强引用还在，那么对象无法被回收。

#### JSON.parse(JSON.stringify(target));

> 谈到深拷贝，我第一个想到的也是它。但是实际上，对于某些严格的场景来说，这个方法是有巨大的坑的。问题如下：

**测试对象**

```js
const test = {
  // undefined
  undefined,
  // function
  func() {
    console.log('我是函数')
  },
  // 特殊对象
  regexp: /\d/
}

// 循环引用
test.target = test
// symbol 属性
test[Symbol('symbol')] = 'symbol'
// 不可枚举属性
Object.defineProperty(test, 'enumObj', {
  value: 'enumObj',
  enumerable: false
})
```

1. `test.target = test` 循环引用的问题。拷贝 test 会出现系统栈溢出，因为出现了无限递归的情况。

   `js Uncaught TypeError: Converting circular structure to JSON --> starting at object with constructor 'Object' --- property 'target' closes the circle `

2. 无法拷贝 `undefined`
3. 无法拷贝 `symbol` 属性
4. 无法拷贝不可枚举的属性
5. 无法拷贝特殊的对象，诸如 `RegExp`, `Date`, `Set`, `Map` 等。
6. 无法拷贝函数。

#### 手写实现

> TIP

实现一个完美的深拷贝需要考虑的细节实在太多了，类似冻结对象、Buffer 等等，具体实现可参考这篇文章：[如何写出一个惊艳面试官的深拷贝?](https://juejin.im/post/6844903929705136141)

```js
const test = {
  // undefined
  undefined,
  // function
  func() {
    console.log('我是函数')
  },
  // 特殊对象
  regexp: /\d/
}

// symbol 属性
test[Symbol('symbol')] = 'symbol'
// 不可枚举属性
Object.defineProperty(test, 'enumObj', {
  enumerable: false,
  // getter，setter
  get() {
    return 20
  }
})
// 原型链上的方法
const F = function () {}
F.prototype.sayHello = () => {
  console.log('我是原型链上的方法')
}
Object.setPrototypeOf(test, F.prototype)

const _test = JSON.parse(JSON.stringify(test))
console.log('JSON 序列化拷贝', _test)

// 循环引用
test.target = test

console.log('原对象', test)

const deepCopy = (target, cache = new WeakMap()) => {
  let res
  // 将返回值和循环引用的对象用 map 映射起来 处理循环引用
  if (cache.has(target)) return cache.get(target)
  if (typeof target === 'object' && target !== null) {
    // 处理原型链
    res = Array.isArray(target) ? [] : new target.constructor()
    // 处理循环引用
    cache.set(target, res)
    // 处理不可枚举属性、symbol 属性
    for (const key of Reflect.ownKeys(target)) {
      res[key] =
        typeof target[key] === 'object' && target[key] !== null
          ? deepCopy(target[key], cache)
          : target[key]
    }
  } else {
    res = target
  }
  return res
}

const __test = deepCopy(test)
console.log('deepCopy 拷贝', __test)
```
