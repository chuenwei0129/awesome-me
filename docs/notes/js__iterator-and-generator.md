---
group:
  title: javaScript
  order: 3
title: Iterator 和 Generator
toc: content
order: 13
---

### 从 Iterator 到 Generator：揭秘现代 JS 异步编程的基石

#### 引言：为何需要统一的「遍历」？

在 ES6 之前，JavaScript 的世界里充满了五花八门的遍历方式：我们用 `for` 循环遍历数组，用 `for...in` 遍历对象属性，还有 `forEach`、`map` 等高阶函数……每一种数据结构似乎都有自己的一套「玩法」。

想象一下，如果我们有一种新的数据结构，比如一个二叉树，难道又要为它设计一套新的遍历 API 吗？

为了终结这种混乱，ES6 引入了 **Iterator（迭代器）机制**。它的核心使命只有一个：

> 为所有数据结构提供一种统一的访问机制。

这不仅仅是为了 `for...of` 循环的优雅，还为后来的 `async/await`、异步迭代器等现代异步能力打下了重要的概念基础。本文将带你从 Iterator 协议细节，深入到 Generator 的魔法，并最终揭示它与 `async/await` 之间的血缘关系。

---

### 1. 迭代协议：JavaScript 的「遍历规范」

要真正理解 Iterator，首先必须区分两个核心协议：**可迭代协议（Iterable Protocol）** 和 **迭代器协议（Iterator Protocol）**。

#### 1.1 可迭代协议（Iterable Protocol）

如果一个对象希望自己能被 `for...of` 等语法消费，它就必须遵守「可迭代协议」。该协议非常简单，规定：

- 对象必须拥有一个键为 `[Symbol.iterator]` 的属性；
- 该属性的值必须是一个**可调用的函数**，调用后返回一个「迭代器对象」。

```js
const myIterableObject = {
  data: [1, 2, 3],
  [Symbol.iterator]: function () {
    // 这个函数需要返回一个「迭代器对象」
    // ...
  },
};
```

> 许多语言特性，如 `for...of`、展开运算符（`...`）、`Array.from()`、解构赋值等，都会优先尝试调用目标的 `[Symbol.iterator]` 来获取迭代器。

#### 1.2 迭代器协议（Iterator Protocol）

「迭代器协议」定义了迭代行为的标准。一个对象如果想成为「迭代器」，就必须遵守该协议：

- 对象必须拥有一个名为 `next` 的方法；
- 调用 `next()` 方法后，必须返回一个包含 `value` 和 `done` 两个属性的对象：
  - `value`：当前遍历到的值；
  - `done`：布尔值，`true` 表示遍历已结束，`false` 表示遍历仍在进行。

**两者的关系：**

> 一个「可迭代对象」调用它的 `[Symbol.iterator]()` 方法后，会返回一个「迭代器对象」。

```js
const arr = ['a', 'b'];
const iterator = arr[Symbol.iterator](); // arr 是可迭代的，执行后返回一个迭代器

console.log(iterator.next()); // { value: 'a', done: false }
console.log(iterator.next()); // { value: 'b', done: false }
console.log(iterator.next()); // { value: undefined, done: true }
```

#### 1.3 原生可迭代对象

在现代 JavaScript 环境中，许多内置类型已经为我们实现了可迭代协议，例如：

- `Array`
- `String`
- `Map`
- `Set`
- `TypedArray`
- `arguments` 对象（现代实现中）
- `NodeList`（现代浏览器中）

这意味着它们不仅可以被 `for...of` 遍历，还可以直接使用展开运算符 `...` 等特性。

#### 1.4 为普通对象部署 Iterator 接口

默认情况下，普通对象（`{}`）是不可迭代的。但我们可以手动为其部署 `[Symbol.iterator]` 方法，让它变得可迭代。

```js
const myObject = {
  items: ['A', 'B', 'C'],
  [Symbol.iterator]: function () {
    let index = 0;
    const items = this.items;

    // 返回一个遵循「迭代器协议」的对象
    return {
      next: () => {
        if (index < items.length) {
          return { value: items[index++], done: false };
        } else {
          return { value: undefined, done: true };
        }
      },
    };
  },
};

for (const item of myObject) {
  console.log(item); // A B C
}
```

这样一来，任何消费「可迭代对象」的语法（`for...of`、`...`、`Array.from` 等）都能直接作用在 `myObject` 上。

---

### 2. Generator 函数：迭代器的「超级工厂」

手动编写迭代器对象相对繁琐，你需要自己管理遍历的内部状态（如 `index`）。因此，ES6 提供了一个强大的「语法糖」——**Generator 函数**，它可以极大地简化迭代器的创建过程。

Generator 函数有两个鲜明的特征：

