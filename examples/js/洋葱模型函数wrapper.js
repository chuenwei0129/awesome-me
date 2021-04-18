// aop
// 高阶函数,洋葱切面
// +----------------------------------------------------------------------------------+
//         |                                                                                  |
//         |                              middleware 1                                        |
//         |                                                                                  |
//         |          +-----------------------------------------------------------+           |
//         |          |                                                           |           |
//         |          |                    middleware 2                           |           |
//         |          |                                                           |           |
//         |          |            +---------------------------------+            |           |
//         |          |            |                                 |            |           |
//         | action   |  action    |        middleware 3             |    action  |   action  |
//         | 001      |  002       |                                 |    005     |   006     |
//         |          |            |   action              action    |            |           |
//         |          |            |   003                 004       |            |           |
//         |          |            |                                 |            |           |
// +---------------------------------------------------------------------------------------------------->
//         |          |            |                                 |            |           |
//         |          |            |                                 |            |           |
//         |          |            +---------------------------------+            |           |
//         |          +-----------------------------------------------------------+           |
//         +----------------------------------------------------------------------------------+

function highFn(method, wrappers) {
	// 不立即执行只需要函数封装一下就好了
	return () => {
		wrappers.forEach((ele) => ele.init())
		method()
		wrappers.forEach((ele) => ele.close())
	}
}

const newFn = highFn(() => {
	console.log('hello world')
}, [
	{
		init() {
			console.log('wrapper1 init')
		},
		close() {
			console.log('wrapper1 close')
		}
	},
	{
		init() {
			console.log('wrapper2 init')
		},
		close() {
			console.log('wrapper2 close')
		}
	}
])

newFn()