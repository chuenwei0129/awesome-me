// 高频时间触发，但 n 秒内只会执行最后一次，所以节流会稀释函数的执行频率。类似于技能冷却时间
// 时序图分析
// 1-2-3-4-5---300ms---6-7-8-9-10---300ms---
// --------5----fn-----6-7-8-9-10----fn----

function throttle(fn: (...args: unknown[]) => void, delay = 300) {
  let isLocked = false
  let timer: any
  return (...args: unknown[]) => {
    // 第一次未锁，如果锁住直接返回
    if (isLocked) return
    // 第一次立即执行
    if (timer) clearTimeout(timer)
    fn(...args)
    // 锁住
    isLocked = true
    timer = setTimeout(() => {
      // 每 300 ms 生成一个新的定时器
      isLocked = false
    }, delay)
  }
}

const fn = throttle(() => console.log('fn'))
fn()
fn()
fn()
fn()

setTimeout(() => {
  fn()
}, 2000)
