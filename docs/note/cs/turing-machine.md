---
title: 图灵机
order: -1
toc: content
group:
  title: 计算机原理
  order: -1
---

## [图灵机的解释](https://mp.weixin.qq.com/s/oKrsznBAumrNvz4_xtktXw)

![20240409120316](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/me/20240409120316.png)

## [什么是图灵完备？](https://www.zhihu.com/question/20115374/answer/288346717)

图灵机解决了几个问题：

1. **可计算性问题**。一个数是否是可计算的，称为可计算数。可计算数只是实数的一部分，大多数实数都是不可计算的。(通用计算机)
2. **可判定性问题**。是否存在通用的过程，判断某个公式是可以证明的。(停机问题)
3. **人类计算者与计算机等价**。通过图灵测试判定计算机的智能。(人工智能)

图灵完备：

> 在可计算性理论，如果一系列操作数据的规则 (如指令集、编程语言、细胞自动机) 可以用来模拟任何图灵机，那么它是图灵完备的。——— 维基百科

## 罗素悖论

理发师悖论由哲学家罗素在 1903 年提出，也称为罗素悖论。有一个理发师打广告，说：“我只给本城所有不给自己刮脸的人刮脸。”

问题是：理发师能不能给他自己刮脸呢？如果他不给自己刮脸，他就属于 “不给自己刮脸的人”；如果他给自己刮脸，他就属于 “给自己刮脸的人”，他就不该给自己刮脸。

在理发师悖论的基础上，罗素构建了一个 “集合” S：S 由一切不是自身元素的集合组成。然后，罗素问：S 是否属于 S 呢？根据排中律，一个元素或者属于某个集合，或者不属于某个集合。因此，对于一个给定的集合，某个元素或者属于该集合，或者不属于该集合。

但对罗素提出的这个 “集合” S 是否属于 S，却没有那么容易判断：如果 S 属于 S，根据 S 的定义，S 就不属于 S；反之，如果 S 不属于 S，同样根据定义，S 就属于 S。

## 停机问题

> [如何通俗地解释停机问题 (Halting Problem)？](https://www.zhihu.com/question/20081359/answer/275107187)

## 直观理解图灵完备 —— Brainfuck 语言

> brainfuck 有一个用处，一门新语言功能语法很复杂，要用数学证明的方式确定性说明它图灵完备会很麻烦，但只要用这门新语言实现一个 brainfuck 的解释器，那么就必然证明了是图灵完备的。

Brainfuck 的工作机制与图灵机高度一致。

首先它存储数据的方式是一个不限长的一维整数数组，里面的数值全部初始化为 0。此外，有一数据指针，每一时刻都指向数组的某一任意元素。指针可以向左/右移动，也可以读取/修改当前值。

语言里的 8 个有效字符分别是：

- `>` 指针向右移动一格
- `<` 指针向左移动一格
- `+` 使指针当前格数值加一
- `-` 使指针当前格数值减一
- `.` 把当前格数值按 ASCII 表输出到终端
- `,` 从终端接受一 byte 的数据，存储其 ASCII 数值到当前格
- `[` 当指针当前值为 `0` 时，程序跳转至与之对应的 `]` 之后；否则程序正常执行
- `]` 程序跳转回与之对应的 `[` 处

有了这些工具，我们可以很快做出一个计算乘法的程序。因为 ASCII 表中 ‘A’ 对应的值为 65，可以使用 `5 * 13` 算出 65 并输出得到字符 ‘A’。

```bf
+++++

[
>+++++++++++++
<-
]

>.
```

**👟 解释：**

把指针初始处的格子命名为 `cell 0`，`cell 0` 右边的那个格子命名为 `cell 1`。那么第一句将其递增 5 次变为 5。然后，循环执行 “右移指针，递增 13 次，左移指针，递减 1 次”。当 `cell 0` 的值最终被递减为 0 的时候，循环结束。此时 `cell 1` 的值执行了 5 次 “递增 13 次” 的操作，即 65。指针右移至 `cell 1`，输出此格子，则在终端会看到 ‘A’。

**🧱 JS 模拟实现：**

```js
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
`),
) // 'Hello'

console.log(brainFuck('>,[>,]<[.<]', 'Hello World!')) // '!dlroW olleH'
// 无限循环测试
brainFuck('+[>++]')
```

## 拓展阅读

> [为什么所有编程语言都是数据 + 指令？](https://www.bilibili.com/video/BV1Za411t7c6)
