---
group:
  title: javaScript
  order: 3
title: 解构赋值
toc: content
order: 15
---

## 概述

解构赋值（Destructuring Assignment）是 ES6 引入的一种便捷语法，允许从数组或对象中提取值，并将它们赋值给变量。这种语法模式使得代码更加简洁和易读。

**解构赋值的本质**：模式匹配。只要等号两边的模式相同，左边的变量就会被赋予对应的值。

**主要优势**：

- 简化变量声明和赋值
- 提取对象属性更方便
- 函数参数传递更灵活
- 代码可读性更强

## 数组的解构赋值

### 基本用法

数组解构按照位置顺序进行匹配：

```js
// 基本解构
let [a, b, c] = [1, 2, 3];
console.log(a, b, c); // 1 2 3

// 跳过某些元素
let [, , third] = [1, 2, 3];
console.log(third); // 3

// 不完全解构
let [x, y] = [1, 2, 3];
console.log(x, y); // 1 2

// 解构失败返回 undefined
let [foo, bar] = [1];
console.log(foo, bar); // 1 undefined
```

### 剩余运算符

使用 `...` 剩余运算符可以将剩余的元素收集到一个数组中：

```js
let [first, ...rest] = [1, 2, 3, 4];
console.log(first); // 1
console.log(rest); // [2, 3, 4]

// 剩余运算符必须是最后一个元素
let [head, ...tail] = [1];
console.log(head, tail); // 1 []
```

### 嵌套解构

解构支持多层嵌套：

```js
let [a, [b, c]] = [1, [2, 3]];
console.log(a, b, c); // 1 2 3

let [, [, third]] = [1, [2, 3]];
console.log(third); // 3
```

### 可迭代对象的解构

只要数据结构具有 Iterator 接口，都可以使用数组形式的解构赋值：

```js
// Set 解构
let [x, y, z] = new Set(['a', 'b', 'c']);
console.log(x, y, z); // 'a' 'b' 'c'

// Map 解构
let [[key1, val1], [key2, val2]] = new Map([
  [1, 2],
  [3, 4],
]);
console.log(key1, val1, key2, val2); // 1 2 3 4

// Generator 函数解构
function* fibs() {
  let a = 0;
  let b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}
let [first, second, third, fourth, fifth] = fibs();
console.log(first, second, third, fourth, fifth); // 0 1 1 2 3
```

### 默认值

解构赋值允许指定默认值，只有当对应位置的值严格等于 `undefined` 时，默认值才会生效：

```js
// 基本默认值
let [x = 1] = [];
console.log(x); // 1

// undefined 会触发默认值
let [y = 1] = [undefined];
console.log(y); // 1

// null 不会触发默认值
let [z = 1] = [null];
console.log(z); // null

// 默认值可以是表达式（惰性求值）
const getDefault = () => {
  console.log('执行了');
  return 1;
};
let [a = getDefault()] = [2]; // 不会执行 getDefault
let [b = getDefault()] = []; // 会执行 getDefault，输出 "执行了"

// 默认值可以引用其他变量
let [m = 1, n = m] = [];
console.log(m, n); // 1 1
let [p = q, q = 1] = []; // ReferenceError: q is not defined
```

## 对象的解构赋值

### 基本用法

对象解构根据属性名进行匹配，与顺序无关：

```js
// 基本解构
let { foo, bar } = { foo: 'aaa', bar: 'bbb' };
console.log(foo, bar); // 'aaa' 'bbb'

// 顺序不影响结果
let { bar: b, foo: f } = { foo: 'aaa', bar: 'bbb' };
console.log(b, f); // 'bbb' 'aaa'

// 解构失败返回 undefined
let { baz } = { foo: 'aaa', bar: 'bbb' };
console.log(baz); // undefined
```

### 属性重命名

对象解构的完整形式是 `{ 原属性名: 新变量名 }`：

```js
// 将对象的 foo 属性赋值给变量 newFoo
let { foo: newFoo } = { foo: 'aaa' };
console.log(newFoo); // 'aaa'
// console.log(foo); // ReferenceError: foo is not defined

// 实际上，对象解构的简写形式是这样的：
let { foo, bar } = { foo: 'aaa', bar: 'bbb' };
// 等价于：
let { foo: foo, bar: bar } = { foo: 'aaa', bar: 'bbb' };
```

