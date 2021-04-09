# 网络请求<!-- omit in toc -->

## XMLHttpRequest

XMLHttpRequest 是一个内建的浏览器对象，它允许使用 JavaScript 发送 HTTP 请求。

虽然它的名字里面有 “XML” 一词，但它可以操作任何数据，而不仅仅是 XML 格式。我们可以用它来上传/下载文件，跟踪进度等。

现如今，我们有一个更为现代的方法叫做 fetch，它的出现使得 XMLHttpRequest 在某种程度上被弃用。

在现代 Web 开发中，出于以下三种原因，我们还在使用 XMLHttpRequest：

历史原因：我们需要支持现有的使用了 XMLHttpRequest 的脚本。
我们需要兼容旧浏览器，并且不想用 polyfill（例如为了使脚本更小）。
我们需要做一些 fetch 目前无法做到的事情，例如跟踪上传进度。
这些话听起来熟悉吗？如果是，那么请继续阅读下面的 XMLHttpRequest 相关内容吧。如果还不是很熟悉的话，那么请先阅读 Fetch 一章的内容。

## Fetch
## 长轮询（Long polling）
## Server Sent Events
## WebSocket
