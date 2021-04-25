import { Element } from './element.js'
import types from './types.js'

let diffQueue = [] // 差异队列
let updateDepth = 0 // 深度

// 是否是脏组件，即type不同的组件直接替换脏组件
function shouldDeepCompare(oldElement, newElement) {
	if (oldElement != null || newElement != null) {
		if ((typeof oldElement === 'string' || typeof oldElement === 'number') && (typeof newElement === 'string' || typeof newElement === 'number')) {
			return true
		} else if (oldElement instanceof Element && newElement instanceof Element) {
			return oldElement.type === newElement.type
		}
	}
}

class Unit {
	constructor(reactElement) {
		// 当前渲染单元需要渲染的 react 元素
		this._currentReactElement = reactElement
	}
	create() {
		throw Error('创建渲染的 dom 节点字符串')
	}
}

class TextUnit extends Unit {
	create(reactid) {
		this._reactid = reactid
		return `<span data-reactid=${this._reactid}>${this._currentReactElement}</span>`
	}
	update(nextReactElement) {
		document.querySelector(`[data-reactid="${this._reactid}"]`).textContent = nextReactElement
	}
}

class NativeUnit extends Unit {
	create(reactid) {
		this._reactid = reactid
		this._childReactUnits = []
		const { type, props } = this._currentReactElement
		let tagStart = `<${type} data-reactid="${this._reactid}"`
		let childString = ''
		const tagEnd = `</${type}>`
		for (const [key, val] of Object.entries(props)) {
			if (key === 'className') { // class
				tagStart = tagStart + `class="${val}"`
			} else if (key === 'style') { // style
				const style = Object.entries(val).map(([k, v]) => {
					return `${k.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`)}:${v}`
				}).join(';')
				tagStart = tagStart + `style="${style}"`
			} else if (/^on[A-Z]/.test(key)) { // 事件
				const eventName = key.slice(2).toLowerCase()
				// console.log('事件处理对象', type)
				// 因为 生成的react元素还未挂到dom 所以获取不到，事件挂在document上后续冒泡
				document.addEventListener(eventName, val)
				// type.addEventListener(eventName, val)
			} else if (key === 'children') { // 子元素 可能是字符串，也可能是 DOM
				// console.log('子元素', val)
				val.forEach((el, idx) => {
					
					const childReactUnit = createReactUnit(el)
					// 给每个渲染单元节点加索引
					childReactUnit._mountedIndex = idx
					this._childReactUnits.push(childReactUnit)
					// 如果是字符串会初始化字符串
					const childHTML = childReactUnit.create(`${this._reactid}_${idx}`)
					// 最终 合并 html 字符串
					childString = childString + childHTML
				})
			} else { // 一般属性
				tagStart = tagStart + `${key}="${val}"`
			}
		}
		// 这里就是组件和dom单元最终会返回的值
		// react 只是以组件为单位 innerHTML 字符串
		return tagStart + '>' + childString + tagEnd
	}
	update(nextReactElement) {
		// console.log('nextReactElement', nextReactElement)
		const prevProps = this._currentReactElement.props
		const nextProps = nextReactElement.props
		this.updateDOMProps(prevProps, nextProps)
		// 先更新自生dom属性，在更新儿子dom，参数是儿子react元素
		// console.log(nextReactElement.props.children);
		this.updateDOMChildren(nextReactElement.props.children)
	}
	// 获取老得儿子
	getPrevChildReactUnitsMap(childReactUnits) {
		// key 和 react单元一一对应
		const map = {}
		childReactUnits.forEach((unit, idx) => {
			map[unit._currentReactElement.props?.key ?? `${idx}`] = unit
		})
		return map
	}
	getNextChildReactUnits(prevChildReactUnitsMap, nextChildReactElements) {
		const nextChildReactUnits = []
		const nextChildReactUnitsMap = {}
		// console.log('旧的子 react 元素', prevChildReactUnitsMap)
		// console.log('新的子 react元素', nextChildReactElements)
		// 先通过 key 查找老得有没有可用的，没有就创建新的，返回一个新的单元
		nextChildReactElements.forEach((nextChildReactElement, idx) => {
			const nextKey = nextChildReactElement.props?.key ?? `${idx}`
			const prevChildReactUnit = prevChildReactUnitsMap[nextKey]
			// 获取老得 react 元素
			const prevChildReactElement = prevChildReactUnit?._currentReactElement
			// 同级比较是否 type 相同，先更新
			if (shouldDeepCompare(prevChildReactElement, nextChildReactElement)) {
				// 先更新在加入新数组,复用
				prevChildReactUnit.update(nextChildReactElement)
				nextChildReactUnits.push(prevChildReactUnit)
				nextChildReactUnitsMap[nextKey] = prevChildReactUnit
			} else {
				// 新数组是老得复用新的创建的数组
				// 为什么=出bug是因为通过key会多出span，通过key判定，行数组是老节点也在里面
				const nextChildReactUnit = createReactUnit(nextChildReactElement)
				nextChildReactUnits.push(nextChildReactUnit)
				nextChildReactUnitsMap[nextKey] = nextChildReactUnit
				// 第二个 bug 循环错乱 _childReactUnits，删除处也要处理
				this._childReactUnits[idx] = nextChildReactUnit
			}
		})
		// console.log('新的react渲染单元', nextChildReactUnits)
		return { nextChildReactUnits, nextChildReactUnitsMap }
	}
	// diff算法
	diff(diffQueue, nextChildReactElements) {
		const prevChildReactUnitsMap = this.getPrevChildReactUnitsMap(this._childReactUnits)
		const { nextChildReactUnits, nextChildReactUnitsMap } = this.getNextChildReactUnits(prevChildReactUnitsMap, nextChildReactElements)
		console.log(nextChildReactUnitsMap);
		let lastIndex = 0 // 老得单元数组最后一个不移动复用节点的索引位置
		nextChildReactUnits.forEach((nextChildReactUnit, idx) => {
			const nextKey = nextChildReactUnit._currentReactElement?.props?.key ?? `${idx}`
			const prevChildReactUnit = prevChildReactUnitsMap[nextKey]
			// 旧节点是否可复用，复用移动，不复用插入新的节点
			console.log('xxx', prevChildReactUnitsMap);
			if (nextChildReactUnit === prevChildReactUnit) {
				if (prevChildReactUnit._mountedIndex < lastIndex) {
					diffQueue.push({
						parentId: this._reactid,
						parentNode: document.querySelector(`[data-reactid="${this._reactid}"]`),
						type: types.MOVE,
						// eslint-disable-next-line sort-keys
						fromIndex: prevChildReactUnit._mountedIndex,
						toIndex: idx
					})
				}
				lastIndex = Math.max(lastIndex, prevChildReactUnit._mountedIndex)
			} else {
				// key相等但无法复用的节点，原因，新数组是把复用和不复用的都放里面 diff
				if (prevChildReactUnit) {
					diffQueue.push({
						parentId: this._reactid,
						parentNode: document.querySelector(`[data-reactid="${this._reactid}"]`),
						type: types.REMOVE,
						// eslint-disable-next-line sort-keys
						fromIndex: prevChildReactUnit._mountedIndex
					})
					// 删除节点需要 解绑事件，也需要把 _childReactUnits，过滤掉老得删掉的
					this._childReactUnits = this._childReactUnits.filter(item => item !== prevChildReactUnit)
				}
				diffQueue.push({
					parentId: this._reactid,
					parentNode: document.querySelector(`[data-reactid="${this._reactid}"]`),
					type: types.INSERT,
					// eslint-disable-next-line sort-keys
					toIndex: idx,
					// eslint-disable-next-line sort-keys
					insertDOMString: nextChildReactUnit.create(`${this._reactid}_${idx}`)
				})
			}
			nextChildReactUnit._mountedIndex = idx
		})
		// 旧节点中再行节点中不在的要删掉
		Object.keys(prevChildReactUnitsMap).forEach(key => {
			if (!(key in nextChildReactUnitsMap)) {
				diffQueue.push({
					parentId: this._reactid,
					parentNode: document.querySelector(`[data-reactid="${this._reactid}"]`),
					type: types.REMOVE,
					// eslint-disable-next-line sort-keys
					fromIndex: prevChildReactUnitsMap[key]._mountedIndex
				})
				this._childReactUnits = this._childReactUnits.filter(item => item !== prevChildReactUnitsMap[key])
			}
		})
	}
	updateDOMChildren(nextChildReactElements) {
		console.log('执行次数');
		// eslint-disable-next-line no-unused-vars
		updateDepth++
		this.diff(diffQueue, nextChildReactElements) // diff 是递归遍历的
		// console.log('diff队列', diffQueue)
		// eslint-disable-next-line no-unused-vars
		updateDepth--
		if (updateDepth === 0) {
			// 遍历结束，响应页面
			this.patch(diffQueue)
			diffQueue = []
		}
	}
	patch(diffQueue) {
		// 处理 dom 操作
		const willRemovedNodes = [] // 删除
		const repeatedNodesMap = {}// 暂时存储复用
		diffQueue.forEach((node) => {
			if (node.type === types.MOVE || node.type === types.REMOVE) {
				const prevNode = node.parentNode.children[node.fromIndex]
				// node.fromIndex 这里会有命名空间问题，嵌套几层会共用一个fromIndex
				repeatedNodesMap[node.fromIndex] = prevNode
				willRemovedNodes.push(prevNode)
			}
		})
		willRemovedNodes.forEach(node => node.remove())
		// 分开写，删除和插入放在一个循环里会节点错乱
		// 插入两种情况index是否占有，有在前插入无在后插
		diffQueue.forEach(node => {
			const oldNode = node.parentNode.children[node.toIndex]
			if (node.type === types.MOVE) {
				const repeatedNode = repeatedNodesMap[node.fromIndex]
				oldNode ? oldNode.before(repeatedNode)
					: node.parentNode.appendChild(repeatedNode)
			}
			if (node.type === types.INSERT) {
				oldNode ? oldNode.insertAdjacentHTML('beforebegin', node.insertDOMString)
					: node.parentNode.insertAdjacentHTML('beforeend', node.insertDOMString)
			}
		})
	}
	updateDOMProps(prevProps, nextProps) {
		// 循环新属性
		for (const [key, val] of Object.entries(nextProps)) {
			if (key === 'children') { // 先不处理
				continue
			} else if (/^on[A-Z]/.test(key)) {
				const eventName = key.slice(2).toLowerCase()
				document.addEventListener(eventName, val)
			} else if (key === 'style') {
				Object.entries(val).forEach(([k, v]) => {
					document.querySelector(`[data-reactid="${this._reactid}"]`).style[k] = v
				})
			} else if (key === 'className') { // class
				document.querySelector(`[data-reactid="${this._reactid}"]`).setAttribute('class', val)
			} else {
				document.querySelector(`[data-reactid="${this._reactid}"]`).setAttribute(key, val)
			}
		}
		// 循环旧属性
		for (const key of Object.keys(prevProps)) {
			if (!(key in nextProps)) {
				document.querySelector(`[data-reactid="${this._reactid}"]`).removeAttribute(key)
			}
			// 解绑事件
		}
	}
}

class ComponentUnit extends Unit {
	create(reactid) {
		this._reactid = reactid
		const { type: Component, props } = this._currentReactElement
		this._instanceComponent = new Component(props)
		// 把用户组件和react渲染组件单元建立联系
		this._instanceComponent._currentUnit = this
		this._instanceComponent.componentWillMount && this._instanceComponent.componentWillMount()
		// 组件 render 返回值就是 dom 类型的 react 元素
		// 组件的 react 元素有三种情况 原来的，渲染后的，更新状态的
		const renderedReactElement = this._instanceComponent.render()

		document.addEventListener('mounted', () => {
			this._instanceComponent.componentDidMount && this._instanceComponent.componentDidMount()
		})

		// 递归创建 dom 类型 react 单元, 初始化渲染的单元
		this._renderedReactUnit = createReactUnit(renderedReactElement)
		return this._renderedReactUnit.create(this._reactid)
	}
	update(nextReactElement, nextState) {
		// 新的 props 是当前 react 单元的，如果不传就用老的props
		const prevProps = this._currentReactElement?.props
		let nextProps = nextReactElement?.props
		nextProps = nextProps ?? prevProps
		// 更新状态
		this._instanceComponent.state = { ...this._instanceComponent.state, ...nextState }

		this._instanceComponent.componentWillUpdate && this._instanceComponent.componentWillUpdate()

		if (this._instanceComponent.shouldComponentUpdate && !this._instanceComponent.shouldComponentUpdate(nextProps, nextState)) {
			// eslint-disable-next-line no-useless-return
			return
		}
		// 获取状态改变后的 react 元素
		this._nextReactElement = this._instanceComponent.render()

		// 新老 react 元素对比
		if (shouldDeepCompare(this._renderedReactUnit._currentReactElement, this._nextReactElement)) {
			// 单层 dom diff，他内部没有任何优化
			// type 相同，更新老得节点
			// _nextReactElement调用对应的 react 单元update 方法
			this._renderedReactUnit.update(this._nextReactElement)
		} else {
			// type 不同，直接创建新的节点并插入dom
			document.querySelector(`[data-reactid="${this._reactid}"]`)
				.innerHTML = createReactUnit(this._nextReactElement).create(this._reactid)
		}
		this._instanceComponent.componentDidUpdate && this._instanceComponent.componentDidUpdate()
	}
}

// 工厂模式
export function createReactUnit(reactElement) {
	if (typeof reactElement === 'string' || typeof reactElement === 'number') {
		return new TextUnit(reactElement)
	}
	if (reactElement instanceof Element && typeof reactElement.type === 'string') {
		return new NativeUnit(reactElement)
	}
	if (reactElement instanceof Element && typeof reactElement.type === 'function') {
		return new ComponentUnit(reactElement)
	}
}