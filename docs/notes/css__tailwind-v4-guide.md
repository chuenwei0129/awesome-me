---
group:
  title: css
  order: 2
title: Tailwind v4 升级与实践
toc: content
order: 16
---

## 为什么升级到 v4？

Tailwind CSS v4 带来了革命性的变化，核心理念从 **JavaScript 配置优先** 转变为 **CSS 原生优先**。

### v4 核心优势

| 特性         | v3                                    | v4                      | 优势                              |
| ------------ | ------------------------------------- | ----------------------- | --------------------------------- |
| **配置方式** | `tailwind.config.js`                  | CSS 中的 `@theme`       | 更符合 Web 标准，无需 JS 配置     |
| **导入方式** | `@tailwind base/components/utilities` | `@import "tailwindcss"` | 标准 CSS 语法，更简洁             |
| **性能**     | 较快                                  | 更快                    | 原生 CSS 处理，零 JS 运行时       |
| **主题访问** | `resolveConfig()`                     | CSS 变量                | 直接在 CSS/JS 中使用，bundle 更小 |
| **工具链**   | PostCSS 依赖多                        | 内置处理                | 更少的依赖，更简单的配置          |
| **构建速度** | 快                                    | 极快                    | Rust 引擎，大幅提升               |

### 快速对比

**v3 方式：**

```css
/* app.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: '#3b82f6',
      },
    },
  },
};
```

**v4 方式：**

```css
/* app.css */
@import 'tailwindcss';

@theme {
  --color-brand: #3b82f6;
}
```

更简洁、更标准、更快！

## 快速开始

### 使用 Vite（推荐）

