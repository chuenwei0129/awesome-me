const arr = [0, 1, 2, 3]

// 遇到 [], {}, acc可以用 ... 处理

const _arr = arr.reduce<number[]>((acc, cur) => [...acc, cur], [])

// map
console.log(_arr)

// filter
console.log(arr.reduce((acc, cur) => (cur > 1 ? [...acc, cur] : acc), []))

// map + filter
console.log(arr.reduce((acc, cur) => (cur * 2 > 2 ? [...acc, cur * 2] : acc), []))
