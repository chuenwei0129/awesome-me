# JavaScript 从零单排(七)<!-- omit in toc -->

- [声明](#声明)
- [Symbol 类型](#symbol-类型)
- [setTimeout 和 setInterval](#settimeout-和-setinterval)
  - [setTimeout](#settimeout)
  - [嵌套的 setTimeout](#嵌套的-settimeout)
  - [垃圾回收和 setInterval/setTimeout 回调（callback）](#垃圾回收和-setintervalsettimeout-回调callback)
- [globalThis](#globalthis)
- [模块](#模块)
  - [概述](#概述)
  - [语法](#语法)
  - [模块方案](#模块方案)
  - [动态导入](#动态导入)
  - [重点难点](#重点难点)
- [Proxy](#proxy)
  - [简述](#简述)
  - [局限性](#局限性)
  - [可撤销 `Proxy`](#可撤销-proxy)
  - [应用场景](#应用场景)
- [Reflect](#reflect)
- [错误处理，"try..catch"](#错误处理trycatch)
  - [简介](#简介)
  - [try..catch 同步工作](#trycatch-同步工作)
- [Eval](#eval)
- [Reference Type](#reference-type)

## 声明

- [x] var 命令：声明变量（存在变量提升）
- [x] let 命令：声明变量
- [x] const 命令：声明常量
- [x] function：声明函数
- [x] class：声明类
- [x] import

> ⚠️ 注意

- `let 命令`和`const 命令`不允许重复声明
- 未定义就使用会报错：`const 命令`和`let 命令`不存在变量提升
- `const 命令`声明常量后必须立马赋值，`let 命令`声明变量后可立马赋值或使用时赋值
- 暂时性死区：在代码块内使用`const 命令`和`let 命令`声明变量之前，该变量都不可用
- 作用域：`const 命令`和`let 命令`只能在代码块中执行———`块级作用域`，`var 命令`在全局代码中执行——`全局作用域`，for 循环中设置循环变量的那部分是一个父作用域，而循环体内部是一个单独的子作用域。
- `const 命令`实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动。

```js
// 暂时性死区：在代码块内使用`const 命令`和`let 命令`声明变量之前，该变量都不可用，`let 命令`不同作用域可以重复声明的副作用。
let j = 1
!(function () {
  console.log(j) // Cannot access 'j' before initialization
  let j = 2
})()

const foo = {}
// 为 foo 添加一个属性，可以成功
foo.prop = 123
console.log(foo) // { prop: 123 }

// 将 foo 指向另一个对象，就会报错
foo = {} // TypeError: Assignment to constant variable
```

## Symbol 类型

- [x] 定义：独一无二的值
- [x] 声明：`const set = Symbol(str)`
- [x] 入参：字符串(可选)

`Symbol` 保证是唯一的。即使我们创建了许多具有相同描述的 `Symbol`，它们的值也是不同。描述只是一个标签，不影响任何东西。

```js
let id1 = Symbol('id')
let id2 = Symbol('id')

alert(id1 == id2) // false
```

通常所有的 `Symbol` 都是不同的，即使它们有相同的名字。但有时我们想要名字相同的 `Symbol` 具有相同的实体。例如，应用程序的不同部分想要访问的 `Symbol "id"` 指的是完全相同的属性。为了实现这一点，这里有一个 全局 `Symbol` 注册表。

```js
// 从全局注册表中读取
let id = Symbol.for('id') // 如果该 Symbol 不存在，则创建它

// 再次读取（可能是在代码中的另一个位置）
let idAgain = Symbol.for('id')

// 相同的 Symbol
alert(id === idAgain) // true
```

对于全局 `Symbol`，不仅有 `Symbol.for(key)` 按名字返回一个 `Symbol`，还有一个反向调用：`Symbol.keyFor(sym)`，它的作用完全反过来：通过全局 `Symbol` 返回一个名字。

```js
// 通过 name 获取 Symbol
let sym = Symbol.for('name')
let sym2 = Symbol.for('id')

// 通过 Symbol 获取 name
alert(Symbol.keyFor(sym)) // name
alert(Symbol.keyFor(sym2)) // id
```

- `Symbol` 属性不参与 `for..in` 循环。
- `Object.keys/values/entries` 会忽略 `symbol` 属性
- `Object.assign` 会同时复制字符串和 `symbol` 属性

## setTimeout 和 setInterval

### setTimeout

- [x] `setTimeout(func, delay, ...args)` 和 `setInterval(func, delay, ...args)` 方法允许我们在 `delay` 毫秒之后运行 `func` 一次或以 `delay` 毫秒为时间间隔周期性运行 `func`。

- [x] 要取消函数的执行，我们应该调用 `clearInterval/clearTimeout`，并将 `setInterval/setTimeout` 返回的值作为入参传入。

- [x] 零延时调度 `setTimeout(func, 0)`（与 `setTimeout(func)` 相同）用来调度需要尽快执行的调用，但是会在当前脚本执行完成后进行调用。

- [x] 浏览器会将 `setTimeout` 或 `setInterval` 的五层或更多层嵌套调用（调用五次之后）的最小延时限制在 4ms。这是历史遗留问题。对于服务端的 JavaScript，就没有这个限制，并且还有其他调度即时异步任务的方式。

> 所有的调度方法都不能 **保证** 确切的延时。

浏览器内的计时器可能由于许多原因而变慢：

- CPU 过载。
- 浏览器页签处于后台模式。
- 笔记本电脑用的是电池供电（译注：使用电池供电会以降低性能为代价提升续航）。

所有这些因素，可能会将定时器的最小计时器分辨率（最小延迟）增加到 300ms 甚至 1000ms，具体以浏览器及其设置为准。

### 嵌套的 setTimeout

嵌套的 `setTimeout` 能够精确地设置两次执行之间的延时，而 `setInterval` 却不能。

下面来比较这两个代码片段。第一个使用的是 `setInterval`：

```js
let i = 1
setInterval(function () {
  func(i++)
}, 100)
```

第二个使用的是嵌套的 `setTimeout`：

```js
let i = 1
setTimeout(function run() {
  func(i++)
  setTimeout(run, 100)
}, 100)
```

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/js/setinterval.png)

使用 `setInterval` 时，`func` 函数的实际调用间隔要比代码中设定的时间间隔要短！

这也是正常的，因为 `func` 的执行所花费的时间“消耗”了一部分间隔时间。

也可能出现这种情况，就是 `func` 的执行所花费的时间比我们预期的时间更长，并且超出了 100 毫秒。

在这种情况下，JavaScript 引擎会等待 `func` 执行完成，然后检查调度程序，如果时间到了，则 **立即** 再次执行它。

极端情况下，如果函数每次执行时间都超过 `delay` 设置的时间，那么每次调用之间将完全没有停顿。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/js/settimeout.png)

嵌套的 `setTimeout` 就能确保延时的固定（这里是 100 毫秒）。

### 垃圾回收和 setInterval/setTimeout 回调（callback）

当一个函数传入 `setInterval/setTimeout` 时，将为其创建一个内部引用，并保存在调度程序中。这样，即使这个函数没有其他引用，也能防止垃圾回收器（GC）将其回收。

```js
// 在调度程序调用这个函数之前，这个函数将一直存在于内存中
setTimeout(function() {...}, 100);
```

对于 `setInterval`，传入的函数也是一直存在于内存中，直到 `clearInterval` 被调用。

> 这里还要提到一个副作用。如果函数引用了外部变量（闭包），那么只要这个函数还存在，外部变量也会随之存在。它们可能比函数本身占用更多的内存。因此，当我们不再需要调度函数时，最好取消它，即使这是个（占用内存）很小的函数。

## globalThis

- [x] `globalThis`：作为顶层对象，指向全局环境下的 this
- [x] `Browser`：顶层对象是 `window`
- [x] `Node`：顶层对象是 `global`
- [x] `WebWorker`：顶层对象是 `self`

以上三者：通用顶层对象是 `globalThis`

## 模块

### 概述

一个模块（module）就是一个文件。一个模块可以相互加载，并可以使用特殊的指令 `export` 和 `import` 来交换功能，从另一个模块调用一个模块的函数：

- `export` 关键字标记了可以从当前模块外部访问的变量和函数。
- `import` 关键字允许从其他模块导入功能。

> ⚠️ 模块只通过 **HTTP(s)** 工作，在本地文件则不行
> 如果你尝试通过 **file://** 协议在本地打开一个网页，你会发现 `import/export` 指令不起作用。

浏览器需要使用 `<script type="module">` 以使 `import/export` 可以工作。模块相较于常规脚本有几点差别：

- 默认是延迟解析的（deferred）与 `defer` 特性相同。
- `async` 可用于内联脚本。
- 要从另一个源（域/协议/端口）加载外部脚本，需要 `CORS header`。
- 重复的外部脚本会被忽略
- 模块具有自己的本地顶级作用域，在一个模块中，“this” 是 `undefined`。
- 模块始终使用 `use strict`。
- 模块代码只执行一次。导出仅创建一次，然后会在导入之间共享。

### 语法

- [x] `export`：规定模块对外接口

- 默认导出：`export default Person`(导入时可指定模块任意名称，无需知晓内部真实名称)
- 单独导出：`export const name = "Bruce"`
- 按需导出：`export { age, name, sex }`(推荐)
- 改名导出：`export { name as newName }`

- [x] `import`：导入模块内部功能

- 默认导入：`import Person from "person"`
- 整体导入：`import * as Person from "person"`
- 按需导入：`import { age, name, sex } from "person"`
- 改名导入：`import { name as newName } from "person"`
- 自执导入：`import "person"`
- 复合导入：`import Person, { name } from "person"`

- [x] 复合模式：`export` 命令和 `import` 命令结合在一起写成一行，变量实质没有被导入当前模块，相当于对外转发接口，导致当前模块无法直接使用其导入变量

- 默认导入导出：`export { default } from "person"`
- 整体导入导出：`export * from "person"`
- 按需导入导出：`export { age, name, sex } from "person"`
- 改名导入导出：`export { name as newName } from "person"`
- 具名改默认导入导出：`export { name as default } from "person"`
- 默认改具名导入导出：`export { default as name } from "person"`

### 模块方案

- `CommonJS`：用于服务器(动态化依赖)
- `AMD`：用于浏览器(动态化依赖)
- `CMD`：用于浏览器(动态化依赖)
- `UMD`：用于浏览器和服务器(动态化依赖)
- `ESM`：用于浏览器和服务器(静态化依赖)

`CommonJS` 和 `ESM`的区别：`CommonJS` 输出值的拷贝，`ESM` 输出值的引用

- `CommonJS` 一旦输出一个值，模块内部的变化就影响不到这个值
- `ESM` 是动态引用且不会缓存值，模块里的变量绑定其所在的模块，等到脚本真正执行时，再根据这个只读引用到被加载的那个模块里去取值

`CommonJS` 是运行时加载，`ESM` 是编译时加载（类似于闭包，作用域时的理解，导出的变量也是动态的）

### 动态导入

import(module) 表达式加载模块并返回一个 `promise`，该 `promise resolve` 为一个包含其所有导出的模块对象。我们可以在代码中的任意位置调用这个表达式。

```js
let modulePath = prompt("Which module to load?");

import(modulePath)
  .then(obj => <module object>)
  .catch(err => <loading error, e.g. if no such module>)
```

> ⚠️ 动态导入在常规脚本中工作时，它们不需要 `script type="module"`，`import()`不是一个函数，它只是一种特殊语法，只是恰好使用了括号（类似于 `super()`）。

### 重点难点

- ES6 模块中，顶层 `this` 指向 `undefined`，不应该在顶层代码使用 `this`
- 一个模块就是一个独立的文件，该文件内部的所有变量，外部无法获取
- `export` 命令输出的接口与其对应的值是动态绑定关系，即通过该接口可获取模块内部实时的值
- `import` 命令命令具有提升效果，会提升到整个模块的头部，首先执行
- 重复执行同一句 `import` 语句，只会执行一次
- `export default` 命令只能使用一次
- `export default` 命令本质是输出一个名为 `default` 的变量，后面不能跟变量声明语句
- `export default` 命令本质是将后面的值赋给名为 `default` 的变量，可直接将值写在其后
- `export default` 命令和 `export {}` 命令可同时存在，对应复合导入
- `export` 命令和 `import` 命令可出现在模块任何位置，只要处于模块顶层即可，不能处于块级作用域
- `import()` 加载模块成功后，此模块会作为一个对象，当作 `then()` 的参数，可使用对象解构赋值来获取输出接口
- 同时动态加载多个模块时，可使用 `Promise.all()` 和 `import()` 相结合来实现 `import()` 和结合 `async/await` 来书写同步操作的代码

## Proxy

### 简述

- [x] 定义：修改某些操作的默认行为
- [x] 声明：`const proxy = new Proxy(target, handler)`
- [x] 入参

- target：拦截的目标对象，可以是任何东西，包括函数。
- handler：带有“捕捉器”（“traps”，即拦截操作的方法）的对象。比如 `get` 捕捉器用于读取 `target` 的属性，`set` 捕捉器用于写入 `target` 的属性，等等。

```js
let target = {}
let proxy = new Proxy(target, {}) // 空的 handler 对象

proxy.test = 5 // 写入 proxy 对象 (1)
alert(target.test) // 5，test 属性出现在了 target 中！

alert(proxy.test) // 5，我们也可以从 proxy 对象读取它 (2)

for (let key in proxy) alert(key) // test，迭代也正常工作 (3)
```

可用于添加到 `new Proxy` 的 `handler` 参数中以拦截操作的方法

- `get()`：拦截对象属性读取
- `set()`：拦截对象属性设置，返回布尔
- `has()`：拦截对象属性检查 `k in obj`，返回布尔
- `deleteProperty()`：拦截对象属性删除 `delete obj[k]`，返回布尔
- `defineProperty()`：拦截对象属性定义 `Object.defineProperty()`、`Object.defineProperties()`，返回布尔
- `ownKeys()`：拦截对象属性遍历 `for-in`、`Object.keys()`、`Object.getOwnPropertyNames()`、`Object.getOwnPropertySymbols()`，返回数组
- `getOwnPropertyDescriptor()`：拦截对象属性描述读取 `Object.getOwnPropertyDescriptor()`，返回对象
- `getPrototypeOf()`：拦截对象原型读取 `instanceof`、`Object.getPrototypeOf()`、`Object.prototype.__proto__`、`Object.prototype.isPrototypeOf()`、`Reflect.getPrototypeOf()`，返回对象
- `setPrototypeOf()`：拦截对象原型设置 `Object.setPrototypeOf()`，返回布尔
- `isExtensible()`：拦截对象是否可扩展读取 `Object.isExtensible()`，返回布尔
- `preventExtensions()`：拦截对象不可扩展设置 `Object.preventExtensions()`，返回布尔
- `apply()`：拦截 `Proxy` 实例作为函数调用 `proxy()`、`proxy.apply()`、`proxy.call()`
- `construct()`：拦截 `Proxy` 实例作为构造函数调用 `new proxy()`

### 局限性

许多内建对象，例如 `Map`，`Set`，`Date`，`Promise` 等，都使用了所谓的“内部插槽”。在类似这样的内建对象被代理后，代理对象没有这些内部插槽，因此内建方法将会失败。私有类字段也是如此，因为它们也是在内部使用插槽实现的。

> ⚠️ 一个值得注意的例外：内建 `Array` 没有使用内部插槽。那是出于历史原因，因为它出现于很久以前。所以，代理数组时没有这种问题。
>
> 对象的严格相等性检查 === 无法被拦截。

### 可撤销 `Proxy`

一个 **可撤销** 的代理是可以被禁用的代理。

语法为：

```js
let { proxy, revoke } = Proxy.revocable(target, handler)
```

该调用返回一个带有 `proxy` 和 `revoke` 函数的对象以将其禁用。

这是一个例子：

```js
let object = {
  data: 'Valuable data'
}

let { proxy, revoke } = Proxy.revocable(object, {})

// 将 proxy 传递到其他某处，而不是对象...
alert(proxy.data) // Valuable data

// 稍后，在我们的代码中
revoke()

// proxy 不再工作（revoked）
alert(proxy.data) // Error
```

调用 `revoke()` 会从代理中删除对目标对象的所有内部引用，因此它们之间再无连接。之后可以对目标对象进行垃圾回收。

### 应用场景

- `Proxy.revocable()`：不允许直接访问对象，必须通过代理访问，一旦访问结束就收回代理权不允许再次访问
- `get()`：读取未知属性报错、读取数组负数索引的值、封装链式操作、生成 `DOM` 嵌套节点
- `set()`：数据绑定(`Vue`数据绑定实现原理)、确保属性值设置符合要求、防止内部属性被外部读写
- `has()`：隐藏内部属性不被发现、排除不符合属性条件的对象
- `deleteProperty()`：保护内部属性不被删除
- `defineProperty()`：阻止属性被外部定义
- `ownKeys()`：保护内部属性不被遍历

## Reflect

`Reflect` 对象与 `Proxy` 对象一样，也是 `ES6` 为了操作对象而提供的新 `API`。`Reflect` 对象的设计目的有这样几个。

1. 将 `Object` 对象的一些明显属于语言内部的方法（比如 `Object.defineProperty`），放到 `Reflect` 对象上。现阶段，某些方法同时在 `Object` 和 `Reflect` 对象上部署，未来的新方法将只部署在 `Reflect` 对象上。也就是说，从 `Reflect` 对象上可以拿到语言内部的方法。
2. 修改某些 `Object` 方法的返回结果，让其变得更合理。比如，`Object.defineProperty(obj, name, desc)` 在无法定义属性时，会抛出一个错误，而 `Reflect.defineProperty(obj, name, desc)` 则会返回 `false`。
3. 让 `Object` 操作都变成函数行为。某些 `Object` 操作是命令式，比如 `name in obj` 和 `delete obj[name]`，而 `Reflect.has(obj, name)` 和 `Reflect.deleteProperty(obj, name)` 让它们变成了函数行为。
4. `Reflect` 对象的方法与 `Proxy` 对象的方法一一对应，只要是 `Proxy` 对象的方法，就能在 `Reflect` 对象上找到对应的方法。这就让 `Proxy` 对象可以方便地调用对应的 `Reflect`方法，完成默认行为，作为修改行为的基础。也就是说，不管 `Proxy` 怎么修改默认行为，你总可以在 `Reflect` 上获取默认行为。

## 错误处理，"try..catch"

### 简介

`try..catch` 结构允许我们处理执行过程中出现的 `error`。从字面上看，它允许“尝试”运行代码并“捕获”其中可能发生的错误。

语法如下：

```js
try {
  // 执行此处代码
} catch (err) {
  // 如果发生错误，跳转至此处
  // err 是一个 error 对象
} finally {
  // 无论怎样都会在 try/catch 之后执行
}
```

这儿可能会没有 `catch` 部分或者没有 `finally`，所以 `try..catch` 或 `try..finally` 都是可用的。

`Error` 对象包含下列属性：

- `message` — 人类可读的 `error` 信息。
- `name` — 具有 `error` 名称的字符串（`Error` 构造器的名称）。
- `stack`（没有标准，但得到了很好的支持）— `Error` 发生时的调用栈。

我们也可以使用 `throw` 操作符来生成自定义的 `error`。从技术上讲，`throw` 的参数可以是任何东西，但通常是继承自内建的 `Error` 类的 `error` 对象。

### try..catch 同步工作

如果在“计划的（scheduled）”代码中发生异常，例如在 `setTimeout` 中，则 `try..catch` 不会捕获到异常：

```js
try {
  setTimeout(function () {
    noSuchVariable // 脚本将在这里停止运行
  }, 1000)
} catch (e) {
  alert("won't work")
}
```

因为 `try..catch` 包裹了计划要执行的函数，该函数本身要稍后才执行，这时引擎已经离开了 `try..catch` 结构。

为了捕获到计划的（scheduled）函数中的异常，那么 `try..catch` 必须在这个函数内：

```js
setTimeout(function () {
  try {
    noSuchVariable // try..catch 处理 error 了！
  } catch {
    alert('error is caught here!')
  }
}, 1000)
```

## Eval

内建函数 `eval` 允许执行一个代码字符串。

语法如下：

```js
let result = eval(code)
```

例如：

```js
let code = 'alert("Hello")'
eval(code) // Hello
```

代码字符串可能会比较长，包含换行符、函数声明和变量等。

`eval` 的结果是最后一条语句的结果。

例如：

```js
let value = eval('1+1')
alert(value) // 2
let value = eval('let i = 0; ++i')
alert(value) // 1
```

> 🦶 严格模式下，`eval` 有属于自己的词法环境。因此我们不能从外部访问在 `eval` 中声明的函数和变量，如果不启用严格模式，`eval` 没有属于自己的词法环境，因此我们可以从外部访问变量。

## Reference Type

```js
let user = {
  name: 'John',
  hi() {
    alert(this.name)
  }
}

// user.hi(); // 正常运行
// 把获取方法和调用方法拆成两行
let hi = user.hi
hi() // 报错了，因为 this 的值是 undefined
```

仔细看的话，我们可能注意到 `obj.method()` 语句中的两个操作：

首先，点 `'.'` 取了属性 `obj.method` 的值。
接着 `()` 执行了它。

这里 `hi = user.hi` 把函数赋值给了一个变量，接下来在最后一行它是完全独立的，所以这里没有 `this`。

**为确保 `user.hi()` 调用正常运行，JavaScript 玩了个小把戏 —— 点 `'.'` 返回的不是一个函数，而是一个特殊的 `Reference Type` 的值。**

`Reference Type` 是 ECMA 中的一个“规范类型”。我们不能直接使用它，但它被用在 JavaScript 语言内部。

`Reference Type` 的值是一个三个值的组合 `(base, name, strict)`，其中：

- `base` 是对象。
- `name` 是属性名。
- `strict` 在 `use strict` 模式下为 `true`。

当 `()` 被在 `Reference Type` 上调用时，它们会接收到关于对象和对象的方法的完整信息，然后可以设置正确的 `this`（在此处 = `user`）。

`Reference Type` 是一个特殊的“中间人”内部类型，目的是从 `.` 传递信息给 `()` 调用。

任何例如赋值 `hi = user.hi` 等其他的操作，都会将 `Reference Type` 作为一个整体丢弃掉，而会取 `user.hi`（一个函数）的值并继续传递。所以任何后续操作都“丢失”了 `this`。
