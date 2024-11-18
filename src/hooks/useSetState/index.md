---
nav:
  title: Library
  order: 0
title: useSetState
toc: content
group:
  title: Hooks
  order: -998
---

# useSetState

> 用于以对象形式管理状态，支持部分更新和合并。

## 使用场景

当你需要管理一个状态对象，其中包含多个属性，并且你希望能够方便地更新这些属性的部分值时，`useSetState` 会非常有帮助。

举个栗子 🌰：

想象一下，你正准备开一个家庭聚会，你需要准备一些物品。你有一个购物清单对象，其中包含了许多项目。在整个准备过程中，你需要不断地更新这个清单，比如你买到了饮料，还差水果和点心。这个时候，你不想每次都重写整个购物清单，而只是想更新其中的某些项目，这就是 `useSetState` 可以帮你做到的！

## 示例

### 更新部分对象属性

在这个例子中，我们展示了如何只更新状态对象中的部分内容。

<code src="./usage/demo1.tsx"></code>

### 基于前一个状态更新

假设你需要记录聚会邀请的嘉宾人数并动态更新。在这个例子中，我们展示了如何基于前一个状态来更新当前状态。

<code src="./usage/demo2.tsx"></code>

## 类型签名

```js
function useSetState<S extends Record<string, unknown>>(initialState: S | (() => S)): [S, SetState<S>]
```

## 参数

| 参数名       | 类型             | 是否必填 | 说明                         |
| :----------- | :--------------- | :------: | :--------------------------- |
| initialState | `S` 或 `() => S` |    是    | 初始状态值或初始化状态的函数 |

## 返回值

返回一个由当前状态对象和一个用于更新状态的函数组成的元组。

| 参数名   | 类型          | 说明               |
| :------- | :------------ | :----------------- |
| state    | `S`           | 当前状态对象       |
| setState | `SetState<S>` | 用于更新状态的函数 |

`SetState` 类型定义如下：

```ts
type SetState<S extends Record<string, unknown>> = <K extends keyof S>(
  state: Pick<S, K> | null | ((prevState: Readonly<S>) => Pick<S, K> | S | null),
) => void;
```
