---
group:
  title: javaScript
  order: 3
title: 类型
toc: content
order: 0
---

## 从「原子」开始

如果有人问你：

> JavaScript 里，最小的“东西”是什么？

多半你会想到：

- 数字：`1`、`123`、`0.1`
- 字符串：`'hello'`
- 关键字：`if`、`else`
- 变量名：`count`、`userName`

在语法层面，这些确实都是「最小的单元」。
我们可以先给它们一个统称：**原子（Atoms）**。

从语法上看，常见的原子包括：

- 字面量（literal）：`1`、`'abc'`、`true`、`null`……
- 变量名（identifier）：`a`、`count`、`user`……
- 关键字（keyword）：`if`、`for`、`return`……
- 符号：`+`、`-`、`=`、`.`……
- 空白符 / 换行：它们本身不“执行”，但影响代码结构和可读性

但是：
**语法上的原子 ≠ 运行时的“数据”。**

在 JavaScript 真正运行的时候，代码会变成：

- **值（value）**：数字、字符串、对象……
- **变量绑定（variable binding）**：某个名字指向某个值
- **执行上下文（execution context）**：变量存在于哪里，什么时候能访问……

所以我们要分清两层：

1. **语法层**：字面量、变量名、关键字等
2. **运行时层**：类型（`number`、`string`…）、值、作用域、上下文

---

## 二、JavaScript 的 7（+1）种基本类型

标准里目前有 8 种基本类型：

1. `number`
2. `string`
3. `boolean`
4. `null`
5. `undefined`
6. `object`
7. `symbol`
8. `bigint`

---

## 类型检测

在 TypeScript 中可以这样声明联合类型：

```ts
let foo: string | number;
```

但在运行时，仍然需要判断 `foo` 是字符串还是数字，才能安全调用 `concat` 或 `toFixed` 等方法。**对于来自接口、存储、第三方库等“外部数据”，仅靠 TypeScript 声明是无法保证运行时安全的。**

**因此，熟练掌握 JavaScript 的类型检测手段，是保障运行时安全和健壮性的关键。**

---

### typeof

`typeof` 运算符用于返回一个值的类型字符串。

**语法形式：**

- 运算符形式：`typeof x`
- 函数形式：`typeof(x)`

**基础示例：**

```js
console.log(typeof undefined); // 'undefined'
console.log(typeof 123); // 'number'
console.log(typeof '123'); // 'string'
console.log(typeof true); // 'boolean'
console.log(typeof Symbol('id')); // 'symbol'
console.log(typeof 123n); // 'bigint'
console.log(typeof {}); // 'object'
console.log(typeof []); // 'object' // 数组也是对象
console.log(typeof null); // 'object' // 历史遗留 bug
console.log(typeof function () {}); // 'function'
```

**特殊情况：**

```js
// typeof 的结果本身就是字符串
console.log(typeof Array.isArray); // 'function'
console.log(typeof typeof Array.isArray); // 'string'

// 对未声明变量不会报错
console.log(typeof undeclaredVariable); // 'undefined'

// document.all 的历史兼容行为
typeof document.all; // 'undefined'
```

**局限性：**

- 无法区分数组与普通对象
- `null` 被错误识别为 `'object'`
- 无法识别具体内置对象类型（如 `Date`、`RegExp` 等）

---

### instanceof

`instanceof` 用于检测一个构造函数的 `prototype` 是否在某个对象的原型链上。

```js
console.log([] instanceof Array); // true
console.log({} instanceof Object); // true
console.log(new Date() instanceof Date); // true
console.log(/\d/ instanceof RegExp); // true

console.log(123 instanceof Number); // false
console.log('abc' instanceof String); // false
console.log(true instanceof Boolean); // false

console.log(new Number(123) instanceof Number); // true
console.log(new String('abc') instanceof String); // true
```

#### 手写 instanceof

```js
function myInstanceof(left, right) {
  if (typeof left !== 'object' || left === null) return false;

  let proto = Object.getPrototypeOf(left);

  while (true) {
    if (proto === null) return false; // 原型链到头
    if (proto === right.prototype) return true; // 找到目标原型
    proto = Object.getPrototypeOf(proto);
  }
}
```

