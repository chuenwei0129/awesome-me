# 计算机基础知识图谱（一）<!-- omit in toc -->

***👀 TIPS: 二级标题可返回目录***

---

> ## 目录

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

**进程模型图：**

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/browser/SCR-20220424-lqa.png)

**资源受限的设备上：**

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/browser/SCR-20220424-lr6.png)

### 浏览器的进程模式

为了节省内存，Chrome 提供了四种进程模式（Process Models），不同的进程模式会对 tab 进程做不同的处理。

- **Process-per-site-instance** (default) - 同一个 **site-instance** 使用一个进程
- **Process-per-site -** 同一个 **site** 使用一个进程
- **Process-per-tab -** 每个 tab 使用一个进程
- **Single process -** 所有 tab 共用一个进程

这里需要给出 site 和 site-instance 的定义

- **site** 指的是相同的 `registered domain name` 和 `scheme`。比如 `a.baidu.com` 和 `b.baidu.com` 就可以理解为同一个 **site**（注意这里要和  `Same-origin policy` 区分开来，同源策略还涉及到子域名和端口）。
- **site-instance** 满足下面两中情况并且打开的新页面和旧页面属于上面定义的同一个 **site**，就属于同一个 **site-instance**

  - 用户通过 `<a target="_blank">` 这种方式点击打开的新页面
  - JS 代码打开的新页面（比如 `window.open`)

`Process-per-site-instance` 是 Chrome 默认使用的模式，也就是几乎所有的用户都在用的模式。当你打开一个 tab 访问 `a.baidu.com` ，然后再打开一个 tab 访问 `b.baidu.com`，这两个 tab 会使用**两个进程**。

而如果你在 `a.baidu.com` 中，通过 JS 代码打开了 `b.baidu.com` 页面，这两个 tab 会使用**同一个进程**。

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

## [渲染流程](#目录)

## [事件循环](#目录)

## [V8 引擎](#目录)

## [浏览器多进程架构](#目录)
## [浏览器多进程架构](#目录)
## [浏览器多进程架构](#目录)
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
