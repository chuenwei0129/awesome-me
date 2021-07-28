const arr = [1, 2, 3, 4, 5]

const chunk = (arr: number[], size: number) => {
  if (size >= arr.length || size <= 0) return arr
  return arr.reduce(
    (acc, cur) => (
      acc[acc.length - 1].length < size ? acc[acc.length - 1].push(cur) : acc.push([cur]), acc
    ),
    [[]]
  )
}

console.log(
  chunk(arr, 4) // [[1, 2], [3, 4], [5]]
)
