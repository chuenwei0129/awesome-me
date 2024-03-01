// 时序图
// 1---2---3---4
// ------------| 300ms
// 1 创建一次延迟，2 删除上一次，创建一次新的延迟
// 类似于火球术需要 3 秒吟唱，被打断就需要重新开始吟唱 3 秒

const debounce = (fn: (...args: unknown[]) => void, delay = 300, timer?: number) => {
  // timer 通过闭包保存，下一次进来会清除上一次创建的 timer
  // 所以保证了 300 ms 內只执行一次
  return (...args: unknown[]) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}
