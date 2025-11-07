---
group:
  title: CSS
  order: 2
title: CSS-in-JS
toc: content
order: 13
---

## 什么是 CSS-in-JS

CSS-in-JS 是一种将 CSS 写在 JavaScript 文件里的技术方案，而不是传统的 `.css` 或 `.scss` 文件。这样可以在样式中使用 JavaScript 的变量、函数、条件判断等编程能力。

CSS-in-JS 与 React、Vue 等组件化框架的流行密不可分。特别是 React，由于没有官方的 CSS 方案，CSS-in-JS 在社区得到了广泛应用。常见的库包括 [styled-components](https://styled-components.com/) 和 [Emotion](https://emotion.sh/)。

CSS-in-JS 主要分为两类：

- **运行时类型**：在浏览器运行时生成样式（如 styled-components）
- **编译时类型**：在构建阶段生成静态 CSS（如 Linaria、vanilla-extract）

![CSS-in-JS 生态](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/me/20240611222731.png)

## 何时使用 CSS-in-JS

### ✅ 适用场景

**大型组件化应用**

- React/Vue 项目中需要严格的样式隔离
- 组件库开发，需要主题定制能力
- 多租户系统，需要运行时动态换肤

**复杂的动态样式需求**

- 样式需要根据大量 JavaScript 状态变化
- 需要在样式中使用复杂的业务逻辑
- 需要样式与组件逻辑紧密配合

**团队协作优势**

- 团队已熟悉 React/JavaScript 生态
- 希望样式和逻辑在同一文件中便于维护
- 需要利用 TypeScript 类型检查样式 props

### ❌ 不适用场景

**性能敏感的应用**

- 首屏加载速度要求极高（运行时方案有开销）
- 静态内容为主的网站（博客、文档站）
- 需要极致性能的移动端应用

**团队技术栈考虑**

- 团队更熟悉传统 CSS 方案
- 已有成熟的 Sass/Less/CSS Modules 体系
- 项目采用 Tailwind CSS 等原子化方案

**技术约束**

- 需要将样式提取为独立 CSS 文件（CDN 缓存）
- 服务端渲染 SSR 复杂度要求低
- 不希望增加额外的 JavaScript 包体积

### 🔄 替代方案对比

| 方案              | 适用场景         | 优势                      | 劣势                 |
| ----------------- | ---------------- | ------------------------- | -------------------- |
| **CSS-in-JS**     | 动态主题、组件库 | 完全隔离、JavaScript 集成 | 运行时开销、包体积大 |
| **CSS Modules**   | 中大型应用       | 零运行时、性能好          | 动态样式能力弱       |
| **Tailwind CSS**  | 快速开发         | 原子化、高复用            | HTML 可读性差        |
| **传统 CSS/Sass** | 简单项目         | 简单直接、无依赖          | 全局污染、难以维护   |

## 核心优缺点

### ✨ 主要优势

**1. 局部作用域样式（解决样式冲突）**

传统 CSS 容易出现类名冲突：

```css
/* 第一个组件 */
.row {
  padding: 0.5rem;
  border: 1px solid #ddd;
}

/* 几个月后，另一个组件 */
.row {
  color: red; /* 意外继承了上面的 padding 和 border */
}
```

CSS-in-JS 通过唯一类名完全解决这个问题：

```jsx | pure
import styled from 'styled-components';

const StyledRow = styled.div`
  padding: 0.5rem;
  border: 1px solid #ddd;
`;

const AnotherStyledRow = styled.div`
  color: red; /* 不会受其他组件影响 */
`;
```

**2. JavaScript 变量集成**

直接在样式中使用 JavaScript 变量和逻辑：

```jsx | pure
const primaryColor = 'papayawhip';
const paddingSize = '1rem';

const StyledButton = styled.button`
  background-color: ${primaryColor};
  padding: ${paddingSize};

  /* 基于 props 的动态样式 */
  color: ${(props) => (props.$variant === 'primary' ? 'white' : 'black')};

  &:hover {
    background-color: ${(props) =>
      props.$variant === 'primary' ? 'darkblue' : 'gray'};
  }
`;
```

**3. 代码组织的一致性（Colocation）**

相关代码放在一起，提高可维护性：

```jsx | pure
// Button.jsx - 样式和逻辑在同一文件
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: lightblue;
  padding: 20px;
`;

export function Button({ children }) {
  return <StyledButton>{children}</StyledButton>;
}
```

### ⚠️ 主要劣势（运行时方案）

**1. 性能开销**

- 运行时序列化样式消耗 CPU
- 增加 JavaScript 包体积（库本身 + 样式代码）
- 无法提取为独立 CSS 文件（影响缓存策略）
- 首次渲染需要等待 JS 解析和样式注入

**2. 开发体验问题**

- React DevTools 中的组件树可读性下降
- 样式错误可能导致整个应用崩溃（而传统 CSS 只是渲染错误）
- 调试时需要同时理解 JavaScript 和 CSS

**3. 服务端渲染 (SSR) 复杂度**

- 需要额外配置样式提取
- 容易出现样式闪烁问题
- 增加服务器端渲染负担

### 💡 如何选择

**优先考虑 CSS-in-JS 的情况：**

- 构建复杂的设计系统或组件库
- 需要强大的运行时主题切换能力
- 团队 JavaScript 技能强于 CSS 技能

**优先考虑其他方案的情况：**

- 性能是首要考虑（选择 CSS Modules 或编译时 CSS-in-JS）
- 简单的静态网站（选择传统 CSS）
- 快速原型开发（选择 Tailwind CSS）

## styled-components 手册

### 基本用法

```jsx
import styled from 'styled-components';

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
`;

export default () => {
  return (
    <>
      <Button>hello styled-components</Button>
    </>
  );
};
```

### 使用 Props

```jsx
import styled from 'styled-components';

const Button = styled('button')`
  background: ${(props) => (props.$primary ? '#BF4F74' : 'white')};
  color: ${(props) => (props.$primary ? 'white' : '#BF4F74')};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #bf4f74;
  border-radius: 3px;
`;

export default () => {
  return (
    <>
      <Button>Default Button</Button>
      <Button $primary>Primary Button</Button>
    </>
  );
};
```

### 扩展样式

```jsx
import styled from 'styled-components';

const Button = styled('button')`
  background: ${(props) => (props.$primary ? '#BF4F74' : 'white')};
  color: ${(props) => (props.$primary ? 'white' : '#BF4F74')};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #bf4f74;
  border-radius: 3px;
`;

const DashedButton = styled(Button)`
  border-style: dashed;
  color: black;
`;

export default () => {
  return (
    <>
      <Button>Default Button</Button>
      <Button $primary>Primary Button</Button>
      <DashedButton>Dashed Button</DashedButton>
    </>
  );
};
```

### 使用 as 属性

```jsx
import styled from 'styled-components';

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
`;

const ReversedButton = (props) => (
  <Button {...props} children={props.children.split('').reverse()} />
);

const CustomLink = styled.a`
  color: #bf4f74;
  text-decoration: none;
  font-weight: bold;
`;

export default () => {
  return (
    <>
      <Button as={'a'} href="#">
        Link with Default Button
      </Button>
      <Button as={ReversedButton}>
        Custom Button with Normal Button styles
      </Button>
    </>
  );
};
```

> If you choose to wrap another component with the styled() HOC that also accepts an "as" prop, use "forwardedAs" to pass along the desired prop to the wrapped component.

```jsx
import styled from 'styled-components';

// { as: Component = 'button' } 是一个使用了默认参数和重命名的解构赋值。如果调用 Button 时没有提供 as 属性，那么 Component 将默认为 'button'，即这个组件将默认渲染为一个 <button> 元素。
const Button = ({ as: Component = 'button', children, ...props }) => {
  return <Component {...props}>{children}</Component>;
};

const StyledButton = styled(Button)`
  background: blue;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
`;

const App = () => {
  return (
    <div>
      <StyledButton forwardedAs="a" href="#">
        Click me
      </StyledButton>
    </div>
  );
};

export default App;
```

### 扩展 React 组件

我们使用 styled components 还可以处理用常规方式构建的 React 组件。

假如我们有如下的 react 组件：

```jsx | pure
const OldComponent = () => {
  return (
    <div>
      <h2>hello world</h2>
    </div>
  );
};
```

如果我们想通过 styled components 对其处理，我们需要对其做一下改造。**需要在 props 中接受 className，并且将其放置到组件的根元素上**，然后就可以利用 styled components 嵌套样式对其内部的元素进行样式处理。

```jsx
import styled from 'styled-components';

const OldComponent = ({ className }) => {
  return (
    <div className={className}>
      <h2>hello world</h2>
    </div>
  );
};

const StyledOldComponent = styled(OldComponent)`
  h2 {
    color: green;
    text-align: center;
  }
`;

export default () => <StyledOldComponent />;
```

### 传递 props

如果样式化目标是一个简单元素 (例如 styled.div)，styled-components 会将任何已知的 HTML 属性传递给 DOM。

如果它是一个自定义的 React 组件 (例如 styled(MyComponent))，styled-components 会将所有 props 传递。

```jsx
import styled from 'styled-components';

const MyInput = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: ${(props) => props.$inputColor ?? '#BF4F74'};
  background: papayawhip;
  border: none;
  border-radius: 3px;
`;

export default () => {
  return (
    <>
      <MyInput defaultValue="@probablyup" type="text" />
      <MyInput defaultValue="@geelen" type="text" $inputColor="rebeccapurple" />
    </>
  );
};
```

注意 `$inputColor` 属性未传递给 DOM，但 type 和 defaultValue 是吗？styled 函数足够智能，可以自动为您过滤非标准属性。

### `Transient props`

在 `styled-components` 中，`Transient props` 是一种特殊的 prop，它允许你将 props 传递给样式组件，但不会将这些 props 传递给 DOM 元素。这在你想要使用 props 来控制样式但不想这些 props 出现在 HTML 输出中时非常有用。

`Transient props` 的命名规则是在 prop 名称前加上美元符号 `$`。这样，`styled-components` 就会知道这是一个临时 prop，并且不应该将它传递给生成的 DOM 元素。

假设你有一个按钮组件，你想根据 prop `variant` 来改变按钮的背景颜色，但你不希望这个 prop 出现在最终的 HTML 标签上。

```jsx
import styled from 'styled-components';

// 定义一个 StyledButton 组件
const StyledButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: ${(props) =>
    props.$variant === 'primary' ? 'blue' : 'gray'};
  color: white;

  &:hover {
    background-color: ${(props) =>
      props.$variant === 'primary' ? 'darkblue' : 'darkgray'};
  }
`;

function App() {
  return (
    <div>
      {/* 使用 StyledButton 并传递 variant 作为 transient prop */}
      <StyledButton $variant="primary">Primary Button</StyledButton>
      <StyledButton $variant="secondary">Secondary Button</StyledButton>
    </div>
  );
}

export default App;
```

在这个例子中，`$variant` 是一个临时 prop。它用于决定按钮的背景颜色，但不会被传递到渲染的 `<button>` 元素上。你可以检查浏览器的元素检查器，你会看到渲染出来的按钮元素上没有 `variant` 属性。

这种方式非常有用，因为它允许开发者通过 props 控制样式，同时保持生成的 HTML 的清洁和符合标准。

### `shouldForwardProp`

`shouldForwardProp` 的作用是允许开发者细粒度控制哪些 `props` 应该传递给底层的 DOM 元素。**这在使用第三方库或需要避免将无关的 React props 污染 DOM 时特别有用**。

`shouldForwardProp` 提供了一种比 `transient props` 更动态、更细粒度的过滤机制。`shouldForwardProp` 的工作方式类似于 `Array.filter` 的谓词回调。未通过测试的 prop 不会传递给底层组件，就像 `transient prop` 一样。

在下面的例子中，它用来阻止 `hidden prop` 被传递到 DOM，防止其默认行为影响组件的表现。

```jsx
import styled from 'styled-components';

const Comp = styled('div')
  .withConfig({
    shouldForwardProp: (prop) => !['hidden'].includes(prop),
  })
  .attrs({ className: 'foo' })`
  color: red;
  &.foo {
    text-decoration: underline;
  }
`;

const HiddenComp = styled('div').attrs({ className: 'foo' })`
  color: red;
  &.foo {
    text-decoration: underline;
  }
`;

export default () => {
  return (
    <>
      <Comp hidden>This is not a hidden Comp</Comp>
      <HiddenComp hidden>This is a hidden Comp</HiddenComp>
    </>
  );
};
```

请记住，正如这个例子中所示，其他可链式调用的方法应该总是在 `.withConfig` 之后执行。

### 嵌套样式

```jsx
import styled from 'styled-components';

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
`;

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
  );
};
```

### 通过 `.attrs` 传递 props 或 attributes

```jsx
import styled from 'styled-components';

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
`;

// attrs 覆盖
const InputPasswordAttrs = styled(InputAttrs).attrs({
  type: 'password',
})``;

export default () => {
  return (
    <>
      <InputAttrs placeholder="small text input" />
      <InputAttrs placeholder="bigger text input" $size="2em" />
      <InputPasswordAttrs placeholder="bigger password input" $size="2em" />
    </>
  );
};
```

### `CSS Prop`

当不想创建额外的组件，而是只为了应用一些样式时，`CSS Prop` 可以实现这一点。它适用于普通的 HTML 标签和组件，并支持任何 `styled-components 支持的特性`，包括基于 `props`、主题和自定义组件的调整。注意，为了使 `CSS Prop` 生效，需要用到 `styled-components` 提供的 [babel-plugin](https://styled-components.com/docs/tooling#babel-plugin)。

```jsx | pure
import { css } from 'styled-components';

const MyButton = () => <button>Click me</button>;

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
  );
};
```

在幕后，Babel 插件将具有 `CSS Prop` 的任何元素转换为样式化组件。例如，上面的代码变成：

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

除了上述用法之外，还有一种用法是提取多个 `styled-components` 组件会用到的共同样式，这样可以减少冗余代码。

```jsx
import styled, { css } from 'styled-components';

