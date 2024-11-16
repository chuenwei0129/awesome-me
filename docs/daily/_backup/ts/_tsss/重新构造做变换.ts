// TypeScript 的 type、infer、类型参数声明的变量都不能修改，想对类型做各种变换产生新的类型就需要重新构造。

// 数组类型的重新构造
// push
type push<Arr extends unknown[], Item extends unknown> = [...Arr, Item]
type test_push = push<[1, 2, 3], '4'> // [1, 2, 3, '4']

// zip
type zip<Arr1 extends unknown[], Arr2 extends unknown[]> = Arr1 extends [
  infer First1,
  ...infer Rest1
]
  ? Arr2 extends [infer First2, ...infer Rest2]
    ? [[First1, First2], ...zip<Rest1, Rest2>]
    : []
  : []

// 递归 归阶段 ...[] 一层层往上，所以不能用 never
type test_zip = zip<[1, 2, 3], [4, 5]> // [[1, 4], [2, 5]]

// 字符串类型的重新构造
type camel_case<Str extends string> =
  Str extends `${infer Prefix}_${infer Suffix}`
    ? `${Prefix}${Capitalize<camel_case<Suffix>>}`
    : Str

type test_camel_case1 = camel_case<'camel_case'> // 'camelCase'
type test_camel_case2 = camel_case<'test_camel_case'> // "testCamelCase"

// 函数类型的重新构造：
type add_arg<F extends Function, Arg extends unknown> = F extends (
  ...args: infer Args
) => infer Return
  ? (...args: [...Args, Arg]) => Return
  : never
type test_add_arg = add_arg<(a: number) => void, string> // (args_0: number, args_1: string) => void

// 索引类型的重新构造
interface Person {
  name: string
  age: number
  hobbies: string[]
}

// 重点：右一处必须用 any
type filter_by_type<O extends Record<string, any>, T> = {
  [K in keyof O as O[K] extends T ? K : never]: O[K]
}
type test_filter_by_type = filter_by_type<Person, string | number>
