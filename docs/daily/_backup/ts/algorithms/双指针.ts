// 分析：已排序含负数数组平方后 [-7, -2, 1] => [49, 4, 1]，最大值必然在左边或者右边

function sortedSquares(nums: number[]) {
  nums.sort((a, b) => a - b)
  const numsMapper = nums.map(num => num * num)

  let L = 0
  let R = numsMapper.length - 1
  const result: number[] = []

  while (L <= R) {
    if (numsMapper[L] > numsMapper[R]) {
      result.push(numsMapper[L])
      L++
    } else {
      result.push(numsMapper[R])
      R--
    }
  }

  return result.reverse()
}
