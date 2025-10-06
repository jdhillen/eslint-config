/**
 * Node.js backend configuration
 * Conservative rules for Node.js/Express/Fastify backend services
 */
export default function createNodePreset() {
  return [
    {
      files: ['**/*.js', '**/*.ts', '**/*.mjs'],
      rules: {
        // ============================================================
        // NODE.JS BACKEND RULES
        // Best practices for server-side JavaScript/TypeScript
        // ============================================================

        // Console usage is normal in Node.js
        'no-console': 'off',

        // Process and __dirname are standard in Node
        'no-process-env': 'off',
        'no-process-exit': 'warn',

        // Async patterns
        'no-async-promise-executor': 'error',
        'require-atomic-updates': 'error',

        // Error handling
        'no-throw-literal': 'error',
        'prefer-promise-reject-errors': 'error',

        // Node.js specific
        'callback-return': 'off', // Modern Node uses async/await
        'handle-callback-err': 'off', // Modern Node uses async/await
        'no-mixed-requires': 'off', // ES modules don't have this issue
        'no-new-require': 'error',
        'no-path-concat': 'error', // Use path.join() instead

        // Security
        'no-eval': 'error',
        'no-implied-eval': 'error',
        'no-new-func': 'error',

        // Best practices for backend
        'no-unused-vars': ['error', {
          args: 'after-used',
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_'
        }],

        // Allow both require and import
        '@typescript-eslint/no-var-requires': 'off'
      }
    }
  ];
}
