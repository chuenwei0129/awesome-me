const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	mode: 'development',
	devServer: {
		contentBase: './dist',
		port: 3000,
		progress: true,
		compress: true,
	},
	entry: './src/index.js',
	output: {
		filename: 'bundle.[hash].js',
		path: path.resolve(__dirname, './dist'),
	},
	plugins: [
		new HTMLWebpackPlugin({
			title: 'Title',
			template: './src/index.html',
			filename: 'index.html',
			minify: {
				collapseWhitespace: true,
			},
			hash: true,
		}),
	],
}
