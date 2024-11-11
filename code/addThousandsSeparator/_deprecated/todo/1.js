const query = (list) => ({
  where: (fn) => query(list.filter(fn)),
  sortBy: (key) => query(list.sort((x, y) => x[key] - y[key])),
  groupBy: (key) =>
    query(
      list.reduce((acc, cur) => {
        const group = cur[key]
        if (!acc[group]) {
          acc[group] = new Set()
        }
        acc[group].add(cur)
        return acc
      }, {})
    ),
  execute: () => list,
})

const list = [
  { id: 2, name: 'aa', age: 20 },
  { id: 1, name: 'bb', age: 11 },
  { id: 6, name: 'cc', age: 25 },
  { id: 3, name: 'aa', age: 30 },
  { id: 5, name: 'ee', age: 19 },
]

const result = query(list)
  .where((item) => item.age > 18)
  .sortBy('id')
  .groupBy('name')
  .execute()

console.log(result)
