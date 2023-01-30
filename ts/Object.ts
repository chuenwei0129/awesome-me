// 对索引类型值的处理
type Mapping<O extends object> = {
  [Key in keyof O]: [O[Key], O[Key], O[Key]]
}

type Test_Mapping = Mapping<{ a: 1 }>

// 动态计算的是 key
// 处理 key 用 as 关键字
// UppercaseKeys
type UppercaseKeys<O extends object> = {
  [Key in keyof O as Uppercase<Key & string>]: O[Key]
}
type Test_UppercaseKeys = UppercaseKeys<{ a: 1 }>

// FilterByValueType
type FilterByValueType<O extends object, V> = {
  [K in keyof O as O[K] extends V ? K : never]: O[K]
}
type Test_FilterByValueType = FilterByValueType<{ a: 1; b: 2; c: 3 }, 2>

// RemoveIndexSignature
// 索引类型可能有索引，也可能有可索引签名。
// 根据它的性质，索引签名不能构造成字符串字面量类型，因为它没有名字，而其他索引可以。

type RemoveIndexSignature<T extends Record<string, any>> = {
  [Key in keyof T as Key extends `${infer S}` ? Key : never]: T[Key]
}

type Test_RemoveIndexSignature = RemoveIndexSignature<{ a: 1; [key: string]: unknown }>

// 可选索引的值为 undefined 和值类型的联合类型。
type Test_KeyB = Pick<{ a: 1; b?: 2 }, 'b'>['b']
// 因为 b 可能为 undefined，也就是索引类型可能是 {}，所以 {} extends Pick<T, Key> 就能过滤出可选索引。
type GetOptional<T extends Record<string, any>> = {
  [Key in keyof T as {} extends Pick<T, Key> ? Key : never]: T[Key]
}
type Test_GetOptional = GetOptional<{ a: 1; b?: 2 }>

type GetRequired<T extends Record<string, any>> = {
  [Key in keyof T as {} extends Pick<T, Key> ? never : Key]: T[Key]
}
type Test_GetRequired = GetRequired<{ a: 1; b?: 2 }>
