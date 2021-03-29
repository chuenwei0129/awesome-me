/* eslint-disable sort-keys */
const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const smp = new SpeedMeasurePlugin()

module.exports = smp.wrap({
	entry: {
		vendor: './index.js'
	},
	mode: 'production',
	resolveLoader: {
		modules: [path.resolve(__dirname, 'loader'), 'node modules']
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				loader: path.resolve(__dirname, 'loader', 'loader1')
			},
			{
				test: /\.jsx?$/,
				loader: path.resolve(__dirname, 'loader', 'loader2')
			},
			{
				test: /\.jsx?$/,
				loader: path.resolve(__dirname, 'loader', 'loader3')
			}
		]
	},
	plugins: [
		new HTMLWebpackPlugin({ title: 'Title', template: './index.html' }),
		new BundleAnalyzerPlugin({
			// 是否启服务
			analyzerMode: 'disabled',
			// 生成状态文件
			generateStatsFile: true
		})
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
})