// 题目：https://leetcode.cn/problems/3sum/
// 分析：
// 如果 nums[i] + nums[L] + nums[R] > 0, 说明三数之和大于 0，R 向左移一位使三数之和变小
// 如果 nums[i] + nums[L] + nums[R] < 0, 说明三数之和小于 0，L 向右移一位使三数之和变大
// 如果 nums[i] + nums[L] + nums[R] = 0, 说明三数之和等于 0，R，L 都位移求下一个二元组
// 优化：最左侧最小数大于 0，即不可能存在三数之和等于 0
// 去重：三元组内部元素可以重复，三元组不能重复，nums[i] === nums[i+1]是内部元素去重 [-1, -1, 0, 1]
// [0, -1, -1, 1, 1] 左右指针需要跳过相同的值，循环更新 L R
// 跳过相同的值，三数可以两个数决定另一个数

function threeSum(nums: number[]) {
  const result: number[][] = []

  if (nums.length < 3) return result

  nums.sort((a, b) => a - b)

  const len = nums.length - 2

  for (let i = 0; i < len; i++) {
    // 剪枝
    if (nums[i] > 0) break // 最左侧最小数大于 0，直接 return

    // [0, 1][-1] === undefined
    // nums[i] => 当前遍历的 a，nums[i-1] => 前一个已经算过的 a
    if (nums[i] === nums[i - 1]) continue // 去重

    let L = i + 1
    let R = nums.length - 1

    while (L < R) {
      let sum = nums[i] + nums[L] + nums[R]
      if (sum > 0) {
        R--
      } else if (sum < 0) {
        L++
      } else {
        // 排过序不用担心顺序问题
        result.push([nums[i], nums[L], nums[R]])
        // 去重，循环跳过相同的 L，R
        while (L < R && nums[L] === nums[L + 1]) L++
        while (L < R && nums[R] === nums[R - 1]) R--
        // 其它不重复的二元组合
        L++
        R--
      }
    }
  }

  return result
}
