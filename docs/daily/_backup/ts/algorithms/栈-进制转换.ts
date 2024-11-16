import { Stack } from '../deprecated/数据结构/栈'

const Decimal2Binary = (num: number): string => {
  const s = new Stack()

  // num 为 1 时是边界线 可以写个算式帮助理解
  while (num > 0) {
    s.push(num % 2)
    num = Math.floor(num / 2)
  }

  let ret = ''

  while (s.size() > 0) {
    ret += s.pop()
  }

  return ret
}

console.log(Decimal2Binary(10))
