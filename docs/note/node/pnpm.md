---
title: pnpm
order: 3
toc: content
group:
  title: 基础知识
---

## 硬链接和软链接

在 Linux 系统中，链接是将文件名与实际数据关联起来的机制。链接主要有两种类型：硬链接和软链接。

- **硬链接 (Hard Link)**：硬链接指通过索引节点来进行链接。在 Linux 的文件系统中，保存在磁盘分区中的文件不管是什么类型都给它分配一个编号，称为索引节点号 (Inode Index)。在 Linux 中，多个文件名指向同一索引节点是存在的。一般这种链接就是硬链接。**硬链接的作用是允许一个文件拥有多个有效路径名，这样用户就可以建立硬链接到重要文件，以防止 “误删” 的功能**。其原因如上所述，因为对应该目录的索引节点有一个以上的链接。只删除一个链接并不影响索引节点本身和其它的链接，只有当最后一个链接被删除后，文件的数据块及目录的链接才会被释放。也就是说，**文件真正删除的条件是与之相关的所有硬链接文件均被删除**。

- **软链接 (Symbolic Link 或 Soft Link)**：**软链接类似于 Windows 中的快捷方式**，它是一个特殊类型的文件，包含了另一个文件的路径名的文本。软链接不是指向 Inode，而是指向另一个文件名。**如果原始文件被删除，软链接就会失效，因为它指向的文件名不再存在**。

为了更直观地理解这两种链接，我们可以使用以下 Linux 命令进行实验：

```bash
mkdir test
cd test
touch f1.js
ln f1.js f2.js    # 创建f1.js的硬链接f2.js
ln -s f1.js f3.js # 创建f1.js的软链接f3.js
```

![20240425184652](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/me/20240425184652.png)

在这个例子中，`f2.js` 是 `f1.js` 的硬链接，而 `f3.js` 是 `f1.js` 的软链接。

从上面的结果中可以看出，硬链接文件 f2.js 与原文件 f1.js 的 inode 节点相同，均为 67853122，然而符号连接文件的 inode 节点不同。

通过实验，我们还可以观察到：

1. 删除软链接 `f3.js` 不会影响 `f1.js` 或 `f2.js`。
2. 删除硬链接 `f2.js` 同样不会影响 `f1.js` 或 `f3.js`。
3. 删除原文件 `f1.js` 不会影响硬链接 `f2.js`，但软链接 `f3.js` 将因为找不到原文件而失效。
4. 当原文件和所有硬链接都被删除后，文件数据才会被完全移除。

## 什么是 pnpm？

pnpm 是一个高效的包管理器，专为 JavaScript 项目设计，用于优化依赖项的安装和管理。它不仅提供了 npm 的所有基本功能，还引入了创新的策略，以提供更出色的性能和更强的依赖关系控制。

pnpm 的核心优势包括：

1. **磁盘空间的高效利用**：

   - **避免重复安装**：传统上，如果多个项目依赖于同一个包 (如 lodash)，每个项目都会单独安装该包，导致冗余。pnpm 通过硬链接 (hardlink) 技术，确保相同的包只安装一次，节省了大量磁盘空间。
   - **智能文件复用**：对于包的不同版本，pnpm 会尽可能复用已有版本的文件。例如，如果 lodash 更新后只增加了一个文件，pnpm 将保留原有的文件硬链接，只添加新文件，而不是重写整个包。

2. **消除幽灵依赖**：在 npm 或 yarn 中，由于 node_modules 的扁平结构，项目可能会无意中访问并未直接声明的依赖项。pnpm 通过其独特的依赖管理系统彻底避免了这一问题，从而增强了项目的模块安全性。

