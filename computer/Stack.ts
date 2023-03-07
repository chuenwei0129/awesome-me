type Stack<T> = {
  _items: Array<T>
  items: Stack<T>['_items']
  push: (item: T) => void
  pop: () => T | undefined
  peek: T | undefined
  size: number
  isEmpty: boolean
  clear: () => void
}

export const stack = <T>(): Stack<T> => ({
  _items: [],
  get items() {
    return this._items
  },
  // 入栈
  push(item) {
    this._items.push(item)
  },
  // 出栈
  pop() {
    if (this._items.length === 0) return
    return this._items.pop()
  },
  // 查看栈顶元素
  get peek() {
    if (this._items.length === 0) return
    return this._items[this._items.length - 1]
  },
  get size() {
    return this._items.length
  },
  get isEmpty() {
    return this._items.length === 0
  },
  clear() {
    this._items.length = 0
  },
})
