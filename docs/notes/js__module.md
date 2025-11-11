---
group:
  title: javaScript
  order: 3
title: 模块化
toc: content
order: 17
---

## 概述

ES6 模块是 JavaScript 官方标准的模块化解决方案，通过 `export` 和 `import` 关键字实现模块的导出和导入。

### ES6 模块的特点

1. **静态结构**：模块的导入导出在编译时确定，不能动态生成
2. **自动严格模式**：ES6 的模块自动采用严格模式，不需要手动声明 `"use strict;"`
3. **顶层 this**：ES6 模块中，顶层的 `this` 指向 `undefined`，而不是全局对象
4. **单例模式**：同一个模块如果加载多次，只会执行一次

### ES6 模块 vs CommonJS

| 特性         | ES6 模块              | CommonJS            |
| ------------ | --------------------- | ------------------- |
| 加载时机     | 编译时（静态加载）    | 运行时（动态加载）  |
| 输出         | 值的引用              | 值的拷贝            |
| this 指向    | undefined             | 当前模块            |
| 能否动态加载 | 不能（但可用 import() ） | 可以                |
| 循环依赖     | 支持                  | 支持但可能有问题    |

## 静态加载原理

**JavaScript 是边编译边执行的。**

`import` 在编译阶段就做了处理，与 CommonJS 的运行时加载有本质区别：

```js
import { readFile } from 'fs';
```

代码被 JavaScript 引擎编译时，会将 `fs` 模块的 `readFile` 属性**指向**对应模块的导出方法。注意这里只是做了指针指向，并不会执行 fs 模块。当真正调用 `readFile()` 时，才会去执行指针指向的代码。

区别于 CommonJS 模块：

```js
let { stat, exists, readFile } = require('fs');

// 等同于
let _fs = require('fs');
let stat = _fs.stat;
let exists = _fs.exists;
let readFile = _fs.readFile;
```

CommonJS 是先**执行**fs 模块，模块运行后返回一个对象（模块缓存），再从这个对象中获取对应的属性或方法。

**小结：**

- `import` 是建立**引用连接**（指针），因此无法处理动态计算的模块名，如：`import { 'f' + 'oo' } from 'my_module'`
- `require` 是**执行代码后获取导出对象**，可以动态计算和加载

⚠️ **注意：** 通过 Babel 转码，`require` 和 `import` 可以写在同一个模块里，但**不推荐**这样做。因为 `import` 在静态解析阶段执行（最早），下面的代码可能不会得到预期结果：

```js
require('core-js/modules/es6.symbol');
require('core-js/modules/es6.promise');
import React from 'React';
```

## export 导出

### 命名导出（Named Export）

`export` 命令**规定的是对外的接口，必须与模块内部的变量建立一一对应关系**。

有两种导出方式：

**方式一：声明时导出**

```js
export const a = 'a';
export function b() {}
export class c {}
```

**方式二：统一导出**

```js
const a = 'a';
function b() {}
class c {}

export { a, b, c };

// 支持重命名导出
export { a as anotherName };
```

#### 动态绑定

`export` 语句输出的接口，与其对应的值是**动态绑定关系**，即通过该接口，可以取到模块内部实时的值。

```js
export let foo = 'bar';
setTimeout(() => (foo = 'baz'), 500);

// 500ms 后，其他模块 import 的 foo 值会变成 'baz'
```

这与 CommonJS 规范完全不同。CommonJS 模块输出的是值的拷贝，模块内部的变化不会影响这个值。

#### 位置要求

`export` 命令可以出现在模块的任何位置，**只要处于模块顶层**就可以。如果处于块级作用域内，就会报错。

```js
// ❌ 错误：不能在块级作用域内导出
if (true) {
  export const a = 1; // SyntaxError
}

// ✅ 正确：在模块顶层导出
export const a = 1;
```

`import` 命令也是如此。这是因为处于条件代码块之中，就没法做静态优化了，违背了 ES6 模块的设计初衷。

### 默认导出（Default Export）

`export default` 用于导出模块的默认值。本质上，它就是输出一个叫做 `default` 的变量。

```js
// 导出值
export default 1 + 1;

// 导出函数
export default function abc() {}
// 实际上相当于：export { abc as default }

// 导出对象
const q = 'x';
function w() {}
class e {}
export default { q, w, e };
```

一个模块只能有一个默认输出，因此 `export default` 命令只能使用一次。

```js
// 导出
const foo = 'foo';
export default foo;

// 导入（可以任意命名）
import myFoo from './module';

// 本质上等同于
import { default as myFoo } from './module';
```

### export 与 export default 的对比

| 特性       | export                                | export default              |
| ---------- | ------------------------------------- | --------------------------- |
| 数量限制   | 一个模块可以有多个                    | 一个模块只能有一个          |
| 导入语法   | 需要使用 `{}`                          | 不需要使用 `{}`              |
| 命名限制   | 导入时必须使用原名或 `as` 重命名      | 导入时可以任意命名          |
| 本质       | 导出多个命名接口                      | 导出名为 `default` 的接口   |

