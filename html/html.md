# 积跬步，至千里<!-- omit in toc -->

> **年与时驰，意与日去，只能从回忆中捕捉一些心脏鲜活跳动过的痕迹。**

🕖 怀念那个在宿舍看着 [JavaScript DOM 编程艺术](https://book.douban.com/subject/6038371/) 畅想未来的自己。

**目录：**

- [HTML](#html)
- [DOM](#dom)
  - [为什么 window 属于 DOM 接口？难道说 window 属于 DOM?](#为什么-window-属于-dom-接口难道说-window-属于-dom)
  - [ECMAScript 中的对象和 DOM 对象是一个概念么？](#ecmascript-中的对象和-dom-对象是一个概念么)
  - [前端为什么操作 DOM 是最耗性能的呢？](#前端为什么操作-dom-是最耗性能的呢)
  - [前端框架到底帮你解决了什么问题？](#前端框架到底帮你解决了什么问题)
  - [API](#api)
- [事件](#事件)
- [事件循环](#事件循环)
- [DOM 节点类](#dom-节点类)
- [DOM 节点类型](#dom-节点类型)
- [Node 接口](#node-接口)
- [document](#document)
- [Element](#element)
- [节点属性](#节点属性)
- [样式](#样式)
- [浏览器窗口、坐标和滚动](#浏览器窗口坐标和滚动)
- [事件](#事件-1)
- [表单](#表单)
- [如何处理大量 DIV 插入问题](#如何处理大量-div-插入问题)

## HTML

- [大多数前端工程师了解但并不擅长的 HTML 语义化](https://zhuanlan.zhihu.com/p/97072021)
- [HTML DOM 级别以及一些小坑](https://github.com/justjavac/the-front-end-knowledge-you-may-not-know/blob/master/archives/014-dom-level.md)
- [HTML attribute 和 DOM property](https://github.com/justjavac/the-front-end-knowledge-you-may-not-know/blob/master/archives/015-dom-attributes-and-properties.md)

## DOM

### [为什么 window 属于 DOM 接口？难道说 window 属于 DOM?](https://www.zhihu.com/question/345622144)

**MDN** 里把浏览器里所有非 JavaScript 自带的 API 都称之为 [Web API](https://developer.mozilla.org/zh-CN/docs/Web/API)，而不用 DOM API 这样的术语，就像 Node 里提供的 API 都叫 Node API 一样。

在 DOM 编程时，通常使用的最多的就是 `document` 和 `window` 对象。简单的说，`window` 对象表示浏览器中的内容，而 `document` 对象是**文档本身的根节点**。

![20230301023504](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/others/20230301023504.png)

[window](https://developer.mozilla.org/zh-CN/docs/Web/API/Window) 作为全局变量，代表了脚本正在运行的窗口，暴露给 Javascript 代码。

在有标签页功能的浏览器中，每个标签都拥有自己的 `window` 对象；也就是说，**同一个窗口的标签页之间不会共享一个 `window` 对象**。有一些方法，如 [`window.resizeTo`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/resizeTo) 和 [`window.resizeBy`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/resizeBy) 之类的方法会作用于整个窗口而不是 `window` 对象所属的那个标签。

### [ECMAScript 中的对象和 DOM 对象是一个概念么？](https://www.zhihu.com/question/67501711)

**👌 回答：**

**是一个概念。**

**[DOM](https://developer.mozilla.org/zh-CN/docs/Web/API/Document_Object_Model) 并不属于 JavaScript 语言的一部分**。DOM 是 JavaScript 的运行平台 —— 浏览器提供的。

JavaScript 类型分为 2 大类：**原始类型** 和 **对象类型**。而 DOM 是对象类型。

**所有的 DOM 没有任何特殊之处，都是一个 Object 的子类**。

当我们创建了一个 `DOM Object` 后，我们就可以把这个 `DOM Object` 当作一个普通的 JavaScript 对象来使用。

**说他特殊，是因为 DOM 的属性和方法会被引擎映射到 HTML 标签上（[HTML attribute 和 DOM property](https://github.com/justjavac/the-front-end-knowledge-you-may-not-know/blob/master/archives/015-dom-attributes-and-properties.md)）。**

**📚 拓展：**

所有的 JavaScript 对象都是继承自 `Object`，即使我们经常创建的空对象：

```js
let obj = {}
```

也是 `Object` 的子类。

**但是 `Object.create(null)` 却是实实在在的空对象**。

**🤔 思考：**

**问：** 直接把一个 DOM 对象当作 JS 对象那样**读写非 API 属性**，会像 DOM 一样慢，还是像操作普通 JS 对象一样快呢？

**答：** 因为 JS 访问的 DOM 对象实际上是 DOM 引擎中的对象在 JS 引擎的包装对象，**理论上访问其非 API 属性应该和 JS 对象一样快**。

**但不同的引擎实现不同，就像当年 IE DOM 对象内存泄露的坑一样，最好不要拿 DOM 当 JS 对象用。**

### [前端为什么操作 DOM 是最耗性能的呢？](https://www.zhihu.com/question/324992717)

**其一：** **浏览器的 JavaScript 引擎与 DOM 引擎共享一个主线程**。任何 DOM API 调用都要先将 JS 数据结构转为 DOM 数据结构，再挂起 JS 引擎并启动 DOM 引擎，执行过后再把可能的返回值反转数据结构，重启 JS 引擎继续执行。这种上下文切换很耗性能，类似的还有单机进程间调用、远程过程调用等。

**其二：** **很多 DOM API 的读写都涉及页面布局的“重新计算”**，以确保返回值的准确，涉及样式、结构的还会触发页面“重新绘制”，更耗性能。

综上，单次 DOM API 调用性能就不够好，频繁调用就会迅速积累上述损耗，导致 DOM 引擎占用主线程过久，用户操作不能及时触发 JS 事件回调，让用户感觉卡顿。

所以，解决此问题的方案本质不在于用不用 jQuery、用不用虚拟 DOM，而是 —— **减少不必要的 DOM API 调用。**

而减少不必要调用的各种方案，都遵循 **“在 JS 中缓存必要数据，计算界面更新时的阶段数据差异，只提交最终差集”** 的基本思路。虚拟 DOM **计算的是最终 DOM 结构的差异**，还有的引擎**计算的是 DOM 所绑定数据的差异**，各有千秋。

### [前端框架到底帮你解决了什么问题？](https://zhuanlan.zhihu.com/p/45510072)

> 框架的目标是提高开发效率，而非运行效率。

- [网上都说操作真实 DOM 慢，但测试结果却比 React 更快，为什么？](https://www.zhihu.com/question/31809713)
- [案例分析：如何处理大量 DIV 插入问题](https://chrisdeo.github.io/2019/07/22/%E5%A6%82%E4%BD%95%E5%A4%84%E7%90%86%E5%A4%A7%E9%87%8FDIV%E6%8F%92%E5%85%A5%E9%97%AE%E9%A2%98/)
- [如何看待 snabbdom 的作者开发的前端框架 Turbine 抛弃了虚拟 DOM？](https://www.zhihu.com/question/59953136)
- [Vue 采用虚拟 DOM 的目的是什么?](https://www.zhihu.com/question/271485214/answer/386097473)
- [既然用 virtual dom 可以提高性能，为什么浏览器不直接自带这个功能呢？](https://www.zhihu.com/question/67479886)

### API

## 事件

<!-- 注：Passive 翻译为被动，为 true 时，表示主动权为浏览器，开发者 preventDefault() 无效，本质是浏览器自我优化。 -->
- [移动 Web 滚动性能优化: Passive event listeners](https://zhuanlan.zhihu.com/p/24555031)
- [Event API](./event.md)

## 事件循环

- [事件循环](https://www.bilibili.com/video/BV1K4411D7Jb)
- [JavaScript 的 DOM 事件回调不是宏任务吗，为什么在本次微任务队列触发？](https://www.zhihu.com/question/362096226/answer/2026663593)

## DOM 节点类

**每个标签都有自己的类**，这些类可以提供特定的属性和方法。因此，给定节点的全部属性和方法都是继承的结果。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/web/Node.png)

**👴 继承关系：**

- [EventTarget](https://dom.spec.whatwg.org/#eventtarget) —— 是一切的根“抽象（abstract）”类。

  该类的对象从未被创建。它作为一个基础，以便让所有 DOM 节点都支持所谓的“事件（event）”，我们会在之后学习它。

- [Node](http://dom.spec.whatwg.org/#interface-node) —— 也是一个“抽象”类，充当 DOM 节点的基础。

  它提供了树的核心功能：`parentNode`，`nextSibling`，`childNodes` 等（它们都是 getter）。`Node` 类的对象从未被创建。但是还有一些继承自它的其他类（因此继承了 `Node` 的功能）。

- [Document](https://dom.spec.whatwg.org/#interface-document) 由于历史原因通常被 `HTMLDocument` 继承（尽管最新的规范没有规定）—— 是一个整体的文档。

  全局变量 `document` 就是属于这个类。它作为 DOM 的入口。

- [CharacterData](https://dom.spec.whatwg.org/#interface-characterdata) —— 一个“抽象”类，被下述类继承：

  - [Text](https://dom.spec.whatwg.org/#interface-text) —— 对应于元素内部文本的类，例如 `<p>Hello</p>` 中的 `Hello`。
  - [Comment](https://dom.spec.whatwg.org/#interface-comment) —— 注释类。它们不会被展示出来，但每个注释都会成为 DOM 中的一员。

- [Element](http://dom.spec.whatwg.org/#interface-element) —— 是 DOM 元素的基础类。

  它提供了元素级导航（navigation），如 `nextElementSibling`，`children`，以及搜索方法，如 `getElementsByTagName` 和 `querySelector`。

  浏览器不仅支持 HTML，还支持 XML 和 SVG。因此，`Element` 类充当的是更具体的类的基础：`SVGElement`，`XMLElement`（我们在这里不需要它）和 `HTMLElement`。

- 最后，[HTMLElement](https://html.spec.whatwg.org/multipage/dom.html#htmlelement) —— 是所有 HTML 元素的基础类。我们大部分时候都会用到它。

  它会被更具体的 HTML 元素继承：

  - [HTMLInputElement](https://html.spec.whatwg.org/multipage/forms.html#htmlinputelement) —— `<input>` 元素的类，
  - [HTMLBodyElement](https://html.spec.whatwg.org/multipage/semantics.html#htmlbodyelement) —— `<body>` 元素的类，
  - [HTMLAnchorElement](https://html.spec.whatwg.org/multipage/semantics.html#htmlanchorelement) —— `<a>` 元素的类，
  - ……等。

还有很多其他标签具有自己的类，可能还具有特定的属性和方法，而一些元素，如 `<span>`、`<section>`、`<article>` 等，没有任何特定的属性，所以它们是 `HTMLElement` 类的实例。

因此，给定节点的全部属性和方法都是继承链的结果。

**🌰 举个例子：**

例如 `<input>` 元素的 DOM 对象。它属于 HTMLInputElement 类。

它获取属性和方法，并将其作为下列类（按继承顺序列出）的叠加：

- **HTMLInputElement** — 该类提供特定于输入的属性，
  - **HTMLElement** — 它提供了通用（ common ）的 HTML 元素方法（以及 getter 和 setter）
    - **Element** — 提供通用（ generic ）元素方法，
      - **Node** — 提供通用 DOM 节点属性，
        - **EventTarget** — 为事件（包括事件本身）提供支持，
          - 最后，它继承自 **Object**，因为像 `hasOwnProperty` 这样的**普通对象方法**也是可用的。

## DOM 节点类型

**DOM 的最小组成单位叫做节点**，节点的类型有七种。

|       节点       |                    备注                     | nodeType 值 |        nodeType 常量        |      nodeName      | nodeValue |
| :--------------: | :-----------------------------------------: | :---------: | :-------------------------: | :----------------: | :-------: |
|     Document     |            整个文档树的顶层节点             |      9      |     node.DOCUMENT_NODE      |     #document      |   null    |
|   DocumentType   |  `doctype` 标签（比如 `<!DOCTYPE html>`）   |     10      |   node.DOCUMENT_TYPE_NODE   |     文档的类型     |   null    |
|     Element      | 网页的各种 HTML 标签（比如 `<body>、<a>` 等 |      1      |      node.ELEMENT_NODE      |    大写的标签名    |   null    |
|       Attr       |   网页元素的属性（比如 `class="right"`）    |      2      |     node.ATTRIBUTE_NODE     |     属性的名称     |  文本值   |
|       Text       |          标签之间或标签包含的文本           |      3      |       node.TEXT_NODE        |       #text        |  文本值   |
|     Comment      |                    注释                     |      8      |      node.COMMENT_NODE      |      #comment      |  文本值   |
| DocumentFragment |                 文档的片段                  |     11      | node.DOCUMENT_FRAGMENT_NODE | #document-fragment |   null    |

## Node 接口

> [Node](node.md)

## document

> [document](./document.md)

## Element

> [Element](./element.md)

## 节点属性

> [Attributes](./attributes.md)

## 样式

> [CSS](./css.md)

## 浏览器窗口、坐标和滚动

> [Scroll](./scroll.md)

## 事件

> 

## 表单

> [Form](./form.md)

## 如何处理大量 DIV 插入问题


