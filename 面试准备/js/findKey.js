function findValueByKey(obj, key) {
  if (obj === null || typeof obj !== 'object') {
    return undefined
  }

  if (key in obj) {
    return obj[key]
  }

  for (const k of Object.keys(obj)) {
    const result = findValueByKey(obj[k], key)
    if (result !== undefined) {
      return result
    }
  }

  return undefined
}

// 示例用法
const testObj = {
  a: 1,
  b: {
    c: 2,
    d: {
      e: 3,
      f: {
        g: 4,
      },
    },
  },
}

console.log(findValueByKey(testObj, 'g')) // 4
console.log(findValueByKey(testObj, 'z')) // undefined
