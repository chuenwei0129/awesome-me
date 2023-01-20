# 通过 Github Pages 发布 Foam 笔记

## 配置

> 笔记库基于 [foam-template-gatsby-kb](https://github.com/hikerpig/foam-template-gatsby-kb) 模版创建，有关更多配置信息，请查看 [gatsby-theme-kb](https://gatsby-project-kb.vercel.app/)。

设置模版中 [_layouts/gatsby-config.js](https://github.com/hikerpig/foam-template-gatsby-kb/blob/master/_layouts/gatsby-config.js) 文件。

```js
const path = require('path')

const PATH_PREFIX = process.env.PATH_PREFIX

module.exports = {
  pathPrefix: PATH_PREFIX || `/`, // b. If you are using Netlify/Vercel, your can keep it this way
  siteMetadata: {
    // some SEO configs using by gatsby-theme-kb
    title: `Foam`, // Replace it with your site's title
    author: `Your Name`, // Replace it with your name
    description: `My personal knowledge base`, // Replace it with your site's description
  },
  plugins: [
    {
      resolve: `gatsby-theme-kb`,
      options: {
        rootNote: '/readme',
        contentPath: `${__dirname}/..`,
        ignore: [
          '**/_layouts/**',
          '**/.git/**',
          '**/.github/**',
          '**/.vscode/**',
          '**/.cache/**',
        ],
        // this is an option for extending `gatsby-plugin-mdx` options inside `gatsby-theme-kb`,
        getPluginMdx(defaultPluginMdx) {
          // so you can have your relative referenced files served, e.g. '../assets/img.png'.
          defaultPluginMdx.options.gatsbyRemarkPlugins.push({
            resolve: `gatsby-remark-copy-linked-files`,
            options: {
              ignoreFileExtensions: ['md', 'mdx'],
            },
          })

          // an example of syntax highlighting
          defaultPluginMdx.options.gatsbyRemarkPlugins.push({
            resolve: 'gatsby-remark-prismjs',
            options: {
              noInlineHighlight: true,
            },
          })

          // add math support
          defaultPluginMdx.options.remarkPlugins.push(require('remark-math'))
          if (!defaultPluginMdx.options.rehypePlugins) defaultPluginMdx.options.rehypePlugins = []
          defaultPluginMdx.options.rehypePlugins.push(require('rehype-katex'))
          return defaultPluginMdx
        },
      },
    },
    {
      // this plugin makes sure your static files will be served by gatsby,
      //   but of course you need to reference them by absolute path, e.g. '/assets/img.png'.
      // if you have multiple directories, copy this plugin section and specify other directory
      // check https://github.com/csath/gatsby-plugin-copy-files-enhanced to find docs for this plugin
      resolve: 'gatsby-plugin-copy-files-enhanced',
      options: {
        source: path.resolve(__dirname, `../assets`),
        destination: '/assets',
        purge: false,
      },
    },
  ],
}
```

## 部署

首先需要在 repo 设置中启用 GitHub Pages，将 `gh-pages` 分支设置为源。

![20221024143942](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/ts/20221024143942.png)

一旦你推送 `master` 分支，Github 操作将构建站点并将生成的文件添加到 `gh-pages` 分支。

操作工作流配置位于 `.github/workflows/Deploy.yml`。

构建完成后，可以访问站点 `https://{yourname}.github.io/{your-repo-name}/`，例如 <https://chuenwei0129.github.io/blog>

<!-- TODO -->
<!-- ## 自定义

### MDX

### Iframe -->
