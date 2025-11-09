---
group:
  title: css
  order: 2
title: BFC 与浮动
toc: content
order: 8
---

## BFC 是什么

**1.1 BFC 的定义**

- **全称**：块级格式化上下文
- **通俗解释**：页面上的一个**独立的渲染区域**（一个“结界”）。
- **核心思想**：区域内部的元素布局不会影响到外部元素，反之亦然。
- **官方定义**：引用 W3C 规范中的描述，强调其“隔离”的特性。

**1.2 BFC 的渲染规则（工作原理）**
这是理解所有 BFC 应用场景的基石。在一个 BFC 中：

- **规则一：内部的块级盒子会在垂直方向上一个接一个地放置。**
- **规则二：盒子垂直方向的距离由 `margin` 决定。属于同一个 BFC 的两个相邻块级盒子的 `margin` 会发生重叠。**
  - （_这是外边距塌陷问题的根本原因_）
- **规则三：每个元素的左外边距，与包含块的左边界相接触（即使存在浮动也是如此）。**
  - （_这是文字环绕浮动元素的根本原因_）
- **规则四：BFC 的区域不会与浮动元素重叠。**
  - （_这是实现自适应两栏布局的理论基础_）
- **规则五：计算 BFC 的高度时，浮动元素也参与计算。**
  - （_这是清除浮动、解决高度坍塌问题的根本原因_）
- **规则六：BFC 是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。**

**1.3 如何创建 BFC（触发条件）**

以下方式会创建 BFC：

1. **根元素**（`<html>`）
2. **浮动元素**（`float` 不为 `none`）
3. **绝对定位元素**（`position` 为 `absolute` 或 `fixed`）
4. **行内块元素**（`display` 为 `inline-block`）
5. **表格单元格**（`display` 为 `table-cell`，HTML 表格单元格默认值）
6. **表格标题**（`display` 为 `table-caption`，HTML 表格标题默认值）
7. **overflow 不为 visible 的块级元素**（`overflow` 为 `hidden`、`auto` 或 `scroll`）
8. **弹性元素**（`display` 为 `flex` 或 `inline-flex` 元素的**直接子元素**，注意：flex 容器本身创建的是 FFC）
9. **网格元素**（`display` 为 `grid` 或 `inline-grid` 元素的**直接子元素**）
10. **`display` 为 `flow-root`**（专门为创建 BFC 设计的值，无副作用）
11. **多列容器**（`column-count` 或 `column-width` 不为 `auto`）
12. **`contain` 为 `layout`、`content` 或 `paint` 的元素**

:::info{title=最佳实践}
推荐使用 `display: flow-root` 来创建 BFC，因为它专门为此设计，没有其他副作用。

**浏览器兼容性**：

- Chrome 58+（2017 年 4 月）
- Firefox 53+（2017 年 4 月）
- Safari 13+（2019 年 9 月）
- Edge 79+（2020 年 1 月）

如需兼容旧版浏览器，可使用 `overflow: hidden` 作为降级方案。
:::

**1.4 BFC 的应用场景**

**场景一：清除浮动（解决高度坍塌）**