**重要理解**：对象解构的模式是冒号左边的部分，真正被赋值的是冒号右边的变量。

### 嵌套解构

对象支持深层嵌套解构：

```js
let obj = {
  p: ['Hello', { y: 'World' }],
};

// p 是模式，不是变量
let {
  p: [x, { y }],
} = obj;
console.log(x, y); // 'Hello' 'World'
// console.log(p); // ReferenceError

// 如果 p 也要作为变量，需要单独解构
let {
  p,
  p: [x1, { y: y1 }],
} = obj;
console.log(p); // ['Hello', { y: 'World' }]
console.log(x1, y1); // 'Hello' 'World'
```

更复杂的嵌套示例：

```js
let node = {
  loc: {
    start: {
      line: 1,
      column: 5,
    },
  },
};

let {
  loc: {
    start: { line },
  },
} = node;
console.log(line); // 1
// loc 和 start 都是模式，不是变量
```

### 默认值

对象解构也支持默认值：

```js
// 基本默认值
let { x = 3 } = {};
console.log(x); // 3

// undefined 触发默认值
let { y = 3 } = { y: undefined };
console.log(y); // 3

// null 不触发默认值
let { z = 3 } = { z: null };
console.log(z); // null

// 重命名 + 默认值
let { foo: bar = 'default' } = {};
console.log(bar); // 'default'
```

### 解构已声明的变量

对已经声明的变量进行解构赋值时，需要特别注意：

```js
let x;
// 错误写法：JavaScript 会将 { x } 理解为代码块
// { x } = { x: 1 }; // SyntaxError

// 正确写法：加上圆括号
({ x } = { x: 1 });
console.log(x); // 1
```

## 字符串的解构赋值

字符串可以按数组形式解构，也可以解构其 `length` 属性：

```js
// 数组形式解构
const [a, b, c, d, e] = 'hello';
console.log(a, b, c, d, e); // 'h' 'e' 'l' 'l' 'o'

// 超出长度返回 undefined
const [f, g, h, i, j, k] = 'hello';
console.log(k); // undefined

// 解构 length 属性
const { length } = 'hello';
console.log(length); // 5
```

## 数值和布尔值的解构赋值

解构赋值时，如果等号右边是数值或布尔值，会先转为对象，然后才能解构其属性：

```js
// 数值的包装对象具有 toString 方法
let { toString: s } = 123;
console.log(s === Number.prototype.toString); // true

// 布尔值的包装对象具有 valueOf 方法
let { valueOf: v } = true;
console.log(v === Boolean.prototype.valueOf); // true
```

**重要规则**：`null` 和 `undefined` 无法转为对象，因此对它们进行解构会报错：

```js
// 以下两行会抛出 TypeError
// let { prop: x } = null;      // TypeError
// let { prop: y } = undefined; // TypeError
```

## 函数参数的解构赋值

函数参数可以使用解构赋值，这在实际开发中非常常用：

```js
// 数组参数解构
function sum([x, y]) {
  return x + y;
}
sum([1, 2]); // 3

// 对象参数解构
function move({ x = 0, y = 0 } = {}) {
  return [x, y];
}
move({ x: 3, y: 8 }); // [3, 8]
move({ x: 3 }); // [3, 0]
move({}); // [0, 0]
move(); // [0, 0]

// 数组方法中的应用
[
  [1, 2],
  [3, 4],
].map(([a, b]) => a + b);
// [3, 7]

// undefined 触发默认值
[1, undefined, 3].map((x = 'yes') => x);
// [1, 'yes', 3]
```

### 参数默认值的注意事项

要注意区分函数参数的默认值和解构的默认值：

```js
// 写法一：函数参数的默认值是 { x: 0, y: 0 }
function move1({ x, y } = { x: 0, y: 0 }) {
  return [x, y];
}
move1({ x: 3, y: 8 }); // [3, 8]
move1({ x: 3 }); // [3, undefined]
move1({}); // [undefined, undefined]
move1(); // [0, 0]

// 写法二：解构的默认值是 x: 0, y: 0
function move2({ x = 0, y = 0 } = {}) {
  return [x, y];
}
move2({ x: 3, y: 8 }); // [3, 8]
move2({ x: 3 }); // [3, 0]
move2({}); // [0, 0]
move2(); // [0, 0]
```

## 实际应用场景

### 1. 交换变量

```js
let x = 1;
let y = 2;
[x, y] = [y, x];
console.log(x, y); // 2 1
```