const mixinCommonCSS = css`
  border: 2px solid black;
  padding: 0.6rem;
  border-radius: 30px;
  cursor: pointer;
`;

const CommonButton = styled.button`
  color: red;
`;

const FusionCommonButton = styled.button`
  ${mixinCommonCSS}
  color: yellow;
`;

const StyledFusionCommonButton = styled(FusionCommonButton)`
  ${mixinCommonCSS}
  color: blue;
`;

export default () => {
  return (
    <>
      <CommonButton>CommonButton</CommonButton>
      <FusionCommonButton>FusionCommonButton</FusionCommonButton>
      <StyledFusionCommonButton>
        styledFusionCommonButton
      </StyledFusionCommonButton>
    </>
  );
};
```

### `createGlobalStyle` 定义全局样式

```jsx
/**
 * iframe: true
 */

import { createGlobalStyle } from 'styled-components';

// 定义全局样式
const GlobalStyle = createGlobalStyle`
  a {
    text-decoration: none;
    color: inherit;
  }
`;

// 这里为了方便演示，就不把全局样式单独抽离出来了。

const App = () => {
  return (
    <>
      <GlobalStyle /> {/* 应用全局样式 */}
      <div>
        <a href="#">This is a link</a>
      </div>
    </>
  );
};

export default App;
```

注意事项：

- **样式覆盖**：由于 createGlobalStyle 定义的样式是全局的，所以它们会覆盖整个应用中所有匹配的元素。如果你在局部组件中定义了相同的样式规则，局部样式会覆盖全局样式。
- **性能**：虽然 createGlobalStyle 提供了方便的全局样式管理，但过多的全局样式可能会影响应用性能和样式管理的灵活性。建议在需要时合理使用。

### 使用 css 变量

```jsx
/**
 * iframe: true
 */

