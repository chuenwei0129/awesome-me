---
title: 居中和三栏布局
toc: content
order: 400
---

## 居中

在Web开发中，水平垂直居中是一个常见的需求。本文将介绍几种常见的方法来实现一个元素在其父容器中的水平垂直居中。这些技术包括使用`inline-block`、`text-align`、`vertical-align`, `width`和`margin`， `absolute`和`translate`。所有代码将会用React和styled-components来展示。

### 方法一：inline-block + text-align + vertical-align: middle

使用`inline-block`、`text-align`和`vertical-align: middle`这种方法可以实现子元素在父容器中的水平垂直居中。

```tsx
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 200px;
  height: 100px;
  background-color: #d1d5db;
  text-align: center;
  line-height: 100px; /* 增加此行以实现垂直居中 */
`;

const Box = styled.div`
  width: 50px;
  height: 50px;
  background-color: #d946ef;
  display: inline-block;
  vertical-align: middle;
  line-height: normal; /* 重置子元素的行高 */
`;

const TextAlignDemo = () => {
  return (
    <Container>
      <Box />
    </Container>
  );
};

export default TextAlignDemo;
```

### 方法二：width + margin

使用`width`和`margin`可以很简单地实现水平居中，通过设置容器和子元素的高度及`height`。为了实现垂直居中，可以结合`margin-top`或使用盒模型的其他居中技巧。

```tsx
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 200px;
  height: 100px;
  background-color: #ccc;
  display: flex;
  align-items: center; /* 添加此行以进行垂直居中 */
`;

const Box = styled.div`
  margin: 0 auto;
  width: 50px;
  height: 50px;
  background-color: #f0f;
`;

const WidthMarginDemo = () => {
  return (
    <Container>
      <Box />
    </Container>
  );
};

export default WidthMarginDemo;
```

### 方法三：absolute + translate

使用`absolute`和`translate`可以方便地实现一个元素的居中，不需要额外的容器调整。

```tsx
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  width: 200px;
  height: 100px;
  background-color: #ccc;
`;

const Box = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 50px;
  height: 50px;
  background-color: #f0f;
  transform: translate(-50%, -50%); /* 使用transform进行水平和垂直居中 */
`;

const AbsoluteTranslateDemo = () => {
  return (
    <Container>
      <Box />
    </Container>
  );
};

export default AbsoluteTranslateDemo;
```

好的，我将会在不改变原文内容的前提下，仅用 React 和 Styled Components 来重写代码，并展示每种布局方式的示例代码。

## 三栏布局

**左右模块固定宽度，中间模块随浏览器变化自适应**。

### 流体布局

左右模块各自向左右浮动，并设置中间模块的 `margin` 值使中间模块宽度自适应。

```tsx
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  &::after {
    content: '';
    display: table;
    clear: both;
  }
`;

const Left = styled.div`
  float: left;
  border: 10px solid red;
  width: 200px;
  height: 300px;
  background-color: #ccc;
`;

const Right = styled.div`
  float: right;
  border: 10px solid black;
  width: 250px;
  height: 300px;
  background-color: #bf0;
`;

const Main = styled.div`
  margin-left: 220px;
  margin-right: 270px;
  border: 10px solid blue;
  height: 300px;
  background-color: #0ef;
`;

const FluidLayout = () => (
  <Container>
    <Left>left</Left>
    <Right>right</Right>
    <Main>main</Main>
  </Container>
);

export default FluidLayout;
```

**缺点就是主要内容无法最先加载，当页面内容较多时会影响用户体验**。

### BFC 布局

`BFC` 规则有这样的描述：`BFC` 区域，不会与浮动元素重叠。

```tsx
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  &::after {
    content: '';
    display: table;
    clear: both;
  }
`;

const Left = styled.div`
  float: left;
  margin-right: 20px;
  border: 10px solid red;
  width: 200px;
  height: 300px;
  background-color: #ccc;
`;

const Right = styled.div`
  float: right;
  margin-left: 20px;
  border: 10px solid black;
  width: 250px;
  height: 300px;
  background-color: #bf0;
`;

const Main = styled.div`
  overflow: hidden;
  border: 10px solid blue;
  height: 300px;
  background-color: #0ef;
`;

const BFCLayout = () => (
  <Container>
    <Left>left</Left>
    <Right>right</Right>
    <Main>main</Main>
  </Container>
);

export default BFCLayout;
```