当容器内的元素都浮动时，容器高度会坍塌为 0。通过让容器创建 BFC，可以让浮动元素参与高度计算。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>清除浮动</title>
    <style>
      .container {
        border: 3px solid red;
        /* 解决方案：创建 BFC */
        /* overflow: hidden; */
        /* 或者使用 display: flow-root; */
      }
      .float-item {
        width: 100px;
        height: 100px;
        background-color: lightblue;
        float: left;
        margin: 10px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="float-item">浮动元素 1</div>
      <div class="float-item">浮动元素 2</div>
    </div>
  </body>
</html>
```

**效果对比**：

- 不创建 BFC：容器高度为 0，红色边框看不到高度
- 创建 BFC（添加 `overflow: hidden` 或 `display: flow-root`）：容器高度会包含浮动元素

**场景二：防止 margin 重叠（外边距塌陷）**

同一个 BFC 中的相邻元素会发生 margin 重叠，通过将其中一个元素放入新的 BFC 可以避免。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>防止 margin 重叠</title>
    <style>
      .box {
        width: 100px;
        height: 100px;
        background-color: lightblue;
        margin: 50px 0;
      }
      .wrapper {
        /* 创建 BFC 来包裹第二个 box */
        overflow: hidden;
        /* 或使用 display: flow-root; */
      }
    </style>
  </head>
  <body>
    <div class="box">Box 1</div>
    <!-- 不使用 wrapper 时，两个 box 之间的间距是 50px（margin 重叠） -->
    <!-- 使用 wrapper 后，两个 box 之间的间距是 100px（50px + 50px） -->
    <div class="wrapper">
      <div class="box">Box 2</div>
    </div>
  </body>
</html>
```

**场景三：实现自适应两栏布局**

利用"BFC 的区域不会与浮动元素重叠"的特性，可以实现自适应布局。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>自适应两栏布局</title>
    <style>
      .sidebar {
        width: 200px;
        height: 300px;
        background-color: lightblue;
        float: left;
      }
      .main {
        height: 400px;
        background-color: lightcoral;
        /* 创建 BFC，使其不与浮动的 sidebar 重叠 */
        overflow: hidden;
        /* 或使用 display: flow-root; */
      }
    </style>
  </head>
  <body>
    <div class="sidebar">侧边栏（固定宽度）</div>
    <div class="main">
      主内容区（自适应宽度）主内容区（自适应宽度）主内容区（自适应宽度）
    </div>
  </body>
</html>
```

**效果**：

- 左侧 sidebar 固定宽度 200px 并浮动
- 右侧 main 创建 BFC 后，会自动避开浮动元素，占据剩余空间
- 当窗口宽度改变时，main 的宽度会自适应

---

## 介绍一下浮动

**2.1 浮动的基本特性**

1. 当一个元素浮动时，它会脱离正常的文档流。后续的非浮动的块级元素会表现得像浮动元素不存在一样，但这些元素的内容 (如文本) 会环绕浮动元素。
2. 元素一旦脱流，计算父节点高度时不会将浮动元素高度纳入。如果父元素内所有元素都是浮动的，那么父元素的高度将为 0，除非另有其他内容或已应用清除浮动的技术。
3. 浮动元素会影响其他浮动元素的排列，浮动元素会根据其指定的浮动方向 (左或右) 排列，并且每个浮动元素都会尽可能地靠近前一个浮动元素或容器的边缘。
4. `clear` 属性的作用是**阻止某个元素 (使用了 clear 属性的元素) 的左边或右边靠近浮动元素**。⚠️ 请注意，不要对浮动元素本身使用 `clear` 属性。由于浮动元素已经脱离了正常的文档流，即使在其上下添加清除浮动的空间也不会产生任何效果。

**2.2 浮动的典型应用场景**

**场景一：图文混排（文字环绕图片）**

这是 float 最初设计的目的。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>图文混排</title>
    <style>
      .container {
        width: 600px;
        border: 2px solid #333;
        padding: 20px;
      }
      .image {
        width: 200px;
        height: 150px;
        background-color: lightblue;
        float: left;
        margin-right: 20px;
        margin-bottom: 10px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="image">图片</div>
      <p>
        这是一段文字内容，会环绕在浮动图片的周围。这是一段文字内容，会环绕在浮动图片的周围。这是一段文字内容，会环绕在浮动图片的周围。这是一段文字内容，会环绕在浮动图片的周围。这是一段文字内容，会环绕在浮动图片的周围。
      </p>
    </div>
  </body>
</html>
```

**场景二：多个元素水平排列**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>水平排列</title>
    <style>
      .container {
        border: 2px solid #333;
        /* 清除浮动 */
        overflow: hidden;
      }
      .box {
        width: 150px;
        height: 100px;
        background-color: lightblue;
        float: left;
        margin: 10px;
        text-align: center;
        line-height: 100px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="box">Box 1</div>
      <div class="box">Box 2</div>
      <div class="box">Box 3</div>
    </div>
  </body>
</html>
```

**场景三：使用 clear 清除浮动影响**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>clear 属性</title>
    <style>
      .float-left {
        width: 100px;
        height: 100px;
        background-color: lightblue;
        float: left;
        margin: 10px;
      }
      .float-right {
        width: 100px;
        height: 100px;
        background-color: lightcoral;
        float: right;
        margin: 10px;
      }
      .clear-both {
        clear: both;
        /* 清除左右两侧的浮动 */
        background-color: lightgreen;
        padding: 10px;
      }
    </style>
  </head>
  <body>
    <div class="float-left">左浮动</div>
    <div class="float-right">右浮动</div>
    <div class="clear-both">
      我使用了 clear:
      both，所以我会出现在所有浮动元素的下方，不会被浮动元素影响。
    </div>
  </body>
</html>
```

**2.3 清除浮动的常用方法**

**方法一：给父元素创建 BFC**

```css
.parent {
  overflow: hidden; /* 或 auto、scroll */
  /* 或使用 display: flow-root; */
}
```

**方法二：在浮动元素后添加空元素并清除浮动**

```html
<div class="parent">
  <div class="float-item">浮动元素</div>
  <div style="clear: both;"></div>
</div>
```

**方法三：使用 ::after 伪元素清除浮动（推荐）**

```css
.clearfix::after {
  content: '';
  display: block;
  clear: both;
}

/* 使用 */
/* <div class="parent clearfix"> */
/*   <div class="float-item">浮动元素</div> */
/* </div> */
```

**完整示例：清除浮动的对比**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>清除浮动对比</title>
    <style>
      .container {
        border: 3px solid red;
        margin-bottom: 20px;
      }
      .float-box {
        width: 100px;
        height: 100px;
        background-color: lightblue;
        float: left;
        margin: 10px;
      }

      /* 方法一：BFC */
      .method1 {
        overflow: hidden;
      }

      /* 方法三：伪元素 */
      .method3::after {
        content: '';
        display: block;
        clear: both;
      }
    </style>
  </head>
  <body>
    <h3>问题：不清除浮动</h3>
    <div class="container">
      <div class="float-box">浮动</div>
      <div class="float-box">浮动</div>
    </div>
    <p>可以看到，容器的高度坍塌了（红色边框几乎看不见）</p>

    <h3>方法一：使用 BFC</h3>
    <div class="container method1">
      <div class="float-box">浮动</div>
      <div class="float-box">浮动</div>
    </div>

    <h3>方法三：使用伪元素（推荐）</h3>
    <div class="container method3">
      <div class="float-box">浮动</div>
      <div class="float-box">浮动</div>
    </div>
  </body>
</html>
```

---

## 带着问题去思考 BFC 和浮动

> display: block 是块级元素的默认显示方式，它本身不会创建 BFC。建立 BFC 不稀奇，不建立 BFC 才稀奇。

### 问题一：浮动元素对父元素和根元素高度的影响

**问题描述**：对于下面的代码，其中 div、body 和 html 的高度都是什么？div 浮动后，他们的高度又是什么？

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      div {
        width: 100px;
        height: 100px;
        background-color: lightblue;

        /* 控制其是否浮动 */
        float: left;
      }
    </style>
  </head>
  <body>
    <div></div>
  </body>
</html>
```

上面页面在不存在 div 时，由于没有显式指定 html 的宽高，则 html 默认宽度为视口宽度，高度为 0。body 为 html 的第一个子元素，默认宽为其父元素宽度的 100%，高度也为 0。

![div 高度](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/awesome-me/20251105060010.png)

当添加一个 div 元素后，由于 div 指定了宽高，则 body 的高度会被撑开为 div 高度，从而 html 的高度也会被撑开。

当 div 元素浮动后，由于浮动元素不占据正常文档流空间，body 的高度不会被撑开，高度为 0，html 的高度为 div 的高度。

![浮动后 html 高度](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/awesome-me/20251105062445.png)

![浮动后 body 高度](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/awesome-me/20251105062512.png)

**原因分析**：

- body 元素的 overflow 默认为 visible，所以它**不会**建立 BFC
- div 虽然是 body 的子元素，但由于 body 不是 BFC，div 实际上和 body 处于同一个 BFC 中（根元素 html 创建的 BFC）
- 因为 div 浮动了，脱离了正常文档流，body 作为普通块级元素，不会被浮动元素撑开高度，所以 body 高度为 0
- 但是对于根元素 html 来说，它**默认就会建立 BFC**（根元素是 BFC）
- 根据 BFC 规则五："计算 BFC 的高度时，浮动元素也参与计算"，所以 html 的高度会包含浮动的 div，即 100px

### 问题二：浮动元素与文字环绕效果的原理

**问题描述**：对于如下代码，为什么会出现文字环绕效果？如何阻止这种效果？

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      #box1 {
        width: 100px;
        height: 100px;
        background-color: rgb(125, 169, 184);
      }
      #box2 {
        width: 200px;
        height: 200px;
        background-color: rgb(112, 49, 49);
        float: left;
      }
      #box3 {
        width: 300px;
        height: 300px;
        background-color: rgb(39, 221, 39);
      }
    </style>
  </head>
  <body>
    <div id="box1">我是 box1</div>
    <div id="box2">
      我是 box2我是 box2我是 box2我是 box2我是 box2我是 box2我是 box2我是
      box2我是 box2我是 box2我是 box2
    </div>
    <div id="box3">我是 box3</div>
  </body>
