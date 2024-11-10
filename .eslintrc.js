module.exports = {
  extends: require.resolve('@umijs/lint/dist/config/eslint'),
  plugins: ['eslint-plugin-react-compiler'],
  rules: {
    'react-compiler/react-compiler': 'error',
  },
};
