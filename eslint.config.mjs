import js from "@eslint/js";
import prettier from "eslint-config-prettier/flat";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";

export default [
  { ignores: ["build/", "coverage/", "public/"] },
  js.configs.recommended,
  react.configs.flat.recommended,
  { settings: { react: { version: "detect" } } },
  {
    files: ["src/**/*.js"],
    languageOptions: {
      // Source files are .js but contain JSX.
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: globals.browser,
    },
    plugins: { "react-hooks": reactHooks },
    rules: {
      // Match the CRA react-app config this replaces.
      "no-unused-vars": ["warn", { args: "none", ignoreRestSiblings: true }],
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "react/no-unescaped-entities": "off",
    },
  },
  {
    files: [
      "src/**/*.test.js",
      "src/**/__tests__/**",
      "src/setupTests.js",
      "src/mocks/**",
    ],
    languageOptions: { globals: { ...globals.node, ...globals.vitest } },
  },
  {
    files: ["*.config.{js,mjs}"],
    languageOptions: { globals: globals.node },
  },
  prettier,
];
