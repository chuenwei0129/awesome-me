// react 元素类
class Element {
	constructor(type, props) {
		this.type = type
		this.props = props
	}
}

// createElement 生成 React 元素
function createElement(type, props, ...children) {
	// children 剩余参数放入 children 数组中
	// children 也是 react 元素的 props 属性
	// props 传 null 时，为 {}
	props = props ?? {}
	props.children = children ?? []
	return new Element(type, props)
}

export {
	Element,
	createElement
}