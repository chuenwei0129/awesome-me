// any 是任何类型的父类型，any 也是任何类型的子类型
// A 是 B 的子类型，A 也是 B 的父类型
type IsEqual1<A, B> = (A extends B ? true : false) & (B extends A ? true : false)

// true
type Test_IsEqual1 = IsEqual1<'a', any>

// 处理 any 的情况
type IsEqual<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2
  ? true
  : false

type Test_IsEqual = IsEqual<'a', any>

// hack:
// x extends y : x 和 y 都是条件类型
// 源码：如果是两个条件类型 (T1 extends U1 ? X1 : Y1) extends (T2 extends U2 ? X2 : Y2)
// 那 T1 和 T2 相关、X1 和 X2 相关、Y1 和 Y2 相关，而 U1 和 U2 相等。
// U1 === U2
