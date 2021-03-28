# 写给自己的 TypeScript 教程(一)<!-- omit in toc -->

## why TypeScript
## 基础类型和对象类型
```ts
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
```
## 类型注解和类型推断
## 函数相关类型
## 数组和元组
## interface 接口
## 类

