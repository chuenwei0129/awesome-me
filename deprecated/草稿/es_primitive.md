# JavaScript 基础知识总结(一)<!-- omit in toc -->

<!-- markdown="1" is required for GitHub Pages to render the TOC properly. -->

<details markdown="1">
  <summary>🌳 <strong>目录</strong></summary>
<br>

- [原始类型](#原始类型)
  - [Null / Undefined](#null--undefined)
    - [为什么 typeof null 的结果是 Object?](#为什么-typeof-null-的结果是-object)
    - [《JavaScript 悟道》将 undefined 列入保留字，这是故意为之得吗？](#javascript-悟道将-undefined-列入保留字这是故意为之得吗)
    - [在现代 JavaScript 代码中，应该推荐使用 undefined 还是 null？](#在现代-javascript-代码中应该推荐使用-undefined-还是-null)
  - [Number](#number)
    - [为什么在 JavaScript 中 NaN 不能是一个独立的类型？](#为什么在-javascript-中-nan-不能是一个独立的类型)
    - [JavaScript 里最大的安全的整数为什么是 2 的 53 次方减一？](#javascript-里最大的安全的整数为什么是-2-的-53-次方减一)
    - [JavaScript 著名面试题: 0.1 + 0.2 !== 0.3，即将成为过去](#javascript-著名面试题-01--02--03即将成为过去)
    - [属性](#属性)
      - [`Number.EPSILON`](#numberepsilon)
      - [`Number.MAX_SAFE_INTEGER`](#numbermax_safe_integer)
      - [`Number.MAX_VALUE`](#numbermax_value)
      - [`Number.MIN_SAFE_INTEGER`](#numbermin_safe_integer)
      - [`Number.MIN_VALUE`](#numbermin_value)
      - [`Number.NaN`](#numbernan)
      - [`Number.NEGATIVE_INFINITY`](#numbernegative_infinity)
      - [`Number.POSITIVE_INFINITY`](#numberpositive_infinity)
    - [方法](#方法)
      - [`Number.isNaN()`](#numberisnan)
      - [`Number.isFinite()`](#numberisfinite)
      - [`Number.isInteger()`](#numberisinteger)
      - [`Number.isSafeInteger()`](#numberissafeinteger)
      - [`Number.parseFloat()`](#numberparsefloat)
      - [`Number.parseInt()`](#numberparseint)
      - [numObj.toFixed(digits)](#numobjtofixeddigits)
      - [numObj.toLocaleString([locales [, options]])](#numobjtolocalestringlocales--options)
      - [numObj.toPrecision(precision)](#numobjtoprecisionprecision)
  - [Boolean](#boolean)
  - [String](#string)
    - [常用方法](#常用方法)
      - [str.at(index)](#stratindex)
      - [str.concat(str2, [, ...strN])](#strconcatstr2--strn)
      - [str.indexOf(searchValue [, fromIndex])](#strindexofsearchvalue--fromindex)
      - [str.slice(beginIndex[, endIndex])](#strslicebeginindex-endindex)
      - [str.split([separator[, limit]])](#strsplitseparator-limit)
      - [str.toUpperCase() / str.toLowerCase()](#strtouppercase--strtolowercase)
      - [str.includes(searchString[, position]) / str.startsWith(searchString[, position]) / str.endsWith(searchString[, length])](#strincludessearchstring-position--strstartswithsearchstring-position--strendswithsearchstring-length)
      - [str.repeat(count)](#strrepeatcount)
      - [str.trim()](#strtrim)
      - [str.padStart(targetLength [, padString]) / str.padEnd(targetLength [, padString])](#strpadstarttargetlength--padstring--strpadendtargetlength--padstring)
      - [正则相关](#正则相关)
  - [Symbol](#symbol)
  - [BigInt](#bigint)
- [包装对象](#包装对象)
  - [对象包装器](#对象包装器)
  - [symbol为什么没有包装类型?](#symbol为什么没有包装类型)
  - [对于 JavaScript 的 new Object() 的疑问？](#对于-javascript-的-new-object-的疑问)
  - [使用两个点来调用一个方法](#使用两个点来调用一个方法)
- [类型转换](#类型转换)
  - [强制类型转换](#强制类型转换)
  - [隐式类型转换](#隐式类型转换)
  - [对象转换成原始类型](#对象转换成原始类型)
- [类型检测](#类型检测)
  - [typeof](#typeof)
  - [instanceof](#instanceof)
  - [Object.prototype.toString](#objectprototypetostring)
  - [isObject](#isobject)
  - [isEmptyObject](#isemptyobject)
  - [isInteger](#isinteger)
  - [Array.isArray](#arrayisarray)
  - [isPrime](#isprime)
- [值类型和引用类型](#值类型和引用类型)

</details>

## 原始类型

在 ECMAScript 标准中，语言类型（Language Type）有：`Undefined`, `Null`, `Boolean`, `String`, `Symbol`, `Number`, `BigInt` 和 `Object`。除了 `Object`，其余的为原始类型，原始**类型**的**值**是**唯一的**、**不可变的**。

### Null / Undefined

#### [为什么 typeof null 的结果是 Object?](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/typeof#typeof_null)

```js
// JavaScript 诞生以来便如此
typeof null === 'object'
```

在 JavaScript 最初的实现中，JavaScript 中的值是由一个表示类型的标签和实际数据值表示的。对象的类型标签是 0。由于 `null` 代表的是空指针（大多数平台下值为 0x00），因此，null 的类型标签是 0，`typeof null` 也因此返回 `"object"`。（[参考来源](https://www.2ality.com/2013/10/typeof-null.html)）

曾有一个 ECMAScript 的修复提案（通过选择性加入的方式），但[被拒绝了](http://wiki.ecmascript.org/doku.php?id=harmony:typeof_null)。该提案会导致 `typeof null === 'null'`。

#### [《JavaScript 悟道》将 undefined 列入保留字，这是故意为之得吗？](https://www.zhihu.com/question/472379938)

**什么是字面量？**

维基百科上是这么定义的：

> 一个字面量就是在源代码中表示某个**固定值**的符号。

**编译器或者解释器看到一个字面量，就知道它表示的是哪个具体的值。**

**可见字面量和标识符（可变化）是冲突的**，所以**标识符不能以数字开头。**

比如，如果 `11` 不是一个**固定的十进制数** `11`，那什么来表示 `11` 呢？

`null` 是字面量，`true` 和 `false` 也是字面量，所以就得把它们规定成为保留字，不能作为标识符使用。

**由于历史包袱：**

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/js/SCR-20220509-fzv.png)

**`undefined` 不是保留字**，你可以定义一个名为 `undefined` 的局部变量。而且 JavaScript 引擎已经内置了一个 `undefined` 全局变量，它的值是 `undefined`。

更明确点讲，我们写在 JavaScript 代码中的 `undefined`，并不是 `undefined` 值本身。而是一个局部变量或者是全局对象的一个属性。但大部分时候它们的值是 `undefined`。`NaN` 和 `Infinity` 也同理。

> 🍑 **影响：**
>
>**因为不存在 `undefined` 字面量，所以 `x === undefined` 并不能说明变量 x 的值就是 `undefined`，更可靠的检测方法是 `typeof x === 'undefined'` 或者使用 `x == null`。**

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/js/SCR-20220509-g29.png)

```js
var undefined = 1
console.log(undefined) // 打印出什么？
```

**浏览器：**

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/js/SCR-20220509-gsd.png)

**Node：**

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/js/SCR-20220509-gtq.png)

**原因：**

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/js/SCR-20220509-fzc.png)

**踩坑：**

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/js/SCR-20220509-fz1.png)

```js
// Code Runner
var let = 1
console.log(let) // 1

var await = 2
console.log(await) // 2
```

#### [在现代 JavaScript 代码中，应该推荐使用 undefined 还是 null？](https://www.zhihu.com/question/479435433/answer/2057762335)

```js
const a = { foo: null }
const b = { foo: undefined }
const c = {}

'foo' in a // true
'foo' in b // true
'foo' in c // false
```

> **听祖师爷的**
>
![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/js/SCR-20220509-gxu.png)

### [Number](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number)

#### [为什么在 JavaScript 中 NaN 不能是一个独立的类型？](https://www.zhihu.com/question/379014728)

在 JavaScript 里，数字均为基于 [IEEE 754 标准的双精度 64 位的浮点数](https://zh.wikipedia.org/wiki/%E9%9B%99%E7%B2%BE%E5%BA%A6%E6%B5%AE%E9%BB%9E%E6%95%B8)。

`NaN` 是一个 IEEE754 浮点数标准明确定义的**值**。

在 64 位双精度浮点数中，1 位符号位，11 位阶码(指数)，52 位尾数。

- 阶码全 `1`，尾数全 `0` 表示无穷大。
- 阶码全 `1`，尾数非全 `0` 的所有数字都表示 `NaN`。
- 阶码(指数)全 `0`，尾数全 `0` 表示 `0`。

所以，在浮点数表示法中 `NaN` 一共 **2^53 - 2** 个，`Infinity` 有 **2** 个，`0` 也有 **2** 个。

**整数零不能做除数，但是浮点数零可以做除数。**

```js
0 / 0            // NaN
0n / 0n          // 抛出 RangeError
```

#### [JavaScript 里最大的安全的整数为什么是 2 的 53 次方减一？](https://www.zhihu.com/question/29010688)

> **“安全”** 的意思是说能够 **one-by-one** 表示的整数，也就是说在 `(-2^53, 2^53)` 范围内，**双精度数表示和整数是一对一的**，反过来说，在这个范围以内，所有的整数都有唯一的浮点数表示，这叫做安全整数。

而超过这个范围，会有两个或更多整数的双精度表示是相同的；反过来说，超过这个范围，有的整数是无法精确表示的，只能 `round` 到与它相近的浮点数（说到底就是科学计数法）表示，这种情况下叫做不安全整数。

在解析序列化的 JSON 时，**超出此范围的整数值可能会被破坏**。在工作中使用[`String`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String) 类型代替，是一个可行的解决方案。

> [浮点数之谜](./ieee754.md)

```js
// 不考虑输入输出，只考虑思路
const doubleToBinary = double => {
  // 将浮点数转换为带符号的二进制
  let signBinary = double.toString(2)
  let noSignBinary
  let sign
  let fraction
  let noBiasedExponent
  if (signBinary[0].includes('-')) {
    noSignBinary = signBinary.slice(1)
    sign = '1'
  } else {
    noSignBinary = signBinary
    sign = '0'
  }
  // 获取指数位，尾数位
  if (noSignBinary.split('.')[0] === '0') {
    // 处理（0-1）
    noBiasedExponent = 1 - [...noSignBinary].indexOf('1')
    fraction = noSignBinary
      .slice([...noSignBinary].indexOf('1') + 1)
      .slice(0, 52)
      .padEnd(52, '0')
  } else {
    noBiasedExponent = noSignBinary.split('.')[0].length - 1
    fraction = noSignBinary.replace('.', '').slice(1).padEnd(52, '0').slice(0, 52)
  }

  let biasedExponentBinary = (noBiasedExponent + 1023).toString(2).padStart(11, '0')
  return `${sign} ${biasedExponentBinary} ${fraction}`
}

console.log(doubleToBinary(2 ** 53 - 3))
console.log(doubleToBinary(2 ** 53 - 2))
console.log(doubleToBinary(2 ** 53 - 1))
console.log(doubleToBinary(2 ** 53))
console.log(doubleToBinary(2 ** 53 + 1))
console.log(doubleToBinary(2 ** 53 + 2))
console.log(doubleToBinary(2 ** 53 + 3))
console.log(doubleToBinary(2 ** 53 + 4))
console.log(doubleToBinary(2 ** 53 + 5))
console.log(doubleToBinary(2 ** 53 + 6))

// 0 10000110011 1111111111111111111111111111111111111111111111111101
// 0 10000110011 1111111111111111111111111111111111111111111111111110
// 0 10000110011 1111111111111111111111111111111111111111111111111111
// 0 10000110100 0000000000000000000000000000000000000000000000000000
// 0 10000110100 0000000000000000000000000000000000000000000000000000
// 0 10000110100 0000000000000000000000000000000000000000000000000001
// 0 10000110100 0000000000000000000000000000000000000000000000000010
// 0 10000110100 0000000000000000000000000000000000000000000000000010
// 0 10000110100 0000000000000000000000000000000000000000000000000010
// 0 10000110100 0000000000000000000000000000000000000000000000000011

console.log(doubleToBinary(0.1))
console.log(doubleToBinary(0.2))
console.log(doubleToBinary(0.1 + 0.2))
console.log(doubleToBinary(0.3))

// 0 01111111011 1001100110011001100110011001100110011001100110011010
// 0 01111111100 1001100110011001100110011001100110011001100110011010
// 0 01111111101 0011001100110011001100110011001100110011001100110100
// 0 01111111101 0011001100110011001100110011001100110011001100110011
```

**内存是有限的，想存储的数字是无限的。**

浮点数存储数字是越来越稀疏的，在 `0 10000110100 0000000000000000000000000000000000000000000000000000` 之后的二进制的间隔发生了改变应该是大于 `1` 的，就好比 `2 ** 53` 之前的数字范围在内存中二进制数是比想存储的整数多的，很容易做到一对一，之后就做不到了，小数位精度也是如此。

#### [JavaScript 著名面试题: 0.1 + 0.2 !== 0.3，即将成为过去](https://zhuanlan.zhihu.com/p/225490777)

> [https://0.30000000000000004.com](https://link.zhihu.com/?target=https%3A//0.30000000000000004.com/)

在小数点运算时，JavaScript将隐式的采取[IEEE754 二进制浮点运算](https://tooltt.com/floatconverter/)而不是我们想象中的十进制运算。而十进制和二进制转换时，就可能出现精度丢失的问题。

```JS
// 十进制转二进制无法准确表达0.1和0.2，只能用循环逼近；
0.1 -> 0.0001100110011001100(1100循环) -> 1.100110011001100 * 2^(-4)
0.2 -> 0.0011001100110011001(1001无限循环) -> 1.100110011001100 * 2^(-3)
// 数学中计算时，我们需要将指数位置对齐，但需要指明的是JS中没有采用Exponent Bias，而是将尾数Mantissa视为为整数计算的，这样误差会增大，但是实现算法简单。
(1).1001100110011001100110011001100110011001100110011010 (Exponent:-4)+
(1).1001100110011001100110011001100110011001100110011010 (Exponent:-3)=
(1).0011001100110011001100110011001100110011001100110100 (Exponent:-2)

// 转换为IEEE754双精度为 1.0011001100110011001100110011001100110011001100110100 * 2^(-2),如果用二进制转成十进制为(2^(-2)+2^(-5)+2^(-6)...)。 结果大约是0.30000000000000004419，去小数点后面17位精度为0.30000000000000004，
```

> **精度损失可能出现在进制转化和对阶运算过程中**

为 JS 的精度丢失问题历史，所以通常 JS 中最佳实践中，不推荐大家用 JS 进行浮点运算

```js
// 比较两个浮点数差值的绝对值，是否超过误差精度
function compareTwo(n1, n2) {
  return Math.abs(n1 - n2) < Number.EPSILON
}
compareTwo(0.1 + 0.2, 0.3)
```

#### 属性

##### [`Number.EPSILON`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/EPSILON)

**`Number.EPSILON`** 属性表示 1 与[`Number`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number)可表示的大于 1 的最小的浮点数之间的差值。

```js
// 比较两个浮点数差值的绝对值，是否超过误差精度，是否”相等“
const equal = (a, b) => Math.abs(a - b) < Number.EPSILON
console.log(equal(0.1 + 0.2, 0.3)) // true
```

> [Polyfill](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/EPSILON#polyfill)

##### [`Number.MAX_SAFE_INTEGER`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER)

JavaScript 中最大的安全整数 (`2^53 - 1`)。

##### [`Number.MAX_VALUE`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_VALUE)

能表示的最大正数。最小的负数是 `-MAX_VALUE`。

##### [`Number.MIN_SAFE_INTEGER`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/MIN_SAFE_INTEGER)

JavaScript 中最小的安全整数 (`-(2^53 - 1)`).

##### [`Number.MIN_VALUE`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/MIN_VALUE)

能表示的最小正数即最接近 0 的正数 (实际上不会变成 0)。最大的负数是 `-MIN_VALUE`。

##### [`Number.NaN`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/NaN)

`**Number.NaN**` 表示“非数字”（Not-A-Number）。和 [`NaN`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/NaN) 相同。

编码中很少直接使用到 `NaN`。通常都是在计算失败时，作为 Math 的某个方法的返回值出现的（例如：`Math.sqrt(-1)`）或者尝试将一个字符串解析成数字但失败了的时候（例如：`parseInt("blabla")`）。

> [为什么 `NaN ** 0 === 1` ?](https://stackoverflow.com/questions/17863619/why-does-nan0-1)

```js
// Why does NaN^0 == 1?
console.log(Number.NaN ** 0) // 1
console.log(Number.MAX_SAFE_INTEGER ** 0) // 1
console.log(Number.MIN_SAFE_INTEGER ** 0) // 1

// NaN 不等于任何值，包括它本身。NaN 与任何数（包括它自己）的运算，得到的都是 NaN。
console.log(1 + NaN) // NaN
console.log(Object.is(+0, -0)) // false
console.log(Object.is(NaN, NaN)) // true
console.log(+0 === -0) // true
console.log(NaN === NaN) // false
```

##### [`Number.NEGATIVE_INFINITY`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/NEGATIVE_INFINITY)

特殊的负无穷大值，在溢出时返回该值。

##### [`Number.POSITIVE_INFINITY`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/POSITIVE_INFINITY)

特殊的正无穷大值，在溢出时返回该值。

`Infinity` 的初始值是 [`Number.POSITIVE_INFINITY`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/POSITIVE_INFINITY)。`Infinity`（正无穷大）大于任何值。

```js
console.log(42 / -0) // -Infinity
console.log(42 / +0) // Infinity
```

#### 方法

##### [`Number.isNaN()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN)

请注意 `isNaN()` 和 `Number.isNaN()` 之间的区别：如果当前值是 `NaN`，或者将其强制转换为数字后将是 `NaN`，则前者将返回 `true`。而后者仅当值当前为 `NaN` 时才为 `true`：

```js
Number.isNaN(NaN) // true
Number.isNaN(Number.NaN) // true
// 整数零不能做除数，但是浮点数零可以做除数。
// 0n / 0n      // 抛出 RangeError
Number.isNaN(0 / 0) // true

console.log(isNaN(NaN)) // true
// isNaN 只对数值有效，如果传入其他值，会被先转成数值。比如，传入字符串的时候，字符串会被先转成 NaN，所以最后返回 true，这一点要特别引起注意。也就是说，isNaN 为 true 的值，有可能不是 NaN，而是一个字符串。
console.log(isNaN('fuck')) // true
console.log(isNaN({})) // true
console.log(Number.isNaN('fuck')) // false
console.log(Number.isNaN({})) // false

// polyfill
function myIsNaN(val) {
  return typeof val === 'number' && isNaN(val)
}
// or
// 利用 NaN 为唯一不等于自身的值
function _isNaN(param) {
  return param !== param
}
```

##### [`Number.isFinite()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite)

确定传递的值类型及本身是否是有限数。

##### [`Number.isInteger()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger)

确定传递的值类型是“number”，且是整数。

##### [`Number.isSafeInteger()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger)

确定传递的值是否为安全整数 ( -`(2^53 - 1)` 至 `2^53 - 1`)之间。

##### [`Number.parseFloat()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/parseFloat)

和全局对象 [`parseFloat()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/parseFloat) 一样。

##### [`Number.parseInt()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/parseInt)

和全局对象 [`parseInt()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/parseInt) 一样。

- `parseInt` 方法用于将字符串转为整数。
- `parseInt` 的参数不是字符串，会先转为字符串再转换。
- `parseInt` 方法还可以接受第二个参数（2 到 36 之间），如果第二个参数不是数值，会被自动转为一个整数。这个整数只有在 2 到 36 之间，才能得到有意义的结果，超出这个范围，则返回 NaN。如果第二个参数是 `0`、`undefined` 和 `null`，则直接忽略。
- 二进制只能转换含有 '0'、'1' 的字符串，其他进制也类似。
- `parseInt` 的返回值只有两种可能，要么是一个十进制整数，要么是 `NaN`。
- 为了算术的目的，`NaN` 值不能作为任何 `radix` 的数字。

```js
// parseInt 方法用于将字符串转为整数。
console.log(parseInt('123')) // 123
// 如果字符串头部有空格，空格会被自动去除。
console.log(parseInt('  123')) // 123
// 如果 parseInt 的参数不是字符串，则会先转为字符串再转换。
console.log(parseInt({})) // NaN
// 字符串转为整数的时候，是一个个字符依次转换，如果遇到不能转为数字的字符，就不再进行下去，返回已经转好的部分。
console.log(parseInt('123, 456')) // 123
// 如果字符串的第一个字符不能转化为数字（后面跟着数字的正负号除外），返回 NaN。
console.log(parseInt('*123'))
// 所以，parseInt 的返回值只有两种可能，要么是一个十进制整数，要么是 NaN。

// parseInt 方法还可以接受第二个参数（ 2 到 36 之间），表示被解析的值的进制，返回该值对应的十进制数。默认情况下，parseInt 的第二个参数为 10，即默认是十进制转十进制。
// 如果第二个参数不是数值，会被自动转为一个整数。这个整数只有在 2 到 36 之间，才能得到有意义的结果，超出这个范围，则返回 NaN。如果第二个参数是 0、undefined 和 null，则直接忽略。
console.log(parseInt('123', 0)) // 123
console.log(parseInt('123', undefined)) // 123
console.log(parseInt('123', null)) // 123

console.log(parseInt('123', 1)) // NaN
console.log(parseInt('123', 37)) // NaN

// 如果字符串包含对于指定进制无意义的字符，则从最高位开始，只返回可以转换的数值。如果最高位无法转换，则直接返回 NaN。
console.log(parseInt('101055', 2)) // 10
console.log(parseInt('5101055', 2)) // NaN

console.log(parseInt('123', NaN)) // 123
```

> [JS 里 `parseInt('3.14e2')` 为什么输出的是 3 而不是 3.14，这个如何解释?](https://www.zhihu.com/question/460606074)

##### numObj.toFixed(digits)

函数 `toFixed(digits)` 将数字舍入到小数点后 `digits` 位，并以字符串形式返回结果。

**digits：** 小数点后数字的个数；介于 `0` 到 `20` （包括）之间，实现环境可能支持更大范围。如果忽略该参数，则默认为 `0`。

```js
(1.23e+20).toFixed(2);    // 返回 "123000000000000000000.00"
2.35.toFixed(1)           // 返回 '2.4'. Note it rounds up
2.55.toFixed(1)           // 返回 '2.5'. Note it rounds down - see warning above
-2.34.toFixed(1);         // 返回 -2.3 （由于操作符优先级，负数不会返回字符串）
(-2.34).toFixed(1);       // 返回 "-2.3" （若用括号提高优先级，则返回字符串）
```

##### numObj.toLocaleString([locales [, options]])

**`toLocaleString()`** 方法返回这个数字在特定语言环境下的表示字符串。

```js
var number = 123456.789;

// 德国使用逗号作为小数分隔符，分位周期为千位
console.log(number.toLocaleString('de-DE'));
// → 123.456,789
```

##### numObj.toPrecision(precision)

**`toPrecision()`** 方法以指定的精度返回该数值对象的字符串表示。

```js
// 注意：在某些情况下会以指数表示法返回
console.log((1234.5).toPrecision(2)); // "1.2e+3"
```

### Boolean

C 语言以及与其兼容的 C++ 语言中，是没有 boolean 类型的，也没有 `true` 和 `false` 关键字。

所有的条件判断语句，大体上都基本等价于 `expression != 0`。

JavaScript 的这个特性便来自于此，也就是说理论上来说 `if( expression )` 其实是 `if( expression is not false value )`

在 JavaScript 中，只有 `7` 种值可以被转换成 `false`，其他都会被转换成 `true`。

```js
console.log(Boolean(false)) // false

console.log(Boolean(undefined)) // false
console.log(Boolean(null)) // false
console.log(Boolean(+0)) // false
console.log(Boolean(-0)) // false
console.log(Boolean(NaN)) // false
console.log(Boolean('')) // false
console.log(Boolean(0n)) // false
```

### [String](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)

> [速读 ECMAScript 6 入门（二)](./es6_2.md)

**JavaScript 的字符串是不可更改的。** 字符串既是可迭代的（for..of 对它们有效），又是类数组的（它们有数值索引和 length 属性）。

#### 常用方法

##### str.at(index)

**`at()`** 方法接受一个整数值，并返回一个新的 [`String`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)，该字符串由位于指定偏移量处的单个 UTF-16 码元组成。该方法允许正整数和负整数。负整数从字符串中的最后一个字符开始倒数。

##### str.concat(str2, [, ...strN])

`concat()` 方法用于连接两个或多个字符串，此方法不改变现有的字符串，返回拼接后的新的字符串。

```js
const v1 = 'hello'
const v2 = 'world'

const str = v1.concat(' ', v2)
const _str = `${v1} ${v2}`
console.log(str, v1, v2, _str) // 'hello world' 'hello' 'world' 'hello world'
```

##### str.indexOf(searchValue [, fromIndex])

**`indexOf()`** 方法返回调用它的 [`String`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String) 对象中第一次出现的指定值的索引，从 `fromIndex` 处进行搜索。如果未找到该值，则返回 -1。

```js
const str = 'hello world'

console.log(str.indexOf('l')) // 2
console.log(str.indexOf('f')) // -1
console.log(str.indexOf('l', 2)) // 2
console.log(str.indexOf('l', 4)) // 9
```

##### str.slice(beginIndex[, endIndex])

`slice()` 方法可提取字符串的某个部分，返回一个新的字符串。包括字符串从 `start` 开始（包括 `start`）到 `end` 结束（不包括 `end`）为止的所有字符。

```js
const str = `hello world`

console.log(str.slice(0)) // 'hello world'
console.log(str.slice(0, 2)) // 'he'
```

##### str.split([separator[, limit]])

**`split()`** 方法使用指定的分隔符字符串将一个[`String`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)对象分割成子字符串数组，以一个指定的分割字串来决定每个拆分的位置。

```js
const str = '2021-01-29'

console.log(str.split('-')) // [ '2021', '01', '29' ]
console.log(str.split('-', 2)) // [ '2021', '01' ]
console.log(str.split(/-/)) // [ '2021', '01', '29' ]
```

##### str.toUpperCase() / str.toLowerCase()

- **`toUpperCase()`** 方法将调用该方法的字符串转为大写形式并返回（如果调用该方法的值不是字符串类型会被强制转换）。

- **`toLowerCase()`** 会将调用该方法的字符串值转为小写形式，并返回。

```js
const str = 'hello world'

console.log(str.toUpperCase()) // 'HELLO WORLD'
console.log(str.toUpperCase().toLowerCase()) // 'hello world'
```

##### str.includes(searchString[, position]) / str.startsWith(searchString[, position]) / str.endsWith(searchString[, length])

- **`includes()`** 方法用于判断一个字符串是否包含在另一个字符串中，根据情况返回 true 或 false。

- **`startsWith()`** 方法用来判断当前字符串是否以另外一个给定的子字符串开头，并根据判断结果返回 `true` 或 `false`。

- **`endsWith()`** 方法用来判断当前字符串是否是以另外一个给定的子字符串“结尾”的，根据判断结果返回 `true` 或 `false`。

```js
const str = 'hello world'

console.log(str.includes('hello')) // true
console.log(str.startsWith('hello')) // true
console.log(str.endsWith('world')) // true
```

##### str.repeat(count)

**`repeat()`** 构造并返回一个新字符串，该字符串包含被连接在一起的指定数量的字符串的副本。

```js
const str = 'hello world'

console.log(str.repeat(3)) // 'hello worldhello worldhello world'
```

##### str.trim()

**`trim()`** 方法会从一个字符串的两端删除空白字符。在这个上下文中的空白字符是所有的空白字符 (space, tab, no-break space 等) 以及所有行终止符字符（如 LF，CR等）。

```js
const str = '   hello world   '

console.log(str.trim()) // 'hello world'
```

##### str.padStart(targetLength [, padString]) / str.padEnd(targetLength [, padString])

- **`padStart()`** 方法用另一个字符串填充当前字符串(如果需要的话，会重复多次)，以便产生的字符串达到给定的长度。从当前字符串的左侧开始填充。

- **`padEnd()`**  方法会用一个字符串填充当前字符串（如果需要的话则重复填充），返回填充后达到指定长度的字符串。从当前字符串的末尾（右侧）开始填充。

##### 正则相关

- **`str.match(regexp)`**：根据正则表达式在字符串中搜索匹配项。如果没有找到匹配项，则返回一个信息数组或 `null`。

- **`str.matchAll(regexp)`** 方法返回一个包含所有匹配正则表达式的结果及分组捕获组的迭代器。

- **`str.replace(regexp|substr, newSubStr|function)`** 方法返回一个由替换值（`replacement`）替换部分或所有的模式（`pattern`）匹配项后的新字符串。模式可以是一个字符串或者一个[正则表达式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp)，替换值可以是一个字符串或者一个每次匹配都要调用的回调函数。**如果`pattern`是字符串，则仅替换第一个匹配项。**

- **`str.replaceAll(regexp|substr, newSubstr|function)`** 方法返回一个新字符串，新字符串所有满足 `pattern` 的部分都已被`replacement` 替换。`pattern`可以是一个字符串或一个 [`RegExp`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp)， `replacement`可以是一个字符串或一个在每次匹配被调用的函数。

- **`str.search(regexp)`**：`search()` 方法用于检索字符串中指定的子字符串，或检索与正则表达式相匹配的子字符串，如果找到，返回与 `regexp` 相匹配的子串的起始位置，否则返回 `-1`。

### [Symbol](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol)

> [速读 ECMAScript 6 入门（二)](./es6_2.md)

**没人知道的课外小知识：**

早期的 js 实现里，通过自定义的 `valueOf()` 转换对象为原始值时，会有个 `hint` 参数，表明它的上下文希望转换出的原始值是字符串还是数字，比如：

```js
obj = {valueOf(hint){console.log(hint)}}
+obj // "number"
Number(obj) // "number"
obj + "" // "string"
1[obj] // "string"
```

不过这东西最终也没有进 ES1，然而最终进了 ES6 里，成为了新的对象转换为原始值的方法 `Symbol.toPrimitive`:

```js
+{[Symbol.toPrimitive](hint){console.log(hint)}} // "number"
```

### BigInt

> [BigInt 的存储机制是什么？](https://www.zhihu.com/question/472425718)

可以用在一个整数字面量后面加 `n` 的方式定义一个 `BigInt` ，如：`10n`，或者调用函数 `BigInt()`（但不包含 `new` 运算符）并传递一个整数值或字符串值。

```js
console.log(typeof 1n) // 'bigint'
console.log(typeof BigInt('1') === 'bigint') // true
console.log(typeof Object(1n)) // 'object'
```

它在某些方面类似于 [`Number`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number) ，但是也有几个关键的不同点：不能用于 [`Math`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math) 对象中的方法；不能和任何 [`Number`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number) 实例混合运算，两者必须转换成同一种类型。在两种类型来回转换时要小心，因为 `BigInt` 变量在转换成 [`Number`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number) 变量时可能会丢失精度。

以下操作符可以和 `BigInt` 一起使用： `+`、\``*`\`、\``-`\`、\``**`\`、\``%`\` 。除 `>>>` （无符号右移）之外的 [位操作](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators) 也可以支持。因为 `BigInt` 都是有符号的， `>>>` （无符号右移）不能用于 `BigInt`。[为了兼容 asm.js](https://github.com/tc39/proposal-bigint/blob/master/ADVANCED.md#dont-break-asmjs) ，`BigInt` 不支持单目 (`+`) 运算符。

`/` 操作符对于整数的运算也没问题。可是因为这些变量是 `BigInt` 而不是 `BigDecimal` ，该操作符结果会向零取整，也就是说不会返回小数部分。

**警告：**当使用 `BigInt` 时，带小数的运算会被取整。

```js
console.log(4n / 2n) // 2n
console.log(7n / 4n) // 1n
```

对任何 `BigInt` 值使用 [`JSON.stringify()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) 都会引发 `TypeError`，因为默认情况下 `BigInt` 值不会在 `JSON` 中序列化。但是，如果需要，可以实现 `toJSON` 方法：

```js
BigInt.prototype.toJSON = function() { return this.toString(); }
```

`JSON.stringify` 现在生成如下字符串，而不是抛出异常:

```js
JSON.stringify(BigInt(1));
// '"1"'
```

## 包装对象

### 对象包装器

> 以下是 JavaScript 创建者面临的悖论：

- 人们可能想对诸如字符串或数字之类的原始类型执行很多操作。最好将它们作为方法来访问。
- 原始类型必须尽可能的简单轻量。

而解决方案看起来多少有点尴尬，如下：

- **原始类型仍然是原始的**。与预期相同，提供单个值
- JavaScript 允许访问字符串，数字，布尔值和 `symbol` 的方法和属性。
- 为了使它们起作用，创建了提供额外功能的特殊“对象包装器”，使用后即被销毁。

“对象包装器”对于每种原始类型都是不同的，它们被称为 `String`、`Number`、`Boolean` 和 `Symbol`。因此，它们提供了不同的方法。

```js
let str = 'Hello'
str.test = 5 // (*)
alert(str.test)
```

根据你是否开启了严格模式 `use strict`，会得到如下结果：

- `undefined`（非严格模式）
- 报错（严格模式）。

为什么？让我们看看在 `(*)` 那一行到底发生了什么：

> 1. 当访问 str 的属性时，一个“对象包装器”被创建了。
> 2. 在严格模式下，向其写入内容会报错。
> 3. 否则，将继续执行带有属性的操作，该对象将获得 test 属性，但是此后，“对象包装器”将消失，因此在最后一行，str 并没有该属性的踪迹。

**这个例子清楚地表明，原始类型不是对象。**

### [symbol为什么没有包装类型?](https://www.zhihu.com/question/316717095/answer/628772556)

**除了 `null` 和 `undefined`，JS 里的原始类型都有对应的包装对象类型**。为什么要有包装对象？是为了能用 `.` 语法来读取属性、调用方法（对象才能有属性和方法），比如 `"foo".length`、`(1).toFixed(2)` 等代码中，都隐式的用到了包装对象。`null` 和 `undefined` 不需要属性和方法，所以不需要包装对象。

同样的，`symbol` 也需要读取属性和方法，所以也需要有包装对象，但一样也不推荐直接使用包装对象。ES6 是个新的开始，可以做一些大胆的改革，**所以 `new Symbol()` 被故意设计为抛异常，而不是墨守成规返回包装对象**。但仍然能用 `Object()` 把 `symbol` 转换为包装对象，有一个原因是因为**已经有代码用 `Object(value) === value` 来判断一个值是不是对象值**。

而且比起写出 `new Number()`、`new String()`、`new Boolean()` 这样的代码，菜鸟们写出 `new Symbol()` 的概率更大，因为 `symbol` 没有字面量，而老的三种原始类型都有，有字面量的话会更容易学会用字面量。

但其实这个决定是有争议的，因为造成了语言的不统一，凭什么那仨不报错而你要报错？而且即便真把 `symbol` 的包装对象误作为属性键来使用，其实也能正常使用，因为有自动解包装的逻辑。

```js
s = Symbol()
// key 自动解包装
({[s]:1})[Object(s)] // 1
```

是墨守成规保持统一，还是开拓创新造成割裂？其实我做为一个老鸟根本不在乎。

未来的第七种原始类型 `BigInt()`，因为同样的原因，也不能被 `new`。

### [对于 JavaScript 的 new Object() 的疑问？](https://www.zhihu.com/question/285068799)

```js
const a = { age: 20 }
const b = new Object(a)
console.log(a === b) // true
```

> JS 作为动态语言其实并不需要装箱拆箱，包装类对于 JS 来说本身就是画蛇添足的，现在 JS 的 coding style 也都禁用包装类。因此 `Object(v)` 或 `new Object(v)` 也没有存在的价值，应该一并被禁用。

### 使用两个点来调用一个方法

```js
alert((123456).toString(36)) // 2n9c
```

请注意 `123456..toString(36)` 中的两个点不是打错了。如果我们想直接在一个数字上调用一个方法，比如上面例子中的 `toString`，那么我们需要在它后面放置两个点 `..`。

如果我们放置一个点：`123456.toString(36)`，那么就会出现一个 `error`，因为 JavaScript 语法隐含了第一个点之后的部分为小数部分。如果我们再放一个点，那么 JavaScript 就知道小数部分为空，现在使用该方法。

也可以写成 `(123456).toString(36)`。

## 类型转换

### 强制类型转换

```js
// 转换成布尔值
console.log(Boolean(undefined)) // false
console.log(Boolean(null)) // false
console.log(Boolean(+0)) // false
console.log(Boolean(-0)) // false
console.log(Boolean(NaN)) // false
console.log(Boolean('')) // false
console.log(Boolean(0n)) // false

// 转换成数字
console.log(Number('')) // 0
console.log(Number(undefined)) // NaN
console.log(Number(null)) // 0
console.log(Number([])) // 0
console.log(Number([1, 2])) // NaN
console.log(Number({})) // NaN

// 转换成字符串
console.log(String([]) === '') // true
console.log(String({})) // "[object Object]"

// 转换成 JSON
const obj = {
  toJSON() {
    return 'hello world'
  }
}

console.log(JSON.stringify(obj)) // "hello world"
```

### 隐式类型转换

- [Javascript 中 == 和 === 区别是什么？](https://www.zhihu.com/question/31442029)
- [JavaScript一个疑问，[ ] （空数组）== true ，具体如下，请问这是为何？](https://www.zhihu.com/question/47555543/answers/updated)

### 对象转换成原始类型

```js
const obj = {
  value: 3,
  valueOf: () => 4,
  toString: () => '5',
  [Symbol.toPrimitive]: () => 6
}
```

- 三者都存在，转换成原始类型会优先调用 `[Symbol.toPrimitive]` 的返回值。

  ```js
  console.log(String(obj)) // '6'
  console.log(Number(obj)) // 6
  ```

- `[Symbol.toPrimitive]` 不存在，`String` 会调用 `toString`，`Number` 会调用 `valueOf`。

  ```js
  console.log(String(obj)) // '5'
  console.log(Number(obj)) // 4
  ```

- 只有 `toString` 存在，`String` 会调用 `toString`，`Number` 也会调用 `toString`，然后会使用 `Number` 把字符串转换成数字。

  ```js
  console.log(String(obj)) // '5'
  console.log(Number(obj)) // 5
  ```

- 只有 `valueOf` 存在，`Number` 会调用 `valueOf`，`String` 会调用 `Object.prototype.toString`

  ```js
  console.log(String(obj)) // '[object Object]'
  console.log(Number(obj)) // 4
  ```

- 都不存在，`String` 会调用 `Object.prototype.toString`，`Number` 也会调用 `Object.prototype.toString`，然后会使用 `Number` 把字符串转换成数字。

  ```js
  console.log(String(obj)) // '[object Object]'
  console.log(Number(obj)) // NaN
  ```

## 类型检测

### typeof

`typeof` 运算符返回参数的类型。

它支持两种语法形式：

- 作为运算符：`typeof x`。
- 函数形式：`typeof(x)`。

```js
console.log(typeof null) // 'object'
console.log(typeof Array.isArray) // 'function'
console.log(typeof typeof Array.isArray) // 'string'
```

### instanceof

```js
function myInstanceof(left, right) {
  //基本数据类型直接返回false
  if (typeof left !== 'object' || left === null) return false
  //getPrototypeOf 是 Object 对象自带的一个方法，相当于 xxx.__proto__
  let proto = Object.getPrototypeOf(left)
  while (true) {
    //查找到尽头，还没找到
    if (proto === null) return false
    //找到相同的原型对象
    if (proto === right.prototype) return true
    proto = Object.getPrototypeOf(proto)
  }
}

console.log(myInstanceof(Number(1), Number)) // false
console.log(myInstanceof(new Date(), Date)) // true
```

### Object.prototype.toString

```js
Object.prototype.toString.call(2) // "[object Number]"
Object.prototype.toString.call('') // "[object String]"
Object.prototype.toString.call(true) // "[object Boolean]"
Object.prototype.toString.call(undefined) // "[object Undefined]"
Object.prototype.toString.call(null) // "[object Null]"
Object.prototype.toString.call(Math) // "[object Math]"
Object.prototype.toString.call({}) // "[object Object]"
Object.prototype.toString.call([]) // "[object Array]"
Object.prototype.toString.call(/\d/) // "[object RegExp]"
Object.prototype.toString.call(Array.isArray) // "[object Function]"
```

### isObject

```js
// Object 方法的参数是一个对象，它总是返回该对象，对对象自身使用不发生类型转换。
Object(null) === null // false

function isObject(value) {
  return value === Object(value)
}
```

### isEmptyObject

```js
function isEmptyObject(obj) {
  if (typeof obj !== 'object' || obj === null) return false
  return Object.keys(obj).length === 0
}

console.log(isEmptyObject({})) // true
console.log(isEmptyObject([])) // true 空数组算空对象
```

### isInteger

```js
// 整数取整还是整数
function isInteger(num) {
  return typeof num === 'number' && (num | 0) === num
}

console.log(isInteger(1)) // true
console.log(isInteger(1.1)) // false
```

### Array.isArray

```js
console.log(Array.isArray([])) // true
console.log(Array.isArray({})) // false
```

### isPrime

```js
// 素数只能被自己和 1 整除不含 1 , 2 是素数
// 判断素数只要判断到开方就行，false 跳出条件是 num % i === 0

function isPrime(num) {
  if (typeof num === 'number' && (num | 0) === num) {
    if (num <= 1) return false
    const N = Math.floor(Math.sqrt(num))
    let primeState = true
    for (let i = 2; i <= N; i++) {
      if (num % i === 0) {
        primeState = false
        break
      }
    }
    return primeState
  } else {
    return false
  }
}

console.log(isPrime(2)) // true
console.log(isPrime(87)) // false
console.log(isPrime(77)) // false
```

## 值类型和引用类型

**值类型**：字符串（string）、数值（number）、布尔值（boolean）、undefined、null、symbol、bigInt

> 值类型保存在栈中，值类型赋值之后两个变量互不影响

```js
let foo = 1
let bar = foo

bar = 2
console.log(foo, bar) // 1, 2
```

**引用类型**：对象（Object）、数组（Array）、函数（Function）...

> 引用类型保存在堆中，栈中保存的是引用类型的指针，引用类型赋值之后，两个变量具有相同的引用，指向同一个对象，相互之间有影响

```js
let foo = { a: 1, b: 2 }
var bar = foo

bar.a = 2

console.log(foo, bar) // { a: 2, b: 2 }, { a: 2, b: 2 }
```

**函数参数按值传递：**

> 在向参数传递基本类型的值时，被传递的值会被复制给一个局部变量；在向参数传递引用类型的值时，会把这个引用类型的地址复制给一个局部变量，因此在函数内部修改参数，将会影响到原始值。

```js
function test(person) {
  person.name = 'chu'
  person = { name: 'bar', age: 18 }
  return person
}
const p1 = { name: 'foo', age: 25 }
const p2 = test(p1)
console.log(p1) // -> { name: 'chu', age: 25 }
console.log(p2) // -> { name: 'bar', age: 18 }
```
