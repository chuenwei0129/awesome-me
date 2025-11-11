---
group:
  title: javaScript
  order: 3
title: Set 和 Map
toc: content
order: 11
---

## Set

### 基本概念

ES6 提供了新的数据结构 `Set`。它类似于数组，但是成员的值都是唯一的，没有重复的值。

`Set` 函数可以接受一个数组（或者具有 iterable 接口的其他数据结构）作为参数，用来初始化。

```js
const arrLike = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3,
};

// ❌ 报错：类数组对象没有迭代器接口
try {
  const s1 = new Set(arrLike);
} catch (error) {
  console.log(error.message); // TypeError: object is not iterable
}

// ✅ 正确：先转换为数组
const s2 = new Set(Array.from(arrLike));
console.log(s2); // Set(3) { 'a', 'b', 'c' }

// ✅ 从数组创建 Set
const s3 = new Set([1, 2, 3, 3, 4]);
console.log(s3); // Set(4) { 1, 2, 3, 4 }
```

### 值的比较规则

向 `Set` 加入值的时候，**不会发生类型转换**，`Set` 内部判断两个值是否不同，使用的算法叫做 "Same-value-zero equality"，它类似于精确相等运算符（===），主要的区别是**向 `Set` 加入值时认为 NaN 等于自身，而精确相等运算符认为 NaN 不等于自身。**

```js
const set = new Set();

// NaN 被视为相同的值
set.add(NaN);
set.add(NaN);
console.log(set.size); // 1

// 对象总是不相等的
set.add({});
set.add({});
console.log(set.size); // 3

// +0 和 -0 被视为相同的值
set.add(+0);
set.add(-0);
console.log(set.size); // 4
```

![20230228165227](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/others/20230228165227.png)

### 实例的属性和方法

**操作方法：**

- `Set.prototype.add(value)`：添加某个值，返回 `Set` 结构本身。
- `Set.prototype.delete(value)`：删除某个值，返回一个布尔值，表示删除是否成功。
- `Set.prototype.has(value)`：返回一个布尔值，表示该值是否为 `Set` 的成员。
- `Set.prototype.clear()`：清除所有成员，没有返回值。

**属性：**

- `Set.prototype.constructor`：构造函数，默认就是 Set 函数。
- `Set.prototype.size`：返回 `Set` 实例的成员总数。

**遍历方法：**

- `Set.prototype.keys()`：返回键名的遍历器
- `Set.prototype.values()`：返回键值的遍历器
- `Set.prototype.entries()`：返回键值对的遍历器
- `Set.prototype.forEach()`：使用回调函数遍历每个成员

```js
const set = new Set(['red', 'green', 'blue']);

// add 方法返回 Set 本身，可以链式调用
set.add('yellow').add('orange');

// has 方法检查成员是否存在
console.log(set.has('red')); // true
console.log(set.has('black')); // false

// delete 方法删除成员
console.log(set.delete('red')); // true
console.log(set.delete('red')); // false（已经不存在）

// size 属性
console.log(set.size); // 4
```

```js
// Set 结构的实例默认可遍历，它的默认遍历器生成函数就是它的 values 方法。
Set.prototype[Symbol.iterator] === Set.prototype.values; // true

// 因此可以直接用 for...of 遍历
const set = new Set(['a', 'b', 'c']);
for (const item of set) {
  console.log(item); // 'a', 'b', 'c'
}
```

### 常见应用场景

**1. 数组去重**

```js
// 最简单的数组去重方法
const arr = [1, 2, 2, 3, 4, 4, 5];
const uniqueArr = [...new Set(arr)];
console.log(uniqueArr); // [1, 2, 3, 4, 5]

// 字符串去重
const str = 'ababbc';
const uniqueStr = [...new Set(str)].join('');
console.log(uniqueStr); // 'abc'
```

**2. 数组的交集、并集、差集**

```js
const a = new Set([1, 2, 3]);
const b = new Set([2, 3, 4]);

// 并集
const union = new Set([...a, ...b]);
console.log(union); // Set(4) { 1, 2, 3, 4 }

// 交集
const intersect = new Set([...a].filter((x) => b.has(x)));
console.log(intersect); // Set(2) { 2, 3 }

// 差集（a 相对于 b 的差集）
const difference = new Set([...a].filter((x) => !b.has(x)));
console.log(difference); // Set(1) { 1 }
```

**3. 使用 Set 实现简单的数据过滤**

```js
// 移除数组中的假值
const arr = [0, 1, false, 2, '', 3, null, undefined, NaN];
const filtered = [...new Set(arr)].filter(Boolean);
console.log(filtered); // [1, 2, 3]
```

## Map

### 基本概念

ES6 提供了 `Map` 数据结构。**它类似于对象，也是键值对的集合，但是 "键" 的范围不限于字符串，各种类型的值（包括对象）都可以当作键**。

