# this, call, apply 和 bind

> JavaScript 语言之中运行环境也是对象，所以函数都是在某个对象之中运行，this 就是**函数运行时所在的对象（环境）**。

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
