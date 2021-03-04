class Observer {
	constructor(name) {
		this.name = name
	}
	update(newState) {
		console.log(newState)
	}
}

class Subject {
	constructor() {
		this.state = 'smile'
		this.observers = []
	}
	attach(observer) {
		this.observers.push(observer)
	}
	setState(newState) {
		this.observers.forEach(item => item.update(newState))
	}
}

const mama = new Observer('mama')
const baba = new Observer('baba')
const baby = new Subject()

baby.attach(mama)
baby.attach(baba)

baby.setState('angry')