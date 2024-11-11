class Node {
  public left: null | Node = null
  public right: null | Node = null
  constructor(public value: number) {}
}

export class BinarySearchTree {
  private _root: Node | null = null

  // 从 root 开始插入，左子树小于等于当前节点，右子树大于当前节点，递归插入
  private _insert(currNode: Node, newNode: Node) {
    // 向左插入
    if (newNode.value < currNode.value) {
      currNode.left === null
        ? (currNode.left = newNode)
        : this._insert(currNode.left, newNode)
    } else if (newNode.value > currNode.value) {
      // 右子树为空，直接插入
      currNode.right === null
        ? (currNode.right = newNode)
        : this._insert(currNode.right, newNode)
    }
  }

  private _search(currNode: Node | null, value: number) {
    let isFound = false
    // currNode 为 null 时跳出循环
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

  // 遍历
  private _traverse(
    currNode: Node | null,
    callback: (value: number) => void,
    order: 'pre' | 'middle' | 'post'
  ) {
    if (currNode === null) return
    // 每个节点都会执行 callback
    // 执行顺序看调用栈
    if (order === 'pre') callback(currNode.value)
    this._traverse(currNode.left, callback, order)
    if (order === 'middle') callback(currNode.value)
    this._traverse(currNode.right, callback, order)
    if (order === 'post') callback(currNode.value)
  }

  // 层序遍历，执行顺序看调用栈与队列
  private _layerTraverse(currNode: Node, callback: (value: number) => void) {
    const queue = [currNode]
    while (queue.length > 0) {
      // queue.shift() 一定非空
      currNode = queue.shift()!
      callback(currNode.value)
      currNode.left && queue.push(currNode.left)
      currNode.right && queue.push(currNode.right)
    }
  }

  private _getMax(currNode: Node) {
    while (currNode.right) {
      currNode = currNode.right
    }
    return currNode.value
  }

  private _getMin(currNode: Node | null) {
    while (currNode?.left) {
      currNode = currNode.left
    }
    return currNode?.value ?? null
  }

  // 根
  get root() {
    return this._root
  }

  // 增
  insert(value: number) {
    const newNode = new Node(value)
    // 初始化根节点
    if (this._root === null) {
      this._root = newNode
    } else {
      this._insert(this._root, newNode)
    }
  }

  // 查
  search(value: number | null) {
    // 查找值为 null 时
    if (value === null) {
      if (this._root === null) return true
      else return false
    } else {
      return this._search(this._root, value)
    }
  }

  // 前序遍历：中左右递归
  preOrderTraverse(callback: (value: number) => void) {
    this._traverse(this._root, callback, 'pre')
  }

  // 中序遍历：左中右递归
  middleOrderTraverse(callback: (value: number) => void) {
    this._traverse(this._root, callback, 'middle')
  }

  // 后序遍历：左右中递归
  postOrderTraverse(callback: (value: number) => void) {
    this._traverse(this._root, callback, 'post')
  }

  // 层序遍历
  layerOrderTraverse(callback: (value: number) => void) {
    if (this._root === null) return
    this._layerTraverse(this._root, callback)
  }

  get max() {
    // 不把 null 放入 _getMax 中处理
    if (this._root === null) return null
    return this._getMax(this._root)
  }

  get min() {
    // 把 null 放入 _getMin 中处理
    return this._getMin(this._root)
  }

  remove(value: number) {
    return this._remove(this._root, value)
  }

  // 删除是构造新树的过程
  private _remove(currNode: Node | null, value: number) {
    if (currNode === null) return null
    // 先找到要删除的节点，再递归删除
    if (value < currNode.value) {
      currNode.left = this._remove(currNode.left, value)
      // 必须有返回值
      return currNode
    } else if (value > currNode.value) {
      currNode.right = this._remove(currNode.right, value)
      return currNode
    } else {
      // 找到要删除的节点
      // 1. 叶子节点
      if (currNode.left === null && currNode.right === null) {
        // 删除叶子节点，即将其父节点的指针置为 null
        currNode = null
        return currNode
      } else if (currNode.left === null && currNode.right) {
        // 2. 只有右子树，右子树直接替换
        currNode = currNode.right
        return currNode
      } else if (currNode.right === null && currNode.left) {
        // 3. 只有左子树，左子树直接替换
        currNode = currNode.left
        return currNode
      } else {
        // 4. 有左右子树
        // 规则一句话总结：要替换为其右侧子树的最小节点的值
        // this._getMin 只有根节点为空时才会返回 null
        const minRightNodeValue = this._getMin(currNode.right)!
        currNode.value = minRightNodeValue
        currNode.right = this._remove(currNode.right, minRightNodeValue)
        return currNode
      }
    }
  }
}