import styled, { createGlobalStyle } from 'styled-components';

// 定义全局样式，包括 CSS 变量
const GlobalStyle = createGlobalStyle`
  :root {
    --my-primary-color: #4ca;
    --my-secondary-color: #ff5722;
  }
`;

// 使用 CSS 变量定义按钮样式
const Button = styled.button`
  background-color: var(--my-primary-color);
  color: white;
  font-size: var(--my-secondary-color);
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: var(--my-secondary-color);
  }
`;

const App = () => {
  return (
    <>
      <GlobalStyle />
      <div style={{ padding: '20px' }}>
        <Button>Click Me</Button>
      </div>
    </>
  );
};

export default App;
```

### `&& 双和符号`

> && 双和符号指的是组件的一个实例。

```jsx
import styled, { css } from 'styled-components';

const Input = styled.input.attrs({ type: 'checkbox' })``;

const Label = styled.label`
  align-items: center;
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
`;

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
        `;
      default:
        return css`
          background-color: white;
          color: black;
          // && 双和符号指的是组件的一个实例
          /* && === LabelText*/
          ${Input}:checked + && {
            color: red;
          }
        `;
    }
  }}
`;

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
  );
};
```

> && 双和符号单独具有一种称为 “优先级提升” 的特殊行为。

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
import styled from 'styled-components';
import './styles.css'; // 引入普通 CSS 文件

// 定义一个 styled-components 的 Button 组件
const StyledButton = styled.button`
  && {
    background-color: red; /* 提升优先级，确保背景色为红色 */
    color: black; /* 提升优先级，确保文字颜色为黑色 */
    padding: 15px; /* 提升优先级，确保内边距为 15px */
  }
