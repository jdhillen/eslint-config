/**
 * Angular configuration (basic TypeScript linting)
 *
 * Note: This provides basic TypeScript linting for Angular projects.
 * For Angular-specific template and component rules, install:
 * @angular-eslint/eslint-plugin
 *
 * See: https://github.com/angular-eslint/angular-eslint
 */
export default function createAngularPreset() {
  return [
    {
      files: ['**/*.ts'],
      rules: {
        // ============================================================
        // ANGULAR-FRIENDLY TYPESCRIPT RULES
        // Basic rules that work well with Angular patterns
        // ============================================================

        // Angular uses decorators extensively
        '@typescript-eslint/no-extraneous-class': 'off',

        // Angular components often have empty constructors for DI
        '@typescript-eslint/no-empty-function': ['error', {
          allow: ['constructors']
        }],

        // Angular uses ! for definite assignment (properties set by Angular)
        '@typescript-eslint/no-non-null-assertion': 'warn',

        // Angular services and components use 'any' in some cases
        '@typescript-eslint/no-explicit-any': 'warn',

        // Parameter properties are common in Angular (constructor(private foo: Foo))
        '@typescript-eslint/parameter-properties': 'off',
        '@typescript-eslint/explicit-member-accessibility': 'off',

        // Angular uses both interfaces and types
        '@typescript-eslint/consistent-type-definitions': 'off',

        // Naming conventions for Angular
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: 'default',
            format: ['camelCase'],
            leadingUnderscore: 'allow',
            trailingUnderscore: 'allow'
          },
          {
            selector: 'variable',
            format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
            leadingUnderscore: 'allow'
          },
          {
            selector: 'typeLike',
            format: ['PascalCase']
          },
          {
            selector: 'enumMember',
            format: ['PascalCase', 'UPPER_CASE']
          },
          {
            selector: 'property',
            format: null // Allow any format for properties (Angular templates use various patterns)
          }
        ]
      }
    }
  ];
}
