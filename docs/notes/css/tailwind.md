---
title: tailwind
toc: content
group:
  title: 工程化
---

## 什么是 CSS 原子化

**CSS 原子化**全称：**Atomic CSS**，是一种将样式属性拆解成独立、可复用的组件，并通过组合这些类名来构建样式的方法。

下面通过一个简单的例子来说明。

HTML 代码：

```html
<div class="me-size-20 me-bg-gray-200 me-p-4 me-mt-4 me-rounded-lg">
  Hello World
</div>
```

CSS 代码 (使用原子化类名)：

```css
.me-size-20 {
  width: 5rem;
  height: 5rem;
}
.me-p-4 {
  padding: 1rem;
}
.me-mt-4 {
  margin-top: 1rem;
}
.me-bg-gray-200 {
  background-color: #eee;
}
.me-rounded-lg {
  border-radius: 0.5rem;
}
```

这个案例展示了原子化 CSS 的核心概念，即**通过选择和组合类名来实现样式的精确控制和复用**。原子化类名的命名规则通常是**基于样式属性的缩写和值的组合**，使得我们能够方便地对样式进行定义和调整。

## 和行内样式的区别

让我们从样式编写、一致性、功能和缓存四个方面，来比较 CSS 原子化与行内样式的不同之处。

1. **样式编写**：CSS 原子化通过类名的方式定义样式，将每个样式属性分解为独立的类名。开发者可以根据需要自由选择和组合这些类名，从而精确控制样式。相比之下，行内样式直接在 HTML 元素的 style 属性中指定样式属性和值，显得更直接但也更冗长。CSS 原子化的样式编写更具结构化和模块化特点，同时也能充分利用 Sass、Less 等预处理器和 PostCSS 等后处理器的功能。而行内样式虽然技术上支持预处理和后处理，但很少有成熟工具对此提供支持。

2. **一致性**：CSS 原子化的类名设计允许样式在不同元素间复用，从而实现样式的一致性。通过复用相同的类名，开发者可以确保相同类型的元素在不同位置保持统一的样式表现。行内样式则难以复用，每个元素上都需重复定义样式，导致样式一致性维护更为困难。

3. **功能**：CSS 原子化通过选择和组合类名，能实现丰富多样的样式效果。开发者可以灵活组合类名，达到所需的样式效果。而行内样式虽然可以直接在元素上定义样式，但在面对复杂样式需求时显得笨拙，需要逐个指定样式属性和值，限制了样式的灵活性。

4. **缓存**：CSS 原子化利用浏览器缓存机制，可以将样式表文件缓存，从而减少页面加载时间和网络传输量。因为原子化类名是在样式表中定义的，浏览器可以缓存该文件，并在多个页面间复用。相比之下，行内样式嵌入在 HTML 中，每个页面都需要重新加载和解析，无法利用缓存机制，可能导致额外的网络请求和加载延迟。

## Tailwind 核心功能

**TailwindCSS** 给我们提供了很多好用的功能，主要有以下几个核心功能：

- 实用工具优先
- 状态选择
- 响应式设计
- 夜间模式
- 自定义样式

### 实用工具优先

我们能方便地使用各种原子化 **CSS**，这得益于 **TailwindCSS** 为我们提供了丰富的内置原子化样式，大体可以分为以下部分：

- 布局相关
- 弹性盒 & 网格相关
- 间距、尺寸相关
- 文本相关
- 背景相关
- 边框、滤镜、动画、转换相关
- 表格相关
- 其他

几乎包含了我们平时所使用到的所有的样式。

### 响应式设计

响应式设计可以说是现在网站必备的功能之一，所以 **TailwindCSS** 也进行做了适配工作。

默认情况下 **TailwindCSS** 为我们提供的断点为：

```css
sm 640px @media (min-width: 640px) {
  ...;
}
md 768px @media (min-width: 768px) {
  ...;
}
lg 1024px @media (min-width: 1024px) {
  ...;
}
xl 1280px @media (min-width: 1280px) {
  ...;
}
2xl 1536px @media (min-width: 1536px) {
  ...;
}
```

我们要使用工具类的时候，只需要添加上相应的前缀即可，如下：

