---
group:
  title: browser
  order: 7
title: CSSOM 与 CSSOM View
toc: content
---

## 当我们以为只剩 DOM 的时候

大多数前端第一次接触浏览器 API，只记住了一件事：**DOM**。
在他们的认知中，"浏览器 API"几乎就等同于"DOM API"——选元素、改属性、绑事件，一切操作都围绕那棵 HTML 节点组成的树展开。久而久之，我们会产生一种错觉：页面不过是一棵文档树，操纵这棵树就能掌控一切。

**但浏览器从来不只维护一棵树。**

HTML 被解析成 **DOM**（Document Object Model，文档对象模型），这是对"文档结构"的抽象。而与之并行，CSS 被解析成另一棵树：**CSSOM**（CSS Object Model，CSS 对象模型）。
前者关心"有哪些节点、什么嵌套关系"，后者关心"这些节点应该长成什么样、应该如何显示"。

**真正的页面，是 DOM 和 CSSOM 在布局、渲染阶段共同作用的结果。**
换句话说：如果说 DOM 是网页的骨架，那么 CSSOM 就是那套决定"骨架如何长肉、长出什么形态"的基因表达图谱。

理解 CSSOM，不只是多学几组 API，而是第一次真正看清楚——我们平时写下的 CSS 规则，在浏览器内部究竟变成了什么。

---

## 样式表不只是文件：从 `<style>` 和 `<link>` 说起

要理解 CSSOM，得从一个很日常的问题开始：浏览器里的"样式表"到底是什么？

在 HTML 里，写 CSS 通常有两种方式：要么在页面里直接写一个 `<style>` 标签，把 CSS 段落塞进去；要么通过 `<link rel="stylesheet">` 把外部样式文件引入进来。表面上看，一个是"内联样式表"，一个是"外链样式表"，似乎不过是文件组织形式不同。

在 CSSOM 的视角里，它们却统一成了一种东西：**`CSSStyleSheet` 对象**。
每一个 `<style>`，每一个指向样式表的 `<link>`，最终都会在浏览器内部对应到一个 `CSSStyleSheet` 实例，并被挂到一个集合里，比如常见的 `document.styleSheets`。

这一刻，**样式表不再是"某个 .css 文件"，而是"一个活生生的对象"**。
你不需要关心它是来自磁盘文件、来自 Data URL，还是从网络请求回来——只要被浏览器视为样式表，它就进入 CSSOM 的世界。

:::info{title="关于 document.styleSheets 的补充"}
`document.styleSheets` 返回的是一个 `StyleSheetList` 集合，它是只读的。但你可以通过它访问到每个 `CSSStyleSheet` 对象，并通过标准方法如 `insertRule()` 和 `deleteRule()` 来动态增删样式规则，这是比直接操作 `cssRules` 更推荐的做法。
:::

有意思的是，DOM 去修改 `<style>` 标签的 `innerHTML`，本质上是在改"样式表的源代码"；而当样式来自 `<link>` 时，DOM 自身并不能轻易去改那个远程文件的内容。
然而，**CSSOM 给了你另一条路径**：不去管 `href` 指的是什么资源，而是直接对已经解析好的 `CSSStyleSheet` 和它内部的规则动手。

这一刻，你不再是操作"HTML 里的一段 CSS 文本"，而是在操作"**浏览器心中对这段样式的理解结果**"。

---

## 从选择器到规则：直接对 CSS 规则下手

如果说 `CSSStyleSheet` 是整张样式表的抽象，那么其中真正有生命力的，是一条条**规则（rule）**。

每一张样式表内部，都有一个类似数组的 **`cssRules` 集合**。
对你来说更熟悉的，是其中最常见的那一类：**`CSSStyleRule`**。
这正是我们写的绝大多数普通 CSS 选择器规则在 CSSOM 里的形态。

