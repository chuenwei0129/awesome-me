---
title: BEM
toc: content
group:
  title: 工程化
---

## 什么是 BEM 命名规范？

BEM 是 "Block, Element, Modifier" 的缩写，是一种用于命名 CSS 类的命名规范。这种方法由俄罗斯的 Yandex 团队提出，旨在提高代码的可读性和可维护性。BEM 将用户界面分解为独立的块（Block），元素（Element）和修饰符（Modifier），从而使代码更加模块化和可重用。

## BEM 的三部分

1. **Block（块）**:

   - 块是页面中的独立实体，通常代表一个较大的组件。
   - 例如：`.button`, `.header`, `.menu`。

2. **Element（元素）**:

   - 元素是块的一部分，没有独立存在的意义。元素与块通过双下划线（`__`）连接。
   - 例如：`.button__icon`, `.header__title`, `.menu__item`。

3. **Modifier（修饰符）**:
   - 修饰符是用于定义块或元素的不同状态或变体。修饰符与块或元素通过双连字符（`--`）连接。
   - 例如：`.button--primary`, `.header__title--large`, `.menu__item--active`。

## 示例

假设我们有一个按钮组件，我们可以使用 BEM 命名规范来定义其结构和样式：

HTML:

```html
<button class="button button--primary">
  <span class="button__icon"></span>
  <span class="button__text">Click me</span>
</button>
```

CSS:

```css
.button {
  /* 基本样式 */
}

.button--primary {
  /* 主按钮样式 */
}

.button__icon {
  /* 图标样式 */
}

.button__text {
  /* 文本样式 */
}
```

## BEM 的优点

1. **可读性高**: 通过命名就能清晰地知道每个类的作用和层次结构。
2. **模块化**: 组件之间相互独立，方便重用和维护。
3. **避免命名冲突**: 由于命名是基于块、元素和修饰符的组合，可以有效避免全局命名空间污染。
4. **简化样式覆盖**: 使用修饰符来定义不同状态，避免了过多的层叠选择器。

总之，BEM 命名规范是一种强大的工具，可以帮助开发者编写更清晰、可维护的 CSS 代码。
