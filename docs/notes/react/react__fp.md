---
title: 函数式理念
order: 0
toc: content
group:
  title: 道
  order: -1
---

## 数据驱动视图的宏观设计

React 的核心特点之一是“**数据驱动视图**”，这一点在函数式编程中有一个经典的表达：

$$ f(\text{data}) = \text{UI} $$

虽然表达式版本有时可能会有所不同，但核心意思一致：**React 的视图随着数据变化而更新**。只要数据变了，UI 也跟着蹦跶起来。

在 React 组件的初始渲染过程中，有两个关键步骤：

1. 结合初始 `state`，计算出组件对应的**虚拟 DOM**
2. 将虚拟 DOM 转换为**真实 DOM**

而在 React 组件的更新过程中，也有类似的两步：

1. 根据 `state` 的变化重新计算虚拟 DOM
2. 将虚拟 DOM 更新到真实 DOM

嗯，就是这么简单淳朴。

现在我们重新审视 `UI = f(data)` 这个公式：

- state 在 React 中映射为 props 和 context。
- UI 则是最终渲染出的内容，在 React 中就是浏览器中的 DOM。

`f()` 函数代表了 React 内部的运行机制，可以划分为两个层次（如下图所示）：

![数据驱动视图的宏观设计](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/20241109012829.png)

- **计算层**：负责根据 `state` 的变化计算虚拟 DOM。这层主要是纯计算逻辑，不掺杂一点杂尘。
- **副作用层**：负责将计算层的成果施展到真实 DOM 上，这就是主要干脏活累活的地方。

在 `UI = f(data)` 这个公式中，数据是自变量，视图是因变量。而作为 React 核心工作单元的**组件**，它的作用正是**描述数据和视图的关系**。如果把这个公式套到组件里，那么 React 组件显然就是 `f()` 函数啦。

## 组件设计：组件即函数

> 从概念上讲，组件类似于 JavaScript 函数。它接受任意的入参（称为“props”），并返回用于描述页面展示内容的 React 元素。—— React 官方文档

定义一个 React 组件，实际上就是说“我就是一个接受 `props` 并输出 UI 的函数”。

```js
function Greeting({ role }) {
  return <h1>Welcome, {role}!</h1>;
}

// 用例
<Greeting role="Administrator" />
```

但是！如果组件需要维护自身状态或实现副作用，只需引入合适的 Hooks（比如 `useState`）：

```js
import React, { useState } from 'react';

function SimpleCounter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You have pressed the button {count} times.</p>
      <button onClick={() => setCount(count + 1)}>
        Increase Count
      </button>
    </div>
  );
}

// 用例
<SimpleCounter />
```

在 React 中，组件的设计理念就是：**描述数据与视图的关系**。通俗点说，就是组件的 `props`、`state` 和 `context` 输入决定它的 `UI` 输出。

## 函数组件的心智模型：抽象组件逻辑（哪些逻辑可以抽象为纯函数，哪些逻辑可以抽象为副作用）

React 引入 Hooks，让**函数组件也可以拥有状态**。试试这个例子：

```js
import React, { useState } from 'react';

function ShoppingCart({ initialItems }) {
  const [itemCount, setItemCount] = useState(initialItems);

  return (
    <>
      <h1>Your shopping cart has {itemCount} items</h1>
      <button onClick={() => setItemCount(itemCount + 1)}>Add to Cart</button>
    </>
  );
}

// 示例
<ShoppingCart initialItems={3} />
```

虽然输入相同的 `props` 后，函数输出的内容可能不同，因为有 `state` 的存在。

**那么它真的是一个不纯的函数吗？**

**别急，再思考一下：** `useState()` 的状态管理逻辑在 `ShoppingCart()` 函数内部还是外部呢？

答案是——在函数之外！

实际上，函数执行是一次性的，如果 `useState()` 在 `ShoppingCart()` 函数内部，那么每次渲染时，状态就会被重新初始化。

然而，`ShoppingCart` 组件每次渲染时，`useState()` 总会记住最新的状态。这证明状态实在 `ShoppingCart()` 函数之外维护。

> 别忘了：这种松耦合关系不仅适用于 `useState()`，也适用于所有的 React Hooks。

也就是说，对于函数组件而言，`state` 也是一种**外部数据**。函数组件可以消费 `state`，但不真正拥有 `state`。当我们调用 `useState()` 时，实际上是在函数外围添加了一个状态管理层，这个管理层由 React 实现，因此我们感知不到，仿佛函数组件**拥有状态**。

> **最后补充一下为什么要把 state 放在外部由 React 管理 —— 因为这样的话在并发渲染时 React 可以决定是丢弃还是 commit，这个和软件事务内存（Software Transactional Memory）的原理是一样的。**

**对于相同的输入参数（即固定的 `props`、`context`、`state`），函数组件总是能提供相同的输出。因此，函数组件仍被视为“纯函数”。**

```js
UI = FunctionComponent(props, context, state)
```

