---
group:
  title: css
  order: 2
title: 盒模型
toc: content
order: 2
---

## 盒模型基础

盒模型是网页布局的基础概念，Web 中**每一个元素都被视为一个盒子**。它由以下几个部分组成，从外到内的公式表示为：`box = margin + border + padding + content`。

```
------------------------------------------
|                 margin                 |
| -------------------------------------- |
| |               border               | |
| | ---------------------------------- | |
| | |             padding            | | |
| | | ------------------------------ | | |
| | | |           content          | | | |
| | | |                            | | | |
| | | |                            | | | |
| | | ------------------------------ | | |
| | ---------------------------------- | |
|  ------------------------------------- |
------------------------------------------
```

除了 `content`（不是属性，只是为了理解盒模型而使用的术语），其他属性都包含 `left`、`right`、`top` 和 `bottom` 等扩展属性。

- **margin**：外边距，是外部透明区域，用于隔离相邻的盒子。
- **border**：边框，是盒子的边界，包含 `width`、`style`、`color` 三个扩展属性。
- **padding**：内边距，是内部空间，用于扩展内容区域与边框之间的距离。
- **content**：内容，指的是以文本或子元素形式存在的实际内容。

## 盒模型类型

在 CSS3 中，通过 `box-sizing` 属性声明盒模型的类型，它决定了 `width` 和 `height` 属性如何计算元素的尺寸。

### 标准盒模型（content-box）

```css
box-sizing: content-box; /* 默认值 */
```

**计算方式：**

- `width` 和 `height` 只包含 **content** 的尺寸
- 元素实际占用空间 = content + padding + border + margin

**示例：**

```css
.box {
  box-sizing: content-box;
  width: 200px;
  height: 100px;
  padding: 20px;
  border: 5px solid #000;
  margin: 10px;
}
```

**实际尺寸计算：**

- 内容区域：200px × 100px（width × height）
- 可见宽度：200px + 20px × 2 + 5px × 2 = **250px**
- 可见高度：100px + 20px × 2 + 5px × 2 = **150px**
- 占用空间宽度：250px + 10px × 2 = **270px**
- 占用空间高度：150px + 10px × 2 = **170px**

### 怪异盒模型（border-box）

```css
box-sizing: border-box;
```

**计算方式：**

- `width` 和 `height` 包含 **content + padding + border** 的总尺寸
- 元素实际占用空间 = width/height + margin

**示例：**

```css
.box {
  box-sizing: border-box;
  width: 200px;
  height: 100px;
  padding: 20px;
  border: 5px solid #000;
  margin: 10px;
}
```

**实际尺寸计算：**

- 可见宽度：200px（width，已包含 padding 和 border）
- 可见高度：100px（height，已包含 padding 和 border）
- 内容区域宽度：200px - 20px × 2 - 5px × 2 = **150px**
- 内容区域高度：100px - 20px × 2 - 5px × 2 = **50px**
- 占用空间宽度：200px + 10px × 2 = **220px**
- 占用空间高度：100px + 10px × 2 = **120px**

### 两者对比

| 特性         | content-box（标准）           | border-box（怪异）              |
| ------------ | ----------------------------- | ------------------------------- |
| width/height | 仅指定内容区域                | 包含 content + padding + border |
| 添加 padding | 增加元素总尺寸                | 不改变元素总尺寸，压缩内容区域  |
| 添加 border  | 增加元素总尺寸                | 不改变元素总尺寸，压缩内容区域  |
| 布局计算     | 需要手动计算 padding + border | 直观，设置的值就是最终可见尺寸  |
| 实际应用     | CSS 默认值                    | 现代开发推荐使用，更符合直觉    |

> **最佳实践**：`box-sizing` 属性不具备继承性，如果需要全局统一盒模型类型，建议使用以下代码：
>
> ```css
> *,
> *::before,
> *::after {
>   box-sizing: border-box;
> }
> ```

## 尺寸计算

在 CSS 中，容器的尺寸既可以由内容自动决定，也可以**显式地通过 CSS 属性控制**。

### 尺寸类型

#### 明确的尺寸（Definite Size）

- **定义**：无需执行布局即可确定盒子的大小。
- **获取方式**：
  - 显式设置固定值（如 `width: 200px`）
  - 依赖内容的占用空间
  - 使用容器的初始大小
  - 通过布局计算（如 Flexbox 中的 `flex-grow` / `flex-shrink` 拉伸和收缩）
- **特征**：width/height 或 inline-size/block-size 的数值是已知的。

#### 不确定的尺寸（Indefinite Size）

- **定义**：大小无法直接确定，需依赖内容或上下文计算。
- **特征**：
  - 可能非常大，也可能非常小
  - 在计算前必须先检查内容

### 尺寸属性

常用的尺寸相关 CSS 属性：

```
width | min-width | max-width | height | min-height | max-height
```

#### 优先级规则

当同一个容器上使用多个尺寸属性时，浏览器按照以下规则决定最终尺寸：

