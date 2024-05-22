---
title: Set 和 Map
order: 11
toc: content
group:
  title: 深入浅出
---

# Set 和 Map

## Set

ES6 提供了新的数据结构 `Set`。它类似于数组，但是成员的值都是唯一的，没有重复的值。

`Set` 函数可以接受一个数组 (或者具有 iterable 接口的其他数据结构) 作为参数，用来初始化。

```js
const arrLike = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3,
}

// 报错
const s = new Set(arrLike)
console.log(s) // TypeError: object is not iterable (cannot read property Symbol(Symbol.iterator))

// 数组做为参数
const s = new Set(Array.from(arrLike))
console.log(s) // Set(3) { 'a', 'b', 'c' }
```

向 `Set` 加入值的时候，**不会发生类型转换**，`Set` 内部判断两个值是否不同，使用的算法叫做 “Same-value-zero equality”，它类似于精确相等运算符 (===)，主要的区别是**向 `Set` 加入值时认为 NaN 等于自身，而精确相等运算符认为 NaN 不等于自身。**

![20230228165227](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/others/20230228165227.png)

**Set 实例的属性和方法：**

- `Set.prototype.constructor`：构造函数，默认就是 Set 函数。
- `Set.prototype.size`：返回 `Set` 实例的成员总数。
- `Set.prototype.add(value)`：添加某个值，返回 `Set` 结构本身。
- `Set.prototype.delete(value)`：删除某个值，返回一个布尔值，表示删除是否成功。
- `Set.prototype.has(value)`：返回一个布尔值，表示该值是否为 `Set` 的成员。
- `Set.prototype.clear()`：清除所有成员，没有返回值。
- `Set.prototype.keys()`：返回键名的遍历器
- `Set.prototype.values()`：返回键值的遍历器
- `Set.prototype.entries()`：返回键值对的遍历器
- `Set.prototype.forEach()`：使用回调函数遍历每个成员

```js
// Set 结构的实例默认可遍历，它的默认遍历器生成函数就是它的 values 方法。
Set.prototype[Symbol.iterator] === Set.prototype.values // true
```

## Map

ES6 提供了 `Map` 数据结构。**它类似于对象，也是键值对的集合，但是 “键” 的范围不限于字符串，各种类型的值 (包括对象) 都可以当作键**。

任何具有 Iterator 接口、且每个成员都是一个双元素的数组的数据结构都可以当作 `Map` 构造函数的参数。

```js
const s1 = new Set([
  [1, 2],
  [3, 4],
])

console.log(s1) // Set(2) { [1, 2], [3, 4] }
const m1 = new Map(s1)
console.log(m1) // Map(2) { 1 => 2, 3 => 4 }
```

如果 `Map` 的键是一个简单类型的值 (数字、字符串、布尔值)，则只要两个值严格相等 (行为同 `Object.is()`)，`Map` 将其视为一个键。

对于对象，`Map` 的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键。

**实例的属性和操作方法：**

- `size` 属性返回 `Map` 结构的成员总数。
- `set` 方法设置键名 `key` 对应的键值为 `value`，然后返回整个 `Map` 结构。如果 `key` 已经有值，则键值会被更新，否则就新生成该键。
- `get` 方法读取 `key` 对应的键值，如果找不到 `key`，返回 `undefined`。
- `has` 方法返回一个布尔值，表示某个键是否在当前 `Map` 对象之中。
- `delete` 方法删除某个键，返回 `true`。如果删除失败，返回 `false`。
- `clear` 方法清除所有成员，没有返回值。
- `Map.prototype.keys()`：返回键名的遍历器。
- `Map.prototype.values()`：返回键值的遍历器。
- `Map.prototype.entries()`：返回所有成员的遍历器。
- `Map.prototype.forEach()`：遍历 `Map` 的所有成员。

> 需要特别注意的是，`Map` 的遍历顺序就是插入顺序。

```js
// 对同一个键多次赋值，后面的值将覆盖前面的值。
m1.set(NaN, 1)
m1.set(NaN, 2)
console.log(m1) // Map(2) { 1 => 2, 3 => 4, NaN => 2 }

// 只有对同一个对象的引用，Map 结构才将其视为同一个键。
let o = { a: 1 }
let o1 = { a: 1 }
let o2 = o
m1.set(o, 1)
m1.set(o1, 2)
m1.set(o2, 3)

console.log(m1) // Map(3) { 1 => 2, 3 => 4, NaN => 2, { a: 1 } => 3, { a: 1 } => 2  }

// 如果读取一个未知的键，则返回 `undefined`。
console.log(m1.get('c')) // undefined

// 需要特别注意的是，Map 的遍历顺序就是插入顺序。
for (const it of m1.keys()) {
  console.log(it) // 1, 3, NaN, { a: 1 }, { a: 1 }
}
```

