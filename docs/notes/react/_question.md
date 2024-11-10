---
title: 素材
toc: content
demo:
  cols: 2
---

## 为什么 ref、effect 被归类到「逃生舱」中？

这是因为二者操作的都是「脱离React控制的因素」。

effect中处理的是「副作用」。比如：在useEffect中修改了document.title。

document.title不属于React中的状态，React无法感知他的变化，所以被归类到effect中。

同样，「使DOM聚焦」需要调用element.focus()，直接执行DOM API也是不受React控制的。

虽然他们是「脱离React控制的因素」，但为了保证应用的健壮，React也要尽可能防止他们失控。

## 为什么多个 JSX 标签需要被一个父元素包裹？

JSX 虽然看起来很像 HTML，但在底层其实被转化为了 JavaScript 对象，**你不能在一个函数中返回多个对象**，除非用一个数组把他们包装起来。这就是为什么多个 JSX 标签必须要用一个父元素或者 Fragment 来包裹。

## 两个例子完全一样吗？

<code src="../../../playground/react/condition1"></code>
<code src="../../../playground/react/condition2"></code>

如果你之前是习惯面向对象开发的，你可能会认为上面的两个例子略有不同，因为其中一个可能会创建两个不同的 `<li>` “实例”。但 JSX 元素不是“实例”，因为它们没有内部状态也不是真实的 DOM 节点。**它们只是一些简单的描述，就像图纸一样**。所以上面这两个例子事实上是完全相同的。

## 批处理

**React 会等到事件处理函数中的** 所有 **代码都运行完毕再处理你的 state 更新。** 这就是为什么重新渲染只会发生在所有这些 `setNumber()` 调用 **之后** 的原因。

