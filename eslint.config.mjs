import eslintJS from "@eslint/js";
import tsEslint from "typescript-eslint";
import angular from "angular-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.ts"],
    languageOptions: {
      ecmaVersion: 5,
      sourceType: "script",

      parserOptions: {
        project: ["tsconfig.json"],
        createDefaultProgram: true,
      },
    },
    extends: [
      eslintJS.configs.recommended,
      ...tsEslint.configs.recommended,
      ...tsEslint.configs.stylistic,
      ...angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      "@typescript-eslint/explicit-member-accessibility": [
        "off",
        {
          accessibility: "explicit"
        }
      ],
      "arrow-parens": [
        "off",
        "always"
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          prefix: [
            "tb"
          ]
        }
      ],
      "id-blacklist": [
        "error",
        "any",
        "Number",
        "String",
        "string",
        "Boolean",
        "boolean",
        "Undefined",
        "undefined"
      ],
      "import/order": "off",
      "@typescript-eslint/member-ordering": "off",
      "no-underscore-dangle": "off",
      "@typescript-eslint/naming-convention": "off",
      "@typescript-eslint/consistent-indexed-object-style": "off",
      "@typescript-eslint/array-type": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-empty-function": "off",
      "@angular-eslint/prefer-standalone": "off",
      "@angular-eslint/prefer-inject": "off",
      "@angular-eslint/no-empty-lifecycle-method": "off"
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility
    ]
  }
]);
