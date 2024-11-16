---
group:
  title: 2020 🐭
  order: -2020
title: Fetch 请求详解
toc: content
---

随着前端技术的不断发展，`fetch` API 已经成为现代前端开发中的一项重要工具。本文将全面介绍 `fetch` 的用法及其相关概念，帮助你更好地理解和使用这个强大的 API。

## 基本用法 💡

典型的 `fetch` 请求通常通过两个 `await` 调用来完成：

```javascript
let response = await fetch(url, options); // 获取响应头
let result = await response.json(); // 将主体解析为 JSON
```

此外，还可以采用 `promise` 形式：

```javascript
fetch(url, options)
  .then(response => response.json())
  .then(result => {
    // 处理结果
  });
```

## options 配置 🌟

以下是 `fetch` 的配置选项示例：

```javascript
let promise = fetch(url, {
  method: "GET",
  headers: { "Content-Type": "text/plain;charset=UTF-8" },
  body: undefined,
  referrer: "about:client",
  referrerPolicy: "no-referrer-when-downgrade",
  mode: "cors",
  credentials: "same-origin",
  cache: "default",
  redirect: "follow",
  integrity: "",
  keepalive: false,
  signal: undefined,
  window: window
});
```

## `keepalive` 选项 🔄

根据 MDN 的解释，`keepalive` 选项允许请求在页面关闭后继续进行。举例来说，当一个 POST 请求发出后，页面随即关闭或者刷新，通常请求会被中断。但如果启用 `keepalive` 选项，该请求可以在页面关闭后继续进行直至完成。

## `fetch` 的 `response` 对象 📄

`fetch` 提供了多种方式读取 `response` 对象：

- `response.text()`：返回文本格式的响应。
- `response.json()`：将响应解析为 JSON 对象。
- `response.formData()`：返回 `FormData` 对象。
- `response.blob()`：返回 `Blob` 对象。
- `response.arrayBuffer()`：返回 `ArrayBuffer` 对象。

> **注意**：对一个响应主体只能选择一种读取方法，一旦选择便无法再用其他方法读取。

## HTTP 状态码处理 🚦

`fetch()` 返回的 Promise 即使在接收到错误 HTTP 状态码时（如 404 或 500），其状态也会被设置为 `resolve`，但 `response` 对象的 `ok` 属性会被设为 `false`。Promise 只有在网络故障或请求被阻止时，才会被标记为 `reject`。

另外，`fetch` 默认不发送跨域 cookie，除非设置了 `credentials` 选项。

## `fetch` 与 流（Streams） 🌊

流（Streams）允许逐步处理数据，而不是等待数据完全接收后再处理，这样可以减少内存占用和延迟时间。Fetch API 支持使用 Streams API，广泛应用于浏览器中。

- **ReadableStream**：可读流，用于处理输入数据。
- **WritableStream**：可写流，用于输出数据。
- **TransformStream**：既可读又可写的转换流。

Fetch 使用 `ReadableStream` 可以跟踪下载进度，但目前尚不支持上传进度。下面是一个跟踪下载进度的示例：

```javascript
let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits?per_page=100');
const reader = response.body.getReader();

const contentLength = +response.headers.get('Content-Length');
let receivedLength = 0;
let chunks = [];

while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  chunks.push(value);
  receivedLength += value.length;
  console.log(`Received ${receivedLength} of ${contentLength}`);
}

let chunksAll = new Uint8Array(receivedLength);
let position = 0;
for (let chunk of chunks) {
  chunksAll.set(chunk, position);
  position += chunk.length;
}

let result = new TextDecoder("utf-8").decode(chunksAll);
let commits = JSON.parse(result);
console.log(commits[0].author.login);
```

## 中止 `fetch` 请求 🛑

通常情况下，`fetch` 的 Promise 无法“中止”。可以使用 `AbortController` 来取消 `fetch` 请求及其他异步任务。

### 创建一个控制器：

```javascript
let controller = new AbortController();
let signal = controller.signal;

signal.addEventListener('abort', () => console.log("Request aborted!"));
controller.abort(); // 中止请求
console.log(signal.aborted); // true
```

### 将 `AbortController` 的 `signal` 作为 `fetch` 的选项参数传递：

```javascript
let controller = new AbortController();
fetch(url, {
  signal: controller.signal
});
```

### 中止请求：

```javascript
controller.abort();
```

当 `fetch` 被中止时，其 `promise` 会以 `AbortError` 被拒绝，需要在 `try..catch` 中处理：

```javascript
let controller = new AbortController();
setTimeout(() => controller.abort(), 1000);

try {
  let response = await fetch('/article/fetch-abort/demo/hang', { signal: controller.signal });
} catch (err) {
  if (err.name == 'AbortError') {
    console.log("Aborted!");
  } else {
    throw err;
  }
}
```

## 跨源请求 🌍

浏览器将请求分为“简单”请求和其他请求。简单请求必须满足以下条件：

- 方法为 `GET`、`POST` 或 `HEAD`
- 头信息仅包括 `Accept`、`Accept-Language`、`Content-Language` 及内容类型为 `application/x-www-form-urlencoded`、`multipart/form-data` 或 `text/plain`

简单请求直接发送，而非简单请求则需要先发送预检请求以获取服务器许可。

## `fetch` 与 `XMLHttpRequest` 对比 ⚔️

与 `XMLHttpRequest` 相比，`fetch` 具有以下优势：

- 支持在 Service Worker 环境中使用
- 同源请求默认不携带 cookie
- 可以自定义重定向和缓存策略
- 可以自定义 `referrer`
