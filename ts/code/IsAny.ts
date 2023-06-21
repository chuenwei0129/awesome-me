// any 类型与任何类型的交叉都是 any
// x & unknown 结果是 x
type IsAny<T> = 2 extends T & 1 ? true : false
type TestIsAny = IsAny<any> // true
