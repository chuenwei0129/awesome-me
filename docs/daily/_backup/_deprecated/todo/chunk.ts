const q = [1, 2, 3, 4, 5]

const chunk = (arr: unknown[], size: number) => {
  if (size >= arr.length || size <= 0) return arr
  return arr.reduce<unknown[][]>(
    (acc, curr) => (
      // 初始 [[]] 内 [] 装满 size, 就添加新 []
      acc[acc.length - 1].length < size ? acc[acc.length - 1].push(curr) : acc.push([curr]), acc
    ),
    [[]]
  )
}

console.log(
  chunk(q, 4) // [ [ 1, 2, 3, 4 ], [ 5 ] ]
)
