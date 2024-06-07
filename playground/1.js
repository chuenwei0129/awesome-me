// 观察者模式

class Subject {
  constructor() {
    this.observers = []
  }

  addObserver(observer) {
    this.observers.push(observer)
  }

  removeObserver(observer) {
    this.observers = this.observers.filter((item) => item !== observer)
  }

  notify(data) {
    this.observers.forEach((item) => item.update(data))
  }
}

class Observer {
  constructor(name) {
    this.name = name
  }

  update(data) {
    console.log(`${this.name}收到消息：${data}`)
  }
}
