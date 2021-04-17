//* 在 windows cmd 中 set NODE_ENV=dev 执行下面代码就是生产环境 pwsh中为 $Env:NODE_ENV="dev" mac 中为 export
if (process.env.NODE_ENV === 'dev') {
	console.log('开发环境')
} else {
	console.log('生产环境')
}

// cross-env NODE_ENV=development nodemon ap.js 可以配置跨平台环境变量

//* process.nextTick
console.log('主线程')

// 优先于 setTimeout，性能也高于setTimeout，this 指向 global
process.nextTick(function() {
	console.log('nextTick', this)
})

// this 指向 timeout 箭头函数下指向 {}
setTimeout(function() {
	console.log('setTimeout', this)
})

setTimeout(() => {
	console.log('setTimeout =>', this)
})

//! 获取命令行参数：process.argv process.argv 返回一个数组，数组元素分别如下：
// 元素1：node
// 元素2：可执行文件的绝对路径
// 元素x：其他，比如参数等
//! process.cwd()：返回当前工作路径
//! process.chdir(directory)：切换当前工作路径

console.log('命令行参数', process.argv)
console.log('当前工作路径', process.cwd())
process.chdir('../')
console.log('切换后的工作路径', process.cwd())

// ? 标准输入/标准输出/标准错误输出：process.stdin、process.stdout
process.stdin.setEncoding('utf8')

process.stdin.on('readable', () => {
	const chunk = process.stdin.read()
	if (chunk !== null) {
		process.stdout.write(`data: ${chunk}`)
	}
})

process.stdin.on('end', () => {
	process.stdout.write('end')
})

// 执行程序，程序通过 process.stdin 读取用户输入的同时，通过 process.stdout 将内容输出到控制台