想要深入了解 pnpm 的更多优势，可以阅读这篇深度文章：[为什么现在我更推荐 pnpm 而不是 npm/yarn？](https://juejin.cn/post/6932046455733485575)

## `workspace:` 协议

默认情况下，如果工作区内有匹配的包，`pnpm` 会自动把这些包链接（就是连接起来使用）到需要它们的地方。比如说，如果有个叫 `bar` 的地方需要 `foo` 这个包的 `1.0.0` 版本，而恰好工作区里有 `foo@1.0.0`，`pnpm` 就会把它们连起来。但如果 `bar` 需要的是 `foo` 的 `2.0.0` 版本，而工作区里没有，那么 `pnpm` 就会从互联网上的仓库下载 `foo@2.0.0` 来用。

有时候这种自动链接的行为可能会让人糊涂，但幸运的是，`pnpm` 支持一种叫做 `workspace:` 协议的东西。用这个协议的话，`pnpm` 只会链接工作区内有的包，如果说你写了 `"foo": "workspace:2.0.0"`，但工作区里没有 `foo@2.0.0`，那么 `pnpm` 就会报错，因为它找不到这个版本的 `foo`。

这个 `workspace:` 协议特别有用，尤其是在你设置了不自动链接工作区包的情况下。这种情况下，`pnpm` 只有在你用了 `workspace:` 协议时才会链接工作区的包。

## 日常使用

尽管 pnpm 在设计上非常先进，但它的使用却保持了简单性。对于有 npm 或 yarn 经验的开发者来说，迁移到 pnpm 几乎没有任何障碍。

### 包管理命令速查

| 功能描述                     | npm                                     | yarn                            | pnpm                                 |
| ---------------------------- | --------------------------------------- | ------------------------------- | ------------------------------------ |
| 清理缓存                     | `npm cache clean --force`               | `yarn cache clean`              | `pnpm store prune`                   |
| 安装 `package.json` 中的依赖 | `npm install`                           | `yarn`                          | `pnpm install`                       |
| 添加包                       | `npm install <package>`                 | `yarn add <package>`            | `pnpm add <package>`                 |
| 添加开发依赖                 | `npm install <package> --save-dev`      | `yarn add <package> --dev`      | `pnpm add <package> --save-dev`      |
| 添加可选依赖                 | `npm install <package> --save-optional` | `yarn add <package> --optional` | `pnpm add <package> --save-optional` |
| 安装精确版本                 | `npm install <package> --save-exact`    | `yarn add <package> --exact`    | `pnpm add <package> --save-exact`    |
| 移除包                       | `npm uninstall <package>`               | `yarn remove <package>`         | `pnpm remove <package>`              |
| 更新包                       | `npm update <package>`                  | `yarn upgrade <package>`        | `pnpm update <package>`              |
| 列出顶级包                   | `npm list --depth 0`                    | `yarn list --depth 0`           | `pnpm list --depth 0`                |
| 审计脆弱依赖                 | `npm audit`                             | `yarn audit`                    | `pnpm audit`                         |
| 全局安装包                   | `npm install -g <package>`              | `yarn global add <package>`     | `pnpm add -g <package>`              |
| 全局移除包                   | `npm uninstall -g <package>`            | `yarn global remove <package>`  | `pnpm remove -g <package>`           |
| 查看全局包                   | `npm list -g --depth 0`                 | `yarn global list --depth 0`    | `pnpm list -g --depth 0`             |

### 共享命令速查

以下命令在不同的包管理器之间结构相同。

| 功能描述   | npm                       | yarn                       | pnpm                       |
| ---------- | ------------------------- | -------------------------- | -------------------------- |
| 初始化项目 | `npm init`                | `yarn init`                | `pnpm init`                |
| 登录       | `npm login`               | `yarn login`               | `pnpm login`               |
| 登出       | `npm logout`              | `yarn logout`              | `pnpm logout`              |
| 运行脚本   | `npm run <script>`        | `yarn run <script>`        | `pnpm run <script>`        |
| 运行测试   | `npm test`                | `yarn test`                | `pnpm test`                |
| 构建项目   | `npm run build`           | `yarn build`               | `pnpm build`               |
| 发布包     | `npm publish`             | `yarn publish`             | `pnpm publish`             |
| 取消发布包 | `npm unpublish <package>` | `yarn unpublish <package>` | `pnpm unpublish <package>` |
| 配置命令   | `npm config <command>`    | `yarn config <command>`    | `pnpm config <command>`    |
| 查看过时包 | `npm outdated`            | `yarn outdated`            | `pnpm outdated`            |
| 链接本地包 | `npm link`                | `yarn link`                | `pnpm link`                |
| 查看配置   | `npm config list`         | `yarn config list`         | `pnpm config list`         |

### 远程运行命令速查

不安装包即可运行命令。

| 功能描述 | npm             | yarn                 | pnpm                 |
| -------- | --------------- | -------------------- | -------------------- |
| 运行包   | `npx <package>` | `yarn dlx <package>` | `pnpm dlx <package>` |

## CLI 文档链接

- [npm](https://docs.npmjs.com/cli/v8/commands)
- [yarn](https://yarnpkg.com/cli)
- [pnpm](https://pnpm.io/cli/install)

7400 + 5000 + 300 + 650 + 1800 + 1300 + 6800 + 4000 + 300
