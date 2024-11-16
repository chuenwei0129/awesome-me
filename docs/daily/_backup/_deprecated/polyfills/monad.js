// Identity 容器，保存值
const Identity = (v) => ({ val: v })
const chain = (m, fn) => fn(m.val)
const myAge = Identity(41)
const myNextAge = chain(myAge, (v) => Identity(v + 1)) // { val: 42 }

console.log(myNextAge)
