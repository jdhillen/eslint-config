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
        'prefer-const': 'error',
        'no-var': 'error',
        'object-shorthand': 'error',
        'arrow-body-style': ['error', 'as-needed'],
        eqeqeq: ['error', 'always'],

        // TypeScript rules
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_'
          }
        ],
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
