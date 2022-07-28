class LinkedNode<T> {
  public next: null | LinkedNode<T>
  constructor(public value: T) {
    this.next = null
  }
}

class LinkedList<T> {
  private _head: null | LinkedNode<T>
  private _size: number
  constructor() {
    this._head = null
    this._size = 0
  }

  getNode(position: number) {
    if (position < 0 || position >= this._size) throw new Error(`下标越界`)
    let current = this._head
    for (let i = 0; i < position; i++) {
      current = current!.next
    }
    return current
  }

  append(value: T) {
    const newNode = new LinkedNode(value)
    // 头节点为空，即链表未创建，初始化链表
    if (this._head === null) {
      this._head = newNode
    } else {
      const tailNode = this.getNode(this._size - 1)
      tailNode!.next = newNode
    }
    this._size++
  }

  appendAt(position: number, value: T) {
    if (position < 0 || position > this._size) throw new Error(`下标越界`)
    const newNode = new LinkedNode(value)
    if (position === 0) {
      newNode.next = this._head
      this._head = newNode
    } else {
      const prevNode = this.getNode(position - 1)
      newNode.next = prevNode!.next
      prevNode!.next = newNode
    }
    this._size++
  }

  removeAt(position: number) {
    if (position < 0 || position >= this._size) throw new Error(`下标越界`)
    if (position === 0) {
      this._head = this._head!.next
    } else {
      let prevNode = this.getNode(position - 1)
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

  getHead() {
    return this._head
  }
}

class MyLinkedNode {
  public next: null | MyLinkedNode
  constructor(public val: number) {
    this.next = null
  }
}

class MyLinkedList {
  private _head: null | MyLinkedNode
  private _size: number
  constructor() {
    this._head = null
    this._size = 0
  }

  getNode(index: number) {
    if (index < 0 || index >= this._size) throw new Error(`下标越界`)
    let current = this._head
    for (let i = 0; i < index; i++) {
      current = current!.next
    }
    return current
  }

  get(index: number) {
    return this.getNode(index)!.val
  }

  addAtHead(val: number): void {
    return this.addAtIndex(0, val)
  }

  addAtTail(val: number): void {
    const newNode = new MyLinkedNode(val)
    if (this._head === null) {
      this._head = newNode
    } else {
      const tailNode = this.getNode(this._size - 1)
      tailNode!.next = newNode
    }
    this._size++
  }

  addAtIndex(index: number, val: number): void {
    if (index < 0) {
      this.addAtHead(val)
    }
    if (index > this._size) throw new Error(`下标越界`)
    const newNode = new MyLinkedNode(val)
    if (index === 0) {
      newNode.next = this._head
      this._head = newNode
    } else {
      const prevNode = this.getNode(index - 1)
      newNode.next = prevNode!.next
      prevNode!.next = newNode
    }
    this._size++
  }

  deleteAtIndex(index: number): void {
    if (index < 0 || index >= this._size) throw new Error(`下标越界`)
    if (index === 0) {
      this._head = this._head!.next
    } else {
      let prevNode = this.getNode(index - 1)
      prevNode!.next = prevNode!.next!.next
    }
    this._size--
  }
}

/**
 * Your MyLinkedList object will be instantiated and called as such:
 * var obj = new MyLinkedList()
 * var param_1 = obj.get(index)
 * obj.addAtHead(val)
 * obj.addAtTail(val)
 * obj.addAtIndex(index,val)
 * obj.deleteAtIndex(index)
 */
