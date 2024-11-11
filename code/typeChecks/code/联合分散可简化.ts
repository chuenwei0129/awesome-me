// 当类型参数为联合类型，并且在条件类型左边直接引用该类型参数的时候，TypeScript 会把每一个元素单独传入来做类型运算，最后再合并成联合类型，这种语法叫做分布式条件类型。
type uppercase_a<U> = U extends 'a' ? Uppercase<U> : U
type test_uppercase_a = uppercase_a<'a' | 'b' | 'c'>

// 因为条件类型中如果左边的类型是联合类型，会把每个元素单独传入做计算，而右边不会。
// A 是 'a' 的时候，B 是 'a' | 'b' | 'c'
// A 是 'b' 的时候，B 是 'a' | 'b' | 'c' ...
type union_rule<A, B = A> = A extends B ? { a: A; b: B } : never
type test_union_rule = union_rule<'a' | 'b' | 'c'>
// {
//   a: "a";
//   b: "a" | "b" | "c";
// } | {
//   a: "b";
//   b: "a" | "b" | "c";
// } | {
//   a: "c";
//   b: "a" | "b" | "c";
// }

// A extends B 这段看似没啥意义，主要是为了触发分布式条件类型，让 A 的每个类型单独传入。
// [B] extends [A] 这样不直接写 B 就可以避免触发分布式条件类型，那么 B 就是整个联合类型。
type is_union<A, B = A> = A extends B ? ([B] extends [A] ? false : true) : never
type test_is_union1 = is_union<'a' | 'b' | 'c'>
type test_is_union2 = is_union<'a'>
