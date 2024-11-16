// 菡子的值也可以是菡子
// 避免嵌套，单子
// 类似 [1, 2, 3].flatMap(x => [x + 1])

class Monad<T> {
  private constructor(public value: T) {
    this.value = value
  }

  static of<U>(value: U) {
    return new Monad(value)
  }

  map<R>(mapF: (value: T) => R) {
    return new Monad(mapF(this.value))
  }

  join() {
    return this.value
  }

  // 一层
  flatMap<R>(mapF: (value: T) => R) {
    // 1. 处理边界
    // 2. 添加 join()
    // 3. depth?: number
    return this.map<R>(mapF).join()
  }
}

const m1 = Monad.of(1)

console.log(m1.flatMap(x => Monad.of(`${x}`)))
