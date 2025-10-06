# @jdhillen/eslint-config

**Universal ESLint configuration for modern JavaScript and TypeScript projects.**

Works with React, Vue, Svelte, Solid, Astro, Angular, Vanilla JS/TS, and Node.js. Auto-detects your framework and TypeScript - zero configuration required.

## ✨ Features

- **🎯 Zero Configuration** - Auto-detects framework, environment, and TypeScript
- **⚡ Universal** - One package for React, Vue, Svelte, Solid, Astro, Angular, Vanilla JS/TS, and Node.js
- **🚀 Modern** - ESLint 9 flat config with latest best practices
- **📦 Batteries Included** - All plugins bundled, no peer dependency conflicts
- **🎨 Comprehensive** - 140+ carefully chosen rules for code quality
- **🔧 Flexible** - Override any setting when you need to

## 📦 Installation

```bash
npm install --save-dev @jdhillen/eslint-config
```

**That's it!** The package includes ESLint and all plugins.

## 🚀 Quick Start

Run the setup script to create configuration files:

```bash
npx setup-eslint-config
```

This creates:
1. `eslint.config.js` in your project root
2. Lint scripts in your `package.json`

Then run:

```bash
npm run lint        # Check for issues
npm run lint:fix    # Auto-fix issues
```

## 🎭 Supported Frameworks

| Framework | What You Get | Auto-detected From |
|-----------|--------------|-------------------|
| **⚛️ React** | Hooks rules, JSX best practices, React 17+ transform (15 rules) | `react`, `next`, `remix`, `gatsby` |
| **🟢 Vue 3** | Composition API, `<script setup>`, template rules (22 rules) | `vue`, `nuxt` |
| **🟠 Svelte** | Svelte 5 runes, a11y, performance optimizations (27 rules) | `svelte`, `@sveltejs/kit` |
| **🔷 Solid** | Reactive primitives, signals, JSX for Solid (12 rules) | `solid-js` |
| **🚀 Astro** | Component syntax, island architecture, a11y (9 rules) | `astro` |
| **🅰️ Angular** | Base TypeScript rules (use @angular-eslint for Angular-specific) | `@angular/core` |
| **📦 Vanilla** | Modern JS/TS, imports, code quality | No framework detected |
| **🟦 Node.js** | Node globals, console allowed, CommonJS support | `express`, `fastify`, `koa` |

**Simple setup for any framework:**

```javascript
import createConfig from '@jdhillen/eslint-config';

export default await createConfig();  // Auto-detects everything
```

## 🔧 Configuration

### Zero Config (Recommended)

```javascript
import createConfig from '@jdhillen/eslint-config';

export default await createConfig();  // Auto-detects framework, environment, TypeScript
```

### Override Options

```javascript
export default await createConfig({
  framework: 'react',      // Force specific framework
  environment: 'browser',  // 'browser' | 'node' | 'universal'
  typescript: true,        // true | false | 'auto'
  ignorePaths: ['**/coverage/**', '**/temp/**'],
  rules: {
    'no-console': 'off',   // Override any rule
    'max-lines': ['warn', 1000]
  }
});
```

## 🧪 Testing Support

**Built-in Vitest support** - Test files in `/tests` directory automatically get relaxed rules:

```
your-project/
├── src/
│   └── utils.js
└── tests/
    └── utils.test.js    ← Relaxed linting rules
```

**Automatically disabled in test files:**
- `no-console` - Console logging useful for debugging
- `max-lines-per-function` - Test suites can be long
- `complexity` - Test setup can be complex
- `max-statements` - Test setup can have many statements
- `max-nested-callbacks` - describe/it nesting can be deep
- `no-magic-numbers` - Tests use hardcoded data
- `@typescript-eslint/no-explicit-any` - Test mocks use any

**Example test file:**
```javascript
// tests/utils.test.js
import { describe, it, expect } from 'vitest';
import { formatDate } from '../src/utils';

describe('formatDate', () => {
  it('formats date correctly', () => {
    console.log('Testing formatDate'); // ✅ Allowed in tests
    const result = formatDate(new Date(2025, 0, 1));
    expect(result).toBe('2025-01-01');
  });
});
```

## 📚 What Rules Are Enforced?

### Modern JavaScript (20 rules)

- `const` over `let`, never `var`
- Template literals, arrow functions, destructuring
- Spread operator, object shorthand
- `===` instead of `==`
- Async/await best practices
- Built on ES2025 features

### TypeScript (10 rules + Naming)

