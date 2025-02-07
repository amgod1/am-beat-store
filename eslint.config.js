import js from "@eslint/js"
import importPlugin from "eslint-plugin-import"
import prettier from "eslint-plugin-prettier"
import react from "eslint-plugin-react"
import reactHooks from "eslint-plugin-react-hooks"
import globals from "globals"
import tseslint from "typescript-eslint"

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      globals: globals.browser,
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
        sourceType: "module",
        ecmaVersion: "latest",
      },
    },
  },
  js.configs.recommended,
  react.configs.recommended,
  reactHooks.configs.recommended,
  tseslint.configs.recommended,
  importPlugin.configs.recommended,
  {
    rules: {
      "import/no-cycle": ["error", { maxDepth: 3, ignoreExternal: true }],
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
    },
  },
  prettier.configs.recommended,
]
