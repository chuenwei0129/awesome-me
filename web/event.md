
## DOM 事件

JavaScript 有三种方法，可以为事件绑定监听函数。

- HTML 的 `on-` 属性
- 元素节点的事件属性
- `EventTarget.addEventListener()`

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

- `type`：事件名称，大小写敏感。
- `listener`：监听函数。事件发生时，会调用该监听函数。
- `useCapture`：布尔值，表示监听函数是否在捕获阶段（capture）触发，默认为 false（监听函数只在冒泡阶段被触发）。该参数可选。

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

### 事件的传播

一个事件发生后，会在子元素和父元素之间传播（propagation）。这种传播分成三个阶段。

- 第一阶段：从 `window` 对象传导到目标节点（上层传到底层），称为“捕获阶段”（capture phase）。
- 第二阶段：在目标节点上触发，称为“目标阶段”（target phase）。
- 第三阶段：从目标节点传导回 `window` 对象（从底层传回上层），称为“冒泡阶段”（bubbling phase）。

这种三阶段的传播模型，使得同一个事件会在多个节点上触发。

由于事件会在冒泡阶段向上传播到父节点，因此可以把子节点的监听函数定义在父节点上，由父节点的监听函数统一处理多个子元素的事件。这种方法叫做事件的代理（delegation）。

![事件的传播](../Images/bubble.png)

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

### Event 对象

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

### 常见事件

#### 鼠标事件

- `click` —— 当鼠标点击一个元素时（触摸屏设备会在点击时生成）。
- `contextmenu` —— 当鼠标右键点击一个元素时。
- `mouseover` / `mouseout` —— 当鼠标指针移入/离开一个元素时。
- `mousedown` / `mouseup` —— 当在元素上按下/释放鼠标按钮时。
- `mousemove` —— 当鼠标移动时。

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