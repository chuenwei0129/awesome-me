const list = [
  { id: 7, name: '部门A', pid: 0 },
  { id: 8, name: '部门B', pid: 0 },
  { id: 1, name: '部门G', pid: 2 },
  { id: 2, name: '部门H', pid: 4 },
  { id: 3, name: '部门C', pid: 7 },
  { id: 4, name: '部门D', pid: 1 },
  { id: 5, name: '部门E', pid: 2 },
  { id: 6, name: '部门F', pid: 3 }
]

// type Item = { id: number; name: string; pid: number }

// const listToTree = (list: Item[]) => {
//   const map = list.reduce((acc, cur) => ((acc[cur.id] = { ...cur, children: [] }), acc), {})

//   return list.reduce(
//     (acc, cur) => (
//       cur.pid === 0
//         ? acc.push(map[cur.id])
//         : map[cur.pid]
//         ? map[cur.pid].children.push(map[cur.id])
//         : (map[cur.pid] = { children: [] }),
//       acc
//     ),
//     []
//   )
// }

function listToTree(items) {
  const result = [] // 存放结果集
  const itemMap = {} //
  for (const item of items) {
    const id = item.id
    const pid = item.pid

    if (!itemMap[id]) {
      itemMap[id] = {
        children: []
      }
    }

    itemMap[id] = {
      ...item,
      children: itemMap[id]['children']
    }

    const treeItem = itemMap[id]

    if (pid === 0) {
      result.push(treeItem)
    } else {
      if (!itemMap[pid]) {
        itemMap[pid] = {
          children: []
        }
      }
      itemMap[pid].children.push(treeItem)
    }
  }
  return result
}

console.dir(listToTree(list), {
  depth: 10
})

// let ret = [
//   {
//     id: 1,
//     name: '部门1',
//     pid: 0,
//     children: [
//       {
//         id: 2,
//         name: '部门2',
//         pid: 1,
//         children: []
//       },
//       {
//         id: 3,
//         name: '部门3',
//         pid: 1,
//         children: [
//           // 结果 ,,,
//         ]
//       }
//     ]
//   }
// ]
