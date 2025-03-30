import globals from 'globals';
import pluginJs from '@eslint/js';
import prettier from 'eslint-plugin-prettier';

export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: globals.browser,
    },
    plugins: {
      prettier: prettier,
    },
    extends: ['eslint:recommended', 'plugin:prettier/recommended'],
    rules: {
      'newline-per-chained-call': ['error', { ignoreChainWithDepth: 2 }],
      quotes: ['error', 'single'],
      'prettier/prettier': 'error',
      'object-curly-newline': [
        'error',
        {
          ObjectExpression: { multiline: true, minProperties: 1 },
          ObjectPattern: { multiline: true, minProperties: 1 },
          ImportDeclaration: 'never',
          ExportDeclaration: 'never',
        },
      ],
      'object-property-newline': ['error'],
      'array-element-newline': ['error', 'consistent'],
    },
  },
  pluginJs.configs.recommended,
];
