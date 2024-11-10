---
group:
  title: 2024 🐲
title: React 实现机制详解
toc: content
---

## JSX 中的 React 自动导入

在 React 中，我们使用 JSX 来定义界面布局，示例如下：

![React 组件 JSX 示意图](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/20241107164943.png)

JSX 代码通过 Babel 或 TypeScript 编译成渲染函数，类似于 `React.createElement` 的结构：

![React.createElement 示例](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/20241107165002.png)

因此，以前编写 React 组件时必须包含 `import * as React from 'react'`，因为编译后的代码需要调用 React 的 API。

你可以在 [Babel Playground](https://babeljs.io/repl) 中进行测试。

后来，渲染函数直接由编译器生成，如下所示：

![新式 Render Function 示例](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/20241107165018.png)

Babel 和 TypeScript 现已自动引入 `react/jsx-runtime` 包，这使得在书写组件时无需显式引入 React。

## 虚拟 DOM 和 Fiber 结构

渲染函数生成 React Element 对象，即虚拟 DOM。

![React Element 虚拟 DOM](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/20241107165056.png)

整个流程可以简化如下：

![虚拟 DOM 流程图](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/20241107165119.png)

虚拟 DOM（React Element）是一棵结构树，由 children 属性连接。

![虚拟 DOM 结构树](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/20241107165139.png)

React 然后将 React Element 树转变为 Fiber 结构，它表示为链表形式：

![Fiber 结构链表](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/20241107165212.png)

React Element 通过 children 属性关联父子节点，而转换为 Fiber 结构后，增加了 child、sibling 和 return 属性，以更好地描述节点关系。

这种结构可线性化为链表，简化处理：

![线性链表结构](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/20241107165249.png)

在处理 Fiber 链表时，React 利用 `workInProgress` 指针指向当前 Fiber 节点，从而实现并发处理。

## 时间分片机制

在浏览器中，任务通过事件循环逐个执行。

若任务执行时间过长，会导致渲染阻塞，造成页面卡顿。

过去基于 React Element 的递归渲染易导致性能问题。Fiber 结构则通过每次渲染判断时间限制，避免渲染阻塞。

fiber 链表的处理是可打断的，每次处理一个节点：

![20241107182359](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/20241107182359.png)

判断当前时间片是否有空余时间，若有则继续处理下个 Fiber 节点，否则延至下一任务：

![20241107182413](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/20241107182413.png)

通过记录 parent、sibling 信息，将树变为链表，每次处理一个 Fiber 节点，判断时间间隔，通过时间分片将处理过程分配至多个任务，避免页面卡顿。

## React 渲染流程

JSX 代码通过 Babel、tsc 编译为 render function，执行后变为 React Element 树，再转为 Fiber 结构（reconcile 过程）。

之前的 React Element：

![React Element 示例](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/20241107171322.png)

变为 Fiber 节点：

![Fiber 节点](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/20241107171344.png)

之后根据 Fiber 类型做不同处理：

![处理不同的 Fiber 节点](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/20241107171433.png)

例如，函数组件的 Fiber 节点会调用函数获取返回值，继续 reconcile children：

![函数组件处理](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/20241107171656.png)

Reconcile 不只是创建新 Fiber 节点，还会在更新时 diff 之前的 Fiber 节点，判断增删改并打上相应标记。

完成 reconcile 后，构建 Fiber 链表，保存当前状态：

![保存 Fiber 节点信息](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/20241107171847.png)

包括函数组件的 effect 函数。

之后遍历 Fiber 链表，处理 effect、增删改 DOM（commit 阶段）。

React 渲染分为两个主要阶段：

1. **render 阶段**：将 React Element 转成 Fiber 链表，由 Scheduler 调度，通过时间分片分配计算任务。

2. **commit 阶段**：reconcile 完成后遍历 Fiber 链表，执行 effect、更新 DOM。

commit 阶段分三个小阶段：

- **before mutation**：操作 DOM 前
- **mutation**：操作 DOM
- **layout**：操作 DOM 后

如，useEffect 的函数在 before mutation 前异步调度，useLayoutEffect 的函数在 layout 阶段同步执行。

React 团队将操作 DOM 分为三个小阶段，使处理更清晰。例如，ref 在 mutation 阶段更新 DOM，因此在 layout 阶段可拿到 ref。

![操作 DOM 阶段](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/20241107172200.png)

在实际实现中，对 commit 阶段不必划分如此细致。
