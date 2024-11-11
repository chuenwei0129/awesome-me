// tuple[number] 可以获取元组中的某个元素的类型
type tuple = [string, number, boolean]
type tuple_to_union = tuple[number] // string | number | boolean
type tuple_length = tuple['length'] // 3

// any
// any 类型与任何类型的交叉都是 any，也就是 1 & any 结果是 any。
type is_any<T> = 1 extends T & 2 ? true : false
type test_is_any1 = is_any<any> // true
type test_is_any2 = is_any<unknown> // false

// equal
// https://github.com/microsoft/TypeScript/issues/27024#issuecomment-510924206
type is_equal<A, B> = (<T>() => T extends A ? 1 : 2) extends <
  T
>() => T extends B ? 1 : 2
  ? true
  : false

type test_is_equal1 = is_equal<'a', any> // false
type test_is_equal2 = is_equal<'a', 'b'> // false
type test_is_equal3 = is_equal<'a', 'a'> // true

// never
// never 在条件类型中也比较特殊，如果条件类型左边是类型参数，并且传入的是 never，那么直接返回 never
type is_never<T> = [T] extends [never] ? true : false
type test_is_never1 = is_never<never> // true
type test_is_never2 = is_never<any> // false

// 除此以外，any 在条件类型中也比较特殊，如果类型参数为 any，会直接返回 trueType 和 falseType 的合并
type any_is_union<T> = T extends number ? 1 : 2
type test_any_is_union = any_is_union<any> // 2 | 1

// 联合类型转交叉类型
// 利用 U extends any ? (x: U) => void : never 构造分布式的(x: U1) => void | (x: U2) => void
// 利用函数参数为逆变位置得到交叉类型
// 函数参数的逆变性质一般就联合类型转交叉类型会用，记住就行。

type union_to_intersection<U> = (
  U extends U ? (args: U) => unknown : never
) extends (args: infer R) => unknown
  ? R
  : never

type test_union_to_intersection = union_to_intersection<{ a: 1 } | { b: 2 }>

// 关于 {}
// 百思不得其解
type reason1 = {} extends {
  b?: 2 | undefined
}
  ? true
  : false // true

type reason2 = { x: 1 } extends {} ? true : false // true

type get_optional_keys<O extends Record<string, any>> = {
  [K in keyof O as {} extends Pick<O, K> ? K : never]: O[K]
}
type test_get_optional_keys = get_optional_keys<{ a: 1; b?: 2 }>

// any 类型与任何类型的交叉都是 any，也就是 1 & any 结果是 any，可以用这个特性判断 any 类型。
// 联合类型作为类型参数出现在条件类型左侧时，会分散成单个类型传入，最后合并。
// never 作为类型参数出现在条件类型左侧时，会直接返回 never。
// any 作为类型参数出现在条件类型左侧时，会直接返回 trueType 和 falseType 的联合类型。
// 元组类型也是数组类型，但每个元素都是只读的，并且 length 是数字字面量，而数组的 length 是 number。可以用来判断元组类型。
// 函数参数处会发生逆变，可以用来实现联合类型转交叉类型。
// 可选索引的值为 undefined 和值类型的联合类型。可以用来过滤可选索引，反过来也可以过滤非可选索引。
// 索引类型的索引为字符串字面量类型，而可索引签名不是，可以用这个特性过滤掉可索引签名。
// keyof 只能拿到 class 的 public 的索引，可以用来过滤出 public 的属性。