```sh
# 1. 安装依赖
npm install tailwindcss @tailwindcss/vite

# 2. 配置 Vite
```

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss()],
});
```

```css
/* src/app.css */
@import 'tailwindcss';
```

就这么简单！不需要 `tailwind.config.js`，不需要 PostCSS 配置。

### 使用 PostCSS

```sh
npm install tailwindcss @tailwindcss/postcss
```

```js
// postcss.config.js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
```

```css
/* app.css */
@import 'tailwindcss';
```

### 使用 CLI

```sh
npm install tailwindcss @tailwindcss/cli
```

```sh
npx @tailwindcss/cli -i input.css -o output.css --watch
```

## 从 v3 升级到 v4

### 🚀 自动升级（强烈推荐）

Tailwind 提供了官方的自动升级工具，可以处理 90% 的升级工作：

```sh
npx @tailwindcss/upgrade
```

**工具会自动：**

- ✅ 更新 package.json 中的依赖
- ✅ 迁移 `@tailwind` 指令到 `@import`
- ✅ 转换 `tailwind.config.js` 到 CSS `@theme`
- ✅ 更新废弃的类名
- ✅ 修复变体堆叠顺序
- ✅ 调整 PostCSS 配置

**要求：** Node.js 20 或更高版本

### 📋 手动升级步骤

如果你更喜欢手动控制升级过程：

#### 1. 更新依赖

```json
// package.json
{
  "devDependencies": {
    "tailwindcss": "^4.0.0",
    "@tailwindcss/vite": "^4.0.0"  // 如果使用 Vite
    // 或
    "@tailwindcss/postcss": "^4.0.0"  // 如果使用 PostCSS
  }
}
```

```sh
npm install
```

#### 2. 迁移 CSS 文件

**之前 (v3)：**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**之后 (v4)：**

```css
@import 'tailwindcss';
```

#### 3. 迁移配置文件

**之前 (v3)：**

```js
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        secondary: '#8b5cf6',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      spacing: {
        128: '32rem',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
```

**之后 (v4)：**

```css
/* app.css */
@import 'tailwindcss';

@theme {
  /* 颜色 */
  --color-primary: #3b82f6;
  --color-secondary: #8b5cf6;

  /* 字体 */
  --font-family-sans: 'Inter', sans-serif;

  /* 间距 */
  --spacing-128: 32rem;
}
```

**如果需要加载旧的 JS 配置：**

```css
@config "../../tailwind.config.js";
@import 'tailwindcss';
```

#### 4. 更新 PostCSS 配置

**之前 (v3)：**

```js
module.exports = {
  plugins: {
    'postcss-import': {},
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

**之后 (v4)：**

```js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
```

**说明：** `postcss-import` 和 `autoprefixer` 已内置，无需单独配置。

#### 5. 更新 Vite 配置（如果使用 Vite）

**之前 (v3)：**

```ts
import { defineConfig } from 'vite';

export default defineConfig({
  // PostCSS 自动处理 Tailwind
});
```

**之后 (v4)：**

```ts
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss()],
});
```

### ⚠️ 破坏性变化

#### 类名变化

Tailwind v4 为了更好的一致性，重命名了一些工具类：

| 类别     | v3            | v4            |
| -------- | ------------- | ------------- |
| **阴影** | `shadow-sm`   | `shadow-xs`   |
|          | `shadow`      | `shadow-sm`   |
|          | `shadow-md`   | `shadow`      |
|          | `shadow-lg`   | `shadow-md`   |
|          | `shadow-xl`   | `shadow-lg`   |
|          | `shadow-2xl`  | `shadow-xl`   |
| **圆角** | `rounded-sm`  | `rounded-xs`  |
|          | `rounded`     | `rounded-sm`  |
|          | `rounded-md`  | `rounded`     |
|          | `rounded-lg`  | `rounded-md`  |
|          | `rounded-xl`  | `rounded-lg`  |
|          | `rounded-2xl` | `rounded-xl`  |
|          | `rounded-3xl` | `rounded-2xl` |
| **模糊** | `blur-sm`     | `blur-xs`     |
|          | `blur`        | `blur-sm`     |
|          | `blur-md`     | `blur`        |
|          | `blur-lg`     | `blur-md`     |
|          | `blur-xl`     | `blur-lg`     |
|          | `blur-2xl`    | `blur-xl`     |
|          | `blur-3xl`    | `blur-2xl`    |

**自动升级工具会处理这些变化。**

#### 废弃的工具类

以下工具类已被现代替代方案取代：

| 废弃的类                | 替代方案               | 说明               |
| ----------------------- | ---------------------- | ------------------ |
| `flex-grow-*`           | `grow-*`               | 更简洁的名称       |
| `flex-shrink-*`         | `shrink-*`             | 更简洁的名称       |
| `bg-opacity-*`          | `bg-black/50`          | 使用不透明度修饰符 |
| `text-opacity-*`        | `text-black/50`        | 使用不透明度修饰符 |
| `border-opacity-*`      | `border-black/50`      | 使用不透明度修饰符 |
| `ring-opacity-*`        | `ring-black/50`        | 使用不透明度修饰符 |
| `placeholder-opacity-*` | `placeholder-black/50` | 使用不透明度修饰符 |
| `divide-opacity-*`      | `divide-black/50`      | 使用不透明度修饰符 |
| `decoration-slice`      | `box-decoration-slice` | 更准确的名称       |
| `decoration-clone`      | `box-decoration-clone` | 更准确的名称       |
| `overflow-ellipsis`     | `text-ellipsis`        | 更语义化           |

**迁移示例：**

```html
<!-- v3 -->
<div class="bg-blue-500 bg-opacity-50 flex-grow-1">Old way</div>

<!-- v4 -->
<div class="bg-blue-500/50 grow-1">New way</div>
```

#### 默认值变化

| 属性            | v3 默认值  | v4 默认值      | 影响                 |
| --------------- | ---------- | -------------- | -------------------- |
| `border` 颜色   | `gray-200` | `currentColor` | 边框现在继承文本颜色 |
| `divide` 颜色   | `gray-200` | `currentColor` | 分割线继承文本颜色   |
| `ring` 默认宽度 | `3px`      | `1px`          | 环形更细             |

**恢复 v3 行为：**

```css
/* 恢复 v3 的边框默认颜色 */
@layer base {
  *,
  ::after,
  ::before,
  ::backdrop,
  ::file-selector-button {
    border-color: var(--color-gray-200, currentColor);
  }
}
```

```html
<!-- 或明确指定 -->
<div class="border border-gray-200">Content</div>

<!-- v4 中需要明确宽度来获得 3px ring -->
<input class="ring-3 ring-blue-500" />
```

#### 变体堆叠顺序变化

v4 将变体堆叠顺序从**右到左**改为**左到右**（更符合直觉）：

```html
<!-- v3: 右到左 -->
<ul class="first:*:pt-0 last:*:pb-0">
  <!-- first:*:pt-0 先应用 * 选择器，再应用 first -->
</ul>

<!-- v4: 左到右 -->
<ul class="*:first:pt-0 *:last:pb-0">
  <!-- *:first:pt-0 先应用 *，再应用 first -->
</ul>
```

#### CSS 变量语法变化

在任意值中使用 CSS 变量时，语法有所变化：

```html
<!-- v3 -->
<div class="bg-[--brand-color]">Old syntax</div>

<!-- v4 -->
<div class="bg-(--brand-color)">New syntax</div>
```

**建议：** 使用 `@theme` 定义颜色，然后直接使用类名：

```css
@theme {
  --color-brand: #3b82f6;
}
```

```html
<div class="bg-brand">Clean and simple</div>
```

#### 容器工具类变化

`container` 的 `center` 和 `padding` 配置选项已移除，使用 `@utility` 自定义：

**v3:**

```js
module.exports = {
  theme: {
    container: {
      center: true,
      padding: '2rem',
    },
  },
};
```

**v4:**

```css
@utility container {
  margin-inline: auto;
  padding-inline: 2rem;
}
```

#### Space 工具类内部变化

`space-x-*` 和 `space-y-*` 的内部选择器已更新，可能影响某些边缘情况。

**建议：** 优先使用 `gap` 代替 `space-*`：

```html
<!-- 推荐 -->
<div class="flex flex-col gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

<!-- 而非 -->
<div class="flex flex-col space-y-4">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

## CSS-First 配置详解

### @theme 指令

`@theme` 是 v4 的核心特性，让你直接在 CSS 中定义设计系统：

#### 颜色系统

```css
@theme {
  /* 单一颜色 */
  --color-brand: #3b82f6;

  /* 颜色色阶 */
  --color-primary-50: #eff6ff;
  --color-primary-100: #dbeafe;
  --color-primary-200: #bfdbfe;
  --color-primary-500: #3b82f6;
  --color-primary-900: #1e3a8a;

  /* 使用 oklch（推荐） */
  --color-avocado-100: oklch(0.99 0 0);
  --color-avocado-500: oklch(0.84 0.18 117.33);
  --color-avocado-900: oklch(0.53 0.12 118.34);
}
```

**使用：**

```html
<div class="bg-brand text-white">Brand color</div>
<div class="bg-primary-500 hover:bg-primary-600">Primary</div>
<div class="bg-avocado-500">Avocado</div>
```

#### 字体系统

```css
@theme {
  /* 字体族 */
  --font-family-sans: 'Inter', ui-sans-serif, sans-serif;
  --font-family-serif: 'Merriweather', ui-serif, serif;
  --font-family-mono: 'JetBrains Mono', ui-monospace, monospace;
  --font-family-display: 'Satoshi', sans-serif;

  /* 字体大小（可选，已有默认值） */
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;

  /* 字体粗细（可选） */
  --font-weight-thin: 100;
  --font-weight-normal: 400;
  --font-weight-bold: 700;
}
```

**使用：**

```html
<h1 class="font-display text-4xl font-bold">Display Heading</h1>
<p class="font-sans text-base">Body text</p>
<code class="font-mono text-sm">const code = true;</code>
```

#### 间距系统

```css
@theme {
  /* 自定义间距 */
  --spacing-18: 4.5rem; /* 72px */
  --spacing-128: 32rem; /* 512px */

  /* 负值间距 */
  --spacing--4: -1rem;
}
```

**使用：**

```html
<div class="p-18 m-128">Large spacing</div>
<div class="mt--4">Negative margin</div>
```

#### 断点系统

```css
@theme {
  /* 额外的断点 */
  --breakpoint-3xl: 1920px;
  --breakpoint-4xl: 2560px;

  /* 容器查询断点 */
  --container-xs: 20rem;
  --container-md: 28rem;
}
```

**使用：**

```html
<div class="text-base 3xl:text-lg 4xl:text-xl">Responsive text</div>
```

#### 圆角系统

```css
@theme {
  --radius-xs: 0.125rem;
  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;
  --radius-2xl: 1rem;
  --radius-4xl: 2rem;
}
```

#### 阴影系统

```css
@theme {
  --shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.1);
  --shadow-brutal: 4px 4px 0 0 black;

  /* Drop shadow */
  --drop-shadow-brutal: drop-shadow(4px 4px 0 black);
}
```

#### 动画系统

```css
@theme {
  /* 缓动函数 */
  --ease-fluid: cubic-bezier(0.3, 0, 0, 1);
  --ease-snappy: cubic-bezier(0.2, 0, 0, 1);

  /* 动画时长 */
  --duration-150: 150ms;
  --duration-300: 300ms;
}
```

#### 完整示例

```css
@import 'tailwindcss';

@theme {
  /* 品牌颜色 */
  --color-brand-primary: #3b82f6;
  --color-brand-secondary: #8b5cf6;
  --color-brand-accent: #f59e0b;

  /* 字体 */
  --font-family-sans: 'Inter', sans-serif;
  --font-family-display: 'Satoshi', sans-serif;

  /* 间距 */
  --spacing-18: 4.5rem;

  /* 断点 */
  --breakpoint-3xl: 1920px;

  /* 阴影 */
  --shadow-brutal: 4px 4px 0 0 black;

  /* 动画 */
  --ease-fluid: cubic-bezier(0.3, 0, 0, 1);
}
```

### @utility 指令

用于创建自定义工具类，替代 v3 的 `@layer utilities`：

#### 基本用法

```css
/* 简单工具类 */
@utility tab-4 {
  tab-size: 4;
}

/* 带参数的工具类 */
@utility tab-* {
  tab-size: *;
}
```

**使用：**

```html
<pre class="tab-4">Code with 4-space tabs</pre>
<pre class="tab-2">Code with 2-space tabs</pre>
<pre class="tab-8">Code with 8-space tabs</pre>
```

#### 组件式工具类

```css
@utility btn {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 600;
  transition: all 150ms;
}

@utility btn-primary {
  background-color: var(--color-blue-500);
  color: white;
}

@utility btn-primary:hover {
  background-color: var(--color-blue-600);
}
```

**使用：**

```html
<button class="btn btn-primary">Click me</button>
```

#### 复杂示例

```css
@utility card {
  background: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
}

@utility card-hover:hover {
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  transform: translateY(-2px);
}
```

**使用：**

```html
<div class="card card-hover">
  <h2 class="text-xl font-bold">Card Title</h2>
  <p class="text-gray-600">Card content</p>
</div>
```

### @variant 指令

创建自定义变体：

```css
/* 自定义深色模式变体 */
@variant dark (&:where(.dark, .dark *));

/* 自定义数据属性变体 */
@variant theme-midnight (&:where([data-theme="midnight"] *));
```

**使用：**

```html
<html class="dark">
  <div class="bg-white dark:bg-black">Dark mode support</div>
</html>

<div data-theme="midnight">
  <p class="text-gray-900 theme-midnight:text-blue-400">Themed text</p>
</div>
```

### @reference 指令

在 Vue/Svelte 单文件组件或 CSS Modules 中使用 `@apply` 时需要：

```vue
<template>
  <h1>Hello world!</h1>
</template>

<style>
@reference "../../app.css";

h1 {
  @apply text-2xl font-bold text-red-500;
}
</style>
```

**更好的方式（推荐）：**

```vue
<style>
h1 {
  color: var(--color-red-500);
  font-size: var(--text-2xl);
  font-weight: var(--font-weight-bold);
}
</style>
```

## 实践技巧

### 1. 主题切换

v4 使用原生 CSS 变量，主题切换变得超级简单：

```css
@import 'tailwindcss';

/* 浅色主题 */
@theme {
  --color-bg-primary: #ffffff;
  --color-bg-secondary: #f3f4f6;
  --color-text-primary: #111827;
  --color-text-secondary: #6b7280;
}

/* 深色主题 */
@media (prefers-color-scheme: dark) {
  @theme {
    --color-bg-primary: #111827;
    --color-bg-secondary: #1f2937;
    --color-text-primary: #f9fafb;
    --color-text-secondary: #d1d5db;
  }
}

/* 或使用类名切换 */
.dark {
  @theme {
    --color-bg-primary: #111827;
    --color-bg-secondary: #1f2937;
    --color-text-primary: #f9fafb;
    --color-text-secondary: #d1d5db;
  }
}
```

**使用：**

```html
<div class="bg-bg-primary text-text-primary">
  Automatically adapts to light/dark mode
</div>
```

### 2. 组件库集成

v4 的 CSS 变量使得与其他 UI 库集成更简单：

```ts
// 使用 Framer Motion
import { motion } from 'framer-motion';

export function AnimatedBox() {
  return (
    <motion.div
      initial={{ y: 'var(--spacing-8)' }}
      animate={{ y: 0 }}
      exit={{ y: 'var(--spacing-8)' }}
      className="bg-white rounded-lg shadow-lg p-6"
    >
      Animated content
    </motion.div>
  );
}
```

```ts
// 直接在 JS 中访问主题值
const styles = getComputedStyle(document.documentElement);
const primaryColor = styles.getPropertyValue('--color-primary-500');
```

### 3. 前缀配置

如果需要与其他 CSS 框架共存，可以添加前缀：

```css
@import 'tailwindcss' prefix(tw);

@theme {
  --color-primary: #3b82f6;
}
```

**生成的类名：**

```html
<div class="tw-flex tw-items-center tw-bg-primary">Prefixed utilities</div>
```

**生成的 CSS 变量：**

```css
:root {
  --tw-color-primary: #3b82f6;
}
```

### 4. Important 策略

```css
/* 全局 important */
@import 'tailwindcss' important;

/* 或在特定选择器下 */
@import 'tailwindcss' important(#app);
```

```css
/* 生成的 CSS */
@layer utilities {
  .flex {
    display: flex !important;
  }
}

/* 或 */
#app .flex {
  display: flex;
}
```

### 5. 禁用 Preflight

如果不需要样式重置：

```css
@layer theme, base, components, utilities;

@import 'tailwindcss/theme.css' layer(theme);
@import 'tailwindcss/utilities.css' layer(utilities);
/* 不导入 preflight */
```

### 6. 共享主题配置

在大型项目或 Monorepo 中共享主题：

```css
/* packages/brand/theme.css */
@theme {
  --color-brand-primary: #3b82f6;
  --color-brand-secondary: #8b5cf6;
  --font-family-sans: 'Inter', sans-serif;
}
```

```css
/* apps/web/app.css */
@import 'tailwindcss';
@import '@company/brand/theme.css';

/* 可以覆盖或扩展 */
@theme {
  --color-accent: #f59e0b;
}
```

### 7. 条件编译

使用不同的主题文件：

```css
/* app.css */
@import 'tailwindcss';

/* 开发环境 */
@import './theme.dev.css' layer(theme);

/* 生产环境 */
@import './theme.prod.css' layer(theme);
```

### 8. 自定义工具类库

创建可复用的工具类库：

```css
/* utils/buttons.css */
@utility btn {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 600;
  transition: all 150ms;
  cursor: pointer;
}

@utility btn-sm {
  padding: 0.25rem 0.75rem;
  font-size: 0.875rem;
}

@utility btn-lg {
  padding: 0.75rem 1.5rem;
  font-size: 1.125rem;
}

@utility btn-primary {
  background-color: var(--color-blue-500);
  color: white;
}

@utility btn-primary:hover {
  background-color: var(--color-blue-600);
}
```

```css
/* app.css */
@import 'tailwindcss';
@import './utils/buttons.css';
```

### 9. 性能优化

```css
/* 只导入需要的部分 */
@import 'tailwindcss/preflight' layer(base);
@import 'tailwindcss/utilities' layer(utilities);

/* 跳过默认主题，完全自定义 */
@theme {
  --color-*: initial;
  --color-gray-50: #f8fafc;
  --color-gray-100: #f1f5f9;
  /* 只定义需要的颜色 */
}
```

## 常见问题

### Q: 如何在 Next.js 中使用 v4？

```ts
// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  serverExternalPackages: ['@tailwindcss/node'],
};

export default nextConfig;
```

```css
/* app/globals.css */
@import 'tailwindcss';

@theme {
  --color-primary: #3b82f6;
}
```

```ts
// app/layout.tsx
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white dark:bg-gray-950">{children}</body>
    </html>
  );
}
```

### Q: v4 还需要 `content` 配置吗？

不需要！v4 会自动检测你的模板文件。但如果需要自定义，可以使用：

```css
@import 'tailwindcss' source('./src/**/*.{js,jsx,ts,tsx}');
```

### Q: 如何在 v4 中使用插件？

大多数插件需要更新以支持 v4。使用 `@plugin` 指令加载：

```css
@import 'tailwindcss';
@plugin "@tailwindcss/typography";
```

### Q: CSS 变量和 `theme()` 函数有什么区别？

```css
/* v3 方式 - theme() 函数 */
.my-class {
  background-color: theme('colors.red.500');
}

