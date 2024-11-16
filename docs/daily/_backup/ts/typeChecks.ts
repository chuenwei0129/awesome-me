const isObject = (value: unknown): value is Record<any, any> =>
  value !== null && typeof value === 'object'

const isFunction = (value: unknown): value is (...args: any) => any =>
  typeof value === 'function'

const isString = (value: unknown): value is string => typeof value === 'string'

const isBoolean = (value: unknown): value is boolean =>
  typeof value === 'boolean'

const isNumber = (value: unknown): value is number => typeof value === 'number'

const isUndefined = (value: unknown): value is undefined =>
  typeof value === 'undefined'

const isArray = (value: unknown): value is any[] => Array.isArray(value)

export default {
  isObject,
  isFunction,
  isString,
  isBoolean,
  isNumber,
  isUndefined,
  isArray,
}
