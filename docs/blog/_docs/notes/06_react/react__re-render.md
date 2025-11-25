---
title: 内部性能优化
toc: content
order: 3
group:
  title: 道
---

## 为什么 React 的 diff 算法从根节点开始，而不是从状态变化的组件开始？

原因如下：

**因为需要计算优先级**：如果没有优先级的考虑，那么确实可以从状态变化的组件开始更新。但 React 引入了一套复杂的优先级机制。当手动更新状态时，其他组件可能还存在未消费完的优先级任务，因此需要从根节点开始检查和计算。

在 React 中，**lane 机制**会在 `setState` 时从当前组件向上标记。所以，实际上只有标记过的那一分支才会执行 diff 操作。而从根节点开始的目的是为了更好地批量更新和调度优先级任务。一次更新可能涉及多个 lane 分支，从根节点开始可以兼顾这些分支。

### 示例

```jsx | pure
import * as React from 'react';
import { useState, useTransition } from 'react';
import { createRoot } from 'react-dom/client';

const Father = () => {
  const [, updateFather] = useState(0);
  return <Son updateFather={updateFather} />;
};

function Son({ updateFather }) {
  const [, updateSon] = useState(0);
  const [, startTransition] = useTransition();

  function handleClick() {
    // 高优先级
    updateFather(n => n + 1);
    // 低优先级
    startTransition(() => {
      updateSon(n => n + 1);
    });
  }

  return (
    <button onClick={handleClick}>
      Pressed
    </button>
  );
}

const root = createRoot(document.querySelector('#root'));
root.render(<Father />);
```

### 解释

![React Fiber Mechanism](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/fiber2.gif)

首先，数据流向是单向且自顶向下的。

即从声明 `~useState~` 的那个组件开始，在调用 `~setState~` 之后，从 `~setState~` 的那个 fiber 节点开始，自底向上把它的父级节点全部遍历出来，然后标记不需要更新（因为数据流向是往下走的，所以往上的部分是不需要更新的）。注意，同时调用的多个 `~setState~`，它们可能来源于不同组件中声明的 `~useState~`。

在标记完成之后，从根节点开始，自顶向下开始 diff，被标记为“不需要更新”的组件将被跳过，复用 VDOM。而被标记为“dirty”的组件需要重新运行组件函数重新求值，并且递归向下执行所有子组件重复这个流程。**当然，标记为 dirty 的组件，其子组件也不一定全部更新，比如这个 state 并没有传递给某些子组件，所以这些子组件虽然重新运行了，但经过 diff 之后依然会复用 VDOM，或者干脆 memo 掉直接避免重新运行**。

最后，这里其实是一个循环，因为有可能任意节点都会有 `~useState~` 声明且调用了 `~setState~`，所以循环走第一步，再走第二步，直到所有 `~setState~` 跑完，将需要更新的组件标记好。

## React 内部的性能优化

在每次 React 更新时，都会生成一棵新的 Fiber 树，但这是否会影响性能呢？实际上，在生成 Fiber 树的过程中，并非所有组件都会重新渲染。对于符合优化条件的组件，将触发 bailout 逻辑，避免不必要的渲染。

当触发更新（如调用 setState）时，React 会为每个组件创建相应的 fiber 节点，这些节点互相链接，形成一棵 Fiber 树。创建 fiber 节点的方式有两种：

1. 通过 bailout 复用上一次更新时的 fiber 节点。
2. 执行 render，通过 diff 算法生成新的 fiber 节点。在这个阶段，组件会被渲染（例如，调用 ClassComponent 的 render 方法或 FunctionComponent 的执行）。

如果组件的 fiber 节点符合 bailout 策略，该 fiber 节点及其所有子节点都不会再次执行 reconcile 操作（即不会触发组件的 render 方法）。

那么，什么情况下会触发 bailout 逻辑呢？需满足以下四个条件：

1. **oldProps === newProps**：
    本次更新的 `props` (`newProps`) 与上次更新的 `props` (`oldProps`) 完全相同。

2. **context 没有变化**：
    `context` 的 `value` 没有变化。

3. **workInProgress.type === current.type**：
    更新前后的 `fiber.type` 相同，如一个 `div` 没有变成 `p`。

4. **!includesSomeLane(renderLanes, updateLanes)**：
    当前 `fiber` 上的更新优先级是否与本次 Fiber 树调度的优先级一致。如果一致，进入 `render` 逻辑。

