import createConfig from './src/index.js';

// You can specify additional folders to ignore during linting
// Note: node_modules, dist, and build are already ignored by default
const config = createConfig({
  ignorePaths: [
    // Add additional paths to ignore here, for example:
    '**/bin/**'
  ]
});

export default [
  ...config
  // Add project-specific rules here if needed
];
