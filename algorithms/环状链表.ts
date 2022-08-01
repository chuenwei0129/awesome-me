import { LinkedList } from './data-structure/linkedList'

const ll = new LinkedList<number>()

ll.addAtTail(0)
ll.addAtTail(1)
ll.addAtTail(2)
ll.addAtIndex(3, 3)

// 首尾相连形成环状链表
ll.tail()!.next = ll.head()

console.dir(ll.head(), { depth: 10 })
console.dir(ll.tail(), { depth: 10 })

// 形如：
// <ref *1> LinkedNode {
//   value: 0,
//   next: LinkedNode {
//     value: 1,
//     next: LinkedNode {
//       value: 2,
//       next: LinkedNode { value: 3, next: [Circular *1] }
//     }
//   }
// }
// <ref *1> LinkedNode {
//   value: 3,
//   next: LinkedNode {
//     value: 0,
//     next: LinkedNode {
//       value: 1,
//       next: LinkedNode { value: 2, next: [Circular *1] }
//     }
//   }
// }
