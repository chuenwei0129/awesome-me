import cond from '..'

describe('cond function', () => {
  const getAccessLevel = cond<string, string>([
    [(role) => role === 'admin', () => 'full access'],
    [(role) => role === 'editor', () => 'partial access'],
    [(role) => role === 'visitor', () => 'read-only access'],
    [() => true, () => 'no access'], // 默认情况
  ])

  test('returns full access for admin', () => {
    expect(getAccessLevel('admin')).toBe('full access')
  })

  test('returns partial access for editor', () => {
    expect(getAccessLevel('editor')).toBe('partial access')
  })

  test('returns read-only access for visitor', () => {
    expect(getAccessLevel('visitor')).toBe('read-only access')
  })

  test('returns no access for unknown role', () => {
    expect(getAccessLevel('unknown')).toBe('no access')
  })

  test('returns undefined when no conditions are provided', () => {
    const alwaysUndefined = cond<string, string>([])
    expect(alwaysUndefined('any role')).toBeUndefined()
  })

  test('stops evaluating after the first match', () => {
    // 这个测试用例确保函数在找到第一个匹配项后停止计算
    const mockTransformer1 = jest.fn(() => 'first match')
    const mockTransformer2 = jest.fn(() => 'second match')

    const testCond = cond<string, string>([
      [() => true, mockTransformer1],
      [() => true, mockTransformer2], // 即使这个条件也为真，但不应该被调用
    ])

    expect(testCond('anything')).toBe('first match')
    expect(mockTransformer1).toHaveBeenCalled()
    expect(mockTransformer2).not.toHaveBeenCalled()
  })
})