</html>
```

![20251105063927](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/awesome-me/20251105063927.png)

**答案解释**：

- box2 浮动后虽然脱离了文档流，后续的非浮动块级元素（box3）会表现得像浮动元素不存在一样
- 但是 box3 的**内容**（文字）会环绕 box2
- 这是因为根据 BFC 规则三："每个元素的左外边距，与包含块的左边界相接触（即使存在浮动也是如此）"
- box3 本身作为块级盒子，它的边界会从容器的左边开始（忽略浮动），但它的**行盒**（line box）会缩短以避开浮动元素
- 如果给 box3 创建 BFC（比如添加 `overflow: hidden`），那么整个 box3 都会避开浮动元素，不会发生文字环绕

---

## 深入理解 BFC 的设计原理

### 为什么 float 会创建 BFC？

**问题场景**：想象一下，如果浮动元素不创建 BFC 会怎样？

```html
<div style="float: left; width: 200px">
  <p style="margin: 20px">这是浮动元素内的段落</p>
</div>
<p style="margin: 20px">这是外部的段落</p>
```

如果浮动元素不创建 BFC，那么：

1. **margin 会塌陷到外部**：浮动元素内部段落的 margin 会与外部段落的 margin 重叠
2. **内部布局会受外部影响**：外部的浮动元素可能会影响浮动容器内部的布局
3. **破坏封装性**：浮动元素作为一个"独立单元"的特性会被破坏

**所以浮动元素必须创建 BFC**，以确保：

- 浮动元素内部有独立的排版上下文
- 浮动元素内部的元素布局不受外部影响
- 浮动元素可以包含其内部的浮动子元素（规则五）
- 维护"脱离文档流但仍有内部结构"的语义

### display: flex 为什么不创建 BFC？

这是一个常见的误解，需要明确几个概念：

**1. Flex 容器创建的是 FFC（Flex Formatting Context），不是 BFC**

```html
<div style="display: flex">
  <!-- 这个 div 创建了 FFC，不是 BFC -->
  <div>Flex Item 1</div>
  <div>Flex Item 2</div>
