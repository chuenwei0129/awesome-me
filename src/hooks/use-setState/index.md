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

用于以对象形式管理状态，支持部分更新和合并。

## 使用场景

我们知道，React 中的 State 是不可变数据。所以我们经常需要写类似如下的代码：

```js
setState(prev => ({
  ...prev,
  name: 'Chu',
  others: {
    ...prev.others,
    age: '27',
  },
}));
```

通过 useSetState，可以省去对象扩展运算符操作这个步骤，即：

```js
setState(prev => ({
  name: 'chu',
  others: {
    age: '27',
  },
}));
```

其本质是利用高阶函数在调用 setState 之前做一些额外的处理，即将对象拓展运算符的操作封装到内部。

所以才叫 useSetState。

当然，写业务时，一般会用 [useImmer](https://github.com/immerjs/use-immer) 来解决类似问题。

## 示例

### 更新部分对象属性

在这个例子中，我们展示了如何只更新状态对象中的部分内容。

<code src="./usage/demo1.tsx"></code>

### 基于前一个状态更新

假设你需要记录聚会邀请的嘉宾人数并动态更新。在这个例子中，我们展示了如何基于前一个状态来更新当前状态。

<code src="./usage/demo2.tsx"></code>
