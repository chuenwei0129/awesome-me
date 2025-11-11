---
group:
  title: javaScript
  order: 3
title: Iterator 和 Generator
toc: content
order: 13
---

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
};

console.log(Array.from(arrLike)); // [ undefined, 'b', 'c' ]

arrLike[Symbol.iterator] = function () {
  let nextIndex = 0;
  return {
    next: () => {
      return nextIndex < this.length
        ? { value: this[nextIndex++], done: false }
        : { value: undefined, done: true };
    },
    return: () => {
      console.log('return called');
      // TypeError: Iterator result undefined is not an object
      return { value: undefined, done: true };
    },
  };
};

const it = arrLike[Symbol.iterator]();

// 普通调用
console.log(it.next()); // { value: undefined, done: false }
console.log(it.next()); // { value: 'b', done: false }
console.log(it.next()); // { value: 'c', done: false }
console.log(it.next()); // { value: undefined, done: true }
console.log(it.next()); // { value: undefined, done: true }

for (const it of arrLike) {
  if (it === undefined) {
    // break 和 error 都会触发 return
    // throw new Error('it is undefined')
    break;
  }
}
```

### Iterator 接口与 Generator 函数

`Symbol.iterator()` 方法的最简单实现，是使用 Generator 函数。

```js
const myIterable = {
  [Symbol.iterator]: function* () {
    yield 1;
    yield 2;
    yield 3;
  },
};

for (const it of myIterable) {
  console.log(it); // 1 2 3
}

// 或者采用下面的简洁写法
let it1 = {
  *[Symbol.iterator]() {
    yield 'hello';
    yield 'world';
    return 'end';
  },
};

console.log([...it1]); // [ 'hello', 'world' ]
```

上面代码中，`Symbol.iterator()` 方法几乎不用部署任何代码，只要用 `yield` 命令给出每一步的返回值即可。

## Generator 函数

### 简介

**Generator 函数的语法特征：**

1. **`function` 关键字与函数名之间有一个星号 `*`**
2. **函数体内部使用 `yield` 表达式，定义不同的内部状态**

```js
function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}

// 调用 Generator 函数后，该函数并不执行，返回的也不是函数运行结果
// 而是一个指向内部状态的指针对象，也就是遍历器对象（Iterator Object）
const hw = helloWorldGenerator();
```

由于 Generator 函数返回的遍历器对象，只有调用 `next` 方法才会遍历下一个内部状态，所以其实提供了一种可以暂停执行的函数。`yield` 表达式就是暂停标志。

遍历器对象的 `next` 方法的运行逻辑如下。

1. 遇到 `yield` 表达式，就暂停执行后面的操作，并将紧跟在 `yield` 后面的那个表达式的值，作为返回的对象的 `value` 属性值。

2. 下一次调用 `next` 方法时，再继续往下执行，直到遇到下一个 `yield` 表达式。

3. 如果没有再遇到新的 `yield` 表达式，就一直运行到函数结束，直到 `return` 语句为止，并将 `return` 语句后面的表达式的值，作为返回的对象的 `value` 属性值。

4. 如果该函数没有 `return` 语句，则返回的对象的 `value` 属性值为 `undefined`。

需要注意的是，`yield` 表达式后面的表达式，只有当调用 `next` 方法、内部指针指向该语句时才会执行，因此等于为 JavaScript 提供了手动的 “惰性求值” (Lazy Evaluation) 的语法功能。

```js
function* gen() {
  yield 1;
  yield 2;
  yield 3;
  return 'ending';
}

