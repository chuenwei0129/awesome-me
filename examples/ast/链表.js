// 单个链表节点
class Node {
  constructor(element) {
    // 数据
    this.element = element
    // 指针
    this.next = null
  }
}

// 链表
class LinkedList {
  constructor() {
    // 初始状态
    this.size = 0
    // 头指针
    this.head = null
  }

  // 根据 index 获取链表节点
  getNode(index) {
    if (index < 0 || index >= this.size) {
      throw new Error(`索引超出长度`)
    } else {
      let current = this.head
      for (let i = 0; i < index; i++) {
        current = current.next
      }
      return current
    }
  }

  // 添加
  append(element) {
    let node = new Node(element)
    // 空链表
    if (this.head === null) {
      this.head = node
    } else {
      let last = this.getNode(this.size - 1)
      last.next = node
    }
    this.size++
  }

  // 删
  removeAt(position) {
    if (position < 0 || position >= this.size) {
      throw new Error(`索引超出长度`)
    } else {
      let current = this.head
      if (position === 0) {
        // 当 current.next 不存在就代表 null
        this.head = current.next
      } else {
        let prev = this.getNode(position - 1)
        // prev.next 就是删除的节点
        current = prev.next
        // 重新指向删除节点的后一个节点
        prev.next = current.next
      }
    }
    this.size--
  }

  // 查 index
  indexOf(element) {
    // 能用 next 查找就不用 getNode
    let current = this.head
    for (let i = 0; i < this.size; i++) {
      if (element === current.element) {
        return i
      } else {
        current = current.next
      }
    }
    return -1
  }
  // 插入
  appendAt(position, element) {
    if (position < 0 || position > this.size) {
      throw new Error(`索引超出长度`)
    } else {
      let node = new Node(element)
      // 索引在头
      if (position === 0) {
        node.next = this.head
        this.head = node
      } else {
        // 在 0, 1中 插入 1
        let prev = this.getNode(position - 1)
        // 先赋值 node.next
        node.next = prev.next
        prev.next = node
      }
    }
    this.size++
  }
}

const ll = new LinkedList()
ll.append(1)
ll.append(2)
ll.append(3)
ll.append(4)

ll.removeAt(2)

console.dir(ll, {
  depth: 100
})

console.log(ll.indexOf(4))
