---
nav:
  second:
    title: NodeJS
    order: -1
order: -999
title: 什么是 Node.js？
toc: content
group:
  title: 介绍
  order: -999
---

## Node.js 简介

在它官网上是这么讲的：

> Node.js® is an open-source, cross-platform JavaScript runtime environment.

翻译过来：**Node.js 是一个开源的、跨平台的 JavaScript 运行时环境。**

![20240425121938](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/me/20240425121938.png)

Node.js 并不是语言，而是一个 JavaScript 运行时环境，它的语言是 JavaScript。这就跟 PHP、Python、Ruby 这类不一样，它们既代表语言，也可代表执行它们的运行时环境 (或解释器)。

## Node.js vs 浏览器：关键差异

在 Node.js 的问世之前，JavaScript 最常见的执行环境是浏览器，也被称为 JavaScript 的宿主环境。在这种环境中，浏览器提供了 DOM API，允许 JavaScript 直接操作浏览器环境。

Node.js 引入了一种不同的宿主环境，尽管它同样基于 Chrome 浏览器的 V8 引擎。然而，由于 Node.js 并不是一个浏览器环境，它不提供浏览器特有的 DOM API，例如 Window、Location、Document、HTMLElement 和 Cookie 等对象。相反，Node.js 提供了一系列独特的 API，如全局的 `global` 对象、提供当前进程信息的 `process` 对象、用于操作文件系统的 `fs` 模块，以及用于创建 Web 服务的 `http` 模块等。这些 API 使得我们能够使用 JavaScript 来操作计算机系统，从而使 Node.js 成为开发 web 服务器的一个强大平台。

尽管存在这些差异，Node.js 和浏览器环境仍然共享了一些基础设施，主要是 JavaScript 引擎的内置对象，这些由 V8 引擎提供。这包括了基本常量 (如 `undefined`、`null`、`NaN`、`Infinity`) 和内置对象 (如 `Boolean`、`Number`、`String`、`Object`、`Symbol`、`Function`、`Array`、`RegExp`、`Set`、`Map`、`Promise`、`Proxy`)，以及全局函数 (如 `eval`、`encodeURIComponent`、`decodeURIComponent` 等)。

此外，还有一些功能虽然不是由引擎直接提供的 API，但在 Node.js 和浏览器环境中都可用，例如 `setTimeout`、`setInterval` 方法和 `Console` 对象等。

通过这种方式，Node.js 和浏览器虽然在某些方面存在显著差异，但也保持了一定程度的兼容性，特别是在 JavaScript 核心语言特性方面。这种设计不仅扩展了 JavaScript 的应用范围，也为开发者提供了更多的灵活性和选择空间。

## Node.js 的底层架构解析

Node.js 的基本架构如下图所示：

![20240425123241](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/me/20240425123241.png)

上图是 Node.js 的基本架构，我们可以看到，Node.js 是运行在操作系统之上的，它底层由 V8 JavaScript 引擎，以及一些 C/C++ 写的库构成。

下面是 Node.js 架构的详细说明：

- **V8 JavaScript 引擎**：这是 Node.js 的心脏，负责解释和执行 JavaScript 代码，它是由 Google 开发，用于 Chrome 浏览器，但在 Node.js 中也发挥着关键作用。
- **libUV 库**：这个跨平台库提供了事件循环的实现，它是 Node.js 非阻塞 I/O 模型的基石，允许 Node.js 同时处理成千上万的并发连接。
- **附加库**：包括 c-ares、llhttp/http-parser、OpenSSL 和 zlib 等，这些库分别负责 DNS 解析、HTTP 请求解析、加密和数据压缩等功能。

Node.js 的中间层由以下部分组成：

- **Node.js Bindings**：这一层提供了 JavaScript 与 C/C++库之间的桥梁，使得 JavaScript 代码能够访问和控制底层资源。
- **Node.js 标准库**：包含了一系列内置模块，比如文件系统、网络、加密等，这是 Node.js 的核心部分，为开发者提供了丰富的 API。
- **C/C++ AddOns**：使得开发者可以编写 C/C++代码并将其作为模块直接引入到 Node.js 应用中，以满足特定的性能要求或访问特定的系统资源。

最后，在 Node.js 的顶层是 API 层，这是开发者与 Node.js 交互的接口。通过这些 API，开发者可以编写应用程序，而这些应用程序最终运行在 Node.js 平台之上。

通过这种分层架构，Node.js 为开发高性能、可扩展和灵活的服务器端应用提供了坚实的基础。

## Node.js 到底适合做什么呢？

自诞生以来，Node.js 已经成长为一个多面手，它的应用范围从服务端开发扩展到前端工具链、桌面应用，乃至游戏开发，应有尽有。部署模式也从传统应用到了现在的 Serverless。让我们来探索 Node.js 的多维能力：

