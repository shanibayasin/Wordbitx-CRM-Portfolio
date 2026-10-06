import { defineConfig, globalIgnores } from 'eslint/config';
import js from '@eslint/js';
import next from '@next/eslint-plugin-next';
import react from '@eslint-react/eslint-plugin';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  js.configs.recommended,
  ...tseslint.configs.recommended,
  react.configs['recommended-typescript'],
  reactHooks.configs.flat.recommended,
  next.configs['core-web-vitals'],
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      'preserve-caught-error': 'off',
    },
  },
  globalIgnores([
    '**/.next/**',
    '**/node_modules/**',
    '**/dist/**',
    '**/out/**',
    '**/build/**',
    'next-env.d.ts',
  ]),
]);
