export class TreeNode {
  public left: null | TreeNode
  public right: null | TreeNode
  constructor(public value: number) {
    this.left = null
    this.right = null
  }
}

export class BinarySearchTree {
  private _root: TreeNode | null
  constructor() {
    this._root = null
  }

  // 从 rootNode 开始递归插入，左小右大
  private _insert(currNode: TreeNode, insertNode: TreeNode) {
    // 同当前节点比较，大于当前节点插入右子树
    if (insertNode.value > currNode.value) {
      // 当前右子树已经有节点了，递归插入
      if (currNode.right !== null) {
        this._insert(currNode.right, insertNode)
      } else {
        currNode.right = insertNode
      }
    } else if (insertNode.value < currNode.value) {
      if (currNode.left === null) {
        currNode.left = insertNode
      } else {
        this._insert(currNode.left, insertNode)
      }
    }
  }

  // 递归
  private _traverse(
    currNode: TreeNode | null,
    callback: (value: number) => void,
    order: 'pre' | 'mid' | 'post'
  ) {
    if (currNode === null) return

    // 前序：中左右
    // 函数调用栈决定遍历顺序
    order === 'pre' && callback(currNode.value)
    this._traverse(currNode.left, callback, order)
    order === 'mid' && callback(currNode.value)
    this._traverse(currNode.right, callback, order)
    order === 'post' && callback(currNode.value)
  }

  // 层序遍历，执行顺序看调用栈与队列
  private _levelOrderTraverse(currNode: TreeNode, callback: (value: number) => void) {
    // 队列
    const q = [currNode]
    while (q.length > 0) {
      // q.shift() 一定非空
      currNode = q.shift() as TreeNode
      callback(currNode.value)
      currNode.left && q.push(currNode.left)
      currNode.right && q.push(currNode.right)
    }
  }

  // 搜索入口 rootNode，
  private _search(currNode: TreeNode | null, value: number) {
    // 标识是否找到
    let isFound = false
    // 循环查找 currNode === null 时跳出循环，标识找不到
    while (!isFound && currNode) {
      if (value > currNode.value) {
        currNode = currNode.right
      } else if (value < currNode.value) {
        currNode = currNode.left
      } else {
        isFound = true
      }
    }

    return isFound
  }

  // 只在 root = null 时 currNode === null
  private _getMin(currNode: TreeNode | null) {
    // currNode.left 来判断跳出循环
    while (currNode && currNode.left) {
      currNode = currNode.left
    }
    return currNode?.value ?? null
  }

  private _getMax(currNode: TreeNode) {
    // 先判断 _root === null 的情况
    while (currNode && currNode.right) {
      currNode = currNode.right
    }
    return currNode.value
  }

  // 删除是构造新树的过程
  private _remove(currNode: TreeNode | null, value: number) {
    // 这行代码有两个作用，一是处理空树
    // 二是做为递归终止条件
    if (currNode === null) return null
    if (value < currNode.value) {
      // 重新构建处理过删除的左子节点
      currNode.left = this._remove(currNode.left, value)
      // 把处理过删除的当前节点做为 _remove 的返回值
      // 这里是构建新树的除根的最上层
      return currNode
    } else if (value > currNode.value) {
      // 向右查找
      currNode.right = this._remove(currNode.right, value)
      return currNode
    } else {
      // 真正处理删除的地方
      // 叶子节点，删除叶子节点或者查找不到会走这
      if (currNode.left === null && currNode.right === null) {
        currNode = null
        return currNode
      } else if (currNode.left === null && currNode.right) {
        currNode = currNode.right
        return currNode
      } else if (currNode.right === null && currNode.left) {
        currNode = currNode.left
        return currNode
      } else {
        // 替换规则一句话总结：要替换为右侧子树的最小节点
        const minRightNodeVal = this._getMin(currNode.right)!
        currNode.value = minRightNodeVal
        currNode.right = this._remove(currNode.right, minRightNodeVal)
        return currNode
      }
    }
  }

  root() {
    return this._root
  }

  // 增
  insert(value: number) {
    const insertNode = new TreeNode(value)
    // 根节点不存在，空树初始化
    if (this._root === null) {
      this._root = insertNode
    } else {
      // 类型推断
      this._insert(this._root, insertNode)
    }
  }

  // 中序遍历
  midOrder(callback: (value: number) => void) {
    this._traverse(this._root, callback, 'mid')
  }

  preOrder(callback: (value: number) => void) {
    this._traverse(this._root, callback, 'pre')
  }

  postOrder(callback: (value: number) => void) {
    this._traverse(this._root, callback, 'post')
  }

  // 层序遍历
  levelOrder(callback: (value: number) => void) {
    if (this._root === null) return
    this._levelOrderTraverse(this._root, callback)
  }

  remove(value: number) {
    return this._remove(this._root, value)
  }

  search(value: number) {
    return this._search(this._root, value)
  }

  max() {
    if (this._root === null) return null
    return this._getMax(this._root)
  }

  min() {
    return this._getMin(this._root)
  }
}

export const listToTree = (list: number[]) => {
  const bst = new BinarySearchTree()
  list.forEach(item => bst.insert(item))
  return bst
}