---

#### instanceof 的局限与多窗口环境

浏览器中，每个 `window`/`iframe` 都有自己的全局对象集合（包括独立的 `Array`、`Object` 等构造函数）。**来自不同 window/iframe 的数组，其构造函数不是同一个引用**。

- 页面 A 中的 `Array`
- 页面 B 的 iframe 中的 `Array`

这两个 `Array` 是两个不同的函数对象。

所以，当你在 A 页面中执行：

```js
let iframeArr = window.frames[0].someArray;

iframeArr instanceof Array; // 只会检查 A 页面的 Array.prototype
```

`iframeArr` 的原型链指向的是 **B 页面的** `Array.prototype`，因此结果为 `false`。这在多 iframe、旧 IE 环境中尤为常见。

**结论：在多执行环境、跨 iframe 场景中，用 `instanceof` 判断内置类型非常不可靠。**

---

### Object.prototype.toString.call 与 Array.isArray

为了绕过构造函数不一致的问题，可以使用更底层的判断方式。

#### Object.prototype.toString.call()

- 返回格式：`"[object Xxx]"`，其中 `Xxx` 是内部类型标识。
- 核心特点：**不依赖构造函数引用，而是基于引擎内部类型槽位**。

```js
Object.prototype.toString.call([]); // '[object Array]'
Object.prototype.toString.call('abc'); // '[object String]'
Object.prototype.toString.call(() => {}); // '[object Function]'
Object.prototype.toString.call(new Date()); // '[object Date]'
Object.prototype.toString.call(/abc/); // '[object RegExp]'
```

在跨 iframe 场景中：

```js
// 页面 A
let localArr = [1, 2, 3];
let iframeArr = window.frames[0].someArray;

console.log(localArr instanceof Array); // true
console.log(iframeArr instanceof Array); // 可能为 false

console.log(Object.prototype.toString.call(localArr) === '[object Array]'); // true
console.log(Object.prototype.toString.call(iframeArr) === '[object Array]'); // true
```

#### Array.isArray()

`Array.isArray` 是判断数组的首选方式：

```js
Array.isArray([]); // true
Array.isArray({}); // false
```

**Object.prototype.toString.call 与 Array.isArray 对比：**

| 方法                                 | 核心原理                                       | 易受篡改程度 | 可靠性              |
| :----------------------------------- | :--------------------------------------------- | :----------- | :------------------ |
| **Object.prototype.toString.call()** | 读取对象内部类型标识                           | 较难         | ⭐⭐⭐⭐⭐ 非常可靠 |
| **Array.isArray()**                  | 引擎内部实现，专门判断数组                     | 很难         | ⭐⭐⭐⭐⭐ 非常可靠 |
| `instanceof`                         | 检查原型链上是否存在指定构造函数的 `prototype` | 容易         | ⭐☆☆☆☆ 不可靠       |
| `obj.constructor === Xxx`            | 依赖 `constructor` 属性                        | 极易         | ⭐☆☆☆☆ 不可靠       |

**实践建议：**

- **判断数组：优先使用 `Array.isArray`，其次使用 `Object.prototype.toString.call`。**
- **判断其他内置对象（`RegExp`、`Date`、Arguments 等）：优先使用 `Object.prototype.toString.call`。**
- 在跨 iframe、第三方脚本复杂环境中，尽量避免以 `instanceof`、`constructor` 作为主要判断依据。

#### 极端情况说明

1. 自定义 `Symbol.toStringTag` 会改变 `Object.prototype.toString.call` 的结果：

   ```js
   const arr = [];
   arr[Symbol.toStringTag] = 'NotAnArray';

   Object.prototype.toString.call(arr); // '[object NotAnArray]'
   Array.isArray(arr); // true
   ```

2. 如若有人重写 `Object.prototype.toString` 本身，则所有基于它的判断都会受影响。这类行为极端且罕见。

---

