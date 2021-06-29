/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

// 基础类型
const num: number = 1
const str: string = 'hello world'

// 对象类型
const obj: { x: number, y: string } = { x: 1, y: 'hello world' }

const fn: (str: string) => number = str => Number.parseInt(str, 10)

class Person { }

const person: Person = new Person()

const arr: number[] = [1, 2, 3]
const arr1: (number | string)[] = ['hello', 2, '3', 1]
const arr2: [number, string, number] = [1, '2', 3]

// 类型注解：type annotation 我们来告诉 TS 变量是什么类型
// 类型推断：type infrence TS 会自动分析变量的类型
// 如果 TS 可以分析出变量的类型，我们就没必要做类型注解了

// let counter:number
// counter = 1

// const firstNum = 1
// const secondNum = 2
// const res = firstNum + secondNum

// const sum:(firstNum: number, secondNum: number) => number = (firstNum, secondNum) => firstNum + secondNum

// const sum1 = (firstNum: number, secondNum: number) => {
// 	return firstNum + secondNum + ''
// }

// const sayHello = ():void => {
// 	console.log('hello world')
// }

// const errFn = ():never => {
// 	throw new Error('抛出错误')
// }

// const errFn = ():never => {
// 	while (true) {
// 		console.log('1')
// 	}
// }

// 解构
// const sum2 = ({ first, second }: { first: number, second: number }): number => {
//   return first + second
// }

// type numbers = { first: number, second: number }

// const sum3:({first,second }: numbers) => number = ({first, second}) => first + second

// 其他
// const rawData = '{"name": "chu"}'
// const newData: { name: string } = JSON.parse(rawData)

// let a:(number|string) = 1
// a = '12'

// class Student {
//   name: string
//   age: number
// }

// // ===

// {name:string, age: number}

// 元祖
// 类型别名，接口，能接口就接口，不能接口在别名
// 接口

interface Student {
  name: string,
  // age?: number,
  // [propName: string]: any
}

// 定义接口，使用中可以多出一两个属性也不会报错，
// 直接传字面量会严格娇艳，上面特性失效
// readonly 只读
// [propName: string]: any， 计算属性
//
const student = { age: 18, name: 'chu' }

const getStudentName: (student: Student) => string = student => student.name

getStudentName(student)

// 传字面量会报错
// getStudentName({ age: 18, name: 'chu' })

// 接口应用类

// class Chu implements Student {
//   name = 'chu'
// }

// 接口继承

// interface Teacher extends Student {
//   age: number
// }

// 类

// class Animal {
//   name: string
//   constructor(name) {
//   	this.name = name
//   }
// }

// public
// protected
// abstruct
// private

// 

const ts: number = null

console.log(ts)

// 类型
// never unknown void undefined null
// 子类型

// 接口是必要条件，传的参数只要满足必要条件就行，超出接口范围没事，不是字面量就行，对比下面是多了一个变量赋值

// 可选属性
// 只读属性

// 接口分号

// implements ClockInterface
// 类实现接口

// 接口继承

// 外部枚举, 编译时会被删除，只是用来描述已经存在的枚举类型的形状。
// declare enum Enum {
// 	A = 1,
// 	B,
// 	C = 2,
// }

// // 常量枚举, 编译后表示常量
// const enum Test {
// 	yes = 2,
// 	no = 4,
// }

// const 断言
let num = 1 as const
// 等同于 const num = 1
let arr: readonly [string, number] = ['h', 1]
let arr1 = ['h', 1] as const
// 因为是只读的所以字面量类型和基础类型都为 'h', 1 不可变？

unknown
unknown type 是 TypeScript 中的 Top Type。符号是(⊤)

换句话说，就是任何类型都是 unknown 的子类型，unknown 是所有类型的父类型。

换句最简单的话说，就是 任何值都可以赋值给类型是 unkown 的变量，与其对应的是，我们不能把一个 unkown 类型的值赋值给任意非 unkown 类型的值。

let a: unknown = undefined
a = Symbol('deep dark fantasy')
a = {}
a = false
a = '114514'
a = 1919n

let b : bigint = a; // Type 'unknown' is not assignable to type 'bigint'.

never
never 的行为与 unknown 相反，never 是 TypeScript 中的 Bottom Type。符号是(⊥)

换句话说，就是任何类型都是 never 的父类型，never 是所有类型的子类型。

换句最简单的话说，就是类型是 never 的值都可以赋值给任何类型的变量，与其对应的是，我们不能把一个 unkown 类型的值赋值给任意非 unkown 类型的值。

let a: never = undefined // Type 'undefined' is not assignable to type 'never'
let b : bigint = a;
某个变量的类型是 never 一般表示程序不会执行到这里。
某个函数的返回值类型是 never，一般表示这个函数会 抛出异常，或者永不停机，不会正常返回。


any
any 是 ts 中让人最爱最恨的特性。它是渐进类型系统中的动态类型。
它的出现意味着这里这一小部分将不会有任何类型检查，你想让它是啥类型，它就是啥类型。
我们一般用于过于动态的函数的类型声明，比如 eval 之类的函数。
或者在工程上已有的类型声明错误，我进行强制声明成 any 然后抢救一下。
这是危险的功能，慎用！

每个字面量类型都只有一个实例，所以它们也是 unit type。

字面量类型
字面量（Literal Type）主要分为 真值字面量类型（boolean literal types），数字字面量类型（numeric literal types），枚举字面量类型（enum literal types） ，大整数字面量类型（bigInt literal types）和字符串字面量类型（string literal types

子类型关系
子类型（subtyping）是类型上的二元关系。

在编程语言理论中，子类型（动名词，英语：subtyping）是一种类型多态的形式。这种形式下，子类型（名词，英语：subtype）可以替换另一种相关的数据类型（超类型，英语：supertype）。也就是说，针对超类型元素进行操作的子程序、函数等程序元素，也可以操作相应的子类型。如果 S 是 T 的子类型，这种子类型关系通常写作 S <: T，意思是在任何需要使用 T 类型对象的环境中，都可以安全地使用 S 类型的对象。子类型的准确语义取决于具体的编程语言中“X 环境中，可以安全地使用 Y”的意义。编程语言的类型系统定义了各自不同的子类型关系。 由于子类型关系的存在，某个对象可能同时属于多种类型，因此，子类型（英语：subtyping）是一种类型多态的形式，也被称作子类型多态（英语：subtype polymorphism）或者包含多态（英语：inclusion polymorphism）。在面向对象程序设计中，多态一般仅指这里所说的“子类型多态”，而“参数多态”则一般被称作泛型程序设计。 子类型与面向对象语言中（类或对象）的继承是两个概念。子类型反映了类型（即面向对象中的接口）之间的关系；而继承反映了一类对象可以从另一类对象创造出来，是语言特性的实现。因此，子类型也称接口继承；继承称作实现继承。

