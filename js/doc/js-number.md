# [Number](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number)<!-- omit in toc -->

## [为什么在 JavaScript 中 NaN 不能是一个独立的类型？](https://www.zhihu.com/question/379014728)

在 JavaScript 里，数字（非[小整数](https://zhuanlan.zhihu.com/p/43992828)）基于 [IEEE 754 标准的双精度 64 位的浮点数](https://zh.wikipedia.org/wiki/%E9%9B%99%E7%B2%BE%E5%BA%A6%E6%B5%AE%E9%BB%9E%E6%95%B8)。

`NaN` 是一个 IEEE754 浮点数标准明确定义的**值**。

在 64 位双精度浮点数中，1 位符号位，11 位阶码(指数)，52 位尾数。

- **阶码全 `1`，尾数全 `0` 表示无穷大。**
- **阶码全 `1`，尾数非全 `0` 的所有数字都表示 `NaN`。**
- **阶码(指数)全 `0`，尾数全 `0` 表示 `0`。**

所以，在浮点数表示法中 `NaN` 一共 **2^53 - 2** 个，`Infinity` 有 **2** 个，`0` 也有 **2** 个。

## [JavaScript 里最大的安全的整数为什么是 2 的 53 次方减一？](https://www.zhihu.com/question/29010688)

> **“安全”** 的意思是说能够 **one-by-one** 表示的整数，也就是说在 `(-2^53, 2^53)` 范围内，*双精度数表示和整数是一对一的*，反过来说，**在这个范围以内，所有的整数都有唯一的浮点数表示，这叫做安全整数**。
>
> 而超过这个范围，会有两个或更多整数的双精度表示是相同的；反过来说，超过这个范围，有的整数是无法精确表示的，只能 `round` 到与它相近的浮点数表示，这种情况下叫做不安全整数。

**注意事项**：在解析序列化的 JSON 时，超出此范围的整数值可能会被破坏。在工作中使用[`String`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String) 类型代替，是一个可行的解决方案。

**代码加深理解：**

```js
// **内存是有限的，数字是无限的。**

// 浮点数存储数字是越来越稀疏的，在 `0 10000110100 0000000000000000000000000000000000000000000000000000` 之后的二进制的间隔发生了改变应该是大于 `1` 的，就好比 `2 ** 53` 之前的数字范围在内存中可以一一对应的二进制数是比想存储的整数多的，很容易做到一对一，之后就做不到了，小数位精度也是如此。

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

## [JavaScript 著名面试题: 0.1 + 0.2 !== 0.3，即将成为过去](https://zhuanlan.zhihu.com/p/225490777)

> **👎 嘲讽**：[https://0.30000000000000004.com](https://0.30000000000000004.com/)

在小数点运算时，JavaScript 将隐式的采取 [IEEE754 二进制浮点运算](https://tooltt.com/floatconverter/)而不是我们想象中的十进制运算。而十进制和二进制转换时，就可能出现精度丢失的问题。

> **精度损失可能出现在进制转化和对阶运算过程中**

```JS
// 1. 十进制转二进制无法准确表达 0.1 和 0.2，只能用循环逼近；
0.1 -> 0.0001100110011001100(1100循环) -> 1.100110011001100 * 2^(-4)
0.2 -> 0.0011001100110011001(1001无限循环) -> 1.100110011001100 * 2^(-3)
// 2. 数学中计算时，我们需要将指数位置对齐，但需要指明的是 JS 中没有采用 Exponent Bias，而是将尾数 Mantissa 视为为整数计算的，这样误差会增大，但是实现算法简单。
(1).1001100110011001100110011001100110011001100110011010 (Exponent:-4)+
(1).1001100110011001100110011001100110011001100110011010 (Exponent:-3)=
(1).0011001100110011001100110011001100110011001100110100 (Exponent:-2)

// 转换为 IEEE754 双精度为 1.0011001100110011001100110011001100110011001100110100 * 2^(-2),如果用二进制转成十进制为 (2^(-2)+2^(-5)+2^(-6)...)。 结果大约是0.30000000000000004419，去小数点后面17位精度为 0.30000000000000004，
```

**通常 JS 中最佳实践中，不推荐大家用 JS 进行浮点运算。**

## Number.EPSILON

**`Number.EPSILON`** 属性表示 1 与[`Number`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number)可表示的大于 1 的最小的浮点数之间的差值。

> [Polyfill](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/EPSILON#polyfill)

```js
// 比较两个浮点数差值的绝对值，是否超过误差精度，是否”相等“
function compareTwo(n1, n2) {
  return Math.abs(n1 - n2) < Number.EPSILON
}
compareTwo(0.1 + 0.2, 0.3)
```

## [`Number.NaN`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/NaN)

**`Number.NaN`** 表示 `Not-A-Number`，和 [`NaN`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/NaN) 相同。

编码中很少直接使用到 `NaN`。通常都是在计算失败时，作为 Math 的某个方法的返回值出现的（例如：`Math.sqrt(-1)`）或者尝试将一个字符串解析成数字但失败了的时候（例如：`parseInt('abc')`）。

> [为什么 `NaN ** 0 === 1` ?](https://stackoverflow.com/questions/17863619/why-does-nan0-1)

```js
// Why does NaN^0 == 1?
console.log(Number.NaN ** 0) // 1
console.log(Number.MAX_SAFE_INTEGER ** 0) // 1
console.log(Number.MIN_SAFE_INTEGER ** 0) // 1

// NaN 不等于任何值，包括它本身。NaN 与任何数（包括它自己）的运算，得到的都是 NaN。
console.log(1 + NaN) // NaN

// === 与 Object.is()
console.log(Object.is(+0, -0)) // false
console.log(Object.is(NaN, NaN)) // true
console.log(+0 === -0) // true
console.log(NaN === NaN) // false

// indexOf 与 includes
console.log([NaN].indexOf(NaN)) // -1
console.log([NaN].includes(NaN)) // true
```

## [`Number.isNaN()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN)

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

