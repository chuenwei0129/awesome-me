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

// 注意事项是否 'function'
// reduce 累加器 传递的是参数
function composeReduce(mids) {
  return (...args) => {
    return mids.reduceRight((prev, curr) => {
      console.log(prev, curr)
      // 第一个函数要特殊处理
      return typeof prev === 'function' ? curr(prev(...args)) : curr(prev)
    })
  }
}

console.log(
  composeReduce([minus])(2, 1) // 8
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
// 	let len = fns.length
// 	let res = null
// 	return function fn(...arg) {
// 			res = fns[len - 1].apply(null, arg) // 每次函数运行的结果
// 			if(len > 1) {
// 					len --
// 					return fn.call(null, res) // 将结果递归传给下一个函数
// 			} else {
// 					return res //返回结果
// 			}
// 	}
// }
