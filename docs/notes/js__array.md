---
group:
  title: javaScript
  order: 3
title: Array
toc: content
order: 7
---

## 数组的本质

### JavaScript 里的 Array 为什么能直接添加属性？

> **可以从 3 个角度来看待这个问题：**

JavaScript 的数组是 V8 中的 JSArray，JavaScript 的对象是 V8 中 JSObject，**JSArray 是 JSObject 的子类**。既然 JavaScript 对象可以动态添加属性，从继承的角度来说，数组应该也可以。

**JavaScript 的数组不是严格意义上的数组：**

```js
let list = [];
list[9999999999999999999999999999999999999] = 2;
// 1024 * 1024 * 1024 * 8 === 8589934592 // true，8G 也就这么大
```

我的电脑肯定没有足够的内存存储长度为 9999999999999999999999999999999999999 的数组，list 表面是数组，**底层数据结构明显是一个哈希表**。作为哈希表，添加属性 a、b 是很正常的行为。

**JavaScript 数组相关的内置方法也是动态添加的：**

V8 启动时，会为 `Array` 添加 `isArray`、`from`、`of` 属性，为 `Array.prototype` 添加 `concat`、`map`、`forEach` 等前端们耳熟能详的属性。

### 数组的最大长度

```js
// 按 ECMA 规范，数组的 size 使用 32 位 unsigned int 存储
// 所以最大长度是 2^32 - 1 = 4294967295
const MAX_ARRAY_LENGTH = 4294967295;

// 测试
const arr = [];
arr[4294967294] = 99; // 有效的数组索引，length = 4294967295
arr[4294967295] = 100; // 超出最大索引，被当作对象属性而非数组元素
console.log(arr); // [ <4294967294 empty items>, 99, '4294967295': 100 ]
console.log(arr.length); // 4294967295
```

### Array 是构造函数还是类？

这个属于概念类的东西，其实可以不那么较真，**你可以简单的认为构造函数和类是等价的概念**，是可以互换的词。

规范里每个函数对象都有个 `[[Call]]` 内部方法，同时它也可能拥有个 `[[Constructor]]` 内部方法，拥有 `[[Constructor]]` 内部方法的函数就是构造函数（function Object() {[native code]}，也叫构造器），而每个构造函数又都拥有一个 `[[IsClassConstructor]]` 内部属性，值是个布尔值，`true` 的话就代表它是个类（`class`）。

所以从这个角度看，类和构造函数并不是并列关系，而是包含关系。**函数包含了构造函数和非构造函数两种，而构造函数又包含了类构造函数和非类构造函数两种。**

类构造函数和非类构造函数的区别就是它能不能被当成普通函数调用（不带 `new`），因为 `Array()` 是可以执行的，**所以 `Array` 不是类。**

但你一定会觉得 "`Array` 不是类" 这句话很扯，`class MyArray extends Array {}` 这个代码里的 `Array` 难道我们不是把它叫成父类、超类吗，它怎么可能不是类？的确，**在作为父类使用的时候，规范又不会去检查它的 `[[IsClassConstructor]]` 是否为 `true`**，而是只会检查它是不是拥有 `[[Constructor]]`，也就是说，**只要是个构造函数就可以做父类**，非类的构造函数也可以做父类。

这么死扣类的概念是不是很累（no pun intended）？因为规范里之所以要搞出一个 `[[IsClassConstructor]]` 的概念，**目的是为了让用新的 `class{}` 语法写出的构造函数不能被当成普通函数调用**，并不是为了下定义而下定义。

**所以还是把它们当成等价的概念简单一点。**

## 静态方法

### Array.from()

`Array.from()` 方法用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）。

