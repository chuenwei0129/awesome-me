---
group:
  title: javaScript
  order: 3
title: Boolean
toc: content
order: 6
---

## 历史背景

C 语言以及与其兼容的 C++ 语言中，是没有 boolean 类型的，也没有 `true` 和 `false` 关键字。

所有的条件判断语句，大体上都基本等价于 `expression != 0`。

JavaScript 的这个特性便来自于此，也就是说理论上来说 `if( expression )` 其实是 `if( expression is not false value )`

## Falsy 值（假值）

在 JavaScript 中，只有 **7 种**值可以被转换成 `false`，其他所有值都会被转换成 `true`。

这 7 种假值分别是：

```js
console.log(Boolean(false)); // false - 布尔值 false 本身

console.log(Boolean(undefined)); // false - 未定义
console.log(Boolean(null)); // false - 空值
console.log(Boolean(0)); // false - 数字零（+0 和 -0 都是 0）
console.log(Boolean(NaN)); // false - 非数字
console.log(Boolean('')); // false - 空字符串
console.log(Boolean(0n)); // false - BigInt 零值
```

## Truthy 值（真值）

除了上述 7 种假值外，所有其他值都是真值，包括一些容易混淆的值：

```js
console.log(Boolean('0')); // true - 字符串 '0'
console.log(Boolean('false')); // true - 字符串 'false'
console.log(Boolean([])); // true - 空数组
console.log(Boolean({})); // true - 空对象
console.log(Boolean(function () {})); // true - 函数
console.log(Boolean(-1)); // true - 负数
console.log(Boolean(Infinity)); // true - 无穷大
```

## 类型转换方法

有多种方式可以将值转换为布尔类型：

```js
// 1. 使用 Boolean() 构造函数
Boolean(0); // false

// 2. 使用双重否定运算符 !!
!!0; // false
!!'hello'; // true

// 3. 在条件语句中隐式转换
if (value) {
  // value 为真值时执行
}
```

## 实际应用

### 默认值设置

```js
// 使用 || 运算符设置默认值（注意：会将 0、'' 等假值也替换）
function greet(name) {
  name = name || 'Guest';
  return `Hello, ${name}!`;
}

// 使用空值合并运算符 ?? （仅对 null 和 undefined 生效）
function greet(name) {
  name = name ?? 'Guest';
  return `Hello, ${name}!`;
}
```

### 条件过滤

```js
// 过滤数组中的假值
const arr = [0, 1, false, 2, '', 3, null, undefined, NaN];
const truthyValues = arr.filter(Boolean);
console.log(truthyValues); // [1, 2, 3]
```

### 条件渲染

```js
// React 中的条件渲染
{
  isLoggedIn && <UserProfile />;
}
```

## 常见陷阱

```js
// 空数组和空对象是真值
if ([]) console.log('空数组是真值'); // 会执行
if ({}) console.log('空对象是真值'); // 会执行

// 字符串 '0' 和 'false' 是真值
if ('0') console.log("字符串 '0' 是真值"); // 会执行
if ('false') console.log("字符串 'false' 是真值"); // 会执行

// NaN 不等于任何值（包括它自己）
console.log(NaN === NaN); // false
console.log(Object.is(NaN, NaN)); // true

// document.all 是一个特殊的例外（历史遗留）
// 它是唯一一个 typeof 返回 'undefined' 但实际存在的对象
console.log(typeof document.all); // 'undefined'
console.log(Boolean(document.all)); // false（在大多数浏览器中）
```

## 最佳实践

1. **显式比较**：对于可能为 0 或空字符串的情况，使用显式比较而不是依赖隐式转换

   ```js
   // 不推荐
   if (count) {
     /* ... */
   }

   // 推荐
   if (count !== 0) {
     /* ... */
   }
   ```

2. **使用空值合并运算符**：当只想处理 `null` 和 `undefined` 时，使用 `??` 而不是 `||`

   ```js
   const value = input ?? defaultValue;
   ```

3. **明确意图**：在需要布尔值的地方，显式使用 `Boolean()` 或 `!!` 进行转换

   ```js
   const hasValue = Boolean(value);
   const isValid = !!checkValidity();
   ```
