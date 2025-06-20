import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks"; // Import the hooks plugin separately
import { defineConfig } from "eslint/config";

export default defineConfig([
  // Base configuration for all relevant files
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      ecmaFeatures: { jsx: true },
      globals: { ...globals.browser, ...globals.node },
    },
    // No 'plugins' section here for @typescript-eslint or react,
    // as their configs will handle that.
    rules: {
      // General best practices
      "no-console": "warn",
      "prefer-const": "error",
      "no-var": "error",
      "eol-last": ["error", "always"],
    },
  },

  // ESLint core recommended rules
  {
    files: ["**/*.{js,mjs,cjs,jsx}"], // Apply to JS/JSX files
    ...js.configs.recommended, // Spreads rules from @eslint/js recommended
  },

  // TypeScript specific configuration
  {
    files: ["**/*.{ts,mts,cts,tsx}"], // Apply to TS/TSX files
    // The tseslint.configs will set up the parser and plugin correctly
    ...tseslint.configs.recommended, // Includes @typescript-eslint plugin and recommended rules
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json", // Essential for type-aware rules
      },
    },
    rules: {
      // Common TypeScript rules (overrides or additions)
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },

  // React specific configuration
  {
    files: ["**/*.{jsx,tsx}"], // Apply to JSX/TSX files
    ...pluginReact.configs.flat.recommended, // Includes react plugin and recommended rules
    plugins: {
      "react-hooks": pluginReactHooks, // Manually add react-hooks plugin if not bundled with pluginReact
    },
    rules: {
      // React-specific rules (overrides or additions)
      "react/react-in-jsx-scope": "off", // Not needed with new JSX transform
      "react/prop-types": "off", // Using TS for prop types
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
    settings: {
      react: {
        version: "detect", // Automatically detect React version
      },
    },
  },
  {
    // Ignore files (similar to .eslintignore)
    ignores: ["node_modules/", "dist/", ".vscode/", ".idea/", "build/"],
  },
]);
