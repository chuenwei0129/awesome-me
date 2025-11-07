---
group:
  title: CSS
  order: 2
title: 包含块与定位
toc: content
---

## 是什么

### 包含块（Containing Block）的定义

**包含块**是 CSS 布局系统中的一个核心概念，它定义了元素进行尺寸计算和定位时的参照对象。

**通俗理解**：

- 包含块是一个**矩形区域**，元素会基于这个区域进行布局和定位
- 包含块决定了元素的百分比尺寸（如 `width: 50%`）和定位偏移（如 `top: 10%`）的计算基准
- **包含块不等于父元素**，这是最容易混淆的地方

### 定位（Position）的定义

`position` 属性指定了元素的定位方式，它直接影响元素的包含块是什么。

**五种定位方式**：

```css
position: static; /* 默认值：静态定位（正常文档流） */
position: relative; /* 相对定位：相对于自身原始位置 */
position: absolute; /* 绝对定位：相对于最近的定位祖先 */
position: fixed; /* 固定定位：相对于视口 */
position: sticky; /* 粘性定位：相对/固定的混合 */
```

## 为什么

### 为什么需要包含块的概念？

**问题 1：百分比如何计算？**

```html
<div class="parent">
  <div class="child" style="width: 50%; height: 50%;">
    <!-- 这个 50% 是相对于谁计算的？ -->
  </div>
</div>
```

**问题 2：绝对定位元素如何确定位置？**

```css
.element {
  position: absolute;
  top: 10%;
  left: 20%;
  /* 这个 10% 和 20% 是相对于谁的？ */
}
```

**问题 3：父元素和定位祖先不是同一个元素时怎么办？**

```html
<div style="position: relative;">
  <!-- 祖父 -->
  <div>
    <!-- 父元素，无定位 -->
    <div style="position: absolute; top: 0;">
      <!-- 这个元素的 top: 0 是相对于祖父还是父元素？ -->
    </div>
  </div>
</div>
```

**答案：包含块就是为了解决这些问题**

- 包含块提供了一个**明确的、统一的参照标准**
- 不同的定位方式有不同的包含块确定规则
- 百分比尺寸和定位偏移都基于包含块计算

### 为什么包含块不总是父元素？

**设计原因**：

1. **灵活性**：绝对定位元素可以相对于任意定位祖先定位，而不限于直接父元素
2. **层级控制**：允许元素跨越多层 DOM 结构进行定位
3. **视觉独立性**：固定定位元素相对于视口，不受任何祖先元素影响

**实际场景**：

```html
<!-- 典型的模态框场景 -->
<div class="page-container" style="position: relative;">
  <div class="header">
    <nav>
      <button>
        <!-- 点击按钮显示下拉菜单 -->
        <div class="dropdown" style="position: absolute; top: 100%;">
          <!-- 这个下拉菜单的包含块是 .page-container，而非直接父元素 button -->
        </div>
      </button>
    </nav>
  </div>
</div>
```

## 怎么用

### 包含块的确定规则

包含块的确定规则取决于元素的 `position` 属性值。

#### 规则一：position: static / relative

**包含块 = 最近的块级祖先元素的内容区域（content box）**

```html
<div class="grandparent" style="width: 1000px; padding: 50px;">
  <div class="parent" style="width: 800px; padding: 30px; border: 10px solid;">
    <div class="child" style="position: relative; width: 50%;">
      <!-- 包含块：parent 的 content box -->
      <!-- width: 50% = (800px - 30px*2 - 10px*2) * 50% = 360px -->
    </div>
  </div>
</div>
```

**关键点**：

- 包含块是父元素的**内容区域**（不包括 padding 和 border）
- `position: static` 和 `position: relative` 的包含块确定规则相同
- `relative` 定位不改变元素的包含块，只是偏移了元素自身

#### 规则二：position: absolute

**包含块 = 最近的定位祖先元素（position 不为 static）的 padding box**

