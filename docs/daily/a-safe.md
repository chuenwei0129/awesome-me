---
title: a 标签的安全问题
toc: content
---

## `<a>`标签中的`target="_blank"`安全问题

在`<a>`标签中使用`target="_blank"`，会使链接在一个新的标签页中打开。然而，此时新打开的页面能够通过`window.opener`访问源页面的`window`对象，从而带来了安全隐患。

- 举例来说，假设网页A中存在一个超链接，指向网页B。
- B网页可以通过`window.opener`获取到A网页的`window`对象，这为网络攻击者提供了机会。他们可以利用这一访问来操控A网页，将其重定向到一个钓鱼页面（例如 `window.opener.location.href = "fishing.com"`），而用户在不知情的情况下，可能会在该钓鱼页面输入用户名和密码，从而导致信息泄露。

## 通过设置`rel="noopener noreferrer"`防范钓鱼攻击

为确保安全，可以在`<a>`标签中使用`rel="noopener noreferrer"`。

- `<a>`标签的`rel`属性用于指定当前文档与被链接文档之间的关系。
- 此属性只有在使用了`href`属性后才有效。
- 当使用`target="_blank"`时，增加`rel="noopener noreferrer"`可以提高安全性。

- 设置`rel="noopener"`后，`window.opener`会被设为空，这样新打开的页面便无法获取到来源页面的`window`对象。
- 设置`rel="noreferrer"`后，新打开的页面不仅无法获取来源页面的`window`对象，同时也无法获取`document.referrer`信息（该信息包含了来源页面的地址）。

> 参考资料：[关于淘宝网前端网页的a标签跳转新窗口的安全性问题的探讨？](https://www.zhihu.com/question/267580521)