这让你可以更新多个 state 变量——甚至来自多个组件的 state 变量——而不会触发太多的 [重新渲染](https://react.docschina.org/learn/render-and-commit#re-renders-when-state-updates)。但这也意味着只有在你的事件处理函数及其中任何代码执行完成 **之后**，UI 才会更新。这种特性也就是 **批处理**，它会使你的 React 应用运行得更快。它还会帮你避免处理只更新了一部分 state 变量的令人困惑的“半成品”渲染。

**React 不会跨 _多个_ 需要刻意触发的事件（如点击）进行批处理** —— 每次点击都是单独处理的。请放心，React 只会在一般来说安全的情况下才进行批处理。这可以确保，例如，如果第一次点击按钮会禁用表单，那么第二次点击就不会再次提交它。

<code src="../../../playground/react/batch1"></code>

但是如果你想在下次渲染之前多次更新同一个 state，你可以像 `setNumber(n => n + 1)` 这样传入一个根据队列中的前一个 state 计算下一个 state 的 **函数**，而不是像 `setNumber(number + 1)` 这样传入 **下一个 state 值**。这是一种告诉 React “用 state 值做某事”而不是仅仅替换它的方法。

<code src="../../../playground/react/batch2"></code>

> `setState(x)` 实际上会像 `setState(n => x)` 一样运行，只是没有使用 `n`！

<code src="../../../playground/react/batch3"></code>
<code src="../../../playground/react/batch4"></code>

## 为什么在 React 中不推荐直接修改 state？

有以下几个原因：

- **调试**：如果你使用 `console.log` 并且不直接修改 state，你之前日志中的 state 的值就不会被新的 state 变化所影响。这样你就可以清楚地看到两次渲染之间 state 的值发生了什么变化
- **优化**：React 常见的 [优化策略](https://react.docschina.org/reference/react/memo) 依赖于如果之前的 props 或者 state 的值和下一次相同就跳过渲染。如果你从未直接修改 state ，那么你就可以很快看到 state 是否发生了变化。如果 `prevObj === obj`，那么你就可以肯定这个对象内部并没有发生改变。
- **新功能**：我们正在构建的 React 的新功能依赖于 state 被 [像快照一样看待](https://react.docschina.org/learn/state-as-a-snapshot) 的理念。如果你直接修改 state 的历史版本，可能会影响你使用这些新功能。
- **需求变更**：有些应用功能在不出现任何修改的情况下会更容易实现，比如实现撤销/恢复、展示修改历史，或是允许用户把表单重置成某个之前的值。这是因为你可以把 state 之前的拷贝保存到内存中，并适时对其进行再次使用。如果一开始就用了直接修改 state 的方式，那么后面要实现这样的功能就会变得非常困难。
- **更简单的实现**：React 并不依赖于 mutation ，所以你不需要对对象进行任何特殊操作。它不需要像很多“响应式”的解决方案一样去劫持对象的属性、总是用代理把对象包裹起来，或者在初始化时做其他工作。这也是为什么 React 允许你把任何对象存放在 state 中——不管对象有多大——而不会造成有任何额外的性能或正确性问题的原因。

<code src="../../../playground/react/withoutImmer"></code>
<code src="../../../playground/react/withImmer"></code>

### 局部 mutation 是可以接受的

```jsx
/**
 * iframe: true
 */

import { useState } from 'react';
export default function MovingDot() {
  const [position, setPosition] = useState({
    x: 0,
    y: 0
  });

  // 局部 mutation
  const handlePointerMove = e => {
    const nextPosition = {}
    nextPosition.x = e.clientX;
    nextPosition.y = e.clientY;
    setPosition(nextPosition);
  }

  return (
    <div
      onPointerMove={handlePointerMove}
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
      }}>
      <div style={{
        position: 'absolute',
        backgroundColor: 'red',
        borderRadius: '50%',
        transform: `translate(${position.x}px, ${position.y}px)`,
        left: -10,
        top: -10,
        width: 20,
        height: 20,
      }} />
    </div>
  );
}
```

## 受控组件和非受控组件

通常我们把包含“不受控制”状态的组件称为“非受控组件”。例如，最开始带有 `isActive` 状态变量的 `Panel` 组件就是不受控制的，因为其父组件无法控制面板的激活状态。

相反，当组件中的重要信息是由 `props` 而不是其自身状态驱动时，就可以认为该组件是“受控组件”。这就允许父组件完全指定其行为。最后带有 `isActive` 属性的 `Panel` 组件是由 `Accordion` 组件控制的。

非受控组件通常很简单，因为它们不需要太多配置。但是当你想把它们组合在一起使用时，就不那么灵活了。受控组件具有最大的灵活性，但它们需要父组件使用 `props` 对其进行配置。

在实践中，“受控”和“非受控”并不是严格的技术术语——通常每个组件都同时拥有内部状态和 `props`。然而，这对于组件该如何设计和提供什么样功能的讨论是有帮助的。

当编写一个组件时，你应该考虑哪些信息应该受控制（通过 `props`），哪些信息不应该受控制（通过 `state`）。当然，你可以随时改变主意并重构代码。

## 对 state 进行保留和重置

> 只要一个组件还被渲染在 UI 树的相同位置，React 就会保留它的 state。 如果它被移除，或者一个不同的组件被渲染在相同的位置，那么 React 就会丢掉它的 state。

```jsx
import { useState } from 'react';

function Counter() {
  const [score, setScore] = useState(0);

  return (
    <div>
      <h1>{score}</h1>
      <button onClick={() => setScore(score + 1)}>
        加一
      </button>
    </div>
  );
}

export default function App() {
  const [showB, setShowB] = useState(true);
  return (
    <div>
      <Counter />
      {showB && <Counter />}
      <label>
        <input
          type="checkbox"
          checked={showB}
          onChange={e => {
            setShowB(e.target.checked)
          }}
        />
        渲染第二个计数器
      </label>
    </div>
  );
}
```

> 相同位置的不同组件会使 state 重置（可以使用 key 重置状态：原地复用）

<code src="../../../playground/react/withoutKeyReuse"></code>
<code src="../../../playground/react/withKeyReuse"></code>

> 相同位置的不同组件会使 state 重置

```jsx
import { useState } from 'react';

function Counter() {
  const [score, setScore] = useState(0);

  return (
    <div>
      <h1>{score}</h1>
      <button onClick={() => setScore(score + 1)}>
        加一
      </button>
    </div>
  );
}

export default function App() {
  const [isPaused, setIsPaused] = useState(false);
  return (
    <div>
      {isPaused ? (
        <p>待会见！</p>
      ) : (
        <Counter />
      )}
      <label>
        <input
          type="checkbox"
          checked={isPaused}
          onChange={e => {
            setIsPaused(e.target.checked)
          }}
        />
        休息一下
      </label>
    </div>
  );
}
```

## 使用严格模式检测不纯的计算

尽管你可能还没使用过，但在 React 中，你可以在渲染时读取三种输入：[props](https://react.docschina.org/learn/passing-props-to-a-component)，[state](https://react.docschina.org/learn/state-a-components-memory) 和 [context](https://react.docschina.org/learn/passing-data-deeply-with-context)。你应该始终将这些输入视为只读。

当你想根据用户输入 _更改_ 某些内容时，你应该 [设置状态](https://react.docschina.org/learn/state-a-components-memory)，而不是直接写入变量。当你的组件正在渲染时，你永远不应该改变预先存在的变量或对象。

React 提供了 “严格模式”，在严格模式下开发时，它将会调用每个组件函数两次。**通过重复调用组件函数，严格模式有助于找到违反这些规则的组件**。

**纯函数仅仅执行计算，因此调用它们两次不会改变任何东西** — 就像两次调用 `double(2)` 并不会改变返回值，两次求解 `y = 2x` 不会改变 `y` 的值一样。相同的输入，总是返回相同的输出。

## useReducer

```jsx | pure
import { useState } from 'react';

export function useReducer(reducer, initialState) {
  const [state, setState] = useState(initialState);

  function dispatch(action) {
    const nextState = reducer(state, action);
    setState(nextState);
  }

  return [state, dispatch];
}
```

> 如何将 useState 重构成 useReducer

<code src="../../../playground/react/withoutReducer2"></code>

<code src="../../../playground/react/withReducer"></code>

> 结合使用 reducer 和 context

<code src="../../../playground/react/withContextReducer"></code>

## useRef 内部是如何运行的？

尽管 `useState` 和 `useRef` 都是由 React 提供的，原则上 `useRef` 可以在 `useState` **的基础上** 实现。 你可以想象在 React 内部，`useRef` 是这样实现的：

```jsx | pure
// React 内部
function useRef(initialValue) {
  const [ref, unused] = useState({ current: initialValue });
  return ref;
}
```

第一次渲染期间，`useRef` 返回 `{ current: initialValue }`。 该对象由 React 存储，因此在下一次渲染期间将返回相同的对象。 请注意，在这个示例中，state 设置函数没有被用到。它是不必要的，因为 `useRef` 总是需要返回相同的对象！

React 提供了一个内置版本的 `useRef`，因为它在实践中很常见。 但是你可以将其视为没有设置函数的常规 state 变量。 如果你熟悉面向对象编程，ref 可能会让你想起实例字段 —— 但是你写的不是 `this.something`，而是 `somethingRef.current`。

## React 为何侧重于纯函数?

编写纯函数需要遵循一些习惯和规程。但它开启了绝妙的机遇：

- 你的组件可以在不同的环境下运行 — 例如，在服务器上！由于它们针对相同的输入，总是返回相同的结果，因此一个组件可以满足多个用户请求。
- 你可以为那些输入未更改的组件来 [跳过渲染](https://react.docschina.org/reference/react/memo)，以提高性能。这是安全的做法，因为纯函数总是返回相同的结果，所以可以安全地缓存它们。
- 如果在渲染深层组件树的过程中，某些数据发生了变化，React 可以重新开始渲染，而不会浪费时间完成过时的渲染。纯粹性使得它随时可以安全地停止计算。

我们正在构建的每个 React 新特性都利用到了纯函数。从数据获取到动画再到性能，保持组件的纯粹可以充分释放 React 范式的能力。

## Fragment 语法的简写形式 `<> </>` 无法接受 key 值

如果你想让每个列表项都输出多个 DOM 节点而非一个的话，该怎么做呢？

Fragment 语法的简写形式 `<> </>` 无法接受 key 值，所以你只能要么把生成的节点用一个 `<div>` 标签包裹起来，要么使用长一点但更明确的 `<Fragment>` 写法：

```jsx
import { Fragment } from 'react';

function PeopleList({ people }) {
  const listItems = people.map(person =>
    <Fragment key={person.id}>
      <h1>{person.name}</h1>
      <p>{person.bio}</p>
    </Fragment>
  );

  return (
    <>
      {listItems}
    </>
  );
}

const peopleData = [
  { id: 1, name: "Alice", bio: "Alice is a software engineer." },
  { id: 2, name: "Bob", bio: "Bob is a designer." }
];

function App() {
  return (
    <PeopleList people={peopleData} />
  );
}

export default App;
```

这里的 Fragment 标签本身并不会出现在 DOM 上，这串代码最终会转换成 `<h1>`、`<p>`、`<h1>`、`<p>`…… 的列表。

[Vue和React的这个行为各是出于什么考虑？](https://www.zhihu.com/question/543057656/answer/2575930077)


[React 推荐函数组件是纯函数，但是组件有状态就不可能是纯函数，怎么理解有状态的纯函数？](https://www.zhihu.com/question/537538929)

hooks 在思维模型上只是组件函数的参数的另一种写法，函数组件只是一个接受参数 `(props, [state1, setState1], [state2, setState2], ...restHooks)` 然后返回 jsx 的纯函数。

**那 hooks 不能放 if 里面就是自然而然的了 —— 一个函数有多少个参数、各个参数的顺序是什么，这应当是永远不会变的，不能允许它在每次调用时都可能不同。**

函数组件并不会调用 `setState`，调用 `setState` 的是用户行为触发的回调函数，它已经脱离了函数组件本身的作用域了。

```js
function pure() {
  return () => console.log(...)
}
```

不能说因为 `pure` 返回的回调函数有副作用，所以 `pure` 本身有副作用。

## 闭包陷阱

```js
function Chat() {
  const [text, setText] = useState('')

  const onClick = useCallback(() => {
    // 只执行一次 text 是第一次执行时的值 text === ''
    sendMessage(text)
    // 添加 text 依赖项，每当 text 变化，useCallback 会返回一个全新的 onClick 引用，但这样就失去了 useCallback「缓存函数引用」的作用。
  }, [])

  return <SendButton onClick={onClick} />
}
```

我们期望点击后 `sendMessage` 能传递 `text` 的最新值。

然而实际上，由于回调函数被 `useCallback` 缓存，形成闭包，所以点击的效果始终是 `sendMessage('')`。

这就是：**「闭包陷阱」**。

> [React 官方团队出手，补齐原生 Hook 短板](https://zhuanlan.zhihu.com/p/509972998)

## 事件

> [合成事件层太厚了](https://www.zhihu.com/question/316425133/answer/673451425)

在 v17 之前，整个应用的事件会冒泡到同一个根节点（html DOM 节点）。而在 v17 之后，每个应用的事件都会冒泡到该应用自己的根节点（ReactDOM.render 挂载的节点）。

> [给女朋友讲 React18 新特性：Automatic batching](https://zhuanlan.zhihu.com/p/382216973)

### tearing

[撕裂](https://en.wikipedia.org/wiki/Screen_tearing)（tearing）是图形编程中的一个传统术语，是指视觉上的不一致。

**撕裂通常是由于 React 使用了外部的状态导致的。React 在并发渲染过程中，这些外部的状态会发生变化，但是 React 却无法感知到变化。**

假设我们有一个外部 store，初始颜色是蓝色。在我们的应用中组件树中有多个组件都依赖于 store 的值。

假设组件树的渲染需要 400 ms，在渲染到 100 ms 时，假设一个用户点击了按钮，将 store 的颜色由蓝色改为红色。

在非并发渲染场景下，不会发生任何处理。因为组件树的渲染是同步的。用户的点击事件会在视图渲染完成后执行。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/fe-engineering/0c371a43388a4ce29eba5a7deb888c85_tplv-k3u1fbpfcp-zoom-in-crop-mark_1304_0_0_0.webp)

但是在并发渲染场景下，React 可以让点击发生反应，打断视图渲染。此时很有可能因为时间分片的原因，前 100ms 有一些组件已经完成了渲染，引用的 store 值是蓝色，剩下 300ms 渲染的组件引用的 store 值是红色，这些组件虽然读取同一个数据却显示出不同的值，这种边缘情况就是 “撕裂”。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/fe-engineering/e758382e98814f5ab364e85ec3524ef9_tplv-k3u1fbpfcp-zoom-in-crop-mark_1304_0_0_0.webp)



## 非受控模式

代码设置表单的初始 value，但是能改变 value 的只有用户，代码通过监听 onChange 来拿到最新的值，或者通过 ref 拿到 dom 之后读取 value。

```jsx | pure
export default function App() {
  return (
    <>
      <input
        type="text"
        defaultValue={'初始值'}
        onChange={(e) => console.log('非受控模式：', e.target.value)}
      />
    </div>
  )
}
```

## [为什么说 immutable 是 React 的核心，如何理解这一概念？](https://www.zhihu.com/question/446377023)

Vue 实际上和 React 核心区别就一个：数据不可变性

什么是数据的不可变性？

用最简单的方式距离，有一个对象 profile：

const profile = {
  age: 18,
  loginInfo: {
     username: "",
     password: ""
  }
}
现在你要修改这个 profile 对象，你能怎么修改？

// Vue
const changeName = (str)=>{
  profile.loginInfo.username = str
}
Vue 中，你可以直接修改属性，换言之 ——

行为（方法）总是会修改原本的属性
但是在 React 中却不可以：

let getProfile = ()=>profile
const changeName = (str)=>{
  const pre = getProfile()
  getProfile = ()=>({
     ...pre,
     loginInfo: {
        ...pre.loginInfo,
        username: str
     }
  })
}

// getProfile() 获取最新数据
React 中，每个行为，都会产生新的对象，换言之 ——

行为（方法）不会修改原本的对象属性，而是会产生新的对象
直观说明就是：

Vue：对象 -> 被函数1修改 -> 被函数2修改...

React: 对象 -> 函数1运行 -> 对象 -> 函数2运行...

而数据不变性，指的就是：

数据作为一个整体，从不会改变，不论是内部属性还是外部引用

在 React 中，新的视图由新的数据确定，新的数据由每一个行为产生，彼此之间互不干扰

因此，React 也要求：数据行为分离

操作的差异也来源于响应式原理不同，Vue 使用 Proxy，而 React 直接发布订阅
这么做有好处有坏处：

好处是：数据之间彼此不耦合，你可以随意更新数据结构而不用担心响应性丢失的问题

坏处是：数据行为分离对封装不利，且样板代码较多（比如 reducer），且一定要求由初始值

React 和 Vue 的取向不同，并不意味着难度不同

实际上两者理论上来说，难度应该是一样的
