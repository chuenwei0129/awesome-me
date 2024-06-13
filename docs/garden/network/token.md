---
title: Token
order: 3
toc: content
group:
  title: WEB
---

## 为什么选择 Token 认证机制？

在之前探讨的 Session 认证机制中，我们了解到通过服务端共享的 session 可以实现用户身份的确认。然而，这种方法存在一定的局限性，比如需要搭建一个专门的 redis 集群来存储 session 信息。对于一些大型企业而言，使用 redis 是日常操作，但对于规模较小的公司，可能他们的业务量还没有到达非得使用 redis 的程度。那么，有没有一种机制可以不依赖于服务端存储 session 来验证用户身份呢？答案就是本文要介绍的关键技术：Token。

## Token 认证的工作流程

![Token认证流程示意图](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/me/20240419173603.png)

1. 用户通过输入用户名和密码登录，服务端在认证成功后会返回一个 token 给客户端。
2. 客户端将这个 token 保存在本地，一般是使用 localStorage 或者 cookie。
3. 当用户尝试访问一个受保护的路由或资源时，他们需要在请求头的 Authorization 字段中添加 token，格式为 `Authorization: Bearer <token>`。

您可能对此有以下疑问：

- 既然 token 只存储在浏览器中，服务端并没有存储，那么是否可以随意构造一个 token 发送给服务器呢？

  答案是不行的，因为服务器会通过一套校验机制来验证 token 的合法性。

- 不像 session 那样通过 sessionId 来确定用户身份，那么如何确定是哪个用户呢？

  实际上，token 本身可以包含用户信息，通过解密就能获取到。

为了解释这些疑惑，我们需要先认识一下 JWT。

## 什么是 JWT？

