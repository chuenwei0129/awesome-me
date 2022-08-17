// 所有子集
function* subsets(S: unknown[]) {
  // ob111 === 8 === 2 ^ S.length
  // 因为一共有 0b111 次决策，所以循环 0b111 次来取对应决策的数据
  for (let i = 0; i < 1 << S.length; i++) {
    let r: unknown[] = []
    // k === 0 | 1 | 2
    // 循环判断 0 1 2 位置是否含 1 取数据，含 1 就取出来
    for (let k = 0; k < S.length; k++) {
      const take = i & (1 << k)
      take && r.push(S[k])
    }
    // 把每次决策对应的数据返回
    yield r
  }
}

const S = [1, 2, 3]
console.log([...subsets(S)])

const T = ['a', 'b', 'c']
console.log([...subsets(T)])
