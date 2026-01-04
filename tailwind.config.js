/** @type {import('tailwindcss').Config} */
module.exports = {
  // 关闭 tailwindcss 提供的浏览器样式预设
  corePlugins: {
    preflight: false,
  },
  // 指定 tailwindcss 的作用范围
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  // 插件
  plugins: [require('tailwindcss-animate')],
};
