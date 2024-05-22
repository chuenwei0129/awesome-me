const throttle = (fn, delay) => {
  let lastTime = 0
  return (...args) => {
    const nowTime = Date.now()
    if (nowTime - lastTime > delay) {
      fn(...args)
      lastTime = nowTime
    }
  }
}
