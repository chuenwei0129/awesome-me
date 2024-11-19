export function shallowEqual(obj1: Record<string, any>, obj2: Record<string, any>): boolean {
  // 如果两个对象的引用相同，直接返回true
  if (obj1 === obj2) return true;

  // 取得两个对象的属性名数组
  const obj1Keys = Object.keys(obj1);
  const obj2Keys = Object.keys(obj2);

  // 比较属性数量是否一致
  if (obj1Keys.length !== obj2Keys.length) return false;

  // 使用for...of循环来比较属性值
  for (const key of obj1Keys) {
    // 浅比较属性值，若两个对象在某个属性上的值不相等，直接返回false
    if (obj1[key] !== obj2[key]) return false;
  }

  // 若所有属性的值都相等，返回true
  return true;
}

// 测试示例
// const objA = { a: 1, b: 2 };
// const objB = { a: 1, b: 2 };
// const objC = { a: 1, b: 3 };

// console.log(shallowEqual(objA, objB)); // true
// console.log(shallowEqual(objA, objC)); // false
