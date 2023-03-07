import { BinarySearchTree } from './BinarySearchTree'

const tree = new BinarySearchTree()

tree.insert(5)
tree.insert(3)
tree.insert(6)
tree.insert(0)
tree.insert(4)
tree.insert(8)

// ----------------- 最值 -----------------
console.log('-- 最值 --')
console.log('max:', tree.max) // 8
console.log('min:', tree.min) // 0

// ----------------- 遍历 -----------------
const callback = (val: number) => {
  console.log(val)
}

console.log('-- 前序遍历 --')
tree.preOrderTraverse(callback) // 5 3 0 4 6 8

console.log('-- 中序遍历 --')
tree.middleOrderTraverse(callback) // 0 3 4 5 6 8

console.log('-- 后序遍历 --')
tree.postOrderTraverse(callback) // 0 4 3 8 6 5

console.log('-- 层序遍历 --')
tree.layerOrderTraverse(callback) // 5 3 6 0 4 8

// ----------------- 查找 -----------------
console.log('-- 查找 --')
console.log('0 in tree?', tree.search(0))
console.log('10 in tree?', tree.search(10))

// ----------------- 删除 -----------------
console.log('-- 删除前  --')
console.dir(tree.root, { depth: 10 })
console.log('-- 删除有左右子节点的节点 3  --')
tree.remove(3)
console.dir(tree.root, { depth: 10 })

console.log('-- 删除只有右子节点的节点 6  --')
tree.remove(6)
console.dir(tree.root, { depth: 10 })

console.log('-- 删除叶子节点 8  --')
tree.remove(8)
console.dir(tree.root, { depth: 10 })

console.log('-- 要删除的节点不在树中  --')
tree.remove(100)
console.dir(tree.root, { depth: 10 })
