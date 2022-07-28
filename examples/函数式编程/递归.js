// 程序员以可读性为优先，让编译器想办法优化性能
// JS 是个需要学习“历史”的语言

const arr = [1, 2, 3]

// forEach(array, item => console.log(item))
const each = (arr, fn) => {
  if (arr.length === 0) return
  fn(arr[0])
  each(arr.slice(1), fn)
}

each(arr, item => console.log(item))

// 字符串反转
const str = 'hello world'

const reserve = str => {
  if (str.length === 0) return ''
  return reserve(str.slice(1)) + str[0]
}

console.log(reserve(str))
