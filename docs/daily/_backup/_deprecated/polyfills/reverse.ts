const reverse = (arr: unknown[]) => {
  // 逗号运算符 === return acc
  return arr.reduceRight<unknown[]>((acc, cur) => (acc.push(cur), acc), [])
}

const list = [...Array(1000).keys()]

console.log(reverse(list))
