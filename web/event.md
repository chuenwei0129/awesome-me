# 事件

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

鼠标按键状态|	`event.button`
:--:|:--:
左键 (主要按键)	|0
中键 (辅助按键)	|1
右键 (次要按键)	|2
X1 键 (后退按键)	|3
X2 键 (前进按键)	|4

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

<button id="button">Alt+Shift+Click on me!</button>
<script>
  button.onclick = function(event) {
    if (event.altKey && event.shiftKey) {
      alert('Hooray!');
    }
  };
</script>

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

窗口相对坐标：clientX/clientY。

文档相对坐标：pageX/pageY。

事件 mouseover/mouseout，relatedTarget
当鼠标指针移到某个元素上时，mouseover 事件就会发生，而当鼠标离开该元素时，mouseout 事件就会发生。

这些事件很特别，因为它们具有 relatedTarget 属性。此属性是对 target 的补充。当鼠标从一个元素离开并去往另一个元素时，其中一个元素就变成了 target，另一个就变成了 relatedTarget。

对于 mouseover：

event.target —— 是鼠标移过的那个元素。
event.relatedTarget —— 是鼠标来自的那个元素（relatedTarget → target）。
mouseout 则与之相反：

event.target —— 是鼠标离开的元素。
event.relatedTarget —— 是鼠标移动到的，当前指针位置下的元素（target → relatedTarget）。

relatedTarget 可以为 null
relatedTarget 属性可以为 null。

这是正常现象，仅仅是意味着鼠标不是来自另一个元素，而是来自窗口之外。或者它离开了窗口。

当我们在代码中使用 event.relatedTarget 时，我们应该牢记这种可能性。如果我们访问 event.relatedTarget.tagName，那么就会出现错误。

如果 mouseover 被触发了，则必须有 mouseout
在鼠标快速移动的情况下，中间元素可能会被忽略，但是我们可以肯定一件事：如果鼠标指针“正式地”进入了一个元素（生成了 mouseover 事件），那么一旦它离开，我们就会得到 mouseout。

#### 键盘事件

`keydown` 和 `keyup` —— 当按下和松开一个按键时。

#### 表单（form）元素事件

`submit` —— 当访问者提交了一个 `<form>` 时。
`focus` —— 当访问者聚焦于一个元素时，例如聚焦于一个 `<input>`。

#### Document 事件

`DOMContentLoaded` —— 当 `HTML` 的加载和处理均完成，`DOM` 被完全构建完成时。

#### CSS 事件

`transitionend` —— 当一个 `CSS` 动画完成时。


#### 其他

- `load` 事件在页面或某个资源加载成功时触发。
- `error` 事件是在页面或资源加载失败时触发
- 各种外部资源：图像（image）、样式表（style sheet）、脚本（script）、视频（video）、音频（audio）、Ajax 请求（XMLHttpRequest）等等和 `document` 对象、`window` 对象、`XMLHttpRequestUpload` 对象，都会触发 `load` 事件和 `error` 事件。
- 页面的 `load` 事件也可以用 `pageshow` 事件代替。
- `pageshow` 事件在页面加载时触发，包括第一次加载和从缓存加载两种情况。
- 第一次加载时，它的触发顺序排在 `load` 事件后面。从缓存加载时，`load` 事件不会触发，
- `hashchange` 事件在 `URL` 的 `hash` 部分（即#号后面的部分，包括#号）发生变化时触发。该事件一般在 `window` 对象上监听。
- `hashchange` 的事件实例具有两个特有属性：`oldURL` 属性和 `newURL` 属性，分别表示变化前后的完整 `URL`。
- `readystatechange` 事件
- `scroll` 事件（节流）
- `resize` 事件（节流）