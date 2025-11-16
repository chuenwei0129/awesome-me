---
group:
  title: javaScript
  order: 3
title: 类型
toc: content
order: 3
---

# 类型转换

## 强制类型转换

### 转换成布尔值（Boolean）

所有的 **falsy** 值（假值）：

```js
console.log(Boolean(undefined)); // false
console.log(Boolean(null)); // false
console.log(Boolean(+0)); // false
console.log(Boolean(-0)); // false
console.log(Boolean(NaN)); // false
console.log(Boolean('')); // false - 空字符串
console.log(Boolean(0n)); // false - BigInt 零值
```

除了以上 7 个假值，其他所有值都会转换为 `true`：

```js
console.log(Boolean('0')); // true - 非空字符串
console.log(Boolean('false')); // true - 非空字符串
console.log(Boolean([])); // true - 空数组也是真值
console.log(Boolean({})); // true - 空对象也是真值
console.log(Boolean(function () {})); // true - 函数是真值
```

### 转换成数字（Number）

```js
// 基本类型转换
console.log(Number(undefined)); // NaN
console.log(Number(null)); // 0
console.log(Number(true)); // 1
console.log(Number(false)); // 0

// 字符串转换
console.log(Number('')); // 0 - 空字符串转为 0
console.log(Number('123')); // 123
console.log(Number('123abc')); // NaN - 包含非数字字符
console.log(Number('  123  ')); // 123 - 会去除首尾空格

// 对象/数组转换
console.log(Number([])); // 0 - 空数组
console.log(Number([5])); // 5 - 单元素数组
console.log(Number([1, 2])); // NaN - 多元素数组
console.log(Number({})); // NaN - 对象

// 其他数字转换方法
console.log(parseInt('123abc')); // 123 - 解析到第一个非数字字符
console.log(parseInt('abc123')); // NaN - 首字符必须是数字
console.log(parseFloat('3.14.15')); // 3.14 - 解析到第一个无效的浮点数字符
console.log(+'123'); // 123 - 一元加号运算符
```

### 转换成字符串（String）

```js
// 基本类型转换
console.log(String(undefined)); // "undefined"
console.log(String(null)); // "null"
console.log(String(true)); // "true"
console.log(String(123)); // "123"

// 数组转换
console.log(String([])); // "" - 空字符串
console.log(String([1, 2, 3])); // "1,2,3"
console.log(String([1, [2, 3]])); // "1,2,3" - 多维数组会被展平

// 对象转换
console.log(String({})); // "[object Object]"
console.log(String({ name: 'foo' })); // "[object Object]"

// 其他字符串转换方法
console.log((123).toString()); // "123"
console.log((123).toString(2)); // "1111011" - 转为二进制字符串
console.log(`值是 ${123}`); // "值是 123" - 模板字符串
```

### 转换成 JSON

```js
// 基本用法
console.log(JSON.stringify({ name: 'foo', age: 18 })); // '{"name":"foo","age":18}'

// 自定义 toJSON 方法
const obj = {
  name: 'foo',
  age: 18,
  toJSON() {
    return 'hello world';
  },
};
console.log(JSON.stringify(obj)); // '"hello world"'

// 过滤和格式化
const data = { name: 'foo', age: 18, password: '123456' };
console.log(JSON.stringify(data, ['name', 'age'])); // '{"name":"foo","age":18}'
console.log(JSON.stringify(data, null, 2)); // 格式化输出，缩进 2 个空格
```

## 隐式类型转换

隐式类型转换是 JavaScript 在运算时自动进行的类型转换。

### 算术运算符

```js
// 加法运算符（+）
console.log(1 + '2'); // "12" - 数字转为字符串
console.log('1' + 2); // "12" - 数字转为字符串
console.log(true + 1); // 2 - 布尔值转为数字（true -> 1）
console.log(false + 1); // 1 - 布尔值转为数字（false -> 0）
console.log([] + []); // "" - 数组转为空字符串，拼接后还是空字符串
console.log([] + {}); // "[object Object]" - 都转为字符串再拼接
console.log({} + []); // "[object Object]" - 注意：某些环境可能结果不同

// 其他算术运算符（-、*、/、%）
console.log('5' - 3); // 2 - 字符串转为数字
console.log('5' * 2); // 10 - 字符串转为数字
console.log('10' / 2); // 5 - 字符串转为数字
console.log('10' % 3); // 1 - 字符串转为数字
console.log('abc' - 1); // NaN - 无法转换为有效数字
```

