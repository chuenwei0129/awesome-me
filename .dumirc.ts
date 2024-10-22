import { defineConfig } from 'dumi';

export default defineConfig({
  logo: '/awesome-me/logo.svg',
  favicons: [
    'https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/me/icon.svg',
  ],
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'naifu',
    socialLinks: {
      github: 'https://github.com/chuenwei0129/awesome-me',
    },
  },
  base: '/awesome-me/',
  // 把 /public 目录映射到 /awesome-me/ 目录
  // 这样在 md 文件中可以直接使用 /public/awesome-me/ 引用图片
  publicPath: '/awesome-me/',
  // tailwindcss
  plugins: ['@umijs/plugins/dist/tailwindcss'],
  tailwindcss: {},
  // latex
  // extraRemarkPlugins: ['remark-math'],
  // extraRehypePlugins: ['rehype-mathjax'],
  // 资产路由
  resolve: {
    atomDirs: [
      // 在识别资产路由时，自动为路由路径加上资产类别前缀（type 配置项）
      { type: 'components', dir: 'src/components' },
      { type: 'hooks', dir: 'src/hooks' },
      { type: 'utils', dir: 'src/utils' },
    ],
  },
});