### 通用的类型判断方法

结合 `typeof` 与 `Object.prototype.toString.call` 的优点，可以封装一个通用类型函数：

```js
function getType(obj) {
  if (obj === null) return 'null';

  const type = typeof obj;
  if (type !== 'object') return type;

  return Object.prototype.toString
    .call(obj)
    .slice(8, -1) // 更安全的提取方式
    .toLowerCase(); // 统一小写
}

// 示例
getType([]); // 'array'
getType('123'); // 'string'
getType(window); // 'window'
getType(null); // 'null'
getType(undefined); // 'undefined'
getType(function () {}); // 'function'
getType(/123/g); // 'regexp'
getType(new Date()); // 'date'
```

---

## 其他常用类型检测方法

### isObject —— 判断是否为“对象类型”

```js
function isObject(value) {
  return value === Object(value);
}

isObject({}); // true
isObject([]); // true
isObject(null); // false
isObject(123); // false
isObject('abc'); // false
```

**核心：**`Object(null)` 不等于 `null`，而是返回一个对象；基本类型会被包装为对象，但与自身不相等。

---

### isEmptyObject —— 判断是否为空对象

```js
function isEmptyObject(obj) {
  if (typeof obj !== 'object' || obj === null) return false;
  return Object.keys(obj).length === 0;
}

isEmptyObject({}); // true
isEmptyObject({ a: 1 }); // false
isEmptyObject([]); // true // 空数组也算“空对象”（无可枚举属性）
isEmptyObject([1, 2]); // false
isEmptyObject(null); // false
```

---

### isInteger —— 判断是否整数

```js
function isInteger(num) {
  return typeof num === 'number' && (num | 0) === num;
}

isInteger(1); // true
isInteger(1.1); // false
isInteger(-5); // true
isInteger(0); // true
isInteger(NaN); // false
isInteger(Infinity); // false

// ES6 推荐方式
Number.isInteger(1); // true
Number.isInteger(1.1); // false
```

---

## 类型转换

类型转换分为两类：

- **显式（强制）类型转换**：由开发者主动调用转换函数。
- **隐式类型转换**：由 JavaScript 运行时在表达式求值时自动执行。

**理解类型转换规则，是避免“JS 魔法”带来的 bug 的关键。**

---

### 强制类型转换

#### 转布尔值 Boolean()

只有 7 个值会转换为 `false`，其余都为 `true`：

```js
Boolean(undefined); // false
Boolean(null); // false
Boolean(+0); // false
Boolean(-0); // false
Boolean(NaN); // false
Boolean(''); // false
Boolean(0n); // false
```

**除了以上 7 个假值，其余全部是真值。**

---

#### 转数字 Number()

```js
// 基本类型
Number(undefined); // NaN
Number(null); // 0
Number(true); // 1
Number(false); // 0

// 字符串
Number(''); // 0
Number('123'); // 123
Number('123abc'); // NaN
Number('  123  '); // 123

// 数组 / 对象
Number([]); // 0
Number([5]); // 5
Number([1, 2]); // NaN
Number({}); // NaN

// 其他
parseInt('123abc'); // 123
parseInt('abc123'); // NaN
parseFloat('3.14.15'); // 3.14
+'123'; // 123
```

---

#### 转字符串 String()

```js
// 基本类型
String(undefined); // 'undefined'
String(null); // 'null'
String(true); // 'true'
String(123); // '123'

// 数组
String([]); // ''
String([1, 2, 3]); // '1,2,3'
String([1, [2, 3]]); // '1,2,3'

// 对象
String({}); // '[object Object]'
String({ name: 'foo' }); // '[object Object]'

// 其他
(123).toString(); // '123'
(123).toString(2); // '1111011'
`值是 ${123}`; // '值是 123'
```

---

#### 转 JSON：JSON.stringify

