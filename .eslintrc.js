module.exports = {
  root: true,
  extends: ['prettier', '@react-native-community'],
  parser: '@typescript-eslint/parser',
  plugins: ['prettier', '@typescript-eslint'],
  rules: {
    'prettier/prettier': ['error'],
  },
};
