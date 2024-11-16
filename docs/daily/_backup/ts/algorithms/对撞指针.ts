// 题目：https://leetcode.cn/problems/boats-to-save-people/
// 分析：求最少的船，那么一船坐满最符合条件，先排序，最重的与最轻的一起匹配，如果不满足 limit 最重的就需要自己一船，指针向左一格，如果满足左右指针都移动，边界条件 = ，左右指针相等时，对应的值也许要一船，所以多一次循环
const numRescueBoats = (people: number[], limit: number): number => {
  people.sort((a, b) => a - b)

  let left = 0
  let right = people.length - 1
  // 船数
  let count = 0

  while (left <= right) {
    // if (people[left] + people[right] > limit) {
    //   right--
    //   count++
    // } else {
    //   left++
    //   right--
    //   count++
    // }
    // 简化后
    if (people[left] + people[right] <= limit) {
      left++
    }
    right--
    count++
  }

  return count
}