```html
<img class="w-16 md:w-32 lg:w-48" src="..." />
```

如果 **TailwindCSS** 默认提供的断点不满足你的项目需求，我们也可以进行自定义。

### 夜间模式

随着项目的用户体验度要求越来越高，夜间模式也逐步走进了大家的视野，很多网站也都提供了不同的模式。

关于夜间模式，我们在 **TailwindCSS** 中使用起来非常方便，只需要在相关的工具类前面加上 `dark` 标识即可。

比如下面的代码：

```html
<html class="dark">
  <body>
    <!-- Will be black -->
    <div class="bg-white dark:bg-black">
      <!-- ... -->
    </div>
  </body>
</html>
```

## Tailwind 运行原理

关于 TailwindCSS 的运行原理并不复杂，就是解析我们的模板内容，然后找出可能是 TailwindCSS 中的样式，然后再生成最终样式。

> **一个最原始的 TailwindCSS 样式文件**：

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

我们用 `node` 执行下面的 `JS` 代码就会把我们的最终 **CSS** 打印在控制台中。

```js
// 假如我们的文件名为：build.js
const postcss = require('postcss')
const tailwindcss = require('tailwindcss')

const init = `
@tailwind base;
@tailwind components;
@tailwind utilities;
`

postcss([tailwindcss])
  .process(init)
  .then((res) => {
    console.log(res.css)
  })
```

> **生成 CSS**：

