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

文档
内置插件
new webpack.optimize.UglifyJsPlugin(),

loader 三种用法

模式： development
会将 process.env.NODE_ENV 的值设为 development。启用 NamedChunksPlugin 和 NamedModulesPlugin。
production
会将 process.env.NODE_ENV 的值设为 production。启用 FlagDependencyUsagePlugin, FlagIncludedChunksPlugin, ModuleConcatenationPlugin, NoEmitOnErrorsPlugin, OccurrenceOrderPlugin, SideEffectsFlagPlugin 和 UglifyJsPlugin.

loader 处理 import require
module.exports = {
plugins: [require('autoprefixer')],
}

'css-loader',
{
loader: 'postcss-loader',
options: { sourceMap: true },
},

在 css 之前处理

babel
@babel/CORE
@babel/preset-env
class A {
a = 1
}
@babel/plugin-proposal-class-properties

处理 es6 语法
@babel/runtime --s
@babel/plugin-transform-runtime -D

处理 includes
babel-polyfill
引入 require()
@babel/core 我们已经测试过，不会转化任何源码。可以发现待转化的源码没有任何变化。因为 @babel/core 的作用只是用来解析源码、把 js 代码分析成 ast，方便各个插件分析语法进行相应处理

为了后续调用 babel 时更加直观，我们使用相应的 cli 库 @babel/cli

前面两个预设是从 ES 标准的维度来确定转码规则的，而 @babel/preset-env 是根据浏览器的不同版本中缺失的功能确定代码转换规则的，在配置的时候我们只用配置需要支持的浏览器版本就好了，@babel/preset-env 会根据目标浏览器生成对应的插件列表然后进行编译：
["@babel/preset-env", {
targets: {
browsers: ["last 10 versions", "ie >= 9"]
}
}],

     @babel/core 我们已经测试过，不会转化任何源码。所以为了能正确转化，我们必须使用对应的 plugins

Babel 推崇功能的单一性，就是每个插件的功能尽可能的单一。比如想使用 ES6 的箭头函数，需要对应的转化插件
yarn add @babel/plugin-transform-arrow-functions
复制代码
再执行 babel
yarn babel --plugins=@babel/plugin-transform-arrow-functions
转化箭头函数需要一个 Plugin，而 const 需要另外的。我们不可能一个个的设置所有的 Plugin

这时候就需要 Presets，可以简单理解为它是一堆 Plugin 的组合。常见的 Preset 如下：（前两个已弃用，了解一下即可）
2.2.4 @babel/preset-react
用来转化 jsx babeljs.io/docs/en/bab…

2.2.5 @babel/preset-typescript
用来转化 ts babeljs.io/docs/en/bab…
如果两个转换插件都将处理源码的某个代码片段时，转化将根据 Plugins 或 Presets 的排列顺序依次执行

Plugins 在 Presets 前运行
Plugin 顺序从前往后排列
Preset 顺序是颠倒的（从后往前）
看起来我们的 babel 配置好像已经比较完善了。我们在源码上再加两行代码并转化试试
可以看到 Promise 和 includes 均没有被转化

有理由怀疑可能是 targets 设置过大，不过实际上就算调整到 ie 6，新加的两行代码也不会被转化

这是由于 Babel 把 Javascript 语法 分为 syntax 和 api

类似箭头函数、let、const、class 等在 JavaScript 运行时无法重写的部分，就是 syntax 句法

类似 Promise、includes 等可以通过函数重新覆盖的语法都可以归类为 api 方法。而且方法本身还分为两类

转化 api 的思路很简单。在全局上下文下添加一个同名 api 即可

这些 api 都在 @babel/polyfill 中，所以先安装

yarn add @babel/polyfill

core-js 是用于 JavaScript 的组合式标准化库，它包含 es5 （e.g: object.freeze）, es6 的 promise，symbols, collections, iterators, typed arrays， es7+提案等等的 polyfills 实现。也就是说，它几乎包含了所有 JavaScript 最新标准的垫片
它是来自于 facebook 的一个库，链接。主要就是实现了 generator/yeild， async/await。
所以 babel-runtime 是单纯的实现了 core-js 和 regenerator 引入和导出，比如这里是 filter 函数的定义，做了一个中转并处理了 esModule 的兼容。
关于 preset-env 的几个常用配置如下
corejs
指定 core-js 库的版本。除非是有历史遗留的项目，否则使用官方推荐的就行，目前是 3
useBuiltIns
最重要的一个配置项，一共有 3 个值 false、usage 和 entry

