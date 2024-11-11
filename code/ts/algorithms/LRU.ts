// map 有序
// 最新的数据是 map 最后一个元素，最老的数据是 map 第一个元素
// iterator.next() 返回的是 { value: key, done: false }

const cache = <K, V>(limit: number) => ({
  limit,
  items: new Map<K, V>(),
  get(key: K): V | null {
    const item = this.items.get(key)
    if (!item) {
      return null
    }
    this.items.delete(key)
    this.items.set(key, item)
    return item
  },
  set(key: K, value: V): void {
    if (this.items.has(key)) {
      this.items.delete(key)
    }
    this.items.set(key, value)
    if (this.items.size > this.limit) {
      this.items.delete(this.items.keys().next().value)
    }
  },
})

cache(10)
cache.set('小说', 1)
