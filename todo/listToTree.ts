let arr = [
  { id: 11, name: '公司1', pid: 0 },
  { id: 1, name: '部门1', pid: 0 },
  { id: 2, name: '部门2', pid: 1 },
  { id: 3, name: '部门3', pid: 1 },
  { id: 4, name: '部门4', pid: 3 },
  { id: 5, name: '部门5', pid: 4 }
]

type Item = {
  id: number
  name: string
  pid: number
}

type Tree = {
  children: Tree[]
} & Item

// 思路：先 filter 出 root，再根据 id 递归 filter 出 pid === id 的子节点
const listToTree = (list: Item[], pid: number): Tree[] => {
  return list
    .filter(item => item.pid === pid)
    .map(item => ({
      ...item,
      children: listToTree(list, item.id)
    }))
}

console.dir(listToTree(arr, 0), { depth: 10 })

// 可能不止一个 pid === 0
const list2Tree = (list: Item[]) => {
  const treeGroup: Tree[] = []
  // 缓存插入的父节点
  const cache = new Map<Item['id'], Tree>()
  list.forEach(item => {
    const currNode = { ...item, children: [] }
    if (!cache.has(item.pid)) {
      // 缓存 root Node
      cache.set(item.id, currNode)
      treeGroup.push(currNode)
    } else {
      // 插入父节点
      cache.get(item.pid)?.children.push(currNode)
      cache.set(item.id, currNode)
    }
  })

  return treeGroup
}

console.dir(list2Tree(arr), { depth: 10 })
