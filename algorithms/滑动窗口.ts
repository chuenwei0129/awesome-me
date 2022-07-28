// 循环的指针应该是子数组的终止位置
// 终止位置固定了，不就相当于暴力解法倒过来吗
// 这题说了是连续最小数组，暴力法穷举了所有组合，所以多了很多不必要的计算

// 栗子： 100 [1, 1, 1, 1, 1, 100]
// target = 7, nums = [2,3,1,2,4,3] 2
const minSubArrayLen = (target: number, nums: number[]) => {
  // 第一个指针指向是子数组的终止位置
  let end = 0
  let start = 0
  let sum = 0
  let minL = 0

  while (end <= nums.length - 1) {
    sum += nums[end]
    while (sum >= target) {
      if (end - start + 1 < minL || minL === 0) {
        minL = end - start + 1
      }
      sum -= nums[start]
      start++
    }
    end++
  }

  return minL
}

console.log(minSubArrayLen(7, [2, 3, 1, 2, 4, 3]))
