---
title: Context
toc: content
order: 4
group:
  title: 道
---

## Context 的工作机制

React 中的 Context 是一个重要特性，主要设计目的是为了在不同层级的组件之间共享数据，而不需要逐层传递 props。Context 的使用和原理如下：

### 使用方法

1. 创建 Context 对象：使用 `createContext` 创建一个 Context 对象。
2. 提供数据：通过 `Provider` 组件来设置 Context 的值。
3. 消费数据：通过 `useContext` 钩子函数或 `Consumer` 组件来读取 Context 的值。

### 工作原理

Context 对象内部有一个 `_currentValue` 属性用于保存当前的值。`Provider` 组件会更新 `_currentValue` 的值，而 `useContext` 钩子和 `Consumer` 组件会读取这个属性的值。此外，`Provider` 还会利用入栈和出栈的机制，确保值的修改只影响它的子组件，不会影响到其他部分的组件树。

### 示例代码

```js
import { createContext, useContext } from 'react';

// 创建 Context 对象，并设置初始值为 111
const CountContext = createContext(111);

function Dashboard() {
  // 使用 useContext 钩子从 CountContext 中获取当前值
  const count = useContext(CountContext);

  return (
    <div>
      <h1>Dashboard 的 Context 值为：{count}</h1>
      <Settings />
    </div>
  );
}

function Settings() {
  return (
    <div>
      {/* 使用 Provider 提供新的 Context 值 222 */}
      <CountContext.Provider value={222}>
        <Profile />
      </CountContext.Provider>
    </div>
  );
}

function Profile() {
  // 在新的 Provider 范围内，值更新为 222
  const count = useContext(CountContext);
  return <h2>Profile 的 Context 值为：{count}</h2>;
}

export default Dashboard;
```

### 解释

该示例展示了 Context 的一个基本使用场景。在此示例中:

- `Dashboard` 组件通过 `useContext` 钩子读取 `CountContext` 的初始值（111）。
- `Settings` 组件内使用 `CountContext.Provider` 提供了一个新的值（222）。
- `Profile` 组件读取新的 `CountContext` 值，即 222。

其工作原理也相当简单，实际上就是修改和读取一个对象的属性值。

## 为什么旧的 Context API 被废弃了？

在 Fiber 树的生成过程中，使用了可中断递归遍历的方法，这一过程可以分为递和归两个阶段。在这个过程中，Context 对应的数据被保存在栈中。

在递阶段，Context 会不断入栈，这样 Consumer 就能通过 Context 栈向上查找对应的 context 值。在归阶段，Context 则会不断出栈。

那么，为什么旧的 Context API 被废弃了呢？这是因为它无法与 `shouldComponentUpdate`（简称 SCU）或 Memo 等性能优化手段兼容。要深入理解这个问题，需要了解 SCU 的原理。

SCU 的主要目的是减少不必要的重新渲染，也就是说，让本来需要渲染的组件进入 bailout 逻辑。所谓 bailout 逻辑，即跳过不必要的组件渲染过程。

SCU 实际上作用于四个条件中的第一个条件：`oldProps === newProps`。当使用 SCU 时，组件进入 bailout 逻辑的条件会发生变化：

```sh
-- oldProps === newProps
++ SCU === false
```

同理，当使用 `PureComponent` 和 `React.memo` 时，bailout 的条件也会发生变化：

```sh
-- oldProps === newProps
++ 浅比较 oldProps 与 newProps 相等
```

旧的 Context API 恰恰在这里出现了问题。当组件由于性能优化手段进入 bailout 逻辑，同时其子树也满足 bailout 的第四个条件时，整个 Fiber 子树就不会再继续遍历生成。这意味着，即使 context 值发生了变化，这些子孙组件也无法检测到变更。

那么，新的 Context API 是如何应对这个问题的呢？

使用新的 Context API 时，可以通过如下方式创建 context 实例：

```js
const ctx = React.createContext();
```

在创建 context 实例后，需要使用 `Provider` 提供值，并使用 `Consumer` 或 `useContext` 来订阅值。