**Map 与 Object 的区别：**

| 特性     | Map                  | Object                                 |
| -------- | -------------------- | -------------------------------------- |
| 键的类型 | 任意类型             | 字符串或 Symbol                        |
| 键的顺序 | 按插入顺序           | 无序（ES2015+ 有部分顺序保证）         |
| 大小获取 | `map.size`           | 需要手动计算 `Object.keys(obj).length` |
| 迭代     | 原生可迭代           | 需要使用 `Object.keys()` 等            |
| 性能     | 频繁增删操作性能更好 | 适合静态数据存储                       |
| 默认键   | 无默认键             | 继承自原型的键                         |

### 创建 Map

任何具有 Iterator 接口、且每个成员都是一个双元素的数组的数据结构都可以当作 `Map` 构造函数的参数。

```js
// 从二维数组创建
const map1 = new Map([
  ['name', '张三'],
  ['age', 18],
]);
console.log(map1); // Map(2) { 'name' => '张三', 'age' => 18 }

// 从 Set 创建
const set = new Set([
  [1, 2],
  [3, 4],
]);
const map2 = new Map(set);
console.log(map2); // Map(2) { 1 => 2, 3 => 4 }

// 从另一个 Map 创建（复制）
const map3 = new Map(map1);
console.log(map3); // Map(2) { 'name' => '张三', 'age' => 18 }
```

### 键的比较规则

如果 `Map` 的键是一个简单类型的值（数字、字符串、布尔值），则只要两个值严格相等（行为类似 `Object.is()`），`Map` 将其视为一个键。

对于对象，`Map` 的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键。

```js
const map = new Map();

// NaN 被视为同一个键
map.set(NaN, 'value1');
map.set(NaN, 'value2');
console.log(map.size); // 1
console.log(map.get(NaN)); // 'value2'

// +0 和 -0 被视为同一个键
map.set(+0, 'zero1');
map.set(-0, 'zero2');
console.log(map.size); // 2
console.log(map.get(+0)); // 'zero2'

// 对象键：不同的对象被视为不同的键
const obj1 = { a: 1 };
const obj2 = { a: 1 };
const obj3 = obj1;

map.set(obj1, 'value1');
map.set(obj2, 'value2');
map.set(obj3, 'value3'); // 覆盖 obj1 的值

console.log(map.size); // 4（NaN, +0/-0, obj1, obj2）
console.log(map.get(obj1)); // 'value3'
console.log(map.get(obj2)); // 'value2'
```

### 实例的属性和方法

**基本操作：**

- `map.set(key, value)`：设置键值对，返回整个 Map 结构（支持链式调用）
- `map.get(key)`：读取键对应的值，找不到返回 `undefined`
- `map.has(key)`：返回布尔值，表示某个键是否存在
- `map.delete(key)`：删除某个键，返回布尔值表示是否成功
- `map.clear()`：清除所有成员，无返回值

**属性：**

- `map.size`：返回成员总数

**遍历方法：**

- `map.keys()`：返回键名的遍历器
- `map.values()`：返回键值的遍历器
- `map.entries()`：返回键值对的遍历器
- `map.forEach()`：遍历所有成员

```js
const map = new Map();

// set 方法返回 Map 本身，可以链式调用
map.set('name', '李四').set('age', 20).set('gender', 'male');

// get 方法读取键值
console.log(map.get('name')); // '李四'
console.log(map.get('unknown')); // undefined

// has 方法检查键是否存在
console.log(map.has('age')); // true
console.log(map.has('address')); // false

// delete 方法删除键
console.log(map.delete('gender')); // true
console.log(map.size); // 2

// 遍历 Map
for (const [key, value] of map) {
  console.log(key, value);
}
// 'name' '李四'
// 'age' 20
```

> **注意：Map 的遍历顺序就是插入顺序。**

### 常见应用场景

**1. 使用对象作为键**

```js
// DOM 节点作为键，存储相关数据
const domData = new Map();
const button = document.querySelector('button');
domData.set(button, { clickCount: 0 });

button.addEventListener('click', () => {
  const data = domData.get(button);
  data.clickCount++;
});
```

**2. 缓存计算结果**

```js
const cache = new Map();

function fibonacci(n) {
  if (n <= 1) return n;

  if (cache.has(n)) {
    return cache.get(n);
  }

  const result = fibonacci(n - 1) + fibonacci(n - 2);
  cache.set(n, result);
  return result;
}

console.log(fibonacci(10)); // 55
```

**3. 对象与数据的关联**

```js
// 为对象添加元数据，不污染对象本身
const metadata = new Map();
const user1 = { name: 'Alice' };
const user2 = { name: 'Bob' };

metadata.set(user1, { lastLogin: '2024-01-01', role: 'admin' });
metadata.set(user2, { lastLogin: '2024-01-02', role: 'user' });

console.log(metadata.get(user1)); // { lastLogin: '2024-01-01', role: 'admin' }
```

