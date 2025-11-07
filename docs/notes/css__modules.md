---
group:
  title: CSS
  order: 2
title: CSS Modules
toc: content
---

## 什么是 CSS 模块化

CSS 模块化是指将 CSS 代码组织成模块的开发方式和方法。传统的 CSS 全局作用域存在一些问题，如样式冲突、命名冲突、难以维护和扩展等。

**CSS Modules** 是一种用于解决 CSS 模块化问题的技术。它是 CSS 的一种模块化方案。

**CSS Modules** 加入了局部作用域和模块依赖，可以保证某个组件的样式不会影响到其他组件。具体而言，**CSS Modules** 通过工程化的方法，可以将类名编译为哈希字符串，从而使得每个类名都是独一无二的，不会与其他的选择器重名，由此可以产生局部作用域。

## 基本用法

> 可以将 `CSS Modules` 与 `Sass / Less` 进行组合使用，从而既能拥有 `Sass / Less` 的 CSS 预处理器的能力 (规则、变量、混入、选择器、继承等)，又可以拥有 `CSS Modules` 提供的局部作用域的能力，避免全局污染。

让我们举个例子：

> `Next.js` 内置了对 CSS 模块的支持。使用 CSS 模块，你只需要使用 `.module.css` 作为文件后缀名，`Next.js` 就会自动进行处理。

首先，创建一个 `styles.module.scss` 文件，样式书写方式如同正常的 `SCSS` 文件：

```scss
/* app/css-modules/styles.module.scss */
.appTitle {
  color: rgb(137, 213, 70);
}
```

然后，CSS 模块可以被导入到 `app` 目录下的任意文件，让我们导入并使用该样式：

```js
// app/css-modules/page.js
import styles from './styles.module.scss';

export default function page() {
  return (
    <>
      <div className={styles.appTitle}>hello world</div>
      <div className={styles['appTitle']}>hello css modules</div>
    </>
  );
}
```

`div` 的类名会被编译为：

![20240612175409](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/me/20240612175409.png)

并且对应的样式文件也会被编译为：

![20240612175538](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/me/20240612175538.png)

这样一来，类名 `appTitle` 就被编译为了独一无二 `styles_appTitle__3nBqj`。

注意，根据 `CSS Modules` 的官方规范，更推荐以**驼峰式**的命名方式定义类名，而非 `kebab-casing`。以上述例子为例，我们把 `div` 的类名命名为 `appTitle` 而非 `app-title`，这是因为 `app-title` 这种命名方式不能用 `.` 访问法，即：

```jsx | pure
{/* 驼峰式 */}
<div className={styles['appTitle']}></div> {/* 🉑️ */}
<div className={styles.appTitle}></div>  {/* 同样🉑️ */}

{/* kebab-casing */}
<h1 className={styles['app-title']}></h1> {/* 🉑️ */}
<h1 className={styles.app-title}></h1> {/* 不🉑️，会导致错误 */}
```

## 全局变量

`CSS Modules` 允许使用 `:global(.className)` 的语法，声明一个**全局**规则。凡是这样声明的 `class`，都不会被编译成哈希字符串。例如，我们在 `App.css` 中加入全局类名 globalTitle。

> 在使用 CSS 模块时，`Next.js` 会对纯全局选择器 (例如 `:global(.global-title)`) 进行限制。

注意，`CSS Modules` 还提供一种显式的局部作用域语法 `:local(.className)`，这在 `css Loader` 设置 `modules = local` 时等价于 `.className`。

```scss
/* styles.module.scss */
.localTitle {
  color: red;
}

:global(.globalTitle) {
  color: blue;
}

/* 也可以这样写 */
:global {
  .anotherGlobalTitle {
    color: green;
  }
}
```

```jsx | pure
// page.js
import styles from './styles.module.scss';

export default function Page() {
  return (
    <>
      <div className={styles.localTitle}>局部样式</div>
      <div className="globalTitle">全局样式</div>
      <div className="anotherGlobalTitle">另一个全局样式</div>
    </>
  );
}
```

