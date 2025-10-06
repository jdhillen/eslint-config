import createConfig from '@jdhillen/eslint-config';

// Zero config - auto-detects SvelteKit → Svelte
export default await createConfig();

// The config will automatically detect:
// - Framework: svelte (from '@sveltejs/kit' in package.json)
// - Environment: browser
// - TypeScript: true (if tsconfig.json exists)
