import { createReactUnit } from './unit.js'

// 根节点
const rootIndex = '0'
// 注册自定义 mounted 事件
const event = new Event('mounted')

function render(reactElement, container) {
	// container.innerHTML = `<span data-reactid="0">${element}</span>`
	// 创建组件类型的 react 渲染单元
	const reactUnit = createReactUnit(reactElement)
	// 返回的是当前渲染的 react 单元即 当前 react 元素就是 react-dom 的参数
	// console.log('渲染的内容', reactUnit.create(rootIndex));
	container.innerHTML = reactUnit.create(rootIndex)
	// 渲染完毕触发 mounted 事件
	document.dispatchEvent(event)
}

export default {
	render
}