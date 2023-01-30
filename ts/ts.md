# TypeScript 备忘录<!-- omit in toc -->

- [小抄](#小抄)
  - [5.0](#50)
  - [4.9](#49)
  - [4.8](#48)
  - [4.7](#47)
  - [4.6](#46)
  - [4.5](#45)
  - [逆变](#逆变)
  - [as](#as)
  - [鸭子类型](#鸭子类型)
  - [技巧](#技巧)
  - [内置](#内置)
- [TypeScript 类型系统](#typescript-类型系统)
  - [复用 JS 的类型](#复用-js-的类型)
  - [TS 新增的类型](#ts-新增的类型)
    - [枚举（Enum）](#枚举enum)
      - [异构枚举](#异构枚举)
      - [常量枚举](#常量枚举)
    - [元组（Tuple）](#元组tuple)
    - [接口（Interface）](#接口interface)
    - [字面量类型](#字面量类型)
    - [特殊类型](#特殊类型)
    - [类型的装饰](#类型的装饰)
    - [联合类型](#联合类型)
    - [交叉类型](#交叉类型)
    - [模板字面类型](#模板字面类型)
      - [基础语法](#基础语法)
      - [新增关键字](#新增关键字)
- [Typescript 类型编程](#typescript-类型编程)
  - [函数](#函数)
  - [三元表达式](#三元表达式)
  - [数据结构](#数据结构)
    - [Set 上的操作](#set-上的操作)
    - [Map 上的操作](#map-上的操作)
  - [循环实现思路](#循环实现思路)
- [其他](#其他)
  - [类](#类)
    - [基础写法](#基础写法)
    - [get / set](#get--set)
    - [单例模式](#单例模式)
    - [抽象类](#抽象类)
  - [断言](#断言)
    - [类型断言](#类型断言)
    - [! 断言](#-断言)
  - [类型守卫](#类型守卫)
  - [类型谓词](#类型谓词)
  - [参数强校验](#参数强校验)
  - [object，{}，Object](#objectobject)
  - [TS 对于字符字面量的处理](#ts-对于字符字面量的处理)
  - [循环依赖](#循环依赖)
  - [环境 Ambient Modules](#环境-ambient-modules)
  - [tsconfig 配置项](#tsconfig-配置项)
  - [注意事项](#注意事项)
- [写 TypeScript 时，什么时候用 any？什么时候用 unknown？有没有规律或准则？](#写-typescript-时什么时候用-any什么时候用-unknown有没有规律或准则)
- [TypeScript 中的 never 类型具体有什么用？](#typescript-中的-never-类型具体有什么用)
- [TS 已经有模块系统了，为什么还需要 NameSpace？](#ts-已经有模块系统了为什么还需要-namespace)

## 小抄

### 5.0

1. 新增了对泛型参数的常量修饰（基本等价于常量断言），被修饰的泛型参数在进行类型信息推导时，将推导到尽可能精确的字面量类型层级。
2. 现在可以使用 `export type * from 'module'` 或者 `export type * as namespace from 'module'` 来导出类型了。

### 4.9

1. satisfies 操作符

### 4.8

1. 由于 `{}` 就是一个空对象，因此除 `null`、`undefined` 以外的一切基础类型，都可以被视为是继承于 `{}` 之后派生出来的，在 4.8 版本，现在 `unknown` 和 `{} | null | undefined` 可以互相兼容。
2. 当 infer 被约束为一个原始类型，那么它现在会尽可能将 infer 的类型信息推导到字面量类型的级别。

### 4.7

1. infer 关键字的 extends 约束
2. 泛型实例化表达式

### 4.6

1. 对于没有使用 this 的代码来说，其实在 super 前调用时不应该抛出错误（实际上 ES6 就是支持这么做的）。
1. 递归类型检查增强

### 4.5

1. Awaited 递归解包 Promise 类型
2. 基于模板字符串类型的类型守卫
3. 值导入与类型导入的混用
4. 导入断言
5. 条件类型的尾递归优化

### 逆变

逆变主要是函数赋值的时候函数参数的性质，参数的父类型可以赋值给子类型，这是因为按照子类型来声明的参数，访问父类型的属性和方法自然没问题，依然是类型安全的。但反过来就不一定了。

> <https://zhuanlan.zhihu.com/p/454202284>

(Animal → Corgi) 是 (Dog → Dog) 的子类型。

是不是可以这样形象地理解逆变：

1. 刘阿姨喜欢狗，可以送她一只柯基，因为柯基属于一种狗。我们说柯基是狗的子类型。
2. 刘阿姨想给柯基做美容，可以把她带到柯基美容院，也可以把她带到狗狗美容院，因为狗狗美容院可以给所有狗（包括柯基）做美容。我们说狗狗美容院是柯基美容院的子类型（尽管反直觉）。

总结：
1.可以把柯基当作狗狗，当不能把狗狗当成柯基。
2.狗狗美容院可以代替柯基美容院，柯基美容院不可以代替狗狗美容院。

### as

1. as 意味着什么？你指着编译器的脸告诉它，这个变量的类型就是这个，不服憋着。as 实际上只能转换存在父子类型的关系。（const foo = {} as any as Function）
2. 索引类型使用 as 叫做重映射

### 鸭子类型

像 java 里面的类型都是通过 extends 继承的，如果 A extends B，那 A 就是 B 的子类型。这种叫做名义类型系统（nominal type）。
而 ts 里不看这个，只要结构上是一致的，那么就可以确定父子关系，这种叫做结构类型系统（structual type）。

### 技巧

1. 模式匹配（各种类型通过 infer 提取某部分类型）
2. 重新构造（类型是不可变的，想修改只能重新构造一个新的。最主要的是通过映射类型来生成新的索引类型）
3. 递归（类型编程里涉及到数量不确定的问题，要条件反射的想到用递归来解决）
4. 数组长度计数（严格来说是元组长度，通过构造不同元素个数的元组再取长度的方式实现计数）
5. 联合类型的分发特性（分布式条件类型，当联合类型作为类型参数出现在条件类型左边的时候触发）
6. any 类型与任何类型的交叉都是 any，也就是 1 & any 结果是 any，可以用这个特性判断 any 类型。
7. 联合类型作为类型参数出现在条件类型左侧时，会分散成单个类型传入，最后合并。（A extends A）
8. never 作为类型参数出现在条件类型左侧时，会直接返回 never。（[never]）
9. any 作为类型参数出现在条件类型左侧时，会直接返回 trueType 和 falseType 的联合类型。
10. 元组类型也是数组类型，但每个元素都是只读的，并且 length 是数字字面量，而数组的 length 是 number。可以用来判断元组类型。
11. 函数参数处会发生逆变，可以用来实现联合类型转交叉类型。
12. 可选索引的值为 undefined 和值类型的联合类型。可以用来过滤可选索引，反过来也可以过滤非可选索引。
13. 索引类型的索引为字符串字面量类型，而可索引签名不是，可以用这个特性过滤掉可索引签名。
14. keyof 只能拿到 class 的 public 的索引，可以用来过滤出 public 的属性。
15. 交叉本质是同时满足两个类型
16. 由于 {} 就是一个空对象，因此除 null、undefined 以外的一切基础类型，都可以被视为是继承于 {} 之后派生出来的
17. null & {}、undefined & {} 会直接被判断为 never

### 内置

1. 比如用模式匹配可以实现：Parameters、ReturnType、ConstructorParameters、InstanceType、ThisParameterType。
1. 用模式匹配 + 重新构造可以实现：OmitThisParameter
1. 用重新构造可以实现：Partial、Required、Readonly、Pick、Record
1. 用模式匹配 + 递归可以实现： Awaited
1. 用联合类型在分布式条件类型的特性可以实现： Exclude
1. 此外还有 NonNullable 和四个编译器内部实现的类型：Uppercase、Lowercase、Capitalize、Uncapitalize。

## TypeScript 类型系统

### 复用 JS 的类型

**静态类型系统的目的是把类型检查从运行时提前到编译时**，那 TS 类型系统中肯定要把 JS 的运行时类型拿过来，也就是 `number`、`boolean`、`string`、`object`、`bigint`、`symbol`、`undefined`、`null` 这些类型，还有就是它们的包装类型 `Number`、`Boolean`、`String`、`Object`、`Symbol`。其它 `class`、`Array` 这些 TypeScript 类型系统也都支持。

```ts
// number 类型
const num: number = 1
// string 类型
const str: string = 'hello world'
// boolean 类型
let isDone: boolean = false
// symbol 类型
const s: symbol = Symbol('s')

// ...

// class 类型
class Person {}
const person: Person = new Person()
// Array 类型
const arr: number[] = [1, 2, 3]
// Array<number> 泛型语法
const arr1: Array<number> = [1, 2, 3]
// 联合类型数组
const arr2: (number | string)[] = ['hello', 2, '3', 1]
// 必须写返回值
const sum: (a: number, b: number) => number = (a, b) => a + b
// 返回值可以推断出来，但推荐必须写
const sum1 = (a: number, b: number) => a + b + ''

// JSON 序列化后的数据类型，需要手动注解，无法推断
const response = { name: 'chu', age: 28 }
// any
const data = JSON.parse(JSON.stringify(response))

// ⚠️ 注意事项：typescript 无法自动推断类型需要手动注解，断言类型
```

### TS 新增的类型

#### 枚举（Enum）

##### 异构枚举

```ts
// 异构枚举：字符串枚举，数字枚举混合
// 默认情况下，A 的初始值为 0，其余的成员会从 1 开始自动增长。
// 当然我们也可以设置成员的初始值，比如：E = 8，C = 'C'
enum Enum {
  A,
  B,
  C = 'C',
  D = 'D',
  E = 8,
  F
}
```

编译后的 ES5 代码如下：

```js
'use strict'
var Enum
;(function (Enum) {
  Enum[(Enum['A'] = 0)] = 'A'
  Enum[(Enum['B'] = 1)] = 'B'
  Enum['C'] = 'C'
  Enum['D'] = 'D'
  Enum[(Enum['E'] = 8)] = 'E'
  Enum[(Enum['F'] = 9)] = 'F'
})(Enum || (Enum = {}))
```

观察上述生成的 ES5 代码，我们可以发现数字枚举相对字符串枚举多了 **“反向映射”**：

```js
console.log(Enum.A) // 输出：0
console.log(Enum[0]) // 输出：A
```

##### 常量枚举

```ts
const enum Direction {
  NORTH,
  SOUTH,
  EAST,
  WEST
}

let dir: Direction = Direction.NORTH
```

以上代码编译后的 ES5 代码如下：

```js
'use strict'
var dir = 0 /* NORTH */
```

>⚠️ 注意：

1. enum 在 TS 中出现的比较早，它引入了 JS 没有的数据结构（编译成一个双向 map），入侵了运行时，与 TS 宗旨不符。用 `string literal union（’small’ | ‘big’ | ‘large’）` 可以做到相同的事，且在 debug 时可读性更好。

2. babel 不支持 `const enum`（会作为 enum 处理）。

#### 元组（Tuple）

元组（Tuple）就是元素个数和类型固定的数组类型：

```ts
// const arr: (string | number | {
//   key: string;
// })[]

// const arr: readonly [1, {
//   readonly key: "val";
// }, "str"]

// 数组转元组
const arr = [1, { key: 'val' }, 'str'] as const
```

#### 接口（Interface）

> 接口可以用来描述函数、构造器、索引类型（对象、class、数组）等复合类型。

```ts
// 接口定义类
interface Person {
  readonly name: string
  age?: number
  [propName: string]: any
  sayHi(): string
}

// 接口继承
interface Teacher extends Person {
  teach(): string
}

// 接口定义函数
interface SayHello {
    // 重载
  (hello: string): string
  (hello: number): number
}

// 类实现接口
class Gu implements Teacher {
  name = 'chu'
  age = 28
  sex = 'mail'
  sayHi = () => 'hi'
  teach = () => 'teach'
}

const gu = new Gu()
console.log(gu.name) // 'chu'

// 函数实现接口
const hello: SayHello = hello => hello
console.log(hello('hello')) // 'hello'
```

对象类型、class 类型在 TypeScript 里也叫做索引类型，也就是索引了多个元素的类型的意思。**对象可以动态添加属性，如果不知道会有什么属性，可以用可索引签名：**

```ts
// 索引类型 keyof any === string | number | symbol
type O = { [key: keyof any]: any }
```

#### 字面量类型

TypeScript 支持字面量类型，也就是类似 `1111`、`'aaaa'`、`{ a: 1}` 这种值也可以做为类型。

#### 特殊类型

四种特殊的类型：`void`、`never`、`any`、`unknown`：

- `void` 代表空，可以是 `null` 或者 `undefined`，一般是用于函数返回值。
- `any` 是任意类型，任何类型都可以赋值给它，它也可以赋值给任何类型（除了 `never`）。
- `unknown` 是未知类型，任何类型都可以赋值给它，但是它不可以赋值给别的类型。
- `never` 代表不可达，比如函数抛异常的时候，返回值就是 `never`。

> 默认情况下 `null` 和 `undefined` 是所有类型的子类型。就是说你可以把 `null` 和 `undefined` 赋值给 `number` 类型的变量。然而，如果你指定了`--strictNullChecks` 标记，`null` 和 `undefined` 只能赋值给 `void` 和它们各自的类型。

#### 类型的装饰

除了描述类型的结构外，TypeScript 的类型系统还支持描述类型的属性，比如是否可选，是否只读等：

```js
interface IPerson {
  readonly name: string
  age?: number
}

// type tuple = [string, (number | undefined)?]
type tuple = [string, number?]

// -? 就是将可选项代表的 ? 去掉, 从而让这个类型变成必选项. 与之对应的还有个 +? , 这个含义自然与 -? 之前相反, 它是用来把属性变成可选项的.
type Required<T> = { [P in keyof T]-?: T[P] }
```

#### 联合类型

联合类型（Union）类似 JS 里的**或运算符** `|`，但是作用于类型，代表类型可以是几个类型之一。

```ts
// 可以用 Union 类型来表示 Set 数据结构
// 「type number = 1 | 2 | 3 | ...」（实际上 number 不可再分割）
type Size = 'small' | 'default' | 'big' | 'large'
```

联合类型作为类型参数出现在条件类型左边的时候，会把每个类型单独传入做计算，把结果合并成联合类型。

```ts
// 静态的值自己就能算出结果
type _res = 1 | 'a' extends number ? 1 : 2

// 动态计算
type Test<T> = T extends number ? 1 : 2
// type res = 1 | 2
type res = Test<1 | 'a'>

// boolean 也是联合类型
type Test<T> = T extends true ? 1 : 2
// type res = 1 | 2
type res = Test<boolean>

// 当条件类型左边是 never 的时候，就会直接返回 never
type Test<T> = T extends true ? 1 : 2
// type res = never
type res = Test<never>

// 如果左边是 any，则会返回 trueType 和 falseType 的联合类型
type Test<T> = T extends true ? 1 : 2
// type res = 1 | 2
type res = Test<any>
```

#### 交叉类型

交叉类型（Intersection）类似 JS 中的**与运算符** `&`，但是作用于类型，代表对类型做合并。**交叉类型会把同一类型做合并，不同类型舍弃。**

```ts
interface X {
  c: string
  d: string
}

interface Y {
  c: number
  e: string
}

type XY = X & Y
```

在上面的代码中，接口 X 和接口 Y 都含有一个相同的成员 c，但它们的类型不一致。对于这种情况，成员 c 的类型会变成 `never`。这是因为混入后成员 c 的类型为 `string & number`，即成员 c 的类型既可以是 `string` 类型又可以是 `number` 类型。很明显这种类型是不存在的，所以混入后成员 c 的类型为 `never`。

#### 模板字面类型

##### 基础语法

```ts
type Join<S1 extends string, S2 extends string> = `${S1} ${S2}`
type T = Join<'Hello', 'World'> // 'Hello World'
```

字符串模板中的联合类型会被展开后排列组合：

```ts
type T = `${'top' | 'bottom'}-${'left' | 'right'}`

// type T = "top-left" | "top-right" | "bottom-left" | "bottom-right"
```

##### 新增关键字

```ts
type Cases<T extends string> = `${uppercase T} ${lowercase T} ${capitalize T} ${uncapitalize T}`;
type T11 = Cases<'bar'>;  // 'BAR bar Bar bar'
```

其实很简单，就是提供了几个处理方法：大写、小写，首字母大写，首字母小写。

## Typescript 类型编程

TypeScript 的**类型系统是图灵完备的**，可以实现各种复杂的类型计算逻辑。
<!-- 简单点来理解就是循环、条件等编程语言有的语法它都有，其它语言能写的逻辑它都能写。 -->

### 函数

`Javascript` 中有函数的概念，那么 `TypeScript` 相关语法中有没有函数的概念呢？答案是有的，**带泛型的类型就相当于函数**。

其中 `<T>` 就相当于函数括弧和参数列表，`=` 后面的就相当于函数定义。

```ts
// 参数
type Student = {
  name: string
  age: number
}

// 外部变量
// outer 闭包变量，函数内部无法修改
type outer = number
type GetNameFromStudent<Student> = Student extends { name: string } ? outer : never

const s0: GetNameFromStudent<Student> = 9527

// infer 声明内部变量
type GetAgeFromStudent<Student> = Student extends { age: infer Age } ? Age : never

const s1: GetNameFromStudent<Student> = 18
```

**常见泛型变量语义化：**

- **T：** 表示一个 TypeScript 类型（Type）
- **K：** 表示对象中的键类型（Key）
- **V：** 表示对象中的值类型（Value）
- **E：** 表示元素类型（Element）

**extends 关键字：**

```ts
interface Length {
  length: number
}

function log<T extends Length>(arg: T): T {
  console.log(arg.length)
  return arg
}
```

现在这个泛型函数被定义了约束，因此它不再是适用于任意类型：

```ts
log(3) // Error, number doesn't have a .length property
```

这时我们需要传入符合约束类型的值，必须包含必须的属性：

```TS
log({ length: 10, value: 3 })
```

**TS 函数的缺陷：**

1. 函数不能作为参数（传入的参数只能作为静态值变量引用，不能作为可调用的函数）。
2. 支持闭包，但是没有办法修改闭包中的值。

**infer 关键字：**

**在条件类型语句中**，可以用 `infer` 声明一个类型变量并且对它进行使用。

```ts
type ReturnType<T> = T extends (...args: any) => infer R ? R : any
```

以上代码中 `infer R` 就是声明一个变量来承载传入函数签名的返回值类型，简单说就是用它取到函数返回值的类型方便之后使用。

> infer 的作用是让 TS 自己推断，并将推断的结果存储到一个临时名字中，**并且只能用于 extends 语句中**。它与泛型的区别在于，泛型是声明一个“参数”，而 infer 是声明一个“中间变量”。

### 三元表达式

TS 里的条件判断是 `extends ? :`。

比如：

```ts
// 静态的值自己就能算出结果来，用代码判断没有必要
type res = 1 extends 2 ? true : false
// 但当 res 接受泛型变量时，就需要用代码来判断了。
type isTwo<T> = T extends 2 ? true : false
```

### 数据结构

基本类型，也可以理解为**原子类型**。包括 `number`、`boolean`、`string`、`null`、`undefined`、`function`、`array`、字面量等。**它们无法再细分**。

**复合类型可以分为两类**：set 和 map。set 是指一个无序的、无重复元素的集合。而 map 则和 JS 中的对象一样，是一些没有重复键的键值对。

- 可以用 Union 类型来表示 Set 数据结构
- 对象、class 在 TS 对应的类型是索引类型，也就是索引了多个元素的类型的意思，可以用索引类型表示 Map 数据结构

#### Set 上的操作

**in 关键字：**

```ts
// in 用来遍历 Set
type Keys = 'a' | 'b' | 'c'

type O = {
  [key in Keys]: any
}
```

**保留 set 的一部分：**

```ts
type MyExtract<T, U> = T extends U ? T : never

type Result = 1 | 2 | 3 | 'error' | 'success'
// 保留 string
type StringResult = MyExtract<Result, string>
```

**删除 set 的一部分：**

```TS
type MyExclude<T, U> = T extends U ? never : T

type Result = 1 | 2 | 3 | 'error' | 'success'
// 删除 string
type NumericResult = Exclude<Result, string>
```

#### Map 上的操作

**keyof 关键字：**

`keyof T` 是查询索引类型 T 中所有的索引，叫做索引查询。其返回值是 Union。

```TS
// type ObjectKey = string | number | symbol
type ObjectKey = keyof any

// type StringOrNumber = string | number
// 原因：JavaScript 在执行索引操作时，会先把数值索引先转换为字符串索引。
type StringOrNumber = keyof { [x: string]: any }
```

`T[Key]` 是取索引类型某个索引的值，叫做索引访问。

**同态变换：**

```TS
type Partial<T> = { [P in keyof T]?: T[P] } // 将一个 map 所有属性变为可选的
type Required<T> = { [P in keyof T]-?: T[P] } // 将一个 map 所有属性变为必选的
type Readonly<T> = { readonly [P in keyof T]: T[P] } // 将一个 map 所有属性变为只读的
type Mutable<T> = { -readonly [P in keyof T]: T[P] } // ts 标准库未包含，将一个 map 所有属性变为可写的
```

**由 set 生成 map：**

```ts
type MyRecord<K extends keyof any, T> = { [P in K]: T }
type Size = 'small' | 'default' | 'big'

// type SizeMap = {
//   small: string;
//   default: string;
//   big: string;
// }
type SizeMap = MyRecord<Size, string>
```

**保留 map 的一部分：**

```ts
type MyPick<T, K extends keyof T> = { [P in K]: T[P] }
// type BiggerSizeMap = {
//   default: string;
//   big: string;
// }
type BiggerSizeMap = MyPick<SizeMap, 'default' | 'big'>
```

**删除 map 的一部分：**

```ts
type MyOmit<T, K> = Pick<T, Exclude<keyof T, K>>
// type DefaultSizeMap = {
//   default: string;
// }
type DefaultSizeMap = MyOmit<BiggerSizeMap, 'big'>
```

### 循环实现思路

**TypeScript 类型系统不支持循环，但支持递归。**

> 注意：递归只有在 TS 4.1.0 才支持

当处理数量（个数、长度、层数）不固定的类型的时候，可以只处理一个类型，然后递归的调用自身处理下一个类型，直到结束条件也就是所有的类型都处理完了，就完成了不确定数量的类型编程，达到循环的效果。下面是一个例子：

```ts
type IntSeq<N, S extends any[] = []> = S['length'] extends N ? S : IntSeq<N, [...S, S['length']]>
```

## 其他

### 类

#### 基础写法

```ts
// private public protected
// 类内部 类内外部 类和继承类
class Person {
  // ts 声明类属性
  // public name: string
  // constructor(name: string) {
  //   this.name = name
  // }
  // 简化写法，相当于上面四行
  constructor(public name: string) {}
  getName() {
    return this.name
  }
}

const person = new Person('chu')
console.log(person.name)

// 子类
class Teacher extends Person {
  constructor(public age: number) {
    super('gu')
  }
}

const teacher = new Teacher(28)
console.log(teacher.name, teacher.age)
```

#### get / set

```ts
class Person {
  // private name: string
  // constructor(name: string) {
  //   this.name = name
  // }
  // 简化写法，相当于上面四行
  constructor(private _name: string) {}
  // get 可以获取类内部的属性值，写作函数，读取时以属性方式读取
  get name() {
    return this._name
  }
  set name(next: string) {
    // 对受保护的属性进行操作
    // 此处可以做的更多
    this._name = next
  }
}

const person = new Person('chu')
// person._name 类外面拿不到
console.log('原始值', person.name)
person.name = 'hello'
console.log('修改后', person.name)
```

#### 单例模式

```ts
class Person {
  private static instance: Person
  private constructor(public name: string) {}
  static getInstance(name: string) {
    // Person.getInstance() 调用 this 指向 Person
    if (!this.instance) {
      // 只执行一次，所以 name 只赋值一次
      this.instance = new Person(name)
    }
    // 每次调用 getInstance() 返回的都是同一个 instance
    return this.instance
  }
}

// 按引用比较
const person1 = Person.getInstance('chu')
const person2 = Person.getInstance('gu')

console.log(person1, person2, person1 === person2)

// 单例模式 上面代码相当于下面代码
const o = { name: 'chu' }
const p1 = o
const p2 = o
p1.name = 'chu'

console.log(p1, p2, p1 === p2)
```

#### 抽象类

```ts
abstract class Geom {
  constructor(readonly width: number) {}
  abstract getArea(): string
  sayHi(): void {
    console.log('hi')
  }
}

// 抽象类不可以被 new 只可以继承
// const geom = new Geom() // 会报错

// 抽象方法必须实现，相当于必须实现的公有方法

class Circle extends Geom {
  getArea() {
    return 'Circle'
  }
}

class Square extends Geom {
  getArea() {
    return 'Square'
  }
}

// 只读属性
const square = new Square(100)
console.log(square.width)
// square.width = 200 // 会报错

// 接口抽象
interface Person {
  name: string
  age: number
}

interface Teacher extends Person {
  teach(): string
}

interface Student extends Person {
  learn(): string
}
```

### 断言

#### 类型断言

```ts
let someValue: unknown = 'this is a string'
// “尖括号” 语法，与 jsx 冲突
let strLength: number = (<string>someValue).length
// as 语法
let strLength: number = (someValue as string).length
```

#### ! 断言

`!` 的作用是**断言某个变量不会是 `null / undefined`，告诉编译器停止报错**。这里由用户确保断言的正确。`!` 只是消除编译器报错，不会对运行时行为造成任何影响。

```ts
// TypeScript
mightBeUndefined!.a = 2
// 编译为
mightBeUndefined.a = 2
```

### 类型守卫

```TS
interface Bird {
  fly: boolean
  sing(): string
}

interface Dog {
  fly: boolean
  bark(): string
}

function trainAnimal(animal: Bird | Dog) {
  // 类型断言做类型保护
  if (animal.fly) {
    ;(animal as Bird).sing()
  } else {
    ;(animal as Dog).bark()
  }
}

function trainAnimal(animal: Bird | Dog) {
  // in 做类型保护
  if ('sing' in animal) {
    animal.sing()
  } else {
    animal.bark()
  }
}

// typeof 做类型保护
function sum(first: number | string, second: number | string) {
  if (typeof first === 'string' || typeof second === 'string') {
    return `${first}${second}`
  }
  return first + second
}

// instanceof 类型保护
class Count {
  constructor(public count: number) {}
}

function sum(first: object | Count, second: object | Count) {
  if (first instanceof Count && second instanceof Count) {
    return first.count + second.count
  }
  return NaN
}
```

### 类型谓词

```TS
function isNumber(x: any): x is number {
  return typeof x === 'number'
}

function isString(x: any): x is string {
  return typeof x === 'string'
}
```

### 参数强校验

```ts
// 案例一
interface Person {
  name: string
  age?: number
}

const logger = (person: Person): void => {
  console.log(person.name)
}

const person = { name: 'chu', sex: 'mail' }

logger(person) // 不会报错
logger({ name: 'chu', sex: 'mail' }) // 强校验

// 案例二
interface Point {
  x: number
  y: number
}

const point: Point = {
  x: 1,
  y: 2,
  z: 3 // 报错，多余的属性
}

const tmp = {
  x: 1,
  y: 2,
  z: 3
}

const _point: Point = tmp // 不报错
```

### object，{}，Object

object 类型是：TypeScript 2.2 引入的新类型，它用于表示非原始类型。

> object is a type that represents the non-primitive type, i.e. any thing that is not number, string, boolean, symbol, null, or undefined.

`{}` 字面量：

```ts
const o = {}
// 当你试图访问这样一个对象的任意属性时，TypeScript 会产生一个编译时错误。
// Error: Property 'x' does not exist on type '{}'.
o.x = 'test'
// 但是，你仍然可以使用在 Object 类型上定义的所有属性和方法，这些属性和方法可通过 JavaScript 的原型链隐式地使用
o.toString()
```

Object 类型：**它是所有 Object 类的实例的类型**，它由以下两个接口来定义：

- Object 接口定义了 `Object.prototype` 原型对象上的属性
- ObjectConstructor 接口定义了 Object 类的属性。

```ts
// node_modules/typescript/lib/lib.es5.d.ts
interface Object {
  constructor: Function
  toString(): string
  toLocaleString(): string
  valueOf(): Object
  hasOwnProperty(v: PropertyKey): boolean
  isPrototypeOf(v: Object): boolean
  propertyIsEnumerable(v: PropertyKey): boolean
}

interface ObjectConstructor {
  /** Invocation via `new` */
  new (value?: any): Object
  /** Invocation via function calls */
  (value?: any): any
  readonly prototype: Object
  getPrototypeOf(o: any): any
  // ···
}

declare var Object: ObjectConstructor
```

### TS 对于字符字面量的处理

如果直接把一个字符串赋值给变量，TS 会保留字面量类型。

```ts
const str: string = 'str' // -> const str: string
```

但是如果我赋值给对象的属性

```ts
const o = {
  a: 'str'
} // -> const o = { a: string }
```

字面量 "str" 的类型就丢失了，变成了 `string`。

假如我就是需要这个字面量准确的类型呢？

```ts
const o1 = { a1: 'str' } as const
// -> const o1: {
//   readonly a1: "str";
// }
```

### 循环依赖

```js
// JavaScript 中是不建议存在循环依赖的
// 这两个模块不应该互相 import 对方

// editor.js
import { Element } from './element'
// element.js
import { Editor } from './editor'
```

```ts
// 循环引用可以在 TS 中使用
//「循环引用的是类型，编译以后就没了」
// 最佳实践是使用 import type 语法
// element.ts
import type { Editor } from './editor'

// 这个 type 可以放心地用作类型标注，不造成循环引用
class Element {
  editor: Editor
}
```

### 环境 Ambient Modules

在实际应用开发时有一种场景，当前作用域下可以访问某个变量，但这个变量并不由开发者控制。例如通过 `Script` 标签直接引入的第三方库 CDN、一些宿主环境的 API 等。这个时候可以利用 TS 的环境声明功能，来告诉 TS 当前作用域可以访问这些变量，以获得类型提醒。

具体有两种方式，`declare` 和三斜线指令。

```ts
declare const IS_MOBILE = true // 编译后此行消失
const wording = IS_MOBILE ? '移动端' : 'PC 端'
```

用三斜线指令可以一次性引入整个类型声明文件。

```ts
/// <reference path="../typings/monaco.d.ts" />
const range = new monaco.Range(2, 3, 6, 7)
```

### tsconfig 配置项

- **files** - 设置要编译的文件的名称；
- **include** - 设置需要进行编译的文件，支持路径模式匹配；
- **exclude** - 设置无需进行编译的文件，支持路径模式匹配；
- **compilerOptions** - 设置与编译流程相关的选项。

compilerOptions 每个选项的详细说明如下：

```json
{
  "compilerOptions": {

    /* 基本选项 */
    "target": "es5",                       // 指定 ECMAScript 目标版本: 'ES3' (default), 'ES5', 'ES6'/'ES2015', 'ES2016', 'ES2017', or 'ESNEXT'
    "module": "commonjs",                  // 指定使用模块: 'commonjs', 'amd', 'system', 'umd' or 'es2015'
    "lib": [],                             // 指定要包含在编译中的库文件
    "allowJs": true,                       // 允许编译 javascript 文件
    "checkJs": true,                       // 报告 javascript 文件中的错误
    "jsx": "preserve",                     // 指定 jsx 代码的生成: 'preserve', 'react-native', or 'react'
    "declaration": true,                   // 生成相应的 '.d.ts' 文件
    "sourceMap": true,                     // 生成相应的 '.map' 文件
    "outFile": "./",                       // 将输出文件合并为一个文件
    "outDir": "./",                        // 指定输出目录
    "rootDir": "./",                       // 用来控制输出目录结构 --outDir.
    "removeComments": true,                // 删除编译后的所有的注释
    "noEmit": true,                        // 不生成输出文件
    "importHelpers": true,                 // 从 tslib 导入辅助工具函数
    "isolatedModules": true,               // 将每个文件做为单独的模块 （与 'ts.transpileModule' 类似）.

    /* 严格的类型检查选项 */
    "strict": true,                        // 启用所有严格类型检查选项
    "noImplicitAny": true,                 // 在表达式和声明上有隐含的 any类型时报错
    "strictNullChecks": true,              // 启用严格的 null 检查
    "noImplicitThis": true,                // 当 this 表达式值为 any 类型的时候，生成一个错误
    "alwaysStrict": true,                  // 以严格模式检查每个模块，并在每个文件里加入 'use strict'

    /* 额外的检查 */
    "noUnusedLocals": true,                // 有未使用的变量时，抛出错误
    "noUnusedParameters": true,            // 有未使用的参数时，抛出错误
    "noImplicitReturns": true,             // 并不是所有函数里的代码都有返回值时，抛出错误
    "noFallthroughCasesInSwitch": true,    // 报告 switch 语句的 fallthrough 错误。（即，不允许 switch 的 case 语句贯穿）

    /* 模块解析选项 */
    "moduleResolution": "node",            // 选择模块解析策略： 'node' (Node.js) or 'classic' (TypeScript pre-1.6)
    "baseUrl": "./",                       // 用于解析非相对模块名称的基目录
    "paths": {},                           // 模块名到基于 baseUrl 的路径映射的列表
    "rootDirs": [],                        // 根文件夹列表，其组合内容表示项目运行时的结构内容
    "typeRoots": [],                       // 包含类型声明的文件列表
    "types": [],                           // 需要包含的类型声明文件名列表
    "allowSyntheticDefaultImports": true,  // 允许从没有设置默认导出的模块中默认导入。

    /* Source Map Options */
    "sourceRoot": "./",                    // 指定调试器应该找到 TypeScript 文件而不是源文件的位置
    "mapRoot": "./",                       // 指定调试器应该找到映射文件而不是生成文件的位置
    "inlineSourceMap": true,               // 生成单个 sourcemaps 文件，而不是将 sourcemaps 生成不同的文件
    "inlineSources": true,                 // 将代码与 sourcemaps 生成到一个文件中，要求同时设置了 --inlineSourceMap 或 --sourceMap 属性

    /* 其他选项 */
    "experimentalDecorators": true,        // 启用装饰器
    "emitDecoratorMetadata": true          // 为装饰器提供元数据的支持
  }
}
```

### 注意事项

- `// @ts-ignore` 用于忽略下一行的报错，尽量少用。

- **类型空间在运行时会被彻底擦除**，因此你哪怕完全不懂不碰它也能写出业务逻辑，这时就相当于回退到了 `JavaScript`。

- **运行时的错误需要运行的时候你才知道错了**，比如从后端返回的 `data`数据里到底有哪些字段，显然不可能在编译期的类型空间里用 `keyof` 获知。不要尝试表演超出生理极限的体操动作。

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
