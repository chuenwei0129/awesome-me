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
});
