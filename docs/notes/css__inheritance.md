---
group:
  title: CSS
  order: 2
title: CSS 继承机制
toc: content
order: 4
---

## 是什么：继承的本质

### 核心概念

在 CSS 中，**继承（Inheritance）** 是指子元素自动获得父元素某些 CSS 属性值的机制。

**关键特性：**

- 当子元素**没有明确设置**某个属性时，会自动继承父元素该属性的**计算值**
- 计算值：经过所有样式规则（样式表、内联样式等）计算后的最终值
- 并非所有 CSS 属性都会继承

### 基础示例

```html
<div class="parent">
  <p class="child">这段文字会继承父元素的颜色</p>
</div>
```

```css
.parent {
  color: blue; /* 父元素设置蓝色 */
}

.child {
  /* 未设置 color，自动继承父元素的 blue */
}
```

**结果：**`.child` 的文字显示为蓝色，即使它自己没有设置 `color` 属性。

---

## 为什么：继承的设计意义

### 1. 减少代码冗余

如果没有继承，我们需要为每个元素单独设置样式：

```css
/* ❌ 没有继承的世界 */
body {
  font-family: Arial, sans-serif;
}
h1 {
  font-family: Arial, sans-serif;
}
p {
  font-family: Arial, sans-serif;
}
span {
  font-family: Arial, sans-serif;
}
/* 需要为每个元素重复设置... */

/* ✅ 有继承的世界 */
body {
  font-family: Arial, sans-serif;
}
/* 所有子元素自动继承，无需重复 */
```

### 2. 保持视觉一致性

继承让整个页面的字体、颜色等保持统一，便于维护：

```css
body {
  font-size: 16px;
  color: #333;
  line-height: 1.6;
}
/* 所有文本元素自动继承这些样式，保证一致性 */
```

### 3. 符合文档结构的层级关系

继承反映了 HTML 的树形结构，父子关系在样式上得到自然体现。

---

## 怎么用：哪些属性会继承

### 默认可继承的属性

**设计原则：** 只有**不影响布局**的属性才会默认继承。

#### 1. 字体相关（全部可继承）

```css
.parent {
  font-family: 'Helvetica', sans-serif;
  font-size: 18px;
  font-style: italic;
  font-weight: bold;
  font-variant: small-caps;
}
/* 子元素自动继承所有字体属性 */
```

#### 2. 文本相关（大部分可继承）

```css
.parent {
  color: #333; /* ✅ 继承 */
  text-align: center; /* ✅ 继承 */
  text-indent: 2em; /* ✅ 继承 */
  line-height: 1.5; /* ✅ 继承 */
  letter-spacing: 1px; /* ✅ 继承 */
  word-spacing: 2px; /* ✅ 继承 */
  white-space: nowrap; /* ✅ 继承 */
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3); /* ✅ 继承 */
}
```

#### 3. 列表相关

```css
ul {
  list-style: square inside;
  list-style-type: disc;
  list-style-position: inside;
  list-style-image: url('bullet.png');
}
/* 所有 li 子元素继承这些样式 */
```

#### 4. 其他可继承属性

```css
.parent {
  visibility: hidden; /* ✅ 继承 */
  cursor: pointer; /* ✅ 继承 */
}
```

### 默认不可继承的属性

**布局相关属性**都不会继承（避免布局混乱）：

```css
.parent {
  width: 500px; /* ❌ 不继承 */
  height: 300px; /* ❌ 不继承 */
  margin: 20px; /* ❌ 不继承 */
  padding: 10px; /* ❌ 不继承 */
  border: 1px solid #ccc; /* ❌ 不继承 */
  background: #f0f0f0; /* ❌ 不继承 */
  display: flex; /* ❌ 不继承 */
  position: absolute; /* ❌ 不继承 */
}
```

**可视化对比图：**

![继承属性示意图](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/me/20240610014039.png)

---

## 控制继承行为

### 1. `inherit` - 强制继承

显式让子元素继承父元素的属性值（即使该属性默认不继承）：

```css
.parent {
  border: 2px solid red;
}

.child {
  border: inherit; /* 强制继承父元素的 border */
}
```

**应用场景：** 让非继承属性也能继承

```css
.card {
  padding: 20px;
}

.card-content {
  padding: inherit; /* 继承卡片的 padding */
}
```

### 2. `initial` - 重置为初始值

将属性设置为 CSS 规范定义的初始值（浏览器默认值）：

```css
.child {
  color: initial; /* 重置为黑色（color 的初始值） */
  margin: initial; /* 重置为 0（margin 的初始值） */
}
```

**应用场景：** 清除继承或之前的样式

```css
.reset-button {
  all: initial; /* 重置所有属性为初始值 */
}
```

### 3. `unset` - 智能重置

