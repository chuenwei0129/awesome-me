const complierUtils = {
	getVal(vm, expr) {
		return expr.split('.').reduce((data, cur) => {
			// vm.$data.student.name
			return data[cur]
		}, vm.$data)
	},

	model(node, expr, vm) {
		// 处理输入框的value值
		const fn = this.updater.modelUpdater
		// 监听数据变化,数据更新就触发此方法,要在取值之前执行
		new Watcher(vm, expr, (newVal) => {
			fn(node, newVal)
		})

		// 双向绑定的实现
		node.addEventListener('input', (e) => {
			// 把e.target.value的值赋给$data.xx.xx,也就是 expr
			expr.split('.').reduce((data, cur, idx, arr) => {
				if (idx === arr.length - 1) {
					data[cur] = e.target.value
				}
				return data[cur]
			}, vm.$data)
		})

		const value = this.getVal(vm, expr)
		// 映射输入框和值
		fn(node, value)

		// watch只对dom中使用的数据有用，主动 watch 也可以响应式触发
	},

	text(node, expr, vm) {
		const fn = this.updater.textUpdater
		const value = expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
			// 每个{{}}都需要加观察者
			new Watcher(vm, args[1], () => {
				// 更新时是整个文本更新
				fn(
					node,
					expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
						return this.getVal(vm, args[1])
					})
				)
			})
			return this.getVal(vm, args[1])
		})
		fn(node, value)
	},

	on(node, expr, vm, eventName) {
		node.addEventListener(eventName, function(e) {
			vm[expr].call(vm, e)
		})
	},

	updater: {
		// 把数据插入节点中
		modelUpdater(node, value) {
			node.value = value
		},
		textUpdater(node, value) {
			node.textContent = value
		}
	}
}

// 基类
class Vue {
	constructor(options) {
		this.$el = options.el
		this.$data = options.data
		// 计算属性的实现
		this.computed = options.computed
		// 双向绑定，事件实现, 代理到实例上
		this.methods = options.methods

		// 数据劫持要在编译前执行
		new Observer(this.$data)

		// 处理 computed上赋值到this.$data上的应该是函数返回值,因为前面reduce所以不在this上
		for (const key in this.computed) {
			Object.defineProperty(this.$data, key, {
				get: () => {
					// 这一步需要把 this 绑定到执行的函数中去
					return this.computed[key].call(this)
				}
			})
		}

		for (const key in this.methods) {
			Object.defineProperty(this, key, {
				get: () => {
					// 这一步需要把 this 绑定到执行的函数中去
					return this.methods[key]
				}
			})
		}

		// 代理 this.$data 代理 到 this 上
		this.proxyVm(this.$data)

		// 对应 vue 中 $mount
		if (this.$el) {
			new Complier(this.$el, this)
		}
	}
	proxyVm(data) {
		for (const key in data) {
			// 给this上添加this.$data的属性
			Object.defineProperty(this, key, {
				get() {
					return data[key]
				},
				set(newVal) {
					data[key] = newVal
				}
			})
		}
	}
}

// 编译，将模板转换为 dom
class Complier {
	constructor(el, vm) {
		this.el = this.isElementNode(el) ? el : document.querySelector(el)
		this.vm = vm
		// 获取到根节点接下来要做的是把v-model，{{}}，数据结合替换成真实的 DOM
		const fragment = this.node2fragment(this.el)
		// 进行内容替换，文本节点和元素节点分开操作
		this.complierNode(fragment)
		// 塞到页面中
		this.el.appendChild(fragment)
	}
	// 判断是否是元素节点,对应vue中el可以是document.xxx
	isElementNode(node) {
		return node.nodeType === 1
	}
	// 把模板放入 fragment 中
	node2fragment(node) {
		const fragment = document.createDocumentFragment()
		// 克隆不行 会丧失on 事件,遍历el，复制节点
		let _firstChild
		while ((_firstChild = node.firstChild)) {
			fragment.appendChild(_firstChild)
		}
		return fragment
	}
	// 分析文本节点和元素节点
	complierNode(node) {
		const nodeList = node.childNodes;
		// 拿不到孙子节点
		[...nodeList].forEach((child) => {
			if (this.isElementNode(child)) {
				this.complierElement(child)
				// 需要递归拿子节点
				this.complierNode(child)
			} else {
				this.complierText(child)
			}
		})
	}
	// 编译元素对应指令
	complierElement(node) {
		const attributes = node.attributes;
		[...attributes].forEach((attr) => {
			const { name, value: expr } = attr
			// 找出 v-xxx 指令 expr就是v-model中的表达式
			if (this.isDirective(name)) {
				const [, directive] = name.split('-')
				// 添加事件v-on
				const [directiveName, eventName] = directive.split(':')

				// v-model所在节点,+数据
				complierUtils[directiveName](node, expr, this.vm, eventName)
			}
		})
	}
	// 编译文本对应{{}}
	complierText(node) {
		const content = node.textContent
		// 找出含有{{}}文本
		if (/\{\{(.+?)\}\}/.test(content)) {
			complierUtils.text(node, content, this.vm)
		}
	}
	// 判断是否是指令
	isDirective(attrName) {
		return attrName.startsWith('v-')
	}
}

// 数据劫持
class Observer {
	constructor(data) {
		this.observer(data)
	}
	observer(data) {
		if (data && typeof data === 'object') {
			for (const key in data) {
				this.defineReactive(data, key, data[key])
			}
		}
	}
	defineReactive(obj, key, val) {
		if (typeof val === 'object' && val !== null) this.observer(val)
		const dep = new Dep() // 闭包保存dep调度中心处理数据的收集更新
		Object.defineProperty(obj, key, {
			get() {
				// 取值数据时收集数据,调度中心和 watcher 建立联系，没有new Wacther 就没有后续操作
				Dep.target && dep.on(Dep.target)
				return val
			},
			set: (newVal) => {
				if (newVal !== val) {
					this.observer(newVal)
					val = newVal
					dep.emit()
				}
			}
		})
	}
}

// 他的实例就是处理数据更新的方法
class Watcher {
	// 数据监听器
	constructor(vm, expr, cb) {
		this.vm = vm
		this.expr = expr
		this.cb = cb

		// 获取旧数据时把 watcher实列 传入调度中心,初始化时保存数据，并且完成数据监听收集
		this.oldVal = this.getOldVal()
	}
	getOldVal() {
		Dep.target = this
		// 取值操作触发get
		const val = complierUtils.getVal(this.vm, this.expr)
		Dep.target = null
		return val
	}
	// 处理数据相关操作
	update() {
		const newVal = complierUtils.getVal(this.vm, this.expr)
		if (newVal !== this.oldVal) {
			this.cb(newVal)
		}
	}
}

// 事件调度中心
class Dep {
	constructor() {
		this.events = []
	}
	// 订阅 watcher
	on(watcher) {
		this.events.push(watcher)
	}
	// 触发事件
	emit() {
		this.events.forEach((watcher) => watcher.update())
	}
}
