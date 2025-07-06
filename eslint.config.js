import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  // Base JS rules
  js.configs.recommended,

  // Base TS rules
  ...tseslint.configs.recommended,

  // Global rules
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    rules: {
      'no-console': 'off',
      'prefer-const': 'error',
      'no-var': 'error',
      'eol-last': ['error', 'always'],
      'quotes': ['error', 'single', { avoidEscape: false, allowTemplateLiterals: false }],
      'indent': ['error', 2, { SwitchCase: 1 }],
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'no-trailing-spaces': 'error',
      'no-irregular-whitespace': 'error',
      'no-mixed-spaces-and-tabs': 'error',
      'no-multi-spaces': 'error',
      'no-case-declarations': 'off',
    },
  },
  // React-specific rules
  {
    ...pluginReact.configs.flat.recommended,
    files: ['**/*.{jsx,tsx}'],
    plugins: {
      'react-hooks': pluginReactHooks,
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  // Ignored paths
  {
    ignores: ['eslint.config.js', 'node_modules/', 'dist/', '.vscode/', '.idea/', 'build/'],
  },
]);