- 如果属性**可继承** → 表现为 `inherit`（继承父元素）
- 如果属性**不可继承** → 表现为 `initial`（重置为初始值）

```css
.parent {
  color: blue;
  margin: 20px;
}

.child {
  color: unset; /* 可继承 → 继承父元素的 blue */
  margin: unset; /* 不可继承 → 重置为 0 */
}
```

**应用场景：** 批量清除样式时很有用

```css
.clean-slate {
  all: unset; /* 清除所有样式，可继承的继承，不可继承的重置 */
}
```

### 4. `revert` - 回退到浏览器默认样式

恢复浏览器的默认样式（user-agent stylesheet）：

```css
button {
  all: revert; /* 回退到浏览器默认的按钮样式 */
}
```

### 关键字对比表

| 关键字    | 作用                                       | 示例                                 |
| --------- | ------------------------------------------ | ------------------------------------ |
| `inherit` | 继承父元素的值                             | `border: inherit`                    |
| `initial` | 设置为 CSS 规范的初始值                    | `color: initial` (黑色)              |
| `unset`   | 可继承属性继承，不可继承属性重置为初始值   | `all: unset`                         |
| `revert`  | 回退到浏览器默认样式                       | `button { all: revert }`             |

---

## 实战技巧

### 1. 使用 CSS 变量模拟继承

```css
:root {
  --spacing: 20px;
  --primary-color: #3498db;
}

.parent {
  margin: var(--spacing);
  color: var(--primary-color);
}

.child {
  margin: var(--spacing); /* 通过变量实现类似继承的效果 */
  color: var(--primary-color);
}
```

**优点：** 灵活控制，易于维护

### 2. 全局样式重置

```css
* {
  margin: 0; /* 全局重置 margin */
  padding: 0; /* 全局重置 padding */
  box-sizing: border-box; /* 统一盒模型 */
}
```

### 3. 利用继承建立排版系统

```css
/* 在根元素设置基础排版 */
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: #333;
}

/* 所有子元素自动继承，保证一致性 */
h1,
h2,
h3,
p,
li {
  /* 自动继承 font-family, color, line-height */
}

/* 只需覆盖特殊需求 */
h1 {
  font-size: 2.5rem; /* 只改字号 */
  font-weight: bold; /* 加粗 */
}
```

---

## 常见问题

### Q1: 为什么 `<a>` 标签不继承 `color`？

```html
<div style="color: red;">
  <a href="#">这个链接不是红色</a>
</div>
```

**原因：** 浏览器的默认样式表（user-agent stylesheet）为 `<a>` 设置了 `color`，优先级高于继承。

**解决：**

```css
a {
  color: inherit; /* 强制继承父元素颜色 */
}
```

### Q2: `line-height` 继承的是数值还是计算值？

```css
.parent {
  font-size: 20px;
  line-height: 1.5; /* 无单位数值 */
}

.child {
  font-size: 16px;
  /* line-height 继承的是 1.5（数值），而非 30px（计算值） */
  /* 因此 .child 的 line-height = 16px × 1.5 = 24px */
}
```

**最佳实践：** 使用无单位数值设置 `line-height`，保证子元素的行高与自身字号成比例。

### Q3: 如何阻止继承？

```css
.child {
  color: initial; /* 方法1：重置为初始值 */
  color: #000; /* 方法2：显式设置新值 */
}
```

---

## 总结与备忘

### 快速记忆口诀

> **字体文本列表，光标可见性，这些属性可继承**
> **盒模型背景边框，定位显示不继承**

### 核心要点

1. **继承是什么：** 子元素自动获得父元素某些属性的计算值
2. **为什么继承：** 减少代码、保持一致性、符合文档结构
3. **哪些可继承：** 字体、文本、列表、`visibility`、`cursor`
4. **哪些不继承：** 布局、盒模型、背景、边框、定位

### 控制继承的四个关键字

| 关键字    | 效果                 | 用途             |
| --------- | -------------------- | ---------------- |
| `inherit` | 强制继承父元素       | 让非继承属性继承 |
| `initial` | 重置为 CSS 初始值    | 清除样式         |
| `unset`   | 智能重置（继承/初始）| 批量清理         |
| `revert`  | 回退浏览器默认样式   | 恢复原生样式     |

### 最佳实践

1. ✅ 在 `body` 设置全局字体、颜色、行高，利用继承统一样式
2. ✅ 使用无单位数值设置 `line-height`
3. ✅ 必要时使用 `inherit` 强制继承
4. ❌ 避免在深层嵌套元素上频繁覆盖继承属性

---

## 延伸阅读

- [MDN - 继承](https://developer.mozilla.org/zh-CN/docs/Web/CSS/inheritance)
- [MDN - 层叠与继承](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Cascade_and_inheritance)
- [CSS 规范 - 继承](https://www.w3.org/TR/css-cascade-4/#inheritance)
