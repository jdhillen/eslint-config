#!/usr/bin/env node

import { existsSync } from 'fs';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

function detectFrameworkFromDeps(allDeps) {
  const frameworkChecks = [
    { check: () => allDeps.next || allDeps.remix || allDeps.gatsby, result: 'react' },
    { check: () => allDeps.react, result: 'react' },
    { check: () => allDeps.nuxt, result: 'vue' },
    { check: () => allDeps.vue, result: 'vue' },
    { check: () => allDeps['@sveltejs/kit'], result: 'svelte' },
    { check: () => allDeps.svelte, result: 'svelte' },
    { check: () => allDeps['solid-js'], result: 'solid' },
    { check: () => allDeps.astro, result: 'astro' },
    { check: () => allDeps['@angular/core'], result: 'angular' },
    { check: () => allDeps.express || allDeps.fastify || allDeps.koa, result: 'node' }
  ];

  for (const { check, result } of frameworkChecks) {
    if (check()) return result;
  }

  return 'vanilla';
}

async function detectProjectSetup() {
  const cwd = process.cwd();
  const packagePath = join(cwd, 'package.json');
  const tsconfigPath = join(cwd, 'tsconfig.json');

  if (!existsSync(packagePath)) {
    return null;
  }

  const packageContent = JSON.parse(await readFile(packagePath, 'utf8'));
  const allDeps = {
    ...packageContent.dependencies,
    ...packageContent.devDependencies,
    ...packageContent.peerDependencies
  };

  const framework = detectFrameworkFromDeps(allDeps);
  const typescript = existsSync(tsconfigPath);

  return { framework, typescript };
}

async function createEslintConfig() {
  const eslintConfigPath = join(process.cwd(), 'eslint.config.js');

  if (existsSync(eslintConfigPath)) {
    console.log('ℹ️ eslint.config.js already exists');
    return;
  }

  const eslintConfig = `import createConfig from '@jdhillen/eslint-config';

/**
 * Universal ESLint Configuration
 *
 * Auto-detects:
 * - Framework (React, Vue, Svelte, Solid, Astro, Angular, Vanilla JS, Node.js)
 * - Environment (browser, node, universal)
 * - TypeScript (checks for tsconfig.json)
 *
 * Zero configuration required - just export createConfig()
 * Note: createConfig() is async (required for Svelte support)
 */

// Option 1: Zero Config (Recommended)
// Auto-detects everything from your project
export default await createConfig();

// Option 2: Explicit Configuration
// Uncomment and modify if you need to override auto-detection
// export default await createConfig({
//   framework: 'auto',    // 'auto' | 'react' | 'vue' | 'svelte' | 'solid' | 'astro' | 'angular' | 'vanilla' | 'node'
//   environment: 'auto',  // 'auto' | 'browser' | 'node' | 'universal'
//   typescript: 'auto',   // 'auto' | true | false
//   ignorePaths: [
//     // Additional paths to ignore (node_modules, dist, build already ignored)
//     '**/coverage/**',
//     '**/temp/**'
//   ],
//   rules: {
//     // Override specific rules
//     // 'no-console': 'off'
//   }
// });

// Option 3: With Custom Overrides
// Uncomment to add per-file rule overrides
// const config = await createConfig();
// export default [
//   ...config,
//   {
//     files: ['**/tests/**/*.{js,ts}'],
//     rules: {
//       'no-console': 'off',
//       'max-lines-per-function': 'off'
//     }
//   }
// ];
`;

  console.log('📝 Creating eslint.config.js...');
  await writeFile(eslintConfigPath, eslintConfig, 'utf8');
}

async function updatePackageJson() {
  try {
    const detected = await detectProjectSetup();

    if (detected) {
      console.log('🔍 Detected project configuration:');
      console.log(`   Framework: ${detected.framework}`);
      console.log(`   TypeScript: ${detected.typescript ? 'Yes' : 'No'}`);
      console.log('');
    }

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
      await writeFile(packagePath, `${JSON.stringify(packageJson, null, 2)  }\n`, 'utf8');
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