```html
<div
  class="ancestor"
  style="position: relative; width: 1000px; padding: 50px; border: 10px solid;"
>
  <div class="parent" style="width: 800px;">
    <!-- 无定位 -->
    <div class="child" style="position: absolute; width: 50%; top: 0; left: 0;">
      <!-- 包含块：ancestor 的 padding box -->
      <!-- width: 50% = (1000px - 10px*2) * 50% = 490px -->
      <!-- top: 0 和 left: 0 相对于 ancestor 的 padding 边缘 -->
    </div>
  </div>
</div>
```

**关键点**：

- 跳过所有非定位父元素，找到最近的**定位祖先**（`position` 不为 `static`）
- 包含块是该祖先的 **padding box**（包括 padding，不包括 border）
- 如果没有定位祖先，则包含块是初始包含块（通常是视口）

**对比示例**：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>绝对定位包含块示例</title>
    <style>
      .scenario {
        margin-bottom: 40px;
        border: 2px dashed #ccc;
        padding: 20px;
      }

      /* 场景一：父元素是定位元素 */
      .parent-positioned {
        position: relative;
        width: 400px;
        height: 200px;
        background-color: lightblue;
        padding: 20px;
        border: 5px solid blue;
      }

      /* 场景二：祖父元素是定位元素，父元素无定位 */
      .grandparent-positioned {
        position: relative;
        width: 400px;
        height: 300px;
        background-color: lightgreen;
        padding: 20px;
        border: 5px solid green;
      }

      .parent-not-positioned {
        width: 300px;
        height: 150px;
        background-color: lightyellow;
        padding: 10px;
        border: 3px solid yellow;
      }

      .absolute-child {
        position: absolute;
        top: 0;
        left: 0;
        width: 100px;
        height: 50px;
        background-color: coral;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
      }
    </style>
  </head>
  <body>
    <div class="scenario">
      <h3>场景一：父元素是定位元素</h3>
      <div class="parent-positioned">
        父元素 (position: relative)
        <div class="absolute-child">
          绝对定位子元素<br />
          包含块：父元素
        </div>
      </div>
    </div>

    <div class="scenario">
      <h3>场景二：祖父元素是定位元素，父元素无定位</h3>
      <div class="grandparent-positioned">
        祖父元素 (position: relative)
        <div class="parent-not-positioned">
          父元素 (position: static)
          <div class="absolute-child">
            绝对定位子元素<br />
            包含块：祖父元素
          </div>
        </div>
      </div>
    </div>
  </body>
</html>
```

**效果说明**：

- 场景一：绝对定位子元素的 `top: 0; left: 0` 相对于**父元素的 padding 边缘**
- 场景二：绝对定位子元素**跳过无定位的父元素**，`top: 0; left: 0` 相对于**祖父元素的 padding 边缘**

#### 规则三：position: fixed

**包含块 = 视口（viewport）或具有 transform/filter/perspective 属性的祖先元素**

```html
<div style="height: 2000px;">
  <div
    class="fixed-element"
    style="position: fixed; top: 20px; right: 20px; width: 200px;"
  >
    <!-- 包含块：视口 -->
    <!-- top: 20px 和 right: 20px 相对于视口 -->
    <!-- 滚动页面时，元素不会移动 -->
  </div>
</div>
```

**⚠️ 特殊情况：transform 会改变 fixed 的包含块**

```html
<div
  class="parent"
  style="transform: translateZ(0); width: 500px; height: 300px; margin: 100px;"
>
  <div class="child" style="position: fixed; top: 0; left: 0;">
    <!-- ⚠️ 包含块不是视口，而是设置了 transform 的父元素！ -->
    <!-- 这是一个常见的"坑" -->
  </div>
</div>
```

**对比示例**：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Fixed 定位包含块变化</title>
    <style>
      body {
        margin: 0;
        height: 2000px;
      }

      .container {
        width: 400px;
        height: 300px;
        margin: 100px auto;
        background-color: lightblue;
        padding: 20px;
        border: 3px solid blue;
      }

      .with-transform {
        transform: translateZ(0); /* 触发新的层叠上下文 */
      }

      .fixed-box {
        position: fixed;
        top: 20px;
        left: 20px;
        width: 150px;
        height: 100px;
        background-color: coral;
        padding: 10px;
        font-size: 14px;
      }
    </style>
  </head>
  <body>
    <h2>场景一：正常的 Fixed 定位（相对于视口）</h2>
    <div class="container">
      父容器（无 transform）
      <div class="fixed-box">
        Fixed 元素<br />
        包含块：视口<br />
        滚动页面，我不动
      </div>
    </div>

    <h2>场景二：父元素有 Transform 属性</h2>
    <div class="container with-transform">
      父容器（有 transform）
      <div class="fixed-box">
        Fixed 元素<br />
        包含块：父容器<br />
        滚动页面，我跟着动！
      </div>
    </div>

    <div style="height: 1000px;"></div>
  </body>
</html>
```

