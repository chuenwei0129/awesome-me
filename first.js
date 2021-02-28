/* eslint-disable no-mixed-spaces-and-tabs */
class Button {
	constructor(val) {
		this.val = val
	}
	click = () => {
		console.log(this.val)
	}
}

const button = new Button('hello world')

button.click() // 'hello world'

setTimeout(button.click, 1000)