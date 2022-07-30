const removeElement = (nums: number[], val: number) => {
  const len = nums.length
  // fast 指向新数组需要的元素
  let fast = 0
  // slow 新数组下标值
  let slow = 0

  while (fast < len) {
    // if (nums[fast] !== val) {
    //   nums[slow] = nums[fast]
    //   fast++
    //   slow++
    // } else {
    //   fast++
    // }
    // 简化后
    if (nums[fast] !== val) {
      nums[slow++] = nums[fast]
    }
    fast++
  }

  // 更新新数组长度
  nums.length = slow

  // 或者依次清理原数组剩余的空间
  // for (let i = 0; i < len - slow; i++) {
  //   nums.pop()
  // }

  return slow
}

const nums = [1, 2, 3, 4, 3]

console.log(removeElement(nums, 3), nums)