:::info{title="关于 `cssRules` 的补充"}
除此之外，CSS 里那些以 `@` 开头的语法，比如 `@media`、`@import`、`@keyframes` 等，在 CSSOM 中也都有各自对应的规则对象：`CSSMediaRule`、`CSSImportRule`、`CSSKeyframesRule`……你熟悉的语法，在另一侧都有一位对应的“对象化分身”。
:::

一条 `CSSStyleRule`，大致可以拆成两块：
一块是 **`selectorText`**，也就是你写在花括号左边的"谁被选中"；
另一块是 **`style`**，是一组键值对形式的属性集合，对应花括号里的那串 `color: red; font-size: 16px;`。

在日常开发中，我们改样式通常有两种粗暴方式：
要么直接改 DOM 元素的 `style` 内联属性；
要么动模板，改源 CSS 文件，然后刷新页面。

而一旦你拥抱 CSSOM，就多出了一条路径：
**直接修改这条 `CSSStyleRule` 的 `style`，就相当于"在运行中的浏览器里重新编写这条 CSS 规则"**。
给一个选择器追加一条 `background: black`，删除一条 `border`，不需要任何刷新，无需碰 HTML，只动一个规则对象就够了。

这在批量修改中尤其有用。
当你想调整某个组件体系的主题颜色、统一一组按钮的边角、修改一整类元素的行高，不必为每个 DOM 节点逐个添加 class、逐个修改内联样式，而是**直接锁定那条规则**——让选择器替你完成扩散。

更重要的，是**伪元素（pseudo-element）** 的世界。
像 `::before`、`::after` 这样的伪元素，没有真实 DOM 节点，不可能用 `document.querySelector` 把它们"抓"出来，也不可能对它们设置 `style` 属性。
它们只存在于样式规则中，也只受样式规则的支配。

于是，当你想改变某个伪元素的颜色、内容或位置时，DOM 是无能为力的，CSSOM 则恰好提供了**唯一的入口**：
操作那条包含伪元素选择器的 `CSSStyleRule`，改变它的 `style`，你就改变了伪元素的命运。

在某种意义上，**CSSOM 是让你第一次获得"对整套样式规则本身的控制权"**——从此你不再只能在文件里提前写死，而可以在运行时，根据状态、数据、交互结果，动态改写浏览器已经理解好的那套样式逻辑。

---

## 真实渲染出来的样子：`getComputedStyle` 的隐形权力

然而，仅仅能"改规则"还不够。
前端在实现复杂交互时，总会遇到另一个难题：
"**这个元素现在，真实显示出来的样式，到底是什么？**"

我们知道 CSS 有继承、有层叠，还有各种单位、百分比、默认值、伪类、媒体查询，甚至还有动画的中间态。
单看源代码，你很难准确回答：此刻这个元素的 `color` 到底是多少、`transform` 的矩阵结果是什么、`opacity` 现在究竟处于哪个过渡阶段。

这时，**`getComputedStyle`** 登场了。

`getComputedStyle` 是挂在 `window` 上的一个方法，它返回的是"**计算后样式**"（Computed Style）的视图。
所谓"计算后"，就是浏览器已经把继承、层叠、变量替换、单位换算、默认值补全统统算完，给你一个"可以直接用于渲染"的最终结果。
你可以对任意元素调用它，得到一个类似只读的样式对象，然后问它：
当前这个元素的 `transform` 是什么？`line-height` 最终是多少？`color` 到底解析成了哪种 RGB？

:::warning{title="深入理解 getComputedStyle"}

- 它返回的是一个 **只读** 的 `CSSStyleDeclaration` 对象，与 `element.style` 返回的可读写对象不同
- 它返回的是**计算值**（computed value），对于相对单位会进行换算，但可能不是最终用于渲染的**使用值**
- 例如 `width: 50%` 在父容器宽度不确定时，计算值可能仍是 `"50%"`
  :::

更妙的是，它同样支持**伪元素**。
传入第二个参数，比如 `"::before"`，你就能拿到伪元素实际渲染时的所有样式。
对那些看得见却摸不着的 UI 装饰，这是极少数可以"探测其真实状态"的窗口之一。

