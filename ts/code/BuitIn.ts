// 内置类型

type Test_Parameters = Parameters<(x: number, y: string) => void>

type Test_ReturnType = ReturnType<(x: number, y: string) => [string]>

type Test_ConstructorParameters = ConstructorParameters<typeof Function>

type MyConstructorParameters<T extends abstract new (...args: any) => any> =
  T extends abstract new (...args: infer P) => any ? P : never

// InstanceType
// ThisParameterType

// Partial
// Required
// Readonly
// Pick
// Record
// Exclude
// Extract
// Omit
// Awaited: deep promise
// NonNullable: NonNullable 就是用于判断是否为非空类型，也就是不是 null 或者 undefined 的类型的
type Test_NonNullable = NonNullable<null>
type Test_NonNullable2 = NonNullable<string | null>
type Test_NonNullable3 = NonNullable<undefined>

// 这四个类型是分别实现大写、小写、首字母大写、去掉首字母大写的。
// Uppercase、Lowercase、Capitalize、Uncapitalize
