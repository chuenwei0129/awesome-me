// JS 通常用数组来表示堆。
// 左侧节点的位置是 2*index+1 。
// 右侧节点的位置是 2*index+2 。
// 父节点位置是 (index - 1) / 2 | 0
// 只考虑数字

export class MinHeap {
  private _heap: number[] = []

  private _swap(index1: number, index2: number) {
    ;[this._heap[index1], this._heap[index2]] = [this._heap[index2], this._heap[index1]]
  }

  private _getParentIndex(index: number) {
    // 向下取整
    return Math.floor((index - 1) / 2)
  }

  private _getLeftChildIndex(index: number) {
    return 2 * index + 1
  }

  private _getRightChildIndex(index: number) {
    return 2 * index + 2
  }

  // 先判断当前节点的位置是否在堆的顶点处，如果是，则不进行上移操作；如果否，则继续进行比较；
  // 获取父节点的位置索引，获取索引的目的是为了获取该索引的具体值；
  // 将当前节点的值与父节点的值进行对比，如果父节点的值大于当前节点的值，则进行上移操作；
  // 递归进行上移操作，直到到达堆顶为止。
  private _moveUp(index: number) {
    //如果在堆的顶点处，则不进行上移操作，直接返回结果
    if (index === 0) return

    //获取父节点(即获取当前节点的父节点的值，且每个节点的父节点只有一个)
    const parentIndex = this._getParentIndex(index)
    if (this._heap[parentIndex] > this._heap[index]) {
      //判断如果堆的父节点如果大于节点，则进行位置交换
      this._swap(parentIndex, index)
      //交换完成之后，继续递归进行上移操作
      this._moveUp(parentIndex)
    }
  }
  // 先获取左右侧节点；
  // 将左侧子节点与当前节点进行比较，如果左侧子节点比当前节点小，则进行位置交换，之后将交换完的节点继续进行比较；
  // 左侧节点比较完之后，接下来比较右侧节点；
  // 将右侧子节点与当前节点进行比较，如果右侧子节点比当前节点小，则进行位置交换，之后将交换完的节点继续进行比较；
  // 如此循环操作，直到最后一个节点为止。
  private _moveDown(index: number) {
    const leftChildIndex = this._getLeftChildIndex(index)
    const rightChildIndex = this._getRightChildIndex(index)
    //  对左侧结点进行交换
    if (this._heap[leftChildIndex] < this._heap[index]) {
      this._swap(leftChildIndex, index)
      this._moveDown(leftChildIndex)
    }
    //  对右侧结点进行交换
    if (this._heap[rightChildIndex] < this._heap[index]) {
      this._swap(rightChildIndex, index)
      this._moveDown(rightChildIndex)
    }
  }

  // 插入
  insert(value: number) {
    // 把新的值放到数组的最后一位
    this._heap.push(value)
    // 将值进行上移操作
    this._moveUp(this._heap.length - 1)
  }

  // 删除堆顶操作
  pop() {
    if (this._heap.length === 0) return
    // 将尾部的值赋值给堆顶，替代堆顶值，尾部再下移回到尾部，等同于删除堆顶
    this._heap[0] = this._heap.pop()!
    // 进行下移操作
    this._moveDown(0)
  }

  // 获取堆顶的值
  peek() {
    return this._heap[0]
  }

  // 获取堆的大小
  size() {
    return this._heap.length
  }

  head() {
    return this._heap
  }
}
