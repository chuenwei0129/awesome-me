const reverse = arr => {
  // 逗号运算符 return acc
  // 扩展运算符 速度慢
  return arr.reduceRight((acc, cur) => (acc.push(cur), acc), [])
}

const list = [...new Array(1000).keys()]

console.time('reduceRight')
console.log(reverse(list))
console.timeEnd('reduceRight')

console.time('reverse')
console.log(list.reverse())
console.timeEnd('reverse')