/* v4 方式 - CSS 变量（推荐） */
.my-class {
  background-color: var(--color-red-500);
}

/* v4 中 theme() 主要用于 media query */
@media (width >= theme(--breakpoint-xl)) {
  /* ... */
}
```

### Q: 升级后控制台有警告怎么办？

v4 会显示废弃警告。查看警告信息并根据提示更新代码：

```text
⚠ Using deprecated utilities:
  - 'flex-grow-1' is deprecated, use 'grow-1' instead
  - 'bg-opacity-50' is deprecated, use 'bg-*/50' instead
```

### Q: 如何处理第三方库的样式冲突？

使用前缀：

```css
@import 'tailwindcss' prefix(tw);
```

或使用 `important`：

```css
@import 'tailwindcss' important;
```

### Q: 旧项目依赖 `tailwind.config.js`，如何过渡？

保留配置文件并使用 `@config`：

```css
@config "./tailwind.config.js";
@import 'tailwindcss';
```

逐步迁移到 `@theme`。

## 最佳实践

### 1. 渐进式升级

不要一次性升级整个项目：

1. **第一阶段**：运行自动升级工具
2. **第二阶段**：修复警告和错误
3. **第三阶段**：逐步迁移配置到 CSS
4. **第四阶段**：优化和清理

### 2. 使用 CSS 变量

充分利用 v4 的 CSS 变量特性：

```css
@theme {
  /* 定义语义化颜色 */
  --color-bg-primary: var(--color-white);
  --color-bg-secondary: var(--color-gray-50);
  --color-text-primary: var(--color-gray-900);
  --color-text-secondary: var(--color-gray-600);
}

