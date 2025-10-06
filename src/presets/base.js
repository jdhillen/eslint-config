/**
 * Base JavaScript rules that apply to all projects
 * These are framework-agnostic and environment-agnostic
 */
export default {
  rules: {
    // ============================================================
    // MODERN JAVASCRIPT RULES
    // Best practices for ES2015+ code
    // Documentation: https://eslint.org/docs/rules/
    // ============================================================

    // Console and debugging
    'no-console': ['warn', { allow: ['warn', 'error'] }], // Warn on console.log but allow console.warn/error for logging
    'no-debugger': 'warn', // Warn on debugger statements (should be removed before commit)
    'no-alert': 'error', // Disallow alert/confirm/prompt (use proper UI)

    // Modern syntax preferences
    'prefer-const': 'error', // Use const for variables that are never reassigned
    'no-var': 'error', // Use let/const instead of var
    'prefer-arrow-callback': 'error', // Use arrow functions for callbacks
    'prefer-template': 'error', // Use template literals instead of string concatenation
    'prefer-destructuring': [
      'error',
      {
        array: true,
        object: true
      },
      {
        enforceForRenamedProperties: false
      }
    ], // Use destructuring where possible
    'prefer-rest-params': 'error', // Use rest parameters instead of arguments object
    'prefer-spread': 'error', // Use spread operator instead of .apply()
    'object-shorthand': 'error', // Use object shorthand syntax {x} instead of {x: x}
    'arrow-body-style': ['error', 'as-needed'], // Omit braces when possible in arrow functions

    // Code quality
    'eqeqeq': ['error', 'always'], // Always use === and !== instead of == and !=
    'no-duplicate-imports': 'error', // Prevent duplicate imports from same module
    'no-useless-computed-key': 'error', // Disallow unnecessary computed property keys
    'no-useless-constructor': 'error', // Disallow unnecessary constructors
    'no-useless-rename': 'error', // Disallow renaming import/export/destructured assignments to same name
    'no-nested-ternary': 'error', // Disallow nested ternary expressions (hard to read)
    'no-unneeded-ternary': 'error', // Disallow ternary operators when simpler alternatives exist
    'prefer-object-spread': 'error', // Use object spread instead of Object.assign

    // Async/Promise best practices
    'no-return-await': 'error', // Disallow unnecessary return await
    'require-await': 'error', // Disallow async functions that don't use await
    'no-promise-executor-return': 'error', // Disallow returning values from Promise executor functions

    // ============================================================
    // CODE QUALITY & COMPLEXITY
    // Maintainability and readability rules
    // Documentation: https://eslint.org/docs/rules/
    // ============================================================

    // Complexity (warnings to identify areas needing refactoring)
    complexity: ['warn', 15], // Warn on high cyclomatic complexity
    'max-depth': ['warn', 4], // Warn on deeply nested blocks
    'max-lines': ['warn', 500], // Warn on files exceeding 500 lines
    'max-lines-per-function': [
      'warn',
      {
        max: 100,
        skipBlankLines: true,
        skipComments: true
      }
    ], // Warn on functions exceeding 100 lines
    'max-params': ['warn', 4], // Warn on functions with more than 4 parameters

    // Comments
    'spaced-comment': [
      'error',
      'always',
      {
        markers: ['/']
      }
    ] // Require space after // or /*
  }
};
