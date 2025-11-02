---
group:
  title: CSS
  order: 2
title: 浏览器默认样式
toc: content
---

## 为什么需要了解浏览器默认样式

浏览器为 HTML 元素提供了一套默认样式（User Agent Stylesheet），但这些样式：

- 在不同浏览器间存在差异
- 往往不符合现代设计需求
- 会导致意外的布局问题

通过 [TailwindCSS v3.4.4 的 CSS Reset 方案](./css__bem-naming-guide.md)，我们可以系统性地了解浏览器默认样式的问题，以及如何正确重置它们。

本文按照 **二八原则** 组织：重点详解 80% 开发中最常遇到的样式重置，简要介绍 20% 不常用的样式。

## 核心样式重置（80% 必须掌握）

### 1. 盒模型 - 最重要的重置 ⭐️⭐️⭐️

```css
*,
::before,
::after {
  box-sizing: border-box; /* 防止内边距和边框影响元素宽度 */
  border-width: 0; /* 移除默认边框宽度 */
  border-style: solid; /* 设置边框样式 */
  border-color: #e5e7eb; /* 统一边框颜色 */
}
```

**浏览器默认问题**：

浏览器默认使用 `box-sizing: content-box`，这会导致宽度计算不直观：

```css
/* 浏览器默认行为 */
.box {
  width: 200px;
  padding: 20px;
  border: 2px solid;
  /* 实际宽度 = 200 + 20*2 + 2*2 = 244px ❌ */
}

/* 使用 border-box */
.box {
  box-sizing: border-box;
  width: 200px;
  padding: 20px;
  border: 2px solid;
  /* 实际宽度 = 200px ✅ */
}
```

**为什么重要**：

- 让宽度计算符合直觉：`width = content + padding + border`
- 响应式布局的基础（如 `width: 100%` 不会因为 padding 而溢出）
- 几乎所有现代 CSS 框架都使用这个重置

---

### 2. 字体与排版 ⭐️⭐️⭐️

#### HTML 根元素

```css
html {
  line-height: 1.5; /* 合理的行高，提升可读性 */
  -webkit-text-size-adjust: 100%; /* 防止 iOS 横屏时字体缩放 */
  font-family: ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji',
    'Segoe UI Emoji', 'Noto Color Emoji';
  -webkit-tap-highlight-color: transparent; /* 移除移动端点击高亮 */
}
```

**浏览器默认问题**：

- 默认 `line-height` 约为 1.2，文字过于紧凑，可读性差
- iOS Safari 横屏时会自动放大字体，破坏布局
- 移动端点击会出现蓝色高亮，影响用户体验

**实际对比**：

```css
/* 浏览器默认 */
p {
  line-height: 1.2; /* 行间距太小，阅读累 ❌ */
}

/* 推荐设置 */
p {
  line-height: 1.5; /* 舒适的阅读体验 ✅ */
}
```

#### 标题重置

```css
h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: inherit; /* 移除默认字体大小 */
  font-weight: inherit; /* 移除默认粗体 */
}
```

**浏览器默认行为**：

```css
/* 浏览器默认 */
h1 {
  font-size: 2em;
  font-weight: bold;
} /* 32px */
h2 {
  font-size: 1.5em;
  font-weight: bold;
} /* 24px */
h3 {
  font-size: 1.17em;
  font-weight: bold;
} /* 18.72px */
/* ...不同浏览器可能略有差异 */
```

**为什么重置**：

- 现代设计系统在组件级别控制字体，而不是依赖标签默认样式
- 避免"为了样式而选择标签"的反模式
- 保持语义化（用 h1-h6 表示层级）的同时，样式完全可控

---

### 3. 间距重置 - margin 和 padding ⭐️⭐️⭐️

