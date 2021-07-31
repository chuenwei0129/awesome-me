// 使用时间戳特点
// 目的是计算时间戳是否在某一天的某个区间，所以可以采用对时间戳取余数的方法进行对比。
// 我们知道一天的时间是24 * 60 * 60，则对应的时间戳对其取余则是在这一天的某一时刻。
// 当天的时间00:00:00~23:59:59对应的时间戳为0~86399，则余数也应该在这个范围。

// |---16---|---16---|---16---|
// |---16---|---moment---|---16---|
// |---16---|---moment--(16-moment)-|---16---|

// 测试代码
// let counter = 0
// const click = throttle(() => {
//   console.log(`click`, counter)
// })

// const I = setInterval(() => {
//   if (counter++ === 1000) {
//     clearInterval(I)
//   }
//   click()
// }, 1)

// 测试
// const minus = (x: number) => x - 1
// const addStr = (a: number) => a + '@str'

// console.log(combine(addStr, minus)(12))

// 区间映射是动画基础
// console.log(interpolation([0, 1], [100, 1100])(0.25))

type ThrottleFN = (...args: any[]) => void

const throttle = (fn: ThrottleFN, interval = 16) => {
  let isThrottle = true
  return (...args: any[]) => {
    if (!isThrottle) {
      return
    }
    fn(...args)
    isThrottle = false
    const moment = new Date().getTime() % interval
    setTimeout(() => {
      isThrottle = true
    }, interval - moment)
  }
}

// 科利华的存在，可以不带考虑多参数
type CombineFN<A, B> = (input: A) => B

const combine = <A, B, C>(leftFn: CombineFN<B, C>, rightFn: CombineFN<A, B>) => {
  return (input: A) => {
    return leftFn(rightFn(input))
  }
}

type AnimateRange = [number, number]

const interpolation = (rangeA: AnimateRange, rangeB: AnimateRange) => {
  const LA = rangeA[1] - rangeA[0]
  const LB = rangeB[1] - rangeB[0]

  // [0, 1] => [xxx, yyy]
  // input === number (- [0, 1]
  return (input: number) => {
    if (input > rangeA[1]) return rangeB[1]
    if (input < rangeA[0]) return rangeB[0]

    // 比例尺
    const radio = (input - rangeA[0]) / LA
    return Math.round(radio * LB + rangeB[0])
  }
}

// class Animation {
//   static of() {}
// }