**4. 统计字符出现频率**

```js
function countChars(str) {
  const map = new Map();
  for (const char of str) {
    map.set(char, (map.get(char) || 0) + 1);
  }
  return map;
}

const result = countChars('hello');
console.log(result); // Map(4) { 'h' => 1, 'e' => 1, 'l' => 2, 'o' => 1 }
```

## WeakMap 和 WeakSet

### 垃圾回收机制基础

JavaScript 引擎在值 "可达" 和可能被使用时会将其保持在内存中。

```js
let john = { name: 'John' };
// 该对象能被访问，john 是它的引用

// 覆盖引用
john = null;
// 该对象将会被从内存中清除（垃圾回收）
```

如果把一个对象放入到数组中，那么只要这个数组存在，那么这个对象也就存在，即使没有其他对该对象的引用。

```js
let john = { name: 'John' };
let array = [john];
john = null; // 覆盖引用

// 前面由 john 所引用的那个对象被存储在了 array 中
// 所以它不会被垃圾回收机制回收
// 我们仍可以通过 array[0] 获取到它
console.log(array[0]); // { name: 'John' }
```

类似的，**如果我们使用对象作为常规 Map 的键，那么当 Map 存在时，该对象也将存在。它会占用内存**，并且不会被垃圾回收机制回收。

```js
let john = { name: 'John' };
let map = new Map();
map.set(john, '...');

john = null; // 覆盖引用

// john 被存储在了 map 中
// 我们可以使用 map.keys() 来获取它
for (let key of map.keys()) {
  console.log(key); // { name: 'John' }
}
```

### WeakMap

`WeakMap` 在这方面有着根本上的不同。**它不会阻止垃圾回收机制对作为键的对象的回收。**

```js
let john = { name: 'John' };
let weakMap = new WeakMap();
weakMap.set(john, '...');

john = null; // 覆盖引用
// john 被从内存中删除了！
// weakMap 中的对应项也会被自动清除
```

**WeakMap 与 Map 的区别：**

这是两者最重要的区别！让我们通过一个例子来理解：

```js
let map = new Map();
let weakMap = new WeakMap();

(function () {
  let obj1 = { id: 1 };
  let obj2 = { id: 2 };

  map.set(obj1, 'data1');
  weakMap.set(obj2, 'data2');

  // 函数结束时，obj1 和 obj2 都应该被销毁
  // 但由于 Map 保持强引用，obj1 无法被垃圾回收
  // 而 WeakMap 的弱引用允许 obj2 被正确回收
})();

// 此时，map 仍然保留着数据，可能导致内存泄漏
// 而 weakMap 中的数据可能已经被清理
```

| 特性       | WeakMap                 | Map                                                  |
| ---------- | ----------------------- | ---------------------------------------------------- |
| 键的类型   | 只能是对象（或 Symbol） | 任意类型                                             |
| 垃圾回收   | 键对象可被回收          | 键对象不会被回收                                     |
| 遍历       | 不支持遍历              | 支持遍历                                             |
| size 属性  | 无                      | 有                                                   |
| clear 方法 | 无                      | 有                                                   |
| 可用方法   | get/set/has/delete      | get/set/has/delete/clear/keys/values/entries/forEach |

**可用的方法：**

- `weakMap.get(key)`：获取值
- `weakMap.set(key, value)`：设置值
- `weakMap.has(key)`：检查键是否存在
- `weakMap.delete(key)`：删除键值对

**典型应用场景：**

**1. 存储额外数据（不影响垃圾回收）**

```js
// 为 DOM 元素存储数据，元素删除时自动清理
const privateData = new WeakMap();

class Component {
  constructor(element) {
    privateData.set(element, {
      clickCount: 0,
      lastClickTime: null,
    });
  }

  handleClick(element) {
    const data = privateData.get(element);
    data.clickCount++;
    data.lastClickTime = Date.now();
  }
}

// 当 DOM 元素被移除时，相关数据会被自动清理
```

**2. 缓存计算结果**

```js
const cache = new WeakMap();

function process(obj) {
  if (cache.has(obj)) {
    return cache.get(obj);
  }

  const result = /* 复杂计算 */ obj.value * 2;
  cache.set(obj, result);
  return result;
}

// 当对象不再被使用时，缓存会自动清理
```

**3. 私有属性实现**

```js
const privateProps = new WeakMap();

class Person {
  constructor(name, age) {
    privateProps.set(this, { name, age });
  }

  getName() {
    return privateProps.get(this).name;
  }

  getAge() {
    return privateProps.get(this).age;
  }
}

const person = new Person('Alice', 25);
console.log(person.getName()); // 'Alice'
// 外部无法直接访问 name 和 age
```

