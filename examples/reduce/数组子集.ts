const arr = [1, 2, 3, 4, 5, 6]

const _arr = arr.reduce(
  (acc, cur) => {
    return [...acc, ...acc.map(item => [...item, cur])]
  },
  [[]]
)

console.log(_arr)
