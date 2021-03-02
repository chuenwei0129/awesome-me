# JavaScript 基础知识梳理(下)

## 目录

1. **[面向对象编程]](#面向对象编程)**

## 面向对象编程

### Object() 工具方法

Object 本身是一个函数，可以当作工具方法使用，将任意值转为对象。

- 如果参数为空（或者为 undefined 和 null），Object() 返回一个空对象。
- 如果参数是原始类型的值，Object 方法将其转为对应的包装对象的实例。如果
- Object 方法的参数是一个对象，它总是返回该对象，即不用转换。

利用这一点，可以写一个判断变量是否为对象的函数。

```js
function isObject(value) {
	return value === Object(value)
}

isObject([]) // true
isObject(true) // false
```

### 创建对象

#### 对象字面量创建单个对象

```js
var clock = {
	hour: 23,
	minute: 23,
	second: 23,
	showTime: function () {
		console.log(`当前时间为：${this.hour}:${this.minute}:${this.second}`)
	},
}

clock.showTime()
```

#### Object 构造函数

```js
var clock = new Object()
clock.hour = 22
clock.minute = 22
clock.second = 22
clock.showTime = function () {
	console.log(`当前时间为：${this.hour}:${this.minute}:${this.second}`)
}

clock.showTime()
```

#### 工厂函数

```js
function ClockFactory(hour, minute, second) {
	// 声明一个中间对象，该对象是工厂的模子
	var obj = new Object()
	obj.hour = hour
	obj.minute = minute
	obj.second = second
	obj.showTime = function () {
		console.log(`当前时间为：${this.hour}:${this.minute}:${this.second}`)
	}
	return obj
}

var clock1 = new ClockFactory(21, 21, 21)
var clock2 = new ClockFactory(20, 20, 20)
clock1.showTime()
clock2.showTime()
```

可以无数次调用这个工厂函数，每次都会返回一个包含三个属性和一个方法的对象

工厂模式虽然解决了创建多个相似对象的问题，但是没有解决对象识别问题，即不能知道一个对象的原型

```js
Object.getPrototypeOf(clock1) === ClockFactory.prototype // false
```

#### 构造函数

```js
function ClockFunc(hour, minute, second) {
	this.hour = hour
	this.minute = minute
	this.second = second
	this.showTime = function () {
		console.log(`当前时间为：${this.hour}:${this.minute}:${this.second}`)
	}
}

var clock1 = new ClockFunc(19, 19, 19)
var clock2 = new ClockFunc(18, 18, 18)
clock1.showTime()
clock2.showTime()
```

使用这个方式创建对象可以检测对象类型

```js
Object.getPrototypeOf(clock1) === ClockFunc.prototype // true
clock1 instanceof Object // true
clock1 instanceof ClockFunc //true
```

但是使用构造函数创建对象，每个方法都要在每个实例上重新创建一次，且实列方法没法共享

#### 原型模式

```js
function Clock() {}
Clock.prototype.hour = 17
Clock.prototype.minute = 17
Clock.prototype.second = [1, 2, 3]
Clock.prototype.showTime = function () {
	console.log(`当前时间为：${this.hour}:${this.minute}:${this.second}`)
}

// 用对象字面量重写 Clock.prototype ={...}
// constructor 属性会失效，需要重写
// 无法初始化参数
// 对于基本类型：实例属性可以屏蔽原型属性。但是引用类型值，就会出现问题了。

var clock1 = new Clock()
var clock2 = new Clock()

clock1.second.push(4)
clock2.second // [1,2,3,4]
```

#### 构造函数 + 原型模式

```js
function ClockFuncProto(hour, minute, second) {
	this.hour = hour
	this.minute = minute
	this.second = second
}
ClockFuncProto.prototype.showTime = function () {
	console.log(`当前时间为：${this.hour}:${this.minute}:${this.second}`)
}

var clock = new ClockFuncProto(16, 16, 16)
clock.showTime()
```

### new 关键字

使用 `new` 命令时，它后面的函数依次执行下面的步骤。

1. 创建一个空对象，作为将要返回的对象实例。
1. 将这个空对象的原型，指向构造函数的 `prototype` 属性。
1. 将这个空对象赋值给函数内部的 `this` 关键字。
1. 开始执行构造函数内部的代码。

```js
// 因为 new 是关键字,所以我们写一个函数，命名为 _new，
// 来模拟 new 的效果。用的时候是这样的：
// var f = new F(...) === var f = _new(F, ...)

function _new() {
	// 处理参数
	var constructor = [].shift.call(arguments)
	// 创建一个新的实例对象
	var instance = {}
	// 把实例的 __proto__ 指向构造函数的 prototype
	var instance = Object.create(constructor.prototype)
	// 改变 this 指向，处理传参
	// 构造函数如果有返回值是对象的情况下，会返回该对象 new 出的实例就是该对象，其他返回实例对象
	// res 储存构造函数的返回值，apply 和 call 都相当于函数执行了一次，只是函数执行环境变化
	var res = constructor.apply(instance, arguments)
	// 返回实例对象
	return typeof res === 'object' && res != null ? res : instance
}

// 测试
function Person(name, age) {
	this.name = name
	this.age = age
	// return {
	// 	name: name,
	// 	age: age,
	// }
}

Person.prototype.sayName = function () {
	console.log(`我的名字：${this.name}，我的年龄：${this.age}。`)
}

var student = new Person('xiaoming', 23)
student.sayName() // 我的名字：xiaoming，我的年龄：23。

var teacher = _new(Person, 'malaoshi', 35)
teacher.sayName() // 我的名字：malaoshi，我的年龄：35。
```

### Object.keys() Object.Object.getOwnPropertyNames(), Object.prototype.hasOwnProperty(), Object.prototype.valueOf(), Object.prototype.toString()

- Object.keys 方法和 Object.getOwnPropertyNames 方法都用来遍历对象的属性
- Object.keys 方法只返回可枚举的属性
- Object.getOwnPropertyNames 方法还返回不可枚举的属性名
- Object.prototype.hasOwnProperty 方法接受一个字符串作为参数，返回一个布尔值，表示该实例对象自身是否具有该属性。
- valueOf 方法的作用是返回一个对象的“值”，默认情况下返回对象本身。
- toString 方法的作用是返回一个对象的字符串形式，默认情况下返回类型字符串

### 属性描述对象

属性描述对象提供 6 个元属性

- value 是该属性的属性值，默认为 undefined
- writable 是一个布尔值，表示属性值（value）是否可改变（即是否可写），默认为 true
- enumerable 是一个布尔值，表示该属性是否可遍历，默认为 true。如果设为 false，会使得某些操作（比如 for...in 循环、Object.keys()）跳过该属性。**TIPS：in 可以读取原型链，enumerable 是为了给 in 打补丁**
- configurable 是一个布尔值，表示可配置性，默认为 true。如果设为 false，将阻止某些操作改写该属性，比如无法删除该属性，也不得改变该属性的属性描述对象（value 属性除外）。也就是说，configurable 属性控制了属性描述对象的可写性。
- get 是一个函数，表示该属性的取值函数（getter），默认为 undefined。**可以直接在对象中书写，使用 defineProperty 修改的不可遍历，直接写的可以遍历**
- set 是一个函数，表示该属性的存值函数（setter），默认为 undefined。

Object.getOwnPropertyDescriptor() 方法可以获取属性描述对象。它的第一个参数是目标对象，第二个参数是一个字符串，对应目标对象的某个属性名。

Object.defineProperty() 方法允许通过属性描述对象，定义或修改一个属性，然后返回修改后的对象，它的用法如下。

```js
Object.defineProperty(object, propertyName, attributesObject)
```

Object.defineProperty 方法接受三个参数，依次如下。

- object：属性所在的对象
- propertyName：字符串，表示属性名
- attributesObject：属性描述对象

如果一次性定义或修改多个属性，可以使用 Object.defineProperties()方法。

```js
Object.defineProperties(object, {
	propertyName1: attributesObject1,
	propertyName2: attributesObject2,
	// ...
})
```

### 控制对象状态

有时需要冻结对象的读写状态，防止对象被改变。JavaScript 提供了三种冻结方法，最弱的一种是 Object.preventExtensions，其次是 Object.seal，最强的是 Object.freeze

- Object.preventExtensions 方法可以使得一个对象无法再添加新的属性。
- Object.seal 方法使得一个对象既无法添加新属性，也无法删除旧属性。
- Object.freeze 方法可以使得一个对象无法添加新属性、无法删除旧属性、也无法改变属性的值，使得这个对象实际上变成了常量。
- 上面的三个方法锁定对象的可写性有一个漏洞：可以通过改变原型对象，来为对象增加属性。
- 另外一个局限是，如果属性值是对象，上面这些方法只能冻结属性指向的对象，而不能冻结对象本身的内容

### 原型与原型链

- 每个对象都有 `__proto__` 属性来标识自己所继承的原型，只有函数才有 `prototype` 属性。

- 创建函数时，JS 会为这个函数自动添加 `prototype` 属性，值是空对象。

- 函数在当作构造函数（`constructor`）调用（即通过 `new` 关键字调用），那么 JS 就会帮你创建该构造函数的实例，实例继承构造函数 `prototype` 的所有属性和方法（实例通过设置自己的 `__proto__` 指向承构造函数的 `prototype` 来实现这种继承）。

- 实例的 `__proto__` 指向自己构造函数的 prototype。

- **`Function.prototype` 是个不同于一般函数（对象）的函数（对象）。**

- `Function.prototype` 像普通函数一样可以调用，但总是返回 `undefined`。

- 普通函数实际上是 `Function` 的实例，即普通函数继承于 `Function.prototype`。

- `Function.prototype` 继承于`Object.prototype`，并且没有 prototype 这个属性。

- `Function.prototype` 其实是个另类的函数，可以独立于/先于 `Function` 产生。

- **`Function.prototype` 为什么是函数?**，`Array.prototype` 是 Array 类型，`Map.prototype` 是 Map 类型，`Set.prototsype` 是 Set 类型，所以，为了保持一致性，`Function.prototype` 也应该是 `Function` 类型

#### 结论

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

### Object.create()

```js
function createObject(proto) {
	function F() {}
	F.prototype = proto
	return new F()
}
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
// Sub.prototype = Object.create(Super.prototype)
// Sub.prototype.constructor = Sub
// 下面相当于上面两行
Object.setPrototypeOf(Sub.prototype, Super.prototype)

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

### Object.getPrototypeOf(), Object.setPrototypeOf(), Object.prototype.isPrototypeOf()

- Object.getPrototypeOf 方法返回参数对象的原型。
- Object.setPrototypeOf 方法为参数对象设置原型，返回该参数对象。它接受两个参数，第一个是现有对象，第二个是原型对象。
- 实例对象的 isPrototypeOf 方法，用来判断该对象是否为参数对象的原型
