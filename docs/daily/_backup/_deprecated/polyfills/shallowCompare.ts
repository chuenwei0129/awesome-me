// https://www.zhihu.com/question/299783862/answer/518704408

function isPlainObject(obj: object) {
  if (typeof obj !== 'object' || obj === null) return false

  let proto = obj
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto)
  }

  return Object.getPrototypeOf(obj) === proto
}

function shallowCompare(o1: object, o2: object) {
  if (isPlainObject(o1) && isPlainObject(o2)) {
    if (Object.is(o1, o2)) {
      return true
    } else {
      if (Object.keys(o1).length === Object.keys(o2).length) {
        for (const [k, v] of Object.entries(o1)) {
          if (!o2.hasOwnProperty(k) || o2[k] !== v) {
            return false
          }
        }
        return true
      } else {
        return false
      }
    }
  } else {
    return false
  }
}
