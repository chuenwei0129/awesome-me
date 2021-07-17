export class Stack {
  private _items: any[]
  constructor() {
    this._items = []
  }
  // 获取栈数据
  getItems() {
    return this._items
  }
  // 入栈
  push(item) {
    this._items.push(item)
  }
  // 出栈
  pop() {
    return this._items.pop()
  }
  // 栈顶
  peek() {
    if (this._items.length < 1) return null
    return this._items[this._items.length - 1]
  }
  // 栈长度
  size() {
    return this._items.length
  }
  // 是否空
  isEmpty() {
    return this._items.length === 0
  }
  // 清空栈
  clear() {
    this._items.length = 0
  }
}
