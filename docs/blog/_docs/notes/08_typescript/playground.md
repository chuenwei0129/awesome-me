---
title: 开发环境
order: -1
toc: content
group:
  title: 待分类
  order: 999
---

## Playground

如果你需要一个简单的环境来编写和调试 TypeScript 代码，并且希望快速调整 tsconfig 配置，那么官方提供的 [Playground](https://www.typescriptlang.org/zh/play/?#code/MYewdgzgLgBAthA5jAvDARACwKYBtcgwDuIATrgCboDcAULaJLBAA7YCGA1qjABQKIAXDGikAlmEQBKVAD4YjCCFzYAdAUT8kUurVYdOW6XSA) 是一个理想的选择。

![Playground 示例](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/me/20240524104917.png)

Playground 的强大之处在于其简单的配置切换功能，例如选择 TS 版本 (左上角) 和可视化配置 tsconfig (左上角的配置)。这使得它非常适合用来研究 tsconfig 的各种配置选项及其作用。

## ts-node 与 ts-node-dev

如果你需要像 `node index.js` 一样快速验证 TypeScript 代码逻辑，那么 [ts-node](https://typestrong.org/ts-node/docs/) 和 [ts-node-dev](https://github.com/wclr/ts-node-dev) 是你需要的工具。这些工具可以直接执行 TypeScript 文件，并支持文件变更后的自动重新执行。此外，它们还可以跳过类型检查，以提高执行速度。

### ts-node

你可以选择将 ts-node 安装到项目本地或全局。以下命令将 ts-node 和 TypeScript 全局安装：

```shell
npm i ts-node typescript -g
```

然后，在项目中创建 TypeScript 项目配置文件 `tsconfig.json`：

```shell
npx typescript --init
```

或者，如果你已全局安装 TypeScript，可以这样做：

```shell
tsc --init
```

创建一个 TypeScript 文件 (例如 `index.ts`)：

```ts
console.log("Hello TypeScript");
```

使用 ts-node 执行：

```shell
ts-node index.ts
```

如果一切正常，你的终端应能正确输出字符。

### ts-node-dev

ts-node 本身不支持自动监听文件变更并重新执行，这在某些项目场景下是必需的，例如 Node.js API 开发。因此，我们需要使用 ts-node-dev。它基于 [node-dev](https://github.com/fgnass/node-dev) 和 ts-node，实现了共享同一个 TS 编译进程的功能，从而避免了每次重启时重新实例化编译进程的开销。

首先，全局安装 ts-node-dev：

```shell
npm i ts-node-dev -g
```

ts-node-dev 提供了 `tsnd` 这一简写命令。最常见的使用方式如下：

```shell
ts-node-dev --respawn --transpile-only app.ts
```

`respawn` 选项启用监听重启功能，而 `transpileOnly` 提供更快的编译速度。你可以查看官方文档了解更多选项，但在大多数情况下，上述命令已经足够使用。

## 类型比较

如果你只需进行类型比较，可以在类型空间中 (即 TypeScript 类型信息的内存空间) 进行。这时只需使用 `declare` 关键字：

```ts
declare let v1: string;
declare let v2: number;

// 这里会有类型错误
v1 = v2; // 错误：不能将类型“number”分配给类型“string”
v2 = v1; // 错误：不能将类型“string”分配给类型“number”
```

**通过 `declare` 关键字，我们声明了仅在类型空间存在的变量，它们在运行时完全不存在**。

除了两两声明进行赋值检查外，我们还可以使用类似 [tsd](https://github.com/tsdjs/tsd) 的工具类型进行声明式类型检查：

```ts
import { expectType } from 'tsd';

expectType<string>('hello world');
// 这里会有类型错误
expectType<string>(123); // 错误：类型“number”不可分配给类型“string”
```

## 扩展阅读：require extension

我们知道，node 中最早使用的是 CommonJs 与 require 来进行模块的导入，除了 `.js` 文件的导入以外，**node 中还支持以扩展的形式来提供自定义扩展名的模块加载机制**，这也是 ts-node 这些工具库的工作原理，它们的核心逻辑其实都是通过 `require.extension`，注册了 `.ts` 文件的处理逻辑：

```ts
require.extenstions['.ts'] = function (module, filename) {
  const content = fs.readFileSync(filename, 'utf8')
  module._compile(content, filename)
}
```

NodeJs 中的 require 逻辑执行大概是这样的：

- Resolution，基于入参拼接出 require 文件的绝对路径，当路径中不包含后缀名时，会按照 node 的模块解析策略来进行处理，如 `require('./utils')` 会解析到 `PATH/TO/project/utils.js`，而 `require('project-utils')` 会解析到 `PATH/TO/project/node_modules/project-utils/src/index.js`，以及内置模块等。需要注意的是在浏览器中，require **需要带上完整的后缀名** (浏览器并不能查找服务器的文件)，但一般 bundler 会帮你处理好。
- 基于绝对路径，去 `require.cache` 这个全局变量中，查找此文件是否已经已缓存，并在存在时直接使用缓存的文件内容 (即这个文件的导出信息等)。
- Loading，基于绝对路径实例化一个 Module 类实例，基于路径后缀名调用内置的处理函数。比如 js、json 文件都是通过 `fs.readFileSync` 读取文件内容。
- Wrapping，对于 js 文件，将文件内容字符串外层包裹一个函数，执行这个函数。对于 Json 文件，将内容包裹挂载到 `module.exports` 下。
- Evaluating，执行这个文件内容。
- Caching，对于未曾缓存的文件，将其执行结果缓存起来。

在上述过程中进行操作拦截，就可以实现很多有用的功能。比如对 `.ts` 文件去注册自定义的处理函数，将其编译为可以直接执行的 js 代码 (`ts-node/register`)，对 `.js` 代码进行预处理 (babel-register)，在代码执行时进行覆盖率统计 (istanbul)。以及，对 `require.cache` 进行缓存清除来实现 node 服务的热更新 (decache)。
