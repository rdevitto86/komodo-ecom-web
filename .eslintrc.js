module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    // javascript-disabled
    'no-use-before-define': 'off',
    'comma-dangle': 'off',
    'indent': 'off',
    'quote-props': 'off',
    'no-param-reassign': 'off',
    'no-plusplus': 'off',
    'no-console': 'off',
    'no-case-declarations': 'off',
    'no-underscore-dangle': 'off',
    'no-restricted-syntax': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'lines-between-class-members': 'off',

    // javascript-warnings
    'object-curly-newline': 'warn',
    'no-trailing-spaces': 'warn',

    // react-disabled
    'react/jsx-filename-extension': 'off',
    'react/react-in-jsx-scope': 'off',

    // typescript-disabled
    '@typescript-eslint/no-use-before-define': 'off'
  },
};
