---
title: Boolean
order: 2
group:
  title: 数据类型
---

# Boolean

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
