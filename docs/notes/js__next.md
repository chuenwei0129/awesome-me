---
group:
  title: javaScript
  order: 3
title: 新特性
toc: content
order: 99
---

# JavaScript 新特性总览

本文档汇总了 ES2016 至今的 JavaScript 新特性，包括代码示例和实用场景说明。

## ES2016

### Array.prototype.includes

检查数组是否包含某个元素，返回布尔值。

```javascript
const arr = [1, 2, 3, NaN];
arr.includes(2); // true
arr.includes(4); // false
arr.includes(NaN); // true (相比 indexOf 的优势)

// 可指定起始索引
arr.includes(2, 2); // false
```

**优势**: 比 `indexOf` 更语义化，且能正确判断 `NaN`。

### 求幂运算符 (**)

右结合的幂运算符，替代 `Math.pow()`。

```javascript
2 ** 3; // 8
2 ** 3 ** 2; // 512 (相当于 2 ** (3 ** 2))

let a = 2;
a **= 3; // a = 8
```

## ES2017

### Object.values() / Object.entries()

获取对象的值数组或键值对数组。

```javascript
const obj = { a: 1, b: 2, c: 3 };

Object.values(obj); // [1, 2, 3]
Object.entries(obj); // [['a', 1], ['b', 2], ['c', 3]]

// 常用于遍历对象
Object.entries(obj).forEach(([key, value]) => {
  console.log(`${key}: ${value}`);
});

// 转换为 Map
const map = new Map(Object.entries(obj));
```

### String.prototype.padStart() / padEnd()

字符串填充方法，用于对齐文本。

