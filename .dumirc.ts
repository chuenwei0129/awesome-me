import { defineConfig } from 'dumi';

const ReactCompilerConfig = {
  target: '18',
  sources: (filename: string) => {
    return filename.indexOf('playground/_react-compiler') !== -1;
  },
};

export default defineConfig({
  logo: '/awesome-me/logo.svg',
  favicons: ['/awesome-me/logo.svg'],
  themeConfig: {
    name: 'naifu',
    socialLinks: {
      github: 'https://github.com/chuenwei0129/awesome-me',
    },
  },
  // 网站打包输出目录
  outputPath: 'docs-dist',
  // 网站部署路径
  base: '/awesome-me/',
  publicPath: '/awesome-me/',
  // base: '/',
  // publicPath: '/',
  // tailwindcss 配置
  plugins: ['@umijs/plugins/dist/tailwindcss'],
  tailwindcss: {}, // 在umi中，表示启用该插件
  // latex 配置
  extraRemarkPlugins: ['remark-math'],
  extraRehypePlugins: ['rehype-mathjax'],
  // 自动 API 表格
  apiParser: {},
  // 资产路由
  resolve: {
    atomDirs: [
      // 在识别资产路由时，自动为路由路径加上资产类别前缀（type 配置项）
      { type: 'package', dir: 'src/components' },
      { type: 'package', dir: 'src/patterns' },
      { type: 'package', dir: 'src/antd' },
      { type: 'package', dir: 'src/hooks' },
    ],
    // 配置入口文件路径，API 解析将从这里开始
    entryFile: './src/index.ts',
  },
  // 自定义 webpack 配置
  chainWebpack(memo: any) {
    memo.module
      .rule('lrc')
      .test(/\.lrc$/i)
      .type('asset/source');
  },
  // 自定义 babel 配置
  extraBabelPlugins: [['babel-plugin-react-compiler', ReactCompilerConfig], 'babel-plugin-styled-components'],
  // 自定义 postcss 配置
  // extraPostCSSPlugins: [],
});
