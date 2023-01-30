// DeepPromiseValueType
// P 不约束，P 可以是 Promise 的值 V
type DeepPromiseValueType<P> = P extends Promise<infer V> ? DeepPromiseValueType<V> : P

type DeepPromise = Promise<Promise<Promise<number>>>
// 提取 number 类型
type Test_DeepPromiseValueType = DeepPromiseValueType<DeepPromise>

// Reverse
type Reverse<Arr extends any[]> = Arr extends []
  ? []
  : Arr extends [infer First, ...infer Rest]
  ? [...Reverse<Rest>, First]
  : never

// Rest 最后为 [], [] extends [infer First, ...infer Rest] 为 false，会走 false 为 []
// [...[], ...上一层, ...上一层的上一层, ... , First]

// 可以简化为
type Reverse2<Arr extends any[]> = Arr extends [infer First, ...infer Rest]
  ? [...Reverse2<Rest>, First]
  : []

type Test_Reverse = Reverse<['a', 'b', 'c']>
type Test_Reverse2 = Reverse2<['a', 'b', 'c']>

// 数量不确定，条件反射的就要想到递归。
// 递归终止条件利用 [] extends [infer First, ...infer Rest] === false
// Includes
type Includes<Arr extends unknown[], Item extends unknown> = Arr extends [
  infer First,
  ...infer Rest
]
  ? First extends Item
    ? true
    : Includes<Rest, Item>
  : false

type Test_Includes = Includes<['a', { a: 1 }, 'c'], { a: 1; b: 1 }>
// isEqual 比 First extends Item 判断精确
type Test_Includes2 = Includes<['a', { a: 1; b: 1 }, 'c'], { a: 1 }>

// RemoveItem
type RemoveItem<Arr extends unknown[], Item extends unknown> = Arr extends [
  infer First,
  ...infer Rest
]
  ? Item extends First
    ? // 为 ？Rest 时会在第一个 'c' 时函数返回
      RemoveItem<Rest, Item>
    : [First, ...RemoveItem<Rest, Item>]
  : []

type Test_RemoveItem = RemoveItem<['a', 'b', 'c', 'c', 'd', 'c'], 'c'>

// 思路：初始 Arr 可以不为空
// arr.length = 1 === len = 5 === false => arr = [...arr, item]...
type NewArray<
  Len extends number,
  Arr extends unknown[] = [],
  Item extends unknown = unknown
> = Arr['length'] extends Len ? Arr : NewArray<Len, [...Arr, Item], Item>

// 对，类型编程中如果需要取类型参数做一些计算的时候，默认推导出的是约束的类型，如果没有类型约束，那就是 unknown。
// 关于 extends 前后顺序问题
// 如果 Len extends Arr['length'] 会出现 number extends 某个具体的数字自然永远不成立，无限递归

// 长度为 5
type Test_NewArray = NewArray<5, ['a'], 'd'>

// StringToUnion
type StringToUnion<S extends string> = S extends `${infer Head}${infer Tail}`
  ? Head | StringToUnion<Tail>
  : never

// 联合类型，Set，卧槽忘了，还想怎么搞出 'l' | 'l' 呢？
type Test_StringToUnion = StringToUnion<'hello'>

// DeepReadonly
type DeepReadonly<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>
}

type Test_DeepReadonly = DeepReadonly<{ a: { b: { c: number } } }>['a']['b']
