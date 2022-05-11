# JavaScript 从零单排(九)<!-- omit in toc -->

## call / apply

```js
const foo = {
  val: 1
}

function bar() {
  return this.val
}

console.log(
  bar.call(foo)
  // bar.call(1)
)

// this 指的是函数执行环境，call 调用时等同于把 bar 的执行环境改成 foo，等同于给 foo 对象添加 bar 方法
// 由于给 foo 对象添加了一个属性，所以最后我们需要 delete 它
// 所以 call 的模拟步骤可以抽象成 bar.call(foo) ==> foo.bar() ==> delete foo.bar

Function.prototype._call = function (thisArg, ...args) {
  // Object(thisArg) 是为了防止 19 行出现数字 2..tofixed()
  thisArg = thisArg ? Object(thisArg) : globalThis
  const key = Symbol('key')
  thisArg[key] = this
  const ret = thisArg[key](...args)
  delete thisArg[key]
  return ret
}

console.log(
  bar._call(foo)
  // bar._call(1)
)
```

## bind

```js
// 1. 不传值默认为 globalThis, null, undefined, 原始类型都由 call 处理
// 2. 第一次传入的参数需要和第二次传入的参数合并
// 3. bindedFn 可以作为构造函数，此时 this 绑定会失效，会指向实例 this，`this instanceof bindedFn` 来作为判断是构造函数，还是普通调用
// 4. bindedFn 的实例需要继承原函数原型上的方法 `this.__proto__.__proto__ === that.prototype`
// bound 执行才会执行原函数

function fn(a, b) {
  console.log('this --> ', this)
  return a + b
}

const obj = { x: 1 }

const Bound = fn.bind(obj, 1)
console.log(Bound, Bound(2), new Bound())

Function.prototype._bind = function (thisArg, ...args) {
  // 函数默认值无法处理 null
  thisArg = thisArg || globalThis
  const fn = this
  const bound = function (...boundArgs) {
    // 已知 this.__proto__ === bound.prototype 要实现 fn 函数中 this 等同于当前 this 即 this（当前this，因为 thisFn.__proto__ === fn.prototype）.__proto__ === fn.prototype
    // 所以只要构建原型链关系即可
    // bound.prototype = Object.create(fn.prototype) // 会丢失 bound.prototype.constructor
    Object.setPrototypeOf(bound.prototype, fn.prototype)
    // this.__proto__ === fn.prototype 为构造函数调用，忽略 thisArg 绑定，直接 call 实例 this
    return fn.call(this instanceof fn ? this : thisArg, ...boundArgs, ...args)
  }
  return bound
}

const _Bound = fn._bind(obj, 1)

console.log(_Bound, _Bound(2), new _Bound())

// this -->  { x: 1 }
// this -->  fn {}
// [Function: bound fn] 3 fn {}
// this -->  { x: 1 }
// this -->  fn {}
// [Function: bound] 3 fn {}
```

## new

```js
// 因为 new 是关键字,所以我们写一个函数，命名为 _new，
// 来模拟 new 的效果。用的时候是这样的：
// var f = new F(...) === var f = _new(F, ...)

function F() {
  this.age = 28
  // return null
  // return 1
  // return this
  return {
    age: 18,
    fn() {
      return this.age
    }
  }
}

F.prototype.fn = function () {
  return this.age
}

const f = new F()

console.log(typeof f, F.prototype === Object.getPrototypeOf(f), f.age, f.fn())

function _new() {
  const ctor = [].shift.call(arguments)
  const inst = Object.create(ctor.prototype)
  const ret = ctor.call(inst, ...arguments)
  return typeof ret === 'object' && ret !== null ? ret : inst
}

const _f = _new(F)

console.log(typeof _f, F.prototype === Object.getPrototypeOf(_f), _f.age, _f.fn())

// 注释版
// function _new() {
//  // 处理参数
//  const constructor = [].shift.call(arguments)
//  // 创建一个新的实例对象
//  // 把实例的 __proto__ 指向构造函数的 prototype
//  const instance = Object.create(constructor.prototype)
//  // 改变 this 指向，处理传参
//  // 构造函数如果有返回值是对象的情况下，会返回该对象 new 出的实例就是该对象，其他返回实例对象
//  // res 储存构造函数的返回值，apply 和 call 都相当于函数执行了一次，只是函数执行环境变化
//  const res = constructor.apply(instance, arguments)
//  // 返回实例对象
//  console.log(typeof res)
//  return typeof res === 'object' && res !== null ? res : instance
// }
```

## instanceof

```js
const _instanceof = (left, right) => {
  // 第一次查找原型
  let proto = Object.getPrototypeOf(left)
  while (1) {
    // right 是 callable 是函数
    if (proto === right.prototype) return true
    if (proto === null) return false
    // 递归查找
    proto = Object.getPrototypeOf(proto)
  }
}

console.log(Object instanceof Object)

console.log(_instanceof(Object, Object))
```

