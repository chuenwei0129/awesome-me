---
nav:
  title: Library
  order: 0
title: useUpdateEffect
toc: content
group:
  title: Hooks
  order: -998
---

# useUpdateEffect

## 实现思路

实现思路：初始化一个标识符，刚开始为 false。当首次执行完的时候，置为 true。只有标识符为 true 的时候，才执行回调函数。

## 使用场景

<code src="./usage/demo1.tsx"></code>
