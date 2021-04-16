// 应用
Promise.resolve(100).then(val => console.log(val))

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