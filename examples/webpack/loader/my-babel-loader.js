const babel = require('@babel/core')

// loader 工具函数
const { getOptions } = require('loader-utils')

function loader(source) {
	// this 指向 loader 函数执行的对象，即 {loader: xxx, options: xxx} 对象
	const options = getOptions(this)
	// 异步 api
	const next = this.async()
	babel.transform(source, {
		...options
	}, (_err, res) => {
		next(_err, res.code)
	})
	return source
}

module.exports = loader