### 比较运算符

```js
// 相等运算符（==）会进行类型转换
console.log(1 == '1'); // true - 字符串转为数字
console.log(true == 1); // true - 布尔值转为数字
console.log(false == 0); // true - 布尔值转为数字
console.log(null == undefined); // true - 特殊规则
console.log('' == 0); // true - 空字符串转为数字 0
console.log([] == 0); // true - 空数组转为字符串 "" 再转为数字 0
console.log([] == ![]); // true - ![] 为 false，[] 转为 0，false 转为 0

// 全等运算符（===）不会进行类型转换
console.log(1 === '1'); // false - 类型不同
console.log(true === 1); // false - 类型不同

// 关系运算符（>、<、>=、<=）
console.log('2' > '10'); // true - 字符串比较按字典序
console.log(2 > '10'); // false - 字符串转为数字
console.log('abc' > 5); // false - 'abc' 转为 NaN，任何与 NaN 的比较都返回 false
```

### 逻辑运算符

```js
// 逻辑非（!）将值转为布尔值再取反
console.log(!0); // true
console.log(!1); // false
console.log(!!'foo'); // true - 双重否定常用于转布尔值

// 逻辑与（&&）返回第一个假值或最后一个值
console.log(0 && 'foo'); // 0
console.log('foo' && 0); // 0
console.log('foo' && 'bar'); // "bar"

// 逻辑或（||）返回第一个真值或最后一个值
console.log(0 || 'foo'); // "foo"
console.log('foo' || 0); // "foo"
console.log('' || null || 0); // 0
```

### 特殊情况

```js
// if 语句的条件会转换为布尔值
if ('') {
  console.log('不会执行'); // 空字符串是假值
}

if ('0') {
  console.log('会执行'); // 非空字符串是真值
}

// 数组比较的特殊情况
console.log([] == false); // true - [] 转为 "" 转为 0，false 转为 0
console.log([] == ![]); // true - ![] 为 false
console.log([] == []); // false - 引用类型比较的是引用地址

// null 和 undefined 的特殊规则
console.log(null == undefined); // true
console.log(null === undefined); // false
console.log(null == 0); // false - null 只与 undefined 相等
console.log(undefined == 0); // false
```

**参考资料：**

