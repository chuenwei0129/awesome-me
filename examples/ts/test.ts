const a = 'sss'

const o = {
  a: 'sss'
} as const

// const 上下文
这张图上代码最核心的问题就在于 ts 对于数组和字符串的类型的处理。

如果直接把一个字符串赋值给变量，ts 会保留字面量类型。


但是如果我赋值给对象的属性


字面量 "sss" 的类型就丢失了，变成了 string。

// Tuple与字面量类型的保留
// 从对象中选出可选属性
// 怎么理解 conditional type 中的联合类型与 never
