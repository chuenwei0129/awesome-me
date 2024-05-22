const arrLike = {
  1: 'b',
  2: 'c',
  length: 3,
}

console.log(Array.from(arrLike)) // [ undefined, 'b', 'c' ]

arrLike[Symbol.iterator] = function () {
  let nextIndex = 0
  return {
    next: () => {
      return nextIndex < this.length
        ? { value: this[nextIndex++], done: false }
        : { value: undefined, done: true }
    },
    return: () => {
      console.log('return called')
      // TypeError: Iterator result undefined is not an object
      return { value: undefined, done: true }
    },
  }
}

const it = arrLike[Symbol.iterator]()

// 普通调用
console.log(it.next()) // { value: undefined, done: false }
console.log(it.next()) // { value: 'b', done: false }
console.log(it.next()) // { value: 'c', done: false }
console.log(it.next()) // { value: undefined, done: true }
console.log(it.next()) // { value: undefined, done: true }

for (const i of arrLike) {
  if (i === undefined) {
    // break 和 error 都会触发 return
    // throw new Error('it is undefined')
    break
  }
}

// gen
const myIterable = {
  [Symbol.iterator]: function* () {
    yield 1
    yield 2
    yield 3
  },
}

for (const i of myIterable) {
  console.log(i) // 1 2 3
}

// 或者采用下面的简洁写法
let it1 = {
  *[Symbol.iterator]() {
    yield 'hello'
    yield 'world'
    return 'end'
  },
}

console.log([...it1]) // [ 'hello', 'world' ]
