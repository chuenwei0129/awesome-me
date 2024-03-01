# CSS<!-- omit in toc -->

- [为什么 CSS 这么难学？](#为什么-css-这么难学)
- [当浏览器遇到无法解析的 CSS 代码会发生什么？](#当浏览器遇到无法解析的-css-代码会发生什么)
- [link 标签和 @import 都能导入一个样式文件，它们有什么区别嘛？](#link-标签和-import-都能导入一个样式文件它们有什么区别嘛)
- [优先级](#优先级)
- [继承](#继承)
- [选择器](#选择器)
  - [选择器列表](#选择器列表)
  - [伪类](#伪类)
  - [伪元素](#伪元素)
  - [使用全局选择器，让选择器更易读](#使用全局选择器让选择器更易读)
  - [实战：表单控件](#实战表单控件)
- [盒模型](#盒模型)
- [margin 负值](#margin-负值)
- [块级盒子（Block box）和 内联盒子（Inline box）](#块级盒子block-box和-内联盒子inline-box)
- [使用 display: inline-block](#使用-display-inline-block)
- [格式化上下文](#格式化上下文)
  - [BFC](#bfc)
  - [IFC](#ifc)
- [使用百分数](#使用百分数)
- [其他基础知识](#其他基础知识)
- [flex](#flex)
  - [概述](#概述)
  - [flex 父容器](#flex-父容器)
    - [justify-content](#justify-content)
      - [align-items](#align-items)
  - [flex 子项](#flex-子项)
    - [单独设置子容器如何沿交叉轴排列：align-self](#单独设置子容器如何沿交叉轴排列align-self)
    - [在主轴上如何伸缩：flex 属性](#在主轴上如何伸缩flex-属性)
  - [轴](#轴)
  - [flex 进阶](#flex-进阶)
    - [父容器设置换行方式：flex-wrap](#父容器设置换行方式flex-wrap)
    - [轴向与换行组合设置：flex-flow](#轴向与换行组合设置flex-flow)
    - [多行沿交叉轴对齐：align-content](#多行沿交叉轴对齐align-content)
  - [总结](#总结)
- [grid](#grid)
- [函数计算](#函数计算)
  - [函数](#函数)
  - [常用](#常用)
- [变量计算](#变量计算)
- [CSS 实战](#css-实战)
  - [文字溢出](#文字溢出)
  - [1px 边框](#1px-边框)
  - [自动打字器](#自动打字器)
  - [渐变背景](#渐变背景)
  - [Emoji as a Favicon](#emoji-as-a-favicon)

## [为什么 CSS 这么难学？](https://www.zhihu.com/question/66167982)

> 任何编程工具都是为人服务的，他们是轮子，是工具，是为了让人提高生产效率的。一切和这个目的相矛盾的设计都是反人类的。

## 当浏览器遇到无法解析的 CSS 代码会发生什么？

答案就是**浏览器什么也不会做**，继续解析下一个 CSS 样式！

如果一个浏览器在解析你所书写的 CSS 规则的过程中遇到了无法理解的属性或者值，它会忽略这些并继续解析下面的 CSS 声明。在你书写了错误的 CSS 代码（或者误拼写），又或者当浏览器遇到对于它来说很新的还没有支持的 CSS 代码的时候上述的情况同样会发生（直接忽略）。

相似的，当浏览器遇到无法解析的选择器的时候，他会直接忽略整个选择器规则，然后解析下一个 CSS 选择器。

## link 标签和 @import 都能导入一个样式文件，它们有什么区别嘛？

- link 是 HTML 标签，除了能导入 CSS 外，还能导入别的资源，比如图片、脚本和字体等；而 `@import` 是 CSS 的语法，只能用来导入 CSS。
- link 导入的样式会在页面加载时同时加载，`@import` 导入的样式需等页面加载完成后再加载。
- link 可以通过 JS 操作 DOM 动态引入样式表改变样式，而 `@import` 不可以。

## 优先级

1. 如果你有超过一条规则，而且都是**相同的权重**，那么最后面的规则会应用。可以理解为**后面的规则覆盖前面的规则**，直到最后一个开始设置样式。

2. **标签选择器、伪元素选择器的优先级相同，而类选择器和属性选择器以及伪类选择器的优先级相同。**

3. 通用选择器（[`*`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Universal_selectors)）、组合符（`+`、`>`、`~`、' '）和调整优先级的选择器（[`:where()`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:where)）不会影响优先级。

4. 否定（[`:not()`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:not)）和任意匹配（[`:is()`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:is)）伪类本身对优先级没有影响，但它们的参数则会带来影响。参数中，**对优先级算法有贡献的参数的优先级的最大值**将作为该伪类选择器的优先级。

5. 内联样式，即 [`style`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes#style) 属性内的样式声明，优先于所有普通的样式，无论其优先级如何。这样的声明没有选择器，但它们的优先级可以理解为 1-0-0-0；即无论选择器中有多少个 ID，它总是比其他任何优先级的权重都要高。

6. 有一个特殊的 CSS 可以用来覆盖所有上面所有优先级计算，不过需要很小心的使用——`!important`。用于修改特定属性的值，能够覆盖普通规则的层叠。

| 选择器                                    | ID  | 类  | 元素 | 优先级 |
| ----------------------------------------- | --- | --- | ---- | ------ |
| `h1`                                      | 0   | 0   | 1    | 0-0-1  |
| `h1 + p::first-letter`                    | 0   | 0   | 3    | 0-0-3  |
| `li > a[href*="en-US"] > .inline-warning` | 0   | 2   | 2    | 0-2-2  |
| `#identifier`                             | 1   | 0   | 0    | 1-0-0  |
| `button:not(#mainBtn, .cta)`              | 1   | 0   | 1    | 1-0-1  |

## 继承

在 CSS 中有一个很重要的特性就是**子元素会继承父元素对应属性计算后的值**。

继承需要在上下文中去理解 —— 一些设置在父元素上的 CSS 属性是可以被子元素继承的，有些则不能。

CSS 属性很多，但并不是所有的属性默认都是能继承父元素对应属性的，那哪些属性存在默认继承的行为呢？**一定是那些不会影响到页面布局的属性**，可以分为如下几类：

- **字体相关：** `font-family`、`font-style`、`font-size`、`font-weight` 等
- **文本相关：** `text-align`、`text-indent`、`text-decoration`、`text-shadow`、`letter-spacing`、`word-spacing`、`white-space`、`line-height`、`color` 等
- **列表相关：** `list-style`、`list-style-image`、`list-style-type`、`list-style-position` 等
- **其他属性：** `visibility`、`cursor` 等

**对于其他默认不继承的属性也可以通过以下几个属性值来控制继承行为：**

- **`inherit`：** 继承父元素对应属性的计算值
- **`initial`：** 应用该属性的默认值，比如 `color` 的默认值是 `#000`
- **`unset`：** 如果属性是默认可以继承的，则取 `inherit` 的效果，否则同 `initial`

## 选择器

### 选择器列表

CSS **选择器列表**（`,`）选择所有匹配的节点。选择器列表是以逗号分隔的多个选择器所组成的列表。

当多个选择器共享相同的声明时，它们可以被编组进一个以逗号分隔的列表。选择器列表也可以作为参数传递给一些函数式 CSS 伪类。逗号之前和/或之后可以有空白（字符）。

以下三个声明是等效的：

```css
span {
  border: red 2px solid;
}
div {
  border: red 2px solid;
}
```

```css
span,
div {
  border: red 2px solid;
}
```

```css
:is(span, div) {
  border: red 2px solid;
}
```

**使用选择器列表的一个缺点是选择器列表中的单个不受支持的选择器会使整个规则无效化。**

思考以下两个 CSS 规则集：

```css
h1 {
  font-family: sans-serif;
}
h2:invalid-pseudo {
  font-family: sans-serif;
}
h3 {
  font-family: sans-serif;
}
```

```css
h1, h2:invalid-pseudo, h3 {
  font-family: sans-serif;
}
```

它们不是等效的。在第一个规则集中，样式将应用于 `h1` 和 `h3` 元素，但 `h2:invalid-pseudo` 规则将不会被解析。在第二个规则集中，由于列表中的一个选择器是无效的，整个规则都将不会被解析。因此，没有样式会被应用到 `h1` 和 `h3` 元素：当一个选择器列表中任意选择器无效时，整个样式块将被忽略。

解决[无效的选择器列表](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Selector_list#%E6%97%A0%E6%95%88%E7%9A%84%E9%80%89%E6%8B%A9%E5%99%A8%E5%88%97%E8%A1%A8)问题的一种方法是使用 [`:is()`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:is) 或 [`:where()`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:where) 伪类，它们接受一个可容错选择器列表。可容错选择器列表中的每个选择器都被单独解析。因此列表中任何无效的选择器会被忽略，而有效的选择器则会被有效使用。

这两个的区别在于 `:is()` 的优先级是它最具体的参数，而 `:where()` 选择器和可容错选择器列表参数则不添加任何优先级权重。

### [伪类](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Selectors/Pseudo-classes_and_pseudo-elements#伪类)

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/weilei.webp)

| 选择器                                                                                                                           | 描述                                                                                                                                                                                                            |
| -------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`:active`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:active)                                                            | 在用户激活（例如点击）元素的时候匹配。                                                                                                                                                                          |
| [`:any-link`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:any-link)                                                        | 匹配一个链接的`:link`和`:visited`状态。                                                                                                                                                                         |
| [`:blank`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:blank)                                                              | 匹配空输入值的[`<input>`元素](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input)。                                                                                                                |
| [`:checked`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:checked)                                                          | 匹配处于选中状态的单选或者复选框。                                                                                                                                                                              |
| [`:current` (en-US)](https://developer.mozilla.org/en-US/docs/Web/CSS/:current "Currently only available in English (US)")       | 匹配正在展示的元素，或者其上级元素。                                                                                                                                                                            |
| [`:default`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:default)                                                          | 匹配一组相似的元素中默认的一个或者更多的 UI 元素。                                                                                                                                                              |
| [`:dir`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:dir)                                                                  | 基于其方向性（HTML[`dir`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes/dir)属性或者 CSS[`direction`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/direction)属性的值）匹配一个元素。 |
| [`:disabled`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:disabled)                                                        | 匹配处于关闭状态的用户界面元素                                                                                                                                                                                  |
| [`:empty`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:empty)                                                              | 匹配除了可能存在的空格外，没有子元素的元素。                                                                                                                                                                    |
| [`:enabled`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:enabled)                                                          | 匹配处于开启状态的用户界面元素。                                                                                                                                                                                |
| [`:first`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:first)                                                              | 匹配[分页媒体](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Paged_Media)的第一页。                                                                                                                          |
| [`:first-child`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:first-child)                                                  | 匹配兄弟元素中的第一个元素。                                                                                                                                                                                    |
| [`:first-of-type`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:first-of-type)                                              | 匹配兄弟元素中第一个某种类型的元素。                                                                                                                                                                            |
| [`:focus`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:focus)                                                              | 当一个元素有焦点的时候匹配。                                                                                                                                                                                    |
| [`:focus-visible`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:focus-visible)                                              | 当元素有焦点，且焦点对用户可见的时候匹配。                                                                                                                                                                      |
| [`:focus-within`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:focus-within)                                                | 匹配有焦点的元素，以及子代元素有焦点的元素。                                                                                                                                                                    |
| [`:future` (en-US)](https://developer.mozilla.org/en-US/docs/Web/CSS/:future "Currently only available in English (US)")         | 匹配当前元素之后的元素。                                                                                                                                                                                        |
| [`:hover`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:hover)                                                              | 当用户悬浮到一个元素之上的时候匹配。                                                                                                                                                                            |
| [`:indeterminate`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:indeterminate)                                              | 匹配未定态值的 UI 元素，通常为[复选框](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input/checkbox)。                                                                                              |
| [`:in-range`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:in-range)                                                        | 用一个区间匹配元素，当值处于区间之内时匹配。                                                                                                                                                                    |
| [`:invalid`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:invalid)                                                          | 匹配诸如`<input>`的位于不可用状态的元素。                                                                                                                                                                       |
| [`:lang`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:lang)                                                                | 基于语言（HTML[lang](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes/lang)属性的值）匹配元素。                                                                                              |
| [`:last-child`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:last-child)                                                    | 匹配兄弟元素中最末的那个元素。                                                                                                                                                                                  |
| [`:last-of-type`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:last-of-type)                                                | 匹配兄弟元素中最后一个某种类型的元素。                                                                                                                                                                          |
| [`:left`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:left)                                                                | 在[分页媒体 (en-US)](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_paged_media "Currently only available in English (US)")中，匹配左手边的页。                                                           |
| [`:link`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:link)                                                                | 匹配未曾访问的链接。                                                                                                                                                                                            |
| [`:local-link` (en-US)](https://developer.mozilla.org/en-US/docs/Web/CSS/:local-link "Currently only available in English (US)") | 匹配指向和当前文档同一网站页面的链接。                                                                                                                                                                          |
| [`:is()`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:is)                                                                  | 匹配传入的选择器列表中的任何选择器。                                                                                                                                                                            |
| [`:not`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:not)                                                                  | 匹配作为值传入自身的选择器未匹配的物件。                                                                                                                                                                        |
| [`:nth-child`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:nth-child)                                                      | 匹配一列兄弟元素中的元素——兄弟元素按照_an+b_形式的式子进行匹配（比如 2n+1 匹配元素 1、3、5、7 等。即所有的奇数个）。                                                                                            |
| [`:nth-of-type`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:nth-of-type)                                                  | 匹配某种类型的一列兄弟元素（比如，`<p>`元素）——兄弟元素按照_an+b_形式的式子进行匹配（比如 2n+1 匹配元素 1、3、5、7 等。即所有的奇数个）。                                                                       |
| [`:nth-last-child`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:nth-last-child)                                            | 匹配一列兄弟元素，从后往前倒数。兄弟元素按照_an+b_形式的式子进行匹配（比如 2n+1 匹配按照顺序来的最后一个元素，然后往前两个，再往前两个，诸如此类。从后往前数的所有奇数个）。                                    |
| [`:nth-last-of-type`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:nth-last-of-type)                                        | 匹配某种类型的一列兄弟元素（比如，`<p>`元素），从后往前倒数。兄弟元素按照_an+b_形式的式子进行匹配（比如 2n+1 匹配按照顺序来的最后一个元素，然后往前两个，再往前两个，诸如此类。从后往前数的所有奇数个）。       |
| [`:only-child`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:only-child)                                                    | 匹配没有兄弟元素的元素。                                                                                                                                                                                        |
| [`:only-of-type`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:only-of-type)                                                | 匹配兄弟元素中某类型仅有的元素。                                                                                                                                                                                |
| [`:optional`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:optional)                                                        | 匹配不是必填的 form 元素。                                                                                                                                                                                      |
| [`:out-of-range`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:out-of-range)                                                | 按区间匹配元素，当值不在区间内的的时候匹配。                                                                                                                                                                    |
| [`:past` (en-US)](https://developer.mozilla.org/en-US/docs/Web/CSS/:past "Currently only available in English (US)")             | 匹配当前元素之前的元素。                                                                                                                                                                                        |
| [`:placeholder-shown`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:placeholder-shown)                                      | 匹配显示占位文字的 input 元素。                                                                                                                                                                                 |
| [`:playing`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:playing)                                                          | 匹配代表音频、视频或者相似的能“播放”或者“暂停”的资源的，且正在“播放”的元素。                                                                                                                                    |
| [`:paused`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:paused)                                                            | 匹配代表音频、视频或者相似的能“播放”或者“暂停”的资源的，且正在“暂停”的元素。                                                                                                                                    |
| [`:read-only`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:read-only)                                                      | 匹配用户不可更改的元素。                                                                                                                                                                                        |
| [`:read-write`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:read-write)                                                    | 匹配用户可更改的元素。                                                                                                                                                                                          |
| [`:required`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:required)                                                        | 匹配必填的 form 元素。                                                                                                                                                                                          |
| [`:right`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:right)                                                              | 在[分页媒体 (en-US)](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_paged_media "Currently only available in English (US)")中，匹配右手边的页。                                                           |
| [`:root`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:root)                                                                | 匹配文档的根元素。                                                                                                                                                                                              |
| [`:scope`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:scope)                                                              | 匹配任何为参考点元素的的元素。                                                                                                                                                                                  |
| [`:valid`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:valid)                                                              | 匹配诸如`<input>`元素的处于可用状态的元素。                                                                                                                                                                     |
| [`:target`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:target)                                                            | 匹配当前 URL 目标的元素（例如如果它有一个匹配当前[URL 分段](https://en.wikipedia.org/wiki/Fragment_identifier)的元素）。                                                                                        |
| [`:visited`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:visited)                                                          | 匹配已访问链接。                                                                                                                                                                                                |

### [伪元素](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Selectors/Pseudo-classes_and_pseudo-elements#伪元素)

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/weiyuansu.png)

| 选择器                                                                                  | 描述                                                 |
| --------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| [`::after`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::after)                   | 匹配出现在原有元素的实际内容之后的一个可样式化元素。 |
| [`::before`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::before)                 | 匹配出现在原有元素的实际内容之前的一个可样式化元素。 |
| [`::first-letter`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::first-letter)     | 匹配元素的第一个字母。                               |
| [`::first-line`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::first-line)         | 匹配包含此伪元素的元素的第一行。                     |
| [`::grammar-error`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::grammar-error)   | 匹配文档中包含了浏览器标记的语法错误的那部分。       |
| [`::selection`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::selection)           | 匹配文档中被选择的那部分。                           |
| [`::spelling-error`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::spelling-error) | 匹配文档中包含了浏览器标记的拼写错误的那部分。       |

### [使用全局选择器，让选择器更易读](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Selectors/Type_Class_and_ID_Selectors#使用全局选择器，让选择器更易读)

全局选择器的一种用法是让选择器更易读，更明显地表明它们的作用。例如，如果我想选中任何`<article>`元素的第一子元素，不论它是什么元素，都给它加粗，我可以将[`:first-child`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:first-child)选择器（我们将会在[伪类和伪元素](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Selectors/Pseudo-classes_and_pseudo-elements)课中进一步了解）用作`<article>`元素选择器的一个后代选择器：

```css
article :first-child {
}
```

但是这会和`article:first-child`混淆，而后者选择了作为其他元素的第一子元素的`<article>`元素。

为了避免这种混淆，我们可以向`:first-child`选择器加入全局选择器，这样选择器所做的事情很容易就能看懂。选择器正选中`<article>`元素的_任何_第一子元素：

```css
article *:first-child {
}
```

### 实战：表单控件

**相关选择器：**

- `+`：相邻同胞选择器
- `~`：通用同胞选择器
- `:not()`：非指定条件的元素
- `:hover`：鼠标悬浮的元素
- `:focus`：输入聚焦的表单元素
- `:valid`：输入合法的表单元素
- `:invalid`：输入非法的表单元素
- `:checked`：选项选中的表单元素
- `:placeholder-shown`：占位显示的表单元素
- `:nth-child(n)`：元素中指定顺序索引的元素

**代码：**

> [表单控件实战](./code/login-form.html)

**技巧：**

**小技巧 1：** `<input>` 使用 `id` 与 `<label>` 使用 `for` 关联起来，而 `hidden` 使 `<input>` 隐藏起来，不占用页面任何位置，此时点击 `<label>` 就相当于点击 `<input>`，`<label>` 放置在页面任何位置都行。

**小技巧 2：** 若直接声明 `input:valid` 和 `input:invalid`，在页面初始化后或输入框内容为空时都会触发 `:invalid`，导致表单校验还未开始就显示校验不通过的样式。为了只在输入内容时才触发 `:valid` 和 `:invalid`，可在其前面添加 `:focus`，表示在表单处于聚焦状态时才触发某些行为。

**小技巧 3：** 有内容和无内容可通过 `:placeholder-shown` 判断。`:placeholder-shown` 表示占位显示的表单元素，而占位不显示的表单元素可用 `:not()` 取反，再结合 `+` 带动紧随该节点的节点。

## 盒模型

盒模型由以下属性组成，由外到内用公式表示就是：`box = margin + border + padding + content`。

除了 `content`(不是属性，作为盒模型扩展理解使用)，其余属性都包含 `left`、`right`、`top` 和 `bottom` 等扩展属性。

- **margin**：边距，外部透明区域，负责隔离相邻盒子
- **border**：边框，内部着色区域，负责隔离边距和填充，包含 `width`、`style`、`color` 三个扩展属性
- **padding**：填充，内部着色区域，负责扩展盒子内部尺寸
- **content**：内容，以 `文本` 或 `节点` 存在的占用位置

**CSS3** 里提供一个属性用于声明盒模型的类型，它就是 `box-sizing`。

- `content-box`：标准盒模型(默认)
- `border-box`：怪异盒模型

> **它不具备继承性，若全局统一盒模型**，那只能使用 `*` 声明 `box-sizing` 了。

## margin 负值

- 当元素不存在 `width` 属性或者 `width：auto` 的时候，`margin-left` 和 `margin-right` 可以增加宽度
- `margin-top` 为负值不会增加高度，只会产生向上位移
- `margin-bottom` 为负值不会产生位移，会减少自身的供 CSS 读取的高度

**利用 `margin-bottom` 为负值会减少 CSS 读取元素高度的特性，加上 `padding-bottom` 和 `overflow:hidden` ，就能实现一个未知高度的多列等高布局。**

**负 `margin` 会改变浮动元素的显示位置**，圣杯布局、双飞翼布局什么的，都是利用这个原理实现的。

**其他注意事项：**

1. [margin-top 传递的现象](./code/margin-top.html)
2. `padding` 不能为负值，`margin` 可以为负值
3. 背景色会平铺到非 `margin` 区域，`padding` 着色随 `background-color` 而变，可用 `background-clip` 隔离。

## [块级盒子（Block box）和 内联盒子（Inline box）](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/The_box_model#%E5%9D%97%E7%BA%A7%E7%9B%92%E5%AD%90%EF%BC%88block_box%EF%BC%89%E5%92%8C_%E5%86%85%E8%81%94%E7%9B%92%E5%AD%90%EF%BC%88inline_box%EF%BC%89#块级盒子（block_box）和_内联盒子（inline_box）)

在 CSS 中我们广泛地使用两种“盒子” —— **块级盒子** (**block box**) 和 **内联盒子** (**inline box**)。这两种盒子会在**页面流**（page flow）和元素之间的关系方面表现出不同的行为：

一个被定义成块级的（block）盒子会表现出以下行为：

- 盒子会在内联的方向上扩展并占据父容器在该方向上的所有可用空间，**在绝大数情况下意味着盒子会和父容器一样宽**
- 每个盒子都会换行
- [`width`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/width) 和 [`height`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/height) 属性可以发挥作用
- 内边距（padding）, 外边距（margin）和 边框（border）会将其他元素从当前盒子周围“推开”

除非特殊指定，诸如标题 (`<h1>`等) 和段落 (`<p>`) 默认情况下都是块级的盒子。

如果一个盒子对外显示为 `inline`，那么他的行为如下：

- 盒子不会产生换行。
- [`width`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/width) 和 [`height`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/height) 属性将不起作用。
- 垂直方向的内边距、外边距以及边框会被应用但是不会把其他处于 `inline` 状态的盒子推开。
- 水平方向的内边距、外边距以及边框会被应用且会把其他处于 `inline` 状态的盒子推开。

用做链接的 `<a>` 元素、 `<span>`、 `<em>` 以及 `<strong>` 都是默认处于 `inline` 状态的。

我们通过对盒子[`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display) 属性的设置，比如 `inline` 或者 `block` ，来控制盒子的外部显示类型。

> **一个块容器盒只包含其他块级盒，或生成一个行内格式化上下文只包含行内盒。** 或许一段代码中某一个块容器盒同时包含块级盒和行内盒的情况，但实质上在这种情况下会产生一种新的[匿名块盒](./code/anonymous.html)解决该问题。

## [使用 display: inline-block](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/The_box_model#%E5%9D%97%E7%BA%A7%E7%9B%92%E5%AD%90%EF%BC%88block_box%EF%BC%89%E5%92%8C_%E5%86%85%E8%81%94%E7%9B%92%E5%AD%90%EF%BC%88inline_box%EF%BC%89#使用_display_inline-block)

display 有一个特殊的值，它在内联和块之间提供了一个中间状态。这对于以下情况非常有用：您不希望一个项切换到新行，但希望它可以设定宽度和高度，并避免上面看到的重叠。

一个元素使用 `display: inline-block`，实现我们需要的块级的部分效果：

- 设置`width` 和`height` 属性会生效。
- `padding`, `margin`, 以及`border` 会推开其他元素。

但是，它不会跳转到新行，如果显式添加 `width` 和 `height` 属性，它只会变得比其内容更大。

## 格式化上下文

**格式化上下文**指决定渲染区域里节点的排版、关系和相互作用的渲染规则。

| 上下文               | 缩写  | 版本 | 声明         |
| -------------------- | ----- | ---- | ------------ |
| **块格式化上下文**   | `BFC` | 2    | 块级盒子容器 |
| **行内格式化上下文** | `IFC` | 2    | 行内盒子容器 |
| **弹性格式化上下文** | `FFC` | 3    | 弹性盒子容器 |
| **格栅格式化上下文** | `GFC` | 3    | 格栅盒子容器 |

### BFC

> 文档一旦脱流，**计算其父节点高度时不会将其高度纳入**，脱流节点不占据空间，因此添加浮动或定位后会对周围节点布局产生或多或少的影响。

**BFC 是页面上一个独立且隔离的渲染区域，容器里的子节点不会在布局上影响到外面的节点，反之亦然**。

**规则：**

- 节点在垂直方向上按顺序排列
- 节点垂直方向距离由 `margin` 决定，相邻节点的 `margin` 会发生重叠，以最大 `margin` 为合并值
- 节点的 `margin-left/right` 与父节点的 `左边/右边` 相接触，即使处于浮动也如此
- **BFC 不会与同级浮动区域重叠**
- 计算 BFC 高度时其浮动子节点也参与计算

**成因：**

- 根节点：html
- [父节点与正常文档流的子节点(非浮动)自动形成 BFC](./code/bfc-float.html)
- 被定义成块级的非块级节点：`display:inline-block/table-cell/table-caption/flex/inline-flex/grid/inline-grid`
- 浮动节点：`float:left/right`
- 绝对定位节点：`position:absolute/fixed`
- 非溢出可见节点：`overflow:!visible`

**场景：**

- **自适应两栏布局：** 把侧边栏固定宽度且左浮动，对右侧内容触发 `BFC`，使得它的宽度自适应该行剩余宽度。
- **清除内部浮动：** 浮动后面的元素显示声明 `BFC`。或者在浮动元素上套一层 `BFC`（也需要显示声明，本质也是 `margin` 合并），总之就是解决第二个成因。
- **防止垂直 `margin` 合并：** 让 2 个元素不在同一个 `BFC` 中即可阻止垂直 `margin` 合并，给其中一个元素套一层 `BFC`即可（需要显示声明，直接块元素会出现 margin-top 传递现象）。

**clear 属性：**

`clear` 属性**不允许被 clear 的元素**的左边/右边挨着浮动元素，处理文字环绕效果。

> ⚠️ 不要在浮动元素上清除浮动，浮动元素脱离了文档流，就算给浮动元素上下加了清除空间，也是没有任何意义的。

### IFC

**IFC 的宽高由行内子元素中最大的实际高度确定，不受垂直方向的 margin 和 padding 影响。**

>IFC 中不能存在块元素，若插入块元素则会产生对应个数的匿名块并互相隔离，即产生对应个数的 IFC，每个 IFC 对外表现为块级元素，并垂直排列。

**规则：**

- 节点在水平方向上按顺序排列
- **节点无法声明宽高**，其 `margin` 和 `padding` 在水平方向有效在垂直方向无效
- 节点在垂直方向上以不同形式对齐
- **节点宽度由包含块与浮动决定，节点高度由行高决定**

**成因：**

- 声明 `display:inline[-x]` 形成行内元素
- 声明 `line-height`
- 声明 `vertical-align`
- 声明 `font-size`

**注意事项：**

- **空白折叠：** [HTML 中换行编写行内元素，排版会出现 5px 空隙](./code/5px-gap.html)
- **高矮不齐：** 行内元素统一以底边垂直对齐
- **自动换行：** 排版若一行无法完成则换行接着排版

## 使用百分数

当使用百分数时，你需要清楚，它是什么东西的百分数。对于一个处于另外一个容器当中的盒子，如果你给予了子盒子一个百分数作为宽度，那么它指的是父容器宽度的百分数。使用百分比作为元素外边距（margin）或填充（padding）的单位时，**值是以包含块的内联尺寸进行计算的，也就是元素的水平宽度**。

## 其他基础知识

- [背景与边框](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Backgrounds_and_borders)
- [溢出的内容](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Overflowing_content)
- [CSS 的值与单位](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Values_and_units)
- [图像、媒体和表单元素](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Images_media_form_elements)
- [在 CSS 中，用 float 和 position 的区别是什么？](https://www.zhihu.com/question/19588854/answer/13243044)
- [浮动](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Floats)
- [定位](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Positioning)
- ...

## flex

> [`flex: 1` 到底代表什么?](https://zhuanlan.zhihu.com/p/136223806)

### 概述

flex 的核心的概念就是**容器**和**轴**。容器包括外层的**父容器**和内层的**子项**，轴包括**主轴**和**交叉轴**。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex_1.webp)

flex 容器具有这样的特点：父容器可以统一设置子项的排列方式，子项也可以单独设置自身的排列方式，**如果两者同时设置，以子项的设置为准**。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex_2.webp)

### flex 父容器

#### justify-content

`justify-content` 属性用于**定义如何沿着主轴方向排列子容器**。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex_3.webp)

**值：**

- `flex-start`：起始端对齐
- `flex-end`：末尾段对齐
- `center`：居中对齐
- `space-around`：子容器沿主轴均匀分布，位于首尾两端的子容器到父容器的距离是子容器间距的一半。
- `space-between`：子容器沿主轴均匀分布，位于首尾两端的子容器与父容器相切。

**可视化：**

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex_4.webp)
![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex_5.webp)
![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex_6.webp)
![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex_7.webp)
![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex_8.webp)

##### align-items

`align-items` 属性用于**定义如何沿着交叉轴方向分配子容器的间距**。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex_9.webp)

**值：**

- `flex-start`：起始端对齐
- `flex-end`：末尾段对齐
- `center`：居中对齐
- `baseline`：基线对齐，这里的 baseline 默认是指首行文字，即 `first baseline`，所有子容器向基线对齐，交叉轴起点到元素基线距离最大的子容器将会与交叉轴起始端相切以确定基线
- `stretch`：子容器沿交叉轴方向的尺寸拉伸至与父容器一致

**可视化：**

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex_10.webp)
![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy8zOTI1MDYyLTFiOWQwZjRlMzJhNmM1OTgucG5nP2ltYWdlTW9ncjIvYXV0by1vcmllbnQvc3RyaXAlN0NpbWFnZVZpZXcyLzIvdy81MTAvZm9ybWF0L3dlYnA.webp)
![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex_11.webp)
![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex_12.webp)
![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex_13.webp)
![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex_14.webp)

### flex 子项

#### 单独设置子容器如何沿交叉轴排列：align-self

每个子容器也可以单独定义沿交叉轴排列的方式，此属性的可选值与父容器 `align-items` 属性完全一致，**如果两者同时设置则以子容器的 `align-self` 属性为准**。

**值：**

- `flex-start`：起始端对齐
- `flex-end`：末尾段对齐
- `center`：居中对齐
- `baseline`：基线对齐
- `stretch`：拉伸对齐

**可视化：**

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex_16.webp)
![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex_17.webp)
![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex_18.webp)
![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex_19.webp)
![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex_20.webp)
![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex_21.webp)

#### 在主轴上如何伸缩：flex 属性

子容器是有弹性的（flex 即弹性），它们会自动填充剩余空间，**子容器的伸缩比例由 `flex` 属性确定。**

`flex` 的值可以是无单位数字（如：1, 2, 3），也可以是有单位数字（如：15px，30px，60px），还可以是 `none` 关键字。子容器会按照 `flex` 定义的尺寸比例自动伸缩，如果取值为 `none` 则不伸缩。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex_15.webp)

**设置基准大小：`flex-basis`**

`flex-basis` 表示在不伸缩的情况下子容器的原始尺寸。**主轴为横向时代表宽度，主轴为纵向时代表高度。**

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex-16.webp)
![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex-17.webp)

**设置扩展比例：`flex-grow`**

子容器弹性伸展的比例。如图，剩余空间按 `1:2` 的比例分配给子容器。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex-18.webp)
![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex-19.webp)

**设置收缩比例：`flex-shrink`**

子容器弹性收缩的比例。如图，超出的部分按 `1:2` 的比例从给子容器中减去。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex-20.webp)
![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex-21.webp)

**设置排列顺序：`order`**

改变子容器的排列顺序，覆盖 `HTML` 代码中的顺序，默认值为 `0`，可以为负值，数值越小排列越靠前。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex-22.webp)

**注意事项：**

- 属性 `flex` 规定了弹性元素如何伸长或缩短以适应 `flex` 容器中的可用空间。这是一个简写属性，可以同时设置 `flex-grow`, `flex-shrink` 与 `flex-basis`。
  - 值 `auto` 相当于将属性设置为 `"flex: 1 1 auto"`
  - 默认值 `initial` 相当于将属性设置为 `"flex: 0 1 auto"`
  - 值 `none` 相当于将属性设置为 `"flex: 0 0 auto"`
- `flex-grow` 初始值为 0。负值是不被允许的。
- `flex-shrink` 元素**仅在默认宽度之和大于容器的时候才会发生收缩**，其收缩的大小是依据 `flex-shrink` 的值。**初始值为 1**。负值是不被允许的。
- **如果任何 `flex` 元素的侧轴方向 `margin` 值设置为 `auto`，则会忽略 `align-self`（个体设置）。**

### 轴

轴包括主轴和交叉轴，`justify-content` 属性决定子容器沿主轴的排列方式，`align-items` 属性决定子容器沿着交叉轴的排列方式。在 `flex` 布局中，`flex-direction` 属性决定主轴的方向，交叉轴的方向由主轴确定。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex_22.webp)

主轴的起始端由 `flex-start` 表示，末尾段由 `flex-end` 表示。不同的主轴方向对应的起始端、末尾段的位置也不相同。

**主轴方向：**

- 向右：`flex-direction: row`
- 向下：`flex-direction: column`
- 向左：`flex-direction: row-reverse`
- 向上：`flex-direction: column-reverse`

**可视化：**

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex-1.webp)
![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex-2.webp)
![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex-3.webp)
![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex-4.webp)

**交叉轴：**

主轴沿逆时针方向旋转 `90°` 就得到了交叉轴，交叉轴的起始端和末尾段也由 `flex-start` 和 `flex-end` 表示。

### flex 进阶

#### 父容器设置换行方式：flex-wrap

`flex-wrap` 属性决定子容器是否换行排列，不仅可以顺序换行而且支持逆序换行。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex-5.webp)

**值：**

- `nowrap`：不换行
- `wrap`：换行
- `wrap-reverse`：逆序换行，逆序换行是指沿着交叉轴的反方向换行

**可视化：**

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex-6.webp)
![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex-7.webp)
![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex-8.webp)

#### 轴向与换行组合设置：flex-flow

`flow` 即流向，也就是子容器沿着哪个方向流动，流动到终点是否允许换行，比如 `flex-flow: row wrap`，**`flex-flow` 是一个复合属性**，相当于 `flex-direction` 与 `flex-wrap` 的组合，可选的取值如下：

- `row`、`column` 等，可单独设置主轴方向
- `wrap`、`nowrap` 等，可单独设置换行方式
- `row nowrap`、`column wrap` 等，也可两者同时设置

#### 多行沿交叉轴对齐：align-content

当子容器多行排列时，设置行与行之间的对齐方式。

**值：**

- `flex-start`：起始端对齐
- `flex-end`：末尾段对齐
- `center`：居中对齐
- `space-around`：等边距均匀分布
- `space-between`：等间距均匀分布
- `stretch`：拉伸对齐

**可视化：**

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex-10.webp)
![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex-11.webp)
![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex-12.webp)
![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex-13.webp)
![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex-14.webp)
![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex-15.webp)

### 总结

以上就是 `flex` 布局的全部属性，一共 `12` 个，父容器、子容器各 `6` 个，可以随时通过下图进行回顾。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex-23.webp)

## grid

[Grid](https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid) 布局是一个二维的布局方法，纵横两个方向总是同时存在。

在 Grid 布局中，所有相关 CSS 属性正好分为两拨，一拨作用在 `grid` 容器上，还有一拨作用在 `grid` 子项上。

> 在 `Grid` 布局中，`float`，`display:inline-block`，`display:table-cell`，`vertical-align` 以及 `column-*` 这些属性和声明对 `grid` 子项是没有任何作用的。

给 `<div>` 这类块元素设置 `display:grid` 或者给 `<span>` 这类内联元素设置 `display:inline-grid` 创建 Grid 布局。

**双命名：**

**由于网格中中间区域的网格线是两边格子公用的**，就像道路有两边，因此，我们起名字的时候可以起两个名称（使用空格分隔），分别表示两侧。例如：

```css
.container {
    grid-template-columns: [第一根纵线] 80px [第1根纵线结束 第2根纵线开始] 100px [最后的结束线];
}
```

**repeat 语法：**

```css
.container {
    grid-template-columns: repeat(24, 40px [col-start]);
}
```

等同于：

```css
.container {
    grid-template-columns: 40px [col-start], 40px [col-start], /* ...省略20个...*/, 40px [col-start], 40px [col-start];
}
```

**fr 单位：**

`fr` 是单词 `fraction` 的缩写，表示分数。

```css
.container {
    grid-template-columns: 200px 1fr 1fr 1fr;
}
```

`4` 列布局，后面 `3` 列宽度是 `grid` 容器宽度减去 `200px` 后的 `1/3` 大小,`1:1:1`，剩余空间三等分

**fr 和 auto 混用：**

```css
.container {
    /* 减去第一列内容宽度，剩下三等分 */
    grid-template-columns: auto 1fr 1fr 1fr;
}
```

当设置 `fr` 和 `auto` 混用的时候，`auto` 的尺寸表现为“包裹”，为**内容宽度**。如果没有设置 `fr` 尺寸的网格，则表现为拉伸。

**当`fr` 数值之和小于 `1` 时：**

```css
.container {
    grid-template-columns: auto .25fr .25fr .25fr;
}
```

这里计算就相对复杂些，首先，由于第一个网格尺寸设置为 `auto`，因此 `fr` 计算需要的剩余空间尺寸是 `grid` 容器的宽度减去 `auto` 内容的宽度。所以，后面 3 个 `0.25` fr 元素的宽度是：**(容器宽度 - auto 内容宽度) * 0.25**。然后剩余尺寸就是第一个网格宽度。

**grid-template-areas:**

```css
.grid-container {
    grid-template-areas:
    /* 内容映射 */
    /* none 和 . 区别一个是空网格一个是不存在网格 */
        'header  .'
        'sidebar content'
        'footer  footer';
    /* 三行两列 */
    grid-template-columns: 200px 1fr;
    grid-template-rows: 80px 1fr 80px;

}
```

- `grid-area-name` 对应网格区域的名称。
- `.` 表示空的网格单元格。
- `none` 没有定义网格区域。

举个例子 🌰：[具体代码](./code/grid.html)

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/grid-2.png)

## 函数计算

### 函数

CSS 函数指复杂类型或调用特殊处理的组件值类型。为单调的属性声明增加了更强大的点缀，让简单的 CSS 变得更有艺术感。其语法也很简单，编写形式为 `function(params)`，JS 里的函数调用一致。在 CSS 代码中，只要带有 `()` 的属性值都是函数。

有了函数后，**可将一系列相关计算交给浏览器处理，可减少大量人工计算甚至无需人工计算**，大大提高了 CSS 代码的编写效率。

### 常用

`calc(exp)` 用于动态计算单位，数值、长度、角度、时间和百分比都能作为参数。

- 四则运算：只能使用 `+`、`-`、`*`、`/` 作为运算符号
- 运算顺序：遵循加减乘除运算顺序，可用 `()` 提升运算优先级
- 符号连接：每个运算符号必须使用空格间隔起来
- 混合计算：可混合不同计量单位动态计算

在 SPA 里有遇过因为有滚动条或没滚动条而导致页面路由在跳转过程中发生向左或向右的抖动吗？这让强迫症患者很不舒服，此时可用 `calc()` 巧妙解决该问题。

```css
.elem {
  padding-right: calc(100vw - 100%);
}
```

`100vw` 是视窗宽度，`100%` 内容宽度，那么 `100vw - 100%` 就是滚动条宽度了，声明 `padding-right` 用于保留滚动条出现的位置，这样滚动条出不出现都不会让页面抖动了。

**其它函数：**

- [`attr(val)`](./code/attr.html) 用于返回节点属性，通常结合伪元素的 content 使用，是一个很优雅的函数。
- [clip-path](https://bennettfeely.com/clippy/) 用于创建一个只有节点的部分区域可显示的剪切区域。

## 变量计算

[CSS 变量](./code/var.html)又名 CSS 自定义属性，指可在整个文档中重复使用的值。它由自定义属性 `--var` 和函数 `var()` 组成，`var()` 用于引用自定义属性。

```css
:root {
    /* 全局变量 */
    --bg-color: red;
}
.title {
    /* 局部变量 */
    --title-color: yellow;
    background-color: var(--bg-color);
}
.desc {
    background-color: var(--bg-color);
}
```

贴上阮一峰老师的教程[《CSS变量教程》](http://www.ruanyifeng.com/blog/2017/05/css-variables.html)。

**实践：**

> [条形加载条](./code/strip-loading.html)

## CSS 实战

### 文字溢出

> [多行文字溢出](./code/text-overflow.html)

### 1px 边框

> [移动端 1px 边框](./code/1px-border.html)

### 自动打字器

> [自动打字器](./code/auto-typing.html)

### 渐变背景

> [渐变背景](./code/gradient-bg.html)

### Emoji as a Favicon

> [How To Use an Emoji as a Favicon Easily](https://css-tricks.com/emoji-as-a-favicon/)
