/**
 * TypeScript-specific rules
 * Only included when TypeScript is detected or explicitly enabled
 */
export default {
  rules: {
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
        format: ['camelCase', 'UPPER_CASE', 'PascalCase'], // PascalCase for components
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
      // Object properties: allow camelCase or PascalCase (for API responses, component props)
      {
        selector: 'property',
        format: ['camelCase', 'PascalCase'],
        leadingUnderscore: 'allow',
        filter: {
          // Allow properties with special characters (ESLint rule names, etc.)
          regex: '^(@|no-|prefer-|max-|vue/|import/|spaced-|react/).*$',
          match: false
        }
      },
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
    ]
  }
};
