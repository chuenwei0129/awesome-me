---
group:
  title: css
  order: 2
title: CSS 单位
toc: content
order: 1
---

## 概述

CSS 单位是前端开发中最基础但也最容易出错的部分。选择正确的单位不仅影响页面的视觉效果，还关系到响应式设计、可访问性和用户体验。

CSS 单位主要分为两大类：

- **绝对单位**：固定大小，不受其他因素影响（如 `px`）
- **相对单位**：相对于其他值计算（如 `em`、`rem`、`%`、`vh`、`vw` 等）

## 单位快速对比

| 单位   | 类型 | 相对于               | 常用场景             | 响应式 |
| ------ | ---- | -------------------- | -------------------- | ------ |
| `px`   | 绝对 |                      | 边框、阴影、精确设计 | ❌     |
| `em`   | 相对 | 当前元素 `font-size` | 组件内部间距         | ✅     |
| `rem`  | 相对 | 根元素 `font-size`   | 全局字体、间距系统   | ✅     |
| `%`    | 相对 | 父元素对应属性       | 布局、宽度           | ✅     |
| `vh`   | 相对 | 视口高度             | 全屏布局、移动端     | ✅     |
| `vw`   | 相对 | 视口宽度             | 全屏宽度、流式排版   | ✅     |
| `vmin` | 相对 | 视口较小边           | 正方形布局           | ✅     |
| `vmax` | 相对 | 视口较大边           | 特殊响应式场景       | ✅     |

## 绝对单位

### px（像素）

`px` 是最常用的绝对单位，代表屏幕上的一个物理像素点（在标准屏幕上）。

**特点：**

- 精确可控，所见即所得
- 不受其他因素影响
- 在高清屏（Retina）上，1px 可能对应多个物理像素

**适用场景：**

```css
/* ✅ 适合用 px 的场景 */
.border {
  border: 1px solid #ccc; /* 边框：需要精确细线 */
}

.shadow {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* 阴影：固定效果 */
}

.icon {
  width: 24px; /* 图标：设计稿精确尺寸 */
  height: 24px;
}
```

**不适合的场景：**

```css
/* ❌ 不推荐用 px 的场景 */
.text {
  font-size: 16px; /* 字体：应该用 rem，便于用户调整 */
  margin: 20px; /* 间距：应该用 rem，保持比例 */
}
```

## 相对单位（字体相关）

### em

`em` 相对于**当前元素**的 `font-size` 计算。如果当前元素没有设置 `font-size`，则相对于父元素。

**计算规则：**

```html
<div class="parent">
  <div class="child">文本</div>
</div>
```

```css
.parent {
  font-size: 20px;
}

.child {
  /* 没有设置 font-size，继承父元素的 20px */
  padding: 1em; /* 20px */
  border-width: 0.5em; /* 10px */
}

.child-with-font {
  font-size: 30px; /* 设置了自己的 font-size */
  padding: 1em; /* 30px - 基于自身的 font-size */
  margin: 2em; /* 60px */
}
```

**实战示例：按钮组件**

```css
/* 使用 em 创建可缩放的按钮 */
.button {
  font-size: 16px; /* 基准字号 */
  padding: 0.5em 1em; /* 8px 16px */
  border-radius: 0.25em; /* 4px */
  border: 0.0625em solid; /* 1px */
}

/* 大按钮：只需改变 font-size，其他尺寸自动缩放 */
.button--large {
  font-size: 20px; /* 所有基于 em 的值都会等比例放大 */
  /* padding: 10px 20px */
  /* border-radius: 5px */
}

/* 小按钮 */
.button--small {
  font-size: 12px;
  /* padding: 6px 12px */
  /* border-radius: 3px */
}
```

**优点：**

- 组件内部尺寸保持比例
- 适合创建可缩放的组件

**缺点：**

- 嵌套计算复杂，容易出错
- 难以维护和预测

**避免嵌套陷阱：**

```html
<div class="level-1">
  <div class="level-2">
    <div class="level-3">文本</div>
  </div>
</div>
```

