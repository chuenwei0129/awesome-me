import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'nautica',
    socialLinks: {
      github: 'https://github.com/chuenwei0129/awesome-me',
    },
  },
  base: '/awesome-me/',
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