**缺点跟流体布局类似，主要内容模块无法最先加载，当页面中内容较多时会影响用户体验**。

### 绝对定位布局

```tsx
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
`;

const Left = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  border: 10px solid red;
  width: 200px;
  height: 300px;
  background-color: #ccc;
`;

const Right = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  border: 10px solid black;
  width: 250px;
  height: 300px;
  background-color: #bf0;
`;

const Main = styled.div`
  margin-left: 220px;
  margin-right: 270px;
  border: 10px solid blue;
  height: 300px;
  background-color: #0ef;
`;

const AbsoluteLayout = () => (
  <Container>
    <Main>main</Main>
    <Left>left</Left>
    <Right>right</Right>
  </Container>
);

export default AbsoluteLayout;
```

简单实用，并且主要内容可以优先加载。

### 双飞翼布局

负 `margin` 会改变浮动元素的显示位置，使用 `margin` 负值调位置。

```js
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  &::after {
    content: '';
    display: table;
    clear: both;
  }
`;

const Left = styled.div`
  float: left;
  margin-left: -100%;
  border: 10px solid red;
  width: 200px;
  height: 300px;
  background-color: #ccc;
`;

const Right = styled.div`
  float: left;
  margin-left: -250px;
  border: 10px solid black;
  width: 250px;
  height: 300px;
  background-color: #bf0;
`;

const Content = styled.div`
  float: left;
  width: 100%;
`;

const Main = styled.div`
  margin-left: 220px;
  margin-right: 270px;
  border: 10px solid blue;
  height: 300px;
  background-color: #0ef;
`;

const DoubleWingLayout = () => (
  <Container>
    <Content>
      <Main>main</Main>
    </Content>
    <Left>left</Left>
    <Right>right</Right>
  </Container>
);

export default DoubleWingLayout;
```

### 圣杯布局

思路：`left`, `right`, `main` 都浮动，再使用 `margin-left` 调容器位置，`margin` 负值调位置，`relative` 调位置。

```ts
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin-left: 220px;
  margin-right: 270px;
  &::after {
    content: '';
    display: table;
    clear: both;
  }
`;

const Left = styled.div`
  float: left;
  position: relative;
  left: -220px;
  margin-left: -100%;
  border: 10px solid red;
  width: 200px;
  height: 300px;
  background-color: #ccc;
`;

const Right = styled.div`
  float: left;
  position: relative;
  right: -270px;
  margin-left: -250px;
  border: 10px solid black;
  width: 250px;
  height: 300px;
  background-color: #bf0;
`;

const Main = styled.div`
  float: left;
  border: 10px solid blue;
  width: 100%;
  height: 300px;
  background-color: #0ef;
`;

const HolyGrailLayout = () => (
  <Container>
    <Main>main</Main>
    <Left>left</Left>
    <Right>right</Right>
  </Container>
);

export default HolyGrailLayout;
```

### flex 布局

使用 Flex 实现一个简单而强大的三栏布局。

```tsx
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
`;

const Left = styled.div`
  flex-basis: 200px;
  order: -1;
  border: 10px solid red;
  height: 300px;
  background-color: #ccc;
`;

const Right = styled.div`
  flex-basis: 250px;
  order: 1;
  border: 10px solid black;
  height: 300px;
  background-color: #bf0;
`;

const Main = styled.div`
  flex-grow: 1;
  margin: 0 20px;
  border: 10px solid blue;
  height: 300px;
  background-color: #0ef;
`;

const FlexLayout = () => (
  <Container>
    <Main>main</Main>
    <Left>left</Left>
    <Right>right</Right>
  </Container>
);

export default FlexLayout;
```

### grid 布局

使用 CSS Grid 布局实现三栏布局。

```tsx
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr 250px;
  gap: 20px;
`;

const Left = styled.div`
  border: 10px solid red;
  height: 300px;
  background-color: #ccc;
`;

const Main = styled.div`
  border: 10px solid blue;
  height: 300px;
  background-color: #0ef;
`;

const Right = styled.div`
  border: 10px solid black;
  height: 300px;
  background-color: #bf0;
`;

const GridLayout = () => (
  <Container>
    <Left>left</Left>
    <Main>main</Main>
    <Right>right</Right>
  </Container>
);

export default GridLayout;
```
