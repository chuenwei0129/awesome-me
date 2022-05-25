# 前端工程化：webpack<!-- omit in toc -->

- [安装 webpack](#安装-webpack)
- [基础配置](#基础配置)
- [打包 HTML 资源](#打包-html-资源)
- [打包 CSS 资源](#打包-css-资源)
  - [安装依赖](#安装依赖)
  - [修改配置文件](#修改配置文件)
  - [关于 postCSS](#关于-postcss)
- [打包 JS 资源](#打包-js-资源)
  - [Babel 配置](#babel-配置)
    - [日常使用基础使用配置](#日常使用基础使用配置)
    - [日常使用到的其它 babel plugin 配置](#日常使用到的其它-babel-plugin-配置)
  - [ESlint 配置](#eslint-配置)
- [打包文件资源](#打包文件资源)
  - [资源模块](#资源模块)
  - [自定义输出文件名](#自定义输出文件名)
  - [通用资源类型](#通用资源类型)
  - [加载其它数据](#加载其它数据)
  - [webpack 5 配置](#webpack-5-配置)
  - [webpack 4 配置（已过时）](#webpack-4-配置已过时)
- [开发模式 devServer 配置](#开发模式-devserver-配置)
- [HMR](#hmr)
- [缓存](#缓存)
  - [webpack 中，module，chunk 和 bundle 的区别是什么？](#webpack-中modulechunk-和-bundle-的区别是什么)
  - [理解 webpack 的 hash，contenthash，chunkhash](#理解-webpack-的-hashcontenthashchunkhash)
  - [对 eslint 检查 和 babel 编译结果缓存](#对-eslint-检查-和-babel-编译结果缓存)
  - [相互依赖 的 bundle 文件](#相互依赖-的-bundle-文件)
  - [cache-loader](#cache-loader)
- [代码分离](#代码分离)
  - [SplitChunksPlugin](#splitchunksplugin)
  - [第三方模块分割](#第三方模块分割)
  - [多入口公共模块分割](#多入口公共模块分割)
  - [动态导入](#动态导入)
- [webpack-merge](#webpack-merge)
- [环境变量](#环境变量)
  - [cross-env 跨平台设置环境变量](#cross-env-跨平台设置环境变量)
  - [DefinePlugin 用来设置模块内的全局变量](#defineplugin-用来设置模块内的全局变量)
  - [其他环境变量设置](#其他环境变量设置)
- [source-map 配置](#source-map-配置)
  - [调试代码时定位到源码](#调试代码时定位到源码)
  - [线上报错定位到源码](#线上报错定位到源码)
  - [devtool 支持的 source-map](#devtool-支持的-source-map)
- [public 文件处理](#public-文件处理)
- [resolve 配置](#resolve-配置)
- [智能感知 import 别名导入文件](#智能感知-import-别名导入文件)
- [图片压缩](#图片压缩)
  - [image-webpack-loader](#image-webpack-loader)
  - [image-minimizer-webpack-plugin](#image-minimizer-webpack-plugin)
- [IgnorePlugin](#ignoreplugin)
- [external](#external)
- [tree shaking](#tree-shaking)
  - [嵌套的 tree-shaking](#嵌套的-tree-shaking)
  - [内部模块 tree-shaking](#内部模块-tree-shaking)
  - [支持 CommonJS Tree Shaking](#支持-commonjs-tree-shaking)
- [作用域提升（Scope Hoisting）](#作用域提升scope-hoisting)
- [Webpack5 性能提升核心：缓存优化](#webpack5-性能提升核心缓存优化)
  - [基于内存缓存](#基于内存缓存)
  - [基于 FileSystem 的持久化缓存](#基于-filesystem-的持久化缓存)
    - [缓存失效](#缓存失效)
      - [方法一：cache.buildDependencies](#方法一cachebuilddependencies)
      - [方法二：cache.version](#方法二cacheversion)
      - [方法三：cache.name](#方法三cachename)
  - [长期缓存优化](#长期缓存优化)

## 安装 [webpack](https://webpack.docschina.org/)

1. **安装依赖**

    ```sh
    npm i webpack webpack-cli -D
    ```

2. **开箱即用**

    ```sh
    # 指定输入输出开发模式
    npx webpack src/index.js -o build/bundle.js

    # 指定配置文件 webpack === webpack --config webpack.config.js
    webpack --config webpack.conf.js
    ```

## 基础配置

```js
const { resolve } = require('path')

module.exports = {
  entry: { main: './src/index.js' },
  mode: 'development',
  module: {
    // 在 loader 解析的时候对于 rules 中的所有规则都会遍历一遍，如果使用 oneOf 就可以解决该问题，只要能匹配一个即可退出,类似 Array.find 找到对的就返回不会继续找了。
    // oneOf 中不能两个 loader 处理同一类型文件，这样就是 twoOf 了，哈哈。
    rules: []
  },
  plugins: [],
  output: {
    // 出口文件 [name] 是 entry 的 key
    // filename 指列在 entry 中，打包后输出的文件的名称。
    filename: '[name].[contenthash:8].js',
    // chunkFilename 指未列在 entry 中，却又需要被打包出来的文件的名称。
    // chunkFilename: '',
    // 绝对路径
    path: resolve(__dirname, 'dist'),
    // 每次都清空 dist 目录
    clean: true,
    // publicPath: "http://cdn.xxx.com/images", // 可配置生产环境的 cdn 地址前缀
  }
}
```

## 打包 HTML 资源

[`HtmlWebpackPlugin`](https://github.com/jantimon/html-webpack-plugin) 默认会创建一个空的 HTML，自动引入打包输出的所有资源，也可以指定 HTML 模板。

```sh
npm i -D html-webpack-plugin
```

```js
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: { main: './src/index.js' },
  mode: 'development',
  module: {
    rules: []
  },
  plugins: [
    new HtmlWebpackPlugin({
      // 功能：默认会创建一个空的 HTML，自动引入打包输出的所有资源（JS/CSS）
      // 需求：需要有结构的 HTML 文件,需要添加一个 template
      // 插件会复制 './public/index.html' 文件，并自动引入打包输出的所有资源（JS/CSS）
      template: './public/index.html'
    })
  ],
  output: {
    // 出口文件 [name] 是 entry 的 key
    filename: '[name].[contenthash:8].js',
    path: resolve(__dirname, 'dist'),
    // 每次都清空 dist 目录
    clean: true
  }
}
```

> production 模式下默认会对 HTML 文件压缩

## 打包 CSS 资源

### 安装依赖

```sh
npm i css-loader style-loader less less-loader postcss postcss-loader postcss-preset-env autoprefixer mini-css-extract-plugin css-minimizer-webpack-plugin -D
```

### 修改配置文件

```js
const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
// 一般来说，开发模式下，我们都是通过 style 标签来使用 css 样式的，但是在生产环境中，我们通常会使用 link 来引入 css 样式
// 这个插件的作用：css 样式不是放在 style 标签中的，而是通过 link 的方式使用
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 在生产环境中，webpack 默认会对 js、html 压缩，不会对 css 压缩和优化
// 这个插件使用 cssnano 优化和压缩 CSS。就像 optimize-css-assets-webpack-plugin 一样，但在 source maps 和 assets 中使用查询字符串会更加准确，支持缓存和并发模式下运行。
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // 'style-loader' 作用：创建 style 标签，将样式放入 style 标签中,
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  // 也可以 postCSS 压缩 css
                  // 'cssnano',
                  'autoprefixer',
                  [
                    'postcss-preset-env',
                    {
                      // Options
                    }
                  ]
                ]
              }
            }
          }
        ]
      },
      // 这里只做简单处理，不做复杂的处理
      // 会被打包到 main.js
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './public/index.html' }),
    new MiniCssExtractPlugin({
      // 对输出的 css 文件进行重命名
      filename: 'css/bundle.css'
    })
  ],
  // 压缩 css
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin()]
  }
}
```

### 关于 postCSS

[postCSS](https://github.com/postcss/postcss) 的配置写法有以下三种方式：

- 通过配置文件 `postcss.config.js`，一般放置在项目的根目录下
- 通过 `loader` 的配置项 `options`
- 直接在 `package.json` 中添加个 `postcss` 属性。（不推荐）

**配置文件：**

```js
// postcss.config.js
module.exports = {
  plugins: [
    require('autoprefixer')
  ]
}
```

**`loader` 的配置项：**

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

**拓展：**

[Autoprefixer](https://github.com/postcss/autoprefixer) 的主要参数就是 [browserslist](https://github.com/browserslist/browserslist)，即需要代码支持的浏览器列表。通过设置目标浏览器可以让我们的代码**更有针对性的输出兼容性代码**，而不是无脑的全部兼容。

Browserslist 就是帮助我们来设置目标浏览器的工具。Browserslist 被广泛的应用到 `Babel`、`postcss-preset-env`、`autoprefixer` 等开发工具上。

Browserslist 的配置也可以放在 `package.json` 中，也可以单独放在配置文件 `.browserslistrc` 中。

**所有的工具都会主动查找 `browserslist` 的配置文件**，根据 `browserslist` 配置找出对应的目标浏览器集合。

在 `package.json` 中的配置是增加一个 `browserslist` 数组属性

```json
{
    "browserslist": ["last 2 version", "> 1%", "maintained node versions", "not ie < 11"]
}
```

## 打包 JS 资源

### Babel 配置

> [Babel 配置的一些问题探索](ast.md#babel)

#### 日常使用基础使用配置

```js
npm i babel-loader @babel/core @babel/preset-env core-js -D
```

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
          useBuiltIns: 'entry',
          corejs: '3',
          targets: {
            chrome: '60',
          },
        }], '@babel/preset-react'],
      },
    },
  ],
},
```

#### 日常使用到的其它 babel plugin 配置

- **@babel/plugin-syntax-dynamic-import：** 支持动态加载 import，`@babel/preset-env` 不支持动态 import 语法转译。

- **@babel/plugin-proposal-decorators：** 把类和对象的装饰器编译成 ES5 代码

- **@babel/plugin-proposal-class-properties：** 转换静态类属性以及使用属性初始值化语法声明的属性

**使用插件的顺序是按照插件在数组中的顺序依次调用的，从前往后，预设的顺序相反，插件会比预设先执行。**

### ESlint 配置

```sh
npm i eslint eslint-webpack-plugin eslint-config-airbnb-base eslint-plugin-import eslint-import-resolver-webpack -D
```

> eslint-plugin-import 用于支持 eslint-config-airbnb-base 做导入/导出语法的检查

**添加配置：**

```js
new ESLintPlugin({
  fix: true, // 启用ESLint自动修复功能
  extensions: ['js', 'jsx'],
  context: paths.appSrc, // 文件根目录
  exclude: '/node_modules/',// 指定要排除的文件/目录
  cache: true, //缓存
  // 在 ESLintPlugin 插件中设置
  // "plugins": [
  //   "react"
  // ]
}),
```

**支持 jsx 的的语法：**

```sh
npm i eslint-plugin-react -D
```

```js
// 在eslint config 拓展预设中 配置 react
extends: [
  "plugin:react/recommended", // jsx 规范支持
  "airbnb-base", // airbnb 规范
]
```

**日常使用的 .eslintrc.js 配置：**

```js
/*
"off" 或者 0    // 关闭规则
"warn" 或者 1    // 在打开的规则作为警告（不影响退出代码）
"error"或者2    // 把规则作为一个错误（退出代码触发时为1）
*/

module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'airbnb-base',
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
    'consistent-return': 0, // 箭头函数不强制 return
    'semi': 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'react/jsx-uses-react': 'error', // 防止 react 被错误地标记为未使用
    'react/jsx-uses-vars': 'error',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/jsx-key': 2, // 在数组或迭代器中验证 JSX 具有 key 属性
    'import/no-dynamic-require': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-named-as-default': 0,
    // 'import/no-unresolved': 2,
    'import/no-webpack-loader-syntax': 0,
    'import/prefer-default-export': 0,
    'arrow-body-style': [2, 'as-needed'], // 箭头函数
    'class-methods-use-this': 0, // 强制类方法使用 this
    // 缩进 Indent with 4 spaces
    indent: ['error', 4, { SwitchCase: 1 }], // SwitchCase 冲突闪烁问题
    // Indent JSX with 4 spaces
    'react/jsx-indent': ['error', 2],
    // Indent props with 2 spaces
    'react/jsx-indent-props': ['error', 2],
    'no-console': 0, // 不禁用 console
    'react/jsx-props-no-spreading': 0,
    'import/no-unresolved': [
      2,
      {
        ignore: ['^@/'] // @ 是设置的路径别名
      }
    ]
  },
  // 如果在 webpack.config.js 中配置了 alias 并且在 import 时使用了别名需要安装eslint-import-resolver-webpack
  settings: {
    'import/resolve': {
      webpack: {
        config: 'config/webpack.dev.js'
      }
    }
  }
}
```

## 打包文件资源

### [资源模块](https://webpack.docschina.org/guides/asset-modules/#root)

资源模块是一种模块类型，它允许使用资源文件（字体，图标等）而无需配置额外 `loader`。

在 webpack 5 之前，通常使用：

- `raw-loader` 将文件导入为字符串
- `url-loader` 将文件作为 `data URI` 内联到 `bundle` 中
- `file-loader` 将文件发送到输出目录

webpack 5 通过添加 4 种新的模块类型，来替换所有这些 `loader`：

- `asset/resource` 发送一个单独的文件并导出 `URL`。之前通过使用 `file-loader` 实现，图片、字体等。

- `asset/inline` 导出一个资源的 `data URI`。之前通过使用 `url-loader` 实现，`svg` 等。

- `asset/source` 导出资源的源代码。之前通过使用 `raw-loader` 实现。

- `asset` 在导出一个 `data URI` 和发送一个单独的文件之间自动选择。之前通过使用 `url-loader`，并且配置资源体积限制实现。

### 自定义输出文件名

默认情况下，`asset/resource` 模块以 `[hash][ext][query]` 文件名发送到输出目录。

可以通过在 webpack 配置中设置 `output.assetModuleFilename` 来修改此模板字符串

另一种自定义输出文件名的方式是，将某些资源发送到指定目录

```js
generator: {
  filename: 'static/[hash][ext][query]'
},
```

> `Rule.generator.filename` 与 `output.assetModuleFilename` 相同，并且仅适用于 `asset` 和 `asset/resource` 模块类型。

### 通用资源类型

现在，webpack 将按照默认条件，自动地在 `resource` 和 `inline` 之间进行选择：小于 `8kb` 的文件，将会视为 `inline` 模块类型，否则会被视为 `resource` 模块类型。

可以通过在 `webpack` 配置的 `module rule` 层级中，设置 `Rule.parser.dataUrlCondition.maxSize` 选项来修改此条件。

### 加载其它数据

此外，可以加载的有用资源还有数据，如 `JSON` 文件，`CSV`、`TSV` 和 `XML`。类似于 `NodeJS`，`JSON` 支持实际上是内置的，也就是说 `import Data from './data.json'` 默认将正常运行。要导入 `CSV`、`TSV` 和 `XML`，你可以使用 `csv-loader` 和 `xml-loader`。

### webpack 5 配置

```js
const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
    clean: true
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
        // 处理 html 文件中的 img 图片资源,而不是处理 html 文件
        loader: 'html-loader'
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({ template: './src/index.html' })
  ]
}
```

### webpack 4 配置（已过时）

下载安装包

```js
npm i -D url-loader file-loader html-loader
```

修改配置文件 `webpack.config.js`

```js
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
  }
]
```

## 开发模式 devServer 配置

```js
// 开发模式下，webpack 在内存中打包，可以指定 output.path = undefined
// webpack serve 命令才能读取 devServer 配置，生产模式下 devServer 可以设置但不会起效
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
  // 启动 gzip 压缩，体积小
  compress: true,
  // 端口号
  port: 5000,
  // 域名
  host: 'localhost',
  // 自动打开浏览器
  open: true,
  // 默认 HMR true
  // 这里很重要
  // 模块加载 JS HMR 功能启动需要手动写或者插件支持
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
    // /api 的好处是可以给所有请求代理 /api 相当于一个标识符，表示此次请求走代理
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

## HMR

为了让 HMR 正常工作，我们需要使用 `module.hot.accept` 将**需要热更新的模块**绑定。

```js
if (module.hot) {
  // accept update of dependency
  module.hot.accept(['./title.js'], () => {
    // 现在 title.js 代码的修改就启动了热更新
    console.log(`🔁  HMR Reloading: ${module.id}`)
  })
}
```

借助于 style-loader，使用模块热替换来加载 CSS 实际上极其简单。此 loader 在幕后使用了 `module.hot.accept`，在 CSS 依赖模块更新之后，会将其 patch 到 `<style>` 标签中。

社区还提供许多其他 loader 和示例，可以使 HMR 与各种框架和库平滑地进行交互……

- [react-refresh](https://www.npmjs.com/package/react-refresh): 实时调整 react 组件。
- [Vue Loader](https://github.com/vuejs/vue-loader): 此 loader 支持 vue 组件的 HMR，提供开箱即用体验。

## 缓存

### webpack 中，module，chunk 和 bundle 的区别是什么？

当我们写的 `module` 源文件传到 webpack 进行打包时，webpack 会**根据文件引用关系生成** chunk 文件，webpack 会对这个 chunk 文件进行一些操作；webpack 处理好 chunk 文件后，最后会输出 bundle 文件，这个 bundle 文件包含了经过加载和编译的最终源文件，所以它可以直接在浏览器中运行。

一般来说一个 chunk 对应一个 bundle，[`SplitChunksPlugin`](https://webpack.docschina.org/plugins/split-chunks-plugin) 插件可以**将公共的依赖模块**提取到已有的入口 chunk 中，或者提取到一个新生成的 chunk。

**一句话总结：**

module，chunk 和 bundle 其实就是同一份逻辑代码在不同转换场景下的取了三个名字：

我们直接写出来的是 module，webpack 处理时是 chunk，最后生成浏览器可以直接运行的 bundle。

### 理解 webpack 的 hash，contenthash，chunkhash

> [webpack 中，hash、chunkhash、contenthash 的区别是什么？](https://www.cnblogs.com/skychx/p/webpack-hash-chunkhash-contenthash.html)

**生成文件的 hash 和项目的构建 hash 都是一模一样的：**

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/fe-engineering/006tNc79ly1g3f1suvmekj30tk08otat.jpg)

**webpack 中 chunk 的概念 —— 有依赖关系的文件资源都视为一个 chunk。**

对于 spa 来说，只有一个入口，所有文件资源都直接或间接和入口文件有依赖关系，也就是说在 webpack 看来，一个 spa 就是一个 chunk，所有的文件资源公用一个 hash 值。

**chunkhash 计算与同一 chunk 内容相关：**

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/fe-engineering/006tNc79ly1g3f23xxxo8j30ts050q4b.jpg)

另当使用 `contenthash` 时，webpack5 将使用真正的文件内容做为哈希值，这个类似于协商缓存 Etag，不一样的是还有一些优化。

**如果你只是删除了代码中的一些注释或重新命名变量，而这种情况代码逻辑是没有修改的，这些变化在压缩后是不可见的，不会导致  `contenthash` 也发生变化。**

**contenthash 计算与文件内容本身相关：**

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/fe-engineering/006tNc79ly1g3f2ih0bqyj30tm050wfu.jpg)

### 对 eslint 检查 和 babel 编译结果缓存

你也可以通过使用 `cacheDirectory` 选项，将 `babel-loader` 提速至少两倍。这会将转译的结果缓存到文件系统中。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/fe-engineering/SCR-20220525-o5n.png)

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/fe-engineering/SCR-20220525-o6w.png)

### 相互依赖 的 bundle 文件

**通过缓存：** 依赖项改变不会引起依赖它的文件改变。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/fe-engineering/SCR-20220525-oa0.png)

### cache-loader

在开始前，需要安装 `cache-loader`:

```js
npm install --save-dev cache-loader
```

在一些性能开销较大的 `loader` 之前添加 `cache-loader`，以便将结果缓存到磁盘里。

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

## 代码分离

**chunk 有两种形式：**

- `initial` 是入口起点的 `main chunk`。此 `chunk` 包含为入口起点指定的所有模块及其依赖项。
- `non-initial` 是可以延迟加载的块。

每个 chunk 都有对应的资源。资源，是指输出文件（即打包结果）。

默认情况下，`non-initial chunk` 没有名称，因此会使用唯一 ID 来替代名称。在使用动态导入时，我们可以通过使用 [magic comment(魔术注释)](https://webpack.docschina.org/api/module-methods/#magic-comments) 来显式指定 chunk 名称。

**输出文件的名称会受配置中的两个字段的影响：**

- [`output.filename`](https://webpack.docschina.org/configuration/output/#outputfilename) - 用于 `initial` chunk 文件
- [`output.chunkFilename`](https://webpack.docschina.org/configuration/output/#outputchunkfilename) - 用 `non-initial` chunk 文件
- 在某些情况下，使用 `initial` 和 `non-initial` 的 chunk 时，可以使用 `output.filename`。

这些字段中会有一些 [占位符](https://webpack.docschina.org/configuration/output/#template-strings)。

**常用的占位符如下：**

- `[id]` - chunk id（例如 `[id].js` -\> `485.js`）
- `[name]` - chunk name（例如 `[name].js` -\> `app.js`）。如果 chunk 没有名称，则会使用其 id 作为名称
- `[contenthash]` - 输出文件内容的 md4-hash（例如 `[contenthash].js` -\> `4ea6ff1de66c537eb9b2.js`）

**常用的代码分离方法有三种：**

- **入口起点：** 使用 entry 配置手动地分离代码。
- **防止重复：** 使用 `SplitChunksPlugin` 去重和分离 `chunk`。
- **动态导入：** 通过模块的内联函数调用来分离代码。

### [SplitChunksPlugin](https://webpack.docschina.org/plugins/split-chunks-plugin)

开箱即用的 `SplitChunksPlugin` 对于大部分用户来说非常友好。

下面这个配置对象代表 SplitChunksPlugin 的默认行为。

```js
module.exports = {
  //...
  optimization: {
    splitChunks: {
      // 有效值为 all，async 和 initial。
      // 设置为 all 可能特别强大，因为这意味着 chunk 可以在异步和非异步 chunk 之间共享。
      // all = initial + async
      chunks: 'async',
      // 生成 chunk 的最小体积（以 bytes 为单位）。
      // 表明文件大于 20 kb 才会分割
      minSize: 20000,
      // 一般不需要手动指定它
      minRemainingSize: 0,
      // 被其它模块引用的次数，满足条件才会分割
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      // 超过 50k 必定分割
      enforceSizeThreshold: 50000,
      // 组代表了除了入口的其它打包文件，比如入口有两个，第三个 chunk 就会走分组
      // 上面都是分组的公共配置
      // 缓存组可以继承和/或覆盖来自 splitChunks.* 的任何选项。
      // 但是 test、priority 和 reuseExistingChunk 只能在缓存组级别上进行配置。将它们设置为 false 以禁用任何默认缓存组。
      // 意思是下面表示几种分包策略，priority 是优先级，默认情况下，webpack 会把 node_modules 中的文件打包到一起
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
};
```

### 第三方模块分割

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/fe-engineering/SCR-20220525-lm8.png)

### 多入口公共模块分割

```js
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        // 除了入口的单独打包的文件
        default: {
          // 被引用 3 次以上的文件
          minChunks: 3,
          // 最小 100 bytes
          minSize: 100,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    }
  }
}
```

### 动态导入

当涉及到动态代码拆分时，webpack 提供了两个类似的技术。第一种，也是推荐选择的方式是，使用符合 `ECMAScript` 提案 的 `import()` 语法 来实现动态导入。第二种，则是 webpack 的遗留功能，使用 webpack 特定的 `require.ensure`。

```js
// 这会生成 <link rel="prefetch" href="scope.js"> 并追加到页面头部，指示着浏览器在闲置时间预取 scope.js 文件。
import(
  /* webpackPrefetch: true */
  /* webpackChunkName: "scope" */
  './path/to/LoginModal.js''
).then(module => {
  console.log('懒加载', module.default)
})
```

## webpack-merge

```sh
npm install --save-dev webpack-merge
```

`development`(开发环境) 和 `production`(生产环境) 这两个环境下的构建目标存在着巨大差异。在开发环境中，我们需要：强大的 `source map` 和一个有着 `live reloading`(实时重新加载) 或 `hot module replacement`(热模块替换) 能力的 `localhost server`。

而生产环境目标则转移至其他方面，关注点在于压缩 `bundle`、更轻量的 `source map`、资源优化等，通过这些优化方式改善加载时间。由于要遵循逻辑分离，我们通常建议为每个环境编写彼此独立的 `webpack` 配置。

```js
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
});
```

## 环境变量

### cross-env 跨平台设置环境变量

通过 `cross-env` 可以设置 `node` 环境的全局变量区别开发模式还是生产模式

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

**配置过 `node` 的环境全局变量后，无论是 `webpack.config.js` 还是 react 项目本身都可以通过 `process.env.NODE_ENV` 获取到值**

### DefinePlugin 用来设置模块内的全局变量

这个是 webpack 自带的一个插件，可以在任意模块内通过 `process.env.NODE_ENV` 获取到值

```js
// 本质 webpack 与 本地项目是两个项目，webpack 的配置文件与 本地项目依赖的 node 是两个 node
// 通过设置 DefinePlugin 可以在 react 中也获得环境变量
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
}
```

### 其他环境变量设置

```sh
npm i dotenv -D
```

`.env` 配置的环境变量

`require('dotenv').config()` 之后即可通过 `process.env.NODE_ENV` 拿到。

## source-map 配置

### 调试代码时定位到源码

chrome、firefox 等浏览器支持在文件末尾加上[一行注释](https://firefox-source-docs.mozilla.org/devtools-user/debugger/how_to/use_a_source_map/index.html)

```js
//# sourceMappingURL=http://example.com/path/to/your/sourcemap.map
```

可以通过 url 的方式或者转成 base64 内联的方式来关联 sourcemap。浏览器会自动解析 sourcemap，关联到源码。这样打断点、错误堆栈等都会对应到相应源码。

### 线上报错定位到源码

开发时会使用 sourcemap 来调试，但是生产可不会，要是把 sourcemap 传到生产算是大事故了。但是线上报错的时候确实也需要定位到源码，这种情况一般都是单独上传 sourcemap 到错误收集平台。

### devtool 支持的 source-map

- `source-map`：**外部**  👉  错误代码准确信息 和 源代码的错误位置

- `inline-source-map`：**内联**  👉  生成一个内联 `source-map` 错误代码准确信息 和 源代码的错误位置

- `hidden-source-map`：**外部**  👉  错误代码错误原因，但是没有错误位置，不能追踪源代码错误，只能提示到构建后代码的错误位置

- `eval-source-map`：**内联**  👉  每一个文件都生成对应的 `source-map`，都在 `eval` 错误代码准确信息 和 源代码的错误位置

- `nosources-source-map`：**外部**  👉  错误代码准确信息, 但是没有任何源代码信息

- `cheap-source-map`：**外部**  👉  错误代码准确信息 和 源代码的错误位置，只能精确的行

- `cheap-module-source-map`：**外部**  👉  错误代码准确信息 和 源代码的错误位置 `module`会将 `loader` 的 `source map` 加入

内联 和 外部的区别：外部生成了文件，内联没有，内联构建速度更快，内联会让代码体积变大。

**综合：开发环境使用：eval-source-map，生产环境使用：source-map。**

## public 文件处理

对不需要打包的目录例如：public 可以使用 `copy-webpack-plugin` 插件移动源文件（例如：favicon.ico）到打包目录

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

## resolve 配置

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
},
// 只对 loader 有效
resolveLoader: {
  modules: [resolve(__dirname, '../../node_modules'), 'node_modules'],
}
```

## 智能感知 import 别名导入文件

默认情况下在 VSCode 通过 `webpack.resolve.alias` 配置的别名，在`import` 导入是没有路径提示的

为了使用别名导入模块有更好的体验可以在根部目录添加一个 `jsconfig.json` 文件

```json
// 这个别名应该与 webpack resolve 中的别名一致
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

## 图片压缩

### image-webpack-loader

```sh
npm i -D image-webpack-loader
```

**配置如下：**

```js
{
  test: /\.(gif|png|jpe?g|svg|webp)$/i,
  type: 'asset',
  parser: {
    dataUrlCondition: {
      maxSize: imageInlineSizeLimit // 4kb
    }
  },
  use: [
    {
      loader: 'image-webpack-loader',
      options: {
        mozjpeg: {
          progressive: true,
          quality: 65
        },
        optipng: {
          enabled: false
        },
        pngquant: {
          quality: '65-90',
          speed: 4
        },
        gifsicle: {
          interlaced: false
        },
        webp: {
          quality: 75
        }
      }
    }
  ]
}

// mozjpeg —压缩 JPEG 图像
// optipng —压缩 PNG 图像
// pngquant —压缩 PNG 图像
// svgo —压缩 SVG 图像
// gifsicle —压缩 GIF 图像
```

### image-minimizer-webpack-plugin

```sh
npm install image-minimizer-webpack-plugin --save-dev
```

**imagemin 插件进行无损优化：**

```sh
npm install imagemin-gifsicle imagemin-jpegtran imagemin-optipng imagemin-svgo --save-dev
```

**imagemin 插件用于有损优化：**

```sh
npm install imagemin-gifsicle imagemin-mozjpeg imagemin-pngquant imagemin-svgo --save-dev
```

**配置如下：**

```js
plugins: [
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
                removeViewBox: false
              }
            ]
          }
        ]
      ]
    }
  })
],
```

## IgnorePlugin

IgnorePlugin 用于忽略某些特定的模块中的某些文件，让 webpack 不把这些指定的模块打包进去

```js
// 不对 moment 包的 locale 文件夹打包
new webpack.IgnorePlugin(/^\.\/locale/, /moment$/);
```

## external

通过 cdn 链接的方式引入 jQuery，如果此时 js 文件中多写了 `import $ from 'jquery'`，就会把 jQuery 也打包进去，可使用 external 防止将某些 import 的包打包到 bundle 中

```js
externals: {
  jquery: 'jQuery',
},
```

## [tree shaking](https://webpack.docschina.org/guides/tree-shaking/)

tree-shaking 是一个术语，翻译为中文为 “树摇”，想想一下一颗长满果子的树木，其中有些已经熟透了，当摇晃树木时是不是一部分会被摇掉。

对于我们代码层面来说，那些上下文未引用的 JavaScript 代码，也可以通过工具移除（“摇掉”），实现打包体积的优化。

Webpack 的实现是把所有 `import` 标记为 **有使用** / **无使用** 两种，在后续压缩时进行区别处理。

### 嵌套的 tree-shaking

在这种情况下，可以删除未使用的变量 b，生产环境默认开启。

```js
// inner.js
export const a = 1;
export const b = 2;

// module.js
export * as inner from './inner';

// user.js
import * as module from './module';
console.log(module.inner.a);
```

### 内部模块 tree-shaking

Webpack 5 还增加了模块导出和引用之间的依赖关系分析，通过配置 `optimization.innerGraph` 控制，生产环境默认开启。

以下示例，something 只有在使用 test 导出时才会使用。

```js
import { something } from './something';

function usingSomething() {
  return something;
}

export function test() {
  return usingSomething();
}
```

### 支持 CommonJS Tree Shaking

新增 CommonJS 模块的导出和引用之间的依赖分析，下例，可以删除未使用的变量 b。

```js
// inner.js
exports.a = 1;
exports.b = 2;

// module.js
exports.inner = require('./inner');

// user.js
const module = require('./module');
console.log(module.inner.a);
```

## 作用域提升（Scope Hoisting）

- 大量函数闭包包裹代码，导致体积增大（模块越多越明显）
- 运行代码时创建的函数作用域变多，内存开销变大

打包前：

```js
function fn() {
  console.log('fn')
  a()
  b()
}

function a() {
  console.log('a')
}

function b() {
  console.log('b')
}

fn()

```

打包后：

```js
console.log("fn"),console.log("a"),console.log("b");
```

## Webpack5 性能提升核心：缓存优化

**Webpack5 自带缓存能力，会缓存生成的 webpack module 和 chunk，对于二次构建有了很大的性能提升**。通过 cache 属性配置，**分为内存和文件两种缓存方式，默认在生产环境是禁用的，需自行开启**。

### 基于内存缓存

当在开发环境默认设置为 memory，基于内存的缓存，除了下面的方式配置外，也可通过 `cache: true` 配置。

```js
module.exports = {
  cache: {
    type: 'memory'
  },
};
```

### 基于 FileSystem 的持久化缓存

**基于内存的缓存，只有在服务运行中，才有效，每次的单独构建是利用不了缓存的。**

**基于文件系统的持久化缓存无论在单独构建或连续构建（可以指热更新操作）中都可应用，首先它会查看内存缓存，如果未命中，则降级到文件系统缓存**。

应用很简单，设置 `type:filesystem`。默认情况下它位于 `node_modules/.cache/webpack/` 目录，我们还可以通过 name 属性修改它的名称，例如，我们通过不同的环境 `NODE_ENV` 来区别不同环境的缓存。

当 type 设置为 filesystem 后，有很多属性是可以配置的，参见 [Webpack 文档 cache](https://webpack.docschina.org/configuration/other-options/#cache)。

```js
module.exports = {
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
    },
    name: `${ process.env.NODE_ENV || 'development'}-cache`
  }
}
```

#### 缓存失效

基于内存的缓存每一次重新运行都是一次新的构建。需要注意的是持久化缓存，当你修改了文件或传递了一些参数，发现最终展现的效果没有被更改，通常这与持久化缓存的缓存策略相关。

**出于性能考虑，缓存会跳过 `node_modules` 认为这会极大降低 webpack 执行速度，建议是不要手动编辑 `node_modules`**。通常也不会这么干直接去修改 `node_modules`。

**有些操作也会使缓存失效，例如：当 NPM 升级 loader、plugin、更改配置等**。

Webpack 提供了 **buildDependencies、name、version** 三种方式可以使构建缓存失效。

##### 方法一：cache.buildDependencies

buildDependencies 指定构建过程中受影响的代码依赖，默认为 `webpack/lib`，当 `node_modules` 中的 webpack 或其依赖项发生任何变化，当前的缓存即失效。

还有一个是指定的配置文件 `config: [__filename]` 或配置文件的依赖项发生变化，也会失效。

```js
module.exports = {
  cache: {
    type: 'filesystem',
    buildDependencies: {
      defaultWebpack: ["webpack/lib/"],
      config: [__filename],
    },
    name: `${ process.env.NODE_ENV || 'development'}-cache`
  }
}
```

##### 方法二：cache.version

如果是把构建工具封装为一个单独的工具包，类似于 react-scripts 这种的，理论上每次升级工具包，就需要重新编译的，之前在一次本地测试时发现工具包升级后缓存没有失效，如果出现这种情况的可以在 cache 里加上 version 配置指向 package.json 里的 version。

```js
module.exports = {
  cache: {
    type: 'filesystem',
    version: `${packageJson.version}`
  }
}
```

有时配置文件或者代码没有修改，但是会依赖于命令行传递值想使缓存失效，同样也可在 version 上加上这些命令行传递的值做为版本控制。

```js
module.exports = {
  cache: {
    type: 'filesystem',
    version: `${process.env.CLI_VALUE}`
  }
}
```

当 version 依赖于多个值时，可以将多个值做个 md5 生成一串唯一的字符串做为版本也可。

##### 方法三：cache.name

name 属性比较好的是可以保存多个缓存目录，例如通过 `process.env.NODE_ENV` 区分不同的环境。

```js
module.exports = {
  cache: {
    type: 'filesystem',
    name: `${ process.env.NODE_ENV || 'development'}-cache`
  }
}
```

### 长期缓存优化

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/fe-engineering/SCR-20220525-ofr.png)
