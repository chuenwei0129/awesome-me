const fib = n => {
  console.count('未缓存进入次数');
  return n === 0 || n === 1 ? 1 : fib(n - 1) + fib(n - 2)
}

// 缓存
// {
//   '0': fib(0),
//   '1': fib(1),
//   ...
// }

// 递归缓存计算过的值

const cache = {}
const _fib = n => {
  console.count('缓存进入次数');
  // 命中缓存就返回缓存值
  if (n in cache) {
    return cache[n]
  }
  // 不在缓存內就要计算，并且写入缓存
  let ret = n === 0 || n === 1 ? 1 : _fib(n - 1) + _fib(n - 2)
  cache[n] = ret
  return ret
}

console.time('未缓存')
console.log(fib(10))
console.timeEnd('未缓存')

console.time('缓存')
console.log(_fib(10));
console.timeEnd('缓存')
