---
nav:
  second:
    title: React
    order: 1
title: 这是什么？
group:
  title: 介绍
  order: -999
---

> 我一直觉得掌握一个东西最有效的方法就是先 break it，知道它为什么坏，就能了解当前的设计到底是在解决什么问题。

# React 文档摆烂不是一天两天了

> 别问，问就是程序员最擅长写文档

## React Hooks

- [React useEvent RFC](https://github.com/reactjs/rfcs/blob/useevent/text/0000-useevent.md)
- [精读 useEffect 完全指南](https://zhuanlan.zhihu.com/p/60277120)
- [React 新文档：不要滥用 Ref 哦～](https://zhuanlan.zhihu.com/p/529491295)
- [React Hooks 使用误区，驳官方文档](https://zhuanlan.zhihu.com/p/450513902)
- [如何看待《React Hooks 使用误区，驳官方文档》？](https://www.zhihu.com/question/508780830/answer/2486581940)
- [React 18 全览](https://zhuanlan.zhihu.com/p/500072933)
- [在 React18 中请求数据的正确姿势](https://zhuanlan.zhihu.com/p/536624672)
- [React 18 对 Hooks 的影响](https://zhuanlan.zhihu.com/p/490929650)
- [React 推荐函数组件是纯函数，但是组件有状态就不可能是纯函数，怎么理解有状态的纯函数？](https://www.zhihu.com/question/537538929)

## React + Typescript

- [🔖TypeScript 备忘录：如何在 React 中完美运用？](https://juejin.cn/post/6910863689260204039)
- [Upgrading to React 18 with TypeScript](https://blog.logrocket.com/upgrading-react-18-typescript/)
- [React + TypeScript 常用类型汇总](https://mp.weixin.qq.com/s?__biz=Mzg3ODAyNDI0OQ==&mid=2247489283&idx=1&sn=2b49af5b171398db1821237ba1551ad1&chksm=cf1b5455f86cdd433210a386c1ae528e8a580fb4ce4931f83baa900205bc00caa63dfa369950&scene=178&cur_album_id=1791658055365935110#rd)

## React 生态

- [React Native](https://reactnative.dev/)
- [React Hook Form](https://react-hook-form.com/)
- [React Query](https://tanstack.com/query/v4/docs/overview)
- [React Table](https://tanstack.com/table/v8/docs/guide/introduction)

## 教程

- [可访问的 React 表单](https://www.carlrippon.com/accessible-react-forms/)

<!-- 顺序是父组件render>子组件render> 子组件useLayoutEffect>父组件useLayoutEffect>子组件useEffect>父组件useEffect

假如父组件 有 logCount 函数，使用 useLayoutEffect 版本的 useEvent 包裹，传给子组件作为 props ，则 子组件render 阶段 和 子组件useLayoutEffect 阶段因为执行在父组件 useLayoutEffect 之前， 这两个阶段子组件从props里读取的 logCount 函数不符合预期，是旧的。但因为是引用，所以当父组件 useLayoutEffect 执行完后，子组件 props里的 logCount 就符合预期了。这一点我认为不常见，但的确会有，只是答主表达的比较隐晦，难以get到。

而答主后文的意思是，需要有新hooks执行时机，保持在render之后，且先父组件后子组件执行。插入于原顺序为：父组件render>父组件新hooks>子组件render>子组件新hooks> 子组件useLayoutEffect>父组件useLayoutEffect 。。。 顺序执行 -->


<!-- <code src="../../../playground/react/gif.jsx"></code> -->

```jsx
/**
 * iframe: true
 * background: '#f6f7f9'
 */

import React, { useState, useEffect } from "react";

export default function App() {
  const [state] = useState(0);
  console.log(1);

  // 模拟一个耗时操作，大于 4 毫秒就把控制权教回给浏览器
  console.time("time");
  const start = Date.now();
  while (Date.now() - start < 50) {
    window.timestamp = Date.now();
  }
  console.timeEnd("time");
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
```

```jsx | pure
import { useState, useEffect, useLayoutEffect } from "react";

function App() {
  const [state, setState] = useState(0);

  console.log(1);

  const start = Date.now();
  while (Date.now() - start < 10) {
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

export default () => <App />;
```

受控与非受控
click the button 3 times



```jsx | pure
import { useState, useEffect } from "react";

function A() {
  console.log("A");
  return <B />;
}

function B() {
  console.log("B");
  return <C />;
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
  const [state, setState] = useState(0);
  useEffect(() => {
    setState((state) => state + 1);
  }, []);
  console.log("App");
  return (
    <div>
      <A state={state} />
      <D />
    </div>
  );
}

export default () => <App />;
```

```jsx | pure
import  { useState, useEffect } from "react";
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

export default () => <App />;
```

```jsx|pure
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
      <button onClick={onClick} data-testid="action">
        click me
      </button>
    </div>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
setTimeout(() => {
  const action = document.querySelector('[data-testid="action"]');
  fireEvent.click(action);
Click the button after 100ms
}, 100)
```

```jsx|pure
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
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
```

```jsx|pure
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { screen, fireEvent } from "@testing-library/dom";
function A() {
  console.log(2);
  return null;
}
function App() {
  const [_state, setState] = useState(false);
  console.log(1);
  return (
    <>
      <button
        onClick={() => {
          console.log("click");
          setState(true);
        }}
        data-testid="action"
      >
        click me
      </button>
      <A />
    </>
  );
}
ReactDOM.render(<App />, document.getElementById("root"));
const action = document.querySelector('[data-testid="action"]');
fireEvent.click(action);
fireEvent.click(action);
fireEvent.click(action);
```
