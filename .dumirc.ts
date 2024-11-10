import { defineConfig } from 'dumi';

const ReactCompilerConfig = {
  target: '18',
  sources: (filename: string) => {
    return filename.indexOf('code/react-compiler') !== -1;
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
  // tailwindcss 配置
  plugins: ['@umijs/plugins/dist/tailwindcss'],
  tailwindcss: {},
  // latex 配置
  extraRemarkPlugins: ['remark-math'],
  extraRehypePlugins: ['rehype-mathjax'],
  // 资产路由
  resolve: {
    atomDirs: [
      // 在识别资产路由时，自动为路由路径加上资产类别前缀（type 配置项）
      { type: 'package', dir: 'src/components' },
      { type: 'package', dir: 'src/antd' },
      { type: 'package', dir: 'src/hooks' },
    ],
  },
  // 自定义 webpack 配置
  chainWebpack(memo) {
    memo.module
      .rule('lrc')
      .test(/\.lrc$/i)
      .type('asset/source');
  },
  // 自定义 babel 配置
  extraBabelPlugins: [['babel-plugin-react-compiler', ReactCompilerConfig]],
});
