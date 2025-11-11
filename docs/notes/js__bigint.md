---
group:
  title: javaScript
  order: 3
title: BigInt
toc: content
order: 5
---

## 是什么

BigInt 是 JavaScript 中的一种数值类型，用于表示任意精度的整数。它可以安全地存储和操作超出 Number 类型安全整数范围的整数。

### 定义方式

有两种方式创建 BigInt：

1. 在整数字面量后面加 `n`：`10n`
2. 调用 `BigInt()` 函数（不使用 `new` 运算符）

```js
const bigInt1 = 123n;
const bigInt2 = BigInt(123);
const bigInt3 = BigInt('123');

console.log(typeof bigInt1); // 'bigint'
console.log(typeof BigInt('1') === 'bigint'); // true
console.log(typeof Object(1n)); // 'object'
```

## 为什么

### Number 的精度限制

JavaScript 的 Number 类型使用 IEEE 754 双精度浮点数格式，只能安全表示 `-2^53 + 1` 到 `2^53 - 1` 之间的整数（即 `Number.MIN_SAFE_INTEGER` 到 `Number.MAX_SAFE_INTEGER`）。

```js
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991
console.log(9007199254740992 === 9007199254740993); // true ⚠️ 精度丢失
```

### BigInt 解决的问题

- **大整数运算**：可以准确表示和运算任意大小的整数
- **加密算法**：需要处理超大整数的密码学计算
- **高精度时间戳**：纳秒级时间戳（超出 Number 安全范围）
- **大数据 ID**：数据库中的大整数 ID（如 Twitter 的雪花 ID）

> 延伸阅读：[BigInt 的存储机制是什么？](https://www.zhihu.com/question/472425718)

## 怎么用

### 基本运算

支持的运算符：`+`、`-`、`*`、`**`、`%`、位运算（除了 `>>>`）

```js
const a = 100n;
const b = 20n;

console.log(a + b); // 120n
console.log(a - b); // 80n
console.log(a * b); // 2000n
console.log(a / b); // 5n
console.log(a % b); // 0n
console.log(a ** 2n); // 10000n
```

**⚠️ 注意事项**：

1. **不支持单目 `+` 运算符**（为了兼容 asm.js）
2. **不支持 `>>>` 无符号右移**（BigInt 都是有符号的）
3. **不能与 Math 对象的方法一起使用**

```js
console.log(+42n); // TypeError
console.log(Math.sqrt(4n)); // TypeError
```

### 除法运算特点

BigInt 的除法会向零取整，不返回小数部分：

```js
console.log(4n / 2n); // 2n
console.log(7n / 4n); // 1n ⚠️ 向零取整
console.log(10n / 3n); // 3n
```

### 与 Number 的混合运算

**BigInt 不能直接与 Number 混合运算**，需要显式转换：

```js
// ❌ 错误示例
console.log(1n + 1); // TypeError

// ✅ 正确示例
console.log(1n + BigInt(1)); // 2n
console.log(Number(1n) + 1); // 2
```

**⚠️ 转换注意**：BigInt 转 Number 可能丢失精度

```js
const bigNum = 9007199254740993n;
console.log(Number(bigNum)); // 9007199254740992 ⚠️ 精度丢失
```

### 比较运算

BigInt 和 Number 可以进行比较，但 `===` 严格相等会返回 false：

```js
console.log(1n == 1); // true
console.log(1n === 1); // false
console.log(1n < 2); // true
console.log(2n > 1); // true
```

### 类型转换

使用 `BigInt()` 函数转换其他类型：

```js
BigInt(123); // 123n
BigInt('123'); // 123n
BigInt(true); // 1n
BigInt(false); // 0n

// ❌ 以下会报错
BigInt(undefined); // TypeError
BigInt(null); // TypeError
BigInt(1.5); // RangeError：不支持小数
BigInt('123n'); // SyntaxError：字符串不能包含 'n'
BigInt('1.5'); // SyntaxError
```

### JSON 序列化

默认情况下，BigInt 不能直接序列化为 JSON：

```js
JSON.stringify({ value: 1n }); // TypeError
```

**解决方案**：自定义 `toJSON` 方法

```js
BigInt.prototype.toJSON = function () {
  return this.toString();
};

JSON.stringify({ value: 1n }); // '{"value":"1"}'
```

### 实际应用场景

```js
// 1. 处理大整数 ID
const userId = 9223372036854775807n;

// 2. 高精度时间戳（纳秒）
const timestamp = BigInt(Date.now()) * 1000000n;

// 3. 大数阶乘计算
function factorial(n) {
  let result = 1n;
  for (let i = 2n; i <= n; i++) {
    result *= i;
  }
  return result;
}
console.log(factorial(20n)); // 2432902008176640000n

// 4. 加密算法中的大整数运算
const p = 2n ** 127n - 1n; // 梅森素数
```

## 总结备忘

### 核心要点

- **定义**：整数后加 `n` 或使用 `BigInt()` 函数
- **用途**：表示超出 Number 安全范围的整数
- **类型**：`typeof` 返回 `'bigint'`

### 使用限制

| 限制                  | 说明                      |
| --------------------- | ------------------------- |
| 不支持 `+` 单目运算符 | 为了兼容 asm.js           |
| 不支持 `>>>` 运算符   | BigInt 都是有符号的       |
| 不能与 Number 混合运算 | 需要显式转换              |
| 不能用于 Math 对象    | Math 方法只接受 Number    |
| 除法向零取整          | 不返回小数部分            |
| 转 Number 可能丢失精度 | 超出安全范围会截断        |
| JSON 序列化需特殊处理 | 需自定义 `toJSON` 方法    |

### 快速参考

```js
// 创建
const big = 123n;
const big2 = BigInt('123');

// 运算（只能与 BigInt 运算）
1n + 2n; // 3n
5n / 2n; // 2n（向零取整）

// 比较
1n == 1; // true
1n === 1; // false

// 转换（注意精度）
Number(1n); // 1
BigInt(1); // 1n
```