- 服务端开发：Node.js 内置了多个模块，如 http、net、fs 等，这些模块提供了丰富的 API，使得 Node.js 不仅可以轻松地创建 HTTP 服务端，还可以用于开发 TCP、UDP 服务端，甚至是 RPC 服务。这种多样性使得 Node.js 成为服务端开发的一个优秀选择。 -泛前端工具链：随着前端技术的发展，构建工具、脚手架、包管理器等工具变得越来越重要。Node.js 在这一领域的应用尤为广泛，几乎所有的现代前端工具都是基于 Node.js 开发的。这不仅仅是因为 Node.js 使用 JavaScript，还因为 Node.js 提供的 API 非常适合开发此类工具。
- 桌面端：通过 NW.js (以前称为 node-webkit) 和 Electron.js (以前称为 Atom Shell) 这样的框架，Node.js 在桌面端开发中得到了广泛的应用。其实很多有名的软件都是基于 Electron 开发的，比如微软的代码编辑器 Visual Studio Code，又比如 1Password、钉钉等。
- Serverless 架构：Serverless 架构需要快速启动和执行代码，而 Node.js 在这方面有着明显的优势。Node.js 的冷启动速度快，占用资源少，加上近年来 Node.js 在冷启动速度上下了比较大的功夫，从 Node.js 自身的 Snapshot 再到用户侧 Snapshot，使得 Node.js 成为了 Serverless 架构中的首选语言。

阿特伍德定律有云：

> Any application that can be written in JavaScript, will eventually be written in JavaScript.

虽然各领域的板子长短参差不齐，但好歹该有的能力都有了。毕竟底层是 C++ 实现的，想要什么能力，binding 一个就好了。

## Winter 规范：服务端 JavaScript 的未来

Winter，即 Web-interoperable Runtime，是一个旨在实现服务端 JavaScript 环境互操作性的规范。“互操作性” (interoperability) 指的是不同运行时环境能够无缝替代或兼容对方。类似于互联网浏览器遵循共同标准以确保 API 的一致性，Winter 旨在通过标准化实现服务端 JavaScript 生态系统的共享和兼容。

Winter 的方法是采用 Web API (特别是 Service Worker) 的一个子集作为标准，而不是引入全新的 API。这意味着，只要一个运行时实现了这些标准 API，它就可以被认为是符合 Winter 规范的 Web-interoperable Runtime。尽管运行时可以引入新的 API，但它们必须保证与 Winter 规范的 API 兼容，以确保整个生态系统的可交互性。

## 提升 Node.js 应用的冷启动速度

冷启动速度对于服务器端应用至关重要，尤其是在云计算和微服务架构中。Node.js 通过技术如快照 (Snapshot) 优化了启动过程，使得应用可以以更快的速度响应用户请求，并更有效地利用资源。

### 冷启动速度

“冷启动” 通常指的是从应用程序完全未运行的状态启动到运行状态的过程。对于服务器端的应用，尤其是在云计算和微服务架构中，冷启动速度很重要，因为它直接影响到用户体验和资源利用率。一个应用如果能快速启动，就能更快地响应用户的请求，同时也能更有效地利用计算资源，因为它允许系统在需要时快速扩展。

### Snapshot (快照)

在计算机科学中，快照通常指的是在某一时刻系统的状态的一个完整拷贝。对于 Node.js 来说，Snapshot 可以理解为在某一时刻 Node.js 应用的内存快照，包括了应用的代码、已加载的模块、以及应用的堆 (heap) 状态等。

Node.js 在启动时需要加载和编译代码，这个过程会消耗时间。如果能够提前将这个状态 (即代码加载、编译后的状态) 保存下来，下次启动时直接加载这个快照，就可以大大减少启动时间，这就是所谓的 Snapshot 技术。

### Node.js 的优化

Node.js 在启动和执行用户代码之前，需要进行一系列的初始化操作，包括创建内部资源和对象。这一过程是必要的，但同时也会消耗一定的时间。为了优化这个过程，提出了一种方法：将这些初始化产生的对象和资源以二进制大对象 (blob) 的形式保存下来。这样，在 Node.js 下次启动时，可以直接加载这些预先保存的 blob，而不是重新进行初始化操作，从而加速启动过程。

这个过程对于 Node.js 的用户来说是透明的，也就是说用户不需要手动进行任何操作，Node.js 会自动处理这些底层的优化。但是，除了 Node.js 内部的资源和对象，用户的代码在执行过程中也可能会生成一些可以复用的资源或对象。Node.js 同样提供了机制允许用户生成和加载这种针对用户代码的 blob，这种机制被称为 “用户态快照” (userland snapshot)。

简而言之，用户态快照的概念允许用户的代码也能享受到类似 Node.js 内部优化的好处。通过保存用户代码执行的某些状态，可以在下次启动或执行时快速恢复到这些状态，而不是从头开始，从而加速用户代码的执行。
