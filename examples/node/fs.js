// util.inherits // 继承 类似于我们手写 super.call(this) 和 原型继承
// util.promisify // 回调转为promise

const fs = require('fs')
const path = require('path')
const { promisify } = require('util')

// 同步读取
let data
const filePath = path.resolve(__dirname, './test.txt')
try {
	data = fs.readFileSync(filePath)
	console.log('文件内容1：', data)
} catch (error) {
	console.log('文件读取出错1：', error)
}

// 异步读取
fs.readFile(filePath, (err, data) => {
	if (err) {
		console.log('文件读取出错2：', err)
	} else {
		console.log('文件内容2：', data)
	}
})

// promisify 把回调 api 转换成 promise， aop 思想  可以在require时
const read = promisify(fs.readFile)
read(filePath)
	.then((data) => {
		console.log('文件内容3：', data)
	})
	.catch((err) => {
		console.log('文件读取出错3：', err)
	})

// .promises 会把整个对像所有方法转成 promises 原理循环对象然后重写key
fs.promises
	.readFile(filePath)
	.then((data) => {
		console.log('文件内容4：', data)
	})
	.catch((err) => {
		console.log('文件读取出错4：', err)
	})

// 创建目录
// 同步 目录已存在会报错
try {
	fs.mkdirSync('./fs/test')
} catch (err) {
	console.log('创建目录失败1', err)
}
// 异步 目录已存在会报错
fs.promises.mkdir('./fs/tes1').catch((err) => {
	console.log('创建目录失败2', err)
})

// 获取文件状态
// fs.stat() vs fs.fstat()：传文件路径 vs 文件句柄。
// fs.stat() vs fs.lstat()：如果文件是软链接，那么fs.stat()返回目标文件的状态，fs.lstat()返回软链接本身的状态。
fs.stat('./fs.js', (err, stats) => {
	// stats对象 判断是否是文件还是目录
	if (err) console.log(err)
	console.log(stats)
	console.log(stats.isFile())
	console.log(stats.isDirectory())
})

// 遍历目录
// 同步版本，注意：fs.readdirSync()只会读一层，所以需要判断文件类型是否目录，如果是，则进行递归遍历。

console.log(fs.readdirSync('./fs'))