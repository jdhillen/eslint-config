# Examples

This directory contains working examples for all 8 supported frameworks showing zero-configuration usage of `@jdhillen/eslint-config`.

## Available Examples

| Example | Framework | TypeScript | Environment | Description |
|---------|-----------|------------|-------------|-------------|
| [react-app](./react-app) | React 18 | ✅ | browser | Modern React with hooks and TypeScript |
| [vue-app](./vue-app) | Vue 3 | ❌ | browser | Composition API with `<script setup>` |
| [svelte-app](./svelte-app) | Svelte 5 | ❌ | browser | Runes mode with $state |
| [solid-app](./solid-app) | Solid.js | ✅ | browser | Reactive signals and JSX |
| [astro-app](./astro-app) | Astro | ✅ | universal | Island architecture |
| [angular-app](./angular-app) | Angular 19 | ✅ | browser | Standalone components |
| [vanilla-js](./vanilla-js) | None | ❌ | browser | Modern JavaScript (ES2025) |
| [node-backend](./node-backend) | Express | ✅ | node | REST API server |

## Quick Start

Each example follows the same structure:

```bash
cd examples/[framework-name]
npm install
npm run lint
```

## Zero Configuration

All examples use the same minimal configuration:

```javascript
import createConfig from '@jdhillen/eslint-config';

export default await createConfig();
```

No options needed - the config automatically detects:
- Framework (from dependencies)
- Environment (browser, node, or universal)
- TypeScript (from tsconfig.json)

## Example Structure

```
framework-name/
├── package.json         # Minimal dependencies
├── eslint.config.js     # Zero-config setup
├── tsconfig.json        # (if TypeScript)
├── src/                 # Sample code
└── README.md            # Framework-specific details
```

## Testing Locally

To test with local changes to the config:

```bash
# In project root
npm install

# In any example
cd examples/react-app
npm install  # Links to local config via file:../..
npm run lint
```

## Adding a New Example

1. Create directory: `examples/new-framework/`
2. Add `package.json` with framework dependency
3. Add `eslint.config.js` with zero-config export
4. Add sample source file demonstrating framework features
5. Add `README.md` documenting auto-detection
6. Add example to this table

## Notes

- All examples use ES modules (`"type": "module"`)
- TypeScript examples use modern tsconfig settings
- Each README explains what gets auto-detected and why
- Examples demonstrate real-world patterns for each framework
