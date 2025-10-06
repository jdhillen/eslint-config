# Example Projects

This directory contains example configurations for different frameworks and project types.

Each example demonstrates:
- ✅ Zero-config setup with auto-detection
- ✅ Proper package.json configuration
- ✅ Framework-specific eslint.config.js
- ✅ TypeScript support

## Available Examples

### Frontend Frameworks

- **[react-nextjs/](./react-nextjs/)** - Next.js React application
  - Auto-detects: React (from `next` dependency)
  - Environment: browser
  - Rules: React Hooks, JSX best practices

- **[vue-nuxt/](./vue-nuxt/)** - Nuxt Vue application
  - Auto-detects: Vue (from `nuxt` dependency)
  - Environment: browser
  - Rules: Vue 3 Composition API, `<script setup>`

- **[svelte-kit/](./svelte-kit/)** - SvelteKit application
  - Auto-detects: Svelte (from `@sveltejs/kit` dependency)
  - Environment: browser
  - Rules: Svelte 5 runes, component best practices

- **[astro/](./astro/)** - Astro static site
  - Auto-detects: Astro (from `astro` dependency)
  - Environment: universal (browser + node)
  - Rules: Island architecture, accessibility

### Backend

- **[nodejs-backend/](./nodejs-backend/)** - Express.js API server
  - Auto-detects: Node.js (from `express` dependency)
  - Environment: node
  - Rules: Node.js globals, console.log allowed

## Usage

1. Copy the example directory to your project:
   ```bash
   cp -r examples/react-nextjs my-project
   cd my-project
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run linting:
   ```bash
   npm run lint        # Check for issues
   npm run lint:fix    # Auto-fix issues
   ```

## Common Patterns

### Zero Config (Recommended)
```javascript
import createConfig from '@jdhillen/eslint-config';

export default await createConfig();
```

### With Custom Ignore Paths
```javascript
import createConfig from '@jdhillen/eslint-config';

export default await createConfig({
  ignorePaths: [
    '**/coverage/**',
    '**/temp/**'
  ]
});
```

### Override Auto-Detection
```javascript
import createConfig from '@jdhillen/eslint-config';

export default await createConfig({
  framework: 'react',    // Force React even without detecting it
  typescript: true,      // Force TypeScript even without tsconfig.json
  environment: 'browser' // Force browser environment
});
```

### With Custom Rules
```javascript
import createConfig from '@jdhillen/eslint-config';

export default await createConfig({
  rules: {
    'no-console': 'off',           // Allow console everywhere
    'max-lines': ['warn', 1000]    // Increase line limit
  }
});
```

## Testing Your Config

After setting up, verify auto-detection works:

```bash
npm run lint
```

You should see output like:
```
📦 ESLint Config: react | browser | TypeScript: Yes
```

This confirms the framework, environment, and TypeScript were correctly detected.
