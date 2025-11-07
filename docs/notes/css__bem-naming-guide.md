---
group:
  title: CSS
  order: 2
title: BEM 命名规范
toc: content
order: 11
---

## 什么是 BEM？

BEM 是 "Block，Element，Modifier" 的缩写，是一种用于命名 CSS 类的命名方法论。这种方法由俄罗斯的 Yandex 团队提出，旨在提高代码的可读性和可维护性。

BEM 将用户界面分解为独立的块 (Block)，元素 (Element) 和修饰符 (Modifier)，从而使代码更加模块化和可重用。

## 为什么需要 BEM？

在传统的 CSS 开发中，我们常常遇到以下问题：

- **命名冲突**：`.title` 这样的通用类名容易在不同组件中冲突
- **层级嵌套过深**：`.header .nav .menu .item` 这样的选择器难以维护
- **样式耦合**：修改一个样式可能影响到其他不相关的元素
- **可读性差**：无法从类名直接看出元素的作用和层级关系

BEM 通过严格的命名约定解决了这些问题。

## BEM 的核心概念

### 1. Block (块)

块是页面中的独立实体，是可以被复用的组件。**块名应该描述它的用途，而不是状态**。

```css
.button {
} /* ✅ 好的命名 */
.header {
}
.search-form {
}

.red-button {
} /* ❌ 不好的命名 - 描述了外观 */
```

### 2. Element (元素)

元素是块的组成部分，**没有独立存在的意义**。元素与块通过双下划线 (`__`) 连接。

```css
.button__icon {
} /* button 块中的 icon 元素 */
.header__logo {
} /* header 块中的 logo 元素 */
.search-form__input {
} /* search-form 块中的 input 元素 */
```

**注意**：元素不能嵌套命名，即使 HTML 结构是嵌套的。

```html
<!-- ❌ 错误：不要这样嵌套命名 -->
<div class="block">
  <div class="block__elem1">
    <div class="block__elem1__elem2"></div>
  </div>
</div>

<!-- ✅ 正确：所有元素都直接连接到块 -->
<div class="block">
  <div class="block__elem1">
    <div class="block__elem2"></div>
  </div>
</div>
```

### 3. Modifier (修饰符)

修饰符用于定义块或元素的**不同状态或变体**。修饰符与块或元素通过双连字符 (`--`) 连接。

```css
.button--primary {
} /* 主按钮变体 */
.button--large {
} /* 大尺寸变体 */
.button--disabled {
} /* 禁用状态 */
.search-form__input--error {
} /* 错误状态的输入框 */
```

## 实战示例

### 基础示例：按钮组件

HTML:

```html
<button class="button button--primary">
  <span class="button__icon">→</span>
  <span class="button__text">提交</span>
</button>

<button class="button button--secondary button--large">
  <span class="button__text">取消</span>
</button>
```

CSS:

```css
/* Block */
.button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

/* Elements */
.button__icon {
  font-size: 16px;
  line-height: 1;
}

.button__text {
  line-height: 1.5;
}

/* Modifiers */
.button--primary {
  background-color: #1890ff;
  color: white;
}

.button--primary:hover {
  background-color: #40a9ff;
}

.button--secondary {
  background-color: #f0f0f0;
  color: #333;
}

.button--large {
  padding: 14px 28px;
  font-size: 16px;
}

.button--disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}
```

### 复杂示例：卡片组件

HTML:

```html
<article class="card card--featured">
  <div class="card__header">
    <img class="card__image" src="cover.jpg" alt="封面" />
    <span class="card__badge card__badge--hot">热门</span>
  </div>

  <div class="card__body">
    <h3 class="card__title">文章标题</h3>
    <p class="card__description">这是文章的简短描述内容...</p>

    <div class="card__meta">
      <span class="card__author">作者名</span>
      <span class="card__date">2024-01-01</span>
    </div>
  </div>

  <div class="card__footer">
    <button class="button button--small">阅读更多</button>
  </div>
</article>
```

CSS:

