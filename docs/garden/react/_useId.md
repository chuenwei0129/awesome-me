---
title: useId
toc: content
group:
  title: 深入探讨
---

看看如下组件有什么问题：

```jsx | pure
// App.tsx
const id = Math.random();

export default function App() {
  return <div id={ id }>Hello</div>
}
```

如果应用是 CSR（客户端渲染），id 是稳定的，App 组件没有问题。

但如果应用是 SSR（服务端渲染），那么 `App.tsx` 会经历：

- React在服务端渲染，生成随机id（假设为`0.1234`），这一步叫 dehydrate（脱水）。
- `<div id="0.1234">Hello</div>` 作为HTML传递给客户端，作为首屏内容。
- React在客户端渲染，生成随机id（假设为 `0.6789`），这一步叫 hydrate（注水）。

客户端、服务端生成的 id 不匹配！
