import createConfig from '@jdhillen/eslint-config';

// Zero config - auto-detects Next.js → React
export default await createConfig();

// The config will automatically detect:
// - Framework: react (from 'next' in package.json)
// - Environment: browser
// - TypeScript: true (if tsconfig.json exists)
