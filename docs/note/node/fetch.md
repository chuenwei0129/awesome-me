---
title: Fetch
order: -1
toc: content
group:
  title: WEB API
---

`createRequire` 是 Node.js 中的一个方法，用于在 ES 模块 (ECMAScript Modules) 中创建一个 `require` 函数。这个方法主要是为了在使用 ES 模块时，能够以一种兼容的方式加载 CommonJS 模块。

在 Node.js 中，原生支持两种模块系统：CommonJS 和 ES 模块。CommonJS 模块使用 `require()` 函数来加载模块，而 ES 模块使用 `import` 和 `export` 语句。随着 Node.js 对 ES 模块的原生支持，`createRequire` 方法被引入，以便在 ES 模块代码中按需使用 CommonJS 模块。

使用 `createRequire` 方法的基本步骤如下：

1. 首先，导入 `createRequire` 方法。
2. 然后，使用 `createRequire` 方法，并传入 `import.meta.url` 作为参数，这将创建一个新的 `require` 函数。
3. 使用这个新创建的 `require` 函数，就可以按照 CommonJS 模块的方式来加载模块了。

示例代码如下：

```javascript
import { createRequire } from 'module'
const require = createRequire(import.meta.url)

// 现在可以使用 require 来加载 CommonJS 模块
const express = require('express')
```

这种方式主要用于那些正在从 CommonJS 模块向 ES 模块迁移，但在迁移过程中仍需加载一些只提供 CommonJS 版本的第三方库的项目。
