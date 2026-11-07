import js from "@eslint/js";
import babelParser from "@babel/eslint-parser";

export default [
  {
    ignores: ["node_modules/**", "dist/**", "playwright-report/**", "test-results/**", "blob-report/**", ".playwright-mcp/**"],
  },
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: { plugins: ["@babel/plugin-syntax-typescript"] },
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      "no-undef": "off",
      "no-unused-vars": "off",
    },
  },
  { files: ["**/*.mjs"], rules: js.configs.recommended.rules },
];
