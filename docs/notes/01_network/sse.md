---
title: SSE 篇
order: 5
toc: content
group:
  title: 基础知识
---

## [Server Sent Events](https://developer.mozilla.org/zh-CN/docs/Web/API/Server-sent_events/Using_server-sent_events) 的使用场景

在一般情况下，客户端需要从后端获取数据时，通常会发起一个 HTTP 请求，后端随后以 HTTP 响应的形式返回所需的数据。这种通信方式我们非常熟悉，其特点包括：

1. 通常由客户端主动发起每次交流。
2. HTTP 请求和 HTTP 响应都是一对一的。

如果我们希望频繁获取后端的通知（如新闻更新或消息推送），以传统方式实现将只好采用轮询，如下图所示：

![轮询示意图](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/20241026220418.png)

这种方案的缺点非常明显：

1. 频繁产生大量无效请求。
2. 设定轮询间隔是件挺尴尬的事情 —— 太短导致更多无用请求，浪费资源；太长则导致无法及时收到后端的通知。

也许你会想到使用 WebSocket，但 WebSocket 更适用于需要双向通信的场合，比如聊天室。同时，WebSocket 的实现较为复杂，需要进行显著的代码修改，并且使用的是不同于 HTTP 的协议。对于仅需后端频繁向客户端推送通知/数据的场景，使用 WebSocket 就像是用大炮打蚊子。

在这种情况下，**Server Sent Events (SSE)** 是一个非常理想的选择——其轻量级特性加上基于 HTTP 协议，使得后端可以随时向 Web 页面推送信息。

如下图所示，SSE 是由客户端向后端发起一个请求，建立起长连接（keep-alive connection）。

![SSE 连接示意图](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/20241026220610.png)

## Server Sent Events 使用要点

1. 如果生成事件的脚本不同源，应该创建一个新的包含 URL 和 options 参数的 `EventSource` 对象。

2. 如果服务器发送的消息中没有 `event` 字段，则这些消息会被视为 `message` 事件。如果服务器发送的消息中定义了 `event` 字段，就会以 `event` 中给定的名称作为事件接收。你可以在一个事件流中同时使用命名事件和未命名事件。

3. SSE 是基于 HTTP 协议的。当不通过 HTTP/2 使用时，SSE 会受到最大连接数的限制。使用 HTTP/2 时，同一时间内 HTTP 最大连接数由服务器和客户端之间协商（默认为 100）。

4. 发送事件的服务器端脚本需要使用 `text/event-stream` MIME 类型响应内容。`text` 表明了通讯数据是明文，`event-stream` 表明了是事件流的形式。每个通知以文本块形式发送，并以一对换行符结尾。

5. 事件流是一个简单的文本数据流，文本应该使用 UTF-8 格式的编码。事件流中的消息由一对换行符分开。以冒号开头的行为注释行，会被忽略。

6. 当发生错误时（例如网络超时或与访问控制有关的问题），会生成一个错误事件。可以通过在 `EventSource` 对象上实现 `onerror` 回调来编程地处理它。

7. 默认情况下，如果客户端和服务器之间的连接关闭，则连接将重新启动。客户端可以使用 `.close()` 方法终止连接。在 SSE 中，后端是无法主动关闭连接的，必须由客户端关闭。

## 数据格式

数据格式方面，SSE 使用的是 UTF-8 编码的文本格式。

使用两个换行符来分隔前后的消息，每条消息支持四种属性，属性名和属性值之间用冒号区分，新起一行（即使用一个换行符）创建下一个属性。

举个例子：

```plaintext
id: D420B6E8-2F51-4235-B778-5C1C494681E8
event: city-notification
retry: 3000
data: Plainville


id: 3AC67AA0-2852-4D30-9103-23CEF4B43D6D
event: city-notification
retry: 3000
data: Bellevue
```

上面有两条消息（两个 server sent event），两条消息之间有一个空行，即 'Plainville' 与下一个 'id' 之间有两个换行符。

每条消息都有四个属性：

- **id** - 当前消息的 id。
- **event** - 当前消息的类型，根据业务需要自行定义。例如，例子里是 `city-notification`；如果是天气推送，这个值可以是 `weather`；新闻推送，则这个值可以是 `news`。
- **data** - 这条消息的内容，只能为文本类型 —— 可以是像例子里直接一个字符串、JSON 字符串或自定义的字符串格式。
- **retry** - 值必须是数字（非数字自动忽略），不同于其他的属性，这个属性跟当前消息无关，而是跟这次 SSE 连接相关 —— 如果连接中断，客户端应该间隔多少毫秒再尝试重新连接。

只有上述四种属性是合法，其他属性会被忽略。

## Server Sent Events 的使用示例

> 还没想好怎么描述，写了几个 demo。

## 进阶之其他痛点和解决方案

### SSE 中后端是无法主动关闭连接的

对此，一种常见的方案就是模拟 close 事件。

回看上面后端的代码，我们自定义了一种消息（事件）：

```plaintext
event: close
retry: 3
data: bye
```

前端只需要监听这类事件，主动关闭连接（这边的 close 事件不在规范中，因此我们可以自定义命名，比如 `terminate`、`stop`、`end` 等等）。

当然更多时候，SSE 的连接其实是不需要关闭的 —— 时刻等待着推送新通知。

### UTF-8 编码的局限性

SSE 的内容目前规范里只支持 UTF-8 编码，如果推送的内容包含其他编码或者图片、文件等该怎么办呢？

其实不难，只需要借助额外的后端 API 即可。

即 SSE 消息中只包含简单的元数据（例如，图片 id，文件 id/url，复杂消息 id 等），前端再发起另外的请求去获取这些复杂的内容。
