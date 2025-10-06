# @jdhillen/eslint-config

A simple, powerful ESLint configuration for Vue.js 3 and TypeScript projects. Install it once, and it handles all your code quality checks automatically.

## What is ESLint?

ESLint is a tool that reads your code and tells you about potential problems:
- Bugs before they happen
- Code style inconsistencies
- Common mistakes
- Best practice violations

Think of it as a helpful friend who reviews your code as you write it.

## What Does This Package Do?

This package configures ESLint with 88 carefully chosen rules for modern JavaScript, TypeScript, and Vue.js 3 development. You install it once and forget about it - it just works.

**You get:**
- ✅ Automatic error detection
- ✅ Consistent code style across your team
- ✅ Vue.js 3 best practices
- ✅ TypeScript safety checks
- ✅ Modern JavaScript patterns
- ✅ Import organization
- ✅ Naming convention enforcement

## Installation

### Step 1: Install the Package

Open your terminal in your project folder and run:

```bash
npm install --save-dev @jdhillen/eslint-config
```

**That's it!** The package includes everything you need - ESLint and all plugins are included.

### Step 2: Set Up Your Project

Run this command to automatically create the configuration files:

```bash
npx setup-eslint-config
```

This creates:
1. An `eslint.config.js` file in your project
2. Two scripts in your `package.json`: `lint` and `lint:fix`

**Done!** ESLint is now configured.

## How to Use It

### Check Your Code

To see if your code has any issues:

```bash
npm run lint
```

You'll see output like:
```
✖ 3 problems (2 errors, 1 warning)

src/App.vue
  12:5  error    'userName' is assigned a value but never used  no-unused-vars
  15:3  warning  Unexpected console statement                   no-console
```

### Auto-Fix Issues

Many issues can be fixed automatically:

```bash
npm run lint:fix
```

This will:
- Fix formatting issues
- Organize imports
- Apply automatic corrections

**Magic!** Most problems are fixed without you doing anything.

### Lint While You Code (Recommended)

Install the [ESLint extension for VS Code](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) to see problems as you type.

#### VS Code Setup

1. Install the ESLint extension
2. Create a `.vscode/settings.json` file in your project with:

```json
{
  "editor.formatOnSave": false,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "eslint.validate": [
    "javascript",
    "typescript",
    "vue"
  ],
  "eslint.experimental.useFlatConfig": true
}
```

Now when you save a file, ESLint will automatically fix issues!

## What Rules Are Enforced?

### Naming Conventions

```javascript
// ✅ Good
const userName = 'John';           // camelCase for variables
class UserAccount { }              // PascalCase for classes
const API_KEY = 'secret';          // UPPER_CASE for constants
const isActive = true;             // Prefix booleans with is/has/can
interface UserData { }             // PascalCase for interfaces

// ❌ Bad
const UserName = 'John';           // Wrong case
class user_account { }             // Wrong case
const api_key = 'secret';          // Wrong case
const active = true;               // Missing prefix
```

### Modern JavaScript

```javascript
// ✅ Good
const name = 'John';               // Use const/let
const fullName = `${first} ${last}`; // Template literals
const { id, name } = user;         // Destructuring
const newArray = [...oldArray];    // Spread operator
users.forEach(user => { });        // Arrow functions

// ❌ Bad
var name = 'John';                 // Don't use var
const fullName = first + ' ' + last; // String concatenation
const id = user.id;                // No destructuring
const newArray = oldArray.slice(); // Not using spread
users.forEach(function(user) { }); // Old function syntax
```

### Vue.js 3

```vue
<!-- ✅ Good -->
<template>
  <MyComponent :value="data" @click="handler" />
  <div class="container" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{ value: string }>();
const emit = defineEmits<{ update: [value: string] }>();

const count = ref(0);
</script>

<!-- ❌ Bad -->
<template>
  <my-component v-bind:value="data" v-on:click="handler"></my-component>
  <div class="container"></div>
</template>

<script lang="ts">
import { ref } from 'vue';

export default {
  props: ['value'],
  setup(props) {
    const { value } = props; // Loses reactivity!
    const count = ref(0);
  }
}
</script>
```

### TypeScript

```typescript
// ✅ Good
const numbers: number[] = [1, 2, 3];
const user = { id: 1, name: 'John' }; // Type inferred
const items = users.filter(u => u.active);

interface User {
  id: number;
  name: string;
}

// ❌ Bad
const numbers: any = [1, 2, 3];        // Avoid any
const user: any = { id: 1, name: 'John' };
const items = users.filter(function(u) {
  return u.active;
});

type User = {                          // Prefer interface
  id: number;
  name: string;
}
```

### Import Organization

