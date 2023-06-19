class Parent {
  name: string
}
class Child extends Parent {
  age: number
}

// 参数强校验属于协变

type AsFuncArgType<T> = (arg: T) => void
type AsFuncReturnType<T> = (arg: unknown) => T

// Child <- Parent
// 逆变
// Wrapper<Child> 是个整体
// 作为函数参数时，Wrapper<Child> <- Wrapper<Parent> === false
type CheckArgType = AsFuncArgType<Child> extends AsFuncArgType<Parent>
  ? true
  : false

// 协变
// 作为函数返回值时，Wrapper<Child> <- Wrapper<Parent> === true
type CheckReturnType = AsFuncReturnType<Child> extends AsFuncReturnType<Parent>
  ? true
  : false

// //协变
// const arr: Array<Parent> = [new Child()]

// // 协变
// interface Student {
//   name: string
// }

// const logger = (student: Student): void => {
//   console.log(student.name)
// }

// const xiaoming = { name: 'xiaoming', age: 28 }
// logger(xiaoming) // 不会报错

// // 逆变
// const f: (arg: Child) => void = (arg) => {
//   console.log(arg)
// }

// f(new Parent()) // 不会报错

// .8
// 10.
// 都有效
// 0. toString() 语法

// utf8
// ![20230216163021](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/others/20230216163021.png)

// 语义上 Null 就表示这个已经存在的值
// Undefined 表示还没有被定义过的值
//
// 所以任何一个对象都是唯一的，这与它本身的状态无关。

// 所以，即使状态完全一致的两个对象，也并不相等。

// 我们用状态来描述对象。

// 我们状态的改变即是行为。

// 5，10

// 多继承，🐟 既是 水生动物，又是 鱼类动物

// 面向对象设计 狗咬人，

// js iframe 与 主页面的内置对象都不同
