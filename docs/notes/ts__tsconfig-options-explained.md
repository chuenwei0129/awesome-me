---
group:
  title: typeScript
  order: 4
title: TSConfig 详解
toc: content
---

## 一、类型检查配置(必须掌握)

### 1. strict ⭐⭐⭐

**最重要的配置项，这个配置默认为 `false`，建议在项目中开启。**

```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

开启 `strict` 会同时启用以下所有严格检查规则:

- `strictNullChecks` - 严格的 null/undefined 检查
- `noImplicitAny` - 禁止隐式 any 类型
- `strictFunctionTypes` - 严格的函数类型检查
- `strictBindCallApply` - 严格的 bind/call/apply 检查
- `strictPropertyInitialization` - 类属性初始化检查
- `noImplicitThis` - 禁止隐式 this
- `alwaysStrict` - 始终使用严格模式

**推荐做法**: 新项目直接开启,老项目逐步迁移。

### 2. strictNullChecks ⭐⭐⭐

**默认情况**: `"strictNullChecks": false`(默认关闭),只有在设置 `"strict": true` 时才会开启。

**防止 "cannot read property of undefined" 错误的关键配置。**

```typescript
// 关闭 strictNullChecks 时
const list = ['a', 'b'];
const target = list.find((u) => u === 'c'); // 类型: string
console.log(target.toUpperCase()); // 运行时错误!

// 开启 strictNullChecks 时
const target = list.find((u) => u === 'c'); // 类型: string | undefined
console.log(target.toUpperCase()); // ❌ 编译错误,必须先检查
console.log(target?.toUpperCase()); // ✅ 正确
```

### 3. noImplicitAny ⭐⭐⭐

**确保所有变量都有明确的类型。**

```typescript
// ❌ 错误: 参数隐式具有 any 类型
function fn(s) {
  console.log(s.includes('test'));
}

// ✅ 正确
function fn(s: string) {
  console.log(s.includes('test'));
}
```

### 4. noUnusedLocals 与 noUnusedParameters ⭐⭐

**默认情况**:

- `"noUnusedLocals": false`(默认关闭)
- `"noUnusedParameters": false`(默认关闭)
- 它们**不包含**在 `"strict": true` 中,需要单独配置

**区别说明**:

**1. `noUnusedLocals`** - 检查未使用的局部变量

```typescript
// 当 noUnusedLocals: true 时
function example() {
  const used = '我会被使用'; // ✅
  const unused = '我不会被使用'; // ❌ 错误:未使用的局部变量
  console.log(used);
}
```

**2. `noUnusedParameters`** - 检查未使用的函数参数

```typescript
// 当 noUnusedParameters: true 时
function calculate(a: number, b: number, c: number) {
  // ❌ 错误:未使用的参数 'b', 'c'
  return a * 2;
}

// 解决方案:以下划线开头忽略
function calculateFixed(a: number, _b: number, _c: number) {
  return a * 2; // ✅
}
```

### 5. noImplicitReturns ⭐⭐

**确保所有执行路径都有返回值。默认是关闭的，需要单独配置。**

```typescript
// ❌ 错误: 缺少 return
function handle(color: 'blue' | 'black'): string {
  if (color === 'blue') {
    return 'beats';
  } else {
    ('bose'); // 忘记 return
  }
}

