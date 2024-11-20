---
title: Hooks 的使用限制
toc: content
group:
  title: 术
---

## React Hooks 的使用限制有哪些？

**在 React 中，Hooks 不能写在循环、条件判断语句里，或嵌套在任何不会每次渲染都执行的函数中**，主要原因是为了确保 Hooks 在每次组件渲染时都以相同的顺序被调用。React 的 Hooks 系统依赖于调用顺序来正确地关联 Hook 的内部状态。如果这个顺序在不同的渲染之间发生变化，React 就无法正确地追踪 Hook 的状态，从而导致错误。

## 为什么不能在循环中使用 Hooks？

**原因**：在循环中使用 Hooks 会导致每次组件渲染时 Hooks 调用的数量和顺序发生变化，这违反了 Hooks 的使用规则。

**错误用法示例**：

```jsx | pure
function MyComponent({ items }) {
  for (let i = 0; i < items.length; i++) {
    // 错误：在循环中使用 Hook
    const [value, setValue] = useState(items[i]);
  }
}
```

## 为什么不能在条件判断语句里使用 Hooks？

**原因**：将 Hooks 放在条件语句中意味着只有在特定条件满足时才会调用 Hook，这同样会导致组件的不同渲染之间 Hook 调用的次数和顺序发生变化。

**错误用法示例**：

```jsx | pure
function MyComponent({ condition }) {
  if (condition) {
    // 错误：在条件语句中使用 Hook
    const [value, setValue] = useState(0);
  }
}
```

## 为什么不能将 Hooks 嵌套在任何不会每次渲染都执行的函数中？

**原因**：将 Hooks 嵌套在不会在每次渲染都执行的函数中，违反了 Hooks 的调用规则，**即 Hooks 应该在组件的顶层被调用**。这样的函数包括事件处理器、`setTimeout`、`setInterval` 或任何自定义函数等。这种做法会导致 Hooks 的调用顺序和次数在不同渲染之间发生变化，破坏了 React 对 Hooks 状态管理的基础假设。

**错误用法示例**：

```jsx | pure
function MyComponent() {
  const [count, setCount] = useState(0);

  function handleClick() {
    // 错误：在事件处理函数中使用 Hook
    useEffect(() => {
      document.title = `You clicked ${count} times`;
    });
  }

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={handleClick}>
        Click me
      </button>
    </div>
  );
}
```

在上面的代码中，`useEffect` 被错误地放置在了 `handleClick` 事件处理函数内部。这意味着 `useEffect` 只有在点击按钮并触发事件处理函数时才会被调用，而不是在每次组件渲染时都被调用。这违反了 Hooks 的使用规则，因为 React 无法保证 `useEffect`（或任何其他 Hook）的调用顺序和次数的一致性。


当看到一个useState，程序员必须要想到参数只是”初始值“，第二次渲染的时候参数的”初始值“已经不起作用了，港真，这需要脑子转一点弯，也许时间长了程序员可以适应这种转弯，但是目前我每次看到这个代码都要愣一秒钟。
