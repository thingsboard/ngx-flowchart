import base from '../../eslint.config.mjs';

export default [
  ...base,
  {
    files: ["**/*.ts"],
    languageOptions: {
      ecmaVersion: 5,
      sourceType: "script",

      parserOptions: {
        project: ["./tsconfig.lib.json"],
        createDefaultProgram: true,
      },
    }
  }
]
