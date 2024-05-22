import { defineConfig } from 'father'

export default defineConfig({
  // more father config: https://github.com/umijs/father/blob/master/docs/config.md
  esm: {
    output: 'dist',
    // 打包 💼 忽略的文件
    ignores: [
      'docs/**',
      'src/**/usage/**',
      'src/**/coverage/**',
      'src/components/**',
      'src/hooks/**',
      'src/patterns/**',
    ],
  },
})
