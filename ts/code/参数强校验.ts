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

const point1: Point = {
  x: 1,
  y: 2,
  z: 3, // 报错，多余的属性
}

const tmp = {
  x: 1,
  y: 2,
  z: 3,
}

const point2: Point = tmp // 不会报错
