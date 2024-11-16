import { BinarySearchTree, TreeNode } from './data-structure/BinarySearchTree'

// 栗子: 求最大深度
const dfsTemplate = (root: TreeNode | null) => {
  // 存储结果
  let maxDepth = 0
  // 初始状态
  let initDepth = 0
  const dfs = (currNode: TreeNode | null, currDepth: number) => {
    if (currNode === null) {
      return
    }

    // 每次遍历都执行操作 currDepth
    currDepth++

    // 到达末尾叶子结点，进行最优结果更新
    if (currNode.left === null && currNode.right === null) {
      // update result
      if (currDepth > maxDepth) {
        maxDepth = currDepth
      }
    }

    dfs(currNode.left, currDepth)
    dfs(currNode.right, currDepth)
  }

  dfs(root, initDepth)

  return maxDepth
}

// 测试代码
const bst = new BinarySearchTree()

bst.insert(11)
bst.insert(8)
bst.insert(16)
bst.insert(4)
bst.insert(9)
bst.insert(13)
bst.insert(17)
bst.insert(3)
bst.insert(5)

console.log(dfsTemplate(bst.root()))