当遍历组件生成对应 Fiber 时，遍历到 `Ctx.Provider` 组件时，`Ctx.Provider` 会判断 context 值是否发生变化。如果是，`Ctx.Provider` 会向下执行一次深度优先遍历子树操作，寻找所有与该 `Provider` 配套的 `Consumer`，并为相关的 Fiber 触发一次更新。

触发更新的目的是让组件在创建对应 Fiber 时不再满足 bailout 条件 4，从而进入 `render` 逻辑（通常，组件是通过调用触发更新的方法来更新的，例如调用 `setState`，这里的实现与众不同，非常巧妙）。

在这里，当 `Ctx.Provider` 中的 context 值发生变化时，`Ctx.Provider` 会向下找到消费该 context 值的组件 `Child`，并为其 Fiber 触发一次更新。因此， `Child` 对应的 Fiber 就不再满足条件 4。

这就解决了旧 Context API 的问题：由于 `Child` 对应的 Fiber 不满足条件 4，因此从 `Ctx.Provider` 到 `Child` 这棵子树不能满足所有子孙节点都满足条件 4 的情况，即使在遍历过程中有组件进入 bailout 逻辑，也不会停止对子树的遍历。

最终，遍历会继续进行到 `Child`，由于它不满足条件 4，因此会进入渲染逻辑。在渲染过程中，调用 `useContext` 就能从 Context 栈中找到更新后的 context 值并返回。

结语：**对于新的 Context API，（不像 legacy Context）我们知道：对于层级上祖先被 memorized bailout 的情况，新的 Context 特性依然可以订阅到 context data 的变化。**

## 如何优雅地处理使用 React Context 导致的不必要渲染问题？

### 痛点

官方文档中有这样一句话：

> Context lets you “broadcast” such data, and changes to it, to all components below.

简单来说，Context 对新旧 value 进行直接比较，而不是 shallowEqual，另外订阅者（即消费者）也不支持对某个状态进行局部订阅。当 value 发生变化时，消费者组件会重新渲染，即使它只用到了 value 的局部。当 context 数据越来越多的时候，就会出现一些根本不必要的重复更新。

让我们用一个例子来简单阐释下。假设我们有一个这样的应用：

- 有一个名字的输入框以及一个姓氏的输入框，使用两个组件实现
- 在另一个组件中展示欢迎信息，需要用到上面输入的名字和姓氏

因为涉及到跨组件数据调用，我们使用 context 进行名字和姓氏数据的管理。简要代码如下：

```tsx
import React, { createContext, useReducer, useContext, ReactNode } from "react";

type StateType = {
  firstName: string;
  familyName: string;
};

type ActionType =
  | { type: "setFirstName"; firstName: string }
  | { type: "setFamilyName"; familyName: string };

const initialState: StateType = {
  firstName: "",
  familyName: "",
};

const personReducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case "setFirstName":
      return { ...state, firstName: action.firstName };
    case "setFamilyName":
      return { ...state, familyName: action.familyName };
    default:
      return state;
  }
};

const PersonContext = createContext<{
  state: StateType;
  dispatch: React.Dispatch<ActionType>;
}>({
  state: initialState,
  dispatch: () => {},
});

const PersonProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(personReducer, initialState);

  return (
    <PersonContext.Provider value={{ state, dispatch }}>
      {children}
    </PersonContext.Provider>
  );
};

const PersonFirstName: React.FC = () => {
  const { state, dispatch } = useContext(PersonContext);

  return (
    <div>
      <p>是否重渲染：{Math.random()}</p>
      First Name:
      <input
        value={state.firstName}
        onChange={(event) =>
          dispatch({ type: "setFirstName", firstName: event.target.value })
        }
      />
    </div>
  );
}

const PersonFamilyName: React.FC = () => {
  const { state, dispatch } = useContext(PersonContext);

  return (
    <div>
      <p>是否重渲染：{Math.random()}</p>
      Family Name:
      <input
        value={state.familyName}
        onChange={(event) =>
          dispatch({ type: "setFamilyName", familyName: event.target.value })
        }
      />
    </div>
  );
}

const Greeting: React.FC = () => {
  const { state } = useContext(PersonContext);

  return (
    <div>
      <p>是否重渲染：{Math.random()}</p>
      <h2>
        Hi, {state.firstName} {state.familyName}!
      </h2>
    </div>
  );
}

const App: React.FC = () => (
  <PersonProvider>
    <PersonFirstName />
    <PersonFamilyName />
    <Greeting />
  </PersonProvider>
);

export default App;
```