- [JavaScript 中 == 和 === 区别是什么？](https://www.zhihu.com/question/31442029)
- [JavaScript 一个疑问，[] (空数组) == true，具体如下，请问这是为何？](https://www.zhihu.com/question/47555543/answers/updated)

## 对象转换成原始类型

JavaScript 对象在转换为原始类型时，会按照特定的优先级调用对象的方法。

### 转换优先级

当对象需要转换为原始类型时，会按以下优先级调用：

1. **`Symbol.toPrimitive`** - 优先级最高
2. **`valueOf`** - 期望转为数字时优先调用
3. **`toString`** - 期望转为字符串时优先调用

### 场景 1：三者都存在

优先调用 `Symbol.toPrimitive` 的返回值：

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

console.log(String(obj1)); // '6' - Symbol.toPrimitive 优先
console.log(Number(obj1)); // 6 - Symbol.toPrimitive 优先
console.log(obj1 + 1); // 7 - Symbol.toPrimitive 优先
```

### 场景 2：Symbol.toPrimitive 不存在

`String()` 优先调用 `toString`，`Number()` 优先调用 `valueOf`：

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

console.log(String(obj2)); // 调用了 toString -> '5'
console.log(Number(obj2)); // 调用了 valueOf -> 4
```

### 场景 3：只有 toString 存在

`String()` 和 `Number()` 都会调用 `toString`：

```js
const obj3 = {
  value: 3,
  toString() {
    console.log('调用了 toString');
    return '5';
  },
};

console.log(String(obj3)); // 调用了 toString -> '5'
console.log(Number(obj3)); // 调用了 toString -> 5 (字符串再转为数字)
```

### 场景 4：只有 valueOf 存在

`Number()` 会调用 `valueOf`，`String()` 会调用 `Object.prototype.toString`：

```js
const obj4 = {
  value: 3,
  valueOf() {
    console.log('调用了 valueOf');
    return 4;
  },
};

console.log(String(obj4)); // '[object Object]' - 调用默认的 toString
console.log(Number(obj4)); // 调用了 valueOf -> 4
```

### 场景 5：都不存在

使用默认的 `Object.prototype` 上的方法：

```js
const obj5 = {
  value: 3,
};

console.log(String(obj5)); // '[object Object]'
console.log(Number(obj5)); // NaN - 默认 toString 返回的字符串无法转为数字
```

### Symbol.toPrimitive 的 hint 参数

`Symbol.toPrimitive` 方法接收一个 `hint` 参数，表示期望的转换类型：

```js
const obj = {
  [Symbol.toPrimitive](hint) {
    console.log(`hint: ${hint}`);
    if (hint === 'number') {
      return 42;
    }
    if (hint === 'string') {
      return 'hello';
    }
    return true; // hint === 'default'
  },
};

console.log(Number(obj)); // hint: number -> 42
console.log(String(obj)); // hint: string -> 'hello'
console.log(obj + ''); // hint: default -> 'true'
console.log(obj == true); // hint: default -> true
```

# 类型检测

## typeof

`typeof` 运算符返回参数的类型字符串。

**语法形式：**

- 作为运算符：`typeof x`
- 函数形式：`typeof(x)`

**基本用法：**

```js
console.log(typeof undefined); // 'undefined'
console.log(typeof 123); // 'number'
console.log(typeof '123'); // 'string'
console.log(typeof true); // 'boolean'
console.log(typeof Symbol('id')); // 'symbol'
console.log(typeof 123n); // 'bigint'
console.log(typeof {}); // 'object'
console.log(typeof []); // 'object' - 注意：数组也是对象
console.log(typeof null); // 'object' - 历史遗留 bug
console.log(typeof function () {}); // 'function'
```

**特殊情况：**

```js
// typeof 返回值的类型是字符串
console.log(typeof Array.isArray); // 'function'
console.log(typeof typeof Array.isArray); // 'string'

// typeof 对未声明的变量不会报错
console.log(typeof undeclaredVariable); // 'undefined'

typeof document.all; // 虽然 document.all 不是 undefined，但它在 typeof 下却表现得像 undefined，而且在逻辑上是假值。这一切都是为了不破坏过去编写的网站代码。
```

**局限性：**

- 无法区分数组和对象
- `null` 被错误地识别为 `'object'`，document.all 也被错误地识别为 `'undefined'`（历史遗留问题）
- 无法识别具体的对象类型（如 Date、RegExp 等）

## instanceof

`instanceof` 运算符用于检测构造函数的 `prototype` 属性是否出现在某个实例对象的原型链上。

### 基本用法

```js
console.log([] instanceof Array); // true
console.log({} instanceof Object); // true
console.log(new Date() instanceof Date); // true
console.log(/\d/ instanceof RegExp); // true

// 原始类型不是对象实例
console.log(123 instanceof Number); // false
console.log('abc' instanceof String); // false
console.log(true instanceof Boolean); // false

// 但包装对象是
console.log(new Number(123) instanceof Number); // true
console.log(new String('abc') instanceof String); // true
```

### 手动实现 instanceof

```js
function myInstanceof(left, right) {
  // 基本数据类型直接返回 false
  if (typeof left !== 'object' || left === null) return false;

  // getPrototypeOf 是 Object 对象自带的方法，相当于 left.__proto__
  let proto = Object.getPrototypeOf(left);

  while (true) {
    // 查找到原型链尽头，还没找到
    if (proto === null) return false;

    // 找到相同的原型对象
    if (proto === right.prototype) return true;

    // 继续向上查找
    proto = Object.getPrototypeOf(proto);
  }
}

// 测试
console.log(myInstanceof(Number(1), Number)); // false - 原始类型
console.log(myInstanceof(new Number(1), Number)); // true - 包装对象
console.log(myInstanceof(new Date(), Date)); // true
console.log(myInstanceof([], Array)); // true
console.log(myInstanceof([], Object)); // true - 数组也是对象
```

### 局限性

- **核心概念：** 在浏览器中，每个窗口（window）和内嵌的框架（iframe）都拥有自己独立的**全局执行环境**。这意味着每个环境都有自己的一套全局对象，比如 `window`、`Array`、`Object` 等。
- **`instanceof` 的工作原理：** `instanceof` 运算符用于检查一个对象的原型链上是否存在某个构造函数的 `prototype` 属性。简单来说，它检查 `variable` 是不是由 `Array` 这个“蓝图”创建的。
- **问题出现：** 假设你在页面 A 的脚本中，创建了一个数组 `let arr = [];`。这个 `arr` 是由页面 A 的 `Array` 构造函数创建的。现在，你通过某种方式（比如 `postMessage` 或直接访问）拿到了来自另一个 iframe（页面 B）中的一个数组 `iframeArr`。这个 `iframeArr` 是由页面 B 的 `Array` 构造函数创建的。
- **关键点：** **页面 A 的 `Array` 和 页面 B 的 `Array` 是两个完全不同的构造函数对象**，尽管它们的功能一模一样。它们位于不同的内存地址。

所以，当你执行 `iframeArr instanceof Array` 时，它实际上是在问：

> “`iframeArr` 的原型链上，有指向 **我（页面 A）的** `Array.prototype` 吗？”

答案显然是 **“没有”**。`iframeArr` 的原型链指向的是页面 B 的 `Array.prototype`。因此，`iframeArr instanceof Array` 返回 `false`。

这在早期的 IE 浏览器中是一个特别常见且棘手的问题。

### 业界推荐的解决方案：`Object.prototype.toString.call()`

为了绕过因执行环境不同而导致的构造函数引用不一致的问题，开发者们找到了一种更底层、更可靠的方法。

- **原理：** JavaScript 内置的 `Object.prototype.toString` 方法，被设计用来返回一个表示对象类型的字符串。它的返回值格式是 `[object Xxx]`，其中 `Xxx` 是对象的内部类型。
  - 对于数组，它返回 `[object Array]`
  - 对于字符串，它返回 `[object String]`
  - 对于函数，它返回 `[object Function]`
  - 以此类推...
- **为什么可靠：** 这个方法是 JavaScript 引擎内部实现的，它不依赖于外部的构造函数引用，而是直接检查对象的内部属性 `[[Class]]`（在 ES5 之前）。因此，无论对象来自哪个 iframe，只要它是数组，调用此方法返回的结果就一定是 `"[object Array]"`。

**代码示例：**

```javascript
// 在页面A中
let localArr = [1, 2, 3];
let iframeArr = window.frames[0].someArray; // 假设从iframe获取了一个数组

console.log(localArr instanceof Array); // true
console.log(iframeArr instanceof Array); // false (在IE等多iframe环境下)

console.log(Object.prototype.toString.call(localArr) === '[object Array]'); // true
console.log(Object.prototype.toString.call(iframeArr) === '[object Array]'); // true (始终可靠)
```

为了让你更清晰地理解不同判断方法在你所述场景下的表现，我准备了下面这个对比表格：

| 判断方法                               | 核心原理                                                                   | 能否被通常的篡改影响？ | 在你描述的复杂场景下的可靠性 |
| :------------------------------------- | :------------------------------------------------------------------------- | :--------------------- | :--------------------------- |
| **`Object.prototype.toString.call()`** | 读取对象内部的 **`[[Class]]`**（或 ES6+的 **`[[@@toStringTag]]`** ）属性。 | **通常不能**           | ⭐⭐⭐⭐⭐ **非常可靠**      |
| **`Array.isArray()`**                  | JavaScript 引擎内部实现，同样检查内部槽位。                                | **不能**               | ⭐⭐⭐⭐⭐ **非常可靠**      |
| **`instanceof`**                       | 检查对象的**原型链**上是否存在构造函数的 `prototype` 属性。                | **容易受影响**         | ⭐☆☆☆☆ **不可靠**            |
| **`constructor`**                      | 直接访问对象的 `constructor` 属性。                                        | **极易被覆盖**         | ⭐☆☆☆☆ **不可靠**            |

### 🔍 理解原理与应对极端情况

- **`Object.prototype.toString.call()` 的威力**：这个方法之所以强大，是因为它直接访问由 JavaScript 引擎为每个内置对象类型设置的内部标识（在 ES5 及之前是 `[[Class]]`，ES6+规范中则更倾向于使用 `[[@@toStringTag]]`）。这个内部标识**不受外部原型链修改或`constructor`属性覆盖的影响**。对于一个普通数组，它始终返回 `[object Array]`。

- **`Array.isArray()` 是现代首选**：这是 ES5 引入的专门用于检测数组的方法，同样基于引擎内部检查，完全不受原型链或`constructor`的影响，是**现代 JavaScript 中判断数组的首选和最推荐的方法**。

无论是从使用便利性上来说，还是从能力范围上来讲，都更建议使用 `Array.isArray `来判断数组类型。

其他对象类型就没有这种待遇了，比如我们常用的正则 RegExp。除了它有自己独立的字面量语法之外，RegExp 没有其他任何特别之处。假设我们声明一个自定义类：

```js
class Animal {}
```

那么，实现 isAnimal 的原理和实现 isRegExp 的原理是等价的。那我这里使用 Animal 来代指任意对象类型，包括 RegExp、Date、Arguments，也包括 Window、Document。通常用做 `Object.prototype.toString.call()` 判断。

### ⚠️ 注意极端边界情况

理论上，存在一些极端手段可以干扰这些判断，但这通常需要刻意而为之，且有其局限性：

1.  **修改 `Symbol.toStringTag`**：ES6 允许通过给对象设置 `Symbol.toStringTag` 属性，来自定义 `Object.prototype.toString.call()` 的返回值。

    ```javascript
    const arr = [];
    arr[Symbol.toStringTag] = 'NotAnArray';
    console.log(Object.prototype.toString.call(arr)); // 输出：[object NotAnArray]
    console.log(Array.isArray(arr)); // 输出：true (不受影响)
    ```

    **注意**：即使在这种情况下，`Array.isArray()` **依然不受影响**，它能穿透这种伪装，准确判断出这是数组。

2.  **代理 `Object.prototype.toString` 本身**：这是一个更极端的做法。如果有人代理了 `Object.prototype.toString` 方法本身，并改变了其行为，那么所有依赖它的判断都会失效。不过，这种操作难度大、影响范围广，在实际项目中非常罕见，也容易被发现。

### 💎 结论与最佳实践

综合来看，可以得出以下结论：

- **追求最高可靠性**：在你提到的篡改场景下，**`Array.isArray()` 是最安全、最可靠的选择**，几乎没有被常规手段干扰的可能。
- **`Object.prototype.toString.call()` 是强大的后备**：如果因为某些原因无法使用 `Array.isArray()`（例如需要兼容极老的环境），那么 `Object.prototype.toString.call()` 在绝大多数情况下也是一个非常可靠的后备方案。
- **避免使用 `instanceof` 和 `constructor`**：在对运行环境不确定或安全性要求高的场景下，**应避免使用 `instanceof` 和 `constructor` 来判断数组类型**。

### 通用的类型判断方法

结合 `typeof` 和 `Object.prototype.toString` 的优点，实现一个通用的类型判断函数：

```js
function getType(obj) {
  let type = typeof obj;

  // 先进行 typeof 判断，如果是基础数据类型，直接返回
  if (type !== 'object') {
    return type;
  }

  // 对于 typeof 返回结果是 object 的，再进行 toString 判断，正则提取类型
  return Object.prototype.toString
    .call(obj)
    .replace(/^\[object (\S+)\]$/, '$1');
}

// 使用示例
console.log(getType([])); // "Array" - typeof [] 是 object，因此 toString 返回
console.log(getType('123')); // "string" - typeof 直接返回
console.log(getType(window)); // "Window" - toString 返回
console.log(getType(null)); // "Null" - 首字母大写，typeof null 是 object，需 toString 来判断
console.log(getType(undefined)); // "undefined" - typeof 直接返回
console.log(getType()); // "undefined" - typeof 直接返回
console.log(getType(function () {})); // "function" - typeof 能判断，因此首字母小写
console.log(getType(/123/g)); // "RegExp" - toString 返回
console.log(getType(new Date())); // "Date" - toString 返回
```

## 其他常用类型检测方法

### isObject - 判断是否为对象

```js
// 利用对象包装后还是它自己的特性
function isObject(value) {
  return value === Object(value);
}

// 测试
console.log(isObject({})); // true
console.log(isObject([])); // true
console.log(isObject(null)); // false - null 没有包装对象
console.log(isObject(123)); // false
console.log(isObject('abc')); // false

// 原理：Object(null) !== null
console.log(Object(null) === null); // false
console.log(Object({}) === {}); // false - 不同引用
```

### isEmptyObject - 判断是否为空对象

```js
function isEmptyObject(obj) {
  if (typeof obj !== 'object' || obj === null) return false;
  return Object.keys(obj).length === 0;
}

console.log(isEmptyObject({})); // true
console.log(isEmptyObject({ a: 1 })); // false
console.log(isEmptyObject([])); // true - 空数组也算空对象
console.log(isEmptyObject([1, 2])); // false
console.log(isEmptyObject(null)); // false
```

### isInteger - 判断是否为整数

```js
// 利用整数位运算后不变的特性
function isInteger(num) {
  return typeof num === 'number' && (num | 0) === num;
}

console.log(isInteger(1)); // true
console.log(isInteger(1.1)); // false
console.log(isInteger(-5)); // true
console.log(isInteger(0)); // true
console.log(isInteger(NaN)); // false
console.log(isInteger(Infinity)); // false

// 也可以使用 ES6 提供的方法
console.log(Number.isInteger(1)); // true
console.log(Number.isInteger(1.1)); // false
```

# 值类型和引用类型

JavaScript 中的数据类型分为两大类：值类型（基本类型）和引用类型。

## 值类型（基本类型）

值类型包括：`string`、`number`、`boolean`、`undefined`、`null`、`symbol`、`bigint`

**特点：**

- 存储在栈内存中
- 赋值时是值的拷贝
- 互不影响

```js
let foo = 1;
let bar = foo; // 拷贝值

bar = 2; // 修改 bar 不影响 foo

console.log(foo); // 1
console.log(bar); // 2
```

## 引用类型

引用类型包括：`Object`、`Array`、`Function`、`Date`、`RegExp` 等

**特点：**

- 存储在堆内存中
- 栈中保存的是引用类型的指针（内存地址）
- 赋值时拷贝的是指针，指向同一个对象
- 相互之间有影响

```js
let foo = { a: 1, b: 2 };
let bar = foo; // 拷贝的是引用（指针）

bar.a = 2; // 修改 bar 会影响 foo

console.log(foo); // { a: 2, b: 2 }
console.log(bar); // { a: 2, b: 2 }
console.log(foo === bar); // true - 指向同一个对象
```

## 深拷贝 vs 浅拷贝

```js
// 浅拷贝 - 只拷贝第一层
const obj1 = { a: 1, b: { c: 2 } };
const obj2 = { ...obj1 }; // 或 Object.assign({}, obj1)

obj2.a = 10; // 不影响 obj1
obj2.b.c = 20; // 影响 obj1（b 是引用类型）

console.log(obj1); // { a: 1, b: { c: 20 } }
console.log(obj2); // { a: 10, b: { c: 20 } }

// 深拷贝 - 递归拷贝所有层级
const obj3 = JSON.parse(JSON.stringify(obj1));
obj3.b.c = 30; // 不影响 obj1

console.log(obj1.b.c); // 20
console.log(obj3.b.c); // 30
```

## 函数参数按值传递

在 JavaScript 中，所有函数参数都是按值传递的：

- **基本类型**：传递的是值的拷贝
- **引用类型**：传递的是引用（指针）的拷贝

```js
// 基本类型示例
function changeValue(num) {
  num = 100; // 修改的是参数的副本
  return num;
}

let value = 1;
const result = changeValue(value);
console.log(value); // 1 - 原始值不变
console.log(result); // 100

// 引用类型示例
function changeObject(person) {
  person.name = 'chu'; // 修改对象属性会影响原对象
  person = { name: 'bar', age: 18 }; // 重新赋值不影响原对象
  return person;
}

const p1 = { name: 'foo', age: 25 };
const p2 = changeObject(p1);

console.log(p1); // { name: 'chu', age: 25 } - 属性被修改
console.log(p2); // { name: 'bar', age: 18 } - 新对象
console.log(p1 === p2); // false - 不是同一个对象
```

**关键点理解：**

1. `person.name = 'chu'` - 通过引用修改对象属性，影响原对象
2. `person = {...}` - 重新赋值只是改变了局部变量 `person` 的指向，不影响原对象
3. 函数参数传递的是引用的副本，不是引用的引用
