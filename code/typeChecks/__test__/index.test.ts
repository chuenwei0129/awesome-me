import typeChecks from '..'

const {
  isObject,
  isFunction,
  isNumber,
  isUndefined,
  isString,
  isBoolean,
  isArray,
} = typeChecks

describe('Type Checking Functions', () => {
  describe('isObject', () => {
    test('should return true for an object', () => {
      const result = isObject({ a: 1 })
      expect(result).toBe(true)
    })

    test('should return false for a non-object', () => {
      const result = isObject(123)
      expect(result).toBe(false)
    })

    test('should return false for null', () => {
      const result = isObject(null)
      expect(result).toBe(false)
    })
  })

  describe('isFunction', () => {
    test('should return true for a function', () => {
      const result = isFunction(() => {})
      expect(result).toBe(true)
    })

    test('should return false for a non-function', () => {
      const result = isFunction(123)
      expect(result).toBe(false)
    })
  })

  describe('isString', () => {
    test('should return true for a string', () => {
      const result = isString('test')
      expect(result).toBe(true)
    })

    test('should return false for a non-string', () => {
      const result = isString(123)
      expect(result).toBe(false)
    })
  })

  describe('isBoolean', () => {
    test('should return true for a boolean', () => {
      const result = isBoolean(true)
      expect(result).toBe(true)
    })

    test('should return false for a non-boolean', () => {
      const result = isBoolean(123)
      expect(result).toBe(false)
    })
  })

  describe('isNumber', () => {
    test('should return true for a number', () => {
      const result = isNumber(123)
      expect(result).toBe(true)
    })

    test('should return true for a float', () => {
      const result = isNumber(123.45)
      expect(result).toBe(true)
    })

    test('should return false for a non-number', () => {
      const result = isNumber('123')
      expect(result).toBe(false)
    })
  })

  describe('isUndefined', () => {
    test('should return true for undefined', () => {
      const result = isUndefined(undefined)
      expect(result).toBe(true)
    })

    test('should return false for a defined value', () => {
      const result = isUndefined(null)
      expect(result).toBe(false)
    })
  })

  describe('isArray', () => {
    test('should return true for an array', () => {
      const result = isArray([1, 2, 3])
      expect(result).toBe(true)
    })

    test('should return false for a non-array value', () => {
      const result = isArray(123)
      expect(result).toBe(false)
    })
  })
})
