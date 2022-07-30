import { BinarySearchTree } from './data-structure/BinarySearchTree'

const t = new BinarySearchTree()

// console.log(t.min())

// t.insert(11)
// t.insert(8)
// t.insert(16)
// t.insert(4)
// t.insert(9)
// t.insert(13)
// t.insert(17)
// t.insert(3)
// t.insert(5)

//          11
//     8           16
//  4    9     13      17
// 3 5

// const printValue = (value: number) => {
//   console.log(`value= `, value)
// }

// 前序遍历 中 左子树 右子树
// 11 8 4 3 5 9 16 13 17
// 中序遍历 左子树 中 右子树
// 3 4 5 8 9 11 13 16 17
// 后序遍历 左子树 右子树 中
// 3 5 4 9 8 13 17 16 11
// t.traverse(printValue)

// 11 8 16 4 9 13 17 3 5
// t.levelOrderTraverse(printValue)

// console.log(t.search(3))
// console.log(t.search(1))

// console.log(t.min())
// console.log(t.max())

t.insert(8)
t.insert(2)
t.insert(3)
t.insert(9)

console.dir(t.remove(100), { depth: 100 })
