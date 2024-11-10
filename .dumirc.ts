import { defineConfig } from 'dumi';

const ReactCompilerConfig = {
  target: '18',
  sources: (filename: string) => {
    return filename.indexOf('code/react-compiler') !== -1;
  },
};

export default defineConfig({
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
  // 必须有，否则 tailwindcss 不生效
  tailwindcss: {},
  // latex
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
  chainWebpack(memo) {
    memo.module
      .rule('lrc')
      .test(/\.lrc$/i)
      .type('asset/source');
  },
  extraBabelPlugins: [['babel-plugin-react-compiler', ReactCompilerConfig]],
});
