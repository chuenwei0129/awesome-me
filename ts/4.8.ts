// https://zhuanlan.zhihu.com/p/533609020

// 在 4.8 版本，现在 unknown 和 {} | null | undefined 可以互相兼容

type T1 = {} & string // string
type T2 = {} & 'linbudu' // 'linbudu'
type T3 = {} & object // object
type T4 = {} & { x: number } // { x: number }
type T5 = {} & null // never
type T6 = {} & undefined // never

// 具体是抽象的子类型
// 交叉本质是同时满足两个类型，子类 & 父类 === 子类
// 由于 {} 就是一个空对象，因此除 null、undefined 以外的一切基础类型，都可以被视为是继承于 {} 之后派生出来的。
// 实现原理则是 null & {}、undefined & {} 会直接被判断为 never ，从而消失在联合类型结果中。

type _FirstString<T> = T extends [infer S, ...unknown[]]
  ? S extends string
    ? S
    : never
  : never

// 基于 infer extends
type FirstString<T> = T extends [infer S extends string, ...unknown[]]
  ? S
  : never

// 4.8 版本在此基础上进行了进一步地增强，当 infer 被约束为一个原始类型，那么它现在会尽可能将 infer 的类型信息推导到字面量类型的级别：

// 此前为 number，现在为 '100'
type SomeNum = '100' extends `${infer U extends number}` ? U : never
// 此前为 boolean，现在为 'true'
type SomeBool = 'true' extends `${infer U extends boolean}` ? U : never
// 同时，TypeScript 会检查提取出的值能否重新映射回初始的字符串，如 SomeNum 中会检查 String(Number("100")) 是否等于 "100"，
// String(Number("1.0")) → "1"，≠ "1.0"
type JustNumber = '1.0' extends `${infer T extends number}` ? T : never

// ?禁用了基于绑定模式的类型推导，因为其对泛型的影响并不始终正确：
