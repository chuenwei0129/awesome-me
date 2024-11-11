# 浏览器窗口、坐标和滚动<!-- omit in toc -->

- [几何](#几何)
- [文档的 width/height](#文档的-widthheight)
- [滚动](#滚动)
  - [读取当前的滚动](#读取当前的滚动)
  - [更改当前的滚动](#更改当前的滚动)
  - [禁止滚动](#禁止滚动)
- [坐标](#坐标)
- [元素坐标：getBoundingClientRect](#元素坐标getboundingclientrect)
- [elementFromPoint(x, y)](#elementfrompointx-y)

## 几何

> ⚠️：不要从 CSS 中获取 width/height

`JavaScript` 中有许多属性可让我们读取有关元素宽度、高度和其他几何特征的信息。

![20230301171015](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/others/20230301171015.png)

```js
// 除了 scrollLeft/scrollTop 外，所有属性都是只读的。如果我们修改 scrollLeft/scrollTop，浏览器会滚动对应的元素。
/**
 * 有以下几种情况下，`offsetParent` 的值为 `null`：
    - 对于未显示的元素（ display:none 或者不在文档中 ）。
    - 对于 `<body>` 与 `<html>`。
    - 对于带有 `position:fixed` 的元素
  */

element.offsetParent // 是最接近的 CSS 定位的祖先，或者是 td，th，table，body。
element.offsetLeft/offsetTop // 是相对于 offsetParent 的左上角边缘的坐标。
element.offsetWidth/offsetHeight // 元素的外部 width/height，边框（border）尺寸计算在内。
element.clientLeft/clientTop // 从元素左上角外角到左上角内角的距离。对于从左到右显示内容的操作系统来说，它们始终是左侧/顶部 border 的宽度。而对于从右到左显示内容的操作系统来说，垂直滚动条在左边，所以 clientLeft 也包括滚动条的宽度。
element.clientWidth/clientHeight // 内容的 width/height，包括 padding，但不包括滚动条（scrollbar）。
element.scrollWidth/scrollHeight // 内容的 width/height，就像 clientWidth/clientHeight 一样，但还包括元素的滚动出的不可见的部分。
element.scrollLeft/scrollTop // 从元素的左上角开始，滚动出元素的上半部分的 width/height。
```

## 文档的 width/height

文档可见部分的 width/height（内容区域的 width/height）：`document.documentElement.clientWidth/clientHeight`

> ⚠️ 不是 `window.innerWidth/innerHeight`
>
> 浏览器也支持像 `window.innerWidth/innerHeight` 这样的属性。它们看起来像我们想要的，那为什么不使用它们呢？
>
> **`window.innerWidth/innerHeight` 包括了滚动条**。

整个文档的 width/height，其中包括滚动出去的部分：

```js
let scrollHeight = Math.max(
  document.body.scrollHeight, document.documentElement.scrollHeight,
  document.body.offsetHeight, document.documentElement.offsetHeight,
  document.body.clientHeight, document.documentElement.clientHeight
);

alert('Full document height, with scrolled out part: ' + scrollHeight);
```

为什么这样？最好不要问。**这些不一致来源于远古时代**。

## 滚动

> ⚠️ **重要：**
>
> 必须在 `DOM` 完全构建好之后才能通过 `JavaScript` 滚动页面

### 读取当前的滚动

DOM 元素的当前滚动状态在其 scrollLeft/scrollTop 属性中。

对于文档滚动，在大多数浏览器中，我们可以使用 `document.documentElement.scrollLeft/scrollTop`，但在较旧的基于 WebKit 的浏览器中则不行，我们应该使用 `document.body` 而不是 `document.documentElement`。

兼容性良好的读取当前的滚动：

```js
// 区别：这些属性是只读的。scrollLeft/scrollTop 则可以修改。
alert('Current scroll from the top: ' + window.pageYOffset); // window.pageXOffset 是 window.scrollX 的别名。
alert('Current scroll from the left: ' + window.pageXOffset); // window.pageYOffset 是 window.scrollY 的别名。
```

### 更改当前的滚动

```js
window.scrollTo(pageX, pageY)  // 绝对坐标
window.scrollBy(x,y)  // 相对当前位置进行滚动
elem.scrollIntoView() // 滚动以使 elem 可见。默认值 top，页面滚动，使 elem 出现在窗口顶部。元素的上边缘将与窗口顶部对齐。false，页面滚动，使 elem 出现在窗口底部。元素的底部边缘将与窗口底部对齐。
```

### 禁止滚动

```js
// 我们还可以使用相同的技术来冻结其他元素的滚动，而不仅仅是 document.body。

// 这个方法的缺点是会使滚动条消失。如果滚动条占用了一些空间，它原本占用的空间就会空出来，那么内容就会“跳”进去以填充它。
document.body.style.overflow = "hidden" // 冻结滚动
document.body.style.overflow = "" // 恢复滚动
```

## 坐标

大多数 `JavaScript` 方法处理的是以下两种坐标系中的一个：

- 相对于窗口 — 我们将这些坐标表示为 `clientX/clientY`。
- 相对于文档 — 我们将它们表示为 `pageX/pageY`

```js
elem.getBoundingClientRect()
// 返回元素的大小及其相对于视口的位置
// 加上当前页面滚动, 返回元素的大小及其相对于文档的位置
```

窗口坐标非常适合和 `position:fixed` 一起使用，文档坐标非常适合和 `position:absolute` 一起使用。

## 元素坐标：getBoundingClientRect

方法 `elem.getBoundingClientRect()` 返回最小矩形（元素生成的盒子）的窗口坐标，该矩形将 `elem` 作为内建 `DOMRect` 类的对象。

主要的 `DOMRect` 属性：

- `x/y` — 矩形原点相对于窗口的 `X/Y` 坐标，
- `width/height` — 矩形的 `width/height`（可以为负）。

此外，还有派生（derived）属性：

- `top/bottom` — 顶部/底部矩形边缘的 `Y` 坐标，
- `left/right` — 左/右矩形边缘的 `X` 坐标。

下面这张是 `elem.getBoundingClientRect()` 的输出的示意图：

![20230301174247](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/others/20230301174247.png)

正如你所看到的，`x/y` 和 `width/height` 对矩形进行了完整的描述。可以很容易地从它们计算出派生（derived）属性：

- `left = x`
- `top = y`
- `right = x + width`
- `bottom = y + height`

请注意：

- 坐标可能是小数，例如 `10.5`。这是正常的，浏览器内部使用小数进行计算。在设置 `style.left/top` 时，我们不是必须对它们进行舍入。
- 坐标可能是负数。例如滚动页面，使 `elem` 现在位于窗口的上方，则 `elem.getBoundingClientRect().top` 为负数

## elementFromPoint(x, y)

对 `document.elementFromPoint(x, y)` 的调用会返回在窗口坐标 (x,y) 处嵌套最多（the most nested）的元素。

例如，下面的代码会高亮显示并输出现在位于窗口中间的元素的标签：

```js
let centerX = document.documentElement.clientWidth / 2;
let centerY = document.documentElement.clientHeight / 2;

let elem = document.elementFromPoint(centerX, centerY);

elem.style.background = "red";
alert(elem.tagName);
```

方法 `document.elementFromPoint(x,y)` 只对在可见区域内的坐标 (x,y) 起作用。对于在窗口之外的坐标返回 `null`