@media (prefers-color-scheme: dark) {
  @theme {
    --color-bg-primary: var(--color-gray-900);
    --color-bg-secondary: var(--color-gray-800);
    --color-text-primary: var(--color-gray-50);
    --color-text-secondary: var(--color-gray-300);
  }
}
```

### 3. 组织你的 CSS

```css
/* app.css */
@import 'tailwindcss';

/* 主题配置 */
@import './theme/colors.css';
@import './theme/typography.css';
@import './theme/spacing.css';

/* 自定义工具类 */
@import './utils/buttons.css';
@import './utils/forms.css';
@import './utils/cards.css';
```

### 4. 文档化自定义主题

```css
/**
 * 品牌颜色系统
 * Primary: 用于主要操作按钮、链接
 * Secondary: 用于次要操作
 * Accent: 用于强调和提示
 */
@theme {
  --color-brand-primary: #3b82f6;
  --color-brand-secondary: #8b5cf6;
  --color-brand-accent: #f59e0b;
}
```

### 5. 性能监控

```sh
# 查看生成的 CSS 大小
npx @tailwindcss/cli -i input.css -o output.css --minify

# 分析未使用的样式
# v4 自动只生成用到的样式，无需额外配置
```

## 总结

Tailwind CSS v4 带来了：

- ✅ **更简单的配置**：CSS-first，无需 JS 配置文件
- ✅ **更好的性能**：原生 CSS 处理，更快的构建速度
- ✅ **更标准的语法**：使用标准 CSS 特性
- ✅ **更小的 Bundle**：CSS 变量代替 JS 配置
- ✅ **更好的 DX**：自动检测，零配置
- ✅ **向后兼容**：提供迁移工具和兼容层

v4 是 Tailwind 的未来，升级是值得的！

## 扩展阅读

- [Tailwind CSS v4 官方文档](https://tailwindcss.com/docs)
- [升级指南](https://tailwindcss.com/docs/upgrade-guide)
- [v4 发布博客](https://tailwindcss.com/blog/tailwindcss-v4)
- [GitHub Discussions](https://github.com/tailwindlabs/tailwindcss/discussions)
