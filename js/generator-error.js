// gen
function* gen() {
  yield 1
  yield 2
  yield 3
  return 'ending'
}

const it = gen()
console.log(it.next()) // { value: 1, done: false }
console.log(it.next()) // { value: 2, done: false }
console.log(it.next()) // { value: 3, done: false }
console.log(it.next()) // { value: 'ending', done: true }
console.log(it.next()) // { value: undefined, done: true }

// yield 暂停执行
// 延迟执行 yield 后面的表达式决定了 next().value 的值
function* gen1() {
  console.log(`first`)
  yield 1 + 1
  console.log(`second`)
  yield 2 + 1
  console.log(`third`)
  yield 3 + 1
  console.log(`fourth`)
  return 'ending' // 可以返回值、也可以不返回值、返回值默认为 undefined
}

// 可以手动控制任务的调度
const it1 = gen1()
it1.next()
console.log(`after first`)
it1.next()
console.log(`after second`)
console.log(`before third`)
it1.next()
console.log(it1.next()) // { value: 'ending', done: true }

// next 可以接受参数
//! next 方法可以带一个参数，该参数就会被当作上一个 yield 表达式的返回值。
function* gen2() {
  const retVal1 = yield 1
  console.log(retVal1)
  const retVal2 = yield 2
  console.log(retVal2)
  const retVal3 = yield 3
  console.log(retVal3)
  return 'ending'
}

const it2 = gen2()
it2.next()
it2.next(`retVal1`) // retVal1
it2.next(`retVal2`) // retVal2
it2.next(`retVal3`) // retVal3

// return 语句返回的值不包括在 for...of 循环之中。

// 错误处理
function* gen3() {
  try {
    yield 1
    // 内部捕获等同于这里抛出了错误、下面代码就走不了了
    // 这里抛出错误，就会走到 catch 语句
  } catch (e) {
    console.log('内部捕获', e.message)
  }
  console.log('内部 throw 后这里执行')
  yield 2
  // 第二次在这里抛出错误，被外部捕获
  // 这里就不会执行了
  console.log('外部 throw 后这里执行')
  yield 3
  console.log('结束遍历')
}

const it3 = gen3()
it3.next()

try {
  // 抛出错误
  // 内部捕获
  it3.throw(new Error(`first error`))
  // 外部捕获
  // 被外部捕获后 yield 不会再执行，也就是 next 无效了
  it3.throw(new Error(`second error`))
  // 已经捕获了错误就走不到这里，走到 catch 中
  // it3.throw(new Error(`third error`))
} catch (error) {
  console.log('外部捕获', error.message)
}

it3.next()
it3.next()
// it3.throw(new Error(`fourth error`))

// 如果没有任何try...catch代码块可以捕获这个错误，导致程序报错，中断执行。
// next方法一次都没有执行过。这时，抛出的错误不会被内部捕获，而是直接在外部抛出，导致程序出错。
// throw 相当于一次 next

// 一旦 Generator 执行过程中抛出错误，且没有被内部捕获，就不会再执行下去了。如果此后还调用next方法，将返回一个value属性等于undefined、done属性等于true的对象，即 JavaScript 引擎认为这个 Generator 已经运行结束了。

// next()
const gen4 = function* (x, y) {
  let ret = yield x + y
  return ret
}

const it4 = gen4(1, 2)

console.log(it4.next()) // 执行 yield 表达式后的表达式，并将其返回值作为 value 的值
// { value: 3, done: false }

// 将 next 的参数用作 yield 表达式的返回值，并且将其作为 ret 的值
console.log(it4.next(`ret`)) // { value: 'ret', done: true }

// 基于上述我们可以把 yield 后面表达式的返回值和 next 的参数结合在一起。
// console.log(it4.next(it4.next().value).value) // 3

const gen5 = function* (x, y) {
  try {
    let ret = yield x + y
    return ret
  } catch (e) {
    console.log(e.message) // error
  }
}

const it5 = gen5(1, 2)

console.log(it5.next()) // 执行 yield 表达式后的表达式，并将其返回值作为 value 的值
// { value: 3, done: false }

// 相当于将 let result = yield x + y
// 替换成 let result = throw(new Error('出错了'));
it5.throw(new Error('error'))

const g = function* (x, y) {
  console.log('start')
  let ret1 = yield x + y
  console.log('ret1', ret1)
  let ret2 = yield ret1 * y
  console.log('ret2', ret2)
  try {
    yield ret2.join('')
  } catch (error) {
    console.log('error', error.message)
  }
  try {
    yield ret2 * x
  } finally {
    // 这里是 finally 块必然会执行 doSomething()
    console.log('finally')
  }
  let ret3 = yield ret2 * y
  console.log('ret3', ret3)
  return ret3
}

const _it = g(1, 2)
let _ret1 = _it.next() // 执行 start x + y 返回 { value: 3, done: false }

let _ret2 = _it.next(_ret1.value) // 执行 let ret1 = next 的参数 到 ret1 * y 停止

// _it.throw()
// 代码在 let ret2 = yield ret1 * y 停止
//  等同于 let ret2 = throw new Error('error')
// 由于内部没捕获，所以可以在外部捕获
// try {
//   _it.throw(new Error('error'))
// } catch (error) {
//   console.log('外部捕获', error.message)
// }
// // 外部捕获了错误，所以不会再执行下去
// _it.next() 无效

// 代码不会在 ret2.join('') 中止
// 内部错误被捕获
// 会在 ret2 * y 停止
_it.next() // 返回 { value: '12', done: true }

// 这里会把 yield ret2 * y 替换 _ret.value 并且 return 不再执行下区
// _it.return(_ret.value)
// _it.next() // 无效

// 这里会把 yield ret2 * y 替换 undefined
_it.next()
// 这里结束 end
_it.next(_ret2.value)

// next 比 yield 多一次，途中报错那次 yield 不会执行，跳过了
