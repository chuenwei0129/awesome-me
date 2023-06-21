// 1
type N1 = [unknown]['length']
// 2
type N2 = [unknown, unknown]['length']
// 3
type N3 = [unknown, unknown, unknown]['length']

// TypeScript 类型系统中没有加减乘除运算符，但是可以通过构造不同的数组然后取 length 的方式来完成数值计算，
// 把数值的加减乘除转化为对数组的提取和构造。
type BuildArray<
  Len extends number,
  Arr extends unknown[] = [],
  Item = unknown
> = Arr['length'] extends Len ? Arr : BuildArray<Len, [...Arr, Item], Item>

// 构造数组逻辑，尾递归
// 1 === 6 => arr = [item, item] => 2 === 6 => [item, item, item] ...
type N = BuildArray<6, ['item']>

// 加法：合并数组取 length
type Add<N1 extends number, N2 extends number> = [...BuildArray<N1>, ...BuildArray<N2>]['length']

// 8
type Add_5_3 = Add<5, 3>
// 13
type Add_4_9 = Add<4, 9>

// N1 >= N2
// 减法 Subtract
type Sub<N1 extends number, N2 extends number> = BuildArray<N1> extends [
  ...BuildArray<N2>,
  ...infer Rest
]
  ? Rest['length']
  : never

// 2
type Sub_5_3 = Sub<5, 3>
// 0
type Sub_9_9 = Sub<9, 9>
// never
type Sub_4_9 = Sub<4, 9>

// 乘法 Multiply
// 类 bf 的循环
type Mul<N1 extends number, N2 extends number, Res extends unknown[] = []> = N2 extends 0
  ? Res['length']
  : Mul<N1, Sub<N2, 1>, [...Res, ...BuildArray<N1>]>

// 15
// 5 * 3 = 5 + 5 + 5
type Mul_5_3 = Mul<5, 3>
// 0
type Mul_4_0 = Mul<4, 0>

// 除法 Divide
// 乘法是递归的累加，那除法不就是递归的累减么？
// 所以，除法的实现就是被减数不断减去减数，直到减为 0，记录减了几次就是结果。不考虑余数
// 减一次记录一次
// 减法 never，0 为除数无限递归
type Div<N1 extends number, N2 extends number, Cnt extends unknown[] = []> = N2 extends 0
  ? never
  : N1 extends 0
  ? Cnt['length']
  : Div<Sub<N1, N2>, N2, [...Cnt, unknown]>

// 无法整除 never，须考虑 N1 < N2
type Div_5_3 = Div<5, 3>
// 2
type Div_4_2 = Div<4, 2>
// never
type Div_4_0 = Div<4, 0>

// TODO: 取余 Modulo

// 字符串长度
type StrLen<S extends string, Res extends unknown[] = []> = S extends `${infer First}${infer Rest}`
  ? StrLen<Rest, [...Res, First]>
  : Res['length']

// 5
type StrLen_hello = StrLen<'hello'>
// 5
type StrLen_world = StrLen<'world'>

// GreaterThan 大于
// N1 比较一次，count 加 1, count === n2 时结束，表示 N1 > N2 === count === 3, count === n1 时结束，表示 N1 < N2
type GreaterThan<N1 extends number, N2 extends number, Cnt extends unknown[] = []> = N1 extends N2
  ? false
  : Cnt['length'] extends N2
  ? true
  : Cnt['length'] extends N1
  ? false
  : GreaterThan<N1, N2, [...Cnt, unknown]>

type GreaterThan_5_3 = GreaterThan<5, 3>
type GreaterThan_5_6 = GreaterThan<5, 6>

// TODO: Fibonacci 斐波纳契 尾递归
