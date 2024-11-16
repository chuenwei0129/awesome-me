class ListNode {
  constructor(value, next = null) {
    this.value = value
    this.next = next
  }
}

// 创建一个链表：1 -> 2 -> 3 -> 4
const list = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4))))

// catamorphism 函数
function catamorphism(list, destructure, combine) {
  if (list === null) {
    return combine(0, 0) // 当链表为空时，返回初始值
  } else {
    const { value, next } = destructure(list) // 解构器提取值和剩余部分
    const result = combine(value, catamorphism(next, destructure, combine)) // 递归处理剩余部分
    return result
  }
}

// 解构器和组合器函数
function destructureList(node) {
  return { value: node.value, next: node.next }
}

function combineValues(value, accumulated) {
  return value + accumulated
}

// 使用 catamorphism 计算链表中所有元素的和
const sum = catamorphism(list, destructureList, combineValues)
console.log('链表中所有元素的和为:', sum) // 输出：10 (1 + 2 + 3 + 4)

function functionA(value) {
  console.log('Function A called with value:', value)
  if (value > 0) {
    functionB(value - 1) // 调用函数 B
  }
}

function functionB(value) {
  console.log('Function B called with value:', value)
  if (value > 0) {
    functionA(value - 1) // 调用函数 A
  }
}

functionA(3) // 调用函数 A，启动间接递归链
