# @jdhillen/eslint-config

**Universal ESLint configuration for modern JavaScript and TypeScript projects.**

Works with React, Vue.js, Svelte, Vanilla JS/TS, and Node.js. Auto-detects your framework and TypeScript - zero configuration required.

## ✨ Features

- **🎯 Zero Configuration** - Auto-detects framework, environment, and TypeScript
- **⚡ Universal** - One package for React, Vue, Svelte, Vanilla JS/TS, and Node.js
- **🚀 Modern** - ESLint 9 flat config with latest best practices
- **📦 Batteries Included** - All plugins bundled, no peer dependency conflicts
- **🎨 Comprehensive** - 115+ carefully chosen rules for code quality
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

### ⚛️ React (+ Next.js, Remix, Gatsby)
```javascript
// Auto-detected from package.json
import createConfig from '@jdhillen/eslint-config';
export default await createConfig();
```

**What you get:**
- React Hooks rules (prevent common mistakes)
- JSX best practices
- React 17+ new JSX transform support
- Conservative 15-rule preset (essential only)

**Detected when you have:**
- `react` or `react-dom` in dependencies
- `next`, `remix`, or `gatsby` (meta-frameworks)

### 🟢 Vue.js 3 (+ Nuxt)
```javascript
// Auto-detected from package.json
import createConfig from '@jdhillen/eslint-config';
export default await createConfig();
```

**What you get:**
- Vue 3 Composition API rules
- `<script setup>` best practices
- Template and directive rules
- Comprehensive 22-rule Vue preset

**Detected when you have:**
- `vue` in dependencies
- `nuxt` (meta-framework)

### 🟠 Svelte (+ SvelteKit)
```javascript
// Auto-detected from package.json
import createConfig from '@jdhillen/eslint-config';
export default await createConfig();
```

**What you get:**
- Svelte 5 runes mode support
- Component best practices
- Accessibility (a11y) rules
- Performance optimizations
- Comprehensive 27-rule Svelte preset

**Detected when you have:**
- `svelte` in dependencies
- `@sveltejs/kit` (meta-framework)

### 📦 Vanilla JavaScript/TypeScript
```javascript
// Auto-detected - no framework found
import createConfig from '@jdhillen/eslint-config';
export default await createConfig();
```

**What you get:**
- Modern JavaScript (ES2015+) rules
- TypeScript rules (if tsconfig.json exists)
- Import/export organization
- Code quality and complexity rules

**Perfect for:**
- Libraries and utilities
- Shared packages
- Browser extensions
- Any non-framework code

### 🟦 Node.js Backend

Auto-detected when your project has Node.js indicators (Express, Fastify, etc.) or server files.

**What you get:**
- Node.js globals (`process`, `__dirname`, `require`)
- Console statements allowed
- CommonJS patterns allowed

## 🔧 Configuration

### Zero Config (Recommended)

Just import and export - auto-detection handles everything:

```javascript
import createConfig from '@jdhillen/eslint-config';

export default await createConfig();
```

Auto-detects:
- ✅ Framework (React/Vue/Svelte/Vanilla/Node)
- ✅ Environment (browser/node/universal)
- ✅ TypeScript (checks for tsconfig.json)

### Explicit Configuration

Override auto-detection when needed:

```javascript
import createConfig from '@jdhillen/eslint-config';

export default await createConfig({
  framework: 'react',      // 'react' | 'vue' | 'svelte' | 'vanilla' | 'node'
  environment: 'browser',  // 'browser' | 'node' | 'universal'
  typescript: true,        // true | false | 'auto'
  ignorePaths: [
    '**/coverage/**',
    '**/temp/**'
  ]
});
```

### Custom Rules

Add your own rules or override existing ones:

```javascript
import createConfig from '@jdhillen/eslint-config';

export default await createConfig({
  rules: {
    'no-console': 'off',           // Allow console everywhere
    'max-lines': ['warn', 1000],   // Increase line limit
    'complexity': 'off'            // Disable complexity check
  }
});
```

### Per-File Overrides

Apply different rules to specific files:

```javascript
import createConfig from '@jdhillen/eslint-config';

const config = createConfig();

export default [
  ...config,
  {
    files: ['**/*.test.js', '**/*.spec.js'],
    rules: {
      'no-console': 'off',
      'max-lines-per-function': 'off'
    }
  }
];
```

## 📚 What Rules Are Enforced?

### Modern JavaScript (20 rules)

**Built on ECMAScript 2025 (ES2025) features including:**
- Iterator helpers for functional programming
- Set methods (union, intersection, difference)
- RegExp improvements (escape method, pattern modifiers)
- Promise.try() for safer promise handling
- Import attributes for JSON modules
- Float16Array for efficient memory usage

