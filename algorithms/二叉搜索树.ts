import { BinarySearchTree } from './data-structure/BinarySearchTree'

// 构造树
const bst = new BinarySearchTree()

bst.insert(5)
bst.insert(3)
bst.insert(6)
bst.insert(0)
bst.insert(4)
bst.insert(8)

console.log('二叉树:', bst.root())
console.log('最大值:', bst.max())
console.log('最小值:', bst.min())

const callback = (val: number) => {
  console.log(val)
}

console.log('-- 前序遍历 --')
bst.preOrder(callback) // 5 3 0 4 6 8

console.log('-- 中序遍历 --')
bst.midOrder(callback) // 0 3 4 5 6 8

console.log('-- 后序遍历 --')
bst.postOrder(callback) // 0 4 3 8 6 5

console.log('-- 层序遍历 --')
bst.levelOrder(callback) // 5 3 6 0 4 8

console.log('查找 0', bst.search(0))
console.log('查找 10', bst.search(10))

// 删除节点测试
const listToTree = (list: number[]) => {
  const bst = new BinarySearchTree()
  list.forEach(item => bst.insert(item))
  return bst
}

const tree = listToTree([41, 20, 65, 11, 29, 50, 91, 28, 32, 72])

// 删除前
console.dir(tree.root(), { depth: 10 })
// 要删除的节点有左、右孩子节点
tree.remove(20)

// 删除前
console.dir(tree.root(), { depth: 10 })
// 要删除的节点有左孩子节点
tree.remove(29)

// 删除前
console.dir(tree.root(), { depth: 10 })
// 要删除的节点有右孩子节点
tree.remove(91)
// 删除后
console.dir(tree.root(), { depth: 10 })

// 要删除的节点无孩子节点是叶子节点
tree.remove(11)
// 删除后
console.dir(tree.root(), { depth: 10 })

// 要删除的节点不在二叉树中
tree.remove(100)
// 删除后
console.dir(tree.root(), { depth: 10 })
