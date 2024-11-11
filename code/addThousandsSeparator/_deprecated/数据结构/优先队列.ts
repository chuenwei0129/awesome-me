// 辅助类
class QueueItem {
  constructor(public element: unknown, public priority: number) {}
}

class PriorityQueue {
  private _items: QueueItem[]
  constructor() {
    this._items = []
  }

  getItems() {
    return this._items
  }

  // 入队
  enqueue(element: unknown, priority: number) {
    const queueItem = new QueueItem(element, priority)
    let isInserted = false
    // 12, 10, 7, 6  ===  8
    for (let i = 0; i < this._items.length; i++) {
      if (queueItem.priority > this._items[i].priority) {
        this._items.splice(i, 0, queueItem)
        isInserted = true
        break
      }
    }
    // 优先级最小情况
    if (!isInserted) {
      this._items.push(queueItem)
    }
  }
  // 出队
  dequeue() {
    return this._items.shift()
  }
  front() {
    return this._items[0]
  }
  isEmpty() {
    return this._items.length === 0
  }
  size() {
    return this._items.length
  }
  clear() {
    this._items = []
  }
}

const pq = new PriorityQueue()

pq.enqueue('a', 10)
pq.enqueue('b', 100)
pq.enqueue('c', 1000)
pq.enqueue('d', 1)

console.log(pq.getItems())
