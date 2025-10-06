import js from '@eslint/js';
import tseslint from 'typescript-eslint';

import { autoDetect } from './detectors.js';
import basePreset from './presets/base.js';
import browserEnv from './presets/environments/browser.js';
import nodeEnv from './presets/environments/node.js';
import universalEnv from './presets/environments/universal.js';
import createReactPreset from './presets/frameworks/react.js';
import createVanillaPreset from './presets/frameworks/vanilla.js';
import createVuePreset from './presets/frameworks/vue.js';
import importsPreset from './presets/imports.js';
import typescriptPreset from './presets/typescript.js';

/**
 * Create a universal ESLint flat config
 *
 * Supports: React, Vue.js, Svelte, Vanilla JS/TS, and auto-detection
 *
 * @param {Object} options - Configuration options
 * @param {string} [options.framework='auto'] - Framework: 'auto' | 'react' | 'vue' | 'svelte' | 'vanilla' | 'node'
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
  const cwd = process.cwd();

  // Auto-detect configuration if not explicitly provided
  const detected = autoDetect(cwd);

  const framework = options.framework === 'auto' || !options.framework ? detected.framework : options.framework;
  const environment = options.environment === 'auto' || !options.environment ? detected.environment : options.environment;
  const typescript = options.typescript === 'auto' || options.typescript === undefined ? detected.typescript : options.typescript;

  // Log detected configuration for transparency
  console.warn(
    `📦 ESLint Config: ${framework} | ${environment} | TypeScript: ${typescript ? 'Yes' : 'No'}`
  );

  // Handle Angular detection (special case)
  if (framework === 'angular') {
    console.warn(
      '\n⚠️  Angular detected. This package provides basic TypeScript linting.\n' +
        '   For Angular-specific rules, install: @angular-eslint/eslint-plugin\n' +
        '   See: https://github.com/angular-eslint/angular-eslint\n'
    );
  }

  // Default folders to ignore
  const defaultIgnorePaths = ['**/node_modules/**', '**/dist/**', '**/build/**', '**/.next/**', '**/.nuxt/**'];

  // Combine default ignore paths with user-provided paths
  const { ignorePaths = [] } = options;
  const allIgnorePaths = [...defaultIgnorePaths, ...ignorePaths];

  const config = [];

  // 1. Ignore paths
  config.push({
    ignores: allIgnorePaths
  });

  // 2. ESLint recommended rules
  config.push(js.configs.recommended);

  // 3. TypeScript configuration (if enabled)
  if (typescript) {
    config.push(...tseslint.configs.recommended);
    config.push({
      files: ['**/*.js', '**/*.ts', '**/*.tsx', '**/*.vue', '**/*.jsx', '**/*.svelte'],
      ...typescriptPreset
    });

    // Override for declaration files
    config.push({
      files: ['**/*.d.ts'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off'
      }
    });

    // Override for JavaScript files (allow require in .js)
    config.push({
      files: ['**/*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off'
      }
    });
  }

  // 4. Environment configuration
  let envConfig;
  switch (environment) {
    case 'node':
      envConfig = nodeEnv;
      break;
    case 'universal':
      envConfig = universalEnv;
      break;
    case 'browser':
    default:
      envConfig = browserEnv;
      break;
  }

  config.push({
    files: ['**/*.js', '**/*.ts', '**/*.tsx', '**/*.vue', '**/*.jsx', '**/*.svelte'],
    ...envConfig
  });

  // 5. Base JavaScript rules (always included)
  config.push({
    files: ['**/*.js', '**/*.ts', '**/*.tsx', '**/*.vue', '**/*.jsx', '**/*.svelte'],
    ...basePreset
  });

  // 6. Import/export rules (always included)
  config.push({
    files: ['**/*.js', '**/*.ts', '**/*.tsx', '**/*.vue', '**/*.jsx', '**/*.svelte'],
    ...importsPreset
  });

  // 7. Framework-specific configuration
  switch (framework) {
    case 'react':
      config.push(...createReactPreset());
      break;

    case 'vue':
      config.push(...createVuePreset());
      break;

    case 'svelte': {
      // Lazy load Svelte preset to avoid requiring svelte package when not used
      const { default: createSveltePreset } = await import('./presets/frameworks/svelte.js');
      config.push(...createSveltePreset());
      break;
    }

    case 'vanilla':
      config.push(...createVanillaPreset());
      break;

    case 'node':
      // Node environment already configured above
      config.push(...createVanillaPreset());
      break;

    case 'angular':
      // Angular uses its own ESLint ecosystem
      // Provide base config only
      config.push(...createVanillaPreset());
      break;

    default:
      // Unknown framework - default to vanilla
      console.warn(`⚠️  Unknown framework "${framework}", defaulting to vanilla JavaScript`);
      config.push(...createVanillaPreset());
      break;
  }

  // 8. Node.js scripts override (bin, scripts directories)
  config.push({
    files: ['**/bin/**/*.js', '**/scripts/**/*.js'],
    languageOptions: {
      globals: {
        ...nodeEnv.languageOptions.globals
      }
    },
    rules: {
      'no-console': 'off',
      'max-lines-per-function': 'off' // Allow long setup scripts
    }
  });

  // 9. User-provided rule overrides (highest priority)
  if (options.rules && Object.keys(options.rules).length > 0) {
    config.push({
      files: ['**/*.js', '**/*.ts', '**/*.tsx', '**/*.vue', '**/*.jsx', '**/*.svelte'],
      rules: options.rules
    });
  }

  return config;
}
