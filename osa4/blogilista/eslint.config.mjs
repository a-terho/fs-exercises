import globals from 'globals';
import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';

import { defineConfig } from 'eslint/config';
export default defineConfig([
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: globals.node,
      ecmaVersion: 'latest',
    },
    plugins: { '@stylistic/js': stylistic },
    rules: {
      '@stylistic/js/indent': ['error', 2],
      '@stylistic/js/linebreak-style': ['error', 'unix'],
      '@stylistic/js/quotes': ['error', 'single'],
      eqeqeq: 'error',
      'no-unused-vars': [
        'error',
        { args: 'all', argsIgnorePattern: 'err|req|res|^_' },
      ],
    },
  },
]);
