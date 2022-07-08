# 积跬步，至千里，始于 DOM <!-- omit in toc -->

> **年与时驰，意与日去，只能从回忆中捕捉一些心脏鲜活跳动过的痕迹。**

怀念那个坐在图书馆读着 [JavaScript DOM 编程艺术](https://book.douban.com/subject/6038371/) 畅想未来的自己。

**目录：**

- [为什么 window 属于 DOM 接口？难道说 window 属于 DOM?](#为什么-window-属于-dom-接口难道说-window-属于-dom)
- [ECMAScript 中的对象和 DOM 对象是一个概念么？](#ecmascript-中的对象和-dom-对象是一个概念么)
- [前端为什么操作 DOM 是最耗性能的呢？](#前端为什么操作-dom-是最耗性能的呢)
- [如何处理大量 DIV 插入问题](#如何处理大量-div-插入问题)
- [前端框架到底帮你解决了什么问题？](#前端框架到底帮你解决了什么问题)
- [常用 DOM 的 API 总结](#常用-dom-的-api-总结)

## [为什么 window 属于 DOM 接口？难道说 window 属于 DOM?](https://www.zhihu.com/question/345622144)

**MDN** 里把浏览器里所有非 JavaScript 自带的 API 都称之为 [Web API](https://developer.mozilla.org/zh-CN/docs/Web/API)，而不用 DOM API 这样的术语，就像 Node 里提供的 API 都叫 Node API 一样。

在 DOM 编程时，通常使用的最多的就是 `Document` 和 `window` 对象。简单的说，`window` 对象表示浏览器中的内容，而 `document` 对象是**文档本身的根节点**。

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
