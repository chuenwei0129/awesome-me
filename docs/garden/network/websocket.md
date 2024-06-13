---
title: WebSocket 篇
order: 5
toc: content
group:
  title: 基础知识
---

## WebSocket 是什么？

在了解 WebSocket 之前，先让我们回顾一下 TCP 的通信模式。**TCP 支持全双工通信，即连接的双方都可在任何时刻向对方发送数据**。然而，广泛使用的 HTTP/1.1 协议，尽管建立在 TCP 之上，却仅支持半双工通信，**即同一时间里，客户端和服务器只能有一方主动发数据**。

这种限制源自 HTTP 协议最初的设计目标，即简单地请求和接收网页内容。它没有考虑到需要频繁双向数据交换的应用场景，如实时聊天室。

因此，为了更有效地支持这种实时、双向的通信需求，基于 TCP 的新应用层协议 WebSocket 应运而生。**尽管名称中包含 “socket”，WebSocket 实际上与底层的 socket 通信机制大相径庭，更不应与之混淆。**

## HTTP 服务器 “主动” 消息推送的策略

### 常规轮询技术

**常规轮询通过客户端定期发送请求至服务器来检查是否有新消息**。虽然这种方式能模拟出服务器 “主动” 推送的效果，但其**实质是客户端的频繁轮询**。这不仅增加了网络和服务器的负担，还可能导致用户体验的延迟。

### 长轮询技术

长轮询技术对常规轮询进行了改进。客户端发送请求后，如果服务器暂时没有新消息，它会保持请求挂起，直到有新消息可发送。这种方法减少了请求的频次，并能迅速响应用户操作。

![20240417225354](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/me/20240417225354.png)

## 怎么建立 WebSocket 连接

我们平时刷网页，一般都是在浏览器上刷的，一会刷刷图文，这时候用的是 **HTTP 协议**，一会打开网页游戏，这时候就得切换成 **WebSocket 协议**。

**为了兼容这些使用场景**。浏览器在 **TCP 三次握手**建立连接之后，都**统一使用 HTTP 协议**先进行一次通信。

- 如果此时是**普通的 HTTP 请求**，那后续双方就还是老样子继续用普通 HTTP 协议进行交互，这点没啥疑问。
- 如果这时候是**想建立 WebSocket 连接**，就会在 HTTP 请求里带上一些**特殊的 header 头**，如下：

```sh
Connection: Upgrade
Upgrade: WebSocket
Sec-WebSocket-Key: T2a6wZlAwhgQNqruZ2YUyg==\r\n
```

这些 header 头的意思是，浏览器想**升级协议 (Connection：Upgrade)**，并且**想升级成 WebSocket 协议 (Upgrade：WebSocket)**。同时带上一段**随机生成的 base64 码 (Sec-WebSocket-Key)**，发给服务器。

如果服务器正好支持升级成 WebSocket 协议。就会走 WebSocket 握手流程，同时根据客户端生成的 base64 码，用某个**公开的**算法变成另一段字符串，放在 HTTP 响应的 `Sec-WebSocket-Accept` 头里，同时带上 `101 状态码` (101 确实不常见，它其实是指协议切换)，发回给浏览器。

之后，浏览器也用同样的**公开算法**将 `base64码` 转成另一段字符串，如果这段字符串跟服务器传回来的**字符串一致**，那验证通过。

![20240417223952](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/me/20240417223952.png)

HTTP 的响应如下：

```sh
HTTP/1.1 101 Switching Protocols\r\n
Sec-WebSocket-Accept: iBJKv/ALIW2DobfoA4dmr3JHBCY=\r\n
Upgrade: WebSocket\r\n
Connection: Upgrade\r\n
```

就这样经历了一来一回两次 HTTP 握手，WebSocket 就建立完成了，后续双方就可以使用 webscoket 的数据格式进行通信了。

![20240417224035](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/me/20240417224035.png)

## 为什么说 WebSocket 不是是基于 HTTP 的新协议？

WebSocket 虽然在建立连接时利用 HTTP 协议进行协议升级，但一旦升级完成，它就与 HTTP 无关。这一点常被误解。WebSocket 是独立于 HTTP 的基于 TCP 的协议。

这就好像你喜欢的女生通过你要到了你大学室友的微信，然后他们自己就聊起来了。你能说这个女生是通过你去跟你室友沟通的吗？不能。你跟 HTTP 一样，都只是个工具人。

## WebSocket 的消息格式

数据包在 WebSocket 中被叫做帧，数据格式也是数据头 (内含 payload 长度) + payload data 的形式。

![20240417224517](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/me/20240417224517.png)

因为 TCP 协议本身就是全双工，但直接使用纯裸 TCP 去传输数据，会有粘包的 “问题”。为了解决这个问题，上层协议一般会用消息头+消息体的格式去重新包装要发的数据。

消息头里一般含有消息体的长度，通过这个长度可以去截取真正的消息体。

HTTP 协议和大部分 RPC 协议，以及我们今天介绍的 WebSocket 协议，都是这样设计的。