### 改进一：Split Contexts

顾名思义，就是拆分 Contexts，这里面主要指对于不同上下文背景的 Contexts 进行拆分，实现合理的 Contexts hierarchy，这样就很容易能做到「组件按需选用订阅自己的 Contexts data」。

```tsx
import React, { createContext, useContext, useReducer, ReactNode } from "react";

// 创建 firstName Context
const FirstNameContext = createContext<{
  firstName: string;
  setFirstName: (name: string) => void;
}>({
  firstName: "",
  setFirstName: () => undefined,
});

// 创建 familyName Context
const FamilyNameContext = createContext<{
  familyName: string;
  setFamilyName: (name: string) => void;
}>({
  familyName: "",
  setFamilyName: () => undefined,
});

// FirstNameProvider 组件
const FirstNameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [firstName, dispatchFirstName] = useReducer(
    (state: string, action: string) => action,
    ""
  );

  return (
    <FirstNameContext.Provider
      value={{ firstName, setFirstName: dispatchFirstName }}
    >
      {children}
    </FirstNameContext.Provider>
  );
};

// FamilyNameProvider 组件
const FamilyNameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [familyName, dispatchFamilyName] = useReducer(
    (state: string, action: string) => action,
    ""
  );

  return (
    <FamilyNameContext.Provider
      value={{ familyName, setFamilyName: dispatchFamilyName }}
    >
      {children}
    </FamilyNameContext.Provider>
  );
};

// PersonFirstName 组件
const PersonFirstName: React.FC = () => {
  const { firstName, setFirstName } = useContext(FirstNameContext);

  return (
    <div>
      <p>是否重渲染：{Math.random()}</p>
      First Name:
      <input
        value={firstName}
        onChange={(event) => setFirstName(event.target.value)}
      />
    </div>
  );
};

// PersonFamilyName 组件
const PersonFamilyName: React.FC = () => {
  const { familyName, setFamilyName } = useContext(FamilyNameContext);

  return (
    <div>
      <p>是否重渲染：{Math.random()}</p>
      Family Name:
      <input
        value={familyName}
        onChange={(event) => setFamilyName(event.target.value)}
      />
    </div>
  );
};

// Greeting 组件
const Greeting: React.FC = () => {
  const { firstName } = useContext(FirstNameContext);
  const { familyName } = useContext(FamilyNameContext);

    return (
      <div>
        <p>是否重渲染：{Math.random()}</p>
        <h2>
          Hi, {firstName} {familyName}!
        </h2>
      </div>
  );
};

// App 组件
const App: React.FC = () => (
  <FirstNameProvider>
    <FamilyNameProvider>
      <PersonFirstName />
      <PersonFamilyName />
      <Greeting />
    </FamilyNameProvider>
  </FirstNameProvider>
);

export default App;
```

如果你觉得「这种 Context hierarchy 好麻烦啊」，那请你养成更好的编程习惯吧，Split Contexts 也是官方所推荐的「最佳」方案——麻烦和合理往往就在一念之间。（btw, 是真的那么麻烦么？）

另外值得一提的是，除了层级式按使用场景拆分 Contexts，我们还需要了解：**将多变的和不变的 Contexts 分开，让不变的 Contexts 在外层，多变的 Contexts 在内层。**

### 改进二：使用 「泛 memo」 方案

既可以是 `React.memo`，也可以是 `React.useMemo` 包裹一个 React 组件，以达到类似 scu 的优化目的。

:::info{title=React.useMemo}
:::