#### 规则四：position: sticky

**包含块 = 最近的滚动祖先元素的滚动区域**

```html
<div class="scroll-container" style="height: 300px; overflow-y: scroll;">
  <div style="height: 100px;"></div>

  <div
    class="sticky-element"
    style="position: sticky; top: 10px; background: yellow;"
  >
    <!-- 包含块：.scroll-container 的滚动区域 -->
    <!-- 当滚动到距离容器顶部 10px 时，元素会"粘"在那里 -->
  </div>

  <div style="height: 1000px;"></div>
</div>
```

**Sticky 定位的特点**：

- 在到达指定位置前，表现为 `relative`
- 到达指定位置后，表现为 `fixed`（相对于最近的滚动容器）
- 滚动超出包含块范围后，元素会随着包含块移动

#### 规则总结表

| position 值 | 包含块                               | 计算基准            | 典型场景           |
| ----------- | ------------------------------------ | ------------------- | ------------------ |
| `static`    | 最近的块级祖先的 content box         | 内容区域            | 默认布局           |
| `relative`  | 最近的块级祖先的 content box         | 内容区域            | 微调位置           |
| `absolute`  | 最近的定位祖先的 padding box         | 内容 + padding 区域 | 绝对定位、弹窗     |
| `fixed`     | 视口（或有 transform/filter 的祖先） | 视口                | 固定导航、返回顶部 |
| `sticky`    | 最近的滚动祖先的滚动区域             | 滚动容器            | 粘性表头           |

### 百分比尺寸与包含块

百分比尺寸的计算完全依赖于包含块。

#### 1. width 和 height 的百分比

```html
<div
  class="parent"
  style="position: relative; width: 1000px; height: 500px; padding: 50px; border: 10px solid;"
>
  <!-- 场景 A：static/relative 定位 -->
  <div class="child-A" style="position: relative; width: 50%; height: 50%;">
    <!-- 包含块：parent 的 content box -->
    <!-- width: 50% = (1000px - 50px*2 - 10px*2) * 50% = 440px -->
    <!-- height: 50% = (500px - 50px*2 - 10px*2) * 50% = 190px -->
  </div>

  <!-- 场景 B：absolute 定位 -->
  <div class="child-B" style="position: absolute; width: 50%; height: 50%;">
    <!-- 包含块：parent 的 padding box -->
    <!-- width: 50% = (1000px - 10px*2) * 50% = 490px -->
    <!-- height: 50% = (500px - 10px*2) * 50% = 240px -->
  </div>
</div>
```

#### 2. padding 和 margin 的百分比

**⚠️ 重要特性：所有方向的百分比 padding 和 margin 都基于包含块的宽度！**

```css
.parent {
  width: 1000px;
  height: 500px;
}

.child {
  /* ⚠️ 注意：所有方向都基于包含块的宽度！ */
  padding-top: 10%; /* = 1000px * 10% = 100px（不是基于高度！） */
  padding-bottom: 10%; /* = 1000px * 10% = 100px */
  padding-left: 10%; /* = 1000px * 10% = 100px */
  padding-right: 10%; /* = 1000px * 10% = 100px */

  margin-top: 5%; /* = 1000px * 5% = 50px */
  margin-bottom: 5%; /* = 1000px * 5% = 50px */
  margin-left: 5%; /* = 1000px * 5% = 50px */
  margin-right: 5%; /* = 1000px * 5% = 50px */
}
```

**为什么垂直方向也基于宽度？**

- CSS 规范为了保持一致性做的设计决策
- 这样可以确保使用相同百分比时，能得到正方形的内外边距
- 常用于实现固定宽高比的响应式容器

