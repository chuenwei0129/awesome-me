---
group:
  title: CSS
  order: 2
title: BFC 与浮动
toc: content
---

BFC（Block Formatting Context），即块级格式化上下文，它是页面中的一块渲染区域，并且有一套属于自己的渲染规则：

- 内部的盒子会在垂直方向上一个接一个的放置
- 对于同一个 BFC 的俩个相邻的盒子的 margin 会发生重叠，与方向无关。
- 每个元素的左外边距与包含块的左边界相接触（从左到右），即使浮动元素也是如此
- BFC 的区域不会与 float 的元素区域重叠
- 计算 BFC 的高度时，浮动子元素也参与计算
- BFC 就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之亦然
- BFC 目的是形成一个相对于外界完全独立的空间，让内部的子元素不会影响到外部的元素

普通块元素和其子元素是同一个 BFC 吗？
是的，普通块元素（没有创建 BFC 的条件）和它的子元素都处于同一个 BFC 中，这个 BFC 通常是由最近的祖先 BFC 所提供，最初始的 BFC 是由根元素（html）创建的。
如果子元素浮动，就会出现子元素和父元素不是一个 BFC 对吗？
不对。当子元素浮动时，它仍然处于同一个 BFC 中，但是浮动元素会脱离正常的文档流，这会导致父元素高度塌陷（如果父元素没有创建 BFC 并且没有其他非浮动内容撑开高度）。但是，如果父元素通过某种方式（例如设置 overflow:hidden）创建了 BFC，那么父元素就会包含浮动元素，即计算高度时会包括浮动元素。

注意：浮动元素本身会创建一个新的 BFC，但是这与父元素是否是 BFC 无关。浮动元素创建的 BFC 会包含它的子元素，但不会影响它和父元素的关系。父元素是否创建 BFC 决定了它是否能够包含浮动元素。

display: block 会出现 BFC 吗？
不会。display: block 是块级元素的默认显示方式，它本身不会创建 BFC。只有满足特定条件的块级元素才会创建 BFC，例如设置了 overflow 不为 visible、float 不为 none 等。

display: flow-root 是干嘛的？
display: flow-root 是 CSS 中专门用于创建 BFC 的一个属性值。它不会带来像 overflow:hidden 可能带来的裁剪内容或 float 可能带来的文字环绕等副作用。使用 display: flow-root 的元素会创建一个新的 BFC，这个 BFC 会包含内部浮动元素，并且不会与外部浮动元素重叠，同时也不会影响外部布局。

能放文字就是 bfc，不能放文字的就不是 BFC
bfc 是元素创建的，但是它只是给排版用的信息，并不是元素本身啊
block 里面放文字会先生成行盒

bfc 是块级格式化上下文可以解释成块级排版上下文信息

bfc 是元素创建的，但是它只是给排版用的信息，并不是元素本身，

box 摆放的位置

flex 和 grid 和正常流不一样

block container 里面叫 block level box
flex 外面叫 flex container 里面叫 flex item

浮动/position 不在正常流且里面有文字，自然形成 bfc
flex item 是 bfc，flex container 不是 bfc 是 ffc

一行写不下就换下一行就是所谓的 bfc
bfc 合并，
既是 block container 又是 block level box 的叫 block box 简称 block，也就是 子元素

block 在 overflow:visable 不产生 bfc，

bfc 决定了盒子的摆放位置和相互关系，bfc 里的盒子会发生 margin 合并
写不下就放下一行正常流，margin 之间的互动，浮动元素之间的互动
html 是容器，所有元素都是子元素，所以外面有 bfc 了所有的块盒子墨认都是 block
如果一个盒子变成了 block container，他就有了自己的 bfc，首先 bfc 是排版信息，他都不是正常流了所以也要有自己的排版信息，block 变成 bfc

用这个例子解释 margin

普通情况下，当两个相邻的 block 的垂直边距相遇时，它们会发生折叠

1. 与 margin 的互动
2. 与浮动的互动

- - 父元素 bfc 和子元素浮动的关系
- - 浮动元素和 其他 bfc 元素的关系- BFC 是一个独立的容器，**容器内的子元素不会影响外部元素**。
- 当一个容器形成了 BFC 后，它会包含浮动元素，并计算它们的尺寸，使父容器能够正确地包裹浮动元素。
- BFC 的区域不会与浮动元素重叠。

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
          overflow: 'hidden',
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
  );
};
```
