---
title: Passive
---

`addEventListener` 是我们用来监听事件的好伙伴，其中参数是这样的：

```javascript
target.addEventListener(type, listener[, useCapture]);
```

但是，当你现在去查 MDN 的文档时，可能会看到它这么写：

```javascript
target.addEventListener(type, listener[, options]);
target.addEventListener(type, listener[, useCapture]);
```

在古早的时代，`useCapture` 是必填项，后来规范变更后，它变成了选填。`useCapture` 决定了事件监听器是在捕获阶段还是在冒泡阶段执行。传 `true` 表示捕获阶段，`false` 表示冒泡阶段。由于传 `true` 的场景过于稀有，现在默认值是 `false`（冒泡阶段）。

![事件传播示意图](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/20241116143535.png)

这被称为**事件传播**。当我们给每个元素都绑定事件时，事件会从最内层的子元素冒泡到父元素。

在事件处理函数中，我们会拿到一个 Event 对象，最常用的两个方法是 `event.preventDefault()` 和 `event.stopPropagation()`。

- **stopPropagation()**：阻止事件冒泡
- **preventDefault()**：阻止事件的默认行为

在响应的移动网页上，我们常用的事件包括：

- `touchstart`
- `touchmove`
- `touchend`
- `touchcancel`

你可以这样绑定 `touchstart` 事件：

```javascript
div.addEventListener("touchstart", (e) => {
    // 做点什么
})
```

如果第三个参数没有传值，默认是 `false`，也就是事件在冒泡阶段被处理。若你调用了 `stopPropagation()`，`div` 的父元素就不会接收这个事件了。

那如果调用 `preventDefault()` 呢？假设你给超链接 `a` 标签绑定过 `click` 事件，你就知道了。当 `a` 标签被点击时，它的默认行为是跳转到 `href` 指定的链接。调用了 `preventDefault()` 就阻止了这个默认跳转。

同理，如果在 `touchstart` 事件中调用 `preventDefault` 会怎么样呢？页面会禁止滚动或缩放。问题来了：浏览器事先不知道监听器会不会调用 `preventDefault()`，它得等监听器执行完才能执行默认行为。这意味着监听器执行的时间可能会让页面卡顿。

简单来说，当你滑动页面时，页面应该跟随手指滚动。但是你绑定 `touchstart` 事件，并且这个事件执行了 200 毫秒，浏览器会陷入困惑：你会不会调用 `preventDefault()` 呢？会的话页面不应该滚动，不会的话页面该滚动。只能等你那 200 毫秒执行完后，它才能决定，“哦，原来你没有阻止默认行为，我这就滚。” 这时，页面才开始滚，真是个慢吞吞的体验啊！

而 Chrome 曾经做了调查：

> 在 Android 版 Chrome 中，80% 的 `touch` 事件监听器从未调用过 `preventDefault()`，有 10% 的页面增加了至少 100 毫秒的延迟，甚至有 1% 的页面增加了超过 500 毫秒的延迟。

这表明，浏览器常常是白等的。如果 Web 开发者提前告诉浏览器：“放心，我不会调用 `preventDefault` 的”，浏览器能更快地生成事件，进而提升页面性能。

于是，`passive` 登场了。在 WICG 的演示中，即使在滚动事件里写一个死循环，浏览器也能正常处理页面滚动。

在最新的 DOM 规范中，事件监听函数的第三个参数变成了一个对象：

```javascript
target.addEventListener(type, listener[, options]);
```

通过设置 `passive` 为 `true`，明确告诉浏览器事件处理函数不会调用 `preventDefault`，以阻止默认滑动行为。

在 Chrome 中，如果发现耗时超过 100 毫秒的非 `passive` 监听器，DevTools 会警告你添加 `{passive: true}`。

这样你的页面就能流畅滚动，再也不用担心页面卡顿啦！
