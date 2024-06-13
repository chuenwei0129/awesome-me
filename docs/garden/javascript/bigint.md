---
title: BigInt
order: 3
group:
  title: 数据类型
---

# BigInt

> [BigInt 的存储机制是什么？](https://www.zhihu.com/question/472425718)

可以用在一个整数字面量后面加 `n` 的方式定义一个 `BigInt`，如：`10n`，或者调用函数 `BigInt()` (但不包含 `new` 运算符) 并传递一个整数值或字符串值。

```js
console.log(typeof 1n) // 'bigint'
console.log(typeof BigInt('1') === 'bigint') // true
console.log(typeof Object(1n)) // 'object'
```

它在某些方面类似于 [Number](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number)，但是也有几个关键的不同点：不能用于 [Math](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math) 对象中的方法；不能和任何 [Number](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number) 实例混合运算，两者必须转换成同一种类型。在两种类型来回转换时要小心，因为 BigInt 变量在转换成 [Number](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number) 变量时可能会丢失精度。

以下操作符可以和 BigInt 一起使用：`+`、`*`、`-`、`**`、`%`。除 `>>>` (无符号右移) 之外的[位操作](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators)也可以支持。因为 BigInt 都是有符号的，`>>>` (无符号右移) 不能用于 BigInt。[为了兼容 asm.js](https://github.com/tc39/proposal-bigint/blob/master/ADVANCED.md#dont-break-asmjs)，BigInt 不支持单目 (`+`) 运算符。

`/` 操作符对于整数的运算也没问题。可是因为这些变量是 BigInt 而不是 BigDecimal，该操作符结果会向零取整，也就是说不会返回小数部分。

**警告**：当使用 BigInt 时，带小数的运算会被取整。

```js
console.log(4n / 2n) // 2n
console.log(7n / 4n) // 1n
```

对任何 BigInt 值使用 [`JSON.stringify()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) 都会引发 `TypeError`，因为默认情况下 BigInt 值不会在 JSON 中序列化。但是，如果需要，可以实现 `toJSON` 方法：

```js
BigInt.prototype.toJSON = function () {
  return this.toString()
}
```

`JSON.stringify` 现在生成如下字符串，而不是抛出异常：

```js
JSON.stringify(BigInt(1))
// '"1"'
```

**BigInt 函数**：

JavaScript 原生提供 BigInt 函数，可以用它生成 BigInt 类型的数值。转换规则基本与 `Number()` 一致，将其他类型的值转为 BigInt。

```js
BigInt(undefined) //TypeError
BigInt(null) // TypeError
BigInt('123n') // SyntaxError
BigInt(123) // 123n
BigInt('123') // 123n
BigInt(false) // 0n
BigInt(true) // 1n
BigInt(1.5) // RangeError
BigInt('1.5') // SyntaxError
```
