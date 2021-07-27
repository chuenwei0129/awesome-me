let list = [
  { id: 3, name: '部门C', parentId: 1 },
  { id: 4, name: '部门D', parentId: 1 },
  { id: 5, name: '部门E', parentId: 2 },
  { id: 6, name: '部门F', parentId: 3 },
  { id: 1, name: '部门G', parentId: 2 },
  { id: 2, name: '部门H', parentId: 4 },
  { id: 7, name: '部门A', parentId: 0 },
  { id: 8, name: '部门B', parentId: 0 }
]

function convert(array) {
  let resultArray = array.filter(item => {
    let children = array.filter(child => {
      return item.id === child.parentId
    })
    item.children = children
    return item.parentId === 0
  })
  return resultArray
}
let res = convert(list)
console.dir(res, { depth: 10 })
