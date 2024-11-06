/**
 * 计算两个大整数的和。
 * @param bigIntA 第一个大整数，以字符串形式传入。
 * @param bigIntB 第二个大整数，以字符串形式传入。
 * @returns 返回两个大整数相加后的结果，以字符串形式返回。
 */
function bigIntSum(bigIntA: string, bigIntB: string) {
  // 确保两个大整数的位数一致，位数不足的前面补0
  const len = Math.max(bigIntA.length, bigIntB.length)
  const A = bigIntA.padStart(len, '0')
  const B = bigIntB.padStart(len, '0')
  let carry = 0 // 进位初始化为0
  let res: number[] = [] // 结果初始化为一个空数组
  // 从最低位开始，逐位相加，并处理进位
  for (let i = len - 1; i >= 0; i--) {
    const sum = Number(A[i]) + Number(B[i]) + carry
    carry = sum > 9 ? 1 : 0 // 如果当前位相加结果大于9，则进位为1，否则为0
    res.push(sum % 10) // 将当前位的计算结果的个位数添加到结果数组中
  }
  // 如果最高位有进位，将其添加到结果数组中
  if (carry) res.push(carry)
  // 将结果数组反转并合并为一个字符串后返回
  return res.reverse().join('')
}

export default bigIntSum
