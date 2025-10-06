import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

/**
 * React configuration (conservative)
 * Includes React + React Hooks plugins with essential rules
 */
export default function createReactPreset() {
  return [
    // React recommended configuration
    {
      files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
      ...react.configs.flat.recommended,
      ...react.configs.flat['jsx-runtime'] // Disable React-in-scope for React 17+
    },

    // React Hooks rules
    {
      files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
      plugins: {
        'react-hooks': reactHooks
      },
      rules: reactHooks.configs.recommended.rules
    },

    // Custom opinionated React rules
    {
      files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
      settings: {
        react: {
          version: 'detect' // Automatically detect React version
        }
      },
      rules: {
        // ============================================================
        // REACT RULES (Conservative - Essential Only)
        // React best practices for modern React 17+
        // Documentation: https://github.com/jsx-eslint/eslint-plugin-react
        // ============================================================

        // Modern React (17+) adjustments
        'react/react-in-jsx-scope': 'off', // Not needed in React 17+ with new JSX transform
        'react/jsx-uses-react': 'off', // Not needed in React 17+ with new JSX transform

        // TypeScript integration
        'react/prop-types': 'off', // TypeScript handles prop validation

        // JSX best practices
        'react/jsx-uses-vars': 'error', // Prevent variables used in JSX being marked as unused
        'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }], // Use strings when possible: prop="value" not prop={"value"}
        'react/self-closing-comp': 'error', // Use <Component /> instead of <Component></Component>
        'react/jsx-boolean-value': ['error', 'never'], // Use prop instead of prop={true}
        'react/jsx-fragments': ['error', 'syntax'], // Use <> instead of <Fragment>
        'react/jsx-no-useless-fragment': 'error', // Disallow unnecessary fragments

        // Component definition
        'react/function-component-definition': [
          'error',
          {
            namedComponents: 'arrow-function', // const Component = () => ...
            unnamedComponents: 'arrow-function'
          }
        ],

        // Hooks (enforced by react-hooks plugin)
        // - react-hooks/rules-of-hooks: error
        // - react-hooks/exhaustive-deps: warn

        // Best practices
        'react/no-array-index-key': 'warn', // Warn when using array index as key (can cause issues)
        'react/jsx-key': 'error', // Require key prop in iterators
        'react/no-children-prop': 'error', // Prevent passing children as props
        'react/no-danger': 'warn', // Warn on dangerouslySetInnerHTML (XSS risk)
        'react/no-deprecated': 'error', // Prevent usage of deprecated methods
        'react/no-unknown-property': 'error' // Prevent usage of unknown DOM properties
      }
    }
  ];
}
