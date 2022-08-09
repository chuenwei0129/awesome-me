// 高频时间触发，但 n 秒内只会执行最后一次，所以节流会稀释函数的执行频率。类似于技能冷却时间
// 时序图分析
// 1-2-3-4-5---300ms---6-7-8-9-10---300ms---
// --------5----fn-----6-7-8-9-10----fn----

function throttle(fn: (...args: unknown[]) => void, delay = 300) {
  let isLocked = false
  return (...args: unknown[]) => {
    // 第一次未锁，如果锁住直接返回
    if (isLocked) return
    // 第一次立即执行
    fn(...args)
    // 锁住
    isLocked = true
    setTimeout(() => {
      // 每 300 ms 生成一个新的定时器
      isLocked = false
    }, delay)
  }
}

// 重要
// setTimeout：触发一次后，就停止了，无需手动 clear。当然你可以在它触发前 clear 它，这样它一次都不会触发了。
// 所以，需要还是不需要，不是绝对的，要看你的使用场景。如果你在某种情况下，在计时器触发前需要终止它，那就需要，否则就不需要。