> 参考：[JSON Web Token 入门教程](https://www.ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html)

![JWT结构示意图](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/me/20240419202516.png)

JWT 主要由三部分组成：

```sh
Header.Payload.Signature
```

1. **Header**：一个 JSON 对象，描述 JWT 的元数据，包括签名算法等信息。
2. **Payload**：一个 JSON 对象，包含需要传递的数据。
3. **Signature**：JWT 的签名，用于验证 token 的合法性，防止数据篡改。

当服务器收到浏览器发送的 token 时，会根据 token 中的 header 和 payload 以及密钥生成签名，然后与 token 中的签名进行比对。如果匹配成功，说明 token 合法。此外，payload 中存有用户信息，因此，获取到 token 后，就可以直接解析 payload 获取用户信息，避免了像 session 那样需要额外的存取开销。

这种机制的优势在于，只要服务器的密钥没有泄露，生成的 token 就是安全的。因为如果有人试图伪造 token，在签名验证环节将无法通过，从而判定 token 非法。

通过 Token 认证，我们有效地解决了 token 必须保存在服务器的问题，实现了分布式存储。但需要注意的是，一旦 token 被服务器生成，除非过期，否则无法使其失效。

还需要留意的是：

- Token 通常存放在请求头的 Authorization 字段中，而不是 Cookie。
- JWT 默认不加密，但可以进行加密处理。生成原始 Token 后，可以用密钥再次加密。
- 如果不加密，不应将敏感数据写入 JWT。
- 为防止盗用，建议不通过 HTTP 明文传输 JWT，而应使用 HTTPS 协议。

## 为什么 JWT 一般是放在 header 的 Authorization 自定义头里，而不是放在 Cookie 里？

- **跨站访问的限制**：Cookie 本身具备跨站访问的限制，这**意味着不同的网站无法共享同一个 Cookie**。这一特性给实现多应用或多系统间的单点登录 (SSO) 带来了挑战，因为它要求采取额外的策略以实现跨站的认证状态共享。

- **移动端的兼容性问题**：在移动应用开发中，我们常常面临一个现实——原生请求不支持 Cookie。鉴于 Session ID 通常储存在 Cookie 中，这一点意味着传统的基于 Session 的认证方式在移动平台上的适用性受限。与之相比，JWT 提供了一个更为灵活的解决方案。作为一个标准化的令牌，JWT 可以通过 HTTP 头部的 Authorization 字段进行传输，避免了对 Cookie 的依赖。得益于 JWT 的设计，它自然而然地支持跨平台应用，从而提升了系统的可扩展性和灵活性。

## 什么是单点登录？

> 所谓单点登录，是指在多个应用系统中，用户只需要登录一次就可以访问所有相互信任的应用系统。

![20240419205156](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/me/20240419205156.png)

只要在 header 中的 authorize 字段 (或其他自定义) 加上 token 即可完成所有跨域站点的认证。

## Token 的缺点

尽管 Token 在现代网络安全中扮演着重要角色，但它并非万能。事实上，很多大型企业更倾向于使用 Session 机制。Token 的不足主要体现在以下两个方面：

1. **Token 长度问题**：Token 由头部 (header) 和载荷 (payload) 编码而成，通常比传统的 Session ID 要长得多。随着存储在 Token 中的信息增多，其长度也随之增加。这意味着每次 HTTP 请求都会携带一个较长的 Token，这无疑增加了网络请求的负担。

2. **安全性考量**：Token 一般存储在浏览器中，但具体存放位置则是个问题。由于 Token 的长度问题，将其存储在 Cookie 中可能会导致超出 Cookie 的大小限制，因此，它们通常被存储在本地存储 (如 LocalStorage) 中。这样做带来了安全隐患，因为 LocalStorage 可以被 JavaScript 直接访问，这可能会被恶意脚本利用。**此外，一旦 Token 被发放，就无法被服务端主动使其失效，只能等待其自然过期。这意味着，如果服务端检测到安全威胁，也无法立即废除已经发放的 Token。**

## 无感刷新 Token 机制

### 概述

JSON Web Token (JWT) 虽然是一种广泛使用的身份验证方式，但它有一个明显的缺点：一旦签发，除非服务器采取额外措施，否则它会一直有效直到过期。为了降低潜在的安全风险，推荐使用有效期较短的 JWT。为了进一步提升安全性和用户体验，引入了无感刷新令牌机制。

无感刷新令牌机制允许前端应用自动更新访问令牌 (Access Token)，而无需用户手动介入，从而无缝维护会话的持续性和应用的安全性。这一机制尤其适用于需要提供流畅用户体验的单页应用 (SPA) 和移动应用。

### 工作原理

![20240419213638](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/me/20240419213638.png)

1. **双令牌系统**：用户首次登录时，身份验证服务器同时发放短期有效的 Access Token 和长期的 Refresh Token。Access Token 用于访问受保护资源，Refresh Token 则用于在 Access Token 过期时获取新的 Access Token。

2. **自动刷新**：前端应用监控 Access Token 的有效期。当 Access Token 接近过期或已过期时，应用将自动使用 Refresh Token 请求身份验证服务器颁发新的 Access Token，无需用户参与。

3. **令牌更新**：身份验证服务器在验证 Refresh Token 有效后，发放新的 Access Token (有时也包括新的 Refresh Token)。前端应用随后更新存储的令牌信息，确保后续 API 请求能够使用新的 Access Token。

### 实施策略

- **HTTP 请求拦截**：通过 HTTP 请求拦截器 (如 Angular 的 HttpInterceptor 或 Axios 的 interceptors)，监测 API 响应状态。若发现 Access Token 失效 (通常表现为 401 或 403 错误)，则自动触发 Token 刷新流程。

- **前端存储**：选择合适的存储方式 (LocalStorage、SessionStorage 或内存) 对安全性和用户体验至关重要。不同的存储方案有其优缺点，需根据应用需求谨慎选择。

- **安全措施**：为防止 Refresh Token 泄露，实施无感刷新令牌机制时应考虑额外的安全措施，包括但不限于使用安全的令牌存储方案、合理设置令牌有效期、强制使用 HTTPS 等。

## 拓展：OAuth

> [你管这破玩意叫 OAuth](https://mp.weixin.qq.com/s?__biz=Mzk0MjE3NDE0Ng==&mid=2247496108&idx=1&sn=e8571ca239c974e8e93a10a12190497f&chksm=c2c58b01f5b20217de013699bd6978ae213d545605d4de49a19348b01241ebe2dd534b671767&scene=178&cur_album_id=1703494881072955395#rd)
