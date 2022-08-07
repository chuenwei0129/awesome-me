const combination = (S: number[], k: number): number[][] => {
  if (k === 0 || S.length === k) return [S.slice(0, k)]
  let [first, ...rest] = S
  return [...combination(rest, k - 1).map(others => [first, ...others]), ...combination(rest, k)]
}

console.log(combination([1, 2, 3, 4], 4))
