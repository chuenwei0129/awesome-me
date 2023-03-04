# 积跬步，至千里，始于 DOM <!-- omit in toc -->

> **年与时驰，意与日去，只能从回忆中捕捉一些心脏鲜活跳动过的痕迹。**

👀 怀念那个在宿舍看着 [JavaScript DOM 编程艺术](https://book.douban.com/subject/6038371/) 畅想未来的自己。

**目录：**

- [为什么 window 属于 DOM 接口？难道说 window 属于 DOM?](#为什么-window-属于-dom-接口难道说-window-属于-dom)
- [ECMAScript 中的对象和 DOM 对象是一个概念么？](#ecmascript-中的对象和-dom-对象是一个概念么)
- [前端为什么操作 DOM 是最耗性能的呢？](#前端为什么操作-dom-是最耗性能的呢)
- [](#)
- [DOM API](#dom-api)
  - [Node](#node)
- [document](#document)
- [Element](#element)
- [把一个元素的所有的子元素逆序](#把一个元素的所有的子元素逆序)
- [如何处理大量 DIV 插入问题](#如何处理大量-div-插入问题)
- [前端框架到底帮你解决了什么问题？](#前端框架到底帮你解决了什么问题)
- [常用 DOM 的 API 总结](#常用-dom-的-api-总结)

## [为什么 window 属于 DOM 接口？难道说 window 属于 DOM?](https://www.zhihu.com/question/345622144)

**MDN** 里把浏览器里所有非 JavaScript 自带的 API 都称之为 [Web API](https://developer.mozilla.org/zh-CN/docs/Web/API)，而不用 DOM API 这样的术语，就像 Node 里提供的 API 都叫 Node API 一样。

在 DOM 编程时，通常使用的最多的就是 `Document` 和 `window` 对象。简单的说，`window` 对象表示浏览器中的内容，而 `document` 对象是**文档本身的根节点**。

![20230301023504](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/others/20230301023504.png)

[window](https://developer.mozilla.org/zh-CN/docs/Web/API/Window) 作为全局变量，代表了脚本正在运行的窗口，暴露给 Javascript 代码。

在有标签页功能的浏览器中，每个标签都拥有自己的 `window` 对象；也就是说，**同一个窗口的标签页之间不会共享一个 `window` 对象**。有一些方法，如 [`window.resizeTo`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/resizeTo) 和 [`window.resizeBy`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/resizeBy) 之类的方法会作用于整个窗口而不是 `window` 对象所属的那个标签。

## [ECMAScript 中的对象和 DOM 对象是一个概念么？](https://www.zhihu.com/question/67501711)

**是一个概念。**

**[DOM](https://developer.mozilla.org/zh-CN/docs/Web/API/Document_Object_Model) 并不属于 JavaScript 语言的一部分**。DOM 是 JavaScript 的运行平台 —— 浏览器提供的。

JavaScript 类型分为 2 大类：**原始类型** 和 **对象类型**。而 DOM 是对象类型。

> **所有的 DOM 没有任何特殊之处，都是一个 Object 的子类**。

当我们创建了一个 `DOM Object` 后，我们就可以把这个 `DOM Object` 当作一个普通的 JavaScript 对象来使用。

**说他特殊，是因为 DOM 的属性和方法会被引擎映射到 HTML 标签上（DOM API）。**

**拓展：**[HTML attribute 和 DOM property](https://github.com/justjavac/the-front-end-knowledge-you-may-not-know/blob/master/archives/015-dom-attributes-and-properties.md)

> **📚 小知识：**

所有的 JavaScript 对象都是继承自 `Object`，即使我们经常创建的空对象：

```js
let obj = {}
```

也是 `Object` 的子类。

**但是 `Object.create(null)` 却是实实在在的空对象**。

> **⚠️ 注意事项：**

**问：** 直接把一个 DOM 对象当作 JS 对象那样**读写非 API 属性**，会像 DOM 一样慢，还是像操作普通 JS 对象一样快呢？

**答：** 因为 JS 访问的 DOM 对象实际上是 DOM 引擎中的对象在 JS 引擎的包装对象，**理论上访问其非 API 属性应该和 JS 对象一样快**。

**但不同的引擎实现不同，就像当年 IE DOM 对象内存泄露的坑一样，最好不要拿 DOM 当 JS 对象用。**

## [前端为什么操作 DOM 是最耗性能的呢？](https://www.zhihu.com/question/324992717)

**其一：** **浏览器的 JavaScript 引擎与 DOM 引擎共享一个主线程**。任何 DOM API 调用都要先将 JS 数据结构转为 DOM 数据结构，再挂起 JS 引擎并启动 DOM 引擎，执行过后再把可能的返回值反转数据结构，重启 JS 引擎继续执行。这种上下文切换很耗性能，类似的还有单机进程间调用、远程过程调用等。

**其二：** **很多 DOM API 的读写都涉及页面布局的“重新计算”**，以确保返回值的准确，涉及样式、结构的还会触发页面“重新绘制”，更耗性能。

综上，单次 DOM API 调用性能就不够好，频繁调用就会迅速积累上述损耗，导致 DOM 引擎占用主线程过久，用户操作不能及时触发 JS 事件回调，让用户感觉卡顿。

所以，解决此问题的方案本质不在于用不用 jQuery、用不用虚拟 DOM，而是 —— **减少不必要的 DOM API 调用。**

而减少不必要调用的各种方案，都遵循 **“在 JS 中缓存必要数据，计算界面更新时的阶段数据差异，只提交最终差集”** 的基本思路。虚拟 DOM **计算的是最终 DOM 结构的差异**，还有的引擎**计算的是 DOM 所绑定数据的差异**，各有千秋。

## 

## DOM API



### Node

> 🔥 `Node.childNodes`，`document.querySelectorAll()` 等节点搜索方法返回 NodeList 实例。只有 `Node.childNodes` 返回的是一个动态集合，其他的 NodeList 都是静态集合，HTMLCollection 实例都是动态集合，节点的变化会实时反映在集合中。

```js
// 属性
Node.nodeValue  // 返回 Text 或 Comment 节点的文本值
Node.ownerDocument  //返回当前节点所在的顶层文档对象，即 document
Node.textContent  // 返回当前节点和它的所有后代节点的文本内容，可读写
Node.baseURI    // 返回当前网页的绝对路径
Node.nextSibling  // 返回紧跟在当前节点后面的第一个兄弟节点
Node.previousSibling  // 返回当前节点前面的、距离最近的一个兄弟节点
Node.parentNode   // 返回当前节点的父节点
Node.parentElement  // 返回当前节点的父 Element 节点
Node.childNodes   // 返回当前节点的所有子节点
Node.firstChild  // 返回当前节点的第一个子节点
Node.lastChild   // 返回当前节点的最后一个子节点
Node.isconnecoted   // 返回一个布尔值，表示当前节点是否在文档之中

// 方法
Node.appendChild(node)   // 向节点添加最后一个子节点
Node.hasChildNodes()   // 返回布尔值，表示当前节点是否有子节点
Node.cloneNode(true) // 默认为 false, true (深拷贝节点及其属性，以及后代)
Node.insertBefore(newNode, oldNode)  // 在指定子节点之前插入新的子节点
Node.removeChild(node)   // 删除节点，在要删除节点的父节点上操作
Node.replaceChild(newChild,oldChild)  // 替换节点
Node.contains(node)  // 返回一个布尔值，表示参数节点是否为当前节点的后代节点。
Node.compareDocumentPosition(node)   //返回一个 7 个比特位的二进制值，表示参数节点和当前节点的关系
Node.isEqualNode(node)  // 返回布尔值，用于检查两个节点是否相等。所谓相等的节点，指的是两个节点的类型相同、属性相同、子节点相同。
Node.isSameNode(node)  // 返回一个布尔值，表示两个节点是否为同一个节点。
Node.normalize()   // 用于清理当前节点内部的所有 Text 节点。它会去除空的文本节点，并且将毗邻的文本节点合并成一个。
Node.getRootNode()  // 返回当前节点所在文档的根节点 document，与 ownerDocument 属性的作用相同。

// NodeList 实例 既是 iterator 也是 arrLike
Node.length   // 返回 NodeList 实例包含的节点数量
Node.forEach(fn，this)   // 用于遍历 NodeList 的所有成员
Node.item(index) // 接受一个整数值作为参数，表示成员的位置，返回该位置上的成员
Node.keys()  // 返回键名的遍历器
Node.values()   // 返回键值的遍历器
Node.entries()  // 返回的遍历器同时包含键名和键值的信息

// parentNode 接口
Node.children  // 返回指定节点的所有 Element 子节点
Node.firstElementChild  // 返回当前节点的第一个 Element 子节点
Node.lastElementChild   // 返回当前节点的最后一个 Element 子节点
Node.childElementCount  // 返回当前节点所有 Element 子节点的数目
Node.append()  // 为当前节点追加一个或多个子节点，位置是最后一个元素子节点的后面。
Node.prepend()   // 为当前节点追加一个或多个子节点，位置是第一个元素子节点的前面。

// ChildNode 接口
Node.remove()  // 用于从父节点移除当前节点
Node.before()  // 用于在当前节点的前面，插入一个或多个同级节点。两者拥有相同的父节点。
Node.after()   // 用于在当前节点的后面，插入一个或多个同级节点，两者拥有相同的父节点。
Node.replaceWith()  // 使用参数节点，替换当前节点
```

**拓展**：`nextSibling` 属性可以用来遍历所有子节点。

```js
const el = document.getElementById('div1').firstChild

while (el !== null) {
  console.log(el.nodeName)
  el = el.nextSibling
}
```

## document

```js
// 快捷方式属性
document.documentElement  // 返回当前文档的根节点
document.body   // 返回当前文档的 <body> 节点
document.head   // 返回当前文档的 <head> 节点
document.activeElement  // 返回当前文档中获得焦点的那个元素
document.fullscreenElement  // 返回当前以全屏状态展示的 DOM 元素

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

// 文档状态属性
document.readyState  // 返回当前文档的状态
document.hidden  // 返回一个布尔值，表示当前页面是否可见
document.visibilityState  // 返回文档的可见状态

// 其他属性
document.cookie   // 用来操作 Cookie
document.designMode  // 控制当前文档是否可编辑，可读写
```

## Element

```js
// 元素特性相关属性
Element.id  // 返回指定元素的 id 属性，可读写
Element.tagName  // 返回指定元素的大写标签名
Element.accessKey  // 用于读写分配给当前元素的快捷键
Element.draggble // 返回一个布尔值，表示当前元素是否可拖动
Elemnt.tabIndex // 返回一个整数，表示当前元素在 Tab 键遍历时的顺序。该属性可读写。
Element.title  // 用来读写当前元素的 HTML 属性 title
Element.attributes  // 返回当前元素节点的所有属性节点
Element.className  // 返回当前元素的 class 属性，可读写
Element.classList  // 返回当前元素节点的所有 class 集合
Element.innerHTML   // 返回该元素包含的 HTML 代码，可读写
Element.outerHTML  // 返回指定元素节点的所有 HTML 代码，包括它自身和包含的的所有子元素，可读写
Element.dataset   // 返回元素节点中所有的 data-* 属性

// 元素状态的相关属性
Element.hidden // 返回一个布尔值，表示当前元素的 hidden 属性，用来控制当前元素是否可见。该属性可读写
Element.contentEditable // 返回一个字符串，表示是否设置了 contenteditable 属性
Element.iscontentEditable // 返回一布尔值，表示是否设置了 contenteditable 属性，只读

// 节点相关属性
Element.children   // 包括当前元素节点的所有子元素
Element.childElementCount   // 返回当前元素节点包含的子 HTML 元素节点的个数
Element.firstElementChild  // 返回当前节点的第一个 Element 子节点
Element.lastElementChild   // 返回当前节点的最后一个 Element 子节点
Element.nextElementSibling  // 返回当前元素节点的下一个兄弟 HTML 元素节点
Element.previousElementSibling  // 返回当前元素节点的前一个兄弟 HTML 节点

// 属性方法
Element.getAttribute() //读取指定属性
Element.getAttributeNames() // 返回当前元素的所有属性名
Element.setAttribute() // 设置指定属性
Element.hasAttribute() // 返回一个布尔值，表示当前元素节点是否有指定的属性
Element.hasAttributes() // 当前元素是否有属性
Element.removeAttribute() // 移除指定属性

//查找方法
Element.querySelector()   // 接受 CSS 选择器作为参数，返回父元素的第一个匹配的子元素
Element.querySelectorAll() // 接受 CSS 选择器作为参数，返回一个 NodeList 实例，包含所有匹配的子元素
Element.getElementsByTagName()  // 返回一个 HTMLCollection 实例，成员是当前节点的所有匹配指定标签名的子元素节点
Element.getElementsByClassName()  //返回一个 HTMLCollection 实例，成员是当前元素节点的所有具有指定 class 的子元素节点
Element.closest() // 接受一个 CSS 选择器作为参数，返回匹配该选择器的、最接近当前节点的一个祖先节点（包括当前节点本身）

// 事件方法
Element.addEventListener() // 添加事件的回调函数
Element.removeEventListener() // 移除事件监听函数
Element.dispatchEvent() // 触发事件

// 其他
Element.matches() // 返回一个布尔值，表示当前元素是否匹配给定的 CSS 选择器
Element.scrollIntoView()   // 滚动当前元素，进入浏览器的可见区域
Element.getBoundingClientRect()  // 返回当前元素在页面上的生成的盒模型，获取元素位置的差值
Element.getClientRects()   // 返回当前元素在页面上生成的所有盒模型（包含子元素）

// 解析 HTML 字符串，然后将生成的节点插入 DOM 树的指定位置
Element.insertAdjacentHTML(where, htmlString)
Element.insertAdjacentHTML('beforeBegin', htmlString) // 在该元素前插入
Element.insertAdjacentHTML('afterBegin', htmlString) // 在该元素第一个子元素前插入
Element.insertAdjacentHTML('beforeEnd', htmlString) // 在该元素最后一个子元素后面插入
Element.insertAdjacentHTML('afterEnd', htmlString) // 在该元素后插入

Element.remove()  // 用于将当前元素节点从 DOM 中移除
Element.focus()   // 用于将当前页面的焦点，转移到指定元素上
Element.blur()  // 用于将焦点从当前元素移除
```

## 把一个元素的所有的子元素逆序

## 如何处理大量 DIV 插入问题

> [案例分析：如何处理大量 DIV 插入问题](https://chrisdeo.github.io/2019/07/22/%E5%A6%82%E4%BD%95%E5%A4%84%E7%90%86%E5%A4%A7%E9%87%8FDIV%E6%8F%92%E5%85%A5%E9%97%AE%E9%A2%98/)

## [前端框架到底帮你解决了什么问题？](https://zhuanlan.zhihu.com/p/45510072)

> 框架的目标是提高开发效率，而非运行效率。

- [网上都说操作真实 DOM 慢，但测试结果却比 React 更快，为什么？](https://www.zhihu.com/question/31809713)
- [如何看待 snabbdom 的作者开发的前端框架 Turbine 抛弃了虚拟 DOM？](https://www.zhihu.com/question/59953136)
- [Vue 采用虚拟 DOM 的目的是什么?](https://www.zhihu.com/question/271485214/answer/386097473)
- [既然用 virtual dom 可以提高性能，为什么浏览器不直接自带这个功能呢？](https://www.zhihu.com/question/67479886)

## 常用 DOM 的 API 总结

- [DOM 层次结构与常用 API](dom-api.md)

- [HTML DOM 级别以及一些小坑](https://github.com/justjavac/the-front-end-knowledge-you-may-not-know/blob/master/archives/014-dom-level.md)

- [HTML attribute 和 DOM property](https://github.com/justjavac/the-front-end-knowledge-you-may-not-know/blob/master/archives/015-dom-attributes-and-properties.md)