## [`Number.POSITIVE_INFINITY`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/POSITIVE_INFINITY)

特殊的正无穷大值，在溢出时返回该值。

`Infinity` 的初始值是 [`Number.POSITIVE_INFINITY`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/POSITIVE_INFINITY)。`Infinity`（正无穷大）大于任何值。

```js
console.log(42 / -0) // -Infinity
console.log(42 / +0) // Infinity
```

**整数零不能做除数，但是浮点数零可以做除数。**

> [为什么 0 不能做除数？](https://www.bilibili.com/video/BV1qT4y1B7ot)

## [`Number.parseInt()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/parseInt)

和全局对象 [`parseInt()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/parseInt) 一样。

**注意事项：**

- `parseInt` 方法**用于将字符串转为整数**。
- `parseInt` 的参数不是字符串，会先转为字符串再转换。
- `parseInt` 方法还可以接受第二个参数（2 到 36 之间），如果第二个参数不是数值，会被自动转为一个整数。这个整数只有在 2 到 36 之间，才能得到有意义的结果，超出这个范围，则返回 NaN。如果第二个参数是 `0`、`undefined` 和 `null`，则直接忽略。
- 二进制只能转换含有 '0'、'1' 的字符串，其他进制也类似。
- `parseInt` 的返回值只有两种可能，要么是一个十进制整数，要么是 `NaN`。
- 为了算术的目的，`NaN` 值不能作为任何 `radix` 的数字。

> [JS 里 `parseInt('3.14e2')` 为什么输出的是 3 而不是 3.14，这个如何解释?](https://www.zhihu.com/question/460606074)

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

  // 1. parseInt 方法还可以接受第二个参数（ 2 到 36 之间），表示被解析的值的进制，返回该值对应的十进制数。默认情况下，parseInt 的第二个参数为 10，即默认是十进制转十进制。
  // 2. 如果第二个参数不是数值，会被自动转为一个整数。这个整数只有在 2 到 36 之间，才能得到有意义的结果，超出这个范围，则返回 NaN。如果第二个参数是 0、undefined 和 null，则直接忽略。
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
