import { defineConfig } from 'father';

export default defineConfig({
  // more father config: https://github.com/umijs/father/blob/master/docs/config.md
  esm: {
    output: 'dist',
    // 打包 💼 忽略的文件
    ignores: [
      'docs/**',
      // 这里存放 docs 中使用的 demos
      'playground/**',
      // 测试用例
      'src/**/coverage/**',
      // 这里存放我们 npm 包中使用的 demos
      'src/**/usage/**',
      // 暂时不打包
      // 'src/components/**',
      // 'src/hooks/**',
    ],
  },
});
