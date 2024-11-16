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
