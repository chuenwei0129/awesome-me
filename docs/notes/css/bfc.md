---
title: BFC
toc: content
group:
  title: 基础
---

## 拓展：浮动

> 1. 当一个元素浮动时，它会脱离正常的文档流。后续的非浮动的块级元素会表现得像浮动元素不存在一样，但这些元素的内容（如文本）会环绕浮动元素。
> 2. 文档一旦脱流，计算其父节点高度时不会将其浮动元素高度纳入。如果父元素内所有元素都是浮动的，那么父元素的高度将为 0，除非另有其他内容或已应用清除浮动的技术。
> 3. 浮动元素会影响其他浮动元素的排列，浮动元素会根据其指定的浮动方向（左或右）排列，并且每个浮动元素都会尽可能地靠近前一个浮动元素或容器的边缘。
>
> `clear` 属性的作用是**阻止某个元素（使用了 clear 属性的元素）的左边或右边靠近浮动元素**。
>
> ⚠️ 请注意，不要对浮动元素本身使用 `clear` 属性。由于浮动元素已经脱离了正常的文档流，即使在其上下添加清除浮动的空间也不会产生任何效果。

## BFC

**BFC（Block Formatting Context）** 的概念：

> BFC 是 CSS 中的一种布局上下文，它影响了元素在文档中的布局和渲染方式。BFC 是一个独立的渲染区域，其中包含了一组块级盒子（block-level boxes）。

通俗地来说，设置了 **BFC** 的元素，会形成一个独立的布局环境，其内部的元素按一定的规则来布局定位**不会受到外部元素的影响，同样也不会对其他外部元素产生影响**。

触发 BFC 的`条件`：

- 根元素（html 元素）是一个 BFC。
- 设置元素的`float`属性为`left`或`right`。
- 设置元素的`position`属性为`absolute`或`fixed`。
- 设置元素的`display`属性为`inline-block`、`table-cell`、`table-caption`、`flex`、`inline-flex`、`grid`或`inline-grid`。
- 设置元素的`overflow`属性为非`visible`的值（例如`auto`、`hidden`、`scroll`等）。

BFC 的`特性`：

- BFC 是一个独立的容器，**容器内的子元素不会影响外部元素**。
- 当一个容器形成了 BFC 后，它会包含浮动元素，并计算它们的尺寸，使父容器能够正确地包裹浮动元素。
- BFC 的区域不会与浮动元素重叠。
- 它的内部盒子会在垂直方向上一个接一个地排列。2 个元素不在同一个 BFC 中即可阻止垂直 margin 合并。

## BFC 的应用场景

### 消除边距折叠

> 普通情况下，当两个相邻的块级盒子的垂直边距相遇时，它们会发生折叠。让 2 个元素不在同一个 BFC 中即可阻止垂直 margin 合并，给其中一个元素套一层 BFC 即可保持各自独立的边距。

`margin` 重叠：

```jsx
export default () => {
  return (
    <>
      <div
        style={{
          width: '50px',
          height: '50px',
          backgroundColor: 'red',
          marginBottom: '30px',
        }}
      ></div>
      <div
        style={{
          width: '50px',
          height: '50px',
          backgroundColor: 'blue',
          marginTop: '50px',
        }}
      ></div>
    </>
  )
}
```

使用 BFC 阻止 `margin` 重叠：

```jsx
export default () => {
  return (
    <>
      <div style={{ overflow: 'hidden' }}>
        <div
          style={{
            width: '50px',
            height: '50px',
            backgroundColor: 'red',
            marginBottom: '30px',
          }}
        ></div>
      </div>
      <div
        style={{
          width: '50px',
          height: '50px',
          backgroundColor: 'blue',
          marginTop: '50px',
        }}
      ></div>
    </>
  )
}
```

嵌套元素的 `margin` 重叠：子容器的 `margin-top` 会传递到父容器上，`margin-left` 表现正常，不会发生传递。