```css
/*
! tailwindcss v3.4.4 | MIT License | https://tailwindcss.com
*/ /*
1. 防止内边距和边框影响元素宽度。(https://github.com/mozdevs/cssremedy/issues/4)
2. 允许通过仅添加边框宽度来为元素添加边框。(https://github.com/tailwindcss/tailwindcss/pull/116)
*/

*,
::before,
::after {
  box-sizing: border-box; /* 1 */
  border-width: 0; /* 2 */
  border-style: solid; /* 2 */
  border-color: #e5e7eb; /* 2 */
}

::before,
::after {
  --tw-content: '';
}

/*
1. 在所有浏览器中使用一致且合理的行高。
2. 防止 iOS 上在方向改变后调整字体大小。
3. 使用更易读的制表符大小。
4. 默认使用用户配置的 `sans` 字体系列。
5. 默认使用用户配置的 `sans` 字体特性设置。
6. 默认使用用户配置的 `sans` 字体变体设置。
7. 禁用 iOS 上的点击高亮。
*/

html,
:host {
  line-height: 1.5; /* 1 */
  -webkit-text-size-adjust: 100%; /* 2 */
  -moz-tab-size: 4; /* 3 */
  tab-size: 4; /* 3 */
  font-family: ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji',
    'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'; /* 4 */
  font-feature-settings: normal; /* 5 */
  font-variation-settings: normal; /* 6 */
  -webkit-tap-highlight-color: transparent; /* 7 */
}

/*
1. 移除所有浏览器中的默认边距。
2. 从 `html` 继承行高，以便用户可以直接在 `html` 元素上设置它们。
*/

body {
  margin: 0; /* 1 */
  line-height: inherit; /* 2 */
}

/*
1. 在 Firefox 中添加正确的高度。
2. 在 Firefox 中修正边框颜色继承。(https://bugzilla.mozilla.org/show_bug.cgi?id=190655)
3. 确保水平分隔线在默认情况下可见。
*/

hr {
  height: 0; /* 1 */
  color: inherit; /* 2 */
  border-top-width: 1px; /* 3 */
}

/*
在 Chrome、Edge 和 Safari 中添加正确的文本装饰。
*/

abbr:where([title]) {
  text-decoration: underline dotted;
}

/*
移除标题的默认字体大小和字体粗细。
*/

h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: inherit;
  font-weight: inherit;
}

/*
重置链接以优化选择性样式，而不是默认样式。
*/

a {
  color: inherit;
  text-decoration: inherit;
}

/*
在 Edge 和 Safari 中添加正确的字体粗细。
*/

b,
strong {
  font-weight: bolder;
}

/*
1. 默认使用用户配置的 `mono` 字体系列。
2. 默认使用用户配置的 `mono` 字体特性设置。
3. 默认使用用户配置的 `mono` 字体变体设置。
4. 修正所有浏览器中奇怪的 `em` 字体大小。
*/

code,
kbd,
samp,
pre {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
    'Liberation Mono', 'Courier New', monospace; /* 1 */
  font-feature-settings: normal; /* 2 */
  font-variation-settings: normal; /* 3 */
  font-size: 1em; /* 4 */
}

/*
在所有浏览器中添加正确的字体大小。
*/

small {
  font-size: 80%;
}

/*
防止 `sub` 和 `sup` 元素在所有浏览器中影响行高。
*/

sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

/*
1. 移除 Chrome 和 Safari 中表格内容的文本缩进。(https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)
2. 修正 Chrome 和 Safari 中表格边框颜色的继承。(https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)
3. 默认移除表格边框之间的间隙。
*/

table {
  text-indent: 0; /* 1 */
  border-color: inherit; /* 2 */
  border-collapse: collapse; /* 3 */
}

/*
1. 更改所有浏览器中的字体样式。
2. 移除 Firefox 和 Safari 中的默认边距。
3. 移除所有浏览器中的默认内边距。
*/

button,
input,
optgroup,
select,
textarea {
  font-family: inherit; /* 1 */
  font-feature-settings: inherit; /* 1 */
  font-variation-settings: inherit; /* 1 */
  font-size: 100%; /* 1 */
  font-weight: inherit; /* 1 */
  line-height: inherit; /* 1 */
  letter-spacing: inherit; /* 1 */
  color: inherit; /* 1 */
  margin: 0; /* 2 */
  padding: 0; /* 3 */
}

/*
移除 Edge 和 Firefox 中文本转换的继承。
*/

button,
select {
  text-transform: none;
}

/*
1. 修正 iOS 和 Safari 中无法样式化的可点击类型。
2. 移除默认按钮样式。
*/

button,
input:where([type='button']),
input:where([type='reset']),
input:where([type='submit']) {
  -webkit-appearance: button; /* 1 */
  background-color: transparent; /* 2 */
  background-image: none; /* 2 */
}

/*
为所有可聚焦元素使用现代 Firefox 焦点样式。
*/

:-moz-focusring {
  outline: auto;
}

/*
移除 Firefox 中额外的 `:invalid` 样式。(https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737)
*/

:-moz-ui-invalid {
  box-shadow: none;
}

/*
在 Chrome 和 Firefox 中添加正确的垂直对齐方式。
*/

progress {
  vertical-align: baseline;
}

/*
修正 Safari 中增量和减量按钮的光标样式。
*/

::-webkit-inner-spin-button,
::-webkit-outer-spin-button {
  height: auto;
}

/*
1. 修正 Chrome 和 Safari 中的奇怪外观。
2. 修正 Safari 中的轮廓样式。
*/

[type='search'] {
  -webkit-appearance: textfield; /* 1 */
  outline-offset: -2px; /* 2 */
}

/*
移除 macOS 上 Chrome 和 Safari 中的内边距。
*/

::-webkit-search-decoration {
  -webkit-appearance: none;
}

/*
1. 修正 iOS 和 Safari 中无法样式化的可点击类型。
2. 在 Safari 中将字体属性更改为 `inherit`。
*/

::-webkit-file-upload-button {
  -webkit-appearance: button; /* 1 */
  font: inherit; /* 2 */
}

/*
在 Chrome 和 Safari 中添加正确的显示样式。
*/

summary {
  display: list-item;
}

/*
移除适当元素的默认间距和边框。
*/

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

legend {
  padding: 0;
}

ol,
ul,
menu {
  list-style: none;
  margin: 0;
  padding: 0;
}

/*
重置对话框的默认样式。
*/
dialog {
  padding: 0;
}

/*
默认情况下防止文本区域水平调整大小。
*/

textarea {
  resize: vertical;
}

/*
1. 重置 Firefox 中默认的占位符不透明度。(https://github.com/tailwindlabs/tailwindcss/issues/3300)
2. 将默认占位符颜色设置为用户配置的灰色 400 颜色。
*/

input::placeholder,
textarea::placeholder {
  opacity: 1; /* 1 */
  color: #9ca3af; /* 2 */
}

/*
设置按钮的默认光标。
*/

button,
[role='button'] {
  cursor: pointer;
}

/*
确保禁用的按钮不显示指针光标。
*/
:disabled {
  cursor: default;
}

/*
1. 默认将替换元素设置为 `display: block`。(https://github.com/mozdevs/cssremedy/issues/14)
2. 添加 `vertical-align: middle` 以默认更合理地对齐替换元素。(https://github.com/jensimmons/cssremedy/issues/14#issuecomment-634934210)
   这可能会在某些工具中触发错误的 lint 错误，但这是有意为之。
*/

img,
svg,
video,
canvas,
audio,
iframe,
embed,
object {
  display: block; /* 1 */
  vertical-align: middle; /* 2 */
}

/*
将图像和视频限制为父级宽度并保持其固有的纵横比。(https://github.com/mozdevs/cssremedy/issues/14)
*/

img,
video {
  max-width: 100%;
  height: auto;
}

/* 确保具有 HTML hidden 属性的元素默认保持隐藏 */
[hidden] {
  display: none;
}

*,
::before,
::after {
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x: ;
  --tw-pan-y: ;
  --tw-pinch-zoom: ;
  --tw-scroll-snap-strictness: proximity;
  --tw-gradient-from-position: ;
  --tw-gradient-via-position: ;
  --tw-gradient-to-position: ;
  --tw-ordinal: ;
  --tw-slashed-zero: ;
  --tw-numeric-figure: ;
  --tw-numeric-spacing: ;
  --tw-numeric-fraction: ;
  --tw-ring-inset: ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgb(59 130 246 / 0.5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  --tw-blur: ;
  --tw-brightness: ;
  --tw-contrast: ;
  --tw-grayscale: ;
  --tw-hue-rotate: ;
  --tw-invert: ;
  --tw-saturate: ;
  --tw-sepia: ;
  --tw-drop-shadow: ;
  --tw-backdrop-blur: ;
  --tw-backdrop-brightness: ;
  --tw-backdrop-contrast: ;
  --tw-backdrop-grayscale: ;
  --tw-backdrop-hue-rotate: ;
  --tw-backdrop-invert: ;
  --tw-backdrop-opacity: ;
  --tw-backdrop-saturate: ;
  --tw-backdrop-sepia: ;
  --tw-contain-size: ;
  --tw-contain-layout: ;
  --tw-contain-paint: ;
  --tw-contain-style: ;
}

::backdrop {
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x: ;
  --tw-pan-y: ;
  --tw-pinch-zoom: ;
  --tw-scroll-snap-strictness: proximity;
  --tw-gradient-from-position: ;
  --tw-gradient-via-position: ;
  --tw-gradient-to-position: ;
  --tw-ordinal: ;
  --tw-slashed-zero: ;
  --tw-numeric-figure: ;
  --tw-numeric-spacing: ;
  --tw-numeric-fraction: ;
  --tw-ring-inset: ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgb(59 130 246 / 0.5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  --tw-blur: ;
  --tw-brightness: ;
  --tw-contrast: ;
  --tw-grayscale: ;
  --tw-hue-rotate: ;
  --tw-invert: ;
  --tw-saturate: ;
  --tw-sepia: ;
  --tw-drop-shadow: ;
  --tw-backdrop-blur: ;
  --tw-backdrop-brightness: ;
  --tw-backdrop-contrast: ;
  --tw-backdrop-grayscale: ;
  --tw-backdrop-hue-rotate: ;
  --tw-backdrop-invert: ;
  --tw-backdrop-opacity: ;
  --tw-backdrop-saturate: ;
  --tw-backdrop-sepia: ;
  --tw-contain-size: ;
  --tw-contain-layout: ;
  --tw-contain-paint: ;
  --tw-contain-style: ;
}
```

