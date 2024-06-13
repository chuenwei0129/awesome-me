---
title: Grid
toc: content
group:
  title: 基础
---

[Grid](https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid) 布局是一个二维的布局方法，纵横两个方向总是同时存在。

在 Grid 布局中，所有相关 CSS 属性正好分为两拨，一拨作用在 `grid` 容器上，还有一拨作用在 `grid` 子项上。

> 在 `Grid` 布局中，`float`，`display:inline-block`，`display:table-cell`，`vertical-align` 以及 `column-*` 这些属性和声明对 `grid` 子项是没有任何作用的。

给 `<div>` 这类块元素设置 `display:grid` 或者给 `<span>` 这类内联元素设置 `display:inline-grid` 创建 Grid 布局。

**双命名：**

**由于网格中中间区域的网格线是两边格子公用的**，就像道路有两边，因此，我们起名字的时候可以起两个名称 (使用空格分隔)，分别表示两侧。例如：

```css
.container {
  grid-template-columns: [第一根纵线] 80px [第1根纵线结束 第2根纵线开始] 100px [最后的结束线];
}
```

**repeat 语法：**

```css
.container {
  grid-template-columns: repeat(24, 40px [col-start]);
}
```

等同于：

```css
.container {
  grid-template-columns: 40px [col-start], 40px [col-start],
    /* ...省略20个...*/, 40px [col-start], 40px [col-start];
}
```

**fr 单位：**

`fr` 是单词 `fraction` 的缩写，表示分数。

```css
.container {
  grid-template-columns: 200px 1fr 1fr 1fr;
}
```

`4` 列布局，后面 `3` 列宽度是 `grid` 容器宽度减去 `200px` 后的 `1/3` 大小，`1:1:1`，剩余空间三等分

**fr 和 auto 混用：**

```css
.container {
  /* 减去第一列内容宽度，剩下三等分 */
  grid-template-columns: auto 1fr 1fr 1fr;
}
```

当设置 `fr` 和 `auto` 混用的时候，`auto` 的尺寸表现为 “包裹”，为**内容宽度**。如果没有设置 `fr` 尺寸的网格，则表现为拉伸。

**当 `fr` 数值之和小于 `1` 时：**

```css
.container {
  grid-template-columns: auto 0.25fr 0.25fr 0.25fr;
}
```

这里计算就相对复杂些，首先，由于第一个网格尺寸设置为 `auto`，因此 `fr` 计算需要的剩余空间尺寸是 `grid` 容器的宽度减去 `auto` 内容的宽度。所以，后面 3 个 `0.25` fr 元素的宽度是：**(容器宽度 - auto 内容宽度) \* 0.25**。然后剩余尺寸就是第一个网格宽度。

**grid-template-areas:**

```css
.grid-container {
  grid-template-areas:
    /* 内容映射 */
    /* none 和 . 区别一个是空网格一个是不存在网格 */
    'header  .'
    'sidebar content'
    'footer  footer';
  /* 三行两列 */
  grid-template-columns: 200px 1fr;
  grid-template-rows: 80px 1fr 80px;
}
```

- `grid-area-name` 对应网格区域的名称。
- `.` 表示空的网格单元格。
- `none` 没有定义网格区域。

举个例子 🌰：[具体代码](./code/grid.html)

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/grid-2.png)
