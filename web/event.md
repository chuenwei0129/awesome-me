# 事件<!-- omit in toc -->

- [HTML 的 on- 属性](#html-的-on--属性)
- [元素节点的事件属性](#元素节点的事件属性)
- [EventTarget.addEventListener](#eventtargetaddeventlistener)
- [事件的传播](#事件的传播)
- [Event 对象](#event-对象)
- [鼠标事件](#鼠标事件)
	- [事件顺序](#事件顺序)
	- [鼠标按钮](#鼠标按钮)
	- [组合键：shift，alt，ctrl，meta](#组合键shiftaltctrlmeta)
	- [禁用复制粘贴](#禁用复制粘贴)
	- [坐标：clientX/Y，pageX/Y](#坐标clientxypagexy)
	- [防止在鼠标按下时的选择](#防止在鼠标按下时的选择)
	- [事件 mouseover/mouseout，relatedTarget](#事件-mouseovermouseoutrelatedtarget)
	- [当移动到一个子元素时 mouseout](#当移动到一个子元素时-mouseout)
	- [事件 mouseenter 和 mouseleave](#事件-mouseenter-和-mouseleave)
- [指针事件](#指针事件)
	- [指针事件类型](#指针事件类型)
	- [指针事件属性](#指针事件属性)
	- [事件：pointercancel](#事件pointercancel)
	- [指针捕获](#指针捕获)
- [键盘事件](#键盘事件)
- [表单（form）元素事件](#表单form元素事件)
	- [document.forms](#documentforms)
	- [Fieldset 作为“子表单”](#fieldset-作为子表单)
	- [更简短的表示方式：form.name](#更简短的表示方式formname)
	- [反向引用：element.form](#反向引用elementform)
	- [input 和 textarea](#input-和-textarea)
	- [select 和 option](#select-和-option)
	- [focus/blur 事件](#focusblur-事件)
	- [允许在任何元素上聚焦：tabindex](#允许在任何元素上聚焦tabindex)
	- [事件：change](#事件change)
	- [事件：input](#事件input)
	- [事件：cut，copy，paste](#事件cutcopypaste)
	- [事件：submit](#事件submit)

`JavaScript` 有三种方法，可以为事件绑定监听函数。

- HTML 的 `on-` 属性
- 元素节点的事件属性
- `EventTarget.addEventListener()`

## HTML 的 on- 属性

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

由于 `on-` 属性的监听代码，只在冒泡阶段触发，所以点击结果是先输出 `1`，再输出 `2`，即事件从子元素开始冒泡到父元素。

## 元素节点的事件属性

元素节点对象的事件属性，同样可以指定监听函数。

```js
div.onclick = function (event) {
	console.log('触发事件')
}
```

使用这个方法指定的监听函数，也是只会在冒泡阶段触发。

## EventTarget.addEventListener

`EventTarget.addEventListener()` 用于在当前节点或对象上，定义一个特定事件的监听函数。一旦这个事件发生，就会执行监听函数。该方法没有返回值。

```js
target.addEventListener(type, listener[, useCapture])
```

该方法接受三个参数。

- `type`：事件名称，大小写敏感。
- `listener`：监听函数。事件发生时，会调用该监听函数。
- `useCapture`：布尔值，表示监听函数是否在捕获阶段（capture）触发，默认为 `false`（监听函数只在冒泡阶段被触发）。该参数可选。

首先，第二个参数除了监听函数，还可以是一个具有 `handleEvent` 方法的对象。
其次，第三个参数除了布尔值 `useCapture`，还可以是一个属性配置对象。该对象有以下属性。

- `capture`：布尔值，表示该事件是否在捕获阶段触发监听函数。
- `once`：布尔值，表示监听函数是否只触发一次，然后就自动移除。
- `passive`：布尔值，表示监听函数不会调用事件的 `preventDefault` 方法。如果监听函数调用了，浏览器将忽略这个要求，并在监控台输出一行警告。

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

## 事件的传播

一个事件发生后，会在子元素和父元素之间传播（propagation）。这种传播分成三个阶段。

- 第一阶段：从 `window` 对象传导到目标节点（上层传到底层），称为“捕获阶段”（capture phase）。
- 第二阶段：在目标节点上触发，称为“目标阶段”（target phase）。
- 第三阶段：从目标节点传导回 `window` 对象（从底层传回上层），称为“冒泡阶段”（bubbling phase）。

这种三阶段的传播模型，使得同一个事件会在多个节点上触发。

![事件的传播](../Images/bubble.png)

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

但是，`stopPropagation` 方法只会阻止事件的传播，不会阻止该事件触发 `<p>` 节点的其他 `click` 事件的监听函数。也就是说，不是彻底取消 `click` 事件。

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

如果想要彻底取消该事件，不再触发后面所有 `click` 的监听函数，可以使用 `stopImmediatePropagation` 方法。

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

## Event 对象

`Event` 对象本身就是一个构造函数，可以用来生成新的实例。

```js
event = new Event(type, options)
```

`Event` 构造函数接受两个参数。第一个参数 `type` 是字符串，表示事件的名称；第二个参数 `options` 是一个对象，表示事件对象的配置。该对象主要有下面两个属性。

- `bubbles`：布尔值，可选，默认为 `false`，表示事件对象是否冒泡。
- `cancelable`：布尔值，可选，默认为 `false`，表示事件是否可以被取消，即能否用 `Event.preventDefault()` 取消这个事件。一旦事件被取消，就好像从来没有发生过，不会触发浏览器对该事件的默认行为。

```js
var ev = new Event('look', {
	bubbles: true,
	cancelable: false,
})
document.dispatchEvent(ev)
```

`Event.currentTarget` 属性返回事件当前所在的节点，即事件当前正在通过的节点，也就是当前正在执行的监听函数所在的那个节点。随着事件的传播，这个属性的值会变。

`Event.target` 属性返回原始触发事件的那个节点，即事件最初发生的节点。这个属性不会随着事件的传播而改变。

`Event.eventPhase` —— 当前阶段（capturing=1，target=2，bubbling=3）

`Event.composedPath()` 返回一个数组，成员是事件的最底层节点和依次冒泡经过的所有上层节点。

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

## 鼠标事件

- `mousedown/mouseup` 在元素上点击/释放鼠标按钮。
- `mouseover/mouseout` 鼠标指针从一个元素上移入/移出。
- `mousemove` 鼠标在元素上的每个移动都会触发此事件。
- `click` 如果使用的是鼠标左键，则在同一个元素上的 `mousedown` 及 `mouseup` 相继触发后，触发该事件。
- `dblclick` 在短时间内双击同一元素后触发。如今已经很少使用了。
- `contextmenu` 在鼠标右键被按下时触发。还有其他打开上下文菜单的方式，例如使用特殊的键盘按键，在这种情况下它也会被触发，因此它并不完全是鼠标事件。

### 事件顺序

**一个用户操作可能会触发多个事件**。例如，点击鼠标左键，在鼠标左键被按下时，会首先触发 `mousedown`，然后当鼠标左键被释放时，会触发 `mouseup` 和 `click`。

在单个动作触发多个事件时，事件的顺序是固定的。也就是说，会遵循 `mousedown → mouseup → click` 的顺序调用处理程序。

### 鼠标按钮

与点击相关的事件始终具有 `button` 属性，该属性允许获取确切的鼠标按钮。

通常我们不在 `click` 和 `contextmenu` 事件中使用这一属性，因为前者只在单击鼠标左键时触发，后者只在单击鼠标右键时触发。

不过，在 `mousedown` 和 `mouseup` 事件中则可能需要用到 `event.button`，因为这两个事件在任何按键上都会触发，所以我们可以使用 `button` 属性来区分是左键单击还是右键单击。

`event.button` 的所有可能值如下：

|   鼠标按键状态   | `event.button` |
| :--------------: | :------------: |
| 左键 (主要按键)  |       0        |
| 中键 (辅助按键)  |       1        |
| 右键 (次要按键)  |       2        |
| X1 键 (后退按键) |       3        |
| X2 键 (前进按键) |       4        |

### 组合键：shift，alt，ctrl，meta

所有的鼠标事件都包含有关按下的组合键的信息。

事件属性：

- `shiftKey`：`Shift`
- `altKey`：`Alt`（或对于 `Mac` 是 `Opt`）
- `ctrlKey`：`Ctrl`
- `metaKey`：对于 `Mac` 是 `Cmd`

如果在事件期间按下了相应的键，则它们为 `true`。

比如，下面这个按钮仅在 `Alt+Shift+click` 时才有效：

```html
<button id="button">Alt+Shift+Click on me!</button>
<script>
  button.onclick = function(event) {
    if (event.altKey && event.shiftKey) {
      alert('Hooray!');
    }
  };
</script>
```

### 禁用复制粘贴

如果我们想禁用选择以保护我们页面的内容不被复制粘贴，那么我们可以使用另一个事件：`oncopy`。

```html
<div oncopy="alert('Copying forbidden!');return false">
  Dear user,
  The copying is forbidden for you.
  If you know JS or HTML, then you can get everything from the page source though.
</div>
```

如果你试图在 `<div>` 中复制一段文本，这是行不通的，因为默认行为 `oncopy` 被阻止了。

### 坐标：clientX/Y，pageX/Y

所有的鼠标事件都提供了两种形式的坐标：

- 相对于窗口的坐标：`clientX` 和 `clientY`。
- 相对于文档的坐标：`pageX` 和 `pageY`。

### 防止在鼠标按下时的选择

双击鼠标会有副作用，在某些界面中可能会出现干扰：**它会选择文本**。

```html
<span ondblclick="alert('dblclick')">Double-click me</span>
```

如果按下鼠标左键，并在不松开的情况下移动鼠标，这也常常会造成不必要的选择。

在这种情况下，最合理的方式是防止浏览器对 `mousedown` 进行操作。这样能够阻止刚刚提到的两种选择：

```html
Before...
<b ondblclick="alert('Click!')" onmousedown="return false">
  Double-click me
</b>
...After
```

现在，在双击时，粗体元素不会被选中，并且在粗体元素上按下鼠标左键也不会开始选择。

请注意：其中的文本仍然是可选择的。但是，选择不应该开始于该文本自身，而应该在该文本之前或之后开始。通常，这对用户来说挺好的。

### 事件 mouseover/mouseout，relatedTarget

当鼠标指针移到某个元素上时，`mouseover` 事件就会发生，而当鼠标离开该元素时，`mouseout` 事件就会发生。

![mouseover](../Images/mouseover.png)

这些事件很特别，因为它们具有 `relatedTarget` 属性。此属性是对 `target` 的补充。当鼠标从一个元素离开并去往另一个元素时，其中一个元素就变成了 `target`，另一个就变成了 `relatedTarget`。

对于 `mouseover`：

- `event.target` —— 是鼠标移过的那个元素。
- `event.relatedTarget` —— 是鼠标来自的那个元素（relatedTarget → target）。

`mouseout` 则与之相反：

- `event.target` —— 是鼠标离开的元素。
- `event.relatedTarget` —— 是鼠标移动到的，当前指针位置下的元素（target → relatedTarget）。

> ⚠️ `relatedTarget` 属性可以为 `null`。
> 如果 `mouseover` 被触发了，则必须有 `mouseout`

![relatedTarget](../Images/relatedTarget.png)

**在鼠标快速移动的情况下，中间元素可能会被忽略**。

![mousemove](../Images/mousemove.png)

### 当移动到一个子元素时 mouseout

`mouseout` 的一个重要功能 —— 当鼠标指针从元素移动到其后代时触发，例如在下面的这个 `HTML` 中，从 `#parent` 到 `#child`：

```html
<div id="parent">
  <div id="child">...</div>
</div>
```

如果我们在 `#parent` 上，然后将鼠标指针更深入地移入 `#child`，但是在 `#parent` 上会得到 `mouseout`！

![](../Images/mouseover-1.png)

后代的 `mouseover` 事件会冒泡。因此，如果 `#parent` 具有 `mouseover` 处理程序，它将被触发：

![](../Images/mouseover-2.png)

### 事件 mouseenter 和 mouseleave

事件 `mouseenter/mouseleave` 类似于 `mouseover/mouseout`。它们在鼠标指针进入/离开元素时触发。

但是有两个重要的区别：

1. 元素内部与后代之间的转换不会产生影响。
1. 事件 `mouseenter/mouseleave` 不会冒泡。

事件 `mouseenter/leave` 非常简单且易用。但它们不会冒泡。因此，我们不能使用它们来进行事件委托。

## 指针事件

指针事件（Pointer Events）是一种用于处理来自各种输入设备（例如鼠标、触控笔和触摸屏等）的输入信息的现代化解决方案。

### 指针事件类型

![指针事件](../Images/pointer.png)

我们可以把代码中的 `mouse<event>` 都替换成 `pointer<event>`，程序仍然正常兼容鼠标设备。

### 指针事件属性

指针事件具备和鼠标事件完全相同的属性，包括 `clientX/Y` 和 `target` 等，以及一些其他属性：

- [x] `pointerId` —— 触发当前事件的指针唯一标识符。

浏览器生成的。使我们能够处理多指针的情况，例如带有触控笔和多点触控功能的触摸屏（下文会有相关示例）。

- [x] `pointerType `—— 指针的设备类型。必须为字符串，可以是：“mouse”、“pen” 或 “touch”。

我们可以使用这个属性来针对不同类型的指针输入做出不同响应。

- [x] `isPrimary` —— 当指针为首要指针（多点触控时按下的第一根手指）时为 `true`。

有些指针设备会测量接触面积和点按压力（例如一根手指压在触屏上），对于这种情况可以使用以下属性：

- `width` —— 指针（例如手指）接触设备的区域的宽度。对于不支持的设备（如鼠标），这个值总是 `1`。
- `height` —— 指针（例如手指）接触设备的区域的长度。对于不支持的设备，这个值总是 `1`。
- `pressure` —— 触摸压力，是一个介于 `0` 到 `1` 之间的浮点数。对于不支持压力检测的设备，这个值总是 `0.5`（按下时）或 `0`。
- `tangentialPressure` —— 归一化后的切向压力（tangential pressure）。
- `tiltX`, `tiltY`, `twist` —— 针对触摸笔的几个属性，用于描述笔和屏幕表面的相对位置。

### 事件：pointercancel

`pointercancel` 事件将会在一个正处于活跃状态的指针交互由于某些原因被中断时触发。也就是在这个事件之后，该指针就不会继续触发更多事件了。

导致指针中断的可能原因如下：

- 指针设备硬件在物理层面上被禁用。
- 设备方向旋转（例如给平板转了个方向）。
- 浏览器打算自行处理这一交互，比如将其看作是一个专门的鼠标手势或缩放操作等。

阻止浏览器的默认行为来防止 `pointercancel` 触发。我们需要做两件事：

- 阻止原生的拖放操作发生：我们可以通过设置 `ball.ondragstart = () => false` 来实现这一需求。
- 对于触屏设备，还有其他和触摸相关的浏览器行为（除了拖放）。为了避免它们所引发的问题：我们可以通过在 CSS 中设置 `#ball { touch-action: none }` 来阻止它们。

### 指针捕获

指针捕获（Pointer capturing）是针对指针事件的一个特性。

主要的方法是：

`elem.setPointerCapture(pointerId)` —— 将给定的 `pointerId` 绑定到 `elem`。在调用之后，所有具有相同 `pointerId` 的指针事件都将 `elem` 作为目标（就像事件发生在 `elem` 上一样），无论这些 `elem` 在文档中的实际位置是什么。换句话说，`elem.setPointerCapture(pointerId)` 将所有具有给定 `pointerId` 的后续事件重新定位到 `elem`。

绑定会在以下情况下被移除：

- 当 `pointerup` 或 `pointercancel` 事件出现时，绑定会被自动地移除。
- 当 `elem` 被从文档中移除后，绑定会被自动地移除。
- 当 `elem.releasePointerCapture(pointerId)` 被调用，绑定会被移除。

还有两个相关的指针捕获事件:

- `gotpointercapture` 会在一个元素使用 `setPointerCapture` 来启用捕获后触发。
- `lostpointercapture` 会在捕获被释放后触发：其触发可能是由于 `releasePointerCapture` 的显式调用，或是 `pointerup/pointercancel` 事件触发后的自动调用。

## 键盘事件

`Keydown 和 keyup` 当一个按键被按下时，会触发 `keydown` 事件，而当按键被释放时，会触发 `keyup` 事件。

`event.code` 和 `event.key` 事件对象的 `key` 属性允许获取字符，而事件对象的 `code` 属性则允许获取“物理按键代码”。

例如，同一个按键 `Z`，可以与或不与 `Shift` 一起按下。我们会得到两个不同的字符：小写的 `z` 和大写的 `Z`。

`event.key` 正是这个字符，并且它将是不同的。但是，`event.code` 是相同的：

Key	|event.key|	event.code
:--:|:--:|:--:
Z	|z（小写）|	KeyZ
Shift+Z	|Z（大写）|	KeyZ

如果用户使用不同的语言，那么切换到另一种语言将产生完全不同的字符，而不是 "Z"。它将成为 `event.key` 的值，而 `event.code` 则始终都是一样的："KeyZ"。

如果按下一个键足够长的时间，它就会开始“自动重复”：`keydown` 会被一次又一次地触发，然后当按键被释放时，我们最终会得到 `keyup`。因此，有很多 `keydown` 却只有一个 `keyup` 是很正常的。

对于由自动重复触发的事件，`event` 对象的 `event.repeat` 属性被设置为 `true`

## 表单（form）元素事件

### document.forms

文档中的表单是特殊集合 `document.forms` 的成员。

这就是所谓的“命名的集合”：既是被命名了的，也是有序的。我们既可以使用名字，也可以使用在文档中的编号来获取表单。

```js
document.forms.my  // name="my" 的表单
document.forms[0]  // 文档中的第一个表单
```

当我们有了一个表单时，其中的任何元素都可以通过命名的集合 `form.elements` 来获取到

```html
<form name="my">
  <input name="one" value="1">
  <input name="two" value="2">
	<input type="radio" name="age" value="10">
  <input type="radio" name="age" value="20">
</form>

<script>
  // 获取表单 等同于 let form = document.forms[0]
  let form = document.forms.my; // <form name="my"> 元素
	
  // 获取表单中的元素
  let elem = form.elements.one; // <input name="one"> 元素
	let ageElems = form.elements.age; // 元素集合

	alert(ageElems[0]); // [object HTMLInputElement]
  alert(elem.value); // 1
</script>
```

### Fieldset 作为“子表单”

一个表单内会有一个或多个 `<fieldset>` 元素。它们也具有 `elements` 属性，该属性列出了 `<fieldset>` 中的表单控件。

```html
<body>
  <form id="form">
    <fieldset name="userFields">
      <legend>info</legend>
      <input name="login" type="text">
    </fieldset>
  </form>

  <script>
    alert(form.elements.login); // <input name="login">

    let fieldset = form.elements.userFields;
    alert(fieldset); // HTMLFieldSetElement

    // 我们可以通过名字从表单和 fieldset 中获取 input
    alert(fieldset.elements.login == form.elements.login); // true
  </script>
</body>
```

### 更简短的表示方式：form.name

还有一个更简短的表示方式：我们可以通过 `form[index/name]` 来访问元素。

换句话说，我们可以将 `form.elements.login` 写成 `form.login`。

```html
<form id="form">
  <input name="login">
</form>

<script>
  alert(form.elements.login == form.login); // true，与 <input> 相同
	
  form.login.name = "username"; // 修改 input 的 name

  // form.elements 更新了 name：
  alert(form.elements.login); // undefined
  alert(form.elements.username); // input

  // form 允许我们使用两个名字：新的名字和旧的名字
  alert(form.username == form.login); // true
</script>
```

### 反向引用：element.form

![form](../Images/form.png)

```html
<form id="form">
  <input type="text" name="login">
</form>

<script>
  // form -> element
  let login = form.login;

  // element -> form
  alert(login.form); // HTMLFormElement
</script>
```

### input 和 textarea

我们可以通过 `input.value`（字符串）或 `input.checked`（布尔值）来访问复选框（checkbox）中的它们的 `value`。

像这样：

```js
input.value = "New value";
textarea.value = "New text";

input.checked = true; // 对于复选框（checkbox）或单选按钮（radio button）
```

> ⚠️ **使用 textarea.value 而不是 textarea.innerHTML**
> 
>请注意，即使 `<textarea>...</textarea>` 将它们的 `value` 作为嵌套的 `HTML` 标签来保存，我们也绝不应该使用 `textarea.innerHTML` 来访问它。它仅存储最初在页面上的 `HTML`，而不是存储的当前 `value`。

### select 和 option

一个 `<select>` 元素有 `3` 个重要的属性：

- `select.options` —— `<option>` 的子元素的集合，
- `select.value` —— 当前所选择的 `<option>` 的 value，
- `select.selectedIndex` —— 当前所选择的 `<option>` 的编号。

它们提供了三种为 `<select>` 设置 `value` 的不同方式：

找到对应的 `<option>` 元素，并将 `option.selected` 设置为 `true`。
将 `select.value` 设置为对应的 `value`。
将 `select.selectedIndex` 设置为对应 `<option>` 的编号。

```html
<select id="select">
  <option value="apple">Apple</option>
  <option value="pear">Pear</option>
  <option value="banana">Banana</option>
</select>

<script>
  // 所有这三行做的是同一件事
  select.options[2].selected = true;
  select.selectedIndex = 2;
  select.value = 'banana';
</script>
```

`<option>` 元素具有以下属性：

- `option.selected` —— `<option>` 是否被选择。
- `option.index` —— `<option>` 在其所属的 `<select>` 中的编号。
- `option.text` —— `<option>` 的文本内容（可以被访问者看到）。

### focus/blur 事件

当元素聚焦时，会触发 `focus` 事件，当元素失去焦点时，会触发 `blur` 事件。

```html
<style>
	.invalid { border-color: red; }
	#error { color: red; }
</style>

Your email please: <input type="email" id="input">

<div id="error"></div>

<script>
input.onblur = function() {
  if (!input.value.includes('@')) { // not email
    input.classList.add('invalid');
    error.innerHTML = 'Please enter a correct email.'
  }
};

input.onfocus = function() {
  if (this.classList.contains('invalid')) {
    // 移除 "error" 指示，因为用户想要重新输入一些内容
    this.classList.remove('invalid');
    error.innerHTML = "";
  }
};
</script>
```

`elem.focus()` 和 `elem.blur()` 方法可以设置和移除元素上的焦点。

例如，如果输入值无效，我们可以让焦点无法离开这个 `input` 字段：

```html
<style>
	.error {
		background: red;
	}
</style>

Your email please: <input type="email" id="input">
<input type="text" style="width: 220px;" placeholder="make email invalid and try to focus here">

<script>
  input.onblur = function() {
    if (!this.value.includes('@')) { // not email
      // 显示 error
      this.classList.add("error");
      // ...将焦点放回来
      input.focus();
    } else {
      this.classList.remove("error");
    }
  };
</script>
```

请注意，我们无法通过在 `onblur` 事件处理程序中调用 `event.preventDefault()` 来“阻止失去焦点”，因为 `onblur` 事件处理程序是在元素失去焦点之后运行的。

**focus 和 blur 事件不会向上冒泡**

这里有两个解决方案。

方案一，有一个遗留下来的有趣的特性（feature）：`focus/blur` 不会向上冒泡，但会在捕获阶段向下传播。

方案二，可以使用 `focusin` 和 `focusout` 事件 —— 与 `focus/blur` 事件完全一样，只是它们会冒泡。

### 允许在任何元素上聚焦：tabindex

任何具有 `tabindex` 特性的元素，都会变成可聚焦的。该特性的 `value` 是当使用 `Tab`（或类似的东西）在元素之间进行切换时，元素的顺序号。

也就是说：如果我们有两个元素，第一个具有 `tabindex="1"`，第二个具有 `tabindex="2"`，然后当焦点在第一个元素的时候，按下 `Tab` 键，会使焦点移动到第二个元素身上。

切换顺序为：从 `1` 开始的具有 `tabindex` 的元素排在前面（按 `tabindex` 顺序），然后是不具有 `tabindex` 的元素（例如常规的 `<input>`）。

具有 `tabindex `的元素按文档源顺序（默认顺序）切换。

这里有两个特殊的值：

`tabindex="0"` 会使该元素被与那些不具有 `tabindex` 的元素放在一起。也就是说，当我们切换元素时，具有 `tabindex="0"` 的元素将排在那些具有 `tabindex ≥ 1` 的元素的后面。

通常，它用于使元素具有焦点，但是保留默认的切换顺序。使元素成为与 `<input>` 一样的表单的一部分。`tabindex="-1"` 只允许以编程的方式聚焦于元素。`Tab` 键会忽略这样的元素，但是 `elem.focus()` 有效。

### 事件：change

当元素更改完成时，将触发 `change` 事件。

对于文本输入框，当其失去焦点时，就会触发 `change` 事件。对于其它元素：`select`，`input type=checkbox/radio`，会在选项更改后立即触发 `change` 事件。

### 事件：input

每当用户对输入值进行修改后，就会触发 `input` 事件。

与键盘事件不同，只要值改变了，`input` 事件就会触发，即使那些不涉及键盘行为（action）的值的更改也是如此：使用鼠标粘贴，或者使用语音识别来输入文本。

无法阻止 `oninput` 中的任何事件，当输入值更改后，就会触发 `input` 事件。所以，我们无法使用 `event.preventDefault()` —— 已经太迟了，不会起任何作用了

### 事件：cut，copy，paste

这些事件发生于剪切/拷贝/粘贴一个值的时候。可以使用 `event.preventDefault()` 来中止行为，然后什么都不会被复制/粘贴。

### 事件：submit

提交表单主要有两种方式：

第一种 —— 点击 `<input type="submit">` 或 `<input type="image">`。
第二种 —— 在 `input` 字段中按下` Enter` 键。

这两个行为都会触发表单的 `submit` 事件。处理程序可以检查数据，如果有错误，就显示出来，并调用 `event.preventDefault()`，这样表单就不会被发送到服务器了。

> 在输入框中使用 `Enter` 发送表单时，会在 `<input type="submit">` 上触发一次 `click` 事件。

如果要手动将表单提交到服务器，我们可以调用 `form.submit()`。

这样就不会产生 `submit` 事件。这里假设如果开发人员调用 `form.submit()`，就意味着此脚本已经进行了所有相关处理。

有时该方法被用来手动创建和发送表单，如下所示：

```js
let form = document.createElement('form');
form.action = 'https://google.com/search';
form.method = 'GET';

form.innerHTML = '<input name="q" value="test">';

// 该表单必须在文档中才能提交
document.body.append(form);

form.submit();
```