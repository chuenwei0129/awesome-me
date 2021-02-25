# JavaScript 基础知识梳理(五)<!-- omit in toc -->
- [声明](#声明)
- [解构赋值](#解构赋值)
- [字符串](#字符串)

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
// for 循环中设置循环变量的那部分是一个父作用域，而循环体内部是一个单独的子作用域
let i = 1
for (; i < 4; i++) {
  let i = 'a'
  console.log(i) // 'a', 'a', 'a'
}

// 暂时性死区：在代码块内使用`const 命令`和`let 命令`声明变量之前，该变量都不可用，`let 命令`不同作用域可以重复声明的副作用。
let j = 1
!function () {
  console.log(j) // Cannot access 'j' before initialization
  let j = 2
}()

const foo = {}
// 为 foo 添加一个属性，可以成功
foo.prop = 123
console.log(foo) // { prop: 123 }

// 将 foo 指向另一个对象，就会报错
foo = {} // TypeError: Assignment to constant variable
```

## 解构赋值

> 解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象。由于`undefined` 和 `null` 无法转为对象，所以对它们进行解构赋值，都会报错。

```js
let {toString: s} = 123;
s === Number.prototype.toString // true

let {toString: s} = true;
s === Boolean.prototype.toString // true

let { prop: x } = undefined; // TypeError
let { prop: y } = null; // TypeError
```

- [x] 数组解构
- 规则：数据结构具有`Iterator 接口`可采用数组形式的解构赋值
- 形式：`const [x, y] = [1, 2]`
- 默认：`const [x, y = 2] = [1]`
- [x] 对象解构
- 形式：`const { x, y } = { x: 1, y: 2 }`
- 默认：`const { x, y = 2 } = { x: 1 }`
- 改名：`const { x, y: z } = { x: 1, y: 2 }`
- [x] 函数参数解构
- 数组解构：`function Func([x = 0, y = 1]) {}`
- 对象解构：`function Func({ x = 0, y = 1 } = {}) {}`
- [x] 字符串解构：const [a, b, c, d, e] = "hello"

> 应用场景

- 交换变量值：`[x, y] = [y, x]`
- 返回函数多个值：`const [x, y, z] = Func()`
- 定义函数参数：`Func([1, 2])`
- 提取 JSON 数据：`const { name, version } = packageJson`
- 定义函数参数默认值：`function Func({ x = 1, y = 2 } = {}) {}`
- 遍历Map结构：`for (let [k, v] of Map) {}`
- 输入模块指定属性和方法：`const { readFile, writeFile } = require("fs")`

> 重点难点

- 匹配模式：只要等号两边的模式相同，左边的变量就会被赋予对应的值
- 解构赋值规则：只要等号右边的值不是对象或数组，就先将其转为对象
- 解构默认值生效条件：属性值严格等于 `undefined`
- 解构遵循匹配模式
- 解构不成功时变量的值等于 `undefined`
- `undefined` 和 `null` 无法转为对象，因此无法进行解构

## 字符串
- [x] **字符串遍历**：可通过 `for-of` 遍历字符串
- [x] **模板字符串**：可单行可多行可插入变量的增强版字符串
- [x] [**String.raw()**](https://zhuanlan.zhihu.com/p/33679862)：返回把字符串所有变量替换且对斜杠进行转义的结果
```js
console.log(`\n`); // "↵"
console.log(String.raw`\n`); // "\n"
```
- [x] **charAt(x)**：`charAt(x)` 返回字符串中 x 位置的字符，下标从 0 开始。
```js
const str = 'hello world'

console.log(str[0]) // 'h'
console.log(str.charAt(0)) // 'h'
```

- [x] **concat(v1, v2...)**：`concat()` 方法用于连接两个或多个字符串，此方法不改变现有的字符串，返回拼接后的新的字符串。

```js
const v1 = 'hello'
const v2 = 'world'

const str = v1.concat(' ', v2)
const _str = `${v1} ${v2}`
console.log(str, v1, v2, _str) // 'hello world' 'hello' 'world' 'hello world'
```

- **indexOf(substr, [start])**：`indexOf` 方法搜索并(如果找到)返回字符串中搜索到的字符或子字符串的索引。如果没有找到，则返回 -1。`Start` 是一个可选参数，指定字符串中开始搜索的位置（包含自身），默认值为 0。

```js
 const str = 'hello world'

 console.log(str.indexOf('l')) // 2
 console.log(str.indexOf('f')) // -1
 console.log(str.indexOf('l', 2)) // 2
 console.log(str.indexOf('l', 4)) // 9
```
   
- [x] **lastIndexOf(substr, [start])**：`lastIndexOf()` 方法返回指定文本在字符串中最后一次出现的索引, 如果未找到，则返回-1。 `Start` 是一个可选参数，指定字符串中开始搜索的位置, 默认值为 `string.length - 1`。


- [x] **slice(start, [end])**：`slice()` 方法可提取字符串的某个部分，返回一个新的字符串。包括字符串从 `start` 开始（包括 `start`）到 `end` 结束（不包括 `end`）为止的所有字符。

```js
const str = `hello world`
    
console.log(str.slice(0)) // 'hello world'
console.log(str.slice(0, 2)) // 'he'
```

- [x] **split(delimiter, [limit])**：`split()` 方法用于把一个字符串分割成字符串数组，返回一个字符串数组返回的数组中的字串不包括 `delimiter` 自身。可选的 `limit` 是一个整数，允许各位指定要返回的最大数组的元素个数。

```js
const str = '2021-01-29'

console.log(str.split('-')) // [ '2021', '01', '29' ]
console.log(str.split('-', 2)) // [ '2021', '01' ]
console.log(str.split(/-/)) // [ '2021', '01', '29' ]
```

- [x] **substr(start, [length])**：`substr()` 方法可在字符串中抽取从 `start` 下标开始的指定数目的字符。返回一个新的字符串，包含从 `start`（包括 `start` 所指的字符） 处开始的 `length` 个字符。如果没有指定 `length`，那么返回的字符串包含从 `start` 到该字符串的结尾的字符。

```js
const str = 'hello world'

console.log(str.substr(1, 3)) // 'ell'
console.log(str.substr(3)) // 'lo world'
```

- [x] **toLowerCase()**：`toLowerCase()` 方法用于把字符串转换为小写。

- [x] **toUpperCase()**：`toUpperCase()` 方法用于把字符串转换为大写。

```js
const str = 'hello world'

console.log(str.toUpperCase()) // 'HELLO WORLD'
console.log(str.toUpperCase().toLowerCase()) // 'hello world'
```

- [x] **includes()**：`includes()` 方法用于检查字符串是否包含指定的字符串或字符。

- [x] **startsWith()**：`startsWith()` 函数检查字符串是否以指定的字符串或字符开始。

- [x] **endsWith()**：`endsWith()` 函数检查字符串是否以指定的字符串或字符结束。

```js
const str = 'hello world'

console.log(str.includes('hello')) // true
console.log(str.startsWith('hello')) // true
console.log(str.endsWith('world')) // true
```
- [x] **repeat()**：`repeat()` 构造并返回一个新字符串，该字符串包含被连接在一起的指定数量的字符串的副本。

```js
const str = 'hello world'

console.log(str.repeat(3)) // 'hello worldhello worldhello world'
```

- [x] **trim()**：`trim()` 方法会从一个字符串的两端删除空白字符。在这个上下文中的空白字符是所有的空白字符 (`space`, `tab`, `no-break` `space` 等) 以及所有行终止符字符（如 `LF`，`CR`）

```js
const str = '   hello world   '

console.log(str.trim()) // 'hello world'
```

- [x] **match(regexp)**：根据正则表达式在字符串中搜索匹配项。如果没有找到匹配项，则返回一个信息数组或 `null`。

```js
```
- [x] **replace(regexp/substr, replacetext)**：`replace()` 方法用于在字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的子串。

```js
```

- [x] **search(regexp)**：`search()` 方法用于检索字符串中指定的子字符串，或检索与正则表达式相匹配的子字符串，如果找到，返回与 `regexp` 相匹配的子串的起始位置，否则返回 -1。

```js
```

- [x] **matchAll()**：返回正则表达式在字符串的所有匹配
