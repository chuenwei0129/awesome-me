---
title: 选择器
toc: content
group:
  title: 基础
---

## 选择器

CSS 中有多种选择器，用于选择要样式化的元素。

下面我们以一个案例为说明，虽然只是一部分 CSS 选择器的例子，但以上的选择器已经满足了我们平常开发时遇到的绝大部分需求。

```jsx | pure
import './style.css'

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
  )
}
```

```css
/* style.css */
/* 元素选择器：选择指定类型的元素。 */
/* 后代选择器：选择作为指定祖先元素内的后代的元素。 */
/* 伪类选择器：选择特定状态或行为的元素。 */
ul li:first-child {
  color: bisque;
}

/* 子元素选择器：选择作为指定父元素的直接子元素的元素。 */
.container > p {
  border: 1px solid red;
}

/* 类选择器：选择具有指定类名的元素。 */
li.active {
  font-weight: bold;
  color: red;
}

/* 通用选择器：选择所有元素。 */
.container * {
  font-style: italic;
}

/* 相邻兄弟选择器：选择紧接在指定元素之后的同级元素。 */
h1 + p {
  background-color: blanchedalmond;
}

/* 通用兄弟选择器：选择指定元素之后的所有同级元素。 */
h1 ~ p {
  color: red;
}

/* 伪类选择器：选择特定状态或行为的元素。 */
li:not(.active) {
  text-decoration: underline;
}

/* 属性选择器：选择具有指定属性或属性值的元素。 */
/* 关于引号的问题，有时候见到属性选择器中的 value 是有引号的，有时候又是没有引号的。 */
/* 关于引号的问题，css 中有一套规则，满足规则的情况下可以不使用引号，否则则需要使用。通常情况下，为了保险起见，就全都加上引号吧。 */
li[id^='item'] {
  font-size: 30px;
}
```

## 选择器优先级

