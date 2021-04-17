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