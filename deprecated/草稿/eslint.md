# Lint<!-- omit in toc -->

- [ESLint](#eslint)
  - [ESLint 配置方式](#eslint-配置方式)
    - [使用注释把 lint 规则嵌入到源码中](#使用注释把-lint-规则嵌入到源码中)
    - [使用配置文件进行 lint 规则配置](#使用配置文件进行-lint-规则配置)
  - [初始化](#初始化)
  - [ESLint 配置项解析](#eslint-配置项解析)
    - [parser - 解析器](#parser---解析器)
    - [parserOptions - 解析器选项](#parseroptions---解析器选项)
    - [env 和 golbals - 环境和全局变量](#env-和-golbals---环境和全局变量)
    - [rules - 规则](#rules---规则)
    - [plugins - 插件](#plugins---插件)
    - [extends - 拓展](#extends---拓展)
  - [在注释中使用 ESLint](#在注释中使用-eslint)
  - [配置优先级](#配置优先级)
- [Prettier](#prettier)
  - [安装](#安装)
  - [Prettier 与 ESLint 配合使用](#prettier-与-eslint-配合使用)
- [VS Code 集成](#vs-code-集成)
  - [仅安装 Eslint 插件](#仅安装-eslint-插件)
  - [Prettier 插件 和 Eslint 插件 都安装](#prettier-插件-和-eslint-插件-都安装)
- [ESLint 生态依赖包](#eslint-生态依赖包)
  - [扩展](#扩展)
  - [插件](#插件)
- [Eslint 本地配置](#eslint-本地配置)
- [Husky + lint-staged 打造合格的代码检查工作流](#husky--lint-staged-打造合格的代码检查工作流)

## ESLint

### ESLint 配置方式

#### 使用注释把 lint 规则嵌入到源码中

```js
/* eslint no-console: "error" */
console.log('this is an eslint rule check!')
```

#### 使用配置文件进行 lint 规则配置

在初始化 `ESLint` 时，可以选择使用某种文件类型进行 `lint` 配置，有如下三种选项：

- `JavaScript`（.eslintrc.js）
- `YAML`（.eslintrc.yaml）
- `JSON`（.eslintrc.json）

另外，你也可以自己在 `package.json` 文件中添加 `eslintConfig` 字段进行配置

### 初始化

```sh
# 全局安装 ESLint
$ npm install -g eslint

# 进入项目
$ cd ESLint-test

# 强制初始化 package.json
$ npm init -f

# 初始化 ESLint 配置
$ eslint --init
```

经过一系列一问一答的环节后，你会发现在你文件夹的根目录生成了一个 `.eslintrc.js` 文件。

`.eslintrc.js` 文件配置如下（这是根据上图所示的选择生成的配置，选择不同，配置不同）：

```js
module.exports = {
  env: {
    // 环境
    browser: true,
    es2021: true
  },
  extends: [
    // 拓展
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  // 解析器，本解析器支持 TS
  parser: '@typescript-eslint/parser',
  // 解析器配置选项
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    // 指定 es 版本
    ecmaVersion: 12,
    // 代码支持 es6，使用module
    sourceType: 'module'
  },
  // 插件
  plugins: ['react', '@typescript-eslint'],
  // 规则
  rules: {
    semi: ['error', 'never']
  }
}
```

### ESLint 配置项解析

#### parser - 解析器

`ESLint` 默认使用 `Espree` 作为其解析器，但是该解析器仅支持最新的**ECMAScript(es5)** 标准，对于实验性的语法和非标准（TypeScript）语法是不支持的。因此，开源社区提供了以下两种解析器来丰富 `TSLint` 的功能：

- `bable-eslint`：`Babel` 是一个工具链，主要用于将 **ECMAScript 2015+(es6+)** 版本的代码转换为向后兼容的 `JavaScript` 语法，以便能够运行在当前和旧版本的浏览器或其他环境中。因此，如果在项目中使用 `es6`，就需要将解析器改成`bable-eslint`。

- `@typescript-eslint/parser`：该解析器将 `TypeScript` 转换成与 `estree` 兼容的形式，允许 `ESLint` 验证 `TypeScript` 源代码。

#### parserOptions - 解析器选项

除了可以自定义解析器外，`ESLint` 允许你指定你想要支持的 `JavaScript` 语言选项。默认情况下，`ESLint` 支持 `ECMAScript 5` 语法。你可以覆盖该设置，以启用对 `ECMAScript` 其它版本和 `JSX` 的支持。

解析器选项可以在 `.eslintrc.*` 文件使用 `parserOptions` 属性设置。可用的选项有：

- **`ecmaVersion`** -你可以使用 `6`、`7`、`8`、`9` 或 `10` 来指定你想要使用的 `ECMAScript` 版本。你也可以用使用年份命名的版本号指定为 `2015`（同 6），`2016`（同 7），或 `2017`（同 8）或 `2018`（同 9）或 `2019` (same as 10)。
- **`sourceType`** - 设置为 `script` (默认) 或 `module`（如果你的代码是 `ECMAScript` 模块)。
- **`ecmaFeatures`** - 这是个对象，表示你想使用的额外的语言特性:
  - `globalReturn` - 允许在全局作用域下使用 `return` 语句
  - `impliedStrict` - 启用全局 `strict mode` (如果 `ecmaVersion` 是 `5` 或更高)
  - `jsx` - 启用 `JSX`

设置解析器选项能帮助 `ESLint` 确定什么是解析错误，所有语言特性选项默认都是 `false`。

#### env 和 golbals - 环境和全局变量

`ESLint` 会检测未声明的变量，并发出警告，但是有些变量是我们引入的库声明的，这里就需要提前在配置中声明。每个变量有三个选项，`writable`，`readonly` 和 `off`，分别表示可重写，不可重写和禁用。

```js
{
  "globals": {
    // 声明 jQuery 对象为全局变量
    "$": false, // true表示该变量为 writeable，而 false 表示 readonly
    "jQuery": false
  }
}
```

在 `globals` 中一个个的进行声明未免有点繁琐，这个时候就需要使用到 `env` ，这是对一个环境定义的一组全局变量的预设。

```js
{
  "env": {
    "browser": true,
    "es2021": true,
    "jquery": true // 环境中开启jquery，表示声明了jquery相关的全局变量，无需在globals二次声明
  }
}
```

可选的环境很多，预设值都在[这个文件](https://github.com/eslint/eslint/blob/v6.0.1/conf/environments.js)中进行定义

同时，可以在 `golbals` 中使用字符串 `off` 禁用全局变量来覆盖 `env` 中的声明。

```js
// 在大多数 ES2015 全局变量可用但 Promise 不可用的环境中，你可以使用以下配置
{
  "env": {
      "es6": true
  },
  "globals": {
      "Promise": "off"
  }
}
```

当然，如果是微信小程序开发，`env` 并没有定义微信小程序变量，需要在 `globals` 中手动声明全局变量，否则在文件中引入变量，会提示报错。声明如下所示：

```js
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
```

#### rules - 规则

`ESLint` 附带有大量的[规则](https://cn.eslint.org/docs/rules/)，你可以在配置文件的 `rules` 属性中配置你想要的规则。要改变一个规则设置，你必须将规则 `ID` 设置为下列值之一：

- `off` 或 `0`：关闭规则
- `warn` 或 `1`：开启规则，`warn` 级别的错误 (不会导致程序退出)
- `error` 或 `2`：开启规则，`error` 级别的错误(当被触发的时候，程序会退出)

有的规则没有属性，只需控制是开启还是关闭，像这样：`"eqeqeq": "off"`，有的规则有自己的属性，使用起来像这样：`"quotes": ["error", "double"]`。具体内容可以查看规则文档。

可以通过 `rules` 配置任何想要的规则，它会覆盖你在拓展或插件中引入的配置项。

#### plugins - 插件

官方的规则只能检查标准的 `JavaScript` 语法，如果你写的是 `JSX` 或者 `TypeScript`，`ESLint` 的规则就开始束手无策了。

这个时候就需要安装 `ESLint` 的插件，来定制一些特定的规则进行检查。`ESLint` 的插件与扩展一样有固定的命名格式，以 `eslint-plugin-` 开头，使用的时候也可以省略这个头。

举个例子，我们要在项目中使用 `TypeScript`，前面提到过，需要将解析器改为`@typescript-eslint/parser`，同时需要安装 `@typescript-eslint/eslint-plugin` 插件来拓展规则，添加的 `plugins` 中的规则**默认是不开启的**，我们需要在 `rules` 中选择我们要使用的规则。也就是说 `plugins` 是要和 `rules` 结合使用的。如下所示：

```js
// npm i --save-dev @typescript-eslint/eslint-plugin    // 注册插件
{
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],   // 引入插件
  "rules": {
    "@typescript-eslint/rule-name": "error"    // 使用插件规则
    '@typescript-eslint/adjacent-overload-signatures': 'error',
    '@typescript-eslint/ban-ts-comment': 'error',
    '@typescript-eslint/ban-types': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'warn',
    '@typescript-eslint/no-array-constructor': 'error',
    'no-empty-function': 'off',
    '@typescript-eslint/no-empty-function': 'error',
    '@typescript-eslint/no-empty-interface': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-extra-non-null-assertion': 'error',
    ...
  }
}
```

在 `rules` 中写一大堆的配置来启用 `@typescript-eslint/eslint-plugin` 插件规则，显然是十分愚蠢的做法，这时候 `extends` 派上了用场。

#### extends - 拓展

`extends` 可以理解为一份配置好的 `plugin` 和 `rules`。

`extends` 属性值可以是：

指定配置的字符串: 比如官方提供的两个拓展 [eslint:recommended](https://github.com/eslint/eslint/blob/v6.0.1/conf/eslint-recommended.js) 或 [eslint:all](https://github.com/yannickcr/eslint-plugin-react/blob/master/index.js#L108)，可以启用当前安装的 `ESLint` 中所有的核心规则，省得我们在 `rules` 中一一配置。

> 字符串数组：每个配置继承它前面的配置。如下所示，拓展是一个数组，`ESLint` 递归地扩展配置, 然后使用 `rules` 属性来拓展或者覆盖 `extends` 配置规则。

```js
{
    "extends": [
        "eslint:recommended", // 官方拓展
        "plugin:@typescript-eslint/recommended", // 插件拓展
        "standard", // npm包，开源社区流行的配置方案，比如：eslint-config-airbnb、eslint-config-standard
    ],
    "rules": {
    	"indent": ["error", 4], // 拓展或覆盖extends配置的规则
        "no-console": "off",
    }
};
```

### 在注释中使用 ESLint

在我们日常开发中，总会生产出一些与 `lint` 规则八字相冲的代码，频繁地 `error` 告警总会让人心烦意乱，这时，禁用 `lint` 规则就显得十分讨巧。

- 块注释：使用如下方式，可以在整个文件或者代码块禁用所有规则或者禁用特定规则：

```js
/* eslint-disable */
alert('该注释放在文件顶部，整个文件都不会出现 lint 警告')
```

- 行注释： 使用如下方式可以在某一特定的行上禁用所有规则或者禁用特定规则：

```js
alert('禁用该行所有规则') // eslint-disable-line

// eslint-disable-next-line
alert('禁用该行所有规则')
```

### 配置优先级

对于完整的配置层次结构，从最高优先级最低的优先级，如下:

1. 行内配置： 比如 `/*eslint-disable*/`、`/*eslint-enable*/`、`/*global*`/、`/*eslint*/`
2. 命令行选项（或 `CLIEngine` 等价物）：比如 `--global`、`--rule`、`--env`
3. 项目级配置：
   1. 与要检测的文件在同一目录下的 `.eslintrc.*` 或 `package.json` 文件
   2. 继续在父级目录寻找 `.eslintrc` 或 `package.json` 文件，直到根目录（包括根目录）或直到发现一个有 `"root": true` 的配置。
4. 如果不是（1）到（3）中的任何一种情况，退回到 `~/.eslintrc` 中自定义的默认配置（即 `IDE` 环境安装的 `ESLint` 插件的配置）。

## Prettier

### 安装

```sh
$ npm install --save-dev --save-exact prettier
```

配置文件支持多种形式：

根目录创建 `.prettierrc` 文件，支持 `.yaml`、`.yml`、`.json`、`.js` 后缀

根目录创建 `.prettier.config.js` 文件，并对外 `export` 一个对象

或在 `package.json` 中新建 `Prettier` 属性。

```js
module.exports = {
  // 一行最多 200 字符
  printWidth: 200,
  // 使用 2 个空格缩进
  tabWidth: 2,
  // 不使用缩进符，而使用空格
  useTabs: false,
  // 行尾不需要分号
  semi: false,
  // 使用单引号
  singleQuote: true,
  // 对象的 key 仅在必要时用引号
  quoteProps: 'as-needed',
  // jsx 不使用单引号，而使用双引号
  jsxSingleQuote: false,
  // 末尾不需要逗号
  trailingComma: 'none',
  // 大括号内的首尾需要空格
  bracketSpacing: true,
  // jsx 标签的反尖括号不需要换行
  jsxBracketSameLine: true,
  // 箭头函数，只有一个参数的时候，也需要括号：always，avoid：省略括号
  arrowParens: 'avoid',
  // 每个文件格式化的范围是文件的全部内容
  rangeStart: 0,
  rangeEnd: Infinity,
  // 不需要写文件开头的 @prettier
  requirePragma: false,
  // 不需要自动在文件开头插入 @prettier
  insertPragma: false,
  // 使用默认的折行标准
  proseWrap: 'preserve',
  // 根据显示样式决定 html 要不要折行
  htmlWhitespaceSensitivity: 'css',
  // 换行符使用 lf
  endOfLine: 'lf',
  // 不格式化 vue 文件，vue 文件的格式化单独设置
  disableLanguages: ['vue']
}
```

```sh
npx prettier --write . #格式化所有文件
```

### Prettier 与 ESLint 配合使用

> `ESLint` 和 `Prettier` 相互合作的时候有一些问题，对于他们交集的部分规则，`ESLint` 和 `Prettier` 格式化后的代码格式不一致。
>
> 导致的问题是：当你用 `Prettier` 格式化代码后再用 `ESLint` 去检测，会出现一些因为格式化导致的 `warning`，当你用 `eslint --fix` 修复问题，又无法通过 `Prettier` 校验，导致陷入一开始提到的“死循环问题”。

这种问题的主要解决思路是在 `ESLint` 的规则配置文件上做文章，安装特定的 `plugin`，把其配置到规则的尾部，实现 `Prettier` 规则对 `ESLint` 规则的覆盖。

```js
// 安装 prettier eslint-plugin-prettier
npm install --save-dev --save-exact prettier
npm install --save-dev eslint-plugin-prettier

// 在 .eslintrc.* 文件里面的 extends 字段添加：
{
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "error"
  }
}
```

或者：

```js
npm install --save-dev --save-exact prettier
npm install --save-dev eslint-config-prettier
npm install --save-dev eslint-plugin-prettier

// 在 .eslintrc.* 文件里面的 extends 字段添加：
{
  "extends": [
    "plugin:prettier/recommended"
  ],
  "rules": {
    "prettier/prettier": "error",
  }
}
```

这个时候你运行 `eslint --fix` 实际使用的是 `Prettier` 去格式化文件。在`rules` 中添加 `"prettier/prettier": "error"`，当代码出现 `Prettier` 校验出的格式化问题，`ESLint` 会报错。`eslint-plugin-prettier` 具体详细的配置[点这里](https://github.com/prettier/eslint-plugin-prettier)

## VS Code 集成

### 仅安装 Eslint 插件

安装该插件，可以将 `ESLint` 规则集成到` VS Code` 中，这样在编程过程中，违背 `ESLint` 规则会自动提示。当然也可以为 `ESLint` 启用“保存时自动修复”，并且仍然具有格式和快速修复功能：

```js
// 设置全部语言在保存时自动格式化
"editor.formatOnSave": true,
// 相当于 eslint --fix
"editor.codeActionsOnSave": {
    // For ESLint
    "source.fixAll.eslint": true,
}
```

这样就相当于在 `eslint` 中使用 `prettier`，保存时自动修复就相当于运行 `eslint --fix`

### Prettier 插件 和 Eslint 插件 都安装

> **Linters have two categories of rules**:

> **Formatting rules**: eg: max-len, no-mixed-spaces-and-tabs, keyword-spacing, comma-style…

> Prettier alleviates the need for this whole category of rules! Prettier is going to reprint the entire program from scratch in a consistent way, so it’s not possible for the programmer to make a mistake there anymore :)

> **Code-quality rules**: eg no-unused-vars, no-extra-bind, no-implicit-globals, prefer-promise-reject-errors…

> Prettier does nothing to help with those kind of rules. They are also the most important ones provided by linters as they are likely to catch real bugs with your code!

**In other words, use Prettier for formatting and linters for catching bugs!**

> 在 `eslint` 中用 `prettier` 是不推荐的，而且格式化的事是一个 `lint` 该做的吗？应该按官方推荐的方式，安装 `vscode` 插件，设置 `formatOnSave`，保存的时候自动格式化。

**`Eslint` 去掉和 `Prettier` 冲突的规则**

```js
{
  // 设置全部语言的默认格式化程序为prettier
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  // 设置特定语言的默认格式化程序为prettier
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
// 设置全部语言在保存时自动格式化
"editor.formatOnSave": true,
// 设置特定语言在保存时自动格式化
"[javascript]": {
    "editor.formatOnSave": true
}
```

使用 `VS Code` 设置来配置 `Prettier`。`Prettier` 将按以下优先级读取设置：

> 巨坑，这里 2 会导致 3 配置失效

1. `Prettier` 配置文件，比如 `.prettierrc` 、`.prettier.config.js`。
2. **`.editorconfig` 文件，用于覆盖用户/工作区设置，具体可了解 `EditorConfig for VS Code`。**
3. `Visual Studio` 代码设置（分用户/工作区设置）。

## ESLint 生态依赖包

### 扩展

- `eslint-config-airbnb`: 该包提供了所有的 `Airbnb` 的 `ESLin`t 配置，作为一种扩展的共享配置，你是可以修改覆盖掉某些不需要的配置的，该工具包包含了 `react` 的相关 `Eslint` 规则(eslint-plugin-react 与 eslint-plugin-jsx-a11y)，所以安装此依赖包的时候还需要安装刚才提及的两个插件
- `eslint-config-airbnb-base`: 与上一个包的区别是，此依赖包不包含 `react` 的规则，一般用于服务端检查。

- `eslint-config-prettier`: 将会禁用掉所有那些非必须或者和 `prettier` 冲突的规则。这让您可以使用您最喜欢的 `shareable` 配置，而不让它的风格选择在使用 `Prettier` 时碍事。请注意该配置只是将规则 `off` 掉,所以它只有在和别的配置一起使用的时候才有意义。

- `eslint-config-standard`: 是一个标准配置，旨在让所有开发者不需要维护 `.eslintrc`, `.jshintrc`, or `.jscsrc`，这里是规范：[JavaScript Standard Style](https://standardjs.com/rules-zhcn.html)

### 插件

- `eslint-plugin-babel`: 和 `babel-eslint` 一起用的一款插件 `.babel-eslint` 在将 `eslint` 应用于 `Babel` 方面做得很好，但是它不能更改内置规则来支持实验性特性。`eslint-plugin-babel` 重新实现了有问题的规则，因此就不会误报一些错误信息

- `eslint-plugin-import`: 该插件想要支持对 `ES2015+ (ES6+) import/export` 语法的校验, 并防止一些文件路径拼错或者是导入名称错误的情况

- `eslint-plugin-promise`：`promise` 规范写法检查插件，附带了一些校验规则。

- `eslint-plugin-jsx-a11y`: 该依赖包专注于检查 `JSX` 元素的可访问性。

- `eslint-import-resolver-webpack`: 可以借助 `webpack` 的配置来辅助 `eslint` 解析，最有用的就是 `alias`，从而避免 `unresolved` 的错误

- `eslint-import-resolver-typescript`：和 `eslint-import-resolver-webpack` 类似，主要是为了解决 `alias` 的问题

- `eslint-plugin-react`: `React` 专用的校验规则插件.

- `eslint-plugin-jest`: `Jest` 专用的 `Eslint` 规则校验插件.

- `eslint-plugin-prettier`: 该插件辅助 `Eslint` 可以平滑地与 `Prettier` 一起协作，并将 `Prettier` 的解析作为 `Eslint` 的一部分，在最后的输出可以给出修改意见。这样当 `Prettier` 格式化代码的时候，依然能够遵循我们的 `Eslint` 规则。如果你禁用掉了所有和代码格式化相关的 `Eslint` 规则的话，该插件可以更好得工作。所以你可以使用 `eslint-config-prettier` 禁用掉所有的格式化相关的规则(如果其他有效的 `Eslint` 规则与 `prettier` 在代码如何格式化的问题上不一致的时候，报错是在所难免的了)

- `@typescript-eslint/eslint-plugin`：`Typescript` 辅助 `Eslint` 的插件。

> 几个工具之间的关系是：`prettier` 是最基础的，然后你需要用 `eslint-config-prettier` 去禁用掉所有和 `prettier` 冲突的规则，这样才可以使用 `eslint-plugin-prettier` 去以符合 `eslint` 规则的方式格式化代码并提示对应的修改建议。

## Eslint 本地配置

```sh
npm i -D eslint babel-eslint eslint-config-standard eslint-plugin-import eslint-plugin-node eslint-plugin-promise
```

```js
"eslint.nodePath": "/Users/gakki/Documents/lints/node_modules",
"eslint.options": {
  "configFile": "/Users/gakki/Documents/lints/.eslintrc.js"
},
```

## Husky + lint-staged 打造合格的代码检查工作流

首先，安装依赖：

```js
npm install -D husky
```

然后修改 `package.json`，增加配置：

```sh
{
  "scripts": {
    "precommit": "eslint src/**/*.js"
  }
}
```

这样，在 g`it commit` 的时候就会看到 `pre-commit` 执行了。

针对历史项目，在中途安装代码检查工作流，提交代码时，对其他未修改的“历史”文件都进行检查，一下出现成百上千个错误，估计会吓得立马删掉 `eslint` 等相关配置，冒出一身冷汗。

针对这样的痛点问题，就是每次只对当前修改后的文件进行扫描，即进行 `git add` 加入到`stage` 区的文件进行扫描即可，完成对增量代码进行检查。

如何实现呢？这里就需要使用到 `lint-staged` 工具来识别被加入到 `stage` 区文件。

首先安装依赖：

```js
npm install -D lint-staged
```

然后修改 `package.json`，增加配置：

```sh
"husky": {
  "hooks": {
    "pre-commit": "lint-staged"
  }
},
"lint-staged": {
  "src/**/*.{js,vue}": ["prettier --write", "eslint --cache --fix", "git add"]
}
```

在进行 `git commit` 的时候会触发到 `git hook` 进而执行 `precommit`，而`precommit` 脚本引用了 `lint-staged` 配置表明只对 `git add` 到 `stage` 区的文件进行扫描，具体 `lint-staged` 做了三件事情：

执行 `Prettier` 脚本，这是对代码进行格式化的;
执行 `eslint --fix` 操作，进行扫描，对 `eslint` 问题进行修复；
上述两项任务完成后将代码重新 `add` 进 `stage` 区，然后执行 `commit`。
