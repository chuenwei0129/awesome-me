---
title: Module
order: 13
toc: content
group:
  title: 杂项
  order: 2
---

# Module

## 严格模式

- ES6 的模块**自动采用严格模式**，不管你有没有在模块头部加上 `"use strict";`。
- ES6 模块之中，顶层的 `this` 指向 `undefined`，即不应该在顶层代码使用 `this`。

## export 及 export default 的区别是什么？

在 JavaScript 模块系统中，`export` 和 `export default` 是两种不同的导出方式，它们在使用上有着明显的区别。

`export` 关键字用于导出模块中的声明：

```javascript
export const myVar = 2
export function myFunction() {}
```

与 `export` 不同，`export default` 用于导出一个模块的默认导出。这意味着，当你使用 `export default` 时，你在该模块中指定了一个默认输出的值或表达式。例如：

```javascript
export default 1 + 1
```

或者，导出一个函数作为模块的默认导出：

```javascript
export default function abc() {}
// 这难道不是声明吗？不不不，实际上可以看做是这样的：
// export var default = function abc() {}
```

虽然这看起来像是在导出一个声明，实际上，这背后的机制可以理解为将函数表达式的结果赋值给一个名为 `default` 的特殊变量。因此，尽管表面上似乎是导出了一个声明，但本质上是导出了一个值或表达式的计算结果。

### 关键区别

- **数量限制**：一个模块中只能有一个 `export default`，但可以有多个 `export`。这是因为 `export default` 指定了一个模块的默认导出，而 `export` 则用于导出模块中的多个具体实体。
- **导入方式**：使用 `export default` 时，导入该模块不需要使用大括号 `{}`，而使用 `export` 导出的实体在导入时需要使用大括号来指定具体的导入名称。
- **命名灵活性**：使用 `export default` 导出的实体在导入时可以自由命名，而使用 `export` 导出的实体必须使用其原名称或通过 `as` 关键字重命名。

## 静态加载

**JavaScript 是边编译边执行的。**

`import` 可以说是在编译这一步做了处理

比如分析这一段：

```js
import { readFile } from 'fs'
```

代码被 JavaScript 引擎编译时，并将上面 `fs` 模块的属性 `readFile` 指向对应模块的 `export const readFile()` 方法上，注意这里只是做了指针指向，而并不是执行 fs 模块。当执行 `readFile()` 时，就会去找指针指向的代码并执行。

区分于 CommonJS 模块：

```js
let { stat, exists, readFile } = require('fs')

// 等同于
let _fs = require('fs')
let stat = _fs.stat
let exists = _fs.exists
let readFile = _fs.readFile
```

其实上面代码是先执行 fs 模块，得到一份代码拷贝，再获取对应的属性或方法的。

**小结：**

`import` 是做**一份指针引用对应的属性和方法**，指针引用当然无法处理带有计算的 `import` 如：`import { 'f' + 'oo' } from 'my_module'`，而 `require` 是执行代码获取属性和方法，能动态计算和加载。

目前阶段，通过 Babel 转码，CommonJS 模块的 `require` 命令和 ES6 模块的 `import` 命令，可以写在同一个模块里面，但是最好不要这样做。因为 `import` 在静态解析阶段执行，所以它是一个模块之中最早执行的。下面的代码可能不会得到预期结果。

```js
require('core-js/modules/es6.symbol')
require('core-js/modules/es6.promise')
import React from 'React'
```

## export

`export` 命令**规定的是对外的接口，必须与模块内部的变量建立一一对应关系**。

```js
// 导出变量
export const a = 'a'
export function b() {}
export class c {}

// 导出接口
const a = 'a'
function b() {}
class c {}

export { a, b, c }
```

`export` 语句输出的接口，与其对应的值是动态绑定关系，**即通过该接口，可以取到模块内部实时的值。**

```js
// 编译时 foo = 'bar'，运行时 foo = 'baz'
export let foo = 'bar'
setTimeout(() => (foo = 'baz'), 500)
```

`export` 命令**可以出现在模块的任何位置，只要处于模块顶层就可以**。如果处于块级作用域内，就会报错，`import` 命令也是如此。

## import

`import` 语句会执行所加载的模块，因此可以有下面的写法。

```js
import 'lodash'
```

上面代码仅仅执行 `lodash` 模块，但是不输入任何值。

如果多次重复执行同一句 `import` 语句，那么只会执行一次，而不会执行多次。

```js
import 'lodash'
import 'lodash'
```

## 模块的整体加载

除了指定加载某个输出值，还可以使用整体加载，即用星号 `*` 指定一个对象，所有输出值都加载在这个对象上面。

```js
// 导出
export const foo = 'foo'
export function bar() {}
export class baz {}

// 导入
import * as all from 'mod'
console.log(all.foo, all.bar, all.baz)
```

## default

本质上，`export default` 就是输出一个叫做 `default` 的变量或方法，然后系统允许你为它取任意名字。

```js
const foo = 'foo'
export default foo
```

一个模块只能有一个默认输出，因此 `export default` 命令只能使用一次。所以，`import` 命令后面才不用加大括号，因为只可能唯一对应 `export default` 命令。

```js
// 本质是输出变量为 default 的值
const q = 'x'
function w() {}
class e {}

// 相当于导出变量为 default 的对象
export default { q, w, e }

// 导入
// import {default as r} from 'mod'
// 下面相当于上面的语法糖
import r from 'mod'
console.log(r.q, r.w, r.e)
```

## export 与 import 的复合写法

`export` 和 `import` 语句可以结合在一起，写成一行。但需要注意的是，写成一行以后，`foo` 和 `bar` 实际上并没有被导入当前模块，只是相当于对外转发了这两个接口，导致当前模块不能直接使用 `foo` 和 `bar`。

```js
export { foo, bar } from 'my_module'

// 可以简单理解为
import { foo, bar } from 'my_module'
export { foo, bar }
```

ES2020 之前，有一种 import 语句，没有对应的复合写法。

```js
import * as someIdentifier from 'someModule'
```

ES2020 补上了这个写法。

```js
export * as ns from 'mod'

// 等同于
import * as ns from 'mod'
export { ns }
```

## import()

ES2020 引入 `import()` 函数，支持动态加载模块。

`import()` 返回一个 Promise 对象。下面是一个例子。

```js
const main = document.querySelector('main')

import(`./section-modules/${someVariable}.js`)
  .then((module) => {
    module.loadPageInto(main)
  })
  .catch((err) => {
    main.textContent = err.message
  })
```

`import()` 函数可以用在任何地方，不仅仅是模块，非模块的脚本也可以使用。它是**运行时执行**，也就是说，什么时候运行到这一句，就会加载指定的模块。

另外，`import()` 函数与所加载的模块没有静态连接关系，这点也是与 `import` 语句不相同。`import()` 类似于 Node 的 `require` 方法，区别主要是**前者是异步加载，后者是同步加载**。

> [JavaScript 中 import() 是一个函数吗？](https://www.zhihu.com/question/457710733/answer/1869069289)
