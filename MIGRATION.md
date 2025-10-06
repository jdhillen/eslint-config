# Migration Guide

This guide helps you migrate from other ESLint configurations to `@jdhillen/eslint-config`.

## From Airbnb

**Old setup (.eslintrc.json):**
```json
{
  "extends": ["airbnb", "airbnb/hooks"],
  "rules": {
    "react/jsx-filename-extension": [1, { "extensions": [".jsx", ".tsx"] }]
  }
}
```

**New setup (eslint.config.js):**
```javascript
import createConfig from '@jdhillen/eslint-config';

// Auto-detects React, no manual config needed!
export default await createConfig();
```

**What changes:**
- ✅ **Automatic framework detection** - No need to specify React manually
- ✅ **TypeScript support** - Works out of the box if `tsconfig.json` exists
- ✅ **No peer dependency conflicts** - All plugins bundled
- ✅ **ESLint 9 flat config** - Modern format
- ⚠️ **Some rule differences** - Conservative 15-rule React preset vs Airbnb's 60+

**If you need specific Airbnb rules:**
```javascript
import createConfig from '@jdhillen/eslint-config';

export default await createConfig({
  rules: {
    'react/jsx-props-no-spreading': 'warn',  // Add Airbnb-specific rules
    'import/prefer-default-export': 'off'    // Disable rules you don't like
  }
});
```

---

## From eslint:recommended

**Old setup (.eslintrc.json):**
```json
{
  "extends": ["eslint:recommended"],
  "env": {
    "browser": true,
    "es2021": true
  }
}
```

**New setup (eslint.config.js):**
```javascript
import createConfig from '@jdhillen/eslint-config';

export default await createConfig();
```

**What changes:**
- ✅ **140+ rules vs 20 rules** - Much more comprehensive
- ✅ **Framework detection** - Adds React/Vue/Svelte rules automatically
- ✅ **Modern JavaScript** - ES2025 support
- ✅ **TypeScript** - Auto-enables if `tsconfig.json` found
- ✅ **Import organization** - Enforces consistent import order

**Gradual migration:**

Start with only errors, then enable warnings:
```javascript
import createConfig from '@jdhillen/eslint-config';

const config = await createConfig();

// Convert all warnings to off initially
export default config.map(c => ({
  ...c,
  rules: Object.fromEntries(
    Object.entries(c.rules || {}).map(([rule, level]) =>
      [rule, Array.isArray(level) && level[0] === 'warn' ? 'off' : level]
    )
  )
}));
```

Then gradually re-enable rules.

---

## From Standard

**Old setup:**
```json
{
  "extends": ["standard"]
}
```

**New setup:**
```javascript
import createConfig from '@jdhillen/eslint-config';

export default await createConfig();
```

**Key differences:**
- ⚠️ **Semicolons required** - Standard uses no semicolons, this config requires them
- ⚠️ **Quotes** - Standard uses single quotes, this config is more flexible
- ✅ **TypeScript support** - Standard has poor TS support
- ✅ **Framework-aware** - Adds framework-specific rules

**To match Standard's style:**
```javascript
import createConfig from '@jdhillen/eslint-config';

export default await createConfig({
  rules: {
    'semi': ['error', 'never'],           // No semicolons
    'quotes': ['error', 'single'],        // Single quotes
    'comma-dangle': ['error', 'never']    // No trailing commas
  }
});
```

---

## From Vue CLI / create-vue

**Old setup (.eslintrc.cjs):**
```javascript
module.exports = {
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended'
  ]
}
```

**New setup (eslint.config.js):**
```javascript
import createConfig from '@jdhillen/eslint-config';

// Auto-detects Vue from package.json
export default await createConfig();
```

**What changes:**
- ✅ **Automatic Vue 3 detection** - No manual plugin setup
- ✅ **More comprehensive rules** - 22 Vue-specific rules
- ✅ **Composition API focus** - Enforces `<script setup>`
- ✅ **TypeScript** - Works automatically if tsconfig.json exists

**Keep your existing customizations:**
```javascript
import createConfig from '@jdhillen/eslint-config';

export default await createConfig({
  rules: {
    'vue/multi-word-component-names': 'off'  // If you disabled this before
  }
});
```

---

## From Create React App

**Old setup:**

Create React App doesn't use ESLint config files - rules are embedded in `react-scripts`.

