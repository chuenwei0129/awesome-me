# 前端工程化：转译器<!-- omit in toc -->

- [前端领域需要哪些转译器](#前端领域需要哪些转译器)
  - [JavaScript](#javascript)
  - [CSS](#css)
  - [HTML](#html)
- [sourcemap](#sourcemap)
- [Babel](#babel)
  - [babel-preset-env](#babel-preset-env)
    - [前置知识](#前置知识)
    - [仅配置 @babel/preset-env](#仅配置-babelpreset-env)
    - [引入 @babel/plugin-transform-runtime](#引入-babelplugin-transform-runtime)
    - [总结](#总结)
  - [babel-preset-react](#babel-preset-react)
  - [babel-preset-typescript](#babel-preset-typescript)
- [postCSS](#postcss)
  - [什么是 postCSS](#什么是-postcss)
  - [postCSS 插件](#postcss-插件)
- [转译器在项目中的使用](#转译器在项目中的使用)
- [Eslint 与 Prettier](#eslint-与-prettier)
  - [配置文件](#配置文件)
  - [配置优先级](#配置优先级)
  - [在不使用打包工具的项目中使用（平时做些代码练习）](#在不使用打包工具的项目中使用平时做些代码练习)
  - [ESlint 配置项解析](#eslint-配置项解析)
    - [parser - 解析器](#parser---解析器)
    - [parserOptions - 解析器选项](#parseroptions---解析器选项)
    - [rules - 规则](#rules---规则)
    - [plugins - 插件](#plugins---插件)
    - [extends - 拓展](#extends---拓展)
    - [一些扩展](#一些扩展)
    - [一些插件](#一些插件)
  - [Prettier 配置项解析](#prettier-配置项解析)
- [Husky + lint-staged 打造合格的代码检查工作流](#husky--lint-staged-打造合格的代码检查工作流)
- [参考资料](#参考资料)

## 前端领域需要哪些转译器

### JavaScript

1. ES 版本更新快，ES2015、ES2016、ES2017 等新特性目标环境不支持，但是却想开发时用，就需要转译器把这些特性转成目标环境支持的，比如 **babel**。

2. JavaScript 是动态类型语言，编译期间没有类型的概念，没法提前进行类型检查。想给 JavaScript 加入类型的语法语义，但是需要编译完后会把类型信息去掉，这也需要转译器，比如 typescript。

3. 有些框架需要一些语法糖，比如 react 的 `React.createElement` 写起来太过麻烦，希望开发时能用类似 xml 的方式来书写，由转译器来把这些语法糖编译成具体的 api，比如 jsx。

4. 需要在编译期间对代码进行压缩和各种优化（死代码删除等），然后转成目标代码，比如 terser。

5. 需要在编译期间检查出一些代码规范的错误，比如 eslint。

### CSS

1. 需要扩展一些能力，比如变量、函数、循环、嵌套等等，使得 css 更容易管理，比如 scss、less、stylus 等 DSL（domain specific language）

2. 或者 css next，这些都分别通过 scss、less、stylus、postcss 等转译器来转成目标 css。

3. 需要处理兼容性前缀（autoprefixer）、对 css 进行规范检查（stylelint）、css 模块化 （css modules）等，这些通过 postcss 转译器支持。

### HTML

和 css 一样，也要扩展一些能力，比如继承、组合、变量、循环等等，这些是 pug、moustache 等模版引擎支持的，也有各自的转译器来把源码在编译期间转成目标代码（这个转换也可能是在运行时做的）。

支持各种内容转 html，比如 markdown 转 html 等，这可以通过 posthtml 来做转译。

## sourcemap

**sourcemap 是生成的代码和源码之间的映射关系**，通过它就能映射到源码。转译器都是源码转源码的，自然都会有 sourcemap。

**具体细节推荐：**[阮一峰老师的文章](https://link.juejin.cn/?target=https%3A%2F%2Fwww.ruanyifeng.com%2Fblog%2F2013%2F01%2Fjavascript_source_map.html)

知道了 sourcemap 的作用，那么 sourcemap 是怎么生成的呢？

具体生成的逻辑可以由 [source-map](https://link.juejin.cn?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fsource-map) 这个 mozilla 提供的包来完成，我们只需要提供每一个 mapping，也就是源码中的行列号，目标代码中的行列号。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/fe-engineering/SCR-20220524-peo.png)

当源码 parse 成 AST 的时候，会在 AST 中保留它在源码中的位置（line、column）

AST 进行转换并不会修改这个行列号

生成目标代码的时候，又会计算出一个新的位置（line、column）

**这样两个位置合并起来就是一个 mapping。所有 AST 节点的 mapping 就能生成完整的 sourcemap。**

这就是 sourcemap 生成的原理。

## Babel

作为 JS 转译器，[Babel](https://github.com/babel/babel/tree/main/packages#core-packages) 接收输入的 JS 代码，经过内部处理流程，最终输出修改后的 JS 代码。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/fe-engineering/SCR-20220524-qfj.png)

### [babel-preset-env](https://babeljs.io/docs/en/babel-preset-env)

#### 前置知识

首先我们来理清楚这三个概念:

- **最新 `ES` 语法**，比如：箭头函数，`let/const`。
- **最新 `ES API`**，比如：`Promise`
- **最新 `ES` 实例/静态方法**，比如：`String.prototype.include`

`babel/preset-env` 是语法转译器也可以叫预设，**但是它只转换新的 `ES` 语法**。而不转换新的 `ES API`，比如 `Iterator`，`Promise`，而对与这些新的 `API` 需要通过 [core-js](https://github.com/zloirock/core-js) 转译。

babel 的 polyfill 机制是，对于例如 `Array.from` 等静态方法，直接在 `global.Array` 上添加；对于例如 `includes` 等实例方法，直接在 `global.Array.prototype` 上添加。**这样直接修改了全局变量的原型，有可能会带来意想不到的问题。**

babel 转译 syntax 时，有时候会使用一些辅助的函数来帮忙转，class 语法中，babel 自定义了 `_classCallCheck` 这个函数来辅助；`typeof` 则是直接重写了一遍，自定义了 `_typeof` 这个函数来辅助。这些函数叫做 **helpers**。如果一个项目中有 100 个文件，其中每个文件都写了一个 class，那么这个项目最终打包的产物里就会存在 100 个 `_classCallCheck` 函数，**他们的长相和功能一模一样，这显然不合理**。

#### 仅配置 @babel/preset-env

`@babel/preset-env` 的作用是根据 targets 的配置查询内部的 `@babe/compat-data` 的数据库，过滤出目标环境不支持的语法和 api，引入对应的转换插件。

开启 polyfill 功能要指定它的引入方式，也就是 useBuiltIns。**设置为 usage 是在每个模块引入用到的（按需加载）**，设置为 entry 是统一在入口处引入 targets 需要的。

polyfill 的实现是 core-js，需要再指定下 corejs 版本，一般是指定 3，**这个会 polyfill 实例方法，而 corejs2 不会**。

```js
{
    presets: [
        ['@babel/preset-env', {
            targets: 'chrome 30',
            debug: true,
            useBuiltIns: 'usage',
            corejs: 3
        }]
    ]
}
```

**存在问题：**

@babel/preset-env 的处理方式是 helper 代码直接注入、regenerator、core-js 代码全局引入。

**这样就会导致多个模块重复注入同样的代码，会污染全局环境。**

#### 引入 @babel/plugin-transform-runtime

```js
{
    presets: [
        ['@babel/preset-env', {
            targets: 'chrome 30',
            debug: true,
            useBuiltIns: 'usage',
            corejs: 3
        }]
    ],
    plugins: [
        ['@babel/plugin-transform-runtime', {
            corejs: 3
        }]
    ]
}
```

**注意，这个插件也是处理 polyfill ，也就同样需要指定 corejs 的版本。**

`@babel/plugin-transform-runtime` 的功能是把注入的代码和 core-js 全局引入的代码转换成从 `@babel/runtime-corejs3` 中引入的形式。

`@babel/runtime-corejs3` 就包含了 helpers、core-js、regenerator 这 3 部分。

这个插件解决全局污染问题的原理：是因为 babel 插件和 preset 生效的顺序是这样的

> 先插件后 preset，插件从左往右，preset 从右往左。

这就导致了 `@babel/plugin-transform-runtime` 是在 `@babel/preset-env` 之前调用的，提前做了 api 的转换，那到了 `@babel/preset-env` 就没什么可转了，也就实现了 `polyfill` 的抽取。解决了问题

**存在问题：**

我们通过 `@babel/plugin-transform-runtime` 提前把 polyfill 转换了，但是这个插件里**没有 targets 的设置呀，不是按需转换的，那就会多做一些没必要的转换**。

这个其实是已知问题，可以在 babel 的项目里找到这个 [issue](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fbabel%2Fbabel%2Fissues%2F10008)：

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/fe-engineering/89df44e70bc74878ac44567316dc4d37_tplv-k3u1fbpfcp-zoom-in-crop-mark_1304_0_0_0.webp)

当然官方也提出了解决的方案：[babel-polyfills](https://github.com/babel/babel-polyfills)。

#### 总结

1. babel7 以后，我们只需要使用 `@babel/preset-env`，指定目标环境的 targets，babel 就会根据内部的兼容性数据库查询出该环境不支持的语法和 api，进行对应插件的引入，从而实现按需的语法转换和 polyfill 引入。

1. 如果使用 `@babel/preset-env` 走 `useBuiltIns: usage` 搭配 `target` 的这种 polyfill 的方式的话，polyfill 是会污染全局的(entry 模式也是污染全局)。

1. 如果是走 `@babel/plugin-transform-runtime` 插件的 polyfill 的话不会污染全局。但是这个插件没法利用 `target` 的目标平台配置的策略。因此在你代码当中只要是使用了 ES6+ 的新 api，一律都会引入对应的 polyfill 文件（而不考虑这个新的 api 是否被目标浏览器已经实现了）。

### [babel-preset-react](https://babeljs.io/docs/en/babel-preset-react)

当你使用 JSX 时，编译器会将其转换为浏览器可以理解的 React 函数调用。旧的 JSX 转换会把 JSX 转换为 `React.createElement(...)` 调用。

例如，假设源代码如下：

```jsx
import React from 'react';

function App() {
  return <h1>Hello World</h1>;
}
```

旧的 JSX 转换会将上述代码变成普通的 javascript 代码：

```js
import React from 'react';

function App() {
  return React.createElement('h1', null, 'Hello world');
}
```

然而，这并不完美：有一些 React.createElement 无法做到的**性能优化**和简化。

为了解决这些问题，React 17 在 React 的 package 中引入了两个新入口，这些入口只会被 Babel 和 TypeScript 等编译器使用。

新的 JSX 转换不会将 JSX 转换为 React.createElement，而是自动从 React 的 package 中引入新的入口函数并调用。例如：

```jsx
function App() {
  return <h1>Hello World</h1>;
}
```

现在将转换为：

```js
// 由编译器引入（禁止自己引入！）
import {jsx as _jsx} from 'react/jsx-runtime';

function App() {
  return _jsx('h1', { children: 'Hello world' });
}
```

注意，此时源代码无需引入 React 即可使用 JSX 了！（但仍需引入 React，以便使用 React 提供的 Hook 或其他导出。）

### [babel-preset-typescript](https://babeljs.io/docs/en/babel-preset-typescript)

babel 不支持 `const enum`（会作为 enum 处理），不支持 `namespace` 的跨文件合并，导出非 const 的值，不支持过时的 `export = import = 的模块语法`。

tsc 支持最新的 es 标准特性和部分草案的特性（比如 decorator），而 babel 通过 `@babel/preset-env` 支持所有标准特性，也可以通过 `@babel/proposal-xx` 来支持各种非标准特性，支持的语言特性上 babel 更强一些。

tsc 没有做 polyfill 的处理，需要全量引入 core-js，而 babel 的 `@babel/preset-env` 会根据 targets 的配置按需引入 core-js，引入方式受 useBuiltIns 影响 (entry 是在入口引入 targets 需要的，usage 是每个模块引入用到的)。

而且 tsc 因为要做类型检查所以是比较慢的，而 babel 不做类型检查，编译会快很多。

可以用 `tsc --noEmit` 来做类型检查，加上 noEmit 选项就不会生成代码了。

如果你要生成 `d.ts`，也要单独跑下 tsc 编译。

**综上，用 tsc 做类型检查，用 babel 做代码转换是更好的选择。**

## postCSS

### 什么是 [postCSS](https://github.com/postcss/postcss/blob/HEAD/docs/README-cn.md)

类比 Babel 家族的 `@babel/parser` 可以将 js 代码解析为 AST，再利用众多插件的能力改写 AST，最终输出改写后的 js 代码。

postCSS 利用自身的 parser 可以将 css 代码解析为 AST，再利用众多插件改写 AST，最终输出改写后的 css 代码。

因此，postCSS 也被成为「后处理器」，因为其通常在 css 处理链条的最后端。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/fe-engineering/SCR-20220525-dzw.png)

### [postCSS 插件](https://github.com/postcss/postcss/blob/main/docs/writing-a-plugin.md)

当前 postCSS 插件按功能划分大体有如下几类：

- 使用未全面兼容的 css 特性，比如 [autoprefixer](https://github.com/postcss/autoprefixer)
- 解决全局css问题，比如提供 [css module](https://github.com/madyankin/postcss-modules) 支持
- linters，比如 [stylelint](https://github.com/stylelint/stylelint)
- 格式化，提高 css 可读性
- 图片和文字处理

## 转译器在项目中的使用

转译器在项目中的应用有三种方式：

- **ide 的插件**。在写代码的时候对代码实时进行 lint、类型检查、格式化等，比如常用的 eslint vscode插件、typescript vscode 插件（这个是内置的）等。

- **git hooks**。通过 husky 的 `git commit hook` 来触发执行。比如 prettier，这个只需要在代码提交的时候格式化一下。

- **通过打包工具来调用**。转译器针对的是单个文件，打包工具针对的是多个文件，在打包的过程中处理到每一个文件会调用相应的转译器来处理，比如 webpack 的 loader。

## Eslint 与 Prettier

### 配置文件

在初始化 ESLint 时，可以选择使用某种文件类型进行 `lint` 配置，有如下三种选项：

- **`JavaScript`**：`.eslintrc.js`
- **`YAML`**：`.eslintrc.yaml`
- **`JSON`**：`.eslintrc.json`

另外，也可以在 `package.json` 文件中添加 `eslintConfig` 字段进行配置。

**Prettier 配置文件支持多种形式：**

- 根目录创建 `.prettierrc` 文件，能够写入 YML、JSON 的配置格式，并且支持 `.yaml`、`.yml`、`.json`、`.js` 后缀；
- 根目录创建 `.prettier.config.js` 文件，并对外 `export` 一个对象；
- 在 `package.json` 中新建 `Prettier` 属性。

### 配置优先级

**使用 VSCode 设置来配置 Prettier 与 ESlint**。

Prettier 将按以下优先级读取设置：

1. Prettier 配置文件，比如 `.prettierrc` 、`.prettier.config.js`。
2. `.editorconfig` 文件，用于覆盖用户/工作区设置，具体可了解 `EditorConfig for VS Code`。
3. `Visual Studio` 代码设置（分用户/工作区设置）。

对于完整的配置层次结构，ESlint 从最高优先级到最低的优先级，如下:

1. **行内配置：** 比如 `/*eslint-disable*/`、`/*eslint-enable*/`、`/*global*`/、`/*eslint*/` 等
2. **命令行选项**：比如 `--global`、`--rule`、`--env`
3. **项目级配置**：
   1. 与要检测的文件在同一目录下的 `.eslintrc.*` 或 `package.json` 文件
   2. 继续在父级目录寻找 `.eslintrc` 或 `package.json` 文件，直到根目录（包括根目录）或直到发现一个有 `"root": true` 的配置（存在就不在向上寻找）。
4. 如果不是 `1` 到 `3` 中的任何一种情况，退回到 `IDE` 环境安装的 `ESLint` 插件的配置（ eslint.options)

### 在不使用打包工具的项目中使用（平时做些代码练习）

ESLint 和 Prettier 相互合作的时候有一些问题，对于他们交集的部分规则，ESLint 和 Prettier 格式化后的代码格式不一致。

导致的问题是：当你用 Prettier 格式化代码后再用 ESLint 去检测，会出现一些因为格式化导致的 `warning`，当你用 `eslint --fix` 修复问题，又无法通过 Prettier 校验，导致陷入**死循环**。

```sh
# 初始化项目
npm i -y
# 交互式生成 eslint 配置文件
npx eslint --init
# 解决 eslint 与 prettier 冲突
npm i --save-exact prettier -D
npm i eslint-config-prettier eslint-plugin-prettier -D
```

接下来在项目根目录创建 `.prettierrc.js` 配置格式化规则，再然后修改 `eslintrc.js` 如下：

```js
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

> 几个工具之间的关系是：`prettier` 是最基础的，然后你需要用 `eslint-config-prettier` 去禁用掉所有和 `prettier` 冲突的规则，这样才可以使用 `eslint-plugin-prettier` 去以符合 `eslint` 规则的方式格式化代码并提示对应的修改建议。

**这个时候你运行 `eslint --fix` 实际使用的是 Prettier 去格式化文件。在`rules` 中添加 `"prettier/prettier": "error"`，当代码出现 Prettier 校验出的格式化问题，ESLint 会报错。**

VSCode 设置：

```js
// 设置全部语言在保存时自动格式化
"editor.formatOnSave": true,
// 相当于执行 eslint --fix
"editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
}
```

保存时自动修复就相当于运行 `eslint --fix`

最终项目目录如下：

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/fe-engineering/SCR-20220525-2sr.png)

配置详细说明 🔎：[点这里](https://github.com/prettier/eslint-plugin-prettier)

### ESlint 配置项解析

`.eslintrc.js` 文件配置如下（这是根据交互式选择生成的配置，选择不同，配置不同）：

```js
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
  },
};
```

#### parser - 解析器

ESLint 默认使用 `Espree` 作为其解析器，但是该解析器仅支持最新的**ECMAScript(es5)** 标准，对于实验性的语法和非标准（TypeScript）语法是不支持的。因此，开源社区提供了以下两种解析器来丰富 `TSLint` 的功能：

- `babel-eslint`：Babel 是一个工具链，主要用于将 **ECMAScript 2015+(es6+)** 版本的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中。因此，如果在项目中使用 es6，就需要将解析器改成 `bable-eslint`。

- `@typescript-eslint/parser`：该解析器将 TypeScript 转换成与 `estree` 兼容的形式，允许 ESLint 验证 TypeScript 源代码。

#### parserOptions - 解析器选项

除了可以自定义解析器外，ESLint 允许你指定你想要支持的 JavaScript 语言选项。默认情况下，ESLint 支持 `ECMAScript 5` 语法。你可以覆盖该设置，以启用对 ECMAScript 其它版本和 `JSX` 的支持。

解析器选项可以在 `.eslintrc.*` 文件使用 `parserOptions` 属性设置。可用的选项有：

- **`ecmaVersion`** -你可以使用 6、7、8、9 或 10 来指定你想要使用的 `ECMAScript` 版本。你也可以用使用年份命名的版本号指定为 `2015`（同 6），`2016`（同 7），或 `2017`（同 8）或 `2018`（同 9）或 `2019` (same as 10)。
- **`sourceType`** - 设置为 `script` (默认) 或 `module`（如果你的代码是 `ECMAScript` 模块)。
- **`ecmaFeatures`** - 这是个对象，表示你想使用的额外的语言特性:
  - `globalReturn` - 允许在全局作用域下使用 `return` 语句
  - `impliedStrict` - 启用全局 `strict mode` (如果 `ecmaVersion` 是 5 或更高)
  - `jsx` - 启用 `JSX`

设置解析器选项能帮助 ESLint 确定什么是解析错误，所有语言特性选项默认都是 `false`。

#### rules - 规则

ESLint 附带有大量的 [规则](https://cn.eslint.org/docs/rules/)，你可以在配置文件的 `rules` 属性中配置你想要的规则。要改变一个规则设置，你必须将规则 `ID` 设置为下列值之一：

- `off` 或 `0`：关闭规则
- `warn` 或 `1`：开启规则，`warn` 级别的错误 (不会导致程序退出)
- `error` 或 `2`：开启规则，`error` 级别的错误(当被触发的时候，程序会退出)

有的规则没有属性，只需控制是开启还是关闭，像这样：`"eqeqeq": "off"`，有的规则有自己的属性，使用起来像这样：`"quotes": ["error", "double"]`。具体内容可以查看规则文档。

可以通过 `rules` 配置任何想要的规则，它会覆盖你在拓展或插件中引入的配置项。

#### plugins - 插件

官方的规则只能检查标准的 JavaScript 语法，如果你写的是 `JSX` 或者 TypeScript，ESLint 的规则就开始束手无策了。

这个时候就需要安装 `ESLint` 的插件，来定制一些特定的规则进行检查。ESLint 的插件与扩展一样有固定的命名格式，**以 `eslint-plugin-` 开头，使用的时候也可以省略这个头。**

举个例子，我们要在项目中使用 `TypeScript`，前面提到过，需要将解析器改为`@typescript-eslint/parser`，同时需要安装 `@typescript-eslint/eslint-plugin` 插件来拓展规则，添加的 `plugins` 中的规则**默认是不开启的**，我们需要在 `rules` 中选择我们要使用的规则。也就是说 `plugins` 是要和 `rules` 结合使用的。如下所示：

```js
// 安装：npm i --save-dev @typescript-eslint/eslint-plugin @typescript-eslint/parser
// 配置：
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

指定配置的字符串: 比如官方提供的两个拓展 [eslint:recommended](https://github.com/eslint/eslint/blob/v6.0.1/conf/eslint-recommended.js) 或 [eslint:all](https://github.com/yannickcr/eslint-plugin-react/blob/master/index.js#L108)，可以启用当前安装的 ESLint 中所有的核心规则，省得我们在 `rules` 中一一配置。

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

#### 一些扩展

- `eslint-config-airbnb`: 该包提供了所有的 `Airbnb` 的 `ESLint` 配置，作为一种扩展的共享配置，你是可以修改覆盖掉某些不需要的配置的，该工具包包含了 `react` 的相关 `Eslint` 规则(eslint-plugin-react 与 eslint-plugin-jsx-a11y)，所以安装此依赖包的时候还需要安装刚才提及的两个插件。

- `eslint-config-airbnb-base`: 与上一个包的区别是，此依赖包不包含 `react` 的规则，一般用于服务端检查。

- `eslint-config-prettier`: 将会禁用掉所有那些非必须或者和 `prettier` 冲突的规则。这让您可以使用您最喜欢的 `shareable` 配置，而不让它的风格选择在使用 `Prettier` 时碍事。请注意该配置只是将规则 `off` 掉,所以它只有在和别的配置一起使用的时候才有意义。

- `eslint-config-standard`: 是一个标准配置，旨在让所有开发者不需要维护 `.eslintrc`, `.jshintrc`, or `.jscsrc`，这里是规范：[JavaScript Standard Style](https://standardjs.com/rules-zhcn.html)

#### 一些插件

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

### Prettier 配置项解析

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

这样，在 `git commit` 的时候就会看到 `pre-commit` 执行了。

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

## 参考资料

- [Babel 是如何读懂 JS 代码的](https://zhuanlan.zhihu.com/p/27289600)
- [回顾 babel 6 和7，来预测下 babel 8](https://juejin.cn/post/6956224866312060942)
- [《前端领域的转译打包工具链》上篇](https://juejin.cn/post/6956602138201948196)
- [Babel7 相关](https://github.com/CommanderXL/Biu-blog/issues/52)
- [Migration from preset-env and plugin-transform-runtime](https://github.com/babel/babel-polyfills/blob/main/docs/migration.md)
- [TSLint 和 ESLint 是怎么融合在一起的](https://juejin.cn/post/7009657813890760741)
- [一键格式化代码带来的快感 | 你还在为每个项目配置 Stylelint 和 Eslint 吗](https://juejin.cn/post/6933009968710811661#heading-0)
- [不以规矩，不能成方圆-彻底搞懂 ESLint 和 Prettier](https://juejin.cn/post/6909788084666105864)
- [解剖 postCSS —— 向前端架构师迈出一小步](https://zhuanlan.zhihu.com/p/357492062)
