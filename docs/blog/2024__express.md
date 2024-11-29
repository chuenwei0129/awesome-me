---
group:
  title: 2024 🐲
  order: -2024
title: 记一次 express 私活
toc: content
order: -999
---

# 记一次 express 私活

## 前言

> 看来，我这半吊子的 Express 水平果然和这标价 350 元、实际到手 210 元的大活相得益彰啊！（中间商简直是现代的吸血鬼。）

背景故事是这样的：这好像是某大学的一个课设项目。回想我们那时候的课设，别提什么高端技术了，简直是原始社会。现在的学生真是紧跟潮流，直到大三我才摸到 JavaScript 的影子。

需求文档在这儿：盛情奉上 [GitLab 仓库链接](https://gitlab.com/jei/fsd_chirrup_server)。

有句话怎么说来着：世界上 99% 的代码都被前人实现过。所以，我的第一反应是上 Google 和 GitHub 发掘一下，没想到还真让我找到了原始仓库！不过，节省时间的是老师，不是我。原来这位老师是直接复制粘贴别人出的题。哎，我还以为现在的大学老师都已经升级到 2.0 版本了。想当年我大学毕业时，毕设写的是 Node.js，老师还看着代码一脸蒙圈地问我：“这是什么新鲜玩意儿？”

讲真，挣这 200 元真是不容易。想着正好可以顺带练习一下 Prisma ORM，我和 GPT 就这么结队编程了。

后端代码已晋献上：[GitHub 仓库链接](https://github.com/chuenwei0129/fsd_chirrup_server)。

顺便吐槽一句，200 元还得写接口文档，真是血汗钱啊！

接口文档地址在这儿：[API 文档链接](https://app.apifox.com/project/5300164)。

至于前端代码嘛，实在是太简单了，就不赘述了。

## ORM（对象关系映射）

对象关系映射（ORM，Object Relational Mapping）是一种将面向对象编程语言中的对象与关系型数据库中的数据互相转化的一种技术。它允许开发者使用对象操作的方式，来操作数据库中的数据。

### 示例比较

假设你用 SQL 语法查询数据：

```sql
SELECT * FROM users WHERE name = 'chu';
```

如果使用 ORM 技术，类似的查询操作可以转变为如下的 JavaScript 代码（这里采用了虚构的 `orm-library`库）：

```javascript
var orm = require('orm-library');
var user = orm("users").where({ name: 'chu' });
```

这样，开发者可以使用熟悉的编程语言和对象操作方式，与数据库进行交互。这也意味着，只要有对应的 ORM 库支持，开发者可以使用一门他们熟悉的语言，而无需深入掌握 SQL 语法。

### ORM 的优势

1. **跨数据库兼容性**：通过 ORM，可以轻松地从一种数据库（例如 PostgreSQL）切换到另一种数据库（例如 MySQL），所需更改的代码量较小。
2. **简化复杂操作**：ORM 提供了对数据库的抽象，简化了许多常见的数据库操作，同时提供了高级功能便于使用。

## Prisma ORM

Prisma 是一个现代的 Node.js 和 TypeScript ORM，旨在提供更好的开发者体验。

### 特性和优势

根据官方说法，Prisma 的优势包括：

> Prisma unlocks a new level of developer experience when working with databases thanks to its intuitive data model, automated migrations, type-safety & auto-completion.

简单来说，Prisma 提供了直观的数据模型、自动化迁移、类型安全和自动补全功能，大大提升了开发效率。

> TODO

### express

> TODO
