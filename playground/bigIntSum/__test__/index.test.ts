import bigIntSum from '..'

describe('bigIntSum', () => {
  test('should correctly add two big integers', () => {
    expect(bigIntSum('12345678901234567890', '98765432109876543210')).toBe(
      '111111111011111111100',
    )
    expect(bigIntSum('99999999999999999999', '1')).toBe('100000000000000000000')
    expect(bigIntSum('1234567890', '9876543210')).toBe('11111111100')
    expect(bigIntSum('0', '0')).toBe('0')
  })

  test('should handle different length big integers', () => {
    expect(bigIntSum('1234567890', '12345678901234567890')).toBe(
      '12345678902469135780',
    )
    expect(bigIntSum('12345678901234567890', '1234567890')).toBe(
      '12345678902469135780',
    )
  })
})
