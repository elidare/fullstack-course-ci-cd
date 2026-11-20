import js from '@eslint/js'
import globals from 'globals'
import { defineConfig } from 'eslint/config'
import stylistic from '@stylistic/eslint-plugin'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default defineConfig([
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      'coverage/**',
    ],
  },
  js.configs.recommended,
  // CommonJS backend (Express) and backend tests
  {
    files: [
      'app.js',
      'index.js',
      'mongo.js',
      'controllers/**/*.js',
      'models/**/*.js',
      'utils/**/*.js',
      'tests/**/*.js',
    ],
    languageOptions: {
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
      },
    },
  },
  // Vite frontend (ES modules + browser)
  {
    files: ['frontend/**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,

      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
  // Vite tests
  {
    files: ['frontend/**/*.{test,spec}.{js,jsx}'],
    languageOptions: {
      globals: {
        ...globals.vitest,
      },
    },
  },
  // Playwright (Node.js + ES modules or CommonJS)
  {
    files: ['e2e/**/*.{js,jsx,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        ...globals.node,
      },
    },
  },
  // CommonJS configuration files
  {
    files: ['**/*.cjs'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
      },
    },
  },
  // ES module configuration files
  {
    files: ['**/*.mjs'],
    languageOptions: {
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },
  },
  // Shared rules
  {
    files: ['**/*.{js,jsx,mjs,cjs}'],
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'no-console': 'off',
      eqeqeq: 'error',

      '@stylistic/indent': ['error', 2],
      '@stylistic/linebreak-style': ['error', 'unix'],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/arrow-spacing': [
        'error',
        { before: true, after: true },
      ],

      'no-trailing-spaces': 'error',
    },
  },
])