真实业务里，它的用武之地远比想象中广：

当你在做**拖拽**时，不想手算各种 margin、padding、transform 带来的偏移，只需要看一眼 `getComputedStyle` 给出的 transform 和尺寸，就能精准计算出当前位置。
当你调试 **CSS 动画**，希望在某个关键帧"暂停"，或者想根据动画中间态做某种判定，也没法从静态规则中推导出那一刻的中间值，但 `getComputedStyle` 在那一帧返回的样式，就是真实的答案。

在 DOM 和 CSSOM 的世界里，**`getComputedStyle` 像是一扇窗**：
你透过它，看见的不是"你写了什么"，而是"**浏览器理解并准备画出来什么**"。

---

## 从语言到视图：CSSOM View 打开的是另一扇门

到这里为止，我们谈的 CSSOM 都还停留在"CSS 语言"这一层：规则、选择器、属性、计算值。
但浏览器真正要做的，是把这些抽象的样式，和具体的屏幕坐标、像素网格、滚动状态结合起来，渲染出你眼前的画面。

这就是 **CSSOM View**（CSSOM 视图模块）登场的地方。

名字里虽然依旧带着 CSSOM，但这一部分的 API，重点不再是"CSS 语法模型"，而是"**浏览器视图的状态**"：
窗口有多大、视口（viewport）在哪、用户滚到了哪一段内容、元素的盒子究竟落在屏幕的哪个位置。

要理解这层抽象，先从最顶层的对象说起——**`window`**。

浏览器中你能触及到的最外层，就是窗口自身。
在 CSSOM View 里，窗口有一些格外重要的数值，其中最关键的是 **`innerWidth` 和 `innerHeight`**。
它们不是简单的"整个窗口有多大"，而是"**浏览器实际用来渲染 HTML 内容的那块视口区域**"的宽高——也就是你写 CSS 时 `vw`、`vh`、媒体查询真正作用的那个尺寸。

与之相比，`outerWidth`、`outerHeight` 测量的是整个浏览器窗口，包括工具栏、标签栏、开发者工具占据的空间，这对布局来说用处并不大，更多是一种"信息上的完备性"。

真正经常出现在前端口中、却又常被误解的，是 **`devicePixelRatio`（设备像素比）**。
它描述的是屏幕上"**物理像素**"和 CSS 里的"**逻辑像素（px）**"之间的比值。
在一台传统显示器上，`devicePixelRatio` 约等于 1：一个 CSS 像素就对应一个物理像素。
而在 Retina 屏或者高分屏上，这个值会变成 2、3，甚至更高：一个 CSS 像素要用多个物理像素来渲染。

这背后的含义是：当你写下 `border-bottom: 1px solid` 时，这一个"CSS 像素宽"的边线，在高分屏上其实可能由 2 条、3 条物理像素列构成。
这种差异是高清显示、细腻字体、发丝线效果得以实现的基础，也是许多"**1px 细线适配方案**"的起点。

与之形成对比的，是 `screen.width`、`screen.height`、`screen.availWidth`、`screen.availHeight` 这一组，看似描述屏幕大小、可用区域，实际上既和 CSS 布局关系不大，又因为设备厂商实现不统一而可靠性有限。
在真实业务里，前端更应该把注意力放在 **`window.innerWidth/innerHeight` 和 `devicePixelRatio`** 上——也就是那一块"真正被用来绘制页面"的坐标系。

---

## 滚动这件小事：从元素到整个窗口

视图不仅有大小，还有"视野移到哪里"的问题，这就是**滚动**。

CSSOM View 对滚动的抽象分为两层：**元素的滚动**和**窗口的滚动**。