## 自定义指令 `@tailwind`、`@layer`、`@apply`

在配置 Tailwind CSS 时，有一步非常重要的步骤就是在全局样式 (例如：`globals.css`) 中添加：

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

`@tailwind` 指令用于将 Tailwind 中的 **base**、**components**、**utilities** 三个层级的样式插入到全局样式中。

- **base**：这是最基础的层级，在这个层级上，Tailwind 提供了一些界定基础样式的规则。例如 margin、padding、color、font-size 等等。
- **components**：在这个层级可以创建可复用的样式块，例如：按钮、卡片等。默认情况下是空的。
- **utilities**：作为工具层级，包括了 Tailwind 的大部分功能，例如：layout、flex、grid、spacing (margin 和 padding)、colors、typography、borders 等等。

`@layer` 这个指令告诉 Tailwind 想要把对应的样式放在上述哪一个层级 (base、components、utilities)。在实际使用中需要配合 `@apply` —— 它将允许我们使用现有的 Tailwind CSS 类。

举个例子，在 globals.css 中添加以下代码：

```css
@layer components {
  .my-btn {
    @apply bg-black text-white min-w-[80px];
  }
}

@layer utilities {
  .container {
    @apply w-[1280px] mx-auto;
  }
}
```

设置完成后，就可以直接使用了。

