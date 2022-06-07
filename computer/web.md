# 计算机基础知识图谱（四）<!-- omit in toc -->

***👀 TIPS: 二级标题可返回目录***

---

> ## 目录

- [浏览器多进程架构](#浏览器多进程架构)
  - [目前多进程架构（已过时）](#目前多进程架构已过时)
  - [未来面向服务的架构](#未来面向服务的架构)
  - [浏览器的进程模式](#浏览器的进程模式)
  - [每个 iframe 的渲染进程 —— 站点隔离](#每个-iframe-的渲染进程--站点隔离)
  - [查看 Windows 系统任务管理器](#查看-windows-系统任务管理器)
- [导航流程](#导航流程)
  - [1. 处理输入](#1-处理输入)
  - [2. 开始导航](#2-开始导航)
  - [3. 准备渲染进程](#3-准备渲染进程)
  - [4. 提交导航](#4-提交导航)
  - [5. 初始化 load complete](#5-初始化-load-complete)
  - [6. 导航到其他站点](#6-导航到其他站点)
- [HTTP 缓存](#http-缓存)
  - [强缓存和协商缓存](#强缓存和协商缓存)
  - [用户操作对缓存的影响](#用户操作对缓存的影响)
- [渲染流程](#渲染流程)
  - [参考资料](#参考资料)
  - [到底几个线程](#到底几个线程)
  - [首次渲染流程](#首次渲染流程)
    - [解析 HTML（Parse HTML）](#解析-htmlparse-html)
    - [预加载扫描器](#预加载扫描器)
    - [样式计算（Recalculate Style）](#样式计算recalculate-style)
    - [布局（Layout）](#布局layout)
    - [分层（Update Layer Tree）](#分层update-layer-tree)
    - [绘制（Paint）](#绘制paint)
    - [栅格化（Raster）](#栅格化raster)
    - [合成和显示（Compositor）](#合成和显示compositor)
    - [总结](#总结)
  - [相关概念](#相关概念)
    - [1.（重排）更新了元素的几何属性](#1重排更新了元素的几何属性)
    - [2.（重绘）更新元素的绘制属性](#2重绘更新元素的绘制属性)
    - [3. 直接（合成）阶段](#3-直接合成阶段)
    - [如何触发重排和重绘](#如何触发重排和重绘)
    - [如何避免重绘或者重排](#如何避免重绘或者重排)
- [用户输入行为与合成器](#用户输入行为与合成器)
  - [浏览器视角下的输入事件](#浏览器视角下的输入事件)
  - [合成器接收输入事件](#合成器接收输入事件)
    - [理解非立即可滚动区](#理解非立即可滚动区)
    - [设置事件处理器时须注意](#设置事件处理器时须注意)
    - [检查事件是否可撤销](#检查事件是否可撤销)
    - [降低往主线程发送事件的频率](#降低往主线程发送事件的频率)
    - [使用 `getCoalescedEvents` 获取帧内事件](#使用-getcoalescedevents-获取帧内事件)
- [事件循环](#事件循环)
- [V8 引擎](#v8-引擎)
- [浏览器多进程架构](#浏览器多进程架构-1)
- [浏览器多进程架构](#浏览器多进程架构-2)
- [浏览器多进程架构](#浏览器多进程架构-3)
- [浏览器多进程架构](#浏览器多进程架构-4)
- [科普](#科普)
  - [为什么 Chrome 的 navigator 属性值里会看到AppleWebkit ？](#为什么-chrome-的-navigator-属性值里会看到applewebkit-)
  - [现在的浏览器可以同时打开多个页签，他们端口一样吗？如果一样，数据怎么知道去哪个页签？](#现在的浏览器可以同时打开多个页签他们端口一样吗如果一样数据怎么知道去哪个页签)
  - [tcp 传送数据时 浏览器端就做渲染处理了么？如果前面数据包丢了 后面数据包先来是要等么？类似的那种实时渲染怎么处理？针对数据包的顺序性？](#tcp-传送数据时-浏览器端就做渲染处理了么如果前面数据包丢了-后面数据包先来是要等么类似的那种实时渲染怎么处理针对数据包的顺序性)
  - [同一个域名同时最多只能建立 6 个 TCP 连接 是不是意思是同一域名同时只能发送6个 AJAX 请求吗？](#同一个域名同时最多只能建立-6-个-tcp-连接-是不是意思是同一域名同时只能发送6个-ajax-请求吗)
- [参考资料](#参考资料-1)

## [浏览器多进程架构](#目录)

### 目前多进程架构（已过时）

最新的 Chrome 浏览器包括：1 个浏览器（Browser）主进程、1 个 GPU 进程、1 个网络（NetWork）进程、多个渲染进程和多个插件进程。

|    进程    |                                                                                                                功能                                                                                                                |
| :--------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| 浏览器进程 |                                                                                    主要负责界面显示、用户交互、子进程管理，同时提供存储等功能。                                                                                    |
|  渲染进程  |   核心任务是将 HTML、CSS 和 JavaScript 转换为用户可以与之交互的网页，排版引擎 Blink 和 JavaScript 引擎 V8 都是运行在该进程中，默认情况下，Chrome 会为每个 Tab 标签创建一个渲染进程。出于安全考虑，渲染进程都是运行在沙箱模式下。   |
|  GPU 进程  | 其实，Chrome 刚开始发布的时候是没有 GPU 进程的。而 GPU 的使用初衷是为了实现 3D CSS 的效果，只是随后网页、Chrome 的 UI 界面都选择采用 GPU 来绘制，这使得 GPU 成为浏览器普遍的需求。最后，Chrome 在其多进程架构上也引入了 GPU 进程。 |
|  网络进程  |                                                           主要负责页面的网络资源加载，之前是作为一个模块运行在浏览器进程里面的，直至最近才独立出来，成为一个单独的进程。                                                           |
|  插件进程  |                                                           主要是负责插件的运行，因插件易崩溃，所以需要通过插件进程来隔离，以保证插件进程崩溃不会对浏览器和页面造成影响。                                                           |

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/browser/SCR-20220424-ltq.png)

### 未来面向服务的架构

Chrome 正在经历架构变革，它转变为将浏览器程序的每一模块作为一个服务来运行，从而可以轻松实现进程的拆解或聚合。
通常观点是当 Chrome 运行在强力硬件上时，它会将每个服务分解到不同进程中，从而提升稳定性，但是如果 Chrome 运行在资源有限的设备上时，它会将服务聚合到一个进程中从而节省了内存占用。

**强力硬件进程模型图：**

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/browser/SCR-20220424-lqa.png)

**资源受限的设备上：**

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/browser/SCR-20220424-lr6.png)

### 浏览器的进程模式

为了节省内存，Chrome 提供了四种进程模式（Process Models），不同的进程模式会对 tab 进程做不同的处理。

- **Process-per-site-instance** (default) - 同一个 **site-instance** 使用一个进程
- **Process-per-site -** 同一个 **site** 使用一个进程
- **Process-per-tab -** 每个 tab 使用一个进程
- **Single process -** 所有 tab 共用一个进程

> 🍐 这里需要给出 site 和 site-instance 的定义

- **site** 指的是相同的 `registered domain name` 和 `scheme`。比如 `a.baidu.com` 和 `b.baidu.com` 就可以理解为同一个 **site**（注意这里要和  `Same-origin policy` 区分开来，同源策略还涉及到子域名和端口）。
- **site-instance** 满足下面两中情况并且打开的新页面和旧页面属于上面定义的同一个 **site**，就属于同一个 **site-instance**

  - 用户通过 `<a target="_blank">` 这种方式点击打开的新页面
  - JS 代码打开的新页面（比如 `window.open`)

`Process-per-site-instance` 是 Chrome 默认使用的模式，也就是几乎所有的用户都在用的模式。当你打开一个 tab 访问 `a.baidu.com` ，然后再打开一个 tab 访问 `b.baidu.com`，这两个 tab 会使用**两个进程**。而如果你在 `a.baidu.com` 中，通过 JS 代码打开了 `b.baidu.com` 页面，这两个 tab 会使用**同一个进程**。

### 每个 iframe 的渲染进程 —— 站点隔离

关闭所有插件，写一个 html 文件并打开，内容如下所示：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>iframe</title>
  </head>
  <body>
    <iframe src="https://linjingyi.cn" width="300" height="400"></iframe>
    <iframe src="https://baidu.com" width="300" height="400"></iframe>
  </body>
</html>
```

在代码中使用了两个 iframe 框架，打开后的任务管理器如下所示：

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/browser/v2-6c61510658ee0b2de8ff07ce7b8e50a6_1440w.jpg)

在 Chrome 任务管理器中，虽然只打开了一个标签页，但是两个 iframe 页面都单独占了一个进程。

### 查看 Windows 系统任务管理器

虽然 Chrome 有任务管理器，但是 Windows 系统也自带了任务管理器。

**Chrome 任务管理器：**

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/browser/v2-b380a595721a3cf5840428686cc0dbee_1440w.jpg)

**Windows 任务管理器：**

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/browser/v2-e023b26e513fe5ccdc4912d583fd0dd2_1440w.jpg)

对比很明显，为什么在 Chrome 任务管理器中只有 `5` 个进程，而 Windows 任务管理器中却有 `7` 个进程。这是因为 Chrome 有一些辅助进程并不会在任务管理器中显示，比如**预渲染进程**是一个额外的渲染辅助进程，当有渲染需求时直接改进程，省去创建进程的时间。

## [导航流程](#目录)

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/browser/SCR-20220424-mwn.png)

### 1. 处理输入

当用户在地址栏中输入一个查询关键字时，地址栏会判断输入的关键字是搜索内容，还是请求的 URL。

当用户输入关键字并键入回车之后，当前页面没有监听 `beforeunload` 事件或者同意了继续后续流程，便进入了加载状态。但此时页面显示的依然是之前打开的页面内容，并没立即替换页面。因为需要等待提交文档阶段，页面内容才会被替换。

### 2. 开始导航

**如果有 `Service Worker`**

`Service Worker` 是在渲染进程中运行的 JavaScript 代码。但是当导航请求进入时，浏览器进程如何知道该站点有 `Service Worker`？

当注册一个 `Service Worker` 时，保持 `Service Worker` 的作用域作为一个引用。当一个导航发生时，网络进程用已注册的 `Service Worker` 作用域来检查域名，如果已经为该 URL 注册了一个 `Service Worker`，浏览器进程会找一个渲染进程来执行 `Service Worker` 的代码。`Service Worker` 可能从缓存中加载数据，无需从网络请求数据，或者可以从网络请求新资源。

如果 `Service Worker` 最终决定从网络请求数据，则浏览器进程和渲染器进程之间的往返可能会导致延迟。**导航预加载**是一种通过与 `Service Worker` 启动并行加载资源来加速此过程的机制。它用一个头部来标记这些请求，允许服务器决定为这些请求发送不同的内容；例如，只更新数据而不是完整文档。

**未设置 `Service Worker`**

1、请求前的第一步是要进行 DNS 解析，以获取请求域名的服务器 IP 地址。如果请求协议是 HTTPS，那么还需要建立 TLS 连接。

2、 连接建立之后，浏览器端会构建请求行、请求头等信息，并把和该域名相关的 Cookie 等数据附加到请求头中，然后向服务器发送构建的请求信息。

3、 服务器接收到请求信息后，会根据请求信息生成响应数据，并发给网络进程。等网络进程接收了响应行和响应头之后，就开始解析响应头的内容。

> **重定向**

如果发现返回的状态码是 301 或者 302，那么说明服务器需要浏览器重定向到其他 URL。**网络进程会从响应头的 Location 字段里面读取重定向的地址。**

  ![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/browser/SCR-20220424-nln.png)

> **读取响应结果**

**Content-Type** 是 HTTP 头中一个非常重要的字段， 它告诉浏览器服务器返回的响应体数据是什么类型，然后浏览器会根据 `Content-Type` 的值来决定如何显示响应体的内容。

如果 `Content-Type` 字段的值被浏览器判断为下载类型，那么该请求会被提交给浏览器的下载管理器，同时该 URL 请求的导航流程就此结束。但如果是 HTML，那么浏览器则会继续进行导航流程。

> **安全检查**

恶意名单检查：如果域和响应数据在恶意站点名单中，则网络进程发出和显示警告页面。
跨域读取检查：`CrossOriginReadBlock` 检查，敏感的跨站点数据不进入渲染器进程

### 3. 准备渲染进程

如果从一个页面打开了另一个新页面，而新页面和当前页面属于同一站点的话，那么新页面会复用父页面的渲染进程。官方把这个默认策略叫 `process-per-site-instance`。

**打开一个新页面采用的渲染进程策略就是：**

- 通常情况下，打开新的页面都会使用单独的渲染进程；
- 如果从 A 页面打开 B 页面，且 A 和 B 都属于同一站点的话，那么 B 页面复用 A 页面的渲染进程；如果是其他情况，浏览器进程则会为 B 创建一个新的渲染进程。

> **由于网络请求可能需要几百毫秒才能得到响应，为加速此过程，在开始导航网络进程发送`URL` 请求时，已经主动进行查找、启动渲染进程，数据接收完成后，渲染进程已备用。**

### 4. 提交导航

现在数据和渲染器进程已准备就绪，`IPC` 将从浏览器进程发送到渲染进程以提交导航。渲染进程确认提交完成，导航完成。文档加载开始。

1. `UI` 更新：地址栏更新、安全指示器、站点设置 `UI` 会反映新页面站点信息。
2. 选项卡的会话历史记录更新(前进/后退)，为便于关闭浏览器后恢复，历史记录到磁盘。

    ![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/browser/20210107213807807.png)

### 5. 初始化 load complete

提交导航后，渲染器进程将继续加载资源并呈现页面，**一旦渲染器进程“完成”（onload 事件在所有帧上触发执行完成后）渲染**，它就会将 `IPC` 发送回浏览器进程。`UI` 线程停止选项卡的加载转圈。

### 6. 导航到其他站点

导航完成后，再次将不同的 `URL` 放到地址栏导航，浏览器会检查当前渲染网站的`beforeunload` 事件。如有设置导航或关闭选项卡时发出警报“离开这个网站吗？” 包含 `JavaScript` 代码的选项卡内的所有内容都由渲染进程处理。

## [HTTP 缓存](#目录)

### 强缓存和协商缓存

与强缓存相关的 `header` 字段有两个：

> 有 Cache-Control，则 Expires 失效。

**expires：** 这是 http1.0 时的规范；它的值为一个绝对时间的 GMT 格式的时间字符串，如 `Mon, 10 Jun 2015 21:31:12 GMT`，如果发送请求的时间在  expires 之前，那么本地缓存始终有效，否则就会发送请求到服务器来获取资源

另一个请求头为 `Cache-Control`。**这个缓存指令是单向的**，也就是说请求中设置的指令，不一定包含在响应中，请求中如果没有传 `Cache-Control`，`server` 也可以返回 `Cache-Control`。

**客户端发起请求后，服务器返回 `Cache-Control： max-age=30`，代表资源在客户端可以缓存 30 秒，30 秒内客户端的请求可以直接从缓存获取，超过 30 秒后需要向服务器发起网络请求。**

`max-age` 是 `HTTP` 缓存控制最常用的属性，表示资源存储的最长时间，需要注意的是，时间的计算起点是响应报文的创建时刻（即 `Date` 字段，也就是离开服务器的时刻），超过后客户端需要重新发起请求

除此之外，还有其它属性值如下:

- `no-cache`: **缓存但重新验证**服务器端会验证请求中所描述的缓存是否过期，若未过期（注：实际就是返回 304），则缓存才使用本地缓存副本。

- `no-store`: 这才是真正的不允许缓存，比如秒杀页面这样变化非常频繁的页面就不适合缓存

- `must-revalidate`：一旦资源过期（比如已经超过 max-age），在成功向原始服务器验证之前，缓存不能用该资源响应后续请求。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/browser/http-11.jpg)

`Cache-Control` 只能刷新数据，但不能很好地利用缓存，又因为缓存会失效，使用前还必须要去服务器验证是否是最新版，存在一定的性能问题，所以 `HTTP` 又引入了条件缓存（协商缓存）。

条件请求以 `If` 开头，有「If-Match」，「If-Modified-Since」，「If-None-Match」,「If-Range」,「If-Unmodified-Since」五个头字段，我们最常用的是「if-Modified-Since」和「If-None-Match」这两个头字段，所以重点介绍一下。

- `if-Modified-Since`：指的是文件最后修改时间，服务器只在所请求的资源**在给定的日期时间之后对内容进行过修改的情况下**才会将资源返回，如果请求的资源从那时起未经修改，那么**返回一个不带有消息主体的 `304` 响应**，需要第一次请求提供「Last-modified」，只能精确到一秒，第二次请求就可以在 「if-Modified-Since」首部带上此值了

- `If-None-Match`：条件请求首部，对于 `GET` 和 `HEAD` 请求方法来说，当且仅当服务器上没有任何资源的 `ETag` 属性值与这个首部中列出的相匹配的时候，服务器端会才返回所请求的资源，响应码为 `200`，

  ![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/browser/http-12.jpg)

> ETag 是实体标签（Entity Tag）的缩写，**是由服务器生成的每个资源的唯一标识字符串，只要资源有变化就这个值就会改变**，主要解决修改时间无法准确区分文件变化的问题，比如文件在一秒内修改了多次，由于修改时间是秒级的，用 `if-Modified-Since` 就会误认为资源没有变化，而每次文件修改了都会修改 `ETag`，也就是说 `ETag` 可以精确识别资源的变动, 所以如果对资源变化很敏感觉的话，应该用 `If-None-Match`
>
> 注：ETag 有强，弱之分，强 ETag 要求资源在字节级别必须完全相符，弱 ETag 在值前有「W/」标记，只要求资源在语义上没啥变化，比如加了几个空格等等。

需要注意的是不管是 `if-Modified-Since` 还是 `If-None-Match`，**这两者只会在资源过期（即存活时间超 max-age）后才会触发**，

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/browser/SCR-20220424-nlf.png)

### 用户操作对缓存的影响

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/browser/bVbwrEd.webp)

## [渲染流程](#目录)

### 参考资料

- [浏览器渲染进程里的主线程与 GUI 线程和 JS 引擎线程有什么关系吗？](https://www.zhihu.com/question/403560382)
- [JS阻塞渲染，这么多年我理解错啦？](https://zhuanlan.zhihu.com/p/501608119)
- [Event loop 和 JS 引擎、渲染引擎的关系(精致版)](https://zhuanlan.zhihu.com/p/371786505)
- [资源文件加载 async / defer / preload 实践篇](https://juejin.cn/post/6940072226020392991)

### 到底几个线程

渲染进程中，包含线程分别是：

- 一个主线程（main thread）
- 多个工作线程（work thread）
- 一个合成器线程（compositor thread）
- 多个光栅化线程（raster thread）

不同的线程，有着不同的工作职责。

### 首次渲染流程

#### 解析 HTML（Parse HTML）

当渲染进程收到导航的提交消息并开始接收 HTML 数据时，主线程开始解析文本字符串（HTML）并将其转换为文档对象模型（DOM）。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/browser/dom-tree.png)

DOM 和 HTML 内容几乎是一样的，**但是和 HTML 不同的是，DOM 是保存在内存中树状结构，可以通过 JavaScript 来查询或修改其内容。**

> **JavaScript 阻塞解析**
>
当遇到 `<script>` 时，暂停 `HTML` 解析，加载解析执行 `JS` 代码。因为 `JS` 可能会改变 `Html` 的结构导致重新 `reflow` 和 `repaint`。

在 `<script>` 加 `async` 或 `defer` 属性，浏览器异步加载和运行 `JS`，不阻止解析。

1. `async`：指示浏览器尽可能异步加载脚本，默认同步加载脚本(async=false)
2. `defer`：指示脚本要在解析文档之后但在触发 `DOMContentLoaded` 之前执行。
3. `async` 特性意味着脚本是完全独立的，`DOMContentLoaded` 和异步脚本不会彼此等待，其他脚本不会等待 `async` 脚本加载完成，同样，`async` 脚本也不会等待其他脚本。

`JS` 模块化（默认 defer）、样式文件中加 `rel=preload` 可设置资源加载优先级，优化加载渲染关键路径资源，优化性能。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/browser/script-async.png)

#### 预加载扫描器

**浏览器构建 DOM 树时，这个过程占用了主线程。** 当这种情况发生时，预加载扫描仪将解析可用的内容并请求高优先级资源，如 CSS、JavaScript 和 web 字体。多亏了预加载扫描器，我们不必等到解析器找到对外部资源的引用来请求它。

它将在后台检索资源，以便在主 HTML 解析器到达请求的资源时，它们可能已经在运行，或者已经被下载。预加载扫描仪提供的优化减少了阻塞。

```html
<link rel="stylesheet" src="styles.css"/>
<script src="myscript.js" async></script>
<img src="myimage.jpg" alt="image description"/>
<script src="anotherscript.js" async></script>
```

在这个例子中，当主线程在解析 HTML 和 CSS 时，预加载扫描器将找到脚本和图像，并开始下载它们。为了确保脚本不会阻塞进程，当 JavaScript 解析和执行顺序不重要时，可以添加 async 属性或 defer 属性。

> **尽管浏览器的预加载扫描器加速了这个过程，但过多的脚本仍然是一个重要的瓶颈。**

#### 样式计算（Recalculate Style）

样式计算的目的是为了计算出 DOM 节点中每个元素的具体样式。

当渲染引擎接收到 CSS 文本（外联、内联）时，会执行一个转换操作，将 CSS 文本转换为浏览器可以理解的结构 —— styleSheets。

styleSheets有两个作用：

- 可以与 DOM 树结合为页面带来样式
- JS 可以操作 styleSheets 改变页面样式

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/browser/SCR-20220425-10g.png)

> **CSS 不会阻塞 DOM 的解析，但会阻塞页面渲染**

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/browser/render-tree.png)

浏览器是解析 `DOM` 生成 `DOM Tree`，结合 `CSS` 生成的 `CSS Tree`，最终组成 `render tree`，再渲染页面。由此可见，在此过程中 `CSS` 完全无法影响 `DOM Tree`，因而无需阻塞 `DOM` 解析。但 `render tree` 依赖 `CSSOM` 因此，`CSS` 顺理成章地阻塞页面渲染。

> **CSS 会阻塞 JS 脚本执行**

如果脚本的内容是获取元素的样式，宽高等 `CSS` 控制的属性，浏览器是需要计算的，也就是依赖于 `CSS`。浏览器也无法感知脚本内容到底是什么，为避免样式获取，因而只好等前面所有的样式下载完后，再执行 `JS`。

#### 布局（Layout）

Chrome 在布局阶段需要完成两个任务：创建布局树和布局计算。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/browser/layout-tree.png)

**布局过程**：主线程遍历 `DOM` 并计算样式，并创建布局树（layout tree, 包含坐标和边界框大小等信息）。

> ⚠️ **布局树的特殊情况**
>
> - 不包括 `display: none` 的节点
> - 包括 `visibility: hidden` 的元素
> - 包括伪类元素，如 `::before`

#### 分层（Update Layer Tree）

页面中有很多复杂的效果，如一些复杂的 3D 变换、页面滚动，或者使用 z-indexing 做 z 轴排序等，**为了更加方便地实现这些效果，渲染引擎还需要为特定的节点生成专用的图层，并生成一棵对应的图层树（LayerTree）。**

图层效果如下：（可以通过谷歌浏览器的开发者工具选择 Layers 标签查看可视化页面分层）

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/browser/SCR-20220425-fdy.png)

布局树和图层树

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/browser/20210317092933724.png)

图层的条件

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/browser/20210317093815434.png)

#### 绘制（Paint）

我们可以发现，在 `Update Layer Tree` 之后只剩下 `Paint` 这一任务了：

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/browser/v2-db03ba8644a63db4c006675f9f874330_1440w.jpg)

从字面意义讲，这就是 **「绘制」** 么？并不是。

**`Paint` 的任务是整理每一层页面的绘制信息，构成绘制列表，这些数据会交给合成线程负责后续绘制操作。**

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/browser/SCR-20220425-fqx.png)

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/browser/v2-48fc74b660b51b77b40e7f7acaf6dc70_1440w.jpg)

可以发现，具体的绘制操作是交由合成线程完成，他与`JS`所在线程（主线程）并不是互斥的。

#### 栅格化（Raster）

> 绘制列表只是用来记录绘制顺序和绘制指令的列表，而实际上绘制操作是由渲染引擎中的合成线程来完成的。当图层的绘制列表准备好之后，主线程会把该绘制列表提交（commit）给合成线程。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/browser/SCR-20220425-fr4.png)

> **视口**

通常一个页面可能很大，但是用户只能看到其中的一部分，我们把用户可以看到的这个部分叫做**视口（viewport）**。

有时页面会很长，这种情况下，要绘制出所有图层内容的话，就会产生太大的开销，而且也没有必要。基于这个原因，**合成线程会将图层划分为图块（tile）**，这些图块的大小通常是 `256x256` 或者 `512x512`，看下图

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/browser/20210317105720225.png)

**合成线程会按照视口附近的图块来优先生成位图，实际生成位图的操作是由栅格化来执行的。所谓栅格化，是指将图块转换为位图。而图块是栅格化执行的最小单位。**

> **栅格化的线程池**

渲染进程维护了一个栅格化的线程池，所有的图块栅格化都是在线程池内执行的，运行方式如下图

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/browser/20210317110536822.png)

通常，栅格化过程都会使用 GPU 来加速生成，使用 GPU 生成位图的过程叫`快速栅格化`，或者 `GPU 栅格化`，生成的位图被保存在 GPU 内存中。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/browser/20210317110723265.png)

#### 合成和显示（Compositor）

一旦所有图块都被光栅化，合成线程就会生成一个绘制图块的命令——`DrawQuad`，然后将该命令提交给浏览器进程。

浏览器进程里面有一个叫 `viz` 的组件，用来接收合成线程发过来的 `DrawQuad` 命令，然后根据 `DrawQuad` 命令，将其页面内容绘制到内存中，最后再将内存显示在屏幕上。

#### 总结

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/browser/20210317111320705.png)

**一个完整的渲染流程大致可总结为如下：**

1. 渲染进程将 HTML 内容转换为能够读懂的 **DOM 树**结构。
2. 渲染引擎将 CSS 样式表转化为浏览器可以理解的 **styleSheets**，计算出 DOM 节点的样式。
3. 创建**布局树**，并计算元素的布局信息。
4. 对布局树进行分层，并生成**分层树**。
5. 为每个图层生成**绘制列表**，并将其提交到合成线程。
6. 合成线程将图层分成**图块**，并在**光栅化线程池**中将图块转换成位图。
7. 合成线程发送绘制图块命令 **DrawQuad** 给浏览器进程。
8. 浏览器进程根据 DrawQuad 消息生成页面，并显示到显示器上。

### 相关概念

#### 1.（重排）更新了元素的几何属性

> 例如改变元素的宽度、高度等，那么浏览器会触发重新布局，解析之后的一系列子阶段，这个过程就叫**重排**。无疑，**重排需要更新完整的渲染流水线，所以开销也是最大的。**

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/browser/20210317111630667.png)

#### 2.（重绘）更新元素的绘制属性

> 如果修改了元素的背景颜色，那么布局阶段将不会被执行，因为并没有引起几何位置的变换，所以就直接进入了绘制阶段，然后执行之后的一系列子阶段，这个过程就叫**重绘**。相较于重排操作，**重绘省去了布局和分层阶段，所以执行效率会比重排操作要高一些**。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/browser/20210317112739339.png)

#### 3. 直接（合成）阶段

> 那如果你更改一个既不要布局也不要绘制的属性，渲染引擎将跳过布局和绘制，只执行后续的合成操作，我们把这个过程叫做**合成**。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/browser/20210317113441983.png)

在上图中，使用了 CSS 的 transform 来实现动画效果，这可以避开重排和重绘阶段，直接在非主线程上执行合成动画操作。这样的效率是最高的，因为是在非主线程上合成，并没有占用主线程的资源，另外也避开了布局和绘制两个子阶段，所以**相对于重绘和重排，合成能大大提升绘制效率。**

#### 如何触发重排和重绘

任何改变用来构建渲染树的信息都会导致一次重排或重绘：

- 添加、删除、更新 `DOM` 节点
- 通过 `display: none` 隐藏一个 `DOM` 节点 —— 触发重排和重绘
- 通过 `visibility: hidden` 隐藏一个 `DOM` 节点 —— 只触发重绘，因为没有几何变化
- 移动或者给页面中的 `DOM` 节点添加动画
- 添加一个样式表，调整样式属性
- 用户行为，例如调整窗口大小，改变字号，或者滚动。

#### 如何避免重绘或者重排

1. 集中改变样式
2. 通过 `createDocumentFragment` 创建一个游离于 `DOM` 树之外的节点，然后在此节点上批量操作，最后插入 `DOM` 树中，因此只触发一次重排
3. 将元素提升为合成层
   1. 合成层的位图，会交由 `GPU` 合成，比 `CPU` 处理要快
   2. 当需要 `repaint` 时，只需要 `repaint` 本身，不会影响到其他的层
   3. 对于 `transform` 和 `opacity` 效果，不会触发 `layout` 和 `paint`

元素提升为合成层方式：

- 最常用的方式：`translate3d`、`translateZ`
- `opacity` 属性/过渡动画（需要动画执行的过程中才会创建合成层，动画没有开始或结束后元素还会回到之前的状态）
- `filters`
- `will-change` 属性，一般配合 `opacity` 与 `translate` 使用（而且经测试，除了上述可以引发硬件加速的属性外，其它属性并不会变成复合层）
- `video` 、`iframe` 、`canvas` 、`webgl` 等元素

## [用户输入行为与合成器](#目录)

### 浏览器视角下的输入事件

听到“输入事件”这个字眼，你脑海里闪现的恐怕只是输入文本或点击鼠标。但在浏览器眼中，输入意味着一切用户行为。不单滚动鼠标滑轮是输入事件，触摸屏幕、滑动鼠标同样也是用户输入事件。

诸如触摸屏幕之类用户手势产生时，**浏览器进程会率先将其捕获。然而浏览器进程所掌握的信息仅限于行为发生的区域，因为标签页里的内容都由渲染进程负责处理，所以浏览器进程会将事件类型（如 touchstart）及其坐标发送给渲染进程。** 渲染进程会寻至事件目标，运行其事件监听器，妥善地处理事件。

### 合成器接收输入事件

如果页面上没有添加任何事件监听，合成器线程会创建独立于主线程的新合成帧。但要是页面上添加了事件监听呢？合成器线程又是如何得知事件是否需要处理的？

#### 理解非立即可滚动区

因为运行 JavaScript 脚本是主线程的工作，所以页面合成后，合成进程会将页面里添加了事件监听的区域标记为“非立即可滚动区”。**有了这个信息，如果输入事件发生在这一区域，合成进程可以确定应将其发往主线程处理。如输入事件发生在这一区域之外，合成进程则确定无需等待主线程，可继续合成新帧。**

> 具体的绘制操作是交由合成线程完成，在非立即可滚动区他与`JS`所在线程（主线程）是互斥的。

#### 设置事件处理器时须注意

web 开发中常用的事件处理模式是事件代理。因为事件会冒泡，所以你可以在最顶层的元素中添加一个事件处理器，用来代理事件目标产生的任务。下面这样的代码，你可能见过，或许也写过。

```js
document.body.addEventListener('touchstart',
event => {
    if (event.target === area) {
        event.preventDefault();
    }
});
```

这样只需添加一个事件监听器，即可监听所有元素，的确十分省事。然而，如果站在浏览器的角度去考量，这等于把整个页面都标记成了“非立即可滚动区”，意味着即便你设计的应用本不必理会页面上一些区域的输入行为，**合成线程也必须在每次输入事件产生后与主线程通信并等待返回。如此则得不偿失，使原本能保障页面滚动流畅的合成器没了用武之地。**

你可以给事件监听添加一个 `passive:true` 选项 ，将这种负面效果最小化。这会提示浏览器你想继续在主线程中监听事件，但合成器不必停滞等候，可接着创建新的合成帧。

```js
document.body.addEventListener('touchstart', event => {
    if (event.target === area) {
        event.preventDefault()
    }
 }, {passive: true});
```

#### 检查事件是否可撤销

设想一下这种情形：页面上有一个盒子，你要将其滚动方向限制为水平滚动。

为目标事件设置 `passive:true` 选项可让页面滚动平滑，但在你使用 `preventDefault` 以限制滚动方向时，垂直方向滚动可能已经触发。使用 `event.cancelable` 可以检查并阻止这种情况发生。

```js
document.body.addEventListener('pointermove', event => {
    if (event.cancelable) {
        event.preventDefault(); // 阻止默认的滚动行为
        /*
        *  这里设置程序执行任务
        */
    }
}, {passive:: true});
```

或者，你也可以应用 `touch-action` 这类 CSS 规则，完全地将事件处理器屏蔽掉。

```js
#area {
  touch-action: pan-x;
}
```

#### 降低往主线程发送事件的频率

而对于用户的输入行为，常见触摸屏设备的事件传输频率为每秒 60~120 次，常见鼠标设备的事件传输频率为每秒 100 次。可见，输入事件有着比显示屏幕更高的保真度。

如果一连串 `touchmove` 这样的事件以每秒 120 次的频率发送往主线程，那么可能会触发过量的命中检测及 JavaScript 脚本执行。相形而言，我们的屏幕刷新率则低下得多。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/browser/1668a69b28e7b10f_tplv-t2oaga2asx-zoom-in-crop-mark_1304_0_0_0.webp)

为了降低往主线程中传递过量调用，Chrome 会合并这些连续事件（如：`wheel`, `mousewheel`, `mousemove`, `pointermove`, `touchmove` 等），并将其延迟至下一次 `requestAnimationFrame` 前发送。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/browser/1668a69b2dbf1cb4_tplv-t2oaga2asx-zoom-in-crop-mark_1304_0_0_0.webp)

所有独立的事件，如: `keydown`, `keyup`, `mouseup`, `mousedown`, `touchstart`, 及 `touchend` 则会立即发往主线程。

#### 使用 `getCoalescedEvents` 获取帧内事件

事件合并可帮助大多数 web 应用构建良好的用户体验。然而，如果你开发的是一个绘图类应用，需要基于 `touchmove` 事件的坐标绘制线路，那么在你试图画下一根光滑的线条时，区间内的一些坐标点也可能会因事件合并而丢失。这时，你可以使用目标事件的 `getCoalescedEvents` 方法获取事件合并后的信息。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/browser/1668a69be9b80e4c_tplv-t2oaga2asx-zoom-in-crop-mark_1304_0_0_0.webp)

图 9：左为流畅的触摸手势路径、右为事件合并后的有限路径

```js
window.addEventListener('pointermove', event => {
    const events = event.getCoalescedEvents();
    for (let event of events) {
        const x = event.pageX;
        const y = event.pageY;
        // 使用 x、y 坐标画线
    }
});
```

## [事件循环](#目录)

[事件循环](https://www.bilibili.com/video/BV1K4411D7Jb)

## [V8 引擎](#目录)

## [浏览器多进程架构](#目录)
## [浏览器多进程架构](#目录)
## [浏览器多进程架构](#目录)
## [浏览器多进程架构](#目录)

## [科普](#目录)

### 为什么 Chrome 的 navigator 属性值里会看到AppleWebkit ？

`UA` 是浏览器的身份证，通常，在发送 HTTP 请求时，UA 会附带在 HTTP 的请求头中 user-agent 字段中，这样服务器就会知道浏览器的基础信息，然后服务器会根据不同的 UA 返回不同的页面内容，比如手机上返回手机的样式，PC 就返回 PC 的样式。

在浏览器的控制台中输入：`navigator.userAgent` 查看当前浏览器的 UA 信息。

- FireFox 中的打印的信息是：

  ```js
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:68.0) Gecko/20100101 Firefox/68.0"
  ```

- Chrome 中打印的信息是：

  ```sh
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36'
  ```

服务器会根据不同的 UA 来针性的设计不同页面，所以当出了一款新浏览器时，他如果使用自己独一无二的 UA，那么之前的很多服务器还需要针对他来做页面适配，这显然是不可能的。

比如 Chrome 发布时他会在他的 UA 中使用 “Mozilla” ，“AppleWebKit”，等关键字段，用来表示他同时支持 Mozilla 和 AppleWebKit，然后再在最后加上他自己的标示，如 Chrome/xxx。

### 现在的浏览器可以同时打开多个页签，他们端口一样吗？如果一样，数据怎么知道去哪个页签？

端口一样的，网络进程知道每个 tcp 链接所对应的标签是那个，所以接收到数据后，会把数据分发给对应的渲染进程

### tcp 传送数据时 浏览器端就做渲染处理了么？如果前面数据包丢了 后面数据包先来是要等么？类似的那种实时渲染怎么处理？针对数据包的顺序性？

接收到 http 响应头中的 content-type 类型时就开始准备渲染进程了，响应体数据一旦接受到便开始做 DOM 解析了！基于 http 不用担心数据包丢失的问题，因为丢包和重传都是在 tcp 层解决的。http 能保证数据按照顺序接收的！

### 同一个域名同时最多只能建立 6 个 TCP 连接 是不是意思是同一域名同时只能发送6个 AJAX 请求吗？

”同一个域名同时最多只能建立 6 个 TCP 连接“ 指的不光是指Ajax，还包括页面中的资源加载，只要是一个域名下的资源，浏览器同一时刻最多只支持6个并行请求。不过这是 HTTP/1.1 的规则，HTTP/2 已经不用这套规则了。

## [参考资料](#目录)

- [[译] 现代浏览器内部揭秘（第一部分）](https://juejin.cn/post/6844903679389073415)
- [[译] 现代浏览器内部揭秘（第二部分）](https://juejin.cn/post/6844903692890537992)
- [[译] 现代浏览器内部揭秘（第三部分）](https://juejin.cn/post/6844903692894732295)
- [[译] 现代浏览器内部揭秘（第四部分）](https://juejin.cn/post/6844903695600058375)
- [浏览器工作原理与实践](https://blog.csdn.net/kaimo313/article/details/122580983)
- [[MDN] 渲染页面：浏览器的工作原理](https://developer.mozilla.org/zh-CN/docs/Web/Performance/How_browsers_work)
