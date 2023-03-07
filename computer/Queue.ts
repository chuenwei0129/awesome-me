export type Queue<T> = {
  _items: Array<T>
  items: Queue<T>['_items']
  enqueue: (item: T) => void
  dequeue: () => T | undefined
  front: T | undefined
  size: number
  isEmpty: boolean
  clear: () => void
}

export const queue = <T>(): Queue<T> => ({
  _items: [],
  get items() {
    return this._items
  },
  // 入队
  enqueue(item) {
    this._items.push(item)
  },
  // 出队
  dequeue() {
    if (this._items.length === 0) return
    return this._items.shift()
  },
  get front() {
    return this._items[0]
  },
  get isEmpty() {
    return this._items.length === 0
  },
  get size() {
    return this._items.length
  },
  clear() {
    this._items.length = 0
  },
})