```css
body {
  margin: 0; /* 移除默认的 8px 外边距 */
  line-height: inherit; /* 从 html 继承行高 */
}

/* 移除常用元素的默认间距 */
blockquote,
dl,
dd,
h1,
h2,
h3,
h4,
h5,
h6,
hr,
figure,
p,
pre {
  margin: 0;
}

fieldset {
  margin: 0;
  padding: 0;
}

ol,
ul,
menu {
  list-style: none; /* 移除列表样式 */
  margin: 0;
  padding: 0;
}
```

**浏览器默认问题**：

```css
/* 浏览器默认 */
body {
  margin: 8px;
} /* 页面四周有空隙 */
h1 {
  margin: 0.67em 0;
} /* 约 21.44px 上下边距 */
p {
  margin: 1em 0;
} /* 16px 上下边距 */
ul {
  margin: 1em 0;
  padding-left: 40px; /* 左侧缩进 */
  list-style: disc; /* 实心圆点 */
}
```

**为什么重置**：

- `body` 的 8px 外边距会导致页面不能完全占满视口
- 不同元素的默认间距不一致，难以形成统一的设计系统
- 现代布局（Flexbox/Grid）更倾向于在容器级别用 `gap` 控制间距

**实际示例**：

```html
<!-- 浏览器默认：页面四周有 8px 空隙 ❌ -->
<body>
  <header>顶部导航</header>
</body>

<!-- 重置后：完全占满视口 ✅ -->
<body style="margin: 0">
  <header>顶部导航</header>
</body>
```

---

### 4. 表单元素 - 最复杂的重置 ⭐️⭐️⭐️

```css
button,
input,
optgroup,
select,
textarea {
  font-family: inherit; /* 继承字体 */
  font-size: 100%; /* 默认字体大小不一致 */
  font-weight: inherit;
  line-height: inherit;
  color: inherit;
  margin: 0;
  padding: 0;
}

button,
input:where([type='button']),
input:where([type='reset']),
input:where([type='submit']) {
  -webkit-appearance: button; /* 统一外观 */
  background-color: transparent; /* 移除默认背景 */
  background-image: none;
}

input::placeholder,
textarea::placeholder {
  opacity: 1; /* Firefox 中占位符默认半透明 */
  color: #9ca3af; /* 统一占位符颜色 */
}

button,
[role='button'] {
  cursor: pointer; /* 按钮显示手型光标 */
}

:disabled {
  cursor: default; /* 禁用状态显示默认光标 */
}
```

**浏览器默认问题**：

表单元素是浏览器差异最大的部分：

```css
/* 不同浏览器的表单元素默认样式差异巨大 */

/* Chrome 的按钮 */
button {
  background-color: rgb(239, 239, 239);
  border: 1px outset;
  padding: 2px 6px;
  /* ...还有很多原生样式 */
}

/* Safari 的按钮 */
button {
  -webkit-appearance: button;
  /* 原生 macOS 风格 */
}

/* Firefox 的 placeholder */
input::placeholder {
  opacity: 0.54; /* 半透明！ */
}
```

**为什么重置**：

- 表单元素默认不继承字体样式，与页面其他部分不一致
- 不同浏览器的原生控件风格差异巨大
- 无法实现设计稿中的自定义样式

**实际对比**：

```html
<!-- 浏览器默认：字体可能是 Courier New ❌ -->
<input type="text" placeholder="输入内容" />

<!-- 重置后：继承页面字体 ✅ -->
<input style="font-family: inherit" type="text" placeholder="输入内容" />
```

---

### 5. 链接样式 ⭐️⭐️

```css
a {
  color: inherit; /* 移除默认蓝色 */
  text-decoration: inherit; /* 移除默认下划线 */
}
```

**浏览器默认行为**：

```css
/* 浏览器默认 */
a:link {
  color: #0000ee;
  text-decoration: underline;
} /* 蓝色 + 下划线 */
a:visited {
  color: #551a8b;
} /* 紫色 */
a:hover {
  color: #ee0000;
} /* 红色 */
a:active {
  color: #ff0000;
} /* 亮红色 */
```

**为什么重置**：

