// 两个栈实现队列
// [1, 2, 3, 4, 5] [5, 4, 3, 2, 1]
const queue = () => ({
  stack1: [],
  stack2: [],
  enqueue(item) {
    this.stack1.push(item)
  },
  dequeue() {
    if (this.stack2.length === 0) {
      while (this.stack1.length > 0) {
        this.stack2.push(this.stack1.pop())
      }
    }
    return this.stack2.pop()
  }
})

const q = queue()
q.enqueue(1)
q.enqueue(2)
q.enqueue(3)
console.log(q.dequeue()) // 1
console.log(q.dequeue()) // 2