```html
<div class="h-screen bg-sky-200 w-[1280px] mx-auto"></div>
<!-- 等价于： -->
<div class="h-screen bg-sky-200 container"></div>

<button class="my-btn">button</button>
<!-- 等价于： -->
<button class="bg-black text-white min-w-[80px]">button</button>
```

## 自定义函数

Tailwind CSS 提供了两个实用的自定义函数——`theme()` 和 `screen()`，它们的作用是在我们自己的 CSS 样式中使用 Tailwind CSS 中的特定值。

### `theme()`

使用 `theme()` 函数可以获取 Tailwind 默认的样式变量，比如：颜色搭配、字体、边框、响应式断点等等内容，下面是一个在 React 中的使用示例：

```jsx | pure
/* my-style.module.css */
.content-area {
  height: calc(100vh - theme(spacing.12));
}
```

spacing 是一个空间刻度系统，上述的 `spacing.12` 表示的是数值为 12 时的空间距离：

![20240611110605](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/me/20240611110605.png)

### `screen()`

可以用 `screen()` 函数快速创建媒体查询，减少很多心智负担：

```css
@media screen(sm) {
  /* ... */
}

/* 等价于 */
@media screen and (min-width: 640px) {
  /* ... */
}
```

## 自定义样式

有时候 Tailwind CSS 预定义的样式没有我们想要使用的默认值，只能自己写。

### 任意值

> 尽管这种方法可以优雅地解决问题，但这种**魔法值**的方案并不被推荐，因为事实上，这种做法会让样式体系超出规范的范围。如果项目中充斥着这种代码，会给后期的维护造成困难。

第一种方式是使用任意值，就是通过 `name-[]` 的方式。

```html
/* 中括号中放入任意值，可以是长度单位：px、rem、vw、vh、%、em、... */
<div class="w-[200px] h-[200px] bg-sky-500"></div>
<div class="w-[15em] h-[20rem] bg-red-500"></div>

/* 颜色值 */
<p class="text-[#0c0c0c]">cool color</p>

/* 文本 */
<p class='before:content-["✨"]'>star!</p>

/* 函数 */
<p class="w-[theme(spacing.96)]">
  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
</p>

/* 变量 */
<p class="text-[--color-primary]"></p>
```

### `@layer`

例如有一个 card 样式：

```css
@layer components {
  .card {
    width: theme(spacing.48);
    height: theme(spacing.48);
    padding: theme(spacing.5);
    border-radius: theme('borderRadius.md');
    background-color: theme('colors.sky.300');
  }
}
```

只需要愉快地写下这样一行代码就能搞定卡片样式：

```html
<div class="card">my card</div>
```

## 配置

