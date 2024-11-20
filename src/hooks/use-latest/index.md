---
nav:
  title: Library
  order: 0
title: useLatest
toc: content
order: -999
group:
  title: Hooks
  order: -998
---

# useLatest

获取给定变量的最新值。

## 使用场景

有如下场景，当你按下 “发送” 后，提示框会在 3000 ms 后延迟显示。

输入 “123”，按下发送，然后再次快速编辑输入 “456”，提示框会显示 “123”。

<code src="./usage/demo1.tsx"></code>

提示框会显示点击时的内容而非当前输入文本，即 React 会保留每次渲染看到的那个 text。

> 其实 React 是在 Hooks API 时有意把行为改成了现在这样。React Class API 的行为和 Vue 都会拿到最新的 text。

当我们需要提示框显示当前文本而非点击时的内容时，就是我们的 `useLatest` 出山的时刻了，其实就是个 ref。

<code src="./usage/demo2.tsx"></code>

## 为什么 React 要这样设计 API？

> [Vue 和 React 的这个行为各是出于什么考虑？](https://www.zhihu.com/question/543057656/answer/2575930077)
