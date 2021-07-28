// 累加累乘
const accumulation = (...args: number[]) => args.reduce((acc, cur) => acc + cur, 0)

console.log(
  accumulation(1, 2, 3, 4, 5) // 15
)

const multiplication = (...args: number[]): number => {
  return args.reduce((acc, cur) => acc * cur, 1)
}

console.log(
  multiplication(1, 2, 3, 4, 5) // 120
)
