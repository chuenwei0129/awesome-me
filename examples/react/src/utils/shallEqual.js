// 先判断 obj 本身是否满足我们熟悉的合法对象概念
// 再判断 obj 的构造函数是不是 Object

function isPlainObject(obj) {
  if (typeof obj !== 'object' || obj === null) return false

  let proto = obj
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto)
  }

  // proto === Object.prototype

  return Object.getPrototypeOf(obj) === proto
}

// return undefined
export function shallEqual(o1, o2) {
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
        // 必须等循环结束
        return true
      } else {
        return false
      }
    }
  } else {
    return false
  }
}