```js
// 如果参数是一个真正的数组，Array.from() 会返回一个一模一样的新数组
console.log(Array.from([1, 2, 3])); // [1, 2, 3]

// 所谓类似数组的对象，本质特征只有一点，即必须有 length 属性
console.log(Array.from({ length: 3 })); // [undefined, undefined, undefined]

// Array.from() 还可以接受一个函数作为第二个参数，作用类似于数组的 map() 方法
// 用来对每个元素进行处理，将处理后的值放入返回的数组
console.log(Array.from([1, 2, 3], (x) => x ** x)); // [1, 4, 27]

// 如果 map() 函数里面用到了 this 关键字，还可以传入 Array.from() 的第三个参数，用来绑定 this
// 它也能正确处理各种 Unicode 字符
console.log(Array.from('👍')); // ['👍']

// 实用技巧：创建指定长度的数组并填充
console.log(Array.from({ length: 5 }, (_, i) => i)); // [0, 1, 2, 3, 4]
```

### Array.of()

`Array.of()` 方法用于将一组值，转换为数组。

```js
Array.of(3, 11, 8); // [3, 11, 8]
Array.of(3); // [3]
Array.of(3).length; // 1
```

这个方法的主要目的，是弥补数组构造函数 `Array()` 的不足。因为参数个数的不同，会导致 `Array()` 的行为有差异。

```js
Array(); // []
Array(3); // [empty × 3]
Array(3, 11, 8); // [3, 11, 8]
```

### Array.isArray()

用于判断一个值是否为数组。

```js
Array.isArray([]); // true
Array.isArray({}); // false
Array.isArray(null); // false
Array.isArray(undefined); // false

// 更可靠的判断方式，优于 instanceof
console.log([] instanceof Array); // true，但在不同 iframe 中可能失效
console.log(Array.isArray([])); // true，在任何环境都有效
```

## 实例方法

### 迭代方法

#### map() - 映射

返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值。

```js
const numbers = [1, 2, 3, 4];
const doubled = numbers.map((num) => num * 2);
console.log(doubled); // [2, 4, 6, 8]

// 常用于数据转换
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];
const names = users.map((user) => user.name);
console.log(names); // ['Alice', 'Bob']
```

#### filter() - 过滤

返回一个新数组，数组中的元素是通过检查指定数组中符合条件的所有元素。

```js
const numbers = [1, 2, 3, 4, 5, 6];
const evenNumbers = numbers.filter((num) => num % 2 === 0);
console.log(evenNumbers); // [2, 4, 6]

// 常用于数据筛选
const users = [
  { id: 1, name: 'Alice', age: 25 },
  { id: 2, name: 'Bob', age: 17 },
  { id: 3, name: 'Charlie', age: 30 },
];
const adults = users.filter((user) => user.age >= 18);
console.log(adults); // [{ id: 1, name: 'Alice', age: 25 }, { id: 3, name: 'Charlie', age: 30 }]
```

#### reduce() - 归约

将数组元素计算为一个值（从左到右）。

```js
const numbers = [1, 2, 3, 4];
const sum = numbers.reduce((acc, num) => acc + num, 0);
console.log(sum); // 10

// 常用于累加、累乘、数组扁平化等
const flattened = [
  [1, 2],
  [3, 4],
  [5, 6],
].reduce((acc, arr) => acc.concat(arr), []);
console.log(flattened); // [1, 2, 3, 4, 5, 6]

// 对象分组
const users = [
  { name: 'Alice', role: 'admin' },
  { name: 'Bob', role: 'user' },
  { name: 'Charlie', role: 'admin' },
];
const grouped = users.reduce((acc, user) => {
  acc[user.role] = acc[user.role] || [];
  acc[user.role].push(user);
  return acc;
}, {});
console.log(grouped);
// {
//   admin: [{ name: 'Alice', role: 'admin' }, { name: 'Charlie', role: 'admin' }],
//   user: [{ name: 'Bob', role: 'user' }]
// }
```

#### forEach() - 遍历

对数组的每个元素执行一次给定的函数。

```js
const numbers = [1, 2, 3];
numbers.forEach((num, index) => {
  console.log(`Index ${index}: ${num}`);
});
// Index 0: 1
// Index 1: 2
// Index 2: 3

// 注意：forEach 不能使用 break、continue，也不能返回值
// 如果需要中断循环，应该使用 for...of 或 some/every
```

#### some() - 检测是否有元素满足条件

测试数组中是不是至少有一个元素通过了被提供的函数测试。

