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
  mode: 'development',
  resolveLoader: {
    modules: [path.resolve(__dirname, 'loader'), 'node modules']
  },
  module: {
    rules: [
      {
        test: /\.(jpg|png|gif)$/,
        // url-loader file-loader(url-loader依赖于file-loader)默认处理不了html中img图片
        loader: 'url-loader',
        // 图片大小小于8kb，就会被base64处理（通常小图片(8-12kb)使用limit进行这种处理，如果有9kb的图片，我们可以将limit写成10 * 1024）
        // 优点: 减少请求数量（减轻服务器压力）
        // 缺点：图片体积会更大（文件请求速度更慢）
        options: {
          limit: 8 * 1024,
          // 问题：因为url-loader默认使用es6模块化解析
          // 与html-loader 解析方式不同，会 [object Object]
          // 解决：关闭 url-loader 的 es6 模块化，使用 commonjs 解析
          esModule: false,
          // 输出目录
          outputPath: 'images',
          // 给图片进行重命名
          // [hash:10]取图片的hash的前10位
          // [ext]取文件原来扩展名
          name: '[hash:10].[ext]'
        }
      },
      {
        // 另外一种解决方法是：在 html 模版中如此引入图片 <img src="<%= require('../src/png.png')%>" alt="图片">
        test: /\.html$/,
        loader: 'html-loader',
        // 因为 html-loader 使用 es6 模块化解析会出问题
        options: {
          esModule: false
        }
      },
      // {
      // 	test: /\.jsx?$/,
      // 	loader: path.resolve(__dirname, 'loader', 'loader1')
      // },
      // {
      // 	test: /\.jsx?$/,
      // 	loader: path.resolve(__dirname, 'loader', 'loader2')
      // },
      // {
      // 	test: /\.jsx?$/,
      // 	loader: path.resolve(__dirname, 'loader', 'loader3')
      // },
      {
        test: /\.jsx?$/,
        loader: path.resolve(__dirname, 'loader', 'my-banner-loader'),
        options: {
          filename: path.resolve(__dirname, 'banner.js'),
          text: '测试'
        }
      },
      {
        test: /\.jsx?$/,
        loader: path.resolve(__dirname, 'loader', 'my-babel-loader'),
        options: {
          presets: ['@babel/preset-env']
        }
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
  optimization: {}
})
