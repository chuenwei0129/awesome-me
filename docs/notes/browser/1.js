function startCountdown(duration, onTick, onComplete) {
  const endTime = Date.now() + duration

  function tick() {
    const remaining = endTime - Date.now()

    if (remaining <= 0) {
      // 倒计时结束
      clearInterval(timerId)
      onTick(0)
      onComplete()
    } else {
      // 更新显示剩余时间
      onTick(remaining)
    }
  }

  // 立即执行一次，以便倒计时立刻开始
  tick()

  // 然后每隔一段时间执行一次
  const timerId = setInterval(tick, 1000) // 这里的间隔可以根据需要调整
}

// 使用示例
startCountdown(
  5000,
  (remaining) => {
    console.log(`Remaining: ${Math.ceil(remaining / 1000)} seconds`)
  },
  () => {
    console.log('Countdown completed!')
  },
)