**New setup (eslint.config.js):**
```javascript
import createConfig from '@jdhillen/eslint-config';

// Auto-detects React
export default await createConfig();
```

**Steps:**

1. Eject from CRA or migrate to Vite/Next.js
2. Install this config:
   ```bash
   npm install --save-dev @jdhillen/eslint-config
   ```
3. Create `eslint.config.js` (shown above)
4. Run linting:
   ```bash
   npm run lint
   ```

**What changes:**
- ✅ **More rules** - CRA has very minimal linting
- ✅ **Better TypeScript** - Stricter TS rules
- ✅ **Import organization** - Enforced import order
- ⚠️ **Some new errors** - You may need to fix code

---

## From Next.js

**Old setup (next.config.js):**
```javascript
module.exports = {
  eslint: {
    dirs: ['pages', 'components', 'lib']
  }
}
```

**With .eslintrc.json:**
```json
{
  "extends": "next/core-web-vitals"
}
```

**New setup (eslint.config.js):**
```javascript
import createConfig from '@jdhillen/eslint-config';

// Auto-detects Next.js → React
export default await createConfig();
```

**What changes:**
- ✅ **Auto-detects from `next` dependency** - No manual config
- ✅ **All React Hooks rules** - next/core-web-vitals is minimal
- ✅ **Import organization** - Not included in Next.js config
- ⚠️ **Next.js-specific rules removed** - Use alongside `eslint-config-next` if needed

**Use both configs together:**
```javascript
import nextConfig from 'eslint-config-next';
import createConfig from '@jdhillen/eslint-config';

const baseConfig = await createConfig();

export default [
  ...baseConfig,
  ...nextConfig
];
```

---

## From Angular CLI

**Old setup (.eslintrc.json):**
```json
{
  "extends": "../../.eslintrc.json",
  "ignorePatterns": ["!**/*"],
  "overrides": [
    {
      "files": ["*.ts"],
      "extends": [
        "plugin:@angular-eslint/recommended"
      ]
    }
  ]
}
```

**New setup (eslint.config.js):**
```javascript
import createConfig from '@jdhillen/eslint-config';

// Provides base TypeScript rules only
export default await createConfig();
```

**Important:**

This config **does not replace** `@angular-eslint`. Use them together:

```bash
npm install --save-dev @jdhillen/eslint-config @angular-eslint/eslint-plugin
```

```javascript
import angularConfig from '@angular-eslint/eslint-plugin';
import createConfig from '@jdhillen/eslint-config';

const baseConfig = await createConfig();

export default [
  ...baseConfig,
  ...angularConfig.configs.recommended
];
```

---

## Common Migration Issues

### Issue: "await is only valid in async functions"

**Problem:** Forgot `await` in config file

**Solution:**
```javascript
// ❌ Wrong
export default createConfig();

// ✅ Correct
export default await createConfig();
```

### Issue: Massive list of errors after migration

**Solution:** Fix auto-fixable issues first:
```bash
npm run lint:fix
```

Then address remaining issues gradually.

### Issue: Want to keep some old rules

**Solution:** Add them as overrides:
```javascript
import createConfig from '@jdhillen/eslint-config';

export default await createConfig({
  rules: {
    // Your old rules here
    'no-console': 'warn',
    'prefer-const': 'error'
  }
});
```

### Issue: TypeScript errors in JavaScript files

**Problem:** TypeScript rules enabled for `.js` files

**Solution:** Force TypeScript off:
```javascript
export default await createConfig({
  typescript: false
});
```

---

## Testing Your Migration

After migrating, verify everything works:

1. **Run linting:**
   ```bash
   npm run lint
   ```

2. **Check detection:**
   Look for the detection message:
   ```
   📦 ESLint Config: react | browser | TypeScript: Yes
   ```

3. **Fix auto-fixable issues:**
   ```bash
   npm run lint:fix
   ```

4. **Address remaining errors:**
   Review and fix errors one by one

5. **Commit changes:**
   ```bash
   git add .
   git commit -m "chore: migrate to @jdhillen/eslint-config"
   ```

---

## Need Help?

- **Documentation:** [README.md](./README.md)
- **Examples:** [examples/](./examples/)
- **Issues:** [github.com/jdhillen/eslint-config/issues](https://github.com/jdhillen/eslint-config/issues)
