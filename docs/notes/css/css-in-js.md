---
title: CSS-in-JS
toc: content
group:
  title: 工程化
---

## 什么是 CSS-in-JS

CSS-in-JS，顾名思义，将 CSS 写在 JS 文件里，而不是单独新建如 `.css`、`.scss`等文件。这样就可以在 CSS 中使用 JS 的变量定义、函数调用、条件判断等功能。

CSS-in-JS 的流行与 React、Vue 等框架的流行密不可分。特别是 React，由于其没有自带的 CSS 方案，CSS-in-JS 在 React 社区得到了广泛讨论和应用。

实现 CSS-in-JS 的库有很多，每个库的实现、使用方式和语法也各不相同。常见的 CSS-in-JS 库包括 [styled-components](https://styled-components.com/docs/advanced#theming) 和 Emotion。除了运行时类型的 CSS-in-JS，还有编译时类型的实现。

![20240611222731](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/me/20240611222731.png)

## CSS-in-JS 的优缺点

### 优点

**1. 局部作用域样式 (Locally-scoped styles)：**

在编写传统的 CSS 时，很容易不小心污染到其他组件。例如，我们为一个列表的每一行添加内边距和边框样式：

```css
.row {
  padding: 0.5rem;
  border: 1px solid #ddd;
}
```

几个月后，你可能会忘记这些样式，然后又在另一个组件中使用了同样的类名：

```css
.row {
  color: red;
}
```

此时，新组件会继承之前定义的内边距和边框样式，导致意外的视觉效果。虽然可以使用更长的类名或更加明确的选择器来减少这种冲突，但无法完全避免。

CSS-in-JS 可以通过 **局部作用域样式** 完全解决这个问题。例如：

```jsx | pure
import styled from 'styled-components'

const StyledRow = styled.div`
  padding: 0.5rem;
  border: 1px solid #ddd;
`

const AnotherStyledRow = styled.div`
  color: red;
`

function App() {
  return (
    <div>
      <StyledRow>First Row</StyledRow>
      <AnotherStyledRow>Second Row</AnotherStyledRow>
    </div>
  )
}
```

在这个例子中，StyledRow 和 AnotherStyledRow 是两个不同的组件，它们的样式不会互相影响。这样就避免了传统 CSS 中类名冲突的问题。

**2. 代码位置一致性 (Colocation)：**

在使用传统 CSS 时，样式文件通常存放在 `src/styles` 目录中，而 React 组件文件则位于 `src/components` 目录中。随着项目的增长，难以追踪哪些样式作用于哪些组件，导致样式代码冗余。

**更好的代码组织方式是将相关文件放在一起**。使用 CSS-in-JS，可以直接在 React 组件内部书写样式，从而提高项目的可维护性。例如：

```jsx | pure
import React from 'react'
import styled from 'styled-components'

const StyledComponent = styled.div`
  background-color: lightblue;
  padding: 20px;
  border-radius: 5px;
`

function MyComponent() {
  return <StyledComponent>My Styled Component</StyledComponent>
}
```

**3. 在样式中使用 JavaScript 变量：**

CSS-in-JS 允许在样式中访问 JavaScript 变量，如下例所示：

```jsx
import React from 'react'
import styled from 'styled-components'

// 定义 JavaScript 变量
const primaryColor = 'papayawhip'
const paddingSize = '1rem'

// 在样式中使用 JavaScript 变量
const StyledButton = styled.button`
  background-color: ${primaryColor};
  padding: ${paddingSize};
  border: none;
  border-radius: 5px;
  color: palevioletred;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: palevioletred;
    color: ${primaryColor};
  }
`

function App() {
  return <StyledButton>Click Me</StyledButton>
}

export default App
```

在这个例子中，我们定义了两个 JavaScript 变量 `primaryColor` 和 `paddingSize`，并在 StyledButton 的样式中使用了这些变量。这样可以更方便地管理和复用样式，同时**避免硬编码的值散布在代码中**。

### 缺点

