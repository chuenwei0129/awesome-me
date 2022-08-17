const deepCompare = (x, y) => {
  // 引用地址比较
  if (typeof x !== 'object' || x === null || y === null || typeof y !== 'object')
    return Object.is(x, y)
  // 非引用地址比较
  const [keysX, keysY] = [Object.getOwnPropertyDescriptors(x), Object.getOwnPropertyDescriptors(y)]
  if (Object.keys(keysX).length !== Object.keys(keysY).length) {
    return false
  }
  return Object.keys(keysX).every(key => deepCompare(x[key], y[key]))
}

console.log(deepCompare(NaN, NaN)) // true
