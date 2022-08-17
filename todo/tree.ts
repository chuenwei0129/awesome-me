// 本质是对 DOM 树的操作

// 树 val 定义 null 是为了区分左右节点，不需要区分节点可以忽略
class Tree {
  constructor(public val: number, public children: Tree[] | null = null) {}
}

const bst = new Tree(5, [
  new Tree(3, [new Tree(0), new Tree(4)]),
  new Tree(6, [new Tree(1), new Tree(8)])
])

// console.dir(bst, { depth: 10 })

const preOrder = (tree: Tree) => {
  // 过滤 null
  tree.val !== null && console.log(tree.val)
  tree.children?.forEach(preOrder)
}

const postOrder = (tree: Tree) => {
  tree.children?.forEach(postOrder)
  tree.val !== null && console.log(tree.val)
}

// preOrder(bst)
// postOrder(bst)

// 遍历通用模板
// 适用于多叉数
// ord = 0 先序
// ord >= 子节点个数 后序
// 其他 = 中序
const traverse_1 = (tree: Tree, ord = 3) => {
  let traversed = false
  // 叶子节点
  if (!tree.children) {
    console.log(tree.val)
    return
  }
  tree.children?.forEach((child, i) => {
    if (i === ord) {
      traversed = true
      console.log(tree.val)
    }
    traverse_1(child, ord)
  })
  !traversed && console.log(tree.val)
}

traverse_1(bst)

const traverse_2 = (tree: Tree, cb: (tree_val: number | null) => void, ord = 0) => {
  let traversed = false
  // 叶子节点
  if (!tree.children) {
    cb(tree.val)
    return
  }
  tree.children?.forEach((child, i) => {
    if (i === ord) {
      traversed = true
      cb(tree.val)
    }
    traverse_2(child, cb, ord)
  })
  !traversed && cb(tree.val)
}

traverse_2(bst, tree_val => console.log(tree_val))

// generator 模板
function* traverse(tree: Tree, ord = 0): Generator<Tree> {
  let traversed = false
  if (!tree.children) {
    yield tree
    return
  }
  // yield 不适用于 forEach
  for (let i = 0; i < tree.children.length; i++) {
    if (i === ord) {
      traversed = true
      yield tree
    }
    yield* traverse(tree.children[i], ord)
  }
  !traversed && (yield tree)
}

// 使用
// for of 遍历 或者 [...]
;[...traverse(bst)].map(node => node.val).forEach(v => console.log(v))

// 树的查找
const treeFind = (tree: Tree, predication: (node: Tree) => boolean) => {
  return [...traverse(tree)].find(predication)
}

console.log(treeFind(bst, node => node.val === 3))
// Tree {
//   val: 3,
//   children: [ Tree { val: 0, children: null }, Tree { val: 4, children: null } ]
// }

// 树的路径
// 不考虑先后序
// path 路径表示
//    5 []
//  3    6 [0, 1]
// 0 4  1 8 [0, 1] [0, 1]
// 4: [0, 1]
function* treeTraverse(tree: Tree, path: number[] = []): Generator {
  yield { tree, path }
  if (tree.children) {
    for (let i = 0; i < tree.children.length; i++) {
      yield* treeTraverse(tree.children[i], [...path, i])
    }
  }
}

console.log([...treeTraverse(bst)])

// 反查树
const findByPath = (tree: Tree, path: number[]): Tree => {
  return path.length === 0 ? tree : findByPath(tree.children![path[0]], path.slice(1))
}

console.log(findByPath(bst, [1, 0]))

// select([1, '>5']) => [6, 8]
// 语义：从节点 6 开始往下筛选 [1]
// path = [{child: 1}, {op: node => node.val > 5}]
// @ts-ignore
const select = (tree: Tree, operators: any) => {
  if (operators.length === 0) return [tree]
  const op = operators.shift()
  if (op.position) {
    return select(tree.children![op.position], [...operators])
  } else if (op.predication) {
    return [...traverse(tree)].filter(op.predication).map(node => node.val)
  }
}

console.log(select(bst, [{ position: 1 }, { predication: (node: Tree) => node.val < 100 }])) // [6, 1, 8]

// parse
const parse = (expr: string) => {
  return expr.split(' ').map(char => {
    if (char.match(/^\d+$/)) {
      return { position: parseInt(char) }
    } else {
      return {
        predication: eval(`(node) => node.val ${char.replace(/[\[\]]/g, '')}`)
      }
    }
  })
}

console.log(select(bst, parse('1 [<5]'))) // [1]
