import globals from 'globals';

/**
 * Universal environment configuration
 * Combines both browser and Node.js globals for fullstack apps
 * Useful for: Astro, Electron, fullstack monorepos
 * ECMAScript 2025 (ES2025) support
 */
export default {
  languageOptions: {
    ecmaVersion: 2025,
    sourceType: 'module',
    globals: {
      ...globals.browser,
      ...globals.node
    }
  }
};
