import vuePlugin from 'eslint-plugin-vue';
import tseslint from 'typescript-eslint';

/**
 * Vue.js 3 configuration
 * Includes Vue plugin and Vue-specific rules
 */
export default function createVuePreset() {
  return [
    // Vue recommended configuration (flat config)
    ...vuePlugin.configs['flat/recommended'],

    // Vue-specific custom rules
    {
      files: ['**/*.vue', '**/*.js', '**/*.ts', '**/*.tsx'],
      rules: {
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
        ] // Enforce consistent component option order
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
    }
  ];
}
