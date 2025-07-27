import { defineConfig } from 'dumi';

export default defineConfig({
  // 配置输出路径
  outputPath: 'docs-dist',
  // 配置文档起始路由和静态资源起始路径
  base: '/awesome-me/', // 文档起始路由
  publicPath: '/awesome-me/', // 静态资源起始路径
  // 配置 logo 和 favicons
  logo: '/awesome-me/logo.svg',
  favicons: ['/awesome-me/logo.svg'],
  // 配置文档名称
  themeConfig: {
    // 配置网站名称
    name: 'HogLog',
    // 配置社交链接
    socialLinks: {
      github: 'https://github.com/chuenwei0129/awesome-me',
    },
  },
  // 使用 tailwindcss
  extraPostCSSPlugins: [require('@tailwindcss/postcss')],
});
