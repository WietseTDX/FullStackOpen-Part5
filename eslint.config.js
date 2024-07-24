import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import stylisticJs from '@stylistic/eslint-plugin-js'

export default [
  {files: ["**/*.{js,mjs,cjs,jsx}"]},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
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
      'eqeqeq': 'error',
      'no-trailing-spaces': 'error',
      'arrow-spacing': [
        'error', { 'before': true, 'after': true },
      ],
      "eol-last": ["error", "always"],
      'react/prop-types': 'off',
      'react/forbid-prop-types': 'off'
    }
  }
];
