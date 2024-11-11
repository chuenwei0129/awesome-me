# 前端面试题

## 关于 this 指向的问题（一）
```js
const length = 10
function fn() {
	console.log(this.length)
}
const obj = {
	length: 5,
	method(fn) {
		// 两次调用各输出什么
		fn()
		arguments[0](0)
	}
}

obj.method(fn, 1)
```

答案：

>第一次输出 `0`，因为 `this` 指向全局上下文，即为 `window`, 而 `window.length` 代表当前 `iframe` 数量，默认为 `0`

>第二次输出 `2`，因为 `this` 指的是 `arguments` 参数对象，而 `method(fn, 1)`，故 `arguments.length` 为形参的数量 `2`

知识点：

- `let` 声明的变量并不会进行变量提升，也不会全局污染
- `window.this` 返回当前窗口中包含的框架数量(框架包括 `frame` 和 `iframe` 两种元素)
- 函数中的 `this` 指向问题

## 关于具名的 IIFE 内部对函数自身再赋值问题

```js
(function foo() {
	foo = 10;
	console.log(foo);
})();
console.log(typeof foo)
```

1. 为什么 `console.log(typeof foo)` 会返回 `undefined`

    `IIFE` 中的函数是函数表达式定义，并不是函数声明，所以 `foo` 函数对象在外部是无法获取的，所以 `typeof` 关键字返回 `undefined`

2. 为什么 `foo = 10` 丢失了

    `IIFE` 中的 `foo` 函数名相当于是使用 `const` 关键字定义的，因此没有办法对一个常量再赋值

    在 `strict mode` 下，直接` TypeErroe` 类型的错误，这类错误同数据类型相关

    在 `non-strict mode` 下，会忽略对常量的赋值

## 请实现一个大数相加函数，比如说 1111111111111111111 + 1，直接数字相加答案是错误的。另请说明为什么在 JS 会存在这样的问题

原因：`Number` 只能表示 `-2^53` ~ `+2^53` 范围的数值，超过则发生精度丢失，无法精准计算。


方法一：`BigInt` 是一种特殊的数字类型，它提供了对任意长度整数的支持。创建 `bigint` 的方式有两种：在一个整数字面量后面加 `n` 或者调用 `BigInt` 函数，该函数从字符串、数字等中生成 `bigint`。


## 连等赋值

```js
let a = { n: 1 } // **1**
const b = a // **2**
a.x = a = { n: 2 } // **3**

console.log(a.x) // --> undefined
console.log(b.x) // --> {n: 2}
```

