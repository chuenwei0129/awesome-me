# webpack

## 安装

```sh
npm i webpack -s
npm i webpack-cli -D
npx webpack -v
```

npx 甚至支持运行远程仓库的可执行文件，如

```
npx github:piuccio/cowsay hello
```

npx 会自动查找当前依赖包中的可执行文件，如果找不到，就会去 PATH 里找。如果依然找不到，就会帮你安装！

webpack --config xxxx

开发服务：npm i webpack-dev-server -D

打包到内存中，并起个服务
npx webpack-dev-server --config webpack.conf.js

    devServer: {
    	contentBase: './dist', // 开发服务器路径
    	port: 3000,
        	progress: true,
    	// gzip 压缩
    	compress: true,
    },

html 自动插入
自动引入打包后的 js，然后塞到 dist 下
npm i html-webpack-plugin -D

new HTMLWebpackPlugin({
title: 'Title',
template: './src/index.html',
// 输出的 dist 目录下的 html 名字
filename: 'index.html',
}),

一些配置
minify: {
一行 html
collapseWhitespace: true,
},
hash: true

增加 hash 错，防止浏览器缓存

bundle.[hash:8],js
hash 长度

样式处理
style-loader
插件作用是可以把 css 插入 head
css-loader
处理@import 语法
加前缀
需要 postcss.config.js
autoprefixer
postcss-loader
处理预处理器
sass-loader
node-sass
压缩 css 插件
loader 从下往上执行

通过向 npm run build 命令和你的参数之间添加两个中横线，可以将自定义参数传递给 webpack，例如：npm run build -- --colors ？
