module.exports = {
  extends: require.resolve('@umijs/lint/dist/config/eslint'),
  plugins: ['eslint-plugin-react-compiler'],
  rules: {
    // https://zh-hans.react.dev/blog/2024/10/21/react-compiler-beta-release
    'react-compiler/react-compiler': 'error',
    'react/button-has-type': 'off',
  },
};
