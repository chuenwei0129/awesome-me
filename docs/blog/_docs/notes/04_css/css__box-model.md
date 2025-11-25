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
- **盒子不会产生换行，假设一行容不下两个盒子，盒子 2 占满剩余部分，且会一部分不换行且和盒子 1 重叠**。
- `width` 和 `height` 属性将不起作用。
- 垂直方向的内边距、外边距以及边框会被应用但是不会把其他处于 `inline` 状态的盒子推开。
- 水平方向的内边距、外边距以及边框会被应用且会把其他处于 `inline` 状态的盒子推开。

用做链接的 `<a>` 元素、`<span>`、`<em>` 以及 `<strong>` 都是默认处于 `inline` 状态的。

我们通过对盒子 [`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display) 属性的设置，比如 `inline` 或者 `block`，来控制盒子的外部显示类型。

> **一个块容器盒只包含其他块级盒，或生成一个行内格式化上下文只包含行内盒**。
>
> 或许一段代码中某一个块容器盒同时包含块级盒和行内盒的情况，但实质上在这种情况下会产生一种新的匿名块盒解决该问题。

## 使用 display：inline-block

display 有一个特殊的值，它在内联和块之间提供了一个中间状态。这对于以下情况非常有用：您不希望一个项切换到新行，但希望它可以设定宽度和高度，并避免上面看到的重叠。

一个元素使用 `display: inline-block`，实现我们需要的块级的部分效果：

- 设置 `width` 和 `height` 属性会生效。
- `padding`，`margin`，以及 `border` 会推开其他元素。

**但是，它不会跳转到新行**，如果显式添加 `width` 和 `height` 属性，它只会变得比其内容更大。




## Margin 折叠

Margin 折叠（Margin Collapse）是 CSS 中一个重要但容易被忽视的特性，指的是**相邻块级元素的垂直 margin 会合并成一个 margin**。

### 折叠规则

#### 1. 相邻兄弟元素

相邻的两个块级元素，上方元素的 `margin-bottom` 和下方元素的 `margin-top` 会折叠。

```html
<div class="box1" style="margin-bottom: 30px;"></div>
<div class="box2" style="margin-top: 20px;"></div>
<!-- 实际间距是 30px，而不是 50px -->
```

**折叠结果**：取两者中的**较大值**（30px）。

#### 2. 父元素与第一个/最后一个子元素

如果父元素没有 `border`、`padding`、行内内容或创建 BFC 来隔离，父元素的 `margin` 会与第一个/最后一个子元素的 `margin` 折叠。

```html
<div class="parent" style="margin-top: 20px;">
  <div class="child" style="margin-top: 30px;"></div>
</div>
<!-- 父元素的实际 margin-top 是 30px，而不是 50px -->
```

#### 3. 空的块级元素

如果一个块级元素没有 `border`、`padding`、内容、`height` 或 `min-height`，它的 `margin-top` 和 `margin-bottom` 会折叠。

```html
<div style="margin-top: 20px; margin-bottom: 30px;"></div>
<!-- 该元素的上下 margin 折叠为 30px -->
```

### 不发生折叠的情况

以下情况下，margin **不会**折叠：

- 浮动元素（`float`）
- 绝对定位元素（`position: absolute` 或 `position: fixed`）
- `display: inline-block` 的元素
- `display: flex` 或 `display: grid` 容器的子元素
- 创建了 BFC（Block Formatting Context）的元素

### 解决 Margin 折叠的方法

```css
/* 方法 1：给父元素添加 padding 或 border */
.parent {
  padding-top: 1px; /* 或 border-top: 1px solid transparent; */
}

/* 方法 2：创建 BFC */
.parent {
  overflow: hidden; /* 或 overflow: auto */
}

/* 方法 3：使用 Flexbox 或 Grid */
.parent {
  display: flex;
  flex-direction: column;
}
```

## 最佳实践

### 1. 全局使用 border-box

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}
```

**原因**：

- 更符合直觉，设置的 width/height 就是元素的最终可见尺寸
- 简化布局计算，添加 padding 不会影响元素总宽度
- 避免因 padding/border 导致的布局溢出问题

### 2. 理解并利用 Margin 折叠

```css
/* ✅ 推荐：统一使用 margin-bottom */
.section {
  margin-bottom: 20px;
}

/* ❌ 避免：同时使用 margin-top 和 margin-bottom */
.section {
  margin-top: 10px;
  margin-bottom: 10px;
}
```

### 3. 使用 CSS 逻辑属性

```css
/* 传统方式 */
.box {
  margin-left: 20px;
  margin-right: 20px;
}

/* 逻辑属性（支持国际化，如 RTL 布局）*/
.box {
  margin-inline: 20px; /* 等同于 margin-left + margin-right */
}
```

### 4. 使用现代布局方式避免盒模型问题

```css
/* Flexbox 布局 */
.container {
  display: flex;
  gap: 20px; /* 使用 gap 代替 margin，避免折叠问题 */
}

/* Grid 布局 */
.grid {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(3, 1fr);
}
```

### 5. 使用 CSS 比较函数实现响应式尺寸

```css
.box {
  /* 宽度在 300px 到 800px 之间，默认 50% */
  width: clamp(300px, 50%, 800px);

  /* 内边距至少 16px，但会随视口宽度增长 */
  padding: max(16px, 2vw);
}
```

## 总结

- **盒模型**由 margin、border、padding 和 content 组成
- **box-sizing** 决定了尺寸计算方式，推荐全局使用 `border-box`
- **尺寸属性**的优先级：`min-width` > `max-width` > `width`
- **显示类型**决定了元素的布局行为：block（独占一行）、inline（不换行）、inline-block（不换行但可设置尺寸）
- **Margin 折叠**是块级元素的特性，理解它可以避免很多布局问题
- **最佳实践**：使用 `border-box`、利用现代布局（Flexbox/Grid）、使用 CSS 比较函数
