# JavaScript 基础知识梳理(二)<!-- omit in toc -->

- [作用域, 调用堆栈, 闭包](#作用域-调用堆栈-闭包)
	- [闭包产生的原因 ?](#闭包产生的原因-)
	- [那是不是只有返回函数才算是产生了闭包呢？](#那是不是只有返回函数才算是产生了闭包呢)
	- [闭包的应用](#闭包的应用)
- [this, call, apply 和 bind](#this-call-apply-和-bind)
	- [隐式绑定的场景讨论](#隐式绑定的场景讨论)
		- [全局环境](#全局环境)
		- [对象方法](#对象方法)
			- [方法](#方法)
			- [赋值](#赋值)
		- [立即执行函数](#立即执行函数)
		- [高阶函数 / 回调函数](#高阶函数--回调函数)
		- [setTimeout / setInterval](#settimeout--setinterval)
		- [DOM 事件绑定](#dom-事件绑定)
		- [箭头函数](#箭头函数)
		- [new + 构造函数](#new--构造函数)
	- [显示绑定](#显示绑定)
		- [手写 call / apply](#手写-call--apply)
		- [手写 bind](#手写-bind)
	- [链式调用](#链式调用)

## 作用域, 调用堆栈, 闭包

> TIP
>
> 红宝书(p178)上对于闭包的定义：**闭包是指有权访问另外一个函数作用域中的变量的函数**

> TIP

> 作用域链：在 ES5 中只存在两种作用域————全局作用域和函数作用域，`当访问一个变量时，解释器会首先在当前作用域查找标示符，如果没有找到，就去父作用域找，直到找到该变量的标示符或者不在父作用域中，这就是作用域链`，值得注意的是，每一个子函数都会拷贝上级的作用域，形成一个作用域的链条。

### 闭包产生的原因 ?

> 红宝书(p73)上对于函数执行的阐述：

> 每次调用函数时都会创建一个全新的**函数执行环境对象**，这个就是调用栈上的对象。**初始化执行环境时会创建一个变量对象，然后初始化这个变量对象，最后确定 this 指向。每个函数调用都有一个自己的 this**。

> **变量对象/函数活动对象也是在函数调用时动态创建的，它不在调用栈上（不考虑解释器优化），它是单独分配创建的，函数里的局部变量以及参数都保存在这个变量对象中。**
>
> 执行环境包含一个作用域链属性，在创建执行环境时，它把函数对象自身的作用域链属性复制过来，然后将本次调用的变量对象添加到作用域链顶端，这就形成了本次调用的作用域链。函数中的名字查找都是沿着这条作用域链进行的。注意，函数对象的作用域链是在函数对象创建时创建的，和执行环境的作用域链不是一回事。
>
> **函数对象创建时，直接将外层执行环境对象的作用域链复制为自己的作用域链。这也说明了，js 函数是静态词法作用域。**
>
> **虽然外层函数执行完毕了，执行环境对象也出栈了，但是变量对象仍然被内嵌函数对象的作用域链所引用，它不会被回收**。好了，现在就可以明白了为什么内嵌函数能够直接访问外层函数的变量了。内嵌函数的作用域链中引用着外层函数执行时的变量对象。然后，这个作用域链被复制到内嵌函数的执行环境对象上，在内嵌函数中查找变量就会查到外层函数调用时的变量对象上。**这也能说明为什么内嵌函数访问的是外层变量最后的值，不是创建内嵌函数时外层变量当时的值。**

我的理解：

1. `内嵌函数执行时访问变量是沿着函数定义时的作用域链访问的。`
2. `外层函数执行完弹出调用栈后，内层函数仍可保持对外层函数局部变量或参数的引用，局部变量或参数的引用不会被垃圾回收，除非被重新声明。`
3. `内嵌函数访问的是外层变量最后的值，不是创建内嵌函数时外层变量当时的值。`
4. `函数执行时会确定 this 指向。`

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

- 这里 f2 会通过函数定义时的作用域链拿到父级作用域 f1 中的变量 a，这里就产生了闭包，所以除非 a 被重新声明，否则 a 会一直在内存中，不会被垃圾回收
- `const f = f1(2)`这段代码执行时，f1 入栈，并将 f1 中的变量 a 赋值为 2，并且将 f2 返回赋值给 f，f1 出栈
- f 执行时，f2 入栈，输出 2，并将 f1 中的变量 a 计算为 3，f2 出栈
- f 再次执行时，f2 入栈，此时 a 的值已经变为 3，输出 3，并将 f1 中的变量 a 计算为 4，f2 出栈
- f 最后执行时，f2 入栈，此时 a 的值已经变为 4，输出 4，并将 f1 中的变量 a 计算为 5，f2 出栈
- `f1()()` 执行时，a 变量被重新声明，所以输出 2

### 那是不是只有返回函数才算是产生了闭包呢？

回到闭包的本质，我们只需要让父级作用域的引用存在即可，因此我们还可以这么做：

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

- fn 第一次执行，计算 x 的值为 2 给 fn 重新赋值新的函数，输出 x 为 2，y 为上层作用域的 1
- fn 第二次执行，x 为上层作用域的 2，y 为传入的 4，经过计算，输出 5

在这里是内层的 fn 函数存在着父级作用域的引用，因此产生了闭包，形式变了，本质没有改变。

### 闭包的应用

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

## this, call, apply 和 bind

> JavaScript 语言之中，一切皆对象，运行环境也是对象，所以函数都是在某个对象之中运行，this 就是**函数运行时**所在的对象（环境）。

### 隐式绑定的场景讨论

#### 全局环境

全局环境使用 this，它指的就是顶层对象 window。严格模式下指向 undefined。

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

#### 对象方法

对象的方法里面包含 this，this 的指向就是方法运行时所在的对象。该方法赋值给另一个对象，就会改变 this 的指向

##### 方法

```js
let obj = {
	foo: function () {
		console.log(this)
	},
}

obj.foo() // obj
```

##### 赋值

这种情况是直接调用。this 相当于全局上下文的情况。

```js
let obj = {
	a: function () {
		console.log(this)
	},
}
let func = obj.a

func() // window 对象
```

#### 立即执行函数

这种情况是直接调用。this 相当于全局上下文的情况。

```js
let obj = {
	f1: function () {
		console.log(this)
		let f2 = (function () {
			console.log(this) // window 对象
		})()
	},
}

obj.f1() // obj
```

#### 高阶函数 / 回调函数

这种情况是直接调用。this 相当于全局上下文的情况。

```js
let obj = {
	f1: function (cb) {
		console.log(this) // obj
		cb()
	},
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
	},
}

o.fn() // map 第二个参数不传就 this 就是 window 对象
```

#### setTimeout / setInterval

`setTimeout、setInterval` 等属于宏任务，会加入执行队列，等待下一次循环再依次执行。执行环境是 window 全局。

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

#### DOM 事件绑定

`onclick` 和 `addEventerListener` 中 this 默认指向绑定事件的元素。

IE 比较奇异，使用 `attachEvent`，里面的 this 默认指向 window。

#### 箭头函数

箭头函数没有 this, 因此也不能绑定。里面的 this 会指向当前最近的非箭头函数的 this，找不到就是 window(严格模式是 undefined)。

```js
let obj = {
	a: function () {
		let done = () => {
			console.log(this)
		}
		done()
	},
}

obj.a() // 找到最近的非箭头函数 a，a 现在绑定着 obj, 因此箭头函数中的 this 是 obj
```

#### new + 构造函数

构造函数中的 this，指的是实例对象。

```js
let Obj = function (p) {
	this.p = p
}
```

上面代码定义了一个构造函数 Obj。由于 this 指向实例对象，所以在构造函数内部定义 this.p，就相当于定义实例对象有一个 p 属性。

```js
let o = new Obj('Hello World!')
o.p // 'Hello World!'
```

### 显示绑定

#### 手写 call / apply

> TIP

1. 参数可以为 null, undefined, 原始类型
2. 内部工具人属性可能存在同名属性
3. 原函数执行后会有返回值

```js
Function.prototype._call = function (thisArg, ...args) {
	thisArg = thisArg ? Object(thisArg) : globalThis
	const tmp = Symbol('tmp')
	thisArg[tmp] = this
	const res = thisArg[tmp](...args)
	delete thisArg[tmp]
	return res
}

console.log(Math.max.call(null, 1, 2, 3))
console.log(Math.max._call(null, 1, 2, 3))
```

#### 手写 bind

> TIP

1. 不传值默认为 globalThis, null, undefined, 原始类型都由 call 处理
2. 第一次传入的参数需要和第二次传入的参数合并
3. bindedFn 可以作为构造函数，此时 this 绑定会失效，会指向实例 this，`this instanceof bindedFn` 来作为判断是构造函数，还是普通调用
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
		throw new Error(
			'Function.prototype.bind - what is trying to be bound is not callable'
		)
	}
	const that = this
	const F = function () {}
	const bindedFn = function (...bindedArgs) {
		return that.call(
			this instanceof bindedFn ? this : thisArg,
			...bindArgs,
			...bindedArgs
		)
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

### 链式调用

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
	},
}

$.first().second().thead() // 'first', 'second', 'thead'
```