false - 默认值。不转化 api，只转化 syntax
usage - 转化源码里用到的 api
entry - 转化所有的 api

看起来好像 usage 吊打 entry，其实不然。
真实开发中，我们通常会引用各种第三方库，并且为了编译速度，一般都配置了规则，不会让 babel 处理这些库。
但是第三方库质量良莠不齐，保不齐哪个库里的代码就没做好兼容性转化。一旦特定浏览器运行到这部分代码，轻则报 error，重则页面白屏
所以要是对第三方库没有完善的管理机制，还是使用 entry 更保险
使用 entry 时必须先手动引入 core-js 和 regenerator-runtime/runtime（在以前引入 @babel/polyfill 这个集成库即可，最新版 babel 弃用了这个设定，必须直接引入两个库）
// src/index.js
@babel/polyfill 本质就是集成了这两个库
import 'core-js'
import 'regenerator-runtime/runtime'
当然直接引入也有很大缺点，由于需要转化的 api 过多，会极大增加打包后的代码体积。因此一定要配合 targets 参数使用，这样 babel 只会转化指定浏览器版本所需要的 api

现在想象我们开发的不是一个普通项目，而是一个工具库。
有一天，一个同学引用了我们的工具库，本来这个同学的项目经过改写原 api，每次调用 promise 方法时都会发送一个埋点
可是在使用我们的工具库之后，由于工具库里全局引入了 core-js，导致各个 api 都被 core-js 里提供的方法全局覆盖以至于污染了。因此埋点方法彻底失效了！
显然这是不合理的，因此对于类库、工具库中的 api 转化，我们可以选择全局覆盖之外的另一种方法：api 替换
yarn add @babel/runtime @babel/plugin-transform-runtime @babel/runtime-corejs3

再修改配置（修改的是 plugins 而不是 presets）
// babel.config.js

module.exports = {
plugins: [
[
'@babel/plugin-transform-runtime',
{
corejs: 3,
},
]
]
源码并没有转化句法，因此还是需要使用 @babel/preset-env 来转化句法。（记得设置 useBuiltIns 为 false，以保证不使用 polyfill 来转化 api，不过不设置的情况下也会优先使用 runtime）

这篇主要讲 polyfill 和 runtime 总结下, Babel 只是转换 syntax 层语法,所有需要 @babel/polyfill 来处理 API 兼容,又因为 polyfill 体积太大，所以通过 preset 的 useBuiltIns 来实现按需加载,再接着为了满足 npm 组件开发的需要 出现了 @babel/runtime 来做隔离
https://zhuanlan.zhihu.com/p/58624930
设置为 entry，会把 polyfill 的包全部引入（包体积会增大），设置为 usage，不起作用（plugin 优先 preset 执行），所以，直接设为 false，或者不设都行（默认 false）
@babel/plugin-transform-runtime 可以避免全局污染，我们来看看是如何避免污染的。

如果我们配置的 corejs 是 3 版本，那么不管是实例方法还是全局方法，都不会再污染全局环境。“”

知道这个比较大的原因。是因为 @babel/plugin-transform-runtime 并没有 target 这个配置，他会引入所有浏览器的 polyfill，并且它不会做 tree-shaking。
targets 是@babel/preset-env 的一个配置项，用来配置要支持的浏览器环境，比如配置一个 chrome 70，那么只会注入 chrome70 及以上的版本还没有实现的 polyfill

    enforce: 'pre',

eslint-loader
然后在 devServer 中增加一个配置项。overlay:true 这样我们在开发过程中，如果有代码不符合规范，就会直接在浏览器上加一个蒙层，显示报错信息。
在检测过程中，如果存在一些浅显的问题，我们可以通过增加一个配置项自动修复。

图片 url-loader
当图片小于多少 k 使用 url-loader 转化成 base64 否则 file-loader
url-loader
options
limit: 200 \* 1024
outputPath: xxx 目录

css 写在 filename

输出时 publicpath: 加上域名最好加个/

图片也可以单独加 publicpath

多页
[name].js
多个 html
new html 插件两次
插件 chunks 对应 js

sourcemap

devtool: sourcemap

1. sourcemap 大而全增加文件
2. eval-source-map 不怎家文件显示行列
3. 不会列 cheap-module-s-m 会产生独立文件
4. cheap-module-eval-source-map

自动打包 watch
watch: true
watchOptions: {
poll: 1000,
防抖，
忽略 xxx

}

内置
clean
每次删除 dist 在生成性的
copy： 文档 从 xxx 拷贝到 xxx
banner： 版权
