---
title: Cookie
order: 1
toc: content
group:
  title: WEB
---

## 概述

HTTP Cookie (也叫 Web Cookie 或浏览器 Cookie) 是**服务器发送到用户浏览器并保存在本地的一小块数据**。服务器在第一次收到 HTTP 请求后，会在响应标头里面添加一个或多个 `Set-Cookie` 选项。收到响应后，浏览器会存储 cookie 并在下次向同一服务器再发起请求时携带并发送到服务器上。通常，它用于告知服务端两个请求是否来自同一浏览器 —— 如保持用户的登录状态。Cookie 使基于无状态的 HTTP 协议记录稳定的状态信息成为了可能。

Cookie 主要用于以下三个方面：

- **会话状态管理**：如用户登录状态、购物车、游戏分数或其他需要记录的信息
- **个性化设置**：如用户自定义设置、主题和其他设置
- **浏览器行为跟踪**：如跟踪分析用户行为等

Cookie 曾一度用于客户端数据的存储，因当时并没有其他合适的存储办法而作为唯一的存储手段，但现在推荐使用现代存储 API。由于服务器指定 Cookie 后，浏览器的每次请求都会携带 Cookie 数据，会带来额外的性能开销 (尤其是在移动环境下)。

## 创建 Cookie

服务器使用 `Set-Cookie` 响应头部向用户代理 (一般是浏览器) 发送 Cookie 信息。一个简单的 Cookie 可能像这样：

```sh
HTTP/1.0 200 OK
Content-type: text/html
Set-Cookie: yummy_cookie=choco
Set-Cookie: tasty_cookie=strawberry

[页面内容]
```

现在，对该服务器发起的每一次新请求，浏览器都会将之前保存的 Cookie 信息通过 Cookie 请求头部再发送给服务器。

```sh
GET /sample_page.html HTTP/1.1
Host: www.example.org
Cookie: yummy_cookie=choco; tasty_cookie=strawberry
```

## 限制访问 Cookie

使用 Secure 和 HttpOnly 属性可以增强 Cookie 的安全性。Secure 属性确保 Cookie 仅通过 HTTPS 发送，而 HttpOnly 属性限制了 JavaScript 的访问，减少了跨站脚本 (XSS) 攻击的风险。

## 定义 Cookie 发送的位置

Domain 和 Path 标识共同定义了 Cookie 的作用域：即 Cookie 应该发送给哪些 URL。

> ⚠️ 注意：
>
> 发生跨域 XHR 请求时，即使请求 URL 的域名和路径都满足 Cookie 的 domain 和 path，默认情况下 Cookie 也不会自动被添加到请求头部中。为了使跨域请求能够携带 Cookie，服务端必须在响应头中设置 `Access-Control-Allow-Credentials` 为 `true`，并且客户端的 XHR 请求也必须将 `withCredentials` 属性设置为 `true`。

### Domain

Domain 指定了哪些主机可以接受 Cookie。如果不指定，该属性默认为同一 host 设置 cookie，不包含子域名。

如果设置 `Domain=mozilla.org`，则 Cookie 也包含在子域名中 (如 `developer.mozilla.org`)。

### Path

对于指定域中的那个路径，应该向服务器发送 Cookie。例如，你可以指定 Cookie 只有从 `http://www.wrox.com/books/` 中才能访问，那么 `http://www.wrox.com` 的页面就不会发送 Cookie 信息，即使请求都是来自同一个域的。

<!-- 服务器白名单 -->
## Cookie 的 SameSite 属性

SameSite 属性可以让 Cookie 在**跨站请求时不会被发送**，从而可以阻止跨站请求伪造攻击 (CSRF)。

SameSite 可以有下面三种值：

- `Strict`：仅允许一方请求携带 Cookie，即浏览器将只发送相同站点请求的 Cookie，即当前网页 URL 与请求目标 URL 完全一致。
- `Lax`：允许部分第三方请求携带 Cookie
- `None`：无论是否跨站都会发送 Cookie，但仅在安全的上下文中 (即，如果 `SameSite=None`，且还必须设置 `Secure` 属性)。

```sh
Set-Cookie: CookieName=CookieValue; SameSite=Lax;
```

> 跨站和跨域是不同的。同站/跨站和第一方/第三方是等价的。

Cookie 中的同站判断就比较宽松：**只要两个 URL 的 `eTLD+1` 相同即可，不需要考虑协议和端口**。

其中，`eTLD` 表示有效顶级域名，注册于 Mozilla 维护的公共后缀列表中，例如，`.com`、`.co.uk`、`.github.io` 等。

`eTLD+1` 则表示，有效顶级域名+二级域名，例如 `taobao.com` 等。

> 与 SameSite 相关的标准最近发生了变化
>
> cookie 使用不同的协议 (http 或 https) 发送来自同一域的 cookie，不再视为来自同一站点。
>
> 如果 SameSite 未指定，之前默认是 `SameSite=None`，Chrome80 后默认是 `Lax`。

接下来看下从 None 改成 Lax 到底影响了哪些地方的 Cookies 的发送？直接来一个图表：

| 请求类型  | 实例                              | 以前        | Strict | Lax         | None        |
| :-------- | :-------------------------------- | :---------- | :----- | :---------- | :---------- |
| 链接      | `<a href="..."></a>`              | 发送 Cookie | 不发送 | 发送 Cookie | 发送 Cookie |
| 预加载    | `<link rel="prerender" href=""/>` | 发送 Cookie | 不发送 | 发送 Cookie | 发送 Cookie |
| GET 表单  | `<from method="GET" action="">`   | 发送 Cookie | 不发送 | 发送 Cookie | 发送 Cookie |
| POST 表单 | `<from method="POST" action="">`  | 发送 Cookie | 不发送 | 不发送      | 发送 Cookie |
| iframe    | `<iframe src="..."></iframe>`     | 发送 Cookie | 不发送 | 不发送      | 发送 Cookie |
| AJAX      | `$.get("...")`                    | 发送 Cookie | 不发送 | 不发送      | 发送 Cookie |
| Image     | `<img src="...">`                 | 发送 Cookie | 不发送 | 不发送      | 发送 Cookie |

## expires，max-age

默认情况下，如果一个 `cookie` 没有设置这两个参数中的任何一个，那么在关闭浏览器之后，它就会消失。此类 `cookie` 被称为 “session cookie”。

为了让 `cookie` 在浏览器关闭后仍然存在，我们可以设置 `expires` 或 `max-age` 选项中的一个。

```js
expires=Tue, 19 Jan 2038 03:14:07 GMT
```

`cookie` 的到期日期，那时浏览器会自动删除它。

如果我们将 `expires` 设置为过去的时间，则 `cookie` 会被删除。

```js
max-age=3600
```

`expires` 的替代选项，具指明 `cookie` 的过期时间距离当前时间的**秒**数。

如果为 `0` 或负数，则 `cookie` 会被删除：

```js
// cookie 会在一小时后失效
document.cookie = 'user=John; max-age=3600'

// 删除 cookie（让它立即过期）
document.cookie = 'user=John; max-age=0'
```

## 特性

- 一个浏览器针对一个网站最多存 20 个 Cookie，浏览器一般只允许存放 300 个 Cookie。
-每个 Cookie 的长度不能超过 4KB (稀缺)。但不同的浏览器实现的不同。
