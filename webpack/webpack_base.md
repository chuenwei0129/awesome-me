# 渐进式的学习 Webpack<!-- omit in toc -->
- [webpack 是什么](#webpack-是什么)
- [webpack 的作用](#webpack-的作用)
- [模式（Mode）](#模式mode)
- [基本安装](#基本安装)
- [开发环境的基本配置](#开发环境的基本配置)
  - [创建配置文件](#创建配置文件)
  - [打包 html 资源](#打包-html-资源)
  - [打包 css 资源](#打包-css-资源)
    - [配置](#配置)
    - [关于 PostCSS](#关于-postcss)
    - [关于 source maps 的提示](#关于-source-maps-的提示)
  - [打包静态资源](#打包静态资源)
    - [资源模块](#资源模块)
    - [自定义输出文件名](#自定义输出文件名)
    - [通用资源类型](#通用资源类型)
    - [加载数据](#加载数据)
    - [webpack 5 配置](#webpack-5-配置)
    - [webpack 4 配置](#webpack-4-配置)
  - [打包 js 资源](#打包-js-资源)
    - [Babel](#babel)
      - [安装](#安装)
      - [babel-loader](#babel-loader)
      - [@babel/core](#babelcore)
      - [@babel/preset-env](#babelpreset-env)
      - [@babel/preset-env 参数](#babelpreset-env-参数)
      - [@babel/preset-react](#babelpreset-react)
      - [babel plugin 配置](#babel-plugin-配置)
    - [Eslint 配置](#eslint-配置)
  - [devserver](#devserver)
  - [devtool](#devtool)
  - [external](#external)
  - [noParse](#noparse)
  - [copy-webpack-plugin](#copy-webpack-plugin)
  - [resolve](#resolve)
  - [resolveLoader](#resolveloader)
  - [智能感知 import 别名导入文件](#智能感知-import-别名导入文件)
  - [压缩图片](#压缩图片)
    - [image-webpack-loader](#image-webpack-loader)
    - [image-minimizer-webpack-plugin](#image-minimizer-webpack-plugin)
  - [IgnorePlugin](#ignoreplugin)
  - [cross-env 跨平台设置环境变量](#cross-env-跨平台设置环境变量)
  - [DefinePlugin 用来设置模块内的全局变量](#defineplugin-用来设置模块内的全局变量)
  - [其他环境变量设置](#其他环境变量设置)
  - [缓存](#缓存)
    - [babel-loader 很慢](#babel-loader-很慢)
    - [cache-loader](#cache-loader)
  - [webpack-merge](#webpack-merge)
  - [优化](#优化)

## webpack 是什么

> [webpack](https://webpack.docschina.org/) 是一种前端资源构建工具，一个静态模块打包器(`module bundler`)。在 `webpack` 看来, 前端的所有资源文件(`js/json/css/img/less/...`)都会作为模块处理。它将根据模块的依赖关系进行静态分析，打包生成对应的静态资源(`bundle`)。

## webpack 的作用

1. **模块打包**。可以将不同模块的文件打包整合在一起，并且保证它们之间的引用正确，执行有序。利用打包我们就可以在开发的时候根据我们自己的业务自由划分文件模块，保证项目结构的清晰和可读性。

2. **编译兼容**。通过 `webpack` 的 `Loader` 机制，不仅仅可以帮助我们对代码做 `polyfill`，还可以编译转换诸如 `.less`, `.vue`, `.jsx` 这类在浏览器无法识别的格式文件，让我们在开发的时候可以使用新特性和新语法做开发，提高开发效率。

3. **能力扩展**。通过 `webpack` 的 `Plugin` 机制，我们在实现模块化打包和编译兼容的基础上，可以进一步实现诸如按需加载，代码压缩等一系列功能，帮助我们进一步提高自动化程度，工程效率以及打包输出的质量。

## 模式（Mode）

|    选项     |                                                                                                                描述                                                                                                                |
| :---------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| development |                                                          会将 DefinePlugin 中 process.env.NODE_ENV 的值设置为 development。启用 NamedChunksPlugin 和 NamedModulesPlugin。                                                          |
| production  | 会将 DefinePlugin 中 process.env.NODE_ENV 的值设置为 production。为模块和 chunk 启用确定性的混淆名称，启用 FlagDependencyUsagePlugin，FlagIncludedChunksPlugin，ModuleConcatenationPlugin，NoEmitOnErrorsPlugin 和 TerserPlugin 。 |

## 基本安装

1. 全局安装
```sh
npm i webpack webpack-cli -g
```
2. 简单命令
```sh
# 指定模式
webpack src/index.js -o build/bundle.js --mode=development
```
3. 配置脚本
```json
"scripts": {
    "build": "webpack --config webpack.conf.js"
  },
```

## 开发环境的基本配置

### 创建配置文件

创建文件 `webpack.config.js` 配置内容如下
```js
const { resolve } = require('path') // node 内置核心模块，用来处理路径问题。

module.exports = {
  // 入口文件 ['1.js', '2.js'] or {vendor: './react.js'}
  entry: './src/index.js',
  output: {
    // 输出文件名，'[vendor].js'
    filename: 'bundle.js',
    // 输出文件路径配置
    path: resolve(__dirname, 'build'),
    // 所有资源引入公共路径前缀 --> 'imgs/a.jpg' --> '/imgs/a.jpg'
    // publicPath: '/',
    // 每次打包都把 build 目录清理
    clean: true
  },
  // loaders
  module: {
    rules: []
  },
  // 插件
  plugins: [],
  // 环境
  mode: 'development'
}
```

###  打包 html 资源

下载安装包
```js
npm i -D html-webpack-plugin
```
修改配置文件 `webpack.config.js`
```js
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      // loader 的配置
    ]
  },
  plugins: [
    // plugins 的配置
    // html-webpack-plugin
    // 功能：默认会创建一个空的 HTML，自动引入打包输出的所有资源（JS/CSS）
    // 需求：需要有结构的 HTML 文件,需要添加一个 template
    new HtmlWebpackPlugin({
      // 复制 './src/index.html' 文件，并自动引入打包输出的所有资源（JS/CSS）
      template: './src/index.html'
    })
  ],
  mode: 'development'
}
```

### 打包 css 资源
#### 配置
下载安装包
```sh
npm i css-loader style-loader less less-loader postcss postcss-loader postcss-preset-env autoprefixer mini-css-extract-plugin css-minimizer-webpack-plugin -D
```

修改配置文件 `webpack.config.js`
```js
const path = require('path')
// 这个插件的作用：css 样式不是放在 style 标签中的，而是通过 link 的方式使用
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
// 这个插件使用 cssnano 优化和压缩 CSS。就像 optimize-css-assets-webpack-plugin 一样，但在 source maps 和 assets 中使用查询字符串会更加准确，支持缓存和并发模式下运行。

module.exports = {
	entry: './src/index.js',
	mode: 'development',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'build'),
		clean: true
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
          // 'style-loader' 作用：创建 style 标签，将样式放入 style 标签中,
					MiniCssExtractPlugin.loader, 'css-loader', {
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [
									// 压缩 css
									// 'cssnano',
									'autoprefixer',
									['postcss-preset-env', {
										// Options
									}]
								]
							}
						}
					}]
			},
			{
				test: /\.less$/,
				use: ['style-loader', 'css-loader', 'less-loader']
			}
		]
	},
	plugins: [
		// 复制 './src/index.html' 文件，并自动引入打包输出的所有资源（JS/CSS）
		new HTMLWebpackPlugin({ template: './src/index.html' }),
		new MiniCssExtractPlugin({
			// 对输出的 css 文件进行重命名
			filename: 'css/bundle.css'
		})
	],
	// 压缩css
  optimization: {
    minimize: true,
    minimizer: [
      // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 `terser-webpack-plugin`），将下一行取消注释
      // `...`,
      new CssMinimizerPlugin(),
    ],
  },
}
```

#### 关于 PostCSS
[PostCSS](https://github.com/postcss/postcss) 的配置写法有以下三种方式：

- 通过配置文件 `postcss.config.js`，一般放置在项目的根目录下
- 通过 `loader` 的配置项 `options`
- 直接在 `package.json` 中添加个 `postcss` 属性。（不推荐）

例 1：
```js
// postcss.config.js
module.exports = {
  plugins: [
    require('autoprefixer')
  ]
}
```
例 2：
```js
{
  loader: 'postcss-loader',
  options: {
    postcssOptions: {
      plugins: [
        // 压缩 css
        // 'cssnano',
        'autoprefixer',
        ['postcss-preset-env', {
          // Options
        }]
      ]
    }
  }
}
```

[Autoprefixer](https://github.com/postcss/autoprefixer) 的主要参数就是 [browserslist](https://github.com/browserslist/browserslist)，即需要代码支持的浏览器列表。通过设置目标浏览器可以让我们的代码更有针对性的输出兼容性代码（包括 `CSS` 前缀、`JS` 的 `Polyfill` 等），而不是无脑的全部兼容。

`Browserslist` 就是帮助我们来设置目标浏览器的工具。`Browserslist` 被广泛的应用到 `Babel`、`postcss-preset-env`、`autoprefixer` 等开发工具上。

`Browserslist` 的配置可以放在 `package.json` 中，也可以单独放在配置文件 `.browserslistrc` 中。所有的工具都会主动查找 `browserslist` 的配置文件，根据 `browserslist` 配置找出对应的目标浏览器集合。

在 `package.json` 中的配置是增加一个 `browserslist` 数组属性

```json
{
    "browserslist": ["last 2 version", "> 1%", "maintained node versions", "not ie < 11"]
}
```

#### 关于 source maps 的提示 

仅对 `devtool` 配置项的 `source-map`、`inline-source-map`、`hidden-source-map` 与 `nosources-source-map` 值生效。

为什么呢？因为 CSS 仅支持这些 `source map` 类型。

### 打包静态资源

#### 资源模块

资源模块(`asset module`)是一种模块类型，它允许使用资源文件（字体，图标等）而无需配置额外 `loader`。

在 `webpack 5` 之前，通常使用：

- `raw-loader` 将文件导入为字符串
- `url-loader` 将文件作为 `data URI` 内联到 `bundle` 中
- `file-loader` 将文件发送到输出目录

资源模块类型(`asset module type`)，通过添加 4 种新的模块类型，来替换所有这些 `loader`：

- `asset/resource` 发送一个单独的文件并导出 `URL`。之前通过使用 `file-loader` 实现，图片、字体等。
- `asset/inline` 导出一个资源的 `data URI`。之前通过使用 `url-loader` 实现，`svg` 等。
- `asset/source` 导出资源的源代码。之前通过使用 `raw-loader` 实现。
- `asset` 在导出一个 `data URI` 和发送一个单独的文件之间自动选择。之前通过使用 `url-loader`，并且配置资源体积限制实现。

当在 `webpack 5` 中使用旧的 `assets loader`（如 `file-loader/url-loader/raw-loader` 等）和 `asset` 模块时，你可能想停止当前 `asset` 模块的处理，并再次启动处理，这可能会导致 `asset` 重复，你可以通过将 `asset` 模块的类型设置为 `type: 'javascript/auto'` 来解决。

#### 自定义输出文件名

默认情况下，`asset/resource` 模块以 `[hash][ext][query]` 文件名发送到输出目录。

可以通过在 `webpack` 配置中设置` output.assetModuleFilename` 来修改此模板字符串：

另一种自定义输出文件名的方式是，将某些资源发送到指定目录

```js
generator: {
  filename: 'static/[hash][ext][query]'
},
```

`Rule.generator.filename` 与 `output.assetModuleFilename` 相同，并且仅适用于 `asset` 和 `asset/resource` 模块类型。

#### 通用资源类型

现在，`webpack` 将按照默认条件，自动地在 `resource` 和 `inline `之间进行选择：小于 `8kb` 的文件，将会视为 `inline` 模块类型，否则会被视为 `resource` 模块类型。

可以通过在 `webpack` 配置的 `module rule `层级中，设置 `Rule.parser.dataUrlCondition.maxSize` 选项来修改此条件

#### 加载数据 

此外，可以加载的有用资源还有数据，如 `JSON` 文件，`CSV`、`TSV` 和 `XML`。类似于 `NodeJS`，`JSON` 支持实际上是内置的，也就是说 `import Data from './data.json'` 默认将正常运行。要导入 `CSV`、`TSV` 和 `XML`，你可以使用 `csv-loader` 和 `xml-loader`。

#### webpack 5 配置
下载安装包
```js
npm i -D html-loader
```
修改配置文件 `webpack.config.js`

```js
const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: './src/index.js',
	mode: 'development',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'build'),
		clean: true,
    // 自定义输出文件名 
    // assetModuleFilename: 'images/[hash][ext][query]'
	},
	module: {
		rules: [
			{
				test: /\.(jpg|png|gif)$/,
				type: 'asset',
        generator: {
          filename: 'static/[hash][ext][query]'
        },
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024 // 4kb
          }
        }
			},
			{
				test: /\.html$/,
        // 处理 html 文件的 img 图片,而不是处理 html 文件
				loader: 'html-loader'
			}
		]
	},
	plugins: [
		// 复制 './src/index.html' 文件，并自动引入打包输出的所有资源（JS/CSS）
		new HTMLWebpackPlugin({ template: './src/index.html' })
	]
}
```

#### webpack 4 配置
下载安装包
```js
npm i -D url-loader file-loader html-loader
```
修改配置文件 `webpack.config.js`
```js
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
```

### 打包 js 资源
#### Babel
##### 安装
```js
npm i babel-loader @babel/core @babel/preset-env -D
```
##### babel-loader
这个包允许使用 `Babel` 和 `Webpack` 编译 `JavaScript` 文件
##### @babel/core
它是 `Babel` 核心库，提供了很多转译源文件的 `API`，它需要插件才能转译本身不会转译
##### @babel/preset-env
`babel/preset-env` 是语法转译器也可以叫预设，但是它只转换新的 `ES` 语法。而不转换新的 `ES API`，比如 `Iterator`, `Generator`, `Set`, `Maps`, `Proxy`, `Reflect`,`Symbol`,`Promise`，而对与这些新的 `API` 可以通过 [core-js](https://github.com/zloirock/core-js) 转译。

`babel` 的 `polyfill` 机制是，对于例如 `Array.from` 等静态方法，直接在 `global.Array` 上添加；对于例如 `includes` 等实例方法，直接在 `global.Array.prototype` 上添加。这样直接修改了全局变量的原型，有可能会带来意想不到的问题。

`babel` 转译 `syntax` 时，有时候会使用一些辅助的函数来帮忙转，`class` 语法中，`babel` 自定义了 `_classCallCheck` 这个函数来辅助；`typeof` 则是直接重写了一遍，自定义了 `_typeof` 这个函数来辅助。这些函数叫做 `helpers`。如果一个项目中有 `100` 个文件，其中每个文件都写了一个 `class`，那么这个项目最终打包的产物里就会存在 `100` 个 `_classCallCheck` 函数，他们的长相和功能一模一样，这显然不合理。

所以有两种解决方案，方案一：`preset-env` + `polyfill`，在 `usebuildins` 设置，适用于常规开发场景，方案二：`preset-env` + `@babel/runtime-corejs3` + `plugin-transform-runtime` 适用于类库开发。

方案二
```sh
npm i plugin-transform-runtime -D
npm i @babel/runtime-corejs3 -s
```
配置如下
```js
{
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "corejs": 3
      }
    ]
  ]
}
```
方案一
```sh
npm i core-js -s
```
配置如下
```js
{
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  // 优先执行
  // enforce: 'pre',
  // 延后执行
  // enforce: 'post',
  use: [
    {
      loader: 'babel-loader',
      options: {
        presets: [['@babel/preset-env', {
          // 告诉 babel 如何处理 api。这个选项默认值为 false，即不处理 api
          useBuiltIns: 'entry',
          corejs: '3.9.1',
          targets: {
            chrome: '60',
          },
        }], '@babel/preset-react'],
      },
    },
  ],
},
```
##### @babel/preset-env 参数
**方案二**不能和 `useBuiltIns` 混用，方案二解决的是 `helpers` 和全局污染，他不会根据浏览器规则动态变化，所以常规使用**方案一**即可
- `useBuiltIns: "usage"| "entry"| false`，默认为 `false`, 这里讲一讲 `usage`
- `usage` 会根据配置的浏览器兼容，和只对你用到的 `API` 来进行 `polyfill`，实现按需添加补丁
- targets：
```json
// 对市场份额 >0.25% 做兼容
{
  "targets": "> 0.25%, not dead"
}
// 对要支持的最低环境版本的对象 做兼容
{
  "targets": {
    "chrome": "58",
    "ie": "11"
  }
}
```
##### @babel/preset-react
`React` 插件的 `Babel` 预设, `JSX `转 `React.createElement()`来调用的，主要在转译 `react` 代码的时候使用。
##### babel plugin 配置
- `@babel/plugin-syntax-dynamic-import` 支持动态加载 `import`,`@babel/preset-env `不支持动态 `import` 语法转译。
- `@babel/plugin-proposal-decorators` 把类和对象的装饰器编译成 `ES5` 代码
- `@babel/plugin-proposal-class-properties` 转换静态类属性以及使用属性初始值化语法声明的属性

> 配置转译所需要的插件。使用插件的顺序是按照插件在数组中的顺序依次调用的，从前往后，预设的顺序相反，插件会比预设先执行

现在 `babel-loader` 参数比较臃肿可以提到 `.babelrc.js` 文件中
```js
module.exports = {
	presets: [
		[
			'@babel/preset-env',
			{
				useBuiltIns: 'usage',
				corejs: '3.9.1',
				targets: {
					chrome: '58',
					ie: '11'
				}
			}
		],
		[
			'@babel/preset-react',
			{
				development: process.env.NODE_ENV === 'development'
			}
		]
	],
	plugins: [
		['@babel/plugin-proposal-decorators', { legacy: true }],
		['@babel/plugin-proposal-class-properties', { loose: true }],
		'@babel/plugin-syntax-dynamic-import'
	]
}
```
#### Eslint 配置
```sh
npm i eslint eslint-webpack-plugin eslint-config-airbnb-base eslint-plugin-import -D
```
- `eslint-config-airbnb-base` 支持所有 `es6+` 的语法规范,需要 `eslint` 和 `eslint-plugin-import` 一起使用

- `eslint-plugin-import` 用于支持 `eslint-config-airbnb-base` 做导入/导出语法的检查
```js
new ESLintPlugin({
  fix: true, // 启用ESLint自动修复功能
  extensions: ['js', 'jsx'],
  context: paths.appSrc, // 文件根目录
  exclude: '/node_modules/',// 指定要排除的文件/目录
  cache: true, //缓存
}),
```
此外有了 `ES` 的语法规范 还需要 `react jsx` 的的语法规法，
```sh
npm i eslint-plugin-react -D
```
```js
// 在eslint config 拓展预设中 配置 react
extends: [
  "plugin:react/recommended", // jsx 规范支持
  "airbnb-base", // 包含所欲ES6+ 规范
],
// 或者 在插件中设置
"plugins": [
  "react"
]
```
同时在根目录配置 `.eslintrc.js` 文件
```js
module.exports = {
	env: {
		browser: true,
		es2021: true
	},
	extends: [
		'airbnb-base', // 包含所欲ES6+ 规范
		'plugin:react/recommended' // react jsx 规范支持
	],
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		},
		ecmaVersion: 12,
		sourceType: 'module'
	},
	plugins: [],
	rules: {
		'consistent-return': 0, // 箭头函数不强制return
		semi: 0,
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'react/jsx-uses-react': 'error', // 防止react被错误地标记为未使用
		'react/jsx-uses-vars': 'error',
		'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
		'react/jsx-key': 2, // 在数组或迭代器中验证JSX具有key属性
		'import/no-dynamic-require': 0,
		'import/no-extraneous-dependencies': 0,
		'import/no-named-as-default': 0,
		// 'import/no-unresolved': 2,
		'import/no-webpack-loader-syntax': 0,
		'import/prefer-default-export': 0,
		'arrow-body-style': [2, 'as-needed'], // 箭头函数
		'class-methods-use-this': 0, // 强制类方法使用 this
		// 缩进Indent with 4 spaces
		indent: ['error', 4, { SwitchCase: 1 }], // SwitchCase冲突 闪烁问题
		// Indent JSX with 4 spaces
		'react/jsx-indent': ['error', 2],
		// Indent props with 2 spaces
		'react/jsx-indent-props': ['error', 2],
		'no-console': 0, // 不禁用console
		'react/jsx-props-no-spreading': 0,
		'import/no-unresolved': [
			2,
			{
				ignore: ['^@/'] // @ 是设置的路径别名
			}
		]
	},
	// 如果在webpack.config.js中配置了alias 并且在import时使用了别名需要安装eslint-import-resolver-webpack
	settings: {
		'import/resolve': {
			webpack: {
				config: 'config/webpack.dev.js'
			}
		}
	}
}
/*
"off"或者0    //关闭规则关闭
"warn"或者1    //在打开的规则作为警告（不影响退出代码）
"error"或者2    //把规则作为一个错误（退出代码触发时为1）
*/
```

也可以把 `eslint` 配置 放在 `package.json`，跟下面这样但是内容有点多为了减少耦合性还是放根目录吧
```json
"eslintConfig": {
  "extends": ["plugin:react/recommended","airbnb-base"],
  ...省略
}
```
### devserver
```js
devServer: {
    // 直接利用 webpack-dev-server 依赖的 express 写服务，用来 mock 数据
    before: function (app, server, compiler) {
      app.get('/some/path', function (req, res) {
        res.json({ custom: 'response' })
    })
    // 运行代码的目录
    contentBase: resolve(__dirname, 'build'),
    // 监视 contentBase 目录下的所有文件，一旦文件变化就会 reload
    watchContentBase: true,
    watchOptions: {
      // 监视的时候忽略文件
      ignored: /node_modules/
    },
    // 启动gzip压缩，体积小
    compress: true,
    // 端口号
    port: 5000,
    // 域名
    host: 'localhost',
    // 自动打开浏览器
    open: true,
    // 开启HMR功能
    hot: true,
    // 不要显示启动服务器日志信息
    clientLogLevel: 'none',
    // 除了一些基本启动信息以外，其他内容都不要显示
    quiet: true,
    // 如果出错了，不要全屏提示~，只需要在日志中打印即可
    overlay: false,
    // 服务器代理 --> 解决开发环境跨域问题
    proxy: {
      // 一旦devServer(5000)服务器接受到 /api/xxx 的请求，就会把请求转发到另外一个服务器(3000)
      // /api 的好处是可以给所有请求代理 /api 相当于一个袋子，用完就删
      // 前端自我约束写法
      '/api': {
        target: 'http://localhost:3000',
        // 发送请求时，请求路径重写：将 /api/xxx --> /xxx （去掉/api）
        // 这里把/api重写为空访问的后端就是localhost:3000/api/user => local..3000/user
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
```
### devtool

`source-map`: 一种提供源代码到构建后代码映射技术（如果构建后代码出错了，通过映射可以追踪源代码错误）
```js
[inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map
```
- `source-map`：**外部**  👉  错误代码准确信息 和 源代码的错误位置
- `inline-source-map`：**内联**  👉  生成一个内联 `source-map` 错误代码准确信息 和 源代码的错误位置
- `hidden-source-map`：**外部**  👉  错误代码错误原因，但是没有错误位置，不能追踪源代码错误，只能提示到构建后代码的错误位置
- `eval-source-map`：**内联**  👉  每一个文件都生成对应的 `source-map`，都在 `eval` 错误代码准确信息 和 源代码的错误位置
- `nosources-source-map`：**外部**  👉  错误代码准确信息, 但是没有任何源代码信息
- `cheap-source-map`：**外部**  👉  错误代码准确信息 和 源代码的错误位置，只能精确的行
- `cheap-module-source-map`：**外部**  👉  错误代码准确信息 和 源代码的错误位置 `module`会将 `loader` 的 `source map` 加入

内联 和 外部的区别：
1. 外部生成了文件，内联没有 
1. 内联构建速度更快
2. 内联会让代码体积变大，所以在生产环境不用内联

速度快
```js
(eval > inline > cheap > ...)
eval-cheap-souce-map（速度最快）
eval-source-map
```
调试更友好 
```js
souce-map（调试最好）
cheap-module-souce-map
cheap-souce-map
// 最终总结：
// 开发环境使用：eval-source-map
// 生产环境使用：source-map
```
### external
<!-- https://www.npmjs.com/package/webpack-cdn-plugin -->
```js
externals: {
  jquery: 'jQuery',
},
```
### noParse
`noParse` 忽略的文件中，`require` 和 `import`都会失效
<!-- ### oneOf
在 `loader` 解析的时候对于 `rules` 中的所有规则都会遍历一遍，如果使用 `oneOf` 就可以解决该问题，只要能匹配一个即可退出,类似 `Array.find` 找到对的就返回不会继续找了。
`oneOf` 中不能两个 `loader` 处理同一类型文件，比如以前的 `eslint-loader` 和 `babel-loader` -->
### copy-webpack-plugin
移动源文件到打包目录
```js
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "source", to: "dest" },
        { from: "other", to: "public" },
      ],
    }),
  ],
};
```
### resolve
```js
// 解析模块的规则,查找模块
  resolve: {
    // 配置解析模块路径别名: 优点简写路径 缺点路径没有提示
    alias: {
      $css: resolve(__dirname, 'src/css')
    },
    // 配置省略文件路径的后缀名
    extensions: ['.js', '.json', '.jsx', '.css'],
    // 告诉 webpack 解析模块是去找哪个目录（不写这个的话，他会一层一层的往上面找，直到找到位置）
    modules: [resolve(__dirname, '../../node_modules'), 'node_modules'],
    // 查找到的模块的入口位置
    mainFields: ['browser', 'jsnext:main', 'main'],
    mainFile: ['index']
  }
};
```
### resolveLoader
```js
resolveLoader: {
  // 只对 loader 有效 
  modules: [resolve(__dirname, '../../node_modules'), 'node_modules'],
}
```
### 智能感知 import 别名导入文件
默认情况下在 `Vscode` 通过 `webpack.resolve.alias` 配置的别名，在`import` 导入是没有路径提示的
为了使用别名导入模块有更好的体验在根部目录添加一个 `jsconfig.json` 文件
```json
{
  "compilerOptions": {
    "baseUrl": "./src",// 基本目录，用于解析非相对模块名称
    "paths": {
      "@/*": ["./*"] //指定要相对于 baseUrl 选项计算别名的路径映射
    },
    "experimentalDecorators": true //为ES装饰器提案提供实验支持
  },
  "exclude": ["node_module"]
}
```
这个别名应该与 `webpack resolve `中的别名一致
### 压缩图片
#### image-webpack-loader
安装
```sh
npm i -D image-webpack-loader
```
配置如下
```js

 {
    test: /\.(gif|png|jpe?g|svg|webp)$/i,
    type: 'asset',
    parser: {
        dataUrlCondition: {
            maxSize: imageInlineSizeLimit, // 4kb
        },
    },
    use: [
        {
            loader: 'image-webpack-loader',
            options: {
                mozjpeg: {
                    progressive: true,
                    quality: 65,
                },
                optipng: {
                    enabled: false,
                },
                pngquant: {
                    quality: '65-90',
                    speed: 4,
                },
                gifsicle: {
                    interlaced: false,
                },
                webp: {
                    quality: 75,
                },
            },
        },
    ],
},
// mozjpeg —压缩 JPEG 图像
// optipng —压缩 PNG 图像
// pngquant —压缩 PNG 图像
// svgo —压缩 SVG 图像
// gifsicle —压缩 GIF 图像
```
#### image-minimizer-webpack-plugin
安装
```sh
npm install image-minimizer-webpack-plugin --save-dev
```
imagemin 插件进行无损优化
```sh
npm install imagemin-gifsicle imagemin-jpegtran imagemin-optipng imagemin-svgo --save-dev
```
imagemin 插件用于有损优化
```sh
npm install imagemin-gifsicle imagemin-mozjpeg imagemin-pngquant imagemin-svgo --save-dev
```
配置如下
```js
new ImageMinimizerPlugin({
    minimizerOptions: {
        plugins: [
            ['gifsicle', { interlaced: true }],
            ['jpegtran', { progressive: true }],
            ['optipng', { optimizationLevel: 5 }],
            [
                'svgo',
                {
                    plugins: [
                        {
                            removeViewBox: false,
                        },
                    ],
                },
            ],
        ],
    },
}),
```
### IgnorePlugin
`IgnorePlugin` 用于忽略某些特定的模块中的某些文件，让 `webpack` 不把这些指定的模块打包进去
```js
// 不对 moment 包的 locale 文件夹打包
new webpack.IgnorePlugin(/^\.\/locale/, /moment$/);
```
### cross-env 跨平台设置环境变量
通过 `cross-env `可以设置 `node` 环境的全局变量区别开发模式还是生产模式
> ⚠️ 在 ESM 下无效的
```sh
npm i cross-env -D
```
```json
"scripts": {
  "build": "cross-env NODE_ENV=production webpack",
  "start": "cross-env NODE_ENV=development webpack serve",
  ...省略
},
```
配置过 `node` 的环境全局变量后，无论是 `webpack.config.js` 还是`index.js`都可以通过 `process.env.NODE_ENV` 获取到值

### DefinePlugin 用来设置模块内的全局变量
这个是 webpack 自带的一个插件，可以在任意模块内通过 `process.env.NODE_ENV` 获取到值
```js
new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify('development'),
}),
```
```js
const App = () => {
  // 本质是在编译阶段使用 'development' 来替换 process.env.NODE_ENV
  console.log('process.env.NODE_ENV')
  return (
    <div>
      <Index />
      1133366
    </div>
  );
};
```
### 其他环境变量设置
默认情况下，`webpack.config.js`中 `process.env.NODE_ENV` 为定义，`mode` 参数指定的值是 `index.js` 的 `process.env.NODE_ENV` 的值，
`--mode=production`的值同上，`--env=production` 需要在 `webpack.config.js` 中导出的配置为函数

```js
module.exports = (env) => ({
  // env === 'production'
  // entry: ...
  // output: 
})
```

`.env` 环境配置 `require('dotenv').config()` 即可通过 `process.env.NODE_ENV` 拿到。

```sh
npm i dotenv -D
```

### 缓存

webpack 5 内置了模块缓存（区别于 loader 缓存）

#### babel-loader 很慢

你也可以通过使用 `cacheDirectory` 选项，将 `babel-loader` 提速至少两倍。这会将转译的结果缓存到文件系统中。

#### cache-loader

在开始前，需要安装 `cache-loader`:
```js
npm install --save-dev cache-loader
```
在一些性能开销较大的 `loader `之前添加 `cache-loader`，以便将结果缓存到磁盘里。
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.ext$/,
        use: ['cache-loader', ...loaders],
        include: path.resolve('src'),
      },
    ],
  },
};
```

> ⚠️ 请注意，保存和读取这些缓存文件会有一些时间开销，所以请只对性能开销较大的 loader 使用此 loader。

### webpack-merge
安装
```js
npm install --save-dev webpack-merge
```
`development`(开发环境) 和 `production`(生产环境) 这两个环境下的构建目标存在着巨大差异。在开发环境中，我们需要：强大的 `source map` 和一个有着 `live reloading`(实时重新加载) 或 `hot module replacement`(热模块替换) 能力的 `localhost server`。而生产环境目标则转移至其他方面，关注点在于压缩 `bundle`、更轻量的 `source map`、资源优化等，通过这些优化方式改善加载时间。由于要遵循逻辑分离，我们通常建议为每个环境编写彼此独立的 `webpack` 配置。

```js
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
});
```

### 优化
优化方向分两个：一个是时间（速度）和空间（体积） `webpack` 不管模块规范，打包出来统一都是 `webpack_require`。

首先使用 `speed-measure-webpack-plugin` 可以分析打包各个步骤的时间

```sh
npm i speed-measure-webpack-plugin -D
```

```js
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");

const smp = new SpeedMeasurePlugin();

const webpackConfig = smp.wrap({
  plugins: [new MyPlugin(), new MyOtherPlugin()],
});
```

`webpack-bundle-analyzer` 分析打包出的文件包含哪些，大小占比如何，模块包含关系，依赖项，文件是否重复，压缩后大小如何

```sh
npm i webpack-bundle-analyzer -D
```

```js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin({
			// 是否启服务
			analyzerMode: 'disabled',
			// 生成状态文件
			generateStatsFile: true
		})
  ]
}
```

```sh
"scripts": {
  "analyzer": "webpack-bundle-analyzer --port 8088 ./dist/stats.json"
}, 
```