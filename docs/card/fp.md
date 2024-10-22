---
title: 函数式编程
toc: content
---

## 函数式编程的思维模型 🤔

在函数式编程中，我们需要思考以下两个问题：

- **我想要什么样的输出？**
- **我应该提供什么样的输入？**

## 纯函数

**纯函数**是指：

> 输入只能够以参数形式传入，输出只能够以返回值形式传递，除了入参和返回值之外，不以任何其它形式和外界进行数据交换的函数。

### 纯函数示例

```js
// 一个纯函数，它依赖于输入参数，并且不产生副作用
function add(x, y) {
    return x + y;
}

// 调用纯函数
console.log(add(2, 3)); // 输出: 5
```

### 非纯函数示例

```js
// 一个非纯函数，依赖于外部变量，存在副作用
let count = 0;

function increment() {
    count++;
    return count;
}

// 调用非纯函数
console.log(increment()); // 输出: 1
console.log(increment()); // 输出: 2
```

引入了外部变量的 `increment()` 函数，它的执行严重地依赖了函数的运行环境。函数实际上被 **困在了特定的上下文** 里。

因此，**纯函数是高度灵活的函数**，它的计算逻辑在任何上下文里都是成立的。

## 副作用

如果一个函数除了计算之外，还对它的执行上下文、执行宿主等外部环境造成了一些其它的影响，那么这些影响被称为“副作用”。消除副作用能够解决函数中大多数的不确定性。

### 消除副作用示例

```js
// 将副作用移出函数，保持纯函数特性
function incrementPure(value) {
    return value + 1;
}

let value = 0;
value = incrementPure(value); // value 变为 1
value = incrementPure(value); // value 变为 2

console.log(value); // 输出: 2
```

**计算是确定性的行为，而副作用则充满了不确定性。这一实践，实际上也是在贯彻“变与不变分离”的设计原则。**

副作用的消除还解决了并行计算带来的竞争问题。考虑以下场景：

- **A 函数和 B 函数**都需要向某个文件写入信息。
- 如果我们先后调用了 A 和 B 函数，就会触发两个并行的写入过程，可能导致混乱的竞争态。

而纯函数则不存在这种问题。其计算完全发生在函数的内部，不会对外部资源产生任何影响，因此纯函数的并行计算总是安全的。

函数生产的是数据，这些数据要想作用于外部世界、创造一些真正的改变，就必须借助副作用。

对于程序员而言，实践纯函数的目的并不是消灭副作用，而是**将计算逻辑与副作用做合理的分层和解耦**，从而提升编码质量和执行效率。

## 可变数据

可变数据会使数据的变化隐蔽，进而使函数的行为难以预测。在函数式编程的范式下，我们校验一个函数有效性的关键依据是：

> **针对已知的输入，能否给出符合预期的输出**。

这种校验非常清晰且容易实现。

可变数据的出现模糊了函数的作用边界，导致使用者和开发者都难以预测函数的最终行为。一个可靠、受控的黑盒，应该总是将变化控制在盒子的内部，而不去改变盒子外面的任何东西💡。

> 这就像我们往酸奶机里倒入了酵母和牛奶，只期望它能产出酸奶，而不希望它引燃旁边的烤箱一样🔥。

现在，请大家回顾一下：对于 JS 来说，Immutability 实践的直接目的是什么？

简而言之，是为了解决 **数据内容变化与数据引用变化不同步的问题**。

### 可变数据示例

```js
// 可变数据示例，直接修改了原对象
const user = {
  name: 'Alice',
  age: 25,
};

function updateUserAge(user, newAge) {
  // 修改原对象
  user.age = newAge;
  return user;
}

const updatedUser = updateUserAge(user, 26);

console.log(user); // 输出: { name: 'Alice', age: 26 }
console.log(updatedUser); // 输出: { name: 'Alice', age: 26 }
console.log(user === updatedUser); // 输出: true
```

### 不可变数据示例

```js
// 一个不可变的数据示例，使用对象的浅拷贝来更新属性
const user = {
    name: 'Alice',
    age: 25
};

function updateUserAge(user, newAge) {
    // 返回一个新的对象，而不修改原对象
    return { ...user, age: newAge };
}

const updatedUser = updateUserAge(user, 26);

console.log(user); // 输出: { name: 'Alice', age: 25 }
console.log(updatedUser); // 输出: { name: 'Alice', age: 26 }
console.log(user === updatedUser); // 输出: false
```