1. **运行时性能问题**：在组件渲染时，CSS-in-JS 库会在运行时将样式代码序列化为可插入文档的 CSS，这会消耗更多的 CPU 性能。
2. **增加包体积**：每个访问你网站的用户都需要加载 CSS-in-JS 的 JavaScript 代码，这会增加包体积。
3. **影响 React DevTools 的可读性**。
4. **频繁插入 CSS 样式规则会迫使浏览器做更多的工作**。
5. **增加项目出错的概率**，特别是在服务器端渲染（SSR）或组件库项目中。

## styled-components 手册

### 基本用法

```jsx
import styled from 'styled-components'

const Button = styled.button`
  background: papayawhip;
  color: palevioletred;
  font-size: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  &:hover {
    background: palevioletred;
    color: papayawhip;
    border: 2px solid papayawhip;
    cursor: pointer;
  }
`

export default () => {
  return (
    <>
      <Button>hello styled-components</Button>
    </>
  )
}
```

### 使用 Props

```jsx
import styled from 'styled-components'

const Button = styled('button')`
  background: ${(props) => (props.$primary ? '#BF4F74' : 'white')};
  color: ${(props) => (props.$primary ? 'white' : '#BF4F74')};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #bf4f74;
  border-radius: 3px;
`

export default () => {
  return (
    <>
      <Button>Default Button</Button>
      <Button $primary>Primary Button</Button>
    </>
  )
}
```

### 扩展样式

```jsx
import styled from 'styled-components'

const Button = styled('button')`
  background: ${(props) => (props.$primary ? '#BF4F74' : 'white')};
  color: ${(props) => (props.$primary ? 'white' : '#BF4F74')};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #bf4f74;
  border-radius: 3px;
`

const DashedButton = styled(Button)`
  border-style: dashed;
  color: black;
`

export default () => {
  return (
    <>
      <Button>Default Button</Button>
      <Button $primary>Primary Button</Button>
      <DashedButton>Dashed Button</DashedButton>
    </>
  )
}
```

### 使用 as 属性

```jsx
import styled from 'styled-components'

const Button = styled('button')`
  background: 'white';
  // a 链接颜色会覆盖
  color: '#BF4F74';
  // 由于这些样式是基于组件的 props 动态生成的，它们通常会在 CSS 中的后面部分渲染，从而具有较高的优先级。
  // a 链接颜色不会覆盖
  // color: ${(props) => (props.$primary ? 'white' : '#BF4F74')};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #bf4f74;
  border-radius: 3px;
`

const ReversedButton = (props) => (
  <Button {...props} children={props.children.split('').reverse()} />
)

const CustomLink = styled.a`
  color: #bf4f74;
  text-decoration: none;
  font-weight: bold;
`

const ForwardedButton = (props) => (
  <Button {...props} as={props.forwardAs || 'button'} />
)

export default () => {
  return (
    <>
      <Button as={'a'} href="#">
        Link with Default Button
      </Button>
      <Button as={ReversedButton}>
        Custom Button with Normal Button styles
      </Button>
      <ForwardedButton forwardAs={CustomLink} href="#">
        ForwardAs Custom Link
      </ForwardedButton>
    </>
  )
}
```

### 扩展 React 组件

我们使用 styled components 还可以处理用常规方式构建的 React 组件。

假如我们有如下的 react 组件：

```jsx ｜ pure
const OldComponent = () => {
  return (
    <div>
      <h2>hello world</h2>
    </div>
  )
}
```

如果我们想通过 styled components 对其处理，我们需要对其做一下改造。**需要在 props 中接受 className，并且将其放置到组件的根元素上**，然后就可以利用 styled components 嵌套样式对其内部的元素进行样式处理。

```jsx
import styled from 'styled-components'

const OldComponent = ({ className }) => {
  return (
    <div className={className}>
      <h2>hello world</h2>
    </div>
  )
}

const StyledOldComponent = styled(OldComponent)`
  h2 {
    color: green;
    text-align: center;
  }
`

export default () => <StyledOldComponent />
```

### 传递 props

如果样式化目标是一个简单元素（例如 styled.div ），styled-components 会将任何已知的 HTML 属性传递给 DOM。

如果它是一个自定义的 React 组件（例如 styled(MyComponent) ），styled-components 会将所有 props 传递。

