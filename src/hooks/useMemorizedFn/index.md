---
nav:
  title: Library
  order: 0
title: useMemorizedFn
toc: content
group:
  title: Hooks
  order: -998
---

# useMemorizedFn

在某些场景中，我们需要使用 useCallback 来记住一个函数，但是在第二个参数 deps 变化时，会重新生成函数，导致函数地址变化。

使用 useMemoizedFn，可以省略第二个参数 deps，同时保证函数地址永远不会变化。

<!-- <code src="./usage/demo1.tsx"></code> -->

useMemoizedFn 返回的函数与传入的 fn 的引用完全不同，且没有继承 fn 自身的属性。如果想要持久化后函数自身的属性不丢失，目前 useMemoizedFn 满足不了，请降级使用 useCallback、useMemo

<!-- <code src="./usage/demo1.tsx"></code> -->
