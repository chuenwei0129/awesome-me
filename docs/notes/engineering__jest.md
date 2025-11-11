---
group:
  title: engineering
  order: 99
title: Jest
toc: content
---

安装 Jest

npm i -D jest@29

安装 Jest 后，用 jest-cli 初始化 jest 配置文件：

npx jest --init

初始化配置文件时，Jest 会问你一堆问题，可以先按我下面的图来选择（只打开覆盖率和自动清除 Mock），别的以后再说：

![20251112045955](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/awesome-me/20251112045955.png)

执行完之后，就会看到有一个 jest.config.js 的配置文件

建议不要犯了强迫症把 jest.config.js 的注释去掉，它们可以作为配置 Jest 的简单版文档。

有了基本配置后，添加一个工具函数文件 sum.js 作为我们第一个业务文件：

const sum = (a, b) => {
return a + b;
}

module.exports = sum;

然后，添加我们项目的第一个测试用例 sum.test.js：

const sum = require("./sum");

describe('sum', () => {
it('可以做加法', () => {
expect(sum(1, 1)).toEqual(2);
});
})

一切就绪，执行以下命令启动测试：
npx jest

Jest 会在 coverage 目录下生成各种不同格式的覆盖率报告文件，有 XML，JSON，也有 HTML 的。生成这么多不同格式的测试报告只只是为了方便不同工具的读取， 比如 JS 读 JSON 就比读 XML 容易，它们描述的内容都是一样的。

如今 2022 年，无论我们写业务还是写测试，都会采用比较高级的 JavaScript 语法，或者 TypeScript。

但是，Jest 本身不做代码转译工作。 在执行测试时，它会调用已有的 转译器/编译器 来做代码转译。在前端，我们最熟悉的两个转译器就是 Babel (opens new window)以及 TSC (opens new window)了。

Jest 本身不做转译，而是利用别的转译器的能力来转译。 因此，我们除了用 tsc 来转译，还能用其它转译器。
Babel 做转译的 缺点是无法让 Jest 在运行时做类型检查，所以更推荐大家使用 ts-jest，利用 tsc 来转译 TypeScript。

本教程使用 ts-jest 作为主力转译器

首先安装 typescript 安装 typescript 的同时也会安装转译器 tsc

现在安装 ts-jest

注意，这里 ts-jest 一定要和 jest 的大版本一致！ 比如 27 对 27，或者 26 对 26，否则会有兼容问题！
要安装对应的 Jest 类型声明包：
npm i -D ts-jest@29
同样地，TS 声明类型包的大版本最好和 jest 一样。

在 jest.config.js 里添加一行配置：

module.exports = {
preset: 'ts-jest',
// ...
};

路径简写

对这个测试满意了么？反正我还不满意，为啥我要写一句 ../../src/utils/sum 这么长的路径？我写成 utils/sum 不是更香？ 这也是很多大型项目的必备配置了 —— 路径简写/别名。

要实现这样的效果，我们可以在 moduleDirectories 添加 "src"：

// jest.config.js
module.exports = {
moduleDirectories: ["node_modules", "src"],
// ...
}

这样一来 jest 就能看懂 utils/sum 对应的是 ../../src/utils/sum，但是，tsc 看不懂呀：

我们还得在 tsconfig.json 里指定 baseUrl 和 paths 路径：

解释一下， 所谓的 “路径简写” 本质上只是路径映射。所以 tsconfig.json 里的 paths 就是把 utils/xxx 映射成 src/utils/xxx， 而 jest.config.js 里的 moduleDirectories 则稍微狠一点，直接把 utils/sum 当作第三方模块，先在 node_modules 里找，找不到再从 src/xxx 下去找。 所以这两者是有区别的。

难道每次写路径匹配规则都在 tsconfig.json 和 jest.config.js 写两份么？很遗憾，确实如此。造成这个问题的主要原因是 jest 根本不管 tsc。

刚刚的 sum 实在是太简单了，根本没难度。这一章我们来搞点有难度的。

在很多时候，我们前端的代码往往只在浏览器里运行，经常要用到浏览器的 API。
例子

```
const KEY_NAME = 'my-app-';

const set = (key: string, value: string) => {
  localStorage.setItem(KEY_NAME + key, value);
};

const get = (key: string) => {
  return localStorage.getItem(KEY_NAME + key);
};

export default {
  get,
  set,
};

```

然后添加这个文件的测试用例：

```
import storage from '@js/storage';

test('storage', () => {
  it('设置值', () => {
    storage.set('key', 'value');
    expect(localStorage.getItem('my-app-key')).toEqual('value');
  });

  it('获取值', () => {
    localStorage.setItem('my-app-newKey', 'newValue');
    expect(storage.get('newKey')).toEqual('newValue');
  });
});
```

由于 Node.js 环境并没有 localStorage，所以报错：
