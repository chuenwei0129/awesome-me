// 一对多
class Observer {
	update(state) {
		console.log('小宝宝的状态', state)
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

baby.attach(father) // 小宝宝的状态 😭 ==> 小宝宝的状态 😊
baby.attach(mother) // 小宝宝的状态 😭 ==> 小宝宝的状态 😊

baby.notify() // 第一次

baby.state = '😊'
baby.notify() // 第二次
