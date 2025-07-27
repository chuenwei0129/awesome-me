import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  base: '/awesome-me/', // 文档起始路由
  publicPath: '/awesome-me/', // 静态资源起始路径
  themeConfig: {
    name: 'awesome-me',
  },
  extraPostCSSPlugins: [require('@tailwindcss/postcss')],
});
