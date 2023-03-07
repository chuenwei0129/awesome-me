import { stack } from './Stack'

const s = stack<number>()

s.push(1)
s.push(2)
s.push(3)
s.push(4)

console.log(s.size) // 4
console.log(s.peek) // 4
console.log(s.isEmpty) // false
console.log(s.items) // [1, 2, 3, 4]

console.log(s.pop()) // 4
console.log(s.pop()) // 3

console.log(s.items) // [1, 2]
console.log(s.size) // 2
console.log(s.peek) // 2
console.log(s.isEmpty) // false

s.clear()
console.log(s.items) // []
console.log(s.size) // 0
console.log(s.peek) // undefined
console.log(s.isEmpty) // true
