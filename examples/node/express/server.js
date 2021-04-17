const express = require('express')
const path = require('path')
const app = express()
// router 路由池子也是个函数，实现子路由
const router = express.Router()
const bodyParser = require('body-parser')
const port = 3000

app.listen(port, () => {
	console.log(`本地服务 http://localhost:${port}`)
})

// 静态服务中间件
// app.use(express.static('dist'))
// 将ejs更改为html模板
// app.engine('.html', require('ejs').__express)
// 更改默认路径
// app.set('views', path.join(__dirname, 'views'))
// 模板引擎后缀名
// app.set('view engine', 'html')

// 重定向
// app.use('/test', (req, res, next) => {
// 	res.redirect('http://www.baidu.com')
// 	next()
// })

app.get('/', (req, res) => {
	// res.header('Content-Type', 'text/html;charset=utf-8') sendFile会自己写头
	// { root: __dirname } 代表路径
	res.sendFile('./dist/index.html', { root: __dirname })
})

app.use((req, res, next) => {
	let _send = res.send
	let start = +new Date()
	res.send = function (...args) {
		// 此处会有this指向问题 ，高阶函数重写要注意this指向问题
		_send.call(res, ...args)
		let end = +new Date()
		let time = end - start
		console.log(`请求耗时 ${time} ms`)
	}
	next()
})

// 测试接口速度 学习中间件的装饰模式
app.get('/foo', (req, res) => {
	for (let index = 0; index < 1000000000; index++) {}
	res.send('foo 请求结束了')
})

app.get('/bar', (req, res) => {
	for (let index = 0; index < 10000000000; index++) {}
	res.send('bar 请求结束了')
})

app.param('id', (req, res, next) => {
	console.log('params 拦截器 执行了')
	next()
})

app.get('/:id', (req, res) => {
	console.log(`params的结果`, req.params.id)
	res.send(':id测试')
})

// 1. 路由精确匹配，2. 中间件默认 '/' 会匹配到子路由 3. 中间件的装饰模式，通过重写res的方法，用回调的方式在'/'中间件中实现公有方法 4. path， query ，params
// 拦截中间件，配合req.params执行
// 中间件原理 next()重写，req，res上可以添加方法，错误中间件
// form-data 的 格式 id=1&name=2 => {} ,querystring.parse() , 路由，
// todo: /:id/:name /1/user => {id: '1', name: 'user'}
// 路由池子 router是个函数是中间件的第二个参数
router.get('/login', (req, res) => {
	res.send('login测试')
})

router.get('/sigup', (req, res) => {
	res.send('sigup测试')
})

app.use('/user', router)

// 处理form-data bodyParser原理就是http中写的代码在中间件中处理在加上querystring.parse()处理formdata然后把数据挂载到body上
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// 使用ejs模板
app.post('/test', (req, res) => {
	res.render('test.ejs', {
		...req.body,
		arr: [1, 2, 3, 4],
		template: '<h3>hello world</h3>',
	})
})

app.all('*', (req, res) => {
	res.status(404).send('自定义404')
})
