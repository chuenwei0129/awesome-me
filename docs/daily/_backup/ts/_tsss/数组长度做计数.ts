// TypeScript 类型系统中没有加减乘除运算符，但是可以通过构造不同的数组然后取 length 的方式来完成数值计算，把数值的加减乘除转化为对数组的提取和构造。
// 把加法转换为了数组构造，把减法转换为了数组提取

type arr_of<
  N extends number,
  Result extends unknown[] = []
> = Result['length'] extends N ? Result : arr_of<N, [unknown, ...Result]>

type add<A extends number, B extends number> = [
  ...arr_of<A>,
  ...arr_of<B>
]['length']

type test_add = add<1, 2> // expected 3

type minus<X extends number, Y extends number> = arr_of<X> extends [
  ...arr_of<Y>,
  ...infer Rest
]
  ? Rest['length']
  : never

type test_minus = minus<3, 1> // 1

// 乘法
// 1 乘以 5 就相当于 1 + 1 + 1 + 1 + 1，也就是说乘法就是多个加法结果的累加。
// 那么我们在加法的基础上，多加一个参数来传递中间结果的数组，算完之后再取一次 length 就能实现乘法：
type multi<
  X extends number,
  Y extends number,
  Result extends unknown[] = []
> = X extends 0
  ? Result['length']
  : multi<minus<X, 1>, Y, [...arr_of<Y>, ...Result]>

type test_multi = multi<3, 5>

// 除法
// 所以，除法的实现就是被减数不断减去减数，直到减为 0，记录减了几次就是结果。
type divide<
  X extends number,
  Y extends number,
  Result extends unknown[] = []
> = X extends 0
  ? Result['length']
  : divide<minus<X, Y>, Y, [...Result, unknown]>

type type_divide = divide<6, 3> // 3

// 数值的比较
// 我们往一个数组类型中不断放入元素取长度，如果先到了 A，那就是 B 大，否则是 A 大
type greater_than<
  X extends number,
  Y extends number,
  Count extends unknown[] = []
> = X extends Y
  ? false
  : Count['length'] extends Y
  ? true
  : Count['length'] extends X
  ? false
  : greater_than<X, Y, [...Count, unknown]>

type type_greater_than1 = greater_than<6, 6> // false
type type_greater_than2 = greater_than<3, 6> // false
type type_greater_than3 = greater_than<6, 3> // true