知识点：[连等赋值](https://segmentfault.com/a/1190000004224719)
- JS 引擎对赋值表达式的处理过程
- 赋值运算的右结合性

分析：

首先前两个语句执行完后，`a` 和 `b` 都指向同一个对象 `{n: 1}` (为方便描述，下面称为对象 `N1`)。

```js
a.x = a = {n: 2};
```

首先依次计算表达式 `a.x` 和 `a`，得到两个引用。其中 `a.x` 表示对象 `N1` 中的 `x`，而 `a` 相当于 `envRec.a`，即当前环境记录项中的 `a`。所以此时可以写出如下的形式：

```js
[[N1]].x = [[encRec]].a = {n: 2};
```

其中，`[[]]` 表示引用指向的对象。

接下来，将 `{n: 2}` 赋值给 `[[encRec]].a`，即将 `{n: 2}` 绑定到当前上下文中的名称 `a`。

接下来，将同一个 `{n: 2}` 赋值给 `[[N1]].x`，即将 `{n: 2}` 绑定到 `N1` 中的名称 `x`。

由于 `b` 仍然指向 `N1`，所以此时有

```js
b <=> N1 <=> {n: 1, x: {n: 2}}
```

而 `a` 被重新赋值了，所以

```js
a <=> {n: 2}
```

并且

```js
a === b.x
```

## 闭包、作用域（一）

```js
const a = 0
const b = 0

function A(a) {
	A = function(b) {
		console.log(a + b++)
	}
	console.log(a++)
}

A(1) // 1
A(2) // 4
```

分析：

第一次执行：函数 `A` 重新赋值，打印 `1`，第二次执行：因为闭包保存了 `a` 的值，此时 `a === 2`，所以打印 `4`

## 类数组的 length

```js
const obj = {
	2: 3,
	3: 4,
	length: 2,
  splice: Array.prototype.splice,
	push: Array.prototype.push
}
obj.push(1)
obj.push(2)
console.log(obj)
```

分析：

第一次使用 `push`, `obj` 对象的 `push` 方法设置 `obj[2] = 1 `, `obj.length++`

第二次使用 `push`,`obj` 对象的 `push` 方法设置 `obj[3] = 2` , `obj.length++`

使用 `console.log()` 方法输出的时候，因为 `obj` 上有 `length` 属性和 `splice` 方法，故将其作为数组输出打印

打印时因为数组未设置下标为 `0` 和 `1` 的值，故打印的结果就是 `empty`，主动获取 `obj[0] = undefined`

```js
Object(4) [empty × 2, 1, 2, splice: ƒ, push: ƒ]
2: 1
3: 2
length: 4
push: ƒ push()
splice: ƒ splice()
__proto__: Object
```

## 变量提升

```js
var b = 10;
(function b() {
	console.log(b)
	b = 5
	console.log(window.b)
	var b = 20
	console.log(b)
})()
```

```js
window.b = 10
(function b() {
  var b = undefined
	console.log(b) // undefined
	b = 5
	console.log(window.b) // 10
	b = 20
	console.log(b) // 20
})()
```

## 闭包、作用域（二）

```js
function fun(n, o) {
	console.log(o)
	return {
		fun: function(m) {
			return fun(m, n)
		}
	}
}

const a = fun(0) // {fun: m => fun(m, 0)}

a.fun(1) // 0
a.fun(2) // 0
a.fun(3)// 0

const b = fun(0).fun(1).fun(2).fun(3) // 0 1 2

const c = fun(0).fun(1) // 0
c.fun(2) // 1
c.fun(3)// 1
```



















<!-- ## 有做过哪些 webpack 优化？没有的话可以说下你了解的

做过，具体问题具体分析，
一般从打包时间和打包体积方面着手：`speed-measure-webpack-plugin` 插件分析时间，`webpack-bundle-analyzer` 插件分析大小，依赖项等等。
缓存：升级 `webpack5`，持久化缓存，大大加快了除第一次构建以外的打包速度，`loader` 缓存，`cache-loader`，`babel-loader` 的 `cacheDirectory` 缓存
依赖查找：`reolve` 加快依赖的查找速度，`resolveLoader` 加快 `loader` 的查找速度，
代码分包：动态 `polyfill`，`SplitChunksPlugin` 分割第三方模块，
多线程 `thread-loader` ，图片压缩等
通过 `cdn` 的方式引入 配合` externals` 属性等

## 有没有做过什么困难的项目
类似的问题还很多，遇到这种问题，我们需要的是曲线救国。比如说你觉得公司里做的没啥的难的，就说说平时学习中有没有遇到过啥的难题，或者别的你觉得难的事情，没必要就卡住在项目上，这样总比什么都不说来的好。 -->


<!-- 稀疏数组与密数组 -->
<!-- var ary = Array(3);
ary[0]=2
ary.map(function(elem) { return '1'; }); // '1',会跳过空值
 -->
<!-- 浮点运算 -->
<!-- 余数的正负号随第一个操作数 -->
<!-- 数组比较大小 -->
<!-- 相等（==）和全等（===）还是比较引用地址
     引用类型间比较大小是按照字典序比较，就是先比第一项谁大，相同再去比第二项。 -->

<!-- JavaScript默认使用字典序(alphanumeric)来排序。因此结果是[1,10,2,5] -->
