const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
	mode: 'production',
	// devServer: {
	// 	port: 9000,
	// 	contentBase: './dist',
	// },
	entry: './src/index.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, './dist'),
	},
	plugins: [
		new HTMLWebpackPlugin({
			template: './src/index.html',
			filename: 'index.html',
		}),
		new MiniCssExtractPlugin({
			filename: 'main.css',
		}),
	],
	module: {
		rules: [
			{ test: /\.css$/, use: ['style-loader', 'css-loader'] },
			{
				test: /\.(sass|scss)$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader',
					'sass-loader',
				],
			},
		],
	},
}
