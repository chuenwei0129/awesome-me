const arr = [0, 1, 2, 3]

// 代替map：[0, 2, 4, 6]
const a = arr.map(v => v * 2)
const b = arr.reduce((t, v) => [...t, v * 2], [])

// 代替filter：[2, 3]
const c = arr.filter(v => v > 1)
const d = arr.reduce((t, v) => (v > 1 ? [...t, v] : t), [])

// 代替map和filter：[4, 6]
const e = arr.map(v => v * 2).filter(v => v > 2)
const f = arr.reduce((t, v) => (v * 2 > 2 ? [...t, v * 2] : t), [])
