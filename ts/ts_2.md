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
