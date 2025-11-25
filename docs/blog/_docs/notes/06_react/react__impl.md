---
title: 实现细节分析
toc: content
order: 2
group:
  title: 道
---

## JSX 中的 React 自动导入

在 React 中，我们使用 JSX 来定义界面布局，示例如下：

![React 组件 JSX 示意图](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/20241107164943.png "React 组件 JSX 示意图")

JSX 代码通过 Babel 或 TypeScript 编译成渲染函数，类似于 `React.createElement` 的结构：

![React.createElement 示例](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/20241107165002.png "React.createElement 示例")

因此，以前编写 React 组件时必须包含 `import * as React from 'react'`，因为编译后的代码需要调用 React 的 API。

你可以在 [Babel Playground](https://babeljs.io/repl) 中进行测试。

后来，渲染函数直接由编译器生成，如下所示：

![新式 Render Function 示例](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/20241107165018.png "新式 Render Function 示例")

Babel 和 TypeScript 现已自动引入 `react/jsx-runtime` 包，这使得在书写组件时无需显式引入 React。

## 虚拟 DOM 和 Fiber 结构

渲染函数生成 React Element 对象，即虚拟 DOM。整个流程可以简化如下：

![虚拟 DOM 流程图](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/20241107165119.png "虚拟 DOM 流程图")

虚拟 DOM（React Element）是一棵结构树，由 children 属性连接。

![虚拟 DOM 结构树](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/20241107165139.png "虚拟 DOM 结构树")

React 然后将 React Element 树转变为 Fiber 结构，它表示为链表形式：

![Fiber 结构链表](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/20241107165212.png "Fiber 结构链表")

React Element 通过 children 属性关联父子节点，而转换为 Fiber 结构后，增加了 child、sibling 和 return 属性，以更好地描述节点关系。

这种结构可线性化为链表，简化处理：

![线性链表结构](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/20241107165249.png "线性链表结构")

## 渲染流程

JSX 代码通过 Babel、tsc 编译为 render function，执行后变为 React Element 树，再转为 Fiber 结构（reconcile 过程）。

之前的 React Element：

![React Element 示例](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/20241107171322.png "React Element 示例")

变为 Fiber 节点：

![Fiber 节点](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/20241107171344.png "Fiber 节点")

之后根据 Fiber 类型做不同处理：

![处理不同的 Fiber 节点](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/20241107171433.png "处理不同的 Fiber 节点")

例如，函数组件的 Fiber 节点会调用函数获取返回值，继续 reconcile children：

![函数组件处理](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/20241107171656.png "函数组件处理")

**Reconcile 不只是创建新 Fiber 节点，还会在更新时 diff 之前的 Fiber 节点，判断增删改并打上相应标记。**

完成 reconcile 后，构建 Fiber 链表。

之后遍历 Fiber 链表，处理 effect、增删改 DOM（commit 阶段）。

React 渲染分为两个主要阶段：

1. **render 阶段**：将 React Element 转成 Fiber 链表，由 Scheduler 调度，通过时间分片分配计算任务。
2. **commit 阶段**：reconcile 完成后遍历 Fiber 链表，执行 effect、更新 DOM。

commit 阶段分三个小阶段：

- **before mutation**：操作 DOM 前
- **mutation**：操作 DOM
- **layout**：操作 DOM 后

**例如，useEffect 的函数在 before mutation 前异步调度，useLayoutEffect 的函数在 layout 阶段同步执行。**

React 团队将操作 DOM 分为三个小阶段，使处理更清晰。例如，ref 在 mutation 阶段更新 DOM，因此在 layout 阶段可拿到 ref。

![操作 DOM 阶段](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/20241107172200.png "操作 DOM 阶段")

## 时间分片处理机制

React 的完整渲染流程包括两个阶段：渲染（reconcile 过程）和提交（执行 DOM 操作、effect、生命周期函数的执行、ref 更新等）。当你调用 `setState` 后，会启动这两个阶段的渲染过程。

### 同步模式的挑战

**在同步模式下，多个 `setState` 调用引发的渲染流程会按顺序依次执行**。这种模式下虽然能正常工作，但可能会在处理复杂的 UI 更新时出现性能瓶颈。假设在一个搜索框中用户输入内容，会触发状态更新并重新渲染，同时另一个列表也根据输入值进行状态更新。如果这些渲染操作在同步模式下依次执行，当处理的 fiber 节点较多时，可能会导致用户输入的渲染延迟，降低用户体验。

```jsx | pure
function App() {
  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div>
      <input value={text} onChange={handleChange}/>
      <List text={deferredText}/>
    </div>
  );
}
```

### 并发模式的引入

React 18 引入了并发模式，通过优先级和可打断的渲染流程来解决上述问题。React 使用 fiber 结构来支持这样的并发渲染，因为 fiber 节点含有 parent 和 sibling 信息，使得即使渲染被打断，也可以准确地继续处理下一个节点。

源码中循环处理每个 fiber 节点的时候，有个指针记录着当前的 fiber 节点，叫做 workInProgress。

这个循环叫做 workLoop：

![workLoop 循环](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/20241107221558.png "workLoop 循环")

当然，上面这个是同步模式下的循环。

那并发模式下呢？

首先，并发和并行不一样，并行是同一时刻多件事情同时进行，而并发是只要一段时间内同时发生多件事情就行。

并发是通过交替执行来实现的，也就是这样：

![并发模式示意图](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/20241107221258.png "并发模式示意图")

上面是两个 `setState` 引起的两个渲染流程，先处理上面那次渲染的 1、2、3 的 fiber 节点，然后处理下面那次渲染的 1、2、3、4、5、6 的 fiber 节点，之后继续处理上面那次渲染的 4、5、6 的 fiber 节点。

这就是并发。

也就是在循环里多了个打断和恢复的机制，所以代码是这样的：

![打断和恢复机制](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/20241107221414.png "打断和恢复机制")

**每处理一个 fiber 节点，都判断下是否打断**，shouldYield 返回 true 的时候就终止这次循环。每次 `setState` 引起的渲染都是由 Scheduler 调度执行的，它维护了一个任务队列，上个任务执行完执行下个。没渲染完的话，再加一个新任务进去不就行了？

这就是并发模式的实现，也就是在 workLoop 里通过 shouldYield 的判断来打断渲染，之后把剩下的节点加入 Schedule 调度，来恢复渲染。

那 shouldYield 是根据什么来打断的呢？

根据过期时间，每次开始处理时记录个时间，如果处理完这个 fiber 节点，时间超了，那就打断。

那优先级呢？不会根据任务优先级打断么？

并不会，优先级高低会影响 Scheduler 里的 taskQueue 的排序结果，但打断只会根据过期时间。

也就是时间分片的含义。

那这样就算并发了，不还是高优先级任务得不到即使执行？

那不会，因为一个时间分片是 5ms，所以按照按优先级排序好的任务顺序来执行，就能让高优先级任务得到及时处理。

![时间分片示意图](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/20241107223017.png "时间分片示意图")

这个地方也是很多人的误区，**React 的并发模式的打断只会根据时间片，也就是每 5ms 就打断一次，并不会根据优先级来打断，优先级只会影响任务队列的任务排序。**

### 优先级分类

Scheduler 将任务优先级划分为五种：

![任务优先级划分](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/20241107223411.png "任务优先级划分")

1. **Immediate**: 如点击、键按等离散事件。
2. **UserBlocking**: 例如滚动、拖拽、鼠标悬停等连续事件。
3. **NormalPriority**: 默认优先级。
4. **LowPriority**: 较低优先级。
5. **IdlePriority**: 空闲优先级。

以上优先级会在任务队列中排序，但任务调度仍基于时间分片。

### React 的优先级机制

React 内部有 31 种 Lane 优先级，但是调度 Scheduler 任务的时候，会先转成事件优先级，然后再转成 Scheduler 的 5 种优先级。

### 并发 API 示例

React 18 里同时存在着两种循环方式，普通的循环和带时间分片的循环。也不是所有的特性都要时间分片，只有部分需要。

**那就是如果这次 `setState` 更新里包含了并发特性，就是用 `workLoopConcurrent`，否则走 `workLooSync` 就好了。**

在 React 18 中，有些 API 专门用于控制并发更新，如 `startTransition` 和 `useDeferredValue`。

#### 示例：使用 `startTransition`

`startTransition` 将低优先级的更新包裹起来，从而保证高优先级更新 (`setText2`) 能优先执行。

```jsx | pure
import React, { useTransition, useState } from "react";

export default function App() {
  const [text, setText] = useState('');
  const [text2, setText2] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(() => {
      setText('1');
    });
    setText2('2');
  };

  return (
    <button onClick={handleClick}>{text}{text2}</button>
  );
}
```

#### 示例：使用 `useDeferredValue`

对 state 用 useDeferredValue 包裹之后，新的 state 就会放到下一次更新。

```jsx | pure
function App() {
  const [text, setText] = useState("");
  const deferredText = useDeferredValue(text);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div>
      <input value={text} onChange={handleChange}/>
      <List text={deferredText}/>
    </div>
  );
}
```

## 双缓存机制

### 是什么？

在 React 的渲染过程中，最多会同时存在两棵 Fiber 树。当前屏幕上显示内容对应的 Fiber 树被称为 current Fiber 树 ，同时，与其对应的，React 会在内存中构建一棵新的 Fiber 树，称为 workInProgress Fiber 树 。通过使用双缓存机制，React 可以将未提交的更新在内存中构建。这让 React 可以在不影响用户体验的情况下，处理更多的更新和重绘。

React 使用 **双缓存** 来完成 Fiber 树的构建与替换 —— 对应着 DOM 树的创建与更新。

首次执行 `ReactDOM.render` 会创建 fiberRootNode（源码中叫 fiberRoot）和 rootFiber。

`FiberRootNode` 是整个应用的根节点，`RootFiber` 是调用 `ReactDOM.render` 创建的 `fiber`。之所以要区分 fiberRootNode 与 rootFiber，是因为在应用中我们可以多次调用 ReactDOM.render 渲染不同的组件树，他们会拥有不同的 rootFiber。但是整个应用的根节点只有一个，那就是 fiberRootNode。

**流程：**：

![rootFiber](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/rootFiber.gif)

### 为什么？

1. **可中断更新**：在 React 中，提交（commit）之前的任何更新可以被中断或取消。这样可以确保在未完成更新的情况下，不会立刻影响用户界面的显示。

2. **保护原始 virtual DOM**：直接修改 virtual DOM 会使得恢复操作变得困难。双缓存机制允许在内存中对 DOM 树进行修改，这样可以轻松恢复到初始状态。

3. **在 alternate 树上更新**：所有的更新会在内存中的 alternate 树上进行，而不是直接在原始 virtual DOM 上。这让原始的 DOM 树在需要时能够得到可靠地维护。

4. **双 DOM 树策略**：这种策略类似于垃圾回收（GC）中的复制算法，内存被分为使用中和备份两部分。在每次更新时，React 在内存中准备好新树，然后在提交阶段进行交换。

5. **平滑过渡**：通过在内存中准备更新并在提交阶段立即交换 Fiber 树，React 实现了用户界面的平滑过渡。这可以显著减少更新过程中的不一致性问题。

## 推荐阅读

- [为什么说 immutable 是 React 的核心，如何理解这一概念？](https://www.zhihu.com/question/446377023)
