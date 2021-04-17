const fs = require('fs')

// 分段读取，边写边读
function pipe(source, target) {
	// 可读流 默认 chunk.length === 64kb
	const rs = fs.createReadStream(source, { highWaterMark: 100 })
	// 可写流 默认 16kb
	const ws = fs.createWriteStream(target, { highWaterMark: 25 })

	// 读取是100b 一条 chunk 一直往下执行
	rs.on('data', (chunk) => {
		// ws.write(xxx)也是25b 一直执行， 它的返回值是100 > 25所以返回 false 代表一次写不完，所以需要暂停读取来写
		// 如果返回true多执行几次也会返回false一样要暂停
		if (!ws.write(chunk)) {
			rs.pause()
		}
	})

	// 在文件全部写入后触发恢复读取
	ws.on('drain', () => {
		rs.resume()
	})

	rs.on('end', () => {
		// 读完后，关闭写入
		ws.end()
	})
}

pipe('./stream/_test.md', './stream/_test.txt')