**实战应用：响应式宽高比容器**

```css
/* 利用 padding 的特性创建 16:9 的响应式容器 */
.video-container {
  width: 100%;
  height: 0;
  padding-bottom: 56.25%; /* 9/16 = 0.5625 */
  position: relative;
  background: #000;
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

/* 响应式正方形 */
.square {
  width: 100%;
  height: 0;
  padding-bottom: 100%; /* 正方形：1:1 */
  position: relative;
}
```

#### 3. 定位偏移（top/right/bottom/left）的百分比

```css
.parent {
  position: relative;
  width: 1000px;
  height: 500px;
}

.child {
  position: absolute;

  /* top/bottom: 相对于包含块的 height */
  top: 10%; /* = 500px * 10% = 50px */
  bottom: 20%; /* = 500px * 20% = 100px */

  /* left/right: 相对于包含块的 width */
  left: 10%; /* = 1000px * 10% = 100px */
  right: 20%; /* = 1000px * 20% = 200px */
}
```

**经典居中技巧**：

```css
.parent {
  position: relative;
  width: 800px;
  height: 600px;
}

.centered {
  position: absolute;
  top: 50%; /* 向下偏移父元素高度的 50% */
  left: 50%; /* 向右偏移父元素宽度的 50% */
  transform: translate(-50%, -50%); /* 向左上偏移自身宽高的 50% */
}
```

### 定位详解

#### Position: Static（静态定位）

**默认值**，元素按照正常文档流布局。

```css
.element {
  position: static; /* 默认值，可以省略 */
  /* top/right/bottom/left/z-index 无效 */
}
```

**特点**：

- 元素在正常文档流中
- `top/right/bottom/left` 属性无效
- `z-index` 无效
- 不创建新的层叠上下文

#### Position: Relative（相对定位）

**相对于元素自身的原始位置进行偏移**，但在文档流中仍然占据原来的空间。

```html
<div class="container">
  <div class="box">Box 1</div>
  <div class="box relative">Box 2 (Relative)</div>
  <div class="box">Box 3</div>
</div>

<style>
  .box {
    width: 100px;
    height: 100px;
    background-color: lightblue;
    margin: 10px;
  }

  .relative {
    position: relative;
    top: 20px; /* 向下偏移 20px */
    left: 30px; /* 向右偏移 30px */
    background-color: coral;
  }
  /* Box 2 向下向右偏移了，但 Box 3 仍然在 Box 2 原来的位置下方 */
</style>
```

**特点**：

- 元素仍占据文档流中的原始空间
- 通过 `top/right/bottom/left` 相对于自身原始位置偏移
- 可以使用 `z-index`
- 不影响其他元素的布局
- 常用作绝对定位子元素的定位参考（包含块）

**典型场景**：

```css
/* 微调元素位置 */
.icon {
  position: relative;
  top: 2px; /* 图标与文字对齐时的微调 */
}

/* 作为绝对定位子元素的容器 */
.card {
  position: relative; /* 为内部的绝对定位元素提供定位参考 */
}

.card .badge {
  position: absolute;
  top: -10px;
  right: -10px;
}
```

#### Position: Absolute（绝对定位）

**相对于最近的定位祖先元素进行定位**，元素脱离文档流。

```html
<div
  class="grandparent"
  style="position: relative; width: 400px; height: 300px; background: lightblue;"
>
  祖父元素 (定位祖先)

  <div
    class="parent"
    style="width: 300px; height: 200px; background: lightyellow; margin: 20px;"
  >
    父元素 (无定位)

    <div
      class="child"
      style="position: absolute; top: 10px; right: 10px; width: 100px; height: 100px; background: coral;"
    >
      绝对定位子元素
      <!-- 相对于祖父元素定位，因为父元素没有定位 -->
    </div>
  </div>
</div>
```

**特点**：

- 脱离文档流，不占据空间
- 相对于最近的**定位祖先**（`position` 不为 `static`）定位
- 如果没有定位祖先，则相对于初始包含块（`<html>`）定位
- 可以使用 `top/right/bottom/left` 进行精确定位
- 可以使用 `z-index` 控制层叠顺序
- 宽度默认由内容决定（不再是 100%）