// ✅ 正确
function handle(color: 'blue' | 'black'): string {
  if (color === 'blue') {
    return 'beats';
  } else {
    return 'bose';
  }
}
```

---

## 二、构建配置(高频使用)

### 1. target 与 lib ⭐⭐⭐

**决定编译目标和可用的 API。**

```json
{
  "compilerOptions": {
    // 更改 `target` 会自动影响 `lib` 的默认值
    "target": "ES2018", // 决定了构建代码使用的语法,会进行语法降级(如箭头函数、async/await)，推荐: ES2018 或更高
    "lib": ["ES2018", "DOM"] // 决定了可用的 API(如 `Array.replaceAll`、`Promise` 等)
  }
}
```

**常见配置**:

- Web 项目: `"lib": ["ES2018", "DOM"]`
- Node 项目: `"lib": ["ES2018"]`(不需要 DOM)
- 现代浏览器: `"target": "ES2020"` 或 `"ESNext"`

**原理说明**:

TypeScript 会自动加载内置的 `lib.d.ts` 等声明文件,而加载哪些文件则和 lib 配置有关。

target 对 lib 的影响在于，当你的 target 为更高的版本时,它会自动地将这个版本新语法对应的 lib 声明加载进来,target 为 `"es2021"` 时,你不需要添加 `"es2021"` 到 lib 中也能使用 ECMAScript2021 的新方法 replaceAll。这是因为既然你的编译产物都到这个版本了,那你当然可以直接使用这个方法啦。

除了高版本语法以外,lib 其实也和你的实际运行环境有关。比如,当你的代码仅在 Node 环境下运行时,你的 lib 中不应当包含 `"DOM"` 这个值。对应的,代码中无法使用 window、document 等全局变量。

如果你希望使用自己提供的 lib 声明定义,可以启用 noLib 配置,这样 TypeScript 将不会去加载内置的类型定义,但你需要为所有内置对象提供类型定义(String、Function、Object 等)才能进行编译。如果你的运行环境中存在大量的定制方法,甚至对原本的内置方法做了覆盖,就可以使用此配置来加载自己的类型声明。

### 2. module 与 moduleResolution ⭐⭐⭐

**模块系统配置。**

```json
{
  "compilerOptions": {
    "module": "ESNext", // 或 "CommonJS"
    "moduleResolution": "node" // 默认值,推荐使用
  }
}
```

module 配置控制最终 JavaScript 产物使用的模块标准,常见的包括 CommonJs、ES6、ESNext 以及 NodeNext 等(实际的值也可以是全小写的形式)。另外也支持 AMD、UMD、System 等模块标准。

TypeScript 会随着版本更新新增可用的 module 选项,如在 4.5 版本新增了 `es2022` 配置,支持了 Top-Level Await 语法。在 4.7 版本还新增了 `node16` 和 `nodenext` 两个 module 配置,使用这两个配置意味着你构建的 npm 包或者代码仅在 node 环境下运行,因此 TypeScript 会对应地启用对 Node ESM 的支持。

moduleResolution 配置指定了模块的解析策略,可以配置为 node 或者 classic,其中 node 为默认值,而 classic 主要作向后兼容用,基本不推荐使用。

首先来看 node 解析模式,从名字也能看出来它其实就是与 node 一致的解析模式。假设我们有个 `src/index.js`,其中存在基于相对路径 `const foo = require("./foo")` 的导入,则会依次按照以下顺序解析:

- `/<root>/<project>/src/foo.js` 文件是否存在?
- `/<root>/<project>/src/foo` 是否是一个文件夹?
  - 此文件夹内部是否包含 `package.json`,且其中使用 `main` 属性描述了这个文件夹的入口文件?
  - 假设 `main` 指向 `dist/index.js`,那这里会尝试寻找 `/<root>/<project>/src/foo/dist/index.js` 文件
  - 否则的话,说明这个文件不是一个模块或者没有定义模块入口,我们走默认的 `/foo/index.js`。

而对于绝对路径,即 `const foo = require("foo")`,其只会在 `node_modules` 中寻找,从 `/<root>/<project>/src/node_modules` 开始,到 `/<root>/<project>/node_modules`,再逐级向上直到根目录。

TypeScript 在这基础上增加了对 `.ts` `.tsx` 和 `.d.ts`(优先级按照这一顺序)扩展名的文件解析,以及对 `package.json` 中 `types` 字段的加载。

### 3. outDir 与 rootDir ⭐⭐⭐

**控制输出目录结构。**

```json
{
  "compilerOptions": {
    "outDir": "./dist", // 输出目录
    "rootDir": "./src" // 源码根目录
  }
}
```

rootDir 配置决定了项目文件的根目录,默认情况下它是项目内**包括**的所有 `.ts` 文件的最长公共路径,这里有几处需要注意:

- **包括**指的是 include 或 files 中包括的 `.ts` 文件,这些文件一般来说不会和 tsconfig.json 位于同一目录层级
- 不包括 `.d.ts` 文件,因为声明文件可能会和 tsconfig.json 位于同一层级

最长公共路径又是什么?简单地说,它就是某一个**包含了所有被包括的 `.ts` 文件的文件夹**,TypeScript 会找到这么一个文件夹,默认将其作为 rootDir。

```text
PROJECT
├── src
│   ├── index.ts
│   ├── app.ts
│   ├── utils
│   │   ├── helpers.ts
├── declare.d.ts
├── tsconfig.json
```

在这个例子中,rootDir 会被推断为 src。

```text
PROJECT
├── env
│   ├── env.dev.ts
│   ├── env.prod.ts
├── app
│   ├── index.ts
├── declare.d.ts
├── tsconfig.json
```

在这个例子中,rootDir 会被推断为 `.`,即 `tsconfig.json` 所在的目录。

构建产物的目录结构会受到这一配置的影响,假设 outDir 被配置为 `dist`,在上面的第一种情况下,最终的产物会被全部放置在 dist 目录下,保持它们在 `src`(也就是 rootDir)内的目录结构:

```text
PROJECT
├── dist
│   ├── index.js
│   ├── index.d.ts
│   ├── app.js
│   ├── app.d.ts
│   ├── utils
│   │   ├── helpers.js
│   │   ├── helpers.d.ts
```

如果你将 rootDir 更改为推导得到的 rootDir 的父级目录,比如在这里把它更改到了项目根目录 `.`。此时 `src` 会被视为 rootDir 的一部分,因此最终构建目录结构中会多出 `src` 这一级:

```text
PROJECT
├── dist
├── ├──src
│      ├── index.js
│      ├── index.d.ts
│      ├── app.js
│      ├── app.d.ts
│      ├── utils
│      │   ├── helpers.js
│      │   ├── helpers.d.ts
```

需要注意的是,如果你显式指定 rootDir,需要确保其包含了所有 **"被包括"** 的文件,因为 TypeScript 需要确保这所有的文件都被生成在 outDir 内。

```text
PROJECT
├── src
│   ├── index.ts
│   ├── app.ts
│   ├── utils
│   │   ├── helpers.ts
├── env.ts
├── tsconfig.json
```

在这个例子中,如果你指定 rootDir 为 `src`,会导致 `env.ts` 被生成到 `<project>/env.js` 而非 `<project>/dist/env.js`。

### 4. paths 与 baseUrl ⭐⭐

paths 类似于 Webpack 中的 alias,允许你通过 `@/utils` 或类似的方式来简化导入路径,它的配置方式是这样的:

```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@/utils/*": ["src/utils/*", "src/other/utils/*"]
    }
  }
}
```

需要注意的是,paths 的解析是基于 baseUrl 作为相对路径的,因此需要确保指定了 baseUrl。在填写别名路径时,我们可以传入一个数组,TypeScript 会依次解析这些路径,直到找到一个确实存在的路径。

baseUrl 可以定义文件进行解析的根目录,它通常会是一个相对路径,然后配合 tsconfig.json 所在的路径来确定根目录的位置。

```text
project
├── out.ts
├── src
├──── core.ts
└── tsconfig.json
```

在这个结构下,如果配置为 `"baseUrl": "./"`,根目录就会被确定为 project。

你也可以通过这一配置,在导入语句中使用相对 baseUrl 的解析路径。如在上面根目录已经确定为 project,在 `out.ts` 中,你就可以直接使用基于根目录的绝对路径导入文件:

```typescript
import 'src/core'; // TS 会自动解析到对应的文件,即 "./src/core.ts"
```

### 5. declaration、declarationDir 与 declarationMap ⭐⭐

**生成类型声明文件(发布 npm 包必备)。**

declaration 接受一个布尔值,即是否产生声明文件。默认情况下声明文件会和构建代码文件在一个位置,比如 `src/index.ts` 会构建出 `dist/index.js` 与 `dist/index.d.ts`,使用 declarationDir 你可以将这些类型声明文件输出到一个独立的文件夹下,如 `dist/types/index.d.ts` `dist/types/utils.d.ts` 这样。

declarationMap 选项会为声明文件也生成 source map,这样你就可以从 `.d.ts` 直接映射回原本的 `.ts` 文件了。

在使用第三方库时,如果你点击一个来自第三方库的变量,会发现跳转的是其声明文件。如果这些库提供了 declarationMap 与原本的 .ts 文件,那就可以直接跳转到变量对应的原始 ts 文件。当然一般发布 npm 包时并不会携带这些文件,但在 Monorepo 等场景下却有着奇效。

### 6. jsx ⭐⭐

**React 项目必需。**

```json
{
  "compilerOptions": {
    "jsx": "react-jsx" // React 17+
    // "jsx": "react"   // React 16 及以下
    // "jsx": "preserve" // 交给其他工具处理
  }
}
```

不同配置的编译结果:

```js
// 源码
export const App = () => <h1>Hello</h1>;

// react
export const App = () => React.createElement('h1', null, 'Hello');

// react-jsx
import { jsx as _jsx } from 'react/jsx-runtime';
export const App = () => _jsx('h1', { children: 'Hello' });

// preserve
export const App = () => <h1>Hello</h1>;
```

### 7. esModuleInterop 与 allowSyntheticDefaultImports ⭐⭐

这两个配置主要还是为了解决 ES Module 和 CommonJS 之间的兼容性问题。

通常情况下，ESM 调用 ESM，CJS 调用 CJS，都不会有问题。但如果是 ESM 调用 CJS ，就可能遇到奇怪的问题。比如 React 中的源码中是这样导出的：

```js
// react/cjs/react.development.js
exports.Children = Children;
exports.useState = useState;
exports.memo = memo;
exports.useEffect = useEffect;
```

假设我们分别使用具名导入、默认导入和命名空间导入来导入 React：

```typescript
import { useRef } from 'react'; // 具名导入（named import）
import React from 'react'; // 默认导入（default import）
import * as ReactCopy from 'react'; // 命名空间导入（namespace import）

console.log(useRef);
console.log(React.useState);
console.log(ReactCopy.useEffect);
```

这样的代码在默认情况下（即没有启用 esModuleInterop）会被编译为：

```js
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = require('react');
const react_2 = require('react');
const ReactCopy = require('react');
console.log(react_1.useRef);
console.log(react_2.default.useState);
console.log(ReactCopy.useEffect);
```

可以看到，默认导入的调用被转换为了 `react_2.default`，而具名导入和命名空间则不变，三种导入语句都被转换为了 CJS。

这是因为 TypeScript 默认将 CommonJs 也视为 ES Module 一样，对于具名导入，可以直接将 `module.exports.useRef = useRef` 和 `export const useRef = useRef `等价。但是由于 CommonJs 中并没有这个“默认导出”这个概念， 只能将 ES Module 中的默认导出 `export default` 强行等价于 `module.exports.default`，如上面的编译结果中的 `react_2.default`。这里的 default 就是一个属性名，和 `module.exports.foo` 是一个概念。

但 CommonJs 下存在着类似“命名空间导出”的概念，即 `const react = require("react") ` 可以等价于 `import * as React from "react"`。

很明显，对于默认导出的情况，由于 React 中并没有使用 `module.exports.default` 提供（模拟）一个默认导出，因此 `react_2.default` 只可能是 undefined。

为了解决这种情况，TypeScript 中支持通过 esModuleInterop 配置来在 ESM 导入 CJS 这种情况时引入额外的辅助函数，进一步对兼容性进行支持，如上面的代码在开启配置后的构建产物会是这样的：

```js
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) { //... }));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) { //... });
var __importStar = (this && this.__importStar) || function (mod) { //... };
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};

Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_2 = __importDefault(require("react"));
const ReactCopy = __importStar(require("react"));
console.log(react_1.useRef);
console.log(react_2.default.useState);
console.log(ReactCopy.useEffect);
```

这些辅助函数会确保 ESM 的默认导入（`__importDefault`） 与命名空间导入 （`__importStar`）能正确地对应到 CJS 中的导出，如` __importDefault` 会检查目标模块的使用规范，对 ESM 模块直接返回，否则将其挂载在一个对象的 default 属性上：

```js
const react_2 = __importDefault(require('react'));

// 转换结果等价于以下
const react_2 = { default: { useState: {} } };
```

而 `__importStar` （即命名空间导入的辅助函数）的实现则要复杂一些：

```js
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
```

它会在目标模块不是 ESM 规范时，将模块中除了 default 属性以外的导出都挂载到返回对象上（`__createBinding`），然后将这个对象的 default 属性设置为原本的模块信息（`__setModuleDefault`）。这样你既可以 `ReactCopy.useEffect` 访问某个值，也可以 `ReactCopy.default` 访问原本的模块。

这些辅助方法也属于 `importHelpers` 中的 helper，因此你也可以通过启用 `importHelpers` 配置来从 tslib 导入这些辅助方法。

实际上，由于 React 本身是通过 CommonJs 导出的，在你使用默认导入时， TS 也会提醒你此模块只能在启用了 `esModuleInterop` 的情况下使用默认导入。

启用 `esModuleInterop` 配置的同时，也会启用 `allowSyntheticDefaultImports` 配置，这一配置会为没有默认导出的 CJS 模块“模拟”出默认的导出，以提供更好的类型提示。如以下代码：

```js
// handlers.js
module.exports = {
  errorHandler: () => {},
};

// index.js
import handlers from './handlers';

window.onerror = handlers.errorHandler;
```

虽然这段代码转换后的实际逻辑没有问题，但由于这里并不存在 `module.exports.default` 导出，会导致在类型上出现一个错误。

启用 `allowSyntheticDefaultImports` 配置会在这种情况下将 handlers 中的代码模拟为以下的形式：

```js
const allHandlers = {
  errorHandler: () => {},
};

module.exports = allHandlers;
module.exports.default = allHandlers;
```

然后在导入方就能够获得正确的类型提示了，实际上这也是 Babel 实际的构建效果，但需要注意的是在 TypeScript 中 `allowSyntheticDefaultImports` 配置并不会影响最终的代码生成（不像 `esModuleInterop` 那样），只会对类型检查有帮助。

---

## 三、工程配置(提升体验)

### 1. files、include 与 exclude ⭐⭐⭐

这三个选项决定了将被包括到本次编译的代码文件。使用 files 我们可以描述本次包含的所有文件,但不能使用 `src` 或者 `src/*` 这种方式,每个值都需要是完整的文件路径,适合在小型项目时使用:

```json
{
  "compilerOptions": {},
  "files": ["src/index.ts", "src/handler.ts"]
}
```

如果你的文件数量较多,或者分散在各个文件夹,此时可以使用 include 和 exclude 进行配置,在这里可以传入文件夹或者 `src/*` 这样的 glob pattern,也可以传入完整的文件路径。

include 配置方式参考:

```json
{
  "include": ["src/**/*", "generated/*.ts", "internal/*"]
}
```

其中,`src/**/*` 表示匹配 src 下所有的合法文件,而无视目录层级。而 `internal/*` 则只会匹配 internal 下的文件,不会匹配 `internal/utils/` 下的文件。这里的合法文件指的是,在不包括文件扩展名(`*.ts`)的情况下只会匹配 `.ts` / `.tsx` / `.d.ts` / `.js` / `.jsx` 文件(js 和 jsx 文件需要启用 allowJs 配置时才会被包括)。

由于我们会在 include 中大量使用 glob pattern 来一次性匹配许多文件,如果存在某些非预期的文件也符合这一匹配模式,比如 `src/handler.test.ts` `src/file-excluded/` 这样,此时专门为需要匹配的文件书写精确的匹配模式就太麻烦了。因此,我们可以使用 exclude 配置,来从被 include 匹配到的文件中再移除一部分,如:

```json
{
  "include": ["src/**/*", "generated/*.ts", "internal/*"],
  "exclude": ["src/file-excluded", "/**/*.test.ts", "/**/*.e2e.ts"]
}
```

需要注意的是,**exclude 只能剔除已经被 include 包含的文件**。

### 2. resolveJsonModule ⭐⭐

启用了这一配置后,你就可以直接导入 Json 文件,并对导入内容获得完整的基于实际 Json 内容的类型推导。

```json
{
  "compilerOptions": {
    "resolveJsonModule": true
  }
}
```

```typescript
import config from './config.json'; // ✅ 可行
console.log(config.port); // 完整的类型推导
```

### 3. skipLibCheck ⭐⭐

默认情况下,TypeScript 会对加载的类型声明文件也进行检查,包括内置的 `lib.d.ts` 系列与 `@types/` 下的声明文件。在某些时候,这些声明文件可能存在冲突,比如两个不同来源的声明文件使用不同的类型声明了一个全局变量。此时,你就可以使用 skipLibCheck 跳过对这些类型声明文件的检查,这也能进一步加快编译速度。

```json
{
  "compilerOptions": {
    "skipLibCheck": true // 推荐开启
  }
}
```

### 4. sourceMap ⭐⭐

**生成 source map,便于调试。**

```json
{
  "compilerOptions": {
    "sourceMap": true // 开发环境推荐
  }
}
```

### 5. incremental ⭐⭐

incremental 配置将启用增量构建,在每次编译时首先 diff 出发生变更的文件,仅对这些文件进行构建,然后将新的编译信息通过 `.tsbuildinfo` 存储起来。你可以使用 tsBuildInfoFile 配置项来控制这些编译信息文件的输出位置。

```json
{
  "compilerOptions": {
    "incremental": true
  }
}
```

### 6. allowJs 与 checkJs ⭐

**在 TS 项目中使用 JS 文件。**

```json
{
  "compilerOptions": {
    "allowJs": true, // 允许导入 .js 文件
    "checkJs": false // 是否检查 JS 文件类型
  }
}
```

### 7. isolatedModules ⭐

我们常常在构建过程使用 TypeScript 配合其他构建器,如 ESBuild、SWC、Babel 等。通常在这个过程中,类型相关的检查会完全交由 TypeScript 处理,因为这些构建器只能执行语法降级与打包。

由于这些构建器通常是独立地处理每个文件,这也就意味着如果存在如类型导入、namespace 等特殊语法时,它们无法像 tsc 那样去全面分析这些关系后再进行处理。此时我们可以启用 isolatedModules 配置,它会确保每个文件都能被视为一个独立模块,因此也就能够被这些构建器处理。

```json
{
  "compilerOptions": {
    "isolatedModules": true
  }
}
```

启用后的限制:

- 所有代码文件必须至少有一个导入或导出
- 不能使用 `const enum`(会被内联)
- 不能使用 `namespace`

---

## 四、推荐配置模板

### 现代 Web 应用(React/Vue)

```json
{
  "compilerOptions": {
    // 类型检查
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,

    // 构建配置
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "node",
    "jsx": "react-jsx",

    // 输出配置
    "outDir": "./dist",
    "rootDir": "./src",
    "sourceMap": true,

    // 路径配置
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"]
    },

    // 兼容性
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "resolveJsonModule": true,
    "skipLibCheck": true,

    // 性能优化
    "incremental": true,

    // 构建工具兼容
    "isolatedModules": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### Node.js 应用

```json
{
  "compilerOptions": {
    // 类型检查
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,

    // 构建配置
    "target": "ES2020",
    "lib": ["ES2020"],
    "module": "CommonJS",
    "moduleResolution": "node",

    // 输出配置
    "outDir": "./dist",
    "rootDir": "./src",
    "sourceMap": true,

    // 兼容性
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "resolveJsonModule": true,
    "skipLibCheck": true,

    // 性能优化
    "incremental": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### npm 库项目

```json
{
  "compilerOptions": {
    // 类型检查
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,

    // 构建配置
    "target": "ES2018",
    "lib": ["ES2018"],
    "module": "ESNext",
    "moduleResolution": "node",

    // 输出配置
    "outDir": "./dist",
    "rootDir": "./src",
    "declaration": true,
    "declarationMap": true,

    // 兼容性
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts"]
}
```

---

## 五、进阶配置(特定场景)

以下配置适用于特定场景,大多数项目不需要关注。

### 1. 装饰器支持 ⭐

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

用于支持装饰器语法(如 NestJS、TypeORM):

```typescript
@Controller()
class UserController {
  @Get()
  getUsers() {}
}
```

### 2. Project References ⭐

用于大型项目拆分,类似 Monorepo:

```json
{
  "compilerOptions": {
    "composite": true,
    "outDir": "./dist"
  },
  "references": [
    { "path": "../ui-components" },
    { "path": "../hooks" },
    { "path": "../utils" }
  ]
}
```

Project References 这一配置使得你可以将整个工程拆分成多个部分,比如你的 UI 部分、Hooks 部分以及主应用等等。这一功能和 Monorepo 非常相似,但它并不需要各个子项目拥有自己独立的 package.json、独立安装依赖、独立构建等。通过 Project References,我们可以定义这些部分的引用关系,为它们使用独立的 tsconfig 配置。

这一特性实际上也让 tsc 不再只是一个编译器了,它现在还可以是一个类似于 lerna 那样的 Script Runner,即在多个子项目之间去确定一条顺序正确的构建链路。也因此,在使用 Project References 的项目中,需要使用 `tsc --build` 而非 `tsc` 来进行构建,此时 tsc 会首先确定整个引用关系图,然后检查上面作为子结点的项目是否是最新构建的,最后才基于引用顺序去构建这些非最新的项目。

此时如果你修改一个子项目,tsc 会自动进行增量构建,跳过没有发生变化的项目,只构建那些发生了更改的部分。

composite 属于 compilerOptions 内部的配置,在 Project References 的被引用子项目 `tsconfig.json` 中必须为启用状态,它通过一系列额外的配置项,确保你的子项目能被 Project References 引用,而在子项目中必须启用 declaration,必须通过 files 或 includes 声明子项目内需要包含的文件等。

### 3. types 与 typeRoots ⭐

默认情况下,TypeScript 会加载 `node_modules/@types/` 下的所有声明文件,包括嵌套的 `../../node_modules/@types` 路径,这么做可以让你更方便地使用第三方库的类型。但如果你希望只加载实际使用的类型定义包,就可以通过 types 配置:

```json
{
  "compilerOptions": {
    "types": ["node", "jest", "react"]
  }
}
```

在这种情况下,只有 `@types/node`、`@types/jest` 以及 `@types/react` 会被加载。

即使其他 `@types/` 包没有被包含,它们也仍然能拥有完整的类型,但其中的全局声明(如 `process`、`expect`、`describe` 等全局变量)将不会被包含,同时也无法再享受到基于类型的提示。

如果你甚至希望改变加载 `@types/` 下文件的行为,可以使用 typeRoots 选项,其默认为 `@types`,即指定 `node_modules/@types` 下的所有文件(仍然包括嵌套的)。

```json
{
  "compilerOptions": {
    "typeRoots": [
      "./node_modules/@types",
      "./node_modules/@team-types",
      "./typings"
    ],
    "types": ["react"],
    "skipLibCheck": true
  }
}
```

以上配置会尝试加载 `node_modules/@types/react` 以及 `./node_modules/@team-types/react`、`./typings/react` 中的声明文件,注意我们需要使用**相对于 baseUrl 的相对路径**。

加载多个声明文件可能会导致内部的声明冲突,所以你可能会需要 skipLibCheck 配置来禁用掉对加载的类型声明的检查。

### 4. 类型检查进阶配置 ⭐

```json
{
  "compilerOptions": {
    // 可选属性严格检查
    "exactOptionalPropertyTypes": true,

    // 索引签名检查
    "noUncheckedIndexedAccess": true,

    // 类方法覆盖检查
    "noImplicitOverride": true,

    // Switch 语句完整性检查
    "noFallthroughCasesInSwitch": true
  }
}
```

### 5. 构建产物优化 ⭐

```json
{
  "compilerOptions": {
    // 只生成类型文件,不生成 JS
    "noEmit": true, // 或 "emitDeclarationOnly": true

    // 从 tslib 导入辅助函数(减小体积)
    "importHelpers": true,

    // 保留常量枚举
    "preserveConstEnums": true,

    // 移除注释
    "removeComments": true
  }
}
```

### 6. 模块高级配置 ⭐

```json
{
  "compilerOptions": {
    // 模块后缀(React Native 等)
    "moduleSuffixes": [".ios", ".native", ""],

    // 虚拟目录合并
    "rootDirs": ["src/locales", "generated/messages"]
  }
}
```

### 7. 监听模式配置 ⭐

```json
{
  "watchOptions": {
    "watchFile": "useFsEvents",
    "watchDirectory": "useFsEvents",
    "excludeDirectories": ["**/node_modules", "_build"],
    "excludeFiles": ["build/temp.ts"]
  }
}
```

---

## 六、常见问题与最佳实践

### 1. 新项目如何选择配置?

**最小推荐配置**(适合快速开始):

```json
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
```

### 2. 老项目如何迁移到严格模式?

逐步启用规则:

```json
{
  "compilerOptions": {
    "strict": false,
    // 先启用这些
    "noImplicitAny": true,
    "strictNullChecks": true,
    // 逐步启用其他规则
    "strictFunctionTypes": true
  }
}
```

### 3. 为什么我的路径别名不生效?

确保同时配置了 `baseUrl` 和 `paths`:

```json
{
  "compilerOptions": {
    "baseUrl": "./", // 必须设置
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

**注意**: 如果使用 Webpack/Vite,还需要在构建工具中配置对应的别名。

### 4. 使用 ESBuild/SWC 需要哪些配置?

```json
{
  "compilerOptions": {
    "isolatedModules": true, // 必需
    "noEmit": true, // 不生成 JS,只做类型检查
    "esModuleInterop": true
  }
}
```

### 5. 如何加快编译速度?

```json
{
  "compilerOptions": {
    "incremental": true, // 增量编译
    "skipLibCheck": true, // 跳过库检查
    "noEmit": true // 如果用其他工具构建
  },
  "exclude": [
    "node_modules",
    "**/*.test.ts" // 排除测试文件
  ]
}
```

### 6. 发布 npm 包需要哪些配置?

```json
{
  "compilerOptions": {
    "declaration": true, // 生成 .d.ts
    "declarationMap": true, // 生成 source map
    "target": "ES2018", // 兼容性目标
    "module": "ESNext",
    "removeComments": true // 移除注释
  }
}
```

同时在 `package.json` 中配置:

```json
{
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "files": ["dist"]
}
```

---

## 七、配置速查表

### 按使用场景分类

| 场景                   | 核心配置                                                               |
| ---------------------- | ---------------------------------------------------------------------- |
| **Web 应用**           | `strict`, `target: ES2020`, `module: ESNext`, `jsx`, `esModuleInterop` |
| **Node 应用**          | `strict`, `target: ES2020`, `module: CommonJS`, `esModuleInterop`      |
| **npm 库**             | `strict`, `declaration`, `target: ES2018`, `module: ESNext`            |
| **Monorepo**           | `composite`, `references`, `incremental`                               |
| **使用 Babel/ESBuild** | `isolatedModules`, `noEmit`, `esModuleInterop`                         |

### 按功能分类

| 功能         | 配置项                        | 推荐值                |
| ------------ | ----------------------------- | --------------------- |
| **类型安全** | `strict`                      | `true`                |
| **编译目标** | `target`                      | `ES2020`              |
| **模块系统** | `module`                      | `ESNext` / `CommonJS` |
| **路径别名** | `baseUrl`, `paths`            | 按需配置              |
| **生成类型** | `declaration`                 | 库项目 `true`         |
| **加速编译** | `incremental`, `skipLibCheck` | `true`                |
| **调试支持** | `sourceMap`                   | 开发环境 `true`       |
| **兼容性**   | `esModuleInterop`             | `true`                |

---

## 八、参考资源

- [TypeScript 官方文档](https://www.typescriptlang.org/tsconfig)
- [TSConfig 参考](https://www.typescriptlang.org/tsconfig)
- [TSConfig Bases](https://github.com/tsconfig/bases) - 社区推荐配置集合
