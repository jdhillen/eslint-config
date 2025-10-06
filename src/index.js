import { fixupPluginRules } from '@eslint/compat';
import js from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import vuePlugin from 'eslint-plugin-vue';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/**
 * Create an ESLint flat config
 * @param {Object} options - Configuration options
 * @param {string[]} [options.ignorePaths] - Additional paths to ignore during linting
 * @returns {Array} ESLint flat config
 */
export default function createConfig(options = {}) {
  // Default folders to ignore
  const defaultIgnorePaths = ['**/node_modules/**', '**/dist/**', '**/build/**'];

  // Combine default ignore paths with user-provided paths
  const { ignorePaths = [] } = options;
  const allIgnorePaths = [...defaultIgnorePaths, ...ignorePaths];

  return [
    // Ignore paths first
    {
      ignores: allIgnorePaths
    },

    // ESLint recommended rules
    js.configs.recommended,

    // TypeScript ESLint recommended configuration (flat config compatible)
    ...tseslint.configs.recommended,

    // Vue recommended configuration (flat config)
    ...vuePlugin.configs['flat/recommended'],

    // Custom configuration for all files
    {
      files: ['**/*.js', '**/*.ts', '**/*.tsx', '**/*.vue'],
      languageOptions: {
        ecmaVersion: 2023,
        sourceType: 'module',
        globals: {
          ...globals.browser
        }
      },
      plugins: {
        // Use compatibility wrapper for eslint-plugin-import (not fully flat config compatible)
        import: fixupPluginRules(importPlugin)
      },
      rules: {
        /* eslint-disable @typescript-eslint/naming-convention */
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
        // TYPESCRIPT RULES
        // TypeScript-specific linting and type safety
        // Documentation: https://typescript-eslint.io/rules/
        // ============================================================

        // Type safety
        '@typescript-eslint/no-explicit-any': 'warn', // Warn on any usage (allow when necessary)
        // Note: Type-checked rules (no-unsafe-*) require TypeScript project configuration
        // They are disabled here but available in recommended-type-checked preset

        // Type annotations
        '@typescript-eslint/explicit-function-return-type': 'off', // Too strict - TS can infer return types
        '@typescript-eslint/explicit-module-boundary-types': 'off', // Too strict - TS can infer exports
        '@typescript-eslint/typedef': [
          'error',
          {
            arrayDestructuring: false,
            arrowParameter: false,
            memberVariableDeclaration: false,
            objectDestructuring: false,
            parameter: false,
            propertyDeclaration: true, // Require type annotations on class properties
            variableDeclaration: false,
            variableDeclarationIgnoreFunction: true
          }
        ], // Require type annotations in specific places

        // Best practices
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            argsIgnorePattern: '^_', // Allow unused args prefixed with _
            varsIgnorePattern: '^_' // Allow unused vars prefixed with _
          }
        ],
        // Note: Type-checked rules disabled (require tsconfig.json):
        // - @typescript-eslint/no-floating-promises
        // - @typescript-eslint/await-thenable
        // - @typescript-eslint/no-misused-promises
        // - @typescript-eslint/prefer-nullish-coalescing
        // - @typescript-eslint/prefer-readonly
        // - @typescript-eslint/prefer-optional-chain
        // - @typescript-eslint/prefer-includes
        // - @typescript-eslint/prefer-string-starts-ends-with
        // For these rules, use recommended-type-checked preset with languageOptions.parserOptions.project
        '@typescript-eslint/prefer-for-of': 'error', // Prefer for-of over standard for loop with index
        '@typescript-eslint/no-non-null-assertion': 'warn', // Warn on non-null assertions (! operator)

        // Consistency
        '@typescript-eslint/consistent-type-definitions': ['error', 'interface'], // Prefer interface over type alias
        '@typescript-eslint/consistent-type-imports': [
          'error',
          {
            prefer: 'type-imports', // Use import type for type-only imports
            disallowTypeAnnotations: false
          }
        ],

        // ============================================================
        // NAMING CONVENTIONS
        // Enforce consistent naming patterns across the codebase
        // Documentation: https://typescript-eslint.io/rules/naming-convention/
        //
        // Patterns enforced:
        // - camelCase: variables, functions, methods, parameters
        // - PascalCase: classes, interfaces, types, enums
        // - UPPER_CASE: constants and enum members
        // - is/has/should/can prefix: boolean variables
        // - underscore prefix: private members, unused parameters
        // ============================================================

        '@typescript-eslint/naming-convention': [
          'error',
          // Default: camelCase for most identifiers
          {
            selector: 'default',
            format: ['camelCase'],
            leadingUnderscore: 'allow',
            trailingUnderscore: 'forbid'
          },
          // Variables: camelCase or UPPER_CASE for constants
          {
            selector: 'variable',
            format: ['camelCase', 'UPPER_CASE', 'PascalCase'], // PascalCase for Vue components
            leadingUnderscore: 'allow'
          },
          // Functions and methods: camelCase
          {
            selector: ['function', 'method'],
            format: ['camelCase']
          },
          // Classes, interfaces, types, enums: PascalCase
          {
            selector: 'typeLike',
            format: ['PascalCase']
          },
          // Type parameters: PascalCase with T prefix
          {
            selector: 'typeParameter',
            format: ['PascalCase'],
            prefix: ['T']
          },
          // Enum members: PascalCase or UPPER_CASE
          {
            selector: 'enumMember',
            format: ['PascalCase', 'UPPER_CASE']
          },
          // Object properties: allow camelCase or PascalCase (for Vue props, API responses)
          {
            selector: 'property',
            format: ['camelCase', 'PascalCase'],
            leadingUnderscore: 'allow',
            filter: {
              // Allow properties with special characters (ESLint rule names)
              regex: '^(@|no-|prefer-|max-|vue/|import/|spaced-).*$',
              match: false
            }
          },
          // Note: Boolean variable prefix rule disabled (requires type information)
          // Recommended pattern: prefix boolean variables with is/has/should/can/did/will
          // Private class members: require underscore prefix
          {
            selector: 'memberLike',
            modifiers: ['private'],
            format: ['camelCase'],
            leadingUnderscore: 'require'
          },
          // Unused parameters: require underscore prefix
          {
            selector: 'parameter',
            modifiers: ['unused'],
            format: ['camelCase'],
            leadingUnderscore: 'require'
          }
        ],

        // ============================================================
        // VUE.JS RULES
        // Vue 3 best practices and conventions
        // Documentation: https://eslint.vuejs.org/rules/
        // ============================================================

        // Component naming
        'vue/component-name-in-template-casing': ['error', 'PascalCase'], // Use PascalCase for components in templates
        'vue/multi-word-component-names': 'off', // Allow single-word component names (too strict)
        'vue/component-definition-name-casing': ['error', 'PascalCase'], // Use PascalCase for component definitions

        // Template best practices
        'vue/html-self-closing': [
          'error',
          {
            html: {
              void: 'always',
              normal: 'always',
              component: 'always'
            }
          }
        ], // Always use self-closing tags for consistency
        'vue/max-attributes-per-line': [
          'error',
          {
            singleline: 3,
            multiline: 1
          }
        ], // Limit attributes per line for readability
        'vue/first-attribute-linebreak': [
          'error',
          {
            singleline: 'ignore',
            multiline: 'below'
          }
        ], // Enforce consistent attribute line breaks
        'vue/html-closing-bracket-newline': [
          'error',
          {
            singleline: 'never',
            multiline: 'always'
          }
        ], // Enforce consistent closing bracket placement

        // Vue 3 Composition API
        'vue/no-deprecated-v-on-native-modifier': 'error', // No .native modifier in Vue 3
        'vue/no-deprecated-slot-attribute': 'error', // Use v-slot instead of slot attribute
        'vue/require-explicit-emits': 'error', // Require emits to be declared
        'vue/no-setup-props-reactivity-loss': 'error', // Don't lose reactivity when using props
        'vue/component-api-style': ['error', ['script-setup']], // Prefer <script setup> syntax
        'vue/define-macros-order': [
          'error',
          {
            order: ['defineProps', 'defineEmits']
          }
        ], // Enforce consistent order of compiler macros
        'vue/define-emits-declaration': ['error', 'type-based'], // Use type-based emits declarations

        // Directives
        'vue/no-v-html': 'warn', // Warn about v-html (XSS risk)
        'vue/v-on-event-hyphenation': ['error', 'always'], // Use kebab-case for event names
        'vue/v-bind-style': ['error', 'shorthand'], // Use : instead of v-bind:
        'vue/v-on-style': ['error', 'shorthand'], // Use @ instead of v-on:

        // Attributes
        'vue/attribute-hyphenation': ['error', 'always'], // Use kebab-case for attributes in templates
        'vue/prop-name-casing': ['error', 'camelCase'], // Use camelCase for props in script

        // Order and organization
        'vue/order-in-components': [
          'error',
          {
            order: [
              'el',
              'name',
              'parent',
              'functional',
              ['delimiters', 'comments'],
              ['components', 'directives', 'filters'],
              'extends',
              'mixins',
              'inheritAttrs',
              'model',
              ['props', 'propsData'],
              'data',
              'computed',
              'watch',
              'LIFECYCLE_HOOKS',
              'methods',
              ['template', 'render'],
              'renderError'
            ]
          }
        ], // Enforce consistent component option order

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
        'import/first': 'error', // Imports must be at the top of the file

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
        /* eslint-enable @typescript-eslint/naming-convention */
      }
    },

    // Vue-specific parser configuration
    {
      files: ['**/*.vue'],
      languageOptions: {
        parserOptions: {
          parser: tseslint.parser,
          extraFileExtensions: ['.vue']
        }
      }
    },

    // Override for declaration files
    {
      files: ['**/*.d.ts'],
      rules: {
        /* eslint-disable @typescript-eslint/naming-convention */
        '@typescript-eslint/no-explicit-any': 'off'
        /* eslint-enable @typescript-eslint/naming-convention */
      }
    },

    // Override for JavaScript files
    {
      files: ['**/*.js'],
      rules: {
        /* eslint-disable @typescript-eslint/naming-convention */
        '@typescript-eslint/no-var-requires': 'off'
        /* eslint-enable @typescript-eslint/naming-convention */
      }
    },

    // Override for Node.js scripts (bin, scripts directories, etc.)
    {
      files: ['**/bin/**/*.js', '**/scripts/**/*.js'],
      languageOptions: {
        globals: {
          ...globals.node
        }
      },
      rules: {
        /* eslint-disable @typescript-eslint/naming-convention */
        'no-console': 'off',
        'max-lines-per-function': 'off' // Allow long setup scripts
        /* eslint-enable @typescript-eslint/naming-convention */
      }
    }
  ];
}
