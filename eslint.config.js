import globals from 'globals'
import pluginJs from '@eslint/js'
import pluginReact from 'eslint-plugin-react'
import stylisticJs from '@stylistic/eslint-plugin-js'

export default [
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    settings: { react: { version: '18.2' } },
    languageOptions: {
      globals: globals.browser,  // Define globals for the browser environment
      parserOptions: {
        ecmaVersion: 2020,  // Allows ESLint to parse ES2020 syntax
        sourceType: 'module'  // Allows using ES modules
      }
    },
    plugins: {
      '@stylistic/js': stylisticJs
    },
    rules: {
      'no-console': ['error', { allow: ['warn', 'error'] }],
      '@stylistic/js/indent': [
        'error',
        2
      ],
      '@stylistic/js/linebreak-style': [
        'error',
        'unix'
      ],
      '@stylistic/js/quotes': [
        'error',
        'single'
      ],
      '@stylistic/js/semi': [
        'error',
        'never'
      ],
      'eqeqeq': 'error',
      '@stylistic/js/no-trailing-spaces': 'error',
      '@stylistic/js/object-curly-spacing': [
        'error', 'always'
      ],
      '@stylistic/js/arrow-spacing': [
        'error', { 'before': true, 'after': true }
      ],
      'eol-last': ['error', 'always'],
    }
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
]
