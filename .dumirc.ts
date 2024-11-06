import { defineConfig } from 'dumi';

export default defineConfig({
  // presets: ['@dumijs/preset-vue'],
  // vue: {
  //   checkerOptions: {
  //     ignore: ['InternalType'],
  //   },
  //   compiler: {
  //     babelStandaloneCDN:
  //       'https://cdn.bootcdn.net/ajax/libs/babel-standalone/7.22.17/babel.min.js',
  //   },
  // },
  logo: '/logo.svg',
  favicons: [
    // 'https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/me/icon.svg',
    '/logo.svg',
  ],
  themeConfig: {
    name: 'naifu',
    socialLinks: {
      github: 'https://github.com/chuenwei0129/awesome-me',
    },
  },
  outputPath: 'docs-dist',
  base: '/',
  publicPath: '/',
  // tailwindcss
  plugins: ['@umijs/plugins/dist/tailwindcss'],
  tailwindcss: {},
  // latex
  extraRemarkPlugins: ['remark-math'],
  extraRehypePlugins: ['rehype-mathjax'],
  // 资产路由
  resolve: {
    atomDirs: [
      // 在识别资产路由时，自动为路由路径加上资产类别前缀（type 配置项）
      { type: 'package', dir: 'src/components' },
      { type: 'package', dir: 'src/hooks' },
      { type: 'package', dir: 'src/utils' },
    ],
  },
});
