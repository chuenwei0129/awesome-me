---
title: cond 函数
order: 1
group:
  title: 函数式工具
  order: 1
---

### cond

> 根据条件执行匹配的函数。

#### 类型签名

```ts
function cond<T, R>(
  conditions: [ConditionFunction<T>, ResultFunction<T, R>][],
): (value: T) => R | undefined
```

#### 参数

| 参数名     | 类型                                                  | 是否必填 | 说明                           |
| :--------- | :---------------------------------------------------- | :------: | :----------------------------- |
| conditions | `Array<[ConditionFunction<T>, ResultFunction<T, R>]>` |    是    | 条件函数和结果函数的二元组数组 |

#### 返回值

返回一个函数，该函数接受一个值 `T`，并根据条件 `ConditionFunction<T>` 执行相应的结果函数 `ResultFunction<T, R>`。

类型：`(value: T) => R | undefined`

#### 示例

```ts
import {cond} from awesome-me

const fn = cond<number, string>([
  [n => n < 10, n => `Less than 10: ${n}`],
  [n => n < 20, n => `Less than 20: ${n}`],
  [n => n < 30, n => `Less than 30: ${n}`],
]);

console.log(fn(5)); // 输出: Less than 10: 5
console.log(fn(15)); // 输出: Less than 20: 15
console.log(fn(25)); // 输出: Less than 30: 25
console.log(fn(35)); // 输出: undefined
```

这个 `cond` 函数的实现考虑了类型安全，并通过 TypeScript 的泛型机制确保了条件函数和结果函数的参数类型一致。我们也编写了测试用例来验证函数的行为，并提供了一个简洁的文档说明。