```javascript
'5'.padStart(3, '0'); // "005"
'hello'.padEnd(10, '.'); // "hello....."

// 实用场景：格式化时间
const minutes = '5';
const seconds = '3';
`${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`; // "05:03"
```

### async/await

基于 Promise 的异步编程语法糖。

```javascript
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}

// 并行执行
async function parallel() {
  const [result1, result2] = await Promise.all([
    fetch('/api/1'),
    fetch('/api/2'),
  ]);
}
```

### Object.getOwnPropertyDescriptors()

获取对象所有自有属性的描述符。

```javascript
const obj = {
  name: 'Tom',
  get age() {
    return 18;
  },
};

Object.getOwnPropertyDescriptors(obj);
// {
//   name: { value: 'Tom', writable: true, enumerable: true, configurable: true },
//   age: { get: [Function: get age], set: undefined, enumerable: true, configurable: true }
// }

// 实用场景：浅拷贝包含 getter/setter 的对象
const clone = Object.create(
  Object.getPrototypeOf(obj),
  Object.getOwnPropertyDescriptors(obj),
);
```

### 函数参数列表尾逗号

允许在函数参数、调用时使用尾逗号。

```javascript
function foo(
  param1,
  param2,
  param3, // 尾逗号
) {}

foo(1, 2, 3); // 调用时也可以
```

### SharedArrayBuffer 和 Atomics

用于多线程间共享内存（Web Workers）。

## ES2018

### 异步迭代器 (for await...of)

用于遍历异步可迭代对象。

```javascript
async function* asyncGenerator() {
  yield await Promise.resolve(1);
  yield await Promise.resolve(2);
  yield await Promise.resolve(3);
}

(async () => {
  for await (const num of asyncGenerator()) {
    console.log(num); // 1, 2, 3
  }
})();

// 实用场景：处理异步数据流
async function processStream(stream) {
  for await (const chunk of stream) {
    console.log(chunk);
  }
}
```

### Promise.finally()

无论 Promise 成功或失败都会执行的回调。

```javascript
fetch('/api/data')
  .then((response) => response.json())
  .catch((error) => console.error(error))
  .finally(() => {
    // 总是执行，常用于清理操作
    hideLoadingSpinner();
  });
```

### 正则表达式增强

- **命名捕获组**: `(?<name>...)`
- **后行断言**: `(?<=...)` 和 `(?<!...)`
- **dotAll 模式**: `s` 标志让 `.` 匹配换行符
- **Unicode 属性转义**: `\p{...}`

```javascript
// 命名捕获组
const re = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
const match = re.exec('2024-01-15');
match.groups; // { year: '2024', month: '01', day: '15' }

// 后行断言
/(?<=\$)\d+/.exec('$100'); // ["100"]
/(?<!\$)\d+/.exec('100'); // ["100"]

// dotAll 模式
/hello.world/s.test('hello\nworld'); // true

// Unicode 属性
/^\p{Script=Greek}+$/u.test('μετά'); // true
```

### 对象 Rest/Spread 属性

```javascript
// Rest
const { a, b, ...rest } = { a: 1, b: 2, c: 3, d: 4 };
rest; // { c: 3, d: 4 }

// Spread
const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 }; // { a: 1, b: 2, c: 3 }

// 浅拷贝
const clone = { ...obj1 };

// 合并对象
const merged = { ...obj1, ...obj2 };
```

## ES2019

### Array.prototype.flat() / flatMap()

数组扁平化方法。

```javascript
// flat - 扁平化数组
[1, 2, [3, 4]].flat(); // [1, 2, 3, 4]
[1, [2, [3, [4]]]].flat(2); // [1, 2, 3, [4]]
[1, [2, [3, [4]]]].flat(Infinity); // [1, 2, 3, 4]

// flatMap - 映射后扁平化
[1, 2, 3].flatMap((x) => [x, x * 2]); // [1, 2, 2, 4, 3, 6]

// 实用场景：处理嵌套数据
const sentences = ['Hello world', 'How are you'];
sentences.flatMap((s) => s.split(' ')); // ['Hello', 'world', 'How', 'are', 'you']
```

### Object.fromEntries()

将键值对数组转换为对象，是 `Object.entries()` 的逆操作。

```javascript
const entries = [
  ['name', 'Tom'],
  ['age', 18],
];
Object.fromEntries(entries); // { name: 'Tom', age: 18 }

// 实用场景：过滤对象属性
const obj = { a: 1, b: 2, c: 3 };
const filtered = Object.fromEntries(
  Object.entries(obj).filter(([key, value]) => value > 1),
);
// { b: 2, c: 3 }

// URL 参数转对象
const params = new URLSearchParams('name=Tom&age=18');
Object.fromEntries(params); // { name: 'Tom', age: '18' }
```

### String.prototype.trimStart() / trimEnd()

更语义化的字符串修剪方法（别名：`trimLeft`/`trimRight`）。

```javascript
'  hello  '.trimStart(); // "hello  "
'  hello  '.trimEnd(); // "  hello"
```

### Symbol.prototype.description

获取 Symbol 的描述字符串。

```javascript
const sym = Symbol('my symbol');
sym.description; // "my symbol"
```

### 可选的 catch 绑定

catch 块可以省略错误参数。

```javascript
try {
  JSON.parse(invalidJSON);
} catch {
  // 不需要错误参数时可省略
  console.log('解析失败');
}
```

### Function.prototype.toString() 修订

返回精确的源代码字符串，包括空格和注释。

```javascript
function /* comment */ foo() {}
foo.toString(); // "function /* comment */ foo() {}"
```

## ES2020

### 可选链操作符 (?.)

安全访问嵌套属性，避免 `undefined` 错误。

```javascript
const user = {
  name: 'Tom',
  address: {
    city: 'Beijing',
  },
};

// 传统方式
const zip = user && user.address && user.address.zipCode;

// 可选链
const zip = user?.address?.zipCode; // undefined

// 用于方法调用
obj.method?.();

// 用于数组
arr?.[0];

// 实用场景：API 响应处理
const city = response?.data?.user?.address?.city;
```

### 空值合并操作符 (??)

当左侧为 `null` 或 `undefined` 时返回右侧值。

```javascript
const value = null ?? 'default'; // "default"
const value = 0 ?? 'default'; // 0 (与 || 的区别)
const value = '' ?? 'default'; // "" (与 || 的区别)

// 实用场景：设置默认值
const port = process.env.PORT ?? 3000;
const count = data.count ?? 0;

// 可与可选链结合
const name = user?.name ?? 'Anonymous';
```

### BigInt

任意精度的整数类型。

```javascript
// 创建 BigInt
const big1 = 1234567890123456789012345678901234567890n;
const big2 = BigInt('1234567890123456789012345678901234567890');

// 运算
const sum = 1n + 2n; // 3n
const product = 2n * 3n; // 6n

// 注意：不能与 Number 混用
1n + 1; // TypeError
1n + BigInt(1); // 2n

// 实用场景：处理大整数
const maxSafeInteger = BigInt(Number.MAX_SAFE_INTEGER);
```

### Promise.allSettled()

等待所有 Promise 完成（无论成功或失败）。

```javascript
const promises = [
  Promise.resolve(1),
  Promise.reject('error'),
  Promise.resolve(3),
];

Promise.allSettled(promises).then((results) => {
  results.forEach((result) => {
    if (result.status === 'fulfilled') {
      console.log('成功:', result.value);
    } else {
      console.log('失败:', result.reason);
    }
  });
});
// [
//   { status: 'fulfilled', value: 1 },
//   { status: 'rejected', reason: 'error' },
//   { status: 'fulfilled', value: 3 }
// ]
```

### globalThis

统一的全局对象访问方式。

```javascript
// 浏览器环境: window
// Node.js: global
// Web Workers: self

// 统一使用
globalThis.setTimeout === setTimeout; // true
```

### String.prototype.matchAll()

返回所有匹配结果的迭代器。

```javascript
const str = 'test1test2test3';
const regex = /test(\d)/g;

for (const match of str.matchAll(regex)) {
  console.log(match[0], match[1]);
}
// "test1" "1"
// "test2" "2"
// "test3" "3"

// 转换为数组
const matches = [...str.matchAll(regex)];
```

### 动态 import()

按需加载模块。

```javascript
// 动态导入
const module = await import('./module.js');

// 条件导入
if (condition) {
  const { feature } = await import('./feature.js');
  feature();
}

// 实用场景：代码分割
button.addEventListener('click', async () => {
  const { default: Chart } = await import('./chart.js');
  new Chart();
});
```

### import.meta

模块的元信息。

```javascript
// 当前模块的 URL
console.log(import.meta.url);

// Vite 中的环境变量
console.log(import.meta.env.VITE_API_URL);
```

## ES2021

### String.prototype.replaceAll()

替换所有匹配项。

```javascript
// 传统方式
'aabbcc'.replace(/a/g, 'x'); // "xxbbcc"

// replaceAll
'aabbcc'.replaceAll('a', 'x'); // "xxbbcc"

// 支持正则
'aabbcc'.replaceAll(/a/g, 'x'); // "xxbbcc"
```

### Promise.any()

返回第一个成功的 Promise。

```javascript
const promises = [
  Promise.reject('error1'),
  Promise.resolve('success'),
  Promise.resolve('success2'),
];

Promise.any(promises).then(console.log); // "success"

// 全部失败时抛出 AggregateError
Promise.any([Promise.reject(1), Promise.reject(2)]).catch((error) => {
  console.log(error.errors); // [1, 2]
});
```

### 逻辑赋值操作符

组合逻辑运算符和赋值。

```javascript
// 逻辑或赋值 (||=)
x ||= y; // 等价于 x || (x = y)

// 逻辑与赋值 (&&=)
x &&= y; // 等价于 x && (x = y)

// 空值合并赋值 (??=)
x ??= y; // 等价于 x ?? (x = y)

// 实用场景
const config = {};
config.port ??= 3000; // 仅在 undefined/null 时赋值
```

### 数字分隔符

提高大数字的可读性。

```javascript
const billion = 1_000_000_000;
const bytes = 0b1010_0001_1000_0101;
const hex = 0x1a_2b_3c_4d;

console.log(billion); // 1000000000
```

### WeakRef 和 FinalizationRegistry

弱引用和清理回调，用于高级内存管理。

```javascript
// 弱引用
const target = { name: 'object' };
const weakRef = new WeakRef(target);

// 获取引用的对象（可能已被回收）
const obj = weakRef.deref();
if (obj) {
  console.log(obj.name);
}

// 清理回调
const registry = new FinalizationRegistry((value) => {
  console.log(`${value} 被回收了`);
});

let obj = { name: 'test' };
registry.register(obj, 'obj');
```

## ES2022

### 类字段声明

在类中直接声明字段，包括私有字段。

```javascript
class Counter {
  // 公共字段
  count = 0;

  // 私有字段
  #privateCount = 0;

  // 静态字段
  static total = 0;

  // 静态私有字段
  static #instances = 0;

  constructor() {
    Counter.#instances++;
  }

  increment() {
    this.#privateCount++;
    this.count++;
  }

  // 私有方法
  #reset() {
    this.#privateCount = 0;
  }
}

const counter = new Counter();
counter.count; // 0
counter.#privateCount; // SyntaxError: 私有字段不可访问
```

### 类静态块

用于静态初始化逻辑。

```javascript
class Database {
  static connection;

  static {
    // 静态初始化块
    this.connection = createConnection();
    console.log('数据库已连接');
  }
}
```

### Top-level await

模块顶层可以使用 await。

```javascript
// module.js
const data = await fetch('/api/data');
export default data;

// 条件导入
const locale = await getLocale();
const messages = await import(`./i18n/${locale}.js`);
```

### 正则表达式匹配索引

通过 `d` 标志获取匹配位置。

```javascript
const str = 'hello world';
const regex = /world/d;
const match = regex.exec(str);

match.indices; // [[6, 11]]
match.indices[0]; // [6, 11] - 'world' 的起始和结束位置
```

### Error Cause

错误链，记录原始错误。

```javascript
try {
  doSomething();
} catch (error) {
  throw new Error('操作失败', { cause: error });
}

// 访问原始错误
try {
  // ...
} catch (error) {
  console.log(error.message); // "操作失败"
  console.log(error.cause); // 原始错误对象
}
```

### Array/String.prototype.at()

支持负索引的访问方法。

```javascript
const arr = [1, 2, 3, 4, 5];
arr.at(0); // 1
arr.at(-1); // 5 (最后一个元素)
arr.at(-2); // 4

const str = 'hello';
str.at(-1); // "o"

// 相比传统方式更简洁
arr[arr.length - 1]; // 传统方式
arr.at(-1); // 新方式
```

### Object.hasOwn()

更安全的属性检查方法。

```javascript
const obj = { name: 'Tom' };

// 传统方式可能有问题
obj.hasOwnProperty('name'); // true
// 但如果 obj.hasOwnProperty 被覆盖则会出错

// 新方式更安全
Object.hasOwn(obj, 'name'); // true

// 对于 null 原型对象也能工作
const nullProto = Object.create(null);
nullProto.name = 'Tom';
Object.hasOwn(nullProto, 'name'); // true
```

## ES2023

### Array.prototype.findLast() / findLastIndex()

从数组末尾查找元素。

```javascript
const arr = [1, 2, 3, 4, 5, 4, 3, 2, 1];

arr.findLast((x) => x > 3); // 5 (从后向前第一个大于3的)
arr.findLastIndex((x) => x > 3); // 4 (索引)

// 实用场景：查找最后一条符合条件的记录
const logs = [
  { level: 'info', msg: 'start' },
  { level: 'error', msg: 'failed' },
  { level: 'info', msg: 'retry' },
];
const lastError = logs.findLast((log) => log.level === 'error');
```

### Array.prototype.toSorted() / toReversed() / toSpliced()

不可变的数组方法（返回新数组）。

```javascript
const arr = [3, 1, 2];

// toSorted - 不改变原数组的排序
const sorted = arr.toSorted(); // [1, 2, 3]
console.log(arr); // [3, 1, 2] 原数组不变

// toReversed - 不改变原数组的反转
const reversed = arr.toReversed(); // [2, 1, 3]

// toSpliced - 不改变原数组的拼接
const spliced = arr.toSpliced(1, 1, 99); // [3, 99, 2]

// with - 不改变原数组的替换
const replaced = arr.with(1, 99); // [3, 99, 2]
```

### Array.prototype.with()

不改变原数组的索引替换。

```javascript
const arr = [1, 2, 3, 4];
const newArr = arr.with(2, 99); // [1, 2, 99, 4]
console.log(arr); // [1, 2, 3, 4] 原数组不变

// 支持负索引
arr.with(-1, 99); // [1, 2, 3, 99]
```

### Symbol.prototype.toWellKnown()

允许在全局 Symbol 注册表中查找 Symbol。

### Hashbang 语法

支持 Unix Shebang，用于脚本文件。

```javascript
#!/usr/bin/env node

console.log('Hello from Node.js script');
```

## ES2024

### Array Grouping

数组分组方法。

```javascript
const items = [
  { type: 'fruit', name: 'apple' },
  { type: 'vegetable', name: 'carrot' },
  { type: 'fruit', name: 'banana' },
  { type: 'vegetable', name: 'lettuce' },
];

// Object.groupBy - 分组为对象
const grouped = Object.groupBy(items, (item) => item.type);
// {
//   fruit: [{ type: 'fruit', name: 'apple' }, { type: 'fruit', name: 'banana' }],
//   vegetable: [{ type: 'vegetable', name: 'carrot' }, { type: 'vegetable', name: 'lettuce' }]
// }

// Map.groupBy - 分组为 Map
const groupedMap = Map.groupBy(items, (item) => item.type);
```

### Promise.withResolvers()

更方便地创建可外部控制的 Promise。

```javascript
// 传统方式
let resolve, reject;
const promise = new Promise((res, rej) => {
  resolve = res;
  reject = rej;
});

// 新方式
const { promise, resolve, reject } = Promise.withResolvers();

// 实用场景：延迟解析
class Queue {
  #resolvers = [];

  async dequeue() {
    const { promise, resolve } = Promise.withResolvers();
    this.#resolvers.push(resolve);
    return promise;
  }

  enqueue(value) {
    const resolve = this.#resolvers.shift();
    resolve?.(value);
  }
}
```

### ArrayBuffer 和 SharedArrayBuffer 新方法

```javascript
// ArrayBuffer.prototype.transfer()
const buffer = new ArrayBuffer(8);
const newBuffer = buffer.transfer(); // 转移所有权

// ArrayBuffer.prototype.resize()
const resizable = new ArrayBuffer(8, { maxByteLength: 16 });
resizable.resize(12);
```

### 正则表达式 v 标志

增强的 Unicode 支持。

```javascript
// 支持 Unicode 属性集合
/[\p{Script=Greek}&&\p{Letter}]/v.test('α'); // true

// 字符串字面量匹配
/\p{RGI_Emoji}/v.test('👨‍👩‍👧‍👦'); // true
```

## ES2025 (提案中)

### 装饰器 (Decorators)

类和类成员的元编程。

```typescript
// 类装饰器
function logged(target) {
  return class extends target {
    constructor(...args) {
      console.log(`Creating instance of ${target.name}`);
      super(...args);
    }
  };
}

@logged
class MyClass {}

// 方法装饰器
function measure(target, context) {
  return function (...args) {
    const start = performance.now();
    const result = target.call(this, ...args);
    const end = performance.now();
    console.log(`${context.name} took ${end - start}ms`);
    return result;
  };
}

class Service {
  @measure
  fetchData() {
    // ...
  }
}
```

### Record 和 Tuple (提案)

不可变的数据结构。

```javascript
// Record - 不可变对象
const record = #{a: 1, b: 2};

// Tuple - 不可变数组
const tuple = #[1, 2, 3];

// 深度不可变
const nested = #{
  data: #[1, 2, 3],
  metadata: #{id: 1}
};
```

### Temporal API (提案)

现代化的日期时间 API，替代 Date。

```javascript
// Temporal.PlainDate
const date = Temporal.PlainDate.from('2024-01-15');
date.year; // 2024
date.month; // 1
date.day; // 15

// Temporal.PlainTime
const time = Temporal.PlainTime.from('13:30:00');

// Temporal.ZonedDateTime
const zoned = Temporal.ZonedDateTime.from('2024-01-15T13:30:00+08:00[Asia/Shanghai]');

// 日期计算
const nextWeek = date.add({ days: 7 });
const diff = date.until(nextWeek).days; // 7
```

### Pipeline 操作符 (提案)

函数链式调用的语法糖。

```javascript
// 传统方式
const result = format(transform(parse(input)));

// Pipeline 操作符
const result = input |> parse(%) |> transform(%) |> format(%);

// 实用场景
const total = [1, 2, 3, 4]
  |> (%.map(x => x * 2))
  |> (%.filter(x => x > 4))
  |> (%.reduce((a, b) => a + b, 0));
```

## 参考资源

- [ES2019-ES2022 特性大汇总](https://juejin.cn/post/6986087239554072583)
- [ES2023 新特性详解](https://mp.weixin.qq.com/s?__biz=Mzk0MDMwMzQyOA==&mid=2247497304&idx=1&sn=edb848f17660e86ed32a3924c9acf215)
- [MDN JavaScript Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference)
- [TC39 Proposals](https://github.com/tc39/proposals)
