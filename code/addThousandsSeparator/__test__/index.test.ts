import addThousandsSeparator from '..'

describe('addThousandsSeparator', () => {
  test('should add thousands separators to an integer number', () => {
    expect(addThousandsSeparator(1234567)).toBe('1,234,567')
  })

  test('should add thousands separators to a string number', () => {
    expect(addThousandsSeparator('1234567')).toBe('1,234,567')
  })

  test('should handle numbers less than 1000 correctly', () => {
    expect(addThousandsSeparator(123)).toBe('123')
  })

  test('should handle negative numbers', () => {
    expect(addThousandsSeparator(-1234567)).toBe('-1,234,567')
  })

  test('should handle decimal numbers', () => {
    expect(addThousandsSeparator(1234567.89)).toBe('1,234,567.89')
  })

  test('should handle negative decimal numbers', () => {
    expect(addThousandsSeparator(-1234567.89)).toBe('-1,234,567.89')
  })

  // 添加一个新的测试用例以确保小数点后的数字不被错误添加千位分隔符
  test('should not add separator for decimal digits', () => {
    expect(addThousandsSeparator(1234.56789)).toBe('1,234.56789')
  })
})
