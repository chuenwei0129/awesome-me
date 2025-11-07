---
group:
  title: CSS
  order: 2
title: Tailwind V3 指南
toc: content
order: 15
---

## 原子化 CSS 和行内样式的区别

虽然原子化 CSS 看起来和行内样式很相似，但它们有本质的区别：

### 相似点

```html
<!-- 原子化 CSS -->
<div class="mt-4 text-center bg-blue-500">Hello</div>

<!-- 行内样式 -->
<div style="margin-top: 1rem; text-align: center; background-color: #3b82f6">
  Hello
</div>
```

两者都是"看到什么就是什么"的直观方式。

### 核心区别

| 对比维度       | 原子化 CSS                             | 行内样式                       |
| -------------- | -------------------------------------- | ------------------------------ |
| **响应式设计** | 支持断点，如 `md:text-lg lg:text-xl`   | 不支持，需要 JS 配合           |
| **状态管理**   | 支持伪类，如 `hover:bg-blue-700`       | 不支持，需要 JS 配合           |
| **代码复用**   | 类名可复用，样式定义一次               | 每个元素都要重复写             |
| **CSS 特性**   | 支持媒体查询、伪元素、动画等           | 仅支持基本样式属性             |
| **样式优先级** | 可被覆盖（class 优先级）               | 高优先级，难以覆盖             |
| **性能**       | 生成的 CSS 文件小，样式可缓存          | 每个元素重复定义，HTML 体积大  |
| **维护性**     | 统一的设计系统，如 `text-blue-500`     | 魔法数字到处都是，如 `#3b82f6` |
| **开发体验**   | IDE 提示、自动补全、文档完善           | 无提示，需要记忆具体属性值     |
| **深色模式**   | 内置支持，如 `dark:bg-gray-800`        | 需要 JS 动态修改               |
| **设计约束**   | 遵循设计系统（如 4px、8px 的间距规范） | 可以任意值，容易不一致         |

### 实际案例对比

**响应式按钮：**

```html
<!-- 原子化 CSS：简洁优雅 -->
<button
  class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 md:px-6 md:py-3"
>
  Click me
</button>

<!-- 行内样式：需要 JS 辅助 -->
<button
  style="padding: 0.5rem 1rem; background-color: #3b82f6; color: white; border-radius: 0.25rem"
  onmouseover="this.style.backgroundColor='#2563eb'"
  onmouseout="this.style.backgroundColor='#3b82f6'"
>
  Click me
</button>
```

**深色模式：**

```html
<!-- 原子化 CSS：一行搞定 -->
<div class="bg-white dark:bg-gray-800 text-black dark:text-white">Content</div>

<!-- 行内样式：需要复杂的 JS 逻辑 -->
<div id="content" style="background-color: white; color: black">Content</div>
<script>
  // 需要监听主题切换，手动更新样式...
</script>
```

## 为什么要使用 Tailwind CSS？

### 解决传统 CSS 的痛点

传统 CSS 开发常见的问题：

1. **命名困难**：`.user-card-header-title-icon` 这样的类名越来越长
2. **样式冲突**：全局污染，不知道改了 A 会不会影响 B
3. **CSS 体积膨胀**：项目越大，CSS 文件越大，删代码不敢删样式
4. **设计不一致**：到处都是魔法数字，`#3b82f6` 和 `#3b83f6` 哪个是正确的？
5. **响应式繁琐**：每个组件都要写一堆媒体查询

### Tailwind CSS 的优势

#### 1. 开发效率高

不需要在 HTML、CSS 文件之间来回切换，不需要思考类名怎么取：

```html
<!-- 传统方式 -->
<button class="primary-button">Click me</button>
<style>
  .primary-button {
    background-color: #3b82f6;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    font-weight: 600;
  }
  .primary-button:hover {
    background-color: #2563eb;
  }
</style>

<!-- Tailwind 方式 -->
<button
  class="bg-blue-500 text-white px-4 py-2 rounded font-semibold hover:bg-blue-600"
>
  Click me
</button>
```

#### 2. 设计系统内置

Tailwind 提供了一套经过精心设计的默认主题：

- **间距系统**：基于 `0.25rem` (4px) 的倍数，确保视觉一致性
- **颜色系统**：每个颜色有 50-900 的色阶，开箱即用
- **字体大小**：从 `xs` 到 `9xl`，带有合适的行高
- **断点系统**：`sm`、`md`、`lg`、`xl`、`2xl` 移动优先

#### 3. 性能优越

