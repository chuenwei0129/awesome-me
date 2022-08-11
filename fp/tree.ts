class Tree {
  constructor(public val: number | null = null, public children: Tree[] | null = null) {}
}

const bst = new Tree(5, [
  new Tree(3, [new Tree(0), new Tree(4)]),
  new Tree(6, [new Tree(), new Tree(8)])
])

console.dir(bst, { depth: 10 })

const transverse = (tree: Tree) => {
  console.log(tree.val)
  tree.children?.forEach(transverse)
}

transverse(bst)
