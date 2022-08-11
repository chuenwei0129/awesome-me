# 人类高质量函数式编程学习指南

## 编程范式

### 命令式编程

**命令式编程** 是使用最广的一种编程风格，它是站在计算机的角度去思考问题，主要思想是：**关注计算机执行的步骤，即一步一步告诉计算机先做什么再做什么。**

由于存在很多需要控制的步骤，所以命令式编程普遍存在以下特点：

- **控制语句**
  - 循环语句：`while`、`for`
  - 条件分支语句：`if else`、`switch`
  - 无条件分支语句：`return`、`break`、`continue`
- **变量**
  - 赋值语句

> **🌰 例子：**

```js
// 需求：筛选出数组中为奇数的子集合

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
// 步骤 1：定义执行结果变量
const res = []
// 步骤 2：控制程序循环调用
for (let i = 0; i < arr.length; i++) {
  // 步骤 3：判断筛选条件
  if (arr[i] % 2 !== 0) {
    // 步骤 4：加入执行结果
    res.push(arr[i])
  }
}

// 步骤 5：得到最终的结果 res
console.log(res) // [1, 3, 5, 7, 9]
```

**优点：**

命令式编程的每一个步骤都可以由程序员定义，这样可以更精细化、更严谨地控制代码，从而提高程序的性能。

**缺点：**

命令式编程需要大量的流程控制语句，在处理多线程状态同步问题时，容易造成逻辑混乱，通常需要加锁来解决。

### 声明式编程

**声明式编程** 同样是一种编程风格，它通过定义具体的规则，以便系统底层可以自动实现具体功能。主要思想是：**告诉计算机应该做什么，但不指定具体要怎么做。**

> **用声明式的方式重构例子：**

```js
// 筛选出数组中为奇数的子集合
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const result = array.filter(item => item % 2 !== 0)
console.log(result) // [1, 3, 5, 7, 9]
```

**声明式编程的优缺点：**

- 声明式编程的具体操作都是底层统一管理，可以降低重复工作。
- 声明式编程底层实现的逻辑并不可控，不适合做更精细化的优化。

典型的声明式编程的案例：HTML 标签声明网页的内容。

### 函数式编程

**函数式编程** 属于声明式编程中的一种，它的主要思想是：**将计算机运算看作为函数的计算，也就是把程序问题抽象成数学问题去解决。**

**函数式编程中，所有的变量都是唯一的值**，就像是数学中的代数 `x`、`y`，它们要么还未解出来，要么已经被解出为固定值，所以对于：`x = x+1` 这样的自增是不合法的，因为修改了代数值，不符合数学逻辑。

除此之外，**严格意义上的函数式编程也不包括循环、条件判断等控制语句**，如果需要条件判断，可以使用三元运算符代替。

**函数式编程有以下几个特点：**

- **函数是一等公民**：函数可以和变量一样，可以赋值给其他变量，也可以作为参数，传入一个函数，或者作为别的函数返回值。

- **只用表达式，不用语句**：表达式是一段单纯的运算过程，总是有返回值。语句是执行某种操作，没有返回值。**函数式编程中的每一步都是单纯的运算**，而且都有返回值。

- **无副作用**：不会产生除运算以外的其他结果。同一个输入永远得到同一个输出。

- **不可变性**：不修改变量，返回一个新的值。

- **引用透明**：函数的运行不依赖于外部变量，只依赖于输入的参数。

## 函数式编程术语