```js
JSON.stringify({ name: 'foo', age: 18 });
// '{"name":"foo","age":18}'

const obj = {
  name: 'foo',
  age: 18,
  toJSON() {
    return 'hello world';
  },
};

JSON.stringify(obj); // '"hello world"'

const data = { name: 'foo', age: 18, password: '123456' };
JSON.stringify(data, ['name', 'age']); // '{"name":"foo","age":18}'
JSON.stringify(data, null, 2); // 格式化缩进
```

---

### 隐式类型转换

隐式转换主要发生在：

- 算术运算
- 比较运算
- 逻辑运算
- `if` 条件判断等布尔上下文

---

#### 算术运算符

```js
// +
1 + '2'; // '12'
'1' + 2; // '12'
true + 1; // 2
false + 1; // 1
[] + []; // ''
[] + {}; // '[object Object]'
{
}
+[]; // '[object Object]' // 某些环境有语法解析差异

// -, *, /, %
'5' - 3; // 2
'5' * 2; // 10
'10' / 2; // 5
'10' % 3; // 1
'abc' - 1; // NaN
```

---

#### 比较运算符

```js
// ==（会进行类型转换）
1 == '1'; // true
true == 1; // true
false == 0; // true
null == undefined; // true
'' == 0; // true
[] == 0; // true // [] -> '' -> 0
[] == ![]; // true // ![] -> false -> 0

// ===（不会进行类型转换）
1 === '1'; // false
true === 1; // false

// 关系运算符
'2' > '10'; // true // 字符串按字典序比较
2 > '10'; // false // '10' -> 10
'abc' > 5; // false // 'abc' -> NaN，与 NaN 比较结果为 false
```

**实践建议：在业务代码中尽量使用 `===` 与 `!==`，避免 `==` 带来的隐式转换陷阱。**

---

#### 逻辑运算符

```js
// ! 将值转为布尔再取反
!0; // true
!1; // false
!!'foo'; // true

// && 返回第一个假值或最后一个真值
0 && 'foo'; // 0
'foo' && 0; // 0
'foo' && 'bar'; // 'bar'

// || 返回第一个真值或最后一个假值
0 || 'foo'; // 'foo'
'foo' || 0; // 'foo'
'' || null || 0; // 0
```

---

#### 特殊情况示例

```js
if ('') {
  // 不会执行
}

if ('0') {
  // 会执行
}

[] == false; // true
[] == ![]; // true
[] == []; // false // 引用类型比较地址

null == undefined; // true
null === undefined; // false
null == 0; // false
undefined == 0; // false
```

参考阅读：