- 默认的蓝色链接在现代设计中很少使用
- 访问过的紫色链接会暴露用户的浏览历史
- 现代设计更倾向于在组件级别控制链接样式（如按钮、导航栏）

**实际场景**：

```html
<!-- 导航栏中的链接不应该是蓝色 -->
<nav>
  <a href="/">首页</a>
  <!-- 期望是白色或主题色，而不是蓝色 -->
  <a href="/about">关于</a>
</nav>
```

---

### 6. 图片和媒体元素 ⭐️⭐️⭐️

```css
img,
svg,
video,
canvas,
audio,
iframe,
embed,
object {
  display: block; /* 默认是 inline，会产生底部空隙 */
  vertical-align: middle;
}

img,
video {
  max-width: 100%; /* 响应式：不超过容器宽度 */
  height: auto; /* 保持宽高比 */
}
```

**浏览器默认问题**：

```html
<!-- 浏览器默认：img 是 inline 元素 -->
<div style="background: lightblue;">
  <img src="photo.jpg" alt="照片" />
  <!-- 图片底部会有约 4px 的神秘空隙 ❌ -->
</div>
```

**原因**：`inline` 元素默认有 `baseline` 对齐，为下降字符（如 g, p, y）预留了空间。

**解决方案**：

```css
/* 方案 1: 改为 block */
img {
  display: block;
}
✅

/* 方案 2: 改变垂直对齐 */
img {
  vertical-align: middle;
}

/* 方案 3: 移除行高（容器） */
.container {
  line-height: 0;
}
```

**响应式图片**：

```css
/* 浏览器默认：图片以原始尺寸显示 */
img {
  /* 一张 3000x2000 的图片会撑破 300px 的容器 ❌ */
}

/* 推荐设置 */
img {
  max-width: 100%;  /* 不超过容器宽度 */
  height: auto;     /* 保持宽高比 */
} ✅
```

---

### 7. 列表样式 ⭐️⭐️

```css
ol,
ul,
menu {
  list-style: none; /* 移除默认的项目符号/数字 */
  margin: 0;
  padding: 0; /* 移除默认的左侧内边距 */
}
```

**浏览器默认行为**：

```css
/* 浏览器默认 */
ul {
  list-style-type: disc; /* 实心圆点 */
  margin: 1em 0;
  padding-left: 40px; /* 左侧缩进 */
}

ol {
  list-style-type: decimal; /* 数字编号 */
  margin: 1em 0;
  padding-left: 40px;
}
```

**为什么重置**：

- 现代 UI 中，很多"列表"只是语义化的容器（如导航栏、卡片列表）
- 默认的 40px 缩进和项目符号往往不符合设计需求
- 需要项目符号时，可以用 CSS 自定义更美观的样式

**实际场景**：

```html
<!-- 导航栏使用 ul，但不需要项目符号 -->
<ul class="nav">
  <li><a href="/">首页</a></li>
  <li><a href="/products">产品</a></li>
  <li><a href="/about">关于</a></li>
</ul>

<style>
  .nav {
    list-style: none; /* 移除项目符号 */
    padding: 0; /* 移除缩进 */
    display: flex; /* 水平排列 */
    gap: 1rem;
  }
</style>
```

---

## 进阶样式（20% 了解即可）

### 特殊文本元素

```css
/* 缩写 - 带标题的 abbr 元素显示虚线下划线 */
abbr:where([title]) {
  text-decoration: underline dotted;
}

/* 代码元素 - 使用等宽字体 */
code,
kbd,
samp,
pre {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
    'Liberation Mono', 'Courier New', monospace;
  font-size: 1em; /* 修正浏览器默认的奇怪字体大小 */
}

/* 上标下标 - 防止影响行高 */
sub,
sup {
  font-size: 75%;
  line-height: 0; /* 不影响行高 */
  position: relative;
  vertical-align: baseline;
}

/* 小字 */
small {
  font-size: 80%;
}

/* 粗体 - Edge 和 Safari 需要显式设置 */
b,
strong {
  font-weight: bolder;
}
```

---

### 表格

