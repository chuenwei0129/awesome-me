# 数组

## 扩展运算符

```js
// 扩展运算符后面还可以放置表达式
// 如果扩展运算符后面是一个空数组，则不产生任何效果
console.log([...(Math.random() > 0.5 ? [1, 2, 3] : [4, 5, 6]), ...[]])

// 替代函数的 apply() 方法
console.log(Math.max.apply(null, [1, 2, 3])) // 3
console.log(Math.max(...[1, 2, 3])) // 3

// 能够正确识别四个字节的 Unicode 字符
console.log('👍'.length) // 2
console.log([...'👍'].length) // 1

// 任何定义了遍历器（Iterator）接口的对象，都可以用扩展运算符转为真正的数组
console.log([...new Set('hello')]) // ['h', 'e', 'l', 'o']
console.log([...new Map(Object.entries({ a: 1, b: 2 }))]) // [['a', 1], ['b', 2]]

// 类数组
console.log([...'hello world']) // ['h', 'e', 'l', 'l', 'o', ' ', 'w', 'o', 'r', 'l', 'd']
```

### Array.from()

`Array.from()` 方法用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）

```js
// 如果参数是一个真正的数组，Array.from()会返回一个一模一样的新数组。
console.log(Array.from([1, 2, 3])) // [1, 2, 3]

// 所谓类似数组的对象，本质特征只有一点，即必须有 length 属性。
console.log(Array.from({ length: 3 })) // [undefined, undefined, undefined]

// Array.from() 还可以接受一个函数作为第二个参数，作用类似于数组的 map() 方法，用来对每个元素进行处理，将处理后的值放入返回的数组。
console.log(Array.from([1, 2, 3], x => x ** x)) // [1, 4, 27]
// 如果 map() 函数里面用到了 this 关键字，还可以传入 Array.from() 的第三个参数，用来绑定 this
// 它也能正确处理各种 Unicode 字符
```

### Array.of()

`Array.of()` 方法用于将一组值，转换为数组。

```js
Array.of(3, 11, 8) // [3,11,8]
Array.of(3) // [3]
Array.of(3).length // 1
```

这个方法的主要目的，是弥补数组构造函数 `Array()` 的不足。因为参数个数的不同，会导致 `Array()` 的行为有差异。

```js
Array() // []
Array(3) // [, , ,]
Array(3, 11, 8) // [3, 11, 8]
```

### 实例方法：entries()，keys() 和 values()

```js
// Array.prototype.keys() Array.prototype.values() Array.prototype.entries()
const arr2 = ['a', 'b', 'c']
for (let index of arr2.keys()) {
  console.log(index) // 0 1 2
}
for (let value of arr2.values()) {
  console.log(value) // a b c
}
for (let [index, value] of arr2.entries()) {
  console.log(index, value) // 0 a 1 b 2 c
}

// at()
console.log(arr2.at(-1)) // c
```

### 数组的空位

数组的空位指的是，数组的某一个位置没有任何值，比如 `Array()` 构造函数返回的数组都是空位。

空位不是 `undefined`，某一个位置的值等于 `undefined`，依然是有值的。空位是没有任何值，`in` 运算符可以说明这一点。

```js
console.log(0 in [undefined]) // true
console.log(0 in Array(1)) // false
```

ES6 则是明确将空位转为 `undefined`，拷贝和遍历都不会忽略。

- `Array.from()` 方法会将数组的空位，转为 `undefined`，也就是说，这个方法不会忽略空位。
- 扩展运算符（`...`）也会将空位转为`undefined`。
- `copyWithin()` 会连空位一起拷贝。
- `fill()` 会将空位视为正常的数组位置。
- `for...of` 循环也会遍历空位。
- `entries()`、`keys()`、`values()`、`find()` 和 `findIndex()` 会将空位处理成 `undefined`。

## 奇技淫巧

> [JavaScript 有必要缓存 for 循环中的 Array.length 吗？](https://www.zhihu.com/question/29714976)

JS 历史上有很多奇技淫巧。

比方说，在前 ES6 时代流行用 `new Array(n + 1).join(str)` 的 trick 来达成现在 `str.repeat(n)` 的效果，这个 case 里当然就没有容量什么事情。固然这个 trick 效率差，即使一定要用，也可以写成 `[].join.call({length: n + 1}, str)`，但引擎没法帮程序员改代码，也没法改变大量已经存在的代码。

类似的 trick 还有 `Array.apply(null, new Array(n)).map(fn)` 来进行类似现在 `Array.from({length: n}, fn)` 的初始化。

在这些类似的用法里，实际并不需要创建一个真的数组，而是只需要一个所谓的 `ArrayLike`，也就是一个具有数字 `length` 属性的对象 `{length: n}`，且用后即抛（马上被垃圾回收），但开发者顺手就写成了 `new Array(n)`。

## [JavaScript 里的 Array 为什么能直接添加属性？](https://www.zhihu.com/question/408959053/answer/1360392908)

> **可以从 3 个角度来看待这个问题：**

**JSArray 继承 JSObject：**

```c++
// The JSArray describes JavaScript Arrays
//  Such an array can be in one of two modes:
//    - fast, backing storage is a FixedArray and length <= elements.length();
//       Please note: push and pop can be used to grow and shrink the array.
//    - slow, backing storage is a HashTable with numbers as keys.
class JSArray : public JSObject {
public:
  // [length]: The length property.
  DECL_ACCESSORS(length, Object)
}
```

JavaScript 的数组是 V8 中的 JSArray，JavaScript 的对象是 V8 中 JSObject，**JSArray 是 JSObject 的子类**。既然 JavaScript 对象可以动态添加属性，从继承的角度来说，数组应该也可以。

**JavaScript 的数组不是严格意义上的数组：**

```js
let list = []
list[9999999999999999999999999999999999999] = 2
// 1024 * 1024 * 1024 * 8 === 8589934592 // true，8G 也就这么大
```

我的电脑肯定没有足够的内存存储长度为 9999999999999999999999999999999999999 的数组，list 表面是数组，**底层数据结构明显是一个哈希表**。做为哈希表，添加属性 a、b 是很正常的行为。

**JavaScript 数组相关的内置方法也是动态添加的：**

V8 启动时，会为 `Array` 添加 `isArray`、`from`、`of` 属性，为 `Array.prototype` 添加 `concat`、`map`、`forEach` 等前端们耳熟能详的属性。

## 底层实现

- [探究 JS V8 引擎下的 “数组” 底层实现](https://zhuanlan.zhihu.com/p/96959371)
- [从 Chrome 源码看 JS Array 的实现](https://zhuanlan.zhihu.com/p/26388217)
- [为什么 JS 没有 Array 初始大小和扩容的概念?](https://www.zhihu.com/question/385711203)
