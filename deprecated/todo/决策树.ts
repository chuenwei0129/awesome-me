// 给定一个不重复的正整数集合，从中取N个数字，使得他们的和为M，写一个函数，求这个N个数字。如有多个， 只需要返回一个。

// SumN([1,3,8,5,2]，2, 11 // [3,8]
// SumN( [1,3,8,5,2]，4, 11 // null

// 1 3 8 5 2
//   0
// 0
//   1
//   0
// 1
//   1
const sumN = (
  S: number[],
  N: number,
  M: number,
  i: number = 0,
  decisions: number[] = []
): number[] | null => {
  if (M === 0) {
    return decisions
  }
  // N === 0 代表没数字可取了
  // i 指针，指代做决策的那个数
  // i === 5 时，数组决策做完，走到第 5 步说明找不到
  if (i === S.length || N === 0) {
    return null
  }
  // 开始递归，两种决策
  // 取或不取，左取右不取
  return sumN(S, N - 1, M - S[i], i + 1, decisions.concat(S[i])) || sumN(S, N, M, i + 1, decisions)
}

console.log(sumN([1, 3, 5, 8, 2], 2, 11))