```css
/* Block */
.card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

/* Elements */
.card__header {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
}

.card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card__badge {
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.card__badge--hot {
  background: #ff4d4f;
  color: white;
}

.card__body {
  padding: 20px;
}

.card__title {
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: 600;
  color: #333;
}

.card__description {
  margin: 0 0 16px;
  color: #666;
  line-height: 1.6;
}

.card__meta {
  display: flex;
  gap: 16px;
  font-size: 14px;
  color: #999;
}

.card__footer {
  padding: 0 20px 20px;
}

/* Modifiers */
.card--featured {
  border: 2px solid #1890ff;
}

.card--featured .card__title {
  color: #1890ff;
}
```

## 最佳实践

### 1. 保持块的独立性

块应该是独立的，可以在页面的任何位置使用，不依赖父容器的样式。

```css
/* ❌ 不好：依赖外部环境 */
.page .button {
  margin-top: 20px;
}

/* ✅ 好：如需要间距，使用修饰符或布局类 */
.button--spaced {
  margin-top: 20px;
}
```

### 2. 避免过度使用元素

并非所有的 HTML 元素都需要 BEM 类名，对于纯粹的样式元素可以使用标签选择器。

```css
/* ✅ 可以接受 */
.card__body p {
  line-height: 1.6;
}

.button__text strong {
  font-weight: 600;
}
```

### 3. 修饰符需要配合基础类使用

```html
<!-- ❌ 错误：只使用修饰符 -->
<button class="button--primary">按钮</button>

<!-- ✅ 正确：基础类 + 修饰符 -->
<button class="button button--primary">按钮</button>
```

### 4. 使用有意义的命名

命名应该描述用途，而不是外观或位置。

```css
/* ❌ 不好 */
.card__left-text {
}
.card__blue-title {
}

/* ✅ 好 */
.card__meta {
}
.card__title--highlighted {
}
```

### 5. 组合多个修饰符

一个块可以同时使用多个修饰符。

```html
<button class="button button--primary button--large button--loading">
  提交中...
</button>
```

## 常见误区

### ❌ 误区 1：元素嵌套命名

```css
/* 错误 */
.block__elem1__elem2 {
}

/* 正确 */
.block__elem1 {
}
.block__elem2 {
}
```

### ❌ 误区 2：在修饰符中定义所有样式

```css
/* 错误：修饰符不应该重复基础样式 */
.button--primary {
  display: flex;
  padding: 10px;
  background: blue;
  color: white;
}

/* 正确：修饰符只定义差异 */
.button {
  display: flex;
  padding: 10px;
}

.button--primary {
  background: blue;
  color: white;
}
```

### ❌ 误区 3：把所有东西都变成块

```html
<!-- 过度设计 -->
<div class="text">
  <span class="text__content">Hello</span>
</div>

<!-- 简单的文本不需要 BEM -->
<div class="text">Hello</div>
```

## 何时使用 BEM？

### ✅ 适合使用 BEM 的场景

- 中大型项目，需要多人协作
- 组件化开发，需要复用组件
- 长期维护的项目
- 需要避免样式冲突的项目

### ⚠️ 不必使用 BEM 的场景

- 小型个人项目或原型
- 使用 CSS-in-JS 或 CSS Modules 的项目（已有作用域隔离）
- 使用原子化 CSS 框架（如 Tailwind CSS）的项目
- 简单的静态页面

## 与其他方案的配合

BEM 可以与其他 CSS 方法论配合使用：

```html
<!-- BEM + 工具类 -->
<div class="card mb-4 shadow-sm">
  <div class="card__header"></div>
</div>

<!-- BEM + CSS Modules -->
<div className="{styles.card}">
  <div className="{styles.card__header}"></div>
</div>
```

## 总结

BEM 命名规范的核心价值在于：

1. **明确的命名约定** - 一眼就能看出元素的层级和作用
2. **降低样式冲突** - 避免全局命名空间污染
3. **提高可维护性** - 组件独立，修改影响范围可控
4. **便于团队协作** - 统一的命名规则降低沟通成本

记住：**BEM 不是银弹**，它是一个工具。在合适的场景使用它，可以帮助你编写更清晰、可维护的 CSS 代码。不要为了使用 BEM 而使用 BEM，选择最适合你项目的方案才是最重要的。
