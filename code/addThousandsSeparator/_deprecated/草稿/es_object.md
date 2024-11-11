# JavaScript 基础知识总结(二)<!-- omit in toc -->

<details markdown="1">
  <summary>🌳 <strong>目录</strong></summary>
<br>

- [对象](#对象)
  - [对象基础知识](#对象基础知识)
  - [对于 JavaScript 的 new Object() 的疑问？](#对于-javascript-的-new-object-的疑问)
  - [Object() 工具方法](#object-工具方法)
  - [new 关键字](#new-关键字)
  - [Object.create](#objectcreate)
  - [原型与原型链](#原型与原型链)
  - [控制对象状态](#控制对象状态)
  - [属性描述对象](#属性描述对象)
  - [为什么 Object.entries 和 Array.prototype.entries 的返回值类型不同?](#为什么-objectentries-和-arrayprototypeentries-的返回值类型不同)
  - [ES5 继承](#es5-继承)
    - [原型链继承](#原型链继承)
    - [原型链继承优化](#原型链继承优化)
- [数组](#数组)
  - [Array 构造器设计上的失误](#array-构造器设计上的失误)
  - [奇技淫巧](#奇技淫巧)
  - [数组的空位](#数组的空位)
  - [JavaScript 里的 Array 为什么能直接添加属性？](#javascript-里的-array-为什么能直接添加属性)
  - [底层实现](#底层实现)
- [函数](#函数)
  - [函数对象，命名函数表达式](#函数对象命名函数表达式)
  - ['new Function' 语法](#new-function-语法)
  - [箭头函数](#箭头函数)
  - [闭包](#闭包)
    - [我现在理解的闭包](#我现在理解的闭包)
    - [我过去理解的闭包](#我过去理解的闭包)
    - [闭包代码解析](#闭包代码解析)
    - [闭包的应用](#闭包的应用)
  - [this, call, apply 和 bind](#this-call-apply-和-bind)
    - [this 隐式绑定的场景讨论](#this-隐式绑定的场景讨论)
      - [全局环境](#全局环境)
      - [对象方法](#对象方法)
      - [立即执行函数](#立即执行函数)
      - [高阶函数 / 回调函数](#高阶函数--回调函数)
      - [setTimeout / setInterval](#settimeout--setinterval)
      - [DOM 事件绑定](#dom-事件绑定)
      - [箭头函数没有 this](#箭头函数没有-this)
      - [构造函数](#构造函数)
      - [JavaScript：怎么理解 object 中的 this 也是 window？](#javascript怎么理解-object-中的-this-也是-window)
    - [显示绑定 this](#显示绑定-this)
      - [手写 call / apply](#手写-call--apply)
      - [手写 bind](#手写-bind)
    - [this 链式调用](#this-链式调用)
- [类](#类)
- [JavaScript 里 Function 也是对象？](#javascript-里-function-也是对象)
- [JS 里的 Array 属于构造函数还是类？](#js-里的-array-属于构造函数还是类)
- [JavaScript 里听说区分函数和方法，而 Java 里只听说过方法，到底有什么区别？](#javascript-里听说区分函数和方法而-java-里只听说过方法到底有什么区别)

</details>

## 对象

### 对象基础知识

对象是具有一些特殊特性的关联数组。它们存储属性（键值对），其中：

- 属性的键必须是**字符串**或者 **symbol**（通常是字符串）。
- 值可以是任何类型。
- 属性名可以是关键字。

我们可以用下面的方法访问属性：

- 点符号: `obj.property`。
- 方括号 `obj["property"]`，方括号允许从变量中获取键，例如 `obj[varWithKey]`。

其他操作：

- **计算属性**：当创建一个对象时，我们可以在对象字面量中使用方括号。
- **属性值简写**：属性名跟变量名一样。
- **删除属性**：`delete obj.prop`。
- **检查是否存在给定键的属性**：`"key" in obj`。
- **遍历对象**：`for(let key in obj)` 循环。

```js
// 对象比较
const a = { x: 1 }
const b = a

console.log(a === b) // true
```

### [对于 JavaScript 的 new Object() 的疑问？](https://www.zhihu.com/question/285068799)

```js
const a = { age: 20 }
const b = new Object(a)
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

> Object() 只在两种情况下用过：严谨判断一个值是不是对象（规范规定 typeof 有本地拓展的余地，而且类型种类也在不断更新），和得到对象状态的 Symbol（这个构造器没法 new）

```js
const s = Symbol('s')
console.log({ [s]: 1 }[Object(s)]) // 1
```

### new 关键字

使用 `new` 命令时，它后面的函数依次执行下面的步骤。

1. 创建一个空对象，作为将要返回的对象实例。
1. 将这个空对象的原型，指向构造函数的 `prototype` 属性。
1. 将这个空对象赋值给函数内部的 `this` 关键字。
1. 开始执行构造函数内部的代码。

> TIP
>
> 构造函数内部有 `return` 语句，并且 `return` 后面跟着一个对象，`new` 命令会返回 `return` 语句指定的对象，后面跟着原始类型，`new` 命令 `return` 会忽略，`new` 命令 默认返回 `{}` 对象。

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

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/js/v2-5dc8e9e596edaa0ce9a6cf6642496d31_1440w.jpg)

- **每个对象都有 `__proto__` 属性来标识自己所继承的原型，只有函数才有 `prototype` 属性。**

- 创建函数时，`JS` 会为这个函数自动添加 `prototype` 属性，值是空对象。

- 函数在当作构造函数（`constructor`）调用（即通过 `new` 关键字调用），那么 `JS` 就会帮你创建该构造函数的实例，实例继承构造函数 `prototype` 的所有属性和方法（实例通过设置自己的 `__proto__` 指向承构造函数的 `prototype` 来实现这种继承）。

- 实例的 `__proto__` 指向自己构造函数的 `prototype`。

- **`Function.prototype` 是个不同于一般函数（对象）的函数（对象）。**

- `Function.prototype` 像普通函数一样可以调用，但总是返回 `undefined`。

- **普通函数实际上是 `Function` 的实例，即普通函数继承于 `Function.prototype`。** `Object` 构造函数是 `Function` 构造函数的实例。

- `Function.prototype` 继承于`Object.prototype`，并且没有 prototype 这个属性。

- `Function.prototype` 其实是个另类的函数，可以独立于/先于 `Function` 产生。

- **`Function.prototype` 为什么是函数?**，`Array.prototype` 是 **`Array`** 类型，`Map.prototype` 是 **`Map`** 类型，`Set.prototsype` 是 **`Set`** 类型，所以，为了保持一致性，`Function.prototype` 也应该是 **`Function`** 类型

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

> [为什么 Function.prototype 可以直接执行?](https://www.zhihu.com/question/323462380)

**历史原因：** 函数的 `prototype` 属性都是引擎自动添加的，如果是用户自定义的函数，它的 `prototype` 属性就是个普通对象，**如果是内置类型的构造函数的话，它的 `prototype` 属性会是该类型的第一个实例**

```js
Number.prototype // Object(0)
String.prototype // Object("")
Boolean.prototype // Object(false)
Array.prototype // []
Function.prototype // function(){}
Date.prototype // new Date(NaN)
Error.prototype // new Error("")
RegExp.prototype // /(?:)/
```

### 控制对象状态

**有时需要冻结对象的读写状态，防止对象被改变。**`JavaScript` 提供了三种冻结方法，最弱的一种是 `Object.preventExtensions`，其次是 `Object.seal`，最强的是 `Object.freeze`

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

### [为什么 Object.entries 和 Array.prototype.entries 的返回值类型不同?](https://www.zhihu.com/question/465364604/answer/1945950621)

**API 应该有一致性**。所以所有的 `实例.prototype.keys/values/entries` （Array、Map、Set，还有 Web APIs 的集合类）返回的都是迭代器。

只有 `Object.keys/values/entries` 是例外，返回的是数组。原因其实很简单，就是这组 API 是 ES5 时代加入的，那个时候还没有迭代器（ES6 加入的）。

当然你可以追问，为啥 ES6 加入 `实例.prototype.entries` 时不保持跟 `Object.entries` 一致，返回数组？那只能说 ES6 的设计者认为这组 API 本来就应该用迭代器。其中一个重要理由可能是，对于大集合，分配一个很大的数组，性能会很差，而迭代器则没有这个负担。

### ES5 继承

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

## 数组

### Array 构造器设计上的失误

```js
Array() // []
Array(3) // [, , ,]
Array(3, 11, 8) // [3, 11, 8]
console.log(Array('a')) // ['a']
```

### 奇技淫巧

> [JavaScript 有必要缓存 for 循环中的 Array.length 吗？](https://www.zhihu.com/question/29714976)

JS 历史上有很多奇技淫巧。

比方说，在前 ES6 时代流行用 `new Array(n + 1).join(str)` 的 trick 来达成现在 `str.repeat(n)` 的效果，这个 case 里当然就没有容量什么事情。固然这个 trick 效率差，即使一定要用，也可以写成 `[].join.call({length: n + 1}, str)`，但引擎没法帮程序员改代码，也没法改变大量已经存在的代码。

类似的 trick 还有 `Array.apply(null, new Array(n)).map(fn)` 来进行类似现在 `Array.from({length: n}, fn)` 的初始化。

在这些类似的用法里，实际并不需要创建一个真的数组，而是只需要一个所谓的 `ArrayLike`，也就是一个具有数字 `length` 属性的对象 `{length: n}`，且用后即抛（马上被垃圾回收），但开发者顺手就写成了 `new Array(n)`。

### 数组的空位

> [速读 ECMAScript 6 入门（二)](doc/es6_2.md)

### [JavaScript 里的 Array 为什么能直接添加属性？](https://www.zhihu.com/question/408959053/answer/1360392908)

> **可以从 3 个角度来看待这个问题：**

**JSArray 继承 JSObject：**

```c++
// The JSArray describes JavaScript Arrays
//  Such an array can be in one of two modes:
//    - fast, backing storage is a FixedArray and length <= elements.length();
//       Please note: push and pop can be used to grow and shrink the array.
//    - slow, backing storage is a HashTable with numbers as keys.
class JSArray : public JSObject {
public:
  // [length]: The length property.
  DECL_ACCESSORS(length, Object)
}
```

JavaScript 的数组是 V8 中的 JSArray，JavaScript 的对象是 V8 中 JSObject，**JSArray 是 JSObject 的子类**。既然 JavaScript 对象可以动态添加属性，从继承的角度来说，数组应该也可以。

**JavaScript 的数组不是严格意义上的数组：**

```js
let list = []
list[9999999999999999999999999999999999999] = 2
// 1024 * 1024 * 1024 * 8 === 8589934592 // true，8G 也就这么大
```

我的电脑肯定没有足够的内存存储长度为 9999999999999999999999999999999999999 的数组，list 表面是数组，**底层数据结构明显是一个哈希表**。做为哈希表，添加属性 a、b 是很正常的行为。

**JavaScript 数组相关的内置方法也是动态添加的：**

```c++
SimpleInstallFunction(isolate_, array_function, "isArray",
                      Builtins::kArrayIsArray, 1, true);
SimpleInstallFunction(isolate_, array_function, "from",
                      Builtins::kArrayFrom, 1, false);
SimpleInstallFunction(isolate_, array_function, "of", Builtins::kArrayOf, 0,
                      false);

JSObject::AddProperty(isolate_, proto, factory->constructor_string(),
                      array_function, DONT_ENUM);

SimpleInstallFunction(isolate_, proto, "concat", Builtins::kArrayConcat, 1,
                      false);
```

V8 启动时，会执行上面的代码，为 `Array` 添加 `isArray`、`from`、`of` 属性，为 `Array.prototype` 添加 `concat`、`map`、`forEach` 等前端们耳熟能详的属性。

### 底层实现

- [探究 JS V8 引擎下的 “数组” 底层实现](https://zhuanlan.zhihu.com/p/96959371)
- [从 Chrome 源码看 JS Array 的实现](https://zhuanlan.zhihu.com/p/26388217)
- [为什么 JS 没有 Array 初始大小和扩容的概念?](https://www.zhihu.com/question/385711203)

## 函数

### 函数对象，命名函数表达式

- [x] `name` —— 函数的名字。通常取自函数定义，但如果函数定义时没设定函数名，JavaScript 会尝试通过函数的上下文猜一个函数名（例如把赋值的变量名取为函数名）。
- [x] `length` —— 函数定义时的入参的个数。**`Rest` 参数不参与计数**。

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

### 'new Function' 语法

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

### 箭头函数

- 没有 `this`
- 没有 `arguments`
- 不能使用 `new` 进行调用
- 也没有 `super`

### 闭包

#### 我现在理解的闭包

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

#### 我过去理解的闭包

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

#### 闭包代码解析

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

#### 闭包的应用

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

### this, call, apply 和 bind

> JavaScript 语言之中运行环境也是对象，所以函数都是在某个对象之中运行，this 就是**函数运行时所在的对象（环境）**。

#### this 隐式绑定的场景讨论

##### 全局环境

全局环境使用 `this`，它指的就是顶层对象 `window`。严格模式下指向 `undefined`。

```js
function f1() {
  'use strict'
  console.log(this)
}

function f2() {
  console.log(this)
}

f1() // undefined
f2() // window 对象
```

##### 对象方法

对象的方法里面包含 `this`，`this` 的指向就是方法运行时所在的对象。该方法赋值给另一个对象，就会改变 `this` 的指向

```js
let obj = {
  foo: function () {
    console.log(this)
  }
}

obj.foo() // obj
```

下面这种情况是直接调用。`this` 相当于全局上下文的情况。

```js
let obj = {
  a: function () {
    console.log(this)
  }
}
let func = obj.a

func() // window 对象
```

##### 立即执行函数

这种情况是直接调用。`this` 相当于全局上下文的情况。

```js
let obj = {
  f1: function () {
    console.log(this)
    let f2 = (function () {
      console.log(this) // window 对象
    })()
  }
}

obj.f1() // obj
```

##### 高阶函数 / 回调函数

这种情况是直接调用。`this` 相当于全局上下文的情况。

```js
let obj = {
  f1: function (cb) {
    console.log(this) // obj
    cb()
  }
}

let fn = function () {
  console.log(this) // window 对象
}

obj.f1(fn)

const o = {
  arr: [1],
  fn: function () {
    console.log(this) // o
    this.arr.map(function () {
      console.log(this) // o
    }, this)
  }
}

o.fn() // map 第二个参数不传就 this 就是 window 对象
```

##### setTimeout / setInterval

`setTimeout、setInterval` 等属于宏任务，会加入执行队列，等待下一次循环再依次执行。执行环境是 `window` 全局。

```js
setTimeout(() => {
  console.log(this)
}, 0)

setTimeout(function () {
  console.log(this)
}, 0)

setInterval(() => {
  console.log(this)
}, 0)

setInterval(function () {
  console.log(this)
}, 0)
```

##### DOM 事件绑定

`onclick` 和 `addEventListener` 中 `this` 默认指向绑定事件的元素。

IE 比较奇异，使用 `attachEvent`，里面的 `this` 默认指向 `window`。

##### 箭头函数没有 this

箭头函数没有 `this`, 因此也不能绑定。里面的 `this` 会指向当前最近的非箭头函数的 `this`，找不到就是 `window`(严格模式是 `undefined`)。

```js
let obj = {
  a: function () {
    let done = () => {
      console.log(this)
    }
    done()
  }
}

obj.a() // 找到最近的非箭头函数 a，a 现在绑定着 obj, 因此箭头函数中的 this 是 obj
```

##### 构造函数

构造函数中的 `this`，指的是实例对象。

```js
let Obj = function (p) {
  this.p = p
}
```

上面代码定义了一个构造函数 `Obj`。由于 `this` 指向实例对象，所以在构造函数内部定义 `this.p`，就相当于定义实例对象有一个 `p` 属性。

```js
let o = new Obj('Hello World!')
o.p // 'Hello World!'
```

##### [JavaScript：怎么理解 object 中的 this 也是 window？](https://www.zhihu.com/question/506745207/answer/2277542931)

#### 显示绑定 this

##### 手写 call / apply

> TIP

1. 参数可以为 `null`, `undefined`, 原始类型
2. 内部工具人属性可能存在同名属性
3. 原函数执行后会有返回值

```js
Function.prototype._call = function (thisArg, ...args) {
  thisArg = thisArg ? Object(thisArg) : globalThis
  const tmp = Symbol('tmp')
  thisArg[tmp] = this
  const ret = thisArg[tmp](...args)
  delete thisArg[tmp]
  return ret
}

console.log(Math.max.call(null, 1, 2, 3))
console.log(Math.max._call(null, 1, 2, 3))
```

##### 手写 bind

> TIP

1. 不传值默认为 `globalThis`, `null`, `undefined`, 原始类型都由 `call` 处理
2. 第一次传入的参数需要和第二次传入的参数合并
3. `bindedFn` 可以作为构造函数，此时 `this` 绑定会失效，会指向实例 `this`，`this instanceof bindedFn` 来作为判断是构造函数，还是普通调用
4. bindedFn 的实例需要继承原函数原型上的方法 `this.__proto__.__proto__ === that.prototype`

```js
const max = Math.max.bind(5)
console.log(max(1, 2, 3)) //3

const test = function () {}
test.prototype.fn = function () {
  console.log('我是原函数原型上的方法')
}

const testInstance = new (test.bind())()
testInstance.fn() // 我是原函数原型上的方法

Function.prototype._bind = function (thisArg = globalThis, ...bindArgs) {
  if (typeof this !== 'function') {
    throw new Error('Function.prototype.bind - what is trying to be bound is not callable')
  }
  const that = this
  const F = function () {}
  const bindedFn = function (...bindedArgs) {
    return that.call(this instanceof bindedFn ? this : thisArg, ...bindArgs, ...bindedArgs)
  }
  // bindedFn.prototype.__proto__ = that.prototype === F.prototype     __proto__是私有方法
  F.prototype = that.prototype // 这两步不能反过来，反过来只能实现新增原型方法，原来存在的会找不到
  bindedFn.prototype = new F()
  return bindedFn
}

const _max = Math.max._bind(5)
console.log(_max(1, 2, 3)) // 3

const _testInstance = new (test._bind())()
_testInstance.fn() // 我是原函数原型上的方法
```

#### this 链式调用

```js
const $ = {
  first() {
    console.log('first')
    return this
  },
  second() {
    console.log('second')
    return this
  },
  thead() {
    console.log('thead')
    return this
  }
}

$.first().second().thead() // 'first', 'second', 'thead'
```

## 类

> [速读 ECMAScript 6 入门（一)](doc/es6_1.md)

JavaScript 中，类是一种函数。就像函数一样，**类可以在另外一个表达式中被定义，被传递，被返回，被赋值等**。

```js
class MyClass {
  static param = val // 静态属性
  prop = value // 实例属性
  constructor(prop) { // 构造器
    // ...
    this.prop = prop // 实例属性
  }

  method(...) {} // 会丢失 this
  method = () => {} // this 永远指向实例

  get something(...) {} // getter 方法
  set something(...) {} // setter 方法

  [Symbol.iterator]() {} // 有计算名称（computed name）的方法（此处为 symbol）
  // ...
}
```

**不仅仅是语法糖：**

1. 通过 `class` 创建的函数具有特殊的内部属性标记 `[[FunctionKind]]:"classConstructor"`。因此，它与手动创建并不完全相同。
2. 类方法不可枚举。 类定义将 `"prototype"` 中的所有方法的 `enumerable` 标志设置为 `false`。
3. 类总是使用 `use strict`。 在类构造中的所有代码都将自动进入严格模式。

**在 `extends` 后允许任意表达式：**

例如，一个生成父类的函数调用：

```js
function f(phrase) {
  return class {
    sayHi() {
      alert(phrase)
    }
  }
}

class User extends f('Hello') {}

new User().sayHi() // Hello
```

**继承类的 `constructor` 必须调用 `super(...)`，并且 (!) 一定要在使用 `this` 之前调用。**

在 JavaScript 中，继承类（所谓的“派生构造器”，英文为 “derived constructor”）的构造函数与其他函数之间是有区别的。派生构造器具有特殊的内部属性 `[[ConstructorKind]]:"derived"`。这是一个特殊的内部标签。

该标签会影响它的 `new` 行为：

- 当通过 `new` 执行一个常规函数时，它将创建一个空对象，并将这个空对象赋值给 `this`。
- **但是当继承的 `constructor` 执行时，它不会执行此操作。它期望父类的 `constructor` 来完成这项工作**。
- 因此，派生的 `constructor` 必须调用 `super` 才能执行其父类（base）的 `constructor`，否则 `this` 指向的那个对象将不会被创建。并且我们会收到一个报错。

```js
class Animal {
  name = 'animal'

  constructor() {
    alert(this.name) // (*)
  }
}

class Rabbit extends Animal {
  name = 'rabbit'
}

new Animal() // animal
new Rabbit() // animal
```

这里，`Rabbit` 继承自 `Animal`，并且用它自己的值重写了 `name` 字段。

因为 `Rabbit` 中没有自己的构造器，所以 `Animal` 的构造器被调用了。

有趣的是在这两种情况下：`new Animal()` 和 `new Rabbit()`，在 `(*)` 行的 `alert` 都打印了 `animal`。

换句话说，父类构造器总是会使用它自己字段的值，而不是被重写的那一个。

```js
class Animal {
  showName() {
    // 而不是 this.name = 'animal'
    alert('animal')
  }

  constructor() {
    this.showName() // 而不是 alert(this.name);
  }
}

class Rabbit extends Animal {
  showName() {
    alert('rabbit')
  }
}

new Animal() // animal
new Rabbit() // rabbit
```

> [ES6 的子类有没有自己的 this？](https://www.zhihu.com/question/378032472/answer/1078570644)

如果子类构造器中 this 访问出现 super 之前，就很可能会造成 this 引用的相关父类状态成员没有完成初始化，所以 super 一定要在构造器中首先调用。这是 es6 做的预防。**子类的 this 这种概念很容易混肴，因为类是个静态概念，this 是动态概念，是调用时初始化的**。

## [JavaScript 里 Function 也是对象？](https://www.zhihu.com/question/24804474)

按照 ECMA-262 的说法

> An Object is logically a collection of properties.

**只要是一堆属性的组合，那就是对象**。函数就是形参、可执行代码（字符串）的组合，跟对象没有本质区别。

这一点从函数的构造函数也可以看出来：

```js
let fn = new Function('x', 'y', 'return x+y')
```

这跟数组很像

```js
let array = new Array(1,2,3)
```

## [JS 里的 Array 属于构造函数还是类？](https://www.zhihu.com/question/458323650)

这个属于概念类的东西，其实可以不那么较真，**你可以简单的认为构造函数和类是等价的概念**，是可以互换的词。

规范里每个函数对象都有个 `[[Call]]` 内部方法，同时它也可能拥有个 `[[constructor]]` 内部方法，拥有 `[[constructor]]`内部方法的函数就是构造函数（constructor，也叫构造器），而每个构造函数又都拥有一个 `[[IsClassConstructor]` 内部属性， 值是个布尔值，`true` 的话就代表它是个类（`class`）

所以从这个角度看，类和构造函数并不是并列关系，而是包含关系。**函数包含了构造函数和非构造函数两种，而构造函数又包含了类构造函数和非类构造函数两种。**

类构造函数和非类构造函数的区别就是它能不能被当成普通函数调用（不带 `new`），因为 `Array()` 是可以执行的，**所以 `Array` 不是类。**

但你一定会觉的 “`Array` 不是类”这句话很扯，`class MyArray extends Array {}` 这个代码里的 `Array` 难道我们不是把它叫成父类、超类吗，它怎么可能不是类？的确，**在作为父类使用的时候，规范又不会去检查它的 `[[IsClassConstructor]]` 是否为`true`**，而是只会检查它是不是拥有 `[[constructor]]`，也就是说，**只要是个构造函数就可以做父类**，非类的构造函数也可以做父类。

这么死扣类的概念是不是很累（no pun intended）？因为规范里之所以要搞出一个 `[[IsClassConstructor]]` 的概念，**目的是为了让用新的 `class{}` 语法写出的构造函数不能被当成普通函数调用**，并不是为了下定义而下定义。

所以还是把它们当成等价的概念简单一点

## [JavaScript 里听说区分函数和方法，而 Java 里只听说过方法，到底有什么区别？](https://www.zhihu.com/question/327545153)

在 JavaScript 里函数是身兼多职的，同一个函数可以同时是方法和构造器。规范里有对函数和方法下过定义：

> 对象：一个对象就是若干属性的集合。
> 函数：一个函数就是一个可调用的对象。
> 方法：挂在对象属性上的函数就叫方法。

对象 \> 函数 \> 方法，他们是包含关系。

实际上没有人在意这两者的关系，这两个术语经常是混用的。

从 ES6 开始，还有一个新的、从静态语义上定义的“方法”，叫 `MethodDefinition`，比如下面这些都是方法：

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
  foo: function(){},
  bar: function*() {},
  baz: async function() {},
}
```

以下面这种分类方式分类出的方法是可以用 `super` 的（因为有 `[[HomeObject]]`）。

> [下列代码为什么会产生 'super' keyword unexpected here 的错误？](https://www.zhihu.com/question/519019902)
