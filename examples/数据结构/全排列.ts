// 字符串全排列

function permutation(str: string) {
  function R(set: Set<string>): string[] {
    if (set.size === 1) {
      return [set.values().next().value]
    }

    [...set].map(c => R(remove(set, c)))
  }

  return R(new Set([...str]))
}
