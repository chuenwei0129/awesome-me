console.log(2 << 1) // 4
console.log(2 >> 1) // 1
console.log(2 >>> 1) //1

console.log(-2 >> 2) //-1
console.log(-2 >>> 2) //-1

console.log(3 << 4 === 3 * 2 ** 4)

const data = [1, 2, 3]

const _data = data.reduce(
  (acc, cur) => {
    return [...acc, ...acc.map(set => [...set, cur])]
  },
  [[]]
)

console.dir(_data, { depth: 10 })

const curry = f => {
  // args 收集所有的参数
  const R = (...args) =>
    args.length >= f.length ? f(...args) : (...moreArgs) => R(...args, ...moreArgs)
  return R
}

const add = (x, y) => x + y

const curriedAdd = curry(add)

console.log(
  curriedAdd(1, 2), // 3
  curriedAdd(1), // (y) => 1 + y
  curriedAdd(1)(2) // 3
)

const sort = arr => {
  return arr.sort()
}

console.log(sort([2, 1]))
console.log(sort(sort([2, 1])))
console.log(sort(sort(sort([2, 1]))))

console.log(Array.of('cat,dog', 'fish,bird').map(s => s.split(',')))
