import createConfig from '@jdhillen/eslint-config';

// Zero config - auto-detects Nuxt → Vue
export default await createConfig();

// The config will automatically detect:
// - Framework: vue (from 'nuxt' in package.json)
// - Environment: browser
// - TypeScript: true (if tsconfig.json exists)
