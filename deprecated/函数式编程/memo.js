function sum(a, b) {
  console.count(`计算次数`)
  return a + b
}

function memoize(fn) {
  const cache = new WeakMap()
  return (...args) => {
    if (!cache.has(fn)) {
      cache.set(fn, fn(...args))
    }
    return cache.get(fn)
  }
}

const memoizedSum = memoize(sum)

console.log(sum(1, 2))
console.log(sum(1, 2))
console.log(sum(1, 2))

console.log(memoizedSum(1, 2))
console.log(memoizedSum(1, 2))
console.log(memoizedSum(1, 2))