- [JavaScript 中 == 和 === 区别是什么？](https://www.zhihu.com/question/31442029)
- [为什么 [] == true/false 有这些结果？](https://www.zhihu.com/question/47555543/answers/updated)

---

## 对象转换成原始类型

当对象参与运算（如加法、比较等）时，JS 会尝试将其转换为原始值。转换顺序如下：

1. **`Symbol.toPrimitive`**
2. `valueOf`（偏向数字转换）
3. `toString`（偏向字符串转换）

---

### 场景 1：三者都存在

```js
const obj1 = {
  value: 3,
  valueOf() {
    return 4;
  },
  toString() {
    return '5';
  },
  [Symbol.toPrimitive]() {
    return 6;
  },
};

String(obj1); // '6'
Number(obj1); // 6
obj1 + 1; // 7
```

---

### 场景 2：没有 Symbol.toPrimitive

```js
const obj2 = {
  value: 3,
  valueOf() {
    console.log('调用了 valueOf');
    return 4;
  },
  toString() {
    console.log('调用了 toString');
    return '5';
  },
};

String(obj2); // 调用了 toString -> '5'
Number(obj2); // 调用了 valueOf -> 4
```

---

### 场景 3：只有 toString

```js
const obj3 = {
  value: 3,
  toString() {
    console.log('调用了 toString');
    return '5';
  },
};

String(obj3); // 调用了 toString -> '5'
Number(obj3); // 调用了 toString -> 5
```

---

### 场景 4：只有 valueOf

```js
const obj4 = {
  value: 3,
  valueOf() {
    console.log('调用了 valueOf');
    return 4;
  },
};

String(obj4); // '[object Object]'
Number(obj4); // 调用了 valueOf -> 4
```

---

### 场景 5：都不存在

```js
const obj5 = { value: 3 };

String(obj5); // '[object Object]'
Number(obj5); // NaN
```

---

### Symbol.toPrimitive 的 hint

```js
const obj = {
  [Symbol.toPrimitive](hint) {
    console.log(`hint: ${hint}`);
    if (hint === 'number') return 42;
    if (hint === 'string') return 'hello';
    return true; // default
  },
};

Number(obj); // hint: number -> 42
String(obj); // hint: string -> 'hello'
obj + ''; // hint: default -> 'true'
obj == true; // hint: default -> true
```

---

## 值类型和引用类型

JavaScript 数据类型分为两大类：

- **值类型（基本类型）**：`string`、`number`、`boolean`、`undefined`、`null`、`symbol`、`bigint`
- **引用类型**：`Object`、`Array`、`Function`、`Date`、`RegExp` 等

---

### 值类型（基本类型）

**特点：**

- 存储在栈内存
- 赋值时拷贝的是“值本身”
- 修改互不影响

```js
let foo = 1;
let bar = foo; // 拷贝值

bar = 2;

console.log(foo); // 1
console.log(bar); // 2
```

---

### 引用类型

**特点：**

- 实际数据存储在堆内存
- 栈中保存的是指向堆中对象的“引用（指针）”
- 赋值时拷贝的是引用
- 指向同一对象的变量会互相影响

```js
let foo = { a: 1, b: 2 };
let bar = foo;

bar.a = 2;

console.log(foo); // { a: 2, b: 2 }
console.log(bar); // { a: 2, b: 2 }
console.log(foo === bar); // true
```

---

### 深拷贝 vs 浅拷贝

```js
// 浅拷贝
const obj1 = { a: 1, b: { c: 2 } };
const obj2 = { ...obj1 }; // 或 Object.assign({}, obj1)

obj2.a = 10; // 不影响 obj1.a
obj2.b.c = 20; // 影响 obj1.b.c

// 深拷贝（简单场景）
const obj3 = JSON.parse(JSON.stringify(obj1));
obj3.b.c = 30; // 不影响 obj1.b.c
```

**注意：**`JSON.parse(JSON.stringify(...))` 有诸多局限，不适合函数、`Date`、`Map`、循环引用等复杂对象，仅能用于简单数据结构。

---

### 函数参数按值传递

**JavaScript 中所有函数参数都是“按值传递”。**

- 对于基本类型：复制的是值本身。
- 对于引用类型：复制的是“引用这个指针”的值（即指针本身）。

```js
// 基本类型
function changeValue(num) {
  num = 100;
  return num;
}

let value = 1;
const result = changeValue(value);

console.log(value); // 1
console.log(result); // 100

// 引用类型
function changeObject(person) {
  person.name = 'chu'; // 修改原对象
  person = { name: 'bar', age: 18 }; // 改变的是形参指向
  return person;
}

const p1 = { name: 'foo', age: 25 };
const p2 = changeObject(p1);

console.log(p1); // { name: 'chu', age: 25 }
console.log(p2); // { name: 'bar', age: 18 }
console.log(p1 === p2); // false
```

**关键理解：**

- `person.name = 'chu'` 修改的是堆中同一个对象。
- `person = {...}` 只是改变了局部变量 `person` 的引用，不会影响外部的 `p1`。
- **函数参数没有“按引用传递”，只有“按值传递”，只是这个值有时是指针。**

---

**总结：**

- **运行时安全** 依赖于正确的类型检测（`typeof`、`Array.isArray`、`Object.prototype.toString.call` 等）。
- **跨环境、复杂场景中，应避免使用 `instanceof` 与 `constructor` 来做关键逻辑判断。**
- 熟悉 **类型转换规则** 与 **对象到原始值的转换顺序**，可以解释和避免大量“看起来很魔法”的 JS 行为。
- 理解 **值类型 vs 引用类型** 与 **参数按值传递** 的本质，对于分析副作用、调试和优化都非常重要。
