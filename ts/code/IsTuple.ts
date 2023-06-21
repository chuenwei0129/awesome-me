// 元组类型也是数组类型，但每个元素都是只读的，并且 length 是数字字面量，而数组的 length 是 number。

type NotEqual<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2
  ? false
  : true

type IsTuple<T> = T extends readonly [...params: infer Items]
  ? NotEqual<Items['length'], number>
  : false

type Test_IsTuple = IsTuple<[1, 2, 3]>
type Test_IsTuple2 = IsTuple<number[]>
