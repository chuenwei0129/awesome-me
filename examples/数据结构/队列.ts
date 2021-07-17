export class Queue {
  private _items: any[]
  constructor() {
    this._items = []
  }

  getItems() {
    return this._items
  }
  enqueue(item) {
    this._items.push(item)
  }
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
