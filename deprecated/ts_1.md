# 🔖 TypeScript 备忘录：基础语法<!-- omit in toc -->

- [基础类型和对象类型](#基础类型和对象类型)
- [Enum 类型](#enum-类型)
  - [数字枚举](#数字枚举)
  - [字符串枚举](#字符串枚举)
  - [异构枚举](#异构枚举)
  - [常量枚举](#常量枚举)
- [Any 类型和 Unknown 类型](#any-类型和-unknown-类型)
- [Null 和 Undefined 类型](#null-和-undefined-类型)
- [void 类型](#void-类型)
- [object, Object 和 {} 类型](#object-object-和--类型)
  - [object 类型](#object-类型)
  - [{} 类型](#-类型)
  - [Object 类型](#object-类型-1)
- [Never 类型](#never-类型)
- [模板字面类型](#模板字面类型)
  - [基础语法](#基础语法)
  - [新增关键字](#新增关键字)
  - [配合 infer](#配合-infer)
- [断言](#断言)
  - [类型断言](#类型断言)
  - [非空断言](#非空断言)
  - [确定赋值断言](#确定赋值断言)
- [联合类型](#联合类型)
- [类型守卫](#类型守卫)
  - [类型断言、in 关键字、typeof 关键字、instanceof 关键字](#类型断言in-关键字typeof-关键字instanceof-关键字)
  - [自定义类型保护的类型谓词](#自定义类型保护的类型谓词)
- [交叉类型](#交叉类型)
  - [同名基础类型属性的合并](#同名基础类型属性的合并)
  - [同名非基础类型属性的合并](#同名非基础类型属性的合并)
- [函数重载](#函数重载)
- [接口](#接口)
- [参数强校验](#参数强校验)
- [类](#类)
- [get / set](#get--set)
- [单例模式](#单例模式)
- [抽象类](#抽象类)

## 基础类型和对象类型

```ts
// Number 类型
const num: number = 1
// String 类型
const str: string = 'hello world'
// Boolean 类型
let isDone: boolean = false
// Symbol 类型
const sym: symbol = Symbol()
```

```ts
// 对象类型（包含数组、类、函数等）

// 对象字面量
const obj: { x: number; y: string } = { x: 1, y: 'hello world' }

// 箭头函数
const fn: (str: string) => number = str => Number.parseInt(str, 10)
// class 类型
class Person {}
const person: Person = new Person()
// Array 类型
const arr: number[] = [1, 2, 3]
// Array<number>泛型语法
const _arr: Array<number> = [1, 2, 3]
// 联合类型数组
const arr1: (number | string)[] = ['hello', 2, '3', 1]
// 元祖类型
const arr2: [number, string, number] = [1, '2', 3]
// 函数，这种写法必须写返回值
const sum: (a: number, b: number) => number = (a, b) => a + b
// 这种写法返回值可以推断出来，但一般推荐必须写，为了获取你期望的值
const sum1 = (a: number, b: number): number => a + b + ''

// JSON 等 api 处理过的数据无法自动推断类型，需要注解
const data: { name: string; age: number } = JSON.parse(JSON.stringify({ name: 'chu', age: 28 }))

// ⚠️ 注意事项：typescript 无法自动推断类型需要注解，或者断言或者 any 大法
```

## Enum 类型

### 数字枚举

```ts
// 默认情况下，NORTH 的初始值为 0，其余的成员会从 1 开始自动增长。
// 当然我们也可以设置 NORTH 的初始值，比如：NORTH = 3
enum Direction {
  NORTH = 3,
  SOUTH,
  EAST,
  WEST
}

let dir: Direction = Direction.NORTH
```

### 字符串枚举

```ts
enum Direction {
  NORTH = 'NORTH',
  SOUTH = 'SOUTH',
  EAST = 'EAST',
  WEST = 'WEST'
}
```

### 异构枚举

```ts
enum Enum {
  A,
  B,
  C = 'C',
  D = 'D',
  E = 8,
  F
}
```

以上代码编译后的 ES5 代码如下：

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

> 通过观察上述生成的 ES5 代码，我们可以发现数字枚举相对字符串枚举多了 “反向映射”：

```js
console.log(Enum.A) //输出：0
console.log(Enum[0]) // 输出：A
```

### 常量枚举

```ts
// 常量枚举会使用内联语法，不会为枚举类型编译生成任何 JavaScript
const enum Direction {
  NORTH,
  SOUTH,
  EAST,
  WEST
}

let dir: Direction = Direction.NORTH
```

以上代码对应的 ES5 代码如下：

```js
'use strict'
var dir = 0 /* NORTH */
```

## Any 类型和 Unknown 类型

在 `TypeScript` 中，任何类型都可以被归为 `any` 类型。这让 `any` 类型成为了类型系统的顶级类型（也被称作全局超级类型）。

`unknown` 类型只能被赋值给 `any` 类型和 `unknown` 类型本身。

```ts
let value: unknown

value = true // OK
value = 42 // OK
value = 'Hello World' // OK

let value1: unknown = value // OK
let value2: any = value // OK
let value3: boolean = value // Error
let value4: number = value // Error
let value5: string = value // Error
```

## Null 和 Undefined 类型

`TypeScript` `里，undefined` 和 `null` 两者有各自的类型分别为 `undefined` 和 `null`。

```ts
let u: undefined = undefined
let n: null = null
```

默认情况下 `null` 和 `undefined` 是所有类型的子类型。 就是说你可以把 `null` 和 `undefined` 赋值给 `number` 类型的变量。然而，如果你指定了`--strictNullChecks` 标记，`null` 和 `undefined` 只能赋值给 `void` 和它们各自的类型。

## void 类型

对变量赋值为 `void` 类型用途不大，这时候只相当于 `undefined` 类型的别名。

void 一般用于函数的返回值声明。

## object, Object 和 {} 类型

### object 类型

`object` 类型是：TypeScript 2.2 引入的新类型，它用于表示非原始类型。

> object is a type that represents the non-primitive type, i.e. any thing that is not number, string, boolean, symbol, null, or undefined.

### {} 类型

```ts
const obj = {}

// 当你试图访问这样一个对象的任意属性时，TypeScript 会产生一个编译时错误。
// Error: Property 'prop' does not exist on type '{}'.
obj.prop = 'test'

// 但是，你仍然可以使用在 Object 类型上定义的所有属性和方法，这些属性和方法可通过 JavaScript 的原型链隐式地使用
// "[object Object]"
obj.toString()
```

### Object 类型

`Object` 类型：它是所有 `Object` 类的实例的类型，它由以下两个接口来定义：

- `Object` 接口定义了 `Object.prototype` 原型对象上的属性
- `ObjectConstructor` 接口定义了 `Object` 类的属性。

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

## Never 类型

`never` 类型表示的是那些永不存在的值的类型。

例如，`never` 类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型。

```ts
// 返回 never 的函数必须存在无法达到的终点
function error(message: string): never {
  throw new Error(message)
}

function infiniteLoop(): never {
  while (true) {}
}
```

## 模板字面类型

### 基础语法

```ts
type EventName<T extends string> = `${T}Changed`
type T0 = EventName<'foo'> // 'fooChanged'
type T1 = EventName<'foo' | 'bar' | 'baz'> // 'fooChanged' | 'barChanged' | 'bazChanged'
```

```ts
type Concat<S1 extends string, S2 extends string> = `${S1}${S2}`
type T2 = Concat<'Hello', 'World'> // 'HelloWorld'
```

字符串模板中的联合类型会被展开后排列组合：

```ts
type T3 = `${'top' | 'bottom'}-${'left' | 'right'}`
// 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
```

### 新增关键字

```ts
type Cases<T extends string> = `${uppercase T} ${lowercase T} ${capitalize T} ${uncapitalize T}`;
type T11 = Cases<'bar'>;  // 'BAR bar Bar bar'
```

其实很简单，就是提供了几个处理方法：大写、小写，首字母大写，首字母小写。

### 配合 infer

```ts
type MatchPair<S extends string> = S extends `[${infer A},${infer B}]` ? [A, B] : unknown
type T20 = MatchPair<'[1,2]'> // ['1', '2']
type T21 = MatchPair<'[foo,bar]'> // ['foo', 'bar']
```

配合 `...` 拓展运算符和 `infer` 递归，甚至可以实现 `Join` 功能：

```ts
type Join<T extends (string | number | boolean | bigint)[], D extends string> = T extends []
  ? ''
  : T extends [unknown]
  ? `${T[0]}`
  : T extends [unknown, ...infer U]
  ? `${T[0]}${D}${Join<U, D>}`
  : string
type T30 = Join<[1, 2, 3, 4], '.'> // '1.2.3.4'
type T31 = Join<['foo', 'bar', 'baz'], '-'> // 'foo-bar-baz'
```

## 断言

### 类型断言

```ts
let someValue: unknown = 'this is a string'
// “尖括号” 语法
let strLength: number = (<string>someValue).length
// as 语法
let strLength: number = (someValue as string).length
```

### 非空断言

在上下文中当类型检查器无法断定类型时，一个新的后缀表达式操作符 `!` 可以用于断言操作对象是非 `null` 和非 `undefined` 类型。

**具体而言，x! 将从 x 值域中排除 null 和 undefined。**

```ts
// 忽略 undefined 和 null 类型
function myFunc(maybeString: string | undefined | null) {
  // Type 'string | null | undefined' is not assignable to type 'string'.
  // Type 'undefined' is not assignable to type 'string'.
  const onlyString: string = maybeString // Error
  const ignoreUndefinedAndNull: string = maybeString! // Ok
}

// 调用函数时忽略 undefined 类型
type NumGenerator = () => number
function myFunc(numGenerator: NumGenerator | undefined) {
  // Object is possibly 'undefined'.(2532)
  // Cannot invoke an object which is possibly 'undefined'.(2722)
  const num1 = numGenerator() // Error
  const num2 = numGenerator!() //OK
}
```

因为 `!` 非空断言操作符会从编译生成的 JavaScript 代码中移除，所以在实际使用的过程中，要特别注意。比如下面这个例子：

```ts
const a: number | undefined = undefined
const b: number = a!
console.log(b)
```

以上 TS 代码会编译生成以下 ES5 代码：

```js
'use strict'
const a = undefined
const b = a
console.log(b)
```

虽然在 TS 代码中，我们使用了非空断言，使得 `const b: number = a!;` 语句可以通过 TypeScript 类型检查器的检查。但在生成的 ES5 代码中，`!` 非空断言操作符被移除了，所以在浏览器中执行以上代码，在控制台会输出 `undefined`。

### 确定赋值断言

```ts
// 解决暂时性死区
let x!: number
initialize()
console.log(2 * x) // Ok

function initialize() {
  x = 10
}
```

## 联合类型

```ts
const sayHello = (name: string | undefined) => {
  /* ... */
}

type EventNames = 'click' | 'scroll' | 'mouseover'
```

## 类型守卫

### 类型断言、in 关键字、typeof 关键字、instanceof 关键字

```ts
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

### 自定义类型保护的类型谓词

```ts
function isNumber(x: any): x is number {
  return typeof x === 'number'
}

function isString(x: any): x is string {
  return typeof x === 'string'
}
```

## 交叉类型

### 同名基础类型属性的合并

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
type YX = Y & X
```

在上面的代码中，接口 X 和接口 Y 都含有一个相同的成员 c，但它们的类型不一致。对于这种情况，成员 c 的类型会变成 never。这是因为混入后成员 c 的类型为 `string & number`，即成员 c 的类型既可以是 `string` 类型又可以是 `number` 类型。很明显这种类型是不存在的，所以混入后成员 c 的类型为 `never`。

### 同名非基础类型属性的合并

```ts
interface D {
  d: boolean
}
interface E {
  e: string
}
interface F {
  f: number
}

interface A {
  x: D
}
interface B {
  x: E
}
interface C {
  x: F
}

type ABC = A & B & C

let abc: ABC = {
  x: {
    d: true,
    e: 'setlines',
    f: 666
  }
}

console.log('abc:', abc)
```

## 函数重载

```ts
function add(a: number, b: number): number {
  return a + b
}
function add(a: string, b: string): string {
  return a + b + '!'
}

// 只能支持函数签名加函数实现的方式重载
function add(a: number, b: number): number
function add(a: string, b: string): string
function add(a: any, b: any) {
  if (typeof a === 'string') {
    return a + b + '!'
  } else {
    return a + b
  }
}
```

## 接口

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
  (hello: string): string
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

## 参数强校验

```ts
// 案例一
interface Person {
  name: string
  age?: number
  // 自定义属性
  // [propName: string]: any
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

interface Point {
  x: number
  y: number
}
const tmp = {
  x: 1,
  y: 2,
  z: 3
}
const point: Point = tmp // 不报错
```

## 类

```ts
// private public protected
// 类的内部 类的内外部 类和继承类
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
    // 子类会先执行 super === 父类的 constructor super 必须执行
    super('gu')
  }
}

const teacher = new Teacher(28)

console.log(teacher.name, teacher.age)
```

## get / set

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

## 单例模式

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

## 抽象类

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
