# Element<!-- omit in toc -->

- [常用属性](#常用属性)
- [常用方法](#常用方法)
- [Element.dataset](#elementdataset)
- [Element.innerHTML](#elementinnerhtml)
- [Element.outerHTML](#elementouterhtml)
- [Element.insertAdjacentElement](#elementinsertadjacentelement)
- [Element.insertAdjacentHTML，Element.insertAdjacentText](#elementinsertadjacenthtmlelementinsertadjacenttext)
- [Element.focus，Element.blur](#elementfocuselementblur)
- [其他](#其他)

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/web/element.png)

## 常用属性

- **`children`** 属性返回一个 `HTMLCollection` 实例，成员是当前节点的所有元素子节点。该属性只读。
- **`firstElementChild`** 属性返回当前节点的第一个元素子节点。如果没有任何元素子节点，则返回 `null`
- **`lastElementChild`** 属性返回当前节点的最后一个元素子节点，如果不存在任何元素子节点，则返回 `null`
- **`childElementCount`** 属性返回一个整数，表示当前节点的所有元素子节点的数目。如果不包含任何元素子节点，则返回 `0`
- **`nextElementSibling`** 属性返回当前元素节点的后一个同级元素节点，如果没有则返回 `null`。
- **`previousElementSibling`** 属性返回当前元素节点的前一个同级元素节点，如果没有则返回 `null`。

## 常用方法

- **`append`** 方法为当前节点追加一个或多个子节点，位置是最后一个元素子节点的后面
- **`prepend`** 方法为当前节点追加一个或多个子节点，位置是第一个元素子节点的前面。它的用法与 `append` 方法完全一致，也是没有返回值
- **`remove`** 方法用于从父节点移除当前节点
- **`before`** 方法用于在当前节点的前面，插入一个或多个同级节点。两者拥有相同的父节点
- **`after`** 方法用于在当前节点的后面，插入一个或多个同级节点，两者拥有相同的父节点。用法与 `before` 方法完全相同
- **`replaceWith`** 方法使用参数节点，替换当前节点。参数可以是元素节点，也可以是文本节点

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/web/insertElement.png)

## Element.dataset

网页元素可以自定义 **data-属性**，用来添加数据。

```html
<div data-timestamp="1522907809292"></div>
```

上面代码中，`<div>` 元素有一个自定义的 `data-timestamp` 属性，用来为该元素添加一个时间戳。

`Element.dataset` 属性返回一个对象，可以从这个对象读写 **data-属性**。

```js
// <article
// id="foo"
// data-columns="3"
// data-index-number="12314"
// data-parent="cars">
// ...
// </article>

var article = document.getElementById('foo')
article.dataset.columns // "3"
article.dataset.indexNumber // "12314"
article.dataset.parent // "cars"

// 注意，dataset 上面的各个属性返回都是字符串。
```

## Element.innerHTML

`Element.innerHTML` 属性返回一个字符串，**等同于该元素包含的所有 HTML 代码**。该属性可读写，常用来设置某个节点的内容。它能改写所有元素节点的内容，包括 `<HTML>` 和 <`body>` 元素。

> 如果将 innerHTML 属性设为空，等于删除所有它包含的所有节点。

注意，读取属性值的时候，如果文本节点包含 `&`、小于号（ `<` ）和大于号（ `>` ），`innerHTML` 属性会将它们转为实体形式 `&amp;`、`&lt;`、`&gt;`。

写入的时候，如果插入的文本包含 HTML 标签，会被解析成为节点对象插入 DOM。注意，如果文本之中含有 `<script>` 标签，虽然可以生成 `script` 节点，但是**插入的代码不会执行**。

## Element.outerHTML

`Element.outerHTML` 属性返回一个字符串，表示当前元素节点的所有 HTML 代码，**包括该元素本身和所有子元素**。

如果一个节点没有父节点，设置 `outerHTML` 属性会报错

## Element.insertAdjacentElement

`Element.insertAdjacentElement` 方法在相对于当前元素的指定位置，插入一个新的节点。该方法返回被插入的节点，如果插入失败，返回 `null`。

`Element.insertAdjacentElement` 方法一共可以接受两个参数，第一个参数是一个字符串，表示插入的位置，第二个参数是将要插入的节点。第一个参数只可以取如下的值。

- **`beforebegin`**：当前元素之前
- **`afterbegin`**：当前元素内部的第一个子节点前面
- **`beforeend`**：当前元素内部的最后一个子节点后面
- **`afterend`**：当前元素之后

注意，`beforebegin` 和 `afterend` 这两个值，只在当前节点有父节点时才会生效。如果当前节点是由脚本创建的，没有父节点，那么插入会失败。

```js
var p1 = document.createElement('p')
var p2 = document.createElement('p')
p1.insertAdjacentElement('afterend', p2) // null
```

上面代码中，p1 没有父节点，所以插入 p2 到它后面就失败了。

如果插入的节点是一个文档里现有的节点，它会从原有位置删除，放置到新的位置

## Element.insertAdjacentHTML，Element.insertAdjacentText

```js
// HTML 代码：<div id="one">one</div>
var d1 = document.getElementById('one')
d1.insertAdjacentHTML('afterend', '<div id="two">two</div>')
// 执行后的 HTML 代码：
// <div id="one">one</div><div id="two">two</div>
```

**该方法只是在现有的 DOM 结构里面插入节点，这使得它的执行速度比 `innerHTML` 方法快得多。**

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/web/insertHTML.png)

注意，**该方法不会转义 HTML 字符串**，这导致它**不能用来插入用户输入的内容**，否则会有安全风险。

`Element.insertAdjacentText` 方法在相对于当前节点的指定位置，插入一个文本节点，用法与 `Element.insertAdjacentHTML` 方法完全一致

## Element.focus，Element.blur

- `Element.focus` 方法用于将当前页面的焦点，转移到指定元素上。
- `Element.blur` 方法用于将焦点从当前元素移除。从 `document.activeElement` 属性可以得到当前获得焦点的元素

## 其他

```js
// 元素特性相关属性
Element.id  // 返回指定元素的 id 属性，可读写
Element.tagName  // 返回指定元素的大写标签名
Element.accessKey  // 用于读写分配给当前元素的快捷键
Element.draggble // 返回一个布尔值，表示当前元素是否可拖动
Elemnt.tabIndex // 返回一个整数，表示当前元素在 Tab 键遍历时的顺序。该属性可读写。
Element.title  // 用来读写当前元素的 HTML 属性 title
Element.attributes  // 返回当前元素节点的所有属性节点
Element.className  // 返回当前元素的 class 属性，可读写
Element.classList  // 返回当前元素节点的所有 class 集合

// 元素状态的相关属性
Element.hidden // 返回一个布尔值，表示当前元素的 hidden 属性，用来控制当前元素是否可见。该属性可读写
Element.contentEditable // 返回一个字符串，表示是否设置了 contenteditable 属性
Element.iscontentEditable // 返回一布尔值，表示是否设置了 contenteditable 属性，只读

// 查找方法
Element.closest() // 接受一个 CSS 选择器作为参数，返回匹配该选择器的、最接近当前节点的一个祖先节点（包括当前节点本身）
```
