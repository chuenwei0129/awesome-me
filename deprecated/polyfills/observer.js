// 一对多
class Observer {
  update(state) {
    console.log('更新状态', state)
  }
}

class Subject {
  constructor() {
    this.state = '😭'
    this.obs = []
  }
  attach(ob) {
    this.obs.push(ob)
  }
  notify() {
    this.obs.forEach(ob => ob.update(this.state))
  }
}

const baby = new Subject()

const father = new Observer()
const mother = new Observer()

baby.attach(father)
baby.attach(mother)

baby.notify() // 第一次

baby.state = '😊'
baby.notify() // 第二次