```jsx
export default () => {
  return (
    <>
      <div
        style={{
          width: '200px',
          height: '200px',
          backgroundColor: '#e2e8f0',
          marginTop: '50px',
          marginLeft: '50px',
        }}
      >
        <div
          style={{
            width: '100px',
            height: '100px',
            backgroundColor: '#f87171',
            marginTop: '100px',
            marginLeft: '100px',
          }}
        ></div>
      </div>
    </>
  )
}
```

通过创建一个新的 BFC 可以解决内部元素的 margin 重叠问题：

```jsx
export default () => {
  return (
    <>
      {/* 此时父元素属于 html-bfc，子元素属于 parent-bfc */}
      <div
        style={{
          overflow: 'hidden',
          width: '200px',
          height: '200px',
          backgroundColor: '#e2e8f0',
          marginTop: '50px',
          marginLeft: '50px',
        }}
      >
        <div
          style={{
            width: '100px',
            height: '100px',
            backgroundColor: '#f87171',
            marginTop: '100px',
            marginLeft: '100px',
          }}
        ></div>
      </div>
    </>
  )
}
```

### 清除浮动

> 因为 BFC 是一个独立的容器，**容器内的子元素不会影响外部元素**。

```jsx
export default () => (
  <>
    <div
      style={{
        width: '50px',
        height: '50px',
        background: 'red',
        float: 'left',
      }}
    ></div>
    <p style={{ background: '#ccc' }}>
      当一个元素浮动时，它会脱离正常的文档流。后续的非浮动的块级元素会表现得像浮动元素不存在一样，但这些元素的内容（如文本）会环绕浮动元素。
      当一个元素浮动时，它会脱离正常的文档流。后续的非浮动的块级元素会表现得像浮动元素不存在一样，但这些元素的内容（如文本）会环绕浮动元素。
    </p>

    <br />
    <div
      style={{
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: '50px',
          height: '50px',
          background: 'red',
          float: 'left',
        }}
      ></div>
    </div>
    <p style={{ background: '#ccc' }}>
      因为 BFC 是一个独立的容器，容器内的子元素不会影响外部元素。
    </p>
  </>
)
```

### 防止父元素高度塌陷

> **当一个容器形成了 BFC 后，它会包含浮动元素，并计算它们的尺寸**，使父容器能够正确地包裹浮动元素。

```jsx
export default () => {
  return (
    <>
      {/* 解决高度塌陷 */}
      <div
        style={{
          overflow: 'auto',
          width: '200px',
          minHeight: '20px',
          backgroundColor: 'red',
        }}
      >
        <div
          style={{
            width: '100px',
            backgroundColor: '#ccc',
            height: '100px',
            float: 'left',
          }}
        ></div>
      </div>

      <br />

      {/* 高度塌陷 */}
      <div
        style={{ width: '200px', minHeight: '20px', backgroundColor: 'red' }}
      >
        <div
          style={{
            width: '100px',
            backgroundColor: '#ccc',
            height: '100px',
            float: 'left',
          }}
        ></div>
      </div>

      {/* 清除浮动对后续元素的影响 */}
      <div style={{ clear: 'left' }}></div>
    </>
  )
}
```

### 自适应两栏布局

> BFC 的区域不会与浮动元素重叠。所以 BFC 元素会和浮动元素产生边界。

```jsx
export default () => {
  return (
    <>
      {/* 不用 bfc */}
      <div
        style={{
          width: '200px',
          height: '100px',
          float: 'left',
          backgroundColor: 'red',
        }}
      ></div>
      <div style={{ backgroundColor: '#ccc', height: '120px' }}>
        我是一段文字我是一段文字我是一段文字我是一段文字我是一段文字我是一段文字
      </div>

      <br />
      {/* BFC 的区域不会与浮动元素重叠。 */}
      <div
        style={{
          width: '200px',
          height: '100px',
          float: 'left',
          backgroundColor: 'red',
        }}
      ></div>
      <div
        style={{ backgroundColor: '#ccc', height: '120px', overflow: 'hidden' }}
      >
        我是一段文字我是一段文字我是一段文字我是一段文字我是一段文字我是一段文字
      </div>
    </>
  )
}
```
