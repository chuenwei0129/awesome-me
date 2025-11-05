---
group:
  title: CSS
  order: 2
title: CSS 选择器
toc: content
---

## 选择器基础

CSS 中有多种选择器,用于选择要样式化的元素。下面我们通过一个综合案例来说明常用选择器的使用方法。

```jsx | pure
import './style.css';

export default function page() {
  return (
    <div className="container">
      <h1 id="title">Hello, CSS!</h1>
      <p className="content">This is a content.</p>
      <p className="content">This is another content.</p>
      <ul id="list">
        <li id="item">Item 1</li>
        <li className="active">Item 2</li>
        <li>Item 3</li>
      </ul>
      <div className="container">
        <p>Inside container</p>
      </div>
    </div>
  );
}
```

```css
/* style.css */

/* 元素选择器 + 后代选择器 + 伪类选择器 */
ul li:first-child {
  color: bisque;
}

/* 子元素选择器：仅选择直接子元素 */
.container > p {
  border: 1px solid red;
}

/* 类选择器：选择具有指定类名的元素 */
li.active {
  font-weight: bold;
  color: red;
}

/* 通用选择器：选择所有元素 */
.container * {
  font-style: italic;
}

/* 相邻兄弟选择器：选择紧接在指定元素之后的同级元素 */
h1 + p {
  background-color: blanchedalmond;
}

/* 通用兄弟选择器：选择指定元素之后的所有同级元素 */
h1 ~ p {
  color: red;
}

/* :not() 伪类：选择不匹配指定选择器的元素 */
li:not(.active) {
  text-decoration: underline;
}

/* 属性选择器：选择具有指定属性或属性值的元素 */
li[id^='item'] {
  font-size: 30px;
}
```

### 选择器类型速查

| 选择器类型     | 语法示例         | 说明                        |
| -------------- | ---------------- | --------------------------- |
| 元素选择器     | `p`、`div`       | 选择指定类型的所有元素      |
| 类选择器       | `.className`     | 选择具有指定 class 的元素   |
| ID 选择器      | `#idName`        | 选择具有指定 id 的元素      |
| 属性选择器     | `[attr="value"]` | 选择具有指定属性的元素      |
| 后代选择器     | `div p`          | 选择 div 内的所有 p 元素    |
| 子元素选择器   | `div > p`        | 仅选择 div 的直接子元素 p   |
| 相邻兄弟选择器 | `h1 + p`         | 选择紧跟在 h1 后的 p 元素   |
| 通用兄弟选择器 | `h1 ~ p`         | 选择 h1 后的所有 p 兄弟元素 |

### 属性选择器详解

属性选择器提供了强大的元素匹配能力:

```css
/* 存在属性 */
[disabled] {
  opacity: 0.5;
}

/* 完全匹配 */
[type='text'] {
  border-color: blue;
}

/* 以...开头 */
[class^='btn-'] {
  padding: 10px;
}

/* 以...结尾 */
[href$='.pdf'] {
  color: red;
}

/* 包含... */
[class*='icon'] {
  display: inline-block;
}

/* 空格分隔的词列表中包含 */
[class~='active'] {
  font-weight: bold;
}

/* 连字符分隔的词列表中以...开头 */
[lang|='en'] {
  font-family: Arial;
}
```

> **提示**: 关于属性选择器中引号的问题,虽然在某些情况下可以省略,但为了保险起见和更好的可读性,建议总是使用引号。

## 选择器优先级