```css
/* ❌ 错误：嵌套使用 em 导致计算复杂 */
.level-1 {
  font-size: 1.2em;
} /* 假设根元素 16px：16 * 1.2 = 19.2px */
.level-2 {
  font-size: 1.2em;
} /* 19.2 * 1.2 = 23.04px */
.level-3 {
  font-size: 1.2em;
} /* 23.04 * 1.2 = 27.648px (不可控!) */

/* ✅ 正确：使用 rem 避免嵌套问题 */
.level-1 {
  font-size: 1.2rem;
} /* 16 * 1.2 = 19.2px */
.level-2 {
  font-size: 1.2rem;
} /* 16 * 1.2 = 19.2px */
.level-3 {
  font-size: 1.2rem;
} /* 16 * 1.2 = 19.2px (可预测) */
```

### rem

`rem`（root em）相对于**根元素**（`<html>`）的 `font-size` 计算，默认是 `16px`。

**基础用法：**

```css
/* 设置根元素字号 */
html {
  font-size: 16px; /* 1rem = 16px */
}

.container {
  font-size: 1.25rem; /* 20px */
  padding: 2rem; /* 32px */
  margin-bottom: 1.5rem; /* 24px */
}
```

**实战技巧：使用 62.5% 基准**

```css
/* 方便计算：让 1rem = 10px */
html {
  font-size: 62.5%; /* 16px * 0.625 = 10px */
}

body {
  font-size: 1.6rem; /* 16px - 重置 body 为正常大小 */
}

.heading {
  font-size: 2.4rem; /* 24px - 容易计算 */
  margin-bottom: 1.6rem; /* 16px */
}

.text {
  font-size: 1.4rem; /* 14px */
  line-height: 1.5;
}
```

**响应式字体系统：**

```css
/* 移动优先的响应式字体 */
html {
  font-size: 14px; /* 小屏：1rem = 14px */
}

@media (min-width: 768px) {
  html {
    font-size: 16px; /* 中屏：1rem = 16px */
  }
}

@media (min-width: 1200px) {
  html {
    font-size: 18px; /* 大屏：1rem = 18px */
  }
}

/* 所有使用 rem 的元素都会自动缩放 */
.title {
  font-size: 2rem; /* 28px → 32px → 36px */
}

.text {
  font-size: 1rem; /* 14px → 16px → 18px */
  padding: 1.5rem; /* 21px → 24px → 27px */
}
```

**优点：**

- 计算简单，可预测
- 便于实现全局响应式
- 用户可以调整浏览器字体大小（无障碍友好）

**缺点：**

- 需要设置根元素字号
- 组件无法独立控制缩放（这时用 `em`）

### em vs rem 选择指南

```css
/* ✅ 使用 rem 的场景 */
body {
  font-size: 1rem; /* 全局字体 */
  line-height: 1.5;
}

.container {
  padding: 2rem; /* 全局间距系统 */
  margin-bottom: 1.5rem;
}

.heading-1 {
  font-size: 2.5rem;
} /* 标题字号 */
.heading-2 {
  font-size: 2rem;
}
.heading-3 {
  font-size: 1.75rem;
}

/* ✅ 使用 em 的场景 */
.button {
  font-size: 1rem; /* 基准用 rem */
  padding: 0.5em 1em; /* 内部间距用 em，保持比例 */
  border-radius: 0.25em; /* 圆角也用 em */
}

.icon {
  width: 1em; /* 图标大小跟随文字 */
  height: 1em;
  margin-right: 0.5em;
}

/* 媒体查询的 em（基于浏览器默认字号 16px） */
@media (min-width: 48em) {
  /* 768px */
  /* ... */
}
```

## 百分比单位（%）

百分比是相对于**父元素对应属性**的值进行计算。不同属性的参照对象不同。

### 1. 盒模型中的百分比

```css
.parent {
  width: 1000px;
  height: 500px;
}

.child {
  /* 宽度相关：相对于父元素的 width */
  width: 50%; /* 500px */
  max-width: 80%; /* 800px */
  min-width: 30%; /* 300px */

  /* ⚠️ 特殊：padding 和 margin 的垂直值也相对于父元素的 width！ */
  padding: 10%; /* 上下左右都是 100px (1000px * 10%) */
  margin: 5%; /* 上下左右都是 50px */

  /* 高度相关：相对于父元素的 height */
  /* ⚠️ 注意：父元素必须有明确的 height */
  height: 60%; /* 300px */
}
```

**实战：响应式正方形**

