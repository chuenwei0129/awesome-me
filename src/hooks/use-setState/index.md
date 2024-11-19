---
nav:
  title: Library
  order: 0
title: useSetState
toc: content
group:
  title: Hooks
  order: -998
---

# useSetState

用于简化对象状态的更新和管理。它封装了对象扩展运算符操作，从而使代码更加简洁和可读。

## 使用场景

我们知道，React 中的 State 是不可变数据。所以我们经常需要写类似如下的代码：

```js
const [state, setState] = useState({
  name: 'John Doe',
  age: 30
});

// 当我们需要更新对象中的某个字段时，我们需要使用扩展运算符
const updateName = () => {
  setState(prevState => ({
    ...prevState,
    name: 'Jane Doe',
  }));
};
```

当需要不断扩展或更新对象的某一部分时，代码会变得越来越复杂。而 `useSetState` 可以使状态管理更加简洁。

其本质是利用高阶函数在调用 setState 之前做一些额外的处理，即将对象扩展运算符的操作封装到内部。

所以才叫 `useSetState`。

当然，在复杂对象状态管理中，[useImmer](https://github.com/immerjs/use-immer) 也是一个非常不错的替代方案，它提供了更加优雅和简洁的方式进行不可变数据的更新。

## 示例

### 部分更新和合并

在这个例子中，我们展示了如何部分更新对象状态，并将更新结果自动合并到已有状态中。

<code src="./usage/demo1.tsx"></code>

### 基于前一个状态更新

在这个例子中，我们展示了如何基于前一个状态来更新当前状态。

<code src="./usage/demo2.tsx"></code>
