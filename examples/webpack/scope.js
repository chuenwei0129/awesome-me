import utils from './util'

// 作用域提升
function fn() {
	console.log(utils)
	a()
	b()
}

function a() {
	console.log('a')
}

function b() {
	console.log('b')
}

fn()

export default 'hello world'