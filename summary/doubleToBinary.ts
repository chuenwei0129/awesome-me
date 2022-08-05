// 20.5
// 转换
// 10100.1
// 科学计数法
// 1.01001 * 2^4
// 1023 + 4 = 1027
// 10000000011
// 低位补零 52 位
// 0-10000000011-0100100000000000000000000000000000000000000000000000

// 1
// 1 * 2^0

// 0.1
// 1.10011...* 2^-4

// 2 ** 53 - 1
// 9007199254740991
// 53 个 1
// 11111111111111111111111111111111111111111111111111111
// 1.1111111111111111111111111111111111111111111111111111 * 2^52
// 1023 + 52 = 1075
// 10000110011
// 52 位 不需要补零
// 0-10000110011-11111111111111111111111111111111111111111111111111111

// 十进制数转浮点数
// 不考虑输入输出，只考虑思路
const doubleToBinary = (double: number) => {
  // 将浮点数转换为带符号的二进制
  let signBinary = double.toString(2)
  let noSignBinary: string
  let sign: '1' | '0'
  let fraction: string
  let noBiasedExponent: number

  if (signBinary[0].includes('-')) {
    noSignBinary = signBinary.slice(1)
    sign = '1'
  } else {
    noSignBinary = signBinary
    sign = '0'
  }
  // 获取指数位，尾数位
  if (noSignBinary.split('.')[0] === '0') {
    // 处理（0-1）
    noBiasedExponent = 1 - [...noSignBinary].indexOf('1')
    fraction = noSignBinary
      .slice([...noSignBinary].indexOf('1') + 1)
      .padEnd(52, '0')
      .slice(0, 52)
  } else {
    noBiasedExponent = noSignBinary.split('.')[0].length - 1
    fraction = noSignBinary.replace('.', '').slice(1).padEnd(52, '0').slice(0, 52)
  }

  let biasedExponentBinary = (noBiasedExponent + 1023).toString(2).padStart(11, '0')
  return `${sign} ${biasedExponentBinary} ${fraction}`
}

// 测试大整数精度模拟
console.log(doubleToBinary(2 ** 53 - 3))
console.log(doubleToBinary(2 ** 53 - 2))
console.log(doubleToBinary(2 ** 53 - 1))
console.log(doubleToBinary(2 ** 53))
console.log(doubleToBinary(2 ** 53 + 1))
console.log(doubleToBinary(2 ** 53 + 2))
console.log(doubleToBinary(2 ** 53 + 3))
console.log(doubleToBinary(2 ** 53 + 4))
console.log(doubleToBinary(2 ** 53 + 5))
console.log(doubleToBinary(2 ** 53 + 6))

// 0 10000110011 1111111111111111111111111111111111111111111111111101
// 0 10000110011 1111111111111111111111111111111111111111111111111110
// 0 10000110011 1111111111111111111111111111111111111111111111111111
// 0 10000110100 0000000000000000000000000000000000000000000000000000
// 0 10000110100 0000000000000000000000000000000000000000000000000000
// 0 10000110100 0000000000000000000000000000000000000000000000000001
// 0 10000110100 0000000000000000000000000000000000000000000000000010
// 0 10000110100 0000000000000000000000000000000000000000000000000010
// 0 10000110100 0000000000000000000000000000000000000000000000000010
// 0 10000110100 0000000000000000000000000000000000000000000000000011

console.log(doubleToBinary(0.1))
console.log(doubleToBinary(0.2))
console.log(doubleToBinary(0.1 + 0.2))
console.log(doubleToBinary(0.3))

// 0 01111111011 1001100110011001100110011001100110011001100110011010
// 0 01111111100 1001100110011001100110011001100110011001100110011010
// 0 01111111101 0011001100110011001100110011001100110011001100110100
// 0 01111111101 0011001100110011001100110011001100110011001100110011

// 浮点数小数精度模拟
// 关键点 gap 会变化
const gap = 0.0000000596046
let ret = 0.5
let i = 0

while (i < 50) {
  ret = ret + gap
  console.log(ret)
  i++
}

// 0.5000000596046
// 0.5000001192092001
// 0.5000001788138001
// 0.5000002384184001
// 0.5000002980230002
// 0.5000003576276002
// 0.5000004172322002
// 0.5000004768368003
// 0.5000005364414003
// 0.5000005960460003