bailout 的优化不仅于此。如果整个 fiber 子树的所有节点没有更新，即使这些子节点触发了 bailout 逻辑，仍会有遍历成本。因此，在 bailout 中会检查 fiber 节点的所有子节点是否满足条件 4（检查时间复杂度为 O(1)）。如果子节点都没有需要执行的更新，则 bailout 会直接返回 null，从而跳过整棵子树。

这意味着，不进行 bailout 也不进行 render，整棵子树在此次更新中就像不存在一样，最终对应的 DOM 也不会发生任何变化。

## 关于 oldProps === newProps

举例来说，对于如下 Demo，点击 Parent 组件的 div，Son 组件会打印 `child render!` 么？

```jsx
import React from 'react';

function Son() {
  console.log('child render!');
  return null;
}

function Parent() {
  const [count, setCount] = React.useState(0);

  return (
    <button
      onClick={() => {
        setCount(count + 1);
      }}
    >
      count: {count}
      <Son />
    </button>
  );
}

const App = () => {
  return (
    <Parent />
  );
};

export default App;
```

<details><summary><b>查看答案</b></summary>

**答案**：会。

**分析**：

我们知道组件 `render` 会返回 JSX，JSX 是 `React.createElement` 的语法糖。

因此，`render` 返回的结果实际上是 `React.createElement` 的执行结果，即一个包含 `props` 属性的对象。

当我们点击按钮，触发 `Parent` 函数，执行 `setCount` 函数，更新 `count` 的值时，会触发 `ParentComponent` 的更新，进入 `render` 阶段。

`<Son/>` 会编译为 `React.createElement(Son, null)`，执行后返回 JSX，，即一个包含 `props` 属性的对象。

由于 `props` 的引用改变，`oldProps !== newProps`，会走 `render` 逻辑。

如果我们使用了 `PureComponent` 或 `Memo`，则在判断是否进入 `render` 或 `bailout` 时，会对 `props` 内每个属性进行浅比较。

</details>

另一个例子：点击 Parent 组件的 div，Son 组件会打印 `child render!` 么？

```tsx
import React from 'react';

interface ParentProps {
  children: React.ReactNode;
}

function Son() {
  console.log('child render!');
  return null;
}

function Parent(props: ParentProps) {
  const [count, setCount] = React.useState(0);

  return (
    <button
      onClick={() => {
        setCount(count + 1);
      }}
    >
      count: {count}
      {props.children}
    </button>
  );
}

const App = () => {
  return (
    <Parent>
      <Son />
    </Parent>
  );
};

export default App;
```

<details><summary><b>查看答案</b></summary>

**答案**：不会。

**分析**：

当我们点击按钮，触发 `Parent` 函数，执行 `setCount` 函数，更新 `count` 的值时，会触发 `ParentComponent` 的更新，进入 `render` 阶段。

由于 `ParentComponent` 的 `props` 没有变化，所以 `oldProps === newProps`。因此，`props.children` 也没有变化，`Son` 组件不会重新渲染。

</details>

## setState 相同值为何会重新渲染？

React 的工作流程可以简单概述为：交互（比如点击事件、useEffect）触发更新，组件树随即进行渲染。

在组件树开始渲染之后，被优化（优化称为 bailout）的组件的子孙组件将不会进行渲染。不过，还有一种更为前置的优化策略：当 `setState` 触发更新时，如果发现状态并未发生变化，则将完全跳过渲染过程。

以下是一个例子，点击 `button` 3 次，`console.log` 的打印顺序是什么？

```jsx
import React, { useState } from 'react';

function A() {
  console.log(2);
  return null;
}

function App() {
  const [state, setState] = useState(false);
  console.log(1);
  return (
    <>
      <button
        onClick={() => {
          console.log('click');
          setState(true);
        }}
      >
        click the button 3 times
      </button>
      <A />
    </>
  );
}

export default () => <App />;
```

