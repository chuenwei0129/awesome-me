const http = require('http')
const fs = require('fs')
const path = require('path')
const url = require('url')

const port = 3000

// mock 数据
let users = [
	{ username: '王小明', id: '1' },
	{ username: '李小萌', id: '2' },
	{ username: '李小刚', id: '3' },
	{ username: '孙小红', id: '4' }
]

http
	.createServer((req, res) => {
		// console.log(req.url) 代表请求的 url，link 和 script 也会发起请求，请求的是静态文件 请求 /user?id=1 它的返回值包含有 /user?id=1, pathname只有 /user
		// 解析请求 url 为对象 true是可以将 query 转换为对象
		const { query, pathname } = url.parse(req.url, true)
		// 获取静态文件
		// 浏览器地址栏输入的路径对应的服务器文件地址
		// express 可以 sendFile()搞定
		fs.stat(path.join(__dirname, pathname), (err, stats) => {
			if (err) {
				// 文件不存在 等同于 express sendStatus
				res.statusCode = 404
				res.end('404 not found')
			} else if (stats.isFile()) {
				// 输入的是文件 类似 localhost:3000/index.html
				// 根据不同文件写不同的头，这里解决 css mime类型
				const extname = pathname.match(/.\w+$/)[0]
				if (extname === '.css') {
					res.setHeader('Content-Type', 'text/css')
				} else if (extname === '.html') {
					res.setHeader('Content-Type', 'text/html;charset="utf-8"')
				} else if (extname === '.js') {
					// express header
					res.setHeader('Content-Type', 'application/javascript')
				}
				//
				fs.createReadStream(path.join(__dirname, pathname)).pipe(res)
			} else if (stats.isDirectory()) {
				// express send()搞定 等于 header 与 res.json() 之和
				// 输入的是文件夹 类似 localhost:3000/ or localhost:3000/test
				res.setHeader('Content-Type', 'text/html;charset="utf-8"')
				fs.createReadStream(path.join(__dirname, pathname, 'index.html')).pipe(
					res
				)
			}
		})

		// 获取动态文件
		if (pathname === '/clock') {
			const date = new Date()
			res.end(date.toISOString())
		}

		// restful 路由
		if (pathname === '/user') {
			if (req.method === 'GET') {
				if (query.id) {
					users.forEach(({ username, id }) => {
						if (query.id === id) {
							res.setHeader('Content-Type', 'text/json;charset="utf-8"')
							res.end(JSON.stringify({ username, id }))
						}
					})
				} else {
					res.setHeader('Content-Type', 'text/json;charset="utf-8"')
					res.end(JSON.stringify(users))
				}
			} else if (req.method === 'POST') {
				// 从请求体里读数据写入users req是个可独流
				let user = ''
				req.on('data', (chunk) => {
					// chunk就是请求体的数据,是个 buffer
					user += chunk
				})
				req.on('end', () => {
					user = JSON.parse(user)
					user.id = users.length ? '' + (users.length + 1) : '1'
					users.push(user)
					res.setHeader('Content-Type', 'text/json;charset="utf-8"')
					res.end(JSON.stringify(user))
				})
			} else if (req.method === 'DELETE') {
				let user = ''
				req.on('data', (chunk) => {
					// chunk就是请求体的数据,是个 buffer
					user += chunk
				})
				req.on('end', () => {
					user = JSON.parse(user)

					users = users.filter(({ id }) => {
						return user.id !== id
					})

					res.setHeader('Content-Type', 'text/json;charset="utf-8"')
					res.end(JSON.stringify({}))
				})
			} else if (req.method === 'PUT') {
				let user = ''
				req.on('data', (chunk) => {
					user += chunk
				})
				req.on('end', () => {
					user = JSON.parse(user)
					users.forEach((item) => {
						if (user.id === item.id) {
							item.username = user.username
						}
					})

					res.setHeader('Content-Type', 'text/json;charset="utf-8"')
					res.end(JSON.stringify(user))
				})
			}
		}
	})
	.listen(port, () => {
		console.log(`服务已在 http://localhost:${port} 开启`)
	})