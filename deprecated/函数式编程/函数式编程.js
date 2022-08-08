const minus = x => x - 1
const square = x => x ** 2
const sum = (a, b) => a + b

console.log(minus(square(sum(1, 2)))) // 8

const compose1 = (f3, f2, f1) => {
  return (...args) => {
    return f3(f2(f1(...args)))
  }
}

console.log(compose1(minus, square, sum)(1, 2)) // 8

// 这种思路好理解
const compose2 = (...fns) => {
  return (...args) => {
    let ret
    let _fns = fns.reverse()
    for (let i = 0; i < _fns.length; i++) {
      if (i === 0) {
        ret = _fns[i](...args)
      } else {
        ret = _fns[i](ret)
      }
    }
    return ret
  }
}

console.log(compose2(minus, square, sum)(1, 2)) // 8

// 难理解一点
const compose3 = (...fns) => {
  return (...args) => {
    return fns.reduceRight((acc, cur) => {
      // acc 最后是收集者，是 输出，最后是 cur
      return typeof acc === 'function' ? cur(acc(...args)) : cur(acc)
    })
  }
}

console.log(compose3(minus, square, sum)(1, 2)) // 8
