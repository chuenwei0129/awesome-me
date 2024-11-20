---
nav:
  title: Library
  order: 0
title: useToggle
toc: content
order: -996
group:
  title: Hooks
  order: -998
---

# useToggle

## 使用场景

<code src="./usage/demo1.tsx">不使用 useToggle</code>
<code src="./usage/demo2.tsx">使用 useToggle</code>

## 限制

原先的版本中，`useMemo` 是依赖 `defaultValue` 和 `reverseValue` 的，后来 ahooks 团队的成员在后来的维护中，将它俩移出依赖了。

当我们使用 `useToggle` 去对 `defaultValue` 和 `reverseValue` 进行状态管理时，我们期望实现的是二者之间的切换，而这个切换是建立在内部通过 `React.useState` 创建的作为中转站的 state 变量上的。能够改变 state 的只有 actions 中返回的 `set`、`toggle`、`setLeft`、`setRight` 方法。

实际上，`defaultValue` 和 `reverseValue` 本身不会因为 `useToggle` 的行为发生改变。

因此 `defaultValue` 和 `reverseValue` 在理想的使用情况下，是不变的，那么 `useMemo` 也没必要去依赖两个不变的变量了。

这也是 ahooks 期望我们使用 `useToggle` 的方式。

⚠当我们传给 `useToggle` 的 `defaultValue` 和 `reverseValue` 是来自于父组件的 state，那么这就会导致预期之外的情况了。⚠

即父组件的 state 作为 props 传递给子组件。

<code src="./usage/demo3.tsx"></code>
