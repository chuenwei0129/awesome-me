# CSS 备忘录<!-- omit in toc -->

- [为什么 CSS 这么难学？](#为什么-css-这么难学)
- [盒模型](#盒模型)
- [块级元素与行内元素](#块级元素与行内元素)
  - [块级元素](#块级元素)
  - [行内元素](#行内元素)
  - [格式化上下文](#格式化上下文)
    - [BFC](#bfc)
    - [IFC](#ifc)
- [脱流文档流](#脱流文档流)
- [层叠上下文](#层叠上下文)
- [样式计算](#样式计算)
  - [权重](#权重)
  - [长度单位](#长度单位)
    - [em/rem 区别](#emrem-区别)
    - [视窗比例单位](#视窗比例单位)
    - [动态声明 font-size](#动态声明-font-size)
- [媒体查询](#媒体查询)
- [布局方式](#布局方式)
  - [flex 布局](#flex-布局)
    - [概述](#概述)
    - [flex 父容器](#flex-父容器)
      - [justify-content](#justify-content)
      - [align-items](#align-items)
    - [flex 子项](#flex-子项)
      - [单独设置子容器如何沿交叉轴排列：align-self](#单独设置子容器如何沿交叉轴排列align-self)
      - [在主轴上如何伸缩：flex 属性](#在主轴上如何伸缩flex-属性)
    - [轴](#轴)
    - [flex 进阶](#flex-进阶)
      - [父容器设置换行方式：flex-wrap](#父容器设置换行方式flex-wrap)
      - [轴向与换行组合设置：flex-flow](#轴向与换行组合设置flex-flow)
      - [多行沿交叉轴对齐：align-content](#多行沿交叉轴对齐align-content)
    - [总结](#总结)
  - [grid 布局](#grid-布局)
    - [简述](#简述)
    - [属性列表](#属性列表)
    - [grid 容器](#grid-容器)
      - [grid-template-columns/rows](#grid-template-columnsrows)
      - [grid-template-areas](#grid-template-areas)
      - [grid-template](#grid-template)
      - [gap](#gap)
      - [justify-items](#justify-items)
      - [align-items](#align-items-1)
      - [place-items](#place-items)
      - [justify-content](#justify-content-1)
      - [align-content](#align-content)
      - [place-content](#place-content)
      - [grid-auto-columns/rows](#grid-auto-columnsrows)
      - [grid-auto-flow](#grid-auto-flow)
      - [grid](#grid)
    - [grid 子项](#grid-子项)
      - [grid-column-start/end 和 grid-row-start/end](#grid-column-startend-和-grid-row-startend)
      - [grid-column/row](#grid-columnrow)
      - [grid-area](#grid-area)
      - [justify-self](#justify-self)
      - [align-self](#align-self)
      - [place-self](#place-self)
  - [其他布局方式](#其他布局方式)
- [函数计算](#函数计算)
  - [函数](#函数)
  - [常用](#常用)
- [变量计算](#变量计算)
- [选择器](#选择器)
  - [伪类选择器](#伪类选择器)
  - [表单控件实战](#表单控件实战)
- [背景与遮罩](#背景与遮罩)
  - [背景](#背景)
  - [渐变](#渐变)
- [阴影与滤镜](#阴影与滤镜)
- [变换与动画](#变换与动画)
  - [transform](#transform)
    - [transform-style](#transform-style)
    - [变换函数](#变换函数)
      - [translate](#translate)
      - [scale](#scale)
      - [skew](#skew)
      - [rotate](#rotate)
      - [matrix](#matrix)
    - [多值执行顺序](#多值执行顺序)
    - [GPU 硬件加速模式](#gpu-硬件加速模式)
  - [transition](#transition)
  - [animation](#animation)
- [其他](#其他)
  - [@import](#import)
  - [CSS 的继承](#css-的继承)
- [CSS 实战](#css-实战)
  - [文字溢出](#文字溢出)
  - [1px 边框](#1px-边框)
  - [自动打字器](#自动打字器)
  - [渐变背景](#渐变背景)

## [为什么 CSS 这么难学？](https://www.zhihu.com/question/66167982)

> 设计 api 或者框架的时候，一定要注意一个 api 影响的范围足够小，尽量一个 api 只干一件事。

**CSS 完美的破坏了这个规则，CSS 里面潜规则多如牛毛。**

**🌰 例子：**

- `inline-block` 的基线是最后一行文字的底部，`flex` 里面的基线是第一行文字的底部，只有一个元素属于 `inline` 或是 `inline-block` 水平，其身上的 `vertical-align` 属性才会起作用。

- 在不设置 `width` 和边距的情况下，块级元素的 `width` 和边距默认值是 `auto`，此时 `width` 会尽可能宽，`height` 在设置为 `auto` 的时候不是尽可能高而是恰好包含其所有垂直方向上的元素在计算浮动定位和边距合并之后的值，所以设置高度加百分比边距也可以做到垂直居中。

- ...

## 盒模型

盒模型由以下属性组成，由外到内用公式表示就是：`box = margin + border + padding + content`。

除了 `content`(不是属性，作为盒模型扩展理解使用)，其余属性都包含 `left`、`right`、`top` 和 `bottom` 等扩展属性。

- **margin**：边距，外部透明区域，负责隔离相邻盒子
- **border**：边框，内部着色区域，负责隔离边距和填充，包含 `width`、`style`、`color` 三个扩展属性
- **padding**：填充，内部着色区域，负责扩展盒子内部尺寸
- **content**：内容，以 `文本` 或 `节点` 存在的占用位置

**CSS3** 里提供一个属性用于声明盒模型的类型，它就是 `box-sizing`。

- `content-box`：标准盒模型(默认)
- `border-box`：怪异盒模型

> **它不具备继承性，若全局统一盒模型**，那只能使用 `*` 声明 `box-sizing` 了。

**margin 负值：**

- 当元素不存在 `width` 属性或者 `width：auto` 的时候，`margin-left` 和 `margin-right` 可以增加宽度
- `margin-top` 为负值不会增加高度，只会产生向上位移
- `margin-bottom` 为负值不会产生位移，会减少自身的供 CSS 读取的高度

**利用 `margin-bottom` 为负值会减少 CSS 读取元素高度的特性，加上 `padding-bottom` 和 `overflow:hidden` ，就能实现一个未知高度的多列等高布局。**

**负 `margin` 会改变浮动元素的显示位置**，圣杯布局、双飞翼布局什么的，都是利用这个原理实现的。

**其他注意事项：**

1. [margin-top 传递的现象](margin-top.html)
2. `padding` 不能为负值，`margin` 可以为负值
3. 背景色会平铺到非 `margin` 区域，`padding` 着色随 `background-color` 而变，可用 `background-clip` 隔离。

## 块级元素与行内元素

### 块级元素

当节点的 display 声明为 `block`、`list-item`、`table`、`flex` 或 `grid` 时，该节点被标记为块级元素。

**块级元素默认宽度为 100%**，在垂直方向上按顺序放置，同时参与**块格式化上下文**。

每个块级元素都至少生成一个**块级盒**，或一个**块容器盒**，块级盒描述它与兄弟节点间的表现方式，块容器盒描述它与子节点间的表现方式。

**一个块容器盒只包含其他块级盒，或生成一个行内格式化上下文只包含行内盒。** 或许一段代码中某一个块容器盒同时包含块级盒和行内盒的情况，但实质上在这种情况下会产生一种新的[匿名块盒](anonymous.html)解决该问题。

### 行内元素

当节点的 `display` 声明为 `inline`、`inline-block`、`inline-table`、`inline-flex` 或 `inline-grid` 时，该节点被标记为**行内元素**。

**行内元素默认宽度为 `auto`**，在水平方向上按顺序放置，同时参与**行内格式化上下文**。

当行内级盒参与`行内格式化上下文`后就会变成行内盒。另外还有一个叫做[匿名行内盒](anonymous.html)的概念。

### 格式化上下文

**格式化上下文**指决定渲染区域里节点的排版、关系和相互作用的渲染规则。

| 上下文               | 缩写  | 版本 | 声明         |
| -------------------- | ----- | ---- | ------------ |
| **块格式化上下文**   | `BFC` | 2    | 块级盒子容器 |
| **行内格式化上下文** | `IFC` | 2    | 行内盒子容器 |
| **弹性格式化上下文** | `FFC` | 3    | 弹性盒子容器 |
| **格栅格式化上下文** | `GFC` | 3    | 格栅盒子容器 |

#### BFC

**BFC 是页面上一个独立且隔离的渲染区域，容器里的子节点不会在布局上影响到外面的节点，反之亦然**。

**规则：**

- 节点在垂直方向上按顺序排列
- 节点垂直方向距离由 `margin` 决定，相邻节点的 `margin` 会发生重叠，以最大 `margin` 为合并值
- 节点的 `margin-left/right` 与父节点的 `左边/右边` 相接触，即使处于浮动也如此
- **BFC 不会与同级浮动区域重叠**
- 计算 BFC 高度时其浮动子节点也参与计算

**成因：**

- 根节点：html
- [父节点与正常文档流的子节点(非浮动)自动形成 BFC](bfc-float.html)
- 被定义成块级的非块级节点：`display:inline-block/table-cell/table-caption/flex/inline-flex/grid/inline-grid`
- 浮动节点：`float:left/right`
- 绝对定位节点：`position:absolute/fixed`
- 非溢出可见节点：`overflow:!visible`

**场景：**

- **自适应两栏布局：** 把侧边栏固定宽度且左浮动，对右侧内容触发 `BFC`，使得它的宽度自适应该行剩余宽度。
- **清除内部浮动：** 浮动后面的元素显示声明 `BFC`。或者在浮动元素上套一层 `BFC`（也需要显示声明，本质也是 `margin` 合并），总之就是解决第二个成因。
- **防止垂直 `margin` 合并：** 让 2 个元素不在同一个 `BFC` 中即可阻止垂直 `margin` 合并，给其中一个元素套一层 `BFC`即可（需要显示声明，直接块元素会出现 margin-top 传递现象）。

**clear 属性：**

`clear` 属性**不允许被 clear 的元素**的左边/右边挨着浮动元素，处理文字环绕效果。

> ⚠️ 不要在浮动元素上清除浮动，浮动元素脱离了文档流，就算给浮动元素上下加了清除空间，也是没有任何意义的。

#### IFC

**IFC 的宽高由行内子元素中最大的实际高度确定，不受垂直方向的 margin 和 padding 影响。**

>IFC 中不能存在块元素，若插入块元素则会产生对应个数的匿名块并互相隔离，即产生对应个数的 IFC，每个 IFC 对外表现为块级元素，并垂直排列。

**规则：**

- 节点在水平方向上按顺序排列
- **节点无法声明宽高**，其 `margin` 和 `padding` 在水平方向有效在垂直方向无效
- 节点在垂直方向上以不同形式对齐
- **节点宽度由包含块与浮动决定，节点高度由行高决定**

**成因：**

- 声明 `display:inline[-x]` 形成行内元素
- 声明 `line-height`
- 声明 `vertical-align`
- 声明 `font-size`

**注意事项：**

- **空白折叠：** [HTML 中换行编写行内元素，排版会出现 5px 空隙](5px-gap.html)
- **高矮不齐：** 行内元素统一以底边垂直对齐
- **自动换行：** 排版若一行无法完成则换行接着排版

## 脱流文档流

**脱流文档流指节点脱流正常文档流后，在正常文档流中的其他节点将忽略该节点并填补其原先空间。**

文档一旦脱流，**计算其父节点高度时不会将其高度纳入**，脱流节点不占据空间，因此添加浮动或定位后会对周围节点布局产生或多或少的影响。

文档流的脱流有两种方式：

- `float:left/right`：**节点参与浮动布局后，自身脱流但其文本不脱流**
- `position:absolute/fixed`：**节点参与定位布局后，自身及其文本一起脱流**

## 层叠上下文

层叠上下文指盒模型在三维空间 Z 轴上所表现的行为。每个盒模型存在于一个三维空间中，分别是平面画布的 X 轴 Y 轴和表示层叠的 Z 轴。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/fe-engineering/urlTrans.png)

在同一个层叠上下文中，节点会按照 `z-index` 的大小从上到下层叠，若 `z-index` 一致则后面的节点层叠等级要大于前面。脱流元素的层叠顺序就是看 `z-index` 的大小。

> ⚠️ 注意：**z-index 只在声明定位的节点上起效**

**`z-index` 隐藏节点：**

- 节点不可见但占据空间，不可点击：`position:relative; z-index:-1`
- 节点不可见不占据空间，不可点击：`position:absolute; z-index:-1`

## 样式计算

### 权重

- **10000**：`!important`
- **1000**：`内联样式`、`外联样式`
- **100**：`ID 选择器`
- **10**：`类选择器`、`伪类选择器`、`属性选择器`
- **1**：`标签选择器`、`伪元素选择器`
- **0**：`通配选择器`、`后代选择器`、`兄弟选择器`

> **权重相同的规则使用最后出现的规则**，`:not()` 不会被看成伪类，会被忽略。

### 长度单位

屏幕分辨率指横纵向上的像素点数，单位是 px。

所有单位无论是绝对单位还是相对单位，最终都是转化为 px 在屏幕上显示。因此在设计和开发过程中都以 px 为准。

#### em/rem 区别

两者区别在于：`em` 相对父节点，`rem` 相对根节点。`em` 以当前节点字体宽度作为参考，rem 以根节点 `<html>` 字体宽度作为参考，默认是 16px。

- **em：** 当前节点字体宽度，准确来说是一个 `M` 的宽度
- **rem：** 默认字体宽度，准确来说是一个 `M` 的宽度

**很多同学错误地以为 em 是根据父节点作为参考的，实际上是当前节点继承了父节点的属性后产生的错觉。**

#### 视窗比例单位

在 CSS3 中增加了与 viewport 相关的四个长度单位，随着时间推移，目前大部分浏览器对这四个长度单位都有较好的兼容，这也是未来最建议在伸缩方案中使用的长度单位。

- `1vw` 表示 `1%` 视窗宽度
- `1vh` 表示 `1%` 视窗高度
- `1vmin` 表示 `1%` 视窗宽度和 `1%` 视窗高度中最小者
- `1vmax` 表示 `1%` 视窗宽度和 `1%` 视窗高度中最大者

根据设计图与浏览器视窗的比例动态计算 `<html>` 的 `font-size：100/750 = x/100vw`。

```css
/* 基于 UI width=750px DPR=2 的页面 */

html {
  font-size: calc(100vw / 7.5);
}
```

#### 动态声明 font-size

针对移动端，通常会结合 JS **依据屏幕宽度与设计图宽度的比例**动态声明 `<html>` 的 `font-size`，以 `rem` 为长度单位声明所有节点的几何属性，这样就能做到大部分移动设备的页面兼容，兼容出入较大的地方再通过媒体查询做特别处理。

```js
function AutoResponse(width = 750) {
    const target = document.documentElement;
    if (target.clientWidth >= 600) {
        target.style.fontSize = "80px";
    } else {
        target.style.fontSize = target.clientWidth / width * 100 + "px";
    }
}

AutoResponse();
```

前提还需在 `<html>` 中声明以下代码，阻止用户缩放屏幕。

```html
<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1, minimum-scale=1, maximum-scale=1">
```

## 媒体查询

> [媒体查询](media.html)

## 布局方式

### flex 布局

#### 概述

flex 的核心的概念就是**容器**和**轴**。容器包括外层的**父容器**和内层的**子项**，轴包括**主轴**和**交叉轴**。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex_1.webp)

flex 容器具有这样的特点：父容器可以统一设置子项的排列方式，子项也可以单独设置自身的排列方式，**如果两者同时设置，以子项的设置为准**。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex_2.webp)

#### flex 父容器

##### justify-content

`justify-content` 属性用于**定义如何沿着主轴方向排列子容器**。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex_3.webp)

**值：**

- `flex-start`：起始端对齐
- `flex-end`：末尾段对齐
- `center`：居中对齐
- `space-around`：子容器沿主轴均匀分布，位于首尾两端的子容器到父容器的距离是子容器间距的一半。
- `space-between`：子容器沿主轴均匀分布，位于首尾两端的子容器与父容器相切。

**可视化：**

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex_4.webp)
![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex_5.webp)
![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex_6.webp)
![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex_7.webp)
![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex_8.webp)

##### align-items

`align-items` 属性用于**定义如何沿着交叉轴方向分配子容器的间距**。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex_9.webp)

**值：**

- `flex-start`：起始端对齐
- `flex-end`：末尾段对齐
- `center`：居中对齐
- `baseline`：基线对齐，这里的 baseline 默认是指首行文字，即 `first baseline`，所有子容器向基线对齐，交叉轴起点到元素基线距离最大的子容器将会与交叉轴起始端相切以确定基线
- `stretch`：子容器沿交叉轴方向的尺寸拉伸至与父容器一致

**可视化：**

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex_10.webp)
![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy8zOTI1MDYyLTFiOWQwZjRlMzJhNmM1OTgucG5nP2ltYWdlTW9ncjIvYXV0by1vcmllbnQvc3RyaXAlN0NpbWFnZVZpZXcyLzIvdy81MTAvZm9ybWF0L3dlYnA.webp)
![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex_11.webp)
![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex_12.webp)
![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex_13.webp)
![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex_14.webp)

#### flex 子项

##### 单独设置子容器如何沿交叉轴排列：align-self

每个子容器也可以单独定义沿交叉轴排列的方式，此属性的可选值与父容器 `align-items` 属性完全一致，**如果两者同时设置则以子容器的 `align-self` 属性为准**。

**值：**

- `flex-start`：起始端对齐
- `flex-end`：末尾段对齐
- `center`：居中对齐
- `baseline`：基线对齐
- `stretch`：拉伸对齐

**可视化：**

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex_16.webp)
![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex_17.webp)
![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex_18.webp)
![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex_19.webp)
![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex_20.webp)
![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex_21.webp)

##### 在主轴上如何伸缩：flex 属性

子容器是有弹性的（flex 即弹性），它们会自动填充剩余空间，**子容器的伸缩比例由 `flex` 属性确定。**

`flex` 的值可以是无单位数字（如：1, 2, 3），也可以是有单位数字（如：15px，30px，60px），还可以是 `none` 关键字。子容器会按照 `flex` 定义的尺寸比例自动伸缩，如果取值为 `none` 则不伸缩。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex_15.webp)

**设置基准大小：`flex-basis`**

`flex-basis` 表示在不伸缩的情况下子容器的原始尺寸。**主轴为横向时代表宽度，主轴为纵向时代表高度。**

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex-16.webp)
![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex-17.webp)

**设置扩展比例：`flex-grow`**

子容器弹性伸展的比例。如图，剩余空间按 `1:2` 的比例分配给子容器。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex-18.webp)
![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex-19.webp)

**设置收缩比例：`flex-shrink`**

子容器弹性收缩的比例。如图，超出的部分按 `1:2` 的比例从给子容器中减去。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex-20.webp)
![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex-21.webp)

**设置排列顺序：`order`**

改变子容器的排列顺序，覆盖 `HTML` 代码中的顺序，默认值为 `0`，可以为负值，数值越小排列越靠前。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex-22.webp)

**注意事项：**

- 属性 `flex` 规定了弹性元素如何伸长或缩短以适应 `flex` 容器中的可用空间。这是一个简写属性，可以同时设置 `flex-grow`, `flex-shrink` 与 `flex-basis`。
  - 值 `auto` 相当于将属性设置为 `"flex: 1 1 auto"`
  - 默认值 `initial` 相当于将属性设置为 `"flex: 0 1 auto"`
  - 值 `none` 相当于将属性设置为 `"flex: 0 0 auto"`
- `flex-grow` 初始值为 0。负值是不被允许的。
- `flex-shrink` 元素**仅在默认宽度之和大于容器的时候才会发生收缩**，其收缩的大小是依据 `flex-shrink` 的值。**初始值为 1**。负值是不被允许的。
- **如果任何 `flex` 元素的侧轴方向 `margin` 值设置为 `auto`，则会忽略 `align-self`（个体设置）。**

#### 轴

轴包括主轴和交叉轴，`justify-content` 属性决定子容器沿主轴的排列方式，`align-items` 属性决定子容器沿着交叉轴的排列方式。在 `flex` 布局中，`flex-direction` 属性决定主轴的方向，交叉轴的方向由主轴确定。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex_22.webp)

主轴的起始端由 `flex-start` 表示，末尾段由 `flex-end` 表示。不同的主轴方向对应的起始端、末尾段的位置也不相同。

**主轴方向：**

- 向右：`flex-direction: row`
- 向下：`flex-direction: column`
- 向左：`flex-direction: row-reverse`
- 向上：`flex-direction: column-reverse`

**可视化：**

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex-1.webp)
![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex-2.webp)
![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex-3.webp)
![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex-4.webp)

**交叉轴：**

主轴沿逆时针方向旋转 `90°` 就得到了交叉轴，交叉轴的起始端和末尾段也由 `flex-start` 和 `flex-end` 表示。

#### flex 进阶

##### 父容器设置换行方式：flex-wrap

`flex-wrap` 属性决定子容器是否换行排列，不仅可以顺序换行而且支持逆序换行。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex-5.webp)

**值：**

- `nowrap`：不换行
- `wrap`：换行
- `wrap-reverse`：逆序换行，逆序换行是指沿着交叉轴的反方向换行

**可视化：**

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex-6.webp)
![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex-7.webp)
![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex-8.webp)

##### 轴向与换行组合设置：flex-flow

`flow` 即流向，也就是子容器沿着哪个方向流动，流动到终点是否允许换行，比如 `flex-flow: row wrap`，**`flex-flow` 是一个复合属性**，相当于 `flex-direction` 与 `flex-wrap` 的组合，可选的取值如下：

- `row`、`column` 等，可单独设置主轴方向
- `wrap`、`nowrap` 等，可单独设置换行方式
- `row nowrap`、`column wrap` 等，也可两者同时设置

##### 多行沿交叉轴对齐：align-content

当子容器多行排列时，设置行与行之间的对齐方式。

**值：**

- `flex-start`：起始端对齐
- `flex-end`：末尾段对齐
- `center`：居中对齐
- `space-around`：等边距均匀分布
- `space-between`：等间距均匀分布
- `stretch`：拉伸对齐

**可视化：**

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex-10.webp)
![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex-11.webp)
![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex-12.webp)
![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex-13.webp)
![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex-14.webp)
![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex-15.webp)

#### 总结

以上就是 `flex` 布局的全部属性，一共 `12` 个，父容器、子容器各 `6` 个，可以随时通过下图进行回顾。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/flex-23.webp)

### grid 布局

#### 简述

[Grid](https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid) 布局是一个二维的布局方法，纵横两个方向总是同时存在。

在 Grid 布局中，所有相关 CSS 属性正好分为两拨，一拨作用在 `grid` 容器上，还有一拨作用在 `grid` 子项上。

> 在 `Grid` 布局中，`float`，`display:inline-block`，`display:table-cell`，`vertical-align` 以及 `column-*` 这些属性和声明对 `grid` 子项是没有任何作用的。

给 `<div>` 这类块元素设置 `display:grid` 或者给 `<span>` 这类内联元素设置 `display:inline-grid` 创建 Grid 布局。

#### 属性列表

|  作用在 grid 容器上   | 作用在 grid 子项上 |
| :-------------------: | :----------------: |
| grid-template-columns | grid-column-start  |
|  grid-template-rows   |  grid-column-end   |
|  grid-template-areas  |   grid-row-start   |
|     grid-template     |    grid-row-end    |
|    grid-column-gap    |    grid-column     |
|     grid-row-gap      |      grid-row      |
|       grid-gap        |     grid-area      |
|     justify-items     |    justify-self    |
|      align-items      |     align-self     |
|      place-items      |     place-self     |
|    justify-content    |
|     align-content     |
|     place-content     |
|   grid-auto-columns   |
|    grid-auto-rows     |
|    grid-auto-flow     |
|         grid          |

#### grid 容器

##### grid-template-columns/rows

```css
.container {
    grid-template-columns: <track-size> ... 或者 <line-name> <track-size> ...;
    grid-template-rows: <track-size> ... 或者 <line-name> <track-size> ...;
}
```

`<track-size>`：划分网格的尺寸。可以是长度值，百分比值，以及 `fr` 单位（网格剩余空间比例单位）。

`<line-name>`：划分网格的网格线的名字，可以任意命名（支持中文名）。

举个例子 🌰：

```css
.container {
    grid-template-columns: 80px auto 100px;
    grid-template-rows: 25% 100px auto 60px;
}
```

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/grid-1.png)

**双命名：**

**由于网格中中间区域的网格线是两边格子公用的**，就像道路有两边，因此，我们起名字的时候可以起两个名称（使用空格分隔），分别表示两侧。例如：

```css
.container {
    grid-template-columns: [第一根纵线] 80px [第1根纵线结束 第2根纵线开始] 100px [最后的结束线];
}
```

**repeat 语法：**

```css
.container {
    grid-template-columns: repeat(24, 40px [col-start]);
}
```

等同于：

```css
.container {
    grid-template-columns: 40px [col-start], 40px [col-start], /* ...省略20个...*/, 40px [col-start], 40px [col-start];
}
```

**fr 单位：**

`fr` 是单词 `fraction` 的缩写，表示分数。

```css
.container {
    grid-template-columns: 200px 1fr 1fr 1fr;
}
```

`4` 列布局，后面 `3` 列宽度是 `grid` 容器宽度减去 `200px` 后的 `1/3` 大小,`1:1:1`，剩余空间三等分

**fr 和 auto 混用：**

```css
.container {
    /* 减去第一列内容宽度，剩下三等分 */
    grid-template-columns: auto 1fr 1fr 1fr;
}
```

当设置 `fr` 和 `auto` 混用的时候，`auto` 的尺寸表现为“包裹”，为**内容宽度**。如果没有设置 `fr` 尺寸的网格，则表现为拉伸。

**当`fr` 数值之和小于 `1` 时：**

```css
.container {
    grid-template-columns: auto .25fr .25fr .25fr;
}
```

这里计算就相对复杂些，首先，由于第一个网格尺寸设置为 `auto`，因此 `fr` 计算需要的剩余空间尺寸是 `grid` 容器的宽度减去 `auto` 内容的宽度。所以，后面 3 个 `0.25` fr 元素的宽度是：**(容器宽度 - auto 内容宽度) * 0.25**。然后剩余尺寸就是第一个网格宽度。

##### grid-template-areas

`area` 是区域的意思，`grid-template-areas` 就是给我们的网格划分区域的

```css
.grid-container {
    grid-template-areas:
    /* 内容映射 */
    /* none 和 . 区别一个是空网格一个是不存在网格 */
        'header  .'
        'sidebar content'
        'footer  footer';
    /* 三行两列 */
    grid-template-columns: 200px 1fr;
    grid-template-rows: 80px 1fr 80px;

}
```

- `grid-area-name` 对应网格区域的名称。
- `.` 表示空的网格单元格。
- `none` 没有定义网格区域。

举个例子 🌰：[具体代码](grid.html)

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/grid-2.png)

##### grid-template

`grid-template` 是 `grid-template-rows`，`grid-template-columns` 和 `grid-template-areas` 属性的缩写。

```css
/* .grid-container {
    grid-template: none;
} */

/* 其中 `none` 表示将 3 个属性都设置为初始值。 */

.grid-container {
    grid-template:
        "header  header" 80px
        "content sidebar" 1fr
        "footer  footer" 80px
        /1fr 100px;
}
```

##### gap

`column-gap` 和 `row-gap` 属性用来定义网格中网格间隙的尺寸。

```css
.container {
    column-gap: <line-size>;
    row-gap: <line-size>;
}
```

`gap` 属性是 `column-gap` 和 `row-gap` 属性的缩写。

```css
.container {
    gap: <row-gap> <column-gap>;
}
```

##### justify-items

`justify-items` 指定了网格元素的水平呈现方式，是水平拉伸显示，还是左中右对齐，类似于 `flex` 的 `justify-content`，语法如下：

```css
.container {
    justify-items: stretch | start | end | center;
}
```

##### align-items

`align-items` 指定了网格元素的垂直呈现方式，是垂直拉伸显示，还是上中下对齐，语法如下：

```css
.container {
    align-items: stretch | start | end | center;
}
```

##### place-items

`place-items` 可以让 `align-items` 和 `justify-items` 属性写在单个声明中。语法如下：

```css
.container {
    place-items: <align-items> <justify-items>?;
}
```

##### justify-content

`justify-content` 指定了网格元素的水平分布方式。**此属性仅在网格总宽度小于 `grid` 容器宽度时候有效果。**

语法如下：

```css
justify-content: stretch | start | end | center | space-between | space-around | space-evenly;
```

我们网格设定的都是固定的宽度值，结果还有剩余空间。例如：

```css
.container {
    display: grid;
    width: 300px;
    grid-template: 100px 100px/100px 100px;
}
```

此时，水平和垂直方向都有 `100px` 的剩余，`justify-content` 属性此时就有用武之地了，**对 `grid` 网格整体布局，类似于 `flex` 中 `align-content` 的作用**。

##### align-content

`align-content` 可以看成和 `justify-content` 是相似且对立的属性，`justify-content` 指明水平方向 `grid` 子项的分布方式，而`align-content` 则是指明垂直方向每一行 `grid` 元素的分布方式。如果所有 `grid` 子项只有一行，则 `align-content` 属性是没有任何效果的。

##### place-content

`place-content` 可以让 `align-content` 和 `justify-content` 属性写在一个 CSS 声明中，也就是俗称的缩写。

##### grid-auto-columns/rows

指定任何自动生成的网格轨道（也称为隐式网格轨道）的大小。**当网格项目多于网格中的单元格或网格项目放置在显式网格之外时，将创建隐式轨道。**

通过一个实例来感受下 `grid-auto-columns` 和 `grid-auto-rows` 属性的样式表现。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/grid-5.png)

CSS 如下：

```css
.container {
    display: grid;
    width: 150px;
    grid-template-columns: 60px 60px;
    grid-template-rows: 30px 90px;
    grid-auto-columns: 60px;
}
.item-a {
    grid-column: 1 / 2;
    grid-row: 2 / 3;
}
.item-b {
/* 容器水平只有 2 个格子，但这里设定的是第 3 个，隐式网格创建 */
    grid-column: 3 / 4;
    grid-row: 2 / 3;
    background-color: rgba(255, 255, 0, .5);
}
```

`.item-b` 宽度足够时强制表现为了 `60px`，相反表现为 `auto`，在这里，则是可怜巴巴填满剩余的 `30px`。

##### grid-auto-flow

`grid-auto-flow` 属性控制没有明确指定位置的 `grid` 子项的放置方式。比方说定义了一个 **5*2** 的 `10` 格子，共有 5 个元素，其中 2 个元素指定了放在哪个格子里，还有 3 个则自生自灭排列。此时，这 3 个元素如何排列就是由 `grid-auto-flow` 属性控制的。

语法如下：

```css
.container {
    grid-auto-flow: row | column | row dense | column dense;
}
```

##### grid

是下面所有这些 CSS 属性的缩写集合，

- `grid-template-rows`
- `grid-template-columns`
- `grid-template-areas`
- `grid-auto-rows`
- `grid-auto-columns`
- `grid-auto-flow`

#### grid 子项

##### grid-column-start/end 和 grid-row-start/end

表示 `grid` 子项所占据的区域的起始和终止位置，包括水平方向和垂直方向。

```css
.item {
    grid-column-start: <number> | <name> | span <number> | span <name> | auto;
    grid-column-end: <number> | <name> | span <number> | span <name> | auto;
    grid-row-start: <number> | <name> | span <number> | span <name> | auto;
    grid-row-end: <number> | <name> | span <number> | span <name> | auto;
}
```

例子说话：

```css
.container {
    grid-template-columns: [第一根纵线] 80px [纵线2] auto [纵线3] 100px [最后的结束线];
    grid-template-rows: [第一行开始] 25% [第一行结束] 100px [行3] auto [行末];
}
.item-a {
    grid-column-start: 2;
    grid-column-end: 纵线3;
    grid-row-start: 第一行开始;
    grid-row-end: 3;
}
```

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/grid-6.png)

`span` 关键字的作用

```css
.item-b {
    grid-column-start: 2;
    grid-column-end: span 纵线3;
    grid-row-start: 第一行开始;
    grid-row-end: span 3;
}
```

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/grid-7.png)

`span` 仅限于网格线命名只有 1 个，且匹配的场景。

对于数值网格线，则可以看出差异，有 `span` 则表示跨越的个数，而非网格线的序号。例如这里 `grid-row-end:span 3` 表示当前网格需要覆盖 3 个格子。于是，我们可以看到 `.item-b` 高度贯穿整个 `grid` 容器。

##### grid-column/row

`grid-column` 和 `grid-row` 都是缩写，前者是 `grid-column-start + grid-column-end` 的缩写，后者是 `grid-row-start + grid-row-end` 的缩写。

```css
.item {
    grid-column: <start-line> / <end-line> | <start-line> / span <value>;
    grid-row: <start-line> / <end-line> | <start-line> / span <value>;
}
```

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/grid-8.png)

##### grid-area

`grid-area` 其实是 `grid-row-start`, `grid-column-start`, `grid-row-end` 以及 `grid-column-end`属性的缩写，以及额外支持`grid-template-areas` 设置的网格名称而已。

```css
.item {
    grid-area: <name> | <row-start> / <column-start> / <row-end> / <column-end>;
}
```

##### justify-self

`justify-self` 表示单个网格元素的水平对齐方式。语法如下：

```css
.item {
    justify-self: stretch | start | end | center;
}
```

##### align-self

`align-self` 指定了网格元素的垂直呈现方式，是垂直拉伸显示，还是上中下对齐，语法如下：

```css
.container {
    align-self: stretch | start | end | center;
}
```

##### place-self

`place-items` 可以让 `align-self` 和 `justify-self` 属性写在单个声明中。语法如下：

```css
.item {
    place-self: <align-self> <justify-self>?;
}
```

### 其他布局方式

- **浮动布局：**`float:left/right`
- **定位布局：**`position:relative/absolute/fixed`、`left/right/top/bottom/z-index`
- **表格布局：**`table 系列属性`
- **响应式布局：**`em/rem/vw/vh/vmin/vmax`、`媒体查询`

**注意事项：**

> 牵一发而动全身用在表格布局身上就很适合了，可能很小的一个改动就会造成整个 `<table>` 回流，通常可用 `<ul>`、`<li>` 和 `<span>` 等标签取代 `<table>` 系列标签生成表格。

## 函数计算

### 函数

CSS 函数指复杂类型或调用特殊处理的组件值类型。为单调的属性声明增加了更强大的点缀，让简单的 CSS 变得更有艺术感。其语法也很简单，编写形式为 `function(params)`，JS 里的函数调用一致。在 CSS 代码中，只要带有 `()` 的属性值都是函数。

有了函数后，**可将一系列相关计算交给浏览器处理，可减少大量人工计算甚至无需人工计算**，大大提高了 CSS 代码的编写效率。

### 常用

`calc(exp)` 用于动态计算单位，数值、长度、角度、时间和百分比都能作为参数。

- 四则运算：只能使用 `+`、`-`、`*`、`/` 作为运算符号
- 运算顺序：遵循加减乘除运算顺序，可用 `()` 提升运算优先级
- 符号连接：每个运算符号必须使用空格间隔起来
- 混合计算：可混合不同计量单位动态计算

在 SPA 里有遇过因为有滚动条或没滚动条而导致页面路由在跳转过程中发生向左或向右的抖动吗？这让强迫症患者很不舒服，此时可用 `calc()` 巧妙解决该问题。

```css
.elem {
  padding-right: calc(100vw - 100%);
}
```

`100vw` 是视窗宽度，`100%` 内容宽度，那么 `100vw - 100%` 就是滚动条宽度了，声明 `padding-right` 用于保留滚动条出现的位置，这样滚动条出不出现都不会让页面抖动了。

**其它函数：**

- [`attr(val)`](attr.html) 用于返回节点属性，通常结合伪元素的 content 使用，是一个很优雅的函数。
- [clip-path](https://bennettfeely.com/clippy/) 用于创建一个只有节点的部分区域可显示的剪切区域。

## 变量计算

[CSS 变量](var.html)又名 CSS 自定义属性，指可在整个文档中重复使用的值。它由自定义属性 `--var` 和函数 `var()` 组成，`var()` 用于引用自定义属性。

```css
:root {
    /* 全局变量 */
    --bg-color: red;
}
.title {
    /* 局部变量 */
    --title-color: yellow;
    background-color: var(--bg-color);
}
.desc {
    background-color: var(--bg-color);
}
```

贴上阮一峰老师的教程[《CSS变量教程》](http://www.ruanyifeng.com/blog/2017/05/css-variables.html)。

**实践：**

> [条形加载条](strip-loading.html)

## 选择器

### 伪类选择器

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/weilei.webp)

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/weiyuansu.png)

### 表单控件实战

**相关选择器：**

- +：相邻同胞选择器
- ~：通用同胞选择器
- :not()：非指定条件的元素
- :hover：鼠标悬浮的元素
- :focus：输入聚焦的表单元素
- :valid：输入合法的表单元素
- :invalid：输入非法的表单元素
- :checked：选项选中的表单元素
- :placeholder-shown：占位显示的表单元素
- :nth-child(n)：元素中指定顺序索引的元素

**小技巧：** `<input>` 使用 `id` 与 `<label>` 使用 `for` 关联起来，而 `hidden` 使 `<input>` 隐藏起来，不占用页面任何位置，此时点击 `<label>` 就相当于点击 `<input>`，`<label>` 放置在页面任何位置都行。

**存在问题：** 若直接声明 `input:valid` 和 `input:invalid`，在页面初始化后或输入框内容为空时都会触发 `:invalid`，导致表单校验还未开始就显示校验不通过的样式。为了只在输入内容时才触发 `:valid` 和 `:invalid`，可在其前面添加 `:focus`，表示在表单处于聚焦状态时才触发某些行为。

**输入内容判断：** 有内容和无内容可通过 `:placeholder-shown` 判断。`:placeholder-shown` 表示占位显示的表单元素，而占位不显示的表单元素可用 `:not()` 取反，再结合 `+` 带动紧随该节点的节点。

- 有内容就无占位：`:not(:placeholder-shown)`
- 无内容就有占位：`:placeholder-shown`

> [表单控件](login-form.html)

## 背景与遮罩

### 背景

`background` 是使用最多的属性之一，`mask` 是使用最少的属性之一。它们的格式和用法大部分相似，作用效果也相似，是少有的兄弟属性。另外，`margin` 和 `padding` 也是一对常见的兄弟属性。

**`background` 是一个大家庭，包含着众多子属性，这些子属性可拆开声明也可合并声明。**

`background` 包含以下子属性，而 mask 子属性也大部分与 `background` 一致。

- background-color：背景颜色
- background-image：背景图像
  - none：无图像(默认)
  - url()：图像路径
- background-repeat：背景图像平铺方式
  - repeat：图像在水平方向和垂直方向重复(默认)
  - repeat-x：图像在水平方向重复
  - repeat-y：图像在垂直方向重复
  - no-repeat：图像仅重复一次
  - space：图像以相同间距平铺且填充整个节点
  - round：图像自动缩放直到适应且填充整个节点
- background-attachment：背景图像依附方式
  - scroll：图像随页面滚动而移动(默认)
  - fixed：图像不会随页面滚动而移动
  - background-position：背景图像起始位置
  - Position：位置，可用任何长度单位，第二个位置(Y轴)不声明默认是50%(默认0% 0%)
  - Keyword：位置关键字 left、right、top、bottom、center，可单双使用，第二个关键字不声明默认是 center
- background-size：背景图像尺寸模式
  - auto：自动设置尺寸(默认)
  - cover：图像扩展至足够大，使其完全覆盖整个区域，图像某些部分也许无法显示在区域中
  - contain：图像扩展至最大尺寸，使其宽度和高度完全适应整个区域
  - Size：尺寸，可用任何长度单位，第二个尺寸(高)不声明默认是 auto
background-origin：定位区域
  - padding-box：图像相对填充定位(默认)
  - border-box：图像相对边框定位(与background-position结合使用)
  - content-box：图像相对内容定位
  - background-clip：绘制区域
  - border-box：图像被裁剪到边框与边距的交界处(默认)
  - padding-box：图像被裁剪到填充与边框的的交界处
  - content-box：图像被裁剪到内容与填充的交界处
- background-blend-mode：混合模式
  - normal：正常(默认)
  - ...其他

**注意事项：**

刚开始的 background 只有 color、image、repeat、attachment 和 position 这五个子属性，CSS3 发布后增加了 size、origin 和 clip 这三个子属性，而 position 和 size 都能使用长度单位作为值，连写时就无法区分两者的位置了，所以使用 `/` 将两者衔接起来。

**缩写建议（不必要）：**

```sh
background: color image repeat attachment position/size
```

### 渐变

CSS 渐变分为三种，每一种都有自身的特点。

- 线性渐变：沿着指定方向从起点到终点逐渐改变颜色，渐变形状是一条直线
- 径向渐变：沿着任意方向从圆心往外面逐渐改变颜色，渐变形状是一个圆形或椭圆形
- 锥形渐变：沿着顺时针方向从圆心往外面逐渐改变颜色，渐变形状是一个圆锥体

每个渐变函数都必须在 `background` 或 `background-image` 上使用，可认为 `gradient()` 就是一个图像，只不过是通过函数产生的图像。

**函数：**

- **linear-gradient()**：线性渐变
- **radial-gradient()**：径向渐变
- **conic-gradient()**：锥形渐变
- **repeating-linear-gradient()**：重复线性渐变
- **repeating-radial-gradient()**：重复径向渐变
- **repeating-conic-gradient()**：重复锥形渐变

**线性渐变语法：**

```css
background-image: linear-gradient(direction, color-stop)
```

- **Direction**：方向
  - `Keyword`：方向关键字 `to left/right/top/bottom/top left/top right/bottom left/bottom right`(默认`to bottom`)
  - `Angle`：角度，以顺时针方向的垂直线和渐变线的夹角计算，超出 N 圈则计算剩余角度
- **ColorStop**：色标
  - `Color`：颜色，可参考 `background-color` 取值，在指定位置产生渐变效果所使用的颜色
  - `Position`：位置，可参考 `background-position` 的 `Position` 取值，在指定位置产生渐变效果

**角度演示图：**

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/css/urlTrans.jpg)

- **0deg：** to top
- **90deg：** to right
- **180deg：** to bottom
- **270deg：** to left

## 阴影与滤镜

一行代码全站进入悼念模式，把 `<html>` 替换成 `<html style="filter:grayscale(1)">` 即可，简单粗暴。核心代码 `filter:grayscale(1)` 意思是把当前节点及其后代节点设置成100%的灰度模式。

>无设计基础的同学，可参照 **CSSgram** 的[官网](https://una.im/CSSgram/)和[源码](https://una.im/CSSgram/css/cssgram.min.css)学习滤镜调制

## 变换与动画

### transform

#### transform-style

**变换可理解成将节点复制一份并生成新的图层，原节点隐藏，使用新节点进行变换操作**。

声明 `transform-style` 可实现 2D 变换和 3D 变换间的切换，不同变换空间需使用对应的变换函数。**当然 `transform-style` 需声明在父节点中，即需发生变换的节点的父节点。**

- **flat**：所有变换效果在平面上呈现(默认)
- **preserve-3d**：所有变换效果在空间上呈现

#### 变换函数

##### translate

**位移：**

- [x] **translate(x,y)**：2D 位移
- [x] **translate3d(x,y,z)**：3D 位移
- [x] **translateX(x)**：X 轴位移，等同于 `translate(x,0)` 或 `translate3d(x,0,0)`
- [x] **translateY(y)**：Y 轴位移，等同于 `translate(0,y)` 或 `translate3d(0,y,0)`
- [x] **translateZ(z)**：Z 轴位移，等同于 `translate3d(0,0,z)`

**补充说明：**

- 单位：`Length` 长度，可用任何长度单位，允许负值
- 默认：X、Y、Z 轴不声明默认是 `0`
- 正值：沿 X 轴向右位移 / 沿 Y 轴向上位移 / 沿 Z 轴向外位移
- 负值：沿 X 轴向左位移 / 沿 Y 轴向下位移 / 沿 Z 轴向内位移

##### scale

**缩放：**

- [x] **scale(x,y)**：2D 缩放
- [x] **scale3d(x,y,z)**：3D 缩放
- [x] **scaleX(x)**：X 轴缩放，等同于 `scale(x,1)` 或 `scale3d(x,1,1)`
- [x] **scaleY(y)**：Y 轴缩放，等同于 `scale(1,y)` 或 `scale3d(1,y,1)`
- [x] **scaleZ(z)**：Z 轴缩放，等同于 `scale3d(1,1,z)`

**补充说明：**

- 单位：`Number` 数值或 `Percentage` 百分比，允许负值
- 默认：X、Y、Z 轴不声明默认是 `1` 或 `100%`
- 正值：`0<(x,y,z)<1` 沿 X 轴缩小 / 沿 Y 轴缩小 / 沿 Z 轴变厚，`(x,y,z)>1` 沿 X 轴放大 / 沿 Y 轴放大 / 沿 Z 轴变薄
- 负值：`-1<(x,y,z)<0` 翻转沿 X 轴缩小 / 沿 Y 轴缩小 / 沿 Z 轴变厚，`(x,y,z)<-1` 翻转沿 X 轴放大 / 沿 Y 轴放大 / 沿 Z 轴变薄

##### skew

**扭曲：**

- [x] **skew(x,y)**：2D 扭曲
- [x] **skewX(x)**：X 轴扭曲，等同于 `skew(x,0)`
- [x]  **skewY(y)**：Y 轴扭曲，等同于 `skew(0,y)`

**补充说明：**

- 单位：`Angle` 角度或 `Turn` 周
- 默认：X、Y 轴不声明默认是 `0`
- 正值：沿 X 轴向左扭曲 / 沿 Y 轴向下扭曲
- 负值：沿 X 轴向右扭曲 / 沿 Y 轴向上扭曲

##### rotate

**旋转：**

- [x] **rotate()**：2D 旋转
- [x] **rotate3d(x,y,z,a)**：3D 旋转，`[x,y,z]` 是一个向量，数值都是 `0~1`
- [x] **rotateX(a)**：X 轴旋转，等同于 `rotate(1,0,0,a)`，正值时沿 X 轴向上逆时针旋转，负值时沿 X 轴向下顺时针旋转
- [x] **rotateY(a)**：3D Y 轴旋转，等同于 `rotate(0,1,0,a)`，正值时沿 Y 轴向右逆时针旋转，负值时沿Y轴向左顺时针旋转
- [x] **rotateZ(a)**：3D Z 轴旋转，等同于 `rotate(0,0,1,a)`，正值时沿 Z 轴顺时针旋转，负值时沿 Z 轴逆时针旋转

**补充说明：**

- 单位：`Angle` 角度或 `Turn` 周
- 正值：2D 旋转时顺时针旋转
- 负值：2D 旋转时逆时针旋转

##### matrix

**矩阵(`太过复杂，可放弃`):**

- [x] **matrix(a,b,c,d,e,f)**：2D 矩阵(位移、缩放、扭曲、旋转的综合函数)
- [x] **matrix(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p)**：3D 矩阵(位移、缩放、扭曲、旋转的综合函数)
- [x] **perspective()**：视距

#### 多值执行顺序

正确来说并无执行上的先后顺序, 而是由多个变换对应的矩阵相乘, 再拿该矩阵去乘以坐标，最终得出变换效果。

#### GPU 硬件加速模式

为节点声明 `transform:translate3d()` 或 `transform:translateZ()`，这两个声明都会开启 GPU 硬件加速模式，从而让浏览器在渲染动画时从 CPU 转向 GPU，实现硬件加速。

```css
/* transform:translate3d() 和 transform:translateZ() 其实是为了渲染 3D 样式，但声明为 0 后并无真正使用 3D 效果 */

.elem {
    transform: translate3d(0, 0, 0);
}
/* 或 */
.elem {
    transform: translateZ(0);
}
```

**注意事项：** 当有多个绝对定位的节点声明 `transform:translate3d()` 开启 GPU 硬件加速模式后会有几个节点凭空消失，这种现象不能完全解决，减少声明 `transform:translate3d()` 的节点数量，减少至6个以下即可尽量避免。

### transition

有时在不同状态间切换属性可能会显得很生硬，此时 [`transition`](transition.html) 就派上用场了，它能让状态间的切换变得更丝滑。

- **transition-property**：属性
  - `all`：全部属性过渡(`默认`)
  - `none`：无属性过渡
  - `String`：某个属性过渡
- **transition-duration**：时间
  - `Time`：秒或毫秒(默认`0`)
- **transition-timing-function**：缓动函数
  - `ease`：逐渐变慢，等同于 `cubic-bezier(.25,.1,.25,1)`(`默认`)
  - `linear`：匀速，等同于 `cubic-bezier(0,0,1,1)`
  - `ease-in`：加速，等同于 `cubic-bezier(.42,0,1,1)`
  - `ease-out`：减速，等同于 `cubic-bezier(0,0,.58,1)`
  - `ease-in-out`：先加速后减速，等同于 `cubic-bezier(.42,0,.58,1)`
  - `cubic-bezier`：贝塞尔曲线，`(x1,y1,x2,y2)` 四个值指定于曲线上的点 `P1` 和 `P2`，所有值需在 `[0,1]` 区域内
- **transition-delay**：时延
  - `Time`：秒或毫秒(默认`0`)

> 拓展：缓动函数其实就是贝塞尔曲线。推荐一个设置缓动函数形状的网站 [CubicBezier](https://cubic-bezier.com/#.4,.4,.25,1.35)，可根据需求设置想要的缓动函数。

`duration` 和 `delay` 作用于所有节点，包括自身的 `::before` 和 `::after`

- `transition` 中出现两个时间值时，第一个解析为 `duration`，第二个解析为 `delay`
- `transition` 中出现一个时间值时，解析为 `duration`

### animation

`transform` 能让节点拥有**更多形态**，而 [`animation`](animation.html) 能让节点拥有**更多状态**。

动画由多个点组成，每个点拥有独立的状态，这些状态通过浏览器处理成过渡效果，点与点间的过渡效果串联起来就是一个完整的动画。

`animation` 可声明的两种动画，每种动画各有自身特点。

- **关键帧动画**：在时间轴的关键帧上绘制关键状态并使之有效过渡组成动画
- **逐帧动画**：在时间轴的每一帧上绘制不同内容并使之连续播放组成动画（可认为逐帧动画是一个 GIF）

**animation 属性：**

- **animation-name**：名称
  - `none`：无动画(`默认`)
  - `String`：动画名称
- **animation-duration**：时间
  - `Time`：秒或毫秒(默认`0`)
- **animation-timing-function**：缓动函数
  - `ease`：逐渐变慢，等同于 `cubic-bezier(.25,.1,.25,1)`(`默认`)
  - `linear`：匀速，等同于 `cubic-bezier(0,0,1,1)`
  - `ease-in`：加速，等同于 `cubic-bezier(.42,0,1,1)`
  - `ease-out`：减速，等同于 `cubic-bezier(0,0,.58,1)`
  - `ease-in-out`：先加速后减速，等同于 `cubic-bezier(.42,0,.58,1)`
  - `cubic-bezier`：贝塞尔曲线，`(x1,y1,x2,y2)` 四个值指定于曲线上的点 `P1` 和 `P2`，所有值需在 `[0,1]` 区域内
  - `steps([,[start|end]]?)`：把动画平均划分成 `n` 等分，直到平均走完该动画
  - `step-start`：等同于 `steps(1,start)`，把动画分成一步，动画执行时以左侧端点 `0%` 为开始
  - `step-end`：等同于 `steps(1,end)`，把动画分成一步，动画执行时以右侧端点 `100%` 为开始
- **animation-delay**：时延
  - `Time`：秒或毫秒(默认`0`)
- **animation-iteration-count**：播放次数
  - `Number`：数值(默认 `1`)
  - `infinite`：无限次
- **animation-direction**：轮流反向播放(播放次数为一次则该属性无效果)
  - `normal`：正常播放(`默认`)
  - `alternate`：轮流反向播放，奇数次数正常播放，偶数次数反向播放
- **animation-play-state**：播放状态
  - `running`：正在播放(`默认`)
  - `paused`：暂停播放
- **animation-fill-mode**：播放前后其效果是否可见
  - `none`：不改变默认行为(`默认`)
  - `backwards`：在时延所指定时间内或在动画开始前应用开始属性(`在第一个关键帧中定义`)
  - `forwards`：在动画结束后保持最后一个属性(`在最后一个关键帧中定义`)
  - `both`：向前和向后填充模式都被应用

关键帧动画必须通过 `animation` 和 `@keyframes` 声明，逐帧动画只能通过 `animation-timing-function:steps()` 声明。

> 关键帧动画声明步骤

- 在 `@keyframes` 里声明动画名称和动画每个关键帧的状态
- 动画名称不能重复否则会被覆盖，关键帧通过百分比分割出每个关键帧并声明对应的状态
- 在指定节点中声明 `animation` 调用动画

> 逐帧动画声明步骤

- 准备一张`逐帧长图`，该图像包含动画效果的每一帧且每帧宽高必须一致
- 在 `steps()` 里声明逐帧长图及其展示方式
- 在指定节点中声明 `animation` 调用动画

> @keyframes 注意事项

关键帧动画的声明通过 `@keyframes` 完成，编写形式如下。

```css
@keyframes animation-name {
    from {}
    to {}
}
/* 或 */
@keyframes animation-name {
    p1 {}
    p2 {}
    p3 {}
}
```

关键帧的取值必须是 `from`、`to` 或 `Percentage`。`from` 可用 `0%` 代替，`to` 可用 `100%` 代替，若开始或结束的关键帧无对应的状态，可不用声明 `from` 或 `to`。`0%` 的 `%` 不能省略，否则关键帧解析会失败。

后面声明的关键帧状态会覆盖前面声明的关键帧状态，动画结束后会回到 `animation-fill-mode` 声明的状态。

## 其他

### @import

`link` 标签和 `@import` 都能导入一个样式文件，它们有什么区别嘛？

- `link` 是 HTML 标签，除了能导入 CSS 外，还能导入别的资源，比如图片、脚本和字体等；而 `@import` 是 CSS 的语法，只能用来导入 CSS
- `link` 导入的样式会在页面加载时同时加载，`@import` 导入的样式需等页面加载完成后再加载
- `link` 可以通过 JS 操作 `DOM` 动态引入样式表改变样式，而 `@import` 不可以。

### CSS 的继承

在 CSS 中有一个很重要的特性就是**子元素会继承父元素对应属性计算后的值。**

CSS 属性很多，但并不是所有的属性默认都是能继承父元素对应属性的，那哪些属性存在默认继承的行为呢？一定是那些不会影响到页面布局的属性，可以分为如下几类：

- **字体相关：** `font-family`、`font-style`、`font-size`、`font-weight` 等
- **文本相关：** `text-align`、`text-indent`、`text-decoration`、`text-shadow`、`letter-spacing`、`word-spacing`、`white-space`、`line-height`、`color` 等
- **列表相关：** `list-style`、`list-style-image`、`list-style-type`、`list-style-position` 等
- **其他属性：** `visibility`、`cursor` 等

**对于其他默认不继承的属性也可以通过以下几个属性值来控制继承行为：**

- **`inherit`：** 继承父元素对应属性的计算值
- **`initial`：** 应用该属性的默认值，比如 `color` 的默认值是 `#000`
- **`unset`：** 如果属性是默认可以继承的，则取 `inherit` 的效果，否则同 `initial`

## CSS 实战

### 文字溢出

> [多行文字溢出](text-overflow.html)

### 1px 边框

> [移动端 1px 边框](1px-border.html)

### 自动打字器

> [自动打字器](auto-typing.html)

### 渐变背景

> [渐变背景](gradient-bg.html)
