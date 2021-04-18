// 发布订阅模式
class EventEmitter {
	constructor() {
		this.eventPools = []
		this.caches = {}
	}
	on(eventName, eventFn) {
		if (eventName in this.caches) {
			eventFn(...this.caches[eventName])
		} else {
			this.eventPools.push({ [eventName]: eventFn })
		}
	}
	emit(eventName, ...args) {
		this.eventPools.forEach((event) => {
			if (event[eventName]) {
				event[eventName](...args)
			} else {
				this.caches[eventName] = [...args]
			}
		})
	}
	off(eventName) {
		for (const [idx, event] of this.eventPools.entries()) {
			if (event.hasOwnProperty(eventName)) {
				this.eventPools.splice(idx, 1)
			}
		}
	}
	once(eventName, eventFn) {
		const eventFnOnce = (...args) => {
			eventFn(...args)
			this.off(eventName)
		}
		this.on(eventName, eventFnOnce)
	}
}

const eventEmitter = new EventEmitter()

// 测试on emit方法
eventEmitter.on('event1', (x, y) => {
	console.log(`我是 event1 和参数 ${x}, ${y}`)
})

eventEmitter.emit('event1', 1, 2)
eventEmitter.emit('event1')

// 测试off方法
eventEmitter.on('event2', (x, y) => {
	console.log(`我是 event2 和参数 ${x}, ${y}`)
})

eventEmitter.emit('event2', 1, 2)
eventEmitter.off('event2')
eventEmitter.emit('event2')

// 测试 once 方法
eventEmitter.once('event3', (x, y) => {
	console.log(`我是 event3 和参数 ${x}, ${y}`)
})

eventEmitter.emit('event3')
eventEmitter.emit('event3')

// 测试先订阅后发布
eventEmitter.emit('event4', 5, 6)
eventEmitter.on('event4', (x, y) => {
	console.log(`我是 event4 和参数 ${x}, ${y}`)
})