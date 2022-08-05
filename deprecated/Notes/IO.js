const compose = (...fns) => {
  return (...args) => {
    return fns.reduceRight((acc, cur) => {
      // acc 循环结束时不是函数，是最左边函数的输入参数
      return typeof acc === 'function' ? cur(acc(...args)) : cur(acc)
    })
  }
}

// point free
// const write = console.log
// const _write = (...args: any[]) => console.log(...args)

const store = {
  getItem(key) {
    if (key === `data`) {
      return JSON.stringify({ code: 0, userId: `1` })
    }
    if (key === `1`) {
      return JSON.stringify({ id: 1, name: `chu`, age: 18 })
    }
  }
}

// 过程式编程
// const fetchUser = () => {
//   const { userId } = JSON.parse(store.getItem('data')) // 依赖 data 不可靠
//   const user = JSON.parse(store.getItem(userId))
//   console.log(user) // callback 输出 user， 也可能不输出
// }

// IO 菡子, 推迟执行 thunk
// 函数式编程思维,把纯的逻辑收集封闭起来,然后把不纯的副作用操作交给用户处理
class IO {
  constructor(value) {
    this.value = value
  }

  static of(value) {
    return new IO(value)
  }

  map(mapF) {
    // this.value 函数的输出是 mapF 的输入
    // compose把 this. value 和 mapF 组合成一个新的函数
    // IO 菡子的值就是一个函数，函数是纯的，这就实现了对副作用的管理和隔离
    return IO.of(compose(mapF, this.value))
  }

  flatMap(mapF) {
    // 最后拿到 value，区别是 value
    // x.value 是延迟函数 执行后是 菡子
    // 等同于 菡子包着菡子所以需要执行一层
    return IO.of(compose(x => x.value(), mapF, this.value))
  }

  start(callback) {
    return callback(this.value())
  }
}

//O函子通过推退执行的方式来实现对副作用的管理和隔离
//函数本身是纯的,但是函数IO执行是不纯的

// 把 IO 操作作为函数 thunk 起来 如 56 行
// const readStoreByKey = key => store.getItem(key)
const readStoreByKey = key => IO.of(() => store.getItem(key))
// 最终执行回调
const callback = console.log

readStoreByKey('data')
  .map(JSON.parse)
  .map(x => x.userId)
  .flatMap(readStoreByKey)
  .map(JSON.parse)
  .start(callback)

//函数本身是纯的,但是函数IO执行是不纯的
