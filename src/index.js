import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import vuePlugin from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';

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
    js.configs.recommended,
    // Include TypeScript ESLint recommended rules manually since
    // tseslint.configs.recommended isn't compatible with flat config
    {
      files: ['**/*.js', '**/*.ts', '**/*.vue'],
      languageOptions: {
        ecmaVersion: 2023,
        sourceType: 'module',
        globals: {
          document: 'readonly',
          navigator: 'readonly',
          window: 'readonly'
        }
      },
      plugins: {
        '@typescript-eslint': tseslint,
        vue: vuePlugin,
        import: importPlugin,
      },
      rules: {
        // General JavaScript rules
        'no-console': ['warn', { allow: ['warn', 'error'] }],
        'no-debugger': 'warn',
        'object-shorthand': 'error',
        'arrow-body-style': ['error', 'as-needed'],
        eqeqeq: ['error', 'always'],
        'prefer-const': 'error',
        'no-var': 'error',
        
        // TypeScript ESLint recommended rules (manually added)
        '@typescript-eslint/ban-ts-comment': 'error',
        '@typescript-eslint/no-array-constructor': 'error',
        '@typescript-eslint/no-duplicate-enum-values': 'error',
        '@typescript-eslint/no-empty-interface': 'error',
        '@typescript-eslint/no-explicit-any': 'warn', // Reduced from error to warn
        '@typescript-eslint/no-extra-non-null-assertion': 'error',
        '@typescript-eslint/no-inferrable-types': 'error',
        '@typescript-eslint/no-misused-new': 'error',
        '@typescript-eslint/no-namespace': 'error',
        '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
        '@typescript-eslint/no-this-alias': 'error',
        '@typescript-eslint/no-unnecessary-type-constraint': 'error',
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_'
          }
        ],
        '@typescript-eslint/prefer-as-const': 'error',
        '@typescript-eslint/prefer-namespace-keyword': 'error',
        '@typescript-eslint/triple-slash-reference': 'error',
        
        // Additional TypeScript rules
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',

        // Vue specific rules
        'vue/component-name-in-template-casing': ['error', 'PascalCase'],
        'vue/html-self-closing': [
          'error',
          {
            html: {
              void: 'always',
              normal: 'always',
              component: 'always'
            }
          }
        ],
        'vue/no-v-html': 'warn',
        'vue/multi-word-component-names': 'off',

        // Import rules
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
        ],
      }
    },

    // TypeScript specific override
    {
      files: ['**/*.ts', '**/*.tsx', '**/*.vue'],
      languageOptions: {
        parser: tsParser
      }
    },

    // Vue specific override
    {
      files: ['**/*.vue'],
      languageOptions: {
        parser: vueParser,
        parserOptions: {
          parser: tsParser,
          extraFileExtensions: ['.vue']
        }
      }
    },

    // Override for declaration files
    {
      files: ['**/*.d.ts'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off'
      }
    },

    // Override for JavaScript files
    {
      files: ['**/*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off'
      }
    },

    // Override for Node.js scripts (bin, scripts directories, etc.)
    {
      files: ['**/bin/**/*.js', '**/scripts/**/*.js'],
      languageOptions: {
        globals: {
          process: 'readonly',
          console: 'readonly',
          module: 'readonly',
          require: 'readonly',
          __dirname: 'readonly',
          __filename: 'readonly'
        }
      },
      rules: {
        'no-console': 'off'
      }
    },

    // Add ignore paths configuration
    {
      ignores: allIgnorePaths
    }
  ];
}