</div>
```

**2. Flex Item（弹性项目）会创建 BFC**

```html
<div style="display: flex">
  <div>
    <!-- 这个 div 作为 flex item，会创建 BFC -->
    <p style="margin: 20px">段落 1</p>
    <p style="margin: 20px">段落 2</p>
    <!-- 这两个段落之间不会发生 margin 重叠，因为它们处于不同的 BFC 中 -->
  </div>
</div>
```

**更准确的理解**：

关于 flex item 与 BFC 的关系，需要明确：

- Flex item **本身不会自动创建 BFC**（除非它的 display 值本身会触发 BFC）
- 但 flex item 会建立一个**独立的格式化上下文**
- 这个独立的上下文会阻止 margin 穿透边界（即 flex item 内部元素的 margin 不会与外部元素重叠）
- 这种行为类似 BFC 的隔离效果，但不完全等同于 BFC

**3. 为什么要区分 FFC 和 BFC？**

因为它们的排版规则完全不同：

- **BFC**：垂直方向排列，margin 会重叠，浮动会影响布局
- **FFC**：根据 `flex-direction` 排列，margin 不会重叠，子元素可以灵活伸缩

```html
<div style="display: flex">
  <!-- FFC：子元素水平排列（默认），可以使用 flex 属性控制 -->
  <div style="flex: 1">灵活宽度</div>
  <div style="flex: 2">灵活宽度</div>
