const map = new Map()
const tmp = { a: 1 }

map.set(tmp, { a: 2 })

console.log(map.get(tmp))
