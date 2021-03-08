# DOM 知识整理<!-- omit in toc -->

- [节点](#节点)
- [DOM 树 🌴](#dom-树-)
- [Node 接口](#node-接口)
	- [常用属性](#常用属性)
		- [nodeType、nodeName、nodeValue](#nodetypenodenamenodevalue)
		- [textContent](#textcontent)
		- [nextSibling、previousSibling、firstChild、lastChild、childNodes](#nextsiblingprevioussiblingfirstchildlastchildchildnodes)
		- [parentNode](#parentnode)
		- [parentElement](#parentelement)
		- [isConnected](#isconnected)
	- [常用方法](#常用方法)
		- [appendChild()](#appendchild)
		- [hasChildNodes()](#haschildnodes)
		- [insertBefore()](#insertbefore)
		- [removeChild()](#removechild)
		- [replaceChild()](#replacechild)
- [NodeList 接口，HTMLCollection 接口](#nodelist-接口htmlcollection-接口)
	- [NodeList 接口](#nodelist-接口)
	- [HTMLCollection 接口](#htmlcollection-接口)
- [ParentNode 接口，ChildNode 接口](#parentnode-接口childnode-接口)
	- [ParentNode 接口](#parentnode-接口)
	- [ChildNode 接口](#childnode-接口)
- [Document 节点](#document-节点)
	- [document.visibilityState](#documentvisibilitystate)
	- [document.readyState](#documentreadystate)
	- [document.domain](#documentdomain)
	- [document.location](#documentlocation)
	- [document.cookie](#documentcookie)
	- [querySelector()，querySelectorAll()，getElementsByTagName()，getElementsByClassName()，getElementsByName()，getElementById()](#queryselectorqueryselectorallgetelementsbytagnamegetelementsbyclassnamegetelementsbynamegetelementbyid)
	- [createElement()，createTextNode()，createAttribute()，createComment()，createDocumentFragment()](#createelementcreatetextnodecreateattributecreatecommentcreatedocumentfragment)
	- [document.createNodeIterator()](#documentcreatenodeiterator)
	- [其他](#其他)
- [Element 节点](#element-节点)
	- [Element.dataset](#elementdataset)
	- [Element.innerHTML](#elementinnerhtml)
	- [Element.outerHTML](#elementouterhtml)
	- [Element.nextElementSibling，Element.previousElementSibling](#elementnextelementsiblingelementpreviouselementsibling)
	- [Element.insertAdjacentElement()](#elementinsertadjacentelement)
	- [Element.insertAdjacentHTML()，Element.insertAdjacentText()](#elementinsertadjacenthtmlelementinsertadjacenttext)
	- [Element.focus()，Element.blur()](#elementfocuselementblur)
- [属性的操作](#属性的操作)
- [CSS 操作](#css-操作)
	- [行内样式](#行内样式)
	- [CAN I USE](#can-i-use)
	- [window.getComputedStyle()](#windowgetcomputedstyle)
	- [盒模型](#盒模型)
		- [Element.clientHeight，Element.clientWidth](#elementclientheightelementclientwidth)
		- [Element.clientLeft，Element.clientTop](#elementclientleftelementclienttop)
		- [Element.scrollHeight，Element.scrollWidth](#elementscrollheightelementscrollwidth)
		- [Element.scrollLeft，Element.scrollTop](#elementscrollleftelementscrolltop)
		- [Element.offsetHeight，Element.offsetWidth](#elementoffsetheightelementoffsetwidth)
- [DOM 事件](#dom-事件)
	- [HTML 的 on- 属性](#html-的-on--属性)
	- [元素节点的事件属性](#元素节点的事件属性)
	- [EventTarget.addEventListener()](#eventtargetaddeventlistener)
	- [事件的传播](#事件的传播)
	- [Event 对象](#event-对象)
	- [常见事件](#常见事件)

## 节点

DOM 的最小组成单位叫做节点，节点的类型有七种。

- `Document`：整个文档树的顶层节点
- `DocumentType`：`doctype` 标签（比如 `<!DOCTYPE html>`）
- `Element`：网页的各种 HTML 标签（比如 `<body>、<a>` 等
- `Attr`：网页元素的属性（比如 `class="right"`）
- `Text`：标签之间或标签包含的文本
- `Comment`：注释
- `DocumentFragment`：文档的片段

## DOM 树 🌴

浏览器原生提供 document 节点，代表整个文档。

document 有两个子节点，第一个是文档类型节点（`<!doctype html>`），第二个是 HTML 网页的顶层容器标签`<html>`。后者构成了树结构的根节点（root node），其他 HTML 标签节点都是它的下级节点。

**除了根节点，其他节点都有三种层级关系。**

- 父节点关系（parentNode）：直接的那个上级节点
- 子节点关系（childNodes）：直接的下级节点
- 同级节点关系（sibling）：拥有同一个父节点的节点

## Node 接口

所有 DOM 节点对象都继承了 Node 接口，拥有一些共同的属性和方法

### 常用属性

#### nodeType、nodeName、nodeValue

|       节点       | nodeType 值 |        nodeType 常量        |      nodeName      | nodeValue |
| :--------------: | :---------: | :-------------------------: | :----------------: | :-------: |
|     Document     |      9      |     node.DOCUMENT_NODE      |     #document      |   null    |
|   DocumentType   |     10      |   node.DOCUMENT_TYPE_NODE   |     文档的类型     |   null    |
|     Element      |      1      |      node.ELEMENT_NODE      |    大写的标签名    |   null    |
|       Attr       |      2      |     node.ATTRIBUTE_NODE     |     属性的名称     |  文本值   |
|       Text       |      3      |       node.TEXT_NODE        |       #text        |  文本值   |
|     Comment      |      8      |      node.COMMENT_NODE      |      #comment      |  文本值   |
| DocumentFragment |     11      | node.DOCUMENT_FRAGMENT_NODE | #document-fragment |   null    |

#### textContent

`textContent` 属性返回当前节点和它的所有后代节点的文本内容

该属性是可读写的，设置该属性的值，会用一个新的文本节点，替换所有原来的子节点。它还有一个好处，就是自动对 HTML 标签转义。

```js
document.getElementById('foo').textContent = '<p>GoodBye!</p>'
```

上面代码在插入文本时，会将`<p>`标签解释为文本，而不会当作标签处理。

对于文本节点（text）、注释节点（comment）和属性节点（attr），`textContent` 属性的值与 `nodeValue` 属性相同。对于其他类型的节点，该属性会将每个子节点（不包括注释节点）的内容连接在一起返回。如果一个节点没有子节点，则返回空字符串。

文档节点（document）和文档类型节点（doctype）的 `textContent` 属性为 `null`。如果要读取整个文档的内容，可以使用 `document.documentElement.textContent`。

#### nextSibling、previousSibling、firstChild、lastChild、childNodes

`nextSibling` 属性返回紧跟在当前节点后面的第一个同级节点。如果当前节点后面没有同级节点，则返回 `null`

`previousSibling` 属性返回当前节点前面的、距离最近的一个同级节点。如果当前节点前面没有同级节点，则返回 `null`

`firstChild` 属性返回当前节点的第一个子节点，如果当前节点没有子节点，则返回 `null`

`lastChild` 属性返回当前节点的最后一个子节点，如果当前节点没有子节点，则返回 `null`

`childNodes`属性返回一个类似数组的对象（`NodeList`集合），成员包括当前节点的所有子节点，除了元素节点，`childNodes`属性的返回值还包括文本节点和注释节点

```js
<div id="parent">
  <div id="child1">子节点1</div>
  <div id="child2">子节点2</div>
</div>
<script>
  var child1 = document.getElementById('child1'),
    child2 = document.getElementById('child2'),
    parent = document.getElementById('parent')

  console.log('child1...', child1.previousSibling, child1.nextSibling)
  console.log(
    'child2...',
    child2.previousSibling.previousSibling,
    child2.nextSibling.nextSibling
  )
  console.log('parent...', parent.firstChild.nextSibling, parent.lastChild)
  console.log('childNodes...', parent.childNodes)

  // child1... #text #text
  // child2... <div id="child1">​子节点1​</div>​ null
  // parent... <div id=​"child1">​子节点1​</div>​ #text
  // childNodes... NodeList(5) [text, div#child1, text, div#child2, text]
</script>
```

注意，节点还包括文本节点和注释节点（`<!-- comment -->`）。因此如果当前节点前面或后面或与子节点有空格，属性会返回一个文本节点，内容为`#text`。

`nextSibling` 属性可以用来遍历所有子节点。

```js
var el = document.getElementById('div1').firstChild

while (el !== null) {
	console.log(el.nodeName)
	el = el.nextSibling
}
```

#### parentNode

`parentNode`属性返回当前节点的父节点。对于一个节点来说，它的父节点只可能是三种类型：元素节点（element）、文档节点（document）和文档片段节点（documentfragment）。

文档节点（document）和文档片段节点（documentfragment）的父节点都是`null`。另外，对于那些生成后还没插入 DOM 树的节点，父节点也是`null`

#### parentElement

`parentElement`属性返回当前节点的父元素节点。如果当前节点没有父节点，或者父节点类型不是元素节点，则返回`null`。

#### isConnected

`isConnected` 属性返回一个布尔值，表示当前节点是否在文档之中。

```js
var test = document.createElement('p')
test.isConnected // false

document.body.appendChild(test)
test.isConnected // true
```

### 常用方法

#### appendChild()

`appendChild` 方法接受一个节点对象作为参数，将其作为最后一个子节点，插入当前节点，如果参数节点是 DOM 已经存在的节点，`appendChild` 方法会将其从原来的位置，移动到新位置。该方法的返回值就是插入文档的子节点。

```js
<div id="parent">
  <div id="child">子节点</div>
  <p>hello world</p>
</div>
<script>
  var parent = document.getElementById('parent'),
    div = document.getElementById('child')

  parent.appendChild(div)
</script>
```

#### hasChildNodes()

`hasChildNodes` 方法返回一个布尔值，表示当前节点是否有子节点

判断一个节点有没有子节点，有许多种方法，下面是其中的三种。

- `node.hasChildNodes()`
- `node.firstChild !== null`
- `node.childNodes && node.childNodes.length > 0`

#### insertBefore()

`insertBefore` 方法用于将某个节点插入父节点内部的指定位置。返回值是插入的新节点 newNode。

```js
var insertedNode = parentNode.insertBefore(newNode, referenceNode)
```

`insertBefore` 方法接受两个参数，第一个参数是所要插入的节点 `newNode`，第二个参数是父节点 `parentNode` 内部的一个子节点 `referenceNode`。`newNode` 将插在 `referenceNode` 这个子节点的前面。

由于不存在 `insertAfter` 方法，如果新节点要插在父节点的某个子节点后面，可以用 `insertBefore` 方法结合 `nextSibling` 属性模拟。

```js
parent.insertBefore(s1, s2.nextSibling)
```

#### removeChild()

`removeChild` 方法接受一个子节点作为参数，用于从当前节点移除该子节点。返回值是移除的子节点。

下面是如何移除当前节点的所有子节点。

```js
var element = document.getElementById('top')
while (element.firstChild) {
	element.removeChild(element.firstChild)
}
```

被移除的节点依然存在于内存之中，但不再是 DOM 的一部分。所以，一个节点移除以后，依然可以使用它，比如插入到另一个节点下面。

#### replaceChild()

`replaceChild` 方法用于将一个新的节点，替换当前节点的某一个子节点。

```js
var replacedNode = parentNode.replaceChild(newChild, oldChild)
```

上面代码中，`replaceChild` 方法接受两个参数，第一个参数 `newChild` 是用来替换的新节点，第二个参数 `oldChild` 是将要替换走的子节点。返回值是替换走的那个节点 `oldChild`。

## NodeList 接口，HTMLCollection 接口

节点都是单个对象，有时需要一种数据结构，能够容纳多个节点。DOM 提供两种节点集合，用于容纳多个节点：`NodeList` 和 `HTMLCollection`。

### NodeList 接口

`NodeList` 实例是一个类似数组的对象，它的成员是节点对象。通过以下方法可以得到 `NodeList` 实例。

- `Node.childNodes`
- `document.querySelectorAll()` 等节点搜索方法

`NodeList` 实例很像数组，**可以使用 `length` 属性和 `forEach` 方法。但是，它不是数组，不能使用 `pop` 或 `push` 之类数组特有的方法**。

`forEach` 方法用于遍历 `NodeList` 的所有成员。它接受一个回调函数作为参数，每一轮遍历就执行一次这个回调函数，用法与数组实例的 `forEach` 方法完全一致。

`item` 方法接受一个整数值作为参数，表示成员的位置，返回该位置上的成员。
所有类似数组的对象，都可以使用方括号运算符取出成员。一般情况下，都是使用方括号运算符，而不使用 `item` 方法。

`keys()`、`values()`、`entries()` 这三个方法都返回一个 ES6 的遍历器对象，可以通过 `for...of` 循环遍历获取每一个成员的信息。

### HTMLCollection 接口

`HTMLCollection` 是一个节点对象的集合，只能包含元素节点（`element`），不能包含其他类型的节点。它的返回值是一个类似数组的对象，但是与 `NodeList` 接口不同，**`HTMLCollection`没有`forEach` 方法**，只能使用 `for` 循环遍历。

返回 `HTMLCollection` 实例的，**主要是一些 `Document` 对象的集合属性**，比如 `document.links`、`document.forms`、`document.images` 等。

如果元素节点有 `id` 或 `name` 属性，那么 `HTMLCollection` 实例上面，可以使用 `id` 属性或 `name` 属性引用该节点元素。如果没有对应的节点，则返回 `null`。

```js
// HTML 代码如下
// <img id="pic" src="http://example.com/foo.jpg">

var pic = document.getElementById('pic')
document.images.pic === pic // true
```

## ParentNode 接口，ChildNode 接口

### ParentNode 接口

- `children` 属性返回一个 `HTMLCollection` 实例，成员是当前节点的所有元素子节点。该属性只读
- `firstElementChild` 属性返回当前节点的第一个元素子节点。如果没有任何元素子节点，则返回 `null`
- `lastElementChild` 属性返回当前节点的最后一个元素子节点，如果不存在任何元素子节点，则返回 `null`
- `childElementCount` 属性返回一个整数，表示当前节点的所有元素子节点的数目。如果不包含任何元素子节点，则返回 0
- `append` 方法为当前节点追加一个或多个子节点，位置是最后一个元素子节点的后面
- `prepend` 方法为当前节点追加一个或多个子节点，位置是第一个元素子节点的前面。它的用法与 `append` 方法完全一致，也是没有返回值

### ChildNode 接口

- `remove` 方法用于从父节点移除当前节点
- `before` 方法用于在当前节点的前面，插入一个或多个同级节点。两者拥有相同的父节点
- `after` 方法用于在当前节点的后面，插入一个或多个同级节点，两者拥有相同的父节点。用法与 `before` 方法完全相同
- `replaceWith` 方法使用参数节点，替换当前节点。参数可以是元素节点，也可以是文本节点

## Document 节点

### document.visibilityState

`document.visibilityState` 返回文档的可见状态。

它的值有四种可能。

- **visible**：页面可见。注意，页面可能是部分可见，即不是焦点窗口，前面被其他窗口部分挡住了。
- **hidden**：页面不可见，有可能窗口最小化，或者浏览器切换到了另一个 Tab。
- **prerender**：页面处于正在渲染状态，对于用户来说，该页面不可见。
- **unloaded**：页面从内存里面卸载了。

这个属性可以用在页面加载时，防止加载某些资源；或者页面不可见时，停掉一些页面功能。

### document.readyState

`document.readyState` 属性返回当前文档的状态，共有三种可能的值。

- **loading**：加载 HTML 代码阶段（尚未完成解析）
- **interactive**：加载外部资源阶段
- **complete**：加载完成

这个属性变化的过程如下。

1. 浏览器开始解析 HTML 文档，`document.readyState` 属性等于 `loading`。
1. 浏览器遇到 HTML 文档中的`<script>`元素，并且没有 `async` 或 `defer` 属性，就暂停解析，开始执行脚本，这时 `document.readyState` 属性还是等于 `loading`。
1. HTML 文档解析完成，`document.readyState` 属性变成 `interactive`。
1. 浏览器等待图片、样式表、字体文件等外部资源加载完成，一旦全部加载完成，`document.readyState` 属性变成 `complete`

### document.domain

- `document.domain`属性返回当前文档的域名，不包含协议和端口。

- `document.domain` 基本上是一个只读属性，只有一种情况除外。次级域名的网页，可以把 `document.domain` 设为对应的上级域名。

- `document.domain` 相同的两个网页，可以读取对方的资源，比如设置的 Cookie。

### document.location

### document.cookie

### querySelector()，querySelectorAll()，getElementsByTagName()，getElementsByClassName()，getElementsByName()，getElementById()

- `document.querySelector` 方法接受一个 CSS 选择器作为参数，返回匹配该选择器的元素节点。如果有多个节点满足匹配条件，则返回第一个匹配的节点。如果没有发现匹配的节点，则返回 `null`。

- `document.querySelectorAll` 方法与 `querySelector` 用法类似，区别是返回一个 `NodeList` 对象，包含所有匹配给定选择器的节点。

- `document.getElementsByTagName()`方法搜索 HTML 标签名，返回符合条件的元素。它的返回值是一个类似数组对象（`HTMLCollection实例`）

- `document.getElementById()`方法返回匹配指定 `id` 属性的元素节点。如果没有发现匹配的节点，则返回 `null`。

### createElement()，createTextNode()，createAttribute()，createComment()，createDocumentFragment()

- `document.createElement` 方法用来生成元素节点，并返回该节点。
  `createElement` 方法的参数为元素的标签名，即元素节点的 `tagName` 属性，
  `document.createElement` 的参数可以是自定义的标签名。

- `document.createDocumentFragmen`t 方法生成一个空的文档片段对象。
  `DocumentFragment` 是一个存在于内存的 DOM 片段，不属于当前文档，常常用来生成一段较复杂的 DOM 结构，然后再插入当前文档。这样做的好处在于，因为 `DocumentFragment` 不属于当前文档，对它的任何改动，都不会引发网页的重新渲染，比直接修改当前文档的 DOM 有更好的性能表现。

### document.createNodeIterator()

`document.createNodeIterator` 方法返回一个子节点遍历器。

`document.createNodeIterator` 方法第一个参数为所要遍历的根节点，第二个参数为所要遍历的节点类型，几种主要的节点类型写法如下。

- 所有节点：`NodeFilter.SHOW_ALL`
- 元素节点：`NodeFilter.SHOW_ELEMENT`
- 文本节点：`NodeFilter.SHOW_TEXT`
- 评论节点：`NodeFilter.SHOW_COMMENT`

`document.createNodeIterator` 方法返回一个“遍历器”对象（`NodeFilter` 实例）。该实例的 `nextNode()`方法和 `previousNode()`方法，可以用来遍历所有子节点。

### 其他

- `document.documentElement` 属性返回当前文档的根元素节点（root），一般是 `<html>` 节点

- `document.body` 属性指向 <`body>` 节点，`document.head` 属性指向 `<head>` 节点

- `document.title` 属性返回当前文档的标题。默认情况下，返回`<title>`节点的值。但是该属性是可写的，一旦被修改，就返回修改后的值

- `document.scrollingElement` 属性返回文档的滚动元素，标准模式下，这个属性返回的文档的根元素 `document.documentElement`（即`<html>`）。兼容（quirk）模式下，返回的是`<body>`元素，如果该元素不存在，返回 `null`

- `document.activeElement` 属性返回获得当前焦点（focus）的 DOM 元素。通常，这个属性返回的是`<input>`、`<textarea>`、`<select>`等表单元素，如果当前没有焦点元素，返回<body>元素或 `null`

- `document.fullscreenElement` 属性返回当前以全屏状态展示的 DOM 元素。如果不是全屏状态，该属性返回 `null`

- `document.links` 属性返回当前文档所有设定了 href 属性的`<a>`及`<area>`节点

- `document.forms` 属性返回所有`<form>`表单节点

- `document.images` 属性返回页面所有<`img>`图片节点

- `document.embeds` 属性和 `document.plugins` 属性，都返回所有`<embed>`节点

- `document.scripts` 属性返回所有`<script>`节点

- `document.hidden` 属性返回一个布尔值，表示当前页面是否可见。如果窗口最小化、浏览器切换了 Tab，都会导致导致页面不可见，使得 `document.hidden` 返回 `true`

- `document.documentURI` 属性和 `document.URL` 属性都返回一个字符串，表示当前文档的网址。不同之处是它们继承自不同的接口，`documentURI` 继承自 `Document` 接口，可用于所有文档；`URL` 继承自 `HTMLDocument` 接口，只能用于 HTML 文档

- `document.write()` 会当作 HTML 代码解析，不会转义。

## Element 节点

### Element.dataset

网页元素可以自定义 data-属性，用来添加数据。

```html
<div data-timestamp="1522907809292"></div>
```

上面代码中，<div>元素有一个自定义的 data-timestamp 属性，用来为该元素添加一个时间戳。

`Element.dataset` 属性返回一个对象，可以从这个对象读写 data-属性。

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

### Element.innerHTML

`Element.innerHTML` 属性返回一个字符串，等同于该元素包含的所有 HTML 代码。该属性可读写，常用来设置某个节点的内容。它能改写所有元素节点的内容，包括`<HTML>`和<`body>`元素。

如果将 innerHTML 属性设为空，等于删除所有它包含的所有节点。

注意，读取属性值的时候，如果文本节点包含`&`、小于号（`<`）和大于号（`>`），`innerHTML` 属性会将它们转为实体形式`&amp;`、`&lt;`、`&gt;`。

写入的时候，如果插入的文本包含 HTML 标签，会被解析成为节点对象插入 DOM。注意，如果文本之中含有`<script>`标签，虽然可以生成 `script` 节点，但是插入的代码不会执行。

### Element.outerHTML

`Element.outerHTML` 属性返回一个字符串，表示当前元素节点的所有 HTML 代码，包括该元素本身和所有子元素。

如果一个节点没有父节点，设置 `outerHTML` 属性会报错

### Element.nextElementSibling，Element.previousElementSibling

`Element.nextElementSibling` 属性返回当前元素节点的后一个同级元素节点，如果没有则返回 `null`。

`Element.previousElementSibling` 属性返回当前元素节点的前一个同级元素节点，如果没有则返回 `null`。

### Element.insertAdjacentElement()

`Element.insertAdjacentElement` 方法在相对于当前元素的指定位置，插入一个新的节点。该方法返回被插入的节点，如果插入失败，返回 `null`。

`Element.insertAdjacentElement` 方法一共可以接受两个参数，第一个参数是一个字符串，表示插入的位置，第二个参数是将要插入的节点。第一个参数只可以取如下的值。

- beforebegin：当前元素之前
- afterbegin：当前元素内部的第一个子节点前面
- beforeend：当前元素内部的最后一个子节点后面
- afterend：当前元素之后
-

注意，`beforebegin` 和`afterend` 这两个值，只在当前节点有父节点时才会生效。如果当前节点是由脚本创建的，没有父节点，那么插入会失败。

```js
var p1 = document.createElement('p')
var p2 = document.createElement('p')
p1.insertAdjacentElement('afterend', p2) // null
```

上面代码中，p1 没有父节点，所以插入 p2 到它后面就失败了。

如果插入的节点是一个文档里现有的节点，它会从原有位置删除，放置到新的位置

### Element.insertAdjacentHTML()，Element.insertAdjacentText()

```js
// HTML 代码：<div id="one">one</div>
var d1 = document.getElementById('one')
d1.insertAdjacentHTML('afterend', '<div id="two">two</div>')
// 执行后的 HTML 代码：
// <div id="one">one</div><div id="two">two</div>
```

该方法只是在现有的 DOM 结构里面插入节点，这使得它的执行速度比 `innerHTML` 方法快得多。

注意，该方法不会转义 HTML 字符串，这导致它不能用来插入用户输入的内容，否则会有安全风险。

`Element.insertAdjacentText` 方法在相对于当前节点的指定位置，插入一个文本节点，用法与 `Element.insertAdjacentHTML` 方法完全一致

### Element.focus()，Element.blur()

`Element.focus` 方法用于将当前页面的焦点，转移到指定元素上
`Element.blur` 方法用于将焦点从当前元素移除。
从 `document.activeElement` 属性可以得到当前获得焦点的元素

## 属性的操作

元素对象有一个 `attributes` 属性，返回一个类似数组的动态对象

```js
// HTML 代码如下
// <body bgcolor="yellow" onload="">
document.body.attributes[0]
document.body.attributes.bgcolor
document.body.attributes['ONLOAD']
```

元素节点提供六个方法，用来操作属性。

- `getAttribute(key)` 方法返回当前元素节点的指定属性。如果指定属性不存在，则返回 null
- `getAttributeNames()`返回一个数组，成员是当前元素的所有属性的名字。使用 `Element.attributes` 属性，也可以拿到同样的结果，唯一的区别是它返回的是类似数组的对象。
- `setAttribute(key, val)`方法用于为当前元素节点新增属性。如果同名属性已存在，则相当于编辑已存在的属性。该方法没有返回值
- `hasAttribute(key)`方法返回一个布尔值，表示当前元素节点是否包含指定属性
- `hasAttributes()`方法返回一个布尔值，表示当前元素是否有属性，如果没有任何属性，就返回 `false`，否则返回 `true`
- r`emoveAttribute(key)`方法移除指定属性。该方法没有返回值

## CSS 操作

### 行内样式

操作 CSS 样式最简单的方法，就是使用网页元素节点的 `getAttribute()`方法、`setAttribute()`方法和 `removeAttribute()`方法，直接读写或删除网页元素的 `style` 属性。

```js
div.setAttribute('style', 'background-color:red;' + 'border:1px solid black;')
```

上面的代码相当于下面的 HTML 代码。

```html
<div style="background-color:red; border:1px solid black;" />
```

`CSSStyleDeclaration` 接口可以直接读写 CSS 的样式属性，不过，连词号需要变成骆驼拼写法。

```js
var divStyle = document.querySelector('div').style

divStyle.backgroundColor = 'red'
divStyle.fontSize = '10em'
```

`CSSStyleDeclaration.cssText` 属性用来读写当前规则的所有样式声明文本。

```js
var divStyle = document.querySelector('div').style

divStyle.cssText =
	'background-color: red;' +
	'border: 1px solid black;' +
	'height: 100px;' +
	'width: 100px;'
```

删除一个元素的所有行内样式，最简便的方法就是设置 cssText 为空字符串。

```js
divStyle.cssText = ''
```

### CAN I USE

CSS 的规格发展太快，新的模块层出不穷。不同浏览器的不同版本，对 CSS 模块的支持情况都不一样。

一个比较普遍适用的方法是，判断元素的 style 对象的某个属性值是否为字符串。

```js
typeof element.style.animationName === 'string'
typeof element.style.transform === 'string'
```

如果该 CSS 属性确实存在，会返回一个字符串。即使该属性实际上并未设置，也会返回一个空字符串。如果该属性不存在，则会返回 `undefined`。

### window.getComputedStyle()

行内样式（`inline style`）具有最高的优先级，改变行内样式，通常会立即反映出来。但是，网页元素最终的样式是综合各种规则计算出来的。因此，如果想得到元素实际的样式，只读取行内样式是不够的，需要得到浏览器最终计算出来的样式规则。

`window.getComputedStyle` 方法，就用来返回浏览器计算后得到的最终规则。它接受一个节点对象作为参数，返回一个 `CSSStyleDeclaration` 实例，包含了指定节点的最终样式信息。所谓“最终样式信息”，指的是各种 CSS 规则叠加后的结果。

```JS
var div = document.querySelector('div');
var styleObj = window.getComputedStyle(div);
styleObj.backgroundColor
```

注意，`CSSStyleDeclaration` 实例是一个活的对象，任何对于样式的修改，会实时反映到这个实例上面。另外，这个实例是只读的。

`getComputedStyle`方法还可以接受第二个参数，表示当前元素的伪元素（比如`:before`、`:after`、`:first-line`、`:first-letter` 等）

### 盒模型

#### Element.clientHeight，Element.clientWidth

`Element.clientHeight` 属性返回一个整数值，表示元素节点的 CSS 高度（单位像素），只对块级元素生效，对于行内元素返回 0。

除了元素本身的高度，它还包括 `padding` 部分，但是不包括`border`、`margin`。如果有水平滚动条，还要减去水平滚动条的高度。注意，这个值始终是整数，如果是小数会被四舍五入。

```js
// 视口高度
document.documentElement.clientHeight

// 网页总高度 按下F11
document.body.clientHeight
```

#### Element.clientLeft，Element.clientTop

`Element.clientLeft` 属性等于元素节点左边框（left border）的宽度（单位像素），不包括左侧的 `padding` 和 `margin`。如果没有设置左边框，或者是行内元素（`display: inline`），该属性返回 0。该属性总是返回整数值，如果是小数，会四舍五入。

#### Element.scrollHeight，Element.scrollWidth

`Element.scrollHeight` 属性返回一个整数值（小数会四舍五入），表示当前元素的总高度（单位像素），包括溢出容器、当前不可见的部分。它包括 `padding`，但是不包括 `border`、`margin` 以及水平滚动条的高度（如果有水平滚动条的话），还包括伪元素（`::before` 或`::after`）的高度。

#### Element.scrollLeft，Element.scrollTop

`Element.scrollLeft` 属性表示当前元素的水平滚动条向右侧滚动的像素数量，`Element.scrollTop` 属性表示当前元素的垂直滚动条向下滚动的像素数量。对于那些没有滚动条的网页元素，这两个属性总是等于 0。

#### Element.offsetHeight，Element.offsetWidth

`Element.offsetHeight` 属性返回一个整数，表示元素的 CSS 垂直高度（单位像素），包括元素本身的高度、`padding` 和 `border`，以及水平滚动条的高度（如果存在滚动条）。

这两个属性都是只读属性，只比 `Element.clientHeight` 和 `Element.clientWidth` 多了边框的高度或宽度。如果元素的 CSS 设为不可见（比如 `display: none;`），则返回 0。

## DOM 事件

JavaScript 有三种方法，可以为事件绑定监听函数。

- HTML 的 on- 属性
- 元素节点的事件属性
- EventTarget.addEventListener()

### HTML 的 on- 属性

HTML 语言允许在元素的属性中，直接定义某些事件的监听代码。

```html
<div onclick="console.log('触发事件')"></div>
```

使用这个方法指定的监听代码，只会在冒泡阶段触发。

```html
<div onclick="console.log(2)">
	<button onclick="console.log(1)">点击</button>
</div>
```

由于 on-属性的监听代码，只在冒泡阶段触发，所以点击结果是先输出 1，再输出 2，即事件从子元素开始冒泡到父元素。

### 元素节点的事件属性

元素节点对象的事件属性，同样可以指定监听函数。

```js
div.onclick = function (event) {
	console.log('触发事件')
}
```

使用这个方法指定的监听函数，也是只会在冒泡阶段触发。

### EventTarget.addEventListener()

`EventTarget.addEventListener()`用于在当前节点或对象上，定义一个特定事件的监听函数。一旦这个事件发生，就会执行监听函数。该方法没有返回值。

```js
target.addEventListener(type, listener[, useCapture])
```

该方法接受三个参数。

- type：事件名称，大小写敏感。
- listener：监听函数。事件发生时，会调用该监听函数。
- useCapture：布尔值，表示监听函数是否在捕获阶段（capture）触发，默认为 false（监听函数只在冒泡阶段被触发）。该参数可选。

首先，第二个参数除了监听函数，还可以是一个具有 `handleEvent` 方法的对象。
其次，第三个参数除了布尔值 `useCapture`，还可以是一个属性配置对象。该对象有以下属性。

- `capture`：布尔值，表示该事件是否在捕获阶段触发监听函数。
- `once`：布尔值，表示监听函数是否只触发一次，然后就自动移除。
- `passive`：布尔值，表示监听函数不会调用事件的 preventDefault 方法。如果监听函数调用了，浏览器将忽略这个要求，并在监控台输出一行警告。

```js
buttonElement.addEventListener(
	'click',
	{
		handleEvent: function (event) {
			// 只执行一次的代码
			console.log('click')
		},
	},
	{ once: true }
)
```

### 事件的传播

一个事件发生后，会在子元素和父元素之间传播（propagation）。这种传播分成三个阶段。

- 第一阶段：从 window 对象传导到目标节点（上层传到底层），称为“捕获阶段”（capture phase）。
- 第二阶段：在目标节点上触发，称为“目标阶段”（target phase）。
- 第三阶段：从目标节点传导回 window 对象（从底层传回上层），称为“冒泡阶段”（bubbling phase）。

这种三阶段的传播模型，使得同一个事件会在多个节点上触发。

由于事件会在冒泡阶段向上传播到父节点，因此可以把子节点的监听函数定义在父节点上，由父节点的监听函数统一处理多个子元素的事件。这种方法叫做事件的代理（delegation）。

```js
var ul = document.querySelector('ul')

ul.addEventListener('click', function (event) {
	if (event.target.tagName.toLowerCase() === 'li') {
		// some code
	}
})
```

如果希望事件到某个节点为止，不再传播，可以使用事件对象的 `stopPropagation` 方法。

```js
// 事件传播到 p 元素后，就不再向下传播了
p.addEventListener(
	'click',
	function (event) {
		event.stopPropagation()
	},
	true
)

// 事件冒泡到 p 元素后，就不再向上冒泡了
p.addEventListener(
	'click',
	function (event) {
		event.stopPropagation()
	},
	false
)
```

但是，`stopPropagation` 方法只会阻止事件的传播，不会阻止该事件触发<p>节点的其他 click 事件的监听函数。也就是说，不是彻底取消 click 事件。

```js
p.addEventListener('click', function (event) {
	event.stopPropagation()
	console.log(1)
})

p.addEventListener('click', function (event) {
	// 会触发
	console.log(2)
})
```

如果想要彻底取消该事件，不再触发后面所有 click 的监听函数，可以使用 `stopImmediatePropagation` 方法。

```js
p.addEventListener('click', function (event) {
	event.stopImmediatePropagation()
	console.log(1)
})

p.addEventListener('click', function (event) {
	// 不会被触发
	console.log(2)
})
```

### Event 对象

Event 对象本身就是一个构造函数，可以用来生成新的实例。

```js
event = new Event(type, options)
```

Event 构造函数接受两个参数。第一个参数 type 是字符串，表示事件的名称；第二个参数 options 是一个对象，表示事件对象的配置。该对象主要有下面两个属性。

- bubbles：布尔值，可选，默认为 false，表示事件对象是否冒泡。
- cancelable：布尔值，可选，默认为 false，表示事件是否可以被取消，即能否用 Event.preventDefault()取消这个事件。一旦事件被取消，就好像从来没有发生过，不会触发浏览器对该事件的默认行为。

```js
var ev = new Event('look', {
	bubbles: true,
	cancelable: false,
})
document.dispatchEvent(ev)
```

`Event.currentTarget` 属性返回事件当前所在的节点，即事件当前正在通过的节点，也就是当前正在执行的监听函数所在的那个节点。随着事件的传播，这个属性的值会变。

`Event.target` 属性返回原始触发事件的那个节点，即事件最初发生的节点。这个属性不会随着事件的传播而改变。

`Event.preventDefault` 方法取消浏览器对当前事件的默认行为。
利用这个方法，可以为文本输入框设置校验条件。如果用户的输入不符合条件，就无法将字符输入文本框。

```js
// HTML 代码为
// <input type="text" id="my-input" />
var input = document.getElementById('my-input')
input.addEventListener('keypress', checkName, false)

function checkName(e) {
	if (e.charCode < 97 || e.charCode > 122) {
		e.preventDefault()
	}
}
```

上面代码为文本框的 `keypress` 事件设定监听函数后，将只能输入小写字母，否则输入事件的默认行为（写入文本框）将被取消，导致不能向文本框输入内容。

### 常见事件

- load 事件在页面或某个资源加载成功时触发。
- error 事件是在页面或资源加载失败时触发
- 各种外部资源：图像（image）、样式表（style sheet）、脚本（script）、视频（video）、音频（audio）、Ajax 请求（XMLHttpRequest）等等和 document 对象、window 对象、XMLHttpRequestUpload 对象，都会触发 load 事件和 error 事件。
- 页面的 load 事件也可以用 pageshow 事件代替。
- pageshow 事件在页面加载时触发，包括第一次加载和从缓存加载两种情况。
- 第一次加载时，它的触发顺序排在 load 事件后面。从缓存加载时，load 事件不会触发，
- hashchange 事件在 URL 的 hash 部分（即#号后面的部分，包括#号）发生变化时触发。该事件一般在 window 对象上监听。
- hashchange 的事件实例具有两个特有属性：oldURL 属性和 newURL 属性，分别表示变化前后的完整 URL。
- DOMContentLoaded 事件
- readystatechange 事件
- scroll 事件（节流）
- resize 事件（节流）
- fullscreenchange 事件
- 焦点事件
- 表单事件
- 鼠标事件（mousemove 节流）
- 键盘事件
