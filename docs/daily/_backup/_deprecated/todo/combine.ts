// 组合
const combine = (S: number[], k: number): number[][] => {
  if (k === 0 || S.length === k) return [S.slice(0, k)]
  let [first, ...rest] = S
  return [...combine(rest, k - 1).map(others => [first, ...others]), ...combine(rest, k)]
}

console.log(combine([1, 2, 3], 2))