### 2. 函数返回多个值

```js
// 返回数组
function example() {
  return [1, 2, 3];
}
let [a, b, c] = example();

// 返回对象
function example2() {
  return {
    foo: 1,
    bar: 2,
  };
}
let { foo, bar } = example2();
```

### 3. 函数参数的定义

```js
// 参数是一组有次序的值
function f1([x, y, z]) {
  /* ... */
}
f1([1, 2, 3]);

// 参数是一组无次序的值
function f2({ x, y, z }) {
  /* ... */
}
f2({ z: 3, y: 2, x: 1 });
```

### 4. 提取 JSON 数据

```js
let jsonData = {
  id: 42,
  status: 'OK',
  data: [867, 5309],
};

let { id, status, data: numbers } = jsonData;
console.log(id, status, numbers);
// 42 'OK' [867, 5309]
```

### 5. 设置函数参数的默认值

```js
// 避免在函数体内写 var foo = config.foo || 'default foo';
function ajax({ url, method = 'GET', headers = {}, data = null }) {
  // ...
}

ajax({
  url: '/api/users',
});
```

### 6. 遍历 Map 结构

```js
const map = new Map();
map.set('first', 'hello');
map.set('second', 'world');

for (let [key, value] of map) {
  console.log(key + ' is ' + value);
}
// first is hello
// second is world

// 只获取键
for (let [key] of map) {
  console.log(key);
}

// 只获取值
for (let [, value] of map) {
  console.log(value);
}
```

### 7. 导入模块的指定方法

```js
const { useState, useEffect } = require('react');
// 或
import { useState, useEffect } from 'react';
```

## 使用注意事项

### 1. 不能使用圆括号的情况

以下三种情况不能使用圆括号：

**（1）变量声明语句**

```js
// 全部报错
// let [(a)] = [1];
// let { x: (c) } = {};
// let { (x): c } = {};
```

**（2）函数参数**

```js
// 报错
// function f([(z)]) { return z; }
```

**（3）赋值语句的模式部分**

```js
// 全部报错
// ({ p: a }) = { p: 42 };
// ([a]) = [5];
```

### 2. 可以使用圆括号的情况

只有一种情况可以使用圆括号：赋值语句的非模式部分。

```js
[b] = [3]; // 正确
({ p: d } = {}); // 正确
[parseInt.prop] = [3]; // 正确
```

### 3. 解构赋值的规则

- 只要等号右边的值不是对象或数组，就先将其转为对象
- `null` 和 `undefined` 无法转为对象，因此对它们进行解构会报错
- 数组本质是特殊的对象，因此可以对数组进行对象属性的解构

```js
let arr = [1, 2, 3];
let { 0: first, [arr.length - 1]: last } = arr;
console.log(first, last); // 1 3
```

## 数组空位解构

数组的空位（hole）与 `undefined` 在解构时行为不同：

```js
// 扩展运算符会将空位转为 undefined
let x = [...[,]];
let y = [,];

console.log(x); // [undefined]
console.log(y); // [empty]
console.log(0 in x); // true，因为 x[0] 是 undefined
console.log(0 in y); // false，因为 y[0] 是空位

// 解构时的区别
let [a] = [,];
console.log(a); // undefined

let [b = 1] = [,];
console.log(b); // 1，空位会触发默认值
```

**示例图示**：

![数组空位解构示例](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/js/FSi0rJGVsAAxDH1.png)

**重要区别**：

- 空位（hole）：数组中真正的"空"，`in` 运算符返回 `false`
- `undefined`：显式的值，`in` 运算符返回 `true`
- 扩展运算符 `...` 会将空位转换为 `undefined`

## 总结

解构赋值是 ES6 中非常实用的特性，掌握以下要点：

1. **基本原理**：模式匹配，左右两边结构对应
2. **两种形式**：数组解构（按位置）和对象解构（按属性名）
3. **默认值**：只有严格等于 `undefined` 时才生效
4. **嵌套解构**：支持多层嵌套，但要区分模式和变量
5. **适用范围**：数组、对象、字符串、数值、布尔值、函数参数
6. **常见用途**：交换变量、函数返回值、提取 JSON、设置默认值等
7. **注意事项**：圆括号使用限制、`null/undefined` 无法解构

合理使用解构赋值可以让代码更简洁、更易读、更易维护。
