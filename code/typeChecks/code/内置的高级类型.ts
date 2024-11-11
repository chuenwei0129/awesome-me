// Parameters 获取函数的参数类型
type test_parameters = Parameters<(a: number, b: string) => void> // [a: number, b: string]

// ReturnType 获取函数的返回值类型
type test_return_type = ReturnType<() => number> // number

// Partial 将类型中的属性变为可选
type test_partial = Partial<{
  a: number
  b: string
}> // { a?: number; b?: string; }

// Required 将类型中的属性变为必选
type test_required = Required<{
  a?: number
  b?: string
}> // { a: number; b: string; }

// Readonly 将类型中的属性变为只读
type test_readonly = Readonly<{
  a: number
  b: string
}> // { readonly a: number; readonly b: string; }

// Pick 从类型中挑选属性
type test_pick = Pick<
  {
    a: number
    b: string
    c: boolean
  },
  'a' | 'b'
> // { a: number; b: string; }

// Record 将类型中的属性变为另一种类型
type test_record = Record<'a' | 'b', number> // { a: number; b: number; }

// Exclude 从类型中排除某些类型
type test_exclude = Exclude<1 | 2 | 3, 1 | 2> // 3

// Extract 从类型中提取某些类型
type test_extract = Extract<1 | 2 | 3, 1 | 2> // 1 | 2

// Omit 从类型中排除某些属性
type test_omit = Omit<
  {
    a: number
    b: string
    c: boolean
  },
  'a' | 'b'
> // { c: boolean; }

// Awaited
// 获取 Promise 的返回值类型
type test_awaited = Awaited<Promise<number>> // number

// NonNullable 从类型中排除 null 和 undefined
type test_non_nullable = NonNullable<number | null | undefined> // number

// Uppercase 将字符串转为大写
type test_uppercase = Uppercase<'a' | 'b' | 'c'> // "A" | "B" | "C"

// Lowercase 将字符串转为小写
type test_lowercase = Lowercase<'A' | 'B' | 'C'> // "a" | "b" | "c"

// Capitalize 将字符串首字母大写
type test_capitalize = Capitalize<'abc'> // 'Abc'

// Uncapitalize 将字符串首字母小写
type test_uncapitalize = Uncapitalize<'ABC'> // "aBC"