**典型场景**：

```css
/* 模态框（Modal） */
.modal {
  position: fixed; /* 通常用 fixed，但原理类似 */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
}

/* 下拉菜单 */
.dropdown-container {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: 100%; /* 在触发元素下方 */
  left: 0;
  z-index: 10;
}

/* 角标（Badge） */
.avatar {
  position: relative;
  width: 50px;
  height: 50px;
}

.online-indicator {
  position: absolute;
  top: 0;
  right: 0;
  width: 12px;
  height: 12px;
  background: green;
  border-radius: 50%;
}
```

#### Position: Fixed（固定定位）

**相对于视口进行定位**，滚动页面时元素位置不变。

```html
<div
  class="fixed-header"
  style="position: fixed; top: 0; left: 0; width: 100%; height: 60px; background: #333; color: white; z-index: 100;"
>
  固定头部导航栏
  <!-- 滚动页面时，始终在视口顶部 -->
</div>

<div class="content" style="margin-top: 60px; height: 2000px;">页面内容...</div>
```

**特点**：

- 相对于**视口**定位
- 脱离文档流
- 滚动页面时位置不变
- ⚠️ 如果祖先元素有 `transform`、`perspective`、`filter` 等属性，包含块会变成该祖先元素

**典型场景**：

```css
/* 固定导航栏 */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}

/* 返回顶部按钮 */
.back-to-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  z-index: 999;
}

/* 悬浮操作面板 */
.floating-panel {
  position: fixed;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
}
```

**⚠️ 常见陷阱：Transform 改变 Fixed 的包含块**

```html
<div class="container" style="transform: translateZ(0);">
  <div class="fixed-element" style="position: fixed; top: 0; left: 0;">
    <!-- ⚠️ 这个元素不会固定在视口，而是相对于 .container -->
  </div>
</div>
```

**解决方案**：

```html
<!-- 将 fixed 元素移到没有 transform 的父元素外 -->
<div class="fixed-element" style="position: fixed; top: 0; left: 0;">
  固定元素
</div>

<div class="container" style="transform: translateZ(0);">普通内容</div>
```

#### Position: Sticky（粘性定位）

**相对定位和固定定位的混合体**，元素在到达指定位置前表现为相对定位，之后表现为固定定位。

```html
<div
  class="scroll-container"
  style="height: 400px; overflow-y: scroll; border: 2px solid #ccc;"
>
  <div style="height: 100px; background: lightblue;">顶部内容</div>

  <div
    class="sticky-header"
    style="position: sticky; top: 0; background: coral; padding: 10px;"
  >
    粘性表头（滚动到容器顶部后会"粘"住）
  </div>

  <div style="height: 1000px; background: lightgreen;">可滚动内容...</div>
</div>
```

**特点**：

- 在到达 `top/right/bottom/left` 指定位置前，表现为 `relative`
- 到达指定位置后，表现为 `fixed`（相对于最近的滚动容器）
- 不脱离文档流（始终占据空间）
- 必须指定 `top/right/bottom/left` 中的至少一个值才生效
- 包含块是最近的滚动祖先元素

**典型场景**：

```css
/* 粘性表头 */
.table-header {
  position: sticky;
  top: 0;
  background: white;
  z-index: 10;
}

/* 侧边栏目录（滚动时跟随，但不超出容器） */
.sidebar {
  position: sticky;
  top: 20px;
  max-height: calc(100vh - 40px);
  overflow-y: auto;
}

/* 分类标题 */
.category-title {
  position: sticky;
  top: 60px; /* 在固定导航栏下方 */
  background: white;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
}
```

**⚠️ Sticky 常见问题**

**问题 1：父元素有 overflow: hidden/auto/scroll**

```html
<!-- ❌ 不生效：父元素有 overflow -->
<div style="overflow: hidden;">
  <div style="position: sticky; top: 0;">不会粘住！</div>
</div>

<!-- ✅ 生效：滚动容器在祖先元素 -->
<div style="height: 300px; overflow-y: scroll;">
  <div>
    <div style="position: sticky; top: 0;">会粘住！</div>
  </div>
</div>
```

**问题 2：父元素高度不足**

