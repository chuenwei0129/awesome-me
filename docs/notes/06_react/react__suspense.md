---
title: React Suspense
toc: content
group:
  title: 深入探讨
---

大多数场景下，Suspense 就专门和 lazy 搭配使用的。

后台管理系统用这个挺多的，因为不可能一下子把所有路由的组件都下载下来，所以会用 lazy + Suspense 的方式异步加载暂时用不到的路由对应的组件。

<!-- <code src="../../../code/react/suspense/0"></code> -->

但有的时候，你会发现 Suspense 不搭配 lazy 也可以。比如 jotai 这个状态管理库，它就号称支持了 Suspense。

<!-- <code src="../../../code/react/suspense/1"></code> -->
