import createConfig from '@jdhillen/eslint-config';

// Zero config - auto-detects Node.js backend
export default await createConfig();

// The config will automatically detect:
// - Framework: node (from 'express' or 'fastify' in package.json)
// - Environment: node
// - TypeScript: true (if tsconfig.json exists)
//
// Node environment includes:
// - console.log allowed
// - Node.js globals (process, __dirname, etc.)
// - CommonJS support (require)