1. **min-width vs width**：

   - 当 `width ≥ min-width` 时，取 `width` 的值
   - 当 `width < min-width` 时，取 `min-width` 的值

2. **max-width vs width**：

   - 当 `width > max-width` 时，取 `max-width` 的值
   - 当 `width ≤ max-width` 时，取 `width` 的值

3. **min-width vs max-width**：
   - 当 `min-width > max-width` 时，取 `min-width` 的值（**min-width 优先级最高**）
   - 当 `min-width ≤ max-width` 时，取 `max-width` 的值

> **注意**：上述规则同样适用于 `min-height`、`height` 和 `max-height`，以及 CSS 逻辑属性 `min-inline-size`、`inline-size`、`max-inline-size` 和 `min-block-size`、`block-size`、`max-block-size`。

#### 可接受的值

这些属性可以接受的值包括：

- `<length>`：使用长度单位（如 `100px`、`100vw`）
- `<percentage>`：百分比值（如 `50%`）
- `auto`
- `none`
- `min-content`
- `max-content`
- `fit-content`（以及 `fit-content()`，常用于 CSS Grid）

**规则**：

- 值为 `<length>` 或 `<percentage>` → 容器尺寸明确
- 值为 `auto`、`min-content`、`max-content`、`fit-content` → 容器尺寸不明确，需要根据内容计算

### 自动计算尺寸方式

#### 1. auto

根据格式化上下文自动计算容器的尺寸。

- **块级元素**：`width: auto` 会填充父容器的可用宽度
- **内联元素**：`width: auto` 由内容决定

#### 2. min-content

容器内容的最小尺寸，在不导致溢出的情况下确定。

```css
.box {
  width: min-content; /* 宽度收缩到最小，可能导致文本换行 */
}
```

#### 3. max-content

容器可容纳的最大尺寸，例如未换行文本会显示为一行长串。

```css
.box {
  width: max-content; /* 宽度扩展到最大，文本不会换行 */
}
```

#### 4. fit-content

自适应内容的尺寸，介于 `min-content` 和 `max-content` 之间。

- 若可用空间明确：`min(max-content, max(min-content, 可用空间))`
- 若可用空间不明确：等于 `max-content`

```css
.box {
  width: fit-content; /* 根据内容和可用空间自适应 */
}
```

### 其他影响因素

- **宽高比（aspect-ratio）**：可以通过设置宽高比来约束容器尺寸

  ```css
  .box {
    width: 200px;
    aspect-ratio: 16 / 9; /* 高度自动计算为 112.5px */
  }
  ```

- **CSS 比较函数**：可以使用数学表达式动态计算尺寸

  ```css
  .box {
    width: clamp(200px, 50%, 500px); /* 最小 200px，理想 50%，最大 500px */
    height: min(300px, 50vh); /* 取两者中较小的值 */
    padding: max(20px, 2%); /* 取两者中较大的值 */
  }
  ```

## 显示类型

通过 `display` 属性可以控制盒子的外部显示类型，决定元素在页面流中的行为。

### block（块级盒子）

一个被定义成块级的盒子会表现出以下行为：

- 盒子会在内联的方向上扩展并占据父容器在该方向上的所有可用空间，**在绝大多数情况下意味着盒子会和父容器一样宽**，即 `width: 100%`
- 每个盒子都会换行，独占一行
- `width` 和 `height` 属性可以发挥作用
- `padding`、`margin` 和 `border` 会将其他元素从当前盒子周围"推开"

### inline（内联盒子）

如果一个盒子对外显示为 `inline`，那么它的行为如下：

- 盒子不会产生换行，多个内联盒子会在同一行内排列，假设一行容不下两个盒子，盒子 2 的一部分占满包含块剩余部分，另一部分不换行会和盒子 1 重叠
- `width` 和 `height` 属性**不起作用**
- 垂直方向的 `padding`、`margin` 和 `border` 会被应用，但**不会把其他处于 `inline` 状态的盒子推开**
- 水平方向的 `padding`、`margin` 和 `border` 会被应用，且**会把其他处于 `inline` 状态的盒子推开**
- 盒子的宽度由内容决定，如果有足够多的内容时，它也会填满其包含块，否则相当于 `max-content`

> **注意**：根据 CSS 规范，一个块容器盒只包含其他块级盒，或生成一个行内格式化上下文只包含行内盒。如果一个块容器盒同时包含块级盒和行内盒，浏览器会自动创建**匿名块盒**来包裹行内盒。

### inline-block（行内块盒子）

`display: inline-block` 提供了一个介于内联和块之间的中间状态：

- **不会跳转到新行**，可以与其他内联元素在同一行显示
- `width` 和 `height` 属性**会生效**
- `padding`、`margin` 和 `border` 会**在水平和垂直方向**都将其他元素推开

```css
.button {
  display: inline-block;
  width: 120px;
  height: 40px;
  padding: 10px 20px;
  /* 可以设置宽高，同时保持在同一行 */
}
```

**应用场景：**