**Enforces:**
- `const` over `let`, never `var`
- Template literals over string concatenation
- Arrow functions for callbacks
- Destructuring where possible
- Spread operator over `.apply()`
- Object shorthand syntax
- `===` instead of `==`
- Async/await best practices

**Example:**
```javascript
// ✅ Good
const name = 'John';
const fullName = `${first} ${last}`;
const items = users.filter(u => u.active);

// ❌ Bad
var name = 'John';
const fullName = first + ' ' + last;
const items = users.filter(function(u) { return u.active; });
```

### TypeScript (10 rules + Naming Conventions)

**Enforces:**
- Avoid `any` (warns, doesn't error)
- Use `interface` over `type` for object types
- Use `import type` for type-only imports
- Naming conventions for consistency

**Naming conventions:**
- `camelCase` for variables, functions, parameters
- `PascalCase` for classes, interfaces, types, components
- `UPPER_CASE` for constants
- `_` prefix for private members and unused parameters

**Example:**
```typescript
// ✅ Good
const userName = 'John';
interface UserData { id: number; }
import type { User } from './types';

// ❌ Bad
const UserName = 'John';
type UserData = { id: number; };
import { User } from './types'; // User is only used as a type
```

### React Rules (15 rules - Conservative)

**Enforces:**
- Hooks rules (correct dependencies, proper order)
- No React import in React 17+ (new JSX transform)
- Self-closing components
- Boolean props without explicit `={true}`
- Arrow function components
- Keys in lists
- No `dangerouslySetInnerHTML` (warns only)

**Example:**
```jsx
// ✅ Good
const Button = ({ active, onClick }) => (
  <button className="btn" disabled={!active} onClick={onClick} />
);

// ❌ Bad
function Button(props) {
  return (
    <button className="btn" disabled={active === true} onClick={onClick}></button>
  );
}
```

### Vue.js 3 Rules (22 rules - Comprehensive)

**Enforces:**
- `<script setup>` syntax
- PascalCase for components in templates
- Self-closing tags
- No props destructuring (loses reactivity)
- Proper `defineProps` and `defineEmits` order
- Kebab-case for attributes and events
- Shorthand directives (`:` and `@`)

**Example:**
```vue
<!-- ✅ Good -->
<template>
  <MyComponent :value="data" @click="handler" />
</template>

<script setup lang="ts">
const props = defineProps<{ value: string }>();
const emit = defineEmits<{ update: [value: string] }>();
</script>

<!-- ❌ Bad -->
<template>
  <my-component v-bind:value="data" v-on:click="handler"></my-component>
</template>

<script lang="ts">
export default {
  props: ['value'],
  setup(props) {
    const { value } = props; // Loses reactivity!
  }
}
</script>
```

### Svelte Rules (27 rules)

**Enforces:**
- Svelte 5 runes mode best practices
- Component naming and structure
- Accessibility (a11y) compliance
- Performance optimizations
- Template syntax and formatting

**Categories:**
- **Core Best Practices (9 rules)** - No `@html`, reactive store access, optimized styles
- **Accessibility (8 rules)** - ARIA attributes, keyboard navigation, semantic HTML
- **Svelte 5 Runes (4 rules)** - Block lang enforcement, no direct DOM manipulation
- **Code Style (6 rules)** - Shorthand attributes/directives, consistent quotes and indentation

**Example:**
```svelte
<!-- ✅ Good -->
<script lang="ts">
  import { writable } from 'svelte/store';

  let count = $state(0);
  const store = writable(0);

  function increment() {
    count++;
  }
</script>

<button on:click={increment} type="button">
  Count: {count} | Store: {$store}
</button>

<!-- ❌ Bad -->
<script>
  let count = 0;
  const store = writable(0);

  function increment() {
    document.querySelector('button').textContent = count;
  }
</script>

<button on:click={increment}>
  Count: {count} | Store: {store}
</button>
```

### Import/Export Rules (10 rules)

**Enforces:**
- Consistent import order (built-in → external → internal → relative)
- Alphabetical ordering within groups
- Newlines between import groups
- No duplicate imports
- Imports at top of file

**Example:**
```javascript
// ✅ Good
import { readFile } from 'fs';

import axios from 'axios';
import react from 'react';

import { formatDate } from '@/utils';

import Button from './Button';

// ❌ Bad
import Button from './Button';
import axios from 'axios';
import { formatDate } from '@/utils';
import { readFile } from 'fs';
```

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
| `express`, `fastify` | Node.js | Node globals, no browser |
| None of above | Vanilla | Base JS/TS rules only |

## 🆚 vs. Other Configs

**vs. Airbnb:**
- ✅ Auto-detects framework (Airbnb requires manual setup)
- ✅ Modern ESLint 9 flat config (Airbnb still uses legacy format)
- ✅ All plugins included (Airbnb has peer dependency issues)
- ✅ Vue + Svelte support (Airbnb is React-only)

**vs. eslint:recommended:**
- ✅ 115 rules vs. 20 rules (much more comprehensive)
- ✅ Framework-specific rules (React Hooks, Vue reactivity, Svelte runes)
- ✅ TypeScript support built-in
- ✅ Modern syntax preferences (template literals, destructuring, etc.)

**vs. Standard:**
- ✅ More configurable (Standard is zero-config but inflexible)
- ✅ TypeScript support (Standard has poor TS support)
- ✅ Framework-aware (Standard is framework-agnostic)
- ✅ ESLint 9 (Standard still on ESLint 8)

## 🔥 Real-World Examples

### Electron App (Main + Renderer)

```javascript
import createConfig from '@jdhillen/eslint-config';

// Main process (Node.js)
const mainConfig = createConfig({
  framework: 'vanilla',
  environment: 'node'
});

// Renderer process (React + Browser)
const rendererConfig = createConfig({
  framework: 'react',
  environment: 'browser'
});

export default [
  {
    ...mainConfig[0],
    files: ['src/main/**/*.js']
  },
  {
    ...rendererConfig[0],
    files: ['src/renderer/**/*.{js,jsx,ts,tsx}']
  }
];
```

### Monorepo (Multiple Frameworks)

```javascript
import createConfig from '@jdhillen/eslint-config';

export default [
  // React frontend app
  {
    files: ['apps/web/**/*.{js,jsx,ts,tsx}'],
    ...createConfig({ framework: 'react' })[0]
  },
  // Vue admin app
  {
    files: ['apps/admin/**/*.{js,vue,ts}'],
    ...createConfig({ framework: 'vue' })[0]
  },
  // Node.js API
  {
    files: ['apps/api/**/*.{js,ts}'],
    ...createConfig({ environment: 'node' })[0]
  },
  // Shared packages (vanilla)
  {
    files: ['packages/**/*.{js,ts}'],
    ...createConfig({ framework: 'vanilla' })[0]
  }
];
```

### Next.js with Strict TypeScript

```javascript
import createConfig from '@jdhillen/eslint-config';

export default await createConfig({
  framework: 'react',  // Next.js uses React
  typescript: true,
  rules: {
    '@typescript-eslint/no-explicit-any': 'error',  // Strict: no any allowed
    '@typescript-eslint/explicit-function-return-type': 'warn'  // Encourage return types
  }
});
```

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

### Why am I seeing errors on first run?

The first time you run ESLint on an existing project, you'll see errors for issues that already existed. This is normal!

**What to do:**
1. Run `npm run lint:fix` to auto-fix what can be fixed
2. Review remaining errors and fix manually
3. Going forward, ESLint will keep your code clean

### Can I disable specific rules?

Yes! Add them to your config:

```javascript
export default await createConfig({
  rules: {
    'no-console': 'off',  // Disable entirely
    'max-lines': 'warn'   // Change to warning
  }
});
```

Or disable for a single line:

```javascript
// eslint-disable-next-line no-console
console.log('Important debug message');
```

### Does this work without TypeScript?

Yes! TypeScript is optional. The config auto-detects if `tsconfig.json` exists:
- **With TypeScript:** Full TS rules + naming conventions
- **Without TypeScript:** Just JavaScript rules

### Why does auto-detection fail?

Auto-detection relies on finding dependencies in `package.json`. If it fails:

1. Make sure you've run `npm install` (package.json needs dependencies)
2. Explicitly set framework: `createConfig({ framework: 'react' })`
3. Check console output - it tells you what was detected

### Can I use this with Prettier?

Yes, but configure Prettier separately for formatting. This package handles code quality, not formatting.

**Best practice:**
- ESLint: Code quality (bugs, patterns, best practices)
- Prettier: Formatting (spaces, quotes, line length)

## 🐛 Troubleshooting

### "Cannot find module '@jdhillen/eslint-config'"

Make sure you installed it:
```bash
npm install --save-dev @jdhillen/eslint-config
```

### "ESLint couldn't find the config"

Check your import syntax in `eslint.config.js`:
```javascript
import createConfig from '@jdhillen/eslint-config'; // ✅ Correct (ES modules)
```

### VS Code not showing errors

1. Install ESLint extension
2. Check `.vscode/settings.json` has `"eslint.experimental.useFlatConfig": true`
3. Restart VS Code
4. Check Output panel (View → Output → ESLint) for errors

### Linting is slow

Add more folders to ignore:
```javascript
createConfig({
  ignorePaths: [
    '**/coverage/**',
    '**/tmp/**',
    '**/*.min.js'
  ]
})
```

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
