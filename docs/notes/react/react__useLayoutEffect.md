---
title: React useLayoutEffect
group:
  title: 深入探讨
---

在React中，`useLayoutEffect`和`useEffect`都是用来处理副作用的钩子（Hooks），但它们在组件渲染的生命周期中起作用的时机不同。为了理解`useLayoutEffect`的作用，我们需要先了解DOM更新和浏览器绘制的概念。

### DOM更新

DOM更新指的是当React组件的状态（state）或属性（props）发生变化时，React会重新计算虚拟DOM，并与上一次的虚拟DOM进行对比（这个过程称为Diffing）。根据对比的结果，React会确定哪些更改需要应用到实际的DOM上。这个过程称为DOM更新。它是React将更改反映到用户界面上的一步，但此时更改还没有真正应用到浏览器的视图上，即用户还看不到这些更改。

### 浏览器绘制

浏览器绘制（或渲染）是指浏览器根据最新的DOM结构和CSS样式计算出每个元素的布局（位置和大小），然后将它们绘制到屏幕上的过程。这个过程发生在DOM更新之后，是用户看到最终视觉结果的步骤。浏览器绘制通常是一个复杂且耗时的过程，因此避免不必要的绘制是提高网页性能的关键。

### useLayoutEffect 和 useEffect

- `useLayoutEffect`：这个钩子的调用时机是在DOM更新之后，但在浏览器绘制之前。这意味着你可以在此钩子中执行操作（如读取DOM布局信息或同步修改DOM），而不会引起额外的绘制。因为任何在`useLayoutEffect`中所做的更改都会在浏览器进行下一次绘制前完成，用户不会看到这中间的状态，避免了可能的闪烁或布局抖动现象。

- `useEffect`：这个钩子的调用时机是在浏览器完成绘制之后。它适用于那些不需要立即反映在屏幕上的副作用，比如数据请求、设置订阅以及手动修改DOM时不关心或不需要立即反映的更改。

总结来说，DOM更新是React计算并应用更改到DOM的过程，而浏览器绘制是这些更改被实际绘制到屏幕上的过程。`useLayoutEffect`允许你在浏览器绘制前同步修改DOM，以确保用户看到的是最终状态，从而避免不必要的视觉变化，而`useEffect`适用于不需要立即反映在屏幕上的副作用。

这是因为两者的执行顺序，简要分析下：

- useEffect 执行顺序：setCount 设置 => 在 DOM 上渲染 => useEffect 回调 => setCount 设置 => 在 DOM 上渲染。
- useLayoutEffect 执行顺序：setCount 设置 => useLayoutEffect 回调 => setCount 设置 => 在 DOM 上渲染。

可以看出，useEffect 实际进行了两次渲染，这样就可能导致浏览器再次回流和重绘，增加了性能上的损耗，从而会有闪烁突兀的感觉。

> 问：既然 useEffect 会执行两次渲染，导致回流和重绘，相比之下， useLayoutEffect 的效果要更好，那么为什么都用 useEffect 而不用 useLayoutEffect 呢？
>
> 答：根本原因还是同步和异步，虽然 useLayoutEffect 只会渲染一次，但切记，它是同步，类比于 Class 组件中，它更像 componentDidMount，因为它们都是同步执行。既然是同步，就有可能阻塞浏览器的渲染，而 useEffect 是异步的，并不会阻塞渲染。
>
> 其次，给用户的感觉不同，对比两者的执行顺序，useLayoutEffect 要经过本身的回调才设置到 DOM 上，也就是说， useEffect 呈现的速度要快于 useLayoutEffect，让用户有更快的感知。
>
> 最后，即使 useEffect 要渲染两次，但从效果上来看，变换的时间非常短，这样情况下，也无所谓，除非闪烁、突兀的感觉非常明显，才会去考虑使用 useLayoutEffect 去解决。

```jsx
/**
 * iframe: true
 *
*/
import { useState, useTransition } from "react";

const App = () => {
  const [isPending, startTransition] = useTransition();
  const [input, setInput] = useState("");
  const [list, setList] = useState([]);

  return (
    <>
      <input
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          startTransition(() => {
            const res = [];
            for (let i = 0; i < 50000; i++) {
              res.push(e.target.value);
            }
            setList(res);
          });
        }}
      />
      {isPending ? (
        <div>加载中...</div>
      ) : (
        list.map((item, index) => <div key={index}>{item}</div>)
      )}
    </>
  );
};

export default App;
```

```jsx
/**
 * iframe: true
 *
*/
import { useState, useTransition } from "react";

const App = () => {
  const [input, setInput] = useState("");
  const [list, setList] = useState([]);

  return (
    <>
      <input
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          const res = [];
          for (let i = 0; i < 50000; i++) {
            res.push(e.target.value);
          }
          setList(res);
        }}
      />
      {
        list.map((item, index) => <div key={index}>{item}</div>)
      }
    </>
  );
};

export default App;
```
