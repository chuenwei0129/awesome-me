const reverse = arr => {
  // 逗号运算符 return acc
  return arr.reduceRight((acc, cur) => (acc.push(cur), acc), [])
}

const list = [...new Array(100000).keys()]

console.time('reduceRight')
console.log(reverse(list))
console.timeEnd('reduceRight')

console.time('reverse')
console.log(list.reverse())
console.timeEnd('reverse')
