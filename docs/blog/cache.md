---
group:
  title: 2024 🐲
title: 关于 GC
toc: content
---

问题
笔者的业务中，经常存在通过一堆ids，批量获取的场景，其中最复杂的一个场景是获取数千个手机号的数据，对于这种场景，发送请求并不容易。
这里先交代下背景，笔者的系统是运行在 http2 上的，由于 http2 支持并发处理，所以在笔者的系统里，后端接口设计是基于这个假设的，后端不会提供批量获取的接口，需要前端通过 id 来逐个获取。
当同时发送上千个请求时，浏览器会变的明显卡顿，虽然这样发送可以更快的获取数据，但会带来不好的用户体验，笔者的解决方案是，给并发添加最大数量限制。
这里我们将问题定义为，给你ids和并发限制max，一般作为面试题，会让你直接实现如下的函数：
js 代码解读复制代码function gets(ids, max) {
}

补充一点，如果是 http1.1，浏览器会有默认的并发限制，并不需要我们处理这个问题，比如Chrome 中并发数量是6个，所以这个问题的成立，建立在 http2 的基础上，如果是在面试中，不要忘了提这个知识点。