> 在线工具：[CSS Specificity Calculator](https://polypane.app/css-specificity-calculator)

### 优先级计算规则

1. **内联样式** > **ID 选择器** > **类/属性/伪类选择器** > **元素/伪元素选择器** > **通用选择器**

2. 优先级可以表示为三位数 `(ID数-类数-元素数)`,例如:

   - `#nav .list li` 的优先级是 `1-1-1`
   - `.container > p` 的优先级是 `0-1-1`
   - `div p` 的优先级是 `0-0-2`

3. 当优先级相同时,**后定义的规则会覆盖先定义的规则**

4. `!important` 声明优先级最高,但应该谨慎使用

### 特殊选择器的优先级

1. **通用选择器 `*`**、组合符 (`+`、`>`、`~`) 和 **`:where()`** 不影响优先级

2. **`:not()`** 和 **`:is()`** 本身不影响优先级,但它们的参数会影响:

   - 参数中优先级最高的选择器将作为该伪类的优先级

3. **内联样式** 的优先级可以理解为 `1-0-0-0`

### 优先级示例对照表

| 选择器                                    | ID  | 类  | 元素 | 优先级 |
| ----------------------------------------- | --- | --- | ---- | ------ |
| `h1`                                      | 0   | 0   | 1    | 0-0-1  |
| `h1 + p::first-letter`                    | 0   | 0   | 3    | 0-0-3  |
| `li > a[href*="en-US"] > .inline-warning` | 0   | 2   | 2    | 0-2-2  |
| `#identifier`                             | 1   | 0   | 0    | 1-0-0  |
| `button:not(#mainBtn, .cta)`              | 1   | 0   | 1    | 1-0-1  |

### 样式顺序的影响

**重要**: 当多个选择器优先级相同时,样式取决于它们在样式表中的定义顺序,而不是 HTML 中 class 的顺序。

```css
.blue {
  color: blue;
}
.red {
  color: red;
}
```

```html
<!-- 无论 class 顺序如何,文字都是红色,因为 .red 在 CSS 中后定义 -->
<p class="blue red">我是红色</p>
<p class="red blue">我也是红色</p>
```

> **注意**: 如果 `.blue` 和 `.red` 在不同的 CSS 文件中,最终样式将取决于 CSS 文件的加载顺序。

## 常用伪类

### 交互状态伪类

这些是开发中最常用的伪类:

```css
/* 链接状态 - 按 LVHA 顺序书写 (Link-Visited-Hover-Active) */
a:link {
  color: blue;
} /* 未访问的链接 */
a:visited {
  color: purple;
} /* 已访问的链接 */
a:hover {
  color: red;
} /* 鼠标悬停 */
a:active {
  color: orange;
} /* 正在点击 */

/* 表单状态 */
input:focus {
  border-color: blue;
} /* 获得焦点 */
input:focus-visible {
  outline: 2px solid blue;
} /* 键盘焦点 */
input:disabled {
  opacity: 0.5;
} /* 禁用状态 */
input:enabled {
  cursor: pointer;
} /* 启用状态 */
input:checked {
  background: green;
} /* 选中状态 */
input:valid {
  border-color: green;
} /* 验证通过 */
input:invalid {
  border-color: red;
} /* 验证失败 */
input:required {
  border-left: 3px solid red;
} /* 必填项 */
input:optional {
  border-left: 3px solid gray;
} /* 可选项 */
```

### 结构伪类

用于选择特定位置的元素:

```css
/* 选择第一个/最后一个子元素 */
li:first-child {
  font-weight: bold;
}
li:last-child {
  border-bottom: none;
}

/* 选择特定类型的第一个/最后一个 */
p:first-of-type {
  margin-top: 0;
}
p:last-of-type {
  margin-bottom: 0;
}

/* 选择唯一的子元素 */
p:only-child {
  text-align: center;
}
p:only-of-type {
  font-style: italic;
}

/* 按公式选择 */
li:nth-child(2n) {
  background: #f0f0f0;
} /* 偶数项 */
li:nth-child(2n + 1) {
  background: white;
} /* 奇数项 */
li:nth-child(3n) {
  font-weight: bold;
} /* 每3个 */
li:nth-last-child(2) {
  color: red;
} /* 倒数第2个 */

/* 简写形式 */
li:nth-child(even) {
  background: #f0f0f0;
} /* 等同于 2n */
li:nth-child(odd) {
  background: white;
} /* 等同于 2n+1 */
```

### 逻辑伪类

```css
/* :not() - 排除特定元素 */
li:not(.active) {
  opacity: 0.6;
}
input:not([type='submit']) {
  border-radius: 4px;
}

/* :is() - 匹配列表中任一选择器 */
:is(h1, h2, h3) {
  margin-top: 0;
}
/* 等同于 h1, h2, h3 { margin-top: 0; } */

/* :where() - 类似 :is() 但优先级为 0 */
:where(article, section) p {
  line-height: 1.6;
}

/* :has() - 根据子元素选择父元素 (相对较新) */
div:has(> img) {
  display: flex;
}
article:has(h2) {
  padding-top: 20px;
}
```

### 其他实用伪类

```css
/* 选择空元素 */
div:empty {
  display: none;
}

/* 目标元素 (通过 URL 锚点) */
:target {
  background: yellow;
}

/* 根元素 (通常是 <html>) */
:root {
  --main-color: #333;
  --spacing: 8px;
}
```

> **更多伪类**: 查阅 [MDN 伪类完整列表](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Pseudo-classes)

### 实战案例：表单验证样式

```css
/* 表单验证的完整样式方案 */
.form-field {
  position: relative;
  margin-bottom: 20px;
}

/* 必填字段标记 */
.form-field input:required + label::after {
  content: '*';
  color: red;
  margin-left: 4px;
}

/* 验证通过 */
.form-field input:valid {
  border-color: #4caf50;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%234CAF50' d='M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 20px;
}

/* 验证失败 */
.form-field input:invalid:not(:placeholder-shown) {
  border-color: #f44336;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23F44336' d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 20px;
}

/* 聚焦状态 */
.form-field input:focus {
  outline: none;
  border-color: #2196f3;
  box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1);
}

/* 禁用状态 */
.form-field input:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
  opacity: 0.6;
}
```

## 常用伪元素

伪元素创建不在 DOM 中的元素,用双冒号 `::` 表示。

### ::before 和 ::after

最常用的伪元素,可用于添加装饰性内容:

```css
/* 基础用法 */
.icon::before {
  content: '→';
  margin-right: 5px;
}

/* 清除浮动 */
.clearfix::after {
  content: '';
  display: table;
  clear: both;
}

/* 装饰性图标 */
.external-link::after {
  content: '↗';
  font-size: 0.8em;
  margin-left: 3px;
}

/* 必填标记 */
.required::before {
  content: '*';
  color: red;
  margin-right: 2px;
}

/* 引号 */
blockquote::before {
  content: '"';
  font-size: 2em;
  color: #999;
}
```

> **重要**: `::before` 和 `::after` 生成的是行级元素,不能应用于替换元素(如 `<img>`、`<input>`),因为它们的内容会被替换。

### 其他有用的伪元素

```css
/* 首字母 */
p::first-letter {
  font-size: 2em;
  font-weight: bold;
  float: left;
}

/* 首行 */
p::first-line {
  font-variant: small-caps;
}

/* 选中的文本 */
::selection {
  background: yellow;
  color: black;
}

/* 占位符文本 */
input::placeholder {
  color: #999;
  font-style: italic;
}

/* 列表标记 */
li::marker {
  color: #2196f3;
  font-weight: bold;
}
```

> **更多伪元素**: 查阅 [MDN 伪元素完整列表](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Pseudo-elements)

### 实战案例：卡片悬停效果

```css
/* 使用伪元素创建悬停效果 */
.card {
  position: relative;
  overflow: hidden;
  transition: transform 0.3s;
}

/* 使用 ::before 创建悬停遮罩 */
.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(33, 150, 243, 0.8),
    rgba(156, 39, 176, 0.8)
  );
  opacity: 0;
  transition: opacity 0.3s;
  z-index: 1;
}

/* 使用 ::after 创建装饰图标 */
.card::after {
  content: '→';
  position: absolute;
  bottom: 20px;
  right: 20px;
  font-size: 2em;
  color: white;
  opacity: 0;
  transform: translateX(-20px);
  transition: all 0.3s;
  z-index: 2;
}

/* 悬停时的效果 */
.card:hover {
  transform: translateY(-5px);
}

.card:hover::before {
  opacity: 1;
}

.card:hover::after {
  opacity: 1;
  transform: translateX(0);
}

/* 卡片内容在悬停时保持可见 */
.card-content {
  position: relative;
  z-index: 3;
}
```

## 选择器列表

### 基本语法

CSS 选择器列表使用逗号 `,` 分隔多个选择器,共享相同的样式声明:

```css
/* 这三种写法效果相同 */
span {
  border: red 2px solid;
}
div {
  border: red 2px solid;
}

/* 选择器列表 */
span,
div {
  border: red 2px solid;
}

/* 使用 :is() */
:is(span, div) {
  border: red 2px solid;
}
```

### 选择器列表的问题

**选择器列表中的单个无效选择器会使整个规则失效**:

```css
/* 第一组规则 */
h1 {
  font-family: sans-serif;
}
h2:invalid-pseudo {
  font-family: sans-serif;
} /* 无效,但不影响其他规则 */
h3 {
  font-family: sans-serif;
}

/* 第二组规则 */
h1,
h2:invalid-pseudo,
h3 {
  font-family: sans-serif; /* 整个规则失效,h1 和 h3 也不会应用样式 */
}
```

### 可容错选择器列表

使用 `:is()` 或 `:where()` 可以创建可容错的选择器列表:

```css
/* 无效的选择器会被忽略,有效的选择器继续生效 */
:is(h1, h2:invalid-pseudo, h3) {
  font-family: sans-serif; /* h1 和 h3 正常应用样式 */
}
```

### :is() 和 :where() 的区别

```html
<div>
  <p class="text1">我是文本1</p>
  <p class="text2">我是文本2</p>
  <p id="text3">我是文本3</p>
</div>
```

```css
/* :is() - 优先级为参数中最高的选择器 */
:is(#text3, .text1, .text2) {
  color: blue; /* 优先级: 1-0-0 (ID 选择器) */
}

/* :where() - 优先级始终为 0 */
:where(#text3, .text1, .text2) {
  color: red; /* 优先级: 0-0-0 */
}

/* 普通选择器列表 - 每个选择器保持各自的优先级 */
#text3,
.text1,
.text2 {
  color: yellow;
  /* #text3 优先级: 1-0-0 */
  /* .text1 优先级: 0-1-0 */
  /* .text2 优先级: 0-1-0 */
}
```

**结果分析**:

- **text1 和 text2**: 蓝色 (`:is()` 的优先级 `1-0-0` 最高)
- **text3**: 黄色 (`:is()` 和 `#text3` 优先级相同,但 `#text3` 后定义)

> **使用建议**:
>
> - `:is()` 适合需要保持一定优先级的场景
> - `:where()` 适合创建低优先级的基础样式,便于后续覆盖

## 选择器性能优化

### 性能最佳实践

1. **避免使用通用选择器**

   ```css
   /* 避免 */
   * {
     margin: 0;
   }
   .container * {
     padding: 0;
   }

   /* 推荐 */
   body,
   h1,
   h2,
   p {
     margin: 0;
   }
   ```

2. **避免过度嵌套**

   ```css
   /* 避免 */
   html body div.container ul li a {
     color: blue;
   }

   /* 推荐 */
   .nav-link {
     color: blue;
   }
   ```

3. **优先使用类选择器而非标签选择器**

   ```css
   /* 性能较差 */
   div p span {
     font-size: 14px;
   }

   /* 性能更好 */
   .text-content {
     font-size: 14px;
   }
   ```

4. **避免使用属性选择器的通配符(特别是在大型 DOM 中)**

   ```css
   /* 性能较差 */
   [class*='icon'] {
     display: inline-block;
   }

   /* 推荐添加更具体的限定 */
   .btn [class*='icon'] {
     display: inline-block;
   }
   ```

### 浏览器解析顺序

浏览器从右到左解析选择器,因此**最右侧的选择器(关键选择器)对性能影响最大**:

```css
/* 浏览器先找所有 a 元素,再过滤 li 内的,再过滤 .nav 内的 */
.nav li a {
  color: blue;
}

/* 更高效:先找 .nav-link,无需额外过滤 */
.nav-link {
  color: blue;
}
```

## 实用技巧和最佳实践

### 处理无法解析的选择器

当浏览器遇到无法解析的 CSS 代码时的行为:

1. **无效的属性或值**: 浏览器会忽略该声明,继续解析后续的 CSS
2. **无效的选择器**: 浏览器会忽略整个规则集

```css
/* 如果浏览器不支持 :has(),整个规则会被忽略 */
div:has(> img) {
  display: flex; /* 不会应用 */
}

/* 渐进增强:先提供基础样式 */
div {
  display: block; /* 降级方案 */
}
div:has(> img) {
  display: flex; /* 支持的浏览器会应用这个 */
}
```

### 现代 CSS 选择器兼容性

使用较新的选择器时需要考虑浏览器兼容性:

- `:has()` - 需要检查浏览器支持度
- `:is()` - 现代浏览器支持良好
- `:where()` - 现代浏览器支持良好
- `:focus-visible` - 需要考虑降级方案

可以使用 [@supports](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@supports) 进行特性检测:

```css
/* 降级方案 */
.element {
  outline: 2px solid blue;
}

/* 如果支持 :focus-visible,使用更好的方案 */
@supports selector(:focus-visible) {
  .element:focus {
    outline: none;
  }
  .element:focus-visible {
    outline: 2px solid blue;
  }
}
```

### 实战案例：响应式导航栏

```css
/* 结合多种选择器实现响应式导航 */
.nav {
  display: flex;
  gap: 20px;
}

/* 选择最后一个导航项,移除右边距 */
.nav-item:last-child {
  margin-right: 0;
}

/* 选择当前激活的导航项 */
.nav-item.active,
.nav-item:hover {
  color: #2196f3;
  border-bottom: 2px solid currentColor;
}

/* 使用 :has() 为包含子菜单的导航项添加指示器 */
.nav-item:has(.submenu)::after {
  content: '▼';
  font-size: 0.8em;
  margin-left: 5px;
}

/* 使用 :not() 排除特定项 */
.nav-item:not(.no-hover):hover {
  background-color: rgba(33, 150, 243, 0.1);
}

/* 使用 :nth-child() 为奇偶项添加不同样式 */
.nav-item:nth-child(odd) {
  /* 奇数项样式 */
}

/* 使用 :focus-visible 改善键盘导航体验 */
.nav-item:focus-visible {
  outline: 2px solid #2196f3;
  outline-offset: 4px;
}
```

## 延伸阅读

- [CSS 选择器 - MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Selectors)
- [选择器优先级 - MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Specificity)
- [伪类完整列表 - MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Pseudo-classes)
- [伪元素完整列表 - MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Pseudo-elements)
- [Can I Use - CSS 选择器兼容性查询](https://caniuse.com/)
- [:has() 父元素选择器详解](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:has)
