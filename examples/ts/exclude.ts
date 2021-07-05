// 从 T 中排除可分配给 U 的那些类型
type MyExclude<T, U> = T extends U ? never : T

type k = MyExclude<1 | 2, 2 | 3>
