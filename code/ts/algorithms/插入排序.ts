// 实现逻辑
// ① 从第一个元素开始，该元素可以认为已经被排序
// ② 取出下一个元素，在已经排序的元素序列中从后向前扫描
// ③ 如果该元素（已排序）大于新元素，将该元素移到下一位置
// ④ 重复步骤 ③，直到找到已排序的元素小于或者等于新元素的位置
// ⑤ 将新元素插入到该位置后
// ⑥ 重复步骤 ②~⑤

// 类似于打牌

// 插入排序
const insertSort = (nums: number[]): number[] => {
  if (nums.length <= 1) return nums
  for (let i = 1; i < nums.length; i++) {
    let nextNeedSortVal = nums[i]
    // 已排序数组长度 i
    let sortedLen = i
    while (sortedLen >= 1 && nextNeedSortVal < nums[sortedLen - 1]) {
      nums[sortedLen] = nums[sortedLen - 1]
      sortedLen--
    }
    nums[sortedLen] = nextNeedSortVal
  }
  return nums
}

console.log(insertSort([1, 4, 2, 1, 9, 5, 8]))