1. `function` 关键字与函数名之间有一个星号 `*`；
2. 函数体内部使用 `yield` 表达式来产出值并「暂停」。

```js
// 用 Generator 函数重写上面的例子
const myObjectWithGenerator = {
  items: ['A', 'B', 'C'],
  *[Symbol.iterator]() {
    // 注意这里的简洁写法
    for (const item of this.items) {
      yield item;
    }
  },
};

for (const item of myObjectWithGenerator) {
  console.log(item); // A B C
}
```

调用 Generator 函数**不会立即执行**，而是返回一个迭代器对象。`yield` 关键字就像一个「暂停路标」：

- 每次调用迭代器的 `next()` 方法，函数就会从上一次暂停的位置继续执行，直到遇到下一个 `yield`；
- 此时函数暂停，并将 `yield` 后面的值作为 `{ value }` 返回。

---

### 3. 深入 Generator 函数

#### 3.1 `next` 参数：双向通信的桥梁

`yield` 表达式本身没有返回值（或者说默认是 `undefined`）。但 `next()` 方法可以接受一个参数，**这个参数会作为上一个 `yield` 表达式的返回值**。

这使得我们可以在 Generator 函数执行期间，从外部向内部「注入」值，从而实现双向通信。

```js
function* createQuestionnaire() {
  const name = yield 'What is your name?';
  console.log(`Hello, ${name}!`);

  const hobby = yield 'What is your hobby?';
  console.log(`${name}'s hobby is ${hobby}.`);

  return 'Questionnaire finished.';
}

const questionnaire = createQuestionnaire();

console.log(questionnaire.next().value); // "What is your name?"
console.log(questionnaire.next('Alice').value); // "What is your hobby?"
// 内部打印 "Hello, Alice!"
console.log(questionnaire.next('coding').value); // "Questionnaire finished."
// 内部打印 "Alice's hobby is coding."
```

> 注意：**第一次**调用 `next()` 传入的参数是无效的，因为它没有「上一个 `yield`」可以接收这个值。

#### 3.2 `throw()` 和 `return()`：从外部控制执行流程

除了 `next()`，迭代器还有两个重要方法：`throw()` 和 `return()`。

- `iterator.throw(error)`
  在 Generator 外部向内部抛入一个错误。这个错误会出现在**上一个 `yield` 表达式**的位置。如果函数内部有 `try...catch`，就可以捕获该错误；否则错误会向外抛出。
- `iterator.return(value)`
  可以提前终止 Generator 的执行，并给出一个返回值。`finally` 语句块仍然会执行。

```js
function* stoppableTask() {
  try {
    yield 'Step 1';
    yield 'Step 2';
    yield 'Step 3';
  } catch (e) {
    console.log('Caught error inside:', e.message);
  } finally {
    console.log('Task is stopping.');
  }
  return 'This will not be reached if forced to return.';
}

// 演示 throw
const task1 = stoppableTask();
task1.next();
try {
  task1.throw(new Error('Something went wrong!'));
} catch (e) {
  console.log('Caught error outside:', e.message); // 不会执行，因为内部捕获了
}
// 控制台输出：
// Caught error inside: Something went wrong!
// Task is stopping.

// 演示 return
const task2 = stoppableTask();
task2.next();
const result = task2.return('Manually stopping now.');
console.log(result);
// 控制台输出：
// Task is stopping.
// { value: 'Manually stopping now.', done: true }
```

#### 3.3 `yield*` 表达式：委托执行

`yield*` 用于在一个 Generator 内部，将执行权「委托」给另一个可迭代对象（如另一个 Generator、数组、字符串等）。

```js
function* inner() {
  yield 'b';
  yield 'c';
  return 'inner done';
}

function* outer() {
  yield 'a';
  const innerResult = yield* inner(); // 委托给 inner
  console.log('Inner returned:', innerResult);
  yield 'd';
}

const it = outer();
console.log([...it]); // ['a', 'b', 'c', 'd']
// 期间控制台输出 "Inner returned: inner done"
```

这里有两个关键点：

- 扩展（`...it`）拿到的是所有 `yield` 出来的值：`a`、`b`、`c`、`d`；
- `yield*` 表达式本身的值，是被委托迭代器的 **return 值**（这里是 `'inner done'`）。

---

### 4. 异步编程的革命：Generator 与 async/await

Generator 最令人兴奋的应用之一，在于它改变了 JavaScript 的异步编程范式。

在只有回调的年代，我们饱受「回调地狱」折磨；Promise 出现后情况好很多，但在复杂业务中 `.then()` 链依然不够直观。

Generator 的「暂停」能力，让我们能用看起来**像同步代码**的风格来编写异步逻辑。

```js
// 一个模拟的异步请求
function fetchData(url) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Data from ${url}`);
    }, 1000);
  });
}

// 使用 Generator 编排异步任务
function* main() {
  console.log('Starting fetch...');
  const result1 = yield fetchData('/api/user'); // 暂停，直到 Promise 完成
  console.log(result1);

  const result2 = yield fetchData('/api/posts'); // 再次暂停
  console.log(result2);

  return 'All data fetched!';
}
```