在元素层面，任何开启了 `overflow: auto` 或 `overflow: scroll` 的盒子，都拥有一套相对统一的接口。
你可以通过 **`scrollTop` 和 `scrollLeft`** 读写它当前滚动到的垂直和水平方向位置，通过 **`scrollHeight` 和 `scrollWidth`** 知道"可滚动内容"的总尺寸。
想让一个元素滚到某个精确位置，可以用 **`scrollTo`**；想基于当前的位置偏移一定距离，则用 **`scrollBy`**。
再加上一个非常实用的方法：**`scrollIntoView`**，它能强制让这个元素进入当前视口，哪怕需要整页滚动才能把它露出来。

:::success{title="现代滚动体验"}
在现代浏览器中，`scrollTo` 和 `scrollIntoView` 都支持 `behavior: 'smooth'` 选项，可以实现**平滑滚动**效果，大大提升用户体验。
:::

在窗口层面，事情略微复杂一些，主要是历史遗留设计造成的命名不一致。
顶层 `window` 没有 `scrollTop` 和 `scrollLeft`，而是提供了 **`scrollX`、`scrollY`** 作为当前滚动偏移的坐标值；
同样也有 `scrollTo` 和 `scrollBy`，语义和元素级滚动几乎一致，只不过操作的是整页的视图。

这些 API 只在"真的有滚动条"的时候才有意义——如果页面内容不足一屏，没有滚动区域，设置这些值自然不会改变任何东西。
它们抽象的，依旧是同一件事：**当前视口相对于整个内容世界，处在什么位置**。

滚动看似是一个"小事"，但几乎所有复杂交互——**吸顶导航、无限列表、懒加载、滚动驱动动画**——都离不开对这套状态的感知与操控。
CSSOM View 用一小撮 API，把这件日常却又极易出错的事情，勉强拉回到一个统一的语义层面。

---

## 盒子与坐标：`getClientRects` 和 `getBoundingClientRect` 的锋利边缘

然而，真正让 CSSOM View 显露锋芒的，还不是窗口尺寸和滚动，而是"**盒模型落到屏幕上的那一刻**"。

每一个元素在布局之后，都会对应一个或多个"盒子"。
块级元素通常只有一个盒子；而**行内元素**（尤其是被换行、被分段的那种）可能被拆成多个盒子碎片。
再加上伪元素参与渲染，情况会变得更加微妙：一个你肉眼看来"只有一个字"的小元素，在布局引擎眼中，可能实际上由几块彼此分散的矩形构成。

CSSOM View 提供的 **`getClientRects`** 方法，就是用来窥视这一层结构的。
对任意元素调用它，得到的不是一个矩形，而是一组矩形的集合，每一个矩形对应一个"**渲染盒**"。
当你为这样的元素加上背景色，看到颜色被切成多段，`getClientRects` 返回的每一段矩形，正对应你肉眼所见的每一块彩色区域。

伪元素同样参与其中。
如果某个元素使用了 `::before` 或 `::after`，这些伪元素在视觉上占据了空间，也会各自生成盒子，被计入 `getClientRects` 的结果当中。
于是你会发现，有的矩形范围内只有伪元素产生的内容，有的则同时包含真实文本和伪元素，布局引擎把它们视作同一块渲染区域。

当你不想理解得那么细——只关心"这个元素整体占据了屏幕上的哪块区域"时，**`getBoundingClientRect`** 就登场了。
它只返回一个矩形，代表把所有渲染盒"圈起来"的最小外接矩形。
无论一个元素内部有多少碎片，有多少伪元素参与，`getBoundingClientRect` 给出的那四个值（**left、top、right、bottom**）描述的，都是"**这个东西在视口中的整体位置和尺寸**"。

:::info{title="元素尺寸三剑客"}

- **`getBoundingClientRect()`**: 获取元素在视口中的精确位置和尺寸（包括 transform 影响）
- **`offsetWidth/Height`**: 包含边框和内边距的元素布局尺寸
- **`clientWidth/Height`**: 只包含内边距的可视区域尺寸
  :::

