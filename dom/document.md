# document<!-- omit in toc -->

- [document 节点](#document-节点)
- [document.visibilityState](#documentvisibilitystate)
- [document.readyState](#documentreadystate)
- [document.createNodeIterator](#documentcreatenodeiterator)
- [document.createDocumentFragment](#documentcreatedocumentfragment)
- [搜索方法](#搜索方法)
- [其他属性](#其他属性)

## document 节点

浏览器原生提供 **document** 节点，代表整个文档。

**document** 节点有两个子节点，第一个是文档类型节点 `<!doctype html>`，第二个是 HTML 网页的顶层容器标签 `<html>`。

```js
console.log(document.childNodes)
```

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/web/SCR-20220512-pl1.png)

## document.visibilityState

`document.visibilityState` 返回文档的可见状态。

它的值有四种可能。

- **visible**：页面可见。注意，页面可能是部分可见，即不是焦点窗口，前面被其他窗口部分挡住了。
- **hidden**：页面不可见，有可能窗口最小化，或者浏览器切换到了另一个 Tab。
- **prerender**：页面处于正在渲染状态，对于用户来说，该页面不可见。
- **unloaded**：页面从内存里面卸载了。

这个属性可以用在页面加载时，防止加载某些资源；或者页面不可见时，停掉一些页面功能。

## document.readyState

`document.readyState` 是文档的当前状态，可以在 `readystatechange` 事件中跟踪状态更改：

- **`loading`** —— 文档正在被加载。
- **`interactive`** —— 文档已被解析完成，与 `DOMContentLoaded` 几乎同时发生，但是在 `DOMContentLoaded` 之前发生。
- **`complete`** —— 文档和资源均已加载完成，与 `window.onload` 几乎同时发生，但是在 `window.onload` 之前发生。

**`readystatechange`** 事件也适用于资源，但很少被使用，因为 `load / error` 事件更简单。

这个属性变化的过程如下。

1. 浏览器开始解析 HTML 文档，`document.readyState` 属性等于 `loading`。
1. 浏览器遇到 HTML 文档中的 `<script>`元素，并且没有 `async` 或 `defer` 属性，就暂停解析，开始执行脚本，这时 `document.readyState` 属性还是等于 `loading`。
1. HTML 文档解析完成，`document.readyState` 属性变成 `interactive`。
1. 浏览器等待图片、样式表、字体文件等外部资源加载完成，一旦全部加载完成，`document.readyState` 属性变成 `complete`。

**拓展：** HTML 页面的生命周期

- **`DOMContentLoaded`** —— 浏览器已完全加载 HTML，并构建了 DOM 树，但像 `<img>` 和样式表之类的外部资源可能尚未加载完成。
- **`load`** —— 浏览器不仅加载完成了 HTML，还加载完成了所有外部资源：图片，样式等。
- **`beforeunload/unload`** —— 当用户正在离开页面时。
  1. **`beforeunload`** 事件 —— 用户正在离开：我们可以检查用户是否保存了更改，并询问他是否真的要离开。
  2. **`unload`** 事件 —— 用户几乎已经离开了，但是我们仍然可以启动一些操作，例如发送统计数据。

> ⚠️ **不会阻塞 DOMContentLoaded 的脚本**

- 具有 `async` 特性（attribute）的脚本不会阻塞 `DOMContentLoaded`
- 使用 `document.createElement('script')` 动态生成并添加到网页的脚本也不会阻塞 `DOMContentLoaded`。

## document.createNodeIterator

`document.createNodeIterator` 方法返回一个子节点遍历器。

`document.createNodeIterator` 方法第一个参数为所要遍历的根节点，第二个参数为所要遍历的节点类型，几种主要的节点类型写法如下。

- 所有节点：`NodeFilter.SHOW_ALL`
- 元素节点：`NodeFilter.SHOW_ELEMENT`
- 文本节点：`NodeFilter.SHOW_TEXT`
- 评论节点：`NodeFilter.SHOW_COMMENT`

`document.createNodeIterator` 方法返回一个“遍历器”对象（ `NodeFilter` 实例）。该实例的 `nextNode()`方法和 `previousNode()`方法，可以用来遍历所有子节点。

## document.createDocumentFragment

`document.createDocumentFragment` 方法生成一个空的文档片段对象。`DocumentFragment` 是一个存在于内存的 DOM 片段，不属于当前文档，常常用来生成一段较复杂的 DOM 结构，然后再插入当前文档。这样做的好处在于，因为 `DocumentFragment` 不属于当前文档，对它的任何改动，都不会引发网页的重新渲染，比直接修改当前文档的 DOM 有更好的性能表现。

## 搜索方法

- `document.querySelector` 方法接受一个 CSS 选择器作为参数，返回匹配该选择器的元素节点。如果有多个节点满足匹配条件，则返回第一个匹配的节点。如果没有发现匹配的节点，则返回 `null`。
- `document.querySelectorAll` 方法与 `querySelector` 用法类似，区别是返回一个 `NodeList` 对象，包含所有匹配给定选择器的节点。
- `document.getElementsByTagName` 方法搜索 HTML 标签名，返回符合条件的元素。它的返回值是一个类似数组对象（ `HTMLCollection` 实例）
- `document.getElementById` 方法返回匹配指定 `id` 属性的元素节点。如果没有发现匹配的节点，则返回 `null`。

## 其他属性

```js
// 快捷方式属性
document.documentElement  // 返回当前文档的根节点
document.body   // 返回当前文档的 <body> 节点
document.head   // 返回当前文档的 <head> 节点
document.activeElement  // 返回当前文档中获得焦点的那个元素
document.fullscreenElement  // 返回当前以全屏状态展示的 DOM 元素

// 创建元素
document.createElement // createElement 方法的参数为元素的标签名，即元素节点的 `tagName` 属性，参数可以是自定义的标签名。

// 节点集合属性
document.links  // 返回当前文档的所有 a 元素
document.forms  // 返回页面中所有表单元素
document.images  // 返回页面中所有图片元素
document.scripts  // 返回当前文档的所有脚本
document.styleSheets  // 返回当前网页的所有样式表

// 文档静态信息属性
document.documentURI  // 表示当前文档的网址
document.URL  // 返回当前文档的网址
document.domain  // 返回当前文档的域名
document.lastModified  // 返回当前文档最后修改的时间
document.location  // 返回 location 对象，提供当前文档的 URL 信息
document.referrer  // 返回当前文档的访问来源
document.title    // 返回当前文档的标题

// 其他属性
document.cookie   // 用来操作 Cookie
document.designMode  // 控制当前文档是否可编辑，可读写
document.hidden  //返回一个布尔值，表示当前页面是否可见
```
