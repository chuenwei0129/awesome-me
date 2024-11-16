# 回调函数

- [回调函数（callback）是什么？](https://www.zhihu.com/question/19801131)
- [干货｜详解 Algebraic Effects代数效应](https://zhuanlan.zhihu.com/p/380855727)
- [Staltz - Callback Heaven](https://zhuanlan.zhihu.com/p/38039481)


https://www.zhihu.com/question/269302412/answer/348510735


jsx 就是 js，jsx 标签就相当于createElement函数，模板相当于 字符串，需要定制的东西比较多，需要做到js的程度需要做的编译工作太多

状态是时间上的数组

如果你多次渲染同一个组件，每个组件都会拥有自己的 state。你可以尝试点击不同的按钮：
就是函数

Hook 比普通函数更为严格。你只能在你的组件（或其他 Hook）的 顶层 调用 Hook。如果你想在一个条件或循环中使用 useState，请提取一个新的组件并在组件内部使用它。



要传递 props，请将它们添加到 JSX，就像使用 HTML 属性一样。
要读取 props，请使用 function Avatar({ person, size }) 解构语法。
你可以指定一个默认值，如 size = 100，用于缺少值或值为 undefined 的 props 。
你可以使用 <Avatar {...props} /> JSX 展开语法转发所有 props，但不要过度使用它！
像 <Card><Avatar /></Card> 这样的嵌套 JSX，将被视为 Card 组件的 children prop。
Props 是只读的时间快照：每次渲染都会收到新版本的 props。
你不能改变 props。当你需要交互性时，你可以设置 state。

demo state
活在过去

1. 层层递进，关联
