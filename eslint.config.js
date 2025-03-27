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
    rules: {
      quotes: ['error', 'single'],
      'prettier/prettier': 'error',
      'object-curly-newline': [
        'error',
        {
          ObjectExpression: { multiline: true, minProperties: 1 },
          ObjectPattern: { multiline: true, minProperties: 1 },
          ImportDeclaration: { multiline: true, minProperties: 1 },
          ExportDeclaration: { multiline: true, minProperties: 1 },
        },
      ],
      'object-property-newline': ['error', { allowAllPropertiesOnSameLine: false }],
      'array-element-newline': ['error', 'consistent'],
    },
  },
  pluginJs.configs.recommended,
];
