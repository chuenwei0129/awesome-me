# JavaScript 基础知识梳理(四)<!-- omit in toc -->

- [包装对象](#包装对象)
- [数字类型](#数字类型)
  - [使用两个点来调用一个方法](#使用两个点来调用一个方法)
  - [舍入](#舍入)
  - [小数](#小数)
  - [浮点数精度](#浮点数精度)
  - [其他数学函数](#其他数学函数)
  - [面试题：从 min 到 max 的随机整数？](#面试题从-min-到-max-的随机整数)
    - [简单但错误的解决方案](#简单但错误的解决方案)
    - [正确的解决方案](#正确的解决方案)
- [字符串](#字符串)
  - [**String.raw()**](#stringraw)
  - [charAt(x)](#charatx)
  - [concat(v1, v2...)](#concatv1-v2)
  - [indexOf(substr, [start])](#indexofsubstr-start)
  - [lastIndexOf(substr, [start])](#lastindexofsubstr-start)
  - [slice(start, [end])](#slicestart-end)
  - [split(delimiter, [limit])](#splitdelimiter-limit)
  - [substr(start, [length])](#substrstart-length)
  - [toLowerCase() / toUpperCase()](#tolowercase--touppercase)
  - [includes() / startsWith() / endsWith()](#includes--startswith--endswith)
  - [repeat()](#repeat)
  - [trim()](#trim)
  - [正则相关](#正则相关)
- [数组](#数组)
  - [声明](#声明)
  - [toString](#tostring)
  - [添加/移除数组元素](#添加移除数组元素)
  - [遍历：常规](#遍历常规)
  - [splice](#splice)
  - [slice](#slice)
  - [concat](#concat)
  - [遍历：forEach](#遍历foreach)
  - [在数组中搜索](#在数组中搜索)
    - [indexOf/lastIndexOf 和 includes](#indexoflastindexof-和-includes)
    - [find 和 findIndex](#find-和-findindex)
    - [filter](#filter)
  - [转换数组](#转换数组)
    - [map](#map)
    - [reduce](#reduce)
    - [sort](#sort)
    - [reverse](#reverse)
    - [split/join](#splitjoin)
  - [其他](#其他)
- [Iterable object（可迭代对象）](#iterable-object可迭代对象)
  - [Symbol.iterator](#symboliterator)
  - [Array.from](#arrayfrom)
- [Map and Set（映射和集合）](#map-and-set映射和集合)
  - [Map](#map-1)
  - [链式调用](#链式调用)
  - [Map 迭代](#map-迭代)
  - [Object.entries：从对象创建 Map](#objectentries从对象创建-map)
  - [Set](#set)
  - [Set 迭代（iteration）](#set-迭代iteration)
- [WeakMap and WeakSet（弱映射和弱集合）](#weakmap-and-weakset弱映射和弱集合)
- [Object.keys，values，entries](#objectkeysvaluesentries)
  - [数据迭代](#数据迭代)
  - [对象映射](#对象映射)
- [解构赋值](#解构赋值)
- [日期和时间](#日期和时间)
- [JSON 方法，toJSON](#json-方法tojson)

## 包装对象

> 以下是 JavaScript 创建者面临的悖论：

- 人们可能想对诸如字符串或数字之类的原始类型执行很多操作。最好将它们作为方法来访问。
- 原始类型必须尽可能的简单轻量。

而解决方案看起来多少有点尴尬，如下：

- 原始类型仍然是原始的。与预期相同，提供单个值
- JavaScript 允许访问字符串，数字，布尔值和 symbol 的方法和属性。
- 为了使它们起作用，创建了提供额外功能的特殊“对象包装器”，使用后即被销毁。

“对象包装器”对于每种原始类型都是不同的，它们被称为 String、Number、Boolean 和 Symbol。因此，它们提供了不同的方法。

```js
let str = 'Hello'

str.test = 5 // (*)

alert(str.test)
```

根据你是否开启了严格模式 `use strict`，会得到如下结果：

- undefined（非严格模式）
- 报错（严格模式）。

为什么？让我们看看在 (\*) 那一行到底发生了什么：

> 1.  当访问 str 的属性时，一个“对象包装器”被创建了。
> 2.  在严格模式下，向其写入内容会报错。
> 3.  否则，将继续执行带有属性的操作，该对象将获得 test 属性，但是此后，“对象包装器”将消失，因此在最后一行，str 并没有该属性的踪迹。

**这个例子清楚地表明，原始类型不是对象。**

## 数字类型

### 使用两个点来调用一个方法

```js
alert((123456).toString(36)) // 2n9c
```

请注意 `123456..toString(36)` 中的两个点不是打错了。如果我们想直接在一个数字上调用一个方法，比如上面例子中的 `toString`，那么我们需要在它后面放置两个点 `..`。

如果我们放置一个点：`123456.toString(36)`，那么就会出现一个 `error`，因为 JavaScript 语法隐含了第一个点之后的部分为小数部分。如果我们再放一个点，那么 JavaScript 就知道小数部分为空，现在使用该方法。

也可以写成 `(123456).toString(36)`。

### 舍入

- [x] `Math.floor`

向下舍入：`3.1` 变成 `3`，`-1.1` 变成 `-2`。

- [x] `Math.ceil`

向上舍入：`3.1` 变成 `4`，`-1.1` 变成 `-1`。

- [x] `Math.round`

向最近的整数舍入：`3.1` 变成 `3`，`3.6` 变成 `4`，`-1.1` 变成 `-1`。

- [x] `Math.trunc`（IE 浏览器不支持这个方法）

移除小数点后的所有内容而没有舍入：`3.1` 变成 `3`，`-1.1` 变成 `-1`。

### 小数

函数 `toFixed(n)` 将数字舍入到小数点后 `n` 位，并以字符串形式返回结果。

```js
let num = 12.34
alert(num.toFixed(1)) // "12.3"
```

这会向上或向下舍入到最接近的值，类似于 `Math.round`：

```js
let num = 12.36
alert(num.toFixed(1)) // "12.4"
```

请注意 `toFixed` 的结果是一个字符串。如果小数部分比所需要的短，则在结尾添加零：

```js
let num = 12.34
alert(num.toFixed(5)) // "12.34000"，在结尾添加了 0，以达到小数点后五位
```

我们可以使用一元加号或 `Number()` 调用，将其转换为数字：`+ num.toFixed(5)`。

### 浮点数精度

一个数字以其二进制的形式存储在内存中，一个 1 和 0 的序列。但是在十进制数字系统中看起来很简单的 0.1，0.2 这样的小数，实际上在二进制形式中是无限循环小数。

换句话说，什么是 0.1？0.1 就是 1 除以 10，1/10，即十分之一。在十进制数字系统中，这样的数字表示起来很容易。将其与三分之一进行比较：1/3。三分之一变成了无限循环小数 0.33333(3)。

在十进制数字系统中，可以保证以 10 的整数次幂作为除数能够正常工作，但是以 3 作为除数则不能。也是同样的原因，在二进制数字系统中，可以保证以 2 的整数次幂作为除数时能够正常工作，但 1/10 就变成了一个无限循环的二进制小数。

使用二进制数字系统无法 精确 存储 0.1 或 0.2，就像没有办法将三分之一存储为十进制小数一样。

IEEE-754 数字格式通过将数字舍入到最接近的可能数字来解决此问题。这些舍入规则通常不允许我们看到“极小的精度损失”，但是它确实存在。

```js
alert((1.35).toFixed(1)) // 1.4
alert((6.35).toFixed(1)) // 6.3
```

- 在 JS 内部，6.35 的小数部分是一个无限的二进制。在这种情况下，它的存储会造成精度损失。
- 乘/除法可以减少误差，但不能完全消除误差。

```js
alert(Math.round(6.35 * 10) / 10) // 6.35 -> 63.5 -> 64(rounded) -> 6.4
```

### 其他数学函数

- `Math.random()` 返回一个从 0 到 1 的随机数（不包括 1）

- `Math.max(a, b, c...)` / `Math.min(a, b, c...)` 从任意数量的参数中返回最大/最小值。

- `Math.pow(n, power)` 返回 n 的给定（power）次幂

### 面试题：从 min 到 max 的随机整数？

创建一个函数 `randomInteger(min，max)`，该函数会生成一个范围在 `min` 到 `max` 中的随机整数，包括 `min` 和 `max`。

在 `min..max` 范围中的所有数字的出现概率必须相同

#### 简单但错误的解决方案

最简单但错误的解决方案是生成一个范围在 min 到 max 的值，并取对其进行四舍五入后的值：

```js
function randomInteger(min, max) {
  let rand = min + Math.random() * (max - min)
  return Math.round(rand)
}

alert(randomInteger(1, 3))
```

这个函数是能起作用的，但不正确。获得边缘值 min 和 max 的概率比其他值低两倍。

如果你将上面这个例子运行多次，你会很容易看到 2 出现的频率最高。

发生这种情况是因为 Math.round() 从范围 1..3 中获得随机数，并按如下所示进行四舍五入：

```js
values from 1    ... to 1.4999999999  become 1
values from 1.5  ... to 2.4999999999  become 2
values from 2.5  ... to 2.9999999999  become 3
```

现在我们可以清楚地看到 `1` 的值比 `2` 少两倍。和 `3` 一样。

#### 正确的解决方案

这个题目有很多正确的解决方案。其中之一是调整取值范围的边界。为了确保相同的取值范围，我们可以生成从 `0.5` 到 `3.5` 的值，从而将所需的概率添加到取值范围的边界：

```js
function randomInteger(min, max) {
  // 现在范围是从  (min-0.5) 到 (max+0.5)
  let rand = min - 0.5 + Math.random() * (max - min + 1)
  return Math.round(rand)
}

alert(randomInteger(1, 3))
```

另一种方法是使用 `Math.floor` 来取范围从 `min` 到 `max+1` 的随机数：

```js
function randomInteger(min, max) {
  // here rand is from min to (max+1)
  let rand = min + Math.random() * (max + 1 - min)
  return Math.floor(rand)
}

alert(randomInteger(1, 3))
```

现在所有间隔都以这种方式映射：

```js
values from 1  ... to 1.9999999999  become 1
values from 2  ... to 2.9999999999  become 2
values from 3  ... to 3.9999999999  become 3
```

所有间隔的长度相同，从而使最终能够均匀分配。

## 字符串

> **字符串是不可变的**，字符串既是可迭代的（for..of 对它们有效），又是类数组的（它们有数值索引和 length 属性）。

### [**String.raw()**](https://zhuanlan.zhihu.com/p/33679862)

返回把字符串所有变量替换且对斜杠进行转义的结果

```js
console.log(`\n`) // "↵"
console.log(String.raw`\n`) // "\n"
```

### charAt(x)

`charAt(x)` 返回字符串中 x 位置的字符，下标从 0 开始。

```js
const str = 'hello world'

console.log(str[0]) // 'h'
console.log(str.charAt(0)) // 'h'
```

### concat(v1, v2...)

`concat()` 方法用于连接两个或多个字符串，此方法不改变现有的字符串，返回拼接后的新的字符串。

```js
const v1 = 'hello'
const v2 = 'world'

const str = v1.concat(' ', v2)
const _str = `${v1} ${v2}`
console.log(str, v1, v2, _str) // 'hello world' 'hello' 'world' 'hello world'
```

### indexOf(substr, [start])

`indexOf` 方法搜索并(如果找到)返回字符串中搜索到的字符或子字符串的索引。如果没有找到，则返回 -1。`Start` 是一个可选参数，指定字符串中开始搜索的位置（包含自身），默认值为 0。

```js
const str = 'hello world'

console.log(str.indexOf('l')) // 2
console.log(str.indexOf('f')) // -1
console.log(str.indexOf('l', 2)) // 2
console.log(str.indexOf('l', 4)) // 9
```

### lastIndexOf(substr, [start])

`lastIndexOf()` 方法返回指定文本在字符串中最后一次出现的索引, 如果未找到，则返回-1。 `Start` 是一个可选参数，指定字符串中开始搜索的位置, 默认值为 `string.length - 1`。

### slice(start, [end])

`slice()` 方法可提取字符串的某个部分，返回一个新的字符串。包括字符串从 `start` 开始（包括 `start`）到 `end` 结束（不包括 `end`）为止的所有字符。

```js
const str = `hello world`

console.log(str.slice(0)) // 'hello world'
console.log(str.slice(0, 2)) // 'he'
```

### split(delimiter, [limit])

`split()` 方法用于把一个字符串分割成字符串数组，返回一个字符串数组返回的数组中的字串不包括 `delimiter` 自身。可选的 `limit` 是一个整数，允许各位指定要返回的最大数组的元素个数。

```js
const str = '2021-01-29'

console.log(str.split('-')) // [ '2021', '01', '29' ]
console.log(str.split('-', 2)) // [ '2021', '01' ]
console.log(str.split(/-/)) // [ '2021', '01', '29' ]
```

### substr(start, [length])

`substr()` 方法可在字符串中抽取从 `start` 下标开始的指定数目的字符。返回一个新的字符串，包含从 `start`（包括 `start` 所指的字符） 处开始的 `length` 个字符。如果没有指定 `length`，那么返回的字符串包含从 `start` 到该字符串的结尾的字符。

```js
const str = 'hello world'

console.log(str.substr(1, 3)) // 'ell'
console.log(str.substr(3)) // 'lo world'
```

### toLowerCase() / toUpperCase()

`toLowerCase()` 方法用于把字符串转换为小写。

`toUpperCase()` 方法用于把字符串转换为大写。

```js
const str = 'hello world'

console.log(str.toUpperCase()) // 'HELLO WORLD'
console.log(str.toUpperCase().toLowerCase()) // 'hello world'
```

### includes() / startsWith() / endsWith()

`includes()` 方法用于检查字符串是否包含指定的字符串或字符。

`startsWith()` 函数检查字符串是否以指定的字符串或字符开始。

`endsWith()` 函数检查字符串是否以指定的字符串或字符结束。

```js
const str = 'hello world'

console.log(str.includes('hello')) // true
console.log(str.startsWith('hello')) // true
console.log(str.endsWith('world')) // true
```

### repeat()

`repeat()` 构造并返回一个新字符串，该字符串包含被连接在一起的指定数量的字符串的副本。

```js
const str = 'hello world'

console.log(str.repeat(3)) // 'hello worldhello worldhello world'
```

### trim()

`trim()` 方法会从一个字符串的两端删除空白字符。在这个上下文中的空白字符是所有的空白字符 (`space`, `tab`, `no-break` `space` 等) 以及所有行终止符字符（如 `LF`，`CR`）

```js
const str = '   hello world   '

console.log(str.trim()) // 'hello world'
```

### 正则相关

- [x] **match(regexp)**：根据正则表达式在字符串中搜索匹配项。如果没有找到匹配项，则返回一个信息数组或 `null`。

- [x] **replace(regexp/substr, replacetext)**：`replace()` 方法用于在字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的子串。

- [x] **search(regexp)**：`search()` 方法用于检索字符串中指定的子字符串，或检索与正则表达式相匹配的子字符串，如果找到，返回与 `regexp` 相匹配的子串的起始位置，否则返回 `-1`。

## 数组

### 声明

调用 `new Array(number)` 会创建一个给定长度的数组，但不含有任何项。

```js
// 方括号 (常见用法)
let arr = [item1, item2...]

// new Array (极其少见)
let arr = new Array(item1, item2...)

let arr = [...new Array(3).keys()] // [0, 1, 2]

let arr = Array.of(3) // [3]
```

### toString

数组有自己的 `toString` 方法的实现，会返回以逗号隔开的元素列表。

例如：

```js
let arr = [1, 2, 3]

alert(arr) // 1,2,3
alert(String(arr) === '1,2,3') // true
```

### 添加/移除数组元素

- `push(...items)` 在末端添加 `items` 项。
- `pop()` 从末端移除并返回该元素。
- `shift()` 从首端移除并返回该元素。
- `unshift(...items)` 从首端添加 `items` 项。

### 遍历：常规

- `for (let i=0; i<arr.length; i++)` — 运行得最快，可兼容旧版本浏览器。
- `for (let item of arr)` — 现代语法，只能访问 `items`。
- `for (let i in arr)` — 永远不要用这个。

### splice

语法是：

```js
arr.splice(start[, deleteCount, elem1, ..., elemN])
```

它从索引 `start` 开始修改 `arr`：删除 `deleteCount` 个元素并在当前位置插入 `elem1, ..., elemN`。最后返回已被删除元素的数组。

### slice

语法是：

```js
arr.slice([start], [end])
```

它会返回一个新数组，将所有从索引 `start` 到 `end`（不包括 `end`）的数组项复制到一个新的数组。`start` 和 `end` 都可以是负数，在这种情况下，从末尾计算索引。

### concat

语法：

```js
arr.concat(arg1, arg2...)
```

- 它接受任意数量的参数 —— 数组或值都可以。

- 结果是一个包含来自于 arr，然后是 arg1，arg2 的元素的新数组。

- 如果参数 argN 是一个数组，那么其中的所有元素都会被复制。否则，将复制参数本身。

```js
let arr = [1, 2]

// create an array from: arr and [3,4]
alert(arr.concat([3, 4])) // 1,2,3,4

// create an array from: arr and [3,4] and [5,6]
alert(arr.concat([3, 4], [5, 6])) // 1,2,3,4,5,6

// create an array from: arr and [3,4], then add values 5 and 6
alert(arr.concat([3, 4], 5, 6)) // 1,2,3,4,5,6
```

### 遍历：forEach

语法：

```js
arr.forEach(function (item, index, array) {
  // ... do something with item
})
```

该函数的结果（如果它有返回）会被抛弃和忽略。

### 在数组中搜索

#### indexOf/lastIndexOf 和 includes

- `arr.indexOf(item, from)` 从索引 from 开始搜索 item，如果找到则返回索引，否则返回 -1。
- `arr.lastIndexOf(item, from)` —— 和上面相同，只是从右向左搜索。
- `arr.includes(item, from)` —— 从索引 from 开始搜索 item，如果找到则返回 true（译注：如果没找到，则返回 false）。

此外，`includes` 的一个非常小的差别是它能正确处理 `NaN`，而不像 i`ndexOf/lastIndexOf`：

```js
const arr = [NaN]
alert(arr.indexOf(NaN)) // -1（应该为 0，但是严格相等 === equality 对 NaN 无效）
alert(arr.includes(NaN)) // true（这个结果是对的）
```

#### find 和 findIndex

语法如下：

```js
let result = arr.find(function (item, index, array) {
  // 如果返回 true，则返回 item 并停止迭代
  // 对于假值（falsy）的情况，则返回 undefined
})
```

findIndex 和 find 类似，但返回索引而不是值。

#### filter

语法与 `find` 大致相同，但是 `filter` 返回的是所有匹配元素组成的数组：

```js
let results = arr.filter(function (item, index, array) {
  // 如果 true item 被 push 到 results，迭代继续
  // 如果什么都没找到，则返回空数组
})
```

### 转换数组

#### map

语法：

```js
let result = arr.map(function (item, index, array) {
  // 返回新值而不是当前元素
})
```

例如，在这里我们将每个元素转换为它的字符串长度：

```js
let lengths = ['Bilbo', 'Gandalf', 'Nazgul'].map(item => item.length)
alert(lengths) // 5,7,6
```

#### reduce

语法是：

```js
let value = arr.reduce(
  function (accumulator, item, index, array) {
    // ...
  },
  [initial]
)
```

该函数一个接一个地应用于所有数组元素，并将其结果“搬运（carry on）”到下一个调用。

参数：

- `accumulator` —— 是上一个函数调用的结果，第一次等于 `initial`（如果提供了 `initial` 的话）。
- `item` —— 当前的数组元素。
- `index` —— 当前索引。
- `arr` —— 数组本身。

应用函数时，上一个函数调用的结果将作为第一个参数传递给下一个函数。

#### sort

`arr.sort` 方法对数组进行 **原位（in-place）** 排序，更改元素的顺序。(译注：原位是指在此数组内，而非生成一个新数组。)

它还返回排序后的数组，但是返回值通常会被忽略，因为修改了 `arr` 本身。

对于许多字母，最好使用 `str.localeCompare `方法正确地对字母进行排序，

#### reverse

`arr.reverse` 方法用于颠倒 arr 中元素的顺序。

例如：

```js
let arr = [1, 2, 3, 4, 5]
arr.reverse()

alert(arr) // 5,4,3,2,1
```

它也会返回颠倒后的数组 arr。

#### split/join

拆分字母：

```js
let str = 'test'

alert(str.split('')) // t,e,s,t
```

`arr.join(glue)` 与 `split` 相反。它会在它们之间创建一串由 `glue` 粘合的 `arr` 项。

```js
let arr = ['Bilbo', 'Gandalf', 'Nazgul']

let str = arr.join(';') // 使用分号 ; 将数组粘合成字符串

alert(str) // Bilbo;Gandalf;Nazgul
```

### 其他

- [x] `arr.some(fn)/arr.every(fn)` 检查数组。这两个方法的行为类似于 `||` 和 `&&` 运算符：如果 `fn` 返回一个真值，`arr.some()` 立即返回 `true` 并停止迭代其余数组项；如果 `fn` 返回一个假值，`arr.every()` 立即返回 `false` 并停止对其余数组项的迭代。
- [x] `arr.fill(value, start, end)` —— 从索引 `start` 到 `end`，用重复的 `value `填充数组。
- [x] `arr.flat(depth)/arr.flatMap(fn)` 从多维数组创建一个新的扁平数组。

## Iterable object（可迭代对象）

**可迭代（Iterable）**对象是数组的泛化。这个概念是说任何对象都可以被定制为可在 `for..of` 循环中使用的对象。

### Symbol.iterator

通过自己创建一个对象，我们就可以轻松地掌握可迭代的概念。

例如，我们有一个对象，它并不是数组，但是看上去很适合使用 `for..of` 循环。

比如一个 `range` 对象，它代表了一个数字区间：

```js
let range = {
  from: 1,
  to: 5
}

// 我们希望 for..of 这样运行：
// for(let num of range) ... num=1,2,3,4,5
```

为了让 `range` 对象可迭代（也就让 `for..of` 可以运行）我们需要为对象添加一个名为 `Symbol.iterator` 的方法（一个专门用于使对象可迭代的内置 `symbol`）。

1. 当 `for..of` 循环启动时，它会调用这个方法（如果没找到，就会报错）。这个方法必须返回一个**迭代器（iterator）**—— 一个有 `next` 方法的对象。
2. 从此开始，`for..of` 仅适用于这个被返回的对象。
3. 当 `for..of` 循环希望取得下一个数值，它就调用这个对象的 `next()` 方法。
4. `next()` 方法返回的结果的格式必须是 `{done: Boolean, value: any}`，当 `done=true` 时，表示迭代结束，否则 `value` 是下一个值。

这是带有注释的 `range` 的完整实现：

```js
let range = {
  from: 1,
  to: 5
}

// 1. for..of 调用首先会调用这个：
range[Symbol.iterator] = function () {
  // ……它返回迭代器对象（iterator object）：
  // 2. 接下来，for..of 仅与此迭代器一起工作，要求它提供下一个值
  return {
    current: this.from,
    last: this.to,

    // 3. next() 在 for..of 的每一轮循环迭代中被调用
    next() {
      // 4. 它将会返回 {done:.., value :...} 格式的对象
      if (this.current <= this.last) {
        return { done: false, value: this.current++ }
      } else {
        return { done: true }
      }
    }
  }
}

// 现在它可以运行了！
for (let num of range) {
  alert(num) // 1, 然后是 2, 3, 4, 5
}
```

请注意可迭代对象的核心功能：关注点分离。

- `range` 自身没有 `next()` 方法。
- 相反，是通过调用 `range[Symbol.iterator]()` 创建了另一个对象，即所谓的“迭代器”对象，并且它的 `next` 会为迭代生成值。

因此，迭代器对象和与其进行迭代的对象是分开的。

### Array.from

- `Iterable` 如上所述，是实现了 `Symbol.iterator` 方法的对象。
- `Array-like` 是有索引和 `length` 属性的对象，所以它们看起来很像数组。

`Array.from(obj[, mapFn, thisArg])` 将可迭代对象或类数组对象 转化为真正的数组 `Array`，然后我们就可以对它应用数组的方法。

## Map and Set（映射和集合）

### Map

`Map` 是一个带键的数据项的集合，就像一个 `Object` 一样。 但是它们最大的差别是 `Map` 允许任何类型的键（key）。

它的方法和属性如下：

- `new Map()` —— 创建 map。
- `map.set(key, value)` —— 根据键存储值。
- `map.get(key)` —— 根据键来返回值，如果 map 中不存在对应的 key，则返回 undefined。
- `map.has(key)` —— 如果 key 存在则返回 true，否则返回 false。
- `map.delete(key) `—— 删除指定键的值。
- `map.clear()` —— 清空 map。
- `map.size` —— 返回当前元素个数。

### 链式调用

每一次 `map.set` 调用都会返回 `map` 本身，所以我们可以进行“链式”调用：

```js
map.set('1', 'str1').set(1, 'num1').set(true, 'bool1')
```

### Map 迭代

- `map.keys()` —— 遍历并返回所有的键（returns an iterable for keys），
- `map.values()` —— 遍历并返回所有的值（returns an iterable for values），
- `map.entries()` —— 遍历并返回所有的实体（returns an iterable for entries）[key, value]，for..of 在默认情况下使用的就是这个。

除此之外，`Map` 有内置的 `forEach` 方法，与 `Array` 类似：

```js
// 对每个键值对 (key, value) 运行 forEach 函数
recipeMap.forEach((value, key, map) => {
  alert(`${key}: ${value}`) // cucumber: 500 etc
})
```

### Object.entries：从对象创建 Map

```js
let obj = {
  name: 'John',
  age: 30
}

let map = new Map(Object.entries(obj))

alert(map.get('name')) // John
```

`Object.fromEntries` 方法的作用是相反的：给定一个具有 `[key, value] `键值对的数组，它会根据给定数组创建一个对象：

```js
let prices = Object.fromEntries([
  ['banana', 1],
  ['orange', 2],
  ['meat', 4]
])

// 现在 prices = { banana: 1, orange: 2, meat: 4 }

alert(prices.orange) // 2
```

### Set

`Set` 是一个特殊的类型集合 —— “值的集合”（没有键），它的每一个值只能出现一次。

它的主要方法如下：

- `new Set(iterable)` —— 创建一个 set，如果提供了一个 iterable 对象（通常是数组），将会从数组里面复制值到 set 中。
- `set.add(value)` —— 添加一个值，返回 set 本身
  `set.delete(value)` —— 删除值，如果 value 在这个方法调用的时候存在则返回 true ，否则返回 false。
- `set.has(value)` —— 如果 value 在 set 中，返回 true，否则返回 false。
- `set.clear()` —— 清空 set。
- `set.size` —— 返回元素个数。

### Set 迭代（iteration）

我们可以使用 `for..of` 或 `forEach` 来遍历 `Set`：

```js
let set = new Set(['oranges', 'apples', 'bananas'])

for (let value of set) alert(value)

// 与 forEach 相同：
set.forEach((value, valueAgain, set) => {
  alert(value)
})
```

`Map` 中用于迭代的方法在 `Set` 中也同样支持：

- `set.keys()` —— 遍历并返回所有的值（returns an iterable object for values），
- `set.values()` —— 与 set.keys() 作用相同，这是为了兼容 Map，
- `set.entries()` —— 遍历并返回所有的实体（returns an iterable object for entries）[value, value]，它的存在也是为了兼容 Map。

## WeakMap and WeakSet（弱映射和弱集合）

> 如果把一个对象放入到数组中，那么只要这个数组存在，那么这个对象也就存在，即使没有其他对该对象的引用。类似的，**如果我们使用对象作为常规 Map 的键，那么当 Map 存在时，该对象也将存在。它会占用内存**，并且应该不会被（垃圾回收机制）回收。**WeakMap 在这方面有着根本上的不同。它不会阻止垃圾回收机制对作为键的对象（key object）的回收。**

`WeakMap` 和 `Map` 的第一个不同点就是，`WeakMap` 的键必须是对象，不能是原始值：

```js
let weakMap = new WeakMap()

let obj = {}

weakMap.set(obj, 'ok') // 正常工作（以对象作为键）

// 不能使用字符串作为键
weakMap.set('test', 'Whoops') // Error，因为 "test" 不是一个对象
```

现在，如果我们在 `weakMap` 中使用一个对象作为键，并且没有其他对这个对象的引用 —— 该对象将会被从内存（和 map）中自动清除。

```js
let john = { name: 'John' }

let weakMap = new WeakMap()
weakMap.set(john, '...')

john = null // 覆盖引用

// john 被从内存中删除了！
```

`WeakMap` 不支持迭代以及 `keys()`，`values()` 和 `entries()` 方法。所以没有办法获取 `WeakMap` 的所有键或值。

`WeakMap` 只有以下的方法：

- `weakMap.get(key)`
- `weakMap.set(key, value)`
- `weakMap.delete(key)`
- `weakMap.has(key)`

## Object.keys，values，entries

### 数据迭代

`实例.keys()`，`实例.values()` 和 `实例.entries()` 这些方法是通用的，有一个共同的约定来将它们用于各种数据结构的迭代。返回值：**可迭代项**

它们支持：

- Map
- Set
- Array

普通对象也支持类似的方法，但是语法上有一些不同。

对于普通对象，下列这些方法是可用的：

- `Object.keys(obj)` —— 返回一个包含该对象所有的键的**数组**。
- `Object.values(obj)` —— 返回一个包含该对象所有的值的**数组**。
- `Object.entries(obj)` —— 返回一个包含该对象所有 `[key, value]` 键值对的**数组**。

### 对象映射

```js
let prices = {
  banana: 1,
  orange: 2,
  meat: 4
}

let doublePrices = Object.fromEntries(
  // 转换为数组，之后使用 map 方法，然后通过 fromEntries 再转回到对象
  Object.entries(prices).map(([key, value]) => [key, value * 2])
)

alert(doublePrices.meat) // 8
```

## 解构赋值

> 解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象。由于`undefined` 和 `null` 无法转为对象，所以对它们进行解构赋值，都会报错。

```js
let { toString: s } = 123
s === Number.prototype.toString // true

let { toString: s } = true
s === Boolean.prototype.toString // true

let { prop: x } = undefined // TypeError
let { prop: y } = null // TypeError
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
- 遍历 Map 结构：`for (let [k, v] of Map) {}`
- 输入模块指定属性和方法：`const { readFile, writeFile } = require("fs")`

> 重点难点

- 匹配模式：只要等号两边的模式相同，左边的变量就会被赋予对应的值
- 解构赋值规则：只要等号右边的值不是对象或数组，就先将其转为对象
- 解构默认值生效条件：属性值严格等于 `undefined`
- 解构遵循匹配模式
- 解构不成功时变量的值等于 `undefined`
- `undefined` 和 `null` 无法转为对象，因此无法进行解构

## 日期和时间

- 在 JavaScript 中，日期和时间使用 `Date` 对象来表示。我们不能只创建日期，或者只创建时间，`Date` 对象总是同时创建两者。
- 月份从 0 开始计数（对，一月是 0）。
- 一周中的某一天 `getDay()` 同样从 0 开始计算（0 代表星期日）。
- 当设置了超出范围的组件时，`Date` 会进行自我校准。这一点对于日/月/小时的加减很有用。
- 日期可以相减，得到的是以毫秒表示的两者的差值。因为当 `Date` 被转换为数字时，`Date` 对象会被转换为时间戳。
- 使用 `Date.now()` 可以更快地获取当前时间的时间戳。

## JSON 方法，toJSON

- `JSON.stringify` 将对象转换为 `JSON`。
- 一些特定于 JavaScript 的对象属性会被 `JSON.stringify` 跳过。即：
  1. 函数属性（方法）。
  2. Symbol 类型的属性。
  3. 存储 undefined 的属性
- `JSON.parse` 将 `JSON` 转换回对象。
- 如果一个对象具有 `toJSON`，那么它会被 `JSON.stringify` 调用。
