// 递归
const fact = (n) => {
  if (n <= 0) return 1
  return n * fact(n - 1)
}

// 尾递归
const fact2 = (n, r) => {
  if (n <= 0) return 1 * r
  return fact(n - 1, r * n)
}

// 循环
const fact3 = (n) => {
  let r = 1
  while (n > 0) {
    r = r * n
    n--
  }
  return r
}

// 尾递归转循环
const fact4 = (_n, _r) => {
  // <== _n, _r 用作初始化变量
  var n = _n
  var r = _r // <== 将原来的 n, r 变量提出来编程迭代变量
  function _fact(_n, _r) {
    // <== 迭代函数非常简单,就是更新迭代变量而已
    n = _n
    r = _r
  }
  _fact_loop: while (true) {
    // <== 生成一个迭代循环
    if (n <= 0) {
      return r
    } else {
      _fact(n - 1, r * n)
      continue _fact_loop // <== 执行迭代函数，并且进入下一次迭代
    }
  }
}