```css
table {
  text-indent: 0; /* Chrome/Safari 中表格有文本缩进 */
  border-color: inherit; /* 修正边框颜色继承 */
  border-collapse: collapse; /* 移除单元格间隙 */
}
```

**浏览器默认问题**：

- `border-collapse: separate` 会在单元格间产生间隙
- 不同浏览器的边框处理不一致

---

### 浏览器特定前缀样式

```css
/* Firefox 焦点样式 */
:-moz-focusring {
  outline: auto;
}

/* WebKit 搜索框 */
[type='search'] {
  -webkit-appearance: textfield;
  outline-offset: -2px;
}

::-webkit-search-decoration {
  -webkit-appearance: none;
}

/* 数字输入框的上下箭头 */
::-webkit-inner-spin-button,
::-webkit-outer-spin-button {
  height: auto;
}

/* 文件上传按钮 */
::-webkit-file-upload-button {
  -webkit-appearance: button;
  font: inherit;
}
```

这些是浏览器特定的样式重置，主要处理：

- Firefox 的焦点环样式
- WebKit（Safari/Chrome）的表单控件外观
- 特定输入框的装饰元素

---

### 其他元素

```css
/* 水平分割线 */
hr {
  height: 0;
  color: inherit;
  border-top-width: 1px;
}

/* 进度条 */
progress {
  vertical-align: baseline;
}

/* details/summary */
summary {
  display: list-item;
}

/* 对话框 */
dialog {
  padding: 0;
}

/* 文本域 - 只允许垂直调整大小 */
textarea {
  resize: vertical;
}

/* hidden 属性 - 确保隐藏 */
[hidden] {
  display: none;
}
```

---

## 实际应用：如何选择 CSS Reset 方案

### 1. 极简方案（适合小项目）

```css
/* 最小化 Reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

### 2. TailwindCSS Preflight（推荐）

TailwindCSS 的 `@tailwind base` 是基于 [modern-normalize](https://github.com/sindresorhus/modern-normalize) 的改进版，特点：

- 保留有用的浏览器默认样式
- 只重置有问题的样式
- 平衡了"重置程度"和"实用性"

### 3. 经典 CSS Reset

```css
/* Eric Meyer's Reset CSS */
html,
body,
div,
span,
... {
  margin: 0;
  padding: 0;
  border: 0;
  /* 移除所有默认样式 */
}
```

特点：激进的重置，需要手动重建所有样式。

### 4. Normalize.css

特点：保留有用的默认样式，只修复浏览器间的差异。

---

## 总结

### 核心重置（80% 必须掌握）

| 样式      | 浏览器默认问题                   | 重置方案                                | 重要性    |
| --------- | -------------------------------- | --------------------------------------- | --------- |
| 盒模型    | `content-box` 导致宽度计算不直观 | `box-sizing: border-box`                | ⭐️⭐️⭐️ |
| 行高      | 1.2 太紧凑                       | `line-height: 1.5`                      | ⭐️⭐️⭐️ |
| body 边距 | 8px 外边距                       | `margin: 0`                             | ⭐️⭐️⭐️ |
| 表单元素  | 不继承字体，样式差异大           | `font: inherit`                         | ⭐️⭐️⭐️ |
| 图片      | `inline` 导致底部空隙            | `display: block`                        | ⭐️⭐️⭐️ |
| 链接      | 蓝色 + 下划线                    | `color: inherit; text-decoration: none` | ⭐️⭐️    |
| 列表      | 项目符号 + 40px 缩进             | `list-style: none; padding: 0`          | ⭐️⭐️    |

### 进阶重置（20% 了解即可）

- 特殊文本元素（abbr, code, sub/sup）
- 浏览器特定前缀（-webkit-_, -moz-_）
- 不常用元素（dialog, progress, summary）

### CSS Reset 的核心目标

1. **一致性**：消除浏览器之间的差异
2. **可预测性**：移除意外的默认样式
3. **灵活性**：为自定义样式提供干净的基础
