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
    // -- js-off ----
    'object-curly-newline': 'off',
    'no-trailing-spaces': 'off',
    'no-use-before-define': 'off',
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
    'class-methods-use-this': 'off',
    'max-classes-per-file': 'off',
    'import/prefer-default-export': 'off',
    'no-redeclare': 'off',

    // -- js-warn ----
    'comma-dangle': 'warn',
    'eol-last': 'warn',

    // -- typescript-off ----
    '@typescript-eslint/no-use-before-define': 'off',

    // typescript-warn

    // -- react-off ----
    'react/jsx-filename-extension': 'off',
    'react/react-in-jsx-scope': 'off',
    // 'react/jsx-indent': 'off',

    // -- react-warn ----
  },
};
