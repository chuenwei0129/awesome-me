// 模拟数组删除元素
const removeArrayItem = (array: number[], item: number) => {
  const len = array.length
  // fast 指向新数组需要的元素
  // slow 指向新数组下标值
  let [fast, slow] = [0, 0]

  while (fast < len) {
    // if (nums[fast] !== val) {
    //   nums[slow] = nums[fast]
    //   fast++
    //   slow++
    // } else {
    //   fast++
    // }
    // 简化后
    if (array[fast] !== item) {
      array[slow++] = array[fast]
    }
    fast++
  }

  // 更新新数组长度
  array.length = slow

  // 或者依次清理原数组剩余的空间
  // for (let i = 0; i < len - slow; i++) {
  //   array.pop()
  // }

  return slow
}
