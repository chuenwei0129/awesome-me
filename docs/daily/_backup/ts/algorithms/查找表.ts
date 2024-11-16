// 1.遍历序列，将每一个元素，放入查找表中，记录信息。
// 2.遍历序列，对于每一个元素，在查找表中找到你需要的元素。

const twoSum = (nums: number[], target: number) => {
  const table = new Map(nums.map((num, index) => [num, index]))
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i]
    // map.has() 类型无法收窄
    if (table.has(complement)) {
      const j = table.get(complement) as number
      if (j !== i) {
        return [i, j]
      }
    }
  }
}

// 350. 两个数组的交集 II
const intersect = (nums1: number[], nums2: number[]): number[] => {
  // 优化思路: 短数组的建表，长数组遍历
  if (nums1.length > nums2.length) {
    return intersect(nums2, nums1)
  }

  const result: number[] = []
  const table = new Map<number, number>()

  // 建表
  for (const num of nums1) {
    if (table.has(num)) {
      table.set(num, (table.get(num) as number) + 1)
    } else {
      table.set(num, 1)
    }
  }

  // 查表
  for (const num of nums2) {
    if (table.has(num)) {
      result.push(num)

      // 处理表
      table.set(num, (table.get(num) as number) - 1)
      if ((table.get(num) as number) === 0) {
        table.delete(num)
      }
    }
  }

  return result
}

const nums1 = [1, 2, 2, 1]
const nums2 = [2, 2]
console.log(intersect(nums1, nums2))