```js
const numbers = [1, 2, 3, 4, 5];
const hasEven = numbers.some((num) => num % 2 === 0);
console.log(hasEven); // true

// 常用于验证
const users = [
  { name: 'Alice', age: 17 },
  { name: 'Bob', age: 25 },
];
const hasAdult = users.some((user) => user.age >= 18);
console.log(hasAdult); // true
```

#### every() - 检测所有元素是否都满足条件

测试数组的所有元素是否都通过了指定函数的测试。

```js
const numbers = [2, 4, 6, 8];
const allEven = numbers.every((num) => num % 2 === 0);
console.log(allEven); // true

// 常用于验证
const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
];
const allAdults = users.every((user) => user.age >= 18);
console.log(allAdults); // true
```

### 查找方法

#### find() - 查找元素

返回数组中满足提供的测试函数的第一个元素的值。否则返回 `undefined`。

```js
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
];
const user = users.find((u) => u.id === 2);
console.log(user); // { id: 2, name: 'Bob' }
```

#### findIndex() - 查找索引

返回数组中满足提供的测试函数的第一个元素的索引。否则返回 `-1`。

```js
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];
const index = users.findIndex((u) => u.id === 2);
console.log(index); // 1
```

#### findLast() 和 findLastIndex()

与 `find()` 和 `findIndex()` 类似，但从数组末尾开始查找。

```js
const numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
const lastFour = numbers.findLast((num) => num === 4);
const lastFourIndex = numbers.findLastIndex((num) => num === 4);
console.log(lastFour); // 4
console.log(lastFourIndex); // 5
```

#### includes() - 判断是否包含

判断数组是否包含一个指定的值，返回 `true` 或 `false`。

```js
const fruits = ['apple', 'banana', 'orange'];
console.log(fruits.includes('banana')); // true
console.log(fruits.includes('grape')); // false

// 可以指定起始索引
console.log(fruits.includes('apple', 1)); // false
```

#### indexOf() 和 lastIndexOf()

返回在数组中可以找到给定元素的第一个索引（或最后一个索引），如果不存在，则返回 `-1`。

```js
const numbers = [1, 2, 3, 2, 1];
console.log(numbers.indexOf(2)); // 1
console.log(numbers.lastIndexOf(2)); // 3
console.log(numbers.indexOf(5)); // -1
```

### 修改方法

#### push() 和 pop()

`push()` 在数组末尾添加元素，返回新长度。`pop()` 删除并返回数组最后一个元素。

```js
const arr = [1, 2, 3];
arr.push(4); // 返回 4（新长度）
console.log(arr); // [1, 2, 3, 4]

const last = arr.pop(); // 返回 4
console.log(arr); // [1, 2, 3]
```

#### shift() 和 unshift()

`shift()` 删除并返回数组第一个元素。`unshift()` 在数组开头添加元素，返回新长度。

```js
const arr = [1, 2, 3];
arr.unshift(0); // 返回 4（新长度）
console.log(arr); // [0, 1, 2, 3]

const first = arr.shift(); // 返回 0
console.log(arr); // [1, 2, 3]
```

#### splice() - 删除/插入/替换

通过删除或替换现有元素或者原地添加新的元素来修改数组。

```js
const arr = [1, 2, 3, 4, 5];

// 删除元素：从索引 2 开始删除 1 个元素
arr.splice(2, 1); // 返回 [3]
console.log(arr); // [1, 2, 4, 5]

// 插入元素：从索引 2 开始，删除 0 个元素，插入 3 和 3.5
arr.splice(2, 0, 3, 3.5); // 返回 []
console.log(arr); // [1, 2, 3, 3.5, 4, 5]

// 替换元素：从索引 3 开始，删除 1 个元素，插入 4
arr.splice(3, 1, 4); // 返回 [3.5]
console.log(arr); // [1, 2, 3, 4, 4, 5]
```

#### slice() - 提取

返回一个新的数组对象，这一对象是一个由 `begin` 和 `end` 决定的原数组的浅拷贝。

```js
const arr = [1, 2, 3, 4, 5];
const sliced = arr.slice(1, 4); // 从索引 1 到 4（不包括 4）
console.log(sliced); // [2, 3, 4]
console.log(arr); // [1, 2, 3, 4, 5] 原数组不变

// 可以使用负索引
console.log(arr.slice(-2)); // [4, 5]
console.log(arr.slice(1, -1)); // [2, 3, 4]

// 常用于数组浅拷贝
const copy = arr.slice();
```

