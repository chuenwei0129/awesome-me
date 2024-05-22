---
title: monorepo
order: 4
toc: content
group:
  title: 基础知识
---

## 为什么采用 monorepo？

设想一个复杂的项目，例如 Babel，它分为@babel/core、@babel/cli、@babel/parser、@babel/traverse、@babel/generator 等多个包。如果为每个包维护一个独立的 Git 仓库，我们将不得不管理十几个仓库，每个都需要一套工程化工具和配置，这不仅重复劳动，还带来以下挑战：

1. 本地开发依赖：当项目依赖正在开发中的本地包时，通常我们会通过`npm link`将该包链接到全局，再链接到项目的`node_modules`中。这对于单个包尚可管理，但对于十几个包则变得异常繁琐。

2. 执行命令：我们需要在每个包的目录下执行命令，这意味着需要进入多个目录并考虑依赖关系来确定执行顺序。

3. 版本更新：每当更新包版本时，所有依赖该包的其他包也需要更新，这个过程需要手动操作，非常耗时。

单一仓库的优势在于，它通过简化这三个过程来提高效率：减少`npm link`的复杂性、统一命令执行、简化版本管理。

### 如何解决`npm link`的问题？

单一仓库工具的解决方案如下：

假设我们有 a、b、c 三个包在一个 monorepo 项目下。工具会将这些包链接到根目录的`node_modules`。执行`npm install`时，根目录下的`node_modules`会安装所有依赖，包括链接到根目录的本地包。

![Monorepo linking](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/me/20240425230651.png)

Node.js 在查找模块时会向上逐层搜索，因此这些包可以相互依赖而被正确找到。这些链接通过`package.json`的`workspaces`字段来实现，无论是使用 npm、yarn 还是 pnpm 的工作区，都可以在执行`npm install`时自动创建链接。

## 如何解决执行命令的问题？

## 如何解决版本更新的问题？

有个工具叫做 changesets 是专门做这个的，我们看下它能做啥就好了。
