# TS

## 参数强校验

```ts
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
```

## JSON

```ts
// JSON等 api 处理过的数据无法自动推断类型，需要注解
const data: { name: string; age: number } = JSON.parse(
  JSON.stringify({ name: 'chu', age: 28 })
)
```

## 函数

```ts
// 此种写法必须有返回值
const sum: (a: number, b: number) => number = (a, b) => a + b
// 这种写法返回值可以推断出来，但一般推荐必须写，为了获取你期望的值
const sum1 = (a: number, b: number): number => a + b + ''

console.log(sum(1, 2), sum1(2, 3))
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
  // 抽象类可以和普通类一样实现属性方法
  sayHi(): void {
    console.log('hi')
  }
}

// 抽象类不可以被 new 只可以继承
// 抽象方法必须实现，相当于必须实现的公有方法
// const geom = new Geom() // 会报错

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

## 编译

ts import js
.ts -> .d.ts 翻译文件 -> .js

scripts 结合使用

dev:build tsc -w
dev:start nodemon node build.js
concurrently 包
dev `concurrently npm:dev:*`
并行执行命令

tsc --init
生成 ts 配置文件编译配置

tsc 不加任何参数才会执行应用 tsconfig

编译 include 文件
alowjs js 也会被编译

.d.ts // declare 函数可以声明多次，函数重载

全局命名空间嵌套，函数重载,声明，es6 模块化， declare module + export 到处去

namespace + export + re fen ce

## 类型保护

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
