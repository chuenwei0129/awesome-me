/** @type {import('tailwindcss').Config} */
module.exports = {
  // 关闭 tailwindcss 提供的浏览器样式重置
  corePlugins: {
    preflight: false,
  },
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
