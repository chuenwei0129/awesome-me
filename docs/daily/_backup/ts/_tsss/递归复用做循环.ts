// 在类型体操中，遇到数量不确定的问题，要条件反射的想到递归。 比如数组长度不确定、字符串长度不确定、索引类型层数不确定等。
// 重点闭包

// Promise 的递归复用
type deep_promise<P extends Promise<unknown>> = P extends Promise<infer Val>
  ? Val extends Promise<unknown>
    ? deep_promise<Val>
    : Val
  : never

type test_deep_promise = deep_promise<
  Promise<Promise<Promise<Promise<Record<string, any>>>>>
> // Record<string, any>

// 数组类型的递归
// Result === 函数参数闭包
type reverse<
  Arr extends unknown[],
  Result extends unknown[] = []
> = Arr extends [infer First, ...infer Rest]
  ? reverse<Rest, [First, ...Result]>
  : Result
type test_reverse = reverse<[1, 2, 3]> // [3, 2, 1]

type includes<Arr extends unknown[], Item extends unknown> = Arr extends [
  infer First,
  ...infer Rest
]
  ? First extends Item
    ? Item extends First
      ? true
      : includes<Rest, Item>
    : includes<Rest, Item>
  : false

type test_includes1 = includes<[1, 2, 3, 4], 4> // true
type test_includes2 = includes<[1, 2, 3, 4], 5> // false
type test_includes3 = includes<[1, 2, 3, 4], number> // false
// 严谨的写法需要换成 IsEqual<First, Item>
type test_includes4 = includes<[1, 2, 3, 4], any> // boolean

// new Array
// IsEqual
type array_of<
  N extends number,
  Result extends unknown[] = []
> = Result['length'] extends N ? Result : array_of<N, [unknown, ...Result]>
type test_array_of1 = array_of<3> // [unknown, unknown, unknown]
type test_array_of2 = array_of<number> // []

// 字符串类型的递归
type reverse_str<
  Str extends string,
  Result extends string = ''
> = Str extends `${infer First}${infer Rest}`
  ? reverse_str<Rest, `${First}${Result}`>
  : Result
type test_reverse_str = reverse_str<'hello'> // 'olleh'

// 对象类型的递归
type deep_readonly<O extends Record<string, any>> = {
  readonly [K in keyof O]: O[K] extends Record<string, any>
    ? O[K] extends Function
      ? O[K]
      : deep_readonly<O[K]>
    : O[K]
}

type test_deep_readonly = deep_readonly<{
  a: {
    b: {
      c: {
        f: () => void
        d: {
          e: {
            str: string
          }
        }
      }
    }
  }
}>['a']['b']['c']['d']['e']
