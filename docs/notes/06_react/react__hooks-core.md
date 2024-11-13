---
title: Hooks
order: 5
toc: content
group:
  title: 道
---

## 什么是 Hooks？ 🤔

> React 的 hooks 是在 fiber 之后出现的特性，所以很多人误以为 hooks 是必须依赖 fiber 才能实现的，其实并不是，**它们俩没啥必然联系。**

"hooks" 直译是 “钩子”，它并不仅是 react，甚至不仅是前端界的专用术语，而是整个行业所熟知的用语。

通常指：**系统运行到某一时期时，会调用被注册到该时机的回调函数**。 比较常见的钩子有：windows 系统的钩子能监听到系统的各种事件，浏览器提供的 onload 或 addEventListener 能注册在浏览器各种时机被调用的方法。以上这些，都可以被称一声 "hook"。

但是很显然，在特定领域的特定话题下，hooks 这个词被赋予了一些特殊的含义。

以 React 为例，hooks 是：一系列以 “use” 作为开头的方法，提供了在函数式组件中完成开发工作的能力。详细点说就是，**Hook 是 React 内部引擎扩展到函数组件的一个 “钩子（hook）”，通过这个钩子，函数组件可以读写 React 内部保存的信息，且该信息在其多次执行时保持一致。**

## 为什么要有 Hooks？ 🌟

首先，React 的开发理念践行了如下公式（即：UI 是数据快照经过函数映射而来）：

```plaintext
UI = fn(data)
```

要落地这个理念，有两个要素需要实现：

- 数据快照
- 函数映射

在这里，FP 中「不可变数据」更适合作为「数据快照」的载体，所以 React 中状态是不可变的，因为状态的本质是快照。而「函数映射」的载体则没有特殊要求。在 React 中，每次触发更新，所有组件都会重新 `render`，`render` 的过程就是「函数映射」的过程，输入是 `props` 与 `state`，输出是 JSX。

与 React 相对的，Vue 中组件则更符合 OOP 的理念：组件的 `setup` 方法只会在初始化时执行一次，后续触发更新时操作的都是同一个闭包中的数据。这里面的闭包就是 OOP 思想中的实例。

既然 React 对「函数映射」的载体没有特殊要求，那么类组件、函数组件都是可以的。那为什么函数组件最终替代了类组件成为 React 开发的主流呢？很多同学认为「函数组件的 Hooks 可以更好地复用逻辑」这一点，是函数组件优于类组件的主要原因。但实际上，基于装饰器的类开发模式早已被验证是优秀的逻辑复用模式，类组件配合 TS 装饰器的模式是行得通的。

那么，函数组件主要优于类组件的原因还是 —— 函数组件能够更好地落实 `UI = fn(data)` 这一理念。

公式中的 `data` 是「数据快照」的含义。在 React 中，快照主要包括三类数据：

- `state`
- `props`
- `context`

对于同一个组件，根据公式 `UI = fn(data)`，相同的快照输入应该获得相同输出（JSX）。

但状态更新也可能触发「副作用」，比如请求数据、操作 DOM...

在类组件中，这些「副作用」逻辑被分散在各个生命周期钩子函数中，React 无法掌控。而在函数组件中：

- 副作用受限在 `useEffect` 中。每次 `render`，React 都会保证上次的副作用效果已经被清除（通过 `useEffect` 回调的返回值函数）。
- `ref` 的传播也需要借由 `forwardRef`，这进一步限制了 `ref` 可能的影响范围。
- 数据请求的副作用被交给 `Suspense` 处理。

总而言之，使用函数组件时，所有副作用都处于一种「受到管控」的状态，可以尽可能保证每次更新时「相同的快照输入，获得相同的 JSX 输出」，所以函数组件在 React 中才会发扬光大。同时，这也契合了 FP 中的纯函数思想。

## 如何使用 Hooks？ 🛠️

- [官方文档：React 内置 Hook](https://zh-hans.react.dev/reference/react/hooks)
- [不优雅的 React Hooks](https://zhuanlan.zhihu.com/p/455317250)
- [React Hooks 你真的用对了吗？](https://zhuanlan.zhihu.com/p/85969406)
- [使用 React hooks 如何只让下面这段代码的子组件只 render 一次？](https://www.zhihu.com/question/444068787)
- [React Hooks 使用误区，驳官方文档](https://zhuanlan.zhihu.com/p/450513902)
- [如何看待《React Hooks 使用误区，驳官方文档》？](https://www.zhihu.com/question/508780830/answer/2469880671)
- [如何看待阿里巴巴开源的 ahooks?](https://www.zhihu.com/question/406884512)
- [React hooks 有必要分离 ui 和业务逻辑吗？](https://www.zhihu.com/question/561700319)

## 如何实现 Hooks？ 🔨

- 视频：[Can Swyx recreate React Hooks and useState in under 30 min? - JSConf.Asia](https://www.youtube.com/watch?v=KJP1E-Y-xyo)
- 文章：[29 行代码深入 React Hooks 原理](https://zhuanlan.zhihu.com/p/127255755)

## 推荐阅读 📚

- [React 推荐函数组件是纯函数，但是组件有状态就不可能是纯函数，怎么理解有状态的纯函数？](https://www.zhihu.com/question/537538929/answer/2527746562)
- [React Hooks 是否可以改为用类似 Vue 3 Composition API 的方式实现？](https://www.zhihu.com/question/378861485/answer/1125724740)
- [Hooks 是否过誉了？前端应该跟着 React 走还是跟着 JS、TS 走？](https://www.zhihu.com/question/468249924/answer/1968728853)
