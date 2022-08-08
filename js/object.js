// 属性的简洁表示法
let birth = '2000/01/01'

const Person = {
  _name: '张三',

  // 等同于 birth: birth
  birth,

  // 等同于 hello: function ()...
  // 类字面量的方法有 super 关键字，上面函数没有 super 关键字
  // 类字面量的方法不能用作构造函数
  hello() {
    console.log('我的名字是', this.name)
  },

  get name() {
    return this._name
  },

  set name(value) {
    this._name = value
  }
}

// 属性名表达式
let propKey = 'foo'
let key = { a: 1 }

let obj = {
  [propKey]: true,
  ['a' + 'bc']() {
    return 'abc'
  },
  // 属性名表达式如果是一个对象，默认情况下会自动将对象转为字符串 `[object Object]`
  [key]: true
}

console.log(obj) // { foo: true, abc: [Function: abc] } '[object Object]': true

// name
const person = {
  sayName() {
    console.log('hello!')
  }
}
person.sayName.name // "sayName"

const obj1 = {
  get foo() {},
  set foo(x) {}
}

// obj.foo.name
// TypeError: Cannot read property 'name' of undefined

const descriptor = Object.getOwnPropertyDescriptor(obj1, 'foo')
console.log(descriptor.get.name) // "get foo"
console.log(descriptor.set.name) // "set foo"

console.log(new Function().name) // "anonymous"

const doSomething = function () {
  // ...
}
console.log(doSomething.name) // "doSomething"

const key1 = Symbol('description')
const key2 = Symbol()
let obj2 = {
  [key1]() {},
  [key2]() {}
}
console.log(obj2[key1].name) // "description"
console.log(obj2[key2].name) // ""

// descriptor
const obj3 = { foo: 1 }
const descriptor1 = Object.getOwnPropertyDescriptor(obj3, 'foo')

console.log(descriptor1) // { value: 1, writable: true, enumerable: true, configurable: true }

// 遍历
console.log(
  Reflect.ownKeys({
    [Symbol()]: 1,
    10: 2,
    3: 3,
    a: 4
  })
) // [ '3', '10', 'a', Symbol() ]

// 扩展运算符
let z = { a: 3, b: 4 }
let n = { ...z }
console.log(n) // { a: 3, b: 4 }

let arrLike = { ...[1, 2, 3] }
console.log(arrLike) // { '0': 1, '1': 2, '2': 3 }

console.log({ ...{}, ...{ a: 1 }, b: 2 }) // { a: 1, b: 2 }

// 等同于 { ...Object(true), ...Object(null), ...} === {}
// 如果扩展运算符后面是字符串，它会自动转成一个类似数组的对象，因此返回的不是空对象。
console.log({ ...1, ...'abc', ...true, ...null, ...undefined }) // { '0': 'a', '1': 'b', '2': 'c' }

// 对象的扩展运算符，只会返回参数对象自身的、可枚举的属性
class C {
  p = 12
  m() {} // 不可枚举，实例原型上的方法
}

let c = new C()
let clone = { ...c }

console.log(clone) // { p: 12 }

// 等同于 console.log({ ...clone, ...{ q: 13 } })
Object.assign(clone, { q: 13 })
console.log(clone) // { p: 12, q: 13 }

// is
// 与严格比较运算符=== 不同之处只有两个：一是 +0 不等于 -0，二是 NaN 等于自身。
console.log(+0 === -0) // true
console.log(NaN === NaN) // false
console.log(Object.is(+0, -0)) // false
console.log(Object.is(NaN, NaN)) // true

// Object.assign()
// Object.assign() 方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）。
// 浅拷贝
const target = { a: 1 }
const source1 = { a: 2, b: 2 }
const source2 = { c: 3 }

Object.assign(target, source1, source2)
console.log(target) // { a: 2, b: 2, c: 3 }

// 隐式类型转换
console.log(typeof Object.assign(2)) // "object"

// 如果 undefined 和 null 不在首参数，就不会报错。
let obj4 = { a: 1 }
console.log(Object.assign(obj4, undefined, null) === obj4) // true

// 属性名为 Symbol 值的属性，也会被 Object.assign() 拷贝。
console.log(Object.assign({ a: 'b' }, { [Symbol('c')]: 'd' })) // { a: 'b', [Symbol(c)]: 'd' }

// Object.assign 方法总是拷贝一个属性的值，而不会拷贝它背后的赋值方法或取值方法。
const source3 = {
  get foo() {
    return 1
  }
}
const target2 = {}
console.log(Object.assign(target2, source3)) // { foo: 1 }

// Object.getOwnPropertyDescriptors()
const obj5 = {
  foo: 123,
  get bar() {
    return 'abc'
  }
}

console.log(Object.getOwnPropertyDescriptors(obj5)) // { foo: { value: 123, writable: true, enumerable: true, configurable: true }, bar: { get: [Function: get bar], set: undefined, enumerable: true, configurable: true } }

// __proto__属性，Object.setPrototypeOf()，Object.getPrototypeOf()
const obj6 = { a: 1 }
const obj7 = Object.create(obj6)
console.log(obj7.__proto__ === obj6) // true

Object.setPrototypeOf(obj7, null)
console.log(obj7.__proto__ === obj6) // false
console.log(Object.getPrototypeOf(obj7)) // null

// Object.keys()，Object.values()，Object.entries()
const obj8 = { foo: 123, bar: 456 }
console.log(Object.keys(obj8)) // [ 'foo', 'bar' ]
console.log(Object.values(obj8)) // [ 123, 456 ]
console.log(Object.entries(obj8)) // [ [ 'foo', 123 ], [ 'bar', 456 ] ]

// Object.fromEntries()
console.log(
  Object.fromEntries([
    ['foo', 123],
    ['bar', 456]
  ])
) // { foo: 123, bar: 456 }

const map = new Map([
  ['a', 1],
  ['b', 2]
])

console.log(Object.fromEntries(map)) // { a: 1, b: 2 }
