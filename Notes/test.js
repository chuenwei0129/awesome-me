const time = +new Date()
const interval = 16
const mod = time % interval // 余数就会在 16 之间，时间戳特性

console.log(mod) // 1
