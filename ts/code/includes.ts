// 在类型系统中实现 JavaScript Array.includes 函数。 一个类型接受两个参数。 输出应该是布尔值 true 或 false。

// type Includes<T extends unknown[], U> = U extends T[number] ? true : false

type MyEqual<X, Y> = (<T>() => T extends X ? 0 : 1) extends <T>() => T extends Y ? 0 : 1
  ? true
  : false

type Includes<T extends readonly any[], U> = true extends {
  [I in keyof T]: MyEqual<T[I], U>
}[number]
  ? true
  : false

type isPillarMen = Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'a' | 'Kars'> // expected to be `false`