```css
/* 利用 padding 的特性创建响应式正方形 */
.square {
  width: 100%;
  height: 0;
  padding-bottom: 100%; /* 相对于自身 width，实现正方形 */
  position: relative;
  background: #f0f0f0;
}

.square__content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

/* 响应式 16:9 视频容器 */
.video-wrapper {
  width: 100%;
  height: 0;
  padding-bottom: 56.25%; /* 9/16 = 0.5625 */
  position: relative;
}

.video-wrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
```

### 2. 文本中的百分比

```css
.parent {
  font-size: 16px;
}

.child {
  /* font-size: 相对于父元素的 font-size */
  font-size: 150%; /* 24px */

  /* line-height: 相对于自身的 font-size */
  line-height: 150%; /* 24px * 1.5 = 36px */

  /* text-indent: 相对于容器宽度 */
  text-indent: 10%;
}
```

### 3. 定位中的百分比

```css
.relative-parent {
  position: relative;
  width: 400px;
  height: 300px;
}

.absolute-child {
  position: absolute;

  /* top/bottom: 相对于包含块的 height */
  top: 50%; /* 150px */

  /* left/right: 相对于包含块的 width */
  left: 50%; /* 200px */

  /* 经典居中技巧 */
  transform: translate(-50%, -50%);
}
```

**实战：垂直居中**

```html
<div class="container">
  <div class="centered">居中内容</div>
</div>
```

```css
/* 方法 1：定位 + 百分比 + transform */
.container {
  position: relative;
  height: 400px;
}

.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* 方法 2：Flexbox（推荐） */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
}
```

### 4. 变换中的百分比

```css
.element {
  width: 200px;
  height: 100px;

  /* translateX: 相对于自身 width */
  transform: translateX(50%); /* 移动 100px */

  /* translateY: 相对于自身 height */
  transform: translateY(100%); /* 移动 100px */

  /* ❌ translateZ 不接受百分比 */
  /* transform: translateZ(50%); 无效! */
}
```

## 视口单位（Viewport Units）

视口单位相对于**浏览器视口**大小，非常适合移动端和响应式设计。

### vh（Viewport Height）

`1vh` = 视口高度的 1%

```css
/* 全屏 Hero 区域 */
.hero {
  height: 100vh; /* 占满整个视口高度 */
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* 分屏布局 */
.section {
  min-height: 100vh; /* 每个 section 至少占一屏 */
}

/* 固定头部 + 内容区 */
.header {
  height: 60px;
  position: fixed;
  top: 0;
  width: 100%;
}

.main {
  height: calc(100vh - 60px); /* 视口高度减去头部高度 */
  margin-top: 60px;
  overflow-y: auto;
}
```

### vw（Viewport Width）

`1vw` = 视口宽度的 1%

```css
/* 流式字体（响应式字体） */
.title {
  font-size: 5vw; /* 在不同屏幕宽度下自动缩放 */

  /* 配合 clamp() 限制最小和最大值 */
  font-size: clamp(24px, 5vw, 60px);
  /* 最小 24px，理想 5vw，最大 60px */
}

/* 全宽容器（突破父容器限制） */
.full-width {
  width: 100vw;
  margin-left: calc(-50vw + 50%); /* 居中的全宽 */
}
```

### vmin 和 vmax

- `vmin`：取 `vh` 和 `vw` 中的**较小值**
- `vmax`：取 `vh` 和 `vw` 中的**较大值**

```css
/* 示例：视口 1200px × 800px */
/* 1vmin = 8px (800 的 1%) */
/* 1vmax = 12px (1200 的 1%) */

/* 使用 vmin 保证正方形在任何方向都合适 */
.square {
  width: 50vmin; /* 横屏和竖屏都能显示良好 */
  height: 50vmin;
}

/* 响应式图标 */
.icon {
  width: 10vmin;
  height: 10vmin;
  min-width: 24px; /* 设置最小值防止太小 */
  min-height: 24px;
}
```

**实战：移动端 100vh 的坑**

```css
/* ❌ 问题：移动端浏览器地址栏会影响 100vh */
.mobile-hero {
  height: 100vh;  /* iOS Safari 会包含地址栏高度，导致底部被遮挡 */
}

/* ✅ 解决方案 1：使用 JS 设置真实高度 */
/* JavaScript */
const setVh = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};

window.addEventListener('resize', setVh);
setVh();

/* CSS */
.mobile-hero {
  height: calc(var(--vh, 1vh) * 100);
}

/* ✅ 解决方案 2：使用新的 dvh 单位（动态视口高度） */
.mobile-hero {
  height: 100dvh;  /* 浏览器支持：Chrome 108+, Safari 15.4+ */
}
```

