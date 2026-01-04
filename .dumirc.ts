import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name: '@c6i',
  },

  // 引入 tailwindcss 插件
  plugins: ['@umijs/plugins/dist/tailwindcss'],
  tailwindcss: {},
  autoprefixer: {},

  // 在识别文档路由时，dumi 会自动过滤掉以 . 和 _ 开头的文件及文件夹，仅识别 .md 后缀的文件，识别路径可通过 resolve.docDirs 进行修改；
  // 在识别资产路由时，dumi 仅识别第一层级的 .md 文件及第二层级的 index.md、README.md 文件，并自动为路由路径加上资产类别前缀（type 配置项），识别路径及资产类别前缀可通过 resolve.atomDirs 进行修改；
  // 在识别 React 路由时，dumi 会自动过滤掉以 . 和 _ 开头的文件及文件夹，仅识别 .tsx、.ts、.jsx 和 .js 后缀的文件，过滤规则可通过 conventionRoutes.exclude 进行修改。
  resolve: {
    atomDirs: [
      { type: 'package', dir: 'src/components' },
      { type: 'package', dir: 'src/hooks' },
      { type: 'package', dir: 'src/utils' },
    ],

    // 配置入口文件路径，API 解析将从这里开始，和 apiParser 配合使用
    entryFile: './src/index.ts',
  },

  // dumi 支持基于 JSDoc 及 TypeScript 类型定义自动为 React 组件生成 API 表格，降低 API 文档的维护成本。
  apiParser: {},
});
