// shift
type Shift<Arr extends any[]> = Arr extends [infer First, ...infer Rest] ? First : never
type Test_Shift = Shift<['a', 'b', 'c']>
type ShiftArr<Arr extends any[]> = Arr extends [infer First, ...infer Rest] ? Rest : never
type Test_ShiftArr = ShiftArr<['a', 'b', 'c']>

// pop
type Pop<Arr extends any[]> = Arr extends [...infer Rest, infer Last] ? Last : never
type Test_Pop = Pop<['a', 'b', 'c']>
type PopArr<Arr extends any[]> = Arr extends [infer First, ...infer Rest] ? Rest : never
type Test_PopArr = ShiftArr<['a', 'b', 'c']>

// unshift
type Unshift<Arr extends any[], Item extends unknown> = [Item, ...Arr]
type Test_Unshift = Unshift<['b', 'c', 'd'], 'a'>
// push
type Push<Arr extends any[], Item extends unknown> = [...Arr, Item]
type Test_Push = Push<['a', 'b', 'c'], 'd'>

// StartsWith
type StartsWith<Str extends string, Head extends string> = Str extends `${Head}${infer Rest}`
  ? true
  : false

type Test_StartsWith = StartsWith<'hello', 'h'>
type Test_StartsWith_2 = StartsWith<'hello', 'e'>

// Replace
type Replace<
  Str extends string,
  Old extends string,
  New extends string
> = Str extends `${infer Head}${Old}${infer Rest}` ? `${Head}${New}${Replace<Rest, Old, New>}` : Str

type Test_Replace = Replace<'hello', 'h', 'f'>
type Test_Replace_2 = Replace<'hello', 'l', 'g'>

// Trim
type TrimStart<Str extends string> = Str extends `${' ' | '\n' | '\t'}${infer Rest}`
  ? TrimStart<Rest>
  : Str
type TrimEnd<Str extends string> = Str extends `${infer Rest}${' ' | '\n' | '\t'}`
  ? TrimEnd<Rest>
  : Str

// TrimStart 函数的值为闭包参数
type Trim<Str extends string> = TrimStart<TrimEnd<Str>>
type Test_Trim = Trim<'  hello world!   '>

// 获取参数类型
type GetParameters<F extends Function> = F extends (...args: infer P) => unknown ? P : never
type Test_GetParameters = GetParameters<(a: number, b: string) => void>

// 获取返回值类型
type GetReturnType<F extends Function> = F extends (...args: unknown[]) => infer R ? R : never
type Test_GetReturnType = GetReturnType<(a: number, b: string) => void>

// 获取 ref 参数类型
// 索引类型也会展开计算
type GetRefFromProps<Props extends { [key in keyof any]: unknown }> = Props extends {
  ref?: infer Ref | undefined
}
  ? Ref
  : never

// 字面量为值类型
type Test_GetRefFromProps = GetRefFromProps<{ ref: 'hello'; other: 'world' }>
type Test_GetRefFromProps_2 = GetRefFromProps<{ other: 'world' }>

// zip
// [a, b, c] [1, 2, 3] => [[a, 1], [b, 2], [c, 3]]
type Zip<A extends any[], B extends any[]> = A extends [infer A0, ...infer RestA]
  ? B extends [infer B0, ...infer RestB]
    ? [[A0, B0], ...Zip<RestA, RestB>]
    : []
  : []

type Test_Zip = Zip<['a', 'b', 'c'], [1, 2]>

// 空数组模式匹配
type EmptyArrPattern<Arr extends any[]> = Arr extends [infer First, ...infer Rest] ? Rest : never
type Test_EmptyArrPattern = EmptyArrPattern<[]>

// DashCaseToCamelCase
type DashCase2CamelCase<S extends string> =
  S extends `${infer L}_${infer FirstWord}${infer RestWord}`
    ? `${L}${Uppercase<FirstWord>}${DashCase2CamelCase<RestWord>}`
    : S

type Test_DashCase2CamelCase = DashCase2CamelCase<'hello_world_fuck_people'>

// 删除字符串中的某个子串
type DelSubStr<
  S extends string,
  SubStr extends string
> = S extends `${infer Head}${SubStr}${infer Rest}` ? `${Head}${DelSubStr<Rest, SubStr>}` : S

type Test_DelSubStr = DelSubStr<'hello world', 'l'>
type Test_DelSubStr_2 = DelSubStr<'hello world', 'h'>

// Join
type ArrStruct<First extends string, Rest extends string[]> = [First, ...Rest]

type Join<Arr extends string[], S extends string> = Arr extends []
  ? ''
  : Arr extends ArrStruct<infer First, []>
  ? First
  : Arr extends ArrStruct<infer First, infer Rest>
  ? `${First}${S}${Join<Rest, S>}`
  : never

// type Test = "a+b+c"
type Test = Join<['a', 'b', 'c'], '+'>
