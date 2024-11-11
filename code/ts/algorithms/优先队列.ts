export type PriorityQueueItemProps<T> = {
  value: T
  priority: number
}

export type PriorityQueueProps<T> = {
  _items: PriorityQueueItemProps<T>[]
  getItems: () => PriorityQueueProps<T>['_items']
  enqueue: (value: T, priority: number) => void
  dequeue: () => PriorityQueueItemProps<T> | undefined
  front: () => PriorityQueueItemProps<T> | undefined
  size: () => number
  isEmpty: () => boolean
  clear: () => void
}

export const priorityQueueItem = <T>(value: T, priority: number) => ({
  value,
  priority
})

export const priorityQueue = <T>(): PriorityQueueProps<T> => ({
  _items: [],
  getItems() {
    return this._items
  },
  enqueue(value, priority) {
    const item = priorityQueueItem(value, priority)
    let isInserted = false
    // 循环队列比较优先级
    for (let i = 0; i < this._items.length; i++) {
      if (item.priority > this._items[i].priority) {
        this._items.splice(i, 0, item)
        // 插入标识
        isInserted = true
        break
      }
    }
    // 优先级最小
    if (!isInserted) {
      this._items.push(item)
    }
  },
  dequeue() {
    if (this._items.length === 0) return
    return this._items.shift()
  },
  front() {
    return this._items[0]
  },
  isEmpty() {
    return this._items.length === 0
  },
  size() {
    return this._items.length
  },
  clear() {
    this._items = []
  }
})