## 其他实用单位

### ch（字符宽度）

`1ch` = 数字 `0` 的宽度

```css
/* 限制文本宽度，提高可读性 */
.article {
  max-width: 65ch; /* 每行约 65 个字符，最佳阅读宽度 */
  margin: 0 auto;
}

/* 等宽字体的精确布局 */
.code {
  font-family: 'Courier New', monospace;
  width: 80ch; /* 代码编辑器通常 80 列 */
}
```

### ex（x 高度）

`1ex` = 小写字母 `x` 的高度

```css
/* 垂直对齐图标（少用） */
.icon {
  height: 1ex;
  vertical-align: baseline;
}
```

## 实战场景与最佳实践

### 1. 构建响应式设计系统

```css
/* 使用 CSS 变量 + rem 构建设计系统 */
:root {
  /* 间距系统 */
  --spacing-xs: 0.25rem; /* 4px */
  --spacing-sm: 0.5rem; /* 8px */
  --spacing-md: 1rem; /* 16px */
  --spacing-lg: 1.5rem; /* 24px */
  --spacing-xl: 2rem; /* 32px */
  --spacing-2xl: 3rem; /* 48px */

  /* 字体系统 */
  --font-xs: 0.75rem; /* 12px */
  --font-sm: 0.875rem; /* 14px */
  --font-base: 1rem; /* 16px */
  --font-lg: 1.125rem; /* 18px */
  --font-xl: 1.25rem; /* 20px */
  --font-2xl: 1.5rem; /* 24px */
  --font-3xl: 2rem; /* 32px */
}

/* 使用 */
.card {
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-md);
  font-size: var(--font-base);
}

.title {
  font-size: var(--font-2xl);
  margin-bottom: var(--spacing-sm);
}
```

### 2. 移动端适配方案

```css
/* 方案 1：rem + viewport（推荐） */
html {
  font-size: 16px;
}

@media (max-width: 768px) {
  html {
    font-size: 14px; /* 移动端缩小 */
  }
}

/* 方案 2：vw 单位（灵活） */
.container {
  padding: 4vw; /* 移动端 4%，桌面端 4% */
  max-width: 1200px;
}

/* 方案 3：clamp() 流式排版 */
.heading {
  font-size: clamp(1.5rem, 4vw, 3rem);
  /* 移动端 1.5rem，桌面端最大 3rem，中间平滑过渡 */
}
```

### 3. 垂直节奏（Vertical Rhythm）

```css
/* 使用 rem 保持垂直间距一致 */
html {
  font-size: 16px;
  line-height: 1.5; /* 24px */
}

h1 {
  font-size: 2rem; /* 32px */
  line-height: 1.25; /* 40px */
  margin-bottom: 1.5rem; /* 24px - 保持基线网格 */
}

p {
  font-size: 1rem; /* 16px */
  line-height: 1.5; /* 24px */
  margin-bottom: 1.5rem; /* 24px */
}

.section {
  margin-bottom: 3rem; /* 48px = 24px × 2 */
}
```

### 4. 组件缩放

```css
/* 使用 em 创建可缩放组件 */
.badge {
  --size: 1rem; /* 通过 CSS 变量控制整体大小 */

  font-size: var(--size);
  padding: 0.25em 0.5em;
  border-radius: 0.25em;
  line-height: 1;
}

/* 不同尺寸 */
.badge--sm {
  --size: 0.75rem;
}
.badge--lg {
  --size: 1.25rem;
}
.badge--xl {
  --size: 1.5rem;
}
```

## 常见问题与解决方案

### Q1: 为什么 height: 100% 不生效？

```css
/* ❌ 不生效：父元素没有明确的 height */
.parent {
  /* height 未设置 */
}

.child {
  height: 100%; /* 无法计算！ */
}

/* ✅ 解决方案 1：给父元素设置高度 */
.parent {
  height: 500px; /* 或 100vh */
}

.child {
  height: 100%; /* 现在是 500px */
}

/* ✅ 解决方案 2：使用 Flexbox */
.parent {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.child {
  flex: 1; /* 自动填充剩余空间 */
}
```

### Q2: rem 和 em 在媒体查询中如何选择？

