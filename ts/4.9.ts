// https://www.zhihu.com/people/599-75-63/posts
//? satisfies 操作符

type Colors = 'red' | 'green' | 'blue'
type RGB = [number, number, number]

const palette = {
  red: [255, 0, 0],
  green: '#00ff00',
  blue: [0, 0, 255],
} satisfies Record<Colors, string | RGB>

// 推导得到的类型实际上是我们标注类型的子类型
// 抽象，具体，向上断言，向下断言，向上自动，向下类型守护

// in 约束
