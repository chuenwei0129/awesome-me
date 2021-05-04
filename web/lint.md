# lint
## ESLint

ESLint 配置方式
Configuration Comments - 使用注释把 lint 规则嵌入到源码中

/* eslint no-console: "error" */
console.log('this is an eslint rule check!');

命令行运行 ESLint 校验，出现报错：

1.2 Configuration Files - 使用配置文件进行 lint 规则配置
在初始化 ESLint 时，可以选择使用某种文件类型进行lint配置，有如下三种选项：

JavaScript（eslint.js）
YAML（eslintrc.yaml）
JSON（eslintrc.json）

另外，你也可以自己在 package.json 文件中添加 eslintConfig 字段进行配置

作者：蔡小真
链接：https://juejin.cn/post/6909788084666105864
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
如果想在现有项目中引入 ESLint，可以直接运行下面的命令：
# 全局安装 ESLint
$ npm install -g eslint

# 进入项目
$ cd ESLint-test

# 强制初始化 package.json
$ npm init -force

# 初始化 ESLint 配置
$ eslint --init
复制代码
在使用 eslint --init 后，会出现很多用户配置项，具体可以参考：eslint-cli 部分的源码。

经过一系列一问一答的环节后，你会发现在你文件夹的根目录生成了一个 .eslintrc.js 文件。
.eslintrc.js 文件配置如下（这是根据上图所示的选择生成的配置，选择不同，配置不同）

作者：蔡小真
链接：https://juejin.cn/post/6909788084666105864
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

module.exports = {
	env: {
		// 环境
		browser: true,
		es2021: true,
	},
	extends: [
		// 拓展
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
	],
	parser: '@typescript-eslint/parser', // 解析器，本解析器支持Ts
	parserOptions: {
		// 解析器配置选项
		ecmaVersion: 12, // 指定es版本
		sourceType: 'module', // 代码支持es6，使用module
	},
	plugins: [
		// 插件
		'@typescript-eslint',
	],
	rules: {
		// 规则
	},
};

作者：蔡小真
链接：https://juejin.cn/post/6909788084666105864
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

ESLint 配置项解析
2.3.1 parser - 解析器
ESLint 默认使用Espree作为其解析器，但是该解析器仅支持最新的ECMAScript(es5)标准，对于实验性的语法和非标准（例如 Flow 或 TypeScript类型）语法是不支持的。因此，开源社区提供了以下两种解析器来丰富TSLint的功能：


bable-eslint： Babel是一个工具链，主要用于将 ECMAScript 2015+(es6+) 版本的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中。因此，如果在项目中使用es6，就需要将解析器改成bable-eslint。


@typescript-eslint/parser：该解析器将 TypeScript 转换成与 estree 兼容的形式， 允许ESLint验证TypeScript源代码。如上图 ESlint 初始化时，Does your project use TypeScript?选择了Yes，所以提示我们安装@typescript-eslint/parser包。


2.3.2 parserOptions - 解析器选项
除了可以自定义解析器外，ESLint 允许你指定你想要支持的 JavaScript 语言选项。默认情况下，ESLint 支持 ECMAScript 5 语法。你可以覆盖该设置，以启用对 ECMAScript 其它版本和 JSX 的支持。
解析器选项可以在 .eslintrc.* 文件使用 parserOptions 属性设置。可用的选项有：

ecmaVersion -你可以使用 6、7、8、9 或 10 来指定你想要使用的 ECMAScript 版本。你也可以用使用年份命名的版本号指定为 2015（同 6），2016（同 7），或 2017（同 8）或 2018（同 9）或 2019 (same as 10)。
sourceType - 设置为 script (默认) 或 module（如果你的代码是 ECMAScript 模块)。
ecmaFeatures - 这是个对象，表示你想使用的额外的语言特性:

globalReturn - 允许在全局作用域下使用 return 语句
impliedStrict - 启用全局 strict mode (如果 ecmaVersion 是 5 或更高)
jsx - 启用 JSX



设置解析器选项能帮助 ESLint 确定什么是解析错误，所有语言特性选项默认都是 false。
2.3.3 env 和 golbals - 环境和全局变量
ESLint 会检测未声明的变量，并发出警告，但是有些变量是我们引入的库声明的，这里就需要提前在配置中声明。每个变量有三个选项，writable，readonly 和 off，分别表示可重写，不可重写和禁用。
{
  "globals": {
    // 声明 jQuery 对象为全局变量
    "$": false, // true表示该变量为 writeable，而 false 表示 readonly
    "jQuery": false
  }
}
复制代码
在 globals 中一个个的进行声明未免有点繁琐，这个时候就需要使用到 env ，这是对一个环境定义的一组全局变量的预设。
{
  "env": {
    "browser": true,
    "es2021": true,
    "jquery": true // 环境中开启jquery，表示声明了jquery相关的全局变量，无需在globals二次声明
  }
}
复制代码
可选的环境很多，预设值都在这个文件中进行定义，查看源码可以发现，其预设变量都引用自 globals 包。
同时，可以在golbals中使用字符串 off 禁用全局变量来覆盖env中的声明。
例如，在大多数 ES2015 全局变量可用但 Promise 不可用的环境中，你可以使用以下配置:
{
    "env": {
        "es6": true
    },
    "globals": {
        "Promise": "off"
    }
}
复制代码
当然，如果是微信小程序开发，env并没有定义微信小程序变量，需要在globals中手动声明全局变量，否则在文件中引入变量，会提示报错。声明如下所示：
{
  globals: {
    wx: true,
    App: true,
    Page: true,
    Component: true,
    getApp: true,
    getCurrentPages: true,
    Behavior: true,
    global: true,
    __wxConfig: true,
  },
}

