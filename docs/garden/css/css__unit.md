---
title: 单位
toc: content
group:
  title: 基础
---

## em 和 rem

### em

`em` 是最常见的相对长度单位，适合基于特定的字号进行排版。根据 CSS 的规定，`1em` 等于元素的 `font-size` 属性的值。

- `em` 是相对于父元素的字体大小进行计算的。
- 如果当前的行内文本的字体尺寸未进行显示设置，那么它将相对于浏览器的默认字体尺寸进行计算。
- 当 DOM 元素嵌套加深并且许多层级显式设置了 `font-size` 的值单位为 `em` 时，计算复杂度会很高。

> 如果自身元素没有设置字体大小，则会根据其父元素的字体大小作为参照去计算；若元素本身已经设置了字体，则会基于自身的字体大小进行计算。

我们来看一个例子：

```jsx
import React from 'react';
import styled from 'styled-components';

const ParentDiv = styled.div`
  width: 300px;
  height: 300px;
  font-size: 20px;
`;

const ChildDiv = styled.div`
  /* border 的宽度是什么？ */
  border: 1em solid;
`;

const App = () => {
  return (
    <ParentDiv>
      <ChildDiv>子元素</ChildDiv>
    </ParentDiv>
  );
};

export default App;
```

这里给父元素设置了字体大小为 `20px`，然后给子元素的 `border` 宽度设置为 `1em`，此时子元素的 `border` 值为 `20px`，确实是相对于父元素的字体大小设置的。

如果我们给子元素的字体设置为 `30px`：

```jsx
import React from 'react';
import styled from 'styled-components';

const ParentDiv = styled.div`
  width: 300px;
  height: 300px;
  font-size: 20px;
`;

const ChildDiv = styled.div`
  font-size: 30px;
  border: 1em solid;
`;

const App = () => {
  return (
    <ParentDiv>
      <ChildDiv>子元素</ChildDiv>
    </ParentDiv>
  );
};

export default App;
```

这时可以看到，子元素的边框宽度就是 `30px`，它是相对自己大小进行计算的。

`em` 单位除了可以作用于 `font-size` 之外，还可以运用于其他使用长度的属性，比如 `border-width`、`width`、`height`、`margin`、`padding`、`text-shadow` 等。

### rem

相对 `em` 来说，`rem` 就简单很多，它是根据页面的根元素（`<html>`）的字体大小来计算的。

如果没有对根元素设定字号的话，`font-size: 1rem` 的效果与 `font-size: initial` 相同。

### 使用建议

使用 `em` 和 `rem` 可以让我们灵活控制元素整体的放大和缩小，而不是固定大小。以下是使用建议：

- 两者在客户端中计算出来的样式都会以 `px` 形式显示；
- `rem` 是相对于根元素 `<html>` 的 `font-size` 计算，`em` 相对于元素的 `font-size` 计算；
- 当需要根据浏览器的 `font-size` 设置缩放时，应该使用 `rem`；
- 使用 `em` 应该根据组件的 `font-size` 来定，而不是根元素的 `font-size`；
- `rem` 可以从浏览器字体设置中继承 `font-size` 值，`em` 可能受任何继承过来的父元素 `font-size` 的影响。

## 百分比单位

百分比（%）是我们比较常用的单位之一，所有接受长度值的属性都可以使用百分比单位。不同属性使用该单位的效果可能并不相同，但都需要有一个参照值，也就是说百分比值是一个相对的值。

下面来看看常见场景中的百分比单位的使用：

### 1. 盒模型中的百分比

在 CSS 中的盒模型包含的属性有：`width`、`max-width`、`min-width`、`height`、`max-height`、`min-height`、`padding`、`margin` 等。这些属性在使用百分比时，参照物不尽相同：

- **width、max-width、min-width**：值为百分比时，其相对于包含块的 `width` 进行计算；
- **height、max-height、min-height**：值为百分比时，其相对于包含块的 `height` 进行计算；
- **padding、margin**：值为百分比时：
  - 水平的值，相对于包含块的 `width` 进行计算；
  - 垂直的值，相对于包含块的 `height` 进行计算。

### 2. 文本中的百分比

在 CSS 中文本控制的属性有 `font-size`、`line-height`、`vertical-align`、`text-indent` 等。这些属性在使用百分比时，参照物不尽相同：

- **font-size**：根据父元素的 `font-size` 进行计算；
- **line-height**：根据 `font-size` 进行计算；
- **vertical-align**：根据 `line-height` 进行计算；
- **text-indent**：如果是水平的，则根据 `width` 进行计算，如果是垂直的，则根据 `height` 进行计算。

### 3. 定位中的百分比

在 CSS 中用控制 `position` 位置的 `top`、`right`、`bottom`、`left` 都可以使用百分比作为单位，其参照物就是包含块的同方向的 `width` 和 `height`。不同定位的包含块不尽相同：

- 如果元素为 **静态**（`static`）或 **相对定位**（`relative`），包含块一般是其父容器；
- 如果元素为 **绝对定位**（`absolute`），包含块应该是离它最近的 `position` 为 `absolute`、`relative` 或 `fixed` 的祖先元素；
- 如果元素为 **固定定位**（`fixed`），包含块就是视窗（viewport）。

### 4. 变换中的百分比

CSS 中的 `transform` 属性中的 `translate` 和 `transform-origin` 值也可以设置百分比。

- **translateX()**：根据容器的 `width` 计算；
- **translateY()**：根据容器的 `height` 计算；
- **transform-origin** 中的横坐标（`x`）相对于容器的 `width` 计算；纵坐标（`y`）相对于容器的 `height` 计算。

> **注意**：在 `translate` 还有一个 z 轴的函数 `translateZ()`，它是不接受百分比为单位的值。