在上面的例子中：

- `localTitle` 会被编译成哈希类名，如 `styles_localTitle__abc123`
- `globalTitle` 和 `anotherGlobalTitle` 保持原样，不会被编译

## 组合类名（Composing）

`CSS Modules` 提供了 `composes` 关键字，可以从其他类名继承样式，这是一个非常强大的功能。

```scss
/* styles.module.scss */
.base {
  padding: 10px;
  border: 1px solid #ccc;
}

.primary {
  composes: base;
  color: white;
  background-color: blue;
}

.secondary {
  composes: base;
  color: white;
  background-color: gray;
}
```

```jsx | pure
// page.js
import styles from './styles.module.scss';

export default function Page() {
  return (
    <>
      <button className={styles.primary}>主要按钮</button>
      <button className={styles.secondary}>次要按钮</button>
    </>
  );
}
```

编译后，`primary` 类会同时包含 `base` 和 `primary` 的样式：

```html
<button class="styles_base__abc123 styles_primary__def456">主要按钮</button>
```

你也可以从其他文件中组合样式：

```scss
/* base.module.scss */
.button {
  padding: 10px;
  border-radius: 4px;
}
```

```scss
/* styles.module.scss */
.primaryButton {
  composes: button from './base.module.scss';
  background-color: blue;
  color: white;
}
```

## 最佳实践

### 1. 使用驼峰命名

```scss
/* 推荐 */
.pageHeader {
}
.mainContent {
}

/* 不推荐 */
.page-header {
}
.main-content {
}
```

### 2. 避免过度嵌套

```scss
/* 推荐 */
.card {
}
.cardTitle {
}
.cardContent {
}

/* 不推荐 */
.card {
  .title {
    .text {
    }
  }
}
```

### 3. 合理使用全局样式

全局样式应该只用于：

- 真正需要全局作用的样式（如重置样式）
- 第三方库的样式覆盖
- 动态添加的类名

```scss
/* 推荐 */
:global {
  .ant-modal {
    /* 覆盖 antd 的样式 */
  }
}

.localComponent {
  /* 组件自己的样式 */
}
```

### 4. 利用 composes 减少重复

```scss
/* 推荐 */
.baseButton {
  padding: 8px 16px;
  border-radius: 4px;
}

.primaryButton {
  composes: baseButton;
  background: blue;
}

/* 不推荐 - 重复代码 */
.primaryButton {
  padding: 8px 16px;
  border-radius: 4px;
  background: blue;
}
```

## 注意事项

1. **CSS Modules 只处理类选择器**：标签选择器、ID 选择器等不会被处理
2. **文件命名必须包含 `.module`**：如 `styles.module.css` 或 `styles.module.scss`
3. **全局污染风险**：过度使用 `:global` 会失去 CSS Modules 的优势
4. **与动态类名结合**：可以使用 `classnames` 或 `clsx` 库来处理条件类名

```jsx | pure
import styles from './styles.module.scss';
import clsx from 'clsx';

export default function Button({ primary, disabled }) {
  return (
    <button
      className={clsx(
        styles.button,
        primary && styles.primary,
        disabled && styles.disabled,
      )}
    >
      按钮
    </button>
  );
}
```

## 总结

CSS Modules 是一种优秀的 CSS 模块化解决方案，它的主要优势包括：

- ✅ **局部作用域**：避免样式冲突和全局污染
- ✅ **可组合性**：通过 `composes` 实现样式复用
- ✅ **可维护性**：样式与组件紧密关联，易于维护
- ✅ **零学习成本**：使用标准 CSS 语法，无需学习新语法
- ✅ **工具支持好**：主流框架（Next.js、Create React App）都内置支持

适用场景：

- React、Vue 等组件化框架的项目
- 需要避免样式冲突的大型项目
- 需要良好样式隔离的组件库开发

相比其他 CSS 方案：

- 比传统 CSS 更安全，避免全局污染
- 比 CSS-in-JS 性能更好，无运行时开销
- 比 BEM 命名更简洁，由工具自动处理