> 测试 CSS 选择器权重工具：[CSS Selector Specificity](https://polypane.app/css-specificity-calculator)

1. 当有多条相同权重的规则时，最后面的规则会覆盖前面的规则。换句话说，样式从上到下应用，直到最后一个规则生效。

2. 标签选择器和伪元素选择器的优先级是一样的。

3. 类选择器、属性选择器和伪类选择器的优先级是相同的。

4. 通用选择器 (`*`)、组合符 (`+`、`>`、`~`) 和调整优先级的选择器 (`:where()`) 不会影响选择器的优先级。

5. 否定伪类 (`:not()`) 和任意匹配伪类 (`:is()`) 本身不会影响优先级，但它们的参数会影响。参数中优先级最高的那个参数的优先级将作为该伪类选择器的优先级。

6. 内联样式 (即 `style` 属性中的样式声明) 优先级最高，优先于所有普通样式。内联样式的优先级可以理解为 `1-0-0-0`，即使选择器中有多个 ID，它仍然具有更高的优先级。

7. `!important` 是一个特殊的 CSS 声明，用来覆盖所有其他优先级计算，但必须谨慎使用。它能覆盖普通规则的层叠。

| 选择器                                    | ID  | 类  | 元素 | 优先级 |
| ----------------------------------------- | --- | --- | ---- | ------ |
| `h1`                                      | 0   | 0   | 1    | 0-0-1  |
| `h1 + p::first-letter`                    | 0   | 0   | 3    | 0-0-3  |
| `li > a[href*="en-US"] > .inline-warning` | 0   | 2   | 2    | 0-2-2  |
| `#identifier`                             | 1   | 0   | 0    | 1-0-0  |
| `button:not(#mainBtn, .cta)`              | 1   | 0   | 1    | 1-0-1  |

## 选择器列表

**CSS 选择器列表**是以逗号 (`,`) 分隔的多个选择器所组成的列表。

当多个选择器共享相同的声明时，它们可以被编组进一个以逗号分隔的列表。选择器列表也可以作为参数传递给一些函数式 CSS 伪类。

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

> 使用选择器列表的一个缺点是：
>
> **选择器列表中的单个不受支持的选择器会使整个规则无效化。**

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
h1,
h2:invalid-pseudo,
h3 {
  font-family: sans-serif;
}
```

它们不是等效的。在第一个规则集中，样式将应用于 `h1` 和 `h3` 元素，但 `h2:invalid-pseudo` 规则将不会被解析。在第二个规则集中，由于列表中的一个选择器是无效的，整个规则都将不会被解析。因此，没有样式会被应用到 `h1` 和 `h3` 元素：当一个选择器列表中任意选择器无效时，整个样式块将被忽略。

解决[无效的选择器列表](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Selector_list#%E6%97%A0%E6%95%88%E7%9A%84%E9%80%89%E6%8B%A9%E5%99%A8%E5%88%97%E8%A1%A8)问题的一种方法是使用 [`:is()`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:is) 或 [`:where()`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:where) 伪类，它们接受一个可容错选择器列表。可容错选择器列表中的每个选择器都被单独解析。因此列表中任何无效的选择器会被忽略，而有效的选择器则会被有效使用。

> 这两个的区别在于：

- **`:is()` 选择器**：它的优先级是由其最具体的参数决定的。这意味着，如果你在 `:is()` 中使用了一个高优先级的选择器，那么整个 `:is()` 选择器的优先级就会变得很高。
- **`:where()` 选择器**：它的优先级始终为零。即使你在 `:where()` 中使用了高优先级的选择器，其优先级也不会增加。

> 让我们通过一个例子来详细说明 `,` 选择器列表、`:is`、`:where` 的优先级区别。

```html
<!-- demo.html -->
<div>
  <p class="text1">我是文本1</p>
  <p class="text2">我是文本2</p>
  <p id="text3">我是文本3</p>
</div>
```

```css
/* demo.css */
:is(#text3, .text1, .text2) {
  color: blue;
}

:where(#text3, .text1, .text2) {
  color: red;
}

#text3,
.text1,
.text2 {
  color: yellow;
}
```

> **选择器优先级分析**：

`:is` 选择器的优先级是由其最具体的参数决定的。在这个例子中，`#text3` 是 ID 选择器，优先级为 `0-1-0`，而 `.text1` 和 `.text2` 是类选择器，优先级为 `0-0-1`。因此，`:is(#text3, .text1, .text2)` 的优先级是 `0-1-0`，因为 ID 选择器的优先级最高。

`:where` 选择器的优先级始终为零，无论其参数是什么。因此，`:where(#text3, .text1, .text2)` 的优先级是 `0-0-0`。

`#text3, .text1, .text2` 这个选择器列表中的每个选择器的优先级分别是：

- `#text3` 的优先级是 `0-1-0`
- `.text1` 的优先级是 `0-0-1`
- `.text2` 的优先级是 `0-0-1`

根据优先级规则，优先级高的样式会覆盖优先级低的样式。让我们看一下每个元素最终应用的颜色。

- `:is(#text3, .text1, .text2)` 选择器的优先级是 `0-1-0`，颜色是蓝色。
- `:where(#text3, .text1, .text2)` 选择器的优先级是 `0-0-0`，颜色是红色。
- `.text1` 和 `.text2` 的优先级是 `0-0-1`，颜色是黄色。

由于 `:is(#text3, .text1, .text2)` 的优先级最高 (`0-1-0`)，最终 `p.text1` 和 `p.text2` 的颜色会是蓝色。

- `:is(#text3, .text1, .text2)` 选择器的优先级是 `0-1-0`，颜色是蓝色。
- `:where(#text3, .text1, .text2)` 选择器的优先级是 `0-0-0`，颜色是红色。
- `#text3` 的优先级是 `0-1-0`，颜色是黄色。

由于 `:is(#text3, .text1, .text2)` 和 `#text3` 的优先级都是 `0-1-0`，但是在 CSS 中，后定义的样式会覆盖先定义的样式。因此，`#text3` 的颜色会是黄色。

## [伪类](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Selectors/Pseudo-classes_and_pseudo-elements#伪类)

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/weilei.webp)

