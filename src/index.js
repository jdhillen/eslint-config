import js from '@eslint/js';
import tseslint from 'typescript-eslint';

import { autoDetect } from './detectors.js';
import basePreset from './presets/base.js';
import browserEnv from './presets/environments/browser.js';
import nodeEnv from './presets/environments/node.js';
import universalEnv from './presets/environments/universal.js';
import createAngularPreset from './presets/frameworks/angular.js';
import createNodePreset from './presets/frameworks/node.js';
import createReactPreset from './presets/frameworks/react.js';
import createVanillaPreset from './presets/frameworks/vanilla.js';
import createVuePreset from './presets/frameworks/vue.js';
import importsPreset from './presets/imports.js';
import typescriptPreset from './presets/typescript.js';

/**
 * Add framework-specific configuration to config array
 */
async function addFrameworkConfig(config, framework) {
  switch (framework) {
    case 'react':
      config.push(...createReactPreset());
      break;
    case 'vue':
      config.push(...createVuePreset());
      break;
    case 'svelte': {
      const { default: createSveltePreset } = await import('./presets/frameworks/svelte.js');
      config.push(...createSveltePreset());
      break;
    }
    case 'solid': {
      const { default: createSolidPreset } = await import('./presets/frameworks/solid.js');
      config.push(...createSolidPreset());
      break;
    }
    case 'astro': {
      const { default: createAstroPreset } = await import('./presets/frameworks/astro.js');
      config.push(...createAstroPreset());
      break;
    }
    case 'vanilla':
      config.push(...createVanillaPreset());
      break;
    case 'node':
      config.push(...createNodePreset());
      break;
    case 'angular':
      config.push(...createAngularPreset());
      break;
    default:
      console.warn(`⚠️  Unknown framework "${framework}", defaulting to vanilla JavaScript`);
      config.push(...createVanillaPreset());
      break;
  }
}

/**
 * Get environment configuration
 */
function getEnvironmentConfig(environment) {
  switch (environment) {
    case 'node':
      return nodeEnv;
    case 'universal':
      return universalEnv;
    case 'browser':
    default:
      return browserEnv;
  }
}

/**
 * Add TypeScript configuration
 */
function addTypeScriptConfig(config) {
  config.push(...tseslint.configs.recommended);
  config.push({
    files: ['**/*.js', '**/*.ts', '**/*.tsx', '**/*.vue', '**/*.jsx', '**.svelte', '**.astro'],
    ...typescriptPreset
  });

  config.push({
    files: ['**/*.d.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off'
    }
  });

  config.push({
    files: ['**/*.js'],
    rules: {
      '@typescript-eslint/no-var-requires': 'off'
    }
  });
}

/**
 * Add test and script overrides
 */
function addOverrides(config, options) {
  // Test files override
  config.push({
    files: ['tests/**/*.{js,ts,jsx,tsx,vue,svelte,astro}'],
    rules: {
      'no-console': 'off',
      'max-lines-per-function': 'off',
      'complexity': 'off',
      'max-statements': 'off',
      'max-nested-callbacks': 'off',
      'no-magic-numbers': 'off',
      '@typescript-eslint/no-explicit-any': 'off'
    }
  });

  // Node.js scripts override
  config.push({
    files: ['**/bin/**/*.js', '**/scripts/**/*.js'],
    languageOptions: {
      globals: {
        ...nodeEnv.languageOptions.globals
      }
    },
    rules: {
      'no-console': 'off',
      'max-lines-per-function': 'off'
    }
  });

  // User-provided rule overrides
  if (options.rules && Object.keys(options.rules).length > 0) {
    config.push({
      files: ['**/*.js', '**/*.ts', '**/*.tsx', '**/*.vue', '**/*.jsx', '**.svelte', '**.astro'],
      rules: options.rules
    });
  }
}

/**
 * Create a universal ESLint flat config
 *
 * Supports: React, Vue.js, Svelte, Solid, Astro, Angular, Vanilla JS/TS, and auto-detection
 *
 * @param {Object} options - Configuration options
 * @param {string} [options.framework='auto'] - Framework: 'auto' | 'react' | 'vue' | 'svelte' | 'solid' | 'astro' | 'angular' | 'vanilla' | 'node'
 * @param {string} [options.environment='auto'] - Environment: 'auto' | 'browser' | 'node' | 'universal'
 * @param {boolean|string} [options.typescript='auto'] - TypeScript: 'auto' | true | false
 * @param {string[]} [options.ignorePaths=[]] - Additional paths to ignore during linting
 * @param {Object} [options.rules={}] - Additional rule overrides
 * @returns {Array} ESLint flat config array
 *
 * @example
 * // Zero config - auto-detects everything
 * import createConfig from '@jdhillen/eslint-config';
 * export default createConfig();
 *
 * @example
 * // Explicit configuration
 * import createConfig from '@jdhillen/eslint-config';
 * export default createConfig({
 *   framework: 'react',
 *   environment: 'browser',
 *   typescript: true
 * });
 *
 * @example
 * // With custom rules
 * import createConfig from '@jdhillen/eslint-config';
 * export default createConfig({
 *   rules: {
 *     'no-console': 'off'
 *   }
 * });
 */
export default async function createConfig(options = {}) {
  const cwd = options.cwd || process.cwd();
  const detected = autoDetect(cwd);

  const framework = options.framework === 'auto' || !options.framework ? detected.framework : options.framework;
  const environment = options.environment === 'auto' || !options.environment ? detected.environment : options.environment;
  const typescript = options.typescript === 'auto' || options.typescript === undefined ? detected.typescript : options.typescript;

  console.warn(
    `📦 ESLint Config: ${framework} | ${environment} | TypeScript: ${typescript ? 'Yes' : 'No'}`
  );

  if (framework === 'angular') {
    console.warn(
      '\n⚠️  Angular detected. This package provides basic TypeScript linting.\n' +
        '   For Angular-specific rules, install: @angular-eslint/eslint-plugin\n' +
        '   See: https://github.com/angular-eslint/angular-eslint\n'
    );
  }

  const defaultIgnorePaths = ['**/node_modules/**', '**/dist/**', '**/build/**', '**/.next/**', '**/.nuxt/**'];
  const allIgnorePaths = [...defaultIgnorePaths, ...(options.ignorePaths || [])];

  const config = [];

  // 1. Ignore paths
  config.push({ ignores: allIgnorePaths });

  // 2. ESLint recommended rules
  config.push(js.configs.recommended);

  // 3. TypeScript configuration
  if (typescript) {
    addTypeScriptConfig(config);
  }

  // 4. Environment configuration
  const envConfig = getEnvironmentConfig(environment);
  config.push({
    files: ['**/*.js', '**/*.ts', '**/*.tsx', '**/*.vue', '**/*.jsx', '**.svelte', '**.astro'],
    ...envConfig
  });

  // 5. Base JavaScript rules
  config.push({
    files: ['**/*.js', '**/*.ts', '**/*.tsx', '**/*.vue', '**/*.jsx', '**.svelte', '**.astro'],
    ...basePreset
  });

  // 6. Import/export rules
  config.push({
    files: ['**/*.js', '**/*.ts', '**/*.tsx', '**/*.vue', '**/*.jsx', '**.svelte', '**.astro'],
    ...importsPreset
  });

  // 7. Framework-specific configuration
  await addFrameworkConfig(config, framework);

  // 8. Test files and script overrides
  addOverrides(config, options);

  return config;
}