`;

// 在组件中使用普通 CSS 类和 styled-components
const MyButton = () => {
  return (
    <div>
      <StyledButton className="button">Styled Button</StyledButton>
    </div>
  );
};

export default MyButton;
```

在这个例子中，通过使用 `&&` 提升 `styled-components` 样式的优先级，我们确保了 `StyledButton` 组件的样式在与普通 CSS 文件中的 `.button` 类样式冲突时能够胜出。这样可以在处理复杂的样式冲突时提供更好的控制。

由于 styled-components 默认在 `<head>` 末尾在运行时注入其样式，即使不使用 `&&` 提升优先级，`styled-components` 的样式仍然会覆盖普通 CSS 文件中的样式。

### 主题切换

**styled-components** 通过导出 `<ThemeProvider>` 组件从而能支持主题切换。`<ThemeProvider>` 是基于 React 的 Context API 实现的，可以为其下面的所有 React 组件提供一个主题。在渲染树中，任何层次的所有样式组件都可以访问提供的主题。例如：

```jsx
import styled, { ThemeProvider } from 'styled-components';

// 通过使用 props.theme 可以访问到 ThemeProvider 传递下来的对象
const Button = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;
  color: ${(props) => props.theme.main};
  border: 2px solid ${(props) => props.theme.main};
`;

