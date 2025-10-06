/**
 * Tests for Astro framework configuration
 */

import { writeFileSync, mkdirSync, rmSync } from 'fs';
import { join } from 'path';

import { describe, it, expect, afterEach } from 'vitest';

import createConfig from '../../src/index.js';

const TEST_DIR = join(process.cwd(), 'tests', '.temp-astro');

function setup(packageJson = {}, files = {}) {
  try {
    rmSync(TEST_DIR, { recursive: true, force: true });
  } catch {
    // Ignore
  }

  mkdirSync(TEST_DIR, { recursive: true });

  writeFileSync(
    join(TEST_DIR, 'package.json'),
    JSON.stringify(packageJson, null, 2)
  );

  for (const [filename, content] of Object.entries(files)) {
    writeFileSync(join(TEST_DIR, filename), content);
  }
}

function cleanup() {
  try {
    rmSync(TEST_DIR, { recursive: true, force: true });
  } catch {
    // Ignore
  }
}

describe('Astro Preset', () => {
  it('should lazy load Astro preset', async () => {
    const { default: createAstroPreset } = await import('../../src/presets/frameworks/astro.js');
    expect(createAstroPreset).toBeInstanceOf(Function);
    const preset = createAstroPreset();
    expect(preset).toBeInstanceOf(Array);
    expect(preset.length).toBeGreaterThan(0);
  });
});

describe('Astro Project Integration', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle Astro project with universal environment', async () => {
    setup(
      {
        dependencies: {
          astro: '^5.4.0',
          '@astrojs/react': '^3.6.0',
          react: '^18.3.0'
        },
        devDependencies: {
          typescript: '^5.9.0'
        }
      },
      {
        'tsconfig.json': JSON.stringify({
          extends: 'astro/tsconfigs/base'
        })
      }
    );

    const config = await createConfig({ cwd: TEST_DIR });

    expect(config).toBeInstanceOf(Array);

    // Check for universal environment (both browser and node globals)
    const configsWithGlobals = config.filter((c) => c.languageOptions?.globals);
    const allGlobals = configsWithGlobals.reduce((acc, c) => ({ ...acc, ...c.languageOptions.globals }), {});

    expect(allGlobals.window).toBeDefined();
    expect(allGlobals.process).toBeDefined();
  });
});
