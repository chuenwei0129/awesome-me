const brainFuck = (code, input) => {
  // brainfuck 的计算模型官方说法格子数目限制为 3000
  const memo = Array.from({ length: 10 }, () => 0)
  const opts = code.split('')
  const chars = input?.split('')

  // 如果当前指针指向的数据带值为 0，则跳到与之匹配的 ']'
  const loopStart = () => {
    // 不满足条件什么都不做
    if (~~memo[memoIdx] === 0) {
      let cnt = 1

      while (cnt) {
        codeIdx++
        // 嵌套
        if (opts[codeIdx] === '[') {
          cnt++
        }
        if (opts[codeIdx] === ']') {
          // 结束循环
          cnt--
        }
      }
    }
  }

  // 如果当前指针指向的数据带值不为 0，则跳到与之匹配的 '['
  const loopEnd = () => {
    if (~~memo[memoIdx] !== 0) {
      let cnt = 1

      while (cnt) {
        codeIdx--
        if (opts[codeIdx] === ']') {
          cnt++
        }
        if (opts[codeIdx] === '[') {
          cnt--
        }
      }
    }
  }

  // 数据带指针
  let memoIdx = 0
  // 循环计数
  let codeIdx = 0
  let output = ''

  while (codeIdx < opts.length) {
    // memo 溢出
    if (memoIdx > 3000) {
      throw new Error('range error')
    }
    switch (opts[codeIdx]) {
      case '>':
        memoIdx++
        break
      case '<':
        memoIdx--
        break
      case '+':
        // ~~undefined === 0
        // 255 + 1 = 256 % 256 === 0
        memo[memoIdx] = (~~memo[memoIdx] + 1) % 256
        break
      case '-':
        // '-' : 0 || 256 = 255
        // '--': 255 - 1 = 254
        memo[memoIdx] = (~~memo[memoIdx] || 256) - 1
        break
      // 获取键盘输入的字节流，写入当前数据指针指向的数据带
      case ',':
        const iptChar = chars?.shift()
        // 'H'.codePointAt(0) === 72
        memo[memoIdx] = iptChar ? iptChar.codePointAt(0) : memo[memoIdx]
        break
      case '.':
        // 从 Unicode 码表中取出对应的字符
        output += String.fromCodePoint(memo[memoIdx])
        break
      case '[':
        loopStart()
        break
      case ']':
        loopEnd()
        break
      default:
        break
    }

    codeIdx++
  }

  console.log(memo)

  return output
}

console.log(brainFuck('++[>++[>++<-]<-]'))

console.log(brainFuck('+++')) // memo: [ 3, 0, 0, 0, 0 ]
console.log(brainFuck('--')) // memo: [ 254, 0, 0, 0, 0 ]
console.log(brainFuck(',.>,.>,.', 'CHU')) // 'CHU'
// 逻辑：'['(不满足条件) -> '>+++<-' -> ']' -> '[' -> '>+++<-' -> ']' -> '[' -> ']'(不满足条件)
// 循环套路，+++ 第一个格子存储的是循环次数，无计数 +，或者 , 输入，不会进入循环，无 '-'，无限循环 '+[>++]'
console.log(brainFuck('+++[>+++>+++++++>+++++<<<-].'))

// 'H' === 72
// 'e' === 101
// 'l' === 108
// 'l' === 108
// 'o' === 111
// 108 复用 101 格子

console.log(
  brainFuck(`
  ++++++++++
  [
  >+++++++
  >++++++++++
  <<-
  ]
  >++.
  >+.
  +++++++.
  .
  +++.
`)
) // 'Hello'

console.log(brainFuck('>,[>,]<[.<]', 'Hello World!')) // '!dlroW olleH'

// 无限循环测试
brainFuck('+[>++]')
