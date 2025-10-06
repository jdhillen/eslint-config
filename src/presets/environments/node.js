import globals from 'globals';

/**
 * Node.js environment configuration
 * Adds Node.js global variables (process, __dirname, require, etc.)
 * ECMAScript 2025 (ES2025) support
 */
export default {
  languageOptions: {
    ecmaVersion: 2025,
    sourceType: 'module',
    globals: {
      ...globals.node
    }
  },
  rules: {
    // Node.js-specific rule adjustments
    'no-console': 'off', // Console is normal in Node.js
    '@typescript-eslint/no-var-requires': 'off' // Allow require() in .js files
  }
};