## WeakMap 和 WeakSet

JavaScript 引擎在值 “可达” 和可能被使用时会将其保持在内存中。

```js
let john = { name: 'John' }
// 该对象能被访问，john 是它的引用
// 覆盖引用
john = null
// 该对象将会被从内存中清除
```

如果把一个对象放入到数组中，那么只要这个数组存在，那么这个对象也就存在，即使没有其他对该对象的引用。

```js
let john = { name: 'John' }
let array = [john]
john = null // 覆盖引用

// 前面由 john 所引用的那个对象被存储在了 array 中
// 所以它不会被垃圾回收机制回收
// 我们可以通过 array[0] 获取到它
```

类似的，**如果我们使用对象作为常规 Map 的键，那么当 Map 存在时，该对象也将存在。它会占用内存**，并且应该不会被 (垃圾回收机制) 回收。

```js
let john = { name: 'John' }
let map = new Map()
map.set(john, '...')
john = null // 覆盖引用
// john 被存储在了 map 中，
// 我们可以使用 map.keys() 来获取它
```

`WeakMap` 在这方面有着根本上的不同。它不会阻止垃圾回收机制对作为键的对象 (key object) 的回收。

```js
let john = { name: 'John' }
let weakMap = new WeakMap()
weakMap.set(john, '...')
john = null // 覆盖引用
// john 被从内存中删除了！
```

WeakMap 与 Map 的区别有两点。

1. 首先，`WeakMap` 只接受对象作为键名，不接受其他类型的值作为键名。
2. 其次，`WeakMap` 的键名所指向的对象，不计入垃圾回收机制。

`WeakMap` 与 `Map` 在 API 上的区别主要是两个，一是没有遍历操作 (即没有 `keys()`、`values()` 和 `entries()` 方法)，也没有 `size` 属性。二是无法清空，即不支持 `clear` 方法。因此，`WeakMap` 只有四个方法可用：`get()`、`set()`、`has()`、`delete()`。

`WeakSet` 结构与 `Set` 类似，也是不重复的值的集合。但是，它与 `Set` 有两个区别。

1. 首先，`WeakSet` 的成员只能是对象，而不能是其他类型的值。
2. 其次，`WeakSet` 中的对象都是弱引用，即垃圾回收机制不考虑 `WeakSet` 对该对象的引用。

**`WeakSet` 没有 `size` 属性，没有办法遍历它的成员。**

`WeakSet` 结构有以下三个方法。

- **WeakSet.prototype.add(value)**：向 `WeakSet` 实例添加一个新成员。
- **WeakSet.prototype.delete(value)**：清除 `WeakSet` 实例的指定成员。
- **WeakSet.prototype.has(value)**：返回一个布尔值，表示某个值是否在 `WeakSet` 实例之中。

## WeakRef

`WeakSet` 和 `WeakMap` 是基于弱引用的数据结构，ES2021 更进一步，提供了 `WeakRef` 对象，用于直接创建对象的弱引用。

```js
let target = { a: 1 }
let wr = new WeakRef(target)

// 如果原始对象存在，该方法返回原始对象；如果原始对象已经被垃圾回收机制清除，该方法返回 undefined。
let target_origin = wr.deref()

if (target_origin) {
  console.log(wr.deref()) // { a: 1 }
}
```

上面示例中，`target` 是原始对象，构造函数 `WeakRef()` 创建了一个基于 `target` 的新对象 `wr`。这里，`wr` 就是一个 `WeakRef` 的实例，属于对 `target` 的弱引用，垃圾回收机制不会计入这个引用，也就是说，`wr` 的引用不会妨碍原始对象 `target` 被垃圾回收机制清除。

## 拓展知识

- [WeakMap 本身释放，而 keyObject 没有释放的情况下，value 会释放吗？](https://www.zhihu.com/question/344771857/answer/817061579)
- [JavaScript 中 map 和 set 为啥是有序的？](https://www.zhihu.com/question/543282694/answer/2575478293)
- [JavaScript 的 Proxy 怎代理 Map？](https://www.zhihu.com/question/426875859)
