// 1. 记住“矩阵”和“二维数组”之间的等价关系

const { right } = require('@antv/x6/lib/registry/port-layout/line');

// 生成 5 * 5 的二维数组
const arr = Array.from({ length: 5 }).map(() =>
  Array.from({ length: 5 }).map((_, i) => i + 1),
);

console.log(arr);
// [
//   [ 1, 2, 3, 4, 5 ],
//   [ 1, 2, 3, 4, 5 ],
//   [ 1, 2, 3, 4, 5 ],
//   [ 1, 2, 3, 4, 5 ],
//   [ 1, 2, 3, 4, 5 ]
// ]

// 2. 当你给 fill 传递一个入参时，如果这个入参的类型是引用类型，那么 fill 在填充坑位时填充的其实就是入参的引用。
const arr1 = Array.from({ length: 10 }).fill([]);
arr1[0].push(10);
console.log(arr1);

// 3. 数组删除元素
const arr2 = [1, 2, 3, 4, 5];
arr2.splice(0, 0, 6);
console.log(arr2);

// 4. stack pop push 栈顶
// 5. queue shift push

// 6. 链表
const listNode = (val) => ({ val, next: null });
const n1 = listNode(1);
const n2 = listNode(2);
// 要想访问链表中的任何一个元素，我们都得从起点结点开始，逐个访问 next，一直访问到目标结点为止。
// 为了确保起点结点是可抵达的，我们有时还会设定一个 head 指针来专门指向链表的开始位置：
const head = { val: null, next: null };
head.next = n1;
n1.next = n2;

// 如何在两个结点间插入一个结点？
// 如果目标结点本来不存在，那么记得手动创建
const n3 = listNode(3);
// n3 -> n2
n3.next = n1.next;
// n1 -> n3
n1.next = n3;

// 在涉及链表删除操作的题目中，重点不是定位目标结点，而是定位目标结点的前驱结点。
// 按照这个标准，要想遍历不到 n3，我们直接让它的前驱结点 n1 的 next 指针跳过它、指向 n3 的后继即可
// 如此一来，n3 就成为了一个完全不可抵达的结点了，它会被 JS 的垃圾回收器自动回收掉
n1.next = n3.next;

// 我们假设数组的长度是 n，那么因增加/删除操作导致需要移动的元素数量，就会随着数组长度 n 的增大而增大，呈一个线性关系。所以说数组增加/删除操作对应的复杂度就是 O(n)。
// 相对于数组来说，链表有一个明显的优点，就是添加和删除元素都不需要挪动多余的元素。
//  因此我们说链表增删操作的复杂度是常数级别的复杂度，用大 O 表示法表示为 O(1)。

// 随着链表长度的增加，我们搜索的范围也会变大、遍历其中任意元素的时间成本自然随之提高。这个变化的趋势呈线性规律，用大 O 表示法表示为 O(n)
// 但在数组中，我们直接访问索引、可以做到一步到位，这个操作的复杂度会被降级为常数级别(O(1))。

const each = (node) => {
  while (node.next) {
    console.log(node.next.val);
    // eslint-disable-next-line no-param-reassign
    node = node.next;
  }
};

each(head);

// 二叉树
const treeNode = (val) => ({ val, left: null, right: null });

// const root = {
//   val: 1,
//   left: {
//     val: 2,
//     left: {},
//     right: {},
//   },
//   right: {
//     val: 3,
//   },
// };
