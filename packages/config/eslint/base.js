import js from "@eslint/js";
import tseslint from "typescript-eslint";

/**
 * Shared flat-config ESLint preset for TypeScript packages.
 * Consume via: `export default [...baseConfig]` in a flat eslint.config.js.
 */
export default tseslint.config(
  {
    ignores: ["**/dist/**", "**/.next/**", "**/.turbo/**", "**/node_modules/**"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },
);