经过初始化后，在根目录下有一个 `tailwind.config.js` 文件：

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
```

### `content`

`content` 配置项将会接收一个数组，表示应用 Tailwind CSS 的文件范围：

- `"./pages/**/*.{js,ts,jsx,tsx,mdx}"` 👉 `./pages` 目录下无限级别子目录中的所有以 js、ts、jsx、tsx、mdx 结尾的文件。
- `"./components/**/*.{js,ts,jsx,tsx,mdx}"` 👉 `./components` 下无限级别子目录中的所有以 js、ts、jsx、tsx、mdx 结尾的文件。
- `"./app/**/*.{js,ts,jsx,tsx,mdx}"` 👉 `./app` 下无限级别子目录中的所有以 js、ts、jsx、tsx、mdx 结尾的文件。

其中，`**/*` 表示该目录下的无限级别子目录。

### `theme`

> 默认情况下，初始化时就会生成[默认的配置内容](https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/config.full.js)

如果说要覆盖掉默认的样式，比如，覆盖掉默认颜色：

```js
module.exports = {
  // ...
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      purple: '#3f3cbb',
      midnight: '#121063',
      metal: '#565584',
      tahiti: '#3ab7bf',
      silver: '#ecebff',
      'bubble-gum': '#ff77e9',
      bermuda: '#78dcca',
    },
  },
}
```

上面的配置会把 **TailwindCSS** 给我们提供的关于 `colors` 的默认配置给覆盖，也是说我们现在如果想要使用 **TailwindCSS** 提供的颜色样式，就只能在项目中使用以上颜色值，如：

```html
<div class="text-purple text-red-500"></div>
```

TailwindCSS 只会给我们生成 `text-purple` 样式，对于 `text-red-500` 不会再提供。

但这并不是我们想要的效果，我们希望自己可以在原来默认配置的基础上继续扩展框架没有给我们提供的一些颜色值或者想要单独覆盖某一个颜色值，而其他的保持不变，那这个时候我们就可以使用 `extend` 配置，如下：

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'primary-dark': '#1f2937',
        'primary-light': '#f3f4f6',
        'secondary-dark': '#1f2937',
        'secondary-light': '#f3f4f6',
      },
    },
  },
  plugins: [],
}
```

### `plugins`

**TailwindCSS** 给我们提供了一个 `plugins` 属性，该属性主要是用来扩展 **TailwindCSS** 提供的默认功能，比如如果我们有一个自定义的样式可能会用在很多的地方，这个时候我们就可以使用这个特性把我们的自定义样式添加到 **TailwindCSS** 生成的样式表中。

如果要把我们的样式添加到 **TailwindCSS** 中，我们得使用其提供的 `plugin` **API**。我们来看一个示例，配置文件如下：

```js
const plugin = require('tailwindcss/plugin')
module.exports = {
  content: ['index.html'],
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        '.btn': {
          padding: '.5rem 1rem',
          borderRadius: '.25rem',
          fontWeight: '600',
        },
      })
    }),
  ],
}
```

```js
const plugin = require('tailwindcss/plugin')
```

这行代码的意思是引入 TailwindCSS 为我们提供的插件函数，然后在 `plugins` 属性中调用一下函数，该函数接口一个函数类型的参数，该函数参数给我们提供了添加各种层的方法，比如上面我们用到的 `addComponents`。

我们在这里可以使用以下方法：

- `addUtilities()`，用于注册新的静态工具样式。
- `matchUtilities()`，用于注册新的动态工具样式。
- `addComponents()`，用于注册新的静态组件样式。
- `matchComponents()`，用于注册新的动态组件样式。
- `addBase()`，用于注册新的基础样式。
- `addVariant()`，用于注册自定义静态变体。
- `matchVariant()`，用于注册自定义动态变体。
- `theme()`，用于查找用户主题配置中的值。
- `config()`，用于在用户的 Tailwind 配置中查找值。
- `corePlugins()`，用于检查核心插件是否启用。
- `e()`，用于手动转义用于类名的字符串。

这里只需要了解一下即可，大部分方法我们在开发中可能也不会使用到。

同样，我们需要在 HTML 中使用我们添加的 `.btn` 类样式，否则也不会最终生成到样式表中。

```html
<div>
  <button class="btn">对用户展示</button>
</div>
```

TailwindCSS 也为我们提供了一些常用的插件，但没有放在框架中，如果我们要使用得需要先使用 `npm` 添加一下依赖，再使用，如：

```js
module.exports = {
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/container-queries'),
  ],
}
```

### 预设

预设的意思是就是我们可以把一些公共的配置单独抽取成一个文件，然后在配置文件中引用一下即可。假如我们公司可能会做很多很多的项目，但这些项目大体的风格一致，比如字体、间距、主题色等，这个时候我们就可以使用这特性把公共的样式抽取出来，然后每个项目引用一下。

比如，我们可以创建以下预设文件，预设文件里面可以写的配置和我们 `tailwind.config.js` 写的配置一模一样。

```js
module.exports = {
  theme: {
    colors: {
      blue: {
        light: '#85d7ff',
        DEFAULT: '#1fb6ff',
        dark: '#009eeb',
      },
      pink: {
        light: '#ff7ce5',
        DEFAULT: '#ff49db',
        dark: '#ff16d1',
      },
      gray: {
        darkest: '#1f2d3d',
        dark: '#3c4858',
        DEFAULT: '#c0ccda',
        light: '#e0e6ed',
        lightest: '#f9fafc',
      },
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
    },
    extend: {
      flexGrow: {
        2: '2',
        3: '3',
      },
      zIndex: {
        60: '60',
        70: '70',
        80: '80',
        90: '90',
        100: '100',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
```

然后在 `tailwind.config.js` 中使用：

```js
module.exports = {
  presets: [require('./my-preset.js')],
}
```

如果我们的预设文件和配置文件有些属性发生了冲突，那么会以下面的规则进行覆盖或者合并。

`tailwind.config.js` 中的以下选项会覆盖预设中相同的选项：

- `content`
- `darkMode`
- `prefix`
- `important`
- `variantOrder`
- `separator`
- `safelist`

`theme` 对象会进行浅合并，`tailwind.config.js` 中的顶层键替换任何预设中的相同顶层键。但 `extend` 例外，它在所有配置中收集并应用于主题配置的其余部分之上。

`plugins` 数组跨配置合并，使预设可以注册插件，同时还允许在我们的项目级别添加其他插件。

## `@config` 指令

当我们需要根据不同的站点生成不同的样式文件的时候，可能会使用到不同的配置文件，比如，我们对用户展示的网站需要一套配置属性，对内部使用的管理系统网站需要另一套配置属性，这个时候我们就可以通过 **TailwindCSS** 提供的 `@config` 指令来配置不同的 **CSS** 文件。

如：

```css
/* 对用户展示的网站 */
@config "./tailwindcss.user.config.js";

