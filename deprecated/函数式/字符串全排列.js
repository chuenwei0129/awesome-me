// 字符串全排列
// 描述行为

const remove = (set, char) => {
  const newSet = new Set([...set])
  newSet.delete(char)
  return newSet
}

const permutation = str => {
  const R = set => {
    if (set.size === 1) {
      return [set.values().next().value]
    }
    return [...set].flatMap(char => R(remove(set, char)).map(item => char + item))
  }

  return R(new Set([...str]))
}

console.log(permutation(`abc`))