| 选择器                                                                                                                           | 描述                                                                                                                                                                                                            |
| -------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`:active`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:active)                                                            | 在用户激活（例如点击）元素的时候匹配。                                                                                                                                                                          |
| [`:any-link`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:any-link)                                                        | 匹配一个链接的`:link`和`:visited`状态。                                                                                                                                                                         |
| [`:blank`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:blank)                                                              | 匹配空输入值的[`<input>`元素](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input)。                                                                                                                |
| [`:checked`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:checked)                                                          | 匹配处于选中状态的单选或者复选框。                                                                                                                                                                              |
| [`:current` (en-US)](https://developer.mozilla.org/en-US/docs/Web/CSS/:current 'Currently only available in English (US)')       | 匹配正在展示的元素，或者其上级元素。                                                                                                                                                                            |
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
| [`:future` (en-US)](https://developer.mozilla.org/en-US/docs/Web/CSS/:future 'Currently only available in English (US)')         | 匹配当前元素之后的元素。                                                                                                                                                                                        |
| [`:hover`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:hover)                                                              | 当用户悬浮到一个元素之上的时候匹配。                                                                                                                                                                            |
| [`:indeterminate`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:indeterminate)                                              | 匹配未定态值的 UI 元素，通常为[复选框](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input/checkbox)。                                                                                              |
| [`:in-range`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:in-range)                                                        | 用一个区间匹配元素，当值处于区间之内时匹配。                                                                                                                                                                    |
| [`:invalid`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:invalid)                                                          | 匹配诸如`<input>`的位于不可用状态的元素。                                                                                                                                                                       |
| [`:lang`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:lang)                                                                | 基于语言（HTML[lang](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes/lang)属性的值）匹配元素。                                                                                              |
| [`:last-child`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:last-child)                                                    | 匹配兄弟元素中最末的那个元素。                                                                                                                                                                                  |
| [`:last-of-type`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:last-of-type)                                                | 匹配兄弟元素中最后一个某种类型的元素。                                                                                                                                                                          |
| [`:left`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:left)                                                                | 在[分页媒体 (en-US)](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_paged_media 'Currently only available in English (US)')中，匹配左手边的页。                                                           |
| [`:link`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:link)                                                                | 匹配未曾访问的链接。                                                                                                                                                                                            |
| [`:local-link` (en-US)](https://developer.mozilla.org/en-US/docs/Web/CSS/:local-link 'Currently only available in English (US)') | 匹配指向和当前文档同一网站页面的链接。                                                                                                                                                                          |
| [`:is()`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:is)                                                                  | 匹配传入的选择器列表中的任何选择器。                                                                                                                                                                            |
| [`:not`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:not)                                                                  | 匹配作为值传入自身的选择器未匹配的物件。                                                                                                                                                                        |
| [`:nth-child`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:nth-child)                                                      | 匹配一列兄弟元素中的元素——兄弟元素按照*an+b*形式的式子进行匹配（比如 2n+1 匹配元素 1、3、5、7 等。即所有的奇数个）。                                                                                            |
| [`:nth-of-type`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:nth-of-type)                                                  | 匹配某种类型的一列兄弟元素（比如，`<p>`元素）——兄弟元素按照*an+b*形式的式子进行匹配（比如 2n+1 匹配元素 1、3、5、7 等。即所有的奇数个）。                                                                       |
| [`:nth-last-child`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:nth-last-child)                                            | 匹配一列兄弟元素，从后往前倒数。兄弟元素按照*an+b*形式的式子进行匹配（比如 2n+1 匹配按照顺序来的最后一个元素，然后往前两个，再往前两个，诸如此类。从后往前数的所有奇数个）。                                    |
| [`:nth-last-of-type`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:nth-last-of-type)                                        | 匹配某种类型的一列兄弟元素（比如，`<p>`元素），从后往前倒数。兄弟元素按照*an+b*形式的式子进行匹配（比如 2n+1 匹配按照顺序来的最后一个元素，然后往前两个，再往前两个，诸如此类。从后往前数的所有奇数个）。       |
| [`:only-child`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:only-child)                                                    | 匹配没有兄弟元素的元素。                                                                                                                                                                                        |
| [`:only-of-type`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:only-of-type)                                                | 匹配兄弟元素中某类型仅有的元素。                                                                                                                                                                                |
| [`:optional`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:optional)                                                        | 匹配不是必填的 form 元素。                                                                                                                                                                                      |
| [`:out-of-range`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:out-of-range)                                                | 按区间匹配元素，当值不在区间内的的时候匹配。                                                                                                                                                                    |
| [`:past` (en-US)](https://developer.mozilla.org/en-US/docs/Web/CSS/:past 'Currently only available in English (US)')             | 匹配当前元素之前的元素。                                                                                                                                                                                        |
| [`:placeholder-shown`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:placeholder-shown)                                      | 匹配显示占位文字的 input 元素。                                                                                                                                                                                 |
| [`:playing`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:playing)                                                          | 匹配代表音频、视频或者相似的能“播放”或者“暂停”的资源的，且正在“播放”的元素。                                                                                                                                    |
| [`:paused`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:paused)                                                            | 匹配代表音频、视频或者相似的能“播放”或者“暂停”的资源的，且正在“暂停”的元素。                                                                                                                                    |
| [`:read-only`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:read-only)                                                      | 匹配用户不可更改的元素。                                                                                                                                                                                        |
| [`:read-write`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:read-write)                                                    | 匹配用户可更改的元素。                                                                                                                                                                                          |
| [`:required`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:required)                                                        | 匹配必填的 form 元素。                                                                                                                                                                                          |
| [`:right`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:right)                                                              | 在[分页媒体 (en-US)](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_paged_media 'Currently only available in English (US)')中，匹配右手边的页。                                                           |
| [`:root`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:root)                                                                | 匹配文档的根元素。                                                                                                                                                                                              |
| [`:scope`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:scope)                                                              | 匹配任何为参考点元素的的元素。                                                                                                                                                                                  |
| [`:valid`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:valid)                                                              | 匹配诸如`<input>`元素的处于可用状态的元素。                                                                                                                                                                     |
| [`:target`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:target)                                                            | 匹配当前 URL 目标的元素（例如如果它有一个匹配当前[URL 分段](https://en.wikipedia.org/wiki/Fragment_identifier)的元素）。                                                                                        |
| [`:visited`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:visited)                                                          | 匹配已访问链接。                                                                                                                                                                                                |

## [伪元素](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Selectors/Pseudo-classes_and_pseudo-elements#伪元素)

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/weiyuansu.png)

| 选择器                                                                                  | 描述                                                                             |
| --------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| [`::after`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::after)                   | 匹配出现在原有元素的实际内容之后的一个可样式化元素。默认情况下，它是行向布局的。 |
| [`::before`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::before)                 | 匹配出现在原有元素的实际内容之前的一个可样式化元素。                             |
| [`::first-letter`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::first-letter)     | 匹配元素的第一个字母。                                                           |
| [`::first-line`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::first-line)         | 匹配包含此伪元素的元素的第一行。                                                 |
| [`::grammar-error`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::grammar-error)   | 匹配文档中包含了浏览器标记的语法错误的那部分。                                   |
| [`::selection`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::selection)           | 匹配文档中被选择的那部分。                                                       |
| [`::spelling-error`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::spelling-error) | 匹配文档中包含了浏览器标记的拼写错误的那部分。                                   |

> **备注：**`::before` 和 `::after` 生成的伪元素是行级盒子，**就好像它们是应用它们的元素或 “源元素” 的直接子元素**，因此不能应用于[_替换元素_](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Replaced_element) (如 [`<img>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img))，它们的内容在不受当前文档样式的影响的情况下被替换。

## [使用全局选择器，让选择器更易读](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Selectors/Type_Class_and_ID_Selectors#使用全局选择器，让选择器更易读)

全局选择器的一种用法是让选择器更易读，更明显地表明它们的作用。例如，如果我想选中任何 `<article>` 元素的第一子元素，不论它是什么元素，都给它加粗，我可以将 [`:first-child`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:first-child) 选择器用作 `<article>` 元素选择器的一个后代选择器：

```css
article :first-child {
}
```

但是这会和 `article:first-child` 混淆，而后者选择了作为其他元素的第一子元素的 `<article>` 元素。

为了避免这种混淆，我们可以向 `:first-child` 选择器加入全局选择器，这样选择器所做的事情很容易就能看懂。选择器正选中 `<article>` 元素的*任何*第一子元素：

```css
article *:first-child {
}
```

## 无法解析的选择器

> 当浏览器遇到无法解析的 CSS 代码时，会发生什么？

答案就是**浏览器什么也不会做**，继续解析下一个 CSS 样式！

如果一个浏览器在解析你所书写的 CSS 规则的过程中遇到了**无法理解的属性或者值**，它会忽略这些并继续解析下面的 CSS 声明。在你书写了**错误的 CSS 代码** (或者误拼写)，又或者当浏览器遇到对于它来说**很新的还没有支持的 CSS 代码**的时候上述的情况同样会发生 (直接忽略)。

相似的，当浏览器遇到**无法解析的选择器**的时候，他会直接忽略整个选择器规则，然后解析下一个 CSS 选择器。

## 选择器优先级相关的一个缺陷

CSS 文件如下：

```css
.blue {color: blue;}
.red {color: red;}
```

HTML 文件如下：

```html
<p class="red blue">我是什么颜色？</p>
```

请问 `p` 标签是什么颜色的？

从 class 来看，blue 在 red 后面，`p` 应该是蓝色的么？

实际上，**样式取决于他们在样式表中定义的顺序**，`.red` 的定义在 `.blue` 后面，所以 `p` 应该是红色的。

如果 `.red` 和 `.blue` 分别在两个文件中定义呢？

```css
/* css 文件1 */
.blue {color: blue;}
```

```css
/* css 文件2 */
.red {color: red;}
```

那 `p` 的样式就取决于最终打包代码中样式文件的加载顺序。