</div>

<div style="display: block">
  <!-- BFC（由子元素创建）：子元素垂直排列，margin 可能重叠 -->
  <div>块级元素 1</div>
  <div>块级元素 2</div>
</div>
```

**总结**：

- `display: flex` 创建 **FFC**（Flex Formatting Context）
- `display: grid` 创建 **GFC**（Grid Formatting Context）
- 普通块级容器（如 `overflow: hidden`）创建 **BFC**（Block Formatting Context）
- 每种格式化上下文都有自己的布局规则

### 为什么 position: absolute/fixed 会创建 BFC？

绝对定位和固定定位元素会脱离正常文档流，需要创建 BFC 来保证其内部布局的独立性。

**设计原因**：

1. **独立的布局计算上下文**：

   - 定位元素需要在自己的坐标系统中进行布局
   - 内部元素的定位基准应该相对于定位元素本身，而不受外部影响

2. **防止 margin 穿透**：

   ```html
   <div style="position: absolute; top: 100px; left: 100px">
     <p style="margin-top: 50px">内部段落</p>
   </div>
   ```

   如果不创建 BFC，内部段落的 margin 可能会"溢出"到定位元素外部，破坏定位的预期效果。

3. **正确包含浮动子元素**：

   - 定位元素内部可能包含浮动子元素
   - 创建 BFC 可以确保浮动子元素参与高度计算（规则五）
   - 这样定位元素的尺寸才能正确反映其内容

4. **维护封装性**：
   - 定位元素作为一个独立的视觉层，应该有完整的内部结构
   - BFC 确保其内部布局不受外部影响，外部布局也不受其内部影响

**实例说明**：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>position 创建 BFC</title>
    <style>
      .positioned {
        position: absolute;
        top: 50px;
        left: 50px;
        width: 300px;
        background-color: lightblue;
        padding: 20px;
      }
      .float-child {
        float: left;
        width: 100px;
        height: 100px;
        background-color: coral;
        margin: 10px;
      }
    </style>
  </head>
  <body>
    <div class="positioned">
      <div class="float-child">浮动子元素</div>
      <p>定位元素会创建 BFC，所以它的高度会包含这个浮动子元素。</p>
    </div>
  </body>
</html>
```

### 为什么 overflow: hidden 会创建 BFC？

`overflow` 属性用于控制内容溢出时的显示方式，当值不为 `visible` 时会创建 BFC。

**设计原因**：

1. **确定裁剪边界**：

   - 要裁剪溢出内容，必须先确定容器的确切边界
   - 创建 BFC 可以让浮动子元素参与高度计算，从而确定正确的裁剪区域

2. **建立独立的渲染上下文**：

   - 裁剪操作需要一个明确的"作用域"
   - BFC 提供了这个独立的作用域，确保裁剪只影响容器内部

3. **正确计算滚动区域**：

   ```html
   <div style="overflow: auto; height: 200px">
     <div style="float: left; height: 300px">浮动内容</div>
   </div>
   ```

   如果不创建 BFC，浮动元素不参与高度计算，滚动条可能无法正确显示。

4. **解决实际问题的副作用**：
   - `overflow: hidden` 常被用来清除浮动
   - 这实际上是利用了 BFC 的规则五（计算高度时包含浮动元素）
   - 这个"副作用"后来成为了开发者常用的技巧

**对比示例**：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>overflow 创建 BFC</title>
    <style>
      .container {
        width: 300px;
        border: 3px solid red;
        margin-bottom: 20px;
      }
      .with-overflow {
        overflow: hidden; /* 创建 BFC */
      }
      .float-box {
        float: left;
        width: 100px;
        height: 150px;
        background-color: lightblue;
        margin: 10px;
      }
      .content {
        background-color: lightgreen;
        padding: 10px;
      }
    </style>
  </head>
  <body>
    <h3>不使用 overflow（不创建 BFC）</h3>
    <div class="container">
      <div class="float-box">浮动元素</div>
      <div class="content">
        普通内容普通内容普通内容普通内容普通内容普通内容
      </div>
    </div>
    <p>容器高度坍塌，绿色内容环绕蓝色浮动元素</p>

    <h3>使用 overflow: hidden（创建 BFC）</h3>
    <div class="container with-overflow">
      <div class="float-box">浮动元素</div>
      <div class="content">
        普通内容普通内容普通内容普通内容普通内容普通内容
      </div>
    </div>
    <p>容器高度包含浮动元素，且浮动元素如果超出容器高度会被裁剪</p>
  </body>
