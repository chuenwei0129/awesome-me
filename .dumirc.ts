import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'awesome-me',
  },
  extraPostCSSPlugins: [require('@tailwindcss/postcss')],
});
