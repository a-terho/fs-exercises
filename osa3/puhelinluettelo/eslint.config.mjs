import globals from 'globals';
import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';

export default [
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: { ...globals.node },
      ecmaVersion: 'latest',
    },
    plugins: {
      '@stylistic/js': stylistic,
    },
    rules: {
      '@stylistic/js/indent': ['error', 2],
      '@stylistic/js/linebreak-style': ['error', 'unix'],
      '@stylistic/js/quotes': ['error', 'single'],
      eqeqeq: 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': ['error', { before: true, after: true }],
      'no-unused-vars': [
        'error',
        { args: 'all', argsIgnorePattern: 'err|req|res|^_' },
      ],
    },
  },
  {
    ignores: ['dist/**'],
  },
];
