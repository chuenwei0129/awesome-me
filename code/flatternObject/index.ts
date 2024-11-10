type EntryObject = {
  [key: string]: string | EntryObject
}

/**
 * 将嵌套的对象转换为键值对形式的平面对象。
 * @param obj 要转换的嵌套对象。每个键值对中的值可以是任意类型，但递归遇到对象时会继续展开。
 * @param prefix 为当前处理的键添加的前缀，默认为空字符串。用于在递归展开嵌套对象时，为每个键添加适当的层级指示。
 * @returns 返回一个新对象，其中包含展开后的键值对。每个键都由其原始路径组成，使用点符号分隔各个层级。
 */
function flattenObject(
  obj: EntryObject,
  prefix = '',
): { [key: string]: string } {
  // 使用reduce方法遍历对象的每个键值对，递归展开嵌套的对象。
  return Object.entries(obj).reduce<{ [key: string]: string }>(
    (acc, [k, v]) => {
      // 根据当前的层级前缀和当前键生成新的键名。
      const newKey = prefix ? `${prefix}.${k}` : k

      // 如果当前值不是对象，则直接添加到结果对象中。
      if (typeof v !== 'object') {
        acc[newKey] = v
      } else {
        // 如果是对象，则递归调用flattenObject函数，将结果合并到累加器中。
        Object.assign(acc, flattenObject(v, newKey))
      }
      return acc
    },
    {},
  )
}

export default flattenObject
