---
nav:
  title: Library
  order: 0
title: useMemoizedFn
toc: content
group:
  title: Hooks
  order: -998
---

# useMemorizedFn

> 持久化 function 的 Hook，理论上，可以使用 useMemoizedFn 完全代替 useCallback。

实现原理是通过 useRef 保持 function 引用地址不变，并且每次执行都可以拿到最新的 state 值。

## 使用场景

在某些场景中，我们需要使用 useCallback 来记住一个函数，但是在第二个参数 deps 变化时，会重新生成函数，导致函数地址变化。

使用 useMemoizedFn，可以省略第二个参数 deps，同时保证函数地址永远不会变化。

<code src="./usage/demo1.tsx"></code>

## 限制

useMemoizedFn 返回的函数与传入的 fn 的引用完全不同（因为返回的是个对 fn 包了一层的高阶函数），且没有继承 fn 自身的属性。如果想要持久化后函数自身的属性不丢失，目前 useMemoizedFn 满足不了，请降级使用 useCallback、useMemo。

<code src="./usage/demo2.tsx"></code>
