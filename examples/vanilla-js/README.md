# Vanilla JavaScript Example

This example demonstrates ESLint configuration for a plain JavaScript project (no framework).

## Auto-Detection

The config automatically detects:
- ✅ Framework: **vanilla** (no framework dependencies found)
- ✅ Environment: **browser** (default when no environment detected)
- ✅ TypeScript: **No** (no tsconfig.json)

## Setup

```bash
npm install
npm run lint
```

## Features

- Modern JavaScript (ES2020+)
- ESLint with base JavaScript rules
- Classes, arrow functions, destructuring, spread operators
- Zero configuration required

## Use Case

This configuration is automatically used as a fallback when:
- No framework dependency is found in package.json
- Project uses plain JavaScript without React, Vue, Svelte, etc.
- Building vanilla JS libraries or simple web applications
