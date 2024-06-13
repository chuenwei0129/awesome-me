---
title: CSS Modules
toc: content
group:
  title: 工程化
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
import styles from './styles.module.scss'

export default function page() {
  return (
    <>
      <div className={styles.appTitle}>hello world</div>
      <div className={styles['appTitle']}>hello css modules</div>
    </>
  )
}
```

`div` 的类名会被编译为：

![20240612175409](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/me/20240612175409.png)

并且对应的样式文件也会被编译为：

![20240612175538](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/me/20240612175538.png)

这样一来，类名 `appTitle` 就被编译为了独一无二 `styles_appTitle__3nBqj`。

注意，根据 `CSS Modules` 的官方规范，更推荐以**驼峰式**的命名方式定义类名，而非 `kebab-casing`。以上述例子为例，我们把 `div` 的类名命名为 `appTitle` 而非 `app-title`，这是因为 `app-title` 这种命名方式不能用 `.` 访问法，即：

```html
<!-- 驼峰式 -->
<div className={styles['appTitle']}> // 🉑️
<div className={styles.appTitle}> // 同样🉑️

<!-- kebab-casing -->
<h1 className={styles['app-title']}> // 🉑️
<h1 className={styles.app-title}> // 不🉑️，会导致错误
```

## 全局变量

`CSS Modules` 允许使用 `:global(.className)` 的语法，声明一个**全局**规则。凡是这样声明的 `class`，都不会被编译成哈希字符串。例如，我们在 `App.css` 中加入全局类名 globalTitle。

> 在使用 CSS 模块时，`Next.js` 会对纯全局选择器 (例如 `:global(.global-title)`) 进行限制。

注意，`CSS Modules` 还提供一种显式的局部作用域语法 `:local(.className)`，这在 `css Loader` 设置 `modules = local` 时等价于 `.className`。
