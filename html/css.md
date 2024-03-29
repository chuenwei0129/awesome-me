# CSS<!-- omit in toc -->

- [浏览器 API](#浏览器-api)
- [CAN I USE](#can-i-use)
- [window.getComputedStyle](#windowgetcomputedstyle)

## 浏览器 API

> [CSSOM](https://www.bilibili.com/video/BV11e4y1W7CF?p=77&vd_source=c4234488bc8659e17c631716b9036762)

## CAN I USE

CSS 的规格发展太快，新的模块层出不穷。不同浏览器的不同版本，对 CSS 模块的支持情况都不一样。

一个比较普遍适用的方法是，判断元素的 style 对象的某个属性值是否为字符串。

```js
typeof element.style.animationName === 'string'
typeof element.style.transform === 'string'
```

如果该 CSS 属性确实存在，会返回一个字符串。即使该属性实际上并未设置，也会返回一个空字符串。如果该属性不存在，则会返回 `undefined`。

## window.getComputedStyle

行内样式（ `inline style` ）具有最高的优先级，改变行内样式，通常会立即反映出来。但是，网页元素最终的样式是综合各种规则计算出来的。因此，如果想得到元素实际的样式，只读取行内样式是不够的，需要得到浏览器最终计算出来的样式规则。

**`window.getComputedStyle` 方法，就用来返回浏览器计算后得到的最终规则**。它接受一个节点对象作为参数，返回一个 `CSSStyleDeclaration` 实例，包含了指定节点的最终样式信息。所谓“最终样式信息”，指的是各种 CSS 规则叠加后的结果。

```JS
var div = document.querySelector('div');
var styleObj = window.getComputedStyle(div);
styleObj.backgroundColor
```

注意，`CSSStyleDeclaration` 实例是一个活的对象，任何对于样式的修改，会实时反映到这个实例上面。另外，**这个实例是只读的**。

`getComputedStyle` 方法还可以接受第二个参数，表示当前元素的伪元素（比如 `:before`、`:after`、`:first-line`、`:first-letter` 等）

> 在 `CSS` 中有两个概念：

- 计算 (computed) 样式值是所有 `CSS` 规则和 `CSS` 继承都应用后的值，这是 `CSS` 级联（cascade）的结果。它看起来像 `height:1em` 或 `font-size:125%`。

- 解析 (resolved) 样式值是最终应用于元素的样式值值。诸如 `1em` 或 `125%` 这样的值是相对的。浏览器将使用计算（computed）值，并使所有单位均为固定的，且为绝对单位，例如：`height:20px` 或 `font-size:16px`。对于几何属性，解析（resolved）值可能具有浮点，例如：`width:50.5px`。

很久以前，创建了 `getComputedStyle` 来获取计算（ computed ）值，但事实证明，解析（ resolved ）值要方便得多，标准也因此发生了变化。
所以，现在 `getComputedStyle` 实际上返回的是属性的解析值（resolved）。
