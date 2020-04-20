module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true
    },
    extends: [
        'airbnb',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly'
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 2018,
        sourceType: 'module'
    },
    plugins: [
        'react',
        '@typescript-eslint/eslint-plugin'
    ],
    settings: {
        'import/parsers': {
            '@typescript-eslint/parser': [
                '.js', '.jsx', '.ts', '.tsx'
            ],
        },
        'import/resolver': {
            typescript: {},
            javascript: {}
        }
    },
    rules: {
        //react rules
        'react/jsx-indent': 'off',
        'react/jsx-indent-props': 'off',
        'react/jsx-boolean-value': 'off',
        'react/destructuring-assignment': 'off',
        'react/jsx-closing-tag-location': 'off',
        'react/jsx-one-expression-per-line': 'off',
        'react/jsx-filename-extension': [2, { 
            extensions: ['.js', '.jsx', '.ts', '.tsx'] 
        }],

        //typescript rules
        '@typescript-eslint/indent': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        // 'import/no-extraneous-dependencies': [2, { 
        //     devDependencies: ['**/test.tsx', '**/test.ts'] 
        // }],

        //javascript rules
        'no-unused-vars': 'error',
        'no-console': 'off',
        'func-names': 'off',
        'no-process-exit': 'off',
        'no-underscore-dangle': 'off',
        'object-shorthand': 'off',
        'class-methods-use-this': 'off',
        'spaced-comment': 'off', 
        'indent': 'off',
        'comma-dangle': 'off',
        'no-trailing-spaces': 'warn',
        'max-len': 'warn',
        'keyword-spacing': 'warn',
        'no-param-reassign': 'off',
        'no-plusplus': 'off',
        'no-restricted-globals': 'warn',
        'radix': 'warn',
        'object-curly-newline': 'off',
        'prefer-template': 'warn',
        'lines-between-class-members': 'off',
        'import/extensions': 'off',
        'max-classes-per-file': 'off',
    }, overrides: [{
        files: ['*.ts', '*.tsx'],
        rules: {
            '@typescript-eslint/explicit-function-return-type': ['error']
        }
    }]
}