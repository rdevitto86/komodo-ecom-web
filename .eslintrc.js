module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  // overrides: [],
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
    // TODO - make a custom ruleset. AirBnb is too generic
    // javascript-disabled
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

    // javascript warnings
    'comma-dangle': 'warn',

    // react-disabled
    'react/jsx-filename-extension': 'off',
    'react/react-in-jsx-scope': 'off',
    // 'react/jsx-indent': 'off',

    // typescript-disabled
    '@typescript-eslint/no-use-before-define': 'off',
  },
};