## flat

```js
const arr = [1, [2, { a: 1 }], [4, 5, [6, 7, 8, [9, [10]]]]]

// 1. toString 方法 只适合 string[], number[] ...

// 2. api 注意点 -> 层数
console.log(arr.flat(Infinity))

// 3. 正则 + 序列化、反序列化
console.log(JSON.parse(`[${JSON.stringify(arr).replace(/\[|\]/g, '')}]`))

// 4. 递归
// x 是数组就递归,不是就放入 ret 中,重点是 ret 闭包
const flat = (arr, ret = []) => {
  arr.forEach(x => {
    Array.isArray(x) ? flat(x, ret) : ret.push(x)
  })
  return ret
}

console.log(flat(arr))

// 5. reduce
// 本质还是递归，累计器存储 concat
const flatReduce = arr => {
  return arr.reduce((acc, cur) => {
    return acc.concat(Array.isArray(cur) ? flatReduce(cur) : cur)
  }, [])
}
console.log(flatReduce(arr))

// 6. while + some + concat 原理：...拍平一层后的里面的数组和普通值都会被 concat 合并成新数组，可以少循环一次
const flatWhile = arr => {
  // 是否有子数组
  while (arr.some(x => Array.isArray(x))) {
    // console.log('执行次数')
    arr = [].concat(...arr)
  }
  return arr
}

console.log(flatWhile(arr))
```

## fib

```js
// 0、1、1、2、3、5、8、13、21、34

// fn(n) = f(n-1) + f(n-2)
// n === 2, n === 1

const fib = n => {
  if (n === 0) return 0
  if (n === 1) return 1

  return fib(n - 1) + fib(n - 2)
}

console.time('递归')
fib(25)
console.timeEnd('递归')

// 缓存执行结果
const memo = (fn, cahe = {}) => {
  // 原函数返回的是值，所以高阶函数也返回缓存过的值
  return n => {
    if (!cahe[n]) {
      cahe[n] = fn(n)
    }
    return cahe[n]
  }
}

console.time('memo')
memo(fib)(25)
console.timeEnd('memo')

function loop(n) {
  let first = 0
  let second = 1
  let third = 1
  if (n === 0) return first
  if (n === 1) return second
  if (n === 2) return third
  for (let i = 3; i <= n; i++) {
    first = second
    second = third
    third = first + second
  }
  return third
}

console.log(loop(6))

// function fib(n){
//  function fib_(n,a,b){
//    if(n==0)  return a
//    else return fib_(n-1,b,a+b)
//  }
//  return fib_(n,0,1)
// }
```

## debounce / throttle

```js
// 触发高频时间后n秒内函数只会执行一次,如果n秒内高频时间再次触发,则重新计算时间。// 类似放火球术，一直打断会放不出去，用户输入发请求不适用，debounce，延时
// 1创建一次延迟，2 删除上一次，创建一次新的延迟
// 高阶函数
function debounce(fn, delay = 300, timer = null) {
  return (...args) => {
    // timer 通过闭包保存，下一次进来会清除上一次创建的 timer
    // debounce 只执行一次，执行多次的是他的返回值
    // console.log('调用 debounce 次数', ++i, '上一次建立的定时器 timer', timer)
    // 所以保证了 300 ms 內只执行一次
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}

// 高频时间触发,但n秒内只会执行最后一次,所以节流会稀释函数的执行频率。 // 节流，一段时间內必然会执行一次，throttle
// 时序图分析
// 1-2-3-4-5---300ms---6-7-8-9-10---300ms---
// --------5----fn()---6-7-8-9-10----fn----

function throttle(fn, delay = 300) {
  // let lock = false 和 在 (lock=false) 写都会闭包
  // let lock = false 写在 () 中，delay 必须传值，参数默认值的特点
  let lock = false
  return (...args) => {
    if (lock) return
    // 第一次不需要节流
    fn(...args)
    lock = true
    // 也不需要清除定时器，虽然一直点可能出现定时器混乱，但这就是节流啊
    setTimeout(() => {
      lock = false
    }, delay)
  }
}
```

## Observer

```js
// 一对多
class Observer {
  update(state) {
    console.log('小宝宝的状态', state)
  }
}

class Subject {
  constructor() {
    this.state = '😭'
    this.obs = []
  }
  attach(ob) {
    this.obs.push(ob)
  }
  notify() {
    this.obs.forEach(ob => ob.update(this.state))
  }
}

const baby = new Subject()

const father = new Observer()
const mother = new Observer()

baby.attach(father) // 小宝宝的状态 😭 ==> 小宝宝的状态 😊
baby.attach(mother) // 小宝宝的状态 😭 ==> 小宝宝的状态 😊

baby.notify() // 第一次

baby.state = '😊'
baby.notify() // 第二次
```

