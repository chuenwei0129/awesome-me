---
title: Iterator 和 Generator
order: 10
toc: content
group:
  title: 深入浅出
---

# Iterator 和 Generator

## Iterator

Iterator 接口的目的，就是**为所有数据结构，提供了一种统一的访问机制**，即 `for...of` 循环。当使用 `for...of` 循环遍历某种数据结构时，该循环会自动去寻找 Iterator 接口。

ES6 规定，默认的 Iterator 接口部署在数据结构的 `Symbol.iterator` 属性，或者说，一个数据结构只要具有 `Symbol.iterator` 属性，就可以认为是 “可遍历的”。

`Symbol.iterator` 属性**本身是一个函数**，就是当前数据结构默认的遍历器生成函数。**执行这个属性，会返回一个遍历器对象**。该对象的根本特征就是具有 `next` 方法。每次调用 `next` 方法，都会返回一个代表当前成员的信息对象，具有 `value` 和 `done` 两个属性。`value` 属性返回当前位置的成员，`done` 属性是一个布尔值，表示遍历是否结束，即是否还有必要再一次调用 `next` 方法。

> 对于遍历器对象来说，`done: false` 和 `value: undefined` 属性都是可以省略的。

**原生具备 `Iterator` 接口的数据结构如下**。

- **Array**
- **Map**
- **Set**
- **String**
- **TypedArray**
- **arguments**
- **NodeList**

**对象如果要具备可被 `for...of` 循环调用的 Iterator 接口**，就必须在 `Symbol.iterator` 的属性上部署遍历器生成方法 (**原型链上的对象具有该方法也可**)。

对于类似数组的对象 (存在数值键名和 length 属性)，部署 Iterator 接口，有一个简便方法，就是 **`Symbol.iterator` 方法直接引用数组的 Iterator 接口**。

**调用 Iterator 接口的场合：**

有一些场合会默认调用 Iterator 接口 (即 `Symbol.iterator` 方法)，除了 `for...of` 循环，还有几个别的场合。

1. 解构赋值
2. 扩展运算符
3. **`yield*`**：`yield*` 后面跟的是一个可遍历的结构，它会调用该结构的遍历器接口。
4. 由于数组的遍历会调用遍历器接口，所以任何接受数组作为参数的场合，其实都调用了遍历器接口。
   - `for...of`
   - `Array.from()`
   - `Map()`, `Set()`, `WeakMap()`, `WeakSet()`
   - `Promise.all()`
   - `Promise.race()`

遍历器对象除了具有 `next()` 方法，还可以具有 `return()` 方法和 `throw()` 方法。如果你自己写遍历器对象生成函数，那么 **`next()` 方法是必须部署的，`return()` 方法和 `throw()` 方法是否部署是可选的。**

`return()` 方法的使用场合是，如果 `for...of` 循环提前退出 (**通常是因为出错，或者有 `break` 语句**)，就会调用 `return()` 方法。

`throw()` 方法主要是配合 Generator 函数使用，一般的遍历器对象用不到这个方法。

**计算生成的数据结构：**

有些数据结构是在现有数据结构的基础上，计算生成的。比如，ES6 的数组、`Set`、`Map` 都部署了以下三个方法，调用后都返回遍历器对象。

- `entries()` 返回一个遍历器对象，用来遍历 `[键名, 键值]` 组成的数组。对于数组，键名就是索引值；对于 `Set`，键名与键值相同。`Map` 结构的 Iterator 接口，默认就是调用 `entries` 方法。
- `keys()` 返回一个遍历器对象，用来遍历所有的键名。
- `values()` 返回一个遍历器对象，用来遍历所有的键值。

```js
const arrLike = {
  1: 'b',
  2: 'c',
  length: 3,
}

console.log(Array.from(arrLike)) // [ undefined, 'b', 'c' ]

arrLike[Symbol.iterator] = function () {
  let nextIndex = 0
  return {
    next: () => {
      return nextIndex < this.length
        ? { value: this[nextIndex++], done: false }
        : { value: undefined, done: true }
    },
    return: () => {
      console.log('return called')
      // TypeError: Iterator result undefined is not an object
      return { value: undefined, done: true }
    },
  }
}

const it = arrLike[Symbol.iterator]()

// 普通调用
console.log(it.next()) // { value: undefined, done: false }
console.log(it.next()) // { value: 'b', done: false }
console.log(it.next()) // { value: 'c', done: false }
console.log(it.next()) // { value: undefined, done: true }
console.log(it.next()) // { value: undefined, done: true }

for (const it of arrLike) {
  if (it === undefined) {
    // break 和 error 都会触发 return
    // throw new Error('it is undefined')
    break
  }
}
```

Iterator 接口与 Generator 函数

`Symbol.iterator()` 方法的最简单实现，是使用 Generator 函数。

```js
const myIterable = {
  [Symbol.iterator]: function* () {
    yield 1
    yield 2
    yield 3
  },
}

for (const it of myIterable) {
  console.log(it) // 1 2 3
}

// 或者采用下面的简洁写法
let it1 = {
  *[Symbol.iterator]() {
    yield 'hello'
    yield 'world'
    return 'end'
  },
}

console.log([...it1]) // [ 'hello', 'world' ]
```

上面代码中，`Symbol.iterator()` 方法几乎不用部署任何代码，只要用 `yield` 命令给出每一步的返回值即可。

## Generator 函数

### 简介

由于 Generator 函数返回的遍历器对象，只有调用 next `方法才会遍历下一个内部状态，所以其实提供了一种可以暂停执行的函数。yield` 表达式就是暂停标志。