```jsx
import styled from 'styled-components'

const MyInput = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: ${(props) => props.$inputColor ?? '#BF4F74'};
  background: papayawhip;
  border: none;
  border-radius: 3px;
`

export default () => {
  return (
    <>
      <MyInput defaultValue="@probablyup" type="text" />
      <MyInput defaultValue="@geelen" type="text" $inputColor="rebeccapurple" />
    </>
  )
}
```

注意 `$inputColor` 属性未传递给 DOM，但 type 和 defaultValue 是吗？ styled 函数足够智能，可以自动为您过滤非标准属性。

### 嵌套样式

```jsx
import styled from 'styled-components'

const Thing = styled.div`
  color: blue; // 默认颜色为蓝色

  &:hover {
    color: red; // 当 <Thing> 被悬停时，颜色变为红色
  }

  & ~ & {
    background: tomato; // <Thing> 作为同类元素的兄弟元素（但不一定紧邻），背景色为番茄红
  }

  & + & {
    background: lime; // <Thing> 紧邻下一个 <Thing>，背景色为青柠绿
  }

  &.something {
    background: orange; // <Thing> 带有附加 CSS 类 ".something"，背景色为橙色
  }

  .something-else & {
    border: 1px solid; // <Thing> 在另一个带有 ".something-else" 类的元素内，边框为 1px 实线
  }
`

// 导出一个默认的 React 组件
export default () => {
  return (
    <>
      <Thing>Hello world!</Thing>
      <Thing>How ya doing?</Thing>
      <Thing className="something">The sun is shining...</Thing>
      <div>Pretty nice day today.</div>
      <Thing>Don't you think?</Thing>
      <div className="something-else">
        <Thing>Splendid.</Thing>
      </div>
    </>
  )
}
```

### `attrs`

```jsx
import styled from 'styled-components'

const InputAttrs = styled.input.attrs((props) => ({
  // 定义静态属性
  type: 'text',
  // 定义动态属性
  $size: props.$size ?? '1em',
}))`
  color: #bf4f74;
  font-size: 1em;
  border: 2px solid #bf4f74;
  border-radius: 3px;

  /* 使用动态计算的属性 */
  margin: ${(props) => props.$size};
  padding: ${(props) => props.$size};
`

// attrs 覆盖
const InputPasswordAttrs = styled(InputAttrs).attrs({
  type: 'password',
})``

export default () => {
  return (
    <>
      <InputAttrs placeholder="A small text input" />
      <InputAttrs placeholder="A bigger text input" $size="2em" />
      <InputPasswordAttrs placeholder="A bigger password input" $size="2em" />
    </>
  )
}
```

### `css` 属性

有时候，您不想创建额外的组件来应用一点样式。 css 属性是一种方便的方式，可以在不确定固定组件边界的情况下对组件进行迭代。它适用于普通的 HTML 标签以及组件，并支持任何样式组件支持的所有内容，包括根据属性进行调整、主题和自定义组件。

> 要启用对 css 属性的支持，您必须使用 [Babel 插件](https://styled-components.com/docs/tooling#babel-plugin)。

```jsx | pure
import { css } from 'styled-components'

const MyButton = () => <button>Click me</button>

export default () => {
  return (
    <>
      <h3
        css={`
          background: papayawhip;
        `}
      >
        hello world
      </h3>
      <MyButton css="padding: 0.5em 1em;" />
    </>
  )
}
```

在幕后，Babel 插件将具有 css 属性的任何元素转换为样式化组件。例如，上面的代码变成：

```jsx | pure
import styled from 'styled-components';

const StyledDiv = styled.div`
  background: papayawhip;
`

const StyledButton = styled(Button)`
  padding: 0.5em 1em;
`

<StyledDiv />
<StyledButton />
```

### `createGlobalStyle`

```jsx
import { createGlobalStyle } from 'styled-components'

