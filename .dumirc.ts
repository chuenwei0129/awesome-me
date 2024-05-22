import { defineConfig } from 'dumi'

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'awesome-me',
    socialLinks: {
      github: 'https://github.com/chuenwei0129/awesome-me',
    },
  },
  // 添加 latex 插件
  extraRemarkPlugins: ['remark-math'],
  extraRehypePlugins: ['rehype-mathjax'],
  // apiParser
  apiParser: {
    parseOptions: {},
  },
  resolve: {
    atomDirs: [
      { type: 'component', dir: 'src/components' },
      { type: 'hook', dir: 'src/hooks' },
      { type: 'util', dir: 'src/utils' },
    ],
    // 配置入口文件路径，API 解析将从这里开始
    entryFile: './src/index.ts',
  },
})