// 为 Button 指定默认的主题
Button.defaultProps = {
  theme: {
    main: 'palevioletred',
  },
};

const theme = {
  main: 'mediumseagreen',
};

export default () => {
  return (
    <>
      <Button>Normal Button</Button>
      <ThemeProvider theme={theme}>
        <Button>ThemeProvider Button</Button>
      </ThemeProvider>
    </>
  );
};
```

`ThemeProvider` 的 `theme` 除了可以接受对象之外，还可以接受函数。函数的参数是父级的 `theme` 对象。此外，还可以通过使用 theme prop 来处理 `ThemeProvider` 未定义的情况 (这跟上面的 `defaultProps` 是一样的效果)，或覆盖 `ThemeProvider` 的 theme。例如：

```jsx
import styled, { ThemeProvider } from 'styled-components';

const DefaultButton = styled.button`
  color: ${(props) => props.theme.fg};
  border: 2px solid ${(props) => props.theme.fg};
  background: ${(props) => props.theme.bg};
`;

const theme = {
  fg: 'palevioletred',
  bg: 'white',
};

const invertTheme = ({ fg, bg }) => ({
  fg: bg,
  bg: fg,
});

export default () => {
  return (
    <>
      <DefaultButton theme={{ fg: 'red', bg: 'white' }}>
        Default Button
      </DefaultButton>
      <ThemeProvider theme={theme}>
        <div>
          <DefaultButton>Default Button with Theme</DefaultButton>
          {/* theme 接收的是一个函数，函数的参数是父级的 theme */}
          <ThemeProvider theme={invertTheme}>
            <DefaultButton>Default Button with Inverted Theme</DefaultButton>
          </ThemeProvider>
          {/* 覆盖 ThemeProvider的 theme */}
          <DefaultButton
            theme={{
              fg: 'red',
              bg: 'white',
            }}
          >
            Override Theme
          </DefaultButton>
        </div>
      </ThemeProvider>
    </>
  );
};
```

### 处理动画

```jsx
import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Rotate = styled.div`
  display: inline-block;
  animation: ${rotate} 2s linear infinite;
  padding: 2rem 1rem;
  font-size: 1.2rem;
`;

