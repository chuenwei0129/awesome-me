// 观察者
const observer = () => ({
  // 更新依赖的状态
  update(state) {
    console.log(state)
  }
})

// 被观察者
const subject = () => ({
  observers: [],
  state: '被多个观察者依赖的状态',
  // 注册观察者
  addObserver(observer) {
    this.observers.push(observer)
  },
  // 撤销观察者
  removeObserver(observer) {
    this.observers = this.observers.filter(ob => ob !== observer)
  },
  // 通知观察者
  notify() {
    this.observers.forEach(ob => ob.update(this.state))
  }
})

const o1 = observer()
const o2 = observer()
const o3 = observer()

const s1 = subject()

s1.addObserver(o1)
s1.addObserver(o2)
s1.addObserver(o3)

s1.notify()
s1.state = '更新状态'
s1.notify()
