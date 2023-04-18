module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
  },
  plugins: ['import', 'prettier', 'react', '@typescript-eslint'],
  extends: ['plugin:@web-bee-ru/next'],
  rules: {
    'ignoreDuringBuilds': 'off',
    'react/no-unescaped-entities': 'off',
    '@next/next/no-page-custom-font': 'off',

    'react/react-in-jsx-scope': ['off'],
    '@typescript-eslint/no-var-requires': 'off',
    'unicorn/filename-case': 'off',
  },
};
