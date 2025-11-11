---
group:
  title: javaScript
  order: 3
title: 类型转换
toc: content
order: 13
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

## 类型检测

### typeof

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
```

**局限性：**

- 无法区分数组和对象
- `null` 被错误地识别为 `'object'`（历史遗留问题）
- 无法识别具体的对象类型（如 Date、RegExp 等）

### instanceof

`instanceof` 运算符用于检测构造函数的 `prototype` 属性是否出现在某个实例对象的原型链上。

**基本用法：**

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

**手动实现 instanceof：**

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

### Object.prototype.toString

最准确的类型检测方法，能够识别所有内置对象类型。

**基本用法：**

```js
// 基本类型
Object.prototype.toString.call(undefined); // "[object Undefined]"
Object.prototype.toString.call(null); // "[object Null]"
Object.prototype.toString.call(2); // "[object Number]"
Object.prototype.toString.call(''); // "[object String]"
Object.prototype.toString.call(true); // "[object Boolean]"
Object.prototype.toString.call(Symbol('id')); // "[object Symbol]"
Object.prototype.toString.call(123n); // "[object BigInt]"

// 引用类型
Object.prototype.toString.call({}); // "[object Object]"
Object.prototype.toString.call([]); // "[object Array]"
Object.prototype.toString.call(/\d/); // "[object RegExp]"
Object.prototype.toString.call(new Date()); // "[object Date]"
Object.prototype.toString.call(Math); // "[object Math]"
Object.prototype.toString.call(function () {}); // "[object Function]"
Object.prototype.toString.call(Array.isArray); // "[object Function]"
```

**自定义对象类型标签：**

可以通过 `Symbol.toStringTag` 自定义对象的类型标签：

```js
class MyClass {
  get [Symbol.toStringTag]() {
    return 'MyClass';
  }
}

const instance = new MyClass();
console.log(Object.prototype.toString.call(instance)); // "[object MyClass]"
```

> 参考：[Symbol.toStringTag - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag)

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

### 其他常用类型检测方法

#### isObject - 判断是否为对象

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

#### isEmptyObject - 判断是否为空对象

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

#### isInteger - 判断是否为整数

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

#### Array.isArray - 判断是否为数组

```js
console.log(Array.isArray([])); // true
console.log(Array.isArray([1, 2, 3])); // true
console.log(Array.isArray({})); // false
console.log(Array.isArray('abc')); // false
console.log(Array.isArray(arguments)); // false - arguments 不是数组

// 比 instanceof 更可靠
console.log([] instanceof Array); // true
// 但 instanceof 在跨 iframe 时可能失效
```

## 值类型和引用类型

JavaScript 中的数据类型分为两大类：值类型（基本类型）和引用类型。

### 值类型（基本类型）

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

### 引用类型

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

### 深拷贝 vs 浅拷贝

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

### 函数参数按值传递

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
