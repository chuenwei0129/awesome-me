import React from './react.js'
import ReactDOM from './react-dom.js'

// 处理字符串，数字
// ReactDOM.render('hello world', document.getElementById('root'))

// ---------------------------------------------------------------
// babel 做的事 jsx === >>>
// {/* <div style={{ color: 'red' }} className="test" onClick={() => console.log('hello wrold')}>
// 	<b>JavaScript</b> is turning 25,and we're celebrating with free courses, expert-led live streams, and other fun surprises.
// </div> */}

/* #__PURE__ */
// React.createElement("div", {
//   style: {
//     color: 'red'
//   },
//   className: "test",
//   onClick: () => console.log('hello wrold')
// }, /*#__PURE__*/React.createElement("b", null, "JavaScript"), " is turning 25,and we're celebrating with free courses, expert-led live streams, and other fun surprises.");

// const element = React.createElement('div', {
// 	className: 'class_test',
// 	id: 'test',
// 	onClick: () => alert('hello wrold'),
// 	style: {
// 		backgroundColor: '#ccc',
// 		color: 'red'
// 	}
// }, React.createElement('b', null, 'JavaScript'), ' is turning 25,and we\'re celebrating with free courses, expert-led live streams, and other fun surprises.')

// console.log('react元素', element)

// ReactDOM.render(element,
// 	document.getElementById('root'))

// ---------------------------------------------------------------

class Counter extends React.Component {
	constructor(props) {
		super(props)

		this.state = { flag: true }
	}
	// handleClick = () => {
	// 	this.setState({ number: this.state.number + 1 })
	// }
	// componentWillMount() {
	// 	console.log('componentWillMount')
	// }
	componentDidMount() {
		console.log('componentDidMount')
		setTimeout(() => {
			this.setState({ flag: !this.state.flag })
		}, 1000)
	}
	shouldComponentUpdate(nextProps, nextState) {
		// console.log('shouldComponentUpdate', nextProps)
		return true
	}
	render() {
		// console.log('render')
		// const h1 = React.createElement('h1', { style: { color: 'red' } }, this.props.name)
		// const counter = React.createElement('p', { style: { color: (this.state.number & 1) === 0 ? 'red' : 'blue' } }, this.state.number)
		// const btn = React.createElement('button', { onClick: this.handleClick }, ' + ')

		// return React.createElement('div', { style: { backgroundColor: (this.state.number & 1) === 0 ? 'grey' : 'green' } }, h1, counter, btn)
		// return this.state.number

		const list1 = React.createElement('ul', null,
			React.createElement('li', { key: 'A' }, 'A'),
			React.createElement('li', { key: 'B' }, 'B'),
			React.createElement('li', { key: 'C' }, 'C'),
			React.createElement('li', { key: 'D' }, 'D')
		)
		const list2 = React.createElement('ul', null,
			React.createElement('span', { key: 'A' }, 'A1'),
			// React.createElement('li', { key: 'A' }, 'A1'),
			React.createElement('li', { key: 'C' }, 'C1'),
			React.createElement('li', { key: 'B' }, 'B1'),
			React.createElement('li', { key: 'E' }, 'E1'),
			React.createElement('li', { key: 'F' }, 'F1')
		)
		return this.state.flag ? list1 : list2
	}
	// componentWillUpdate() {
	// 	console.log('componentWillUpdate')
	// }
	// componentDidUpdate() {
	// 	console.log('componentDidUpdate')
	// }
}

// 组件
ReactDOM.render(React.createElement(Counter, { name: '计数器' }), document.getElementById('root'))

// 字符串
// ReactDOM.render('hello world', document.getElementById('root'))

// 处理普通 dom
// ReactDOM.render(React.createElement('h1', {}, 'hello world'), document.getElementById('root'))