</html>
```

**为什么 overflow: visible 不创建 BFC？**

- `visible` 是默认值，表示允许内容溢出显示
- 不需要计算裁剪边界，也不需要独立的渲染上下文
- 如果 `overflow: visible` 也创建 BFC，那几乎所有块级元素都会创建 BFC，失去了 BFC 的特殊性和实用价值

---

## margin 重叠和 BFC

**什么是 margin 重叠（Margin Collapse）？**

当两个或多个块级元素的垂直 margin 相邻时，它们会合并成一个 margin，这个现象叫做 margin 重叠或 margin 塌陷。

**4.1 margin 重叠的三种情况**

**情况一：相邻兄弟元素**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>相邻兄弟元素 margin 重叠</title>
    <style>
      .box1 {
        width: 100px;
        height: 100px;
        background-color: lightblue;
        margin-bottom: 50px;
      }
      .box2 {
        width: 100px;
        height: 100px;
        background-color: lightcoral;
        margin-top: 30px;
      }
    </style>
  </head>
  <body>
    <div class="box1">Box 1</div>
    <div class="box2">Box 2</div>
    <!-- 两个盒子之间的间距是 50px（取较大值），而不是 80px（50px + 30px） -->
  </body>
</html>
```

**情况二：父子元素（第一个/最后一个子元素）**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>父子元素 margin 重叠</title>
    <style>
      .parent {
        width: 200px;
        background-color: lightblue;
        /* 没有 border、padding 或内容将 margin 分隔开 */
      }
      .child {
        width: 100px;
        height: 100px;
        background-color: lightcoral;
        margin-top: 50px;
      }
    </style>
  </head>
  <body>
    <div class="parent">
      <div class="child">Child</div>
    </div>
    <!-- child 的 margin-top 会"溢出"到 parent 外部 -->
    <!-- 看起来是 parent 有了 margin-top，而不是 child -->
  </body>
</html>
```

**解决方案**：

```css
.parent {
  /* 方案 1：创建 BFC */
  overflow: hidden;
  /* 或使用 display: flow-root; */

  /* 方案 2：添加 border */
  /* border-top: 1px solid transparent; */

  /* 方案 3：添加 padding */
  /* padding-top: 1px; */
}
```

**情况三：空块级元素**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>空元素 margin 重叠</title>
    <style>
      .empty {
        margin-top: 50px;
        margin-bottom: 30px;
        /* 没有 height、border、padding */
      }
    </style>
  </head>
  <body>
    <div class="box" style="height: 100px; background: lightblue;">Box 1</div>
    <div class="empty"></div>
    <div class="box" style="height: 100px; background: lightcoral;">Box 2</div>
    <!-- 两个 Box 之间的间距是 50px，而不是 80px -->
    <!-- empty 元素的 margin-top 和 margin-bottom 会重叠 -->
  </body>
</html>
```

**4.2 BFC 如何防止 margin 重叠**

根据 BFC 规则二："属于**同一个 BFC** 的两个相邻块级盒子的 margin 会发生重叠"。

**关键点**：必须是"同一个 BFC"！

**解决方法**：将其中一个元素放入新的 BFC 中

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>使用 BFC 防止 margin 重叠</title>
    <style>
      .box {
        width: 100px;
        height: 100px;
        background-color: lightblue;
        margin: 50px 0;
      }
      .bfc-wrapper {
        /* 创建新的 BFC */
        display: flow-root;
        /* 或使用 overflow: hidden; */
      }
    </style>
  </head>
  <body>
    <div class="box">Box 1 (margin: 50px 0)</div>

    <!-- 不使用 wrapper：两个盒子间距 50px -->

    <div class="bfc-wrapper">
      <div class="box">Box 2 (margin: 50px 0)</div>
    </div>

    <!-- 使用 wrapper：两个盒子间距 100px（50px + 50px） -->
  </body>
