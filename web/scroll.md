# 浏览器窗口、坐标和滚动<!-- omit in toc -->

- [浏览器窗口的 width / height](#浏览器窗口的-width--height)
- [不要从 CSS 中获取 width / height](#不要从-css-中获取-width--height)
- [举个例子](#举个例子)
  - [offsetParent，offsetLeft，offsetTop](#offsetparentoffsetleftoffsettop)
  - [offsetWidth / offsetHeight](#offsetwidth--offsetheight)
  - [clientTop / clientLeft](#clienttop--clientleft)
  - [clientWidth / clientHeight](#clientwidth--clientheight)
  - [scrollWidth / scrollHeight](#scrollwidth--scrollheight)
  - [scrollLeft / scrollTop](#scrollleft--scrolltop)
  - [总结](#总结)
- [滚动：scrollTo，scrollBy，scrollIntoView](#滚动scrolltoscrollbyscrollintoview)
- [禁止滚动](#禁止滚动)
- [坐标](#坐标)
  - [元素坐标：getBoundingClientRect](#元素坐标getboundingclientrect)
  - [elementFromPoint(x, y)](#elementfrompointx-y)

## 浏览器窗口的 width / height

**JavaScript 中有许多属性可让我们读取有关元素宽度、高度和其他几何特征的信息。**

为了获取窗口（window）的宽度和高度，我们可以使用 `document.documentElement` 的 `clientWidth` / `clientHeight`

> **⚠️ 为什么不是 `window.innerWidth / innerHeight` ？**

**问：** 浏览器也支持像 `window.innerWidth / innerHeight` 这样的属性。它们看起来像我们想要的，那为什么不使用它们呢？

**答：** 如果存在一个滚动条，并且滚动条占用了一些空间，那么 `clientWidth` / `clientHeight` 它们返回的是可用于**内容的文档的可见部分**的 `width` / `height`。**`window.innerWidth / innerHeight` 还包括了滚动条**。

## 不要从 CSS 中获取 width / height

**首先**，CSS `width` / `height` 取决于另一个属性：`box-sizing`，它定义了“什么是” CSS 宽度和高度。出于 CSS 的目的而对 `box-sizing` 进行的更改可能会破坏此类 `JavaScript` 操作。

**其次**，`CSS` 的 `width` / `height` 可能是 `auto`，例如内联（inline）元素，
从 `CSS` 的观点来看，`width:auto` 是完全正常的，但在 JavaScript 中，我们需要一个确切的 `px` 大小，以便我们在计算中使用它。因此，这里的 CSS 宽度没什么用。

**还有另一个原因**：滚动条。有时，在没有滚动条的情况下代码工作正常，当出现滚动条时，代码就出现了 `bug`，因为在某些浏览器中，滚动条会占用内容的空间。因此，可用于内容的实际宽度小于 CSS 宽度。而 `clientWidth` / `clientHeight` 则会考虑到这一点。

## 举个例子

> [示例元素](https://plnkr.co/edit/8KKf5CzdJmoQYVIa?p=preview&preview)

如下图所示：它有边框（border），内边距（padding）和滚动（scrolling）等全套功能。但没有外边距（margin），因为它们不是元素本身的一部分，并且它们没什么特殊的属性。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/web/element-demo.png)

> ⚠️ **文本可能会溢出到 `padding-bottom` 中**

在我们的插图中的 `padding` 中通常显示为空，但是如果元素中有很多文本，并且溢出了，那么浏览器会在 `padding-bottom` 处显示“溢出”文本，这是正常现象。

### offsetParent，offsetLeft，offsetTop

`offsetParent` 是最接近的祖先（ancestor），CSS 定位的（position 为 absolute，relative 或 fixed），或 `<body>`

属性 `offsetLeft` / `offsetTop` 提供相对于 `offsetParent` 左上角的 `x/y` 坐标。

```html
<main style="position: relative;" id="main">
  <article>
    <div id="example" style="position: absolute; left: 180px; top: 180px;">...</div>
  </article>
</main>
<script>
  alert(example.offsetParent.id); // main
  alert(example.offsetLeft); // 180（注意：这是一个数字，不是字符串 "180px"）
  alert(example.offsetTop); // 180
</script>
```

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/web/offsetparent.png)

有以下几种情况下，`offsetParent` 的值为 `null`：

- 对于未显示的元素（`display:none` 或者不在文档中）。
- 对于 `<body>` 与 `<html>`。
- 对于带有 `position:fixed` 的元素

### offsetWidth / offsetHeight

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/web/offsetWidth.png)

### clientTop / clientLeft

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/web/clientTop.png)

### clientWidth / clientHeight

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/web/clientWidth.png)

### scrollWidth / scrollHeight

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/web/scrollHeight.png)

### scrollLeft / scrollTop

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/web/scrollTop.png)

### 总结

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/web/client.png)

## 滚动：scrollTo，scrollBy，scrollIntoView

> ⚠️ **重要：**

**必须在 DOM 完全构建好之后才能通过 JavaScript 滚动页面。**

可以通过更改 `scrollTop` / `scrollLeft` 来滚动常规元素。

我们可以使用 `document.documentElement.scrollTop / scrollLeft` 对页面进行相同的操作。

> 对于文档滚动，在大多数浏览器中，我们可以使用 `document.documentElement.scrollLeft / scrollTop`，但在较旧的基于 WebKit 的浏览器中则不行，例如在 Safari 中，我们应该使用 `document.body` 而不是 `document.documentElement`。

或者，有一个更简单的通用解决方案：使用特殊方法 `window.scrollBy(x,y)` 和 `window.scrollTo(pageX,pageY)`。

- 方法 `scrollBy(x,y)` 将页面滚动至相对于当前位置的 `(x, y)` 位置。例如，`scrollBy(0,10)` 会将页面向下滚动 `10px`。

- 方法 `scrollTo(pageX,pageY)` 将页面滚动至绝对坐标，使得可见部分的左上角具有相对于文档左上角的坐标 (pageX, pageY)。就像设置了 `scrollLeft / scrollTop` 一样。要滚动到最开始，我们可以使用 `scrollTo(0,0)`。

- `elem.scrollIntoView(top)`。的调用将滚动页面以使 `elem` 可见。它有一个参数：
  - 如果 `top=true`（默认值），页面滚动，使 `elem` 出现在窗口顶部。元素的上边缘将与窗口顶部对齐。
  - 如果 `top=false`，页面滚动，使 `elem` 出现在窗口底部。元素的底部边缘将与窗口底部对齐。

## 禁止滚动

要使文档不可滚动，只需要设置 `document.body.style.overflow = "hidden"`。该页面将“冻结”在其当前滚动位置上。

```js
document.body.style.overflow = ‘hidden’
document.body.style.overflow = ‘’
```

第一个按钮用于冻结滚动，第二个按钮则用于恢复滚动。

我们还可以使用相同的技术来冻结其他元素的滚动，而不仅仅是 `document.body`。

这个方法的缺点是会使滚动条消失。如果滚动条占用了一些空间，它原本占用的空间就会空出来，那么内容就会“跳”进去以填充它。

这看起来有点奇怪，但是我们可以对比冻结前后的 `clientWidth`。如果它增加了（滚动条消失后），那么我们可以在 `document.body` 中滚动条原来的位置处通过添加 `padding`，来替代滚动条，这样这个问题就解决了。保持了滚动条冻结前后文档内容宽度相同。

## 坐标

大多数 `JavaScript` 方法处理的是以下两种坐标系中的一个：

- **相对于窗口** — 类似于 `position:fixed`，从窗口的顶部/左侧边缘计算得出。
我们将这些坐标表示为 `clientX / clientY`，当我们研究事件属性时，就会明白为什么使用这种名称来表示坐标。

- **相对于文档** — 与文档根（document root）中的 `position:absolute` 类似，从文档的顶部 / 左侧边缘计算得出。我们将它们表示为 `pageX / pageY`

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/web/pageX.png)

### 元素坐标：getBoundingClientRect

方法 `elem.getBoundingClientRect()` 返回最小矩形的窗口坐标，该矩形将 `elem` 作为内建 `DOMRect` 类的对象。

主要的 `DOMRect` 属性：

- `x/y` — 矩形原点相对于窗口的 `X/Y` 坐标，
- `width/height` — 矩形的 `width/height`（可以为负）。

此外，还有派生（derived）属性：

- `top/bottom` — 顶部/底部矩形边缘的 `Y` 坐标，
- `left/right` — 左/右矩形边缘的 `X` 坐标。

下面这张是 `elem.getBoundingClientRect()` 的输出的示意图：

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/web/getBoundingClientRect.png)

正如你所看到的，`x/y` 和 `width/height` 对矩形进行了完整的描述。可以很容易地从它们计算出派生（derived）属性：

- `left = x`
- `top = y`
- `right = x + width`
- `bottom = y + height`

请注意：

- 坐标可能是小数，例如 `10.5`。这是正常的，浏览器内部使用小数进行计算。在设置 `style.left/top` 时，我们不是必须对它们进行舍入。

- 坐标可能是负数。例如滚动页面，使 `elem` 现在位于窗口的上方，则 `elem.getBoundingClientRect().top` 为负数

### elementFromPoint(x, y)

对 `document.elementFromPoint(x, y)` 的调用会返回在窗口坐标 (x, y) 处嵌套最多（the most nested）的元素。

例如，下面的代码会高亮显示并输出现在位于窗口中间的元素的标签：

```js
let centerX = document.documentElement.clientWidth / 2;
let centerY = document.documentElement.clientHeight / 2;

let elem = document.elementFromPoint(centerX, centerY);

elem.style.background = "red";
alert(elem.tagName);
```

方法 `document.elementFromPoint(x,y)` 只对在可见区域内的坐标 (x,y) 起作用。
