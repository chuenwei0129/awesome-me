// subject 数据变化 setstate => observer update 更新视图 建立联系 attach
class Subject {
	// 构造函数new Subject(参数)的state 赋值给 实列的state
	constructor(state) {
		this.state = state
		this._arr = []
	}
	attach(o) {
		// 订阅观察者
		this._arr.push(o)
	}
	setState(newState) {
		this.state = newState
		this._arr.forEach((o) => o.upDate(this.state))
	}
}
class Observer {
	upDate(newState) {
		console.log(newState)
	}
}

let data = new Subject('初始数据')
let view = new Observer()

// 一对多
data.attach(view)
data.setState('第一次变更数据')
data.setState('第二次变更数据')
data.setState('第三次变更数据')