这两个方法有一个显而易见却常被忽略的特点：**它们返回的，是"布局之后"的坐标**。
不需要你自己去解释 `margin`、`padding`、`border`、`transform`、百分比宽度、定位规则、行内格式化上下文、甚至复杂的多列布局。
前端自己去算，几乎注定会掉进无穷无尽的细节坑里；而浏览器早就算完了，你只需要张嘴问一句——"**你最终画出来的是哪里？**"。

在**拖拽、碰撞检测、对齐辅助线、可视区域判断、悬浮菜单定位**等场景里，这两个 API 几乎是不可替代的基石。
真正懂得利用它们的人，会极少尝试"自己重写一套布局系统"；他们更倾向于顺势而为，让浏览器先做该做的计算，然后在结果上轻轻再走一步。

---

## 一套"看见布局"的思维模型

把这些碎片拼在一起，你会发现 CSSOM 与 CSSOM View 提供的，不只是一簇 API，而是一整套新的观察视角。

在 CSS 层面，你可以通过 **`CSSStyleSheet`、`CSSRule`、`CSSStyleRule`** 把样式从"文本文件"提升成"**可编程对象**"，
可以批量改写规则、动态修改伪元素、在运行时重塑整套视觉系统，而不必一行行去擦拭 DOM 元素的内联属性。

在样式计算层面，你可以通过 **`getComputedStyle`** 直接问出"**浏览器心中最后的答案**"，
无需在各类继承、层叠、动画、中间值和单位换算之间迷失方向，也不用猜测"现在到底用的是哪条规则"。

在视图层面，你可以通过 **`window.innerWidth/innerHeight` 与 `devicePixelRatio`** 掌握"页面被画在一个怎样的坐标系上"，
通过**滚动 API** 理解"用户此刻正把视口停在内容世界的哪一角"，
通过 **`getClientRects` 与 `getBoundingClientRect`** 精确捕捉"某个元素的可见盒子到底落在屏幕的哪一片"。

这套组合拳背后，是一个值得牢记的模型：

**样式不只是一段文本，而是一棵结构清晰的"样式树"**；
**渲染不只是一张静态画面，而是一套随视口、滚动、像素密度动态变化的"视图状态"**；
**布局不只是抽象的盒模型，而是可以被查询、可被度量、可被精确利用的一组"空间坐标"**。

当你用这套模型看问题，很多曾经棘手的需求会变得异常朴素：
你不再试图硬算元素的位置，而是让浏览器算完之后告诉你；
你不再用暴力 class 切换维护样式，而是直接对规则层面施加影响；
你不再害怕伪元素和高分屏，只是顺手问一句 CSSOM 与 CSSOM View："**现在真实的世界长什么样？**"

---

## 📚 CSSOM 与 CSSOM View API 速查表

下表汇总了文章中涉及的主要 API，你可以快速定位并获取其在 MDN 上的详细说明。

