/**
 * 从对象中获取指定路径的值。
 * @param obj - 一个对象，可以从其中获取值。
 * @param path - 一个点分隔的字符串，表示要获取值的路径。
 * @returns 在路径指向的值，如果路径不存在则返回 undefined。
 */
function get(obj: Record<string, any>, path: string) {
  // 分割路径并递归获取值
  const paths = path.split('.')
  let result = obj
  for (let item of paths) {
    if (result.hasOwnProperty(item)) {
      result = result[item]
    } else {
      // 如果路径中的某个部分不存在于对象中，返回 undefined
      // 也可以考虑抛出异常，具体行为取决于你的需求
      return undefined
    }
  }

  return result
}