### WeakSet

`WeakSet` 结构与 `Set` 类似，也是不重复的值的集合。

**WeakSet 与 Set 的区别：**

| 特性       | WeakSet                 | Set                                              |
| ---------- | ----------------------- | ------------------------------------------------ |
| 成员类型   | 只能是对象（或 Symbol） | 任意类型                                         |
| 垃圾回收   | 成员可被回收            | 成员不会被回收                                   |
| 遍历       | 不支持遍历              | 支持遍历                                         |
| size 属性  | 无                      | 有                                               |
| clear 方法 | 无                      | 有                                               |
| 可用方法   | add/has/delete          | add/has/delete/clear/keys/values/entries/forEach |

**可用的方法：**

- `weakSet.add(value)`：添加成员
- `weakSet.has(value)`：检查成员是否存在
- `weakSet.delete(value)`：删除成员

**典型应用场景：**

**1. 标记对象（不影响垃圾回收）**

```js
const visitedNodes = new WeakSet();

function traverse(node) {
  if (visitedNodes.has(node)) {
    return; // 避免循环引用
  }

  visitedNodes.add(node);

  // 处理节点
  if (node.children) {
    node.children.forEach(traverse);
  }
}
```

**2. 禁止对象被重复处理**

```js
const disabledElements = new WeakSet();

function disableElement(element) {
  if (disabledElements.has(element)) {
    return;
  }

  disabledElements.add(element);
  element.disabled = true;
}
```

## WeakRef

### 基本概念

`WeakSet` 和 `WeakMap` 是基于弱引用的数据结构，ES2021 更进一步，提供了 `WeakRef` 对象，用于直接创建对象的弱引用。

```js
let target = { a: 1 };
let wr = new WeakRef(target);

// 使用 deref() 方法访问原始对象
// 如果原始对象存在，该方法返回原始对象
// 如果原始对象已经被垃圾回收机制清除，该方法返回 undefined
let targetOrigin = wr.deref();

if (targetOrigin) {
  console.log(targetOrigin); // { a: 1 }
} else {
  console.log('对象已被回收');
}
```

**说明：**

上面示例中，`target` 是原始对象，构造函数 `WeakRef()` 创建了一个基于 `target` 的新对象 `wr`。这里，`wr` 就是一个 `WeakRef` 的实例，属于对 `target` 的弱引用，垃圾回收机制不会计入这个引用，也就是说，`wr` 的引用不会妨碍原始对象 `target` 被垃圾回收机制清除。

**使用注意：**

```js
let target = { name: 'example' };
let wr = new WeakRef(target);

// 清除强引用
target = null;

// ⚠️ 注意：对象不会立即被回收
// deref() 可能仍然返回对象，也可能返回 undefined
// 这取决于垃圾回收器何时运行
const obj = wr.deref();
if (obj) {
  console.log('对象仍然存在');
} else {
  console.log('对象已被回收');
}
```

> ⚠️ **警告：** 应当尽量避免使用 WeakRef，因为它的行为很难预测，依赖于垃圾回收器的具体实现。只在确实需要的场景中使用。

## 数据结构选择指南

根据不同的使用场景，选择合适的数据结构：

| 场景               | 推荐使用 | 原因                   |
| ------------------ | -------- | ---------------------- |
| 数组去重           | Set      | 自动去重，性能好       |
| 需要任意类型的键   | Map      | 键类型不受限制         |
| 频繁的增删操作     | Map/Set  | 比 Object/Array 性能好 |
| 需要按插入顺序遍历 | Map/Set  | 保持插入顺序           |
| 临时关联 DOM 元素  | WeakMap  | 自动清理，防止内存泄漏 |
| 标记对象状态       | WeakSet  | 不影响对象生命周期     |
| 实现私有属性       | WeakMap  | 外部无法访问           |
| 需要遍历所有成员   | Map/Set  | Weak 版本不支持遍历    |
| 简单的键值存储     | Object   | 语法简单，适合静态数据 |

**性能考虑：**

- **查找速度：** Set/Map 的 `has()` 操作平均时间复杂度为 O(1)，比数组的 `includes()` O(n) 快
- **插入删除：** Map/Set 在频繁增删场景下比 Object/Array 性能更好
- **内存占用：** Weak 版本在对象不再使用时会自动释放，有助于避免内存泄漏

## 扩展知识

- [WeakMap 本身释放，而 keyObject 没有释放的情况下，value 会释放吗？](https://www.zhihu.com/question/344771857/answer/817061579)
- [JavaScript 中 map 和 set 为啥是有序的？](https://www.zhihu.com/question/543282694/answer/2575478293)
- [JavaScript 的 Proxy 怎代理 Map？](https://www.zhihu.com/question/426875859)
