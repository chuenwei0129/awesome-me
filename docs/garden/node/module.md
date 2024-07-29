ESM 是 ECMAScript 官方的模块机制，从语法层面直接支持。虽然语法上面支持了，但是当 Node.js 拿到一个 `import ... 'foo'` 的时候，还是得决定从哪怎么加载一个模块。V8 只是实现了语法上面的解析，具体加载代码等操作还是需要各运行时自行适配。毕竟不同运行时对于标识解析、代码加载的规则不一样，比如 Deno 支持从 HTTP 进行远端加载，而 Node.js 至少在 v18 还没有这层内置默认打开，需要用户自行实现或开启。甚至有些私有运行时会从数据库、内存等等地方加载，这些都是需要自行适配的。

Node.js 自然也有了这层最基本的从文件系统加载的适配。以及，为了给未来留口子，Node.js 还支持让用户自定义加载。即当 Node.js 收到了 `import ... 'foo'` 语法之后，可以将 `foo` 等信息传给用户自定义加载器，由其来决定如何加载模块。只需要你在执行 Node.js 的时候，通过命令行参数指定加载器即可，如：

```
$ node --experimental-loader ./https-loader.mjs main.mjs
```

这个特性一直到 Node.js v18.13 还是 Experimental 状态。未来应该会并入 Stable 状态的。

通过上面的这个特性，用户可以自己实现一个 HTTP 的模块加载器。当接收到类似 `import * from 'https://exmple.com'` 的时候，通过 HTTP 模块加载器来加载对应远端代码，并编译成 ECMAScript 模块。大家有兴趣可自行查阅 Node.js 官方文档中的[自定义 HTTP 加载器示例](https://nodejs.org/docs/latest-v18.x/api/esm.html#https-loader "https://nodejs.org/docs/latest-v18.x/api/esm.html#https-loader")。另外，现版本的 Node.js 中，也内置了 HTTP 加载器，只不过并没有默认启动。

```
$ node --experimental-network-imports main.mjs
```

除了协议上可以自定义之外，自定义加载器还可以用于在加载模块时期编译非 JavaScript 代码等操作。比如 CoffeeScript 的加载，就可以通过自定义加载器将源码转译成 JavaScript 再加载，大家有兴趣可自行查阅 Node.js 官方文档中的[自定义转译加载器示例](https://nodejs.org/docs/latest-v18.x/api/esm.html#transpiler-loader "https://nodejs.org/docs/latest-v18.x/api/esm.html#transpiler-loader")。

关于 Experimental 的内容点到为止，这里只是讲一个未来的趋势，具体大家都可以直接看 Node.js 文档，该有的内容都很详尽。

怎么理解？
