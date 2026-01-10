/**
 * 比较两个值是否浅相等
 * 浅相等意味着如果两个对象的顶层属性都使用SameValueZero算法相等，则认为它们相等
 *
 * @param a - 要比较的第一个值
 * @param b - 要比较的第二个值
 * @returns 如果两个值浅相等则返回true，否则返回false
 */

function shallowEqual(a: unknown, b: unknown): boolean {
  // 快速路径：使用 Object.is 进行 SameValue 比较
  // 如果两个值完全相同，直接返回 true
  if (Object.is(a, b)) {
    return true;
  }

  // 只有当两个值都是非空对象时才需要进一步比较
  // 对于原始类型或 null/undefined，已经通过 Object.is 比较过，可以直接返回 false
  if (
    typeof a !== 'object' ||
    a === null ||
    typeof b !== 'object' ||
    b === null
  ) {
    return false;
  }

  // 获取两个对象自身的可枚举属性键数组
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);

  // 如果两个对象的属性数量不同，则它们不相等
  if (aKeys.length !== bKeys.length) {
    return false;
  }

  // 遍历第一个对象的所有键，检查第二个对象是否具有相同的键和值
  for (let i = 0; i < aKeys.length; i++) {
    const key = aKeys[i];

    // 检查第二个对象是否具有相同的键（包括不可枚举属性的检查）
    if (!Object.prototype.hasOwnProperty.call(b, key)) {
      return false;
    }

    // 使用 Object.is 比较两个对象对应键的值
    // Object.is 提供了更精确的相等性检查，例如区分 +0 和 -0，以及认为 NaN 等于 NaN
    if (
      !Object.is(
        (a as Record<string, unknown>)[key],
        (b as Record<string, unknown>)[key],
      )
    ) {
      return false;
    }
  }

  // 所有检查都通过，两个对象浅相等
  return true;
}

export default shallowEqual;
