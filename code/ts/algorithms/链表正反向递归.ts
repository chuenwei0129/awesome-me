import { LinkedList, LinkedNode } from './data-struct/LinkedList'

// 构造链表
const ll = new LinkedList<number>()

ll.addAtTail(0)
ll.addAtTail(1)
ll.addAtTail(2)
ll.addAtTail(3)
ll.addAtTail(4)
ll.addAtTail(5)

console.dir(ll.head(), { depth: 100 })

// 正向递归
const readValueForward = (node: LinkedNode<number>) => {
  // 递归结束条件
  if (node.next === null) {
    // 当前处于尾节点，尾节点处需单独处理
    console.log('正向递归结束: ', node.value)
    return
  }
  /** 递的阶段操作 => 正向递归 */
  console.log('正向递归: ', node.value)
  /** 操作结束 */
  readValueForward(node.next)
}

readValueForward(ll.head() as LinkedNode<number>)

// 反向递归
const readValueReversely = (node: LinkedNode<number>) => {
  if (node.next === null) {
    console.log('反向递归开始: ', node.value)
    return
  }
  // 先进入函数调用栈，最内层调用栈最先执行，即从链表尾部开始执行操作
  readValueReversely(node.next)
  /** 归的阶段操作 => 反向递归 */
  console.log('反向递归: ', node.value)
}

readValueReversely(ll.head() as LinkedNode<number>)
