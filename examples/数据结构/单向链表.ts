class LinkedNode {
  public next: null | LinkedNode
  constructor(public value: any) {
    this.next = null
  }
}

// 链表有 index
class LinkedList {
  private _head: null | LinkedNode
  private _size: number
  constructor() {
    this._head = null
    this._size = 0
  }

  // 根据 position 获取链表节点，指针循环线性向下查找，数组可以直接通过下标查找
  getNode(position) {
    // 下标边界
    if (position < 0 || position >= this._size) throw new Error(`out range`)
    let current = this._head
    for (let i = 0; i < position; i++) {
      current = current.next
    }
    return current
  }
  // 添加节点
  append(value) {
    const newNode = new LinkedNode(value)
    if (this._head === null) {
      this._head = newNode
    } else {
      const lastNode = this.getNode(this._size - 1)
      lastNode.next = newNode
    }
    this._size++
  }
  // 指定具体位置添加链表
  appendAt(position, value) {
    if (position < 0 || position > this._size) throw new Error(`下标越界`)
    const newNode = new LinkedNode(value)
    if (position === 0) {
      // 新节点 next 指向旧的头
      newNode.next = this._head
      this._head = newNode
    } else {
      const prevNode = this.getNode(position - 1)
      newNode.next = prevNode.next
      prevNode.next = newNode
    }
    this._size++
  }
  // 删除
  removeAt(position) {
    if (position < 0 || position >= this._size) throw new Error(`下标越界`)
    if (position === 0) {
      this._head = this._head.next
    } else {
      // 突破点前一个节点
      let prevNode = this.getNode(position - 1)
      prevNode.next = prevNode.next.next
    }
    this._size--
  }
  // 链表下标
  indexOf(value) {
    // 循环链表
    let current = this._head
    for (let i = 0; i < this._size; i++) {
      if (value === current.value) return i
      current.next = current
    }
    return -1
  }
  // 链表长度
  size() {
    return this._size
  }
  getHead() {
    return this._head
  }
}

const ll = new LinkedList()

ll.append(1)
ll.append(3)

console.dir(ll, { depth: 100 })

ll.appendAt(0, 0)
ll.appendAt(2, 2)
ll.appendAt(4, 4)

console.dir(ll, { depth: 100 })

ll.removeAt(2)

console.dir(ll, { depth: 100 })

console.log(ll.indexOf(2))
console.log(ll.indexOf(0))
