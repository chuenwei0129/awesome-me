import isPlainObject from '..'

describe('isPlainObject', () => {
  it('should return true for a plain object', () => {
    const obj = { a: 1 }
    expect(isPlainObject(obj)).toBe(true)
  })

  it('should return false for a non-object', () => {
    const values = [123, 'abc', true, null, undefined, [], () => {}]
    values.forEach((value) => {
      expect(isPlainObject(value)).toBe(false)
    })
  })

  it('should return false for an object created with a constructor', () => {
    class MyClass {}
    const instance = new MyClass()
    expect(isPlainObject(instance)).toBe(false)
  })

  it('should return false for an object with a prototype property', () => {
    const obj = Object.create({ prototype: 'value' })
    expect(isPlainObject(obj)).toBe(false)
  })
})
