# @jdhillen/eslint-config

ESLint configuration for Vue.js and TypeScript projects with industry-standard rules for clean code.

## Features

- Vue.js 3 support with [eslint-plugin-vue](https://eslint.vuejs.org/)
- TypeScript support with [@typescript-eslint](https://typescript-eslint.io/)
- Import ordering rules with [eslint-plugin-import](https://github.com/import-js/eslint-plugin-import)
- Best practices for JavaScript and TypeScript
- PascalCase component naming in templates
- Sensible defaults for Vue component structure
- Auto-excludes common directories (node_modules, dist, build) with configurable additional exclusions
- Lints all JavaScript, TypeScript, and Vue files including in the project root

## Installation

```bash
npm install --save-dev @jdhillen/eslint-config
```

With npm v7+ peer dependencies (eslint, typescript) are automatically installed. For yarn or pnpm, or if you want to install specific versions:

```bash
# npm with specific versions
npm install --save-dev @jdhillen/eslint-config eslint@^9 typescript@^5

# yarn
yarn add --dev @jdhillen/eslint-config

# pnpm
pnpm add --save-dev @jdhillen/eslint-config
```

## Usage

### Automatic Setup

After installing, you can use the setup script to automatically configure ESLint in your project:

```bash
npx setup-eslint-config
```

This will:

1. Create an `eslint.config.js` file in your project root
2. Add lint scripts to your package.json

### Manual Configuration

If you prefer to set up manually, create an `eslint.config.js` file in the root of your project:

```js
// eslint.config.js
import createConfig from '@jdhillen/eslint-config';

// Create config with optional additional folder exclusions
// Note: node_modules, dist, and build are already ignored by default
const config = createConfig({
  ignorePaths: [
    // Add additional paths to ignore here, for example:
    '**/coverage/**',
    '**/temp/**',
    '**/logs/**'
  ]
});

export default [
  ...config,
  // You can add your own rules or overrides here
  {
    // Example: Override rules for specific file patterns
    files: ['**/tests/**/*.js'],
    rules: {
      'no-console': 'off'
    }
  }
];
```

For older ESLint versions (< 9.0.0), you'll need to use the legacy version of this package, as ESLint v9+ uses the new flat config system.

### VSCode Integration

For a better development experience, install the [ESLint VSCode extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).

Add the following to your VSCode settings:

```json
{
  "editor.formatOnSave": false,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "eslint.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact", "vue"],
  "eslint.experimental.useFlatConfig": true
}
```

## License

MIT
