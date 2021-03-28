/* eslint-disable sort-keys */
const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: {
		vendor: './index.js'
	},
	mode: 'production',
	module: {
		rules: []
	},
	plugins: [
		new HTMLWebpackPlugin({ title: 'Title', template: './index.html' })

	],
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist'),
		clean: true
	},
	devServer: {
		contentBase: './dist',
		hot: true
	},
	// devtool: 'source-map',
	optimization: {
	}
}