```js
// 导出
export const foo = 'foo';
export function bar() {}
export default function baz() {}

// 导入
import baz from './module'; // 导入默认导出，可任意命名
import { foo, bar } from './module'; // 导入命名导出，必须用原名
import baz, { foo, bar } from './module'; // 同时导入默认和命名导出
```

## import 导入

### 基本用法

```js
// 导入命名导出
import { firstName, lastName } from './profile.js';

// 重命名导入
import { lastName as surname } from './profile.js';

// 导入默认导出
import myDefault from './module.js';

// 同时导入默认和命名导出
import myDefault, { foo, bar } from './module.js';
```

### 整体加载

使用星号 `*` 可以整体加载模块，将所有导出绑定到一个对象上：

```js
// 导出
export const foo = 'foo';
export function bar() {}
export class baz {}

// 整体导入
import * as all from './module.js';
console.log(all.foo); // 'foo'
all.bar();
new all.baz();
```

⚠️ **注意：** 模块整体加载所在的对象（上例是 `all`），应该是可以静态分析的，所以不允许运行时改变。

```js
import * as circle from './circle.js';

// ❌ 错误：不允许修改
circle.foo = 'hello';
circle.area = function () {};
```

### 仅执行模块

`import` 语句会执行所加载的模块，因此可以只执行模块而不导入任何值：

```js
import 'lodash';
```

如果多次重复执行同一句 `import` 语句，只会执行一次：

```js
import 'lodash';
import 'lodash';
// 上面两行只会执行一次
```

这是因为 `import` 语句是**单例模式**，多次导入同一个模块，只会执行一次。

### import 的特点

1. **具有提升效果**：会提升到整个模块的头部，首先执行

```js
foo();
import { foo } from 'my_module'; // 不会报错，会提升
```

2. **静态执行**：不能使用表达式和变量

```js
// ❌ 错误：不能使用表达式
import { 'f' + 'oo' } from 'my_module';

// ❌ 错误：不能使用变量
let module = 'my_module';
import { foo } from module;

// ❌ 错误：不能在条件语句中
if (x === 1) {
  import { foo } from 'module1';
} else {
  import { foo } from 'module2';
}
```

## export 与 import 的复合写法

`export` 和 `import` 可以结合在一起，写成一行，**常用于模块的转发**。

```js
export { foo, bar } from './module.js';

// 可以理解为（但 foo 和 bar 并没有被导入当前模块）
import { foo, bar } from './module.js';
export { foo, bar };
```

这种写法实际上并没有将 `foo` 和 `bar` 导入当前模块，只是相当于对外转发了这两个接口，当前模块不能直接使用 `foo` 和 `bar`。

### 常见的复合写法

```js
// 转发命名导出
export { foo, bar } from './module.js';

// 转发并重命名
export { foo as myFoo } from './module.js';

// 转发默认导出为命名导出
export { default as foo } from './module.js';

// 转发命名导出为默认导出
export { foo as default } from './module.js';

// 转发所有命名导出
export * from './module.js';

// ES2020: 转发所有导出到一个命名空间
export * as ns from './module.js';
// 等同于
import * as ns from './module.js';
export { ns };
```

## import() 动态导入

ES2020 引入 `import()` 函数，支持**动态加载模块**。

### 基本用法

`import()` 返回一个 Promise 对象：

```js
const main = document.querySelector('main');

import(`./section-modules/${someVariable}.js`)
  .then((module) => {
    module.loadPageInto(main);
  })
  .catch((err) => {
    main.textContent = err.message;
  });
```

### import() 的特点

1. **运行时执行**：什么时候运行到这一句，就会加载指定的模块
2. **可用于任何地方**：不仅仅是模块，非模块的脚本也可以使用
3. **返回 Promise**：可以使用 `then`、`catch` 或 `async/await`
4. **没有静态连接**：与 `import` 语句不同，不建立静态连接关系

```js
// 可以用在条件语句中
if (condition) {
  import('./moduleA.js').then(/* ... */);
} else {
  import('./moduleB.js').then(/* ... */);
}

// 可以使用 async/await
async function loadModule() {
  const module = await import('./module.js');
  module.doSomething();
}
```

### import() vs require

`import()` 类似于 Node.js 的 `require()` 方法，但有重要区别：

- `import()` 是**异步加载**，返回 Promise
- `require()` 是**同步加载**，直接返回模块

### 使用场景

1. **按需加载**

```js
button.addEventListener('click', () => {
  import('./dialogBox.js')
    .then((dialogBox) => {
      dialogBox.open();
    })
    .catch((error) => {
      /* Error handling */
    });
});
```

2. **条件加载**

```js
if (condition) {
  import('./moduleA.js').then(/* ... */);
} else {
  import('./moduleB.js').then(/* ... */);
}
```

3. **动态模块路径**

```js
import(`./locales/${language}.js`).then(/* ... */);
```

## 参考资料

- [JavaScript 中 import() 是一个函数吗？](https://www.zhihu.com/question/457710733/answer/1869069289)
