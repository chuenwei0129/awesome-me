/**
 * 给数字或数字字符串添加千位分隔符。
 *
 * @param input 输入的数字或数字字符串。
 * @returns 经过千位分隔处理后的字符串。
 */

const addThousandsSeparator = (input: number | string): string => {
  // 将输入转换为字符串，并分割为整数部分和小数部分
  const parts = input.toString().split('.')
  const integerPart = parts[0]
  // 小数部分是否存在
  const decimalPart = parts.length > 1 ? '.' + parts[1] : ''

  // 正则表达式：匹配从字符串开始到末尾，每隔三位数字前的位置（不包括开头边界）
  const regex = /\B(?=(\d{3})+(?!\d))/g
  // 只对整数部分应用千位分隔符
  const formattedIntegerPart = integerPart.replace(regex, ',')

  // 重新组合整数部分和小数部分
  return formattedIntegerPart + decimalPart
}

export default addThousandsSeparator
