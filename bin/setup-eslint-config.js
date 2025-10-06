#!/usr/bin/env node

import { existsSync } from 'fs';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

async function createEslintConfig() {
  const eslintConfigPath = join(process.cwd(), 'eslint.config.js');

  if (existsSync(eslintConfigPath)) {
    console.log('ℹ️ eslint.config.js already exists');
    return;
  }

  const eslintConfig = `import createConfig from '@jdhillen/eslint-config';

// Create config with optional additional folder exclusions
// Note: node_modules, dist, and build are already ignored by default
const config = createConfig({
  ignorePaths: [
    // Add additional paths to ignore here, for example:
    // '**/coverage/**',
    // '**/temp/**',
    // '**/logs/**'
  ]
});

export default [
  ...config,
  // You can add your own rules or overrides here
  // {
  //   // Example: Override rules for specific file patterns
  //   files: ['**/tests/**/*.js'],
  //   rules: {
  //     'no-console': 'off'
  //   }
  // }
];`;

  console.log('📝 Creating eslint.config.js...');
  await writeFile(eslintConfigPath, eslintConfig, 'utf8');
}

async function updatePackageJson() {
  try {
    const packagePath = join(process.cwd(), 'package.json');
    const packageContent = await readFile(packagePath, 'utf8');
    const packageJson = JSON.parse(packageContent);

    let modified = false;

    packageJson.scripts = packageJson.scripts || {};

    if (!packageJson.scripts.lint) {
      console.log('📝 Adding lint script...');
      packageJson.scripts.lint = 'eslint .';
      modified = true;
    } else {
      console.log('ℹ️ Lint script already exists');
    }

    if (!packageJson.scripts['lint:fix']) {
      console.log('📝 Adding lint:fix script...');
      packageJson.scripts['lint:fix'] = 'eslint --fix .';
      modified = true;
    } else {
      console.log('ℹ️ lint:fix script already exists');
    }

    if (modified) {
      await writeFile(packagePath, JSON.stringify(packageJson, null, 2) + '\n', 'utf8');
      console.log('✅ Successfully updated package.json');
    } else {
      console.log('✨ No changes needed in package.json');
    }

    await createEslintConfig();

    console.log('✅ ESLint setup completed successfully');
    console.log('🚀 Run "npm run lint" to start linting your code');
  } catch (error) {
    console.error('❌ Error during ESLint setup:', error.message);
    process.exit(1);
  }
}

console.log('🔧 Setting up ESLint with @jdhillen/eslint-config...');
updatePackageJson();