</html>
```

**4.3 不会发生 margin 重叠的情况**

1. **浮动元素**不会与其他元素发生 margin 重叠
2. **绝对定位元素**不会与其他元素发生 margin 重叠
3. **inline-block 元素**不会与其他元素发生 margin 重叠
4. 根元素（`<html>`）不会与其他元素发生 margin 重叠
5. **创建了 BFC 的元素**不会与其子元素发生 margin 重叠

```html
<style>
  .float-box {
    float: left;
    margin: 50px;
  }
  .normal-box {
    margin: 50px;
  }
</style>

<div class="float-box">浮动元素</div>
<div class="normal-box">普通元素</div>
<!-- 这两个元素的 margin 不会重叠 -->
```

---

## 总结

### BFC 的核心要点

1. **BFC 是什么**：块级格式化上下文，是一个独立的渲染区域，有自己的渲染规则
2. **BFC 的六大规则**：
   - 内部盒子垂直排列
   - margin 会在同一 BFC 中重叠
   - 元素左外边距与包含块左边界相接触
   - BFC 区域不会与浮动元素重叠
   - 计算 BFC 高度时包含浮动元素
   - BFC 是独立容器，内外互不影响
3. **如何创建 BFC**：推荐使用 `display: flow-root`，或 `overflow: hidden/auto/scroll`
4. **BFC 的应用**：清除浮动、防止 margin 重叠、自适应布局、阻止元素被浮动元素覆盖

### 浮动的核心要点

1. **浮动的特性**：脱离文档流、父元素高度坍塌、文字环绕、影响其他浮动元素排列
2. **浮动的应用**：图文混排、元素水平排列（现在推荐用 Flexbox 或 Grid）
3. **清除浮动的方法**：
   - 父元素创建 BFC（`overflow: hidden` 或 `display: flow-root`）
   - 在浮动元素后添加 `clear: both` 的元素
   - 使用 `::after` 伪元素清除浮动（推荐）

### 格式化上下文的区别

| 格式化上下文 | 创建方式                       | 主要特点                        | 适用场景       |
| ------------ | ------------------------------ | ------------------------------- | -------------- |
| BFC          | `overflow: hidden`、`float` 等 | 垂直排列、margin 重叠、包含浮动 | 清除浮动、布局 |
| FFC          | `display: flex`                | 灵活排列、不重叠 margin、可伸缩 | 现代一维布局   |
| GFC          | `display: grid`                | 二维网格、精确控制行列          | 现代二维布局   |
| IFC          | 行内元素自动创建               | 水平排列、基线对齐、文本环绕    | 文本排版       |

### 实践建议

1. **清除浮动**：优先使用 `display: flow-root`，它专为创建 BFC 设计，没有副作用
2. **防止 margin 重叠**：将需要独立的元素放入新的 BFC 中
3. **现代布局**：除了特殊需求（如图文混排），尽量使用 Flexbox 或 Grid 替代浮动布局
4. **理解原理**：掌握 BFC 和浮动的底层原理，有助于调试和解决各种 CSS 布局问题

### 常见问题速查

| 问题                       | 原因                           | 解决方案                             |
| -------------------------- | ------------------------------ | ------------------------------------ |
| 父元素高度坍塌             | 子元素浮动，父元素未创建 BFC   | 给父元素添加 `overflow: hidden`      |
| margin 重叠                | 元素在同一 BFC 中              | 将元素放入新的 BFC                   |
| 浮动元素覆盖其他元素       | 普通元素与浮动元素在同一 BFC   | 给被覆盖元素创建 BFC                 |
| 子元素 margin 溢出到父元素 | 父元素未创建 BFC，没有边界隔离 | 父元素创建 BFC 或添加 padding/border |

---

## 参考资料

- [MDN - Block formatting context](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Block_formatting_context)
- [W3C CSS 2.2 规范 - 9.4.1 Block formatting contexts](https://www.w3.org/TR/CSS2/visuren.html#block-formatting)
- [CSS 规范 - Float](https://www.w3.org/TR/CSS2/visuren.html#float-position)
