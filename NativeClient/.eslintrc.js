module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
  parser: '@babel-eslint',
  parserOptions: {
    babelOptions: {
      presets: ['@babel/preset-react'],
    },
  },
};
