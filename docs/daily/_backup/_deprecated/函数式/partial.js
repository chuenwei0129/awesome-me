const f = (a, b, c) => a + b + c
const g = f.bind(null, 1, 2)

console.log(g(3)) // 6

const partial =
  (f, ...fixedArgs) =>
  (...args) =>
    f(...args, ...fixedArgs)

const add = partial(f, 1, 2)

console.log(add(3)) // 6
