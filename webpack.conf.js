const path = require('path')

module.exports = {
	mode: 'development',
	devServer: {
		contentBase: './dist',
		port: 3000,
	},
	entry: './src/index',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, './dist'),
	},
}
