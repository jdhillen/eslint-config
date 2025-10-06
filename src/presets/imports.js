import { fixupPluginRules } from '@eslint/compat';
import importPlugin from 'eslint-plugin-import';

/**
 * Import/export rules configuration
 * Uses @eslint/compat for flat config compatibility
 */
export default {
  plugins: {
    import: fixupPluginRules(importPlugin)
  },
  rules: {
    // ============================================================
    // IMPORT/MODULE RULES
    // Module import/export best practices
    // Documentation: https://github.com/import-js/eslint-plugin-import
    // ============================================================

    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true
        }
      }
    ], // Enforce consistent import order with alphabetization
    'import/no-duplicates': 'error', // Prevent duplicate imports from same module
    'import/no-unresolved': 'off', // TypeScript handles this better
    'import/named': 'off', // TypeScript handles this better
    'import/namespace': 'off', // TypeScript handles this better
    'import/default': 'off', // TypeScript handles this better
    'import/no-named-as-default': 'warn', // Warn on potentially confusing imports
    'import/no-named-as-default-member': 'warn', // Warn on confusing member access
    'import/newline-after-import': 'error', // Require blank line after imports
    'import/no-webpack-loader-syntax': 'error', // No webpack loader syntax in imports
    'import/first': 'error' // Imports must be at the top of the file
  }
};