遍历器对象的 `next` 方法的运行逻辑如下。

1. 遇到 `yield` 表达式，就暂停执行后面的操作，并将紧跟在 `yield` 后面的那个表达式的值，作为返回的对象的 `value` 属性值。

2. 下一次调用 `next` 方法时，再继续往下执行，直到遇到下一个 `yield` 表达式。

3. 如果没有再遇到新的 `yield` 表达式，就一直运行到函数结束，直到 `return` 语句为止，并将 `return` 语句后面的表达式的值，作为返回的对象的 `value` 属性值。

4. 如果该函数没有 `return` 语句，则返回的对象的 `value` 属性值为 `undefined`。

需要注意的是，`yield` 表达式后面的表达式，只有当调用 `next` 方法、内部指针指向该语句时才会执行，因此等于为 JavaScript 提供了手动的 “惰性求值” (Lazy Evaluation) 的语法功能。

```js
function* gen() {
  yield 1
  yield 2
  yield 3
  return 'ending'
}

const it = gen()
console.log(it.next()) // { value: 1, done: false }
console.log(it.next()) // { value: 2, done: false }
console.log(it.next()) // { value: 3, done: false }
// 最后一次调用会把 value 值设置为 return 的值
console.log(it.next()) // { value: 'ending', done: true }
// 已经结束了，再调用 next，value 为 undefined
console.log(it.next()) // { value: undefined, done: true }
```

### next 方法的参数

`yield` 表达式本身没有返回值，或者说总是返回 `undefined`。**`next` 方法可以带一个参数，该参数就会被当作上一个 `yield` 表达式的返回值**。

通过 `next` 方法的参数，就有办法在 Generator 函数开始运行之后，继续**向函数体内部注入值**。也就是说，可以在 Generator 函数运行的不同阶段，从外部向内部注入不同的值，从而调整函数行为。

```js
//! next 方法可以带一个参数，该参数就会被当作上一个 yield 表达式的返回值。
function* gen2() {
  const retVal1 = yield 1
  console.log(retVal1)
  const retVal2 = yield 2
  console.log(retVal2)
  const retVal3 = yield 3
  console.log(retVal3)
  return 'ending'
}

const it2 = gen2()
it2.next()
it2.next(`retVal1`) // retVal1
it2.next(`retVal2`) // retVal2
it2.next(`retVal3`) // retVal3
```

### next()、throw()、return()

`next()`、`throw()`、`return()` 这三个方法本质上是同一件事，可以放在一起理解。它们的作用都是让 Generator 函数恢复执行，并且使用不同的语句替换 `yield` 表达式。

**`next()` 是将 `yield` 表达式替换成一个值**。

```js
const g = function* (x, y) {
  let result = yield x + y
  return result
}

const gen = g(1, 2)
gen.next() // Object {value: 3, done: false}

gen.next(1) // Object {value: 1, done: true}
// 相当于将 let result = yield x + y
// 替换成 let result = 1;
```

上面代码中，第二个 `next(1)` 方法就相当于将 `yield` 表达式替换成一个值 `1`。如果 `next` 方法没有参数，就相当于替换成 `undefined`。

**`throw()` 是将 `yield` 表达式替换成一个 `throw` 语句。**

> 应用：[`await` 会把 `rejected promise` 转变成了一个 `throw`。](https://www.zhihu.com/question/522726685)

```js
gen.throw(new Error('出错了')) // Uncaught Error: 出错了
// 相当于将 let result = yield x + y
// 替换成 let result = throw(new Error('出错了'));
```

**`return()` 是将 `yield` 表达式替换成一个 `return` 语句**。

```js
gen.return(2) // Object {value: 2, done: true}
// 相当于将 let result = yield x + y
// 替换成 let result = return 2;
```

### yield\* 表达式

任何数据结构只要有 Iterator 接口，就可以被 `yield*` 遍历。

### 总结

```js
const g = function* (x, y) {
  console.log('start')
  let ret1 = yield x + y
  console.log('ret1', ret1)
  let ret2 = yield ret1 * y
  console.log('ret2', ret2)
  try {
    yield ret2.join('')
  } catch (error) {
    console.log('error', error.message)
  }
  try {
    yield ret2 * x
  } finally {
    // 这里是 finally 块必然会执行 doSomething()
    console.log('finally')
  }
  let ret3 = yield ret2 * y
  console.log('ret3', ret3)
  return ret3
}

const _it = g(1, 2)
let _ret1 = _it.next() // 执行 start x + y 返回 { value: 3, done: false }

let _ret2 = _it.next(_ret1.value) // 执行 let ret1 = next 的参数 到 ret1 * y 停止

// _it.throw()
// 代码在 let ret2 = yield ret1 * y 停止
//  等同于 let ret2 = throw new Error('error')
// 由于内部没捕获，所以可以在外部捕获
// try {
//   _it.throw(new Error('error'))
// } catch (error) {
//   console.log('外部捕获', error.message)
// }
// // 外部捕获了错误，所以不会再执行下去
// _it.next() 无效

// 代码不会在 ret2.join('') 中止
// 内部错误被捕获
// 会在 ret2 * y 停止
_it.next() // 返回 { value: '12', done: true }

// 这里会把 yield ret2 * y 替换 _ret.value 并且 return 不再执行下区
// _it.return(_ret.value)
// _it.next() // 无效

// 这里会把 yield ret2 * y 替换 undefined
_it.next()
// 这里结束 end
_it.next(_ret2.value)

// next 比 yield 多一次，途中报错那次 yield 不会执行，跳过了
```
