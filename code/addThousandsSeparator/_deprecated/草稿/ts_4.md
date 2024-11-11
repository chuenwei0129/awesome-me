# 写给自己的 TypeScript 教程(四)<!-- omit in toc -->

## Typescript 类型计算

### 基本类型 (Basic Types)

任何复杂类型都是基本类型的组合，每个基本类型都可以有具体的枚举：

```ts
type A = {
  attrA: string
  attrB: number
  attrA: true // Boolean 的枚举
  // ...
}
```

### 函数 (Function)

`Javascript` 中有函数的概念，那么 `TypeScript` 相关语法中有没有函数的概念呢？答案是有的，带范型的类型就相当于函数。

其中 `<T>` 就相当于函数括弧和参数列表，= 后面的就相当于函数定义

```ts
// 将所有属性变成可选的
type Optional<T> = {
  [key in keyof T]?: T[key]
}

// 将某些属性变成必选的
type MyRequired<T, K extends keyof T> = T &
  {
    [key in K]-?: T[key]
  }

// 例如我们有个实体
type App = {
  _id?: string
  appId: string
  name: string
  description: string
  ownerList: string[]
  createdAt?: number
  updatedAt?: number
}

// 我们在更新这个对象/类型的时候，有些 key 是必填的，有些 key 是选填的，这个时候就可以这样子生成我们需要的类型
type AppUpdatePayload = MyRequired<Optional<App>, '_id'>
```

上面这个例子又暴露了另外一个可以类比的概念，也就是函数的参数的类型可以用 `<K extends keyof T>` 这样的语法来表达。

### TypeScript 函数的缺陷 (Defect)

#### 高版本才能支持递归

4.1.0 才支持递归

#### 函数不能作为参数

在 JS 里面，函数可以作为另外一个函数的入参，例如：

```js
function map(s, mapper) {
  return s.map(mapper)
}
map([1, 2, 3], t => s)
```

但是在类型计算的“函数”里面，暂时没有相关语法能够实现将函数作为参数传入这种形式，正确来说，**传入的参数只能作为静态值变量引用**，不能作为可调用的函数。

```ts
type Map<T, Mapper> = {
  [k in keyof T]: Mapper<T[k]> // 语法报错
}
```

#### 支持闭包，但是没有办法修改闭包中的值

TypeScript 的“函数中”目前没有找到相关语法可以替代

```ts
type ClosureValue = string

type Map<T> = {
  [k in keyof T]: ClosureValue // 没有找到语法能够修改 ClosureValue
}
```

但是我们可以通过类似于函数式编程的概念，组合出新的类型。

```ts
type ClosureValue = string

type Map<T> = {
  [k in keyof T]: ClosureValue & T[k] // 没有找到语法能够修改 ClosureValue
}
```

### 语句 (Statements)

#### 变量声明语句 (Variable Declaration)

```ts
type ToDeclareType<T> = T extends (args: any) => PromiseLike<infer R> ? R : never // 条件表达式/带三元运算符的条件表达式
type ToDeclareType = Omit<App> // 函数调用表达式
type ToDeclareType<T> = {
  // 循环表达式
  [key in keyof T]: Omit<T[key], '_id'>
}
```

#### 三元表达式 (Expressions)

```ts
async function hello(name: string): Promise<string> {
  return Promise.resolve(name);
}
// type CCC: string = ReturnType<typeof hello>; doesn't work
type MyReturnType<T extends (...args) => any> = T extends (
  ...args
) => PromiseLike<infer R>
  ? R
  : ReturnType<T>;
type CCC: string = MyReturnType<typeof hello>; // it works
```

#### 循环实现思路 (Details Explained )

`TypeScript` 里面并没有完整的循环语法，循环是通过递归来实现的，下面是一个例子：

```ts
type IntSeq<N, S extends any[] = []> = S['length'] extends N ? S : IntSeq<N, [...S, S['length']]>
```

#### 成员表达式 (Member Expression)

我们在 JS 中用例如 a.b.c 这样的成员表达式主要是因为我们知道了某个对象/变量的结构，然后想拿到其中某部分的值，在 TypeScript 中有个比较通用的方法，就是用 infer 语法，例如我们想拿到函数的某个参数就可以这么做：

```ts
function hello(a: any, b: string) {
  return b
}
type getSecondParameter<T> = T extends (a: any, b: infer U) => any ? U : never
type P = getSecondParameter<typeof hello>
```

其中 `T extends (a: any, b: infer U) => any` 就是在表示结构，并拿其中某个部分

### 常见数据结构和操作 (Common DataStructures and Operations)

#### Set

集合数据结构可以用 `Union` 类型来替代

#### Add

```ts
type S = '1' | 2 | a
S = S | 3
```

#### Remove

```ts
type S = '1' | 2 | a;
S = Exclude<S, '1'>;
```

#### Has

```ts
type S = '1' | 2 | a
type isInSet = 1 extends S ? true : false
```

#### Intersection

```ts
type SA = '1' | 2
type SB = 2 | 3
type interSet = Extract<SA, SB>
```

#### Diff

```ts
type SA = '1' | 2
type SB = 2 | 3
type diff = Exclude<SA, SB>
```

### 运算符 (Operators)

> 注意：运算符的实现涉及递归，递归只有在 TS 4.1.0 才支持
> 注意：下面的运算符只能适用于整型
> 注意：原理依赖于递归、效率较低

基本原理是通过 `Array` 的 `length` 属性来输出整型，如果要实现 `*` 法，请循环加法 `N` 次。。。

#### ===

```ts
type IfEquals<X, Y, A = X, B = never> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y
  ? 1
  : 2
  ? A
  : B
```

#### +

```ts
type NumericPlus<A extends Numeric, B extends Numeric> = [...IntSeq<A>, ...IntSeq<B>]['length']
```

#### -

```ts
type NumericMinus<A extends Numeric, B extends Numeric> = _NumericMinus<B, A, []>；
type ToNumeric<T extends number> = T extends Numeric ? T : never；
type _NumericMinus<A extends Numeric, B extends Numeric, M extends any[]> = NumericPlus<A, ToNumeric<M["length"]>> extends B ? M["length"] : _NumericMinus<A, B, [...M, 0]>;
```

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

<!-- 你只需要在类型层面实现这个功能 - 不需要实现任何 TS/JS 的实际逻辑。

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
type TupleConcat<A extends any[], B extends any[]> = [...A, ...B] -->
