interface TreeNode {
  content: number
  children?: TreeNode[]
}

function travel(node: TreeNode): number {
  console.log(node.content)
  let i = 0
  let sum = node.content
  while (node.children && i < node.children.length) {
    sum += travel(node.children[i])
    i++
  }
  return sum
}

const node = {
  content: 1,
  children: [
    {
      content: 2,
      children: [
        {
          content: 3,
          children: [
            {
              content: 4,
              children: []
            }
          ]
        }
      ]
    }
  ]
}

travel(node)