| API 分类                 | 核心接口 / 方法                        | 主要作用                                       | MDN 官方文档链接                                                                       |
| :----------------------- | :------------------------------------- | :--------------------------------------------- | :------------------------------------------------------------------------------------- |
| **CSSOM (样式规则操作)** | `document.styleSheets`                 | 获取文档中所有样式表的集合                     | [链接](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/styleSheets)          |
|                          | `CSSStyleSheet`                        | 代表一个样式表对象，可访问其内部规则           | [链接](https://developer.mozilla.org/zh-CN/docs/Web/API/CSSStyleSheet)                 |
|                          | `CSSRule` / `CSSStyleRule`             | 代表样式表中的一条规则，可操作选择器和样式声明 | [链接](https://developer.mozilla.org/zh-CN/docs/Web/API/CSSRule)                       |
| **样式计算**             | `getComputedStyle()`                   | 获取元素所有计算后的最终样式值（只读）         | [链接](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/getComputedStyle)       |
| **视图与窗口**           | `window.innerWidth` / `innerHeight`    | 获取视口（viewport）的宽度和高度               | [链接](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/innerWidth)             |
|                          | `window.devicePixelRatio`              | 获取物理像素与逻辑像素的比例（用于高分屏适配） | [链接](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/devicePixelRatio)       |
| **滚动控制**             | `Element.scrollTop` / `scrollLeft`     | 获取或设置元素内容的滚动位置                   | [链接](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollTop)             |
|                          | `Element.scrollTo()`                   | 将元素滚动到指定位置                           | [链接](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollTo)              |
|                          | `window.scrollX` / `scrollY`           | 获取整个文档在水平和垂直方向的滚动距离         | [链接](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/scrollX)                |
|                          | `Element.scrollIntoView()`             | 让元素滚动到视口内                             | [链接](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollIntoView)        |
| **布局与坐标**           | `Element.getClientRects()`             | 获取元素所有渲染盒的矩形集合（适用于内联元素） | [链接](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getClientRects)        |
|                          | `Element.getBoundingClientRect()`      | 获取元素在视口中的位置和尺寸（整体外接矩形）   | [链接](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect) |
|                          | `Element.offsetWidth` / `offsetHeight` | 获取元素的布局宽度和高度（包含边框和内边距）   | [链接](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/offsetWidth)       |
|                          | `Element.clientWidth` / `clientHeight` | 获取元素内容区域的宽度和高度（只包含内边距）   | [链接](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/clientWidth)           |

:::success{title="💡 速查表使用建议"}
这份速查表不仅能帮你快速回顾文章内容，更能作为日常开发的参考。当你在代码中用到这些 API 时，直接点击链接到 MDN 文档，可以查看更详细的语法、参数、返回值以及重要的**浏览器兼容性**信息，这对于在实际项目中选择和使用 API 至关重要。
:::

---

## 写在最后：当你开始与浏览器"平等对话"

学习这些 API，很容易陷入一个误区：把它们视作"工具箱里多出的几把螺丝刀"，
遇到拖拽就翻出 `getBoundingClientRect`，遇到高分屏就翻出 `devicePixelRatio`，遇到伪元素就翻出 CSSOM 规则操作。
这当然是进步，但仍然停留在"遇到问题再查一个 API"的层面。

**真正的转变在于**：
你逐渐不再把浏览器当作一个"黑盒的渲染器"，而是当作一个可以对话的系统。
它愿意把自己对 HTML 和 CSS 的理解结果，以 DOM、CSSOM、CSSOM View 这些对象模型的形式暴露给你；
你也不再只是往里丢模板和样式，而是学会去读它的状态、修改它的决策、借用它的计算。

:::success{title="展望未来：CSS Houdini"}
CSS Houdini 是一组底层 API，旨在将 CSS 引擎的更多部分暴露给开发者。它让我们能够更直接地与浏览器的渲染流程交互，这正是"与浏览器平等对话"的终极进化，代表了前端开发的未来方向。
:::

当你开始用这些对象模型思考问题，你写下的每一行代码，都会有一点不同：

你会更少地依赖"经验拍脑袋"的偏移数字，而更多地依赖"**浏览器已经算好的坐标**"；
你会更少地去堆砌 CSS hack，而更多地通过**动态样式规则**去塑造页面；
你会更少地困惑于"为什么它看起来跟我想的不一样"，而更多地用 `getComputedStyle` 和布局 API 去追问"**浏览器是怎么想的**"。

也许真正值得长期思考的问题是：
在这套对象模型之上，我们还能构建出怎样更高层次的抽象？
是否能有一种前端代码风格，把 DOM、CSSOM、CSSOM View 视作同一张地图上的不同图层，让每一次交互和布局的改变，都变成一次对整张地图的精确编辑，而不是对某一块 HTML 的局部修补？

当你开始这样提问时，你已经不再满足于"让页面跑起来"，
而是在走向另一条路：
**学会与浏览器真正"平等对话"，并在它的内部世界里，为自己的代码找到更优雅的位置。**
