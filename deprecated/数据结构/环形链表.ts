class CircularLinkedNode {
  public next: null | CircularLinkedNode
  constructor(public value: any) {
    this.next = null
  }
}

class CircularLinkedList {
  private _head: null | CircularLinkedNode
  private _size: number
  constructor() {
    this._head = null
    this._size = 0
  }

  getNode(position: number) {
    if (position < 0 || position >= this._size) throw new Error(`下标越界`)
    let current = this._head
    for (let i = 0; i < position; i++) {
      current = current.next
    }
    return current
  }

  appendAt(position: number, value) {
    if (position < 0 || position > this._size) throw new Error(`下标越界`)
    const newNode = new CircularLinkedNode(value)
    if (position === 0) {
      newNode.next = this._head
      this._head = newNode
    } else {
      const prevNode = this.getNode(position - 1)
      newNode.next = prevNode.next
      prevNode.next = newNode
    }
    this._size++
  }

  append(value) {
    const newNode = new CircularLinkedNode(value)
    if (this._head === null) {
      this._head = newNode
    } else {
      const lastNode = this.getNode(this._size - 1)
      lastNode.next = newNode
    }
    this._size++
  }

  tail() {
    return this.getNode(this._size - 1)
  }

  head() {
    return this._head
  }

  size() {
    return this._size
  }
}

const ll = new CircularLinkedList()

ll.append(0)
ll.append(1)
ll.append(2)
ll.appendAt(3, 3)

ll.tail().next = ll.head()

console.dir(ll, { depth: 10 })