- Avoid `any` (warns)
- `interface` over `type` for objects
- `import type` for type-only imports
- **Naming:** `camelCase` variables, `PascalCase` classes/types, `UPPER_CASE` constants

### React (15 rules)

- Hooks rules (dependencies, order)
- No React import (React 17+)
- Self-closing components
- Keys in lists

### Vue 3 (22 rules)

- `<script setup>` syntax
- PascalCase components
- No props destructuring
- Shorthand directives (`:` and `@`)

### Svelte (27 rules)

- Svelte 5 runes support
- Accessibility (a11y)
- Reactive store access
- No direct DOM manipulation

### Import/Export (10 rules)

- Consistent order: built-in → external → internal → relative
- Alphabetical within groups
- Newlines between groups

## 🎓 Framework Detection Examples

The config automatically detects your framework from `package.json`:

| Dependencies in package.json | Detected Framework | Config Applied |
|------------------------------|-------------------|----------------|
| `react`, `react-dom` | React | React rules + JSX + Hooks |
| `next` | React | React rules (Next.js uses React) |
| `vue` | Vue.js | Vue 3 rules + template parsing |
| `nuxt` | Vue.js | Vue 3 rules (Nuxt uses Vue) |
| `svelte` | Svelte | Svelte 5 rules + component parsing |
| `@sveltejs/kit` | Svelte | Svelte rules (SvelteKit uses Svelte) |
| `solid-js` | Solid.js | Solid reactivity + JSX rules |
| `astro` | Astro | Astro components + islands + a11y |
| `@angular/core` | Angular | Base rules + @angular-eslint warning |
| `express`, `fastify` | Node.js | Node globals, no browser |
| None of above | Vanilla | Base JS/TS rules only |

## 🆚 vs. Other Configs

- **vs. Airbnb:** Auto-detects 8 frameworks, ESLint 9 flat config, no peer deps
- **vs. eslint:recommended:** 140+ rules (7x more), framework-aware, TypeScript built-in
- **vs. Standard:** More configurable, better TypeScript, framework support, ESLint 9

## 💡 VS Code Integration

Install the ESLint extension and add to `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": false,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "eslint.validate": [
    "javascript",
    "typescript",
    "javascriptreact",
    "typescriptreact",
    "vue"
  ],
  "eslint.experimental.useFlatConfig": true
}
```

Now ESLint runs automatically on save!

## ❓ Common Questions

**Seeing errors on first run?** Run `npm run lint:fix` to auto-fix, then manually fix remaining issues.

**Disable specific rules?** Add to config: `rules: { 'no-console': 'off' }` or single line: `// eslint-disable-next-line no-console`

**Works without TypeScript?** Yes. Auto-detects from `tsconfig.json` presence.

**Auto-detection failing?** Check `package.json` has dependencies, or explicitly set: `createConfig({ framework: 'react' })`

**Use with Prettier?** Yes. ESLint = code quality, Prettier = formatting. Configure separately.

## 🔧 Troubleshooting

| Issue | Solution |
|-------|----------|
| **"Cannot find module"** | Run `npm install --save-dev @jdhillen/eslint-config` |
| **VS Code not working** | Install ESLint extension, add `"eslint.experimental.useFlatConfig": true` to settings, restart |
| **Wrong framework detected** | Explicitly set: `createConfig({ framework: 'react' })` |
| **TypeScript rules not working** | Ensure `tsconfig.json` exists, or force: `createConfig({ typescript: true })` |
| **Too many errors** | Run `npm run lint:fix` to auto-fix, then address remaining issues gradually |
| **Linting is slow** | Add to `ignorePaths`: `['**/dist/**', '**/.next/**', '**/build/**']` |
| **Angular rules missing** | This is expected. Install `@angular-eslint/eslint-plugin` for Angular-specific rules |
| **Framework rules not loading** | Check console output shows correct framework: `📦 ESLint Config: react | browser | TypeScript: Yes` |

## 📋 Requirements

- **Node.js:** 22.12.0 or higher (Node.js 22 LTS - "Jod")
- **ECMAScript:** 2025 (ES2025) with latest JavaScript features
- **TypeScript:** 5.0.0 or higher (optional)
- **ESLint:** 9.0.0 or higher (included)

## 🤝 Contributing

Issues and PRs welcome at [github.com/jdhillen/eslint-config](https://github.com/jdhillen/eslint-config)

## 📄 License

MIT - Use it however you want!

---

**Made for developers who want clean code without the configuration hassle.**
