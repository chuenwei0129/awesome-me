import typeChecks from '../typeChecks'

const { isObject } = typeChecks

const isPlainObject = (obj: any) => {
  if (!isObject(obj)) {
    return false
  }

  let proto = obj
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto)
  }

  return Object.getPrototypeOf(obj) === proto
}

export default isPlainObject
