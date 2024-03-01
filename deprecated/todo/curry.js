const add = (a, b, c, d) => a + b + c + d

// 原理：利用 args 闭包收集参数，收集齐了就调用原函数
const curry = (f) => {
  const R = (...args) => {
    if (args.length >= f.length) {
      return f(...args)
    }
    return (...rest) => {
      return R(...rest, ...args)
    }
  }
  return R
}

curry(add)(1, 2)(3, 4) // [ 1, 2 ] 只须收集 1 次
curry(add)(1)(2)(3, 4) // [1], [2, 1] 只须收集 2 次
curry(add)(1)(2)(3)(4) // [1], [2, 1] [ 3, 2, 1 ] 只须收集 3 次

// 简写
const $curry = (f) => {
  const R = (...args) =>
    args.length >= f.length ? f(...args) : (...rest) => R(...rest, ...args)
  return R
}

// https://zhuanlan.zhihu.com/p/120441348
const bindCurry = (f) => {
  return (...args) => {
    if (args.length < f.length) {
      return bindCurry(f.bind(null, ...args))
    } else {
      return f(...args)
    }
  }
}

console.log(bindCurry(add)(1, 2)(3, 4))
