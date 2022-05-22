module.exports = {
    env: {
        browser: true,
        node: true,
        es2021: true,
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
        'prettier',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
    },
    plugins: [
        'react',
        '@typescript-eslint',
    ],
    rules: {
        'eol-last': 0,
        'indent': 0,
        'quote-props': 0,
        'linebreak-style': 0,
        'no-console': 0,
        'quotes': 0,
        'space-before-function-paren': 0,
        'operator-linebreak': 0,
        'import/prefer-default-export': 0,
        'no-nested-ternary': 0,
        'no-underscore-dangle': 0,
    },
};