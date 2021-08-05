class PointContainer {
  private constructor(public value: any) {
    this.value = value
  }

  static of(value: any) {
    return new PointContainer(value)
  }
}

class Functor<T> {
  private constructor(public value: T) {
    this.value = value
  }

  static of<T>(value: T) {
    return new Functor<T>(value)
  }

  map<Q = T>(mapF: (value: T) => Q) {
    // f(val) -> g(val) -> h(val)
    // fn 处理值的函数 x -> x + 1 映射
    // fn 映射值的函数 mapF
    return new Functor<Q>(mapF(this.value))
  }
}
// map 不会改变元数据，不可变数据
const functor = Functor.of(1)
const newFunctor = functor
  .map(x => x + 1)
  .map(x => x * 2)
  .map(x => `value值为：${x}`)

console.log(newFunctor)

// 处理 null
class Maybe<T> {
  private constructor(public value: T) {
    this.value = value
  }

  static of<T>(value: T) {
    return new Maybe<T>(value)
  }

  map<Q = T>(mapF: (value: T) => Q) {
    // 返回 this 返回实力本身 映射失败
    return this.value ? new Maybe<Q>(mapF(this.value)) : this
  }
}

const mb = Maybe.of(null)

// Cannot read property 'toString' of null
console.log(mb.map(x => x.toString()))

// Either
// 处理默认值的菡子

class Either<T> {
  private constructor(public left: T, public right: T) {
    this.left = left
    this.right = right
  }

  static of<T>(left: T, right: T) {
    return new Either<T>(left, right)
  }

  get value() {
    return this.right || this.left
  }

  map<Q = T>(mapF: (value: T) => Q) {
    // 返回 this 返回实力本身 映射失败
    return this.right
      ? Either.of<Q>(this.left as null, mapF(this.right))
      : Either.of<Q>(mapF(this.left), this.right as null)
  }
}

let ret = {
  name: 'chu',
  gender: '女'
}

// 默认值写在左边
const either = Either.of('男', ret.gender)
console.log(either.value)
