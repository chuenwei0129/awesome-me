---
group:
  title: 2024 🐲
  order: -2024
title: 记一次 express 私活
toc: content
order: -999
---

> 看来，我这点半吊子的 Express 水平正好适合这个标价 350 元但实际到手只有 210 元的任务（可恶的中间商啊）。

背景：这似乎是一个大学的课设项目。回想起来，当我们上大学的时候，课设根本没那么高级。现在的学生可真是紧跟潮流，直到大三我才知道 JavaScript 是什么?

需求是这样的：[GitLab 仓库链接](https://gitlab.com/jei/fsd_chirrup_server)。

有句话怎么说来着：世界上 99% 的功能前人都实现过。所以，我的第一反应就是去 Google 和 GitHub 搜索了一下，没想到还真让我找到了原始仓库。可惜的是，节省时间的不是我，而是老师。原来这老师是直接复制了别人的题目。唉，我还以为现在的大学老师都这么与时俱进了呢。想当年我大学毕业时，因为毕设用的是 Node.js，老师还问我那是什么?

200 元也不好挣呀，想着正好可以练习一下 Prisma ORM，只能和 GPT 开启结对编程了。

后端代码实现：[GitHub 仓库链接](https://github.com/chuenwei0129/fsd_chirrup_server)。

顺便吐槽一下，200 元还得写接口文档。

接口文档地址：[API 文档链接](https://app.apifox.com/project/5300164)。

前端代码就不贴了，实在是太简单了。

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
