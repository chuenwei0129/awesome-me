// 1. 不传值默认为 globalThis，执行时调用 call
// 2. 第一次传入的参数需要和第二次传入的参数合并
// 3. boundF 作为构造函数时，this 原来绑定会失效，指向 boundF 的实例 this
// 4. 用 `this instanceof boundF` 来判断是构造函数还是普通调用
// 5. boundF 的实例需要继承原函数原型上的方法 `this.__proto__.__proto__ === f.prototype`

// 测试用例：
function f(a, b) {
  console.log('f-this -->', this)
  return a + b
}

f.prototype.fn = () => {
  return 'fn'
}

const o = { x: 1 }
const Bound = f.bind(o, 1)
console.log(Bound, Bound(2), new Bound().fn())

Function.prototype.$bind = function (thisArg, ...$bindArgs) {
  thisArg = thisArg ?? globalThis
  // f.$bind(o, 1) ==> this === f
  const f = this
  const boundF = function (...boundFArgs) {
    // 当 new boundF 时，boundF 满足 this.__proto__ === boundF.prototype
    // 要实现 boundF 的实例继承原函数原型上的方法，即 this.__proto__ === f.prototype
    // 只需修改返回函数的 prototype 为绑定函数的 prototype 即 boundF.prototype = f.prototype
    // 但直接赋值修改并不好，因为所引用的地址相等，修改 boundF.prototype 的时候，也会直接修改 f.prototype
    // 我们可以构建原型链，将 boundF.prototype 指向 f.prototype，通过原型链来查找
    // 即只需实现 boundF.prototype.__proto__ === f.prototype
    Object.setPrototypeOf(boundF.prototype, f.prototype)
    // boundF 为构造函数调用，忽略 thisArg 绑定，this 指向当前 boundF this
    return f.call(this instanceof f ? this : thisArg, ...boundFArgs, ...$bindArgs)
  }
  return boundF
}

const $Bound = f.$bind(o, 1)
console.log($Bound, $Bound(2), new $Bound().fn())

// f-this --> { x: 1 }
// f-this --> f {}
// [Function: bound f] 3 fn
// f-this --> { x: 1 }
// f-this --> boundF {}
// [Function: boundF] 3 fn
