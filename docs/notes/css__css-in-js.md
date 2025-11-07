---
group:
  title: CSS
  order: 2
title: CSS in JS
toc: content
---

## 什么是 CSS-in-JS

CSS-in-JS，顾名思义，将 CSS 写在 JS 文件里，而不是单独新建如 `.css`、`.scss` 等文件。这样就可以在 CSS 中使用 JS 的变量定义、函数调用、条件判断等功能。

CSS-in-JS 的流行与 React、Vue 等框架的流行密不可分。特别是 React，由于其没有自带的 CSS 方案，CSS-in-JS 在 React 社区得到了广泛讨论和应用。

实现 CSS-in-JS 的库有很多，每个库的实现、使用方式和语法也各不相同。常见的 CSS-in-JS 库包括 [styled-components](https://styled-components.com/docs/advanced#theming) 和 Emotion。除了**运行时类型**的 CSS-in-JS，还有**编译时类型**的实现。

![20240611222731](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/me/20240611222731.png)

## CSS-in-JS 的优缺点

### 优点

**1\. 局部作用域样式 (Locally-scoped styles)：**

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

CSS-in-JS 可以通过**局部作用域样式**完全解决这个问题。例如：

```jsx | pure
import styled from 'styled-components';

const StyledRow = styled.div`
  padding: 0.5rem;
  border: 1px solid #ddd;
`;

const AnotherStyledRow = styled.div`
  color: red;
`;

function App() {
  return (
    <div>
      <StyledRow>First Row</StyledRow>
      <AnotherStyledRow>Second Row</AnotherStyledRow>
    </div>
  );
}
```

在这个例子中，StyledRow 和 AnotherStyledRow 是两个不同的组件，它们的样式不会互相影响。这样就避免了传统 CSS 中类名冲突的问题。

**2\. 代码位置一致性 (Colocation)：**

在使用传统 CSS 时，样式文件通常存放在 `src/styles` 目录中，而 React 组件文件则位于 `src/components` 目录中。随着项目的增长，难以追踪哪些样式作用于哪些组件，导致样式代码冗余。

**更好的代码组织方式是将相关文件放在一起**。使用 CSS-in-JS，可以直接在 React 组件内部书写样式，从而提高项目的可维护性。例如：

```jsx | pure
import styled from 'styled-components';

const StyledComponent = styled.div`
  background-color: lightblue;
  padding: 20px;
  border-radius: 5px;
`;

function MyComponent() {
  return <StyledComponent>My Styled Component</StyledComponent>;
}
```

**3\. 在样式中使用 JavaScript 变量：**

CSS-in-JS 允许在样式中访问 JavaScript 变量，如下例所示：

```jsx
import styled from 'styled-components';

// 定义 JavaScript 变量
const primaryColor = 'papayawhip';
const paddingSize = '1rem';

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
`;

function App() {
  return <StyledButton>Click Me</StyledButton>;
}

export default App;
```

在这个例子中，我们定义了两个 JavaScript 变量 `primaryColor` 和 `paddingSize`，并在 StyledButton 的样式中使用了这些变量。这样可以更方便地管理和复用样式，同时**避免硬编码的值散布在代码中**。

### 运行时类型的 CSS-in-JS 的缺点

1. **运行时性能问题**：在组件渲染时，CSS-in-JS 库会在运行时将样式代码序列化为可插入文档的 CSS，这会消耗更多的 CPU 性能。
2. **增加包体积**：每个访问你网站的用户都需要加载 CSS-in-JS 的 JavaScript 代码，这会增加包体积。
3. **影响 React DevTools 的可读性**。
4. **频繁插入 CSS 样式规则会迫使浏览器做更多的工作**。
5. **增加项目出错的概率**，特别是在服务器端渲染 (SSR) 或组件库项目中。

## Styled Components 优点

> [官方网站](https://styled-components.com/docs/basics)将其优点归结为：

- **Automatic critical CSS**：`styled-components` 持续跟踪页面上渲染的组件，并自动注入样式。结合使用**代码拆分**，可以实现仅加载所需的最少代码。

- **解决了 class name 冲突**：`styled-components` 为样式生成唯一的 class name，开发者不必再担心 class name 重复、覆盖以及拼写的问题。(`CSS Modules` 通过哈希编码局部类名实现这一点)

- **CSS 更容易移除**：使用 `styled-components` 可以很轻松地知道代码中某个 class 在哪儿用到，因为每个样式都有其关联的组件。如果检测到某个组件未使用并且被删除，则其所有的样式也都被删除。

- **简单的动态样式**：可以很简单直观的实现根据组件的 `props` 或者全局主题适配样式，无需手动管理多个 classes。

- **无痛维护**：无需搜索不同的文件来查找影响组件的样式，无论代码多庞大，维护起来都是小菜一碟。

- **自动提供前缀**：按照当前标准写 CSS，其余的交给 `styled-components` 处理。

因为 `styled-components` 做的只是在 runtime 把 CSS 附加到对应的 HTML 元素或者组件上，它完美地支持所有 CSS。媒体查询、伪选择器，甚至嵌套都可以工作。

## styled-components 缺点

- 虽然 `styled-components` 提供了扩展样式的能力，但通过 `CSS Modules` 的组合 (Composition) 能力，或者 `SASS` 继承 mixin `@extend` 都可以做到。
- 虽然 `styled-components` 可以利用 `props` 对组件进行有条件的样式设置，这很符合 React 体系，并且利用了 JavaScript 的强大功能，然而，这也意味着风格更难解释，并且 CSS 同样也可以做到。

  ```jsx | pure
  // styled-components
  const ScButton = styled.button`
    background: ${props => props.primary ? '#f00' : props.secondary ? '#0f0' : '#00f'};
    color: ${props => props.primary ? '#fff' : props.secondary ? '#fff' : '#000'};
    opacity: ${props => props.active ? 1 : 0};
  `;

  <ScButton primary />
  <ScButton secondary />
  <ScButton primary active={true} />
  ```

  ```scss
  // & 基于 CSS 预处理器的能力
  button {
    background: #00f;
    opacity: 0;
    color: #000;

    &.primary,
    &.secondary {
      color: #fff;
    }
    &.primary {
      background: #f00;
    }
    &.secondary {
      background: #0f0;
    }
    &.active {
      opacity: 1;
    }
  }
  ```

- `styled-components` 允许在同一个文件中包含样式和 JavaScript。但是将样式和标记塞入一个文件中是一个可怕的解决方案，它不仅使版本控制难以跟踪，而且还很容易写出非常长的 JSX 代码。

- `styled-components` 能提升开发体验也是一个误区：当样式出现问题时，**整个应用程序将因长堆栈跟踪错误而崩溃**。而使用 CSS 时，“样式错误” 只会错误地呈现元素。此外，无效的样式会被简单地忽略，这可能导致比较难以调试的问题。

- `styled-components` 是运行时的方案，这会对前端性能产生不利影响，包括

  - `styled-components` 无法提取到静态 CSS 文件中，这意味着在 `styled-components` 解析样式并将它们添加到 DOM 之后，浏览器才能开始解释样式。
  - 缺少单独的文件意味着您无法单独缓存 CSS 和 JavaScript。

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

## styled-components 性能

> [只创建样式化组件，但不实例化组件，不会产生额外开销。](https://juejin.cn/post/7025156831504760839?searchId=2024061122495061B427C1AF2549FE83B8#heading-19)