const it = gen();
console.log(it.next()); // { value: 1, done: false }
console.log(it.next()); // { value: 2, done: false }
console.log(it.next()); // { value: 3, done: false }
// 最后一次调用会把 value 值设置为 return 的值
console.log(it.next()); // { value: 'ending', done: true }
// 已经结束了，再调用 next，value 为 undefined
console.log(it.next()); // { value: undefined, done: true }
```

> **注意**：`for...of` 循环、扩展运算符（`...`）等会自动遍历 Generator 函数，且不需要调用 `next` 方法。但是，它们**不会返回 `return` 语句的返回值**。
>
> ```js
> function* foo() {
>   yield 1;
>   yield 2;
>   return 3;
> }
>
> for (let v of foo()) {
>   console.log(v); // 1 2
> }
>
> console.log([...foo()]); // [1, 2]
> ```

### next 方法的参数

`yield` 表达式本身没有返回值，或者说总是返回 `undefined`。**`next` 方法可以带一个参数，该参数就会被当作上一个 `yield` 表达式的返回值**。

通过 `next` 方法的参数，就有办法在 Generator 函数开始运行之后，继续**向函数体内部注入值**。也就是说，可以在 Generator 函数运行的不同阶段，从外部向内部注入不同的值，从而调整函数行为。

```js
//! next 方法可以带一个参数，该参数就会被当作上一个 yield 表达式的返回值。
function* gen2() {
  const retVal1 = yield 1;
  console.log(retVal1);
  const retVal2 = yield 2;
  console.log(retVal2);
  const retVal3 = yield 3;
  console.log(retVal3);
  return 'ending';
}

const it2 = gen2();
it2.next();
it2.next(`retVal1`); // retVal1
it2.next(`retVal2`); // retVal2
it2.next(`retVal3`); // retVal3
```

### next()、throw()、return()

`next()`、`throw()`、`return()` 这三个方法本质上是同一件事，可以放在一起理解。它们的作用都是让 Generator 函数恢复执行，并且使用不同的语句替换 `yield` 表达式。

**`next()` 是将 `yield` 表达式替换成一个值**。

```js
const g = function* (x, y) {
  let result = yield x + y;
  return result;
};

const gen = g(1, 2);
gen.next(); // Object {value: 3, done: false}

gen.next(1); // Object {value: 1, done: true}
// 相当于将 let result = yield x + y
// 替换成 let result = 1;
```

上面代码中，第二个 `next(1)` 方法就相当于将 `yield` 表达式替换成一个值 `1`。如果 `next` 方法没有参数，就相当于替换成 `undefined`。

**`throw()` 是将 `yield` 表达式替换成一个 `throw` 语句。**

> 应用：[`await` 会把 `rejected promise` 转变成了一个 `throw`。](https://www.zhihu.com/question/522726685)

```js
gen.throw(new Error('出错了')); // Uncaught Error: 出错了
// 相当于将 let result = yield x + y
// 替换成 let result = throw(new Error('出错了'));
```

**`return()` 是将 `yield` 表达式替换成一个 `return` 语句**。

```js
gen.return(2); // Object {value: 2, done: true}
// 相当于将 let result = yield x + y
// 替换成 let result = return 2;
```

### yield\* 表达式

任何数据结构只要有 Iterator 接口，就可以被 `yield*` 遍历。

**`yield*` 表达式用于在一个 Generator 函数里面执行另一个 Generator 函数**（或任何可遍历的数据结构）。

```js
function* foo() {
  yield 'a';
  yield 'b';
}

function* bar() {
  yield 'x';
  // 相当于 for (let v of foo()) yield v;
  yield* foo();
  yield 'y';
}

// 等同于
function* bar() {
  yield 'x';
  yield 'a';
  yield 'b';
  yield 'y';
}

for (let v of bar()) {
  console.log(v);
}
// x
// a
// b
// y
```

**`yield*` 后面的 Generator 函数如果有 `return` 值，需要用变量接收：**

```js
function* genFuncWithReturn() {
  yield 'a';
  yield 'b';
  return 'The result';
}

function* logReturned(genObj) {
  let result = yield* genObj;
  console.log(result);
}

[...logReturned(genFuncWithReturn())]; // The result
```

**使用 `yield*` 遍历嵌套数组：**

```js
function* iterTree(tree) {
  if (Array.isArray(tree)) {
    for (let i = 0; i < tree.length; i++) {
      yield* iterTree(tree[i]);
    }
  } else {
    yield tree;
  }
}

const tree = ['a', ['b', 'c'], ['d', 'e']];

for (let x of iterTree(tree)) {
  console.log(x); // a b c d e
}

console.log([...iterTree(tree)]); // ['a', 'b', 'c', 'd', 'e']
```

### Generator 函数的应用

**1. 状态机**

Generator 是实现状态机的最佳结构。

```js
function* stateMachine() {
  while (true) {
    console.log('State A');
    yield;
    console.log('State B');
    yield;
  }
}