- **按需生成**：只生成用到的样式，生产环境 CSS 通常 < 10KB
- **原子化复用**：`.p-4` 定义一次，到处使用
- **无运行时开销**：纯 CSS，不像 CSS-in-JS 需要运行时处理

#### 4. 维护性强

- **局部性**：样式和 HTML 在一起，修改不会影响其他组件
- **可预测**：看到类名就知道样式，不需要去找 CSS 定义
- **易删除**：删除 HTML 就删除了样式，不会留下死代码

#### 5. 响应式设计简单

```html
<!-- 移动端小字，平板中字，桌面大字 -->
<h1 class="text-2xl md:text-4xl lg:text-6xl">Responsive Title</h1>

<!-- 移动端垂直布局，桌面端水平布局 -->
<div class="flex flex-col md:flex-row gap-4">
  <div class="flex-1">Column 1</div>
  <div class="flex-1">Column 2</div>
</div>
```

### 何时使用 Tailwind CSS？

✅ **适合的场景：**

- 构建现代 Web 应用（React、Vue、Next.js 等）
- 需要快速迭代的项目
- 团队协作项目（减少命名争议）
- 注重性能优化的项目
- 需要严格设计系统的项目

❌ **不太适合的场景：**

- 传统多页应用（MPA）且无构建工具
- 需要极致的 HTML 语义化
- 团队强烈抵触 utility-first 理念
- 简单的静态页面（引入工具链的成本大于收益）