## eventEmitter

```js
const l = {
  tasks: [],
  caches: [],
  on(name, fn) {
    this.caches.length > 0
      ? this.caches.forEach((cache, idx) => {
          if (name in cache) {
            fn(...cache[name])
            this.caches.splice(idx, 1)
          }
        })
      : this.tasks.push({ [name]: fn })
  },
  emit(name, ...args) {
    // 有可能一种情况 tasks 没任务但触发了 emit
    this.tasks.length === 0 && name && this.caches.push({ [name]: [...args] })
    this.tasks.forEach(task => {
      if (task[name]) {
        task[name](...args)
      } else {
        this.caches.push({ [name]: [...args] })
      }
    })
  },
  off(name) {
    this.tasks.forEach((task, idx) => {
      if (name in task) {
        this.tasks.splice(idx, 1)
      }
    })
  },
  once(name, fn) {
    this.on(name, (...args) => {
      // 特殊的 on 代理一层
      fn(...args)
      this.off(name)
    })
  }
}

// 先 emit 后 on
l.emit('world', 'world')
l.emit('test', 'test')
l.on('world', h => console.log(h)) // world
console.log('caches', l.caches) // caches [ { test: [ 'test' ] } ]
l.on('test', h => console.log(h)) // test
console.log('caches', l.caches) // caches []

// 先 on
l.on('hello', h => console.log(h))
l.emit('hello', 'hello') // 'hello'
l.emit('hello', 'hello') // 'hello'

console.log('tasks', l.tasks) // tasks [ { hello: [Function] } ]

l.off('hello')

console.log('tasks', l.tasks) // tasks []

l.once('world', h => console.log(h))
l.emit('world', 'world') // world

console.log('tasks', l.tasks) // tasks []
```

## deepClone

```js
const test = {
  // undefined
  undefined,
  // function
  func() {
    console.log('我是函数')
  },
  // 特殊对象
  regexp: /\d/g,
  x: {
    x: {
      x: {
        x: {
          x: {
            x: 1
          }
        }
      }
    }
  }
}

// symbol 属性
test[Symbol('symbol')] = 'symbol'
// 不可枚举属性
Object.defineProperty(test, 'enumObj', {
  enumerable: false,
  // getter，setter
  get() {
    return 20
  }
})

// 循环引用
test.target = test

// 原型链上的方法
const F = function () {}
F.prototype.sayHello = () => {
  console.log('我是原型链上的方法')
}
Object.setPrototypeOf(test, F.prototype)

const deepClone = (target, cache = new WeakMap()) => {
  if (typeof target !== 'object' || target === null) return target
  // 第二次进来如果 v 在字典表里表示循环引用，只是处理循环引用那一项时，直接return，其他项走的是 Reflect 循环
  if (cache.has(target)) return cache.get(target)
  // 保证原型上的方法不会丢失
  const ret = Array.isArray(target) ? [] : new target.constructor()
  // 把返回值和 自己建立字典
  cache.set(target, ret)
  for (const k of Reflect.ownKeys(target)) {
    const v = target[k]
    ret[k] = typeof v === 'object' && v !== null ? deepClone(v, cache) : v
  }
  return ret
}

console.log(deepClone(test))
```

## curry

```js
// 柯里化
// fn(1, 2, 3, 4) // 执行...
// f = fn(1)(2)(3) // 返回函数缓存这三个参数
// f(5) // 执行..

// const curry = fn => {
//  const g = (...allArgs) => allArgs.length >= fn.length ? fn(...allArgs) : (...args) => g(...allArgs, ...args)
//  return g
// }

// 维基百科上的解释是，把接受多个参数的函数转换成接受一个单一参数的函数
// 普通函数可以转成高阶函数调用
// 用函数参数去保存变量，高阶函数用法

const sum = (a, b, c) => {
  return a + b + c
}

console.log(
  sum(1, 2, 3) // sum(1)(2)(3)
)

// 1.0 闭包
const _sum = a => b => c => a + b + c

console.log(_sum(1)(2)(3))

// 2.0
// 函数参数保存变量
// 低阶函数转高阶函数调用
// 小于 fn.length 时,储存参数，返回一个高阶函数使用g来缓存
// 等于 length 时 开始执行函数

const curry = fn => {
  const g = (...allArgs) =>
    allArgs.length >= fn.length ? fn(...allArgs) : (...args) => g(...args, ...allArgs)
  return g
}

console.log(curry(sum)(1)(2, 3))
```

## Object.create

```js
const origin = { a: 1 }

const o = Object.create(origin)

console.log(Object.getPrototypeOf(o) === origin, o.__proto__ === origin)

Object._create = function (origin) {
  const F = function () {}
  origin = F.prototype
  return new F()
}

const c = Object.create(origin)

console.log(Object.getPrototypeOf(c) === origin, c.__proto__ === origin)
```

