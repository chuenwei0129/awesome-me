---
title: useId
toc: content
group:
  title: 深入探讨
---

**useId：** 是一个用于生成横跨服务端和客户端的稳定的唯一 ID ，用于解决服务端与客户端产生 ID 不一致的问题，更重要的是保证了 React v18 的 `streaming renderer （流式渲染）`中 id 的稳定性。

这里我们简单介绍一下什么是 `streaming renderer`。

在之前的 React ssr 中，hydrate（ 与 render 相同，但作用于 ReactDOMServer 渲染的容器中 ）是整个渲染的，也就是说，无论当前模块有多大，都会一次性渲染，无法局部渲染。但这样就会有一个问题，如果这个模块过于庞大，请求数据量大，耗费时间长，这种效果并不是我们想要看到的。

于是在 React v18 上诞生出了 streaming renderer （流式渲染），也就是将整个模块进行拆分，让加载快的小模块先进行渲染，大的模块挂起，再逐步加载出大模块，就可以就解决上面的问题。

此时就有可能出现：服务端和客户端注册组件的顺序不一致的问题，所以 `useId` 就是为了解决此问题而诞生的，这样就保证了 `streaming renderer` 中 ID 的稳定性。
