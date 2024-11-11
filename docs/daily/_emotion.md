# Emotion 基础使用

> [说明：以下的介绍都来自于 Emotion 官方文档](https://emotion.sh/docs/introduction)

Emotion 有两种写 CSS 的方式：css-prop 和 Styled Components。

```sh
npm i @emotion/styled @emotion/react
```

## css Prop

### css Prop 添加样式示例

`@emotion/react` 的 `jsx` 是一个增强的 `React.createElement` 方法，它给 React 元素添加了一个 css Prop。

css Prop 可以在任何一个支持 className 的 Dom 元素或者组件上使用。

```jsx
/** @jsx jsx */
import { css, jsx } from '@emotion/react'

const color = 'darkgreen'

render(
  <div
    css={css`
      background-color: hotpink;
      &:hover {
        color: ${color};
      }
    `}
  >
    This has a hotpink background.
  </div>
)

// 或者如下写法

render(
  <div
    css={{
      backgroundColor: 'hotpink',
      '&:hover': {
        color: 'lightgreen'
      }
    }}
  >
    This has a hotpink background.
  </div>
)
```

### 开启 css Prop

css Prop 需要通过 babel-preset 或者 JSX Pragma 来实现。

#### babel-preset

**.babelrc：**

```json
{
  "presets": [["@babel/preset-react", { "runtime": "automatic", "importSource": "@emotion/react" }]],
  "plugins": ["@emotion/babel-plugin"]
}
```

**tsconfig.json：**

```json
{
  "compilerOptions": {
    ...
    // "jsx": "react",
    "jsxImportSource": "@emotion/react",
    ...
  }
}
```

#### JSX Pragma

通过添加注释来开启 css Prop。

```js
/** @jsx jsx */

// 不生效的时候可以改为

/** @jsxImportSource @emotion/react */
```

## Styled Components

```jsx
import styled from '@emotion/styled'

let SomeComp = styled.div({
  color: 'hotpink'
})

let AnotherComp = styled.div`
  color: ${props => props.color};
`

render(
  <SomeComp>
    <AnotherComp color="green" />
  </SomeComp>
)
```

Styled Components 的 Props Styled Components 生成的组件也可以根据传入的 Props 来更改样式

```jsx
import styled from '@emotion/styled'

const Button = styled.button`
  color: ${props => (props.primary ? 'hotpink' : 'turquoise')};
`

const Container = styled.div(props => ({
  display: 'flex',
  flexDirection: props.column && 'column'
}))

render(
  <Container column>
    <Button>This is a regular button.</Button>
    <Button primary>This is a primary button.</Button>
  </Container>
)
```

全局样式

```jsx
import { Global, css } from '@emotion/react'

render(
  <div>
    <Global
      styles={css`
        .some-class {
          color: hotpink !important;
        }
      `}
    />
    <Global
      styles={{
        '.some-class': {
          fontSize: 50,
          textAlign: 'center'
        }
      }}
    />
    <div className="some-class">This is hotpink now!</div>
  </div>
)
```

keyframes

```jsx
/** @jsx jsx */
import { jsx, css, keyframes } from '@emotion/react'

const bounce = keyframes`
  from, 20%, 53%, 80%, to {
    transform: translate3d(0,0,0);
  }

  40%, 43% {
    transform: translate3d(0, -30px, 0);
  }

  70% {
    transform: translate3d(0, -15px, 0);
  }

  90% {
    transform: translate3d(0,-4px,0);
  }
`

render(
  <div
    css={css`
      animation: ${bounce} 1s ease infinite;
    `}
  >
    some bouncing text!
  </div>
)
```

useTheme

```jsx
/** @jsx jsx */
import { jsx, ThemeProvider, useTheme } from '@emotion/react'
import styled from '@emotion/styled'

const theme = {
  colors: {
    primary: 'hotpink'
  }
}

function SomeText(props) {
  const theme = useTheme()
  return <div css={{ color: theme.colors.primary }} {...props} />
}

render(
  <ThemeProvider theme={theme}>
    <SomeText>some text</SomeText>
  </ThemeProvider>
)
```
