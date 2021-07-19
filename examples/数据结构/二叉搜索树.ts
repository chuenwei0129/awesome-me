class TreeNode {
  public left: null | TreeNode
  public right: null | TreeNode
  constructor(public value: any) {
    this.left = null
    this.right = null
  }
}

class Tree {
  private _root: any
  constructor() {
    this._root = null
  }

  private _insert(node: TreeNode, newNode: TreeNode) {
    if (newNode.value > node.value) {
      // 右子树
      if (node.right === null) {
        node.right = newNode
      } else {
        this._insert(node.right, newNode)
      }
    } else if (newNode.value < node.value) {
      // 右子树
      if (node.left === null) {
        node.left = newNode
      } else {
        this._insert(node.left, newNode)
      }
    }
  }

  // 递归
  private _traverse(node: TreeNode, callback: (value: any) => void) {
    if (node === null) return
    // callback 的执行顺序决定遍历顺序
    callback(node.value)
    this._traverse(node.left, callback)
    this._traverse(node.right, callback)
  }

  // 层序遍历
  private _levelOrderTraverse(node: TreeNode, callback: (value: any) => void) {
    // 队列
    const q = [node]
    while (q.length > 0) {
      node = q.shift()
      callback(node.value)
      node.left && q.push(node.left)
      node.right && q.push(node.right)
    }
  }

  // 循环
  private _search(node: TreeNode, value: any) {
    let isFound = false
    while (!isFound && node) {
      if (value > node.value) {
        node = node.right
      } else if (value < node.value) {
        node = node.left
      } else {
        isFound = true
      }
    }

    return isFound
  }

  private _getMin(node: TreeNode) {
    while (node && node.left) {
      node = node.left
    }
    return node?.value ?? null
  }

  private _getMax(node: TreeNode) {
    while (node && node.right) {
      node = node.right
    }
    return node?.value ?? null
  }

  private _remove(node: TreeNode, value: any) {
    if (node === null) return null
    if (value < node.value) {
      // 递归找到删除的节点进行操作，我的理解：找到需要删除的value 对应的节点做占位改变 返回 node表示不是删除节点不做改变
      // node.left 应该是替换成 删除这个过程，所以需要返回node本身，删除是个行为
      node.left = this._remove(node.left, value)
      return node
    } else if (value > node.value) {
      node.right = this._remove(node.right, value)
      return node
    } else {
      // 删除节点，三种情况，叶子节点，单一子节点，双子节点
      if (node.left === null && node.right === null) {
        // 没有子节点的节点 => 直接将需删除的节点置为null
        node = null
        return node
      } else if (node.left === null && node.right) {
        node = node.right
        return node
      } else if (node.right === null && node.left) {
        //删除只有左节点的节点 => 将左节点替换需删除节点
        node = node.left
        return node
      } else {
        // 找到右侧最小值节点的值
        const minRightNodeValue = this._getMin(node.right)
        // 最小值节点的值 赋给 被删除点的值，即完成替换
        node.value = minRightNodeValue
        // 替换后删除最小值节点
        // 不删除节点，替换节点的值，然后删除最小节点即可
        node.right = this._remove(node.right, minRightNodeValue)
        return node
      }
    }
  }

  getRoot() {
    return this._root
  }

  insert(value: any) {
    const newNode = new TreeNode(value)
    if (this._root === null) {
      this._root = newNode
    } else {
      this._insert(this._root, newNode)
    }
  }

  traverse(callback: (value: any) => void) {
    this._traverse(this._root, callback)
  }

  levelOrderTraverse(callback: (value: any) => void) {
    this._levelOrderTraverse(this._root, callback)
  }

  remove(value) {
    this._remove(this._root, value)
  }

  search(value) {
    return this._search(this._root, value)
  }

  getMax() {
    return this._getMax(this._root)
  }

  getMin() {
    return this._getMin(this._root)
  }
}

const t = new Tree()

console.log(t.getMax())
console.log(t.getMin())

t.insert(11)
t.insert(8)
t.insert(16)
t.insert(4)
t.insert(9)
t.insert(13)
t.insert(17)
t.insert(3)
t.insert(5)

console.dir(t.getRoot(), { depth: 100 })

// 前序遍历 中 左子树 右子树
// 中序遍历 左子树 中 右子树
// 后序遍历 左子树 右子树 中

const printValue = (value: any) => {
  console.log(`value= `, value)
}

t.traverse(printValue)
t.levelOrderTraverse(printValue)

console.log(t.search(3))
console.log(t.search(1))

console.log(t.getMax())
console.log(t.getMin())

// t.remove(13)

// t.remove(13)
// t.remove(16)

t.remove(8)

console.dir(t.getRoot(), { depth: 100 })