export default () => {
  return (
    <>
      <Rotate>Hello World</Rotate>
    </>
  );
};
```

### 媒体查询

```jsx
import styled from 'styled-components';

const MediaButton = styled.button`
  background-color: #4caf50; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;

  /* Media Queries */
  @media (max-width: 768px) {
    background-color: #555555; /* Darker background for smaller screens */
    font-size: 14px;
    padding: 12px 28px;
  }

  @media (max-width: 480px) {
    background-color: #333333; /* Even darker background for even smaller screens */
    font-size: 12px;
    padding: 10px 24px;
  }
`;

export default () => {
  return (
    <>
      <MediaButton>I am a Media Button</MediaButton>
    </>
  );
};
```

在 `styled-components` 中，“Component as Selector” 是指你可以将一个已经定义好的 `styled-component` 作为选择器来嵌套样式。这种方式让你可以在一个组件的样式中直接引用和修改另一个组件的样式。

这种方法的一个常见用例是当你想要在一个组件内部有条件地修改子组件的样式时。通过这种方式，你可以更好地组织和管理你的样式。

### Component as Selector

> 这种方法特别适用于当你想要在一个组件内部有条件地修改子组件的样式时。

下面是一个示例，展示如何在 `styled-components` 中使用 “Component as Selector”：

```jsx
// Button.js
import styled from 'styled-components';

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #3498db;
  color: white;

  &:hover {
    background-color: #2980b9;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20vh;
  background-color: #f0f0f0;

  /* 使用 Button 组件作为选择器 */
  ${Button} {
    color: red;

    /* 修改特定状态下的 Button 样式 */
    &:disabled {
      background-color: #bdc3c7;
      cursor: not-allowed;
    }
  }
`;

export default () => {
  return (
    <>
      <Button>不在 Container 中的 Button</Button>
      <Container>
        <Button>Enabled Button</Button>
        <Button disabled>Disabled Button</Button>
      </Container>
    </>
  );
};
```

在这个示例中，`Container` 组件将作为父容器，而 `Button` 组件将作为子组件被嵌套在其中。由于我们在 `Container` 的样式中使用了 `${Button}` 作为选择器，所以 `Button` 组件的 `margin` 和 `disabled` 状态下的样式都会被应用。
