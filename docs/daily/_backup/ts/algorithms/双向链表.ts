export class DoubleLinkedNode<T> {
  public prev: null | DoubleLinkedNode<T>
  public next: null | DoubleLinkedNode<T>
  constructor(public value: T) {
    this.next = null
    this.prev = null
  }
}

export class DoubleLinkedList<T> {
  private _head: null | DoubleLinkedNode<T>
  private _tail: null | DoubleLinkedNode<T>
  private _size: number
  constructor() {
    this._size = 0
    this._head = null
    this._tail = null
  }

  getNode(index: number) {
    if (index < 0 || index >= this._size) throw new Error(`下标越界`)
    let current = this._head
    for (let i = 0; i < index; i++) {
      current = current!.next
    }
    return current
  }

  head() {
    return this._head
  }

  tail() {
    return this._tail
  }

  size() {
    return this._size
  }

  append(value: T) {
    const newNode = new DoubleLinkedNode(value)
    if (this._head === null) {
      this._head = newNode
      this._tail = newNode
    } else {
      const lastNode = this.getNode(this._size - 1)
      lastNode!.next = newNode
      newNode.prev = lastNode
      this._tail = newNode
    }
    this._size++
  }

  appendAt(index: number, value: T) {
    if (index < 0 || index > this._size) throw new Error(`下标越界`)
    const newNode = new DoubleLinkedNode(value)
    // head 为空和有 head 行为一致
    if (index === 0) {
      newNode.next = this._head
      this._head = newNode
    } else if (index === this._size) {
      newNode.prev = this._tail
      this._tail = newNode
    } else {
      const prevNode = this.getNode(index - 1)
      newNode.next = prevNode!.next
      prevNode!.next!.prev = newNode
      newNode.prev = prevNode
      prevNode!.next = newNode
    }
    this._size++
  }
}

const dll = new DoubleLinkedList()

dll.append(0)
dll.append(2)

dll.appendAt(1, 1)

console.dir(dll, { depth: 10 })
