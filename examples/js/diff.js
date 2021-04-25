const oldNodes = [
  {node: 'li', key: 'A', value: 'A', mountIdx: 0},
  {node: 'li', key: 'B', value: 'B', mountIdx: 1},
  {node: 'li', key: 'C', value: 'C', mountIdx: 2},
  {node: 'li', key: 'D', value: 'D', mountIdx: 3}, 
]

const newNodes = [
  {node: 'li', key: 'A', value: 'A1'},
  {node: 'li', key: 'C', value: 'C1'},
  {node: 'li', key: 'B', value: 'B1'},
  {node: 'li', key: 'E', value: 'E1'}, 
  {node: 'li', key: 'F', value: 'F1'}, 
]

const oldNodesMap = oldNodes.reduce((map, cur) => {
  map[cur['key']] = cur
  return map
}, {})

let diffQueue = []

let lastIndex = 0

newNodes.forEach((item, idx) => {
  if (item.key in oldNodesMap) {
    console.log('当前可复用的节点', oldNodesMap[item.key]);
  } else 
})

