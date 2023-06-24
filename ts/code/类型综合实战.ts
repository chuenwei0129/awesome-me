// 实战
// KebabCaseToCamelCase
// aaa-bbb-ccc => aaaBbbCcc
type KebabCaseToCamelCase<S> = S extends `${infer First}-${infer Rest}`
  ? `${First}${Capitalize<KebabCaseToCamelCase<Rest>>}`
  : S

type Test_KebabCaseToCamelCase = KebabCaseToCamelCase<'aaa-bbb-ccc'>

// CamelCaseToKebabCase
// aaaBbbCcc => aaa-bbb-ccc
// 思路：找到首字母是否大写，A !== Lowercase<A>
// 递归是堆栈，一层套一层，上一层保留住了原字符串的前一部份
// 结果在第一层就返回了，结束条件和返回不是一回事
type CamelCaseToKebabCase<S> = S extends `${infer First}${infer Rest}`
  ? First extends Lowercase<First>
    ? `${First}${CamelCaseToKebabCase<Rest>}`
    : `-${Uppercase<First>}${CamelCaseToKebabCase<Rest>}`
  : S

type Test_CamelCaseToKebabCase = CamelCaseToKebabCase<'aaaBbbCcc'>

// Chunk
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] => [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]]
// 结束递归条件：[] extends [infer First, ...infer Rest] === false
// 思路：SubArr.length === Size 时，把 SubArr 放入结果数组
type Chunk<
  Arr extends unknown[],
  Size extends number,
  SubArr extends unknown[] = [],
  Res extends unknown[] = []
> = Arr extends [infer First, ...infer Rest]
  ? SubArr['length'] extends Size
    ? Chunk<Rest, Size, [First], [...Res, SubArr]>
    : Chunk<Rest, Size, [...SubArr, First], Res>
  : [...Res, SubArr]

type Test_Chunk = Chunk<[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3>

// TupleToNestedObject
// [‘a’, ‘b’, ‘c’] + 'xxx' => {a: {b: {c: 'xxx'}}}
// Arr[number] === keyof Obj ==> Union
// [] extends [infer First, ...infer Rest] === false 时是最后一层，此时 TupleToNestedObject<Rest, V> 的结果是 V
// 相当于第一层就返回了结果，其它的都是内层递归计算。
type TupleToNestedObject<A extends unknown[], V extends string> = A extends [
  infer First,
  ...infer Rest
]
  ? {
      [K in First & string]: TupleToNestedObject<Rest, V>
    }
  : V
type Test_TupleToNestedObject = TupleToNestedObject<['a'], 'xxx'>

// UnionToTuple
// 取重载函数的 ReturnType 返回的是最后一个重载的返回值类型。
// 因为函数参数的类型要能接收多个类型，那肯定要定义成这些类型的交集，所以会发生逆变，转成交叉类型。
// 套路：先拆联合类型，返回参数为 U 的函数，然后取函数参数，返回交叉类型。字面量交叉 never，未处理 1 & never === never
type Union2Intersection<U> = (U extends U ? (arg: U) => void : never) extends (
  arg: infer P
) => void
  ? P
  : never

// never
type Test_Union2Intersection = Union2Intersection<{ a: 2 } | { a: 1 }>
type Test_Union2Intersection1 = Union2Intersection<{ a: 2 } | { b: 1 }>

// 字面量交叉 never
// 联合类型转元组：重载函数的 ReturnType 返回的是最后一个重载的返回值类型。
// 思路：先转成交叉类型，然后利用特性，依次取出交叉类型的元素，组合成元组。
// 注意点：1 & 2 === never，需要保存 U，构造新的交叉类型 (() => 2) & (() => 1) & (() => 3)
// UnionToTuple<Exclude<U, R>> 最后一层 === []
type UnionToTuple<U> = Union2Intersection<
  U extends any ? () => U : never
> extends () => infer R
  ? [...UnionToTuple<Exclude<U, R>>, R]
  : []

type Test_UnionToTuple = UnionToTuple<1 | 2 | 3 | 5 | 6>

// DeepCamelCase
// TS 运行时处理类型，行为类似函数提升
type CamelCaseArr<Arr> = Arr extends [infer First, ...infer Rest]
  ? [DeepCamelCase<First>, ...CamelCaseArr<Rest>]
  : []

type DeepCamelCase<T> = T extends unknown[]
  ? CamelCaseArr<T>
  : {
      [K in keyof T as K extends `${infer First}_${infer Rest}`
        ? `${First}${Capitalize<Rest>}`
        : K]: DeepCamelCase<T[K]>
    }

type Test_DeepCamelCase = DeepCamelCase<{
  aaa_bbb: string
  bbb_ccc: [
    {
      ccc_ddd: string
    },
    {
      ddd_eee: string
      eee_fff: {
        fff_ggg: string
      }
    }
  ]
}>

// CombineDefault
// 实现这样一个高级类型，对 A、B 两个索引类型做合并
// 如果是只有 A 中有的不变，如果是 A、B 都有的就变为可选，只有 B 中有的也变为可选。
type X = {
  a: 1
  b: 2
}

type Y = {
  b: 3
  c: 4
}

// 索引类型处理可以 Pick 出每一部分单独处理，最后取交叉类型来把处理后的索引类型合并到一起。
// keyof X === Object.keys(X)
// Exact 集合交集
type CombineDefault<A, B> = Pick<A, Exclude<keyof A, keyof B>> &
  Partial<Pick<B, Exclude<keyof B, keyof A>>> &
  Partial<Pick<A, Extract<keyof A, keyof B>>>

// TS 只有在类型被用到的时候才会去做类型计算
// 如果类型没有被用到，就不会去做类型计算
type Test_CombineDefault = CombineDefault<X, Y>

type Copy<O extends Record<string, any>> = {
  [Key in keyof O]: O[Key]
}

type Test_Copy = Copy<Test_CombineDefault>

// 类型和类型之间有关联，需要动态生成类型的场景，必然会用到类型编程，比如 Promise.all、Promise.race、柯里化等场景。
// 有的时候不用类型编程也行，但用了类型编程能够实现更精准的类型提示和检查
