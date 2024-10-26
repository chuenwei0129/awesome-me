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
  logo: '/awesome-me/logo.svg',
  favicons: [
    // 'https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/me/icon.svg',
    '/awesome-me/logo.svg',
  ],
  themeConfig: {
    name: 'naifu',
    socialLinks: {
      github: 'https://github.com/chuenwei0129/awesome-me',
    },
  },
  outputPath: 'docs-dist',
  base: '/awesome-me/',
  // 这样在 md 文件中可以直接使用 /public/awesome-me/ 引用图片
  publicPath: '/awesome-me/',
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
      { type: 'components', dir: 'src/components' },
      { type: 'hooks', dir: 'src/hooks' },
      { type: 'utils', dir: 'src/utils' },
    ],
  },
});
