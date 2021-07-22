# 写给自己的 TypeScript 教程(三)<!-- omit in toc -->

## 写 TypeScript 时，什么时候用 any？什么时候用 unknown？有没有规律或准则？

`any` 是被视为 `union` 的 `unknown` 不是

两者最大的区别就是 `unknown` 只是个 `top type`(任何类型都是他的 `subtype`），而 `any` 即是 `top type` 又是 `bottom type`（他是任何类型的 `subtype`), 这导致 `any` 基本上就是放弃了任何类型检查。

**使用 `unknown` 你还可以继续保证类型安全，使用 `any` 就是彻底放弃了类型检查**

然而大部分的场景你仅仅是需要个 `top type` 而已，最典型的场景就是泛型默认类型

为了保证你能传入所有类型，所以默认的 `constraint` 应该是 `top type`，但是如果你选择了用 `any` 实际上是放弃了你范型内部的实现安全这时用 `unknown` 就合理很多

什么时候用因此也显而易见了。

> 如果一个变量的类型是变化的（比如来自 JS 程序的对象，随时都有可能多一个属性，甚至变成完全不同的类型），就用 `any`。
>
> 如果一个变量的类型是固定的，但是目前还不能确定或不想确定，就用 `unknown`。要用这个变量的时候就断言一下吧，不能像 `any` 那样糊里糊涂地用。

我个人的经验是能用 `unknown` 就尽量用 `unknown`，不要滥用 `any`。

- 写 `unknown` 表示程序逻辑不需要知道

- 写 `any` 表示程序（逻辑）需要知道，但编译器不知道

`any` 很飘渺，它压根不管你什么类型；而 `unknown` 认为，你这个值是有类型的，只是，当前还不知道它是什么类型，在不确定类型之前，你不能作赋值操作，因为这不安全。因此，在不知类型之前，它可能是任何类型，也就是全集。`any` 算不得类型，`any` 甚至认为 `string` 是 `number`。

## TypeScript 中的 never 类型具体有什么用？

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

never 是任何类型的子类型

```ts
type Check<T> = never extends T ? true : false
type result = Check<xxx> // 结果始终为 true
```

除了 never，没有其他类型是 never 的 subtype

```ts
type Check<T> = never extends never ? false : T extends never ? true : false
type result = Check<xxx> // 结果始终为 false
```

never 是 `union` 运算的幺元，`intersection` 运算的零元

```ts
T | never // 结果为 T
T & never // 结果为 never
```

`Javascript` 里不存在的东西通通是没有用的，因为 `typescript` 最后会被转义成 `javascript` 来执行。那些“没有用”的东西通常都是给编译器看的。

`never` 类型表示“无法返回”。比如说，函数里触发了 `throwError`，或者 `switch` 没有捕捉到值且不存在 `default`，这些都导致无法走到最后也无法返回。

调用这个函数的时候就可以通过测试 `never` 来知道这个函数出错了，而不是 `void`。`void` 表示正确执行完毕，返回空。`typescript` 编译器自动认为 `never` 和所有类型 `union`。

**所以当函数返回 `number` 的时候，你返回一个 `never` 编译器也能通过。这是在编译阶段的用处。**

## typescript 已经有模块系统了，为什么还需要 namespace？

**`ts` 和 `js` 一样需要作用与空间，模块化关键字不写就会当作一个大文件处理**

由于引入了专门的语法，不需要像 `AMD` 那样依靠函数作用域来隔离代码块，显得更为简洁。

随着 `ES2015` 出现（以及随之而来的规范演进机制），`TypeScript` 的定位也发生了转变，不再提供 `ES` 规范中没有的功能，转而专注于为 `ES` 代码提供静态类型检查。

所以必然地，`TypeScript` 放弃了自身的模块系统，转而使用 `ES` 规范中的模块系统，相应的这个问题等价于：

> 柯南已经有灰原哀了，为什么还需要毛利兰？
> 得先分清楚谁是青梅竹马谁是天降。

放到 `js` 的开发环境下，比如 `ts` 开源项目的 `tsc` 编译器，最终是编译（合并）成一个大的 `js` 文件，所以根本没必要用 `es` 标准的模块，并且项目有几百个文件，如果都用标准模块去设计，一个文件平均下来得写 `50-100` 行的 `import`，并且要设计很多的包索引文件去 `export` 子模块；这种情况下 `ts` 方案显然更人性化，反正维护该项目的都是老熟人。

以上就是 `namespace` 保留的价值，说到底其实就是 `js` 的原始闭包，不关注代码是同步还是异步加载的，只关注使用体验。

## 如何评价 TypeScript 新特性 template string type?

## TypeScript 的好处都有啥？和 JavaScript 的区别在哪？TypeScript 有哪些设计缺陷？

- 杜绝手误导致的变量名写错。
- vscode 提示友好。
- 重构支持。
- 类型可以一定程度上充当文档
- 类型标注麻烦。现阶段大部分静态类型语言的类型系统还不够强。
- eval 和 new Function() 这种骚操作类型系统管不到。
- 需要编译，类型检查会增加编译时长，语法和类型系统复杂的话时间特别特别长，比如 scala。

最大缺陷也是最大优势就是兼容 `js` 了

同时有 `null` 和 `undefined`，很多正常语言是只有 `null` 没有 `undefined`。