### 排序方法

#### sort() - 排序

对数组元素进行原地排序并返回该数组。

```js
const numbers = [3, 1, 4, 1, 5, 9, 2, 6];

// 默认按字符串排序（会有问题）
numbers.sort();
console.log(numbers); // [1, 1, 2, 3, 4, 5, 6, 9]

// 正确的数字排序
numbers.sort((a, b) => a - b); // 升序
console.log(numbers); // [1, 1, 2, 3, 4, 5, 6, 9]

numbers.sort((a, b) => b - a); // 降序
console.log(numbers); // [9, 6, 5, 4, 3, 2, 1, 1]

// 对象数组排序
const users = [
  { name: 'Charlie', age: 30 },
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 25 },
];
users.sort((a, b) => a.age - b.age);
console.log(users);
// [
//   { name: 'Alice', age: 25 },
//   { name: 'Bob', age: 25 },
//   { name: 'Charlie', age: 30 }
// ]
```

#### reverse() - 反转

颠倒数组中元素的顺序。

```js
const arr = [1, 2, 3, 4, 5];
arr.reverse();
console.log(arr); // [5, 4, 3, 2, 1]
```

#### toSorted() 和 toReversed()

ES2023 新增的不可变版本，返回新数组而不修改原数组。

```js
const arr = [3, 1, 4, 1, 5];
const sorted = arr.toSorted((a, b) => a - b);
console.log(sorted); // [1, 1, 3, 4, 5]
console.log(arr); // [3, 1, 4, 1, 5] 原数组不变

const reversed = arr.toReversed();
console.log(reversed); // [5, 1, 4, 1, 3]
console.log(arr); // [3, 1, 4, 1, 5] 原数组不变
```

### 其他实用方法

#### entries()、keys() 和 values()

用于遍历数组的键值对、键、值。

```js
const arr = ['a', 'b', 'c'];

for (let index of arr.keys()) {
  console.log(index); // 0 1 2
}

for (let value of arr.values()) {
  console.log(value); // a b c
}

for (let [index, value] of arr.entries()) {
  console.log(index, value); // 0 a, 1 b, 2 c
}
```

#### at() - 访问元素

返回指定索引处的元素，支持负索引。

```js
const arr = ['a', 'b', 'c', 'd'];
console.log(arr.at(0)); // 'a'
console.log(arr.at(-1)); // 'd'
console.log(arr.at(-2)); // 'c'
```

#### flat() - 扁平化

按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。

```js
const arr = [1, [2, 3], [4, [5, 6]]];
console.log(arr.flat()); // [1, 2, 3, 4, [5, 6]]
console.log(arr.flat(2)); // [1, 2, 3, 4, 5, 6]
console.log(arr.flat(Infinity)); // 完全扁平化

// 可以去除空位
const arr2 = [1, 2, , 4, 5];
console.log(arr2.flat()); // [1, 2, 4, 5]
```

#### flatMap()

首先使用映射函数映射每个元素，然后将结果压缩成一个新数组。

```js
const arr = [1, 2, 3];
const result = arr.flatMap((x) => [x, x * 2]);
console.log(result); // [1, 2, 2, 4, 3, 6]

// 等价于
const result2 = arr.map((x) => [x, x * 2]).flat();
```

#### join() - 拼接

将数组的所有元素连接成一个字符串。

```js
const arr = ['a', 'b', 'c'];
console.log(arr.join()); // 'a,b,c'
console.log(arr.join('')); // 'abc'
console.log(arr.join('-')); // 'a-b-c'
```

#### concat() - 合并

用于合并两个或多个数组，返回一个新数组。

```js
const arr1 = [1, 2];
const arr2 = [3, 4];
const arr3 = [5, 6];
const merged = arr1.concat(arr2, arr3);
console.log(merged); // [1, 2, 3, 4, 5, 6]

// 现代写法：使用扩展运算符
const merged2 = [...arr1, ...arr2, ...arr3];
```

