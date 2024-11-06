---
title: React render
toc: content
group:
  title: 深入探讨
demo:
  cols: 2
---

## React render

## 从 两个 Demo 说起

对于如下两个 Demo，点击 Parent 组件的 button 按钮，触发更新，Son 组件都会打印 child render! 么？

```jsx
/**
 * title: 我是 Demo1
 */
import React from 'react';

function Son() {
  console.log('child render!');
  return <div>Son</div>;
}

function Parent(props) {
  const [count, setCount] = React.useState(0);

  return (
    <button
      onClick={() => {
        setCount(count + 1);
      }}
    >
      {props.children}
    </button>
  );
}

const App = () => {
  return (
    <Parent>
      <Son />
    </Parent>
  );
};

export default App;
```

```jsx
/**
 * title: 我是 Demo2
 */
import React from 'react';

function Son() {
  console.log('child render!');
  return <div>Son</div>;
}

function Parent() {
  const [count, setCount] = React.useState(0);

  return (
    <button onClick={() => {setCount(count + 1)}}><Son/></button>
  );
}

const App = () => {
  return (
    <Parent></Parent>
  );
};

export default App;
```

### 从 React 创建 Fiber 树说起

> bailout 这个词语，它可以简单理解成「是否重新渲染」（bail out of re-rendering）。

React 创建 Fiber 树时，每个组件对应的 fiber 都是通过如下两个逻辑之一创建的：

1. **render**：即调用render函数，根据返回的JSX创建新的fiber。
2. **bailout**：即满足一定条件时，React 判断该组件在更新前后没有发生变化，则复用该组件在上一次更新的 fiber 作为本次更新的fiber。

当命中 bailout 逻辑时，不会调用 render 函数。

### 进入 bailout 需满足的条件

什么情况下会进入 bailout 逻辑？需要同时满足以下四个条件：

1. `oldProps === newProps`

    即本次更新的 props 等于上次更新的 props。

    > 注意这里是全等比较。

    组件的 render 本身只是函数调用。

    组件 render 会返回 JSX，JSX 是 `React.createElement` 的语法糖。

    所以render的返回结果实际上是`React.createElement`的执行结果，即一个包含`props`属性的对象。

    **即使本次更新与上次更新 `props` 中每一项参数都没有变化，但是本次更新是 `React.createElement` 的执行结果，是一个全新的`props`引用**，所以`oldProps !== newProps`。

    **如果我们使用了`PureComponent`或`Memo`，那么在判断是render还是bailout时，会对`props`进行浅比较**。

2. `context` 没有变化

    即 `context` 的 `value` 没有变化。

3. `workInProgress.type === current.type`

    更新前后 `fiber.type` 是否变化，比如 `div` 是否变为 `p`。

4. `!includesSomeLane(renderLanes, updateLanes)`

    当前 fiber 上是否存在更新，如果存在那么更新的优先级是否和本次整棵fiber树调度的优先级一致？

    如果一致则进入render逻辑。如果不一致则进入 bailout 逻辑。

## React 如何重新渲染

对于如下组件，`console.log` 的打印顺序是什么？

```jsx | pure
import { useEffect, useState } from 'react';

function A() {
  console.log('A');
  return <B />;
}

function B() {
  console.log('B');
  return <C />;
}

function C() {
  console.log('C');
  return null;
}

function D() {
  console.log('D');
  return null;
}

export default function App() {
  const [state, setState] = useState(0);

  useEffect(() => {
    setState((state) => state + 1);
  }, []);

  console.log('App');

  return (
    <div>
      <A state={state} />
      <D />
    </div>
  );
}
```

