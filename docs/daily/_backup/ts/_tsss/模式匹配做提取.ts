// 提取 Promise<'val'> 中的 val
type f1<P> = P extends Promise<infer Val> ? Val : never
type val = f1<Promise<'val'>> // val

// 数组类型想提取第一个元素的类型
type f2<Arr extends unknown[]> = Arr extends [infer First, ...unknown[]]
  ? First
  : never
type first1 = f2<[1, 2, 3]> // 1
type first2 = f2<[]> // never

// 取去除第一个元素的数组类型
// 取得是数组，需要考虑空数组的情况
type f3<Arr extends unknown[]> = Arr extends []
  ? []
  : Arr extends [unknown, ...infer Rest]
  ? Rest
  : never

type rest1 = f3<[1, 2, 3]> // [2, 3]
type rest2 = f3<[]> // []

// 判断字符串是否以某个前缀开头，也是通过模式匹配：
type f4<
  Str extends string,
  Prefix extends string
> = Str extends `${Prefix}${string}` ? true : false
type starts_with_hello = f4<'hello world', 'hello'> // true

// 字符串可以匹配一个模式类型，提取想要的部分，自然也可以用这些再构成一个新的类型。
type f5<
  Str extends string,
  From extends string,
  To extends string
> = Str extends `${infer Prefix}${From}${infer Suffix}`
  ? `${Prefix}${To}${Suffix}`
  : Str
type form_react_to_vue = f5<'i love react!', 'react', 'vue'>

// Trim
type trim_left<Str extends string> = Str extends ` ${infer Suffix}`
  ? trim_left<Suffix>
  : Str
type trim_right<Str extends string> = Str extends `${infer Prefix} `
  ? trim_right<Prefix>
  : Str
type trim<Str extends string> = trim_left<trim_right<Str>>

type test_trim_left = trim_left<'   hello world'> // 'hello world'
type test_trim_right = trim_right<'hello world   '> // 'hello world'
type test_trim = trim<'   hello world   '> // 'hello world'

// 函数同样也可以做类型匹配，比如提取参数、返回值的类型。
type f6<F extends Function> = F extends (...args: infer Params) => unknown
  ? Params
  : never
type get_params = f6<(a: number, b: string) => void> // [a: number, b: string]

// 重点
// 参数类型可以是任意类型，也就是 any[]（注意，这里不能用 unknown，因为参数类型是要赋值给别的类型的，而 unknown 只能用来接收类型，所以用 any）。
type f7<F extends Function> = F extends (...args: any[]) => infer Return
  ? Return
  : never
type get_return = f7<(a: number, b: string) => string> // string

// 索引类型
type f8<O extends object> = 'ref' extends keyof O
  ? O extends { ref?: infer Val | undefined }
    ? Val
    : never
  : never
type get_ref1 = f8<{ ref?: 1; name: 'chu' }> // 1
type get_ref2 = f8<{ ref?: undefined; name: 'chu' }> // undefined

// TypeScript 类型的模式匹配是通过类型 extends 一个模式类型，把需要提取的部分放到通过 infer 声明的局部变量里，后面可以从这个局部变量拿到类型做各种后续处理。
