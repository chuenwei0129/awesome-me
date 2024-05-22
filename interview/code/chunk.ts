// 把数组平分，实现 fn
// fn([1, 2, 3, 4, 5], 2); //结果为[[1,2],[3,4],[5]]

/**
 * 将数组拆分成多个小块
 * @param arr 要拆分的数组
 * @param size 每个小块的大小
 * @returns 返回一个由小块组成的二维数组
 */
const chunk = <T>(arr: T[], size: number) => {
  if (!Number.isInteger(size) || size <= 0)
    throw new TypeError('Expected a positive integer as the second argument')

  return arr.reduce<T[][]>((acc, cur, index) => {
    if (index % size === 0) {
      acc.push([])
    }
    acc[acc.length - 1].push(cur)
    return acc
  }, [])
}

console.log(chunk([], 100))
