// https://github.com/sisterAn/JavaScript-Algorithms/issues/60

// 插入式创建：每次插入一个节点，实现一个大顶堆（或小顶堆）
// 原地创建：又称堆化，给定一组节点，实现一个大顶堆（或小顶堆）

// 自下而上式堆化 ：将节点与其父节点比较，如果节点大于父节点（大顶堆）或节点小于父节点（小顶堆），则节点与父节点调整位置
// 自上往下式堆化 ：将节点与其左右子节点比较，如果存在左右子节点大于该节点（大顶堆）或小于该节点（小顶堆），则将子节点的最大值（大顶堆）或最小值（小顶堆）与之交换

// 原地建堆
const arr = [1, 9, 2, 8, 3, 7, 4, 6, 5]

function buildHeap(items, heapSize) {
  while (heapSize < items.length - 1) {
    heapSize++
    heapify(items, heapSize)
  }
}

function heapify(items, i) {
  while (Math.floor(i / 2) > 0 && items[i] < items[Math.floor(i / 2)]) {
    ;[i, Math.floor(i / 2), Math.floor(i / 2), i]
    i = Math.floor(i / 2)
  }
}

// 测试
var items = [, 5, 2, 3, 4, 1]
// 初始有效序列长度为 1
buildHeap(items, 1)
console.log(items)
// [empty, 1, 2, 3, 5, 4]
