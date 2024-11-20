---
title: useSyncExternalStore
order: 10
toc: content
group:
  title: 道
---

## tearing

[撕裂](https://en.wikipedia.org/wiki/Screen_tearing)（tearing）是图形编程中的一个传统术语，是指视觉上的不一致。

**撕裂通常是由于 React 使用了外部的状态导致的。React 在并发渲染过程中，这些外部的状态会发生变化，但是 React 却无法感知到变化。**

假设我们有一个外部 store，初始颜色是蓝色。在我们的应用中组件树中有多个组件都依赖于 store 的值。

假设组件树的渲染需要 400 ms，在渲染到 100 ms 时，假设一个用户点击了按钮，将 store 的颜色由蓝色改为红色。

在非并发渲染场景下，不会发生任何处理。因为组件树的渲染是同步的。用户的点击事件会在视图渲染完成后执行。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/fe-engineering/0c371a43388a4ce29eba5a7deb888c85_tplv-k3u1fbpfcp-zoom-in-crop-mark_1304_0_0_0.webp)

但是在并发渲染场景下，React 可以让点击发生反应，打断视图渲染。此时很有可能因为时间分片的原因，前 100ms 有一些组件已经完成了渲染，引用的 store 值是蓝色，剩下 300ms 渲染的组件引用的 store 值是红色，这些组件虽然读取同一个数据却显示出不同的值，这种边缘情况就是 “撕裂”。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/fe-engineering/e758382e98814f5ab364e85ec3524ef9_tplv-k3u1fbpfcp-zoom-in-crop-mark_1304_0_0_0.webp)

## useSyncExternalStore

> [如何理解 React 18 中的 useSyncExternalStore ?](https://www.zhihu.com/question/502917860/answer/2252338680)