// 定义全局样式
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Arial', sans-serif;
  }

  h1 {
    color: #bf4f74;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`

// export default GlobalStyle;
// import GlobalStyle from './GlobalStyles';

// 这里为了方便演示，就不把全局样式单独抽离出来了。

const App = () => {
  return (
    <>
      <GlobalStyle /> {/* 应用全局样式 */}
      <div>
        <h1>Hello World</h1>
        <p>This is a paragraph.</p>
        <a href="#">This is a link</a>
      </div>
    </>
  )
}

export default App
```

注意事项：

- **样式覆盖**：由于 createGlobalStyle 定义的样式是全局的，所以它们会覆盖整个应用中所有匹配的元素。如果你在局部组件中定义了相同的样式规则，局部样式会覆盖全局样式。
- **性能**：虽然 createGlobalStyle 提供了方便的全局样式管理，但过多的全局样式可能会影响应用性能和样式管理的灵活性。建议在需要时合理使用。

### 使用 css 变量

```jsx
import styled, { createGlobalStyle } from 'styled-components'

// 定义全局样式，包括 CSS 变量
const GlobalStyle = createGlobalStyle`
  :root {
    --primary-color: #4ca;
    --secondary-color: #ff5722;
    --font-size: 16px;
  }
`

// 使用 CSS 变量定义按钮样式
const Button = styled.button`
  background-color: var(--primary-color);
  color: white;
  font-size: var(--font-size);
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: var(--secondary-color);
  }
`

const App = () => {
  return (
    <>
      <GlobalStyle />
      <div style={{ padding: '20px' }}>
        <Button>Click Me</Button>
      </div>
    </>
  )
}

export default App
```

### `&& 双和符号`

> && 双和符号指的是组件的一个实例。

```jsx
import styled, { css } from 'styled-components'

const Input = styled.input.attrs({ type: 'checkbox' })``

const Label = styled.label`
  align-items: center;
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
`

const LabelText = styled.span`
  ${(props) => {
    switch (props.$mode) {
      case 'dark':
        return css`
          background-color: black;
          color: white;
          ${Input}:checked + && {
            color: blue;
          }
        `
      default:
        return css`
          background-color: white;
          color: black;
          // && 双和符号指的是组件的一个实例
          /* && === LabelText*/
          ${Input}:checked + && {
            color: red;
          }
        `
    }
  }}
`

export default () => {
  return (
    <>
      <Label>
        <Input defaultChecked />
        <LabelText>Foo</LabelText>
      </Label>
      <Label>
        <Input />
        <LabelText $mode="dark">Foo</LabelText>
      </Label>
    </>
  )
}
```

> && 双和符号单独具有一种称为“优先级提升”的特殊行为。

假设我们有一个普通的 CSS 文件和一个使用 `styled-components` 创建的 React 组件。我们将展示如何在同一个组件中使用 `&&` 来提升 `styled-components` 的样式优先级。

普通 CSS 文件：

```css
/* styles.css */
.button {
  background-color: blue;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
}
```

使用 `styled-components` 的 React 组件：

```jsx | pure
// MyButton.js
import styled from 'styled-components'
import './styles.css' // 引入普通 CSS 文件

// 定义一个 styled-components 的 Button 组件
const StyledButton = styled.button`
  && {
    background-color: red; /* 提升优先级，确保背景色为红色 */
    color: black; /* 提升优先级，确保文字颜色为黑色 */
    padding: 15px; /* 提升优先级，确保内边距为 15px */
  }
`

// 在组件中使用普通 CSS 类和 styled-components
const MyButton = () => {
  return (
    <div>
      <StyledButton className="button">Styled Button</StyledButton>
    </div>
  )
}

export default MyButton
```

在这个例子中，通过使用 `&&` 提升 `styled-components` 样式的优先级，我们确保了 `StyledButton` 组件的样式在与普通 CSS 文件中的 `.button` 类样式冲突时能够胜出。这样可以在处理复杂的样式冲突时提供更好的控制。

由于 styled-components 默认在 `<head>` 末尾在运行时注入其样式，即使不使用 `&&` 提升优先级，`styled-components` 的样式仍然会覆盖普通 CSS 文件中的样式。

## 处理动画

```jsx
import styled, { keyframes } from 'styled-components'

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

const Rotate = styled.div`
  display: inline-block;
  animation: ${rotate} 2s linear infinite;
  padding: 2rem 1rem;
  font-size: 1.2rem;
`

export default () => {
  return (
    <>
      <Rotate>Hello World</Rotate>
    </>
  )
}
```

## 添加主题
