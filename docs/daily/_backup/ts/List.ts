class Node<T> {
  public next: Node<T> | null = null
  constructor(public value: T) {}
}

export class List<T> {
  private _head: null | Node<T> = null
  private _size: number = 0

  _getNodeFromIndex(index: number) {
    if (this._head === null && index === 0) return null
    if (index < 0 || index >= this._size) throw new Error(`下标越界`)
    let current = this._head
    for (let i = 0; i < index; i++) {
      current = current!.next
    }
    return current
  }

  at(index: number) {
    return this._getNodeFromIndex(index)?.value ?? null
  }

  get size() {
    return this._size
  }

  get head() {
    return this._head
  }

  get tail() {
    if (this._head === null) return null
    return this._getNodeFromIndex(this._size - 1)
  }

  addAtTail(value: T) {
    const newNode = new Node(value)
    if (this._head === null) {
      this._head = newNode
    } else {
      const tail = this._getNodeFromIndex(this._size - 1)
      tail!.next = newNode
    }
    this._size++
  }

  addAtIndex(index: number, value: T) {
    if (index < 0 || index > this._size) throw new Error(`下标越界`)
    const newNode = new Node(value)
    if (index === 0) {
      // 头节点插入
      newNode.next = this._head
      this._head = newNode
    } else {
      const prevNode = this._getNodeFromIndex(index - 1)
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
      let prevNode = this._getNodeFromIndex(index - 1)
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
}
