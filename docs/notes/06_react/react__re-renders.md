---
title: 重渲染刷题
toc: content
group:
  title: 术
demo:
  cols: 2
---

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