#### fill() - 填充

用一个固定值填充数组中从起始索引到终止索引内的全部元素。

```js
const arr = [1, 2, 3, 4, 5];
arr.fill(0, 2, 4); // 从索引 2 到 4（不包括 4）填充 0
console.log(arr); // [1, 2, 0, 0, 5]

// 创建并填充数组
const zeros = new Array(5).fill(0);
console.log(zeros); // [0, 0, 0, 0, 0]
```

#### copyWithin() - 复制

浅复制数组的一部分到同一数组中的另一个位置，并返回它，不会改变原数组的长度。

```js
const arr = [1, 2, 3, 4, 5];
// 将索引 3 开始的元素复制到索引 0
arr.copyWithin(0, 3);
console.log(arr); // [4, 5, 3, 4, 5]
```

## 高级特性

### 扩展运算符

扩展运算符（`...`）可以将数组展开。

```js
// 展开数组
console.log(...[1, 2, 3]); // 1 2 3

// 后面还可以放置表达式
console.log([...(Math.random() > 0.5 ? [1, 2, 3] : [4, 5, 6])]);

// 如果扩展运算符后面是一个空数组，则不产生任何效果
console.log([1, ...[]]); // [1]

// 替代函数的 apply() 方法
console.log(Math.max.apply(null, [1, 2, 3])); // 3
console.log(Math.max(...[1, 2, 3])); // 3

// 能够正确识别四个字节的 Unicode 字符
console.log('👍'.length); // 2
console.log([...'👍'].length); // 1

// 任何定义了遍历器（Iterator）接口的对象，都可以用扩展运算符转为真正的数组
console.log([...new Set('hello')]); // ['h', 'e', 'l', 'o']
console.log([...new Map(Object.entries({ a: 1, b: 2 }))]); // [['a', 1], ['b', 2]]

// 类数组
console.log([...'hello world']); // ['h', 'e', 'l', 'l', 'o', ' ', 'w', 'o', 'r', 'l', 'd']

// 合并数组
const arr1 = [1, 2];
const arr2 = [3, 4];
const merged = [...arr1, ...arr2]; // [1, 2, 3, 4]

// 复制数组（浅拷贝）
const original = [1, 2, 3];
const copy = [...original];

// 与解构结合
const [first, ...rest] = [1, 2, 3, 4, 5];
console.log(first); // 1
console.log(rest); // [2, 3, 4, 5]
```

### 数组的空位

数组的空位指的是，数组的某一个位置没有任何值，比如 `Array()` 构造函数返回的数组都是空位。

空位不是 `undefined`，某一个位置的值等于 `undefined`，依然是有值的。空位是没有任何值，`in` 运算符可以说明这一点。

```js
console.log(0 in [undefined]); // true
console.log(0 in Array(1)); // false
```

ES6 则是明确将空位转为 `undefined`，拷贝和遍历都不会忽略。

- `Array.from()` 方法会将数组的空位，转为 `undefined`，也就是说，这个方法不会忽略空位。
- **扩展运算符（`...`）也会将空位转为 `undefined`**。
- `copyWithin()` 会连空位一起拷贝。
- `fill()` 会将空位视为正常的数组位置。
- `for...of` 循环也会遍历空位。
- `entries()`、`keys()`、`values()`、`find()` 和 `findIndex()` 会将空位处理成 `undefined`。

**建议：**应该避免出现空位，如果需要创建固定长度的数组，使用 `Array.from()` 或 `fill()`。

```js
// 避免
const arr1 = new Array(5); // [empty × 5]

// 推荐
const arr2 = Array.from({ length: 5 }, () => undefined); // [undefined, undefined, undefined, undefined, undefined]
const arr3 = new Array(5).fill(0); // [0, 0, 0, 0, 0]
```

### 数组拷贝

#### 浅拷贝

只复制数组的第一层，如果数组元素是对象，只会复制引用。

```js
// 方法 1：扩展运算符
const arr1 = [1, 2, 3, { a: 4 }];
const copy1 = [...arr1];

// 方法 2：slice()
const copy2 = arr1.slice();

// 方法 3：Array.from()
const copy3 = Array.from(arr1);

// 方法 4：concat()
const copy4 = [].concat(arr1);

// 验证浅拷贝
copy1[3].a = 5;
console.log(arr1[3].a); // 5，对象被共享
```

