// dist.js

// 这个 runtime 函数是固定的，直接字符串拼接到编译产物头上就行了
// 所有独立 module 都会被包成函数，作为 modules 数组传入
function runtime(modules) {
  // 所有 module 的缓存就放在一个对象里
  const module_cache = {}

  // 每个 module 在 require 依赖时，都会调用到这个函数
  function webpack_require(id) {
    // 朴素的缓存命中逻辑
    if (module_cache[id]) return module_cache[id].exports

    // 缓存没有命中时就生成一个新 module
    // 每个 module 在 export 字段时，都会挂载到这里的 export 属性上
    const module = (module_cache[id] = {
      exports: {}
    })

    // 根据 module 的 id 找到相应函数，传入其 exports 和 require
    modules[id](module, module.exports, webpack_require)

    // 每次 require 最终返回的都是某个 module 的 exports 结果
    return module.exports
  }

  // 整个 runtime 返回的是入口 module 的求值结果
  return webpack_require(1)
}

// b.js 的变换结果，其 module 编号为 0
function b(this_module, webpack_exports, webpack_require) {
  // 挂载 export default 结果
  webpack_exports['default'] = 42
}

// a.js 的变换结果，其 module 编号为 1
function a(this_module, webpack_exports, webpack_require) {
  // 获取 b 模块的 default 字段
  const exported = webpack_require(0)
  console.log(exported['default'])
}

runtime([b, a]) // 数组下标顺序和 module 编号一致