> 前往 [Deeper Dive Into React](https://jser.pro/ddir/quiz/ddir-rq-01-rerender) 体验交互式答题。

<details><summary><b>点击展示答案</b></summary>

![20240620071932](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/20240620071932.png)

**图解**：

![react-re-renders](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/react-re-renders.gif)

这题容易出错的地方是 `D` 组件是否重新渲染，这里是 `App` 组件发起的更新，在 JSX 中解析到 `<D/>`，直接执行 `D()`，由于没有 `memo`，所以 `D` 组件中产生了新的 `props` 引用，不满足 `oldProps === newProps`。

</details>

## memo 有助于防止不必要的渲染

对于如下组件，`console.log` 的打印顺序是什么？

```jsx | pure
import { useEffect, useState, memo } from 'react';

function A() {
  console.log('A');
  return <B />;
}

const B = memo(() => {
  console.log('B');
  return <C />;
});

function C() {
  console.log('C');
  return null;
}

function D() {
  console.log('D');
  return null;
}

function App() {
  const [state, setState] = useState(0);

  useEffect(() => {
    setState((state) => state + 1);
  }, []);

  console.log('App');
  return (
    <div>
      <A />
      <D />
    </div>
  );
}

export default App;
```

> 前往 [Deeper Dive Into React](https://jser.pro/ddir/quiz/ddir-rq-06-rerender-memo) 体验交互式答题。

<details><summary><b>点击展示答案</b></summary>

![20240620075826](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/20240620075826.png)

**图解**：

![memo-re-renders](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/memo-re-renders.gif)

这题重点在于 `B` 组件是否重新渲染，这里是 `App` 组件发起的更新，JSX 解析到 `B` 组件时，由于 `B` 组件被 `memo` 包裹，会执行 `memo()`，对 `B` 组件中 `props` 进行浅比较，满足了 `oldProps === newProps`，再加上其他 3 个条件都满足，所以 `B` 组件进入 bailout 逻辑，不会重新渲染。

</details>

## Generally callback could be memoed

对于如下组件，`console.log` 的打印顺序是什么？

```jsx | pure
import { memo, useState } from 'react';

const A = memo(function A({ onClick }) {
  console.log('A');
  return (
    <button type="button" onClick={onClick}>
      click me
    </button>
  );
});

function App() {
  console.log('App', A);
  const [state, setState] = useState(0);
  return (
    <div>
      <A
        onClick={() => {
          setState((state) => state + 1);
        }}
      />
    </div>
  );
}

export default App;
```

> 前往 [Deeper Dive Into React](https://jser.pro/ddir/quiz/ddir-rq-11-callback) 体验交互式答题。

<details><summary><b>点击展示答案</b></summary>

![20240620081757](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/20240620081757.png)

**图解**：

![callback-memo](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/callback-memo.gif)

重写下 App 组件就更容易理解了：

```jsx | pure
function App() {
  console.log('App');
  const [state, setState] = useState(0);
  const handleClick = () => {
    setState((state) => state + 1);
  };
  return (
    <div>
      <A onClick={handleClick} />
    </div>
  );
}
```

`A` 组件中 `onClick` 属性是一个回调函数，点击 `button` 会触发回调，由于回调位于 `App` 组件，所以 `App` 组件有更新，触发重渲染，生成了新的 `handleClick`，由于 `memo` 了 `A` 组件，所以会对 `A` 组件的 `props` 浅比较，由于`{type: 'A', props: { onClick: handleClick } }` 中 `handleClick` 是新的引用，所以 `A` 组件也会重新渲染。

</details>

## 将元素移到父组件中可以帮助防止不必要的渲染

> 涉及 `children` 的题目时，应当从组件的 render 本身只是函数调用处着手。

对于如下两个组件，它们的 `console.log` 的打印顺序分别是什么？为什么？

**组件 1**：

```jsx | pure
import { useEffect, useState } from 'react';

function A({children}) {
  console.log('A');
  const [state, setState] = useState(0);
  useEffect(() => {
    setState((state) => state + 1);
  }, []);
  return children;
}

const B = () => {
  console.log('B');
  return <C />
}

const C = () => {
  console.log('C');
  return null
}

function D() {
  console.log('D');
  return null;
}

function App() {
  console.log('App');
  return (
    <div>
      <A>
        <B />
      </A>
      <D />
    </div>
  );
}

export default App;
```

<details><summary><b>点击展示答案</b></summary>

![20240620182744](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/20240620182744.png)

**解析**：

组件的 render 本身只是函数调用。所以整个代码可以简化成如下伪代码：

```js
(function App() {
  console.log('App setState');
  console.log('App');
  const A = (children) => {
    console.log('A');
    return children;
  };
  const B = () => {
    console.log('B');
    const C = () => {
      console.log('C');
      return null;
    };
    return C();
  };

  const D = () => {
    console.log('D');
    return null;
  };
  // 注意：用 js 模拟时是 B 先执行，A 后执行，实际上 react 中 A 先执行，B 后执行。
  let children = B();
  A(children);
  D();

  console.log('A setState');
  A(children);
})();

// App setState -> App -> B -> C -> A -> D -> A setState -> A
// 调换 A 与 B -> C 顺序可得 App setState -> App -> A -> B -> C -> D -> A setState -> A
// A -> B -> C -> D -> A
```

</details>

**组件 2**：

```jsx | pure
import { useEffect, useState } from 'react';

function A(props) {
  console.log('A');
  return props.children;
}

const B = () => {
  console.log('B');
  return <C />;
}

function C() {
  console.log('C');
  return null;
}

function D() {
  console.log('D');
  return null;
}

function App() {
  const [state, setState] = useState(0);
  useEffect(() => {
    setState((state) => state + 1);
  }, []);
  console.log('App');
  return (
    <div>
      <A>
        <B />
      </A>
      <D />
    </div>
  );
}

export default App;
```

<details><summary><b>点击展示答案</b></summary>

![20240620182556](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/20240620182556.png)

**解析**：

简化后的伪代码如下：

```js
function App() {
  console.log('App');
  const A = (children) => {
    console.log('A');
    return children;
  };
  const B = () => {
    console.log('B');
    const C = () => {
      console.log('C');
      return null;
    };
    return C();
  };

  const D = () => {
    console.log('D');
    return null;
  };
  // 注意：用 js 模拟时是 B 先执行，A 后执行，实际上 react 中 A 先执行，B 后执行。
  let children = B();
  A(children);
  D();
}

App();
App();

// App -> B -> C -> A -> D -> App -> B -> C -> A -> D
// 调换 A 与 B -> C 顺序可得 App -> A -> B -> C -> D -> App -> B -> C -> A -> D
```

</details>

## re-render & context

> 对于层级上祖先被 memorized bailout 的情况，新的 Context 特性依然可以订阅到 context data 的变化。

对于如下两个组件，它们的 `console.log` 的打印顺序分别是什么？为什么？

**组件 1**：

```jsx
import { createContext, useContext, useEffect, useState, memo } from 'react';

const Context = createContext(0);

const A = memo(() => {
  console.log('A');
  return <B />;
});

function B() {
  const count = useContext(Context);
  console.log('B');
  return null;
}

function C() {
  console.log('C');
  return null;
}

function App() {
  const [state, setState] = useState(0);
  useEffect(() => {
    setState((state) => state + 1);
  }, []);
  console.log('App');
  return (
    <Context.Provider value={state}>
      <A />
      <C />
    </Context.Provider>
  );
}

export default App;
```

> 前往 [Deeper Dive Into React](https://jser.pro/ddir/quiz/ddir-rq-09-rerender-context) 体验交互式答题。

<details><summary><b>点击展示答案</b></summary>

![20240620080858](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/20240620080858.png)

</details>

**组件 2**：

```jsx | pure
import { createContext, useContext, useEffect, useState } from "react";

const Context = createContext(0);

const A = ({ children }) => {
  const [state, setState] = useState(0);
  console.log("A");
  useEffect(() => {
    setState((state) => state + 1);
  }, []);
  return <Context.Provider value={state}>{children}</Context.Provider>;
};

function B({ children }) {
  const count = useContext(Context);
  console.log("B");
  return children;
}

function C() {
  console.log("C");
  return null;
}

function D() {
  console.log("D");
  return null;
}

function App() {
  console.log("App");
  return (
    <A>
      <B>
        <C />
      </B>
      <D />
    </A>
  );
}

export default App;
```

> 前往 [Deeper Dive Into React](https://jser.pro/ddir/quiz/ddir-rq-10-rerender-context-2) 体验交互式答题。

<details><summary><b>点击展示答案</b></summary>

![20240620081305](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/20240620081305.png)

</details>
