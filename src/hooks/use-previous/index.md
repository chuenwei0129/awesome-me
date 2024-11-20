---
nav:
  title: Library
  order: 0
title: usePrevious
toc: content
order: -994
group:
  title: Hooks
  order: -998
---

# usePrevious

## 实现思路

- 维护两个状态 `prevRef`（保存上一次的状态）和 `curRef`（保存当前状态）。
- 状态变更时，使用 `shouldUpdate` 判断是否发生变化，默认通过 `Object.is` 判断。开发者可以自定义 `shouldUpdate` 函数，并决定什么时候记录上一次状态。
- 状态发生变化时，更新 `prevRef` 的值为上一个 `curRef`，并更新 `curRef` 为当前的状态。

## 示例代码

以下是 `usePrevious` 的实现代码：

<code src="./usage/demo1.tsx"></code>

使用该 Hook 的示例：

<code src="./usage/demo2.tsx"></code>