```tsx
import React, { ReactNode, createContext, useContext, useReducer } from 'react';

type StateType = {
  firstName: string;
  familyName: string;
};

type ActionType = { type: 'setFirstName'; firstName: string } | { type: 'setFamilyName'; familyName: string };

const initialState: StateType = {
  firstName: '',
  familyName: '',
};

const personReducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case 'setFirstName':
      return { ...state, firstName: action.firstName };
    case 'setFamilyName':
      return { ...state, familyName: action.familyName };
    default:
      return state;
  }
};

const PersonContext = createContext<{
  state: StateType;
  dispatch: React.Dispatch<ActionType>;
}>({
  state: initialState,
  dispatch: () => {},
});

const PersonProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(personReducer, initialState);

  return <PersonContext.Provider value={{ state, dispatch }}>{children}</PersonContext.Provider>;
};

const PersonFirstName: React.FC = () => {
  const { state, dispatch } = useContext(PersonContext);

  return React.useMemo(
    () => (
      <div>
        <p>是否重渲染：{Math.random()}</p>
        First Name:
        <input value={state.firstName} onChange={(event) => dispatch({ type: 'setFirstName', firstName: event.target.value })} />
      </div>
    ),
    [state.firstName],
  );
};

const PersonFamilyName: React.FC = () => {
  const { state, dispatch } = useContext(PersonContext);

  return React.useMemo(
    () => (
      <div>
        <p>是否重渲染：{Math.random()}</p>
        Family Name:
        <input value={state.familyName} onChange={(event) => dispatch({ type: 'setFamilyName', familyName: event.target.value })} />
      </div>
    ),
    [state.familyName],
  );
};

const Greeting: React.FC = () => {
  const { state } = useContext(PersonContext);

  return React.useMemo(
    () => (
      <div>
        <p>是否重渲染：{Math.random()}</p>
        <h2>
          Hi, {state.firstName} {state.familyName}!
        </h2>
      </div>
    ),
    [state],
  );
};

const App: React.FC = () => (
  <PersonProvider>
    <PersonFirstName />
    <PersonFamilyName />
    <Greeting />
  </PersonProvider>
);

export default App;
```

:::info{title=React.memo}
:::

```tsx
import React, { ReactNode, createContext, useContext, useReducer } from 'react';

type StateType = {
  firstName: string;
  familyName: string;
};

type ActionType = { type: 'setFirstName'; firstName: string } | { type: 'setFamilyName'; familyName: string };

const initialState: StateType = {
  firstName: '',
  familyName: '',
};

const personReducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case 'setFirstName':
      return { ...state, firstName: action.firstName };
    case 'setFamilyName':
      return { ...state, familyName: action.familyName };
    default:
      return state;
  }
};

const PersonContext = createContext<{
  state: StateType;
  dispatch: React.Dispatch<ActionType>;
}>({
  state: initialState,
  dispatch: () => {},
});

const PersonProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(personReducer, initialState);

  return <PersonContext.Provider value={{ state, dispatch }}>{children}</PersonContext.Provider>;
};

const MemoPersonFirstName = React.memo(({ firstName, dispatch }: { firstName: StateType['firstName']; dispatch: React.Dispatch<ActionType> }) => {
  return (
    <div>
      <p>是否重渲染：{Math.random()}</p>
      First Name:
      <input value={firstName} onChange={(event) => dispatch({ type: 'setFirstName', firstName: event.target.value })} />
    </div>
  );
});

const PersonFirstName: React.FC = () => {
  const { state, dispatch } = useContext(PersonContext);

  return <MemoPersonFirstName firstName={state.firstName} dispatch={dispatch} />;
};

const MemoPersonFamilyName = React.memo(({ familyName, dispatch }: { familyName: StateType['familyName']; dispatch: React.Dispatch<ActionType> }) => {
  return (
    <div>
      <p>是否重渲染：{Math.random()}</p>
      Family Name:
      <input value={familyName} onChange={(event) => dispatch({ type: 'setFamilyName', familyName: event.target.value })} />
    </div>
  );
});

const PersonFamilyName: React.FC = () => {
  const { state, dispatch } = useContext(PersonContext);

  return <MemoPersonFamilyName familyName={state.familyName} dispatch={dispatch} />;
};

const Greeting: React.FC = () => {
  const { state } = useContext(PersonContext);

  return (
    <div>
      <p>是否重渲染：{Math.random()}</p>
      <h2>
        Hi, {state.firstName} {state.familyName}!
      </h2>
    </div>
  );
};

const App: React.FC = () => (
  <PersonProvider>
    <PersonFirstName />
    <PersonFamilyName />
    <Greeting />
  </PersonProvider>
);

export default App;
```