const sm = stateMachine();
sm.next(); // State A
sm.next(); // State B
sm.next(); // State A
```

**2. 异步操作的同步化表达**

Generator 函数可以暂停执行和恢复执行，这是它能封装异步任务的根本原因。

```js
function* loadUI() {
  showLoadingScreen();
  yield loadUIDataAsynchronously();
  hideLoadingScreen();
}

const loader = loadUI();
// 加载UI
loader.next();

// 卸载UI
loader.next();
```

**3. 控制流管理**

如果有一个多步操作非常耗时，采用回调函数可能会写成这样：

```js
step1(function (value1) {
  step2(value1, function (value2) {
    step3(value2, function (value3) {
      step4(value3, function (value4) {
        // Do something with value4
      });
    });
  });
});
```

使用 Generator 函数可以改写成：

```js
function* longRunningTask(value1) {
  try {
    const value2 = yield step1(value1);
    const value3 = yield step2(value2);
    const value4 = yield step3(value3);
    const value5 = yield step4(value4);
    // Do something with value5
  } catch (e) {
    // Handle any error from step1 through step4
  }
}
```

### 总结

以下是一个综合示例，展示了 Generator 函数的各种特性：

```js
const g = function* (x, y) {
  console.log('start');

  // 第一个 yield
  let ret1 = yield x + y;
  console.log('ret1', ret1);

  // 第二个 yield
  let ret2 = yield ret1 * y;
  console.log('ret2', ret2);

  // 第三个 yield - 可能会抛出错误
  try {
    yield ret2.join('');
  } catch (error) {
    console.log('error', error.message);
  }

  // 第四个 yield - 演示 finally 块
  try {
    yield ret2 * x;
  } finally {
    console.log('finally');
  }

  // 第五个 yield
  let ret3 = yield ret2 * y;
  console.log('ret3', ret3);
  return ret3;
};

// 执行流程示例：
const _it = g(1, 2);

// 第 1 次调用：执行到第一个 yield，输出 'start'
let _ret1 = _it.next();
// 输出: start
// 返回: { value: 3, done: false }  (x + y = 1 + 2 = 3)

// 第 2 次调用：将 3 赋值给 ret1，执行到第二个 yield
let _ret2 = _it.next(_ret1.value);
// 输出: ret1 3
// 返回: { value: 6, done: false }  (ret1 * y = 3 * 2 = 6)

// 第 3 次调用：将 6 赋值给 ret2，执行到第三个 yield
// 注意：ret2 是数字 6，没有 join 方法，所以会在 try 块内抛出错误
// 错误被 catch 捕获，继续执行到第四个 yield
_it.next();
// 输出: ret2 6
// 输出: error ret2.join is not a function
// 返回: { value: 6, done: false }  (ret2 * x = 6 * 1 = 6)

// 第 4 次调用：执行 finally 块，然后到第五个 yield
_it.next();
// 输出: finally
// 返回: { value: 12, done: false }  (ret2 * y = 6 * 2 = 12)

// 第 5 次调用：将 _ret2.value (6) 赋值给 ret3，函数结束
_it.next(_ret2.value);
// 输出: ret3 6
// 返回: { value: 6, done: true }  (return ret3)
```

**关于 `throw()` 的补充说明：**

```js
// 如果在第 2 次 next 之后调用 throw，会发生以下情况：
const _it2 = g(1, 2);
_it2.next(); // 执行到第一个 yield
_it2.next(3); // 执行到第二个 yield

// throw() 会将 yield ret1 * y 替换成 throw new Error('error')
// 即：let ret2 = throw new Error('error')
// 由于这个 yield 外部没有 try-catch，错误会向外传播
try {
  _it2.throw(new Error('error'));
} catch (error) {
  console.log('外部捕获', error.message); // 输出: 外部捕获 error
}

// 一旦抛出未被内部捕获的错误，Generator 就会终止，后续 next() 无效
_it2.next(); // { value: undefined, done: true }
```

**关于 `return()` 的补充说明：**

```js
const _it3 = g(1, 2);
_it3.next(); // { value: 3, done: false }
_it3.next(3); // { value: 6, done: false }

// return() 会将当前的 yield 替换成 return 语句，并终止 Generator
_it3.return(100); // { value: 100, done: true }

// 后续 next() 调用无效
_it3.next(); // { value: undefined, done: true }
```

