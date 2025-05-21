// eslint.config.js
import js from '@eslint/js';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsParser,
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    plugins: {
      "@typescript-eslint": ts
    },
    rules: {
      "semi": ["error", "always"],
      "@typescript-eslint/no-unused-vars": "error", // Оставляем только это
      "no-unused-vars": "off" // Отключаем дублирующее правило
    }
  }
];