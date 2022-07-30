class HashTable {
  private _items: any[]
  constructor() {
    this._items = []
  }

  // 散列函数，散列值，门牌号
  // key => number => items[number]
  // 分离链接 链表
  // 线性探查 向下探查
  losesHashCode(key: string) {
    let hash = 0
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i)
    }

    return hash % 37
  }

  // 可以减少散列值冲突
  djb2HashCode(key: string) {
    let hash = 5381
    for (let i = 0; i < key.length; i++) {
      hash = hash * 33 + key.charCodeAt(i)
    }
    return hash % 1013
  }

  put(key, value) {
    // 散列值
    const position = this.djb2HashCode(key)
    // 存储位置
    this._items[position] = value
  }

  getItems() {
    return this._items
  }

  get(key) {
    return this._items[this.djb2HashCode(key)]
  }

  remove(key) {
    this._items[this.djb2HashCode(key)] = undefined
  }
}

const ht = new HashTable()

ht.djb2HashCode('Jobs')

ht.put('Jobs', 'Jobs@qq.com')

console.log(ht)
console.log(ht.get('Jobs'))
