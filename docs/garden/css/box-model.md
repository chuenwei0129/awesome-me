---
title: 盒模型
toc: content
group:
  title: 基础
  order: 1
---

## 盒模型

盒模型是网页布局的基础概念，它由以下几个属性组成，从外到内的公式表示为：`box = margin + border + padding + content`。

除了 `content` (不是属性，只是为了理解盒模型而使用的术语)，其他属性都包含 `left`、`right`、`top` 和 `bottom` 等扩展属性。

- **margin**：边距，是外部透明区域，用于隔离相邻的盒子。
- **border**：边框，是内部着色区域，用于隔离边距和填充，包含 `width`、`style`、`color` 三个扩展属性。
- **padding**：填充，是内部着色区域，用于扩展盒子内部的尺寸。
- **content**：内容，指的是以 `文本` 或 `节点` 形式存在的占用位置。

在 **CSS3** 中，有一个属性用于声明盒模型的类型，即 `box-sizing`。

- `content-box`：标准盒模型 (默认)。
- `border-box`：怪异盒模型。

> **注意：`box-sizing` 属性不具备继承性，如果需要全局统一盒模型类型，建议使用 `*` 选择器声明 `box-sizing`**。

## 块级盒子和内联盒子

在 CSS 中我们广泛地使用两种 “盒子” —— **块级盒子** (**block box**) 和**内联盒子** (**inline box**)。这两种盒子会在**页面流** (page flow) 和元素之间的关系方面表现出不同的行为：

一个被定义成块级的 (block) 盒子会表现出以下行为：

- 盒子会在内联的方向上扩展并占据父容器在该方向上的所有可用空间，**在绝大数情况下意味着盒子会和父容器一样宽**，它的默认宽度 (width) 会填满其包含块，即 `width: 100%`。
- 每个盒子都会换行。
- `width` 和 `height` 属性可以发挥作用。
- 内边距 (padding)，外边距 (margin) 和边框 (border) 会将其他元素从当前盒子周围 “推开”。

除非特殊指定，诸如标题 (`<h1>` 等) 和段落 (`<p>`) 默认情况下都是块级的盒子。

如果一个盒子对外显示为 `inline`，那么他的行为如下：

- 它的默认宽度 (width) 和其内容有关，如果有足够多的内容时，它也会填满其包含块，否则相当于 `max-content`。
- 盒子不会产生换行。
- `width` 和 `height` 属性将不起作用。
- 垂直方向的内边距、外边距以及边框会被应用但是不会把其他处于 `inline` 状态的盒子推开。
- 水平方向的内边距、外边距以及边框会被应用且会把其他处于 `inline` 状态的盒子推开。

用做链接的 `<a>` 元素、`<span>`、`<em>` 以及 `<strong>` 都是默认处于 `inline` 状态的。

我们通过对盒子 [`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display) 属性的设置，比如 `inline` 或者 `block`，来控制盒子的外部显示类型。

> **一个块容器盒只包含其他块级盒，或生成一个行内格式化上下文只包含行内盒**。或许一段代码中某一个块容器盒同时包含块级盒和行内盒的情况，但实质上在这种情况下会产生一种新的匿名块盒解决该问题。

## 使用 display：inline-block

display 有一个特殊的值，它在内联和块之间提供了一个中间状态。这对于以下情况非常有用：您不希望一个项切换到新行，但希望它可以设定宽度和高度，并避免上面看到的重叠。

一个元素使用 `display: inline-block`，实现我们需要的块级的部分效果：

- 设置 `width` 和 `height` 属性会生效。
- `padding`，`margin`，以及 `border` 会推开其他元素。

**但是，它不会跳转到新行**，如果显式添加 `width` 和 `height` 属性，它只会变得比其内容更大。

## margin 负值

- `padding` 不能为负值，`margin` 可以为负值。
- `margin-top` 为负值不会增加高度，只会产生向上位移。
- `margin-bottom` 为负值不会产生位移，会减少自身的供 CSS 读取的高度。

**利用 `margin-bottom` 为负值会减少 CSS 读取元素高度的特性，加上 `padding-bottom` 和 `overflow:hidden`，就能实现一个未知高度的多列等高布局。**

**负 `margin` 会改变浮动元素的显示位置**，圣杯布局、双飞翼布局什么的，都是利用这个原理实现的。

## 拓展：关于 margin 的小知识

- 当元素不存在 `width` 属性或者 `width：auto` 的时候，`margin-left` 和 `margin-right` 可以增加宽度。

- 当使用百分数时，你需要清楚，它是什么东西的百分数。对于一个处于另外一个容器当中的盒子，如果你给予了子盒子一个百分数作为宽度，那么它指的是父容器宽度的百分数。使用百分比作为元素外边距 (margin) 或填充 (padding) 的单位时，**值是以包含块的内联尺寸进行计算的，也就是元素的水平宽度**。