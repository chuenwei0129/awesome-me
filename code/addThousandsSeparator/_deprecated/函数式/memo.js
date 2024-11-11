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

sum(1, 2)
sum(1, 2)
sum(1, 2)

memoizedSum(1, 2)
memoizedSum(1, 2)
memoizedSum(1, 2)
