---
title: useState 状态的保存与更新
toc: content
group:
  title: 深入探讨
---

## useState 状态的保存与更新

每个组件都有个对应的 fiber 节点 (可以理解为虚拟 DOM)，用于保存组件相关信息。

`FunctionComponent` 的 render 本身只是函数调用。

每次 `FunctionComponent` render 时，React 全局变量 `currentlyRenderingFiber` 都会被赋值为该 `FunctionComponent` 对应的 fiber 节点。

一个 `FunctionComponent` 中可能存在多个 hook，**`currentlyRenderingFiber.memoizedState` 中保存一条 hook 对应数据的单向链表**。

举个例子：

```jsx | pure
function App() {
  // hookA
  const [stateA, setStateA] = useState(0);
  // hookB
  const [stateB, setStateB] = useState(0);
  // hookC
  const ref = useRef(0);

  const handleClick = () => {
    // 产生 update1
    setStateA(stateA + 1);
    // 产生 update2
    setStateA(stateA + 1);
    // 产生 update3
    setStateA(stateA + 1);
  };

  return (
    <button type="button" onClick={handleClick}>
      {stateA}
    </button>
  );
}
```

![20240618014337](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/me/20240618014337.png)

当 `FunctionComponent` **render** 时，每执行到一个 hook，都会将指向 `currentlyRenderingFiber.memoizedState` 链表的指针向后移动一次，指向当前 hook 对应数据。

> 这也是为什么 React 要求 hook 的调用顺序不能改变 (不能在条件语句中使用 hook) —— 每次 render 时都是从一条固定顺序的链表中获取 hook 对应数据的。

多次调用 `setStateA(stateA + 1)`，update 会形成一条环状链表。其中，queue 中保存了本次更新 update 的链表。**在计算 state 完成后，新的 state 会成为 memoizedState**。所以上图中 `setStateA-3` 会 `setStateA-1` 前面。

## 调用 `window.updateNum(1)` 可以将视图中的 0 更新为 1 么？

```jsx {3} | pure
function App() {
  const [num, updateNum] = useState(0);
  window.updateNum = updateNum;
  return num;
}
```

<details><summary><b>点击展示答案</b></summary>

> **答案**：可以。

我们需要看看这里的 `updateNum` 方法的具体实现：

```js
updateNum === dispatchAction.bind(null, currentlyRenderingFiber, queue);
```

可见，`updateNum` 方法即绑定了 `currentlyRenderingFiber` 与 `queue` (即 `hook.queue`) 的 `dispatchAction`。调用 `dispatchAction` 的目的是生成 update，并插入到 `hook.queue` 链表中。

既然 `queue` 作为预置参数已经绑定给 `dispatchAction`，那么调用 `dispatchAction` 就不仅局限在 `FunctionComponent` 内部了。

</details>

## 参考资料

> [关于 useState 的一切](https://zhuanlan.zhihu.com/p/200855720)