## compose

```js
function add(a, b) {
  return a + b
}

function square(y) {
  return y ** 2
}

function minus(x) {
  return --x
}

console.log(minus(square(add(1, 2)))) // 8

// compose 1.0 定参
// 函数最里面是最先执行的，也是接受参数的
function _compose(f1, f2, f3) {
  return (...args) => {
    return f3(f2(f1(...args)))
  }
}

console.log(
  _compose(add, square, minus)(1, 2) // 8
)

// compose 2.0 数组

// 第一个函数是最先执行的，也是接受参数的，接下来是把他的值当作参数传递到下一个函数
// 中间件书写顺序，minus，square，add，所以得反过来，最后一个函数是最先执行的，中间件是有顺序的
// 所以 reduceRight

function compose(mids) {
  return (...args) => {
    const len = mids.length
    const _mids = mids.reverse()
    let ret
    for (let i = 0; i < len; i++) {
      if (i === 0) {
        ret = _mids[i](...args)
      } else {
        ret = _mids[i](ret)
      }
    }
    return ret
  }
}

console.log(
  compose([minus, square, add])(1, 2) // 8
)

// reduce 累加器 传递的是参数
function composeReduce(mids) {
  return (...args) => {
    return mids.reduceRight((prev, curr) => {
      // 第一个函数要特殊处理
      return typeof prev === 'function' ? curr(prev(...args)) : curr(prev)
    })
  }
}

console.log(
  composeReduce([minus, square, add])(2, 1) // 8
)

// compose 3.0 异步
// 递归实现
const composeAsync = mids => {
  return () => {
    const dispatch = i => {
      // fn 是 async
      const fn = mids[i] // fn1

      // 递归条件
      if (!fn) return Promise.resolve()

      // next 调度
      const next = () => {
        dispatch(i + 1) // dispatch(1)
      }
      // 每次调度返回值
      // next() 一执行 下一个就 入栈，最后一个立即成功，
      return Promise.resolve(fn(next)) // fn1 start -> dispatch(1)执行(fn2 start -> dispatch(2)() -> fn2 end) -> fn1 end
    }

    // 第一次也要返回
    return dispatch(0)
  }
}

// 异步顺序不变，promise 链
//

async function fn1(next) {
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('fn1 start')
      resolve()
    }, 3000)
  })

  await next()
  console.log('fn1 end')
}

async function fn2(next) {
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('fn2 start')
      resolve()
    }, 1000)
  })
  await next()
  console.log('fn2 end')
}

async function fn3(next) {
  console.log('fn3 start')
  await next()
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('fn3 end')
      resolve()
    }, 1000)
  })
}

console.log(composeAsync([fn1, fn2, fn3])())

// 入栈顺序有序，出栈顺序可以改变

// function compose(...fns) {
//  let len = fns.length
//  let res = null
//  return function fn(...arg) {
//    res = fns[len - 1].apply(null, arg) // 每次函数运行的结果
//    if(len > 1) {
//      len --
//      return fn.call(null, res) // 将结果递归传给下一个函数
//    } else {
//      return res //返回结果
//    }
//  }
// }
```

## class

```js
// es5 和 es6 继承区别

// 静态属性和方法是可被继承的

// super 关键字，对象字面量中，代表原型对象
// class 中 super(...) 代表父 class 的 constructor

class Animal {
  constructor() {
    console.log('我先执行', this)
  }
  fn() {
    console.log('h')
  }
}

class Rabbit extends Animal {
  // 不写相当于
  constructor(...args) {
    super(...args) // 执行 Animal 的 constructor，super
    // ES6 中子类没有自己的this，必须执行super()，子类的this是从父类继承的
    // 执行super() ===  Animal 的 constructor() ,此时便有了 this，这两个 this 是一样的
    console.log('我后执行', this)
  }
  // 父类构造器总是会使用它自己字段的值
}

new Animal()

console.log(Object.keys(new Animal()))

// ES5 的继承，实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面（Parent.apply(this)）。
// ES6 的继承机制完全不同，实质是先将父类实例对象的属性和方法，加到this上面（所以必须先调用super方法），然后再用子类的构造函数修改this

function Father() {
  // es5 把 父 this 显示改成 子 this
  this.name = '100'
  console.log(this)
}

Father.c = () => console.log('c')

Father.prototype.fn = function () {
  console.log('fn')
}

const f = new Father()

Object.setPrototypeOf(Son.prototype, Father.prototype)
Object.setPrototypeOf(Son, Father)

function Son() {
  // 相当于 Father 在这执行
  Father.call(this)
  // this 是 Son 自己的，
}
console.log(Son.c())

const son = new Son()

console.log('fn' in son)
```
