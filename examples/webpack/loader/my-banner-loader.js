const loaderUtils = require('loader-utils')
// 校验 options 工具
// const { validate } = require('schema-utils')
const fs = require('fs')
function loader(source) {
	this.cacheable && this.cacheable()
	const options = loaderUtils.getOptions(this)
	// 异步 api
	const next = this.async()
	// const schema = {
	// 	type: 'object',
	// 	properties: {
	// 		text: {
	// 			type: 'string'
	// 		},
	// 		filename: {
	// 			type: 'string'
	// 		}
	// 	}
	// }

	// validate(schema, options, 'my-banner-loader')
	if (options.filename) {
		// 自动的添加文件依赖，对应 watch
		this.addDependency(options.filename)
		fs.readFile(options.filename, 'utf8', function(err, data) {
			next(err, `/**${data}**/   ${source}`)
		})
	} else {
		next(null, `/**${options.text}**/   ${source}`)
	}
}
module.exports = loader