```html
<!-- ❌ 不生效：父元素高度等于 sticky 元素高度 -->
<div style="height: 50px;">
  <div style="position: sticky; top: 0; height: 50px;">
    没有滚动空间，不会粘住！
  </div>
</div>
```

**问题 3：没有指定偏移值**

```css
/* ❌ 不生效 */
.sticky {
  position: sticky;
  /* 必须指定 top/right/bottom/left 之一 */
}

/* ✅ 生效 */
.sticky {
  position: sticky;
  top: 0;
}
```

### 定位对比总结

| position   | 是否脱离文档流 | 定位参考                     | 偏移属性 | z-index | 典型场景             |
| ---------- | -------------- | ---------------------------- | -------- | ------- | -------------------- |
| `static`   | ❌             | -                            | ❌       | ❌      | 默认布局             |
| `relative` | ❌             | 自身原始位置                 | ✅       | ✅      | 微调、作为定位容器   |
| `absolute` | ✅             | 最近的定位祖先               | ✅       | ✅      | 弹窗、下拉菜单、角标 |
| `fixed`    | ✅             | 视口（或 transform 祖先）    | ✅       | ✅      | 固定导航、返回顶部   |
| `sticky`   | ❌             | 最近的滚动祖先（到达阈值后） | ✅       | ✅      | 粘性表头、侧边栏目录 |

## 总结备忘

### 核心要点

#### 1. 包含块的本质

- **包含块是一个矩形参照区域**，用于尺寸计算和定位
- **包含块 ≠ 父元素**，由元素的 `position` 值决定
- 理解包含块是理解 CSS 布局的关键

#### 2. 包含块的确定规则速记

| position 值 | 包含块                                       | 盒子类型        |
| ----------- | -------------------------------------------- | --------------- |
| static      | 最近的块级祖先                               | content box     |
| relative    | 最近的块级祖先                               | content box     |
| absolute    | 最近的**定位**祖先（非 static）              | **padding box** |
| fixed       | 视口（或 transform/filter/perspective 祖先） | 视口            |
| sticky      | 最近的滚动祖先                               | 滚动容器        |

#### 3. 百分比计算规则速记

| 属性                   | 相对于包含块的 | 特殊性                                           |
| ---------------------- | -------------- | ------------------------------------------------ |
| `width`                | 宽度           | -                                                |
| `height`               | 高度           | 父元素需要明确高度                               |
| `padding`（所有方向）  | **宽度**       | ⚠️ 垂直方向也是宽度！                            |
| `margin`（所有方向）   | **宽度**       | ⚠️ 垂直方向也是宽度！                            |
| `top` / `bottom`       | 高度           | -                                                |
| `left` / `right`       | 宽度           | -                                                |
| `transform: translate` | 自身尺寸       | translateX 相对自身宽度，translateY 相对自身高度 |

#### 4. 定位方式选择指南

```
需要元素脱离文档流？
├─ 否 → 使用 static / relative
│  ├─ 需要微调位置？ → relative
│  └─ 默认布局 → static
│
└─ 是 → 继续判断
   ├─ 需要固定在视口？ → fixed
   ├─ 相对于某个容器定位？ → absolute
   └─ 滚动到某处后固定？ → sticky
```

### 最佳实践

#### 1. 为绝对定位子元素提供定位参考

```css
/* ✅ 推荐模式 */
.card {
  position: relative; /* 作为定位参考 */
}

.card .badge {
  position: absolute;
  top: -8px;
  right: -8px;
}
```

#### 2. 固定定位元素避免 transform 陷阱

```html
<!-- ❌ 问题：fixed 元素在有 transform 的容器内 -->
<div style="transform: translateZ(0);">
  <div style="position: fixed; top: 0;">不会固定在视口！</div>
</div>

<!-- ✅ 解决：fixed 元素移到外层 -->
<div style="position: fixed; top: 0;">固定元素</div>
<div style="transform: translateZ(0);">普通内容</div>
```

#### 3. Sticky 定位的正确姿势

```css
/* ✅ 确保 sticky 生效 */
.sticky-element {
  position: sticky;
  top: 0; /* 必须指定偏移值 */
  z-index: 10; /* 避免被其他元素覆盖 */
}

/* 确保父元素没有 overflow: hidden */
/* 确保父元素有足够的滚动空间 */
```

