export type StackProps<T> = {
  _items: Array<T>
  getItems: () => StackProps<T>['_items']
  push: (item: T) => void
  pop: () => T | undefined
  peek: () => T | undefined
  size: () => number
  isEmpty: () => boolean
  clear: () => void
}

export const stack = <T>(): StackProps<T> => ({
  _items: [],
  getItems() {
    return this._items
  },
  push(item) {
    this._items.push(item)
  },
  pop() {
    if (this._items.length === 0) return
    return this._items.pop()
  },
  peek() {
    if (this._items.length === 0) return
    return this._items[this._items.length - 1]
  },
  size() {
    return this._items.length
  },
  isEmpty() {
    return this._items.length === 0
  },
  clear() {
    this._items.length = 0
  }
})
