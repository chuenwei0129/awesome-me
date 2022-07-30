class MinHeap {
  private heap: any[] = []

  swap(index1: number, index2: number) {
    ;[this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]]
  }

  getParentIndex(index: number) {
    // 向下取整
    return Math.floor((index - 1) / 2)
  }

  getLeftIndex(index: number) {
    return 2 * index + 1
  }

  getRightIndex(index: number) {
    return 2 * index + 2
  }

  // 先判断当前节点的位置是否在堆的顶点处，如果是，则不进行上移操作；如果否，则继续进行比较；
  // 获取父节点的位置索引，获取索引的目的是为了获取该索引的具体值；
  // 将当前节点的值与父节点的值进行对比，如果父节点的值大于当前节点的值，则进行上移操作；
  // 递归进行上移操作，直到到达堆顶为止。
  shiftUp(index: number) {
    //如果在堆的顶点处，则不进行上移操作，直接返回结果
    if (index === 0) {
      return
    }

    //获取父节点(即获取当前节点的父节点的值，且每个节点的父节点只有一个)
    const parentIndex = this.getParentIndex(index)
    if (this.heap[parentIndex] > this.heap[index]) {
      //判断如果堆的父节点如果大于子节点，则进行位置交换
      this.swap(parentIndex, index)
      //交换完成之后，继续递归进行上移操作
      this.shiftUp(parentIndex)
    }
  }
  // 先获取左右侧节点；
  // 将左侧子节点与当前节点进行比较，如果左侧子节点比当前节点小，则进行位置交换，之后将交换完的节点继续进行比较；
  // 左侧节点比较完之后，接下来比较右侧节点；
  // 将右侧子节点与当前节点进行比较，如果右侧子节点比当前节点小，则进行位置交换，之后将交换完的节点继续进行比较；
  // 如此循环操作，直到最后一个节点为止。
  shiftDown(index: number) {
    // 完全二叉树
    const leftIndex = this.getLeftIndex(index)
    const rightIndex = this.getRightIndex(index)
    //  对左侧结点进行交换
    if (this.heap[leftIndex] < this.heap[index]) {
      this.swap(leftIndex, index)
      this.shiftDown(leftIndex)
    }
    //  对右侧结点进行交换
    if (this.heap[rightIndex] < this.heap[index]) {
      this.swap(rightIndex, index)
      this.shiftDown(rightIndex)
    }
  }

  //插入结点值的操作，value为被插入的值
  insert(value: any) {
    //把新的值放到数组的最后一位
    this.heap.push(value)
    //将值进行上移操作
    this.shiftUp(this.heap.length - 1)
  }

  //删除堆顶操作
  pop() {
    //将尾部的值赋值给堆顶
    this.heap[0] = this.heap.pop()
    //进行下移操作
    this.shiftDown(0)
  }

  //获取堆顶的值
  peek() {
    return this.heap[0]
  }

  //获取堆的大小
  size() {
    return this.heap.length
  }
}

const mh = new MinHeap()

mh.insert(1)
mh.insert(9)
mh.insert(7)
mh.insert(2)
mh.insert(4)
mh.insert(5)
mh.insert(8)

// mh.pop()

console.log(mh)
