/** @type {import('tailwindcss').Config} */
module.exports = {
  // 关闭 tailwindcss 提供的浏览器样式预设
  corePlugins: {
    preflight: false,
  },
  // 指定 tailwindcss 的作用范围
  content: ['./code/**/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}', './docs/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
    },
    // 自定义动画
    animation: {
      fadeIn: 'fadeIn 0.5s ease-in',
    },
  },
  // 插件
  plugins: [require('tailwindcss-animate')],
};
