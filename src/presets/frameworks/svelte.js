import svelte from 'eslint-plugin-svelte';
import svelteParser from 'svelte-eslint-parser';
import tseslint from 'typescript-eslint';

/**
 * Svelte.js framework configuration
 * Comprehensive rules for Svelte 5 (runes, snippets) and SvelteKit projects
 *
 * Rules organized by category:
 * - Core Svelte best practices
 * - Accessibility (a11y)
 * - Performance
 * - Code style and formatting
 */
export default function createSveltePreset() {
  return [
    ...svelte.configs['flat/recommended'],
    {
      files: ['**/*.svelte'],
      languageOptions: {
        parser: svelteParser,
        parserOptions: {
          parser: tseslint.parser,
          extraFileExtensions: ['.svelte']
        }
      },
      rules: {
        // Core Svelte Best Practices (9 rules)
        'svelte/no-at-html-tags': 'error',
        'svelte/no-target-blank': 'error',
        'svelte/no-reactive-reassign': 'error',
        'svelte/require-store-reactive-access': 'error',
        'svelte/valid-compile': 'error',
        'svelte/no-unused-svelte-ignore': 'error',
        'svelte/no-useless-mustaches': 'error',
        'svelte/prefer-destructuring': 'error',
        'svelte/require-optimized-style-attribute': 'error',

        // Accessibility (8 rules)
        'svelte/a11y-aria-attributes': 'error',
        'svelte/a11y-click-events-have-key-events': 'error',
        'svelte/a11y-no-noninteractive-tabindex': 'error',
        'svelte/a11y-positive-tabindex': 'error',
        'svelte/a11y-role-has-required-aria-props': 'error',
        'svelte/a11y-no-static-element-interactions': 'warn',
        'svelte/a11y-img-redundant-alt': 'warn',
        'svelte/a11y-label-has-associated-control': 'warn',

        // Svelte 5 (runes mode) - 4 rules
        'svelte/block-lang': ['error', {
          script: 'ts',
          style: null
        }],
        'svelte/no-dom-manipulating': 'error',
        'svelte/no-export-load-in-svelte-module-in-kit-pages': 'error',
        'svelte/no-store-async': 'error',

        // Code Style (6 rules)
        'svelte/shorthand-attribute': 'error',
        'svelte/shorthand-directive': 'error',
        'svelte/no-spaces-around-equal-signs-in-attribute': 'error',
        'svelte/html-quotes': ['error', {
          prefer: 'double'
        }],
        'svelte/indent': ['error', {
          indent: 2,
          alignAttributesVertically: true
        }],
        'svelte/first-attribute-linebreak': ['error', {
          multiline: 'below',
          singleline: 'beside'
        }]
      }
    }
  ];
}
