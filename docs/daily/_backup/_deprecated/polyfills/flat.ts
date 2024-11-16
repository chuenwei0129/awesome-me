// 1. toString 方法取决于数组成员 toString 后是否等于自身，{a: 1}.toString() === 'object Object'
// undefined/null 没有包装对象，没有 toString。
const test1 = [() => 0, 1, [2], [4, 5, [6, 7, 8, [9, [10]]]]]

// 函数 toString 返回自身
const flat1 = (arr: unknown[]) => {
  // eval 静态分析时优化
  return eval(`[${arr.toString()}]`)
}

console.log(flat1(test1)) // [ [Function (anonymous)], 1, 2, 4, 5, 6, 7, 8, 9, 10 ]

// 2. 正则 + 序列化/反序列化
// 与深拷贝类似，() => 0, undefined 会被转成 null
const test2 = [undefined, () => 0, 1, [2, { a: 1 }], [4, 5, [6, 7, 8, [9, [10]]]]]
const flat2 = (arr: unknown[]) => JSON.parse(`[${JSON.stringify(arr).replace(/\[|\]/g, '')}]`)

console.log(flat2(test2)) // [ null, null, 1, 2, { a: 1 }, 4, 5, 6, 7, 8, 9, 10 ]

// 3. 递归
// item 是数组就递归，不是就放入 res 中
const flat3 = (arr: unknown[], res: unknown[] = []) => {
  arr.forEach(item => {
    Array.isArray(item) ? flat3(item, res) : res.push(item)
  })
  return res
}

// 4. reduce
// 本质还是递归，返回值由参数存储转成 acc 收集每次递归的值
// reduce 泛型指定 acc 的类型
const flat4 = (arr: unknown[]): unknown[] => {
  return arr.reduce<unknown[]>((acc, cur) => {
    return acc.concat(Array.isArray(cur) ? flat4(cur) : cur)
  }, [])
}

console.log(flat4(test2))

// 5. while + some + concat
// some => true/false
const flat5 = (arr: unknown[]) => {
  // 循环展开子数组
  while (arr.some(item => Array.isArray(item))) {
    // 一次循环展开一层，...arr 展开最外层，由于 concat 特性，会把 ...arr 再展开一层，再包上，相当于展开一层
    // 未修改原数组，这里相当于复制
    arr = ([] as unknown[]).concat(...arr)
  }
  return arr
}

console.log(flat5(test2))

// 原生 api 注意点 -> 层数
console.log(test2.flat(Infinity))
