/**
 * 浅比较两个值是否相等
 * 该函数首先使用 Object.is() 检查两个值是否完全相同（处理 NaN/+0/-0 等特殊情况）
 * 然后检查两个值是否都是对象，如果不是对象则直接返回 false
 * 如果都是对象，则比较它们的键数量和每个键对应的值（但不递归比较嵌套对象）
 *
 * @param a - 要比较的第一个值
 * @param b - 要比较的第二个值
 * @returns {boolean} - 如果两个值浅比较相等则返回 true，否则返回 false
 */

function shallowEqual(a: unknown, b: unknown): boolean {
  // SameValue：处理 NaN / +0 -0
  if (Object.is(a, b)) {
    return true;
  }

  // 非对象（含 null）直接 false
  if (
    typeof a !== 'object' ||
    a === null ||
    typeof b !== 'object' ||
    b === null
  ) {
    return false;
  }

  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);

  if (aKeys.length !== bKeys.length) {
    return false;
  }

  for (let i = 0; i < aKeys.length; i++) {
    const key = aKeys[i];

    // own property 校验
    if (!Object.prototype.hasOwnProperty.call(b, key)) {
      return false;
    }

    // SameValue 比较 value
    if (
      !Object.is(
        (a as Record<string, unknown>)[key],
        (b as Record<string, unknown>)[key],
      )
    ) {
      return false;
    }
  }

  return true;
}

export default shallowEqual;
