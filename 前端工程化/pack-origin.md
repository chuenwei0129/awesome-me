# 前端工程化：webpack 原理分析<!-- omit in toc -->

> **不要专注于流程的配置和调参。因为流程终会简化，参数（API）终会升级。**

## [前端有必要学习 webpack 吗？](https://www.zhihu.com/question/472006458)

**对于「Webpack 到底是如何工作的」这样的问题，倒很容易一段话说清楚：**

>把每个 JS 模块的代码包在一个函数里，这些函数可以拼在一起得到一个 bundle 文件。然后在这个 bundle 的最上面，固定生成一个用来求值这些函数（模块）的辅助函数即可。在运行时只要从入口模块开始求值，就能递归地获取到并缓存全部模块了。

**两个不同模块里的 JS 代码：**

```js
// b.js
export default 42;

// a.js
import b from './b.js';
console.log(b);
```

**原理上就会被整个转换成下面这样：**

```js
// dist.js

// 这个 runtime 函数是固定的，直接字符串拼接到编译产物头上就行了
// 所有独立 module 都会被包成函数，作为 modules 数组传入
function runtime(modules) {
  // 所有 module 的缓存就放在一个对象里
  const module_cache = {};

  // 每个 module 在 require 依赖时，都会调用到这个函数
  function webpack_require(id) {
    // 朴素的缓存命中逻辑
    if (module_cache[id]) return module_cache[id].exports;

    // 缓存没有命中时就生成一个新 module
    // 每个 module 在 export 字段时，都会挂载到这里的 export 属性上
    const module = module_cache[id] = {
      exports: {}
    };

    // 根据 module 的 id 找到相应函数，传入其 exports 和 require
    modules[id](module, module.exports, webpack_require);

    // 每次 require 最终返回的都是某个 module 的 exports 结果
    return module.exports;
  }

  // 整个 runtime 返回的是入口 module 的求值结果
  return webpack_require(1);
}

// b.js 的变换结果，其 module 编号为 0
function b(this_module, webpack_exports, webpack_require) {
  // 挂载 export default 结果
  webpack_exports['default'] = 42;
}

// a.js 的变换结果，其 module 编号为 1
function a(this_module, webpack_exports, webpack_require) {
  // 获取 b 模块的 default 字段
  const exported = webpack_require(0);
  console.log(exported['default']);
}

runtime([b, a]); // 数组下标顺序和 module 编号一致
```

> [手写一个 JavaScript 打包器](https://github.com/chuenwei0129/build-my-own-x/blob/main/packages/build-my-own-pack/README.md)

## [Webpack HMR 原理解析](https://zhuanlan.zhihu.com/p/30669007)

<!-- webpack done、hash、EventSource、jsonp -->

**基本实现原理大致这样的：**

构建 bundle 的时候，加入一段 HMR runtime 的 js 和一段和服务沟通的 js 。

文件修改会触发 webpack 重新构建，[服务器通过向浏览器发送更新消息](https://developer.mozilla.org/zh-CN/docs/web/api/server-sent_events/using_server-sent_events)，浏览器通过 jsonp 拉取更新的模块文件，jsonp 回调触发模块热替换逻辑。

**业务代码需要做些什么？**

当用新的模块代码替换老的模块后，但是我们的业务代码并不能知道代码已经发生变化，也就是说，当 `hello.js` 文件修改后，我们需要在 `index.js` 文件中调用 HMR 的 accept 方法，添加模块更新后的处理函数，及时将 hello 方法的返回值插入到页面中。代码如下：

```js
// index.js
if(module.hot) {
    module.hot.accept('./hello.js', function() {
        div.innerHTML = hello()
    })
}
```

## 🔗 链接

- [tree shaking 问题排查指南](https://zhuanlan.zhihu.com/p/491391823)
- [webpack 自己也有 ast，babel 也有 ast 解析 有何不同，为何不整合？](https://www.zhihu.com/question/309893645)
- [webpack 易混淆知识点](https://www.cnblogs.com/skychx/tag/Webpack/)