> 延伸阅读：[Tailwind CSS 是否属于旁门左道？](https://www.zhihu.com/question/550275961/answer/3347913952)

## Tailwind 核心功能

**TailwindCSS** 给我们提供了很多好用的功能，主要有以下几个核心功能：

- 实用工具优先
- 响应式设计
- 状态变体（伪类、伪元素）
- 深色模式
- 自定义样式

### 实用工具优先

我们能方便地使用各种原子化 **CSS**，这得益于 **TailwindCSS** 为我们提供了丰富的内置原子化样式，大体可以分为以下部分：

- **布局相关**：`container`、`box-border`、`block`、`inline`、`flex`、`grid` 等
- **弹性盒 & 网格相关**：`flex-row`、`flex-col`、`justify-center`、`items-center`、`grid-cols-3` 等
- **间距、尺寸相关**：`m-4`、`p-2`、`w-full`、`h-screen` 等
- **文本相关**：`text-lg`、`font-bold`、`text-center`、`text-blue-500` 等
- **背景相关**：`bg-white`、`bg-gradient-to-r`、`bg-cover` 等
- **边框、滤镜、动画、转换相关**：`border`、`rounded-lg`、`shadow-md`、`blur`、`rotate-45` 等
- **表格相关**：`table`、`table-auto`、`border-collapse` 等

几乎包含了我们平时所使用到的所有的样式。

**快速上手示例：**

```tsx
import React from 'react';

export default () => (
  <>
    <div className="flex rounded-lg bg-white shadow-lg max-w-sm">
      <img
        className="block w-full h-auto"
        src="https://placebear.com/100/100"
        alt="Image"
      />
      <div className="px-6 py-4">
        <h2 className="font-bold text-xl mb-2">Card Title</h2>
        <p className="text-gray-700 text-base">Card description goes here.</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
          #tag
        </span>
      </div>
    </div>
  </>
);
```

### 响应式设计

响应式设计可以说是现在网站必备的功能之一，所以 **TailwindCSS** 也进行做了适配工作。

默认情况下 **TailwindCSS** 为我们提供的断点为：

| 断点前缀 | 最小宽度 | CSS                                |
| -------- | -------- | ---------------------------------- |
| `sm`     | 640px    | `@media (min-width: 640px) {...}`  |
| `md`     | 768px    | `@media (min-width: 768px) {...}`  |
| `lg`     | 1024px   | `@media (min-width: 1024px) {...}` |
| `xl`     | 1280px   | `@media (min-width: 1280px) {...}` |
| `2xl`    | 1536px   | `@media (min-width: 1536px) {...}` |

我们要使用工具类的时候，只需要添加上相应的前缀即可，如下：

```html
<img class="w-16 md:w-32 lg:w-48" src="..." />
```

**TailwindCSS** 响应式的规则为：

1. **`mobile first`**，即**手机端优先**，你也可以理解为，什么断点都不设置就相当于断点为 0；
2. 断点的含义是**大于等于**，即 `min-width`，而非 `max-width`。

> 具体响应式断点可参考文档：[tailwindcss.com/docs/screens](https://tailwindcss.com/docs/screens)

**高级用法**：你甚至可以结合任意值语法，实现各种变态的响应式需求，如：

> 下面的这个盒子，让它在 1300px 以下 (包含 1300px) 屏幕下显示绿色，以上显示蓝色。

```html
<div class="w-32 h-32 max-[1300px]:bg-green-500 bg-blue-500"></div>
```

### 状态变体

Tailwind 支持各种状态变体，让你轻松处理交互状态：

```html
<!-- 悬停、焦点、活动状态 -->
<button
  class="bg-blue-500 hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 active:bg-blue-800"
>
  Hover me
</button>

<!-- 第一个、最后一个子元素 -->
<ul>
  <li class="py-2 first:pt-0 last:pb-0">Item</li>
</ul>

<!-- 偶数、奇数行 -->
<tr class="even:bg-gray-100 odd:bg-white">
  <td>Data</td>
</tr>

<!-- 空状态 -->
<input class="border border-gray-300 empty:border-red-500" />

<!-- group 和 peer -->
<div class="group">
  <img src="..." />
  <p class="hidden group-hover:block">Hover the image to see this</p>
</div>
```

### Ring Utilities（环形阴影）

Ring utilities 用于创建轮廓环形阴影，常用于表单 focus 状态和交互反馈。

#### 基本用法

```html
<!-- 基础环形 -->
<button class="ring-2 ring-blue-500">Click me</button>

<!-- 表单 focus 状态 -->
<input
  type="text"
  class="border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
  placeholder="Email"
/>

<!-- 组合使用：环形 + 偏移 -->
<button
  class="bg-blue-500 ring-4 ring-blue-300 ring-offset-2 ring-offset-white"
>
  Subscribe
</button>
```

#### 环形宽度

```html
<button class="ring-0">ring-0</button>
<button class="ring-1">ring-1</button>
<button class="ring-2">ring-2 (默认)</button>
<button class="ring-4">ring-4</button>
<button class="ring-8">ring-8</button>

<!-- 任意值 -->
<button class="ring-[10px]">ring-[10px]</button>
```

#### 环形颜色和透明度

```html
<!-- 环形颜色 -->
<button class="ring-2 ring-blue-500">Blue ring</button>
<button class="ring-2 ring-pink-500">Pink ring</button>

<!-- 环形透明度 -->
<button class="ring-2 ring-blue-500/50">50% opacity</button>
<button class="ring-2 ring-blue-500/[.55]">55% opacity</button>
```

#### Ring Offset（环形偏移）

用于创建双层环形效果：

```html
<!-- 创建双层环形效果 -->
<button class="ring-2 ring-purple-500 ring-offset-2 ring-offset-white">
  Button
</button>

<!-- 深色模式 -->
<button
  class="ring-2 ring-blue-500 ring-offset-2 ring-offset-white dark:ring-offset-gray-900"
>
  Dark Mode Button
</button>
```

#### 实际应用场景

```html
<!-- 自定义 checkbox -->
<input
  type="checkbox"
  class="h-4 w-4 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
/>

<!-- 卡片选中状态 -->
<div
  class="p-4 border-2 border-gray-200 hover:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500"
>
  Card content
</div>

<!-- 头像环形 -->
<img
  class="h-12 w-12 rounded-full ring-2 ring-white ring-offset-2 ring-offset-gray-100"
  src="avatar.jpg"
  alt="User"
/>
```

### Group 和 Peer 深入用法

#### Group 基础用法

用于根据父元素状态控制子元素样式：

```html
<!-- 悬停卡片时显示按钮 -->
<div class="group relative">
  <img src="image.jpg" alt="Product" />
  <button
    class="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition"
  >
    Add to Cart
  </button>
</div>

<!-- 悬停卡片时改变多个子元素 -->
<div class="group p-4 border rounded hover:bg-blue-50">
  <h3 class="group-hover:text-blue-600">Title</h3>
  <p class="text-gray-500 group-hover:text-gray-700">Description</p>
  <button class="opacity-0 group-hover:opacity-100">Edit</button>
</div>
```

#### 嵌套 Group（命名 Group）

```html
<div class="group/card ...">
  <img src="..." />
  <div class="group/body ...">
    <h3 class="group-hover/card:text-blue-600 ...">Title</h3>
    <p class="group-hover/body:text-gray-700 ...">Content</p>
  </div>
</div>
```

#### Peer 基础用法

用于根据兄弟元素状态控制样式（只能影响后面的兄弟元素）：

```html
<!-- 表单验证 -->
<form>
  <input type="email" class="peer ..." placeholder=" " required />
  <label class="peer-placeholder-shown:top-2 peer-focus:top-0 ...">
    Email Address
  </label>
  <p class="hidden peer-invalid:block text-red-500">
    Please enter a valid email
  </p>
</form>

<!-- 切换显示密码 -->
<div>
  <input type="checkbox" id="show-password" class="peer sr-only" />
  <label for="show-password" class="peer-checked:text-blue-600">
    Show password
  </label>
</div>
```

#### Peer 多个兄弟元素（命名 Peer）

```html
<fieldset>
  <legend>Published status</legend>

  <input id="draft" type="radio" name="status" class="peer/draft" />
  <label for="draft" class="peer-checked/draft:text-blue-600">Draft</label>

  <input id="published" type="radio" name="status" class="peer/published" />
  <label for="published" class="peer-checked/published:text-blue-600">
    Published
  </label>

  <div class="hidden peer-checked/draft:block">
    Draft content will not be visible to the public.
  </div>
  <div class="hidden peer-checked/published:block">
    Published content will be visible to everyone.
  </div>
</fieldset>
```

#### ⚠️ Peer 的限制

```html
<!-- ❌ 错误：peer 必须在前面 -->
<label class="peer-invalid:text-red-500">Email</label>
<input type="email" class="peer" />

<!-- ✅ 正确：peer 在前面 -->
<input type="email" class="peer" />
<label class="peer-invalid:text-red-500">Email</label>
```

**注意：** 由于 CSS 限制，peer 只能影响后面的兄弟元素，不能影响前面的。

#### 实际应用场景

```html
<!-- 折叠面板 -->
<div>
  <input type="checkbox" id="section1" class="peer sr-only" />
  <label
    for="section1"
    class="flex items-center justify-between cursor-pointer"
  >
    <span>Section 1</span>
    <svg class="peer-checked:rotate-180 transition">...</svg>
  </label>
  <div class="hidden peer-checked:block mt-2">Section content...</div>
</div>

<!-- 选项卡切换 -->
<div>
  <input type="radio" name="tab" id="tab1" class="peer/tab1 sr-only" checked />
  <input type="radio" name="tab" id="tab2" class="peer/tab2 sr-only" />

  <div class="flex gap-2">
    <label
      for="tab1"
      class="peer-checked/tab1:bg-blue-500 peer-checked/tab1:text-white"
    >
      Tab 1
    </label>
    <label
      for="tab2"
      class="peer-checked/tab2:bg-blue-500 peer-checked/tab2:text-white"
    >
      Tab 2
    </label>
  </div>

  <div class="hidden peer-checked/tab1:block">Tab 1 content</div>
  <div class="hidden peer-checked/tab2:block">Tab 2 content</div>
</div>
```

### 深色模式

随着项目的用户体验度要求越来越高，深色模式也逐步走进了大家的视野，很多网站也都提供了不同的模式。

关于深色模式，我们在 **TailwindCSS** 中使用起来非常方便，只需要在相关的工具类前面加上 `dark` 标识即可。

比如下面的代码：

```html
<html class="dark">
  <body>
    <!-- Will be black -->
    <div class="bg-white dark:bg-black">
      <!-- 浅色模式白色背景，深色模式黑色背景 -->
    </div>
  </body>
</html>
```

**配置深色模式策略：**

```js
// tailwind.config.js
module.exports = {
  darkMode: 'class', // 或 'media' 使用系统偏好
  // ...
};
```

更多使用方法可参考文档：[tailwindcss.com/docs/dark-mode](https://tailwindcss.com/docs/dark-mode)

### Backdrop Filters（背景滤镜）

用于创建毛玻璃效果、模糊背景等现代 UI 设计。

#### Backdrop Blur（背景模糊）

```html
<!-- 毛玻璃导航栏 -->
<nav class="fixed top-0 w-full bg-white/80 backdrop-blur-md">
  <div class="max-w-7xl mx-auto px-4">Navigation content</div>
</nav>

<!-- 模态框背景 -->
<div class="fixed inset-0 bg-black/50 backdrop-blur-sm">
  <div class="modal-content bg-white rounded-lg">Modal content</div>
</div>

<!-- 不同程度的模糊 -->
<div class="backdrop-blur-none">No blur</div>
<div class="backdrop-blur-sm">Small blur</div>
<div class="backdrop-blur">Default blur</div>
<div class="backdrop-blur-md">Medium blur</div>
<div class="backdrop-blur-lg">Large blur</div>
<div class="backdrop-blur-xl">Extra large blur</div>
<div class="backdrop-blur-2xl">2xl blur</div>
<div class="backdrop-blur-3xl">3xl blur</div>

<!-- 任意值 -->
<div class="backdrop-blur-[2px]">Custom blur</div>
```

#### Backdrop Brightness（背景亮度）

```html
<div class="backdrop-brightness-50">Darken background</div>
<div class="backdrop-brightness-150">Brighten background</div>
<div class="backdrop-brightness-[1.75]">Custom brightness</div>
```

#### Backdrop Contrast（背景对比度）

```html
<div class="backdrop-contrast-125">Increase contrast</div>
<div class="backdrop-contrast-50">Decrease contrast</div>
```

#### Backdrop Grayscale（背景灰度）

```html
<div class="backdrop-grayscale">Full grayscale</div>
<div class="backdrop-grayscale-0">No grayscale</div>
```

#### Backdrop Saturate（背景饱和度）

```html
<div class="backdrop-saturate-150">Increase saturation</div>
<div class="backdrop-saturate-50">Decrease saturation</div>
```

#### 组合使用

```html
<!-- iOS 风格的毛玻璃卡片 -->
<div
  class="bg-white/70 backdrop-blur-xl backdrop-saturate-150 rounded-2xl p-6 shadow-lg"
>
  <h3 class="text-lg font-semibold">Card Title</h3>
  <p class="text-gray-600">Beautiful glassmorphism effect</p>
</div>

<!-- 深色模式兼容 -->
<div class="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
  Content with backdrop blur in both modes
</div>
```

#### 移除所有背景滤镜

```html
<div class="backdrop-blur-md md:backdrop-filter-none">
  Remove backdrop filters on medium screens
</div>
```

## 安装和配置

### 快速安装

> 安装必要依赖：TailwindCSS 是一个 PostCSS 插件

```sh
# autoprefixer 非必需
pnpm i -D tailwindcss postcss autoprefixer
```

> 创建 TailwindCSS 配置文件

```sh
npx tailwindcss init -p
```

这一步会做两件事：

1. 创建 `postcss.config.js` 文件，这里的配置主要是添加 `tailwindcss` 的插件，这样你编写的 css 才会被 `tailwindcss` 处理；
2. 创建 `tailwind.config.js` 文件，主要进行扫描规则、主题、插件等配置。

> 在你的全局样式文件中引入 Tailwind

```css
/* globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 核心配置说明

经过初始化后，在根目录下有一个 `tailwind.config.js` 文件：

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

#### `content` - 内容路径配置

`content` 配置项将会接收一个数组，表示应用 Tailwind CSS 的文件范围：

```js
content: [
  "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/**/*.{js,ts,jsx,tsx,mdx}",
  "./app/**/*.{js,ts,jsx,tsx,mdx}",
],
```

- `"./pages/**/*.{js,ts,jsx,tsx,mdx}"` 👉 `./pages` 目录下无限级别子目录中的所有相关文件
- 其中，`**/*` 表示该目录下的无限级别子目录

#### `theme` - 主题配置

> 默认情况下，初始化时就会生成[默认的配置内容](https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/config.full.js)

**覆盖默认样式：**

```js
module.exports = {
  theme: {
    colors: {
      // 这会完全覆盖默认的颜色
      blue: '#1fb6ff',
      purple: '#7e5bef',
      pink: '#ff49db',
    },
  },
};
```

**扩展默认样式（推荐）：**

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        // 保留默认颜色，添加自定义颜色
        'brand-blue': '#1fb6ff',
        'brand-purple': '#7e5bef',
      },
      spacing: {
        128: '32rem',
        144: '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
};
```

## 自定义指令和函数

### `@tailwind`、`@layer`、`@apply` 指令

在配置 Tailwind CSS 时，有一步非常重要的步骤就是在全局样式中添加：

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

`@tailwind` 指令用于将 Tailwind 中的 **base**、**components**、**utilities** 三个层级的样式插入到全局样式中。

- **base**：这是最基础的层级，在这个层级上，Tailwind 提供了一些界定基础样式的规则。例如 margin、padding、color、font-size 等等。
- **components**：在这个层级可以创建可复用的样式块，例如：按钮、卡片等。默认情况下是空的。
- **utilities**：作为工具层级，包括了 Tailwind 的大部分功能，例如：layout、flex、grid、spacing 等等。

`@layer` 指令告诉 Tailwind 想要把对应的样式放在上述哪一个层级。在实际使用中需要配合 `@apply` —— 它将允许我们使用现有的 Tailwind CSS 类。

举个例子，在 `globals.css` 中添加以下代码：

```css
@layer components {
  .btn-primary {
    @apply bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700;
  }
  .card {
    @apply rounded-lg shadow-md p-6 bg-white;
  }
}

@layer utilities {
  .content-auto {
    content-visibility: auto;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
}
```

设置完成后，就可以直接使用了：

```html
<button class="btn-primary">Click me</button>
<div class="card scrollbar-hide">Card content</div>
```

### 自定义函数

Tailwind CSS 提供了两个实用的自定义函数——`theme()` 和 `screen()`。

#### `theme()` - 访问主题值

使用 `theme()` 函数可以获取 Tailwind 默认的样式变量：

```css
.content-area {
  height: calc(100vh - theme(spacing.12));
  background-color: theme('colors.blue.500');
  padding: theme('spacing[2.5]');
}
```

#### `screen()` - 创建媒体查询

可以用 `screen()` 函数快速创建媒体查询：

```css
@media screen(sm) {
  /* ... */
}

/* 等价于 */
@media (min-width: 640px) {
  /* ... */
}
```

### Important Modifier（!修饰符）

当需要强制覆盖样式时，可以在工具类前添加 `!` 前缀：

#### 基本用法

```html
<!-- 普通用法 -->
<div class="text-red-500">Red text</div>

<!-- 强制覆盖 -->
<div class="!text-red-500">Definitely red text</div>
```

#### 实际应用场景

```html
<!-- 覆盖第三方库样式 -->
<div class="some-third-party-class !bg-blue-500 !text-white">
  Override third-party styles
</div>

<!-- 覆盖内联样式 -->
<div style="color: red" class="!text-blue-500">
  Blue text (overrides inline style)
</div>

<!-- 在响应式中使用 -->
<div class="bg-red-500 md:!bg-blue-500">Force blue on medium screens</div>
```

#### 配置全局 important

如果整个项目都需要 important，可以在配置文件中设置：

```js
// tailwind.config.js
module.exports = {
  important: true, // 所有工具类都添加 !important
  // 或者使用选择器策略
  important: '#app', // 提高特定选择器的优先级
};
```

**注意：** 尽量少用 `!`，优先考虑调整 HTML 结构或使用更具体的选择器。

### 任意值语法

有时候 Tailwind CSS 预定义的样式没有我们想要使用的默认值，可以使用任意值语法：

```html
<!-- 长度单位 -->
<div class="w-[200px] h-[20rem] top-[117px]"></div>

<!-- 颜色值 -->
<div class="bg-[#1da1f2] text-[rgb(10,20,30)]"></div>

<!-- 使用 CSS 变量 -->
<div class="bg-[var(--brand-color)] text-[color:var(--text-color)]"></div>

<!-- 网格模板列 -->
<div class="grid-cols-[200px_1fr_1fr]"></div>

<!-- before/after 内容 -->
<div class='before:content-["★"]'></div>
```

> ⚠️ **注意**：虽然这种方法很灵活，但会让样式体系超出规范的范围。如果项目中充斥着这种"魔法值"，会给后期的维护造成困难。**优先使用 `extend` 配置扩展主题值**。

#### 任意值高级用法

**使用 CSS 变量：**

```html
<!-- 直接使用 CSS 变量 -->
<div class="bg-[--my-color]">Uses CSS variable</div>

<!-- 需要类型提示时 -->
<div class="text-[color:var(--text-color)]">
  Explicitly specify it's a color
</div>

<div class="text-[length:var(--text-size)]">
  Explicitly specify it's a length
</div>
```

**类型提示：**

当 Tailwind 无法推断类型时，使用 CSS 数据类型提示：

```html
<!-- 自动推断为 font-size -->
<div class="text-[22px]">...</div>

<!-- 自动推断为 color -->
<div class="text-[#bada55]">...</div>

<!-- CSS 变量需要类型提示 -->
<div class="text-[var(--my-var)]">...</div>

<!-- 明确指定为 font-size -->
<div class="text-[length:var(--my-var)]">...</div>

<!-- 明确指定为 color -->
<div class="text-[color:var(--my-var)]">...</div>
```

**使用 theme() 函数：**

```html
<!-- 在任意值中使用主题值 -->
<div class="grid grid-cols-[fit-content(theme(spacing.32))]">
  Grid with theme spacing
</div>

<div class="bg-[theme(colors.blue.500)]">Background using theme color</div>
```

**任意 CSS 属性：**

```html
<!-- Tailwind 没有内置的工具类时 -->
<div class="[mask-type:luminance]">Custom CSS property</div>

<!-- 支持修饰符 -->
<div class="[mask-type:luminance] hover:[mask-type:alpha]">
  With hover state
</div>

<!-- 响应式 -->
<div class="[--scroll-offset:56px] lg:[--scroll-offset:44px]">
  Responsive CSS variables
</div>
```

**空格处理：**

```html
<!-- 使用下划线代替空格 -->
<div class="before:content-['Hello_World']">Content with space</div>

<div class="bg-[url('/img/hero_pattern.svg')]">URL with underscore</div>
```

**组合复杂值：**

```html
<!-- 复杂的 grid 模板 -->
<div class="grid-cols-[200px_minmax(900px,_1fr)_100px]">Complex grid</div>

<!-- 复杂的阴影 -->
<div class="shadow-[0_35px_35px_rgba(0,0,0,0.25)]">Custom shadow</div>

<!-- 复杂的动画 -->
<div class="animate-[wiggle_1s_ease-in-out_infinite]">Custom animation</div>
```

## Tailwind 运行原理

关于 TailwindCSS 的运行原理并不复杂，就是**解析我们的模板内容，然后找出可能是 TailwindCSS 中的样式，然后再生成最终样式**。

### 最原始的处理流程

一个最原始的 TailwindCSS 样式文件：

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

我们用 `node` 执行下面的 `JS` 代码就会把我们的最终 **CSS** 打印在控制台中：

```js
// build.js
const postcss = require('postcss');
const tailwindcss = require('tailwindcss');

const init = `
@tailwind base;
@tailwind components;
@tailwind utilities;
`;

postcss([tailwindcss])
  .process(init)
  .then((res) => {
    console.log(res.css);
  });
```

### 生成的 CSS 内容

生成的 CSS 包含三个部分：

1. **base 层**：浏览器样式重置（Preflight），确保跨浏览器一致性
2. **components 层**：自定义组件样式（默认为空）
3. **utilities 层**：工具类样式和 CSS 变量定义

假设在 `tailwind.config.js` 中配置：

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false, // 关闭样式重置
  },
};
```

便只会生成工具类需要的 CSS 变量，而不包含浏览器重置样式。下面是生成的 CSS：

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

/* 预设为 false 时只会生成工具类需要的 CSS 变量 */

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

### JIT 模式（Just-In-Time）

从 Tailwind v3 开始，默认使用 JIT 模式：

- **按需生成**：只生成你在代码中使用的样式
- **开发速度快**：不需要预先生成所有可能的变体
- **支持任意值**：可以使用 `w-[137px]` 这样的任意值
- **文件体积小**：生产环境通常只有几 KB

**工作流程：**

1. 扫描 `content` 配置中指定的文件
2. 提取类名（如 `bg-blue-500`、`hover:text-lg`）
3. 根据提取的类名生成对应的 CSS
4. 在开发模式下监听文件变化，实时更新

## 高级配置

### 插件系统

**TailwindCSS** 提供了插件系统来扩展功能：

```js
const plugin = require('tailwindcss/plugin');

module.exports = {
  plugins: [
    plugin(function ({ addComponents, addUtilities, theme }) {
      // 添加组件
      addComponents({
        '.btn': {
          padding: theme('spacing.4'),
          borderRadius: theme('borderRadius.md'),
          fontWeight: theme('fontWeight.semibold'),
        },
      });

      // 添加工具类
      addUtilities({
        '.content-auto': {
          contentVisibility: 'auto',
        },
      });
    }),

    // 官方插件
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
```

### 预设（Presets）

预设用于在多个项目间共享配置：

```js
// my-preset.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#1fb6ff',
        secondary: '#7e5bef',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};

// tailwind.config.js
module.exports = {
  presets: [require('./my-preset.js')],
  // 项目特定的配置...
};
```

### `@config` 指令

当需要为不同的站点生成不同的样式文件时，可以使用 `@config` 指令：

```css
/* user.css - 用户端样式 */
@config "./tailwindcss.user.config.js";
@tailwind base;
@tailwind components;
@tailwind utilities;

/* admin.css - 管理端样式 */
@config "./tailwindcss.admin.config.js";
@tailwind base;
@tailwind components;
@tailwind utilities;
```

分别构建：

```shell
npx tailwindcss -i ./user.css -o ./dist/user.css
npx tailwindcss -i ./admin.css -o ./dist/admin.css
```

## 预处理器的使用

### 使用嵌套语法

TailwindCSS 封装了 [postcss-nested](https://github.com/postcss/postcss-nested)，在 `postcss.config.js` 中配置即可使用嵌套：

```js
module.exports = {
  plugins: {
    'tailwindcss/nesting': {},
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

使用示例：

```css
@layer components {
  .card {
    @apply rounded-lg shadow-md p-6 bg-white;

    &-title {
      @apply text-xl font-bold mb-2;
    }

    &-content {
      @apply text-gray-700;

      p {
        @apply mb-4 last:mb-0;
      }
    }

    &:hover {
      @apply shadow-xl;
    }
  }
}
```

### 使用 Sass/Less

也可以使用 Sass 等预处理器，但需要注意：

- **预处理器首先处理**其输入文件并生成 CSS
- **然后 Tailwind CSS 和 PostCSS** 在预处理器生成的 CSS 上继续处理

**可能的冲突：**

```scss
// ❌ 错误：Sass 会优先处理 theme() 函数
.content {
  color: theme('colors.blue.500'); // Sass 的 theme() 函数
}

// ✅ 正确：使用 @apply
.content {
  @apply text-blue-500;
}
```

## 实践建议

### 组件提取策略

虽然 Tailwind 提倡 utility-first，但不意味着所有东西都要写在 HTML 里：

```html
<!-- ❌ 太长了，难以维护 -->
<button
  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
>
  Click me
</button>

<!-- ✅ 提取成组件 -->
<button>Click me</button>

<!-- ✅ 或者使用 @layer -->
<button class="btn-primary">Click me</button>
```

**何时提取：**

- 样式在多处重复使用
- 类名超过 10 个
- 有复杂的状态变化

### 保持一致性

- 使用 `theme` 配置定义设计系统
- 避免使用任意值 `[]`，除非确实需要
- 使用 ESLint 插件检查类名顺序

### 性能优化

- 使用 PurgeCSS（Tailwind 内置）移除未使用的样式
- 生产环境开启压缩：`NODE_ENV=production`
- 考虑使用 CDN 缓存生成的 CSS

### 团队协作

- 统一配置文件，共享预设
- 使用 Prettier 插件自动格式化类名顺序
- 文档化自定义的工具类和组件

### 其他实用工具类

这里补充一些常用但前面未详细说明的实用工具类：

#### Aspect Ratio（宽高比）

```html
<!-- 16:9 视频容器 -->
<div class="aspect-video">
  <iframe src="..." class="w-full h-full"></iframe>
</div>

<!-- 1:1 正方形 -->
<div class="aspect-square">
  <img src="..." class="w-full h-full object-cover" />
</div>

<!-- 自定义比例 -->
<div class="aspect-[4/3]">Content</div>
```

#### Line Clamp（文本截断）

```html
<!-- 单行截断 -->
<p class="truncate">Long text will be truncated...</p>

<!-- 多行截断 -->
<p class="line-clamp-2">
  This text will be clamped to 2 lines with ellipsis...
</p>

<p class="line-clamp-3">Three lines...</p>
```

#### Divide（分割线）

```html
<!-- 列表项之间的分割线 -->
<ul class="divide-y divide-gray-200">
  <li class="py-3">Item 1</li>
  <li class="py-3">Item 2</li>
  <li class="py-3">Item 3</li>
</ul>

<!-- 水平分割 -->
<div class="flex divide-x divide-gray-300">
  <div class="px-4">Column 1</div>
  <div class="px-4">Column 2</div>
</div>
```

#### Scroll Snap（滚动吸附）

```html
<!-- 轮播图滚动吸附 -->
<div class="snap-x snap-mandatory overflow-x-auto flex">
  <div class="snap-center shrink-0">Slide 1</div>
  <div class="snap-center shrink-0">Slide 2</div>
  <div class="snap-center shrink-0">Slide 3</div>
</div>
```

#### Caret Color（光标颜色）

```html
<input type="text" class="caret-blue-500" />
```

#### Accent Color（强调色）

```html
<input type="checkbox" class="accent-blue-500" />
<input type="radio" class="accent-pink-500" />
```

#### Touch Action（触摸行为）

```html
<!-- 禁用触摸滚动 -->
<div class="touch-none">Map or canvas</div>

<!-- 只允许水平滚动 -->
<div class="touch-pan-x">Horizontal scroll area</div>
```

## 总结

Tailwind CSS 通过 utility-first 的理念，解决了传统 CSS 开发中的诸多痛点：

- ✅ 不再为命名发愁
- ✅ 避免样式冲突和全局污染
- ✅ CSS 文件体积可控
- ✅ 设计系统开箱即用
- ✅ 响应式和状态管理简单
- ✅ 开发效率和维护性提升

虽然初期可能需要适应新的开发方式，但长期来看，Tailwind CSS 能够显著提升开发体验和代码质量。
