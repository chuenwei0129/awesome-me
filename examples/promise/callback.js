/* eslint-disable node/no-callback-literal */
function func(cb) {
	setTimeout(() => {
		console.log('异步执行')
		cb && cb('异步执行结果')
	}, 2000)
}

function callback(props) {
	// 处理异步执行结果
	console.log(props)
}

func(callback)

// promise 本质其实就是回调