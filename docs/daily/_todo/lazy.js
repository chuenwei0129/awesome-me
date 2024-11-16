/**
 * 简易版lazy.js
 */
let MAX_ARRAY_LENGTH = 4294967295 // 最大的数组长度
let LAZY_FILTER_FLAG = 1 // filter方法的标记

// 缓存数据结构体
function LazyWrapper(value) {
  this.__wrapped__ = value
  this.__iteratees__ = []
  this.__takeCount__ = MAX_ARRAY_LENGTH
}

// 惰性求值的入口
function lazy(value) {
  return new LazyWrapper(value)
}

// 根据 筛选方法iteratee 筛选数据
function filter(iteratee) {
  this.__iteratees__.push({
    iteratee: iteratee,
    type: LAZY_FILTER_FLAG,
  })
  return this
}

// 截取n个数据
function take(n) {
  this.__takeCount__ = n
  return this
}

// 惰性求值
function lazyValue() {
  let array = this.__wrapped__
  let length = array.length
  let resIndex = 0
  let takeCount = this.__takeCount__
  let iteratees = this.__iteratees__
  let iterLength = iteratees.length
  let index = -1
  let dir = 1
  let result = []

  // 标签语句
  outer: while (length-- && resIndex < takeCount) {
    // 外层循环待处理的数组
    index += dir

    let iterIndex = -1
    let value = array[index]

    while (++iterIndex < iterLength) {
      // 内层循环处理链上的方法
      let data = iteratees[iterIndex]
      let iteratee = data.iteratee
      let type = data.type
      let computed = iteratee(value)

      // 处理数据不符合要求的情况
      if (!computed) {
        if (type === LAZY_FILTER_FLAG) {
          continue outer
        } else {
          break outer
        }
      }
    }

    // 经过内层循环，符合要求的数据
    result[resIndex++] = value
  }

  return result
}

// 绑定方法到原型链上
LazyWrapper.prototype.filter = filter
LazyWrapper.prototype.take = take
LazyWrapper.prototype.value = lazyValue

let testArr = [1, 19, 30, 2, 12, 5, 28, 4]

lazy(testArr)
  .filter(function (x) {
    console.log('check x=' + x)
    return x < 10
  })
  .take(2)
  .value()

let obj = {
  a: '',
  b: [],
  c: {},
  d: 0,
  e: false,
  f: null,
  g: undefined,
  h: -0,
  i: NaN,
  j: { a: 'b' },
  k: 1n,
  l: 'hello',
  m: Symbol('symbol'),
}
Object.entries(obj).forEach(([k, v]) => {
  if (
    (typeof v === 'object' && v != null && !Object.keys(v).length) ||
    v === ''
  )
    delete obj[k]
})
console.log(obj)
