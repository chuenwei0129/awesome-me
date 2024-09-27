---
group:
  title: 2024 🐲
  order: -2024
title: Dumi
toc: content
---

# 记录一下我是如何使用 dumi 的

## 文档内容的组织结构

<Tree>
  <ul>
    <li>
      docs
      <small>文档路由</small>
      <ul>
        <li>
          index.md
          <small>首页</small>
        </li>
        <li>
          guide.md
          <small>指南</small>
        </li>
        <li>
          blog
          <ul>
            <li>
              index.md
              <small>博客归档</small>
            </li>
            <li>
              dumi.md
              <small>第一篇博客</small>
            </li>
          </ul>
        </li>
        <li>
          garden
          <ul>
            <li>
              index.md
              <small>可选，但要 garden 显示为中文则须配置</small>
            </li>
            <li>
              js
              <ul>
                <li>
                  index.md
                  <small>二级导航：JS 索引</small>
                </li>
                <li>
                  null-undefined.md
                  <small>JS 第一篇文章</small>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </li>
    <li>package.json</li>
  </ul>
</Tree>

## 文件路径及页面配置

### 1. 主页配置 - docs/index.md

```yaml
---
title: 首页
hero:
  title: TODO
  description: 没有经过整理的知识才是徒然浪费时间，伤透脑筋！
  actions:
    - text: 立即上手
      link: /guide
    - text: GitHub
      link: https://github.com/chuenwei0129/awesome-me
---
```

主页设定为引导用户迅速了解和参与项目。提供直接的链接到指南页面和项目的 GitHub 页面，鼓励用户立即参与和贡献。

### 2. 指南 - docs/guide.md

```yaml
---
nav:
  title: 指南
  order: -1

title: 我的标题
order: -1
---
```

指南部分旨在为用户提供详细的操作和使用说明，方便用户快速上手。

### 3. 博客归档 - docs/blog/index.md

```yaml
---
nav:
  title: 博客
  order: 1
group:
  title: 归档
  order: -999
title: 这是什么？
---
```

### 4. 博客文章 - docs/blog/dumi.md

```yaml
nav:
  title: 博客
  order: 1
group:
  title: 2024 🐲
  order: 0
title: 我如何使用 dumi
---
```

### 5. 文档库入口 - docs/garden/index.md

```yaml
---
nav:
  title: 知识库
  order: 999
---
```

知识库作为一个综合信息聚集地，设置于导航的末端，旨在为用户提供广泛的知识资源。

### 6. JavaScript 索引 - docs/garden/js/index.md

```yaml
---
nav:
  second:
    title: JavaScript
    order: 0
group:
  title: 介绍
  order: -999
title: 这是什么？
---
```

### JavaScript 话题 - docs/garden/js/null-undefined.md

```yaml
---
group:
  title: 数据类型
  order: -1
title: Null 与 Undefined
order: -1
toc: content
---
```

## Markdown 之间的相互跳转

> `blog/index.md` 中跳转到 `dumi.md`

```md
[跳转到 dumi](./dumi.md)
```

> `blog/dumi.md` 中跳转到 `blog/switch.md`。

```md
[跳转到 switch](./switch)
```

## 配置 tailwindcss

`tailwindcss` 配置项需要安装 `@umijs/plugins`，并且挂载 `@umijs/plugins/dist/tailwindcss` 插件才能使用。

具体实现，可以参考以下步骤：

1. 安装：

    ```sh
    pnpm i @umijs/plugins tailwindcss -D
    ```

2. 在 `.dumirc.ts` 中配置：

    ```sh
    plugins: ['@umijs/plugins/dist/tailwindcss']
    ```

3. 启用 `tailwindcss`：同样在 `.dumirc.ts` 加入

    ```sh
    tailwindcss: {}
    ```

4. 确保在根目录下已创建 `tailwind.config.js` 和 `tailwind.css`。

    ![20240613235249](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/me/20240613235249.png)

5. 配置 `tailwind.config.js`：

    ```js
    /** @type {import('tailwindcss').Config} */
    module.exports = {
      // 关闭 tailwindcss 提供的浏览器样式重置，否则会导致 dumi 样式异常。
      corePlugins: {
        preflight: false,
      },
      content: ['./playground/**/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
      theme: {
        extend: {},
      },
      plugins: [],
    };
    ```

    未配置情况下会出现如下样式：

    ![20240614052556](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/me/20240614052556.png)

## 配置 zhlint

安装 `zhlint`：

```sh
pnpm i zhlint -D
```

配置 `package.json`：

```sh
"lint:md": "zhlint \"./docs/**/*.md\" --fix"
```

## 关于打包

> <https://github.com/umijs/father/issues/514>
