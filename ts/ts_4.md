# 写给自己的 TypeScript 教程(四)<!-- omit in toc -->




## Typescript 配合 React 实践备忘录

## 类型体操 [type-challenges](https://github.com/type-challenges/type-challenges/blob/master/README.zh-CN.md)

### 可串联构造器

在 JavaScript 中我们很常会使用可串联（Chainable/Pipeline）的函数构造一个对象，但在 TypeScript 中，你能合理的给他附上类型吗？

在这个挑战中，你可以使用任意你喜欢的方式实现这个类型 - Interface, Type 或 Class 都行。你需要提供两个函数 option(key, value) 和 get()。在 option 中你需要使用提供的 key 和 value 扩展当前的对象类型，通过 get 获取最终结果。

例如

```ts
declare const config: Chainable

const result = config
  .option('foo', 123)
  .option('name', 'type-challenges')
  .option('bar', { value: 'Hello World' })
  .get()

// 期望 result 的类型是：
interface Result {
  foo: number
  name: string
  bar: {
    value: string
  }
}
```

你只需要在类型层面实现这个功能 - 不需要实现任何 TS/JS 的实际逻辑。

你可以假设 key 只接受字符串而 value 接受任何类型，你只需要暴露它传递的类型而不需要进行任何处理。同样的 key 只会被使用一次。

去除第一个元素
type TupleTail<T extends any[]> = T extends [x: any, ...other: infer R] ? R : []
取得最后一个元素
type TupleLast<T extends any[]> = T extends [x: any, ...other: infer R] ? T[R['length']] : undefined
去除最后一个元素
type TupleInit<T extends any[]> = T extends [...f: infer R1, l: infer _R2] ? R1 : undefined
从头部加入一个元素
type TupleUnshift<T extends any[], X> = [X, ...T]
从尾部加入一个元素
type TuplePush<T extends any[], X> = [...T, X]
连接两个元组
type TupleConcat<A extends any[], B extends any[]> = [...A, ...B]
