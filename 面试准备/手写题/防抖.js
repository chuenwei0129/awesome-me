const debounce = (func, delay) => {
  return function (...args) {
    let timer = null
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
