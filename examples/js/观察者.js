const state = 1

class Subject {
	constructor(state) {
		this.state = state
		this._arr = []
	}

	add(ob) {
		this._arr.push(ob)
	}

	notify(newState) {
		this.state = newState
		this._arr.forEach((ob) => ob.update(newState))
	}
}

class Observer {
	constructor() {}

	update(newState) {
		console.log(`数据发生了更新，新的数据是 ${newState}`)
	}
}

// 被观察者处理数据
const sub = new Subject(state)
// 观察者监听数据
const ob = new Observer()

// 建立联系
sub.add(ob)
sub.setState(2)

// Observer收集数据
