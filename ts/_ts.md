# TypeScript 类型体操<!-- omit in toc -->

## [写 TypeScript 时，什么时候用 any？什么时候用 unknown？有没有规律或准则？](https://www.zhihu.com/question/355283769)

两者最大的区别就是 `unknown` 只是个 `top type`，而 `any` 即是 `top type` 又是 `bottom type`, **这导致 `any` 基本上就是放弃了任何类型检查**。

什么时候用因此也显而易见了。

1. 如果一个**变量的类型是变化的**（比如来自 JS 程序的对象，随时都有可能多一个属性，甚至变成完全不同的类型），就用 `any`。
2. 如果一个**变量的类型是固定的**，但是目前还不能确定或不想确定，就用 `unknown`。要用这个变量的时候就断言一下吧，不能像 `any` 那样糊里糊涂地用。

> ⚠️ 注意：`any` 是被视为 `union` 的，`unknown` 不是。

## [TypeScript 中的 never 类型具体有什么用？](https://www.zhihu.com/question/354601204)

举个具体点的例子，当你有一个 `union type`:

```ts
interface Foo {
  type: 'foo'
}

interface Bar {
  type: 'bar'
}

type All = Foo | Bar
```

在 `switch` 当中判断 `type`，`TS` 是可以收窄类型的 (discriminated union)：

```ts
function handleValue(val: All) {
  switch (val.type) {
    case 'foo':
      // 这里 val 被收窄为 Foo
      break
    case 'bar':
      // val 在这里是 Bar
      break
    default:
      // val 在这里是 never
      const exhaustiveCheck: never = val
      break
  }
}
```

注意在 `default` 里面我们把被收窄为 `never` 的 `val` 赋值给一个显式声明为 `never` 的变量。如果一切逻辑正确，那么这里应该能够编译通过。但是假如后来有一天你的同事改了 `All` 的类型：

```ts
type All = Foo | Bar | Baz
```

然而他忘记了在 `handleValue` 里面加上针对 `Baz` 的处理逻辑，这个时候在 `default branch` 里面 `val` 会被收窄为 `Baz`，导致无法赋值给 `never`，产生一个编译错误。所以通过这个办法，你可以确保 `handleValue` 总是穷尽 (exhaust) 了所有 `All` 的可能类型。

> `never` 的主要作用就是充当 `Typescript` 类型系统里的 `Bottom Type` (`Typescript` 还有个 `top type` `unknown` 和即是 `top` 也是 `bottom` 的 any)，所以问题就变成了 `bottom type` 有什么作用

**上面的例子，缺点很明显，缺少了运行时使用 `default` 的兜底逻辑了**

`never` 是任何类型的子类型

```ts
type Check<T> = never extends T ? true : false
type result = Check<xxx> // 结果始终为 true
```

除了 `never`，没有其他类型是 `never` 的 subtype

```ts
type Check<T> = never extends never ? false : T extends never ? true : false
type result = Check<xxx> // 结果始终为 false
```

`never` 是 `union` 运算的幺元，`intersection` 运算的零元

```ts
T | never // 结果为 T
T & never // 结果为 never
```

`never` 类型表示“无法返回”。比如说，函数里触发了 `throwError`，或者 `switch` 没有捕捉到值且不存在 `default`，这些都导致无法走到最后也无法返回。

调用这个函数的时候就可以通过测试 `never` 来知道这个函数出错了，而不是 `void`。`void` 表示正确执行完毕，返回空。`typescript` 编译器自动认为 `never` 和所有类型 `union`。

**所以当函数返回 `number` 的时候，你返回一个 `never` 编译器也能通过。这是在编译阶段的用处。**

## TS 已经有模块系统了，为什么还需要 NameSpace？

这个问题等价于：

> 1. 柯南已经有灰原哀了，为什么还需要毛利兰？
>
> 2. 得先分清楚谁是青梅竹马谁是天降。

**`NameSpace` 本质是 `JS` 的原始闭包，不关注代码是同步还是异步加载的，只关注使用体验。**

## 逆变、协变、双向协变、不变

> [快速理解 TypeScript 的逆变、协变、双向协变、不变](https://zhuanlan.zhihu.com/p/500762226)

## 模式匹配做提取
