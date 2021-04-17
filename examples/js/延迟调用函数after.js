// 实现一个高阶函数 after, 他有两个参数 times 和 realFn, times次调用后执行realFn

function after(times, realFn) {
	return () => {
		if (--times === 0) {
			return realFn() // 真正执行的函数
		}
	}
}

const fn = after(2, () => {
	console.log('hello world')
})

fn()
fn()