```javascript
// ✅ Good - Organized and alphabetized
import { readFile } from 'fs';
import { join } from 'path';

import axios from 'axios';
import vue from 'vue';

import { formatDate } from '@/utils';
import { UserService } from '@/services';

import Button from './Button.vue';
import Header from './Header.vue';

// ❌ Bad - Random order
import Button from './Button.vue';
import axios from 'axios';
import { formatDate } from '@/utils';
import { readFile } from 'fs';
import vue from 'vue';
```

## Customizing Rules

You can override any rule in your `eslint.config.js`:

```javascript
import createConfig from '@jdhillen/eslint-config';

const config = createConfig({
  // Add folders to ignore
  ignorePaths: [
    '**/coverage/**',
    '**/temp/**'
  ]
});

export default [
  ...config,
  // Add your custom rules
  {
    files: ['**/*.test.js'],
    rules: {
      'no-console': 'off' // Allow console in tests
    }
  },
  {
    rules: {
      'max-lines': ['warn', 1000] // Change line limit
    }
  }
];
```

## Common Questions

### Why am I getting errors?

The first time you run ESLint on an existing project, you'll probably see errors. This is normal! The rules are catching issues that were already in your code.

**What to do:**
1. Run `npm run lint:fix` to auto-fix what can be fixed
2. Review remaining errors and fix them manually
3. Going forward, ESLint will keep your code clean

### Can I disable a rule temporarily?

Yes! Add a comment above the line:

```javascript
// eslint-disable-next-line no-console
console.log('Important debug message');

/* eslint-disable no-alert */
alert('This code has a good reason to use alert');
/* eslint-enable no-alert */
```

**But:** Think twice before disabling rules. They exist to help you!

### What if I disagree with a rule?

You can disable or customize any rule in your `eslint.config.js`. However, these rules are based on industry best practices and years of experience. Consider whether the rule might be right!

### Does this work with JavaScript only (no TypeScript)?

Yes! All rules work with JavaScript. TypeScript-specific rules are automatically skipped for `.js` files.

### Does this work with Vue 2?

No, this configuration is designed for Vue 3. Vue 2 has different patterns and this would cause issues.

### How do I lint before committing?

Install husky and lint-staged:

```bash
npm install --save-dev husky lint-staged
npx husky init
```

Then edit `.husky/pre-commit`:

```bash
npx lint-staged
```

And add to `package.json`:

```json
{
  "lint-staged": {
    "*.{js,ts,vue}": "eslint --fix"
  }
}
```

Now ESLint runs automatically on changed files before each commit!

### Can I use this with Prettier?

Yes, but configure Prettier separately for formatting. This package handles code quality, not formatting.

**Recommended setup:**
1. Use this package for code quality (errors, bugs, patterns)
2. Use Prettier for formatting (spaces, quotes, line length)
3. Don't use both for the same thing

## Troubleshooting

### "Cannot find module '@jdhillen/eslint-config'"

Make sure you installed it:
```bash
npm install --save-dev @jdhillen/eslint-config
```

### "Parsing error: Cannot find module 'typescript'"

Install TypeScript:
```bash
npm install --save-dev typescript
```

### "ESLint couldn't find the config"

Make sure you're using the correct import syntax in `eslint.config.js`:
```javascript
import createConfig from '@jdhillen/eslint-config'; // ✅ Correct
```

### VS Code not showing errors

1. Make sure the ESLint extension is installed
2. Check that `eslint.experimental.useFlatConfig` is `true` in settings
3. Restart VS Code
4. Check the Output panel (View → Output → ESLint) for errors

### Linting is slow

ESLint can be slow on large projects. To speed it up:

1. Add more folders to ignore:
```javascript
const config = createConfig({
  ignorePaths: [
    '**/node_modules/**',
    '**/dist/**',
    '**/coverage/**',
    '**/*.min.js'
  ]
});
```

2. Use lint-staged to only lint changed files (see "How do I lint before committing?" above)

## What's Included?

This package includes and configures:

- **ESLint 9** - The linting engine
- **TypeScript ESLint** - TypeScript support
- **eslint-plugin-vue** - Vue.js 3 rules
- **eslint-plugin-import** - Import/export rules
- **88 carefully chosen rules** - Modern best practices

You don't need to install anything else!

## Requirements

- **Node.js:** 20.0.0 or higher
- **TypeScript:** 5.0.0 or higher (if using TypeScript)
- **Vue:** 3.x (if using Vue)

## Support

- **Issues:** [GitHub Issues](https://github.com/jdhillen/eslint-config/issues)
- **Documentation:** You're reading it!

## License

MIT - Use it however you want!

---

**Made with ❤️ for developers who want clean code without the hassle.**
