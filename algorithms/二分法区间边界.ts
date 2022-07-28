// 循环不变量
// 区间
// 二分查找 mid 值溢出问题

// 左闭右闭
// function search(nums: number[], target: number) {
//   nums.sort((a, b) => a - b)
//   let L = 0
//   let R = nums.length - 1

//   if (target > nums[R] || target < nums[L]) {
//     return -1
//   }

//   while (L <= R) {
//     // 最大安全整数
//     // Math.floor 不影响区间划分
//     let M = Math.floor(L + (R - L) / 2)
//     if (target === nums[M]) {
//       return M
//     } else if (target < nums[M]) {
//       R = M - 1
//     } else if (target > nums[M]) {
//       L = M + 1
//     }
//   }

//   return -1
// }

// 左闭右开
const search = (nums: number[], target: number) => {
  nums.sort((a, b) => a - b)
  let L = 0
  let R = nums.length
  let M: number

  if (target > nums[R] || target < nums[L]) {
    return -1
  }

  while (L < R) {
    M = Math.floor(L + (R - L) / 2)
    if (target === nums[M]) {
      return M
    } else if (target < nums[M]) {
      R = M
    } else if (target > nums[M]) {
      L = M + 1
    }
  }

  return -1
}

console.log(search([-1, 0, 3, 5, 9, 12], 0))
