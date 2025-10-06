import createConfig from '@jdhillen/eslint-config';

// Zero config - auto-detects Astro
export default await createConfig();

// The config will automatically detect:
// - Framework: astro (from 'astro' in package.json)
// - Environment: universal (browser + node for islands)
// - TypeScript: true (if tsconfig.json exists)
//
// Astro-specific features:
// - Island architecture support
// - Component syntax validation
// - Built-in accessibility rules
