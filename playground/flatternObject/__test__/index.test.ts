import flattenObject from '..'

// 定义测试套件
describe('flattenObject', () => {
  // 定义测试用例
  it('should flatten nested objects', () => {
    // 定义输入对象
    const input = {
      level1: {
        level2: {
          level3: 'value',
        },
      },
    }

    // 执行函数
    const result = flattenObject(input)

    // 定义期望的结果
    const expectedResult = {
      'level1.level2.level3': 'value',
    }

    // 断言结果是否符合期望
    expect(result).toEqual(expectedResult)
  })

  // 可以继续添加其他测试用例...
})
