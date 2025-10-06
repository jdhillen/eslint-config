import solid from 'eslint-plugin-solid/configs/typescript';

/**
 * Solid.js framework configuration
 * Conservative rules for Solid reactive primitives and JSX
 *
 * Rules organized by category:
 * - Reactive primitives (signals, effects, memos)
 * - JSX best practices
 * - Component patterns
 */
export default function createSolidPreset() {
  return [
    {
      files: ['**/*.jsx', '**/*.tsx'],
      ...solid,
      rules: {
        ...solid.rules,

        // Reactive Primitives (7 rules)
        'solid/reactivity': 'error',                    // Enforce reactive dependencies
        'solid/no-destructure': 'error',                // Don't destructure props (loses reactivity)
        'solid/prefer-for': 'error',                    // Use <For> over .map()
        'solid/no-innerhtml': ['error', { allowStatic: true }], // Prevent XSS
        'solid/event-handlers': ['error', {            // Consistent event handler naming
          ignoreCase: false,
          warnOnSpread: false
        }],
        'solid/jsx-no-undef': 'error',                 // Undefined components
        'solid/jsx-uses-vars': 'error',                // Mark JSX vars as used

        // Component Best Practices (5 rules)
        'solid/components-return-once': 'error',        // Single return per component
        'solid/no-unknown-namespaces': 'error',         // Validate JSX namespaces
        'solid/prefer-show': 'error',                   // Use <Show> over ternary
        'solid/self-closing-comp': 'error',             // Self-close components without children
        'solid/style-prop': ['error', { styleProps: ['style', 'css'] }] // Validate style prop
      }
    }
  ];
}
