// 应用
Promise.resolve(100).then().then(() => 1000).then(val => console.log(val))
// then 中的值如果不传递，有可能会丢失，resolve成功参数不处理默认会向下传递，不处理，下一次可能丢失

Promise._resolve = function(props) {
	console.log(props)
	// 考虑 thenable 对象
	return new Promise((resolve, reject) => {
		resolve(props)
	})
	// return (props instanceof Promise ? props : new Promise((resolve, reject) => {
	// 	resolve(props)
	// }))
}

// 应用
Promise._resolve(Promise.resolve(100)).then(val => console.log(val))