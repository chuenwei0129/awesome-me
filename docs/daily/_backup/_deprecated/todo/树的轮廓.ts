class BTree {
  constructor(public val: number, public children: BTree[]) {}
}

const bt = new BTree(1, [
  new BTree(5, [new BTree(4, []), new BTree(2, [])]),
  new BTree(9, [new BTree(7, []), new BTree(3, [new BTree(0, []), new BTree(8, [])])])
])

console.dir(bt, { depth: 10 })

const getOutLineFromBTree = (tree: BTree, depth = 0, outline: number[] = []) => {
  // 每层第一项，0 代表空位，过滤 0
  outline[depth] = outline[depth] || tree.val
  tree.children.length !== 0 && getOutLineFromBTree(tree.children[0], depth + 1, outline)
  tree.children.length !== 0 && getOutLineFromBTree(tree.children[1], depth + 1, outline)
  return outline
}

console.log(getOutLineFromBTree(bt))

const getMaxValueFromBTree = (tree: BTree, depth = 0, max: number[] = []) => {
  // 最大值
  max[depth] = Math.max(max[depth] || -1, tree.val)
  tree.children.length !== 0 && getMaxValueFromBTree(tree.children[0], depth + 1, max)
  tree.children.length !== 0 && getMaxValueFromBTree(tree.children[1], depth + 1, max)
  return max
}

console.log(getMaxValueFromBTree(bt))