- 导航按钮
- 标签（tag）
- 需要设置宽高但不想独占一行的元素

### 对比总结

| 特性                | block              | inline                    | inline-block              |
| ------------------- | ------------------ | ------------------------- | ------------------------- |
| 换行行为            | 独占一行           | 不换行                    | 不换行                    |
| width/height        | ✅ 生效            | ❌ 不生效                 | ✅ 生效                   |
| 水平 padding/margin | ✅ 推开其他元素    | ✅ 推开其他元素           | ✅ 推开其他元素           |
| 垂直 padding/margin | ✅ 推开其他元素    | ❌ 不推开其他元素         | ✅ 推开其他元素           |
| 默认宽度            | 100%（填充父容器） | max-content（由内容决定） | max-content（由内容决定） |

## margin 负值

### 负 margin 对不同方向的影响机制

```css
/* 负 margin-left/top：元素向左/上移动 */
.box {
  margin-left: -20px; /* 元素向左移动20px，可能覆盖左侧元素 */
  margin-top: -20px; /* 元素向上移动20px，可能覆盖上方元素 */
}

/* 负 margin-right/bottom：影响后续元素的位置 */
.box {
  margin-right: -20px; /* 右侧元素会向左移动20px */
  margin-bottom: -20px; /* 下方元素会向上移动20px */
}
```

**原理**：

- **左/上负值**：改变元素自身的参考位置，让元素从原本位置向左/上偏移
- **右/下负值**：不改变元素自身位置，而是"欺骗"浏览器，让浏览器认为这个元素占用的空间更小，从而影响后续元素的排列

### 负 margin 在标准流中的实际应用

```css
/* 实现元素重叠效果 */
.card {
  margin-left: -30px;
}
.card:first-child {
  margin-left: 0;
}
/* 可以实现类似扑克牌堆叠的效果 */

/* 扩展容器宽度 */
.container {
  width: auto;
  margin-left: -15px; /* 向左扩展 */
  margin-right: -15px; /* 向右扩展 */
}
/* 常用于抵消内部元素的 padding，实现满宽效果 */
```

### 负 margin 与 width: auto 的关系

```css
/* 当元素是块级元素且未设置 width 或 width: auto 时 */
.block {
  width: auto; /* 或不设置 width */
  margin-left: -20px;
  margin-right: -20px;
}
```

**为什么可以增加宽度**：

- 块级元素默认宽度计算公式：`margin-left + border-left + padding-left + width + padding-right + border-right + margin-right = 父容器宽度`
- 当 `width: auto` 时，浏览器会自动计算 width 来满足上述公式
- 负 margin 会使等式右侧减小，从而 width 必须增大来维持平衡

### 负 margin 在不同定位方式下的表现

```css
/* 相对定位：负 margin 依然有效 */
.relative {
  position: relative;
  margin-top: -10px; /* 会产生偏移，且影响文档流 */
  top: -10px; /* 也会偏移，但不影响文档流 */
}

/* 绝对定位：负 margin 基于定位点计算 */
.absolute {
  position: absolute;
  top: 0;
  margin-top: -10px; /* 相当于 top: -10px */
}

/* 固定定位：同绝对定位 */
.fixed {
  position: fixed;
  left: 0;
  margin-left: -10px; /* 可以让元素部分移出视口 */
}
```

### 百分比 margin 的特殊性详解

```css
.parent {
  width: 200px;
  height: 100px;
}

.child {
  /* 注意：所有方向的百分比 margin 都基于父元素的宽度！*/
  margin-top: 10%; /* = 200px × 10% = 20px (不是基于高度!) */
  margin-bottom: 10%; /* = 200px × 10% = 20px */
  margin-left: 10%; /* = 200px × 10% = 20px */
  margin-right: 10%; /* = 200px × 10% = 20px */
}
```

**为什么垂直 margin 也基于宽度**：

- CSS 规范规定，为了保持一致性，所有方向的百分比 margin/padding 都相对于**包含块的宽度**
- 这样可以确保使用相同百分比时，能得到正方形的外边距空间
- 这个特性常用于实现**固定宽高比**的占位元素

```css
/* 利用这个特性实现 16:9 的响应式容器 */
.aspect-ratio-box {
  width: 100%;
  padding-bottom: 56.25%; /* 9/16 = 0.5625 */
  position: relative;
}
```

### 负 margin 的边界情况

```css
/* 极端负值 */
.box {
  width: 100px;
  margin-left: -150px; /* 超过自身宽度，元素会完全移出原位置 */
}

/* 与浮动结合 */
.float-left {
  float: left;
  width: 100px;
  margin-left: -100%; /* 移动到父容器最左侧，双飞翼布局核心 */
}
```

**实际应用 - 抵消内边距实现通栏效果**：

```css
.container {
  padding: 0 15px;
}

.full-width-section {
  margin-left: -15px; /* 抵消父容器的左 padding */
  margin-right: -15px; /* 抵消父容器的右 padding */
  /* 实现在有 padding 的容器内的满宽效果 */
}
```
