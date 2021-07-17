class Stack {
  constructor() {
    this.items = []
  }
  push(item) {
    this.items.push(item)
  }
  pop() {
    return this.items.pop()
  }
  peek() {
    if (this.items.length < 1) return null
    return this.items[this.items.length - 1]
  }
  size() {
    return this.items.length
  }
  isEmpty() {
    return this.items.length === 0
  }
  clear() {
    this.items = []
  }
}

const stack = new Stack()

// 入栈
stack.push(1)
stack.push(2)
stack.push(3)

// 栈
console.log(stack)
// 栈顶
console.log(stack.peek())

// 出栈
console.log(stack.pop())
console.log(stack)

// 栈的长度
console.log(stack.size())

// 栈是否为空
console.log(stack.isEmpty())
