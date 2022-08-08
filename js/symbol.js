let s1 = Symbol()
let s2 = Symbol('foo')
let s3 = Symbol('bar')
let s4 = Symbol()

// Symbol 值可以显式转为字符串
console.log(s1.toString(), s2.toString(), s3.toString()) // Symbol() Symbol(foo) Symbol(bar)
console.log(s1 === s4) // false
console.log(String(s1) === String(s4)) // true

// Symbol 值也可以转为布尔值，但是不能转为数值
console.log(!s1) // false

// ES2019 提供了一个实例属性 description，直接返回 Symbol 的描述。
console.log(s3.description) // bar

// 有时，我们希望重新使用同一个 Symbol 值，Symbol.for() 方法可以做到这一点。
let s5 = Symbol.for('foo')
let s6 = Symbol.for('foo')

console.log(s5 === s6) // true

// Symbol.keyFor() 方法返回一个已登记的 Symbol 类型值的 key。
console.log(Symbol.keyFor(s5)) // foo
console.log(Symbol.keyFor(s2)) // undefined

// Symbol.for()为 Symbol 值登记的名字，是全局环境的，不管有没有在全局环境运行。
