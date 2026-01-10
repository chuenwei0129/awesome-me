---
group:
  title: Hooks
  order: 1
title: useLatest
toc: content
---

# useLatest

返回**当前状态最新值**的 Hook，用于解决 React 函数组件中的**闭包陷阱**问题。

## 快速开始

### 问题演示

输入 "123" → 点击发送 → 快速改为 "456" → 3 秒后提示框仍显示 "123"

<code src="./examples/closure-problem.tsx"></code>

### 使用 useLatest 解决

<code src="./examples/use-latest-solution.tsx"></code>

---

## API

```typescript
function useLatest<T>(value: T): React.MutableRefObject<T>;
```

### 参数

| 参数  | 类型 | 说明                     | 必填 |
| ----- | ---- | ------------------------ | ---- |
| value | T    | 需要追踪最新值的状态变量 | ✅   |

### 返回值

返回 `React.MutableRefObject<T>`，通过 `.current` 访问最新值。

---

## 适用场景

| 场景         | 问题                             | 解决方案                  |
| ------------ | -------------------------------- | ------------------------- |
| 定时器回调   | `setInterval` 中访问旧状态       | 使用 `useLatest` 包装状态 |
| 事件监听器   | 全局事件处理函数无法访问最新状态 | 通过 `useLatest` 传递     |
| 异步请求     | 请求完成后需要最新数据判断       | 在回调中读取 `.current`   |
| 第三方库集成 | 库的回调函数无法访问 React 状态  | 使用 `useLatest` 作为桥梁 |

---

## 原理详解

### 什么是闭包陷阱？

在函数组件中，每次渲染都会创建新的函数作用域。异步回调捕获的是**创建时**的状态值，即使状态更新导致组件重新渲染，回调函数内部访问的仍是旧值。

```js
function handleSend() {
  setTimeout(() => {
    alert('正在发送：' + text); // 捕获的是 click 时的 text 值
  }, 3000);
}
```

### 时间线分析

```
t0: text="123", 点击发送 → handleSend 闭包捕获 text="123"
t1: 输入 "456" → setText("456") → 组件重渲染
t2: 新的 handleSend 函数创建，但已触发的 setTimeout 仍使用旧闭包
t3: setTimeout 回调执行 → 读取闭包中的 text="123" ❌
```

### useLatest 为什么能解决？

```typescript
import { useRef } from 'react';

function useLatest<T>(value: T) {
  const ref = useRef<T>(value);
  ref.current = value; // 每次渲染同步更新
  return ref;
}
```

关键点：

1. **引用保持**：`useRef` 返回的对象在组件整个生命周期中地址不变
2. **值同步**：每次渲染时同步更新 `ref.current` 为最新值
3. **闭包穿透**：回调函数捕获的是 `ref` 对象引用，而非值本身

```javascript
const capturedRef = ref; // ✅ 引用不变，可通过 .current 访问最新值
const capturedValue = text; // ❌ 值被固定
```

### 框架对比

| 框架                  | 状态访问方式 | 闭包行为         |
| --------------------- | ------------ | ---------------- |
| React 函数组件        | 闭包捕获     | 捕获渲染时的值   |
| React Class 组件      | this.state   | 始终访问最新值   |
| Vue 3 Composition API | ref/reactive | 响应式，自动更新 |

---

## 最佳实践

### ✅ 推荐用法

```tsx | pure
// 在异步回调中读取 ref.current
function handleSend() {
  setTimeout(() => {
    alert('发送: ' + latestText.current);
  }, 3000);
}

// 与 useEffect 结合
useEffect(() => {
  const timer = setInterval(() => {
    console.log(latestData.current);
  }, 1000);
  return () => clearInterval(timer);
}, []);
```

### ❌ 避免用法

```tsx | pure
// 直接修改 ref.current（不会触发重渲染）
latestText.current = 'new value';

// 在 JSX 中直接渲染 ref.current
return <div>{latestText.current}</div>;

// 将 ref 作为 useEffect 依赖项（永远不会触发）
useEffect(() => {}, [latestText]);
```

---

## 替代方案对比

| 方案                  | 优点                | 缺点                   | 适用场景         |
| --------------------- | ------------------- | ---------------------- | ---------------- |
| `useLatest`           | 轻量、直观、无依赖  | 需要额外 Hook          | 通用异步场景     |
| `useState` + 函数更新 | React 原生支持      | 仅适用于 setState 场景 | 状态更新依赖旧值 |
| `useReducer`          | 可预测的状态管理    | 概念较重               | 复杂状态逻辑     |
| Class 组件            | 直接访问 this.state | 无法使用 Hooks         | 旧项目维护       |

---

## 何时不需要 useLatest

- **同步操作**：不涉及异步回调
- **依赖项完整**：`useEffect` / `useCallback` 已包含所有依赖
- **状态立即消费**：状态变化后立即使用，无时间间隔

---

## 相关资源

- [useLatest 源码实现](https://github.com/alibaba/hooks/blob/master/packages/hooks/src/useLatest/index.ts)
- [Vue 和 React 的这个行为各是出于什么考虑？](https://www.zhihu.com/question/543057656/answer/2575930077)
