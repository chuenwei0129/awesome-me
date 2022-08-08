# 网络请求<!-- omit in toc -->

- [fetch](#fetch)
  - [fetch 简介](#fetch-简介)
  - [Fetch：下载进度](#fetch下载进度)
  - [Fetch：中止（Abort）](#fetch中止abort)
    - [AbortController 对象](#abortcontroller-对象)
    - [与 fetch 一起使用](#与-fetch-一起使用)
    - [AbortController 是可伸缩的](#abortcontroller-是可伸缩的)
  - [Fetch：跨源请求](#fetch跨源请求)
  - [Fetch API](#fetch-api)
- [XMLHttpRequest](#xmlhttprequest)
  - [xhr.open](#xhropen)
  - [xhr.send](#xhrsend)
  - [响应](#响应)
  - [timeout](#timeout)
  - [URL 搜索参数](#url-搜索参数)
  - [响应类型](#响应类型)
  - [readyState](#readystate)
  - [中止请求（Aborting）](#中止请求aborting)
  - [上传进度](#上传进度)
  - [跨源请求](#跨源请求)
- [Server Sent Events](#server-sent-events)
  - [客户端 API](#客户端-api)
  - [基本用法](#基本用法)
  - [自定义事件](#自定义事件)
  - [服务器实现](#服务器实现)
    - [数据格式](#数据格式)
    - [data 字段](#data-字段)
    - [id 字段](#id-字段)
    - [event 字段](#event-字段)
    - [retry 字段](#retry-字段)
  - [Node 服务器实例](#node-服务器实例)
- [同源策略](#同源策略)
  - [最经典的跨域方案 jsonp](#最经典的跨域方案-jsonp)
  - [最流行的跨域方案 cors](#最流行的跨域方案-cors)
  - [Nginx 反向代理](#nginx-反向代理)

## fetch

### fetch 简介

典型的 `fetch` 请求由两个 `await` 调用组成：

```js
let response = await fetch(url, options); // 解析 response header
let result = await response.json(); // 将 body 读取为 json
```

或者以 `promise` 形式：

```js
fetch(url, options)
  .then(response => response.json())
  .then(result => /* process result */)
```

请求参数：

- `url` —— 要访问的 `URL`。
- `options` —— 可选参数：`method`，`header` 等。

响应的属性：

- `response.status` —— `response` 的 `HTTP` 状态码，
- `response.ok` —— `HTTP` 状态码为 `200-299`，则为 `true`。
- `response.headers` —— 类似于 `Map` 的带有 `HTTP header` 的对象。

获取 `response body` 的方法：

- `response.text()` —— 读取 `response`，并以文本形式返回 `response`，
- `response.json()` —— 将 `response` 解析为 JSON 对象形式，
- `response.formData()` —— 以 `FormData` 对象（form/multipart 编码，参见下一章）的形式返回 `response`，
- `response.blob()` —— 以 `Blob`（具有类型的二进制数据）形式返回 `response`，
- `response.arrayBuffer()` —— 以 `ArrayBuffer`（低级别的二进制数据）形式返回 `response`。

> ⚠️ **我们只能选择一种读取 `body` 的方法。**
> 如果我们已经使用了 `response.text()` 方法来获取 `response`，那么如果再用 `response.json()`，则不会生效，因为 `body` 内容已经被处理过了。

到目前为止我们了解到的 `fetch` 选项：

`method` —— `HTTP` 方法，
`headers` —— 具有 `request header` 的对象（不是所有 `header` 都是被允许的）
`body` —— 要以 `string`，`FormData`，`BufferSource`，`Blob` 或 `UrlSearchParams` 对象的形式发送的数据（request body）。

### Fetch：下载进度

> 🌿 请注意：到目前为止，`fetch` 方法无法跟踪 **上传** 进度。

`fetch` 方法允许去跟踪 **下载** 进度

要跟踪下载进度，我们可以使用 `response.body` 属性。它是 `ReadableStream` —— 一个特殊的对象，它可以逐块（chunk）提供 `body`。

```js
// Step 1：启动 fetch，并获得一个 reader
let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits?per_page=100');

const reader = response.body.getReader();

// Step 2：获得总长度（length）
const contentLength = +response.headers.get('Content-Length');

// Step 3：读取数据
let receivedLength = 0; // 当前接收到了这么多字节
let chunks = []; // 接收到的二进制块的数组（包括 body）
while(true) {
  const {done, value} = await reader.read();

  if (done) {
    break;
  }

  chunks.push(value);
  receivedLength += value.length;

  console.log(`Received ${receivedLength} of ${contentLength}`)
}

// Step 4：将块连接到单个 Uint8Array
let chunksAll = new Uint8Array(receivedLength); // (4.1)
let position = 0;
for(let chunk of chunks) {
  chunksAll.set(chunk, position); // (4.2)
  position += chunk.length;
}

// Step 5：解码成字符串
let result = new TextDecoder("utf-8").decode(chunksAll);

// 我们完成啦！
let commits = JSON.parse(result);
alert(commits[0].author.login);
```

`await reader.read()` 调用的结果是一个具有两个属性的对象：

`done` —— 当读取完成时为 `true`，否则为 `false`。
`value` —— 字节的类型化数组：`Uint8Array`。

### Fetch：中止（Abort）

`fetch` 返回一个 `promise`。`JavaScript` 通常并没有“中止” `promise` 的概念。

为此有一个特殊的内建对象：`AbortController`。它不仅可以中止 `fetch`，还可以中止其他异步任务。

#### AbortController 对象

创建一个控制器（controller）：

```js
let controller = new AbortController();
```

控制器是一个极其简单的对象。

它具有单个方法 `abort()`，
和单个属性 `signal`，我们可以在这个属性上设置事件监听器。

当 `abort()` 被调用时：

- `controller.signal` 就会触发 `abort` 事件。
- `controller.signal.aborted` 属性变为 `true`。

通常，处理分为两部分：

一部分是一个可取消的操作，它在 `controller.signal` 上设置一个监听器。
另一部分是取消：在需要的时候调用 `controller.abort()`。

```js
let controller = new AbortController();
let signal = controller.signal;

// 可取消的操作这一部分
// 获取 "signal" 对象，
// 并将监听器设置为在 controller.abort() 被调用时触发
signal.addEventListener('abort', () => alert("abort!"));

// 另一部分，取消（在之后的任何时候）：
controller.abort(); // 中止！

// 事件触发，signal.aborted 变为 true
alert(signal.aborted); // true
```

#### 与 fetch 一起使用

为了能够取消 `fetch`，请将 `AbortController` 的 `signal` 属性作为 `fetch` 的一个可选参数（option）进行传递：

```js
let controller = new AbortController();
fetch(url, {
  signal: controller.signal
});
```

`fetch` 方法知道如何与 `AbortController` 一起工作。它会监听 `signal` 上的 `abort` 事件。

现在，想要中止 `fetch`，调用 `controller.abort()` 即可：

`controller.abort()`;

我们完成啦：`fetch` 从 `signal` 获取了事件并中止了请求。

当一个 `fetch` 被中止，它的 `promise` 就会以一个 `error AbortError reject`，因此我们应该对其进行处理，例如在 `try..catch` 中。

```js
// 1 秒后中止
let controller = new AbortController();
setTimeout(() => controller.abort(), 1000);

try {
  let response = await fetch('/article/fetch-abort/demo/hang', {
    signal: controller.signal
  });
} catch(err) {
  if (err.name == 'AbortError') { // handle abort()
    alert("Aborted!");
  } else {
    throw err;
  }
}
```

#### AbortController 是可伸缩的

`AbortController` 是可伸缩的，它允许一次取消多个 `fetch`。

这是一个代码草稿，该代码并行 `fetch` 很多 `urls`，并使用单个控制器将其全部中止：

```js
let urls = [...]; // 要并行 fetch 的 url 列表

let controller = new AbortController();

// 一个 fetch promise 的数组
let fetchJobs = urls.map(url => fetch(url, {
  signal: controller.signal
}));

let results = await Promise.all(fetchJobs);

// 如果 controller.abort() 被从其他地方调用，
// 它将中止所有 fetch
```

### Fetch：跨源请求

从浏览器角度来看，有两种跨源请求：“简单”请求和其他请求。

**简单请求** 必须满足下列条件：

方法：`GET`，`POST` 或 `HEAD`。

`header` —— 我们仅能设置：
  - `Accept`
  - `Accept-Language`
  - `Content-Language`
  - `Content-Type` 的值为` application/x-www-form-urlencoded`，`multipart/form-data` 或 `text/plain`。

> 简单请求和其他请求的本质区别在于，自古以来使用 `<form>` 或 `<script>` 标签进行简单请求就是可行的，而长期以来浏览器都不能进行非简单请求。

所以，实际区别在于，简单请求会使用 `Origin header` 并立即发送，而对于其他请求，浏览器会发出初步的“预检”请求，以请求许可。

对于简单请求：

- `→` 浏览器发送带有源的 `Origin header`。
- `←` 对于没有凭据的请求（默认不发送），服务器应该设置：
`Access-Control-Allow-Origin` 为 `*` 或与 `Origin` 的值相同
- `←` 对于具有凭据的请求，服务器应该设置：
`Access-Control-Allow-Origin` 值与 `Origin` 的相同
`Access-Control-Allow-Credentials` 为 `true`
此外，要授予 `JavaScript` 访问除 `Cache-Contro`l，`Content-Language`，`Content-Type`，`Expires`，`Last-Modified` 或 `Pragma` 外的任何 `response header` 的权限，服务器应该在 `header` `Access-Control-Expose-Headers` 中列出允许的那些 `header`。

对于非简单请求，会在请求之前发出初步“预检”请求：

- `→` 浏览器将具有以下 `header` 的 `OPTIONS` 请求发送到相同的 `URL`：
`Access-Control-Request-Method` 有请求方法。
`Access-Control-Request-Headers` 以逗号分隔的“非简单” `header` 列表。
- `←` 服务器应该响应状态码为 `200` 和 `header`：
`Access-Control-Allow-Methods` 带有允许的方法的列表，
`Access-Control-Allow-Headers` 带有允许的 `header` 的列表，
`Access-Control-Max-Age` 带有指定缓存权限的秒数。
然后，发出实际请求，应用先前的“简单”方案。

### Fetch API

```js
let promise = fetch(url, {
  method: "GET", // POST，PUT，DELETE，等。
  headers: {
    // 内容类型 header 值通常是自动设置的
    // 取决于 request body
    "Content-Type": "text/plain;charset=UTF-8"
  },
  body: undefined // string，FormData，Blob，BufferSource，或 URLSearchParams
  referrer: "about:client", // 或 "" 以不发送 Referer header，
  // 或者是当前源的 url
  referrerPolicy: "no-referrer-when-downgrade", // no-referrer，origin，same-origin...
  mode: "cors", // same-origin，no-cors
  credentials: "same-origin", // omit，include
  cache: "default", // no-store，reload，no-cache，force-cache，或 only-if-cached
  redirect: "follow", // manual，error
  integrity: "", // 一个 hash，像 "sha256-abcdef1234567890"
  keepalive: false, // true
  signal: undefined, // AbortController 来中止请求
  window: window // null
});
```

## XMLHttpRequest

`XMLHttpRequest` 是一个内建的浏览器对象，它允许使用 `JavaScript` 发送 `HTTP` 请求。

要发送请求，需要 3 个步骤：

```js
// 1. 创建一个 new XMLHttpRequest 对象
let xhr = new XMLHttpRequest();

// 2. 配置它：从 URL /article/.../load GET-request
xhr.open('GET', '/article/xmlhttprequest/example/load');

// 3. 通过网络发送请求
xhr.send();

// 4. 当接收到响应后，将调用此函数
xhr.onload = function() {
  if (xhr.status != 200) { // 分析响应的 HTTP 状态
    alert(`Error ${xhr.status}: ${xhr.statusText}`); // 例如 404: Not Found
  } else { // 显示结果
    alert(`Done, got ${xhr.response.length} bytes`); // response 是服务器响应
  }
};

xhr.onprogress = function(event) {
  if (event.lengthComputable) {
    alert(`Received ${event.loaded} of ${event.total} bytes`);
  } else {
    alert(`Received ${event.loaded} bytes`); // 没有 Content-Length
  }

};

xhr.onerror = function() {
  alert("Request failed");
};
```

### xhr.open

```js
xhr.open(method, URL, [async, user, password])
```

此方法指定请求的主要参数：

- `method` —— `HTTP` 方法。通常是 "GET" 或 "POST"。
- `URL` —— 要请求的 URL，通常是一个字符串，也可以是 URL 对象。
- `async` —— 如果显式地设置为 `false`，那么请求将会以同步的方式处理，我们稍后会讲到它。
- `user`，`password `—— `HTTP` 基本身份验证（如果需要的话）的登录名和密码。

请注意，`open` 调用与其名称相反，不会建立连接。它仅配置请求，而网络活动仅以 `send` 调用开启。

### xhr.send

```js
xhr.send([body])
```

这个方法会建立连接，并将请求发送到服务器。可选参数 `body` 包含了 `request body`。

### 响应

监听 `xhr` 事件以获取响应。

这三个事件是最常用的：

`load` —— 当请求完成（即使 HTTP 状态为 `400` 或 `500` 等），并且响应已完全下载。
`error` —— 当无法发出请求，例如网络中断或者无效的 `URL`。
`progress` —— 在下载响应期间定期触发，报告已经下载了多少。

一旦服务器有了响应，我们可以在以下 `xhr` 属性中接收结果：

- `status` HTTP 状态码（一个数字）：`200`，`404`，`403` 等，如果出现非 `HTTP` 错误，则为 `0`。
- `statusText` HTTP 状态消息（一个字符串）：状态码为 `200` 对应于 `OK`，`404` 对应于 `Not Found`，`403` 对应于 `Forbidden`。
- `response`（旧脚本可能用的是 `responseText`）

### timeout

我们还可以使用相应的属性指定超时（timeout）：

```js
xhr.timeout = 10000; // timeout 单位是 ms，此处即 10 秒
```

如果在给定时间内请求没有成功执行，请求就会被取消，并且触发 
`timeout` 事件。

### URL 搜索参数

为了向 `URL` 添加像 `?name=value` 这样的参数，并确保正确的编码，我们可以使用 `URL` 对象：

```js
let url = new URL('https://google.com/search');
url.searchParams.set('q', 'test me!');

// 参数 'q' 被编码
xhr.open('GET', url); // https://google.com/search?q=test+me%21
```

### 响应类型

我们可以使用 `xhr.responseType` 属性来设置响应格式：

- `""`（默认）—— 响应格式为字符串，
- `"text"` —— 响应格式为字符串，
- `"arraybuffer"` —— 响应格式为 `ArrayBuffer`（对于二进制数据，请参见 `ArrayBuffer`，二进制数组），
- `"blob"` —— 响应格式为 Blob（对于二进制数据，请参见 Blob），
- `"document"` —— 响应格式为 `XML documen`t（可以使用 XPath 和其他 XML 方法），
- `"json"` —— 响应格式为 `JSON`（自动解析）。

例如，我们以 `JSON `格式获取响应：

```js
let xhr = new XMLHttpRequest();

xhr.open('GET', '/article/xmlhttprequest/example/json');

xhr.responseType = 'json';

xhr.send();

// 响应为 {"message": "Hello, world!"}
xhr.onload = function() {
  let responseObj = xhr.response;
  alert(responseObj.message); // Hello, world!
};
```

### readyState

`XMLHttpRequest` 的状态（state）会随着它的处理进度变化而变化。可以通过 `xhr.readyState` 来了解当前状态。

**规范** 中提到的所有状态如下：

```js
UNSENT = 0; // 初始状态
OPENED = 1; // open 被调用
HEADERS_RECEIVED = 2; // 接收到 response header
LOADING = 3; // 响应正在被加载（接收到一个数据包）
DONE = 4; // 请求完成
```

`XMLHttpRequest` 对象以 `0 → 1 → 2 → 3 → … → 3 → 4` 的顺序在它们之间转变。每当通过网络接收到一个数据包，就会重复一次状态 `3`。

我们可以使用 `readystatechange` 事件来跟踪它们：

```js
xhr.onreadystatechange = function() {
  if (xhr.readyState == 3) {
    // 加载中
  }
  if (xhr.readyState == 4) {
    // 请求完成
  }
};
```

### 中止请求（Aborting）

我们可以随时终止请求。调用 `xhr.abort()` 即可：

`xhr.abort()`; // 终止请求

它会触发 `abort` 事件，且 `xhr.status` 变为 `0`。

### 上传进度

`progress` 事件仅在下载阶段触发。

这里有另一个对象，它没有方法，它专门用于跟踪上传事件：`xhr.upload`。

它会生成事件，类似于 `xhr`，但是 `xhr.upload` 仅在上传时触发它们：

- `loadstart` —— 上传开始。
- `progress` —— 上传期间定期触发。
- `abort` —— 上传中止。
- `error` —— 非 HTTP 错误。
- `load` —— 上传成功完成。
- `timeout` —— 上传超时（如果设置了 `timeout` 属性）。
- `loadend `—— 上传完成，无论成功还是 `error`。

```html
<input type="file" onchange="upload(this.files[0])">

<script>
function upload(file) {
  let xhr = new XMLHttpRequest();

  // 跟踪上传进度
  xhr.upload.onprogress = function(event) {
    console.log(`Uploaded ${event.loaded} of ${event.total}`);
  };

  // 跟踪完成：无论成功与否
  xhr.onloadend = function() {
    if (xhr.status == 200) {
      console.log("success");
    } else {
      console.log("error " + this.status);
    }
  };

  xhr.open("POST", "/article/xmlhttprequest/post/upload");
  xhr.send(file);
}
</script>
```

### 跨源请求

`XMLHttpRequest` 可以使用和 `fetch` 相同的 `CORS` 策略进行跨源请求。

就像 `fetch` 一样，默认情况下不会将 `cookie` 和 `HTTP` 授权发送到其他域。要启用它们，可以将 `xhr.withCredentials` 设置为 `true`：

```js
let xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.open('POST', 'http://anywhere.com/request');
```

> ⚠️ error，abort，timeout 和 load 事件是互斥的。其中只有一种可能发生。

## Server Sent Events

`SSE` 与 `WebSocket` 作用相似，都是建立浏览器与服务器之间的通信渠道，然后服务器向浏览器推送信息。


WebSocket|	EventSource
:--:|:--:
双向：客户端和服务端都能交换消息|	单向：仅服务端能发送消息
二进制和文本数据	|仅文本数据
WebSocket 协议|	常规 HTTP 协议

### 客户端 API

`SSE` 的客户端 `API` 部署在 `EventSource` 对象上。下面的代码可以检测浏览器是否支持 `SSE`。

```js
if ('EventSource' in window) {
  // ...
}
```

使用 `SSE` 时，浏览器首先生成一个 `EventSource` 实例，向服务器发起连接。

```js
var source = new EventSource(url);
```

上面的 `url` 可以与当前网址同域，也可以跨域。跨域时，可以指定第二个参数，打开 `withCredentials` 属性，表示是否一起发送 Cookie。

```js
var source = new EventSource(url, { withCredentials: true });
```

`EventSource` 实例的 `readyState` 属性，表明连接的当前状态。该属性只读，可以取以下值。

- `0`：相当于常量 `EventSource.CONNECTING`，表示连接还未建立，或者断线正在重连。
- `1`：相当于常量 `EventSource.OPEN`，表示连接已经建立，可以接受数据。
- `2`：相当于常量 `EventSource.CLOSED`，表示连接已断，且不会重连。

### 基本用法

连接一旦建立，就会触发 `open` 事件，可以在 `onopen` 属性定义回调函数。

```js
source.addEventListener('open', function (event) {
  // ...
}, false);
```

客户端收到服务器发来的数据，就会触发 `message` 事件，可以在 `onmessage` 属性的回调函数。

```js
source.onmessage = function (event) {
  var data = event.data;
  // handle message
};

// 另一种写法
source.addEventListener('message', function (event) {
  var data = event.data;
  // handle message
}, false);
```

上面代码中，事件对象的 `data` 属性就是服务器端传回的数据（文本格式）。

如果发生通信错误（比如连接中断），就会触发 `error` 事件，可以在 `onerror` 属性定义回调函数。

```js
source.addEventListener('error', function (event) {
  // handle error event
}, false);
```

`close` 方法用于关闭 `SSE` 连接。

```js
source.close();
```

### 自定义事件

默认情况下，服务器发来的数据，总是触发浏览器 `EventSource` 实例的 `message` 事件。开发者还可以自定义 `SSE` 事件，这种情况下，发送回来的数据不会触发 `message` 事件。

```js
source.addEventListener('foo', function (event) {
  var data = event.data;
  // handle message
}, false);
```

### 服务器实现

#### 数据格式

服务器向浏览器发送的 `SSE` 数据，必须是 `UTF-8` 编码的文本，具有如下的 `HTTP` 头信息。

```js
Content-Type: text/event-stream
Cache-Control: no-cache
Connection: keep-alive
```

上面三行之中，第一行的 `Content-Type` 必须指定 `MIME` 类型为`event-steam`。

每一次发送的信息，由若干个 `message` 组成，每个 `message` 之间用 `\n\n` 分隔。每个` message `内部由若干行组成，每一行都是如下格式。

此外，还可以有冒号开头的行，表示注释。通常，服务器每隔一段时间就会向浏览器发送一个注释，保持连接不中断。

下面是一个例子。

```js
: this is a test stream\n\n

data: some text\n\n

data: another message\n
data: with two lines \n\n
```

#### data 字段

数据内容用 `data` 字段表示。

下面是一个发送 `JSON` 数据的例子。

```js
data: {\n
data: "foo": "bar",\n
data: "baz", 555\n
data: }\n\n
```

#### id 字段

数据标识符用 `id` 字段表示，相当于每一条数据的编号。

```js
id: msg1\n
data: message\n\n
```

浏览器用 `lastEventId` 属性读取这个值。一旦连接断线，浏览器会发送一个 `HTTP` 头，里面包含一个特殊的 `Last-Event-ID` 头信息，将这个值发送回来，用来帮助服务器端重建连接。因此，这个头信息可以被视为一种同步机制。

#### event 字段

`event` 字段表示自定义的事件类型，默认是 `message` 事件。浏览器可以用 `addEventListener()` 监听该事件。

```js
event: foo\n
data: a foo event\n\n

data: an unnamed event\n\n

event: bar\n
data: a bar event\n\n
```

上面的代码创造了三条信息。第一条的名字是 `foo`，触发浏览器的 `foo` 事件；第二条未取名，表示默认类型，触发浏览器的 `message` 事件；第三条是 `bar`，触发浏览器的 `bar` 事件。

下面是另一个例子。

```js
event: userconnect
data: {"username": "bobby", "time": "02:33:48"}

event: usermessage
data: {"username": "bobby", "time": "02:34:11", "text": "Hi everyone."}

event: userdisconnect
data: {"username": "bobby", "time": "02:34:23"}

event: usermessage
data: {"username": "sean", "time": "02:34:36", "text": "Bye, bobby."}
```

#### retry 字段

服务器可以用 `retry` 字段，指定浏览器重新发起连接的时间间隔。

```js
retry: 10000\n
```

两种情况会导致浏览器重新发起连接：一种是时间间隔到期，二是由于网络错误等原因，导致连接出错。

### Node 服务器实例

`SSE` 要求服务器与浏览器保持连接。对于不同的服务器软件来说，所消耗的资源是不一样的。`Apache` 服务器，每个连接就是一个线程，如果要维持大量连接，势必要消耗大量资源。`Node` 则是所有连接都使用同一个线程，因此消耗的资源会小得多，但是这要求每个连接不能包含很耗时的操作，比如磁盘的 `IO` 读写。

下面是 `Node` 的 `SSE` 服务器实例。

```js
var http = require("http");

http.createServer(function (req, res) {
  var fileName = "." + req.url;

  if (fileName === "./stream") {
    res.writeHead(200, {
      "Content-Type":"text/event-stream",
      "Cache-Control":"no-cache",
      "Connection":"keep-alive",
      "Access-Control-Allow-Origin": '*',
    });
    res.write("retry: 10000\n");
    res.write("event: connecttime\n");
    res.write("data: " + (new Date()) + "\n\n");
    res.write("data: " + (new Date()) + "\n\n");

    interval = setInterval(function () {
      res.write("data: " + (new Date()) + "\n\n");
    }, 1000);

    req.connection.addListener("close", function () {
      clearInterval(interval);
    }, false);
  }
}).listen(8844, "127.0.0.1");
```

## 同源策略

同源策略限制了从同一个源加载的文档或脚本如何与来自另一个源的资源进行交互。这是一个用于隔离潜在恶意文件的重要安全机制。

同源是指"协议+域名+端口"三者相同，即便两个不同的域名指向同一个 `ip` 地址，也非同源。

浏览器中的大部分内容都是受同源策略限制的，但是以下三个标签可以不受限制：

```html
<img src=XXX>
<link href=XXX>
<script src=XXX>
```

### 最经典的跨域方案 jsonp

`jsonp` 本质上是一个 `Hack`，它利用 `<script>` 标签不受同源策略限制的特性进行跨域操作。

`jsonp` 优点：

- 实现简单
- 兼容性非常好

`jsonp` 的缺点：

- 只支持 `get` 请求（因为 `<script>` 标签只能 get）
- 有安全性问题，容易遭受 `xss` 攻击
- 需要服务端配合 `jsonp` 进行一定程度的改造

### 最流行的跨域方案 cors

`cors` 是目前主流的跨域解决方案，跨域资源共享(CORS) 是一种机制，它使用额外的 `HTTP` 头来告诉浏览器，让运行在一个 · (domain) 上的 Web 应用被准许访问来自不同源服务器上的指定的资源。当一个资源从与该资源本身所在的服务器不同的域、协议或端口请求一个资源时，资源会发起一个跨域 `HTTP` 请求。

### Nginx 反向代理

反向代理的原理很简单，即所有客户端的请求都必须先经过 `nginx` 的处理，`nginx` 作为代理服务器再讲请求转发给 `node` 或者 `java` 服务，这样就规避了同源策略。

```sh
#进程, 可更具cpu数量调整
worker_processes  1;

events {
    #连接数
    worker_connections  1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;

    sendfile        on;

    #连接超时时间，服务器会在这个时间过后关闭连接。
    keepalive_timeout  10;

    # gizp压缩
    gzip  on;

    # 直接请求nginx也是会报跨域错误的这里设置允许跨域
    # 如果代理地址已经允许跨域则不需要这些, 否则报错(虽然这样nginx跨域就没意义了)
    add_header Access-Control-Allow-Origin *;
    add_header Access-Control-Allow-Headers X-Requested-With;
    add_header Access-Control-Allow-Methods GET,POST,OPTIONS;

    # srever模块配置是http模块中的一个子模块，用来定义一个虚拟访问主机
    server {
        listen       80;
        server_name  localhost;
        
        # 根路径指到index.html
        location / {
            root   html;
            index  index.html index.htm;
        }

        # localhost/api 的请求会被转发到192.168.0.103:8080
        location /api {
            rewrite ^/b/(.*)$ /$1 break; # 去除本地接口/api前缀, 否则会出现404
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_pass http://192.168.0.103:8080; # 转发地址
        }
        
        # 重定向错误页面到/50x.html
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }

    }

}

```

