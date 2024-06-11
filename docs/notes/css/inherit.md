---
title: 继承
group:
  title: 基础
---

在 CSS 中，继承是一个重要的概念，它指的是子元素会自动获得某些特定属性的值，这些值是从其父元素那里继承来的。

具体来说，**当一个子元素没有明确设置某个属性的值时，它会从其父元素那里继承这个属性的计算后的值**。计算后的值是指在所有可能的样式规则（如样式表、内联样式等）应用之后，最终确定的值。

例如，假设你在 CSS 中定义了一个父元素的 `color` 属性：

```css
.parent {
  color: blue;
}
```

然后你有一个子元素，没有明确设置 `color` 属性：

```html
<div class="parent">
  <p class="child">This is a child element.</p>
</div>
```

在这种情况下，子元素 `<p class="child">` 会继承父元素 `.parent` 的 `color` 属性值，即蓝色。因此，子元素的文本颜色也会是蓝色。

CSS 属性很多，但并不是所有的属性默认都是能继承父元素对应属性的，那哪些属性存在默认继承的行为呢？**一定是那些不会影响到页面布局的属性**，可以分为如下几类：

- **字体相关**：`font-family`、`font-style`、`font-size`、`font-weight` 等。
- **文本相关**：`text-align`、`text-indent`、`text-decoration`、`text-shadow`、`letter-spacing`、`word-spacing`、`white-space`、`line-height`、`color` 等。
- **列表相关**：`list-style`、`list-style-image`、`list-style-type`、`list-style-position` 等。
- **其他属性**：`visibility`、`cursor` 等。

![20240610014039](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/me/20240610014039.png)

> 在 CSS 中，对于那些默认情况下不继承的属性，你可以通过以下几种方式来控制它们：

1. 使用 `inherit` 关键字

   你可以显式地使用 `inherit` 关键字来强制子元素继承父元素的某个属性值，即使该属性默认情况下不继承。

   ```css
   .parent {
     margin: 20px;
   }

   .child {
     margin: inherit; /* 强制子元素继承父元素的 margin 值 */
   }
   ```

2. 使用 `initial` 关键字

   `initial` 关键字将属性的值设置为其初始值，即浏览器默认的值。

   ```css
   .child {
     margin: initial; /* 将 margin 设置为浏览器默认值 */
   }
   ```

3. 使用 `unset` 关键字

   `unset` 关键字会将属性的值设置为继承值（如果该属性是继承的）或初始值（如果该属性不是继承的）。

   ```css
   .child {
     margin: unset; /* 如果 margin 是继承属性则继承，否则设置为初始值 */
   }
   ```

4. 全局控制

   如果你想全局控制某些属性的继承行为，可以使用 `*` 选择器来设置所有元素的默认属性值。

   ```css
   * {
     margin: 0; /* 全局设置所有元素的 margin 为 0 */
     padding: 0; /* 全局设置所有元素的 padding 为 0 */
   }
   ```

5. 使用 CSS 变量

   你可以使用 CSS 变量来控制属性的值，并通过变量实现类似继承的效果。

   ```css
   :root {
     --main-margin: 20px;
   }

   .parent {
     margin: var(--main-margin);
   }

   .child {
     margin: var(--main-margin); /* 使用 CSS 变量来模拟继承 */
   }
   ```

通过这些方法，你可以更灵活地控制那些默认情况下不继承的属性，从而更好地管理和设计你的网页样式。
