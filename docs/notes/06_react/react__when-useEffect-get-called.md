---
title: useEffect 回调何时执行？
toc: content
group:
  title: 术
  order: -2
---

## useEffect 在嵌套组件中的行为模式

对于如下组件，`console.log` 的打印顺序是什么？

```jsx | pure
import { useEffect, useState } from 'react';

function App() {
  const [count, setCount] = useState(1);
  console.log(1);

  useEffect(() => {
    console.log(2);
    return () => {
      console.log(3);
    };
  }, [count]);

  useEffect(() => {
    console.log(4);
    setCount((count) => count + 1);
  }, []);

  return <Child count={count} />;
}

function Child({ count }) {
  useEffect(() => {
    console.log(5);
    return () => {
      console.log(6);
    };
  }, [count]);

  return null;
}

export default App;
```

> 前往 [Deeper Dive Into React](https://jser.pro/ddir/quiz/ddir-rq-02-useeffect) 体验交互式答题。

<details><summary><b>点击展示答案</b></summary>

![20240620051637](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/20240620051637.png)

</details>

## 深入了解各种 Effects

对于如下组件，`console.log` 的打印顺序是什么？

```jsx | pure
import { useEffect, useState, useLayoutEffect, useInsertionEffect } from 'react';

function App() {
  console.log(1);
  const [state, setState] = useState(0);

  useEffect(() => {
    setState((state) => state + 1);
  }, []);

  useEffect(() => {
    console.log(2);
    return () => {
      console.log(3);
    };
  }, [state]);

  useEffect(() => {
    console.log(4);
    return () => {
      console.log(5);
    };
  }, [state]);

  useLayoutEffect(() => {
    console.log(6);
    return () => {
      console.log(7);
    };
  }, [state]);

  useInsertionEffect(() => {
    console.log(8);
    return () => {
      console.log(9);
    };
  }, [state]);

  console.log(10);
  return null;
}

export default App;
```

> 前往 [Deeper Dive Into React](https://jser.pro/ddir/quiz/ddir-rq-04-effects) 体验交互式答题。

<details><summary><b>点击展示答案</b></summary>

![20240620055946](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/20240620055946.png)

</details>

## 探索浏览器异步 API 如何影响 useEffect 的行为

对于如下组件 100ms 后点击 `button`，`console.log` 的打印顺序是什么？

```jsx | pure
/**
 * iframe: true
*/

import { useEffect, useState } from 'react';

function App() {
  const [state, setState] = useState(0);
  console.log(1);

  useEffect(() => {
    console.log(2);
  }, [state]);

  Promise.resolve().then(() => {
    console.log(3);
  });

  setTimeout(() => {
    console.log(4);
  }, 0);

  const onClick = () => {
    console.log(5);
    setState((num) => num + 1);
    console.log(6);
  };

  return (
    <div>
      <button onClick={onClick}>
        Click the button after 100ms
      </button>
    </div>
  );
}

export default App;
```

> 前往 [Deeper Dive Into React](https://jser.pro/ddir/quiz/ddir-rq-03-useeffect-timing) 体验交互式答题。

<details><summary><b>点击展示答案</b></summary>

![20240620064019](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/20240620064019.png)

</details>

## React 时间切片对 useEffect 行为模式的影响

> React 内部为每个工作单元的渲染设置了超时。

对于如下组件，`console.log` 的打印顺序是什么？

```jsx | pure
import { useEffect, useState } from 'react';

function App() {
  const [state] = useState(0);
  console.log(1);

  // 一段占用 react 50 ms 的任务
  const start = Date.now();
  while (Date.now() - start < 50) {
    window.timestamp = Date.now();
  }

  useEffect(() => {
    console.log(2);
  }, [state]);

  Promise.resolve().then(() => {
    console.log(3);
  });

  setTimeout(() => {
    console.log(4);
  }, 0);

  return null;
}

export default App;
```

> 前往 [Deeper Dive Into React](https://jser.pro/ddir/quiz/ddir-rq-13-time-slicing) 体验交互式答题。

<details><summary><b>点击展示答案</b></summary>

![20240620060954](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/20240620060954.png)

</details>

## useEffect 回调的运行受多种因素影响

对于如下组件，`console.log` 的打印顺序是什么？

```jsx | pure
/**
 * iframe: true
*/

import { useEffect, useState, useLayoutEffect } from 'react';

function App() {
  const [state, setState] = useState(0);
  console.log(1);

  // 一段占用 react 50 ms 的任务
  const start = Date.now();
  while (Date.now() - start < 50) {
    window.timestamp = Date.now();
  }

  useEffect(() => {
    console.log(2);
  }, [state]);

  Promise.resolve().then(() => {
    console.log(3);
  });

  setTimeout(() => {
    console.log(4);
  }, 0);

  useLayoutEffect(() => {
    console.log(5);
    setState((state) => state + 1);
  }, []);

  return null;
}

export default App;
```

> 前往 [Deeper Dive Into React](https://jser.pro/ddir/quiz/ddir-rq-14-useeffect-hoisted) 体验交互式答题。

<details><summary><b>点击展示答案</b></summary>

![20240620062316](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/20240620062316.png)

</details>
