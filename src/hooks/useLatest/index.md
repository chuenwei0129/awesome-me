---
title: useLatest
group:
  title: 状态
  order: 0
---

# useLatest

> 获取给定变量的最新值的 Hook。

## 示例

在此示例中，当你按下 “发送” 后，在显示消息之前会有一小段延迟。输入 “123” (这是按钮被点击那一刻 state 的值)，按下发送，然后再次快速编辑输入 “456”，提示框会显示 “123456”。提示框会显示当前输入文本而不是点击时的内容。

<code src="./usage/index.tsx"></code>

## 类型签名

```ts
function useLatest<T>(value: T): React.MutableRefObject<T>
```

## 参数

| 参数名 | 类型 | 是否必填 | 说明             |
| :----- | :--- | :------: | :--------------- |
| value  | `T`  |    是    | 需要跟踪的最新值 |

## 返回值

返回一个 ref 对象，其 `current` 属性始终为给定变量的最新值。

类型：`React.MutableRefObject<T>`