由此我们可以看出：**Hooks 对函数能力的扩展，不会改变函数本身的属性。函数组件始终是从数据到 UI 的映射。** 而 `useEffect`、`useState` 等 Hooks 则负责处理那些不纯的逻辑，比如状态变化、网络请求和 DOM 操作等副作用。

换言之，在组件设计层面，React 也在引导我们按“纯函数/副作用”这个思路来思考问题。

过去设计 Class 组件时，需要考虑“**如何将业务逻辑分解到各类生命周期钩子中**”。

而现在，设计函数组件时，我们的关注点则简化为“**哪些逻辑可以抽象为纯函数，哪些逻辑可以抽象为副作用**”。

![组件状态绑定](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/20241109014245.png)

## 函数组件的心智模型：代码重用

曾经，组件状态绑定在组件实例（this）上，形成了一种强耦合关系 —— 如果我要管理状态，就必须创建一个组件实例作为其容器。

但现在，**状态被视为函数的输入和输出**，它无需绑定到 `this` 上，状态管理逻辑可以从组件实例中剥离，提升为一个公共函数，彻底实现了逻辑和视图的解耦。

## React 的不可变数据原则

### 什么是数据的不可变性？

用生活中的例子来说，比如一个叫 Alice 的小姑娘，她有一个代表个人信息的小册子，包括名字、年龄和联系信息。

```js
const person = {
  name: "Alice",
  age: 18,
  contactInfo: {
    email: "",
    phone: ""
  }
};
```

要修改这个 `person` 对象，我们可以用 Vue 和 React 不同的方式来处理。

在 Vue 中，你可以直接修改对象的属性，简单粗暴，效果也正。

```js
// 修改名字的函数
const changeName = (newName) => {
  person.name = newName;
};

// 修改电子邮件的函数
const changeEmail = (newEmail) => {
  person.contactInfo.email = newEmail;
}
```

在 React 中，数据是不可变的，每次修改都会创建一个新的对象，有点像做个面膜，你还是你，只是增加了“面子”变化：

```js
let getPerson = () => person;

// 修改名字的函数
const changeName = (newName) => {
  const currentPerson = getPerson();
  getPerson = () => ({
    ...currentPerson,
    name: newName
  });
};

// 修改电子邮件的函数
const changeEmail = (newEmail) => {
  const currentPerson = getPerson();
  getPerson = () => ({
    ...currentPerson,
    contactInfo: {
      ...currentPerson.contactInfo,
      email: newEmail
    }
  });
};

// 调用 getPerson() 获取最新数据
```

在 React 中，每个行为，都会产生新的对象，不会修改原本的对象属性，而是会产生新的对象。这表现了数据不变性的原则：**数据作为一个整体，不会改变，不论是内部属性还是外部引用。**

因此，你就有了两种不同的工作方式：

- Vue：对象 -> 被函数 1 修改 -> 被函数 2 修改...
- React: 对象 -> 函数 1 运行 -> 新对象 -> 函数 2 运行 -> 新对象...

React 的这种方式保证了**数据的独立性**和**行为的独立性**，这意味着每个行为产生的数据彼此不干扰，带来了一些优点和缺点：

- 优点是：数据之间沒有耦合，你可以随意更新数据结构而不用担心响应性丢失的问题。
- 缺点是：数据行为分离对封装不利，且样板代码较多（比如 reducer），并且需要有一个初始值。

### 不可变数据的好处

众所周知，“不可变数据”是 React 强烈推荐的原则。这个原则应用于 React 组件的状态（state）和属性（props）。这些数据一经创建便不能修改，只能通过创建新数据来更新。

**为什么 React 偏执地推崇不可变数据呢？**

我们知道，**React 组件是一个从数据到 UI 的纯函数。**

**纯函数**意味着**确定性**，即对于相同的数据输入，必须有相同的视图输出。

有了这种映射关系，对同一个函数（React 组件）和同一组输入（React 状态），组件计算出的视图内容必定一致。换言之，**在数据不变的情况下，React 有理由不进行重计算**。这就是 `PureComponent` 和 `React.memo()` 等技术背后的原因。

React 选择不可变数据作为状态更新的核心原则，是因为其**函数式核心**，即追求**数据（输入）和视图（输出）之间的确定性映射关系**。如果数据是可变的（引用不变但内容变化），会导致数据和 UI 的映射关系不确定，使 React 无法决定是否进行重计算，最终导致渲染异常。

也就是说，**React 组件的纯函数特性和不可变数据原则相互支撑、相互依赖**，它们旨在确保 React 的渲染过程高度确定、可预测，从而提高应用的性能和可维护性。

### 为什么 React 如此关注纯度呢（纯函数特性）？

因为渲染抽象，`event -> state -> ui`，如果这个过程相互隔离（即纯度），那么 UI 就可以自由替换，实现 SSR、延迟渲染和跨端编译。而像 Vue，那种利用响应式 state 赋值数据的方式，得到的 state 是一个复杂的中间结构，替换 UI 的难度比 React 高得多。