#### 4. 响应式宽高比容器

```css
/* 利用百分比 padding 基于宽度的特性 */
.aspect-ratio {
  width: 100%;
  height: 0;
  padding-bottom: 56.25%; /* 16:9 */
  position: relative;
}

.aspect-ratio > * {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
```

### 常见问题速查

#### Q1: 为什么 height: 100% 不生效？

**原因**：父元素没有明确的高度。

```css
/* ❌ 不生效 */
.parent {
  /* height 未设置 */
}
.child {
  height: 100%; /* 无法计算 */
}

/* ✅ 解决方案 1 */
html,
body {
  height: 100%;
}
.parent {
  height: 100%;
}
.child {
  height: 100%;
}

/* ✅ 解决方案 2 */
.child {
  height: 100vh; /* 使用视口单位 */
}

/* ✅ 解决方案 3 */
.parent {
  display: flex;
  min-height: 100vh;
}
.child {
  flex: 1;
}
```

#### Q2: 绝对定位元素为什么不相对于父元素定位？

**原因**：父元素的 `position` 是 `static`（默认值）。

```html
<!-- ❌ 问题 -->
<div class="parent">
  <div class="child" style="position: absolute; top: 0;">相对于谁定位？</div>
</div>

<!-- ✅ 解决 -->
<div class="parent" style="position: relative;">
  <div class="child" style="position: absolute; top: 0;">
    相对于 .parent 定位
  </div>
</div>
```

#### Q3: Fixed 元素为什么不固定在视口？

**原因**：祖先元素有 `transform`、`perspective`、`filter` 等属性。

```html
<!-- ❌ 问题 -->
<div style="transform: translateZ(0);">
  <div style="position: fixed; top: 0;">不固定在视口！</div>
</div>

<!-- ✅ 解决 -->
<div style="position: fixed; top: 0;">固定在视口</div>
```

#### Q4: Sticky 元素为什么不粘住？

**常见原因**：

1. **没有指定偏移值**：

```css
/* ❌ */
.sticky {
  position: sticky;
}

/* ✅ */
.sticky {
  position: sticky;
  top: 0;
}
```

2. **父元素有 overflow: hidden**：

```html
<!-- ❌ -->
<div style="overflow: hidden;">
  <div style="position: sticky; top: 0;">不粘住</div>
</div>
```

3. **父元素高度不足**：

```html
<!-- ❌ 父元素高度等于 sticky 元素高度 -->
<div style="height: 50px;">
  <div style="position: sticky; top: 0; height: 50px;">无滚动空间</div>
</div>
```

### 调试技巧

#### 1. 可视化包含块

```css
/* 给定位祖先添加背景色，帮助理解包含块 */
.positioning-context {
  position: relative;
  background-color: rgba(255, 0, 0, 0.1); /* 半透明红色 */
  border: 2px dashed red;
}
```

#### 2. 检查定位参考

```javascript
// 浏览器控制台中检查元素的定位参考
const element = document.querySelector('.my-element');
console.log('Position:', getComputedStyle(element).position);

// 找到绝对定位元素的定位祖先
function findPositioningAncestor(element) {
  let parent = element.parentElement;
  while (parent) {
    const position = getComputedStyle(parent).position;
    if (position !== 'static') {
      return parent;
    }
    parent = parent.parentElement;
  }
  return document.documentElement; // 初始包含块
}
```

#### 3. 使用浏览器开发者工具

- **Chrome DevTools**：选中元素后，查看 `Computed` 面板的 `position` 值
- **Layout 面板**：可视化元素的盒模型和定位关系
- **Layers 面板**：查看层叠上下文和渲染层

### 参考资料

- [MDN - Containing Block](https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block)
- [MDN - Position](https://developer.mozilla.org/en-US/docs/Web/CSS/position)
- [W3C CSS 2.2 规范 - Visual formatting model details](https://www.w3.org/TR/CSS2/visudet.html)
- [W3C CSS Positioned Layout Module Level 3](https://www.w3.org/TR/css-position-3/)