看到这里你可能会问：`yield` 后面是 Promise，`main` 函数如何知道「等 Promise 完成再继续」？答案是：**Generator 自己并不知道**。它需要一个**「执行器」（Runner）**来驱动。

#### 4.1 Generator 自动执行器：理解 async/await 的前身

`async/await` 可以看成是一种「内建在语言里的高级 Generator 执行器」。我们可以手写一个简化版来理解其原理：

```js
// Generator 自动执行器
function run(generator) {
  const iterator = generator(); // 得到迭代器

  function go(result) {
    if (result.done) {
      return Promise.resolve(result.value);
    }

    // 将 yield 表达式的结果（通常是 Promise）包装成 Promise
    return Promise.resolve(result.value).then(
      (value) => go(iterator.next(value)), // 成功时把值塞回 Generator
      (error) => go(iterator.throw(error)), // 失败时把错误抛回 Generator
    );
  }

  // 返回一个 Promise，方便外部链式调用
  return go(iterator.next());
}

// 现在，我们可以「运行」上面的 main 函数了！
run(main).then((final) => {
  console.log(final); // "All data fetched!"
});

// 控制台输出：
// Starting fetch...
// (1 秒后) Data from /api/user
// (又 1 秒后) Data from /api/posts
// All data fetched!
```

对比一下 `async/await` 版本：

```js
async function mainAsync() {
  console.log('Starting fetch...');
  const result1 = await fetchData('/api/user');
  console.log(result1);

  const result2 = await fetchData('/api/posts');
  console.log(result2);

  return 'All data fetched!';
}

mainAsync().then(console.log);
```

两者在行为上非常接近：都是按顺序等待两个异步请求，最终拿到返回值。

> 心智模型上，你可以这样理解：
>
> - `async` 函数 ≈「JS 引擎帮你自动生成的 Generator + 内置执行器」；
> - `await` ≈ 在内部对 Promise 做了一次「`yield`」，然后引擎自动做了类似上面 `run` 函数的事情；
> - 实际规范和实现上它们并不是同一个东西，但这个类比有助于理解 `async/await` 的核心思路。

---

### 5. 其他应用场景：状态机与惰性数据流

除了异步编排，Generator 还有不少非常实用的场景。

#### 5.1 状态机

每一个 `yield` 可以看成一个状态，`next` 则驱动状态流转。对复杂的 UI 流程控制、协议解析等，Generator 是一种天然的状态机表达方式。

#### 5.2 惰性求值与无限数据流

你可以创建一个「永不终止」的 Generator，按需生成数据，而不是一次性把所有数据都放在内存中。

```js
function* idMaker() {
  let index = 0;
  while (true) {
    yield index++;
  }
}

const gen = idMaker();

console.log(gen.next().value); // 0
console.log(gen.next().value); // 1
// …可以无限生成下去
```

在处理分页数据、滚动加载、流式处理（如日志流、消息流）等场景时，这种「按需生产」的能力非常受用。

> 进一步地，现代 JS 还提供了**异步 Generator**（`async function*`）和 `for await...of`，用来按需消费异步数据流（如网络数据流、文件读写、消息队列等），这也是本文这条「从 Iterator 到 Generator」路线的自然延伸。

---

### 结论

回顾一下本文的核心要点：

- **Iterator 协议**是 JavaScript 中实现**统一遍历**的基础，由 `[Symbol.iterator]` 和 `next()` 方法共同定义。
- **Generator 函数**是创建迭代器的**强大语法糖**，通过 `yield` 实现函数的**暂停与恢复**。
- `next(value)` 实现了**外部向 Generator 内部的数据注入**，`throw` / `return` / `yield*` 则提供了更强大的流程控制能力。
- 通过一个「执行器」，Generator 可以优雅地编排 Promise 异步逻辑；理解这一点，有助于从原理上看懂 `async/await`。
- 在现代实际开发中：
  - 写业务代码时，**首选 `async/await`**；
  - 理解 Iterator / Generator，则能帮助你看懂框架源码、维护老代码，并对 JavaScript 的核心运行机制建立更扎实的直觉。

掌握 Iterator 和 Generator，不仅能让你写出更优雅、更易维护的代码，更能让你在面对复杂异步场景时做到「知其然，亦知其所以然」。如果你已经熟悉 `async/await`，不妨回头再用 Generator 的视角看一眼，你会对 JS 的异步世界有一种「抽丝剥茧」的通透感。
