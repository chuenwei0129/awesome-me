# Webpack 从入门到入土<!-- omit in toc -->
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
## 懒加载

当涉及到动态代码拆分时，`webpack` 提供了两个类似的技术。第一种，也是推荐选择的方式是，使用符合 `ECMAScript` 提案 的 `import()` 语法 来实现动态导入。第二种，则是 `webpack` 的遗留功能，使用 `webpack` 特定的 `require.ensure`。

在声明 `import` 时，使用下面这些内置指令，可以让 `webpack` 输出 "`resource hint`(资源提示)"，来告知浏览器：

```js
import(
	/* webpackPrefetch: true */
	/* webpackChunkName: "scope" */
	'./scope').then(module => {
	console.log('懒加载', module.default)
})
```

- `prefetch`(预获取)：将来某些导航下可能需要的资源
- `preload`(预加载)：当前导航下可能需要资源

这会生成 <link rel="prefetch" href="scope.js"> 并追加到页面头部，指示着浏览器在闲置时间预取 `scope.js` 文件。

> Tip
只要父 `chunk` 完成加载，`webpack` 就会添加 `prefetch hint`(预取提示)。

与 `prefetch` 指令相比，`preload` 指令有许多不同之处：

- `preload chunk` 会在父 `chunk` 加载时，以并行方式开始加载。-`prefetch chunk` 会在父 `chunk` 加载结束后开始加载。
- `preload chunk` 具有中等优先级，并立即下载。`prefetch chunk` 在浏览器闲置时下载。
- `preload chunk` 会在父 `chunk` 中立即请求，用于当下时刻。`prefetch chunk` 会用于未来的某个时刻。
- 浏览器支持程度不同。

## tree shaking

基于 `ES6` 的静态引用，`TreeShaking` 通过扫描所有 `ES6` 的 `export`，找出被 `import` 的内容并添加到最终代码中。

`Webpack` 的实现是把所有 `import` 标记为 **有使用** / **无使用** 两种，在后续压缩时进行区别处理。就如比喻所说，在放入烤箱（压缩混淆）前先剔除蛋壳（无使用的 `import`），只放入有用的蛋白蛋黄（有使用的 `import`）。

在一个纯粹的 `ESM` 模块世界中，很容易识别出哪些文件有 `side effect`。然而，我们的项目无法达到这种纯度，所以，此时有必要提示 `webpack compiler` 哪些代码是“纯粹部分”。

通过 `package.json` 的 `"sideEffects"` 属性，来实现这种方式。

> Tip
"`side effect`(副作用)" 的定义是，在导入时会执行特殊行为的代码，而不是仅仅暴露一个 `export` 或多个 `export`。举例说明，例如 `polyfill`，它影响全局作用域，并且通常不提供 `export`。

如果你的代码确实有一些副作用，可以改为提供一个数组：

```js
{
  "name": "your-project",
  "sideEffects": ["./src/some-side-effectful-file.js"]
}
```

此数组支持简单的 `glob` 模式匹配相关文件。其内部使用了 [glob-to-regexp](https://github.com/fitzgen/glob-to-regexp)（支持：`*，**，{a,b}，[a-z]`）。如果匹配模式为 `*.css`，且不包含 `/`，将被视为 `**/*.css`。

> Tip
注意，所有导入文件都会受到 `tree shaking` 的影响。这意味着，如果在项目中使用类似 `css-loader` 并 `import` 一个 `CSS` 文件，则需要将其添加到 `side effect` 列表中，以免在生产模式中无意中将它删除：

```js
{
  "name": "your-project",
  "sideEffects": ["./src/some-side-effectful-file.js", "*.css"]
}
```

最后，还可以在 `module.rules` 配置选项 中设置 `"sideEffects"`。

我们还可以通过 `/*#__PURE__*/ `注释来给一个语句标记为没有副作用。就这样一个简单的改变就能够使下面的代码被 tree-shake:

```js
var Button$1 = /*#__PURE__*/ withAppProvider()(Button);
```

这会使得这段代码被过滤。

## 分包策略（SplitChunksPlugin）

常用的代码分离方法有三种：

- 入口起点：使用 entry 配置手动地分离代码。
- 防止重复：使用 `SplitChunksPlugin` 去重和分离 `chunk`。
- 动态导入：通过模块的内联函数调用来分离代码。

开箱即用的 `SplitChunksPlugin` 对于大部分用户来说非常友好。

默认情况下，它只会影响到按需加载的 `chunks`，因为修改 `initial chunks` 会影响到项目的 `HTML` 文件中的脚本标签。

`webpack` 将根据以下条件自动拆分 `chunks`：

- 新的 `chunk` 可以被共享，或者模块来自于 `node_modules` 文件夹
- 新的 `chunk` 体积大于 `20kb`（在进行 `min+gz` 之前的体积）
- 当按需加载 `chunks` 时，并行请求的最大数量小于或等于 `30`
- 当加载初始化页面时，并发请求的最大数量小于或等于 `30`
- 当尝试满足最后两个条件时，最好使用较大的 `chunks`。

> ⚠️ Warning
> 
>选择了默认配置为了符合 `Web` 性能最佳实践，但是项目的最佳策略可能有所不同。如果要更改配置，则应评估所做更改的影响，以确保有真正的收益。

```js
module.exports = {
  //...
  optimization: {
    splitChunks: {
			// 这表明将选择哪些 chunk 进行优化。当提供一个字符串，有效值为 all，async 和 initial。设置为 all 可能特别强大，因为这意味着 chunk 可以在异步和非异步 chunk 之间共享。 all = initial + async
      chunks: 'async',
      minSize: 20000,
      minRemainingSize: 0,
      maxSize: 0,
			// 拆分前必须共享模块的最小 chunks 数。
      // spa 提取第三方代码
      minChunks: 1,
			// 按需加载时的最大并行请求数
      maxAsyncRequests: 30,
			// 入口点的最大并行请求数。
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
			// 缓存组可以继承和/或覆盖来自 splitChunks.* 的任何选项。但是 test、priority 和 reuseExistingChunk 只能在缓存组级别上进行配置。将它们设置为 false以禁用任何默认缓存组。
      cacheGroups: {
        // 只考虑 spa ，记住分割 chunks 由入口决定，
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
					// 是否复用
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

