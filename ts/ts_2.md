# 写给自己的 TypeScript 教程(二)<!-- omit in toc -->

- [泛型](#泛型)
- [泛型变量](#泛型变量)
- [泛型工具类型](#泛型工具类型)
  - [typeof 关键字](#typeof-关键字)
  - [keyof 关键字](#keyof-关键字)
  - [in 关键字](#in-关键字)
  - [infer 关键字](#infer-关键字)
  - [extends 关键字](#extends-关键字)
  - [Partial](#partial)
  - [Required](#required)
  - [Mutable](#mutable)
  - [Readonly](#readonly)
  - [Record](#record)
  - [Pick](#pick)
  - [Exclude](#exclude)
  - [Extract](#extract)
  - [Omit](#omit)
  - [ReturnType](#returntype)
  - [AxiosReturnType](#axiosreturntype)
- [tsconfig 重要字段](#tsconfig-重要字段)
- [环境 Ambient Modules](#环境-ambient-modules)
- [深入类型系统](#深入类型系统)
  - [基本类型](#基本类型)
  - [复合类型](#复合类型)
  - [复合类型间的转换](#复合类型间的转换)
  - [map 上的操作](#map-上的操作)
  - [映射类型和同态变换](#映射类型和同态变换)
  - [常用工具类型](#常用工具类型)
    - [由 set 生成 map](#由-set-生成-map)
    - [保留 map 的一部分](#保留-map-的一部分)
    - [删除 map 的一部分](#删除-map-的一部分)
    - [保留 set 的一部分](#保留-set-的一部分)
    - [删除 set 的一部分](#删除-set-的一部分)
    - [获取函数返回值的类型 ReturnType](#获取函数返回值的类型-returntype)
    - [类型的递归](#类型的递归)
    - [never infer typeof 关键字](#never-infer-typeof-关键字)
  - [实战演练](#实战演练)
  - [! 断言](#-断言)
  - [循环依赖与类型空间](#循环依赖与类型空间)
- [注意事项](#注意事项)

## 泛型

```ts
function join<T, P>(first: T, second: P): void {
  console.log(first, second)
}

join<number, number>(1, 2)
join<string, string>('1', '2')

class DataManger<T extends Item> {
  constructor(public data: T[]) {}
  getItem(index: number): string {
    // return this.data[index]
    return this.data[index].name
  }
}

interface Item {
  name: string
}

// T 指的是 { name: 'hi' }，就是 Item
const data = new DataManger([{ name: 'hi' }])

class DataManger<T extends number | string> {
  constructor(public data: T[]) {}
  getItem(index: number): T {
    // return this.data[index]
    return this.data[index]
  }
}

const data = new DataManger<number>([1, 2, 3])
const _data = new DataManger<string>(['1', '2', '3'])

// 函数泛型
const fun: <T>(params: T) => T = <T>(params: T) => params

function hello<T>(params: T): string {
  return params + ''
}

console.log(hello<number>(1))

// keyof
interface Person {
  name: string
  age: number
  sex: string
}

// 循环值 type T = 'name'
// key 为 T 的实际参数
// 返回值是 Person[T] 即接口定义的类型
class Teacher {
  constructor(public info: Person) {}
  getInfo<T extends keyof Person>(key: T): Person[T] {
    return this.info[key]
  }
}

const teacher = new Teacher({ name: 'chu', age: 28, sex: 'mail' })
console.log(teacher.getInfo('name'))
```

## 泛型变量

一些常见泛型变量代表的意思：

- T（Type）：表示一个 TypeScript 类型
- K（Key）：表示对象中的键类型
- V（Value）：表示对象中的值类型
- E（Element）：表示元素类型

## 泛型工具类型

### typeof 关键字

```ts
interface Person {
  name: string
  age: number
}

const sem: Person = { name: 'chu', age: 28 }
type Sem = typeof sem // -> Person

function toArray(x: number): Array<number> {
  return [x]
}

type Func = typeof toArray // -> (x: number) => number[]
```

### keyof 关键字

```ts
interface Person {
  name: string
  age: number
}

type K1 = keyof Person // "name" | "age"
type K2 = keyof Person[] // "length" | "toString" | "pop" | "push" | "concat" | "join"
type K3 = keyof { [x: string]: Person } // string | number
```

在 TypeScript 中支持两种索引签名，数字索引和字符串索引：

```ts
interface StringArray {
  // 字符串索引 -> keyof StringArray => string | number
  [index: string]: string
}

interface StringArray1 {
  // 数字索引 -> keyof StringArray1 => number
  [index: number]: string
}
```

为了同时支持两种索引类型，就得要求数字索引的返回值必须是字符串索引返回值的子类。**其中的原因就是当使用数值索引时，JavaScript 在执行索引操作时，会先把数值索引先转换为字符串索引。**所以 `keyof { [x: string]: Person }` 的结果会返回 `string | number`。

### in 关键字

```ts
// in 用来遍历枚举类型
type Keys = 'a' | 'b' | 'c'

type Obj = {
  [p in Keys]: any
} // -> { a: any, b: any, c: any }
```

### infer 关键字

在条件类型语句中，可以用 `infer` 声明一个类型变量并且对它进行使用。

```ts
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any
```

以上代码中 `infer R` 就是声明一个变量来承载传入函数签名的返回值类型，简单说就是用它取到函数返回值的类型方便之后使用。

### extends 关键字

```ts
interface Lengthwise {
  length: number
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length)
  return arg
}
```

现在这个泛型函数被定义了约束，因此它不再是适用于任意类型：

```ts
loggingIdentity(3) // Error, number doesn't have a .length property
```

这时我们需要传入符合约束类型的值，必须包含必须的属性：

```ts
loggingIdentity({ length: 10, value: 3 })
```

### Partial

`Partial` 作用是将传入的属性变为可选项。

`keyof` 产生联合类型, `in` 则可以遍历枚举类型, 所以他们经常一起使用, 看下 `Partial` 源码

```ts
type Partial<T> = { [P in keyof T]?: T[P] }
```

上面语句的意思是 `keyof T` 拿到 `T` 所有属性名, 然后 `in` 进行遍历, 将值赋给 `P`, 最后 `T[P]` 取得相应属性的值.
结合中间的 `?` 我们就明白了 `Partial` 的含义了。

### Required

`Required` 的作用是将传入的属性变为必选项, 源码如下

```ts
type Required<T> = { [P in keyof T]-?: T[P] }
```

我们发现一个有意思的用法 `-?`, 这里很好理解就是将可选项代表的 `?` 去掉, 从而让这个类型变成必选项. 与之对应的还有个 `+?` , 这个含义自然与 `-?` 之前相反, 它是用来把属性变成可选项的.

### Mutable

```ts
type Mutable<T> = {
  -readonly [P in keyof T]: T[P]
}
```

### Readonly

```ts
type Readonly<T> = { readonly [P in keyof T]: T[P] }
```

### Record

将 K 中所有的属性的值转化为 T 类型

```ts
type Record<K extends keyof any, T> = { [P in K]: T }
```

### Pick

从 T 中取出 一系列 K 的属性

```ts
type Pick<T, K extends keyof T> = { [P in K]: T[P] }
```

### Exclude

在 ts 2.8 中引入了一个条件类型, 示例如下

```ts
T extends U ? X : Y
```

以上语句的意思就是 如果 T 是 U 的子类型的话，那么就会返回 X，否则返回 Y

甚至可以组合多个

```ts
type TypeName<T> = T extends string
  ? 'string'
  : T extends number
  ? 'number'
  : T extends boolean
  ? 'boolean'
  : T extends undefined
  ? 'undefined'
  : T extends Function
  ? 'function'
  : 'object'
```

对于联合类型来说会自动分发条件，例如 `T extends U ? X : Y`, `T` 可能是 `A | B` 的联合类型, 那实际情况就变成 `(A extends U ? X : Y) | (B extends U ? X : Y)`

有了以上的了解我们再来理解下面的工具泛型

来看看 Exclude 源码

```ts
type Exclude<T, U> = T extends U ? never : T
```

结合实例

```ts
type T = Exclude<1 | 2, 1 | 3> // -> 2
```

很轻松地得出结果 `2` 根据代码和示例我们可以推断出 `Exclude` 的作用是从 `T` 中找出 `U` 中没有的元素, 换种更加贴近语义的说法其实就是从 `T` 中排除 `U`

### Extract

根据源码我们推断出 Extract 的作用是提取出 T 包含在 U 中的元素, 换种更加贴近语义的说法就是从 T 中提取出 U
源码如

```ts
type Extract<T, U> = T extends U ? T : never
```

### Omit

用之前的 Pick 和 Exclude 进行组合, 实现忽略对象某些属性功能, 源码如下

```ts
type Omit<T, K> = Pick<T, Exclude<keyof T, K>>

// 使用
type Foo = Omit<{ name: string; age: number }, 'name'> // -> { age: number }
```

### ReturnType

```ts
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any
```

其实这里的 `infer R` 就是声明一个变量来承载传入函数签名的返回值类型, 简单说就是用它取到函数返回值的类型方便之后使用.

```ts
function foo(x: number): Array<number> {
  return [x]
}
type fn = ReturnType<typeof foo>
```

### AxiosReturnType

开发经常使用 `axios` 进行封装 API 层 请求, 通常是一个函数返回一个 `AxiosPromise<Resp>`, 现在我想取到它的 `Resp` 类型, 根据上一个工具泛型的知识我们可以这样写.

```ts
import { AxiosPromise } from 'axios' // 导入接口
type AxiosReturnType<T> = T extends (...args: any[]) => AxiosPromise<infer R> ? R : any

// 使用
type Resp = AxiosReturnType<Api> // 泛型参数中传入你的 Api 请求函数
```

## tsconfig 重要字段

- files - 设置要编译的文件的名称；
- include - 设置需要进行编译的文件，支持路径模式匹配；
- exclude - 设置无需进行编译的文件，支持路径模式匹配；
- compilerOptions - 设置与编译流程相关的选项。

compilerOptions 每个选项的详细说明如下：

```js
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

## 环境 Ambient Modules

在实际应用开发时有一种场景，当前作用域下可以访问某个变量，但这个变量并不由开发者控制。例如通过 Script 标签直接引入的第三方库 CDN、一些宿主环境的 API 等。这个时候可以利用 TS 的环境声明功能，来告诉 TS 当前作用域可以访问这些变量，以获得类型提醒。

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

## 深入类型系统

### 基本类型

基本类型，也可以理解为原子类型。包括 `number`、`boolean`、`string`、`null`、`undefined`、`function`、`array`、字面量（true，false，1，2，‘a’）等。它们无法再细分。

### 复合类型

`TypeScript` 的复合类型可以分为两类：`set` 和 `map`。`set` 是指一个无序的、无重复元素的集合。而 `map` 则和 `JS` 中的对象一样，是一些没有重复键的键值对。

```ts
// set
type Size = 'small' | 'default' | 'big' | 'large'

// map
interface IA {
  a: string
  b: number
}
```

### 复合类型间的转换

```ts
// map => set
type IAKeys = keyof IA // 'a' | 'b'
type IAValues = IA[keyof IA] // string | number

// set => map
type SizeMap = {
  [k in Size]: number
}
// 等价于
type SizeMap2 = {
  small: number
  default: number
  big: number
  large: number
}
```

### map 上的操作

```ts
// 索引取值
type SubA = IA['a'] // string

// 属性修饰符
type Person = {
  age: number
  readonly name: string // 只读属性，初始化时必须赋值
  nickname?: string // 可选属性，相当于 | undefined
}
```

### 映射类型和同态变换

在 TypeScript 中，有以下几种常见的映射类型。它们的共同点是只接受一个传入类型，生成的类型中 `key` 都来自于 `keyof` 传入的类型，`value` 都是传入类型的 `value` 的变种。

```ts
type Partial<T> = { [P in keyof T]?: T[P] } // 将一个 map 所有属性变为可选的
type Required<T> = { [P in keyof T]-?: T[P] } // 将一个 map 所有属性变为必选的
type Readonly<T> = { readonly [P in keyof T]: T[P] } // 将一个 map 所有属性变为只读的
type Mutable<T> = { -readonly [P in keyof T]: T[P] } // ts 标准库未包含，将一个 map 所有属性变为可写的
```

此类变换，在 `TS` 中被称为同态变换。在进行同态变换时，`TS` 会先复制一遍传入参数的属性修饰符，再应用定义的变换。

```ts
interface Fruit {
  readonly name: string
  size: number
}
type PF = Partial<Fruit> // PF.name 既只读又可选，PF.size 只可选
```

### 常用工具类型

#### 由 set 生成 map

```ts
type Record<K extends keyof any, T> = { [P in K]: T }

type Size = 'small' | 'default' | 'big'
/*
{
    small: number
    default: number
    big: number
}
 */
type SizeMap = Record<Size, number>
```

#### 保留 map 的一部分

```ts
type Pick<T, K extends keyof T> = { [P in K]: T[P] }
/*
{
    default: number
    big: number
}
 */
type BiggerSizeMap = Pick<SizeMap, 'default' | 'big'>
```

#### 删除 map 的一部分

```ts
type Omit<T, K> = Pick<T, Exclude<keyof T, K>>
/*
{
    default: number
}
 */
type DefaultSizeMap = Omit<BiggerSizeMap, 'big'>
```

#### 保留 set 的一部分

```ts
type Extract<T, U> = T extends U ? T : never

type Result = 1 | 2 | 3 | 'error' | 'success'
type StringResult = Extract<Result, string> // 'error' | 'success
```

#### 删除 set 的一部分

```ts
type Exclude<T, U> = T extends U ? never : T
type NumericResult = Exclude<Result, string> // 1 | 2 | 3
```

#### 获取函数返回值的类型 ReturnType

注意不要滥用这个工具类型，应该尽量多手动标注函数返回值类型。用`ReturnType`是由实现反推手动注解，而实现往往容易变且容易出错，手动注解则相对稳定。另一方面，`ReturnType`过多也会降低代码可读性。

```ts
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any

function f() {
  return { a: 3, b: 2 }
}
/*
{
    a: number
    b: number
}
 */
type FReturn = ReturnType<f>
```

#### 类型的递归

`TS`原生的`Readonly`只会限制一层写入操作，我们可以利用递归来实现深层次的`Readonly`。但要注意，`TS`对最大递归层数做了限制，最多递归 5 层。

```ts
type DeepReadonly<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>
}

interface SomeObject {
  a: {
    b: {
      c: number
    }
  }
}

const obj: Readonly<SomeObject> = { a: { b: { c: 2 } } }
obj.a.b.c = 3 // TS不会报错

const obj2: DeepReadonly<SomeObject> = { a: { b: { c: 2 } } }
obj2.a.b.c = 3 // Cannot assign to 'c' because it is a read-only property.
```

#### never infer typeof 关键字

`never` 是 `|` 运算的幺元，即 `x | never = x`。

`infer` 的作用是让`TypeScript`自己推断，并将推断的结果存储到一个临时名字中，并且只能用于`extends`语句中。它与泛型的区别在于，泛型是声明一个“参数”，而`infer`是声明一个“中间变量”。

```ts
type Unpacked<T> = T extends (infer U)[]
  ? U
  : T extends (...args: any[]) => infer U
  ? U
  : T extends Promise<infer U>
  ? U
  : T

type T0 = Unpacked<string> // string
type T1 = Unpacked<string[]> // string
type T2 = Unpacked<() => string> // string
type T3 = Unpacked<Promise<string>> // string
type T4 = Unpacked<Promise<string>[]> // Promise<string>
type T5 = Unpacked<Unpacked<Promise<string>[]>> // string
```

> `typeof` 用于获取一个“常量”的类型，这里的“常量”是指任何可以在编译期确定的东西，例如`const`、`function`、`class`等。它是从 实际运行代码 通向 类型系统 的单行道。理论上，任何运行时的符号名想要为类型系统所用，都要加上 `typeof`。但是`class` 比较特殊不需要加，因为 `ts` 的 `class` 出现得比 `js` 早，现有的为兼容性解决方案。

在使用 `class` 时，`class` 名表示实例类型，`typeof class` 表示 `class` 本身类型。没错，这个关键字和 `js` 的 `typeof` 关键字重名了 :)。

```ts
const config = { width: 2, height: 2 }
function getLength(str: string) {
  return str.length
}

type TConfig = typeof config // { width: number, height: number }
type TGetLength = typeof getLength // (str: string) => number
```

### 实战演练

我在项目中遇到这样一种场景，需要获取一个类型中所有`value`为指定类型的`key`。例如，已知某个`React`组件的`props`类型，我需要“知道”（编程意义上）哪些参数是`function`类型。

```ts
interface SomeProps {
  a: string
  b: number
  c: (e: MouseEvent) => void
  d: (e: TouchEvent) => void
}
// 如何得到 'c' | 'd' ？
```

分析一下这里的思路，我们需要从一个 `map` 得到一个 `set`，而这个 `set` 是 `map` 的 `key` 的子集，筛选子集的条件是 `value` 的类型。要构造 `set` 的子集，需要用到 `never`；要实现条件判断，需要用到 `extends`；而要实现 `key` 到 `value` 的访问，则需要索引取值。经过一些尝试后，解决方案如下。

```ts
type GetKeyByValueType<T, Condition> = {
  [K in keyof T]: T[K] extends Condition ? K : never
}[keyof T]

type FunctionPropNames = GetKeyByValueType<SomeProps, Function> // 'c' | 'd'
```

这里的运算过程如下：

```ts
// 开始
{
    a: string
    b: number
    c: (e: MouseEvent) => void
    d: (e: TouchEvent) => void
}
// 第一步，条件映射
{
    a: never
    b: never
    c: 'c'
    d: 'd'
}
// 第二步，索引取值
never | never | 'c' | 'd'
// never的性质
'c' | 'd'
```

### ! 断言

`!` 的作用是断言某个变量不会是 `null / undefined`，告诉编译器停止报错。这里由用户确保断言的正确。它和刚刚进入 `EcmaScript` 语法提案 `stage 3` 的 `Optional Chaining` 特性不同。`Optional Chaining` 特性可以保证访问的安全性，即使在 `undefined` 上访问某个键也不会抛出异常。而 `!` 只是消除编译器报错，不会对运行时行为造成任何影响。

```ts
// TypeScript
mightBeUndefined!.a = 2
// 编译为
mightBeUndefined.a = 2
```

### 循环依赖与类型空间

```js
// JavaScript 中是不建议存在循环依赖的
// 这两个模块不应该互相 import 对方
// editor.js
import { Element } from './element'

// element.js
import { Editor } from './editor'
```

```ts
// JS 中忌讳的循环引用可以在 ts 中类型时使用
// 因为这里为了类型标注而写的 import 不会出现在编译出的 JS 代码中（说粗俗点就是「编译以后就没了）。但比较熟悉 TS 的同学应该都知道，这时的最佳实践是使用 import type 语法
// element.ts
import type { Editor } from './editor'

// 这个 type 可以放心地用作类型标注，不造成循环引用
class Element {
  editor: Editor
}

// 但这里就不能这么写了，会报错
const editor = new Editor()

// 这里的 import type 相当于只允许所导入的实体在类型空间使用，因此上面导入的 Editor 就被限定在了类型空间，从而杜绝了值空间（JS）中潜在的循环引用问题。s
```

## 注意事项

- 🐯 `enum` 在 `TS` 中出现的比较早，它引入了 `JavaScript` 没有的数据结构（编译成一个双向 map），入侵了运行时，与 TypeScript 宗旨不符。用 `string literal union（’small’ | ‘big’ | ‘large’）` 可以做到相同的事，且在 `debug` 时可读性更好。如果很在意条件比较的性能，应该用二进制 `flag` 加位运算。

- 🐒 `// @ts-ignore` 用于忽略下一行的报错，尽量少用。

- 🐯 类型转换的语法为 `<类型名> xxx` 或 `xxx as` 类型名。推荐始终用 `as` 语法，因为第一种语法无法在 `tsx` 文件使用，而且容易和泛型混淆。

- 🐧 一般只有这几种场景需要使用类型转换：

  - 自动推断不准
  - TS 报错
  - 想不出更好的类型编写方法，手动抄近
  - 临时“放飞自我”

- 🐢 在使用类型转换时，应该遵守几个原则：

  - 若要放松限制，只可放松到能运行的最严格类型上
  - 如果不知道一个变量的精确类型，只标注到大概类型（例如 `any[]`）也比 `any` 好
  - 任何一段“放飞自我”（完全没有类型覆盖）区代码不应超过 `2` 行，应在出现第一个可以确定类型的变量时就补上标注
  - 在编写 `TS` 程序时，我们的目标是让类型覆盖率无限接近 `100%`。

- 🐷 类型空间里的运算始终只能针对类型空间里的实体，无法涉及运行时的值空间。比如从后端返回的 `data` 数据里到底有哪些字段，显然不可能在编译期的类型空间里用 `keyof` 获知。不要尝试表演超出生理极限的体操动作。

- 🐶 类型空间在运行时会被彻底擦除，因此你哪怕完全不懂不碰它也能写出业务逻辑，这时就相当于回退到了 `JavaScript`。

- 简单来讲就是，运行时的错误需要运行的时候你才知道错了，可能是浏览器或者是 `node` 运行环境。构建时的错误是在你代码真正运行之前，编译器或者是编辑器就告诉你错了。也就是通过类型分析，告诉你显然是错的