@tailwind base;
@tailwind components;
@tailwind utilities;
```

```css
/* 对管理人员展示的网站 */
@config "./tailwindcss.admin.config.js";

@tailwind base;
@tailwind components;
@tailwind utilities;
```

通过以下命令分别构建：

```shell
npx tailwind -i ./user.css -o ./dist/output.user.css
```

```shell
npx tailwind -i ./admin.css -o ./dist/output.admin.css
```

这样再构建的时候就会生成不同的样式文件分别应用到不同的站点中。

如果你想要一个完整的配置文件，那可以使用以下命令生成：

```shell
npx tailwind init --full
```

## 预处理器的使用

### postcss-nesting

官方推荐的 `postcss-nesting` 插件可以满足嵌套的需求。首先安装依赖：

```sh
npm install -D postcss-nesting
```

然后放进 `postcss.config.mjs` 配置中：

```js
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    'tailwindcss/nesting': 'postcss-nesting',
    tailwindcss: {},
  },
}

export default config
```

使用示例：

```css
@layer utilities {
  .container {
    @apply w-[1280px] mx-auto;
    span {
      @apply text-lg text-blue;
    }
  }
}
```

### 就是想用 Sass

也不是不行，不过需要知道一件事：预处理器 (Sass 之类的) 和 Tailwind CSS 是在不同的阶段处理的。**预处理器首先处理其输入文件并生成 CSS，然后 Tailwind CSS 和 PostCSS 在预处理器生成的 CSS 上继续处理**。

也就是说，不能把 Tailwind 的 `theme()` 函数的输出传给一个 Sass 的颜色函数，比如：

```scss
.error {
  background-color: darken(theme('colors.red.500'), 10%);
}
.btn:hover {
  background-color: light(theme('colors.red.500'), 10%);
}
```

<!-- 我的猜想是：sass 支持自定义函数，而 Tailwind 在 Sass 之后运行，所以 `theme()` 函数的输出在 Sass 中不可用。 -->

由于 Sass 在 Tailwind 之前运行，还未生成 CSS，因此 `theme()` 并不可用。
