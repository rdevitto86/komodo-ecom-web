import globals from 'globals';
import tseslint from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  // JS only
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: { ...globals.browser, ...globals.node },
    },
    rules: {
      'no-console': 'off',
      'prefer-const': 'error',
      'no-var': 'error',
      'eol-last': ['error', 'always'],
      'semi': ['error', 'always'],
      'quotes': ['error', 'single', {
        avoidEscape: false,
        allowTemplateLiterals: false,
      }],
      'indent': ['error', 2, { SwitchCase: 1 }],
      'no-trailing-spaces': 'error',
      'no-irregular-whitespace': 'error',
      'no-mixed-spaces-and-tabs': 'error',
      'no-multi-spaces': 'error',
      'no-case-declarations': 'off',
      'array-element-newline': ['error', {
        multiline: true,
        minItems: 4,
      }],
      'object-property-newline': ['error', {
        allowAllPropertiesOnSameLine: true,
        allowMultiplePropertiesPerLine: true,
      }],
      'comma-dangle': ['error', {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'never',
        exports: 'never',
        functions: 'never',
      }],
    },
  },

  // TS only
  {
    files: ['**/*.{ts,mts,cts,tsx}'],
    languageOptions: {
      parser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'max-len': ['error', {
        code: 120,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      }],
    },
  },

  // React and React Hooks
  {
    files: ['**/*.{jsx,tsx}'],
    plugins: {
      '@typescript-eslint': tseslint,
      react: pluginReact,
      'react-hooks': pluginReactHooks,
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
    settings: { react: { version: 'detect' } },
  },

  // Ignore
  {
    ignores: ['eslint.config.js', 'node_modules/', 'dist/', '.vscode/', '.idea/', 'build/', 'scripts/'],
  },
]);
