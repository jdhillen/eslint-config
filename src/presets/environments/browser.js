import globals from 'globals';

/**
 * Browser environment configuration
 * Adds browser global variables (window, document, etc.)
 * ECMAScript 2025 (ES2025) support
 */
export default {
  languageOptions: {
    ecmaVersion: 2025,
    sourceType: 'module',
    globals: {
      ...globals.browser
    }
  }
};
