// never 在条件类型中也比较特殊，如果条件类型左边是类型参数，并且传入的是 never，那么直接返回 never
// any 作为类型参数出现在条件类型左侧时，会直接返回 trueType 和 falseType 的联合类型。
// 联合类型作为类型参数出现在条件类型左侧时，会分散成单个类型传入，最后合并

// 当类型参数为联合类型，并且在条件类型左边直接引用该类型参数的时候，
// TypeScript 会把每一个元素单独传入来做类型运算，最后再合并成联合类型，这种语法叫做分布式条件类型。

type If<T> = T extends number ? true : false

// never
type IfNever = If<never>
// boolean
type IfAny = If<any>
// boolean
type IfUnion = If<1 | '2'>
// false
type UnionLiteral = 1 | '2'
type IfUnionLiteral = UnionLiteral extends number ? true : false

// 分布式条件类型
type TestUnion<A, B = A> = A extends B ? { a: A; b: B } : never
type TestUnionResult = TestUnion<'a' | 'b' | 'c'>
// type TestUnionResult = {
//   a: "a";
//   b: "a" | "b" | "c";
// } | {
//   a: "b";
//   b: "a" | "b" | "c";
// } | {
//   a: "c";
//   b: "a" | "b" | "c";
// }

// 因为条件类型中如果左边的类型是联合类型，会把每个元素单独传入做计算，而右边不会。
// 所以 A 是 'a' 的时候，B 是 'a' | 'b' | 'c'， A 是 'b' 的时候，B 是 'a' | 'b' | 'c'。。。

// A extends B 这段看似没啥意义，主要是为了触发分布式条件类型，让 A 的每个类型单独传入。
// [B] extends [A] 这样不直接写 B 就可以避免触发分布式条件类型，那么 B 就是整个联合类型。
type IsUnion<A, B = A> = A extends B ? ([B] extends [A] ? false : true) : never

// true
type TestIsUnion = IsUnion<'a' | 'b' | 'c'>
// false
type TestIsUnion1 = IsUnion<'a'>

// UnionToIntersection
// 在 TypeScript 中有函数参数是有逆变的性质的，也就是如果参数可能是多个类型，参数类型会变成它们的交叉类型。
// 先 A extends B ? (x: A) => void : never 联合类型计算
// 然后模式匹配取 arg，根据特性返回交叉类型
type UnionToIntersection<A, B = A> = (
  A extends B ? (arg: A) => void : never
) extends (arg: infer R) => void
  ? R
  : never

type Test_UnionToIntersection = UnionToIntersection<{ a: 1 } | { b: 2 }>
// never 未处理
type Test_UnionToIntersection1 = UnionToIntersection<1 | never>

type MyExclude<T, U> = T extends U ? never : T
type MyExtract<T, U> = T extends U ? T : never

interface T1 {
  foo: string
  bar: string
  baz: string
}

interface T2 {
  foo: string
  baz: string
}

type ExcludedKeys = MyExclude<keyof T1, keyof T2>
