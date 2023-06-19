# TypeScript 学习笔记<!-- omit in toc -->

## TypeScript 新特性

- [TypeScript 5.1 beta 发布：函数返回值类型优化、Getter/Setter类型优化、JSX 增强](https://zhuanlan.zhihu.com/p/625818753)
- [TypeScript 5.0 beta 发布：新版 ES 装饰器、泛型参数的常量修饰、枚举增强等](https://zhuanlan.zhihu.com/p/602059905)
- [TypeScript 4.9 beta 发布：鸽置的 ES 装饰器、satisfies 操作符、类型收窄增强、单文件级别配置等](https://zhuanlan.zhihu.com/p/568294633)
- [TypeScript 4.8 beta 发布：正在路上的装饰器、类型收窄增强、模板字符串类型中的 infer 约束增强](https://zhuanlan.zhihu.com/p/533609020)
- [TypeScript 4.7 beta 发布：NodeJs 的 ES Module 支持、新的类型编程语法、类型控制流分析增强等](https://zhuanlan.zhihu.com/p/496356238)
- [TypeScript 4.6 beta 发布：递归类型检查增强、参数的控制流分析支持、索引访问的类型推导](https://zhuanlan.zhihu.com/p/460784216)
- [TypeScript 4.5 正式发布\[2021.11.17\]\[官文全文翻译\]](https://zhuanlan.zhihu.com/p/435054926)

## TypeScript 深入

### 协变与逆变

> [知其然，知其所以然：TypeScript 中的协变与逆变](https://zhuanlan.zhihu.com/p/454202284)

### TS 已经有模块系统了，为什么还需要 NameSpace？

这个问题等价于：

>**Q：** 柯南已经有灰原哀了，为什么还需要毛利兰？
>
>**A：** 得先分清楚谁是青梅竹马谁是天降。

**`NameSpace` 本质是 `JS` 的原始闭包，不关注代码是同步还是异步加载的，只关注使用体验。**

### [写 TypeScript 时，什么时候用 any？什么时候用 unknown？有没有规律或准则？](https://www.zhihu.com/question/355283769)

两者最大的区别就是 `unknown` 只是个 `top type`，而 `any` 即是 `top type` 又是 `bottom type`, **这导致 `any` 基本上就是放弃了任何类型检查**。

1. 如果一个**变量的类型是动态的**，就用 `any`。
2. 如果一个**变量的类型是固定的**，但是目前还不能确定或不想确定，就用 `unknown`。要用这个变量的时候就断言一下吧，不能像 `any` 那样糊里糊涂地用。

> ⚠️ 注意：`any` 是被视为 `union` 的，`unknown` 不是。

## TypeScript 基础

### 复用 JS 的类型

**静态类型系统的目的是把类型检查从运行时提前到编译时**，那 TS 类型系统中肯定要把 JS 的运行时类型拿过来，也就是 `number`、`boolean`、`string`、`object`、`bigint`、`symbol`、`undefined`、`null` 这些类型，还有就是它们的包装类型 `Number`、`Boolean`、`String`、`Object`、`Symbol`。其它 `class`、`Array` 这些 TypeScript 类型系统也都支持。

<div align="right">
<a href="https://www.typescriptlang.org/zh/play?target=99#code/PTAEgKyR4P8LH-AX4wZCMG+mgQt0Jiph76MADphAyIcxgmAqAG8oLJGgp+6DKCaoGFygMP+Ar1oEGagc3KBwKoPdegK-GB7asqACYBDAC6DQgB1NAdsaAZxMAMSoFS9QJDmgK5VA2XKB1bUCt1rUB8ZoDZHQLByge+VAvwGAKdUBo-oEXowPjmyQN4+gaPVAXl6AX1OmAKV1ABrAKYBPAHsAM1BAduCyQCAGA2xAXB1AVejACwjAFHtAUNjAL8VAfFdAMBdAQPNABTTkQGV5QFmTQAqlQB15SIAoapBQADsAVwBbACNfACdQJ2qAY0CGgGdhRtaALjH2rtAAXlAABlr6kc6ASwaAcx7HfsGR0FXJ1Y3t+YByAAtfABsbwNAAd0DOm-5z5bA2wMCb30EGjtqn9RmshgARQa+SbfX7-QHzYKCG5DXyfQ7+dq-IEDYajIb+IbHTHfG5zUAAZRJvwAFOcCUNzgBKdEAOnZ6IAgp1OoJ-Hs8VNuZ1Js1pp0ANoAXXJEoAjAAaUAAJiVAGYpXUwIBtm0cgFvowCrNgKDqthZNhXyADwnLYAPll5zl5yV52VztA5zV5019UAKgGACBUnOJACN+xtGgh5kxpYo63QAPodhOstkzpQ7rndAu7zs9Xu8lYqVerNVrQMEmg0+sI1oNS4BR-UA3hmATMUeIAeBV6uJNE1ANMEotasaVbX74qZc3tMZm817Q7Hs3tYgA1KA2qW20ZAKdygArjQC1pulAKbmYdALQ2TSG5N7I8HK6vXTnC9AAFoV6Bl+cPqWAFIUgDyADlQEAeL1AHQlQA0ZSPTpfCGAAHfZfHJABvRpBBaaEPT6S4mndQRNjQ5UAA5QAAX1LEDQNYZApCcWhdwMA9aBwQBpIzKQBwC0AC5tenqAF+U7UYhFEclv3-VloIjVEaSEv9WRtTY1mCfwaUgmC4KZFlS0CNoACtfCrHZAHozaAABV-Gg3wKT6dZoNGZVWWVUBAFR9QBTRWQQAG02owBg7Q8QA4uUSQAuT0APXTAHzlQBpzScGp6g07TdLBUAxGEEz4OES4RFASDoKU3wGmEc8kvghpBkfdK1hPasADdEoSpU1lZXxWVihp-FAJLTia5LQXPfLRknTolRkocfj+AFeupG4lWaO4lReUAK34Xxgg2Xx+FZUtjNMj1xpuc5QBizrYqGIY1k2BpBDaP4moeeK1vOSKdOEc5WRpZU1WVZUWV40BIsmG7dPmDb0R-LTbp2aB3L0wABI0UUAAai0Z7GQQA87UAaPkHEcWh3MARlcN0AaDlABI5QAqOUAUuNAGPlfdACztQBJOWgUs5Tq6GgeJinqFAAADOmqxEzpAmELmEuZ0BAscQBP7UAQxjACg5ZBAD0dQByA1LGyocBqsAGF9iTJoqymhnyaZtnYclqWalLdGvNABCiNAQBGHT0wAAOTx5wRdoQADtUAE2tABM0sY7kAQAYZrmhb+FADdADRNZArcAcCVAC-1QABD2owBfhM3QBqiMAMcjAC45PTAHO-QB-I2N03QEAaTlWEAPltMgPZAaneh55lN0tAGV9Ih4kAP7VAH7owA71MATfjAHYLG2ReQQBvuUAeENpcQWhVrMiy1is0BACx5QByuUyG3rEQDBwrAAAFTnTM6eKPQADy2-hAigxoudAXwt7BUZBiahKPVN+7HrVNUAE4WUCVkt-Jc5hCgu7S0AMXk9NoIggBZuT0JuQA-vIeDMPLGGOxRYU2QBDaWgAYlUAJ2mBpaAt1UEg1BRhABYCYAcfjQCfkEKVQQ5lLKjGQALQAfymAAS0wA8PqAAZ1cB1QX7cwpEmU4NI1L1HsKWQAzoqADpU9Q0AiokM-qAaCTRTprD6BIzmn8qyLVLIAXqNhb2GMBuOOjRfCPFAIAK+VNwZxUcLVBjZ4aAAbnWggAPtyrl5Mx5jkCABtFRQqD+g3EEPtUAnIGjFWRCbaooBQA8OloAB41ABwZgEoJYBJHSNkcdVCxwOFbEifUXinQ1bc06NGFCaEZJjgQiksAgTmpDFZPE+Cv0cmFOIrUQJwSpbhMAAHeTZIlpIyS8GkMSbgyOQgkxMyZNj5JIiRUsuFhDAFRMINxHjzzsKaLNLK-jAltPVlk0RIh4IAH1ymJIGUM6pYzQCbjCIANeV7CAFDFQAFwl61bLQJsFRAC-iuIWggBv6JOYgDc0tkF0LeZEw55SuFLMCalXwwgmidEBCU1k2yqmBJIoEyZvTfA0hITcXZpx8mRLqWAQWgB15UALvygASoz1oAbfj4AlAqFi1qYJoXlPJKiyJwyjyn0EIEE8WxyQNB0ZSMFCzhB0hZWy04zJRmgomaC6ogr2WbDKTk9+grMKCA+J2OErJ7ibBpFK04srUJjnqAqpoghSyAEHPRQ0tAAHpgaQAL24E1+fUVegR16b3ODC1CW0YrrPEQCP2gwbiNUEH0PoUEDqnXgo8NYzVAR9HcZ484cy+W3yegAFjlG9fYqr1WarWKy6VtKcncLAIAVWVEaAEIrOh0zPHLy6EMC+BTAmevgiMEQPSNhNsrGhKtnQa0NEiQ20AKzMmdKkd0uJOT0UphNvCxMzbZFjIAJJ4gBEG7JfS8lAuxaATt3bWTzsXe2wFgBgGK8CU0AgBwY0AIgqm7q21mBdtUINIACEULW2iHbZi29G69GAHMjeAVtACE1rQMGG4kX6MANKxrZ-1UuKZcGlL6l0VO0bordgwV2+BZLeqdG7ADz1n+o9oBd1tuXWOHgyBo56UADAqNttp7qDVSyCYKIXUtKXB9tjLqgkXqIASGN7IeHoIAYPijzr27XKckyGGg7tBQuwjyLzgYSwmmwUQnBh2XmGJiTwgpOvuXecTY8njQZsCBqpTDRCzGdVBI69Jm5izHmGZvVK9LMmyRZMWTmEtpmzE05nZ6E3PESauktE9RRaACN0wAx3KAEAPGxXksZhfC0eZeiFnM+awjU960EROqcEypzd1R0s6oQ65rC+m-hqsM500z5n0vWds69KJXmx3Jfc-VvphWmuq18EAA" target="_blank">
<img align="center" width="85" src="https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/me/runtab.png">
</a>
</div>

```ts
// ⚠️：运行时的错误需要运行的时候你才知道错了，比如从后端返回的 data 数据里到底有哪些字段，显然不可能在编译期的类型空间里用 keyof 获知。不要尝试表演超出生理极限的体操动作。

// number 类型
const num: number = 0

// string 类型
const str: string = 'hello world'

// boolean 类型
let isDone: boolean = false

// symbol 类型
const sys: symbol = Symbol('sys')

// ...

// Array
const numArr: number[] = [1, 2, 3]
// 泛型语法
const strArr: Array<string> = ['1', '2', '3']
// 联合类型数组
const arr: (number | string)[] = ['hello', 'world', 1, 2, 3]

// function
// 必须写返回值类型
const sum: (a: number, b: number) => number = (a, b) => a + b
// 返回值可以推断出来
const minus = (a: number, b: number) => a - b + ''

// JSON 序列化
const response = { name: 'chu', age: 28 }
// 序列化后的数据类型，推断不出来，需要手动标注类型
// any
const data = JSON.parse(JSON.stringify(response))

// object 类型是：TypeScript 2.2 引入的新类型，它用于表示非原始类型。
// object is a type that represents the non-primitive type, i.e. any thing that is not number, string, boolean, symbol, null, or undefined.
// Type 'null' is not assignable to type 'object'.(2322)
const obj: object = null

// Object 类型：它是所有 Object 类的实例的类型，它由以下两个接口来定义：
// 1. Object 接口定义了 `Object.prototype` 原型对象上的属性
// 2. ObjectConstructor 接口定义了 Object 类的属性。

// 由于 {} 就是一个空对象，因此除 null、undefined 以外的一切基础类型，都可以被视为是继承于 {} 之后派生出来的。
const o = {}
// 当你试图访问这样一个对象的任意属性时，TypeScript 会产生一个编译时错误。
// Property 'x' does not exist on type '{}'.(2339)
o.x = 'test'
// 但是，你仍然可以使用在 Object 类型上定义的所有属性和方法，这些属性和方法可通过 JavaScript 的原型链隐式地使用
o.toString()

// 类
// 关键字：private public protected
// 抽象类不可以被 new 只可以继承
// 抽象方法必须实现，相当于必须实现的公有方法
class Animal {
  // 类属性声明
  // public name: string
  // constructor(name: string) {
  //   this.name = name
  // }

  // 类属性声明简写
  constructor(public name: string) {}
}

// get/set
class Student {
  constructor(private _name: string) {}
  // get 可以获取类内部的属性值，写作函数，读取时以属性方式读取
  get name() {
    return this._name
  }
  set name(val: string) {
    // 对受保护的属性进行操作
    this._name = val
  }
}
const xiaoming = new Student('xiaoming')
// get/set
xiaoming.name = 'xiaohua'
console.log(xiaoming.name) // xiaohua
// 私有属性无法直接读取
// Property '_name' is private and only accessible within class 'Student'.(2341)
console.log(xiaoming._name)

// 单例模式
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
console.log(person1, person2, person1 === person2) // Person { name: 'chu' } Person { name: 'chu' } true
// 上面代码相当于下面代码
const P = { name: 'chu' }
const p1 = P
const p2 = P
p1.name = 'chu'
console.log(p1, p2, p1 === p2) // { name: 'chu' } { name: 'chu' } true
```

### TS 新增的类型

#### 枚举（Enum）

##### 注意事项

1. enum 在 TS 中出现的比较早，它引入了 JS 没有的数据结构（编译成一个双向 map），入侵了运行时，与 TS 宗旨不符。用 `string literal union（’small’ | ‘big’ | ‘large’）` 可以做到相同的事，且在 debug 时可读性更好。
2. babel 不支持 `const enum`（会作为 enum 处理）。

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

#### 元组（Tuple）

元组（Tuple）就是元素个数和类型固定的数组类型：

```ts
// 数组转元组
const arr = [1, { key: 'val' }, 'str'] as const
```

#### 接口（Interface）

> 接口可以用来描述函数、构造器、索引类型（对象、class、数组）等复合类型。

<div align="right">
<a href="https://www.typescriptlang.org/zh/play?target=99&ts=5.1.3#code/PTAElLjRj5ULO1Ek5RvHwFAEsB2AXApgJwGYEMBjTUABRwGcB7VUAb0VFG03wBMaAbAT1FXwC2mAFygK6bGgDmjUPimYA-KNQBXAQCMcsgNoAHbFT0A5QSLETpAXVH5U3WRXzcAEsgAUASlHjJqGQC+iIggEJCA536A-kYoGDgExKAAKqyEABY4oJgAHliobBRklDT0slhEqV4+lv6IQSFg8IB52oANzlCIhJz4FAUAwqmqoMgCepyYQhgFyeUZDEz8QqAAvKAA5GmqK47ObkugXksAfKupyJtMZWm7+4tHKxepm3WENOKg67uomADuoH2qXu0XlRRgA6ThUKTudYg+aYTygUJrfqbephOCAX8VAA6mMSweCIJAAyttMJxwSUmO50qSqFU-FJvBY6bVgqEsS02s9UK8nK4SeDRETedTdlSyTdQKKqICucDMGCIe4eS4+VR3CtJStPPDERqWWBAEPKmMAXPqAQgtADFZqMAEhaAaPlAAByOLi+NABPQqjYmAw5L4Zlp0mZ0te4KkCmwV3Ebo96AFrvdGAZADcqMg2IcvZzqKCg4qY5GYWZPP70+hQFlkPgqAJpLs6N6hKIVqXy5X-CsADRyBSiABMAA5QEEgyH3I2K9JtWBALBygCx5QClRoBMVL1oAAgtgpOpI6AqLhQOhuHoSCsa7Dff4ANwd8xqTQ4c8BFaDAqoKjFroUZBSfgaUY7qigPT4bAzFxTdt13fdVhdCMMBWEFZFCAB5DQACtMEIYtOGQXF8E4UABGcTdUB4MR90IZBcF4ABrJ8vloAwjBwdBkEwCh2zsFMVnkTB7w4Zi+GfTJS1eNAdz3A9INjdAYPcLsAGYABYAFYC0HHB3CPH1VhHZspDbC9uz7AICyta1ABi5B08QSUgk09WYSxUdQtGwWRuHs68nKeF5iz0ABGUQrLQYtllsrJRG81tnO7cKmAAL1EGSETAedABh-wAsTUATXlABC3QA9HUAcgNC08ndhmrWQQtAMKItALsotAWLQBk-1QkABW14EANickCLP8uz86zAsKvQgA" target="_blank">
<img align="center" width="85" src="https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/me/runtab.png">
</a>
</div>

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

// 类实现接口
class Chu implements Teacher {
  name = 'chu'
  sayHi = () => 'hi'
  teach = () => 'teach'
}

const chu = new Chu()
console.log(chu.name) // 'chu'

// 接口定义函数
interface SayHello {
  (hello: string): string
}

// 函数实现接口
const sayHello: SayHello = hello => hello
console.log(sayHello('hello')) // 'hello'

// 参数强校验
// 案例一
interface Student {
  name: string
}

const logger = (student: Student): void => {
  console.log(student.name)
}

const xiaoming = { name: 'xiaoming', age: 28 }
logger(xiaoming) // 不会报错

// Argument of type '{ name: string; age: number; }' is not assignable to parameter of type 'Student'.
  // Object literal may only specify known properties, and 'age' does not exist in type 'Student'.(2345)
logger({ name: 'xiaoming', age: 28 })

// 案例二
interface Point {
  x: number
  y: number
}

const p1: Point = {
  x: 1,
  y: 2,
  z: 3 // 报错，多余的属性
}

const tmp = {
  x: 1,
  y: 2,
  z: 3
}

// 子类父类
const p2: Point = tmp
```

对象类型、class 类型在 TypeScript 里也叫做索引类型，也就是索引了多个元素的类型的意思。**对象可以动态添加属性，如果不知道会有什么属性，可以用可索引签名：**

```ts
// keyof any === string | number | symbol
type O = { [key: keyof any]: any }
```

#### 字面量类型

TypeScript 支持字面量类型，也就是类似 `1111`、`'aaaa'`、`{ a: 1}` 这种值也可以做为类型。

```ts
// 如果直接把一个字符串赋值给变量，TS 会保留字面量类型。
const str: string = 'str' // -> const str: string

// 但是如果我赋值给对象的属性，字面量 "str" 的类型就丢失了，变成了 `string`。
const o1 = { a: 'str' } // -> const o: { a: string }

// 假如我就是需要这个字面量准确的类型呢？
const o2 = { a1: 'str' } as const // -> const o1: { readonly a1: "str" }
```

#### 特殊类型

四种特殊的类型：`void`、`never`、`any`、`unknown`：

- `void` 代表空，一般是用于函数返回值。
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

### 断言

#### 类型断言

```ts
let someValue: unknown = 'this is a string'
// “尖括号” 语法，与 jsx 冲突
let strLength: number = (<string>someValue).length
// as 意味着什么？你指着编译器的脸告诉它，这个变量的类型就是这个，索引类型使用 as 叫做重映射。as 实际上只能转换存在父子类型的关系。（const foo = {} as any as Function）
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
