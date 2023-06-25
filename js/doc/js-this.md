# this, call, apply 和 bind<!-- omit in toc -->

> JavaScript 语言之中运行环境也是对象，所以函数都是在某个对象之中运行，this 就是**函数运行时所在的对象（环境）**。

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

## this 隐式绑定的场景讨论

### 全局环境

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

### 对象方法

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

### 立即执行函数

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

### 高阶函数 / 回调函数

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

### setTimeout / setInterval

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

### DOM 事件绑定

`onclick` 和 `addEventListener` 中 `this` 默认指向绑定事件的元素。

IE 比较奇异，使用 `attachEvent`，里面的 `this` 默认指向 `window`。

### 箭头函数没有 this

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

### 构造函数

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

### [JavaScript：怎么理解 object 中的 this 也是 window？](https://www.zhihu.com/question/506745207/answer/2277542931)

JavaScript 的 `this` 在它自己无法自圆其说的时候就会 fallback 到 `globalThis`，在浏览器环境下即 `window`，严格模式下修正为了 `undefined`。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/web/SCR-20220807-wbz.png)

> **🤔️ 可能的解释**：[Object.prototype 下的属性为啥能在控制台直接访问？](https://github.com/chuenwei0129/awesome-me/blob/master/js/doc/js-bad.md#objectprototype-%E4%B8%8B%E7%9A%84%E5%B1%9E%E6%80%A7%E4%B8%BA%E5%95%A5%E8%83%BD%E5%9C%A8%E6%8E%A7%E5%88%B6%E5%8F%B0%E7%9B%B4%E6%8E%A5%E8%AE%BF%E9%97%AE)

## 显示绑定 this

### 手写 call / apply

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

### 手写 bind

```js
// 1. 不传值默认为 globalThis，执行时调用 call
// 2. 第一次传入的参数需要和第二次传入的参数合并
// 3. boundF 作为构造函数时，this 原来绑定会失效，指向 boundF 的实例 this
// 4. 用 `this instanceof boundF` 来判断是构造函数还是普通调用
// 5. boundF 的实例需要继承原函数原型上的方法 `this.__proto__.__proto__ === f.prototype`

// 测试用例：
function f(a, b) {
  console.log('f-this -->', this)
  return a + b
}

f.prototype.fn = () => {
  return 'fn'
}

const o = { x: 1 }
const Bound = f.bind(o, 1)
console.log(Bound, Bound(2), new Bound().fn())

Function.prototype.$bind = function (thisArg, ...$bindArgs) {
  thisArg = thisArg ?? globalThis
  // f.$bind(o, 1) ==> this === f
  const f = this
  const boundF = function (...boundFArgs) {
    // 当 new boundF 时，boundF 满足 this.__proto__ === boundF.prototype
    // 要实现 boundF 的实例继承原函数原型上的方法，即 this.__proto__ === f.prototype
    // 只需修改返回函数的 prototype 为绑定函数的 prototype 即 boundF.prototype = f.prototype
    // 但直接赋值修改并不好，因为所引用的地址相等，修改 boundF.prototype 的时候，也会直接修改 f.prototype
    // 我们可以构建原型链，将 boundF.prototype 指向 f.prototype，通过原型链来查找
    // 即只需实现 boundF.prototype.__proto__ === f.prototype
    Object.setPrototypeOf(boundF.prototype, f.prototype)
    // boundF 为构造函数调用，忽略 thisArg 绑定，this 指向当前 boundF this
    return f.call(this instanceof f ? this : thisArg, ...boundFArgs, ...$bindArgs)
  }
  return boundF
}

const $Bound = f.$bind(o, 1)
console.log($Bound, $Bound(2), new $Bound().fn())

// f-this --> { x: 1 }
// f-this --> f {}
// [Function: bound f] 3 fn
// f-this --> { x: 1 }
// f-this --> boundF {}
// [Function: boundF] 3 fn
```

## this 链式调用

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
