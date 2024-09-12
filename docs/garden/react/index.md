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
