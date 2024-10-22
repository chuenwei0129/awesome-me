const test = {
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
};

const isObject = (obj) => typeof obj === 'object' && obj !== null;

// 检查 key 是否直接存在于 obj 的顶层键中。如果是，直接返回该键对应的值。
function getValueByKey(obj, key) {
  if (!isObject(obj)) {
    return undefined;
  }

  if (key in obj) {
    return obj[key];
  }

  // 如果顶层没有找到 key，函数会遍历对象的每个键，并递归调用 getValueByKey 来在子对象中查找 key。
  for (const k of Object.keys(obj)) {
    const result = getValueByKey(obj[k], key);
    if (result !== undefined) {
      return result;
    }
  }

  // 如果遍历了所有的键仍未找到 key，返回 undefined
  return undefined;
}

console.log(getValueByKey(test, 'a'));
console.log(getValueByKey(test, 'f'));