> 笔记来源 [functional-programing-jargon](https://github.com/hemanth/functional-programming-jargon)

### 高阶函数 (Higher Order Function)

以函数为参数或返回值。

```js
const filter = (predicate, xs) => xs.filter(predicate)
const is = type => x => Object(x) instanceof type

filter(is(Number), [0, '1', 2, null]) // 0, 2
```

### 偏函数 (Partial Function)

"部分地"应用一个函数，即预设原始函数的部分参数来创建一个新的函数。

**使用 `Function.prototype.bind` 实现偏函数：**

```js
const add = (a, b, c) => a + b + c // (c) => 2 + 3 + c
const addMore = add.bind(null, 1, 2)

console.log(addMore(3)) // 6
```

**手写 partial 函数：**

```js
const add = (a, b, c) => a + b + c

const partial =
  (f, ...args) =>
  (...rest) =>
    f(...args, ...rest)

const addMore = partial(add, 1, 2)

console.log(addMore(3)) // 6
```

### 柯里化 (Currying)

将一个多元函数转变为一元函数的过程。每当函数被调用时，它仅仅接收一个参数并且返回带有一个参数的函数，直到传递完所有的参数。

```js
const sum = (a, b) => a + b
const curriedSum = a => b => a + b
curriedSum(3)(4) // 7

const add2 = curriedSum(2)
add2(10) // 12
```

**使用 `Function.prototype.bind` 实现 curry 函数：**

```js
const curry = f => {
  return (...args) => {
    // curriedF 每次调用都会使 f.length - args.length
    // 最后 f.length === 0
    if (args.length < f.length) {
      return curry(f.bind(null, ...args))
    } else {
      return f(...args)
    }
  }
}
```

**手写 curry 函数：**

```js
const curry = f => {
  // curriedF 每次调用都会收集当前传递的参数，利用 accArgs 闭包收集参数，收集齐了就调用原函数
  const R = (...accArgs) =>
    accArgs.length >= f.length ? f(...accArgs) : (...restArgs) => R(...restArgs, ...accArgs)
  return R
}
```

> [示例](../fp/curry.js)

### 函数组合 (Function Composing)

接收多个函数作为参数，从右到左，一个函数的输入为另一个函数的输出。

```js
const compose = (f, g) => a => f(g(a)) // 定义
const floorAndToString = compose(val => val.toString(), Math.floor) // 使用
floorAndToString(12.12) // '12'
```

**手写 compose 函数：**

```js
const compose =
  fns =>
  (...args) =>
    fns.reduceRight((acc, f) =>
      // reduceRight 第二个参数不传，第一次 acc 为数组 fns 最后一项，第二次以后就为函数返回值参数，直到循环结束。
      typeof acc === 'function' ? f(acc(...args)) : f(acc)
    )
```

> [示例](../fp/compose.js)

### 副作用 (Side effects)

如果一个函数或者表达式除了返回一个值之外，还与外部可变状态进行了交互（读取或写入），则它是有副作用的。

```js
console.log('IO is a side effect!')
```

### 幂等性 (Idempotent)

如果一个函数执行多次皆返回相同的结果，则它是幂等性的。

```js
f(f(x)) ≍ f(x)
```

### 纯函数 (Purity)

输出仅由输入决定，且不产生副作用。

```js
const greet = name => `hello, ${name}`
greet('world')
```

**以下代码不是纯函数：**

```js
window.name = 'Brianna'

const greet = () => `Hi, ${window.name}`
greet() // "Hi, Brianna"
```

以上示例中，函数依赖外部状态。

```js
let greeting

const greet = name => {
  greeting = `Hi, ${name}`
}

greet('Brianna')

console.log(greeting)  // "Hi, Brianna"
```

以上实例中，函数修改了外部状态。


### 值 (Value)

任何可以赋给变量的东西叫做值。

```js
5
Object.freeze({name: 'John', age: 30})
;(a) => a
;[1]
undefined
```

### 常量 (Constant)

一旦被定义之后就不可以被重新赋值。

**常量是引用透明的**，也就是说，它们可以被它们所代表的值替代而不影响结果。

```js
const five = 5
const john = Object.freeze({name: 'John', age: 30})

// 对于以上两个常量，以下语句总会返回 true。
john.age + five === ({name: 'John', age: 30}).age + (5)
```

### 引用透明性 (Referential Transparency)

一个表达式能够被它的值替代而不改变程序的行为成为引用透明。

```js
const greet = () => 'hello, world！'
```

任何对 `greet()` 的调用都可以替换为 `Hello World！` 因此，`greet` 是引用透明的。

### Lambda

一种可以被视作一个值的匿名函数。

```js
;(function (a) {
    return a + 1
})

;(a) => a + 1
```

Lambda 通常作为参数被传递给高阶函数。

```js
[1, 2].map((a) => a + 1)
```

可以把 Lambda 赋值给一个变量。

```js
const add1 = (a) => a + 1
```

### 谓词 (断定 Predicate)

根据输入返回 `true` 或 `false`。通常用在 `Array.prototype.filter` 的回调函数中。

```js
const predicate = a => a > 2

;[1, 2, 3, 4].filter(predicate)
```

### Point-Free 风格 (Point-Free Style)

定义函数时，不显式地指出函数所带参数。这种风格通常需要柯里化或者高阶函数。也叫 `Tacit programming`。

```js
const _map = fn => list => list.map(fn)
const add = a => b => a + b

// Points-Free   list 是显式参数
const incrementAll = numbers => _map(add(1))(numbers)

// Points-Free   list 是隐式参数
const incrementAll2 = _map(add(1))

console.log(incrementAll([1, 2, 3])) // [2, 3, 4]
console.log(incrementAll2([1, 2, 3])) // [2, 3, 4]
```

`incrementAll` 识别并且使用了 `numbers` 参数，因此它不是 `Point-Free` 风格的。 `incrementAll2` 连接函数与值，并不提及它所使用的参数，因为它是 `Point-Free` 风格的。

`Point-Free` 风格的函数就像平常的赋值，不使用 `function` 或者 `=>`。

### 函子 (Functor)

一个实现了 `map` 函数的对象，`map` 会遍历对象中的每个值并生成一个新的对象。遵守两个准则

#### 一致性 (Preserves identity)

```js
object.map(x => x) ≍ object
```

#### 组合性 (Composable)

```js
object.map(compose(f, g)) ≍ object.map(g).map(f)  // f, g 为任意函数
```

在 `javascript` 中一个常见的函子是 `Array`, 因为它遵守因子的两个准则。

```js
const f = x => x + 1
const g = x => x * 2

;[1, 2, 3].map(x => f(g(x)))
;[1, 2, 3].map(g).map(f)
```

### 指向函子 (Pointed Functor)

一个实现了 `of` 函数的对象，可以将一个任何值放入它自身。

`ES2015` 添加了 `Array.of`，使 `Array` 成为了 `Pointed Functor`

```js
Array.of(1)
```

### 惰性求值 (Lazy evaluation)

惰性求值是一种按需调用的求值机制，它将表达式的求值延迟到需要它的值为止，在函数式语言中，允许类似无限列表这样的结构存在，而这在非常重视命令顺序的命令式语言中通常是不可用的。

```js
const rand = function* () {
  while (true) {
    yield Math.random()
  }
}

const randIter = rand()
randIter.next() // 每次执行产生一个随机值，表达式会在需要时求值。
```

### 幺半群 (Monoid)

> 一个对象拥有一个函数用来连接相同类型的对象。

数值加法是一个简单的 `Monoid`

```js
1 + 1 // 2
```

以上示例中，数值是对象而 `+` 是函数。

**与另一个值结合而不会改变它的值必须存在**，称为 `identity`。

加法的 `identity` 值为 `0`:

```js
1 + 0 // 1
```

需要满足结合律

```js
1 + (2 + 3) === 1 + 2 + 3 // true
```

数组的结合也是 `Monoid`

```js
;[1, 2].concat([3, 4])
```

`identity` 值为空数组

```js
;[1, 2].concat([])
```

`identity` 与 `compose` 函数能够组成 `monoid`

```js
const identity = a => a
const compose = (f, g) => x => f(g(x))
```

`foo` 是只带一个参数的任意函数

```js
compose(foo, identity) ≍ compose(identity, foo) ≍ foo
```

### Monad

拥有 `of` 和 `chain` 函数的对象。`chain` 很像 `map`， 除了用来铺平嵌套数据。

```js
Array.prototype.chain = function (f) {
  return this.reduce((acc, it) => acc.concat(f(it)), [])
}

// ['cat', 'dog', 'fish', 'bird']
Array.of('cat,dog', 'fish,bird').chain(s => s.split(','))

// [['cat', 'dog'], ['fish', 'bird']]
Array.of('cat,dog', 'fish,bird').map(s => s.split(','))
```

在有些语言中，`of` 也称为 `return`，`chain` 也称为 `flatmap` 与 `bind`。

### 半群 (Semigroup)

一个拥有 `concat` 函数的对象。`concat` 可以连接相同类型的两个对象。

```js
;[1].concat([2]) // [1, 2]
```

### Foldable

一个拥有 `reduce` 函数的对象。`reduce` 可以把一种类型的对象转化为另一种类型。

```js
const sum = list => list.reduce((acc, val) => acc + val, 0)
sum([1, 2, 3]) // 6
```

### Setoid

拥有 `equals` 函数的对象。`equals` 可以用来和其它对象比较。

```js
Array.prototype.equals = function (arr) {
  const len = this.length
  if (len !== arr.length) {
    return false
  }
  for (let i = 0; i < len; i++) {
    if (this[i] !== arr[i]) {
      return false
    }
  }
  return true
}
;[1, 2].equals([1, 2]) // true
;[1, 2].equals([3, 4]) // false
```

### 态射 (Morphism)

一个变形的函数。

#### 自同态 (Endomorphism)

输入输出是相同类型的函数。

```js
// uppercase :: String -> String
const uppercase = str => str.toUpperCase()

// decrement :: Number -> Number
const decrement = x => x - 1
```

#### 同构 (Isomorphism)

不用类型对象的变形，保持结构并且不丢失数据。

例如，一个二维坐标既可以表示为数组 `[2, 3]`，也可以表示为对象 `{x: 2, y: 3}`。

```js
// 提供函数在两种类型间互相转换
const pairToCoords = pair => ({ x: pair[0], y: pair[1] })

const coordsToPair = coords => [coords.x, coords.y]

coordsToPair(pairToCoords([1, 2])) // [1, 2]

pairToCoords(coordsToPair({ x: 1, y: 2 })) // {x: 1, y: 2}
```

## 经过 curry 的类型表达式

```js
map: Functor f => (a -> b) -> f a -> f b
// a 类型 映射 b 类型 f 是数据结构 Array （a -> b）函子的 map 函数
// Array<number> -> Array<string>
// [1, 2, 3].map(...).map(...).map(...)
// Promise.then(...).then(...).then(...)
// Monad
```

思考： `Functor` 是什么？

1. `Functor` 是 `Array<T>`
2. `Functor` 函子：范畴间的同态（说人话：带泛型的类型 `Array<T>`, `Promise<T>` ）

### 范畴 (Category)

在范畴论中，范畴是指对象集合及它们之间的态射 (morphism)。在编程中，数据类型作为对象，函数作为态射。

一个有效的范畴遵从以下三个原则：

1. 必有一个 `identity` 态射，使得 `map` 一个对象是它自身。`a` 是范畴里的一个对象时，必有一个函数使 `a -> a`。
2. 态射必是可组合的。`a，b，c` 是范畴里的对象，`f` 是态射 `a -> b`，`g` 是 `b -> c` 态射。`g(f(x))` 一定与 `(g ● f)(x)` 是等价的。
3. 组合满足结合律。`f ● (g ● h)` 与 `(f ● g) ● h` 是等价的。

这些准则是非常抽象的，范畴论对与发现组合的新方法是伟大的。


### 契约 (Contracts)

契约规定了函数或表达式在运行时的行为的职责和保障。它表现为一组规则，这些规则是对函数或表达式的输入和输出的期望。当违反契约时，将抛出一个错误。

```js
// typescript
// 定义的 contract: int -> boolean
const contract = (input) => {
  if (typeof input === 'number') return true
  throw new Error('Contract Violated: expected int -> int')
}

const addOne = (num) => contract(num) && num + 1

addOne(2) // 3
addOne('hello') // 违反了contract: int -> boolean
```
