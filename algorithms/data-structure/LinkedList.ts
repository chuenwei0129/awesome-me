export class LinkedNode<T> {
  public next: null | LinkedNode<T>
  constructor(public value: T) {
    this.next = null
  }
}

export class LinkedList<T> {
  private _head: null | LinkedNode<T>
  private _size: number
  constructor() {
    this._head = null
    this._size = 0
  }

  _getNode(index: number) {
    if (index < 0 || index >= this._size) throw new Error(`下标越界`)
    let current = this._head
    for (let i = 0; i < index; i++) {
      current = current!.next
    }
    return current
  }

  get(index: number) {
    return this._getNode(index)?.value
  }

  addAtTail(value: T) {
    const newNode = new LinkedNode(value)
    // 头节点为空，即链表未创建，初始化链表
    if (this._head === null) {
      this._head = newNode
    } else {
      const tailNode = this._getNode(this._size - 1)
      tailNode!.next = newNode
    }
    this._size++
  }

  addAtIndex(index: number, value: T) {
    if (index < 0 || index > this._size) throw new Error(`下标越界`)
    const newNode = new LinkedNode(value)
    if (index === 0) {
      newNode.next = this._head
      this._head = newNode
    } else {
      const prevNode = this._getNode(index - 1)
      newNode.next = prevNode!.next
      prevNode!.next = newNode
    }
    this._size++
  }

  addAtHead(value: T) {
    return this.addAtIndex(0, value)
  }

  deleteAtIndex(index: number) {
    if (index < 0 || index >= this._size) throw new Error(`下标越界`)
    // 删除头节点 [head]
    if (index === 0) {
      this._head = this._head!.next
    } else {
      let prevNode = this._getNode(index - 1)
      // 边界: [head, head.next] head.next 非空
      prevNode!.next = prevNode!.next!.next
    }
    this._size--
  }

  indexOf(value: T) {
    let current = this._head
    for (let i = 0; i < this._size; i++) {
      if (value === current!.value) return i
      current!.next = current
    }
    return -1
  }

  size() {
    return this._size
  }

  head() {
    return this._head
  }

  tail() {
    return this._getNode(this._size - 1)
  }
}
