import createConfig from './src/index.js';

// This package is Node.js-based (not browser-based)
export default createConfig({
  environment: 'node',
  typescript: false,
  ignorePaths: [
    'src/index.js.backup',
    'examples/**'  // Don't lint example projects (they have their own configs)
  ]
});
