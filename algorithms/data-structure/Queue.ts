export type QueueProps<T> = {
  _items: Array<T>
  getItems: () => QueueProps<T>['_items']
  enqueue: (item: T) => void
  dequeue: () => T | undefined
  front: () => T | undefined
  size: () => number
  isEmpty: () => boolean
  clear: () => void
}

export const queue = <T>(): QueueProps<T> => ({
  _items: [],
  getItems() {
    return this._items
  },
  enqueue(item) {
    this._items.push(item)
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
    this._items.length = 0
  }
})