```css
/* 推荐使用 em：基于浏览器默认字号（通常 16px），尊重用户设置 */
@media (min-width: 48em) {
  /* 768px */
  /* ... */
}

@media (min-width: 64em) {
  /* 1024px */
  /* ... */
}

/* ❌ 不推荐用 rem：会受 html { font-size } 影响 */
@media (min-width: 48rem) {
  /* 如果 html { font-size: 10px; }，断点变成 480px！ */
}
```

### Q3: 什么时候用 px，什么时候用 rem？

```css
/* ✅ 用 px 的场景 */
.element {
  border: 1px solid #ccc; /* 边框：需要细线 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 阴影：固定效果 */
  outline: 2px solid blue; /* 轮廓 */
}

/* ✅ 用 rem 的场景 */
.element {
  font-size: 1rem; /* 字体：响应式 */
  padding: 1.5rem; /* 间距：保持比例 */
  margin-bottom: 2rem; /* 外边距 */
  border-radius: 0.5rem; /* 圆角：相对大小 */
}
```

### Q4: 如何避免 em 嵌套问题？

```css
/* ❌ 问题：嵌套使用 em */
ul {
  font-size: 1.2em;
}

ul ul {
  font-size: 1.2em; /* 1.2 × 1.2 = 1.44em */
}

ul ul ul {
  font-size: 1.2em; /* 1.44 × 1.2 = 1.728em (失控!) */
}

/* ✅ 解决方案 1：使用 rem */
ul {
  font-size: 1.2rem; /* 所有层级都是 1.2rem */
}

/* ✅ 解决方案 2：重置嵌套 */
ul {
  font-size: 1.2em;
}

ul ul {
  font-size: 1em; /* 重置为父元素大小 */
}
```

### Q5: 移动端 1px 边框太粗？

```css
/* 问题：高清屏（2倍屏）上，1px 显示为 2 物理像素 */

/* ✅ 解决方案 1：使用 transform */
.border-1px {
  position: relative;
}

.border-1px::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1px;
  background: #ccc;
  transform: scaleY(0.5); /* 缩放到 0.5 倍 */
}

/* ✅ 解决方案 2：使用 box-shadow */
.border-1px {
  box-shadow: 0 1px 0 0 #ccc;
}

/* ✅ 解决方案 3：使用渐变 */
.border-1px {
  background-image: linear-gradient(to bottom, #ccc 50%, transparent 50%);
  background-size: 100% 1px;
  background-repeat: no-repeat;
  background-position: bottom;
}
```

## 单位选择决策树

```
需要固定像素值（边框、阴影）？
├─ 是 → 使用 px
└─ 否 → 继续

需要响应式字体/间距？
├─ 是 → 使用 rem（全局） 或 em（组件内）
└─ 否 → 继续

需要相对于父元素？
├─ 宽度/布局 → 使用 %
├─ 字体 → 使用 em
└─ 继续

需要相对于视口？
├─ 高度 → 使用 vh
├─ 宽度 → 使用 vw
├─ 正方形 → 使用 vmin
└─ 其他 → 根据具体场景选择
```

## 总结

**记住这些原则：**

1. **字体和间距用 `rem`** - 便于全局缩放和无障碍访问
2. **组件内部用 `em`** - 保持组件尺寸比例
3. **边框和阴影用 `px`** - 需要精确控制
4. **布局用 `%` 或 `fr`（Grid）** - 灵活响应式
5. **视口相关用 `vh`/`vw`** - 全屏和移动端
6. **优先使用相对单位** - 提高可维护性和可访问性

**推荐的单位组合：**

```css
/* 现代推荐配置 */
html {
  font-size: 16px; /* 或 62.5% */
}

.component {
  /* 字体 */
  font-size: 1rem; /* rem - 全局一致 */

  /* 间距 */
  padding: 1.5rem; /* rem - 响应式 */
  margin: 2rem 0;

  /* 边框 */
  border: 1px solid #ccc; /* px - 精确 */
  border-radius: 0.5rem; /* rem - 相对 */

  /* 布局 */
  width: 100%; /* % - 流式 */
  max-width: 1200px; /* px - 限制最大 */

  /* 阴影 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* px */
}

/* 组件内部 */
.button {
  font-size: 1rem; /* rem - 基准 */
  padding: 0.5em 1em; /* em - 跟随基准缩放 */
}
```

选择正确的单位不是死记硬背，而是理解每个单位的特性，根据具体场景做出最佳选择。