### 改进三：useContextSelector

为了解决 context 这种广播机制带来的弊端，除了以上两种渐进改良方案以外，官方和社区也在积极探索更加彻底的方案，目的很明确：可以实现选择性更新。

其中主流的版本为在 React 状态管理工具方面颇有建树的 [Daishi Kato](https://github.com/dai-shi) 开发的 [use-context-selector](https://github.com/dai-shi/use-context-selector)。

```tsx
import React, { ReactNode, useReducer } from 'react';
import { createContext, useContextSelector } from 'use-context-selector';

type StateType = {
  firstName: string;
  familyName: string;
};

type ActionType = { type: 'setFirstName'; firstName: string } | { type: 'setFamilyName'; familyName: string };

const initialState: StateType = {
  firstName: '',
  familyName: '',
};

const personReducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case 'setFirstName':
      return { ...state, firstName: action.firstName };
    case 'setFamilyName':
      return { ...state, familyName: action.familyName };
    default:
      return state;
  }
};

const PersonContext = createContext<{
  state: StateType;
  dispatch: React.Dispatch<ActionType>;
}>({
  state: initialState,
  dispatch: () => {},
});

const PersonProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(personReducer, initialState);

  return <PersonContext.Provider value={{ state, dispatch }}>{children}</PersonContext.Provider>;
};

const PersonFirstName: React.FC = () => {
  const firstName = useContextSelector(PersonContext, (value) => value.state.firstName);
  const dispatch = useContextSelector(PersonContext, (value) => value.dispatch);

  return (
    <div>
      <p>是否重渲染：{Math.random()}</p>
      First Name:
      <input value={firstName} onChange={(event) => dispatch({ type: 'setFirstName', firstName: event.target.value })} />
    </div>
  );
};

const PersonFamilyName: React.FC = () => {
  const familyName = useContextSelector(PersonContext, (value) => value.state.familyName);
  const dispatch = useContextSelector(PersonContext, (value) => value.dispatch);

  return (
    <div>
      <p>是否重渲染：{Math.random()}</p>
      Family Name:
      <input value={familyName} onChange={(event) => dispatch({ type: 'setFamilyName', familyName: event.target.value })} />
    </div>
  );
};

const Greeting: React.FC = () => {
  const { state } = useContextSelector(PersonContext, (value) => value);

  return (
    <div>
      <p>是否重渲染：{Math.random()}</p>
      <h2>
        Hi, {state.firstName} {state.familyName}!
      </h2>
    </div>
  );
};

const App: React.FC = () => (
  <PersonProvider>
    <PersonFirstName />
    <PersonFamilyName />
    <Greeting />
  </PersonProvider>
);

export default App;
```

## 推荐阅读

- [从 Context 源码实现谈 React 性能优化](https://zhuanlan.zhihu.com/p/337952324)
- [如何优雅地处理使用 React Context 导致的不必要渲染问题？](https://www.zhihu.com/question/450047614)
- [在 JavaScript 中实现和使用 Context](https://blog.skk.moe/post/context-in-javascript/)
- [ObservedBits: React Context 的秘密功能](https://zhuanlan.zhihu.com/p/51073183)
- [useContext 更佳实践](https://zhuanlan.zhihu.com/p/191387989)
- [useReducer 和 useContext 的结合可以取代 Redux 么？](https://www.zhihu.com/question/414162375/answer/3507393580)
