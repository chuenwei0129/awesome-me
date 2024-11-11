// 处理异常，异步返回值是否为空
class Ap {
  constructor(value) {
    this.value = value
  }

  // Ap T 可能是 functor
  static of(value) {
    return new Ap(value)
  }

  ap(functor) {
    return Ap.of(this.value(functor.value))
  }
}

const A = Ap.of(x => x + 1)
const B = Ap.of(2)

// 值传给函数，函数
console.log(A.ap(B))