> 想要更多互动式答题，请前往 [Deeper Dive Into React](https://jser.pro/ddir/quiz/ddir-rq-05-usestate-quirk).

<details><summary><b>查看答案</b></summary>

**答案**：

![20240620070429](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/20240620070429.png)

**原理**：

当状态没有变化时，理论上是不需要额外的渲染，这种优化策略在 React 源码中被称为 `eagerState`。问题出在 `eagerState` 判断状态是否变化的方式上。

首先，我们需要了解什么是 eagerState（急迫状态）。

通常，什么时候能获取到最新的状态呢？那就是组件 `render` 的时候。

下面看看这段代码：

```js
const [num, updateNum] = useState(0);
```

`useState` 执行后，返回的 `num` 就是最新的状态。

**因为状态是根据「一个或多个更新」计算而来的**，所以通常需要在 `render` 期间执行 `useState` 才能得到最新状态。

例如，在下列点击事件中触发 3 个更新：

```js
const onClick = () => {
  updateNum(100);
  updateNum(num => num + 1);
  updateNum(num => num * 2);
}
```

渲染后 `num` 的最新状态将是：

`num` 变为 100 -> 100 + 1 = 101 -> 101 * 2 = 202

所以，`useState` 会返回 202 作为 `num` 的最新状态。

实际情况可能更复杂，更新有自己的优先级，**因此在渲染前无法确定哪些更新会参与状态计算**。

因此，组件必须渲染，以执行 `useState` 来获取最新状态，从而比较「状态是否变化」。

eagerState 的意义在于，在某些情况下可以在组件渲染前提前计算出最新状态。这就是 eagerState 的由来。

这种情况下，组件无需渲染即可比较状态是否发生了变化。

具体是什么情况呢？

答案是：当组件上”没有更新”时。

若不存在更新，本次更新就是组件的第一个更新。在只有一个更新的情况下，可以确定最新状态。

具体来说，当当前组件没有更新时，就是所谓的 eagerState，首次触发状态更新时，能够立刻计算出最新状态，并与当前状态进行比较。如果一致，则无需进行后续渲染。

这就是 eagerState 的逻辑。但实际情况比这复杂一点。

让我们来看一个看似不相干的例子。

对以下组件：

```jsx | pure
function App() {
  const [num, updateNum] = useState(0);
  window.updateNum = updateNum;

  return <div>{num}</div>;
}
```

在控制台执行以下代码，可以改变视图中显示的 `num` 吗？

```js
window.updateNum(100);
```

答案是：可以。

因为 `App` 组件对应的 fiber（保存组件相关信息的节点）已经传递给 `window.updateNum` 了：

```js
// updateNum 的实现类似这样
const updateNum = dispatchSetState.bind(null, fiber, queue);
```

因此，`updateNum` 执行时能获取到 `App` 对应的 fiber。

然而，组件实际有 2 个 fiber，一个保存当前视图对应的信息，称为 `current fiber`；另一个保存接下来要变更的视图信息，称为 `wip fiber`。

`updateNum` 中预设的是 `wip fiber`。

当组件触发更新后，会在组件对应的 2 个 fiber 上标记更新。

当组件渲染时，`useState` 会执行，计算出新的状态，并清除 `wip fiber` 上的更新标记。

当渲染完成后，`current fiber` 与 `wip fiber` 交换位置，本次更新的 `wip fiber` 成为下次更新的 `current fiber`。

再谈 eagerState，其前提是：「当前组件没有任何更新」。

具体来说，是组件对应的 `current fiber` 与 `wip fiber` 都不存在更新。

回到我们的例子：

第一次点击时，`current fiber` 与 `wip fiber` 同时标记更新。渲染后 `wip fiber` 的更新标记被清除，`current fiber` 还有更新标记。而在渲染完成后，`current fiber` 与 `wip fiber` 交换位置：`wip fiber` 存在更新，`current fiber` 不存在更新。

第二次点击时，因为 `wip fiber` 存在更新，没有命中 eagerState，`App` 组件仍会渲染。渲染后 `wip fiber` 的更新标记被清除，此时两个 fiber 上都不存在更新标记。因此，后面的点击都会触发 eagerState，不进行渲染。

第三次点击时，与 `App` 组件相关的 2 个 fiber 中都没有更新，组件即会命中 eagerState，从而跳过渲染。

**图解**：

![set-same-state](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/set-same-state.gif)

</details>

## 辅助阅读

- [React diff 为什么从根节点开始，而不是从状态变化的组件开始？](https://www.zhihu.com/question/658309560)
- [React 为什么重新渲染](https://blog.skk.moe/post/react-re-renders-101/)
- [从 Context 源码实现谈 React 性能优化](https://zhuanlan.zhihu.com/p/337952324)
- [React 内部的性能优化没有达到极致？](https://zhuanlan.zhihu.com/p/479245926)
- [ObservedBits: React Context的秘密功能](https://zhuanlan.zhihu.com/p/51073183)
