// 一对多
class Observer {
	update(state) {
		console.log('小宝宝的状态', state)
	}
}

class Subject {
	constructor(state) {
		this.state = state
		this.obs = []
	}
	attach(ob) {
		this.obs.push(ob)
	}
	notify() {
		this.state = '😊'
		this.obs.forEach(ob => ob.update(this.state))
	}
}

const initState = '😭'
const baby = new Subject(initState)

const father = new Observer()
const mother = new Observer()

baby.attach(father)
baby.attach(mother)

baby.notify()