#### 深拷贝

完全复制数组及其所有嵌套的对象。

```js
// 方法 1：JSON 序列化（简单但有限制）
const arr = [1, 2, { a: 3 }];
const deepCopy1 = JSON.parse(JSON.stringify(arr));
// 限制：无法处理函数、undefined、Symbol、循环引用等

// 方法 2：递归复制
function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof Array) return obj.map((item) => deepClone(item));
  if (obj instanceof Object) {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [key, deepClone(value)]),
    );
  }
}

// 方法 3：使用 structuredClone()（现代浏览器支持）
const deepCopy2 = structuredClone(arr);
```

### 数组去重

```js
// 方法 1：使用 Set（最简洁）
const arr = [1, 2, 2, 3, 4, 4, 5];
const unique1 = [...new Set(arr)];
console.log(unique1); // [1, 2, 3, 4, 5]

// 方法 2：使用 filter()
const unique2 = arr.filter((item, index) => arr.indexOf(item) === index);

// 方法 3：使用 reduce()
const unique3 = arr.reduce((acc, item) => {
  if (!acc.includes(item)) acc.push(item);
  return acc;
}, []);

// 对象数组去重（根据某个属性）
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 1, name: 'Alice' },
];
const uniqueUsers = users.filter(
  (user, index, self) => index === self.findIndex((u) => u.id === user.id),
);
console.log(uniqueUsers); // [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]

// 或使用 Map
const uniqueUsers2 = [
  ...new Map(users.map((user) => [user.id, user])).values(),
];
```

## 深入理解

### 历史用法与技巧

> [JavaScript 有必要缓存 for 循环中的 Array.length 吗？](https://www.zhihu.com/question/29714976)

只要 Array 不是 NodeList 就差别不大，如果是 NodeList，缓存一下 length 会快很多，这个涉及到 live NodeList 的问题。

> [关于 foreach 循环的使用](https://www.zhihu.com/question/556786869)

foreach 因为设计的太早了，没考虑迭代器。

> JS 历史上有很多编程技巧

比方说，在前 ES6 时代流行用 `new Array(n + 1).join(str)` 的 trick 来达成现在 `str.repeat(n)` 的效果，这个 case 里当然就没有容量什么事情。固然这个 trick 效率差，即使一定要用，也可以写成 `[].join.call({length: n + 1}, str)`，但引擎没法帮程序员改代码，也没法改变大量已经存在的代码。

类似的 trick 还有 `Array.apply(null, new Array(n)).map(fn)` 来进行类似现在 `Array.from({length: n}, fn)` 的初始化。

在这些类似的用法里，实际并不需要创建一个真的数组，而是只需要一个所谓的 `ArrayLike`，也就是一个具有数字 `length` 属性的对象 `{length: n}`，且用后即抛（马上被垃圾回收），但开发者顺手就写成了 `new Array(n)`。

**现代替代方案：**

```js
// 旧：重复字符串
new Array(5 + 1).join('*'); // '*****'
// 新
'*'.repeat(5); // '*****'

// 旧：创建并初始化数组
Array.apply(null, new Array(5)).map((_, i) => i); // [0, 1, 2, 3, 4]
// 新
Array.from({ length: 5 }, (_, i) => i); // [0, 1, 2, 3, 4]
```

### 底层实现

- [探究 JS V8 引擎下的 "数组" 底层实现](https://zhuanlan.zhihu.com/p/96959371)
- [从 Chrome 源码看 JS Array 的实现](https://zhuanlan.zhihu.com/p/26388217)
- [为什么 JS 没有 Array 初始大小和扩容的概念？](https://www.zhihu.com/question/385711203)

V8 引擎对数组有两种存储方式：

1. **Fast Elements（快速元素）**：连续的内存存储，类似传统数组
2. **Dictionary Elements（字典元素）**：哈希表存储，类似对象

当数组比较稀疏或者有大量非数字索引时，会切换到字典模式以节省内存。
