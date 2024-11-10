const numbers = function* () {
  let i = 1
  while (true) {
    yield i++
  }
}

const Lazy = (iterator) => {
  const next = iterator.next.bind(iterator)

  const map = (f) => {
    const modifiedNext = () => {
      const item = next()
      const mappedValue = f(item.value)
      return {
        value: mappedValue,
        done: item.done,
      }
    }
    const newIterator = { ...iterator, next: modifiedNext }
    return Lazy(newIterator)
  }

  const filter = (predicate) => {
    const modifiedNext = () => {
      while (true) {
        const item = next()
        if (predicate(item.value)) {
          return item
        }
      }
    }
    const newIter = { ...iterator, next: modifiedNext }
    return Lazy(newIter)
  }

  const takeWhile = (predicate) => {
    const result = []
    let value = next().value
    while (predicate(value)) {
      result.push(value)
      value = next().value
    }
    return result
  }

  return Object.freeze({
    map,
    filter,
    takeWhile,
    next,
  })
}

console.log(
  '惰性求值:',
  Lazy(numbers())
    .map((x) => x ** 2)
    .filter((x) => x % 2 === 1)
    .takeWhile((x) => x < 10000)
    .reduce((x, y) => x + y)
)
