const add = (x, y) => x + y
const square = y => y ** 2
const minus = x => x - 1

// (1 + 2) ** 2 - 1
console.log(minus(square(add(1, 2)))) // 8

// compose 1.0
const compose_1 =
  (add, square, minus) =>
  (...args) =>
    minus(square(add(...args)))

console.log(
  compose_1(add, square, minus)(1, 2) // 8
)

// 通用
// compose 2.0
// 模拟中间件机制，数组最后一个函数是最先执行的，且接受参数，接下来是把他的返回值当作参数传递给数组上一项的函数，直到循环结束
// 书写顺序，minus，square，add
function compose_2(...mids) {
  return (...args) => {
    const reversedMids = mids.reverse()
    let res
    for (let i = 0; i < mids.length; i++) {
      if (i === 0) {
        res = reversedMids[i](...args)
      } else {
        res = reversedMids[i](res)
      }
    }
    return res
  }
}

console.log(
  compose_2(minus, square, add)(1, 2) // 8
)

// compose 3.0
// 书写顺序，minus，square，add，所以 reduceRight
function compose_3(...mids) {
  return (...args) => {
    return mids.reduceRight((acc, f) => {
      // reduceRight 第二个参数不传，第一次 acc 为数组最后一项，第二次以后就为函数返回值参数，直到循环结束
      return typeof acc === 'function' ? f(acc(...args)) : f(acc)
    })
  }
}

console.log(
  compose_3(minus, square, add)(2, 1) // 8
)

// compose 4.0
// 通过栈实现
function compose_4(...fns) {
  let len = fns.length
  let res = null
  return function fn(...arg) {
    res = fns[len - 1].apply(null, arg) // 每次函数运行的结果
    if (len > 1) {
      len--
      return fn.call(null, res) // 将结果递归传给下一个函数
    } else {
      return res //返回结果
    }
  }
}

console.log(
  compose_4(minus, square, add)(1, 2) // 8
)

// compose 5.0
// 支持异步
const composeAsync = (...fns) => {
  return () => {
    const dispatch = i => {
      const fn = fns[i]
      // 空判断
      if (!fn) {
        return Promise.resolve()
      }

      const next = () => {
        dispatch(i + 1)
      }

      return Promise.resolve(fn(next))
    }
    return dispatch(0)
  }
}

async function f1(next) {
  console.log('f1-start')
  await next()
  console.log('f1-end')
  return 1
}

async function f2(next) {
  console.log('f2-start')
  await next()
  console.log('f2-end')
}

// 调用方式
console.log(composeAsync(f1, f2)())
