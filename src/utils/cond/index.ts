export type ConditionFunction<T> = (value: T) => boolean
export type ResultFunction<T, R> = (value: T) => R

/**
 * 创建一个cond函数，它将一个值与一系列条件函数进行匹配，并执行第一个匹配的结果函数。
 *
 * @param conditions - 条件函数和结果函数的数组。
 * @returns 返回一个函数，该函数接受一个值，并根据条件执行相应的结果函数。
 */
function cond<T, R>(
  conditions: [ConditionFunction<T>, ResultFunction<T, R>][],
): (value: T) => R | undefined {
  return (value: T): R | undefined => {
    for (const [conditionFn, resultFn] of conditions) {
      if (conditionFn(value)) {
        return resultFn(value)
      }
    }
    return undefined // 当没有条件匹配时返回undefined
  }
}

export default cond
