# 事件<!-- omit in toc -->

## 常用 DOM 事件

这是最有用的 DOM 事件的列表，你可以浏览一下：

**鼠标事件：**

- `click` —— 当鼠标点击一个元素时（触摸屏设备会在点击时生成）。
- `contextmenu` —— 当鼠标右键点击一个元素时。
- `mouseover` / `mouseout` —— 当鼠标指针移入/离开一个元素时。
- `mousedown` / `mouseup` —— 当在元素上按下/释放鼠标按钮时。
- `mousemove` —— 当鼠标移动时。

**键盘事件**：

- `keydown` 和 `keyup` —— 当按下和松开一个按键时。

**表单（form）元素事件**：

- `submit` —— 当访问者提交了一个 `<form>` 时。
- `focus` —— 当访问者聚焦于一个元素时，例如聚焦于一个 `<input>`。

**Document 事件**：

- `DOMContentLoaded` —— 当 HTML 的加载和处理均完成，DOM 被完全构建完成时。

**CSS 事件**：

- `transitionend` —— 当一个 CSS 动画完成时。

## 事件处理程序

`JavaScript` 有三种方法，可以为事件绑定监听函数。

- HTML 特性
- DOM 属性
- addEventListener

### HTML 特性

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

### DOM 属性

元素节点对象的事件属性，同样可以指定监听函数。

```js
div.onclick = function (event) {
  console.log('触发事件')
}
```

使用这个方法指定的监听函数，也是只会在冒泡阶段触发。

### addEventListener

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
- `passive`：布尔值，如果为 true，那么处理程序将不会调用 preventDefault()。

```js
buttonElement.addEventListener(
  'click',
  {
    handleEvent: function (event) {
      // event.currentTarget 处理事件的元素。
      // 这与 this 相同，除非处理程序是一个箭头函数，或者它的 this 被绑定到了其他东西上，之后我们就可以从 event.currentTarget 获取元素了。
      console.log(this === event.currentTarget) // true
      // event.clientX / event.clientY
      // 指针事件（pointer event）的指针的窗口相对坐标。
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

![20230301180900](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/others/20230301180900.png)

由于事件会在冒泡阶段向上传播到父节点，因此可以把子节点的监听函数定义在父节点上，由父节点的监听函数统一处理多个子元素的事件。这种方法叫做事件的代理（delegation）。

```js
var ul = document.querySelector('ul')

ul.addEventListener('click', function (event) {
  // event.target —— 是引发事件的“目标”元素，它在冒泡过程中不会发生变化。
  // event.eventPhase —— 当前阶段（capturing=1，target=2，bubbling=3）。
  // event.currentTarget（=this）—— 处理事件的当前元素（具有处理程序的元素）
  if (event.target.tagName.toLowerCase() === 'li') {
    // some code
  }
})
```

如果希望事件到某个节点为止，不再传播，可以使用事件对象的 `stopPropagation` 方法。

> ⚠️：不要在没有需要的情况下停止冒泡！

有时 event.stopPropagation() 会产生隐藏的陷阱，以后可能会成为问题。

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

## 浏览器默认行为

有很多默认的浏览器行为：

- `mousedown` —— 开始选择（移动鼠标进行选择）。
- 在 `<input type="checkbox">` 上的 `click` —— 选中/取消选中的 `input`。
- `submit` —— 点击 `<input type="submit">` 或者在表单字段中按下 Enter 键会触发该事件，之后浏览器将提交表单。
- `keydown` —— 按下一个按键会导致将字符添加到字段，或者触发其他行为。
- `contextmenu` —— 事件发生在鼠标右键单击时，触发的行为是显示浏览器上下文菜单。
- ……还有更多……

如果我们只想通过 JavaScript 来处理事件，那么所有默认行为都是可以被阻止的。

想要阻止默认行为 —— 可以使用 `event.preventDefault()` 或 `return false`。第二个方法只适用于通过 `on<event>` 分配的处理程序。

```html
<a href="/" onclick="return false">Click here</a>
<!-- or -->
<a href="/" onclick="event.preventDefault()">here</a>
```

`addEventListener` 的 `passive: true` 选项告诉浏览器该行为不会被阻止。这对于某些移动端的事件（像 `touchstart` 和 `touchmove`）很有用，用以告诉浏览器在滚动之前不应等待所有处理程序完成。

如果默认行为被阻止，`event.defaultPrevented` 的值会变成 `true`，否则为 `false`。

## 创建自定义事件

> [创建自定义事件](https://zh.javascript.info/dispatch-events)

## UI 事件

> [UI 事件](https://zh.javascript.info/event-details)
