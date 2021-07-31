let currentState = {
  p: {
    x: [2]
  }
}

// 哪些情况会一不小心修改原始对象？

// no.1
let o1 = currentState

o1.p = 1
console.log(o1)
// 'use strict' Cannot create property 'x' on number '1'
o1.p.x = 1
console.log(o1)
