---
title: 可替换元素
toc: content
group:
  title: 基础
---

## 可替换元素 replaced element

在 CSS 中，可替换元素 (replaced element) 的展现效果不是由 CSS 来控制的。这些元素是一种外部对象，它们外观的渲染，是独立于 CSS 的。

简单来说，**它们的内容不受当前文档的样式的影响。CSS 可以影响可替换元素的位置，但不会影响到可替换元素自身的内容**。某些可替换元素，例如 `<iframe>` 元素，可能具有自己的样式表，但它们不会继承父文档的样式。

## 典型的可替换元素

典型的可替换元素有：

- [`<iframe>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe)
- [`<video>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video)
- [`<embed>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/embed)
- [`<img>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img)

有些元素仅在特定情况下被作为可替换元素处理，例如：

- [`<option>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/option)
- [`<audio>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/audio)
- [`<canvas>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/canvas)
- [`<object>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/object)

## CSS 控制控制可替换元素的样式

`object-fit` 控制可替换元素在容器中如何显示，有以下几种值，以图片做例子进行说明：

- `fill` 不按物件本身的宽高比的填充，而是按容器的大小填充，会出现图片变形等情况
- `cover` 在保持物件本身宽高比，填充整个容器大小
- `contain` 保持物件宽高比，当容器宽高比与物件宽高比不同时，物件的宽或高只有其中一个与容器相等
- `none` 保持物件宽高比，不缩放，直接填充，图片较大容器较小时，只截取部分图片
- `scale-down` 保持物件宽高比，与 `none` 或 `contain` 其中物件显示较小时相同

`object-position` 控制在容器中的位置，类似 `bakcground-position`。

<!-- <code src="../../../playground/replaced/index.jsx"></code> -->
